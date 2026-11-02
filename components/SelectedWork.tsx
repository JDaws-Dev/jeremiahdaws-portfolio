import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconPlay } from "./icons";

type Piece = {
  title: string;
  org: string;
  role: string;
  years: string;
  still: string;
  href: string;
  blurb: string;
};

const WORK: Piece[] = [
  {
    title: "Target × Disney: Backyard Theater",
    org: "Disney Channel · Disney XD",
    role: "Director / Producer",
    years: "Disney, 2015–2021",
    still: "/portfolio/stills/career-target-disney.jpg",
    href: "https://drive.google.com/file/d/1wAEXhYluSbR8qrlzjFKILVvicRwRDpLa/view",
    blurb: "A back-to-school campaign that aired on Disney Channel and Disney XD.",
  },
  {
    title: "Disney Parks campaigns",
    org: "Walt Disney World · Disneyland",
    role: "Producer",
    years: "Disney, 2015–2021",
    still: "/portfolio/stills/career-disney-parks.jpg",
    href: "https://drive.google.com/file/d/1re956VQOKwaFu0u4eUu3Luj2yqu2FrvS/view",
    blurb: "In-park shoots for Parks marketing, from Mickey & Minnie's Runaway Railway on.",
  },
  {
    title: "Disney short-form",
    org: "Disney Parks · Consumer Products",
    role: "Editor",
    years: "Disney, 2015–2021",
    still: "/portfolio/stills/career-disney-editor.jpg",
    href: "https://drive.google.com/file/d/1Y64ZpibjrvCMQwzrnve0KRZadV3a8KZg/view",
    blurb: "Spots, social and brand pieces cut for Disney.",
  },
  {
    title: "Building Wild",
    org: "National Geographic",
    role: "Editor",
    years: "2014",
    still: "/portfolio/stills/career-building-wild.jpg",
    href: "https://drive.google.com/file/d/1igFp99EAKIeZ-mpsTM8ZlR8yHiLlXucc/view",
    blurb: "Multi-episode build series for Nat Geo.",
  },
  {
    title: "Starting Strong",
    org: "U.S. Army · produced by Ricky Schroder",
    role: "Editor",
    years: "2013",
    still: "/portfolio/stills/career-starting-strong.jpg",
    href: "https://drive.google.com/file/d/1PjlDkYcOU8bIAjtcqH6HnNlx3PSFVMfc/view",
    blurb: "A reality series following new recruits.",
  },
  {
    title: "Dangerous Calling",
    org: "Daws Brothers",
    role: "Director / Editor",
    years: "Feature, 2020",
    still: "/portfolio/stills/career-dangerous-calling.jpg",
    href: "https://www.youtube.com/watch?v=fJHMbqUdnjU",
    blurb: "An indie thriller made with my brother. The full feature is on YouTube.",
  },
];

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-14 bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">Selected work</p>
            <h2 className="mt-2 text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
              Brand, broadcast and indie work.
            </h2>
          </div>
          <Link
            href="/work"
            className="nudge inline-flex items-center gap-1.5 text-sm font-medium text-ink transition hover:text-accent"
          >
            Full archive <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-stagger="70">
          {WORK.map((p) => (
            <li key={p.title} className="lift">
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="group block">
                <div className="film-in relative aspect-video overflow-hidden rounded-xl bg-ink/5">
                  <Image
                    src={p.still}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/90 text-ink opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <IconPlay className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{p.role}</p>
                <h3 className="mt-1 font-serif text-xl leading-tight transition group-hover:text-accent">{p.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{p.blurb}</p>
                <p className="mt-2 font-mono text-xs tracking-[0.06em] text-ink-muted">
                  {p.org} · {p.years}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
