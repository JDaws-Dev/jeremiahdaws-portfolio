import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import { TeachHero } from "@/components/TeachHero";
import { ProgramsBuilt } from "@/components/ProgramsBuilt";
import { EmergingTracks } from "@/components/EmergingTracks";
import { PageCta } from "@/components/PageCta";

export const metadata: Metadata = {
  title: "Teacher — Jeremiah Daws",
  description:
    "Department Head who built two academic programs from zero — Film & Story and Creative Technology — at a private classical school in metro Atlanta. Twelve-plus courses, fifty-plus students, twenty-two productions. Disney/Nat Geo/Hallmark pedigree. SkillsUSA Silver. Founder of AnswerAxis. Available for Christian classical schools, community colleges, makerspaces, and one-off workshops.",
};

export default function TeachPage() {
  return (
    <main className="min-h-screen pb-24">
      <TopNav />
      <TeachHero />
      <ProgramsBuilt />
      <EmergingTracks />
      <PageCta
        eyebrow="Building a film, maker, or AI program?"
        title="I'll teach it — and build the curriculum to teach it well."
        body="Department-Head, full-time, contract, single course, or summer-intensive. Christian classical schools, community colleges, makerspaces, and one-off masterclasses all fit. Atlanta or remote with on-site weeks."
        emailSubject="Teaching opportunity"
        emailBody="Hi Jeremiah,%0A%0AWe're looking for..."
        resume={{ href: "/resumes/resume-education.pdf", label: "Education résumé (PDF)" }}
      />
    </main>
  );
}
