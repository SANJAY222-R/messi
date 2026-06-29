'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function AwardsPage() {
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/11_awards.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([awardsData, imgData]) => {
      setData(awardsData.individual || awardsData);
      setImages(imgData.portraits || []); // Using portraits for the awards page
    });
  }, []);

  if (!data) return <div className="min-h-screen bg-[#050608]" />;

  return (
    <div className="bg-[#050608] min-h-screen text-neutral-300">
      <Header />
      
      {/* AWARDS HERO */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h2 className="text-gold-gradient uppercase tracking-[0.4em] text-xs font-semibold mb-4">Individual Honors</h2>
            <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
              PEERLESS <br/> <span className="text-outline">EXCELLENCE</span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              A record-breaking 8 Ballon d'Or awards and countless individual accolades cementing his status as the best to ever play the game.
            </p>
          </motion.div>
        </div>
        
        {/* Hero Portrait */}
        <div className="w-full md:w-1/2 relative h-[600px] rounded-full overflow-hidden border-2 border-white/5 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
           <Image src={images[0] || ''} alt="Award Winner" fill sizes="50vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" priority />
        </div>
      </section>

      {/* AWARDS LIST WITH EMBEDDED IMAGES */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h3 className="font-cinzel text-4xl text-white mb-16 uppercase tracking-widest text-center border-b border-white/10 pb-8">The Collection</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* List Column */}
          <div className="md:col-span-7 space-y-4">
             {Object.entries(data).map(([key, val]: any, i) => {
               if (!val || typeof val !== 'object' || !val.total) return null;
               return (
                 <motion.div 
                   key={key}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.05 }}
                   className="flex justify-between items-center p-6 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-colors group"
                 >
                   <div>
                     <span className="text-xl font-cinzel text-white group-hover:text-gold-gradient transition-colors capitalize">{key.replace(/_/g, ' ')}</span>
                     <p className="text-xs text-neutral-500 uppercase tracking-widest mt-2">{val.years?.slice(0,3).join(', ')}{val.years?.length > 3 ? '...' : ''}</p>
                   </div>
                   <span className="text-4xl font-cinzel text-white font-bold">{val.total}</span>
                 </motion.div>
               );
             })}
          </div>

          {/* Sticky Image Column */}
          <div className="md:col-span-5 hidden md:block">
             <div className="sticky top-32 space-y-8">
                {images.slice(1, 3).map((img, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative h-[300px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
                  >
                    <Image src={img} alt="Award Moment" fill sizes="33vw" className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
             </div>
          </div>

        </div>
      </section>

      {/* HORIZONTAL IMAGE CAROUSEL FOR REMAINING PORTRAITS */}
      <section className="py-24 overflow-hidden border-t border-white/5">
        <h3 className="font-cinzel text-2xl text-center text-neutral-500 mb-12 uppercase tracking-[0.3em]">Iconic Faces</h3>
        <div className="flex gap-4 px-6 max-w-full overflow-x-auto pb-8 snap-x">
           {images.slice(3, 10).map((img, i) => (
             <div key={i} className="relative min-w-[300px] h-[400px] rounded-xl overflow-hidden snap-center flex-shrink-0 border border-white/5">
               <Image src={img} alt={`Iconic ${i}`} fill sizes="25vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
             </div>
           ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
