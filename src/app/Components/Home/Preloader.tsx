"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  INTRO_DONE_EVENT,
  INTRO_MAX_MS,
  markIntroSeen,
  shouldSkipIntro,
} from "@/lib/intro";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const finished = useRef(false);
  const failsafe = useRef<ReturnType<typeof setTimeout>>(undefined);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    clearTimeout(failsafe.current);
    markIntroSeen();
    setIsLoading(false);
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  }, []);

  // (Re)start the failsafe so a slow start never cuts the video short.
  const armFailsafe = useCallback(() => {
    clearTimeout(failsafe.current);
    failsafe.current = setTimeout(finish, INTRO_MAX_MS);
  }, [finish]);

  useEffect(() => {
    if (shouldSkipIntro()) {
      finish();
      return;
    }
    armFailsafe();
    return () => clearTimeout(failsafe.current);
  }, [finish, armFailsafe]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          data-preloader
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black"
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            onPlaying={armFailsafe}
            onEnded={finish}
            className="w-full max-w-lg object-contain dark:invert"
          >
            <source src="/loading.webm" type="video/webm" />
            <source src="/loading.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={finish}
            className="absolute bottom-6 right-6 rounded-full border border-black/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-black/60 transition-colors hover:border-black/50 hover:text-black dark:border-white/20 dark:text-white/60 dark:hover:border-white/50 dark:hover:text-white"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
