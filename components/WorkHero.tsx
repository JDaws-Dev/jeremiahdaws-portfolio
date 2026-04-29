import Link from "next/link";
import { IconArrowRight, IconDownload } from "./icons";

const CREDITS = [
  "Disney",
  "Marvel",
  "Lucasfilm",
  "ABC",
  "Freeform",
  "Target",
  "Nat Geo",
  "Hallmark",
  "Ricky Schroder",
  "Daws Brothers",
];

export function WorkHero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-10">
      <p className="text-xs uppercase tracking-[0.22em] text-accent">
        Filmmaker — Branded · Social · Broadcast · Narrative
      </p>
      <h1
        className="mt-3 font-serif leading-[1.02] tracking-[-0.025em]"
        style={{ fontSize: "clamp(2.75rem, 8vw, 4.5rem)" }}
      >
        I tell the story.<br />
        <span className="text-accent">In whatever cut it takes.</span>
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-base text-ink/80 dark:text-paper/80 md:text-lg">
            Six years <strong>producing branded content</strong> for Disney
            Parks and Disney Consumer Products — Marvel, Lucasfilm, ABC,
            Freeform, Target. <strong>Social-media producer</strong>
            {" "}for ongoing brand clients. <strong>Broadcast editor</strong>
            {" "}on National Geographic&rsquo;s <em>Building Wild</em>,
            Hallmark&rsquo;s <em>Our Wild Hearts</em>, the U.S. Army reality series
            <em> Starting Strong</em>. <strong>Director</strong>
            {" "}on independent narrative features I write and direct with my brother under our
            <em> Daws Brothers</em> banner.
            Producer, director, and editor every season on the productions
            at the private classical school where I built the film and
            creative-technology programs. Story-first, fast turnaround,
            multi-cam comfortable, finishing-friendly.
          </p>
          <p className="mt-4 text-sm text-ink-muted dark:text-paper-muted">
            Long-form narrative, branded shorts, broadcast reality, social
            cuts. Same hands.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#hire"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
            >
              Hire me <IconArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resumes/resume-video.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-paper/30"
            >
              <IconDownload className="h-4 w-4" />
              Video résumé (PDF)
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-ink/10 bg-paper-muted/40 p-5 text-sm dark:border-paper/15 dark:bg-ink/30">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            Credits
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {CREDITS.map((c) => (
              <li
                key={c}
                className="rounded-full border border-ink/15 bg-paper/60 px-2.5 py-1 text-xs text-ink/80 dark:border-paper/15 dark:bg-ink/40 dark:text-paper/85"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-muted dark:text-paper-muted">
            Premiere Pro · Avid · After Effects. Comfortable on multi-cam reality,
            scripted narrative, and 30-second branded social.
          </p>
        </aside>
      </div>
    </section>
  );
}
