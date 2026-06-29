'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image with Dark Vignette & Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/messi.jpg"
          alt="Lionel Messi Cinematic Hero"
          fill
          priority
          className="object-cover object-top opacity-70 transition-transform duration-1000 scale-105 select-none"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, black 100%) opacity-60" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Subtitle / Golden Tagline */}
          <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-gold mb-4 sm:mb-6 animate-pulse">
            The Definitive Cinematic Archive
          </span>

          {/* Majestic Main Heading */}
          <h1 className="font-cinzel text-5xl sm:text-7xl md:text-9xl font-bold tracking-widest text-white leading-none mb-4 sm:mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            MESSI
          </h1>

          {/* Argentina and Ballon d'Or Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs tracking-[0.2em] font-sans text-neutral-400 uppercase">
            <span>8x Ballon d'Or Champion</span>
            <span className="h-1 w-1 rounded-full bg-neutral-600 hidden sm:inline" />
            <span className="text-argentine">World Cup Champion</span>
            <span className="h-1 w-1 rounded-full bg-neutral-600 hidden sm:inline" />
            <span>FC Barcelona Legend</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom elegant fade and scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-[9px] uppercase tracking-[0.3em] text-neutral-400"
        >
          Scroll to Enter
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="cursor-pointer"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            });
          }}
        >
          <ChevronDown className="w-5 h-5 text-gold opacity-80 hover:opacity-100 transition-opacity" />
        </motion.div>
      </div>
    </section>
  );
}
