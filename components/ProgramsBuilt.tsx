import Link from "next/link";
import { IconFilm, IconWrench } from "./icons";

type Program = {
  Icon: typeof IconFilm;
  name: string;
  tagline: string;
  storyKicker: string;
  proof: string[];
  courses: string[];
};

const PROGRAMS: Program[] = [
  {
    Icon: IconFilm,
    name: "Film & Story",
    tagline:
      "Story-first filmmaking with industry workflow. Students leave with a finished short, an editor's eye, and a working knowledge of the craft from script through final cut.",
    storyKicker:
      "Built from zero. The kids who go through this don't make student films that look like student films — they make short films, and they finish them.",
    proof: [
      "12+ courses · 50+ students · 22 productions shipped",
      "Eight courses spanning Film History → Documentary",
      "Capstones on a real streaming-platform release",
      "Backed by: Six years at Disney · Nat Geo · Hallmark",
    ],
    courses: [
      "Film History",
      "Film Production",
      "Directing",
      "Screenwriting I",
      "Screenwriting II",
      "Editing I",
      "Editing II",
      "Documentary",
    ],
  },
  {
    Icon: IconWrench,
    name: "Creative Technology & Fabrication",
    tagline:
      "Hands-on making, end-to-end. CAD to printer to lathe to mill to electronics, with project-based learning at every step. Students build real things they keep.",
    storyKicker:
      "The kids don't run software simulations. They cut metal, print prototypes, wire microcontrollers, and walk out with something they made — every semester.",
    proof: [
      "Eight courses spanning Intro CT → Embedded Computing",
      "Real Tormach, Bambu, and Arduino on the floor",
      "Public Fusion 360 lesson series on YouTube as a teaching sample",
      "Backed by: SkillsUSA Silver · Tormach ambassador · Bullfrog Machining",
    ],
    courses: [
      "Intro to Creative Technology",
      "3D Design I",
      "3D Design II",
      "Fusion 360",
      "Embedded Computing",
      "Intro to Engineering",
      "Fabrication & Prototyping",
      "Bambu Studio / 3D printing",
    ],
  },
];

export function ProgramsBuilt() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-accent">
          Programs I built from zero
        </p>
        <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
          Two departments. One teacher.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-ink-muted dark:text-paper-muted">
          Both programs were greenfield — no existing curriculum, no
          equipment, no precedent. I designed the courses, sourced the gear,
          taught the classes, and produced the student work that went out
          the door.
        </p>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {PROGRAMS.map((p) => (
          <li
            key={p.name}
            className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-paper p-6 dark:border-paper/15 dark:bg-ink/40"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <p.Icon className="h-5 w-5" />
              </span>
              <h3 className="font-serif text-2xl leading-tight tracking-tight">
                {p.name}
              </h3>
            </div>
            <p className="text-sm font-medium text-ink/80 dark:text-paper/85">
              {p.tagline}
            </p>
            <p className="text-sm leading-relaxed italic text-ink/65 dark:text-paper/65">
              {p.storyKicker}
            </p>
            <ul className="space-y-1.5 text-sm text-ink/75 dark:text-paper/75">
              {p.proof.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-1.5 pt-1">
              {p.courses.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-ink/15 bg-paper-muted/50 px-2.5 py-1 text-xs text-ink-muted dark:border-paper/15 dark:bg-ink/30 dark:text-paper-muted"
                >
                  {c}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-2xl text-sm text-ink-muted dark:text-paper-muted">
        I also teach Game &amp; Web Design and an emerging AI &amp; Automation
        track — see all four tracks below.
      </p>
    </section>
  );
}
