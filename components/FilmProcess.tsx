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
  { src: "/portfolio/stills/waystb-joey.jpg", alt: "Joey, seven, holds up the paper bag he means to wear" },
  { src: "/portfolio/stills/waystb-draw.jpg", alt: "A child's hand draws a red crayon smile on the bag" },
  { src: "/portfolio/stills/waystb-mask.jpg", alt: "Joey pulls the paper-bag mask over his head" },
  { src: "/portfolio/stills/waystb-search.jpg", alt: "His older brother Tyler searches a foggy street at night" },
];

export function FilmProcess() {
  return (
    <section id="process" className="scroll-mt-14 bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">How I make them</p>
        <div className="mt-2 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h2 className="text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
            Keeping a character the same <span className="text-accent">from shot to shot.</span>
          </h2>
          <p className="text-base text-ink/75">
            Four frames from <em>What Are You Supposed To Be?</em>: the same
            boys and the same bag, held across separate generations in
            Seedance 2.5. The hard part of an AI film is the same as any film:
            keeping the story and the character intact from the first shot to
            the last.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {FRAMES.map((f) => (
            <li key={f.src} className="relative aspect-video overflow-hidden rounded-lg bg-black">
              <Image src={f.src} alt={f.alt} fill sizes="(min-width: 768px) 18rem, 50vw" className="object-cover" />
            </li>
          ))}
        </ul>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-ink/15 pt-4">
              <p className="font-serif text-2xl leading-none text-accent">{i + 1}</p>
              <h3 className="mt-2 font-serif text-xl leading-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
