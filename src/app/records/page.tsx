'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function RecordsPage() {
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/12_records.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([recData, imgData]) => {
      setData(recData.world_records || recData);
      setImages(imgData.hero || []); // Using hero images for records
    });
  }, []);

  if (!data) return <div className="min-h-screen bg-[#050608]" />;

  return (
    <div className="bg-[#050608] min-h-screen text-neutral-300">
      <Header />
      
      {/* RECORDS HERO */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="font-cinzel text-5xl md:text-8xl font-bold text-white mb-6 uppercase tracking-widest drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          HISTORY <br/><span className="text-outline">REWRITTEN</span>
        </motion.h1>
      </section>

      {/* FULL WIDTH PARALLAX DIVIDER 1 */}
      {images[7] && (
        <div className="w-full h-[60vh] relative overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${images[7]})` }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <h2 className="font-cinzel text-4xl md:text-6xl text-white opacity-20 uppercase tracking-[0.5em]">Guinness World Records</h2>
          </div>
        </div>
      )}

      {/* RECORDS GRID WITH EMBEDDED IMAGES */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          
          {/* Text Blocks */}
          {Object.entries(data).map(([key, val]: any, i) => {
            if (typeof val !== 'object' || !val.record) return null;
            return (
              <motion.div 
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="break-inside-avoid bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center border border-accent-blue/50">
                    <span className="text-accent-blue font-cinzel">{i+1}</span>
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white uppercase tracking-widest">{val.record}</h3>
                </div>
                <p className="text-5xl font-cinzel font-bold text-white mb-2">{val.value}</p>
                {val.year && <p className="text-xs text-neutral-500 uppercase tracking-widest">Achieved in {val.year}</p>}
                {val.details && <p className="text-sm text-neutral-400 mt-4 leading-relaxed">{val.details}</p>}
              </motion.div>
            );
          })}

          {/* Interleaved Image Blocks */}
          {images.slice(1, 5).map((img, i) => (
            <div key={`img-${i}`} className="break-inside-avoid relative rounded-2xl overflow-hidden aspect-[3/4] border border-white/10 shadow-2xl">
              <Image src={img} alt={`Record ${i}`} fill sizes="33vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          ))}

        </div>
      </section>

      {/* FULL WIDTH PARALLAX DIVIDER 2 */}
      {images[8] && (
        <div className="w-full h-[60vh] relative overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${images[8]})` }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <h2 className="font-cinzel text-4xl md:text-6xl text-white opacity-20 uppercase tracking-[0.5em]">The Undisputed</h2>
          </div>
        </div>
      )}

      <FooterSection />
    </div>
  );
}
