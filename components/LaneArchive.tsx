"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Asset, Lane } from "@/lib/portfolio";
import { AssetCard } from "./AssetCard";
import { AssetLightbox } from "./AssetLightbox";
import { IconArrowRight } from "./icons";

const LANE_TITLE: Record<Lane, string> = {
  video: "Video work.",
  education: "Teaching.",
  making: "Maker work.",
  building: "Apps & AI.",
};

type SortKey = "featured" | "newest" | "oldest" | "title";

function clientsFor(asset: Asset): string[] {
  if (!asset.org) return [];
  return asset.org
    .split(/[\/·,|]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length < 40);
}

function formatFor(asset: Asset): string[] {
  // Derive a "format" facet from tags, source, and parent context.
  // Lets a hiring manager filter to "Feature" or "Broadcast" without scrolling.
  const out: string[] = [];
  const tags = (asset.tags ?? []).map((t) => t.toLowerCase());
  if (tags.includes("feature")) out.push("Feature");
  if (tags.includes("short")) out.push("Short");
  if (tags.includes("broadcast")) out.push("Broadcast");
  if (tags.includes("reality")) out.push("Reality");
  if (tags.includes("commercial")) out.push("Commercial");
  if (tags.includes("branded")) out.push("Branded");
  if (tags.includes("social")) out.push("Social");
  if (tags.includes("theatrical")) out.push("Theatrical");
  if (tags.includes("indie") && !out.includes("Feature") && !out.includes("Short")) out.push("Indie");
  if (tags.includes("recognition")) out.push("Recognition");
  if (tags.includes("product")) out.push("Product");
  if (tags.includes("prop")) out.push("Prop");
  if (tags.includes("fabrication")) out.push("Fabrication");
  if (tags.includes("maker")) out.push("Maker");
  if (asset.source === "instagram") out.push("Social");
  // Dedupe
  return Array.from(new Set(out));
}

function sortYearKey(year: string | undefined): number {
  if (!year) return 0;
  const m = year.match(/(19|20|21)\d{2}/g);
  if (!m) return 0;
  return Math.max(...m.map((s) => parseInt(s, 10)));
}

export function LaneArchive({
  assets,
  lane,
  eyebrow,
  title,
  intro,
}: {
  assets: Asset[];
  lane: Lane;
  eyebrow: string;
  title?: string;
  intro: string;
}) {
  const [roles, setRoles] = useState<Set<string>>(new Set());
  const [clients, setClients] = useState<Set<string>>(new Set());
  const [formats, setFormats] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("featured");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isInitialMount = useRef(true);

  // Read filters from URL hash on mount + hashchange
  useEffect(() => {
    if (typeof window === "undefined") return;
    const apply = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) {
        setRoles(new Set());
        setClients(new Set());
        setFormats(new Set());
        setQuery("");
        return;
      }
      const params = new URLSearchParams(hash);
      const r = params.get("role");
      setRoles(r ? new Set(r.split(",").filter(Boolean)) : new Set());
      const c = params.get("client");
      setClients(c ? new Set(c.split(",").filter(Boolean)) : new Set());
      const f = params.get("format");
      setFormats(f ? new Set(f.split(",").filter(Boolean)) : new Set());
      const q = params.get("q") ?? "";
      setQuery(q);
      const s = params.get("sort");
      if (s === "oldest" || s === "title" || s === "newest" || s === "featured") setSortKey(s);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  // Write filters back to URL hash
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (roles.size) params.set("role", Array.from(roles).join(","));
    if (clients.size) params.set("client", Array.from(clients).join(","));
    if (formats.size) params.set("format", Array.from(formats).join(","));
    if (query) params.set("q", query);
    if (sortKey !== "featured") params.set("sort", sortKey);
    const next = params.toString();
    const newHash = next ? `#${next}` : "";
    if (newHash !== window.location.hash) {
      const url = window.location.pathname + window.location.search + newHash;
      window.history.replaceState(null, "", url);
    }
  }, [roles, clients, formats, query, sortKey]);

  const laneAssets = useMemo(() => assets.filter((a) => a.lane === lane), [assets, lane]);

  const availableRoles = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of laneAssets) for (const r of a.roles ?? []) counts.set(r, (counts.get(r) ?? 0) + 1);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14)
      .map(([k, count]) => ({ key: k, count }));
  }, [laneAssets]);

  const availableClients = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of laneAssets) for (const c of clientsFor(a)) counts.set(c, (counts.get(c) ?? 0) + 1);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 18)
      .map(([k, count]) => ({ key: k, count }));
  }, [laneAssets]);

  const availableFormats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of laneAssets) for (const f of formatFor(a)) counts.set(f, (counts.get(f) ?? 0) + 1);
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([k, count]) => ({ key: k, count }));
  }, [laneAssets]);

  const filtered = useMemo(() => {
    const out = laneAssets.filter((a) => {
      if (roles.size > 0) {
        const has = (a.roles ?? []).some((r) => roles.has(r));
        if (!has) return false;
      }
      if (clients.size > 0) {
        const has = clientsFor(a).some((c) => clients.has(c));
        if (!has) return false;
      }
      if (formats.size > 0) {
        const has = formatFor(a).some((f) => formats.has(f));
        if (!has) return false;
      }
      if (query) {
        const q = query.toLowerCase();
        const hay = [a.title, a.parentTitle, a.org ?? "", ...(a.tags ?? []), ...(a.roles ?? [])]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    return [...out].sort((a, b) => {
      if (sortKey === "title") return a.title.localeCompare(b.title);
      const ay = sortYearKey(a.year);
      const by = sortYearKey(b.year);
      if (sortKey === "featured") {
        // Heavyweight studio orgs lead the video archive. For other
        // lanes, fall through to pinned + year-desc.
        if (lane === "video") {
          const studioPriority = (org: string | undefined): number => {
            const o = (org ?? "").toLowerCase();
            if (o.includes("disney")) return 4;
            if (o.includes("national geographic")) return 3;
            if (o.includes("hallmark")) return 2;
            if (o.includes("ricky schroder") || o.includes("u.s. army")) return 1;
            return 0;
          };
          const ap = studioPriority(a.org);
          const bp = studioPriority(b.org);
          if (ap !== bp) return bp - ap;
        }
        // Pinned-parent assets next, then year-desc.
        const ap = a.pinned ? 1 : 0;
        const bp = b.pinned ? 1 : 0;
        if (ap !== bp) return bp - ap;
        return by - ay;
      }
      if (sortKey === "oldest") return ay - by;
      return by - ay;
    });
  }, [laneAssets, roles, clients, formats, query, sortKey]);

  function makeToggle(setter: React.Dispatch<React.SetStateAction<Set<string>>>) {
    return (v: string) =>
      setter((prev) => {
        const next = new Set(prev);
        if (next.has(v)) next.delete(v);
        else next.add(v);
        return next;
      });
  }

  const toggleRole = makeToggle(setRoles);
  const toggleClient = makeToggle(setClients);
  const toggleFormat = makeToggle(setFormats);

  const totalSelected = roles.size + clients.size + formats.size;

  function clearAll() {
    setRoles(new Set());
    setClients(new Set());
    setFormats(new Set());
    setQuery("");
  }

  return (
    <div className="pt-12">
      <header className="mx-auto max-w-6xl px-6 pb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
        <h2
          className="mt-2 font-serif leading-[1.04] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 5.5vw, 3rem)" }}
        >
          {title ?? LANE_TITLE[lane]}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-ink-muted dark:text-paper-muted md:text-lg">
          {intro}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ink-muted dark:text-paper-muted">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
      </header>

      <div className="sticky top-14 z-30 border-y border-ink/10 bg-paper/85 backdrop-blur-md dark:border-paper/10 dark:bg-ink/85">
        <div className="mx-auto max-w-6xl space-y-2 px-6 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-1.5 text-xs text-ink-muted dark:text-paper-muted">
              <span className="font-semibold uppercase tracking-[0.18em] text-accent">Sort</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="rounded-full border border-ink/15 bg-transparent px-2.5 py-1 text-xs text-ink focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:border-paper/15 dark:text-paper"
              >
                <option value="featured">Featured first</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title (A–Z)</option>
              </select>
            </label>

            {totalSelected > 0 || query ? (
              <button
                onClick={clearAll}
                className="rounded-full border border-ink/15 px-2.5 py-1 text-xs text-ink-muted hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:border-paper/15 dark:text-paper-muted"
              >
                Clear all{totalSelected ? ` (${totalSelected})` : ""}
              </button>
            ) : null}

            <div className="ml-auto flex items-center gap-1.5 rounded-full border border-ink/15 bg-transparent pl-2.5 pr-1 focus-within:border-accent dark:border-paper/15">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                aria-hidden="true"
                className="text-ink-muted dark:text-paper-muted"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search title, client, role…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search the archive"
                className="w-52 bg-transparent py-1.5 text-sm placeholder:text-ink-muted focus:outline-none dark:placeholder:text-paper-muted"
              />
            </div>
          </div>

          <FilterRow
            label="Role"
            items={availableRoles}
            selected={roles}
            onToggle={toggleRole}
            capitalize
          />
          <FilterRow
            label="Format"
            items={availableFormats}
            selected={formats}
            onToggle={toggleFormat}
          />
          <FilterRow
            label="Client"
            items={availableClients}
            selected={clients}
            onToggle={toggleClient}
          />
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 p-10 text-center text-ink-muted dark:border-paper/15 dark:text-paper-muted">
            <p>No pieces match these filters.</p>
            <button
              onClick={clearAll}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent dark:border-paper/30 dark:text-paper"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((a, i) => (
              <AssetCard key={a.id} asset={a} onOpen={() => setOpenIndex(i)} />
            ))}
          </div>
        )}
      </section>

      <AssetLightbox
        assets={filtered}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() =>
          setOpenIndex((cur) => (cur === null || cur <= 0 ? cur : cur - 1))
        }
        onNext={() =>
          setOpenIndex((cur) =>
            cur === null || cur >= filtered.length - 1 ? cur : cur + 1
          )
        }
      />

      <section className="mx-auto mt-8 max-w-6xl px-6 text-center">
        <Link
          href="/#hire"
          className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-paper/30 dark:hover:border-accent dark:hover:text-accent"
        >
          Like what you see? Get in touch <IconArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}

function FilterRow({
  label,
  items,
  selected,
  onToggle,
  capitalize,
}: {
  label: string;
  items: { key: string; count: number }[];
  selected: Set<string>;
  onToggle: (k: string) => void;
  capitalize?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <div className="border-t border-ink/5 pt-2 dark:border-paper/5">
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="mr-1 w-14 shrink-0 font-semibold uppercase tracking-[0.18em] text-accent">
          {label}
        </span>
        {items.map(({ key: k, count }) => {
          const sel = selected.has(k);
          return (
            <button
              key={k}
              onClick={() => onToggle(k)}
              aria-pressed={sel}
              className={[
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
                capitalize ? "capitalize" : "",
                sel
                  ? "border-accent bg-accent text-paper shadow-sm"
                  : "border-ink/10 text-ink-muted hover:border-accent hover:text-accent dark:border-paper/15 dark:text-paper-muted",
              ].join(" ")}
            >
              {sel ? <span aria-hidden="true">✓</span> : null}
              {k}
              <span className={["text-[10px]", sel ? "opacity-80" : "opacity-60"].join(" ")}>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
