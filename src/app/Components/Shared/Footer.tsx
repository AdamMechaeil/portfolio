"use client";

import React from "react";
import { Oswald } from "next/font/google";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });

export const Footer = () => {
  return (
    <footer className="relative w-full bg-black overflow-hidden pt-15 flex flex-col items-center z-20 border-t border-white/5">
      {/* 1. The Interactive Canvas */}
      <BackgroundBeams />

      {/* 2. The Command Center (Top Row) */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-5 relative z-10">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start group">
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest group-hover:text-emerald-500/80 transition-colors duration-500">
            // Person Behind this
          </p>
          <h3
            className={`${oswald.className} text-2xl font-bold text-white tracking-widest uppercase mt-1 group-hover:text-emerald-400 transition-colors duration-500`}
          >
            Adam
          </h3>
        </div>

        {/* Social Links Dock */}
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="group relative p-3 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <IconBrandLinkedin
              className="text-white/70 group-hover:text-emerald-400 relative z-10 transition-colors"
              size={24}
            />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="group relative p-3 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <IconBrandGithub
              className="text-white/70 group-hover:text-emerald-400 relative z-10 transition-colors"
              size={24}
            />
          </a>
        </div>
      </div>

      {/* 3. The Massive Hover Typography (Bottom Row) */}
      <div className="w-full mb-8 md:mb-0 mt-10 relative z-10 flex items-end justify-center">
        <div className="w-full md:w-[90vw] aspect-[500/80] md:aspect-auto md:h-[30vh] flex items-end">
          <TextHoverEffect text="adamn.in" />
        </div>
      </div>
    </footer>
  );
};
