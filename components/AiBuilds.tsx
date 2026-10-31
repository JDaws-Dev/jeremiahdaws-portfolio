import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconArrowUpRight } from "./icons";

const BUILDS = [
  {
    title: "Artios Cafe",
    meta: "Client · ordering, operations, staff AI assistant",
    body: "A school lunch cafe run end to end by software. The staff run it by talking to an AI assistant.",
    image: "/portfolio/apps-artioscafe-order.jpg",
    href: "https://artioscafe.com/",
  },
  {
    title: "ReadyTote",
    meta: "Client · website + AI assistant",
    body: "Booking, customer questions, and a daily brief for the owner, handled by an assistant built into the site.",
    image: "/portfolio/client-readytote.jpg",
    href: "https://readytote.vercel.app/",
  },
  {
    title: "FORM website",
    meta: "Studio site · rebuilt end to end",
    body: "The website for FORM, the Atlanta story company where I'm Producer / Director.",
    image: "/portfolio/form-website.jpg",
    href: "https://www.formgreatstories.com/",
  },
  {
    title: "GetSafeFamily",
    meta: "My product · four kid-safe apps",
    body: "Kid-safe YouTube, music, books and homework help for Christian families, under one family code.",
    image: "/portfolio/apps-safefamily.jpg",
    href: "https://www.getsafefamily.com/",
  },
];

const AGENTS = ["JARVIS, my own AI chief of staff", "Anna, my wife's household assistant", "Mozart, a composer's assistant for my son"];

export function AiBuilds() {
  return (
    <section id="builds" className="scroll-mt-14 border-t border-ink/10 bg-blue-wash/60 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">AI building</p>
            <h2 className="mt-2 max-w-3xl text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
              Websites and tools with AI built in.
            </h2>
          </div>
          <Link
            href="/apps"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition hover:text-accent"
          >
            Everything I&rsquo;ve built <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2">
          {BUILDS.map((b) => (
            <li key={b.title}>
              <a
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition hover:border-accent"
              >
                <span className="relative block aspect-[16/10] bg-paper-muted">
                  <Image src={b.image} alt="" fill sizes="(min-width: 640px) 36rem, 100vw" className="object-cover" />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{b.meta}</span>
                  <span className="mt-1.5 flex items-center gap-2 font-serif text-xl leading-tight">
                    {b.title}
                    <IconArrowUpRight className="h-4 w-4 text-ink-muted transition group-hover:text-accent" />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-ink/75">{b.body}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-ink/10 bg-paper p-5 md:flex md:items-center md:gap-8">
          <p className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
            Personal AI assistants I built and run
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/80 md:mt-0">
            {AGENTS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
