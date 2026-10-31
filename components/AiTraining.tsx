import { IconArrowRight } from "./icons";

const OFFERS = [
  {
    label: "For teams",
    title: "AI at work",
    format: "Half day or full day · your team, in one room or on a call",
    body: "A hands-on session built around the work your team already does: email, writing, research, planning, documents. We use your real tasks, not canned demos.",
    leave: "Everyone leaves having used AI on a task they'll do again tomorrow, plus a one-page playbook for your tools.",
  },
  {
    label: "For creatives and marketing teams",
    title: "AI filmmaking",
    format: "One or two days · small group",
    body: "How the films above get made: writing for generation, keeping a look and a character consistent shot to shot, voices and sound, then cutting and grading it like a real edit.",
    leave: "Your team makes a short piece together and learns where AI helps and where it still doesn't.",
  },
  {
    label: "For owners and builders",
    title: "Build it with me",
    format: "A few sessions · one-on-one or a small group",
    body: "Learn to build with AI by building the thing you need: an internal tool, a site, an assistant for your business. You drive, I coach.",
    leave: "You end with a working tool you own, and you know how to change it yourself.",
  },
];

const AGENDA = [
  { t: "Part 1", d: "What these tools are good at, bad at, and safe for, shown on your own documents." },
  { t: "Part 2", d: "Everyone brings a task they do every week. We do it together, with AI, until it works." },
  { t: "Part 3", d: "We write your team's playbook: the prompts that worked, and the rules for what never goes in." },
];

const RECORD = [
  "Four years as a department head, 2022–2026",
  "Built two film and creative-technology programs from zero",
  "Twelve-plus courses, fifty-plus students",
];

export function AiTraining() {
  return (
    <section id="training" className="scroll-mt-14 bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">AI training</p>
        <div className="mt-2 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h2 className="text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
            I teach people to use AI <span className="text-accent">on their actual work.</span>
          </h2>
          <p className="text-base text-ink/75">
            I use these tools every day to make the films and run the builds on
            this page, and I taught for four years before that. Sessions are in
            person around Atlanta or remote, shaped to your team.
          </p>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 md:grid-cols-3">
          {OFFERS.map((o) => (
            <li key={o.title} className="flex flex-col bg-paper p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {o.label}
              </p>
              <h3 className="mt-2 font-serif text-2xl leading-tight">{o.title}</h3>
              <p className="mt-1 text-xs text-ink-muted">{o.format}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{o.body}</p>
              <div className="mt-auto pt-5">
                <p className="border-t border-ink/10 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue">
                  You leave with
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/85">{o.leave}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-ink/10 bg-paper-muted/40 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
            What a team half day looks like
          </p>
          <ol className="mt-4 grid gap-5 md:grid-cols-3">
            {AGENDA.map((a) => (
              <li key={a.t}>
                <p className="font-serif text-lg leading-tight">{a.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/75">{a.d}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Teaching record
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-ink/80">
              {RECORD.map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <a
            href="#hire"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-accent"
          >
            Plan a session <IconArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
