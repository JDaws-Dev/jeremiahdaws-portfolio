import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { WorkHero } from "@/components/WorkHero";
import { NetworkCredits } from "@/components/NetworkCredits";
import { LaneArchive } from "@/components/LaneArchive";
import { PageCta } from "@/components/PageCta";
import { getAllAssets, getAllEntries } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Filmmaker — Jeremiah Daws",
  description:
    "Producer / Director at FORM, directing the Form Films comedy series Calendar Jockeys. Six years at Disney Yellow Shoes (Parks marketing) and Disney Consumer Products (Marvel, Lucasfilm, ABC, Freeform, Target). Editor on National Geographic's Building Wild, Hallmark's Our Wild Hearts, and the U.S. Army reality series Starting Strong. Daws Brothers indie features. Director · Producer · Editor.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const entries = getAllEntries();
  const assets = getAllAssets();
  return (
    <main className="min-h-screen pb-24">
      <TopNav />
      <WorkHero />
      <NetworkCredits entries={entries} />
      <LaneArchive
        assets={assets}
        lane="video"
        eyebrow="Full archive"
        title="Every video, every cut."
        intro="The full filmography — Disney Parks brand work, broadcast credits, Daws Brothers indie features, private-school productions and social, and everything in between. Filter by role, format, or client to see only what you're looking for."
      />
      <PageCta
        eyebrow="Have a story to tell?"
        title="Brand films, series, and original stories at FORM."
        body="I'm Producer / Director at FORM, an Atlanta story company making brand films, studio content, interactive experiences, and original films. If you have a story that needs telling, reach out and I'll bring it to the team."
        topic="Story project for FORM"
        placeholder="Tell me about the story you want to tell."
        resume={{ href: "/resumes/resume-video.pdf", label: "Video résumé (PDF)" }}
      />
    </main>
  );
}
