import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconDownload } from "./icons";

const BUILD_WALL = [
  { src: "/portfolio/ig-thumbs/C8meuRVOK-U.jpg", caption: "Lumière candle — Beauty and the Beast" },
  { src: "/portfolio/ig-thumbs/Ch7jk4frlEm.jpg", caption: "Steadicam dolly — Atlanta production" },
  { src: "/portfolio/ig-thumbs/CkTzPfGuGKN.jpg", caption: "Film dolly part — Tormach 1100MX" },
  { src: "/portfolio/ig-thumbs/CdBLhhRPHVb.jpg", caption: "DIY vacuum-forming machine" },
  { src: "/portfolio/ig-thumbs/CeJ-u9tlqXS.jpg", caption: "Mitaka lightsaber — Star Wars Visions" },
  { src: "/portfolio/ig-thumbs/CnHbyDoJiv8.jpg", caption: "FidgetCraft — magnetic fidget toy" },
  { src: "/portfolio/ig-thumbs/CeU9MgPLKjF.jpg", caption: "Magnetic action-figure display" },
  { src: "/portfolio/ig-thumbs/CfWM5WpupZ_.jpg", caption: "SkillsUSA Nationals — CNC Turning" },
];

const SHOP = [
  "Tormach 1100MX",
  "Tormach 15L Slant Pro",
  "Manual Bridgeport",
  "Manual lathe",
  "Bambu X1C",
  "Form 3 (SLA)",
  "Fusion 360",
  "MIG / TIG",
  "Vacuum forming",
  "Electronics / Arduino",
];

export function MakerHero() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-24 pb-10">
      <p className="text-xs uppercase tracking-[0.22em] text-accent">
        Maker — Machinist · Fabricator · Designer
      </p>
      <h1
        className="mt-3 font-serif leading-[1.02] tracking-[-0.025em]"
        style={{ fontSize: "clamp(2.75rem, 8vw, 4.5rem)" }}
      >
        I build the thing.<br />
        <span className="text-accent">Out of metal, plastic, and patience.</span>
      </h1>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-base text-ink/80 dark:text-paper/80 md:text-lg">
            CNC mill, CNC lathe, manual machining, 3D printing, vacuum forming,
            welding, electronics, theatrical props. <strong>SkillsUSA National
            Silver in CNC Turning.</strong> Brand ambassador for Tormach,
            hosting their Garage Series tutorials. Owner of Bullfrog Machining
            in Buford, GA — paid film-industry fab work for Atlanta
            productions. The maker work feeds the channel
            (<em>Filmmaker → Machinist</em>) and the channel feeds the work.
          </p>
          <p className="mt-4 text-sm text-ink-muted dark:text-paper-muted">
            One-off props. Production fixtures. Working dollies. A full
            Beauty-and-the-Beast Lumière candle, scanned and printed from a
            Disney source. Same hands.
          </p>
          <p className="mt-3 text-sm text-ink/75 dark:text-paper/75">
            <strong>I&rsquo;m the right hire if you&rsquo;re</strong>
            {" "}an Atlanta film/TV production needing a part on the truck
            Tuesday morning, a
            theatrical company who&rsquo;d rather build than rent, a machine
            shop hiring CNC operators with content-creator chops, or a
            manufacturer wanting branded shop content that doesn&rsquo;t look
            like every other YouTube channel.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/#hire"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent dark:bg-paper dark:text-ink dark:hover:bg-accent dark:hover:text-paper"
            >
              Hire me <IconArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="/resumes/resume-maker.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent dark:border-paper/30"
            >
              <IconDownload className="h-4 w-4" />
              Maker résumé (PDF)
            </a>
          </div>
        </div>

        <aside className="rounded-2xl border border-ink/10 bg-paper-muted/40 p-5 text-sm dark:border-paper/15 dark:bg-ink/30">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
            The shop
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {SHOP.map((s) => (
              <li
                key={s}
                className="rounded-full border border-ink/15 bg-paper/60 px-2.5 py-1 text-xs text-ink/80 dark:border-paper/15 dark:bg-ink/40 dark:text-paper/85"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-muted dark:text-paper-muted">
            Home shop in Buford, GA. CAD-to-cut on real production parts —
            not just demos.
          </p>
        </aside>
      </div>
    </section>
  );
}
