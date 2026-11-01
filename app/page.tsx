import { Hero } from "@/components/Hero";
import { TopNav } from "@/components/TopNav";
import { AiFilms } from "@/components/AiFilms";
import { FilmProcess } from "@/components/FilmProcess";
import { Background } from "@/components/Background";
import { HireSection } from "@/components/HireSection";

export default function Page() {
  return (
    <main>
      <TopNav />
      <Hero />
      <AiFilms />
      <FilmProcess />
      <Background />
      <HireSection />
    </main>
  );
}
