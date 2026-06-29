'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imageCategory: string; 
}

export default function PageHeader({ title, subtitle, imageCategory }: PageHeaderProps) {
  const [bgImage, setBgImage] = useState<string>('');

  useEffect(() => {
    fetch('/DATA/17_images.json')
      .then((res) => res.json())
      .then((data) => {
        const images = data[imageCategory];
        if (images && images.length > 0) {
          // Select a random image from the category for the banner
          const randomIndex = Math.floor(Math.random() * images.length);
          setBgImage(images[randomIndex]);
        }
      })
      .catch((err) => console.error('Failed to load page header image:', err));
  }, [imageCategory]);

  return (
    <div className="relative w-full h-[35vh] sm:h-[45vh] lg:h-[50vh] overflow-hidden flex items-end justify-start px-6 md:px-12 pb-12 mt-[76px] bg-[#050608]">
      <AnimatePresence>
        {bgImage && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={bgImage}
              alt={title}
              fill
              priority
              className="object-cover object-center select-none pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Vignette overlays to blend into the dark theme seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050608] via-transparent to-transparent opacity-80" />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start select-none">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.3em] font-semibold mb-2 block text-accent-blue"
        >
          {subtitle}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-white leading-tight drop-shadow-2xl"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[1px] w-24 mt-6 origin-left bg-accent-blue/50 shadow-[0_0_8px_#6EC6FF]"
        />
      </div>
    </div>
  );
}
