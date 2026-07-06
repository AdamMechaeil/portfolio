import { Navigation } from "./Components/Shared/Navigation";
import { Preloader } from "./Components/Home/Preloader";
import { HeroSection } from "./Components/Home/HeroSection";
import { ExperienceSection } from "./Components/Home/ExperienceSection";
export default function Home() {
  return (
    <main className="min-h-[200vh] bg-background">
      <Preloader />
      <Navigation />
      <HeroSection />
      <ExperienceSection />
    </main>
  );
}
