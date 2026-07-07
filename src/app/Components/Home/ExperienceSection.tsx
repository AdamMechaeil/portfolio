import { TracingBeam } from "@/components/ui/tracing-beam";
import { oswald } from "@/lib/constants";
import { experienceData } from "@/lib/constants";

export const ExperienceSection = () => {
  return (
    <section className="relative w-full bg-blue-200/50 dark:bg-black py-20 md:py-32 overflow-hidden px-4 md:px-0 transition-colors duration-500">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[80%] hidden dark:block bg-blue-600/15 blur-[140px] pointer-events-none z-0 rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2
            className={`${oswald.className} text-4xl md:text-6xl font-bold uppercase tracking-wider text-black dark:text-white text-shadow-[0px_0px_20px_rgba(0,0,0,0.35)] dark:text-shadow-[0px_0px_20px_rgba(255,255,255,0.6)]`}
          >
            Main Quests
          </h2>
          <p className="text-emerald-400 font-mono text-sm md:text-base mt-2 uppercase tracking-widest">
            // Mission Logs & Experience
          </p>
        </div>

        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 relative space-y-16 md:space-y-24 pl-10 md:pl-0">
            {experienceData.map((item, index) => (
              <div
                key={`quest-${index}`}
                className="relative group flex flex-col gap-4"
              >
                <div className="bg-white dark:bg-black backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl p-6 md:p-8 hover:border-blue-500/50 transition-colors duration-500 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2 md:gap-0">
                    <span className="font-mono text-xs md:text-sm text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-sm border border-black/10 dark:border-white/10">
                      {item.date}
                    </span>
                    <span className="font-mono text-xs md:text-sm text-blue-400">
                      [{item.location}]
                    </span>
                  </div>
                  <div className="mb-6">
                    <h3
                      className={`${oswald.className} text-3xl md:text-4xl font-bold uppercase tracking-wide text-black dark:text-white mb-1`}
                    >
                      {item.role}
                    </h3>
                    <h4 className="text-emerald-400 font-medium tracking-wide">
                      @ {item.company}
                    </h4>
                  </div>

                  <p className="text-black/70 dark:text-white/70 text-sm md:text-base leading-relaxed mb-8">
                    {item.description}
                  </p>

                  <div className="space-y-3">
                    <p className="font-mono text-xs text-black/40 dark:text-white/40 uppercase tracking-widest">
                      // Used Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-white dark:bg-black text-black/90 dark:text-white/90 border border-black/20 dark:border-white/20 px-3 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
};
