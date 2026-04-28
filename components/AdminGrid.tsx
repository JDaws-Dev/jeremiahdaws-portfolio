"use client";

import { useState } from "react";
import type { PortfolioEntry } from "@/lib/portfolio";
import { IconArrowUpRight, IconSpark } from "./icons";

type EntryRow = PortfolioEntry & { _hidden?: boolean };

const LANE_LABEL: Record<string, string> = {
  video: "Video",
  education: "Education",
  making: "Making",
  building: "Apps & AI",
};

function AdminRow({ entry }: { entry: EntryRow }) {
  const [hidden, setHidden] = useState(Boolean(entry._hidden));
  const [thumbnail, setThumbnail] = useState(entry.thumbnail ?? "");
  const [description, setDescription] = useState(entry.summary ?? "");
  const [polishInput, setPolishInput] = useState("");
  const [busy, setBusy] = useState<"save" | "polish" | null>(null);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  async function save() {
    setBusy("save");
    setStatus(null);
    try {
      const r = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          slug: entry.slug,
          patch: {
            hidden,
            thumbnail,
            description: description === entry.summary ? "" : description,
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
    if (!polishInput.trim()) {
      setStatus({ kind: "err", msg: "Type a rough description first" });
      return;
    }
    setBusy("polish");
    setStatus(null);
    try {
      const r = await fetch("/api/admin/polish", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text: polishInput,
          context: { title: entry.title, role: entry.role, org: entry.org, year: entry.year },
        }),
      });
      const data = await r.json();
      if (!data.ok) throw new Error(data.error ?? "Polish failed");
      setDescription(data.text);
      setStatus({ kind: "ok", msg: "Polished — review and save" });
    } catch (e) {
      setStatus({ kind: "err", msg: e instanceof Error ? e.message : "Polish failed" });
    } finally {
      setBusy(null);
    }
  }

  return (
    <article
      className={[
        "rounded-2xl border bg-paper p-5 transition dark:bg-ink/40",
        hidden ? "border-red-500/50 opacity-60" : "border-ink/10 dark:border-paper/15",
      ].join(" ")}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            {LANE_LABEL[entry.lane]} · {entry.year || "—"}
          </p>
          <h3 className="mt-1 font-serif text-xl leading-tight">{entry.title}</h3>
          <p className="mt-0.5 text-xs text-ink-muted dark:text-paper-muted">
            {entry.role} {entry.org ? `· ${entry.org}` : ""}
          </p>
        </div>
        <a
          href={`/work#${entry.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-ink-muted underline-offset-2 hover:text-accent hover:underline dark:text-paper-muted"
        >
          slug: {entry.slug} <IconArrowUpRight className="h-3 w-3" />
        </a>
      </header>

      <div className="mt-4 grid gap-4 md:grid-cols-[180px_1fr]">
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              className="h-4 w-4 rounded border-ink/30 text-accent focus:ring-accent"
            />
            Hide from site
          </label>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
              Thumbnail URL
            </label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="/portfolio/foo.jpg or https://..."
              className="mt-1 w-full rounded-md border border-ink/15 bg-transparent px-2.5 py-1.5 text-xs focus:border-accent focus:outline-none dark:border-paper/20"
            />
            {thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnail}
                alt=""
                className="mt-2 aspect-video w-full rounded-md border border-ink/10 object-cover dark:border-paper/15"
              />
            ) : null}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
              Description (live on site)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-md border border-ink/15 bg-transparent px-2.5 py-1.5 text-sm focus:border-accent focus:outline-none dark:border-paper/20"
            />
          </div>

          <details className="rounded-md border border-ink/10 bg-paper-muted/40 p-3 dark:border-paper/10 dark:bg-ink/20">
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              ✨ Polish with AI
            </summary>
            <div className="mt-3 space-y-2">
              <textarea
                value={polishInput}
                onChange={(e) => setPolishInput(e.target.value)}
                rows={3}
                placeholder="Type a rough description in your own words. AI rewrites it to match the site's voice."
                className="w-full rounded-md border border-ink/15 bg-paper px-2.5 py-1.5 text-sm focus:border-accent focus:outline-none dark:border-paper/20 dark:bg-ink/40"
              />
              <button
                type="button"
                onClick={polish}
                disabled={busy !== null}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent px-3 py-1 text-xs font-medium text-accent transition hover:bg-accent hover:text-paper disabled:opacity-50"
              >
                <IconSpark className="h-3.5 w-3.5" />
                {busy === "polish" ? "Polishing…" : "Polish"}
              </button>
            </div>
          </details>
        </div>
      </div>

      <footer className="mt-4 flex items-center justify-between gap-3">
        <div className="text-xs">
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
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-paper transition hover:bg-accent disabled:opacity-50 dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
        >
          {busy === "save" ? "Saving…" : "Save"}
        </button>
      </footer>
    </article>
  );
}

export function AdminGrid({ entries }: { entries: EntryRow[] }) {
  const [query, setQuery] = useState("");
  const [lane, setLane] = useState<"all" | "video" | "education" | "making" | "building">("all");

  const filtered = entries.filter((e) => {
    if (lane !== "all" && e.lane !== lane) return false;
    if (query) {
      const q = query.toLowerCase();
      const hay = [e.title, e.org ?? "", e.role, e.summary, e.slug].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <div>
      <div className="sticky top-14 z-30 -mx-6 mb-6 border-b border-ink/10 bg-paper/85 px-6 py-3 backdrop-blur dark:border-paper/10 dark:bg-ink/85">
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
            </button>
          ))}
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, slug, description…"
            className="ml-auto w-64 rounded-full border border-ink/15 bg-transparent px-3 py-1.5 text-sm focus:border-accent focus:outline-none dark:border-paper/20"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((e) => (
          <AdminRow key={e.slug} entry={e} />
        ))}
      </div>
    </div>
  );
}
