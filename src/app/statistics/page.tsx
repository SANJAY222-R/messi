'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';
import CountUp from '@/components/CountUp';

export default function StatisticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/DATA/09_statistics.json')
      .then(res => res.json())
      .then(stats => setData(stats))
      .catch(err => console.error("Failed to load stats", err));
  }, []);

  if (!data) return (
    <div className="bg-[#050608] min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin"></div>
    </div>
  );

  const {
    career_totals,
    goal_statistics,
    club_statistics,
    international_statistics,
    advanced_statistics
  } = data;

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#050608] min-h-screen text-neutral-300 font-sans selection:bg-accent-blue/30">
      <Header />
      
      {/* 1. HERO / CAREER OVERVIEW */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Ambient Portrait Background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <Image 
            src="/images/Portraits/portrait-4k.jpg" 
            alt="Messi Portrait" 
            fill 
            sizes="100vw"
            className="object-cover object-top mask-image-b"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050608] via-transparent to-[#050608]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h1 variants={fadeIn} className="font-cinzel text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-wider drop-shadow-2xl">
              CAREER <span className="text-accent-blue">TOTALS</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-neutral-400 text-lg md:text-xl uppercase tracking-[0.3em]">
              The Official Record
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { label: 'Matches', value: career_totals.official.matches, color: 'from-[#1A2942] to-[#0A1220]' },
              { label: 'Goals', value: career_totals.official.goals, color: 'from-[#3A2812] to-[#1A1205]' },
              { label: 'Assists', value: career_totals.official.assists, color: 'from-[#122A28] to-[#051514]' },
              { label: 'Contributions', value: career_totals.official.goal_contributions, color: 'from-[#2A1232] to-[#12051A]' }
            ].map((stat, i) => (
              <motion.div 
                key={i} variants={fadeIn}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${stat.color} p-6 md:p-8 rounded-2xl border border-white/5 backdrop-blur-md relative overflow-hidden group shadow-2xl`}
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-xs md:text-sm text-neutral-400 uppercase tracking-widest mb-2 font-medium">{stat.label}</h3>
                <div className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-blue transition-all duration-300">
                  <CountUp end={stat.value} duration={2000} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. GOAL ANALYTICS */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen">
          <Image src="/images/Portraits/black-background.jpeg" alt="Abstract" fill sizes="100vw" className="object-cover" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn} className="mb-16"
          >
            <h2 className="font-cinzel text-4xl text-white mb-2">Goal Anatomy</h2>
            <div className="h-1 w-24 bg-accent-blue rounded" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* By Body Part */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
              <h3 className="text-xl text-white font-cinzel border-b border-white/10 pb-4">By Body Part</h3>
              {[
                { label: 'Left Foot', data: goal_statistics.by_body_part.left_foot },
                { label: 'Right Foot', data: goal_statistics.by_body_part.right_foot },
                { label: 'Head', data: goal_statistics.by_body_part.head }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-300">{item.label}</span>
                    <span className="text-white font-mono">{item.data.goals} ({item.data.percentage}%)</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.data.percentage}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="bg-accent-blue h-full rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* By Type */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
              <h3 className="text-xl text-white font-cinzel border-b border-white/10 pb-4">By Goal Type</h3>
              {[
                { label: 'Open Play', val: goal_statistics.by_goal_type.open_play, max: 800 },
                { label: 'Penalties', val: goal_statistics.by_goal_type.penalties, max: 200 },
                { label: 'Direct Free Kicks', val: goal_statistics.by_goal_type.direct_free_kicks, max: 100 }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-neutral-300">{item.label}</span>
                    <span className="text-white font-mono">{item.val}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.val / item.max) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="bg-[#D4AF37] h-full rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="relative rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col justify-center overflow-hidden">
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent-blue/10 blur-[100px] rounded-full" />
               <h3 className="text-xl text-white font-cinzel mb-8">Pitch Location</h3>
               <div className="flex items-center gap-8">
                  <div className="relative w-32 h-32">
                    {/* Fake Donut Chart */}
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className="text-accent-blue" strokeDasharray={`${goal_statistics.by_location.inside_penalty_box.percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-neutral-400">Inside Box</p>
                      <p className="text-2xl text-white font-mono">{goal_statistics.by_location.inside_penalty_box.goals}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Outside Box</p>
                      <p className="text-2xl text-white font-mono">{goal_statistics.by_location.outside_penalty_box.goals}</p>
                    </div>
                  </div>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. CLUB LEGACY */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="text-center mb-16">
             <h2 className="font-cinzel text-4xl text-white mb-2">Club Legacy</h2>
             <p className="text-neutral-400">A journey through elite European and American football</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { id: 'barcelona', name: 'FC Barcelona', data: club_statistics.barcelona, img: '/images/Trophies/laliga.jpg', color: 'hover:border-red-900/50 hover:shadow-red-900/20' },
              { id: 'paris_saint_germain', name: 'Paris Saint-Germain', data: club_statistics.paris_saint_germain, img: '/images/Trophies/ligue1.jpeg', color: 'hover:border-blue-900/50 hover:shadow-blue-900/20' },
              { id: 'inter_miami', name: 'Inter Miami CF', data: club_statistics.inter_miami, img: '/images/Trophies/leagues-cup.jpg', color: 'hover:border-pink-900/50 hover:shadow-pink-900/20' }
            ].map((club, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`relative rounded-3xl border border-white/5 bg-[#0A0F17] overflow-hidden group transition-all duration-500 hover:shadow-2xl ${club.color}`}
              >
                <div className="h-48 relative overflow-hidden">
                  <Image src={club.img} alt={club.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-[center_15%] opacity-60 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F17] to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h3 className="font-cinzel text-2xl text-white">{club.name}</h3>
                    <p className="text-sm text-neutral-400">{club.data.period}</p>
                  </div>
                </div>
                
                <div className="p-6 grid grid-cols-2 gap-y-6 gap-x-4">
                   <div>
                     <p className="text-xs text-neutral-500 uppercase">Matches</p>
                     <p className="text-2xl text-white font-mono">{club.data.matches}</p>
                   </div>
                   <div>
                     <p className="text-xs text-neutral-500 uppercase">Goals</p>
                     <p className="text-2xl text-white font-mono">{club.data.goals}</p>
                   </div>
                   <div>
                     <p className="text-xs text-neutral-500 uppercase">Assists</p>
                     <p className="text-2xl text-white font-mono">{club.data.assists}</p>
                   </div>
                   <div>
                     <p className="text-xs text-neutral-500 uppercase">Trophies</p>
                     <p className="text-2xl text-[#D4AF37] font-mono">{club.data.trophies.total}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERNATIONAL GLORY */}
      <section className="py-32 relative overflow-hidden">
         {/* Gold Ambient Background */}
         <div className="absolute inset-0 bg-gradient-to-br from-[#1c1809] to-black z-0" />
         <div className="absolute inset-0 z-0 opacity-20">
           <Image src="/images/Argentina/fans-celebration.jpg" alt="Fans" fill sizes="100vw" className="object-cover mix-blend-overlay" />
         </div>

         <div className="relative z-10 container mx-auto px-6 max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
               <h2 className="font-cinzel text-5xl md:text-6xl text-[#D4AF37] mb-4">Argentina</h2>
               <p className="text-xl text-neutral-300 mb-8 font-light italic">"I would swap all my Ballons d'Or for one World Cup."</p>
               
               <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-[#D4AF37]/20 p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-6">
                   <div>
                     <p className="text-sm text-neutral-400 uppercase tracking-wide">Appearances</p>
                     <p className="text-4xl text-white font-mono mt-1">{international_statistics.overall_argentina.matches}</p>
                   </div>
                   <div>
                     <p className="text-sm text-neutral-400 uppercase tracking-wide">Goals</p>
                     <p className="text-4xl text-white font-mono mt-1">{international_statistics.overall_argentina.goals}</p>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                   <div>
                     <p className="text-sm text-neutral-400 uppercase tracking-wide">Assists</p>
                     <p className="text-3xl text-white font-mono mt-1">{international_statistics.overall_argentina.assists}</p>
                   </div>
                   <div>
                     <p className="text-sm text-[#D4AF37] uppercase tracking-wide">Major Titles</p>
                     <p className="text-3xl text-[#D4AF37] font-mono mt-1">{international_statistics.overall_argentina.major_titles}</p>
                   </div>
                 </div>
               </div>
             </motion.div>

             <div className="relative h-[500px] w-full lg:w-[120%] lg:-ml-[10%] group">
                <motion.div initial={{ opacity: 0, rotate: -5, scale: 0.9 }} whileInView={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} className="absolute z-20 top-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-[#D4AF37]/30 group-hover:z-30 transition-all duration-500 group-hover:scale-105">
                  <Image src="/images/Argentina/world-cup-kiss.webp" alt="World Cup Kiss" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </motion.div>
                
                <motion.div initial={{ opacity: 0, x: 50, y: 50 }} whileInView={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true }} className="absolute z-10 bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group-hover:z-30 transition-all duration-500 group-hover:scale-105">
                  <Image src="/images/Argentina/lifting-copa.jpeg" alt="Copa America" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                </motion.div>
             </div>

           </div>
         </div>
      </section>

      {/* 5. ADVANCED METRICS & AWARDS */}
      <section className="py-24 bg-[#050608] relative">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center mb-16">
             <h2 className="font-cinzel text-4xl text-white">Advanced Metrics</h2>
             <p className="text-neutral-400 mt-2">Beyond the basic numbers</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            
            {/* Playmaking */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0A0F17] rounded-3xl p-8 border border-white/5">
              <h3 className="text-accent-blue uppercase tracking-widest text-sm mb-6 flex items-center"><span className="w-2 h-2 bg-accent-blue rounded-full mr-3"/> Playmaking</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Pass Accuracy</span>
                  <span className="text-white font-mono">{advanced_statistics.passing_statistics.pass_accuracy_percentage}%</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Key Passes</span>
                  <span className="text-white font-mono">{advanced_statistics.passing_statistics.key_passes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Big Chances Created</span>
                  <span className="text-white font-mono">{advanced_statistics.passing_statistics.big_chances_created}</span>
                </div>
              </div>
            </motion.div>

            {/* Dribbling */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="bg-[#0A0F17] rounded-3xl p-8 border border-white/5">
              <h3 className="text-[#6EC6FF] uppercase tracking-widest text-sm mb-6 flex items-center"><span className="w-2 h-2 bg-[#6EC6FF] rounded-full mr-3"/> Dribbling</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Successful Dribbles</span>
                  <span className="text-white font-mono">{advanced_statistics.dribbling_statistics.successful_dribbles}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Success Rate</span>
                  <span className="text-white font-mono">{advanced_statistics.dribbling_statistics.dribble_success_percentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Avg per Game</span>
                  <span className="text-white font-mono">{advanced_statistics.dribbling_statistics.average_dribbles_per_game}</span>
                </div>
              </div>
            </motion.div>

            {/* Efficiency */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="bg-[#0A0F17] rounded-3xl p-8 border border-white/5">
              <h3 className="text-[#D4AF37] uppercase tracking-widest text-sm mb-6 flex items-center"><span className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"/> Efficiency</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Minutes per Goal</span>
                  <span className="text-white font-mono">{advanced_statistics.career_efficiency.minutes_per_goal}'</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Minutes per Assist</span>
                  <span className="text-white font-mono">{advanced_statistics.career_efficiency.minutes_per_assist}'</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Min per Contribution</span>
                  <span className="text-white font-mono">{advanced_statistics.career_efficiency.minutes_per_goal_contribution}'</span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Records Grid */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="bg-gradient-to-br from-[#111620] to-[#050608] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-full opacity-20 pointer-events-none">
              <Image src="/images/Trophies/ballon-dor.jpeg" alt="Ballon d'Or" fill sizes="256px" className="object-cover mix-blend-screen mask-image-l" />
            </div>
            
            <h3 className="font-cinzel text-2xl text-white mb-8 relative z-10">Unmatched Records</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {advanced_statistics.advanced_records.map((record: any, i: number) => (
                <div key={i} className="flex flex-col border-l-2 border-accent-blue/30 pl-4 py-1">
                  <span className="text-neutral-300 text-sm mb-1">{record.record}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl text-white font-mono font-bold">{record.value}</span>
                    {(record.year || record.season) && (
                      <span className="text-xs text-[#D4AF37] uppercase">{record.year || record.season}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      <FooterSection />
    </div>
  );
}
