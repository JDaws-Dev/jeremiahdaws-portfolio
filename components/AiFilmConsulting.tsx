import { IconArrowRight } from "./icons";

const HELP = [
  { title: "Story and script", body: "Rewriting a script so it can be generated: fewer locations, clear beats, characters the model can hold onto." },
  { title: "Look and consistency", body: "Designing characters, wardrobe and sets as references, so faces and places stop drifting between shots." },
  { title: "Shot lists", body: "Breaking scenes into shots that fit what the models can do today, with a length and a purpose for each." },
  { title: "Voice and sound", body: "Casting and directing AI voices, then building the sound so it plays like a film, not a demo." },
  { title: "Edit and finish", body: "Cutting, pacing and grading in DaVinci Resolve. This is where most AI films are won or lost." },
  { title: "Pipeline and tools", body: "Which models to use for which shots, what it will cost, and how to keep track of hundreds of takes." },
];

const WAYS = [
  { title: "Notes", body: "I watch your cut or read your script and tell you what's working, what isn't, and how to fix it." },
  { title: "Hands on", body: "I join the project to direct, build shots or cut alongside your team, for a scene or the whole film." },
  { title: "Training", body: "One-on-one AI training, $100 an hour, for anyone who wants to learn to do this themselves." },
];

export function AiFilmConsulting() {
  return (
    <section id="consulting" className="scroll-mt-14 border-t border-ink/10 bg-blue-wash/60 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">AI film consulting</p>
        <div className="mt-2 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h2 className="text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
            Making an AI film? <span className="text-accent">Bring me in.</span>
          </h2>
          <p className="text-base text-ink/75">
            For agencies, brands and filmmakers working on an AI short, spot or
            series. I bring a director&rsquo;s and editor&rsquo;s eye, and a working
            pipeline, to the parts that usually go wrong.
          </p>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {HELP.map((h) => (
            <li key={h.title} className="bg-paper p-6">
              <h3 className="font-serif text-xl leading-tight">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{h.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">Ways to work together</p>
          <ul className="mt-4 grid gap-5 md:grid-cols-3">
            {WAYS.map((w) => (
              <li key={w.title} className="rounded-2xl border border-ink/10 bg-paper p-5">
                <p className="font-serif text-lg leading-tight">{w.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="#hire"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-accent"
        >
          Tell me about your project <IconArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
