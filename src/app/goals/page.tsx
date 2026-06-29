'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function GoalsPage() {
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/13_goals.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([goals, imgs]) => {
      setData(goals.overview || goals);
      setImages(imgs.goals || []);
    });
  }, []);

  if (!data || images.length === 0) return <div className="min-h-screen bg-[#050608]" />;

  return (
    <div className="bg-[#050608] min-h-screen text-neutral-300 overflow-hidden relative">
      <Header />
      
      {/* AMBIENT LIGHTING */}
      <div className="fixed inset-0 ambient-glow-blue opacity-30 pointer-events-none z-0" />

      {/* DYNAMIC BACKGROUND IMAGE WALL */}
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none columns-2 md:columns-4 gap-4 p-4">
        {[...images, ...images].map((src, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1, duration: 1 }}
            className="mb-4 rounded-xl overflow-hidden relative border border-white/5 shadow-2xl"
          >
             <Image src={src} alt="Goal" width={400} height={500} className="w-full h-auto object-cover grayscale mix-blend-screen" />
          </motion.div>
        ))}
      </div>

      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#050608]/80 via-transparent to-[#050608]/90 pointer-events-none" />

      {/* FOREGROUND GLASSMORPHIC DASHBOARD */}
      <section className="relative z-10 pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-20 glass-panel px-12 py-8 rounded-full border-t-2 border-t-accent-blue/50">
          <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-white uppercase tracking-[0.3em] drop-shadow-2xl">
            GOALS <span className="text-outline">ARCHIVE</span>
          </h1>
          <p className="mt-6 text-accent-blue tracking-[0.5em] uppercase text-sm font-bold">
            {data.career_goal_summary?.official_goals || '879'} Official Goals
          </p>
        </motion.div>

        {/* GLASSMORPHIC STATS BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {Object.entries(data.career_goal_summary || {}).map(([key, val], i) => (
            <motion.div 
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="glass-card p-10 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors group rounded-3xl"
            >
              <span className="text-6xl font-cinzel font-bold text-white mb-4 group-hover:text-accent-blue transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{String(val)}</span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400">
                {key.replace(/_/g, ' ')}
              </span>
            </motion.div>
          ))}
        </div>

        {/* LIST OF MAJOR ACHIEVEMENTS */}
        <div className="mt-24 w-full max-w-5xl glass-card rounded-3xl p-10 md:p-16 border-l-4 border-l-accent-blue relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent-blue/10 blur-3xl rounded-full group-hover:bg-accent-blue/20 transition-colors" />
          
          <h3 className="font-cinzel text-3xl text-white mb-10 text-center uppercase tracking-[0.2em] relative z-10">Legendary Exploits</h3>
          <ul className="space-y-6 relative z-10">
            {data.major_goal_achievements?.map((achievement: string, idx: number) => (
              <li key={idx} className="flex items-center gap-6 text-lg text-neutral-300 group/item">
                <span className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_#6EC6FF] group-hover/item:scale-150 transition-transform" />
                <span className="group-hover/item:text-white transition-colors">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="relative z-20">
        <FooterSection />
      </div>
    </div>
  );
}
