import type { Metadata } from "next";
import Image from "next/image";
import { TopNav } from "@/components/TopNav";
import { SiteFooter } from "@/components/SiteFooter";

const DESCRIPTION =
  "How I built Card Vault without writing code, with a video of the whole process. Card Vault: a Pokémon card tracker with live prices, a pack you can tear open, graded slabs, a photo scanner and a price-guessing game. Coded by Jeremiah Daws with Claude Code in about 30 minutes of his time, as an exercise.";

export const metadata: Metadata = {
  title: "Card Vault",
  description: DESCRIPTION,
  alternates: { canonical: "/apps/card-vault" },
  openGraph: {
    type: "website",
    siteName: "Jeremiah Daws",
    title: "Card Vault — Jeremiah Daws",
    description: DESCRIPTION,
    url: "/apps/card-vault",
    images: ["/portfolio/apps-cardvault.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@JeremiahDaws",
    title: "Card Vault — Jeremiah Daws",
    description: DESCRIPTION,
    images: ["/portfolio/apps-cardvault.jpg"],
  },
};

const IMG = "/portfolio/card-vault";
const VIDEO_ID = "3xgv6rJBzA4";
const VIDEO_TITLE = "I Built a Pokémon Card App Without Writing Code | Claude Code for Beginners";

const FEATURES = [
  {
    title: "Prices that update",
    body: "TCGplayer market prices in dollars and Cardmarket trends in euros for every version of a card, pulled from the free TCGdex card database. English and Japanese sets.",
  },
  {
    title: "A pack you tear open",
    body: "Drag across the top to rip the foil, then tap the stack to flip each card. The crinkle and rip sounds are synthesized in the browser. Pull odds roughly follow each era of the game.",
  },
  {
    title: "Graded slabs",
    body: "PSA, CGC, BGS, TAG and SGC labels with cert-lookup links. A slab’s value is estimated from the raw price and the grade until you type in a real sold price.",
  },
  {
    title: "Scan a card",
    body: "Take a photo on your phone and it reads the name and number in the browser, then checks the match against the card art. Good on clear photos, still shaky on hard ones.",
  },
  {
    title: "Worth more?",
    body: "A higher-or-lower game with two real cards and real market prices. See how long a streak you can build.",
  },
  {
    title: "Made for the phone",
    body: "A bottom tab bar like an iPhone app, with a raised Scan button. A phone pairs to the Mac over home Wi-Fi by scanning a QR code.",
  },
];

const PROCESS = [
  "I described what I wanted in plain English: a premium-feeling tracker, live prices, card art, slabs, and the tactile feel of opening a pack.",
  "Claude Code wrote the app and ran it on localhost so I could watch it come together.",
  "I had one agent research other card trackers for ideas worth borrowing, then four reviewer agents tear it apart: a UI expert, a Pokémon expert, a casual fan, and a deliberately harsh critic. Their notes went back to the lead agent, which made the fixes.",
  "Then I kept asking for things as I tried it: the real card back, a phone layout, a game, Japanese cards, ripping sounds, a smarter scanner.",
];

export default function CardVaultPage() {
  return (
    <>
      <TopNav />
      <main id="content" className="min-h-screen">
        <section className="mx-auto max-w-6xl px-4 pb-12 pt-24 sm:px-6">
          <p className="text-xs uppercase tracking-[0.22em] text-blue">
            <a href="/apps" className="hover:text-accent">AI builds</a> / Side project
          </p>
          <h1
            className="mt-3 font-serif leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.75rem, 8vw, 4.5rem)" }}
          >
            Card Vault
          </h1>
          <div className="mt-6 grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-base text-ink/80 md:text-lg">
                A Pokémon card tracker with live prices, a pack you can tear
                open, graded slabs, a photo scanner and a price-guessing game. I
                vibe coded it with Claude Code in about 30 minutes of my time,
                just as an exercise: how far does one sitting of plain-English
                prompting get you?
              </p>
              <p className="mt-4 text-base text-ink/80 md:text-lg">
                The app is the byproduct. The point is how it got made, and
                the video below shows the whole process.
              </p>
              <a
                href="#how"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-ink"
              >
                Watch how it got made
              </a>
              <p className="mt-4 text-sm text-ink-muted">
                There&rsquo;s no real collection behind it. The cards in these
                screenshots are sample data.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-start rounded-2xl border border-ink/10 bg-paper-muted/40 p-5 text-sm">
              <div>
                <dt className="text-xs text-ink-muted">Coded by</dt>
                <dd className="mt-0.5 font-medium">Jeremiah Daws</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">Built with</dt>
                <dd className="mt-0.5 font-medium">Claude Code</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">My time</dt>
                <dd className="mt-0.5 font-medium">About 30 minutes</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-muted">Year</dt>
                <dd className="mt-0.5 font-medium">2026</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-ink-muted">Stack</dt>
                <dd className="mt-0.5 font-medium">React, Vite, TCGdex card data, Tesseract.js for the scanner</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="how" className="border-y border-ink/10 bg-blue-wash/60">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
            <div>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-ink/10 bg-ink shadow-lg">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
                  title={VIDEO_TITLE}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <p className="mt-3 text-sm text-ink-muted">
                <a href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} className="underline decoration-ink/30 underline-offset-2 hover:text-accent">
                  {VIDEO_TITLE}
                </a>{" "}
                on YouTube
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">How it got made</h2>
              <p className="mt-3 text-ink/75">
                No code typed by me. The video walks through the whole build;
                here&rsquo;s the short version.
              </p>
              <ol className="mt-6 space-y-5">
                {PROCESS.map((p, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-serif text-2xl leading-none text-accent">{i + 1}</span>
                    <p className="text-ink/80">{p}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* The app's own colors: the showcase band is the one loud thing on the page. */}
        <section className="bg-[#17122b] py-14 text-[#efeaff]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <figure>
              <Image
                src={`${IMG}/vault.jpg`}
                alt="Card Vault's Vault screen: the total value, a price chart, and a fan of the most valuable cards"
                width={1600}
                height={1000}
                priority
                sizes="(min-width: 1152px) 1104px, 100vw"
                className="w-full rounded-xl border border-white/10 shadow-2xl"
              />
              <figcaption className="mt-3 text-sm text-[#b9b0d6]">
                The Vault: total value, a price history, and the cards worth the most.
              </figcaption>
            </figure>

            <div className="mt-12 grid items-center gap-8 md:grid-cols-[0.8fr_1.2fr]">
              <figure>
                <Image
                  src={`${IMG}/pack-stack.jpg`}
                  alt="A torn-open pack: a stack of cards showing the Pokémon card back, card 1 of 10"
                  width={1200}
                  height={1267}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="w-full rounded-xl border border-white/10"
                />
              </figure>
              <div>
                <h2 className="font-serif text-3xl leading-tight md:text-4xl">Open a pack.</h2>
                <p className="mt-3 max-w-prose text-[#cfc7ea]">
                  This was the part I cared about most. You drag to tear the
                  foil, hear it crinkle and rip, and flip ten cards one at a
                  time with the rare saved for last. At the end it tells you what
                  the pack was worth and which card was the best pull.
                </p>
                <Image
                  src={`${IMG}/pack-pulls.jpg`}
                  alt="Pack summary: every card pulled with its price and the best pull highlighted"
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="mt-6 w-full rounded-xl border border-white/10"
                />
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <figure>
                <Image
                  src={`${IMG}/slabs.jpg`}
                  alt="Slabs screen: graded cards in PSA and CGC cases with estimated values"
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full rounded-xl border border-white/10"
                />
                <figcaption className="mt-3 text-sm text-[#b9b0d6]">Slabs, with grader labels and grade-based value estimates.</figcaption>
              </figure>
              <figure>
                <Image
                  src={`${IMG}/play.jpg`}
                  alt="Worth more? game: two cards side by side, guess which sells for more"
                  width={1600}
                  height={1000}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full rounded-xl border border-white/10"
                />
                <figcaption className="mt-3 text-sm text-[#b9b0d6]">Worth more? A higher-or-lower game with real prices.</figcaption>
              </figure>
            </div>

            <div className="mt-12">
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">On the phone.</h2>
              <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["phone-vault", "Vault"],
                  ["phone-scan", "Scan a card"],
                  ["phone-slabs", "Slabs"],
                  ["phone-play", "Worth more?"],
                ].map(([f, label]) => (
                  <li key={f}>
                    <Image
                      src={`${IMG}/${f}.jpg`}
                      alt={`Card Vault on a phone: ${label}`}
                      width={600}
                      height={1298}
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="w-full rounded-[1.4rem] border border-white/15"
                    />
                    <p className="mt-2 text-center text-sm text-[#b9b0d6]">{label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">What it does</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <li key={f.title}>
                <h3 className="font-serif text-xl">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{f.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-ink/10">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <p className="max-w-prose text-sm text-ink-muted">
              Card Vault runs on my own computer and isn&rsquo;t a public app.
              It&rsquo;s a fan project, not affiliated with or endorsed by The
              Pokémon Company, Nintendo, Creatures or GAME FREAK. Pokémon names
              and card images belong to them.
            </p>
            <a
              href="/apps"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent"
            >
              See more AI builds
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
