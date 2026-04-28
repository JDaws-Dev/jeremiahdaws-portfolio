import Image from "next/image";
import Link from "next/link";
import type { PortfolioEntry } from "@/lib/portfolio";

type Build = {
  slug: string;
  format: string;
  storyKicker: string;
  thumb: string;
  href?: string;
};

const BUILDS: Build[] = [
  {
    slug: "lumiere-prop",
    format: "Theatrical prop · 2024",
    storyKicker:
      "A working Lumière candelabra for a school production of Beauty and the Beast — 3D-scanned from Disney source, sliced, printed, painted, wired, lit. Stage-ready. The kind of prop most schools rent; we built ours.",
    thumb: "/portfolio/ig-thumbs/C8meuRVOK-U.jpg",
    href: "https://www.instagram.com/jeremiahdaws/reel/C8meuRVOK-U/",
  },
  {
    slug: "film-industry-fabrication",
    format: "Commercial fab · ongoing",
    storyKicker:
      "Paid CNC fab work for Atlanta-area film productions — steadicam sled, dolly components, on-set fixtures. Bullfrog Machining clients who need a part on the truck Tuesday morning.",
    thumb: "/portfolio/ig-thumbs/Ch7jk4frlEm.jpg",
    href: "https://www.instagram.com/jeremiahdaws/p/Ch7jk4frlEm/",
  },
  {
    slug: "fidgetcraft",
    format: "Product · 2022–23",
    storyKicker:
      "Designed, manufactured, and sold a magnetic fidget toy on Etsy. End-to-end: CAD, machining, assembly, photography, listings, fulfillment. Small business, real revenue, real shipping.",
    thumb: "/portfolio/ig-thumbs/CnHbyDoJiv8.jpg",
    href: "https://www.instagram.com/jeremiahdaws/reel/CnHbyDoJiv8/",
  },
];

export function SignatureBuilds({ entries }: { entries: PortfolioEntry[] }) {
  const byslug = new Map(entries.map((e) => [e.slug, e]));
  const items = BUILDS.map((b) => ({ ...b, entry: byslug.get(b.slug) })).filter(
    (b): b is Build & { entry: PortfolioEntry } => Boolean(b.entry)
  );
  if (items.length === 0) return null;

  return (
    <section className="border-y border-ink/10 bg-paper-muted/30 py-14 dark:border-paper/10 dark:bg-ink/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">
              Signature builds
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
              Three builds.<br />Three different tools.
            </h2>
          </div>
          <p className="text-sm text-ink/75 dark:text-paper/75">
            A theatrical prop. A film-industry production part. A small-batch
            consumer product. Different muscles — but the same span:
            CAD-to-cut, design-to-ship, scan-to-screen. The proof that the
            shop isn&rsquo;t one-trick.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map(({ entry, format, storyKicker, thumb, href }) => (
            <li
              key={entry.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper dark:border-paper/15 dark:bg-ink/40"
            >
              <Link
                href={href ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/5] w-full overflow-hidden border-b border-ink/10 bg-ink/5 dark:border-paper/15"
                aria-label={`Open ${entry.title}`}
              >
                <Image
                  src={thumb}
                  alt={entry.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
                <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-ink/10 to-transparent p-4 text-paper opacity-0 transition group-hover:opacity-100">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Watch the build →
                  </span>
                </span>
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  {format}
                </p>
                <h3 className="font-serif text-xl leading-tight tracking-tight">
                  {entry.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink/75 dark:text-paper/75">
                  {storyKicker}
                </p>
                <p className="mt-auto pt-2 text-[10px] uppercase tracking-[0.18em] text-ink-muted dark:text-paper-muted">
                  {entry.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
