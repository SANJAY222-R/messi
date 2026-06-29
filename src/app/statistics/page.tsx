'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function StatisticsPage() {
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/09_statistics.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([stats, imgs]) => {
      setData(stats.career_totals || stats);
      setImages(imgs.goals || []); // Using goals images for statistics layout
    });
  }, []);

  if (!data) return null;

  return (
    <div className="bg-[#050608] min-h-screen text-neutral-300 overflow-hidden">
      <Header />
      
      {/* DASHBOARD HERO */}
      <section className="pt-40 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto relative z-10">
        <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-white mb-2 uppercase tracking-widest">
          Performance <br/><span className="text-accent-blue">Dashboard</span>
        </h1>
        <div className="h-[1px] w-full bg-gradient-to-r from-accent-blue/30 to-transparent mt-8 mb-16" />

        {/* PRIMARY METRICS WITH EMBEDDED IMAGES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: 'Total Matches', value: data.all_competitions?.appearances || 1104, color: '#6EC6FF' },
              { label: 'Total Goals', value: data.all_competitions?.goals || 879, color: '#FFFFFF' },
              { label: 'Total Assists', value: data.all_competitions?.assists || 384, color: '#A7DBFF' },
              { label: 'Goal Contributions', value: data.all_competitions?.goal_contributions || 1263, color: '#D4AF37' }
            ].map((metric, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="bg-[#0A0F17] rounded-3xl p-8 border border-white/5 relative overflow-hidden group"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: metric.color }} />
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 block mb-4">{metric.label}</span>
                <span className="text-6xl font-cinzel font-bold block" style={{ color: metric.color }}>{metric.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="relative h-full min-h-[400px]">
             {images.slice(0, 3).map((img, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5 + (i * 0.2) }}
                 className={`absolute rounded-2xl overflow-hidden shadow-2xl border border-white/10
                   ${i === 0 ? 'top-0 right-0 w-3/4 h-[60%] z-10' : ''}
                   ${i === 1 ? 'bottom-0 left-0 w-2/3 h-[50%] z-20' : ''}
                   ${i === 2 ? 'top-1/3 right-1/4 w-1/2 h-1/2 z-30' : ''}
                 `}
               >
                 <Image src={img} alt={`Stat Image ${i}`} fill sizes="33vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
               </motion.div>
             ))}
          </div>

        </div>

        {/* DETAILED STATS GRID WITH SCATTERED IMAGES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl z-10 relative">
            <h3 className="font-cinzel text-2xl text-white mb-8 border-b border-white/10 pb-4">Club Statistics</h3>
            <ul className="space-y-6">
              {Object.entries(data.club_football || {}).map(([key, val]) => (
                <li key={key} className="flex justify-between items-center group">
                  <span className="text-sm uppercase tracking-wider text-neutral-400 group-hover:text-accent-blue transition-colors">{key.replace(/_/g, ' ')}</span>
                  <span className="text-xl text-white font-mono">{String(val)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl z-10 relative mt-24 lg:mt-32">
            <h3 className="font-cinzel text-2xl text-white mb-8 border-b border-white/10 pb-4">International Statistics</h3>
            <ul className="space-y-6">
              {Object.entries(data.national_team || {}).map(([key, val]) => (
                <li key={key} className="flex justify-between items-center group">
                  <span className="text-sm uppercase tracking-wider text-neutral-400 group-hover:text-accent-blue transition-colors">{key.replace(/_/g, ' ')}</span>
                  <span className="text-xl text-white font-mono">{String(val)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ambient Background Images for Detail Grid */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
            {images.slice(4, 8).map((img, i) => (
              <div 
                key={i}
                className={`absolute rounded-xl overflow-hidden blur-[2px]
                  ${i === 0 ? '-top-20 left-10 w-64 h-64' : ''}
                  ${i === 1 ? 'top-1/2 right-0 w-80 h-96 -translate-y-1/2' : ''}
                  ${i === 2 ? '-bottom-20 left-1/4 w-72 h-40' : ''}
                  ${i === 3 ? 'bottom-20 -right-20 w-96 h-64' : ''}
                `}
              >
                <Image src={img} alt="Ambient Stat" fill sizes="20vw" className="object-cover" />
              </div>
            ))}
          </div>

        </div>
      </section>

      <FooterSection />
    </div>
  );
}
