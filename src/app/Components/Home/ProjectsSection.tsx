"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import {
  IconBrandGithub,
  IconExternalLink,
  IconHandClick,
} from "@tabler/icons-react";
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
            <div className="block md:hidden mt-10 w-[95vw] max-w-[320px]">
              <MobileFlipCard project={projectsData} />
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

const MobileFlipCard = ({ project }: { project: typeof projectsData }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[400px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        {/* Front of Card (Image) */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-mono uppercase">
              <IconHandClick size={16} className="animate-pulse" />
              <span>Tap for details</span>
            </div>
          </div>
        </div>

        {/* Back of Card (Details) */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-neutral-900 p-6 flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="font-bold text-2xl text-white mb-4">
            {project.title}
          </h3>
          <p className="text-neutral-300 text-sm flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 my-4">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="bg-black/50 border border-white/10 px-2 py-1 text-[10px] rounded-full text-emerald-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-2 rounded-lg text-xs transition-colors"
            >
              <IconExternalLink size={16} /> Live
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-lg text-xs transition-colors"
            >
              <IconBrandGithub size={16} /> Source
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
