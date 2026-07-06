"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentContainerRef.current) {
      setSvgHeight(contentContainerRef.current.offsetHeight);
    }
  }, []);

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute -left-4 md:-left-12 top-3">
        <motion.div
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center bg-black"
        >
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              backgroundColor:
                scrollYProgress.get() > 0 ? "#ffffff" : "#10b981",
              borderColor: scrollYProgress.get() > 0 ? "#ffffff" : "#059669",
            }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-[26px] block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 9 0 V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            strokeWidth="3"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 9 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="6"
            className="motion-reduce:hidden"
            style={{
              pathLength: smoothProgress,
            }}
          ></motion.path>
          <defs>
            <linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1="0"
              y2={svgHeight}
            >
              <stop offset="0%" stopColor="#10b981"></stop>
              <stop offset="50%" stopColor="#3b82f6"></stop>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentContainerRef}>{children}</div>
    </motion.div>
  );
};
