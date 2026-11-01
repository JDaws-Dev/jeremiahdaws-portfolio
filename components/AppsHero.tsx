import { IconArrowRight } from "./icons";

const YOU_GET = [
  "A live site or tool on your own domain",
  "The AI assistant set up for your business and your customers",
  "A walkthrough for you and your staff",
  "Scope and price agreed in writing before I start",
];

export function AppsHero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-24 pb-10">
      <p className="text-xs uppercase tracking-[0.22em] text-blue">
        AI builds
      </p>
      <h1
        className="mt-3 font-serif leading-[1.02] tracking-[-0.025em]"
        style={{ fontSize: "clamp(2.75rem, 8vw, 4.5rem)" }}
      >
        Websites and tools<br />
        <span className="text-accent">with AI working inside.</span>
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-base text-ink/80 md:text-lg">
            I build websites and tools with AI working inside them, for small
            businesses and for my own products. A rental site that books and
            takes payment while an assistant answers customers. A cafe the
            staff run by talking to it. A kid-safe app suite with paying
            customers. Everything here is live and in use.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            IDay job: Producer / Director at FORM, where I also rebuilt theapos;m Producer / Director at FORM, where I also rebuilt the
            studio&rsquo;s website. Side work: fixed-price builds, scoped in
            writing, that you own when we&rsquo;re done, plus training so your
            team can run them.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/#hire"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent"
            >
              Start a project <IconArrowRight className="h-4 w-4" />
            </a>

          </div>
        </div>

        <aside className="rounded-2xl border border-ink/10 bg-paper-muted/40 p-5 text-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            What you get
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {YOU_GET.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-muted">
            I design it, write the code and the prompts, and cut the demo
            video myself. You deal with one person from first call to
            hand-off.
          </p>
        </aside>
      </div>
    </section>
  );
}
