"use client";

import Image from "next/image";
import { useRef, useState } from "react";
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
};

const FILMS: Film[] = [
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
    id: "oootgNdZIRs",
    title: "Big Plans",
    kind: "Personal short",
    runtime: "1:21",
    year: "2026",
    logline: "A short film made to share some big personal news.",
    tools: ["InVideo"],
    thumb: "/portfolio/ai-big-plans.jpg",
    still: "/portfolio/stills/ai-big-plans.jpg",
  },
  {
    id: "I7cHxHLN1r4",
    title: "Teeth Brushed?",
    kind: "Spec commercial · Form Films",
    runtime: "0:15",
    year: "2026",
    logline:
      "A dad, his daughter, and a very familiar bedtime question. Form Films' first exploration of Absurd.",
    tools: ["Absurd"],
    thumb: "/portfolio/ai-teeth-brushed.jpg",
    still: "/portfolio/stills/ai-teeth-brushed.jpg",
  },
];

function Player({ film, playing, onPlay, priority }: {
  film: Film;
  playing: boolean;
  onPlay: () => void;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {playing ? (
        <iframe
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
            priority={priority}
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
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
  const film = FILMS[lead];

  return (
    <section id="films" className="scroll-mt-14 bg-ink py-16 text-paper md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-muted">
              AI filmmaking
            </p>
            <h2 className="mt-2 max-w-3xl text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
              No camera. No cast. Still a story.
            </h2>
          </div>
          {!compact ? (
            <p className="max-w-sm text-sm text-paper/65">
              Written, directed and cut by me. Every shot generated, then edited
              and graded in DaVinci Resolve like any other film.
            </p>
          ) : null}
        </div>

        <div ref={stage} className="mt-8 grid scroll-mt-20 gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-start">
          <Player
            film={film}
            playing={playing === film.id}
            onPlay={() => setPlaying(film.id)}
            priority={!compact}
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/55">
              {film.kind} · {film.year} · {film.runtime}
            </p>
            <h3 className="mt-2 text-balance font-serif text-2xl leading-tight md:text-3xl">
              {film.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-paper/80">{film.logline}</p>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-paper/45">
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

        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {FILMS.map((f, i) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => {
                  setLead(i);
                  setPlaying(null);
                  const top = stage.current?.getBoundingClientRect().top ?? 0;
                  if (top < 0) stage.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-pressed={i === lead}
                className={[
                  "group w-full rounded-lg border p-1.5 text-left transition",
                  i === lead
                    ? "border-accent-muted bg-paper/5"
                    : "border-paper/10 hover:border-paper/40",
                ].join(" ")}
              >
                <span className="relative block aspect-video overflow-hidden rounded-md bg-black">
                  <Image src={f.still ?? f.thumb} alt="" fill sizes="16rem" className="object-cover" />
                </span>
                <span className="mt-2 block px-1 font-serif text-sm leading-tight">{f.title}</span>
                <span className="mb-1 block px-1 text-[10px] uppercase tracking-[0.14em] text-paper/50">
                  {f.runtime} · {f.kind.split(" · ")[0]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
