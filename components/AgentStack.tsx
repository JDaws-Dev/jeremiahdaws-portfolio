import type { PortfolioEntry } from "@/lib/portfolio";

type Agent = {
  slug: string;
  forWhom: string;
  oneLiner: string;
  unusualThing: string;
};

const AGENTS: Agent[] = [
  {
    slug: "jarvis",
    forWhom: "Mine",
    oneLiner:
      "My own assistant. I text it like a chief of staff: it reads and drafts email, keeps the calendar, researches, and files things where I'll find them.",
    unusualThing:
      "When a job needs a tool it doesn't have yet, it writes one.",
  },
  {
    slug: "anna",
    forWhom: "The household",
    oneLiner:
      "A household assistant: meal plans, grocery lists, school email, the family calendar, and the follow-ups that usually fall through the cracks.",
    unusualThing:
      "It knows when not to talk: quiet hours, a daily limit on nudges, and it asks before it acts.",
  },
  {
    slug: "mozart",
    forWhom: "A composer",
    oneLiner:
      "A composer's assistant with a Mozart-inspired voice: theory, feedback on new pieces, and practice.",
    unusualThing:
      "Turns a written arrangement into a printed score, MIDI, and an audio preview.",
  },
];

export function AgentStack({ entries }: { entries: PortfolioEntry[] }) {
  const byslug = new Map(entries.map((e) => [e.slug, e]));
  const items = AGENTS.map((a) => ({ ...a, entry: byslug.get(a.slug) })).filter(
    (a): a is Agent & { entry: PortfolioEntry } => Boolean(a.entry)
  );
  if (items.length === 0) return null;

  return (
    <section className="border-t border-ink/10 bg-paper-muted/30 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-blue">
              The household stack
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
              Three assistants,<br />in daily use.
            </h2>
          </div>
          <p className="text-sm text-ink/75">
            Three assistants for three people in one family, running every
            day. They share a household store, hand work to each other, and
            stay in their lanes: each one has its own voice and its own
            limits on what it may do without asking. Getting those limits
            right was harder than the code.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map(({ entry, forWhom, oneLiner, unusualThing }) => (
            <li
              key={entry.slug}
              className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper p-6"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                {forWhom}
              </p>
              <h3 className="font-serif text-2xl leading-tight tracking-tight">
                {entry.title.split("—")[0].trim()}
              </h3>
              <p className="text-sm leading-relaxed text-ink/75">
                {oneLiner}
              </p>
              <p className="border-t border-ink/10 pt-3 text-[13px] leading-relaxed text-ink/80">
                {unusualThing}
              </p>
              <p className="mt-auto pt-2 text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                {entry.role.split("·")[0].trim()} · {entry.year}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
