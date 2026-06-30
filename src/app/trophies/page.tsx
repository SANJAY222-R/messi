'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';
import CountUp from '@/components/CountUp';

export default function TrophiesPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/DATA/10_trophies.json')
      .then(res => res.json())
      .then(stats => setData(stats))
      .catch(err => console.error("Failed to load trophies", err));
  }, []);

  if (!data) return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
    </div>
  );

  const {
    overview,
    argentina_trophies,
    barcelona_trophies,
    paris_saint_germain_trophies,
    inter_miami_trophies,
    individual_awards,
    finals_and_medals
  } = data;

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-neutral-300 font-sans selection:bg-[#D4AF37]/30">
      <Header />

      {/* 1. GRAND ENTRANCE (HERO) */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="/images/Trophies/trophy-collection.jpeg" 
            alt="Trophy Collection" 
            fill 
            sizes="100vw"
            className="object-cover object-top mask-image-b mix-blend-luminosity" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-6xl text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p variants={fadeIn} className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm mb-4">The Most Decorated Player in History</motion.p>
            <motion.h1 variants={fadeIn} className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-12 uppercase tracking-widest drop-shadow-2xl">
              Trophy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37]">Room</span>
            </motion.h1>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { label: 'Total Official Trophies', value: overview.total_official_trophies },
                { label: 'Club Trophies', value: overview.club_trophies },
                { label: 'International Trophies', value: overview.international_trophies }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeIn} className="bg-white/5 backdrop-blur-md border border-[#D4AF37]/20 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
                  <div className="font-cinzel text-5xl md:text-6xl font-bold text-[#D4AF37] mb-2">
                    <CountUp end={stat.value} duration={2000} />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-neutral-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERNATIONAL GLORY */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#040f23]">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
             <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-4">International Glory</h2>
             <p className="text-[#6EC6FF] uppercase tracking-widest text-sm">Argentina National Team</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* World Cup */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="lg:col-span-2 relative rounded-3xl overflow-hidden group h-[400px] border border-[#D4AF37]/30 shadow-2xl">
               <Image src="/images/Trophies/world-cup.webp" alt="World Cup" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
               <div className="absolute bottom-8 left-8 right-8">
                 <h3 className="font-cinzel text-4xl text-[#D4AF37] mb-2">FIFA World Cup</h3>
                 <p className="text-neutral-300 text-sm md:text-base max-w-xl mb-4">"It's anyone's childhood dream. I was lucky to have achieved everything in this career... and this one that was missing is here."</p>
                 <div className="flex gap-4">
                   <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] px-3 py-1 rounded text-xs font-bold">2022</span>
                   <span className="bg-white/10 border border-white/20 text-white px-3 py-1 rounded text-xs">Golden Ball Winner</span>
                 </div>
               </div>
            </motion.div>

            <div className="grid grid-rows-2 gap-8 lg:col-span-1">
               {/* Copa America */}
               <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative rounded-3xl overflow-hidden group border border-[#6EC6FF]/30 shadow-2xl">
                 <Image src="/images/Trophies/copa-america.jpg" alt="Copa America" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                 <div className="absolute bottom-6 left-6">
                   <h3 className="font-cinzel text-2xl text-white mb-2">Copa América</h3>
                   <div className="flex gap-2">
                     <span className="bg-[#6EC6FF]/20 text-[#6EC6FF] border border-[#6EC6FF]/50 px-2 py-0.5 rounded text-xs font-bold">2021</span>
                     <span className="bg-[#6EC6FF]/20 text-[#6EC6FF] border border-[#6EC6FF]/50 px-2 py-0.5 rounded text-xs font-bold">2024</span>
                   </div>
                 </div>
               </motion.div>

               {/* Finalissima */}
               <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="relative rounded-3xl overflow-hidden group border border-white/20 shadow-2xl">
                 <Image src="/images/Trophies/finalissima.jpg" alt="Finalissima" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top transition-transform duration-1000 group-hover:scale-105" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                 <div className="absolute bottom-6 left-6">
                   <h3 className="font-cinzel text-2xl text-white mb-2">Finalissima</h3>
                   <span className="bg-white/20 text-white border border-white/50 px-2 py-0.5 rounded text-xs font-bold">2022</span>
                 </div>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CLUB DYNASTY */}
      <section className="py-24 bg-[#050505] relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
             <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-4">Club Dynasty</h2>
             <p className="text-neutral-400 uppercase tracking-widest text-sm">39 Titles Across 3 Clubs</p>
          </motion.div>

          <div className="space-y-16">
            
            {/* FC Barcelona */}
            <div>
              <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-8">
                <h3 className="font-cinzel text-3xl text-white">FC Barcelona</h3>
                <span className="text-2xl font-mono text-[#D4AF37]">{barcelona_trophies.total_trophies} Titles</span>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { name: 'La Liga', count: barcelona_trophies.competition_breakdown.la_liga.titles, img: '/images/Trophies/laliga.jpg' },
                  { name: 'Champions League', count: barcelona_trophies.competition_breakdown.uefa_champions_league.titles, img: '/images/Trophies/champions-league.jpg' },
                  { name: 'Copa del Rey', count: barcelona_trophies.competition_breakdown.copa_del_rey.titles, img: '/images/Trophies/copa-del-rey.jpeg' },
                  { name: 'Club World Cup', count: barcelona_trophies.competition_breakdown.fifa_club_world_cup.titles, img: '/images/Trophies/club-world-cup.jpeg' },
                  { name: 'UEFA Super Cup', count: barcelona_trophies.competition_breakdown.uefa_super_cup.titles, img: '/images/Trophies/uefa-super-cup.jpg' }
                ].map((trophy, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative h-48 rounded-xl overflow-hidden group border border-white/5">
                     <Image src={trophy.img} alt={trophy.name} fill sizes="(max-width: 1024px) 50vw, 20vw" className="object-cover object-top opacity-60 group-hover:scale-110 transition-transform duration-700 group-hover:opacity-100" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                     <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                       <span className="text-sm font-bold text-white leading-tight w-2/3">{trophy.name}</span>
                       <span className="text-2xl font-cinzel text-[#D4AF37]">{trophy.count}</span>
                     </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Paris Saint-Germain */}
              <div>
                <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-8">
                  <h3 className="font-cinzel text-3xl text-white">Paris Saint-Germain</h3>
                  <span className="text-2xl font-mono text-[#D4AF37]">{paris_saint_germain_trophies.total_trophies} Titles</span>
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative h-64 rounded-2xl overflow-hidden group border border-blue-900/30">
                   <Image src="/images/Trophies/ligue1.jpeg" alt="Ligue 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                   <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                     <span className="text-2xl font-cinzel text-white">Ligue 1</span>
                     <span className="text-sm text-[#6EC6FF]">2x Champion (2021-22, 2022-23)</span>
                   </div>
                </motion.div>
              </div>

              {/* Inter Miami */}
              <div>
                <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-8">
                  <h3 className="font-cinzel text-3xl text-white">Inter Miami CF</h3>
                  <span className="text-2xl font-mono text-[#D4AF37]">{inter_miami_trophies.total_trophies} Titles</span>
                </div>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative h-64 rounded-2xl overflow-hidden group border border-pink-900/30">
                   <Image src="/images/Trophies/leagues-cup.jpg" alt="Leagues Cup" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top opacity-70 group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                   <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                     <span className="text-2xl font-cinzel text-white">Leagues Cup & Supporters' Shield</span>
                     <span className="text-sm text-pink-300">Club's First Ever Trophy (2023)</span>
                   </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INDIVIDUAL GREATNESS */}
      <section className="py-24 relative overflow-hidden bg-[#020202]">
        <div className="absolute -left-40 top-20 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
             <h2 className="font-cinzel text-4xl md:text-5xl text-[#D4AF37] mb-4">Individual Greatness</h2>
             <p className="text-neutral-400 uppercase tracking-widest text-sm">{individual_awards.overview.total_major_individual_awards} Major Individual Awards</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Ballon d'Or */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 relative rounded-3xl overflow-hidden group h-96 border border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
               <Image src="/images/Trophies/ballon-dor.jpeg" alt="Ballon d'Or" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
               <div className="absolute top-8 left-8 bottom-8 flex flex-col justify-between">
                 <div>
                   <h3 className="font-cinzel text-4xl text-[#D4AF37] mb-2">Ballon d'Or</h3>
                   <p className="text-sm text-neutral-300 max-w-xs">{individual_awards.ballon_dor.record}</p>
                 </div>
                 <span className="text-8xl font-cinzel font-bold text-white drop-shadow-2xl">{individual_awards.ballon_dor.titles}</span>
               </div>
            </motion.div>

            {/* Golden Shoe */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative rounded-3xl overflow-hidden group h-96 border border-white/10">
               <Image src="/images/Trophies/golden-boot.webp" alt="Golden Shoe" fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover object-[center_15%] opacity-60 group-hover:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
               <div className="absolute bottom-8 left-6">
                 <h3 className="font-cinzel text-2xl text-white mb-1">Golden Shoe</h3>
                 <span className="text-4xl font-cinzel font-bold text-[#D4AF37]">{individual_awards.european_golden_shoe.titles}</span>
               </div>
            </motion.div>

            {/* FIFA Best / Laureus */}
            <div className="grid grid-rows-2 gap-6 h-96">
               <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="relative rounded-3xl overflow-hidden group border border-white/10">
                 <Image src="/images/Trophies/fifa-best.jpeg" alt="FIFA Best" fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover object-[center_20%] opacity-60 group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                   <span className="text-3xl font-cinzel font-bold text-white">{individual_awards.the_best_fifa_mens_player.titles}</span>
                   <span className="text-xs uppercase tracking-widest text-[#D4AF37] mt-1">FIFA Best</span>
                 </div>
               </motion.div>
               <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="relative rounded-3xl overflow-hidden group border border-white/10 bg-[#0a0a0a]">
                 <Image src="/images/Trophies/laureus.jpeg" alt="Laureus" fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover object-top opacity-40 group-hover:scale-110 transition-transform duration-700 mix-blend-screen" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                   <span className="text-3xl font-cinzel font-bold text-white">2</span>
                   <span className="text-xs uppercase tracking-widest text-neutral-300 mt-1">Laureus World Sportsman</span>
                 </div>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FINALS & RECORDS */}
      <section className="py-24 bg-[#080808] border-t border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            <motion.div variants={fadeIn} className="p-8">
              <div className="text-[#D4AF37] text-sm uppercase tracking-widest mb-4">Finals Played</div>
              <div className="font-cinzel text-6xl text-white font-bold">{finals_and_medals.overview.official_finals_played}</div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="p-8 border-x border-white/5">
              <div className="text-green-500 text-sm uppercase tracking-widest mb-4">Finals Won</div>
              <div className="font-cinzel text-6xl text-white font-bold">{finals_and_medals.overview.official_finals_won}</div>
            </motion.div>

            <motion.div variants={fadeIn} className="p-8">
              <div className="text-[#6EC6FF] text-sm uppercase tracking-widest mb-4">Win Percentage</div>
              <div className="font-cinzel text-6xl text-white font-bold">{finals_and_medals.overview.win_percentage}%</div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
