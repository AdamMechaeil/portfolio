"use client";

import { useState } from "react";
import { IconAnchor } from "@tabler/icons-react";
import { ContactModal } from "@/components/ui/contact-modal";
import { oswald } from "@/lib/constants";
import { pinyonScript } from "@/lib/fonts";

const stats = [
  { value: "500+", label: "Students trained" },
  { value: "10+", label: "Projects at previous companies" },
];

const openTo = [
  "Coding",
  "Training",
  "Freelance projects",
  "Opportunities overseas",
];

const askAbout = [
  "self-improvement",
  "learning",
  "code",
  "football",
  "anime",
  "content",
  "freedom",
];

const chipClass =
  "border border-black/20 dark:border-white/20 px-3 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide text-black/90 dark:text-white/90";

export const AboutSection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <section
      aria-labelledby="about-title"
      className="relative w-full bg-blue-200/50 dark:bg-black py-20 md:py-32 overflow-hidden px-4 md:px-0 transition-colors duration-500"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[80%] hidden dark:block bg-blue-600/15 blur-[140px] pointer-events-none z-0 rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="about-title"
            className={`${oswald.className} text-4xl md:text-6xl font-bold uppercase tracking-wider text-black dark:text-white text-shadow-[0px_0px_20px_rgba(0,0,0,0.35)] dark:text-shadow-[0px_0px_20px_rgba(255,255,255,0.6)]`}
          >
            Lore
          </h2>
          <p className="text-blue-400 font-mono text-sm md:text-base mt-2 uppercase tracking-widest">
            // Character Introduction
          </p>
        </div>

        <div className="bg-white dark:bg-black backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl p-6 md:p-10 shadow-2xl">
          <div className="space-y-5 text-base md:text-lg leading-relaxed text-black/80 dark:text-white/80">
            <p>
              <span className="italic">Good day, traveller.</span> I am Adam, a
              full stack engineer who speaks fluent{" "}
              <code className="rounded bg-blue-500/10 px-1.5 py-0.5 font-mono text-[0.88em] text-blue-700 dark:text-blue-300">
                code
              </code>{" "}
              and, when the mood strikes, rather proper{" "}
              <span
                className={`${pinyonScript.className} px-[0.06em] align-[-0.08em] text-[1.9em] leading-[0] text-blue-600 [text-shadow:0_0_14px_rgba(96,165,250,0.45)] dark:text-blue-300`}
              >
                English
              </span>
              .
            </p>
            <p>
              I am forever learning, devoted to bettering myself, and happy to
              discourse on nearly any subject under the sun. My loyalties lie
              with FC Barcelona and Naruto, and I make content I hope means
              something.
            </p>
            <p>
              I have trained 500+ students and worked on 10+ projects across my
              previous companies. Above all I seek absolute freedom: to be
              master of my own time and, in due course, to count my fortune in{" "}
              <span className="font-bold text-blue-600 [text-shadow:0_0_14px_rgba(96,165,250,0.6)] dark:text-blue-400">
                $billions
              </span>
              .
            </p>
            <p>
              To be the King of the Pirates, I stand ready to set sail for new
              islands: I am open to opportunities overseas.
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col rounded-lg border border-black/10 bg-black/[0.03] px-5 py-4 dark:border-white/10 dark:bg-white/5"
              >
                <dt className="order-2 font-mono text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
                  {stat.label}
                </dt>
                <dd
                  className={`${oswald.className} text-4xl font-bold text-blue-600 dark:text-blue-400`}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-black/60 dark:text-white/60">
              // Open to
            </p>
            <ul className="flex flex-wrap gap-2">
              {openTo.map((item) => (
                <li key={item} className={`${chipClass} flex items-center gap-1.5`}>
                  {item === "Opportunities overseas" && (
                    <IconAnchor size={14} aria-hidden="true" />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-black/60 dark:text-white/60">
              // Ask me about
            </p>
            <ul className="flex flex-wrap gap-2">
              {askAbout.map((item) => (
                <li key={item} className={chipClass}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex justify-center md:justify-start">
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="rounded-full bg-black px-7 py-3 font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.03] hover:bg-blue-500 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-blue-400"
            >
              Contact me
            </button>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </section>
  );
};
