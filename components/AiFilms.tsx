"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { IconPlay } from "./icons";

type Film = {
  id: string;
  title: string;
  kind: string;
  runtime: string;
  year: string;
  logline: string;
  tools: string[];
  thumb: string;
  /** A frame from the film itself, preferred over the titled poster. */
  still?: string;
  /** Set to drop a film from the site without deleting its entry. */
  hidden?: boolean;
};

const ALL_FILMS: Film[] = [
  {
    id: "8lFUZ3mN74E",
    title: "NEON RONIN: Part One",
    kind: "Sci-fi short · Part one of a series",
    runtime: "3:34",
    year: "2026",
    logline:
      "A samurai of light and a tiny porcelain machine begin the climb toward the Jade Overlord. Part one of a series.",
    tools: ["Seedance 2.5", "GPT Image", "DaVinci Resolve"],
    thumb: "/portfolio/ai-neon-ronin.jpg",
    still: "/portfolio/stills/ai-neon-ronin.jpg",
  },
  {
    id: "3GjAoZdF874",
    title: "What Are You Supposed To Be?",
    kind: "Horror short",
    runtime: "1:44",
    year: "2026",
    logline:
      "Halloween night, 1996. Tyler won't take his little brother trick-or-treating, so seven-year-old Joey draws a face on a paper bag and goes out alone.",
    tools: ["Seedance 2.5", "ElevenLabs", "DaVinci Resolve"],
    thumb: "/portfolio/ai-what-are-you-supposed-to-be.jpg",
    still: "/portfolio/stills/ai-what-are-you-supposed-to-be.jpg",
  },
  {
    id: "FtfUI0XKXyI",
    title: "America: 250 Years of Wonder",
    kind: "Animated short",
    runtime: "1:16",
    year: "2026",
    logline:
      "A love letter to 250 years of courage and invention, told in felt, stop-motion-style moments from American history.",
    tools: ["AI video"],
    thumb: "/portfolio/ai-america-250.jpg",
    still: "/portfolio/stills/ai-america-250.jpg",
  },
  {
    id: "I7cHxHLN1r4",
    title: "Teeth Brushed?",
    kind: "Brand-style test · Form Films",
    hidden: true, // FORM work: shown in the At FORM section
    runtime: "0:15",
    year: "2026",
    logline:
      "A dad, his daughter, and a very familiar bedtime question. Form Films' first exploration of Absurd.",
    tools: ["Absurd"],
    thumb: "/portfolio/ai-teeth-brushed.jpg",
    still: "/portfolio/stills/ai-teeth-brushed.jpg",
  },
  {
    id: "oootgNdZIRs",
    title: "Big Plans",
    kind: "Short",
    runtime: "1:21",
    year: "2026",
    logline: "A short film made to share some big news.",
    tools: ["InVideo"],
    thumb: "/portfolio/ai-big-plans.jpg",
    still: "/portfolio/stills/ai-big-plans.jpg",
  },
];

const FILMS = ALL_FILMS.filter((f) => !f.hidden);

/** The film #play starts (the hero frame names it). */
export const LEAD_FILM_TITLE = FILMS[0].title;

/** Slate-style running time: 3:34 -> TRT 03:34. */
const trt = (runtime: string) => `TRT ${runtime.padStart(5, "0")}`;

type DocWithVT = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

const scrollBehavior = (): ScrollBehavior =>
  matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

function Player({ film, playing, onPlay }: {
  film: Film;
  playing: boolean;
  onPlay: () => void;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  // The Play button is swapped out for the iframe: keep keyboard focus here.
  useEffect(() => {
    if (playing) frame.current?.focus({ preventScroll: true });
  }, [playing]);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {playing ? (
        <iframe
          ref={frame}
          src={`https://www.youtube-nocookie.com/embed/${film.id}?autoplay=1&rel=0`}
          title={film.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Play ${film.title}`}
          className="group absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src={film.still ?? film.thumb}
            alt=""
            fill
            sizes="(min-width: 1152px) 44rem, (min-width: 1024px) 62vw, 100vw"
            className="object-cover transition duration-500 motion-safe:group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-xs font-semibold text-ink shadow-lg transition group-hover:bg-accent group-hover:text-paper">
            <IconPlay className="h-3.5 w-3.5" />
            Play · {film.runtime}
          </span>
        </button>
      )}
    </div>
  );
}

export function AiFilms({ compact = false }: { compact?: boolean }) {
  const [lead, setLead] = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const leadFrame = useRef<HTMLDivElement>(null);
  /** The film that arrived by a view-transition cut; it skips the film-in fade. */
  const cutId = useRef<string | null>(null);
  const film = FILMS[lead];

  // Picking a film is a match cut: the chosen frame grows into the player.
  // Without view transitions (or with reduced motion) the film-in fade runs.
  const choose = (i: number, thumb: HTMLElement | null) => {
    const top = stage.current?.getBoundingClientRect().top ?? 0;
    const doc = document as DocWithVT;
    const canCut =
      i !== lead &&
      top >= 0 &&
      thumb !== null &&
      typeof doc.startViewTransition === "function" &&
      document.documentElement.classList.contains("motion");
    if (!canCut) {
      cutId.current = null;
      setLead(i);
      setPlaying(null);
      if (top < 0) stage.current?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      return;
    }
    thumb.style.viewTransitionName = "film-frame";
    const t = doc.startViewTransition!(() => {
      thumb.style.viewTransitionName = "";
      cutId.current = FILMS[i].id;
      flushSync(() => {
        setLead(i);
        setPlaying(null);
      });
      if (leadFrame.current) leadFrame.current.style.viewTransitionName = "film-frame";
    });
    t.finished.finally(() => {
      thumb.style.viewTransitionName = "";
      if (leadFrame.current) leadFrame.current.style.viewTransitionName = "";
    });
  };

  // The hero's film card links to #play: start the lead film right here.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash !== "#play") return;
      cutId.current = null;
      setLead(0);
      setPlaying(FILMS[0].id);
      stage.current?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
    <div aria-hidden="true" className="dip-to-ink h-12 md:h-16" />
    <section
      id="films"
      data-playing={playing !== null ? "" : undefined}
      className="house scroll-mt-14 bg-ink py-16 text-paper md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal data-dim>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-muted">
              AI films
            </p>
            <h2 className="mt-2 max-w-3xl text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
              Four short films, made with AI.
            </h2>
          </div>
          {!compact ? (
            <p className="max-w-sm text-sm text-paper/65">
              Every shot generated, then
              voiced, cut and graded like any other film. Click a title to play it here.
            </p>
          ) : null}
        </div>

        <div ref={stage} className="mt-8 grid scroll-mt-20 gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <div key={film.id} ref={leadFrame} className={cutId.current === film.id ? undefined : "film-in"}>
          <Player
            film={film}
            playing={playing === film.id}
            onPlay={() => setPlaying(film.id)}
          />
          </div>
          <div key={`${film.id}-info`} className="film-in" style={{ animationDelay: "120ms" }}>
          <div data-dim>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/55">
              {film.kind}
              <span className="mt-1 block font-mono font-normal tracking-[0.12em] tabular-nums">
                {film.year} · {trt(film.runtime)}
              </span>
            </p>
            <h3 className="mt-2 text-balance font-serif text-2xl leading-tight md:text-3xl">
              {film.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-paper/80">{film.logline}</p>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/55">
              Made with
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {film.tools.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-paper/20 px-3 py-1 text-xs text-paper/85"
                >
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={`https://www.youtube.com/watch?v=${film.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-paper/70 underline decoration-paper/30 underline-offset-4 transition hover:text-accent-muted"
            >
              Watch on YouTube
            </a>
          </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">Now showing {film.title}</p>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" data-stagger="90" data-dim>
          {FILMS.map((f, i) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={(e) => choose(i, e.currentTarget.querySelector<HTMLElement>("[data-frame]"))}
                aria-pressed={i === lead}
                className={[
                  "lift group w-full rounded-lg border p-1.5 text-left",
                  i === lead
                    ? "border-accent-muted bg-paper/5"
                    : "border-paper/10 hover:border-paper/40",
                ].join(" ")}
              >
                <span data-frame className="relative block aspect-video overflow-hidden rounded-md bg-black">
                  <Image src={f.still ?? f.thumb} alt="" fill sizes="(min-width: 640px) 16rem, 50vw" className="object-cover transition duration-500 motion-safe:group-hover:scale-105" />
                </span>
                <span className="mt-2 block px-1 font-serif text-sm leading-tight">{f.title}</span>
                <span className="mb-1 block px-1 text-[10px] uppercase tracking-[0.14em] text-paper/55">
                  <span className="font-mono tabular-nums">{f.runtime}</span> · {f.kind.split(" · ")[0]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
    <div aria-hidden="true" className="dip-to-paper h-12 md:h-16" />
    </>
  );
}
