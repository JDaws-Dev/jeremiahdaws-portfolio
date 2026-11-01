import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "./icons";

const CREDITS = [
  { org: "FORM", what: "Producer / Director · Calendar Jockeys", years: "2026–" },
  { org: "Disney Parks & Consumer Products", what: "Producer and director · Marvel, Lucasfilm, ABC, Freeform, Target", years: "2015–2021" },
  { org: "National Geographic", what: "Editor · Building Wild", years: "2014" },
  { org: "Hallmark", what: "Editor · Our Wild Hearts", years: "2013" },
  { org: "Daws Brothers", what: "Indie features and shorts, written and directed with my brother", years: "2012–2020" },
  { org: "Freelance editor", what: "Short-form editing for Disney Parks marketing and Disney Consumer Products", years: "2010–2015" },
];

export function Background() {
  return (
    <section id="background" className="scroll-mt-14 bg-paper py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1.4fr]">
        <div data-reveal>
          <div className="relative mb-6 aspect-square w-24 overflow-hidden rounded-full border border-ink/10">
            <Image src="/headshot.jpg" alt="Jeremiah Daws" fill sizes="6rem" className="object-cover object-[50%_25%]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">Background</p>
          <h2 className="mt-2 text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
            Fifteen years of <span className="text-accent">real production</span> behind it.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/75">
            AI didn&rsquo;t teach me story, pacing or a clean cut. Broadcast and
            brand work did. That&rsquo;s what I bring to the tools.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            <Link href="/work" className="nudge inline-flex items-center gap-1.5 text-ink transition hover:text-accent">
              All film work <IconArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/apps" className="inline-flex items-center gap-1.5 text-ink-muted transition hover:text-accent">
              AI builds <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <ul className="divide-y divide-ink/10 border-y border-ink/10" data-stagger="70">
          {CREDITS.map((c) => (
            <li key={c.org} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
              <div>
                <p className="font-serif text-lg leading-tight">{c.org}</p>
                <p className="mt-0.5 text-sm text-ink/70">{c.what}</p>
              </div>
              <p className="text-xs uppercase tracking-[0.14em] text-ink-muted [font-variant-numeric:tabular-nums] sm:pt-1">
                {c.years}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
