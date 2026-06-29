'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function MatchesPage() {
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/14_matches.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([matchesData, imgData]) => {
      setData(matchesData.iconic_matches || matchesData);
      // We use argentina and psg images to represent various iconic matches
      setImages([...(imgData.argentina || []), ...(imgData.psg || [])]);
    });
  }, []);

  if (!data) return <div className="min-h-screen bg-[#050608]" />;

  return (
    <div className="bg-[#050608] min-h-screen text-neutral-300">
      <Header />
      
      {/* MATCHES HERO */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="font-cinzel text-5xl md:text-8xl font-bold text-white mb-6 uppercase tracking-widest">
          ICONIC <span className="text-outline">MATCHES</span>
        </h1>
        <div className="h-1 w-32 bg-accent-blue mb-12" />
        <p className="text-xl text-neutral-400 font-light max-w-2xl">
          The stages where history was written. These are the 90 minutes that defined the legacy of the greatest footballer of all time.
        </p>
      </section>

      {/* MATCHES LIST WITH SCATTERED SIDE IMAGES */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-32">
          
          {Object.entries(data).map(([key, match]: any, i) => {
            const isEven = i % 2 === 0;
            const imgUrl = images[i % images.length];

            return (
              <div key={key} className={`flex flex-col gap-8 ${isEven ? 'lg:col-span-2 lg:flex-row' : 'lg:col-span-2 lg:flex-row-reverse'}`}>
                
                {/* Image Block */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/5 group"
                >
                  <Image src={imgUrl || ''} alt={match.match} fill sizes="50vw" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <span className="font-cinzel text-2xl text-white font-bold">{match.year}</span>
                    <span className="text-xs uppercase tracking-widest text-accent-blue bg-black/50 px-3 py-1 rounded backdrop-blur-md">{match.competition}</span>
                  </div>
                </motion.div>

                {/* Data Block */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <h3 className="font-cinzel text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{match.match}</h3>
                  <p className="text-2xl text-gold-gradient font-cinzel mb-8">{match.significance}</p>
                  
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
                     <p className="text-neutral-400 leading-relaxed font-light text-lg">
                       {match.performance || match.description || "A breathtaking performance that left the world in awe."}
                     </p>
                  </div>

                  {match.stats && (
                    <div className="flex gap-8">
                       {Object.entries(match.stats).map(([sKey, sVal]) => (
                         <div key={sKey}>
                           <span className="block text-3xl font-cinzel text-white">{String(sVal)}</span>
                           <span className="text-[10px] uppercase tracking-widest text-neutral-500">{sKey.replace(/_/g, ' ')}</span>
                         </div>
                       ))}
                    </div>
                  )}
                </motion.div>

              </div>
            );
          })}

        </div>
      </section>

      <FooterSection />
    </div>
  );
}
