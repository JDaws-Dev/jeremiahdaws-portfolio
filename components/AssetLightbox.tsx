"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Asset } from "@/lib/portfolio";
import { IconArrowUpRight } from "./icons";

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

export function AssetLightbox({
  assets,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  assets: Asset[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const asset = open ? assets[index] : null;

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, [open]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [open, onPrev, onNext]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!asset) {
    return (
      <dialog
        ref={dialogRef}
        onClose={onClose}
        className="m-0 max-h-none max-w-none bg-transparent p-0"
      />
    );
  }

  const ytId = getYouTubeId(asset.url);
  const vimeoId = getVimeoId(asset.url);
  const igCode = getInstagramShortcode(asset.url);
  const driveId = getDriveId(asset.url);
  const hasPrev = (index ?? 0) > 0;
  const hasNext = (index ?? 0) < assets.length - 1;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-modal="true"
      aria-labelledby={`lb-${asset.id}-title`}
      className="m-0 max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85 backdrop:backdrop-blur-sm open:fixed open:inset-0 open:flex open:h-screen open:w-screen open:items-center open:justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[min(96vw,1200px)] max-h-[92vh] overflow-y-auto rounded-2xl bg-ink p-3 pt-12 text-paper shadow-2xl"
      >
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          <span className="hidden text-[10px] uppercase tracking-[0.16em] text-paper/55 sm:inline">
            {(index ?? 0) + 1} / {assets.length}
          </span>
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            aria-label="Previous"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 bg-ink/90 text-paper backdrop-blur transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-paper/40 disabled:hover:text-paper"
          >
            ←
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasNext}
            aria-label="Next"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 bg-ink/90 text-paper backdrop-blur transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-paper/40 disabled:hover:text-paper"
          >
            →
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 bg-ink/90 text-paper backdrop-blur transition hover:border-accent hover:text-accent"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 px-1">
          <div className="min-w-0 flex-1">
            <p
              id={`lb-${asset.id}-title`}
              className="font-serif text-xl leading-tight md:text-2xl"
            >
              {asset.title}
            </p>
            {(asset.roles && asset.roles.length) || asset.year || asset.org || (asset.parentTitle && asset.parentTitle !== asset.title) ? (
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] uppercase tracking-[0.14em] text-paper/65">
                {asset.roles && asset.roles.length ? (
                  <span className="capitalize text-accent">
                    {asset.roles.join(" · ")}
                  </span>
                ) : null}
                {asset.org ? <span>· {asset.org}</span> : null}
                {asset.year ? <span>· {asset.year}</span> : null}
                {asset.parentTitle && asset.parentTitle !== asset.title ? (
                  <span>· {asset.parentTitle}</span>
                ) : null}
              </p>
            ) : null}
            {asset.caption ? (
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-paper/85">
                {asset.caption}
              </p>
            ) : null}
          </div>
          <a
            href={asset.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-paper/25 px-3 py-1.5 text-xs font-medium text-paper/80 transition hover:border-accent hover:text-accent"
          >
            Open original <IconArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {ytId ? (
          <iframe
            key={`yt-${ytId}`}
            src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`}
            title={asset.title}
            className="aspect-video w-full rounded-lg border-0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        ) : vimeoId ? (
          <iframe
            key={`vimeo-${vimeoId}`}
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0`}
            title={asset.title}
            className="aspect-video w-full rounded-lg border-0"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : driveId ? (
          <iframe
            key={`drive-${driveId}`}
            src={`https://drive.google.com/file/d/${driveId}/preview`}
            title={asset.title}
            className="aspect-video w-full rounded-lg border-0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        ) : igCode ? (
          <div className="mx-auto flex h-[80vh] max-h-[820px] w-full max-w-[480px]">
            <iframe
              key={`ig-${igCode}`}
              src={`https://www.instagram.com/p/${igCode}/embed/captioned/`}
              className="h-full w-full rounded-lg border-0 bg-paper"
              scrolling="yes"
              title={asset.title}
              allow="encrypted-media"
            />
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
