import { Hero } from "@/components/Hero";
import { TopNav } from "@/components/TopNav";
import { ChoosePath } from "@/components/ChoosePath";
import { Featured } from "@/components/Featured";
import { About } from "@/components/About";
import { HireSection } from "@/components/HireSection";
import { getAllEntries, getFeaturedEntries } from "@/lib/portfolio";

export default function Page() {
  const featured = getFeaturedEntries();
  const total = getAllEntries().length;
  return (
    <main>
      <TopNav />
      <Hero />
      <ChoosePath />
      <Featured entries={featured} total={total} />
      <About />
      <HireSection />
    </main>
  );
}
