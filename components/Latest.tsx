import Image from "next/image";

/** Newest first. The top of the home page leads with these. */
const LATEST = [
  {
    href: "https://www.youtube.com/watch?v=A2-c4RlFgR0",
    external: true,
    label: "New video",
    date: "Nov 11",
    title: "I Made an AI Film With Just Words. 7 Things I Learned.",
    img: "/portfolio/latest-words-video.jpg",
  },
  {
    href: "/seedance",
    external: false,
    label: "Field guide",
    date: "Nov 2026",
    title: "Seedance 2.5, every option explained for filmmakers",
    img: "/portfolio/latest-seedance-guide.jpg",
  },
  {
    href: "#play",
    external: false,
    label: "New film",
    date: "Nov 2",
    title: "NEON RONIN: Part One",
    img: "/portfolio/stills/ai-neon-ronin.jpg",
  },
];

export function Latest() {
  return (
    <div className="hero-in mb-10 md:mb-14">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue">Latest</p>
      <ul className="-mx-4 mt-3 flex snap-x snap-mandatory scroll-px-4 gap-4 sm:scroll-px-6 md:scroll-px-0 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
        {LATEST.map((item) => (
          <li key={item.href} className="w-[78%] shrink-0 snap-start sm:w-[46%] md:w-auto">
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
                  sizes="(min-width: 768px) 24rem, 78vw"
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
          </li>
        ))}
      </ul>
    </div>
  );
}
