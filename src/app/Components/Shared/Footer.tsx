"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { oswald, Socials } from "@/lib/constants";

export const Footer = () => {
  return (
    <footer className="relative w-full bg-black overflow-hidden pt-15 flex flex-col items-center z-20 border-t border-white/5">
      <BackgroundBeams />
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-5 relative z-10">
        <div className="flex flex-col items-center md:items-start group">
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest group-hover:text-blue-500/80 transition-colors duration-500">
            // Person Behind this
          </p>
          <h3
            className={`${oswald.className} text-2xl font-bold text-white tracking-widest uppercase mt-1 group-hover:text-blue-400 transition-colors duration-500`}
          >
            Adam
          </h3>
        </div>
        <div className="flex items-center gap-6">
          {Socials.map((e, i) => {
            return (
              <a
                key={i}
                href={e.link}
                target="_blank"
                rel="noreferrer"
                className="group relative p-3 rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {e.icon}
              </a>
            );
          })}
        </div>
      </div>

      {/* 3. The Massive Hover Typography (Bottom Row) */}
      <div className="w-full md:mb-0 mt-10 relative z-10 flex items-end justify-center">
        <div className="w-full md:w-[90vw] aspect-[500/80] md:aspect-auto md:h-[30vh] flex items-end">
          <TextHoverEffect text="adamn.in" />
        </div>
      </div>
    </footer>
  );
};
