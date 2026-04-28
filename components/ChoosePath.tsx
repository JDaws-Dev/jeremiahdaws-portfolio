"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  IconArrowRight,
  IconBook,
  IconDownload,
  IconFilm,
  IconSpark,
  IconWrench,
} from "./icons";

type Path = {
  id: "video" | "education" | "making" | "building";
  Icon: typeof IconFilm;
  label: string;
  hero: string;
  pitch: string;
  proof: string;
  resume: string;
  resumeLabel: string;
  workHref: string;
  highlights: { title: string; meta: string; thumb: string; href: string }[];
};

const PATHS: Path[] = [
  {
    id: "video",
    Icon: IconFilm,
    label: "Filmmaker",
    hero: "I tell the story.",
    pitch:
      "Six years producing branded marketing for Disney Parks. Editor on National Geographic, Hallmark, and reality broadcast. Independent narrative features I write and direct with my brother under our Daws Brothers banner. Story-first, fast turnaround, multi-cam comfortable.",
    proof: "Disney · Marvel · Lucasfilm · Target · Hallmark · National Geographic",
    resume: "/resumes/resume-video.pdf",
    resumeLabel: "Video résumé",
    workHref: "/work",
    highlights: [
      {
        title: "Target × Disney — Backyard Theater",
        meta: "$1.5M campaign · Disney Channel/XD · 2016",
        thumb: "/portfolio/disney-yellow-shoes.jpg",
        href: "/work",
      },
      {
        title: "Building Wild — National Geographic",
        meta: "Editor · multi-cam reality · 2014",
        thumb: "/portfolio/building-wild.jpg",
        href: "/work",
      },
      {
        title: "Dangerous Calling",
        meta: "Director / Editor · feature thriller · 2020",
        thumb: "https://i.ytimg.com/vi/fJHMbqUdnjU/hqdefault.jpg",
        href: "/work",
      },
    ],
  },
  {
    id: "education",
    Icon: IconBook,
    label: "Educator",
    hero: "I teach the process.",
    pitch:
      "Department Head of Film and Creative Technology at a private classical school — built two programs from zero, twelve-plus courses spanning screenwriting through Arduino. Twenty-two productions on the school's streaming platform. Five-lesson Fusion 360 series public on YouTube as a teaching sample.",
    proof: "12+ courses · 50+ students · 22 productions · two programs built from zero",
    resume: "/resumes/resume-education.pdf",
    resumeLabel: "Education résumé",
    workHref: "/teach",
    highlights: [
      {
        title: "Private school production catalog",
        meta: "Producer · Director · Editor · 2022–present",
        thumb: "https://vumbnail.com/1115834134.jpg",
        href: "/teach",
      },
      {
        title: "Creative Technology curriculum",
        meta: "Fusion 360, Arduino, embedded computing",
        thumb: "https://i.ytimg.com/vi/cQRgMfAq6oc/hqdefault.jpg",
        href: "/teach",
      },
      {
        title: "Performing-arts school — social-media marketing",
        meta: "Producer · Director · Editor",
        thumb: "/portfolio/ig-thumbs/C8N5lZ5Ma7V.jpg",
        href: "/teach",
      },
    ],
  },
  {
    id: "making",
    Icon: IconWrench,
    label: "Maker",
    hero: "I build the thing.",
    pitch:
      "CNC mill and lathe, manual machining, 3D printing, fabrication, welding, vacuum forming, electronics, theatrical props. SkillsUSA National Silver in CNC Turning. Tormach brand ambassador hosting their Garage Series. 100+ shop and field videos on YouTube and Instagram.",
    proof: "Tormach ambassador · SkillsUSA Silver · Bullfrog Machining · 100+ build videos",
    resume: "/resumes/resume-maker.pdf",
    resumeLabel: "Maker résumé",
    workHref: "/maker",
    highlights: [
      {
        title: "Filmmaker → Machinist (YouTube)",
        meta: "Host · Editor · 58 videos",
        thumb: "https://i.ytimg.com/vi/AkNDTLnJ2fs/hqdefault.jpg",
        href: "/maker",
      },
      {
        title: "Hollywood movie-set dolly build",
        meta: "Bullfrog Machining · CNC + fab",
        thumb: "https://i.ytimg.com/vi/0G3zJUQ92Wc/hqdefault.jpg",
        href: "/maker",
      },
      {
        title: "Lumière candles — Beauty and the Beast",
        meta: "3D scan · print · paint · wire",
        thumb: "https://i.ytimg.com/vi/jC7Y8g2PzNI/hqdefault.jpg",
        href: "/maker",
      },
    ],
  },
  {
    id: "building",
    Icon: IconSpark,
    label: "Apps & AI",
    hero: "I ship the tool.",
    pitch:
      "Founder of AnswerAxis — voice-AI phone agents and small-business automation. Built the SafeFamily app suite (kid-safe YouTube, music, books, homework). JARVIS, a personal AI OS with 150+ tools, plus Mozart and Anna for household coordination. Stack: Next.js, Convex, Vapi, MCP.",
    proof: "AnswerAxis · SafeFamily · 10+ shipped apps · multi-agent home AI",
    resume: "/resumes/resume-tech.pdf",
    resumeLabel: "Apps & AI résumé",
    workHref: "/apps",
    highlights: [
      {
        title: "AnswerAxis",
        meta: "AI consulting · voice agents · paying clients",
        thumb: "/portfolio/answeraxis.jpg",
        href: "/apps",
      },
      {
        title: "SafeFamily suite",
        meta: "Kid-safe content · 4 apps · 1 auth source",
        thumb: "/portfolio/apps-safefamily.jpg",
        href: "/apps",
      },
      {
        title: "Beavers Bathroom Blitz",
        meta: "3D web game · ships and works",
        thumb: "/portfolio/apps-beaversbathroomblitz.jpg",
        href: "/apps",
      },
      {
        title: "JARVIS — personal AI OS",
        meta: "Telegram-fronted · 150+ MCP tools · self-tooling",
        thumb: "https://i.ytimg.com/vi/A3V_AN36pUs/hqdefault.jpg",
        href: "/apps",
      },
    ],
  },
];

export function ChoosePath() {
  const [active, setActive] = useState<Path["id"] | null>(null);
  const path = active ? PATHS.find((p) => p.id === active) ?? null : null;

  return (
    <section id="choose" className="border-y border-paper-muted bg-paper-muted/40 py-16 dark:border-paper/10 dark:bg-ink/30">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Choose your own adventure</p>
        <h2 className="mt-2 max-w-3xl font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
          Which Jeremiah are you <span className="text-accent">looking for?</span>
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((p) => {
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(isActive ? null : p.id)}
                aria-pressed={isActive}
                className={[
                  "group flex h-full flex-col rounded-2xl border p-5 text-left transition",
                  isActive
                    ? "border-accent bg-paper shadow-md dark:bg-ink/60"
                    : "border-ink/10 bg-paper hover:-translate-y-0.5 hover:border-accent hover:shadow-md dark:border-paper/15 dark:bg-ink/40 dark:hover:border-accent",
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-10 w-10 items-center justify-center rounded-full",
                    isActive ? "bg-accent text-paper" : "bg-accent/10 text-accent",
                  ].join(" ")}
                >
                  <p.Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl leading-tight tracking-tight">
                  {p.label}
                </h3>
                <p className="mt-1 text-sm text-ink/70 dark:text-paper/70">{p.hero}</p>
              </button>
            );
          })}
        </div>

        {path ? (
          <div className="mt-10 rounded-3xl border border-ink/10 bg-paper p-6 shadow-sm dark:border-paper/15 dark:bg-ink/40 md:p-8">
            <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-accent">{path.label}</p>
                <h3 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
                  {path.hero}
                </h3>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/80 dark:text-paper/80 md:text-lg">
                  {path.pitch}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ink-muted dark:text-paper-muted">
                  {path.proof}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={path.workHref}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
                  >
                    See all {path.label.toLowerCase()} work <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={path.resume}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-paper/30 dark:hover:border-accent dark:hover:text-accent"
                  >
                    <IconDownload className="h-4 w-4" />
                    {path.resumeLabel}
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-ink-muted dark:text-paper-muted">
                  A few to start with
                </p>
                <ul className="mt-3 grid gap-3">
                  {path.highlights.slice(0, 4).map((h) => (
                    <li key={h.title}>
                      <Link
                        href={h.href}
                        className="group flex items-center gap-3 rounded-xl border border-ink/10 bg-paper-muted/30 p-2.5 transition hover:border-accent dark:border-paper/15 dark:bg-ink/30 dark:hover:border-accent"
                      >
                        <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-md bg-ink/10 dark:bg-paper/10">
                          {h.thumb.startsWith("http") ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={h.thumb}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <Image src={h.thumb} alt="" fill sizes="112px" className="object-cover" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 font-serif text-sm leading-tight">{h.title}</p>
                          <p className="line-clamp-1 mt-0.5 text-[11px] uppercase tracking-[0.14em] text-ink-muted dark:text-paper-muted">
                            {h.meta}
                          </p>
                        </div>
                        <IconArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:text-accent dark:text-paper-muted" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-8 max-w-xl text-sm text-ink-muted dark:text-paper-muted">
            Pick one and I'll show you the most relevant work, the right résumé, and a path into the rest. Or <Link href="/work" className="font-medium text-accent hover:underline">browse the whole catalog</Link>.
          </p>
        )}
      </div>
    </section>
  );
}
