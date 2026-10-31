import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconArrowUpRight } from "./icons";

const BUILDS = [
  {
    title: "ReadyTote",
    meta: "Client · website, booking, AI assistant",
    body: "A tote-rental business site that takes real bookings and payments. One assistant sizes up a visitor\u2019s move, answers customers about their own order, and briefs the owner on the week.",
    image: "/portfolio/client-readytote.jpg",
    href: "https://readytoterentals.com/",
  },
  {
    title: "Artios Cafe",
    meta: "Client · ordering, payments, staff AI assistant",
    body: "A school lunch cafe run end to end by software: pre-orders, payments, volunteers. Staff change the menu or close a day by asking the assistant, and approve before anything changes.",
    image: "/portfolio/apps-artioscafe-order.jpg",
    href: "https://artioscafe.com/",
  },
  {
    title: "GetSafeFamily",
    meta: "My own product · four apps, paying customers",
    body: "Kid-safe YouTube, music, books and homework help for Christian families, under one family code and one subscription.",
    image: "/portfolio/apps-safefamily.jpg",
    href: "https://www.getsafefamily.com/",
  },
  {
    title: "FORM website",
    meta: "Studio site · rebuilt end to end",
    body: "The site for FORM, the Atlanta story company where I work: brand films, studio, interactive and original films on one site.",
    image: "/portfolio/form-website.jpg",
    href: "https://www.formgreatstories.com/",
  },
];

const AGENTS = [
  { name: "JARVIS", what: "my own assistant: email, calendar, research, files, and the tools it writes for itself" },
  { name: "Anna", what: "a household assistant: meals, groceries, school, and the family calendar" },
  { name: "Mozart", what: "a composer\u2019s assistant that engraves scores and gives notes on new pieces" },
];

const STEPS = [
  { n: "1", title: "Scope", body: "We agree in writing what it does, what it doesn\u2019t, and the price, before I start." },
  { n: "2", title: "Build", body: "I design and build it myself, and you see it working early, on a real link." },
  { n: "3", title: "Hand off", body: "You own it. I show you and your staff how to run it and how to talk to the AI." },
];

export function AiBuilds() {
  return (
    <section id="builds" className="scroll-mt-14 border-t border-ink/10 bg-blue-wash/60 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue">AI building</p>
            <h2 className="mt-2 max-w-3xl text-balance font-serif text-3xl leading-tight tracking-[-0.01em] md:text-[2.6rem]">
              Websites and tools with AI built in, for real clients.
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

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-ink/10 bg-paper p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
              How a build works
            </p>
            <ol className="mt-4 grid gap-5 sm:grid-cols-3">
              {STEPS.map((st) => (
                <li key={st.n}>
                  <p className="font-serif text-3xl leading-none text-accent">{st.n}</p>
                  <p className="mt-2 font-serif text-lg leading-tight">{st.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{st.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-paper p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
              AI assistants I built and run every day
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/80">
              {AGENTS.map((a) => (
                <li key={a.name}>
                  <span className="font-serif text-base text-ink">{a.name}</span>, {a.what}.
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
