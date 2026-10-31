import type { PortfolioEntry } from "@/lib/portfolio";

type Agent = {
  slug: string;
  forWhom: string;
  accent: string;
  oneLiner: string;
  number: string;
  unusualThing: string;
  sampleTools: string[];
};

const AGENTS: Agent[] = [
  {
    slug: "jarvis",
    forWhom: "Mine",
    accent: "🟦",
    oneLiner:
      "A 24/7 personal AI operating system. Telegram-fronted launchd daemon on macOS, Claude Opus on subscription.",
    number: "300+ tools",
    unusualThing:
      "Self-tooling — when a job needs a tool that doesn't exist, JARVIS writes it at runtime.",
    sampleTools: [
      "gmail_triage",
      "calendar_create",
      "brain_note_add",
      "household_person_upsert",
      "playwright_login",
      "applemusic_play",
      "tool_compile",
    ],
  },
  {
    slug: "anna",
    forWhom: "The household",
    accent: "🟪",
    oneLiner:
      "A household assistant modeled on Anna Bates from Downton Abbey — warm, deferential, attentive, never performative.",
    number: "230+ tools",
    unusualThing:
      "Mood-aware: daily message budgets, do-not-disturb windows, conversational permission instead of approval-button cards.",
    sampleTools: [
      "email_learn_sender",
      "menu_plan_week",
      "budget_categorize",
      "host_prep_timeline",
      "open_tab_remember",
      "morning_brief",
      "permission_ask",
    ],
  },
  {
    slug: "mozart",
    forWhom: "A composer",
    accent: "🟧",
    oneLiner:
      "A composer's assistant with a Mozart-inspired persona: playful, sharp, music-literate.",
    number: "Scores · MIDI · stems",
    unusualThing:
      "Renders full multi-voice arrangements: LilyPond → PDF + MIDI + per-voice stems + MP3 preview from a single prompt.",
    sampleTools: [
      "score_analyze",
      "audio_spectral_balance",
      "lilypond_render",
      "compose_scaffold",
      "hooktheory_trends",
      "suno_generate",
      "piece_review_log",
    ],
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
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-blue">
              The household stack
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
              Three agents.<br />One household.
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
          {items.map(({ entry, forWhom, oneLiner, number, unusualThing, sampleTools }) => (
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
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {number}
              </p>
              <p className="text-[13px] leading-relaxed text-ink/70">
                {unusualThing}
              </p>
              <div className="mt-1 rounded-lg border border-ink/10 bg-ink/[0.03] p-3 font-mono text-[10px] leading-relaxed text-ink/65">
                <p className="mb-1.5 text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                  Selected tools
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {sampleTools.map((t) => (
                    <span key={t}>{t}()</span>
                  ))}
                  <span className="text-ink-muted">…</span>
                </div>
              </div>
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
