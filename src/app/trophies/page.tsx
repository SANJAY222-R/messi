'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function TrophiesPage() {
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/10_trophies.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([trophyData, imgData]) => {
      setData(trophyData.club || trophyData);
      setImages(imgData.trophies || []); // Using trophies images
    });
  }, []);

  if (!data) return null;

  return (
    <div className="bg-gradient-to-b from-[#111] to-[#000] min-h-screen text-neutral-300">
      <Header />
      
      {/* TROPHIES HERO AND MASONRY GRID */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-24">
          <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-white uppercase tracking-[0.2em] mb-4">
            TROPHY <span className="text-gold-gradient">ROOM</span>
          </h1>
          <p className="text-neutral-400 tracking-widest uppercase text-sm">44 Official Team Trophies</p>
        </motion.div>

        {/* INTEGRATED TROPHY SHOWCASE */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          
          {/* FC Barcelona Data Block */}
          {data.fc_barcelona && (
             <div className="break-inside-avoid bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] p-8 rounded-2xl border border-blue-900/30 shadow-2xl relative overflow-hidden group">
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 blur-3xl rounded-full" />
               <h3 className="font-cinzel text-2xl text-white mb-6 uppercase tracking-widest relative z-10">FC Barcelona</h3>
               <ul className="space-y-4 relative z-10">
                 {Object.entries(data.fc_barcelona.trophies || {}).map(([tName, tData]: any) => (
                   <li key={tName} className="flex justify-between items-center border-b border-white/5 pb-2">
                     <span className="text-neutral-400 capitalize">{tName.replace(/_/g, ' ')}</span>
                     <span className="text-white font-cinzel text-xl bg-blue-900/30 px-3 py-1 rounded">{tData.total}</span>
                   </li>
                 ))}
               </ul>
             </div>
          )}

          {/* Trophy Image Scatter */}
          {images.map((img, i) => (
             <motion.div 
               key={`img-${i}`}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: (i % 3) * 0.1 }}
               className="break-inside-avoid relative rounded-2xl overflow-hidden shadow-xl border border-white/10 group"
             >
                <div className="relative aspect-[4/5] w-full">
                  <Image src={img} alt={`Trophy ${i}`} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <span className="text-gold-gradient font-cinzel tracking-widest text-sm uppercase opacity-0 group-hover:opacity-100 transition-opacity">Legendary Hardware</span>
                </div>
             </motion.div>
          ))}

          {/* PSG Data Block */}
          {data.paris_saint_germain && (
             <div className="break-inside-avoid bg-gradient-to-br from-[#0f172a] to-[#020617] p-8 rounded-2xl border border-white/5 shadow-2xl mt-8">
               <h3 className="font-cinzel text-2xl text-white mb-6 uppercase tracking-widest">PSG</h3>
               <ul className="space-y-4">
                 {Object.entries(data.paris_saint_germain.trophies || {}).map(([tName, tData]: any) => (
                   <li key={tName} className="flex justify-between items-center border-b border-white/5 pb-2">
                     <span className="text-neutral-400 capitalize">{tName.replace(/_/g, ' ')}</span>
                     <span className="text-white font-cinzel text-xl bg-white/5 px-3 py-1 rounded">{tData.total}</span>
                   </li>
                 ))}
               </ul>
             </div>
          )}

        </div>
      </section>

      <FooterSection />
    </div>
  );
}
