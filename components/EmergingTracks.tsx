import { IconBook, IconSpark } from "./icons";

type Track = {
  Icon: typeof IconBook;
  name: string;
  oneLiner: string;
  proof: string;
  courses: string[];
};

const TRACKS: Track[] = [
  {
    Icon: IconBook,
    name: "Game & Web Design",
    oneLiner:
      "Where storytelling meets interaction. Students learn to think in systems — narrative, mechanics, UX, and code — by shipping a small playable thing.",
    proof: "Backed by: shipped web apps · Beavers Bathroom Blitz (3D web game) · UX-driven indie projects",
    courses: [
      "Game Design",
      "Web Design",
      "UX / UI fundamentals",
      "Construct 3 / WebGL basics",
    ],
  },
  {
    Icon: IconSpark,
    name: "AI & Automation",
    oneLiner:
      "Practical AI for makers. Students wire ChatGPT into Arduino projects, prompt-engineer real workflows, and ship working tools — not theory decks.",
    proof: "Backed by: Founder of AnswerAxis · 150+ tools in JARVIS · 10+ shipped apps",
    courses: [
      "AI vibe-coding",
      "Prompt engineering for makers",
      "Servos + ChatGPT-controlled circuits",
      "Building real apps with AI assistance",
    ],
  },
];

export function EmergingTracks() {
  return (
    <section className="border-y border-ink/10 bg-paper-muted/30 py-14 dark:border-paper/10 dark:bg-ink/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">
              Emerging tracks
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
              Two more tracks.<br />Same teacher.
            </h2>
          </div>
          <p className="text-sm text-ink/75 dark:text-paper/75">
            The Film and Creative-Tech programs are the established ones.
            Game &amp; Web Design and AI &amp; Automation are the newer
            tracks, taught with the same project-based, capstone-oriented
            cadence — and the same insistence that a student should walk
            out with something they made.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {TRACKS.map((t) => (
            <li
              key={t.name}
              className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-paper p-6 dark:border-paper/15 dark:bg-ink/40"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <t.Icon className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-2xl leading-tight tracking-tight">
                  {t.name}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-ink/75 dark:text-paper/75">
                {t.oneLiner}
              </p>
              <ul className="flex flex-wrap gap-1.5 pt-1">
                {t.courses.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-ink/15 bg-paper-muted/50 px-2.5 py-1 text-xs text-ink-muted dark:border-paper/15 dark:bg-ink/30 dark:text-paper-muted"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-2 text-[10px] uppercase tracking-[0.18em] text-accent">
                {t.proof}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
