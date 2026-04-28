import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { MakerHero } from "@/components/MakerHero";
import { ShopFlagships } from "@/components/ShopFlagships";
import { SignatureBuilds } from "@/components/SignatureBuilds";
import { AlsoBuilt } from "@/components/AlsoBuilt";
import { LaneArchive } from "@/components/LaneArchive";
import { PageCta } from "@/components/PageCta";
import { getAllAssets, getAllEntries } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Maker — Jeremiah Daws",
  description:
    "Owner of Bullfrog Machining (Buford, GA). SkillsUSA National Silver in CNC Turning. Tormach brand ambassador hosting their Garage Series. CNC mill + lathe, 3D printing, fabrication, theatrical props, film-industry parts. The Filmmaker → Machinist YouTube channel documents the work.",
};

export default function MakerPage() {
  const entries = getAllEntries();
  const assets = getAllAssets();
  return (
    <main className="min-h-screen pb-24">
      <TopNav />
      <MakerHero />
      <ShopFlagships entries={entries} />
      <SignatureBuilds entries={entries} />
      <AlsoBuilt entries={entries} />
      <LaneArchive
        assets={assets}
        lane="making"
        eyebrow="Full archive"
        title="Every build, every clip."
        intro="Channel videos, shop reels, IG cuts, recognition, theatrical props, and commercial fab work — all of it."
        showFilters={false}
      />
      <PageCta
        eyebrow="Need a part?"
        title="Need it on the truck Tuesday morning?"
        body="Bullfrog Machining (Buford, GA) takes on film-industry fab, theatrical props, prototype-to-small-batch CNC work, and one-off design-build jobs. Also open to machinist roles and brand-content partnerships."
        emailSubject="Maker / machining inquiry"
        emailBody="Hi Jeremiah,%0A%0AWe need..."
        resume={{ href: "/resumes/resume-maker.pdf", label: "Maker résumé (PDF)" }}
      />
    </main>
  );
}
