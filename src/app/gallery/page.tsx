'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';
import SpotlightCard from '@/components/SpotlightCard';
import PageHeader from '@/components/PageHeader';

interface GalleryItem {
  src: string;
  category: string;
  title: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number>(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/DATA/17_images.json')
      .then((res) => res.json())
      .then((data) => {
        const loadedItems: GalleryItem[] = [];
        
        Object.entries(data).forEach(([key, val]) => {
          if (Array.isArray(val)) {
            val.forEach((imgSrc: string, i: number) => {
              loadedItems.push({
                src: imgSrc,
                category: key,
                title: `${key.charAt(0).toUpperCase() + key.slice(1)} Showcase #${i + 1}`,
              });
            });
          }
        });

        setItems(loadedItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load gallery images:', err);
        setLoading(false);
      });
  }, []);

  const filtered = items.filter((item) => {
    if (filter === 'all') return true;
    return item.category.toLowerCase() === filter.toLowerCase();
  });

  const categories = [
    { id: 'all', label: 'All Images' },
    { id: 'hero', label: 'Hero' },
    { id: 'childhood', label: 'Childhood' },
    { id: 'barcelona', label: 'FC Barcelona' },
    { id: 'argentina', label: 'Argentina Selection' },
    { id: 'psg', label: 'PSG' },
    { id: 'interMiami', label: 'Inter Miami' },
    { id: 'goals', label: 'Goals catalog' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'trophies', label: 'Trophies' },
    { id: 'wallpapers', label: 'Wallpapers' },
  ];

  // Open Lightbox
  const openLightbox = (item: GalleryItem) => {
    const idx = filtered.findIndex((x) => x.src === item.src);
    setLightboxImg(item);
    setLightboxIdx(idx);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImg) return;
      if (e.key === 'Escape') setLightboxImg(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, lightboxIdx, filtered]);

  const handlePrev = () => {
    if (lightboxIdx > 0) {
      setLightboxIdx((prev) => prev - 1);
      setLightboxImg(filtered[lightboxIdx - 1]);
    }
  };

  const handleNext = () => {
    if (lightboxIdx < filtered.length - 1) {
      setLightboxIdx((prev) => prev + 1);
      setLightboxImg(filtered[lightboxIdx + 1]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050608] text-neutral-500">
        Loading Media Gallery...
      </div>
    );
  }

  return (
    <>
      <Header />
      <PageHeader
        title="EXHIBITION GRID"
        subtitle="The Complete Visual Archives"
        imageCategory="wallpapers"
      />
      
      <main className="min-h-screen bg-[#050608] pb-16 pt-16 px-6 md:px-12 flex flex-col justify-start">
        <div className="max-w-6xl mx-auto w-full">
          
          

          {/* Filter Categories tab bar */}
          <div className="flex gap-2 mb-12 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                  filter === c.id
                    ? 'bg-accent-blue text-black font-bold shadow-[0_0_10px_rgba(110,198,255,0.4)]'
                    : 'bg-[#0A0F17] text-neutral-400 hover:text-white border border-white/5'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Gallery masonry columns */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openLightbox(item)}
                  className="group relative h-64 rounded-xl overflow-hidden border border-white/5 bg-[#0A0F17] cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-accent-blue mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-cinzel text-xs font-semibold text-white mb-2 leading-tight">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Zoom View</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-neutral-500 font-sans text-xs">
              No images registered for this category in the database.
            </div>
          )}

        </div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-[#050608]/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close */}
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                disabled={lightboxIdx === 0}
                className={`p-3 rounded-lg bg-neutral-900 border border-white/10 text-white pointer-events-auto transition-colors ${
                  lightboxIdx === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-neutral-800'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                disabled={lightboxIdx === filtered.length - 1}
                className={`p-3 rounded-lg bg-neutral-900 border border-white/10 text-white pointer-events-auto transition-colors ${
                  lightboxIdx === filtered.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-neutral-800'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image wrapper */}
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              className="relative max-w-4xl w-full h-[65vh] rounded-2xl overflow-hidden border border-white/10 select-none bg-[#050608]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImg.src}
                alt={lightboxImg.title}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Caption details */}
            <div className="mt-6 text-center select-none" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] uppercase tracking-widest font-bold text-accent-blue mb-1 block">
                {lightboxImg.category} image ({lightboxIdx + 1} of {filtered.length})
              </span>
              <h3 className="font-cinzel text-lg font-bold text-white">
                {lightboxImg.title}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FooterSection />
    </>
  );
}
