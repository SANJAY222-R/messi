'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';

interface CategoryGalleryProps {
  category: string;
}

export default function CategoryGallery({ category }: CategoryGalleryProps) {
  const [images, setImages] = useState<string[]>([]);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/DATA/17_images.json')
      .then((res) => res.json())
      .then((data) => {
        if (data[category] && Array.isArray(data[category])) {
          setImages(data[category]);
        }
      })
      .catch((err) => console.error('Failed to load gallery images:', err));
  }, [category]);

  if (images.length === 0) return null;

  return (
    <section className="w-full py-16 border-t border-white/5 relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="font-cinzel text-3xl font-bold tracking-wider text-white uppercase">
            {category} Gallery
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-accent-blue/50 to-transparent" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 break-inside-avoid cursor-pointer"
              onClick={() => setLightboxImg(src)}
            >
              <Image
                src={src}
                alt={`${category} image ${idx + 1}`}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <ZoomIn className="text-white w-8 h-8 opacity-70" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImg(null);
              }}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-6xl h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImg}
                alt="Lightbox View"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
