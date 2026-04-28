import Image from "next/image";
import Link from "next/link";
import type { PortfolioEntry } from "@/lib/portfolio";

const LANE_LABEL: Record<string, string> = {
  video: "Video",
  education: "Education",
  making: "Making",
  building: "Apps & AI",
};

const LANE_HREF: Record<string, string> = {
  video: "/work",
  education: "/teach",
  making: "/maker",
  building: "/apps",
};

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}
function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}
function getDriveId(url: string): string | null {
  const m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  return m ? m[1] : null;
}
function getInstagramShortcode(url: string): string | null {
  const m = url.match(/instagram\.com\/(?:[\w.]+\/)?(?:p|reel|reels)\/([\w-]+)/);
  return m ? m[1] : null;
}

function pickThumbnail(entry: PortfolioEntry): string | null {
  if (entry.thumbnail) return entry.thumbnail;
  if (entry.embedUrl) {
    const ytId = getYouTubeId(entry.embedUrl);
    if (ytId) return `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    const vimeoId = getVimeoId(entry.embedUrl);
    if (vimeoId) return `https://vumbnail.com/${vimeoId}.jpg`;
    const driveId = getDriveId(entry.embedUrl);
    if (driveId) return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280`;
    const igCode = getInstagramShortcode(entry.embedUrl);
    if (igCode) return `/portfolio/ig-thumbs/${igCode}.jpg`;
  }
  if (entry.instagramEmbeds?.length) {
    const code = getInstagramShortcode(entry.instagramEmbeds[0].url);
    if (code) return `/portfolio/ig-thumbs/${code}.jpg`;
  }
  for (const link of entry.links ?? []) {
    const ytId = getYouTubeId(link.href);
    if (ytId) return `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`;
    const vimeoId = getVimeoId(link.href);
    if (vimeoId) return `https://vumbnail.com/${vimeoId}.jpg`;
  }
  return null;
}

export function FeaturedCard({ entry }: { entry: PortfolioEntry }) {
  const thumbnail = pickThumbnail(entry);
  const summaryLine =
    entry.summary
      .replace(/\s+/g, " ")
      .replace(/[“”"']/g, "")
      .trim()
      .split(/(?<=[.!?])\s+/)[0] ?? "";

  return (
    <Link
      href={LANE_HREF[entry.lane] ?? "/work"}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md dark:border-paper/15 dark:bg-ink/40 dark:hover:border-accent/60"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-ink/80 to-accent/40">
        {thumbnail ? (
          thumbnail.startsWith("/") ? (
            <Image
              src={thumbnail}
              alt={entry.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt={entry.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center p-3 text-center text-sm text-paper">
            {entry.title}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
          {LANE_LABEL[entry.lane]}
          {entry.year ? ` · ${entry.year}` : ""}
        </p>
        <h3 className="line-clamp-1 font-serif text-lg leading-tight">{entry.title}</h3>
        {summaryLine ? (
          <p className="line-clamp-2 text-sm leading-snug text-ink/70 dark:text-paper/70">
            {summaryLine}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
