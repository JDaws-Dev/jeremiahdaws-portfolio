import { IconArrowRight } from "./icons";

const OFFERS = [
  {
    label: "For teams",
    title: "AI for your whole team",
    body: "A hands-on workshop built around your real work: email, writing, research, planning, documents. Everyone leaves using AI on something they'll do again tomorrow.",
    points: ["Half day or full day", "Your tasks, not canned demos", "A one-page playbook to keep"],
  },
  {
    label: "For creatives",
    title: "AI filmmaking",
    body: "How I make the films above: writing for generation, building a look that holds shot to shot, voices and sound, then finishing in DaVinci Resolve like a real edit.",
    points: ["Seedance, ElevenLabs, Resolve", "Shot lists that generate well", "Where AI helps and where it doesn't"],
  },
  {
    label: "For builders",
    title: "Build-along coaching",
    body: "Learn to build with AI by building the thing you need: an internal tool, a website, an assistant for your business. You drive, I coach, and you keep what we make.",
    points: ["Claude Code and vibe coding", "One-on-one or small group", "Ends with a working tool"],
  },
];

export function AiTraining() {
  return (
    <section id="training" className="scroll-mt-14 bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">AI training</p>
        <div className="mt-2 grid gap-4 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h2 className="text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
            I teach people to use AI <span className="text-accent">on their actual work.</span>
          </h2>
          <p className="text-base text-ink/75">
            Everything I teach, I use every day: to make films, run a household of AI
            assistants, and ship tools for clients. In person around Atlanta or remote.
          </p>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {OFFERS.map((o) => (
            <li key={o.title} className="flex flex-col bg-paper p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {o.label}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight">{o.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{o.body}</p>
              <ul className="mt-5 space-y-1.5 border-t border-ink/10 pt-4 text-sm text-ink/80">
                {o.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <a
          href="#hire"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-accent"
        >
          Plan a training <IconArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
