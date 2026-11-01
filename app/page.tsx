import { Hero } from "@/components/Hero";
import { TopNav } from "@/components/TopNav";
import { AiFilms } from "@/components/AiFilms";
import { FilmProcess } from "@/components/FilmProcess";
import { FormWork } from "@/components/FormWork";
import { TeamGuide } from "@/components/TeamGuide";
import { Background } from "@/components/Background";
import { HireSection } from "@/components/HireSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Page() {
  return (
    <>
      <TopNav />
      <main id="content">
        <Hero />
        <AiFilms />
        <FilmProcess />
        <FormWork />
        <TeamGuide />
        <Background />
        <HireSection />
      </main>
      <SiteFooter />
    </>
  );
}
