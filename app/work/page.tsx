import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { WorkHero } from "@/components/WorkHero";
import { AiFilms } from "@/components/AiFilms";
import { NetworkCredits } from "@/components/NetworkCredits";
import { LaneArchive } from "@/components/LaneArchive";
import { PageCta } from "@/components/PageCta";
import { getAllAssets, getAllEntries } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Film work",
  description:
    "Producer / Director at FORM, directing the Form Films comedy series Calendar Jockeys. Six years at Disney Yellow Shoes (Parks marketing) and Disney Consumer Products (Marvel, Lucasfilm, ABC, Freeform, Target). Editor on National Geographic's Building Wild, Hallmark's Our Wild Hearts, and the U.S. Army reality series Starting Strong. Daws Brothers indie features. Director · Producer · Editor.",
  alternates: { canonical: "/work" },
  openGraph: { type: "website", siteName: "Jeremiah Daws", images: ["/opengraph-image"], title: "Film work — Jeremiah Daws", description: "Producer / Director at FORM. Six years producing for Disney; editor for National Geographic and Hallmark. AI shorts, credits and the full archive.", url: "/work" },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], creator: "@JeremiahDaws", title: "Film work — Jeremiah Daws", description: "Producer / Director at FORM. Six years producing for Disney; editor for National Geographic and Hallmark. AI shorts, credits and the full archive." },
};

export default function WorkPage() {
  const entries = getAllEntries();
  const assets = getAllAssets();
  return (
    <main className="min-h-screen">
      <TopNav />
      <WorkHero />
      <AiFilms compact />
      <NetworkCredits entries={entries} />
      <LaneArchive
        assets={assets}
        lane="video"
        eyebrow="Full archive"
        title="Every video, every cut."
        intro="The full filmography — Disney Parks brand work, broadcast credits, Daws Brothers indie features, private-school productions and social, and everything in between. Filter by role, format, or client to see only what you're looking for."
      />
      <PageCta
        eyebrow="AI consulting"
        title="Working with AI? Bring me in."
        body="Outside FORM, I consult on AI projects, from films to the tools and workflows behind them. One-on-one AI training is $100 an hour."
        topic="AI project"
        placeholder="What are you working on?"
        resume={{ href: "/resumes/resume-video.pdf", label: "Video résumé (PDF)" }}
      />
    </main>
  );
}
