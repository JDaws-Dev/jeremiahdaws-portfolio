import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { TopNav } from "@/components/TopNav";
import { AiFilms } from "@/components/AiFilms";
import { FilmProcess } from "@/components/FilmProcess";
import { FormWork } from "@/components/FormWork";
import { Background } from "@/components/Background";
import { HireSection } from "@/components/HireSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Page() {
  return (
    <>
      <TopNav />
      <main id="content">
        <Hero />
        <SelectedWork />
        <FormWork />
        <AiFilms />
        <FilmProcess />
        <Background />
        <HireSection />
      </main>
      <SiteFooter />
    </>
  );
}
