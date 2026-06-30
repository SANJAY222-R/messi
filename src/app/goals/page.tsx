'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';
import CountUp from '@/components/CountUp';
import { useRef } from 'react';

export default function GoalsPage() {
  const [data, setData] = useState<any>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects for the scattered gallery
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -800]);

  useEffect(() => {
    fetch('/DATA/13_goals.json')
      .then(res => res.json())
      .then(goals => setData(goals));
  }, []);

  const maxGoalsYear = 91; // Known max for 2012

  return (
    <div ref={containerRef} className="bg-[#050608] min-h-screen text-neutral-300 font-sans selection:bg-[#6EC6FF]/30 overflow-hidden">
      <Header />
      
      {!data ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* 1. HERO SECTION */}
          <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 max-w-7xl mx-auto overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
              <Image src="/images/Goals/goal-wallpaper.jpeg" alt="Hero" fill sizes="100vw" className="object-cover opacity-20 mask-image-b mix-blend-luminosity" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/80 to-transparent" />
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="z-10 text-center w-full">
              <p className="text-accent-blue uppercase tracking-[0.4em] text-sm mb-6 font-semibold">The Ultimate Finisher</p>
              <h1 className="font-cinzel text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 uppercase tracking-widest leading-none drop-shadow-2xl">
                GOALS <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6EC6FF] via-white to-[#6EC6FF]">ARCHIVE</span>
              </h1>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
                <div className="glass-panel px-12 py-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
                  <div className="font-cinzel text-7xl font-bold text-white mb-2 flex items-center justify-center">
                    <CountUp end={data.overview.career_goal_summary.official_goals} duration={2500} />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-neutral-400">Official Goals</p>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-6">
                    <div className="text-3xl font-cinzel text-[#6EC6FF]"><CountUp end={data.overview.career_goal_summary.official_matches} duration={2500} /></div>
                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 text-left">Official<br/>Matches</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl flex items-center gap-6">
                    <div className="text-3xl font-cinzel text-[#D4AF37]">{data.overview.career_goal_summary.goals_per_match}</div>
                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 text-left">Goals Per<br/>Match Ratio</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

      {/* 2. LIVE ANIMATED BAR CHART (YEARLY GOALS) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl text-white mb-4">Relentless Consistency</h2>
          <p className="text-neutral-500 uppercase tracking-widest text-sm">Official goals scored per calendar year (2004 - 2024)</p>
        </div>

        <div className="h-[400px] md:h-[500px] flex items-end justify-between gap-1 md:gap-3 px-2 md:px-8 pb-12 overflow-x-auto hide-scrollbar relative">
          {/* Y-Axis Grid Lines */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between pb-12 z-0 opacity-10">
            <div className="border-b border-white w-full h-0 relative"><span className="absolute -top-3 -left-4 text-xs font-mono">100</span></div>
            <div className="border-b border-white w-full h-0 relative"><span className="absolute -top-3 -left-4 text-xs font-mono">75</span></div>
            <div className="border-b border-white w-full h-0 relative"><span className="absolute -top-3 -left-4 text-xs font-mono">50</span></div>
            <div className="border-b border-white w-full h-0 relative"><span className="absolute -top-3 -left-4 text-xs font-mono">25</span></div>
            <div className="border-b border-white w-full h-0"></div>
          </div>

          {data.goals_by_calendar_year.yearly_statistics.map((yearStat: any, i: number) => {
            const heightPercent = (yearStat.goals / maxGoalsYear) * 100;
            const isRecord = yearStat.year === 2012;
            
            return (
              <div key={yearStat.year} className="flex flex-col items-center flex-1 min-w-[20px] group relative z-10 h-full justify-end">
                {/* Floating Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-white text-black text-xs font-bold px-3 py-1 rounded-md transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {yearStat.goals} Goals
                  {isRecord && <span className="block text-[10px] text-neutral-600 font-normal">World Record</span>}
                </div>
                
                {/* Animated Bar */}
                <motion.div 
                  initial={{ height: 0 }} 
                  whileInView={{ height: `${heightPercent}%` }} 
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.5, type: "spring", bounce: 0.2, delay: i * 0.03 }}
                  className={`w-full rounded-t-md relative ${isRecord ? 'bg-gradient-to-t from-[#D4AF37]/50 to-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)]' : 'bg-white/10 group-hover:bg-[#6EC6FF] transition-colors duration-300'}`}
                />
                
                {/* X-Axis Label */}
                <span className="text-[9px] md:text-xs text-neutral-500 mt-4 transform -rotate-45 origin-top-left group-hover:text-white transition-colors">{yearStat.year}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ANIMATED DISTRIBUTION BARS */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Club Distribution */}
          <div>
            <h2 className="font-cinzel text-3xl text-white mb-10">Club Distribution</h2>
            <div className="space-y-8">
              {[
                { name: 'FC Barcelona', goals: data.goals_by_club.barcelona.official_goals, percent: data.goals_by_club.club_goal_distribution.barcelona_percentage, color: 'bg-red-600' },
                { name: 'Inter Miami CF', goals: data.goals_by_club.inter_miami.official_goals, percent: data.goals_by_club.club_goal_distribution.inter_miami_percentage, color: 'bg-[#F3A5DB]' },
                { name: 'Paris Saint-Germain', goals: data.goals_by_club.paris_saint_germain.official_goals, percent: data.goals_by_club.club_goal_distribution.psg_percentage, color: 'bg-blue-800' }
              ].map((club, i) => (
                <div key={club.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white uppercase tracking-widest">{club.name}</span>
                    <span className="font-cinzel text-white font-bold">{club.goals} Goals</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${club.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                      className={`h-full ${club.color} relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competition Distribution */}
          <div>
            <h2 className="font-cinzel text-3xl text-white mb-10">Major Competitions</h2>
            <div className="space-y-8">
              {data.goals_by_competition.top_five_competitions.slice(0, 4).map((comp: any, i: number) => {
                const percent = (comp.goals / data.goals_by_competition.overview.total_official_goals) * 100;
                return (
                  <div key={comp.competition}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white uppercase tracking-widest">{comp.competition}</span>
                      <span className="font-cinzel text-white font-bold">{comp.goals} Goals</span>
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
                        className="h-full bg-[#6EC6FF] relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
                      </motion.div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 4. SCATTERED PARALLAX GALLERY (ICONIC GOALS) */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-[#050608] to-[#0a0a0a]">
        <div className="text-center mb-24 relative z-20">
          <h2 className="font-cinzel text-5xl text-white mb-4">Iconic Strikes</h2>
          <p className="text-neutral-500 uppercase tracking-widest text-sm">Moments etched in eternity</p>
        </div>

        <div className="relative h-[1200px] max-w-7xl mx-auto px-6">
          
          {/* Image 1: Top Left Parallax */}
          <motion.div style={{ y: y1 }} className="absolute left-10 md:left-24 top-0 w-[280px] md:w-[400px] z-10">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] group">
              <Image src="/images/Goals/free-kick.webp" alt="Free Kick" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold bg-black/50 px-3 py-1 rounded backdrop-blur-md">Direct Free Kicks</span>
              </div>
            </div>
          </motion.div>

          {/* Image 2: Middle Right Parallax */}
          <motion.div style={{ y: y2 }} className="absolute right-4 md:right-24 top-[300px] w-[320px] md:w-[500px] z-20">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] aspect-[16/9] group">
              <Image src="/images/Goals/vs-bayern.jpg" alt="Vs Bayern" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-[center_30%] group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-white font-bold bg-black/50 px-3 py-1 rounded backdrop-blur-md">UCL Semi-Final 2015</span>
              </div>
            </div>
          </motion.div>

          {/* Image 3: Bottom Left Parallax */}
          <motion.div style={{ y: y3 }} className="absolute left-4 md:left-12 top-[700px] w-[300px] md:w-[450px] z-30">
            <div className="relative rounded-3xl overflow-hidden border border-[#6EC6FF]/30 shadow-[0_0_50px_rgba(110,198,255,0.1)] aspect-square group">
              <Image src="/images/Goals/bicycle-kick.jpg" alt="Bicycle Kick" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-[#6EC6FF] font-bold bg-black/50 px-3 py-1 rounded backdrop-blur-md">Acrobatic Brilliance</span>
              </div>
            </div>
          </motion.div>

          {/* Image 4: Top Right Parallax (Small) */}
          <motion.div style={{ y: y4 }} className="absolute right-12 top-20 w-[200px] md:w-[300px] z-0 hidden md:block">
            <div className="relative rounded-2xl overflow-hidden border border-white/5 opacity-50 hover:opacity-100 transition-opacity duration-500 aspect-[3/4]">
              <Image src="/images/Goals/solo-goal.webp" alt="Solo Goal" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale" />
            </div>
          </motion.div>

          {/* Central Data Card (Sticky) */}
          <div className="sticky top-1/2 -translate-y-1/2 mx-auto w-[90%] md:w-[400px] bg-[#050608]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 z-40 text-center shadow-[0_0_100px_rgba(0,0,0,0.9)]">
            <h3 className="font-cinzel text-3xl text-[#D4AF37] mb-6">The Art of Scoring</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">From impossible angles, long-range stunners, devastating free-kicks, and slaloming solo runs, his catalog of goals is the most diverse and spectacular in football history.</p>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="uppercase tracking-widest text-xs text-neutral-500">Hat-tricks</span>
                <span className="font-bold font-cinzel text-white">57</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="uppercase tracking-widest text-xs text-neutral-500">Free Kicks</span>
                <span className="font-bold font-cinzel text-white">65</span>
              </div>
              <div className="flex justify-between">
                <span className="uppercase tracking-widest text-xs text-neutral-500">Goal Contributions</span>
                <span className="font-bold font-cinzel text-white">1,269</span>
              </div>
            </div>
          </div>

        </div>
      </section>
      </>
      )}

      <FooterSection />
    </div>
  );
}
