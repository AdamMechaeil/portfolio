"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTheme } from "next-themes";
import {
  IconMoon,
  IconSun,
  IconMail,
  IconFileDownload,
} from "@tabler/icons-react";

export const Navigation = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [time, setTime] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.div
      className="fixed top-4 inset-x-0 z-50 mx-auto flex items-center justify-between bg-black/50 border border-black/10 dark:border-white/10 rounded-full px-6 py-3 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-none"
      initial={{ width: "80%", maxWidth: "800px" }}
      animate={{
        width: isScrolled ? "350px" : "80%",
        maxWidth: isScrolled ? "350px" : "800px",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div
        className="text-2xl font-black tracking-tighter drop-shadow-md"
        initial={{ opacity: 1, display: "block" }}
        animate={{
          opacity: isScrolled ? 0 : 1,
          display: isScrolled ? "none" : "block",
        }}
        transition={{ duration: 0.2 }}
      >
        <img
          src="/logo.png"
          alt="AM"
          className="w-12 h-12 object-cover rounded-corners invert drop-shadow-md"
        />
      </motion.div>
      <div
        className={`flex items-center gap-4 drop-shadow-md ${isScrolled ? "w-full justify-between" : ""}`}
      >
        {mounted && (
          <span className="text-sm font-medium tabular-nums drop-shadow-md text-white">
            {time}
          </span>
        )}

        <div className="flex items-center gap-3">
          <a
            href="mailto:contact@example.com"
            className="p-2 rounded-full hover:bg-black/10 drop-shadow-md text-white"
            title="Email Me"
          >
            <IconMail size={20} />
          </a>

          <a
            href="/resume.pdf"
            download
            className="p-2 rounded-full hover:bg-black/10 transition-colors drop-shadow-md text-white"
            title="Download Resume"
          >
            <IconFileDownload size={20} />
          </a>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-black/10 transition-colors drop-shadow-md text-white"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <IconSun size={20} />
              ) : (
                <IconMoon size={20} />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
