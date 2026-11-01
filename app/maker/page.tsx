import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MakerHero } from "@/components/MakerHero";
import { ShopFlagships } from "@/components/ShopFlagships";
import { SignatureBuilds } from "@/components/SignatureBuilds";
import { AlsoBuilt } from "@/components/AlsoBuilt";
import { LaneArchive } from "@/components/LaneArchive";
import { PageCta } from "@/components/PageCta";
import { getAllAssets, getAllEntries } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Maker",
  description:
    "Ran Bullfrog Machining (Buford, GA) from 2021 to 2026. SkillsUSA National Silver in CNC Turning. Former Tormach brand ambassador and Garage Series host. CNC mill + lathe, 3D printing, fabrication, theatrical props, film-industry parts. The Filmmaker → Machinist YouTube channel documents the work.",
  alternates: { canonical: "/maker" },
  openGraph: { type: "website", siteName: "Jeremiah Daws", images: ["/opengraph-image"], title: "Maker — Jeremiah Daws", description: "Bullfrog Machining, 2021–2026: CNC, fabrication, props and film-industry parts.", url: "/maker" },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], creator: "@JeremiahDaws", title: "Maker — Jeremiah Daws", description: "Bullfrog Machining, 2021–2026: CNC, fabrication, props and film-industry parts." },
};

export default function MakerPage() {
  const entries = getAllEntries();
  const assets = getAllAssets();
  return (
    <>
      <TopNav />
      <main id="content" className="min-h-screen">
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
          eyebrow="Want to talk shop?"
          title="The shop is closed. The builds are still here."
          body="Bullfrog Machining closed in 2026. The channel and the full build archive stay up. Always happy to talk props, fabrication, and making things with a camera rolling."
          topic="Maker question"
          placeholder="What are you building?"
          resume={{ href: "/resumes/resume-maker.pdf", label: "Maker résumé (PDF)" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
