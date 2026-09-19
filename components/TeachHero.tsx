import Link from "next/link";
import { IconArrowRight, IconDownload } from "./icons";

const RECORD = [
  "Department Head, Film & Creative Technology",
  "Two programs built from zero",
  "12+ courses · 50+ students",
  "22 productions on the school's streaming platform",
  "2022–2026 · metro Atlanta",
];

export function TeachHero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-10">
      <p className="text-xs uppercase tracking-[0.22em] text-blue">
        Teacher — Former Department Head · Curriculum designer
      </p>
      <h1
        className="mt-3 font-serif leading-[1.02] tracking-[-0.025em]"
        style={{ fontSize: "clamp(2.75rem, 8vw, 4.5rem)" }}
      >
        I teach the process.<br />
        <span className="text-accent">From idea to finished cut.</span>
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-base text-ink/80 md:text-lg">
            As Department Head, I built two academic programs from zero — Film &amp; Story and
            Creative Technology — at a private classical school in metro
            Atlanta, 2022 to 2026. <strong>Twelve-plus courses, fifty-plus students,
            twenty-two productions.</strong> Screenwriting through Arduino,
            Film History through Fusion 360, Editing through embedded
            computing. The idea was simple: I&rsquo;d done the work (Disney,
            Nat Geo, Hallmark, SkillsUSA Silver), so I taught the craft the way
            professionals actually practice it. Now I&rsquo;m back in the
            studio full-time as Producer / Director at FORM, and I still teach
            adults and teams to use AI as a consultant.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Project-based, capstone-oriented, story-first. Students left
            with a finished short, a printed prop, a shipped game, or a
            working AI tool — and an editor&rsquo;s eye for what makes work
            land.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent"
            >
              Get in touch <IconArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resumes/resume-education.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
            >
              <IconDownload className="h-4 w-4" />
              Education résumé (PDF)
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-ink/10 bg-paper-muted/40 p-5 text-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            The record
          </p>
          <ul className="mt-3 space-y-1.5 text-ink/80">
            {RECORD.map((o) => (
              <li key={o} className="flex gap-2">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-muted">
            Curriculum samples and syllabi available on request for schools
            building a similar program.
          </p>
        </aside>
      </div>
    </section>
  );
}
