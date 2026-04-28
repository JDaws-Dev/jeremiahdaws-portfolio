import Image from "next/image";
import Link from "next/link";
import type { PortfolioEntry } from "@/lib/portfolio";
import { IconArrowUpRight } from "./icons";

type Flagship = {
  slug: string;
  tagline: string;
  storyKicker: string;
  proof: string[];
  cta?: { label: string; href: string };
};

const FLAGSHIPS: Flagship[] = [
  {
    slug: "bullfrog-machining",
    tagline:
      "My machine shop in Buford, GA. CNC turning, CNC milling, fabrication, prototype-to-small-batch for paying clients.",
    storyKicker:
      "Paid CNC fab work — including parts for Atlanta-area film productions: steadicam sleds, dolly components, on-set fixtures. Hospitality with horsepower.",
    proof: [
      "Tormach 1100MX (mill) · Tormach 15L Slant Pro (lathe)",
      "Manual Bridgeport · manual lathe · MIG / TIG",
      "Film-industry parts for Atlanta productions",
      "Working shop, not a hobby bench",
    ],
    cta: { label: "Bullfrog Machining on Instagram", href: "https://www.instagram.com/bullfrogmachining/" },
  },
  {
    slug: "youtube-channel",
    tagline:
      "Filmmaker → Machinist. The YouTube channel that documents the pivot. Tormach brand ambassador hosting their Garage Series.",
    storyKicker:
      "Tormach (the CNC manufacturer) tapped me to host their official beginner-CNC tutorials. The channel doubles as a teaching sample and a public proof-of-shop.",
    proof: [
      "Tormach Garage Series — official tutorial host",
      "Top videos: Montessori bed · Ninja Turtles diorama · rideable train",
      "Restoration: Bridgeport mill (Stark Industries makeover)",
      "100+ shop and field videos across YouTube + Instagram",
    ],
    cta: { label: "Visit the channel", href: "https://www.youtube.com/c/JeremiahDaws" },
  },
];

function thumbForEntry(e: PortfolioEntry): string | null {
  if (e.thumbnail) return e.thumbnail;
  if (e.embedUrl) {
    const yt = e.embedUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    if (yt) return `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`;
    const drive = e.embedUrl.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (drive) return `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w1280`;
  }
  return null;
}

export function ShopFlagships({ entries }: { entries: PortfolioEntry[] }) {
  const byslug = new Map(entries.map((e) => [e.slug, e]));
  const items = FLAGSHIPS.map((f) => ({ ...f, entry: byslug.get(f.slug) })).filter(
    (f): f is Flagship & { entry: PortfolioEntry } => Boolean(f.entry)
  );
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-accent">
          The shop &amp; the channel
        </p>
        <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
          One business. One audience. Both real.
        </h2>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map(({ entry, tagline, storyKicker, proof, cta }) => {
          const thumb = thumbForEntry(entry);
          return (
            <li
              key={entry.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper dark:border-paper/15 dark:bg-ink/40"
            >
              {thumb ? (
                <Link
                  href={cta?.href ?? entry.externalUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[16/10] w-full overflow-hidden border-b border-ink/10 bg-ink/5 dark:border-paper/15"
                >
                  {thumb.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  )}
                </Link>
              ) : null}

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <h3 className="font-serif text-2xl leading-tight tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-ink/80 dark:text-paper/85">
                    {tagline}
                  </p>
                </div>

                <p className="text-sm leading-relaxed italic text-ink/65 dark:text-paper/65">
                  {storyKicker}
                </p>

                <ul className="space-y-1.5 text-sm text-ink/75 dark:text-paper/75">
                  {proof.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted dark:text-paper-muted">
                    {entry.role} · {entry.year}
                  </span>
                  {cta ? (
                    <Link
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-paper shadow-sm shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/40"
                    >
                      {cta.label}
                      <IconArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
