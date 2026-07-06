import { Navigation } from "./Components/Shared/Navigation";
import { Preloader } from "./Components/Home/Preloader";
import { HeroSection } from "./Components/Home/HeroSection";
import { ExperienceSection } from "./Components/Home/ExperienceSection";
import { SkillsSection } from "./Components/Home/SkillsSection";
import { ProjectsSection } from "./Components/Home/ProjectsSection";

export default function Home() {
  return (
    <main className="bg-background">
      <Preloader />
      <Navigation />
      <HeroSection />
      <ExperienceSection />

      {/* // Horizontal line with glow for separating sections */}
      <div className="w-full bg-blue-200/50 dark:bg-black flex justify-center items-center">
        <div className="w-3/4 md:w-1/2 h-[3px] bg-gradient-to-r from-transparent via-black/50 dark:via-white/40 to-transparent" />
      </div>

      <SkillsSection />

      {/* // Horizontal line with glow for separating sections */}
      <div className="w-full bg-blue-200/50 dark:bg-black flex justify-center items-center">
        <div className="w-3/4 md:w-1/2 h-[3px] bg-gradient-to-r from-transparent via-black/50 dark:via-white/40 to-transparent" />
      </div>

      <ProjectsSection />
    </main>
  );
}
