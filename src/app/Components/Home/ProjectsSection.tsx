"use client";

import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { PinContainer } from "@/components/ui/3d-pin";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { oswald, projectsData } from "@/lib/constants";

export const ProjectsSection = () => {
  // Placeholder Project Data
  return (
    <section className="relative w-full bg-blue-200/50 dark:bg-black py-20 md:py-32 overflow-hidden px-4 md:px-0 transition-colors duration-500">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[80%] hidden dark:block bg-blue-600/15 blur-[140px] pointer-events-none z-0 rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2
            className={`${oswald.className} text-4xl md:text-6xl font-bold uppercase tracking-wider text-black dark:text-white text-shadow-[0px_0px_20px_rgba(0,0,0,0.35)] dark:text-shadow-[0px_0px_20px_rgba(255,255,255,0.6)]`}
          >
            Side Quests
          </h2>
          <p className="text-emerald-400 font-mono text-sm md:text-base mt-2 uppercase tracking-widest">
            // Solo Ventures
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-24 w-full mt-10">
          <div className="flex flex-col items-center">
            <div className="hidden md:block">
              <DirectionAwareHover
                imageUrl={projectsData.image}
                className="w-[800px] h-[500px] border border-black/50 dark:border-white/30"
                imageClassName="opacity-80"
              >
                <div className="flex flex-col gap-4 max-w-xl">
                  <h3 className="font-bold text-3xl">{projectsData.title}</h3>
                  <p className="text-neutral-200 text-sm">
                    {projectsData.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {projectsData.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-black/50 border border-white/20 px-3 py-1 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-4">
                    <a
                      href={projectsData.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors"
                    >
                      <IconExternalLink size={18} /> Live Demo
                    </a>
                    <a
                      href={projectsData.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-emerald-400 transition-colors"
                    >
                      <IconBrandGithub size={18} /> Source Code
                    </a>
                  </div>
                </div>
              </DirectionAwareHover>
            </div>
            <div className="block md:hidden mt-10">
              <PinContainer
                title="View Project"
                href={projectsData.liveLink}
                containerClassName="w-full"
              >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[22rem] ">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-xl text-slate-100">
                    {projectsData.title}
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500 ">
                      {projectsData.description}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {projectsData.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 px-2 py-1 text-[10px] rounded-sm text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden relative">
                    <img
                      src={projectsData.image}
                      alt={projectsData.title}
                      className="object-cover w-full h-full opacity-80"
                    />
                  </div>
                </div>
              </PinContainer>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3
              className={`${oswald.className} text-3xl md:text-5xl font-black text-black/70 dark:text-white uppercase tracking-widest leading-tight`}
            >
              More Drops <br /> In The Vault.
            </h3>
            <div className="mt-8">
              <span className="bg-black/50 text-white px-6 py-2 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                [ Stay Tuned ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
