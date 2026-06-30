'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';
import CountUp from '@/components/CountUp';

export default function RecordsPage() {
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('world');

  useEffect(() => {
    Promise.all([
      fetch('/DATA/12_records.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([recData, imgData]) => {
      setData(recData);
      setImages(imgData.portraits || []); 
    });
  }, []);

  if (!data) return (
    <div className="min-h-screen bg-[#050608] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
    </div>
  );

  const { overview, world_records, barcelona_records, argentina_records } = data;

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#050608] min-h-screen text-neutral-300 font-sans selection:bg-[#D4AF37]/30">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10">
          <p className="text-gold-gradient uppercase tracking-[0.4em] text-sm mb-6 font-semibold">The Record Breaker</p>
          <h1 className="font-cinzel text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 uppercase tracking-widest leading-none drop-shadow-2xl">
            HISTORY <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 via-neutral-400 to-white">REWRITTEN</span>
          </h1>
          
          <div className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 max-w-md mx-auto shadow-2xl">
            <div className="font-cinzel text-7xl font-bold text-[#D4AF37] mb-2 flex items-center justify-center gap-1">
              <CountUp end={overview.career_record_summary.estimated_official_records} duration={2500} />
              <span className="text-5xl">+</span>
            </div>
            <p className="text-sm uppercase tracking-widest text-neutral-400">Official Records Held</p>
          </div>
        </motion.div>
        
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
      </section>

      {/* 2. STICKY NAVIGATION */}
      <div className="sticky top-20 z-50 bg-[#050608]/90 backdrop-blur-xl border-y border-white/10 py-4 mb-20">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4 md:gap-12 overflow-x-auto hide-scrollbar">
          {[
            { id: 'world', label: 'World Records' },
            { id: 'club', label: 'FC Barcelona' },
            { id: 'country', label: 'Argentina' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`uppercase tracking-widest text-xs md:text-sm whitespace-nowrap px-4 py-2 rounded-full transition-all duration-300 ${activeTab === tab.id ? 'bg-white text-black font-bold' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. WORLD RECORDS BENTO GRID */}
      <section id="world" className="px-6 md:px-12 max-w-7xl mx-auto mb-32 scroll-mt-32">
        <div className="mb-12">
          <h2 className="font-cinzel text-4xl text-white mb-2">World Records</h2>
          <p className="text-neutral-500 uppercase tracking-widest text-sm">Recognized globally across football history</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {/* Bento Item 1: Large Image + Major Record */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden border border-white/10 group">
            <Image src="/images/Portraits/serious-face.jpeg" alt="Record" fill sizes="50vw" className="object-cover object-[center_15%] opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-[#D4AF37] uppercase tracking-widest text-xs mb-2 font-bold">Guinness World Record</div>
              <div className="text-7xl font-cinzel font-bold text-white mb-2">{world_records.scoring_records.most_goals_in_calendar_year.value}</div>
              <p className="text-xl text-neutral-300 font-light">Most goals scored in a calendar year ({world_records.scoring_records.most_goals_in_calendar_year.year})</p>
            </div>
          </motion.div>

          {/* Bento Item 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-1 md:row-span-1 bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-[#D4AF37]/50 transition-colors">
            <div className="text-neutral-500 uppercase tracking-widest text-xs">Ballon d'Or</div>
            <div>
              <div className="text-5xl font-cinzel font-bold text-white mb-1">{world_records.ballon_dor_records.most_titles.value}</div>
              <p className="text-sm text-neutral-400">Most titles won by a single player</p>
            </div>
          </motion.div>

          {/* Bento Item 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-1 md:row-span-1 bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
            <div className="text-neutral-500 uppercase tracking-widest text-xs">Golden Shoe</div>
            <div>
              <div className="text-5xl font-cinzel font-bold text-white mb-1">{world_records.golden_shoe_records.most_titles.value}</div>
              <p className="text-sm text-neutral-400">Most European Golden Shoes</p>
            </div>
          </motion.div>

          {/* Bento Item 4: Wide */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 flex items-center justify-between group overflow-hidden relative">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('/images/Trophies/world-cup.webp')] bg-cover bg-[center_15%] opacity-10 mask-image-l" />
            <div className="relative z-10 w-full">
               <div className="text-[#6EC6FF] uppercase tracking-widest text-xs mb-4">FIFA World Cup</div>
               <div className="flex justify-between items-end w-full">
                 <p className="text-2xl text-white font-cinzel max-w-xs">Only player with two World Cup Golden Balls</p>
                 <span className="text-6xl font-cinzel font-bold text-white/20">2</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CLUB LEGEND (BARCELONA) BENTO GRID */}
      <section id="club" className="px-6 md:px-12 max-w-7xl mx-auto mb-32 scroll-mt-32">
        <div className="mb-12">
          <h2 className="font-cinzel text-4xl text-white mb-2">FC Barcelona</h2>
          <p className="text-neutral-500 uppercase tracking-widest text-sm">The greatest club legacy in history</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {/* Bento Item 1 */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-[#0a0515] to-[#150505] border border-blue-900/30 rounded-3xl p-6 flex flex-col justify-between">
            <div className="text-blue-400 uppercase tracking-widest text-xs">Official Appearances</div>
            <div>
              <div className="text-5xl font-cinzel font-bold text-white mb-1">{barcelona_records.club_records.most_official_appearances.value}</div>
              <p className="text-sm text-neutral-400">Club Record</p>
            </div>
          </motion.div>

          {/* Bento Item 2: Large Center */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-2 md:row-span-2 relative bg-[#050608] rounded-3xl overflow-hidden border border-red-900/30 group">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050608] to-[#050608] opacity-50" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
               <div className="text-red-500 uppercase tracking-widest text-xs mb-4 font-bold">All-Time Top Scorer</div>
               <div className="text-8xl font-cinzel font-bold text-white mb-2 drop-shadow-2xl">{barcelona_records.club_records.most_official_goals.value}</div>
               <p className="text-xl text-neutral-300 font-light max-w-sm">Goals scored across all official competitions for FC Barcelona</p>
             </div>
          </motion.div>

          {/* Bento Item 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-[#150505] to-[#0a0515] border border-red-900/30 rounded-3xl p-6 flex flex-col justify-between">
            <div className="text-red-400 uppercase tracking-widest text-xs">Total Trophies</div>
            <div>
              <div className="text-5xl font-cinzel font-bold text-white mb-1">{barcelona_records.club_records.most_trophies.value}</div>
              <p className="text-sm text-neutral-400">Most in club history</p>
            </div>
          </motion.div>

          {/* Bento Item 4 */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-1 md:row-span-1 bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
            <div className="text-neutral-500 uppercase tracking-widest text-xs">Official Assists</div>
            <div>
              <div className="text-5xl font-cinzel font-bold text-white mb-1">{barcelona_records.club_records.most_official_assists.value}</div>
              <p className="text-sm text-neutral-400">Most in club history</p>
            </div>
          </motion.div>

          {/* Bento Item 5 */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="md:col-span-1 md:row-span-1 bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
            <div className="text-neutral-500 uppercase tracking-widest text-xs">La Liga Goals</div>
            <div>
              <div className="text-5xl font-cinzel font-bold text-white mb-1">{barcelona_records.la_liga_records.most_goals}</div>
              <p className="text-sm text-neutral-400">All-time La Liga Record</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. NATIONAL PRIDE (ARGENTINA) BENTO GRID */}
      <section id="country" className="px-6 md:px-12 max-w-7xl mx-auto mb-32 scroll-mt-32">
        <div className="mb-12">
          <h2 className="font-cinzel text-4xl text-white mb-2">Argentina</h2>
          <p className="text-neutral-500 uppercase tracking-widest text-sm">Completing football for his country</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {/* Bento Item 1: Large Image */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden border border-[#6EC6FF]/30 group">
            <Image src="/images/Argentina/confetti.webp" alt="World Cup" fill sizes="50vw" className="object-cover object-[center_15%] opacity-60 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="text-[#6EC6FF] uppercase tracking-widest text-xs mb-2 font-bold">National Record</div>
              <div className="text-7xl font-cinzel font-bold text-white mb-2">{argentina_records.all_time_records.most_appearances.value}</div>
              <p className="text-xl text-neutral-300 font-light">Most appearances in Argentina history</p>
            </div>
          </motion.div>

          {/* Bento Item 2 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-[#05101a] to-[#0a1525] border border-[#6EC6FF]/20 rounded-3xl p-8 flex items-center justify-between group overflow-hidden relative">
            <div className="relative z-10 w-full">
               <div className="text-[#6EC6FF] uppercase tracking-widest text-xs mb-4">All-Time Top Scorer</div>
               <div className="flex justify-between items-end w-full">
                 <p className="text-2xl text-white font-cinzel max-w-xs">Most goals scored for the Argentina National Team</p>
                 <span className="text-6xl font-cinzel font-bold text-white">{argentina_records.all_time_records.most_goals.value}</span>
               </div>
            </div>
          </motion.div>

          {/* Bento Item 3 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-1 md:row-span-1 bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-[#6EC6FF]/50 transition-colors">
            <div className="text-neutral-500 uppercase tracking-widest text-xs">World Cup Matches</div>
            <div>
              <div className="text-5xl font-cinzel font-bold text-white mb-1">{argentina_records.fifa_world_cup_records.most_world_cup_appearances}</div>
              <p className="text-sm text-neutral-400">All-time World Record</p>
            </div>
          </motion.div>

          {/* Bento Item 4 */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="md:col-span-1 md:row-span-1 bg-[#111] border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors">
            <div className="text-neutral-500 uppercase tracking-widest text-xs">World Cup Goals</div>
            <div>
              <div className="text-5xl font-cinzel font-bold text-white mb-1">{argentina_records.fifa_world_cup_records.most_world_cup_goals}</div>
              <p className="text-sm text-neutral-400">Argentina Record</p>
            </div>
          </motion.div>

        </div>
      </section>

      <FooterSection />
    </div>
  );
}
