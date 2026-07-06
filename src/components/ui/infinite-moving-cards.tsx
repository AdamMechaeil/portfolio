"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    imgSrc: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 pt-24 pb-8 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <TooltipCard key={`${item.name}-${idx}`} item={item} />
        ))}
        {items.map((item, idx) => (
          <TooltipCard key={`${item.name}-${idx}-duplicate`} item={item} />
        ))}
      </ul>
    </div>
  );
};

const TooltipCard = ({ item }: { item: { name: string; imgSrc: string } }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex-shrink-0 flex items-center justify-center rounded-2xl bg-neutral-100/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-sm transition-all duration-300 hover:border-blue-500/50 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 10, scale: 0.6 }}
            className="absolute -top-16 flex flex-col items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-black text-white text-xs font-bold px-4 py-2 rounded-md shadow-xl whitespace-nowrap border border-white/20">
              {item.name}
            </div>
            {/* Tooltip triangle pointer */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-12 h-12 relative transition-all duration-300 scale-100 group-hover:scale-110">
        <img
          src={item.imgSrc}
          alt={item.name}
          className="w-full h-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
        />
      </div>
    </li>
  );
};
