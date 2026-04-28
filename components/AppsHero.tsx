import Link from "next/link";
import { IconArrowRight, IconDownload } from "./icons";

const STACK = [
  "Next.js",
  "TypeScript",
  "Convex",
  "Stripe",
  "Anthropic",
  "MCP",
  "Vapi",
  "SQLite",
  "Playwright",
  "Vercel",
];

export function AppsHero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-10">
      <p className="text-xs uppercase tracking-[0.22em] text-accent">
        Apps & AI — Founder · Engineer
      </p>
      <h1
        className="mt-3 font-serif leading-[1.02] tracking-[-0.025em]"
        style={{ fontSize: "clamp(2.75rem, 8vw, 4.5rem)" }}
      >
        I build AI systems<br />
        <span className="text-accent">people actually use.</span>
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-base text-ink/80 dark:text-paper/80 md:text-lg">
            Tech early adopter who cares less about the tech than what it
            does for people. Call it digital hospitality: a kid opens an app
            and finds nothing they shouldn&rsquo;t; a homeowner calls a
            plumber at 9pm and a warm voice picks up; my wife&rsquo;s
            half-finished thoughts get held until she needs them. Same
            work, different surfaces.
          </p>
          <p className="mt-4 text-sm text-ink-muted dark:text-paper-muted">
            Two products with paying customers. Three agents running my
            household. The systems plumbing under all of it.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#hire"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
            >
              Hire me <IconArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resumes/resume-tech.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-paper/30"
            >
              <IconDownload className="h-4 w-4" />
              Apps &amp; AI résumé (PDF)
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-ink/10 bg-paper-muted/40 p-5 text-sm dark:border-paper/15 dark:bg-ink/30">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            Stack &amp; systems
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {STACK.map((s) => (
              <li
                key={s}
                className="rounded-full border border-ink/15 bg-paper/60 px-2.5 py-1 text-xs text-ink/80 dark:border-paper/15 dark:bg-ink/40 dark:text-paper/85"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-muted dark:text-paper-muted">
            I write TypeScript end-to-end. I design the schema, I write the
            backend, I write the prompts, I draw the UI, I edit the demo
            video. One person, full stack, shipping weekly.
          </p>
        </aside>
      </div>
    </section>
  );
}
