"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  IconArrowRight,
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
      "Producer / Director at FORM, directing the animated comedy series Calendar Jockeys. Six years producing branded marketing for Disney Parks. Editor on National Geographic, Hallmark, and reality broadcast. Independent narrative features I write and direct with my brother under our Daws Brothers banner. Story-first, fast turnaround, multi-cam comfortable.",
    proof: "FORM · Disney · Marvel · Lucasfilm · Target · Hallmark · National Geographic",
    resume: "/resumes/resume-video.pdf",
    resumeLabel: "Video résumé",
    workHref: "/work",
    highlights: [
      {
        title: "Calendar Jockeys",
        meta: "Director · Form Films comedy series · 2026",
        thumb: "/portfolio/calendar-jockeys.jpg",
        href: "/work",
      },
      {
        title: "Target × Disney — Backyard Theater",
        meta: "$1.5M campaign · Disney Channel/XD · 2016",
        thumb: "/portfolio/uploaded/58cdd5f15bbb.jpg",
        href: "/work",
      },
      {
        title: "Building Wild — National Geographic",
        meta: "Editor · multi-cam reality · 2014",
        thumb: "/portfolio/uploaded/dec2832c4403.jpg",
        href: "/work",
      },
    ],
  },
  {
    id: "making",
    Icon: IconWrench,
    label: "Maker",
    hero: "I build the thing.",
    pitch:
      "CNC mill and lathe, manual machining, 3D printing, fabrication, welding, vacuum forming, electronics, theatrical props. SkillsUSA National Silver in CNC Turning. Former Tormach brand ambassador and Garage Series host. 100+ shop and field videos on YouTube and Instagram.",
    proof: "SkillsUSA Silver · Tormach Garage Series · Bullfrog Machining (2021–2026) · 100+ build videos",
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
    label: "AI Builder",
    hero: "I ship the tool.",
    pitch:
      "AI consulting, team training, vibe-coding builds, and websites with AI built in. Rebuilt the FORM studio website. Client builds for Artios Cafe (fully automated ordering with a staff AI assistant) and ReadyTote (website + AI assistant). Built the SafeFamily app suite (kid-safe YouTube, music, books, homework). Stack: Next.js, Convex, Claude.",
    proof: "Artios Cafe · ReadyTote · FORM website · SafeFamily",
    resume: "/resumes/resume-tech.pdf",
    resumeLabel: "Apps & AI résumé",
    workHref: "/apps",
    highlights: [
      {
        title: "FORM studio website",
        meta: "Rebuilt end to end · 2026",
        thumb: "/portfolio/form-website.jpg",
        href: "/apps",
      },
      {
        title: "SafeFamily suite",
        meta: "Kid-safe content · 4 apps · 1 auth source",
        thumb: "/portfolio/apps-safefamily.jpg",
        href: "/apps",
      },
      {
        title: "Artios Cafe",
        meta: "Fully automated ordering · staff AI assistant",
        thumb: "/portfolio/apps-artioscafe-order.jpg",
        href: "/apps",
      },
      {
        title: "ReadyTote",
        meta: "Client site · AI assistant · booking",
        thumb: "/portfolio/client-readytote.jpg",
        href: "/apps",
      },
    ],
  },
];

export function ChoosePath() {
  const [active, setActive] = useState<Path["id"] | null>(null);
  const path = active ? PATHS.find((p) => p.id === active) ?? null : null;
  const detailRef = useRef<HTMLDivElement>(null);

  // Scroll the expanded detail into view when a lane is picked.
  useEffect(() => {
    if (!active || !detailRef.current) return;
    const el = detailRef.current;
    // Account for sticky TopNav (h-14 = 56px) + a little breathing room.
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }, [active]);

  return (
    <section id="choose" className="border-y border-paper-muted bg-paper-muted/40 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs uppercase tracking-[0.22em] text-blue">Choose your own adventure</p>
        <h2 className="mt-2 max-w-3xl font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
          Which Jeremiah are you <span className="text-accent">looking for?</span>
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                    ? "border-accent bg-paper shadow-md"
                    : "border-ink/10 bg-paper hover:-translate-y-0.5 hover:border-accent hover:shadow-md",
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
                <p className="mt-1 text-sm text-ink/70">{p.hero}</p>
              </button>
            );
          })}
        </div>

        {path ? (
          <div
            ref={detailRef}
            className="mt-10 scroll-mt-20 rounded-3xl border border-ink/10 bg-paper p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-blue">{path.label}</p>
                <h3 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
                  {path.hero}
                </h3>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/80 md:text-lg">
                  {path.pitch}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-ink-muted">
                  {path.proof}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={path.workHref}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition hover:bg-accent"
                  >
                    See all {path.label.toLowerCase()} work <IconArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={path.resume}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
                  >
                    <IconDownload className="h-4 w-4" />
                    {path.resumeLabel}
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-blue">
                  A few to start with
                </p>
                <ul className="mt-3 grid gap-3">
                  {path.highlights.slice(0, 4).map((h) => (
                    <li key={h.title}>
                      <Link
                        href={h.href}
                        className="group flex items-center gap-3 rounded-xl border border-ink/10 bg-paper-muted/30 p-2.5 transition hover:border-accent"
                      >
                        <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-md bg-ink/10">
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
                          <p className="line-clamp-1 mt-0.5 text-[11px] uppercase tracking-[0.14em] text-ink-muted">
                            {h.meta}
                          </p>
                        </div>
                        <IconArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:text-accent" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-8 max-w-xl text-sm text-ink-muted">
            Pick one and I'll show you the most relevant work, the right résumé, and a path into the rest. Or <Link href="/work" className="font-medium text-accent hover:underline">browse the whole catalog</Link>.
          </p>
        )}
      </div>
    </section>
  );
}
