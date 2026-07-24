"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import {
  IconBrandGithub,
  IconExternalLink,
  IconHandClick,
} from "@tabler/icons-react";
import { oswald, projectsData } from "@/lib/constants";

export const ProjectsSection = () => {
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
          <p className="text-blue-400 font-mono text-sm md:text-base mt-2 uppercase tracking-widest">
            // Solo Ventures
          </p>
        </div>

        <div className="w-full max-w-xs md:max-w-5xl mx-auto mt-10 relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projectsData.map((project, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-2 md:pl-4 md:basis-full flex justify-center"
                >
                  <div className="p-1 w-full flex justify-center">
                    {/* Desktop View */}
                    <div className="hidden md:flex w-full justify-center">
                      <DirectionAwareHover
                        imageUrl={project.image}
                        className="w-full md:w-full max-w-[950px] aspect-video border rounded-3xl"
                        imageClassName="object-cover object-top origin-top scale-[1.05]"
                      >
                        <div className="flex flex-col gap-4 max-w-xl">
                          <h3 className="font-bold text-3xl">
                            {project.title}
                          </h3>
                          <p className="text-neutral-200 text-sm">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.techStack.map((tech, techIdx) => (
                              <span
                                key={techIdx}
                                className="bg-black/50 border border-white/20 px-3 py-1 text-xs rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-4 mt-4">
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
                            >
                              <IconExternalLink size={16} /> Live Demo
                            </a>
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
                            >
                              <IconBrandGithub size={18} /> Source Code
                            </a>
                          </div>
                        </div>
                      </DirectionAwareHover>
                    </div>

                    {/* Mobile View */}
                    <div className="block md:hidden w-full max-w-[320px] mx-auto">
                      <MobileFlipCard project={project} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 lg:-left-20 bg-black dark:bg-white text-white dark:text-black hover:bg-blue-500 hover:text-black dark:hover:bg-blue-500 border-none shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all" />
              <CarouselNext className="absolute -right-12 lg:-right-20 bg-black dark:bg-white text-white dark:text-black hover:bg-blue-500 hover:text-black dark:hover:bg-blue-500 border-none shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all" />
            </div>
          </Carousel>
          <div className="block md:hidden text-center mt-6 text-blue-400 font-mono text-xs uppercase tracking-widest animate-pulse">
            {"<"} Swipe for more {">"}
          </div>
        </div>

        {/* "More Drops" End Section */}
        <div className="w-full flex flex-col items-center justify-center mt-20 mb-10">
          <h2
            className={`${oswald.className} text-3xl md:text-5xl font-bold uppercase tracking-wider text-center mb-6 text-black dark:text-white text-shadow-[0px_0px_20px_rgba(0,0,0,0.35)] dark:text-shadow-[0px_0px_20px_rgba(255,255,255,0.6)]`}
          >
            MORE DROPS IN THE VAULT...
          </h2>
          <div className="relative group cursor-not-allowed">
            <span className="bg-black/50 text-white px-6 py-2 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              [ Stay Tuned ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const MobileFlipCard = ({ project }: { project: (typeof projectsData)[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[400px] cursor-pointer max-w-[360px] mx-auto"
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
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl bg-gray-100 dark:bg-neutral-900"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={project.image}
            alt={project.title}
            className={`object-cover w-full h-full opacity-90 ${project.mobileAlignment || "object-left-top"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-mono uppercase">
              <IconHandClick size={16} className="animate-pulse" />
              <span>Tap for details</span>
            </div>
          </div>
        </div>

        {/* Back of Card (Details) */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-neutral-900 p-6 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
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
                className="bg-black/50 border border-white/10 px-2 py-1 text-[10px] rounded-full text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 rounded-lg text-xs transition-colors"
            >
              <IconExternalLink size={16} /> Live
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
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
