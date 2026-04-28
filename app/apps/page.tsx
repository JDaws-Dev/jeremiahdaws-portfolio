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
    "Two products with paying customers (GetSafeFamily, AnswerAxis), a three-agent household AI stack (JARVIS, Anna, Mozart), plus side-project apps. Tech early adopter, full-stack engineer, digital hospitality. Stack: Next.js, TypeScript, Convex, Stripe, Anthropic, MCP, Vapi.",
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
        title="I build AI agents, voice receptionists, and small-business automation."
        body="AnswerAxis is the productized version — a full AI customer-experience platform (voice agent + Calendar booking + review-request flywheel + self-serve onboarding) for small home-service businesses. Custom AI builds, AI strategy consulting, voice agents, MCP-server integrations, and full-stack AI apps are all on the table. Solo-operated, real clients, real shipping."
        emailSubject="AI build / consulting inquiry"
        emailBody="Hi Jeremiah,%0A%0AWe'd like AI help with..."
        resume={{ href: "/resumes/resume-tech.pdf", label: "Apps & AI résumé (PDF)" }}
      />
    </main>
  );
}
