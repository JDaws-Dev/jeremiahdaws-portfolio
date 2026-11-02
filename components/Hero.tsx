import type { CSSProperties } from "react";
import { HeroReel } from "./HeroReel";
import { IconArrowRight, IconPlay } from "./icons";

const BRANDS = [
  "FORM",
  "Disney",
  "Marvel",
  "Lucasfilm",
  "ABC",
  "Freeform",
  "National Geographic",
  "Hallmark",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-soft/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 md:pb-16 md:pt-28">
        {/* Mobile: a frame from the film first. Desktop: side by side. */}
        <div className="grid gap-8 md:grid-cols-[1fr_1.05fr] md:items-center md:gap-12">
          <div className="hero-in order-2 min-w-0 md:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper-muted/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Producer · Director · Editor · Atlanta
            </div>

            <h1
              className="mt-4 font-serif leading-[0.98] tracking-[-0.025em] [overflow-wrap:anywhere]"
              style={{ fontSize: "clamp(2.75rem, 10vw, 5rem)" }}
            >
              Jeremiah Daws
            </h1>

            <p className="mt-5 max-w-xl text-balance font-serif text-2xl leading-tight text-ink sm:text-3xl">
              I produce, direct and edit films.
            </p>

            <p className="mt-5 max-w-xl text-base leading-snug text-ink/85 md:text-lg">
              Producer / Director at FORM, an Atlanta story company, where I
              direct the animated comedy <em>Calendar Jockeys</em>. Before that,
              six years producing and editing marketing video for Disney. Before
              Disney, freelance editing for National Geographic and Hallmark.
              Along the way, indie features with my brother, and lately short
              films made with AI.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper shadow-lg transition hover:bg-accent"
              >
                <IconPlay className="h-3.5 w-3.5" /> See the work
              </a>
              <a
                href="#hire"
                className="nudge inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent"
              >
                Get in touch <IconArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <HeroReel />
        </div>

        <div className="mt-10 border-t border-ink/10 pt-5 md:mt-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue">
            Brand and broadcast work for
          </p>
          <ul className="brands-in mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
            {BRANDS.map((b, i) => (
              <li key={b} className="font-serif text-base text-ink/70" style={{ "--i": i } as CSSProperties}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
