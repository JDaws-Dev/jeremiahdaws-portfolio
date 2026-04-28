import Image from "next/image";
import Link from "next/link";
import type { PortfolioEntry } from "@/lib/portfolio";
import { IconArrowUpRight } from "./icons";

const SLUGS = [
  "apps-beaversbathroomblitz",
  "apps-fridaynightvideo",
  "apps-illprayforyou",
  "apps-artiosconnect",
  "apps-artioscafe",
];

export function AlsoShipped({ entries }: { entries: PortfolioEntry[] }) {
  const byslug = new Map(entries.map((e) => [e.slug, e]));
  const items = SLUGS.map((s) => byslug.get(s)).filter(
    (e): e is PortfolioEntry => Boolean(e)
  );
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-accent">
            Also shipped
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-tight tracking-[-0.01em] md:text-3xl">
            Side projects, weekend builds, scratch-my-own-itch.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted dark:text-paper-muted">
            Most of these started as a question — &ldquo;could I build that in
            a weekend?&rdquo; — and shipped because the answer was yes.
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((e) => {
          const href = e.externalUrl;
          const card = (
            <article className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-paper transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md dark:border-paper/15 dark:bg-ink/40">
              {e.thumbnail ? (
                <div className="relative aspect-video w-full overflow-hidden border-b border-ink/10 bg-ink/5 dark:border-paper/15">
                  <Image
                    src={e.thumbnail}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg leading-tight">{e.title}</h3>
                  {href ? (
                    <IconArrowUpRight className="h-3.5 w-3.5 shrink-0 text-accent" />
                  ) : null}
                </div>
                <p className="line-clamp-3 text-[13px] leading-snug text-ink/70 dark:text-paper/70">
                  {e.summary}
                </p>
                <p className="mt-auto pt-1 text-[10px] uppercase tracking-[0.16em] text-ink-muted dark:text-paper-muted">
                  {e.year}
                </p>
              </div>
            </article>
          );
          return (
            <li key={e.slug}>
              {href ? (
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
