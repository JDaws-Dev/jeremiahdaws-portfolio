"use client";

import { useMemo, useState } from "react";
import type { Asset, AssetOverride, Lane } from "@/lib/portfolio";
import { IconArrowUpRight, IconSpark } from "./icons";

const LANE_LABEL: Record<string, string> = {
  video: "Video",
  education: "Education",
  making: "Making",
  building: "Apps & AI",
};

type AssetWithMeta = Asset & {
  override?: AssetOverride;
};

// Canonical Client list — these surface as the Client facet on the
// public lane archives. Click a chip to set; type a new one to extend.
const CLIENT_PRESETS = [
  "Disney Yellow Shoes",
  "Disney Consumer Products",
  "National Geographic",
  "Hallmark",
  "U.S. Army",
  "Ricky Schroder",
  "Daws Brothers",
  "Private school",
  "Bullfrog Machining",
  "FidgetCraft",
  "Lanier Technical College",
  "Theatrical production",
  "Self-published (YouTube)",
  "AnswerAxis",
  "SafeFamily",
];

// Canonical Format / Topic tag set — these are what surface as the
// Format facet on the public lane archives.
const FORMAT_TAGS = [
  "feature",
  "short",
  "broadcast",
  "reality",
  "commercial",
  "branded",
  "social",
  "theatrical",
  "indie",
  "documentary",
  "narrative",
  "prop",
  "fabrication",
  "product",
  "maker",
  "recognition",
  "bts",
];

function initialTags(asset: AssetWithMeta): string[] {
  // Pre-populate toggles with inherited tags merged with any saved override.
  // After save, override.tags REPLACES inherited tags on the public site,
  // so the toggle state should fully describe what the asset gets.
  const inherited = (asset.tags ?? []).map((t) => t.toLowerCase());
  const override = asset.override?.tags;
  if (override) return override.map((t) => t.toLowerCase());
  return Array.from(new Set(inherited));
}

function AdminAssetRow({ asset }: { asset: AssetWithMeta }) {
  const [hidden, setHidden] = useState(Boolean(asset.override?.hidden));
  const [title, setTitle] = useState(asset.override?.title ?? "");
  const [caption, setCaption] = useState(asset.override?.caption ?? asset.caption ?? "");
  const [thumbnail, setThumbnail] = useState(asset.override?.thumbnail ?? "");
  const [tags, setTags] = useState<Set<string>>(() => new Set(initialTags(asset)));
  const [extraTagsInput, setExtraTagsInput] = useState("");
  const [client, setClient] = useState(asset.override?.org ?? asset.org ?? "");
  const [sortOrder, setSortOrder] = useState(asset.override?.sortOrder ?? 0);
  const [polishInput, setPolishInput] = useState("");
  const [busy, setBusy] = useState<"save" | "polish" | "upload" | null>(null);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  function toggleTag(t: string) {
    setTags((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  async function uploadFile(file: File) {
    setBusy("upload");
    setStatus(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("url", asset.url);
      fd.append("target", "asset");
      const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error ?? "Upload failed");
      setThumbnail(data.url);
      setStatus({ kind: "ok", msg: `Uploaded → ${data.url}` });
    } catch (e) {
      setStatus({ kind: "err", msg: e instanceof Error ? e.message : "Upload failed" });
    } finally {
      setBusy(null);
    }
  }

  async function save() {
    setBusy("save");
    setStatus(null);
    try {
      // Merge toggled tags with any extra free-text tags.
      const extras = extraTagsInput
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean);
      const finalTags = Array.from(new Set([...tags, ...extras]));
      const r = await fetch("/api/admin/asset", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          url: asset.url,
          patch: {
            hidden,
            title: title.trim(),
            caption: caption.trim() === (asset.caption ?? "").trim() ? "" : caption.trim(),
            thumbnail: thumbnail.trim(),
            tags: finalTags,
            org: client.trim() === (asset.org ?? "").trim() ? "" : client.trim(),
            sortOrder: Number(sortOrder) || 0,
          },
        }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error ?? "Save failed");
      setStatus({ kind: "ok", msg: "Saved" });
    } catch (e) {
      setStatus({ kind: "err", msg: e instanceof Error ? e.message : "Save failed" });
    } finally {
      setBusy(null);
    }
  }

  async function polish() {
    const seed = polishInput.trim() || caption.trim();
    if (!seed) {
      setStatus({ kind: "err", msg: "Type something to polish, or have a caption to start from" });
      return;
    }
    setBusy("polish");
    setStatus(null);
    try {
      const r = await fetch("/api/admin/polish", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text: seed,
          context: {
            title: title || asset.title,
            role: (asset.roles ?? []).join(", "),
            org: asset.parentTitle,
            year: asset.year,
          },
        }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error ?? "Polish failed");
      setCaption(data.text);
      setStatus({ kind: "ok", msg: "Polished — review and save" });
    } catch (e) {
      setStatus({ kind: "err", msg: e instanceof Error ? e.message : "Polish failed" });
    } finally {
      setBusy(null);
    }
  }

  const ytId = asset.url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)?.[1];
  const vimeoId = asset.url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];
  const driveId = asset.url.match(/drive\.google\.com\/file\/d\/([\w-]+)/)?.[1];
  const igCode = asset.url.match(/instagram\.com\/(?:[\w.]+\/)?(?:p|reel|reels)\/([\w-]+)/)?.[1];

  // Suggested thumbnail options the user can click to set.
  const suggestions: { label: string; url: string }[] = [];
  if (ytId) {
    suggestions.push(
      { label: "YT cover", url: `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg` },
      { label: "YT default", url: `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` },
      { label: "YT frame 1", url: `https://i.ytimg.com/vi/${ytId}/1.jpg` },
      { label: "YT frame 2", url: `https://i.ytimg.com/vi/${ytId}/2.jpg` },
      { label: "YT frame 3", url: `https://i.ytimg.com/vi/${ytId}/3.jpg` }
    );
  }
  if (vimeoId) {
    suggestions.push({ label: "Vimeo poster", url: `https://vumbnail.com/${vimeoId}.jpg` });
    suggestions.push({ label: "Vimeo large", url: `https://vumbnail.com/${vimeoId}_large.jpg` });
  }
  if (driveId) {
    suggestions.push({ label: "Drive frame", url: `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280` });
  }
  if (igCode) {
    suggestions.push({ label: "IG cached", url: `/portfolio/ig-thumbs/${igCode}.jpg` });
  }

  const previewThumb =
    thumbnail ||
    asset.thumbnail ||
    (ytId && `https://i.ytimg.com/vi/${ytId}/mqdefault.jpg`) ||
    (vimeoId && `https://vumbnail.com/${vimeoId}.jpg`) ||
    (driveId && `https://drive.google.com/thumbnail?id=${driveId}&sz=w400`) ||
    (igCode && `/portfolio/ig-thumbs/${igCode}.jpg`) ||
    null;

  return (
    <article
      className={[
        "rounded-xl border bg-paper p-3 transition dark:bg-ink/40",
        hidden ? "border-red-500/50 opacity-60" : "border-ink/10 dark:border-paper/15",
      ].join(" ")}
    >
      <div className="flex gap-3">
        <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-md bg-ink/10 dark:bg-paper/10">
          {previewThumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewThumb} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" loading="lazy" />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              {LANE_LABEL[asset.lane]} · {asset.source} {asset.year ? `· ${asset.year}` : ""}
            </p>
            <a
              href={asset.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[11px] text-ink-muted hover:text-accent dark:text-paper-muted"
            >
              open <IconArrowUpRight className="h-3 w-3" />
            </a>
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted dark:text-paper-muted">
            {asset.parentTitle}
          </p>
          <h3 className="mt-1 line-clamp-1 font-serif text-sm leading-snug">{title || asset.title}</h3>
        </div>
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-2">
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={hidden}
            onChange={(e) => setHidden(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-ink/30 text-accent focus:ring-accent"
          />
          Hide from site
        </label>
        <label className="flex items-center gap-2 text-xs">
          Sort
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="w-16 rounded border border-ink/15 bg-transparent px-1.5 py-0.5 text-xs focus:border-accent focus:outline-none dark:border-paper/20"
            placeholder="0"
          />
          <span className="text-ink-muted dark:text-paper-muted">(lower = earlier; default 0)</span>
        </label>

        <label className="md:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
            Title override (optional — leave empty to use original)
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={asset.title}
            className="mt-1 w-full rounded border border-ink/15 bg-transparent px-2 py-1 text-xs focus:border-accent focus:outline-none dark:border-paper/20"
          />
        </label>

        <label className="md:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
            Caption (live on card)
          </span>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded border border-ink/15 bg-transparent px-2 py-1 text-xs focus:border-accent focus:outline-none dark:border-paper/20"
          />
        </label>

        <div className="md:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
            Custom thumbnail
          </span>

          {/* Upload control — drag-drop or click to upload from screenshot */}
          <label
            className={[
              "mt-1 flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 py-2 text-xs transition",
              busy === "upload"
                ? "border-accent bg-accent/5 text-accent"
                : "border-ink/20 text-ink-muted hover:border-accent hover:text-accent dark:border-paper/20 dark:text-paper-muted",
            ].join(" ")}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "copy";
            }}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) uploadFile(f);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 8l-5-5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="flex-1">
              {busy === "upload"
                ? "Uploading…"
                : "Drop a screenshot here, or click to upload (JPG/PNG/WebP)"}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadFile(f);
                e.target.value = "";
              }}
              disabled={busy === "upload"}
            />
          </label>

          <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-start">
            <div className="flex-1">
              <input
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="…or paste a URL: https://… or /portfolio/xyz.jpg"
                className="w-full rounded border border-ink/15 bg-transparent px-2 py-1 text-xs focus:border-accent focus:outline-none dark:border-paper/20"
              />
              {suggestions.length ? (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
                    Quick pick:
                  </span>
                  {suggestions.map((s) => (
                    <button
                      key={s.url}
                      type="button"
                      onClick={() => setThumbnail(s.url)}
                      className={[
                        "rounded-full border px-2 py-0.5 text-[10px] transition",
                        thumbnail === s.url
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-ink/15 text-ink-muted hover:border-accent hover:text-accent dark:border-paper/15 dark:text-paper-muted",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  ))}
                  {thumbnail ? (
                    <button
                      type="button"
                      onClick={() => setThumbnail("")}
                      className="rounded-full border border-red-500/40 px-2 py-0.5 text-[10px] text-red-500 hover:bg-red-500/10"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
            {thumbnail ? (
              <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-md border border-ink/15 bg-ink/5 dark:border-paper/15 dark:bg-paper/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnail}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
            Currently tagged with
          </span>
          <div className="mt-1 flex flex-wrap gap-1">
            {(asset.roles ?? []).map((r) => (
              <span
                key={`role-${r}`}
                className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] font-medium capitalize text-accent"
                title="Role parsed from the parent entry"
              >
                <span className="text-[9px] uppercase tracking-[0.14em] opacity-60">role</span>
                {r}
              </span>
            ))}
            {(asset.tags ?? [])
              .filter((t) => !(asset.override?.tags ?? []).includes(t))
              .map((t) => (
                <span
                  key={`inh-${t}`}
                  className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-paper-muted/40 px-2 py-0.5 text-[10px] capitalize text-ink-muted dark:border-paper/15 dark:bg-ink/30 dark:text-paper-muted"
                  title="Inherited from the parent entry's tags"
                >
                  <span className="text-[9px] uppercase tracking-[0.14em] opacity-60">inh</span>
                  {t}
                </span>
              ))}
            {(asset.override?.tags ?? []).map((t) => (
              <span
                key={`ovr-${t}`}
                className="inline-flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[10px] capitalize text-paper dark:bg-paper dark:text-ink"
                title="Admin-added tag (override)"
              >
                <span className="text-[9px] uppercase tracking-[0.14em] opacity-60">ovr</span>
                {t}
              </span>
            ))}
            {(asset.roles ?? []).length === 0 &&
            (asset.tags ?? []).length === 0 &&
            (asset.override?.tags ?? []).length === 0 ? (
              <span className="text-[10px] italic text-ink-muted dark:text-paper-muted">
                No tags yet
              </span>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
              Client / org (one per asset — drives the Client filter chip)
            </span>
            <span className="text-[9px] uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
              {client && client !== (asset.org ?? "") ? "override" : "inherited"}
            </span>
          </div>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            placeholder="Disney Consumer Products, Daws Brothers…"
            className="mt-1 w-full rounded border border-ink/15 bg-transparent px-2 py-1 text-xs focus:border-accent focus:outline-none dark:border-paper/20"
          />
          <div className="mt-1.5 flex flex-wrap gap-1">
            {CLIENT_PRESETS.map((c) => {
              const sel = client === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setClient(sel ? "" : c)}
                  aria-pressed={sel}
                  className={[
                    "rounded-full border px-2 py-0.5 text-[10px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                    sel
                      ? "border-accent bg-accent text-paper shadow-sm"
                      : "border-ink/15 text-ink-muted hover:border-accent hover:text-accent dark:border-paper/15 dark:text-paper-muted",
                  ].join(" ")}
                >
                  {sel ? <span aria-hidden="true">✓ </span> : null}
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
              Tags (toggle on/off — these REPLACE inherited tags on save)
            </span>
            <span className="text-[9px] uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
              {tags.size} selected
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {FORMAT_TAGS.map((t) => {
              const sel = tags.has(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  aria-pressed={sel}
                  className={[
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                    sel
                      ? "border-accent bg-accent text-paper shadow-sm"
                      : "border-ink/15 text-ink-muted hover:border-accent hover:text-accent dark:border-paper/15 dark:text-paper-muted",
                  ].join(" ")}
                >
                  {sel ? <span aria-hidden="true">✓</span> : null}
                  {t}
                </button>
              );
            })}
          </div>
          <label className="mt-1.5 block">
            <span className="text-[9px] uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
              Plus extra tags (optional, comma-separated)
            </span>
            <input
              type="text"
              value={extraTagsInput}
              onChange={(e) => setExtraTagsInput(e.target.value)}
              placeholder="custom, free-form tags"
              className="mt-0.5 w-full rounded border border-ink/15 bg-transparent px-2 py-1 text-xs focus:border-accent focus:outline-none dark:border-paper/20"
            />
          </label>
        </div>
      </div>

      <details className="mt-2 rounded-md border border-ink/10 bg-paper-muted/30 p-2 dark:border-paper/10 dark:bg-ink/20">
        <summary className="cursor-pointer text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
          ✨ Polish caption with AI
        </summary>
        <div className="mt-2 space-y-1.5">
          <textarea
            value={polishInput}
            onChange={(e) => setPolishInput(e.target.value)}
            rows={2}
            placeholder="Describe in your own words. Leave empty to polish the existing caption."
            className="w-full rounded border border-ink/15 bg-paper px-2 py-1 text-xs focus:border-accent focus:outline-none dark:border-paper/20 dark:bg-ink/40"
          />
          <button
            type="button"
            onClick={polish}
            disabled={busy !== null}
            className="inline-flex items-center gap-1 rounded-full border border-accent px-2.5 py-0.5 text-[11px] font-medium text-accent transition hover:bg-accent hover:text-paper disabled:opacity-50"
          >
            <IconSpark className="h-3 w-3" />
            {busy === "polish" ? "Polishing…" : "Polish"}
          </button>
        </div>
      </details>

      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="text-[11px]">
          {status ? (
            <span className={status.kind === "ok" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
              {status.msg}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={save}
          disabled={busy !== null}
          className="rounded-full bg-ink px-3 py-1 text-[11px] font-medium text-paper transition hover:bg-accent disabled:opacity-50 dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
        >
          {busy === "save" ? "Saving…" : "Save"}
        </button>
      </div>
    </article>
  );
}

export function AdminAssetGrid({ assets }: { assets: AssetWithMeta[] }) {
  const [query, setQuery] = useState("");
  const [lane, setLane] = useState<"all" | Lane>("all");
  const [roles, setRoles] = useState<Set<string>>(new Set());
  const [showHidden, setShowHidden] = useState(true);

  // Role chips scoped to the current lane.
  const availableRoles = useMemo(() => {
    const inScope = lane === "all" ? assets : assets.filter((a) => a.lane === lane);
    const counts = new Map<string, number>();
    for (const a of inScope) {
      for (const r of a.roles ?? []) counts.set(r, (counts.get(r) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([role, count]) => ({ role, count }));
  }, [assets, lane]);

  function toggleRole(r: string) {
    setRoles((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  }

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      if (lane !== "all" && a.lane !== lane) return false;
      if (roles.size > 0) {
        const has = (a.roles ?? []).some((r) => roles.has(r));
        if (!has) return false;
      }
      if (!showHidden && a.override?.hidden) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = [a.title, a.parentTitle, a.url, ...(a.tags ?? []), ...(a.override?.tags ?? []), ...(a.roles ?? [])]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [assets, lane, roles, query, showHidden]);

  return (
    <div>
      <div className="sticky top-14 z-30 -mx-6 mb-4 border-b border-ink/10 bg-paper/85 px-6 py-3 backdrop-blur dark:border-paper/10 dark:bg-ink/85">
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "video", "education", "making", "building"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLane(l)}
              aria-pressed={lane === l}
              className={[
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                lane === l
                  ? "border-ink bg-ink text-paper dark:border-paper dark:bg-paper dark:text-ink"
                  : "border-ink/15 text-ink-muted hover:border-accent hover:text-accent dark:border-paper/20 dark:text-paper-muted",
              ].join(" ")}
            >
              {l === "all" ? "All" : LANE_LABEL[l]}
              <span className="ml-1.5 text-[10px] tabular-nums opacity-70">
                {l === "all" ? assets.length : assets.filter((a) => a.lane === l).length}
              </span>
            </button>
          ))}
          <label className="ml-2 inline-flex items-center gap-1.5 text-xs text-ink-muted dark:text-paper-muted">
            <input
              type="checkbox"
              checked={showHidden}
              onChange={(e) => setShowHidden(e.target.checked)}
              className="h-3.5 w-3.5"
            />
            Show hidden
          </label>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="ml-auto w-56 rounded-full border border-ink/15 bg-transparent px-3 py-1.5 text-sm focus:border-accent focus:outline-none dark:border-paper/20"
          />
        </div>

        {availableRoles.length ? (
          <div className="-mx-6 mt-2 overflow-x-auto px-6">
            <div className="flex min-w-max items-center gap-1.5 text-xs">
              <span className="mr-1 font-semibold uppercase tracking-[0.18em] text-accent">
                Role
              </span>
              {roles.size > 0 ? (
                <button
                  onClick={() => setRoles(new Set())}
                  className="rounded-full border border-ink/15 px-2.5 py-1 text-ink-muted hover:border-accent hover:text-accent dark:border-paper/15 dark:text-paper-muted"
                >
                  Clear ({roles.size})
                </button>
              ) : null}
              {availableRoles.map(({ role: r, count }) => {
                const sel = roles.has(r);
                return (
                  <button
                    key={r}
                    onClick={() => toggleRole(r)}
                    aria-pressed={sel}
                    className={[
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 capitalize transition",
                      sel
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-ink/10 text-ink-muted hover:border-accent hover:text-accent dark:border-paper/15 dark:text-paper-muted",
                    ].join(" ")}
                  >
                    {r}
                    <span className="text-[10px] opacity-60">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <p className="mt-2 text-[11px] text-ink-muted dark:text-paper-muted">
          Showing {filtered.length} of {assets.length} assets
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {filtered.map((a) => (
          <AdminAssetRow key={a.id} asset={a} />
        ))}
      </div>
    </div>
  );
}
