"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This controls how long the preloader stays on screen.
    // Adjust the 4000 (4 seconds) to exactly match the length of your video!
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black"
        >
          {/* Replace src with the exact filename of your cursive name video */}
          <video
            autoPlay
            muted
            playsInline
            className="w-full max-w-lg object-contain dark:invert"
          >
            <source src="/loading.webm" type="video/webm" />
            <source src="/loading.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
