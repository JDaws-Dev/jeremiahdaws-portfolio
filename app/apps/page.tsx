import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { AppsHero } from "@/components/AppsHero";
import { ProductBuilds } from "@/components/ProductBuilds";
import { AgentStack } from "@/components/AgentStack";
import { AlsoShipped } from "@/components/AlsoShipped";
import { PageCta } from "@/components/PageCta";
import { getAllEntries } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Apps & AI — Jeremiah Daws",
  description:
    "AI consulting, training, vibe-coding builds, and AI-powered websites. Builder of GetSafeFamily (kid-safe app suite with paying customers), the FORM studio website, a client site for ReadyTote, the fully automated Artios Cafe ordering system with a staff AI assistant, a three-agent household AI stack (JARVIS, Anna, Mozart), plus side-project apps. Tech early adopter, full-stack engineer, digital hospitality. Stack: Next.js, TypeScript, Convex, Stripe, Anthropic, MCP, Vapi.",
};

export default function AppsPage() {
  const entries = getAllEntries();
  return (
    <main className="min-h-screen pb-24">
      <TopNav />
      <AppsHero />
      <ProductBuilds entries={entries} />
      <AgentStack entries={entries} />
      <AlsoShipped entries={entries} />
      <PageCta
        eyebrow="Want AI working in your business?"
        title="AI consulting, training, vibe coding, and websites with AI built in."
        body="I find where AI fits in your business, train your team to use it, vibe-code the tools you need, and build websites with AI working inside them: voice agents, booking, lead follow-up, review requests. Small businesses, schools, and professionals. You work with me directly."
        topic="AI build / consulting inquiry"
        placeholder="What would you like AI to do for your business?"
        resume={{ href: "/resumes/resume-tech.pdf", label: "Apps & AI résumé (PDF)" }}
      />
    </main>
  );
}
