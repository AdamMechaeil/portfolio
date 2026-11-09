import { Navigation } from "./Components/Shared/Navigation";
import { Preloader } from "./Components/Home/Preloader";
import { HeroSection } from "./Components/Home/HeroSection";
import { AboutSection } from "./Components/Home/AboutSection";
import { ExperienceSection } from "./Components/Home/ExperienceSection";
import { SkillsSection } from "./Components/Home/SkillsSection";
import { ProjectsSection } from "./Components/Home/ProjectsSection";
import { Footer } from "./Components/Shared/Footer";
import { SectionDivider } from "./Components/Shared/SectionDivider";

export default function Home() {
  return (
    <main className="bg-background">
      <Preloader />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <SkillsSection />
      <SectionDivider />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
