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
    "Six years at Disney Yellow Shoes (Parks marketing) and Disney Consumer Products (Marvel, Lucasfilm, ABC, Freeform, Target). Editor on National Geographic's Building Wild, Hallmark's Our Wild Hearts, and the U.S. Army reality series Starting Strong. Daws Brothers indie features. Director · Producer · Editor.",
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
        intro="The full filmography — Disney Parks brand work, broadcast credits, Daws Brothers indie features, private-school productions and social, and everything in between. Filter by role, format, or client to see only what you're hiring for."
      />
      <PageCta
        eyebrow="Hiring a video producer?"
        title="Branded content, social media, broadcast, narrative — same hands."
        body="Six years producing branded content at Disney. Social-media producer for two ongoing clients. Broadcast editor for Nat Geo, Hallmark, and Ricky Schroder. Independent narrative director under the Daws Brothers banner I run with my brother. Full-time, contract, or one-off — direct, produce, edit, or all three. Atlanta or remote."
        emailSubject="Video producer / editor inquiry"
        emailBody="Hi Jeremiah,%0A%0AWe're looking for a video..."
        resume={{ href: "/resumes/resume-video.pdf", label: "Video résumé (PDF)" }}
      />
    </main>
  );
}
