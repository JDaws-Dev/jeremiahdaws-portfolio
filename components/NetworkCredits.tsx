import Image from "next/image";
import type { PortfolioEntry } from "@/lib/portfolio";

type Credit = {
  slug: string;
  cardTitle: string;
  hat: string;
  client: string;
  years: string;
  storyKicker: string;
  highlights: string[];
};

const CREDITS: Credit[] = [
  {
    slug: "disney-director",
    cardTitle: "Branded campaigns",
    hat: "Director / Producer",
    client: "Disney Yellow Shoes · Disney Consumer Products",
    years: "2015–2021",
    storyKicker:
      "Brand spots and integrated campaigns under tight clocks. Marvel, Lucasfilm, ABC, Freeform, and Target × Disney work — get the talent, get the shot, get the cut, get the air date.",
    highlights: [
      "Target × Disney — Backyard Theater (Disney Channel/XD, $1.5M campaign)",
      "WDW Halloween Hitlist · WDW Thattaway × Zombies",
      "Marvel · Lucasfilm · ABC · Freeform brand work",
      "Social, broadcast, and commercial cuts shipped to Disney Parks",
    ],
  },
  {
    slug: "disney-producer",
    cardTitle: "Parks production",
    hat: "Producer",
    client: "Disney Parks · Yellow Shoes",
    years: "2015–2021",
    storyKicker:
      "Producer-on-the-ground for the Disney Parks influencer + brand pipeline. Multi-cam shoots inside the parks, on hospitality budgets, from greenlight through delivery.",
    highlights: [
      "Mickey & Minnie's Runaway Railway — :90s spot",
      "Glamping in Pandora (Animal Kingdom)",
      "Bucket List Family — 30 Stays in 30 Days",
      "Influencer programs · brand integrations · in-park operations",
    ],
  },
  {
    slug: "disney-editor",
    cardTitle: "Broadcast & feature editing",
    hat: "Editor",
    client: "National Geographic · Hallmark · U.S. Army (Ricky Schroder) · Disney short-form",
    years: "2010–2021",
    storyKicker:
      "Multi-cam reality, broadcast finishing, feature-length narrative. The cut is where the story actually happens — both on the network side and inside Disney for short-form social.",
    highlights: [
      "Building Wild — National Geographic (multi-episode)",
      "Starting Strong — U.S. Army reality series (produced by Ricky Schroder)",
      "Our Wild Hearts — Hallmark feature",
      "Disney short-form: Acapella Sing Off, Tsum Tsum Kingdom, Disney Store",
      "Avid · Premiere Pro · After Effects",
    ],
  },
];

function thumbForEntry(e: PortfolioEntry): string | null {
  if (e.thumbnail) return e.thumbnail;
  if (e.embedUrl) {
    const drive = e.embedUrl.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (drive) return `https://drive.google.com/thumbnail?id=${drive[1]}&sz=w1280`;
    const yt = e.embedUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    if (yt) return `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`;
    const vimeo = e.embedUrl.match(/vimeo\.com\/(\d+)/);
    if (vimeo) return `https://vumbnail.com/${vimeo[1]}.jpg`;
  }
  return null;
}

export function NetworkCredits({ entries }: { entries: PortfolioEntry[] }) {
  const byslug = new Map(entries.map((e) => [e.slug, e]));
  const items = CREDITS.map((c) => ({ ...c, entry: byslug.get(c.slug) })).filter(
    (c): c is Credit & { entry: PortfolioEntry } => Boolean(c.entry)
  );
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-accent">
          Studio &amp; broadcast credits
        </p>
        <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
          Three kinds of work. One résumé.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-ink-muted dark:text-paper-muted">
          Six years inside Disney as Director, Producer, and short-form Editor
          (Yellow Shoes Parks marketing + Disney Consumer Products: Marvel,
          Lucasfilm, ABC, Freeform). Plus broadcast Editor credits at National
          Geographic, Hallmark, and the U.S. Army reality series produced by
          Ricky Schroder.
        </p>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {items.map(({ entry, cardTitle, hat, client, years, storyKicker, highlights }) => {
          const thumb = thumbForEntry(entry);
          return (
            <li
              key={entry.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper dark:border-paper/15 dark:bg-ink/40"
            >
              <div className="group relative block aspect-video w-full overflow-hidden border-b border-ink/10 bg-ink/5 dark:border-paper/15">
                {thumb ? (
                  thumb.startsWith("http") ? (
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
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  )
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-ink/80 to-accent/40 text-paper">
                    {cardTitle}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
                  {hat}
                </p>
                <h3 className="font-serif text-xl leading-tight tracking-tight">
                  {cardTitle}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.16em] text-ink-muted dark:text-paper-muted">
                  {client}
                </p>
                <p className="text-sm leading-relaxed italic text-ink/65 dark:text-paper/65">
                  {storyKicker}
                </p>
                <ul className="mt-1 space-y-1.5 text-[13px] text-ink/75 dark:text-paper/75">
                  {highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-2 text-[10px] uppercase tracking-[0.18em] text-ink-muted dark:text-paper-muted">
                  {years}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
