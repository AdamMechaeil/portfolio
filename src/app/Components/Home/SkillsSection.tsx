import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { arsenalItems, oswald } from "@/lib/constants";

export const SkillsSection = () => {
  return (
    <section className="relative w-full bg-blue-200/50 dark:bg-black py-20 md:py-32 overflow-hidden px-4 md:px-0 transition-colors duration-500">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[80%] hidden dark:block bg-blue-600/15 blur-[140px] pointer-events-none z-0 rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <h2
            className={`${oswald.className} text-4xl md:text-6xl font-bold uppercase tracking-wider text-black dark:text-white text-shadow-[0px_0px_20px_rgba(0,0,0,0.35)] dark:text-shadow-[0px_0px_20px_rgba(255,255,255,0.6)]`}
          >
            My Arsenal
          </h2>
          <p className="text-emerald-400 font-mono text-sm md:text-base mt-2 uppercase tracking-widest">
            // Technologies & Tools
          </p>
        </div>

        {/* Marquee Section */}
        <div className="w-full relative z-50 flex flex-col items-center justify-center">
          <InfiniteMovingCards
            items={arsenalItems}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
};
