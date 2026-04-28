import Image from "next/image";
import { IconArrowRight } from "./icons";

const BRANDS = [
  "Disney",
  "Marvel",
  "Lucasfilm",
  "ABC",
  "Freeform",
  "National Geographic",
  "Hallmark",
  "Target",
  "Tormach",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl dark:bg-accent/10" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-accent-muted/15 blur-3xl dark:bg-accent-muted/10" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 md:pb-16 md:pt-28">
        {/* Mobile: photo first, full bleed-ish. Desktop: side-by-side. */}
        <div className="grid gap-8 md:grid-cols-[1.15fr_auto] md:items-center md:gap-12">
          <div className="order-2 min-w-0 md:order-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper-muted/60 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted dark:border-paper/20 dark:bg-ink/40 dark:text-paper-muted sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Open to full-time · Buford, GA
              </div>
            </div>

            <h1
              className="mt-4 font-serif leading-[0.98] tracking-[-0.025em] [overflow-wrap:anywhere]"
              style={{ fontSize: "clamp(2.75rem, 12vw, 5.5rem)" }}
            >
              Jeremiah Daws
            </h1>

            <p className="mt-5 max-w-2xl font-serif text-2xl leading-tight text-ink dark:text-paper sm:text-3xl md:text-[2.1rem]">
              <span className="text-accent">I tell the story.</span>{" "}
              <span className="text-accent">I build the thing.</span>{" "}
              <span className="text-accent">I teach the process.</span>
            </p>

            <p className="mt-5 max-w-2xl text-base leading-snug text-ink/85 dark:text-paper/85 md:text-lg">
              I left the Walt Disney Company to make stuff, teach stuff, and film stuff
              — sometimes in the same week. Six years producing branded video for
              Disney Parks (Marvel, Lucasfilm, ABC, Freeform). Editor on National
              Geographic and Hallmark. SkillsUSA National Silver in CNC turning.
              Tormach brand ambassador. Founder of AnswerAxis.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href="#choose"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper shadow-lg transition hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
              >
                Pick the Jeremiah you need <IconArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#hire"
                className="text-sm font-medium text-ink-muted transition hover:text-accent dark:text-paper-muted"
              >
                or jump to hire →
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative mx-auto aspect-[4/5] w-64 sm:w-80 md:w-72 lg:w-80">
              <div className="absolute inset-0 -rotate-2 rounded-2xl border border-ink/15 dark:border-paper/15" />
              <Image
                src="/headshot.jpg"
                alt="Jeremiah Daws"
                fill
                priority
                sizes="(min-width: 1024px) 20rem, (min-width: 768px) 18rem, (min-width: 640px) 20rem, 16rem"
                className="rounded-2xl object-cover object-[50%_25%] shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Brand strip — under the hero, signals scale at a glance */}
        <div className="mt-10 border-t border-ink/10 pt-5 dark:border-paper/10 md:mt-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-muted dark:text-paper-muted">
            Worked on projects for
          </p>
          <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
            {BRANDS.map((b) => (
              <li
                key={b}
                className="font-serif text-base text-ink/70 dark:text-paper/70"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
