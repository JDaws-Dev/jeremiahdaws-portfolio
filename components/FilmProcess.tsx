import Image from "next/image";

const STEPS = [
  {
    title: "Story before shots",
    body: "Nothing generates until the story holds up. I write the ending first, then test the beat sheet: where it turns, how long each beat gets, what the first image has to set up.",
  },
  {
    title: "A look that holds",
    body: "Characters, wardrobe and locations are designed and approved as references before any shot, so the same kid, the same bag and the same street come back shot after shot.",
  },
  {
    title: "Shots that generate",
    body: "Every shot serves a beat and fits its length. Every take is logged with the prompt and references that made it, so any shot can be made again.",
  },
  {
    title: "Finished like a film",
    body: "Voices and sound in ElevenLabs, then cut and graded in DaVinci Resolve, where every clip traces back to the take that made it.",
  },
];

const FRAMES = [
  { src: "/portfolio/stills/waystb-joey-living.jpg", alt: "Joey, seven, holds the paper bag he means to wear" },
  { src: "/portfolio/stills/waystb-joey-porch.jpg", alt: "Joey on the front porch at dusk" },
  { src: "/portfolio/stills/waystb-joey-street.jpg", alt: "Joey in his paper-bag mask, trick-or-treating alone" },
  { src: "/portfolio/stills/waystb-joey-night.jpg", alt: "Joey, still masked, back on a porch late at night" },
];

export function FilmProcess() {
  return (
    <section id="process" className="scroll-mt-14 bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">How I make them</p>
        <div className="mt-2 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end fade-only" data-reveal>
          <h2 className="text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
            Keeping a character the same <span className="text-accent">from shot to shot.</span>
          </h2>
          <p className="text-base text-ink/75">
            Four shots of Joey from <em>What Are You Supposed To Be?</em>:
            the same boy, the same striped shirt and the same paper bag, from
            the living room to the street at night, each a separate generation
            in Seedance 2.5. The hard part of an AI film is the same as any film:
            keeping the story and the character intact from the first shot to
            the last.
          </p>
        </div>

        <ul className="wipe mt-8 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3" data-stagger="110">
          {FRAMES.map((f) => (
            <li key={f.src} className="relative aspect-video overflow-hidden rounded-lg bg-black">
              <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 18rem, 50vw" className="object-cover transition duration-700 motion-safe:hover:scale-105" />
            </li>
          ))}
        </ul>

        <ol className="fade-only after-wipe mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" data-stagger="120">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-ink/15 pt-4">
              <p className="font-mono text-xs tracking-[0.2em] text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-serif text-xl leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{s.body}</p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
