import Image from "next/image";

/** Newest first. The top of the home page leads with these. */
const LATEST: {
  href: string;
  external: boolean;
  label: string;
  date: string;
  title: string;
  img: string;
  /** A companion link shown under the title (e.g. the guide that goes with a video). */
  also?: { href: string; label: string };
  /** Held slot for a video still being made: no link, no picture yet. */
  soon?: boolean;
}[] = [
  {
    href: "https://www.youtube.com/watch?v=CjX3PlZ2o8E",
    external: true,
    label: "New video",
    date: "Nov 16",
    title: "I Turned a Stage Play Into a Boat Ride With AI",
    img: "/portfolio/latest-arsenic-video.jpg",
  },
  {
    href: "https://www.youtube.com/watch?v=8IpdKyaKC1Y",
    external: true,
    label: "New video",
    date: "Nov 13",
    title: "Six Ways to Use Seedance 2.5 (Tested on One Grumpy Cat)",
    img: "/portfolio/latest-seedance-video.jpg",
    also: { href: "/seedance", label: "Read the Seedance 2.5 field guide" },
  },
  {
    href: "https://www.youtube.com/watch?v=A2-c4RlFgR0",
    external: true,
    label: "New video",
    date: "Nov 11",
    title: "I Made an AI Film With Just Words. 7 Things I Learned.",
    img: "/portfolio/latest-words-video.jpg",
  },
  {
    href: "https://www.youtube.com/watch?v=3GjAoZdF874",
    external: true,
    label: "Halloween short",
    date: "Oct 31",
    title: "What Are You Supposed To Be?",
    img: "/portfolio/stills/ai-what-are-you-supposed-to-be.jpg",
  },
];

export function Latest() {
  return (
    <div className="hero-in mb-10 md:mb-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue">Latest</p>
      <ul className="-mx-4 mt-3 flex snap-x snap-mandatory scroll-px-4 gap-4 sm:scroll-px-6 md:scroll-px-0 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
        {LATEST.map((item) => (
          <li key={item.href} className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto">
            {item.soon ? (
              <div className="block">
                <span className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-dashed border-ink/25 bg-paper-muted/60">
                  <span className="font-serif text-2xl italic text-ink/40">Coming soon</span>
                </span>
                <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                  {item.label} <span className="font-mono font-normal tracking-[0.12em]">· {item.date}</span>
                </span>
                <span className="mt-1 block text-balance font-serif text-lg leading-snug text-ink/60">{item.title}</span>
              </div>
            ) : (
            <a
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="lift group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="relative block aspect-video overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-ink/10">
                <Image
                  src={item.img}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18rem, (min-width: 768px) 24rem, 78vw"
                  className="object-cover transition duration-500 motion-safe:group-hover:scale-105"
                />
              </span>
              <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                {item.label} <span className="font-mono font-normal tracking-[0.12em] text-ink/50">· {item.date}</span>
              </span>
              <span className="mt-1 block text-balance font-serif text-lg leading-snug text-ink transition group-hover:text-accent">
                {item.title}
                {item.external ? <span aria-hidden="true"> ↗</span> : null}
              </span>
            </a>
            )}
            {item.also ? (
              <a
                href={item.also.href}
                className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-ink/70 underline decoration-ink/25 underline-offset-4 transition hover:text-accent hover:decoration-accent"
              >
                {item.also.label} <span aria-hidden="true">→</span>
              </a>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
