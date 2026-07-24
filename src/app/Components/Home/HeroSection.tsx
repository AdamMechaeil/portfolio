"use client";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { oswald, wordsHero } from "@/lib/constants";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-black flex flex-col md:flex-row shadow-xl">
      <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 md:scale-105"
        >
          <source src="/1One video for left.webm" type="video/webm" />
          <source src="/1One video for left.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 md:scale-105"
        >
          <source src="/2nd video for hero.webm" type="video/webm" />
          <source src="/2nd video for hero.mp4" type="video/mp4" />
        </video>
      </div>
      <motion.img
        src="/katana.png"
        alt="Divider"
        className="absolute inset-0 m-auto z-[16] h-[130%] md:h-[120%] md:w-auto w-full object-cover rotate-90 md:rotate-0 drop-shadow-2xl pointer-events-none blur-[2.5px]"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 z-[15] pointer-events-none backdrop-blur-[3px] backdrop-brightness-70 backdrop-contrast-120 backdrop-saturate-130" />
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none mt-16">
        <div className="w-[95%] md:w-[70%] lg:w-[60%] p-4 md:p-8 pointer-events-auto text-center flex flex-col items-center">
          <TypewriterEffect
            words={wordsHero}
            cursorClassName="bg-blue-500"
            startDelay={8100}
          />

          <h2
            className={`${oswald.className} uppercase tracking-wider text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300 font-extrabold mt-4 drop-shadow-lg`}
          >
            Full Stack Engineer
          </h2>

          <div className="w-3/4 md:w-1/2 h-[3px] bg-gradient-to-r from-transparent via-white/40 to-transparent my-12" />

          <div className="flex flex-col gap-8 w-full px-4">
            {/* Luffy Quote */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-white font-black font-sans uppercase tracking-wide text-xs md:text-sm [text-shadow:0_4px_15px_black] text-center max-w-[95%]">
                "As long as I live, there are infinite possibilities."
              </p>
              {/* Baseline Pill: White background, matte black text */}
              <span className="bg-black/50 text-white px-5 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg">
                — Monkey D. Luffy
              </span>
            </div>

            {/* Eminem Quote */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-white font-black font-sans uppercase tracking-wide text-xs md:text-sm [text-shadow:0_4px_15px_black] text-center max-w-[95%]">
                "Here is my list: It goes Reggie, Jay-Z, 2Pac and Biggie, André
                from OutKast, Jada, Kurupt, Nas, and then me."
              </p>
              {/* Baseline Pill: White background, matte black text */}
              <span className="bg-black/50 text-white px-5 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg">
                — Eminem
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
