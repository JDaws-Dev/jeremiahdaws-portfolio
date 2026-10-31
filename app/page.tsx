import { Hero } from "@/components/Hero";
import { TopNav } from "@/components/TopNav";
import { AiFilms } from "@/components/AiFilms";
import { AiTraining } from "@/components/AiTraining";
import { AiBuilds } from "@/components/AiBuilds";
import { Background } from "@/components/Background";
import { HireSection } from "@/components/HireSection";

export default function Page() {
  return (
    <main>
      <TopNav />
      <Hero />
      <AiFilms />
      <AiBuilds />
      <AiTraining />
      <Background />
      <HireSection />
    </main>
  );
}
