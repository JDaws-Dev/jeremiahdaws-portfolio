import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AppsHero } from "@/components/AppsHero";
import { ProductBuilds } from "@/components/ProductBuilds";
import { AgentStack } from "@/components/AgentStack";
import { AlsoShipped } from "@/components/AlsoShipped";
import { PageCta } from "@/components/PageCta";
import { getAllEntries } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "AI Builds",
  description:
    "Websites and tools with AI built in, by Jeremiah Daws: ReadyTote (booking site with an AI assistant), the Artios Cafe ordering system with a staff AI assistant, GetSafeFamily (kid-safe app suite with paying customers), the FORM studio website, and three AI assistants in daily use. Fixed-price builds, scoped in writing.",
  alternates: { canonical: "/apps" },
  openGraph: { type: "website", siteName: "Jeremiah Daws", images: ["/opengraph-image"], title: "AI Builds — Jeremiah Daws", description: "Websites and tools with AI built in: ReadyTote, Artios Cafe, GetSafeFamily and more. Fixed-price builds, scoped in writing.", url: "/apps" },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], creator: "@JeremiahDaws", title: "AI Builds — Jeremiah Daws", description: "Websites and tools with AI built in: ReadyTote, Artios Cafe, GetSafeFamily and more. Fixed-price builds, scoped in writing." },
};

export default function AppsPage() {
  const entries = getAllEntries();
  return (
    <>
      <TopNav />
      <main id="content" className="min-h-screen">
        <AppsHero />
        <ProductBuilds entries={entries} />
        <AgentStack entries={entries} />
        <AlsoShipped entries={entries} />
        <PageCta
          eyebrow="Want AI working in your business?"
          title="Tell me what you want AI to do for your business."
          body="A website that books and answers customers, an internal tool, an assistant for your staff, or training so your team can do it themselves. You work with me directly, and I reply with a plan and a fixed quote."
          topic="AI build / consulting inquiry"
          placeholder="What would you like AI to do for your business?"
        />
      </main>
      <SiteFooter />
    </>
  );
}
