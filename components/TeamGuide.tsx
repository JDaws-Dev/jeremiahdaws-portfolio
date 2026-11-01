import { IconArrowRight } from "./icons";

/*
 * StoryBrand band. The visitor's team is the hero; Jeremiah is the guide.
 * Problem (external / internal / philosophical) → guide (empathy + authority)
 * → three-step plan → what's at stake → one direct call to action.
 * Scope is AI tools, workflows and training only, never film or video work
 * (that's FORM's business; see the site rules).
 */

const PROOF = [
  { v: "15 yrs", l: "in production before AI" },
  { v: "4", l: "short films made entirely with AI" },
  { v: "150+", l: "tools in the AI assistant I built and use daily" },
];

const PLAN = [
  { n: "01", t: "Tell me where you're stuck.", b: "A sentence or a page. What you've tried, what's eating your week." },
  { n: "02", t: "Get a plan in writing.", b: "A short call, then a written plan with scope and price before anything starts." },
  { n: "03", t: "Get it working.", b: "Tools set up, workflows written down, and your people trained to run them without me." },
];

export function TeamGuide() {
  return (
    <section id="teams" className="scroll-mt-14 bg-blue-wash py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16" data-reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">AI for your team</p>
            <h2 className="mt-2 text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
              Your team knows AI matters.{" "}
              <span className="text-accent">Getting it to work is the hard part.</span>
            </h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-ink/80">
              A new tool every week, subscriptions nobody opens, a few experiments
              that never became how you actually work. It&rsquo;s easy to feel
              behind. AI should make good people faster, not replace the judgment
              that makes the work good.
            </p>
          </div>
          <div className="md:pt-8">
            <p className="text-base leading-relaxed text-ink/80">
              I&rsquo;ve been where you are. I spent fifteen years in production
              before any of this, then learned to make whole films with AI and
              built the tools I now use every day. I&rsquo;ll get your team there,
              in plain English.
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-ink/10 pt-5">
              {PROOF.map((p) => (
                <div key={p.l}>
                  <dt className="sr-only">{p.l}</dt>
                  <dd className="font-serif text-2xl leading-none text-ink [font-variant-numeric:tabular-nums] md:text-3xl">{p.v}</dd>
                  <dd className="mt-1.5 text-xs leading-snug text-ink-muted">{p.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-3" data-stagger="120">
          {PLAN.map((s) => (
            <li key={s.n} className="rounded-xl border border-ink/10 bg-paper p-6">
              <p className="font-mono text-xs tracking-[0.18em] text-accent">{s.n}</p>
              <h3 className="mt-3 font-serif text-xl leading-tight">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">{s.b}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between" data-reveal>
          <p className="max-w-2xl text-sm leading-relaxed text-ink/75">
            <span className="font-medium text-ink">Without a plan:</span>{" "}more
            subscriptions, more experiments, the same old way of working.{" "}
            <span className="font-medium text-ink">With one:</span>{" "}a team that
            uses AI on real work every day, and doesn&rsquo;t need me around to
            keep it going.
          </p>
          <a
            href="#hire"
            className="nudge inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper shadow-lg transition hover:bg-accent md:self-auto"
          >
            Get AI working for your team <IconArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
