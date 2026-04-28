import Link from "next/link";
import { IconArrowRight, IconDownload } from "./icons";

const OPEN_TO = [
  "Christian classical schools (existing or new)",
  "Community colleges & trade schools",
  "Maker / makerspace cohorts",
  "Summer programs & capstones",
  "One-off masterclasses or workshops",
];

export function TeachHero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-10">
      <p className="text-xs uppercase tracking-[0.22em] text-accent">
        Teacher — Department Head · Curriculum designer
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
          <p className="text-base text-ink/80 dark:text-paper/80 md:text-lg">
            I built two academic programs from zero — Film &amp; Story and
            Creative Technology — at a private classical school in metro
            Atlanta. <strong>Twelve-plus courses, fifty-plus students,
            twenty-two productions.</strong> Screenwriting through Arduino,
            Film History through Fusion 360, Editing through embedded
            computing. The pitch isn&rsquo;t &ldquo;I love kids.&rdquo; The
            pitch is: I&rsquo;ve actually done the work — Disney, Nat Geo,
            Hallmark, SkillsUSA Silver, founder of an AI consulting business
            — and I can teach the craft the way professionals actually
            practice it.
          </p>
          <p className="mt-4 text-sm text-ink-muted dark:text-paper-muted">
            Project-based, capstone-oriented, story-first. Students leave
            with a finished short, a printed prop, a shipped game, or a
            working AI tool — and an editor&rsquo;s eye for what makes work
            land.
          </p>
          <p className="mt-3 text-sm text-ink/75 dark:text-paper/75">
            <strong>I&rsquo;m the right hire if you&rsquo;re</strong> a
            Christian classical school starting a film or creative-tech
            department, a community college needing a working professional to
            anchor a media program, a school filling gaps in its existing
            arts/tech curriculum, or any institution that wants the kids
            taught the way professionals do it.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#hire"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
            >
              Hire me <IconArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resumes/resume-education.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-paper/30"
            >
              <IconDownload className="h-4 w-4" />
              Education résumé (PDF)
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-ink/10 bg-paper-muted/40 p-5 text-sm dark:border-paper/15 dark:bg-ink/30">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            Open to
          </p>
          <ul className="mt-3 space-y-1.5 text-ink/80 dark:text-paper/85">
            {OPEN_TO.map((o) => (
              <li key={o} className="flex gap-2">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-muted dark:text-paper-muted">
            Full-time, contract, single course, or summer-intensive. Atlanta
            area or remote with on-site weeks.
          </p>
        </aside>
      </div>
    </section>
  );
}
