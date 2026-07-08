"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { oswald } from "@/lib/constants";
import { IconArrowLeft } from "@tabler/icons-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden antialiased">
      <BackgroundBeams />
      
      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        {/* Massive Glitchy 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1
            className={`${oswald.className} text-[120px] md:text-[200px] font-black text-white/5 tracking-tighter select-none`}
          >
            404
          </h1>
          <h1
            className={`${oswald.className} text-[120px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600 tracking-tighter absolute inset-0 blur-[2px] opacity-50 select-none`}
          >
            404
          </h1>
          <h1
            className={`${oswald.className} text-[120px] md:text-[200px] font-black text-emerald-400 tracking-tighter absolute inset-0 select-none drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]`}
          >
            404
          </h1>
        </motion.div>

        {/* Subtitles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center space-y-4 -mt-4 md:-mt-10"
        >
          <h2 className={`${oswald.className} text-2xl md:text-4xl font-bold uppercase tracking-widest text-white`}>
            Sector Not Found
          </h2>
          <p className="font-mono text-sm md:text-base text-neutral-400 max-w-md mx-auto uppercase tracking-widest">
            // The coordinates you entered point to empty space in the digital void.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12"
        >
          <Link href="/">
            <button className="group relative px-8 py-4 bg-transparent text-white font-mono uppercase tracking-widest text-sm overflow-hidden rounded-full border border-white/20 hover:border-emerald-500/50 transition-colors duration-300">
              <div className="absolute inset-0 bg-emerald-500/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                <IconArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
                Return to Base
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
