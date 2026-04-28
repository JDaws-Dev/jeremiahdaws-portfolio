"use client";

import Image from "next/image";
import type { Asset } from "@/lib/portfolio";
import { IconArrowUpRight, IconFilm, IconImdb, IconInstagram, IconYouTube } from "./icons";

const LANE_LABEL: Record<string, string> = {
  video: "Video",
  education: "Education",
  making: "Making",
  building: "Apps & AI",
};

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}
function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}
function getInstagramShortcode(url: string): string | null {
  const m = url.match(/instagram\.com\/(?:[\w.]+\/)?(?:p|reel|reels)\/([\w-]+)/);
  return m ? m[1] : null;
}
function getDriveId(url: string): string | null {
  const m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  return m ? m[1] : null;
}

function SourceIcon({ source, className }: { source: Asset["source"]; className?: string }) {
  const map: Record<Asset["source"], typeof IconYouTube> = {
    youtube: IconYouTube,
    vimeo: IconFilm,
    instagram: IconInstagram,
    drive: IconFilm,
    imdb: IconImdb,
    site: IconArrowUpRight,
  };
  const Icon = map[source];
  return <Icon className={className} />;
}

export function AssetCard({
  asset,
  onOpen,
}: {
  asset: Asset;
  onOpen?: (asset: Asset) => void;
}) {
  const ytId = getYouTubeId(asset.url);
  const vimeoId = getVimeoId(asset.url);
  const igCode = getInstagramShortcode(asset.url);
  const driveId = getDriveId(asset.url);

  const ytThumb = ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : null;
  const vimeoThumb = vimeoId ? `https://vumbnail.com/${vimeoId}.jpg` : null;
  const driveThumb = driveId ? `https://drive.google.com/thumbnail?id=${driveId}&sz=w1280` : null;
  const isMedia = Boolean(ytId || vimeoId || igCode || driveId);
  const useThumbnail = asset.thumbnail || ytThumb || vimeoThumb || driveThumb;

  function handleClick() {
    if (isMedia && onOpen) {
      onOpen(asset);
    } else {
      window.open(asset.url, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <article className="group relative overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-sm transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md dark:border-paper/15 dark:bg-ink/40 dark:hover:border-accent/60">
      <button
        type="button"
        onClick={handleClick}
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        aria-label={isMedia ? `Play ${asset.title}` : `Open ${asset.title}`}
      >
        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-ink/80 to-accent/40">
          {useThumbnail ? (
            asset.thumbnail ? (
              <Image
                src={asset.thumbnail}
                alt=""
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={useThumbnail}
                alt=""
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            )
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink to-accent/60 p-4 text-center text-paper">
              <SourceIcon source={asset.source} className="h-6 w-6 opacity-70" />
              <span className="line-clamp-3 font-serif text-sm leading-tight">
                {asset.title}
              </span>
            </div>
          )}
          {isMedia ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-80 transition group-hover:opacity-100"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/55 text-paper backdrop-blur-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5 p-3">
          <h3 className="line-clamp-2 font-serif text-sm leading-snug">{asset.title}</h3>
          {asset.caption ? (
            <p className="line-clamp-3 text-[11px] leading-snug text-ink/70 dark:text-paper/70">
              {asset.caption}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
            <span className="inline-flex items-center gap-1 font-semibold text-accent">
              <SourceIcon source={asset.source} className="h-3 w-3" />
              {LANE_LABEL[asset.lane]}
            </span>
            {asset.parentTitle && asset.parentTitle !== asset.title ? (
              <span>· {asset.parentTitle}</span>
            ) : asset.org ? (
              <span>· {asset.org}</span>
            ) : null}
            {asset.year ? <span>· {asset.year}</span> : null}
          </div>
        </div>
      </button>
    </article>
  );
}
