import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const OVERRIDES_PATH = path.join(process.cwd(), "content", "overrides.json");
const IG_THUMB_MAP_PATH = path.join(process.cwd(), "scripts", "ig-thumb-map.json");
const IG_CAPTION_MAP_PATH = path.join(process.cwd(), "scripts", "ig-caption-map.json");
const VIDEO_DESC_MAP_PATH = path.join(process.cwd(), "scripts", "video-description-map.json");
const VIDEO_POLISHED_MAP_PATH = path.join(process.cwd(), "scripts", "video-polished-caption-map.json");

let _igThumbMap: Record<string, string> | null = null;
function igThumbMap(): Record<string, string> {
  if (_igThumbMap) return _igThumbMap;
  try {
    if (!fs.existsSync(IG_THUMB_MAP_PATH)) return (_igThumbMap = {});
    _igThumbMap = JSON.parse(fs.readFileSync(IG_THUMB_MAP_PATH, "utf8"));
    return _igThumbMap!;
  } catch {
    return (_igThumbMap = {});
  }
}

let _igCaptionMap: Record<string, string> | null = null;
function igCaptionMap(): Record<string, string> {
  if (_igCaptionMap) return _igCaptionMap;
  try {
    if (!fs.existsSync(IG_CAPTION_MAP_PATH)) return (_igCaptionMap = {});
    _igCaptionMap = JSON.parse(fs.readFileSync(IG_CAPTION_MAP_PATH, "utf8"));
    return _igCaptionMap!;
  } catch {
    return (_igCaptionMap = {});
  }
}

let _videoDescMap: Record<string, string> | null = null;
function videoDescMap(): Record<string, string> {
  if (_videoDescMap) return _videoDescMap;
  try {
    if (!fs.existsSync(VIDEO_DESC_MAP_PATH)) return (_videoDescMap = {});
    _videoDescMap = JSON.parse(fs.readFileSync(VIDEO_DESC_MAP_PATH, "utf8"));
    return _videoDescMap!;
  } catch {
    return (_videoDescMap = {});
  }
}

let _videoPolishedMap: Record<string, string> | null = null;
function videoPolishedMap(): Record<string, string> {
  if (_videoPolishedMap) return _videoPolishedMap;
  try {
    if (!fs.existsSync(VIDEO_POLISHED_MAP_PATH)) return (_videoPolishedMap = {});
    _videoPolishedMap = JSON.parse(fs.readFileSync(VIDEO_POLISHED_MAP_PATH, "utf8"));
    return _videoPolishedMap!;
  } catch {
    return (_videoPolishedMap = {});
  }
}

function igShortcode(url: string): string | null {
  const m = url.match(/instagram\.com\/(?:[\w.]+\/)?(?:p|reel|reels)\/([\w-]+)/);
  return m ? m[1] : null;
}

function parseRoles(role: string): string[] {
  if (!role) return [];
  return role
    .split(/[/·,&|+]/)
    .map((s) => s.trim().toLowerCase())
    .map((s) => s.replace(/\s+/g, " "))
    .filter(Boolean)
    .map((s) => {
      // Normalize common variants
      if (/^director$/i.test(s)) return "director";
      if (/producer/i.test(s)) return "producer";
      if (/editor/i.test(s)) return "editor";
      if (/cinemato|dp\b|director of photo/i.test(s)) return "cinematographer";
      if (/designer/i.test(s)) return "designer";
      if (/fabricator/i.test(s)) return "fabricator";
      if (/machinist/i.test(s)) return "machinist";
      if (/founder/i.test(s)) return "founder";
      if (/host/i.test(s)) return "host";
      if (/teacher|instructor|department head/i.test(s)) return "teacher";
      if (/builder/i.test(s)) return "builder";
      if (/owner/i.test(s)) return "owner";
      if (/competitor/i.test(s)) return "competitor";
      if (/content creator/i.test(s)) return "content creator";
      if (/shop assistant/i.test(s)) return "shop assistant";
      return s;
    });
}

export type EntryOverride = {
  hidden?: boolean;
  thumbnail?: string;
  description?: string;
};

export type AssetOverride = {
  hidden?: boolean;
  title?: string;
  caption?: string;
  thumbnail?: string;
  tags?: string[];
  org?: string;
  sortOrder?: number;
};

export type OverridesV2 = {
  version: 2;
  entries: Record<string, EntryOverride>;
  assets: Record<string, AssetOverride>;
};

export type Overrides = OverridesV2;

export function readOverrides(): Overrides {
  try {
    if (!fs.existsSync(OVERRIDES_PATH)) {
      return { version: 2, entries: {}, assets: {} };
    }
    const raw = fs.readFileSync(OVERRIDES_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.version === 2) {
      return {
        version: 2,
        entries: parsed.entries ?? {},
        assets: parsed.assets ?? {},
      };
    }
    // Auto-migrate v1 (flat entry-keyed map) → v2
    return { version: 2, entries: parsed ?? {}, assets: {} };
  } catch {
    return { version: 2, entries: {}, assets: {} };
  }
}

export function writeOverrides(o: Overrides): void {
  fs.mkdirSync(path.dirname(OVERRIDES_PATH), { recursive: true });
  fs.writeFileSync(OVERRIDES_PATH, JSON.stringify(o, null, 2));
}

export type Lane = "video" | "education" | "making" | "building";

export type EntryLink = { label: string; href: string; kind?: "instagram" | "youtube" | "external" };

export type PortfolioEntry = {
  slug: string;
  title: string;
  role: string;
  year: string;
  lane: Lane;
  org?: string;
  thumbnail?: string;
  embedUrl?: string;
  externalUrl?: string;
  instagramEmbeds?: { url: string; label?: string }[];
  links?: EntryLink[];
  pinned?: boolean;
  tags?: string[];
  summary: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "portfolio");

export function getAllEntries(opts: { includeHidden?: boolean } = {}): PortfolioEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const overrides = readOverrides();
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const entries = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const o = overrides.entries[slug] ?? {};

      // Entry thumbnail resolution order:
      //   1. Entry-level override (set in admin's Entries tab)
      //   2. MDX frontmatter `thumbnail`
      //   3. Asset-level override on the entry's primary URL (embedUrl,
      //      then externalUrl) — lets the Assets-tab upload propagate
      //      to the high-level cards (NetworkCredits, ProductBuilds).
      const primaryUrl = data.embedUrl
        ? String(data.embedUrl)
        : data.externalUrl
        ? String(data.externalUrl)
        : null;
      const primaryAssetThumb = primaryUrl
        ? overrides.assets[normalizeAssetUrl(primaryUrl)]?.thumbnail
        : undefined;

      return {
        slug,
        title: String(data.title ?? slug),
        role: String(data.role ?? ""),
        year: String(data.year ?? ""),
        lane: (data.lane ?? "video") as Lane,
        org: data.org ? String(data.org) : undefined,
        thumbnail:
          o.thumbnail ??
          (data.thumbnail ? String(data.thumbnail) : undefined) ??
          primaryAssetThumb,
        embedUrl: data.embedUrl ? String(data.embedUrl) : undefined,
        externalUrl: data.externalUrl ? String(data.externalUrl) : undefined,
        links: Array.isArray(data.links)
          ? (data.links as EntryLink[]).filter((l) => l && l.href && l.label)
          : undefined,
        instagramEmbeds: Array.isArray(data.instagramEmbeds)
          ? (data.instagramEmbeds as { url: string; label?: string }[]).filter((e) => e && e.url)
          : undefined,
        tags: Array.isArray(data.tags) ? (data.tags as unknown[]).map((t) => String(t)) : undefined,
        pinned: Boolean(data.pinned),
        summary: o.description ?? content.trim(),
        _hidden: Boolean(o.hidden),
      } as PortfolioEntry & { _hidden?: boolean };
    })
    .filter((e) => opts.includeHidden || !e._hidden);
  return entries.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.year.localeCompare(a.year);
  });
}

export function getEntriesByLane(lane: Lane): PortfolioEntry[] {
  return getAllEntries().filter((e) => e.lane === lane);
}

export type AssetSource = "youtube" | "vimeo" | "instagram" | "drive" | "site" | "imdb";

export type Asset = {
  id: string;
  title: string;
  caption?: string;
  source: AssetSource;
  url: string;
  thumbnail?: string;
  parentSlug: string;
  parentTitle: string;
  lane: Lane;
  tags?: string[];
  roles?: string[];
  year?: string;
  org?: string;
  pinned?: boolean;
};

function detectSource(url: string): AssetSource {
  if (/youtu\.?be|youtube\.com/.test(url)) return "youtube";
  if (/vimeo\.com/.test(url)) return "vimeo";
  if (/instagram\.com/.test(url)) return "instagram";
  if (/drive\.google\.com/.test(url)) return "drive";
  if (/imdb\.com/.test(url)) return "imdb";
  return "site";
}

function isAssetLink(url: string): boolean {
  // Don't double-count parent profile links / hub pages.
  if (/^https:\/\/www\.instagram\.com\/[\w.]+\/?$/i.test(url)) return false;
  if (/^https?:\/\/(www\.)?(youtube|youtu)\.[^/]+\/?$/.test(url)) return false;
  // Skip Instagram still-photo posts (/p/...). Only keep reels.
  if (/instagram\.com\/(?:[\w.]+\/)?p\//i.test(url)) return false;
  return /youtu\.?be|youtube\.com|instagram\.com\/(reel|reels)|drive\.google\.com|imdb\.com|vimeo\.com/.test(url);
}

function normalizeAssetUrl(u: string): string {
  try {
    const url = new URL(u);
    for (const p of [...url.searchParams.keys()]) {
      if (/^(utm_|fbclid|si$|igshid|feature)/i.test(p)) url.searchParams.delete(p);
    }
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return u.split("#")[0];
  }
}

export function getAllAssets(opts: { includeHidden?: boolean } = {}): Asset[] {
  const entries = getAllEntries();
  const overrides = readOverrides();
  const thumbs = igThumbMap();
  const captions = igCaptionMap();
  const videoDescs = videoDescMap();
  const videoPolished = videoPolishedMap();
  const seen = new Set<string>();
  const assets: Asset[] = [];

  function push(a: Asset, fallbackCaption?: string) {
    const key = normalizeAssetUrl(a.url);
    if (seen.has(key)) return;
    seen.add(key);
    if (a.source === "instagram") {
      const code = igShortcode(a.url);
      if (code) {
        if (!a.thumbnail && thumbs[code]) a.thumbnail = thumbs[code];
        if (!a.caption && captions[code]) a.caption = captions[code];
      }
    }
    if ((a.source === "youtube" || a.source === "vimeo" || a.source === "drive") && !a.caption) {
      // Prefer the AI-polished caption (transcript-aware) over the raw platform description.
      if (videoPolished[key]) a.caption = videoPolished[key];
      else if (videoDescs[key]) a.caption = videoDescs[key];
    }
    if (!a.caption && fallbackCaption) a.caption = fallbackCaption;
    // Apply asset-level overrides (admin edits)
    const ovr = overrides.assets[key];
    if (ovr) {
      if (ovr.hidden && !opts.includeHidden) return;
      if (ovr.title) a.title = ovr.title;
      if (ovr.caption !== undefined) a.caption = ovr.caption;
      if (ovr.thumbnail) a.thumbnail = ovr.thumbnail;
      if (ovr.org) a.org = ovr.org;
      // Override tags REPLACE inherited tags (not append). Lets the
      // admin set exact per-asset format/topic tags without dragging
      // every parent entry's tag along.
      if (ovr.tags) a.tags = ovr.tags;
      (a as Asset & { _sortOrder?: number })._sortOrder = ovr.sortOrder ?? 0;
    }
    assets.push(a);
  }

  for (const e of entries) {
    const roles = parseRoles(e.role);

    if (e.embedUrl) {
      push({
        id: `${e.slug}-primary`,
        title: e.title,
        source: detectSource(e.embedUrl),
        url: e.embedUrl,
        thumbnail: e.thumbnail,
        parentSlug: e.slug,
        parentTitle: e.title,
        lane: e.lane,
        tags: e.tags,
        roles,
        year: e.year,
        org: e.org,
        pinned: e.pinned,
      }, e.summary);
    } else if (e.thumbnail && e.externalUrl) {
      push({
        id: `${e.slug}-site`,
        title: e.title,
        caption: e.summary || undefined,
        source: detectSource(e.externalUrl),
        url: e.externalUrl,
        thumbnail: e.thumbnail,
        parentSlug: e.slug,
        parentTitle: e.title,
        lane: e.lane,
        tags: e.tags,
        roles,
        year: e.year,
        org: e.org,
        pinned: e.pinned,
      });
    }

    for (const ig of e.instagramEmbeds ?? []) {
      if (/instagram\.com\/(?:[\w.]+\/)?p\//i.test(ig.url)) continue;
      push({
        id: `${e.slug}-ig-${ig.url}`,
        title: ig.label ?? e.title,
        source: "instagram",
        url: ig.url,
        parentSlug: e.slug,
        parentTitle: e.title,
        lane: e.lane,
        tags: e.tags,
        roles,
        year: e.year,
        org: e.org,
        pinned: e.pinned,
      });
    }

    for (const l of e.links ?? []) {
      if (!isAssetLink(l.href)) continue;
      push({
        id: `${e.slug}-link-${l.href}`,
        title: l.label,
        source: detectSource(l.href),
        url: l.href,
        parentSlug: e.slug,
        parentTitle: e.title,
        lane: e.lane,
        tags: e.tags,
        roles,
        year: e.year,
        org: e.org,
        pinned: e.pinned,
      });
    }
  }

  // Apply sortOrder. Items with explicit sortOrder come first (lower = earlier),
  // then preserve insertion order.
  assets.sort((a, b) => {
    const ao = (a as Asset & { _sortOrder?: number })._sortOrder ?? 0;
    const bo = (b as Asset & { _sortOrder?: number })._sortOrder ?? 0;
    if (ao !== bo) return ao - bo;
    return 0;
  });

  return assets;
}

export function getFeaturedEntries(): PortfolioEntry[] {
  const all = getAllEntries();
  const pinned = all.filter((e) => e.pinned);
  // Cap the home page at 6 cards across lanes.
  const byLane: Record<Lane, PortfolioEntry[]> = {
    video: [],
    education: [],
    making: [],
    building: [],
  };
  for (const e of pinned) byLane[e.lane].push(e);
  // Take 1–2 from each lane for a balanced strip, max 6 total.
  const out: PortfolioEntry[] = [];
  const lanes: Lane[] = ["video", "education", "making", "building"];
  for (let pass = 0; pass < 2 && out.length < 6; pass++) {
    for (const lane of lanes) {
      if (out.length >= 6) break;
      const next = byLane[lane][pass];
      if (next) out.push(next);
    }
  }
  return out;
}
