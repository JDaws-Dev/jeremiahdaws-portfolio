import { IconPlay } from "./icons";

const CREDITS = [
  "FORM",
  "Disney",
  "Marvel",
  "Lucasfilm",
  "ABC",
  "Freeform",
  "Target",
  "Nat Geo",
  "Hallmark",
  "Daws Brothers",
];

export function WorkHero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-10">
      <p className="text-xs uppercase tracking-[0.22em] text-blue">
        Filmmaker · AI · Branded · Broadcast · Narrative
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
          <p className="text-base text-ink/80 md:text-lg">
            Producer / Director at{" "}
            <a href="https://www.formgreatstories.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-ink/30 underline-offset-4 transition hover:text-accent">FORM</a>,
            an Atlanta story company, where I direct the Form Films animated
            comedy <em>Calendar Jockeys</em>.
          </p>
          <p className="mt-3 text-base text-ink/80 md:text-lg">
            Before that, six years producing branded content for Disney, and
            broadcast editing for National Geographic, Hallmark and the U.S.
            Army series <em>Starting Strong</em>.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#films"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent"
            >
              <IconPlay className="h-3.5 w-3.5" /> Watch the films
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-ink/10 bg-paper-muted/40 p-5 text-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            Credits
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {CREDITS.map((c) => (
              <li
                key={c}
                className="rounded-full border border-ink/15 bg-paper/60 px-2.5 py-1 text-xs text-ink/80"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-muted">
            DaVinci Resolve · Premiere Pro · Avid · After Effects. Comfortable on
            multi-cam reality, scripted narrative, and 30-second branded social.
          </p>
          <p className="mt-3 text-xs text-ink-muted">
            <strong className="text-ink/80">Resolve + Claude Code:</strong>{" "}
            I automate the prep. Footage lands in bins sorted by episode, every
            take traces back to where it came from, and a stringout is built
            before I sit down to cut.
          </p>
        </aside>
      </div>
    </section>
  );
}
