import { IconArrowRight } from "./icons";

export function AiFilmConsulting() {
  return (
    <section id="consulting" className="scroll-mt-14 border-t border-ink/10 bg-blue-wash/60 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">AI consulting</p>
        <div className="mt-2 grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-end">
          <h2 className="text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
            Working with AI? <span className="text-accent">Bring me in.</span>
          </h2>
          <div className="space-y-3 text-base text-ink/75">
            <p>
              I consult on AI projects, from films and spots to the tools and
              workflows behind them. If you&rsquo;re figuring out where AI fits, or
              stuck partway through, I can help.
            </p>
            <p>One-on-one AI training is $100 an hour.</p>
          </div>
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
