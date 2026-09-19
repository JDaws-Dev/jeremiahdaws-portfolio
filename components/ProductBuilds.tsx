import Image from "next/image";
import Link from "next/link";
import type { PortfolioEntry } from "@/lib/portfolio";
import { IconArrowUpRight, IconPhone } from "./icons";

type Product = {
  slug: string;
  tagline: string;
  proof: string[];
  cta: { label: string; href: string; icon?: "phone" | "external" };
  storyKicker: string;
  image: string;
  imageAlt: string;
};

const PRODUCTS: Product[] = [
  {
    slug: "apps-safefamily",
    tagline:
      "A kid-safe content suite for Christian families — four apps under one family code.",
    storyKicker:
      "I built this because my own kids deserved a quiet corner of the internet. Same conviction that drove me to build the film and creative-tech programs at their school — kids deserve real ones.",
    proof: [
      "Four apps · SafeTube, SafeTunes, SafeReads, SafeStudy",
      "Single-source JWT auth · one family code · one subscription",
      "Five Convex deployments · Stripe billing · Apple Music gap-fix",
      "Live · paying customers · founded and operated solo",
    ],
    cta: { label: "Visit GetSafeFamily", href: "https://www.getsafefamily.com/", icon: "external" },
    image: "/portfolio/apps-safefamily.jpg",
    imageAlt: "GetSafeFamily — kid-safe content suite",
  },
  {
    slug: "apps-artioscafe",
    tagline:
      "A school lunch cafe, run end to end by software, with an AI assistant the staff simply talk to.",
    storyKicker:
      "Parents pre-order, the restaurant order goes out every morning, Venmo payments match themselves to orders, and volunteers sign themselves up. The owner and staff ask the AI things like \"close the 26th for Thanksgiving\", and it proposes the change for them to approve.",
    proof: [
      "Paying client · designed, built, and maintained solo",
      "Orders, payments, counter POS, P&L, volunteer scheduling",
      "AI assistant with confirm-before-change safety",
    ],
    cta: { label: "Visit Artios Cafe", href: "https://artioscafe.com/", icon: "external" },
    image: "/portfolio/apps-artioscafe-v2.png",
    imageAlt: "Artios Cafe — ordering and operations app",
  },
  {
    slug: "form-website",
    tagline:
      "The website for FORM, the Atlanta story company where I'm Producer / Director.",
    storyKicker:
      "I rebuilt formgreatstories.com so one site carries all four divisions: brand films, studio podcast and broadcast, interactive branching experiences, and original films.",
    proof: [
      "Live at formgreatstories.com",
      "Four divisions · one site · one story",
    ],
    cta: { label: "Visit FORM", href: "https://www.formgreatstories.com/", icon: "external" },
    image: "/portfolio/form-website.png",
    imageAlt: "FORM — studio website",
  },
  {
    slug: "client-readytote",
    tagline:
      "Client build: website and AI assistant for a moving-tote rental business in Dublin, GA.",
    storyKicker:
      "One Claude-powered assistant with three jobs: it sizes up a visitor's move, answers a customer's questions about their own booking, and briefs the owner on the week's deliveries and inventory.",
    proof: [
      "Paying client · designed and built solo",
      "Booking flow · order pages · owner dashboard",
      "One AI, three roles: visitor, customer, owner",
    ],
    cta: { label: "Visit ReadyTote", href: "https://readytote.vercel.app/", icon: "external" },
    image: "/portfolio/client-readytote.png",
    imageAlt: "ReadyTote — moving tote rental website",
  },
];

function renderProof(p: string) {
  return p;
}

export function ProductBuilds({ entries }: { entries: PortfolioEntry[] }) {
  const byslug = new Map(entries.map((e) => [e.slug, e]));
  const items = PRODUCTS.map((p) => ({ ...p, entry: byslug.get(p.slug) })).filter(
    (p): p is Product & { entry: PortfolioEntry } => Boolean(p.entry)
  );
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-accent">
          Shipped and live
        </p>
        <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.01em] md:text-4xl">
          Built for real people. Live right now.
        </h2>
      </div>

      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map(({ entry, tagline, storyKicker, proof, cta, image, imageAlt }) => (
          <li
            key={entry.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper dark:border-paper/15 dark:bg-ink/40"
          >
            <Link
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[16/10] w-full overflow-hidden border-b border-ink/10 bg-ink/5 dark:border-paper/15"
              aria-label={`Open ${entry.title}`}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                priority
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            </Link>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div>
                <h3 className="font-serif text-2xl leading-tight tracking-tight">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-ink/80 dark:text-paper/85">
                  {tagline}
                </p>
              </div>

              <p className="text-sm leading-relaxed italic text-ink/65 dark:text-paper/65">
                {storyKicker}
              </p>

              <ul className="space-y-1.5 text-sm text-ink/75 dark:text-paper/75">
                {proof.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{renderProof(p)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-[10px] uppercase tracking-[0.18em] text-ink-muted dark:text-paper-muted">
                  {entry.role} · {entry.year}
                </span>
                <Link
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-paper shadow-sm shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent/40"
                >
                  {cta.icon === "phone" ? <IconPhone className="h-3.5 w-3.5" /> : null}
                  {cta.label}
                  {cta.icon !== "phone" ? <IconArrowUpRight className="h-3.5 w-3.5" /> : null}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
