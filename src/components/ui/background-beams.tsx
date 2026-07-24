"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    // Bind event to window to track even if mouse is slightly off
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Predictable criss-crossing paths for the laser beams
  const paths = [
    "M-100,0 L1200,800",
    "M-100,800 L1200,0",
    "M-100,200 L1200,600",
    "M-100,600 L1200,200",
    "M400,-100 L400,900",
    "M800,-100 L800,900",
    "M-100,400 L1200,400",
    "M600,-100 L600,900",
    "M200,-100 L1000,900",
    "M1000,-100 L200,900",
  ];

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 h-full w-full overflow-hidden bg-black",
        className,
      )}
    >
      {/* The base faint grid (Brighter) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Static ambient glow so it's not pitch black */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      {/* The glowing spotlight tracking the mouse (Brighter) */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 50%)`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />

      {/* The animated shooting laser beams (Brighter) */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none opacity-40"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#beam-grad)"
            strokeWidth="1.5"
            initial={{
              strokeDasharray: "150 1500",
              strokeDashoffset: 1500,
              opacity: 0,
            }}
            animate={{
              strokeDashoffset: -1500,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: (i % 4) + 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
            }}
          />
        ))}
      </svg>
    </div>
  );
};
