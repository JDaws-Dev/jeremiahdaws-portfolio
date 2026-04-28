import Link from "next/link";
import type { PortfolioEntry } from "@/lib/portfolio";
import { FeaturedCard } from "./FeaturedCard";
import { IconArrowRight } from "./icons";

export function Featured({ entries, total }: { entries: PortfolioEntry[]; total: number }) {
  return (
    <section id="featured" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Featured work</p>
          <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
            Six pieces that show the range.
          </h2>
        </div>
        <Link
          href="/work"
          className="hidden items-center gap-2 text-sm font-medium text-ink-muted transition hover:text-accent dark:text-paper-muted dark:hover:text-accent md:inline-flex"
        >
          See all <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <FeaturedCard key={entry.slug} entry={entry} />
        ))}
      </div>

      <div className="mt-8 md:hidden">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-paper/30 dark:hover:border-accent dark:hover:text-accent"
        >
          See all work <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
