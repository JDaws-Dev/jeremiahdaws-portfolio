import Image from "next/image";
import Link from "next/link";
import type { PortfolioEntry } from "@/lib/portfolio";

type Indie = {
  slug: string;
  format: string;
  storyKicker: string;
};

const INDIES: Indie[] = [
  {
    slug: "dangerous-calling",
    format: "Feature · 2020",
    storyKicker:
      "A feature thriller written, directed, edited, and shipped on a brother-and-brother budget. The proof that I can carry the whole pipeline myself when the studio isn't paying.",
  },
  {
    slug: "missing-in-the-mansion",
    format: "Short · 2012",
    storyKicker:
      "The first film my brother and I shipped together — a Haunted Mansion-flavored short that punches above its budget on staging and edit pace.",
  },
  {
    slug: "followed-from-the-mansion",
    format: "Short · 2013",
    storyKicker:
      "The follow-up. Tightening the cut, the lighting, the practical effects — same characters, more confident filmmaking.",
  },
];

function ytThumb(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : null;
}

export function IndieFeatures({ entries }: { entries: PortfolioEntry[] }) {
  const byslug = new Map(entries.map((e) => [e.slug, e]));
  const items = INDIES.map((i) => ({ ...i, entry: byslug.get(i.slug) })).filter(
    (i): i is Indie & { entry: PortfolioEntry } => Boolean(i.entry)
  );
  if (items.length === 0) return null;

  return (
    <section className="border-y border-ink/10 bg-paper-muted/30 py-14 dark:border-paper/10 dark:bg-ink/20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-accent">
              Indie features &amp; shorts
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
              Daws Brothers.<br />Two siblings, one camera.
            </h2>
          </div>
          <p className="text-sm text-ink/75 dark:text-paper/75">
            The work I do when nobody&rsquo;s paying. My brother and I have
            been making narrative films together since we were kids — shorts,
            a feature, a follow-up. This is where I learned the whole craft
            end-to-end: writing, directing, lighting, editing, color, sound.
            Where I keep my chops sharp between studio jobs.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map(({ entry, format, storyKicker }) => {
            const thumb = entry.embedUrl ? ytThumb(entry.embedUrl) : null;
            return (
              <li
                key={entry.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper dark:border-paper/15 dark:bg-ink/40"
              >
                {thumb ? (
                  <Link
                    href={entry.embedUrl ?? "/work/archive"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block aspect-video w-full overflow-hidden border-b border-ink/10 bg-ink/5 dark:border-paper/15"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumb}
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-paper opacity-0 transition group-hover:opacity-100">
                      <span className="rounded-full bg-ink/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                        Watch
                      </span>
                    </span>
                  </Link>
                ) : null}
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
            );
          })}
        </ul>
      </div>
    </section>
  );
}
