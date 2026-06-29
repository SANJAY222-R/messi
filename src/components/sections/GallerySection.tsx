'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryData, ImageItem } from '@/types/messi';
import { ZoomIn, X } from 'lucide-react';
import Image from 'next/image';

export default function GallerySection() {
  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImg, setLightboxImg] = useState<ImageItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/DATA/17_images.json')
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load gallery images:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !gallery) {
    return (
      <div className="h-96 flex items-center justify-center bg-black text-neutral-500">
        Loading Gallery...
      </div>
    );
  }

  const { featured } = gallery;

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'portrait', label: 'Portraits' },
    { id: 'argentina', label: 'Argentina Selection' },
    { id: 'worldcup', label: 'World Cup Glory' },
    { id: 'barcelona', label: 'FC Barcelona' },
  ];

  const filteredImages = featured.filter((img) => {
    if (activeCategory === 'all') return true;
    return img.category === activeCategory;
  });

  return (
    <section className="relative min-h-screen w-full bg-black py-24 px-6 md:px-12 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            The Visual Highlights
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white">
            MEDIA GALLERY
          </h2>
          <div className="h-[1px] w-24 bg-gold mt-4 mx-auto" />
        </div>

        {/* Categories filters */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                activeCategory === c.id
                  ? 'bg-gold text-black font-bold glow-shadow-gold'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Gallery Masonry / Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxImg(img)}
                className="group relative h-72 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 cursor-pointer"
              >
                {/* Image */}
                <Image
                  src={img.file}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Cover Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gold mb-1 block">
                        {img.category}
                      </span>
                      <h4 className="font-cinzel text-sm sm:text-base font-semibold text-white">
                        {img.title}
                      </h4>
                    </div>
                    <div className="p-2 rounded-full bg-gold/10 border border-gold/30 text-gold">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image Container */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-4xl w-full h-[70vh] rounded-2xl overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()} // Prevent clicking close when clicking container
              >
                <Image
                  src={lightboxImg.file}
                  alt={lightboxImg.title}
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Caption */}
              <div className="mt-6 text-center select-none" onClick={(e) => e.stopPropagation()}>
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold mb-1 block">
                  {lightboxImg.category}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  {lightboxImg.title}
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
