import type { Metadata } from "next";
import Image from "next/image";
import { TopNav } from "@/components/TopNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PageCta } from "@/components/PageCta";

const DESCRIPTION =
  "How I built a Pokémon card tracker with Claude Code without writing code: the full build on video.";

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
    images: [{ url: "/portfolio/apps-cardvault-og-2.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@JeremiahDaws",
    title: "Card Vault — Jeremiah Daws",
    description: DESCRIPTION,
    images: ["/portfolio/apps-cardvault-og-2.jpg"],
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
  "I sent one agent to study other card trackers for ideas worth borrowing, then set four reviewer agents on the result. Their notes went back to the lead agent, which made the fixes.",
  "Then I kept asking for things as I tried it: the real card back, a phone layout, a game, Japanese cards, ripping sounds, a better scanner.",
];

const FACTS = [
  ["Coded by", "Jeremiah Daws"],
  ["Built with", "Claude Code"],
  ["My time", "About 30 minutes"],
  ["Stack", "React, Vite, TCGdex card data, Tesseract.js"],
];

export default function CardVaultPage() {
  return (
    <>
      <TopNav />
      <main id="content" className="min-h-screen">
        <section className="mx-auto max-w-4xl px-4 pb-14 pt-24 sm:px-6">
          <p className="text-xs uppercase tracking-[0.22em] text-blue">
            <a href="/apps" className="hover:text-accent">AI builds</a> / Side project
          </p>
          <h1
            className="mt-3 font-serif leading-[1.02] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 4.25rem)" }}
          >
            Card Vault
          </h1>
          <p className="mt-4 max-w-2xl text-base text-ink/80 md:text-lg">
            I vibe coded this Pokémon card tracker in about 30 minutes of my
            time, without typing code, as an exercise. The video shows the
            whole build.
          </p>
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-ink/10 bg-ink shadow-xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0`}
              title={VIDEO_TITLE}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            More builds like this on{" "}
            <a href="https://www.youtube.com/@JeremiahDaws?sub_confirmation=1" className="underline decoration-ink/30 underline-offset-2 hover:text-accent">
              my YouTube channel
            </a>
          </p>
        </section>

        <section id="how" className="scroll-mt-14 border-y border-ink/10 bg-blue-wash/60">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">How it got made</h2>
            <p className="mt-4 max-w-3xl font-serif text-xl leading-snug text-ink md:text-2xl">
              One agent built it, one studied other card trackers, and four
              more tore it apart: a UI expert, a Pokémon expert, a casual fan,
              and a deliberately harsh critic.
            </p>
            <div className="mt-10 grid gap-10 md:grid-cols-[1.5fr_1fr]">
              <ol className="space-y-5">
                {PROCESS.map((p, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="w-6 shrink-0 font-serif text-2xl leading-none text-accent">{i + 1}</span>
                    <p className="text-ink/80">{p}</p>
                  </li>
                ))}
              </ol>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 self-start rounded-2xl border border-ink/10 bg-paper p-5 text-sm">
                {FACTS.map(([k, v]) => (
                  <div key={k} className={k === "Stack" ? "col-span-2" : undefined}>
                    <dt className="text-xs text-ink-muted">{k}</dt>
                    <dd className="mt-0.5 font-medium">{v}</dd>
                  </div>
                ))}
                <div className="col-span-2 text-xs text-ink-muted">
                  There&rsquo;s no real collection behind it. The cards in the
                  screenshots are sample data.
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* The app's own colors: the showcase band is the one loud thing on the page. */}
        <section className="bg-[#17122b] py-14 text-[#efeaff]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <figure>
              <Image
                src={`${IMG}/vault-3.jpg`}
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
                  src={`${IMG}/pack-pulls-2.jpg`}
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
                  src={`${IMG}/slabs-2.jpg`}
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
                  src={`${IMG}/play-2.jpg`}
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
                  ["phone-vault-3", "Vault"],
                  ["phone-scan-2", "Scan a card"],
                  ["phone-slabs-2", "Slabs"],
                  ["phone-play-2", "Worth more?"],
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

        <PageCta
          eyebrow="Want something like this built?"
          title="Tell me what you want built."
          body="A website, an internal tool, or an assistant for your staff, built the same way: plain-English direction, AI doing the typing, and reviewers checking the work. You work with me directly, and I reply with a plan and a fixed quote."
          topic="AI build inquiry (from Card Vault)"
          placeholder="What would you like built?"
        />
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
