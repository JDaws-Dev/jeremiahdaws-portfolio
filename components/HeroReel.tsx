"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LEAD_FILM_TITLE } from "./AiFilms";

const POSTER = "/portfolio/stills/hero-reel-poster.jpg";
const SOURCES = [
  { src: "/portfolio/hero-reel.webm", type: "video/webm" },
  { src: "/portfolio/hero-reel.mp4", type: "video/mp4" },
];

type NetInfo = { saveData?: boolean; effectiveType?: string };

/**
 * The hero frame. The poster paints first; the silent reel is only fetched
 * once the page has loaded, the frame is on screen, and the viewer hasn't
 * asked for reduced motion or reduced data. It pauses off screen, and a
 * small control under the frame (never on it) pauses it for good.
 */
export function HeroReel() {
  const video = useRef<HTMLVideoElement>(null);
  const held = useRef(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const net = (navigator as Navigator & { connection?: NetInfo }).connection;
    if (net?.saveData || /2g|3g/.test(net?.effectiveType ?? "")) return;

    let loaded = false;
    let gone = false;
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    let ready = false;

    const sync = () => {
      if (gone) return;
      if (!ready || !visible || held.current) {
        if (loaded) v.pause();
        return;
      }
      if (!loaded) {
        loaded = true;
        for (const s of SOURCES) {
          const el = document.createElement("source");
          el.src = s.src;
          el.type = s.type;
          v.appendChild(el);
        }
        v.load();
      }
      v.play().catch(() => {});
    };

    const onPlaying = () => setStarted(true);
    v.addEventListener("playing", onPlaying);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    io.observe(v);

    const go = () => {
      ready = true;
      sync();
    };
    const afterLoad = () => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(go, { timeout: 1500 });
      else timer = setTimeout(go, 200);
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });

    return () => {
      gone = true;
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
      io.disconnect();
      v.removeEventListener("playing", onPlaying);
      window.removeEventListener("load", afterLoad);
    };
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    held.current = !held.current;
    setPaused(held.current);
    if (held.current) v.pause();
    else v.play().catch(() => {});
  };

  return (
    <div className="group/reel order-1 md:order-2">
      <a
        href="#play"
        aria-label={`Play ${LEAD_FILM_TITLE}`}
        onClick={(e) => {
          // Already on #play: hashchange won't fire, so nudge the player.
          if (window.location.hash === "#play") {
            e.preventDefault();
            window.dispatchEvent(new HashChangeEvent("hashchange"));
          }
        }}
        className="group block"
      >
        <span className="letterbox relative block aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
          <Image
            src={POSTER}
            alt=""
            fill
            priority
            sizes="(min-width: 1152px) 36rem, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className={[
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              started ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </span>
      </a>
      {/* Space is held so the control appearing never shifts the page. */}
      <div className="mt-1 flex h-6 items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted opacity-0 transition-opacity duration-300 group-hover/reel:opacity-100"
        >
          Click to watch {LEAD_FILM_TITLE}
        </span>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          tabIndex={started ? 0 : -1}
          aria-hidden={started ? undefined : true}
          className={[
            "inline-flex min-h-6 shrink-0 items-center gap-1.5 px-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted transition hover:text-accent",
            started ? "opacity-100" : "invisible opacity-0",
          ].join(" ")}
        >
          <span aria-hidden="true" className="text-[9px]">{paused ? "\u25B6" : "\u275A\u275A"}</span>
          {paused ? "Play reel" : "Pause reel"}
        </button>
      </div>
    </div>
  );
}
