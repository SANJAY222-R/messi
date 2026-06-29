'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function ReferencesPage() {
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/19_references.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([refData, imgData]) => {
      setData(refData.references || refData);
      setImages(imgData.wallpapers || []); // Using wallpapers for the references visual appendix
    });
  }, []);

  if (!data) return <div className="min-h-screen bg-[#050608]" />;

  return (
    <div className="bg-[#050608] min-h-screen text-neutral-300">
      <Header />
      
      {/* REFERENCES HERO */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-widest">
          DATA <span className="text-outline">SOURCES</span>
        </h1>
        <p className="text-xl text-neutral-500 font-light max-w-2xl">
          The verified information, books, and journalistic sources that form the foundation of this interactive museum.
        </p>
      </section>

      {/* WALLPAPER APPENDIX HEADER */}
      <section className="py-12 bg-white/5 border-y border-white/10 mb-24 overflow-hidden">
        <div className="flex gap-4 px-6 overflow-x-auto snap-x">
          {images.slice(0, 5).map((img, i) => (
             <div key={i} className="relative min-w-[200px] h-[300px] rounded-xl overflow-hidden snap-center flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity">
               <Image src={img} alt={`Wallpaper ${i}`} fill sizes="20vw" className="object-cover" />
             </div>
          ))}
        </div>
      </section>

      {/* REFERENCES DATA DISPLAY */}
      <section className="py-12 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="space-y-16">
          
          {/* Books */}
          {data.books && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="font-cinzel text-3xl text-white mb-8 uppercase tracking-widest border-l-4 border-accent-blue pl-6">Books & Biographies</h3>
              <div className="space-y-6 pl-10">
                {data.books.map((book: any, i: number) => (
                  <div key={i} className="group">
                    <h4 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">{book.title}</h4>
                    <p className="text-sm text-neutral-500 mt-1">Author: {book.author} • Publisher: {book.publisher} ({book.year})</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Documentaries */}
          {data.documentaries && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="font-cinzel text-3xl text-white mb-8 uppercase tracking-widest border-l-4 border-accent-blue pl-6">Documentaries</h3>
              <div className="space-y-6 pl-10">
                {data.documentaries.map((doc: any, i: number) => (
                  <div key={i} className="group">
                    <h4 className="text-xl font-bold text-white group-hover:text-accent-blue transition-colors">{doc.title}</h4>
                    <p className="text-sm text-neutral-500 mt-1">Platform: {doc.platform} ({doc.year})</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Websites */}
          {data.official_websites && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="font-cinzel text-3xl text-white mb-8 uppercase tracking-widest border-l-4 border-accent-blue pl-6">Official Statistics</h3>
              <div className="flex flex-wrap gap-4 pl-10">
                {data.official_websites.map((site: string, i: number) => (
                  <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-400">
                    {site}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* FINAL FULL WIDTH WALLPAPER */}
      {images[5] && (
        <section className="relative h-[70vh] w-full mt-24">
          <Image src={images[5]} alt="Final Wallpaper" fill sizes="100vw" className="object-cover object-top opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="font-cinzel text-4xl text-white tracking-[0.5em] uppercase opacity-30">END OF MUSEUM</h2>
          </div>
        </section>
      )}

      <FooterSection />
    </div>
  );
}
