'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';
import CountUp from '@/components/CountUp';

function Ticket3D({ children, className, reverse = false }: { children: React.ReactNode, className?: string, reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], reverse ? [10, -10] : [-10, 10]);

  const glareX = useTransform(smoothX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 50%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized mouse coordinates between -0.5 and 0.5
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative perspective-1000 ${className}`}
    >
      <motion.div 
        style={{ background: glareBackground, transform: "translateZ(50px)" }} 
        className="absolute inset-0 z-50 pointer-events-none rounded-2xl mix-blend-overlay transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}

export default function MatchesPage() {
  const [data, setData] = useState<any>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    fetch('/DATA/14_matches.json')
      .then(res => res.json())
      .then(matchesData => setData(matchesData));
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050608] min-h-screen text-neutral-300 font-sans selection:bg-[#D4AF37]/30 overflow-hidden">
      <Header />
      
      {!data ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* 1. HERO SECTION */}
          <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10 perspective-1000">
            <motion.div 
              initial={{ opacity: 0, y: 30, rotateX: 20 }} 
              animate={{ opacity: 1, y: 0, rotateX: 0 }} 
              transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            >
              <p className="text-gold-gradient uppercase tracking-[0.4em] text-sm mb-6 font-semibold">The 90 Minutes That Mattered</p>
              <h1 className="font-cinzel text-6xl md:text-8xl font-bold text-white mb-8 uppercase tracking-widest leading-none drop-shadow-2xl">
                MATCH <span className="text-outline">ARCHIVE</span>
              </h1>
              <p className="text-neutral-400 font-light max-w-2xl mx-auto text-lg">
                Over a thousand times, he stepped onto the pitch. Presented below is the VIP pass to every major era of his match history.
              </p>
            </motion.div>
          </section>

          {/* 2. VIP MATCH TICKETS WITH 3D HOVER */}
          <section className="py-20 px-4 md:px-12 max-w-6xl mx-auto flex flex-col gap-32 relative z-20">

            {/* TICKET 1: CAREER OVERVIEW */}
            <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
              <Ticket3D className="flex flex-col lg:flex-row w-full rounded-2xl shadow-[0_30px_60px_-15px_rgba(255,255,255,0.05)] border border-white/20 group hover:border-[#D4AF37]/50 transition-colors duration-500">
                {/* Main Pass Body */}
                <div className="w-full lg:w-3/4 relative min-h-[400px] p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-dashed border-white/30 bg-[#0a0a0a] flex flex-col justify-between overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
                   <motion.div style={{ y: yParallax, scale: 1.2 }} className="absolute inset-0 origin-top">
                     <Image src="/images/hero/hero-walking-tunnel.jpg" alt="Career" fill sizes="(max-width: 768px) 100vw, 75vw" className="object-cover object-top opacity-40 mix-blend-luminosity filter contrast-125" />
                   </motion.div>
                   <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                   
                   <div className="relative z-10 flex justify-between items-start w-full transform-style-3d" style={{ transform: "translateZ(40px)" }}>
                     <div>
                       <span className="text-[#D4AF37] font-mono tracking-widest text-xs">PASS NO. 001</span>
                       <h2 className="font-cinzel text-4xl md:text-6xl text-white font-bold mt-2 drop-shadow-lg">CAREER <br/>OVERVIEW</h2>
                     </div>
                     <div className="bg-[#D4AF37] text-black font-bold font-mono px-3 py-1 text-sm rounded shadow-lg">ALL ACCESS</div>
                   </div>

                   <div className="relative z-10 flex gap-12 mt-12 transform-style-3d" style={{ transform: "translateZ(60px)" }}>
                     <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                       <span className="block text-neutral-400 font-mono text-xs uppercase mb-1">Total Matches</span>
                       <span className="text-4xl md:text-6xl font-cinzel font-bold text-white"><CountUp end={data.career_match_statistics.overview.official_matches} duration={2} /></span>
                     </div>
                     <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
                       <span className="block text-neutral-400 font-mono text-xs uppercase mb-1">Total Minutes</span>
                       <span className="text-4xl md:text-6xl font-cinzel font-bold text-white">{data.career_match_statistics.overview.official_minutes.toLocaleString()}</span>
                     </div>
                   </div>
                </div>
                
                {/* Ticket Stub */}
                <div className="w-full lg:w-1/4 relative bg-[#111] p-8 flex flex-col items-center justify-between text-center overflow-hidden rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none">
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
                   <div className="relative z-10 flex flex-col items-center gap-4 transform-style-3d" style={{ transform: "translateZ(30px)" }}>
                     <span className="font-cinzel text-xl text-neutral-300">WIN RATE</span>
                     <span className="text-5xl font-bold text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">{data.career_match_statistics.career_results.overall.win_percentage}%</span>
                     <span className="text-xs font-mono text-neutral-500 uppercase">{data.career_match_statistics.career_results.overall.wins} Wins / {data.career_match_statistics.career_results.overall.losses} Losses</span>
                   </div>
               
               {/* CSS Barcode */}
               <div className="mt-8 flex gap-1 items-end h-16 w-full justify-center opacity-70 transform-style-3d" style={{ transform: "translateZ(20px)" }}>
                  {[2,4,1,3,6,1,2,5,1,2,4,1,3,2].map((w, i) => (
                    <div key={i} className="bg-white h-full" style={{ width: `${w * 2}px` }} />
                  ))}
               </div>
               <span className="mt-2 text-[10px] font-mono tracking-[0.3em] text-neutral-600">LIONEL-MESSI-CAREER</span>
            </div>
          </Ticket3D>
        </motion.div>


        {/* TICKET 2: FC BARCELONA */}
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
          <Ticket3D reverse className="flex flex-col lg:flex-row-reverse w-full rounded-2xl shadow-[0_30px_60px_-15px_rgba(220,38,38,0.1)] border border-white/20 group hover:border-red-600/50 transition-colors duration-500">
            {/* Main Pass Body */}
            <div className="w-full lg:w-3/4 relative min-h-[400px] p-8 md:p-12 border-b lg:border-b-0 lg:border-l border-dashed border-white/30 bg-[#0a0505] flex flex-col justify-between overflow-hidden rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none">
               <motion.div style={{ y: yParallax, scale: 1.2 }} className="absolute inset-0 origin-top">
                 <Image src="/images/Wallpapers/stadium-wallpaper.jpeg" alt="Barcelona" fill sizes="(max-width: 768px) 100vw, 75vw" className="object-cover object-top opacity-50 mix-blend-hard-light filter contrast-150" />
               </motion.div>
               <div className="absolute inset-0 bg-gradient-to-l from-red-900/80 via-blue-900/40 to-black/90" />
               
               <div className="relative z-10 flex justify-between items-start w-full transform-style-3d" style={{ transform: "translateZ(40px)" }}>
                 <div>
                   <span className="text-red-400 font-mono tracking-widest text-xs drop-shadow-md">PASS NO. 010</span>
                   <h2 className="font-cinzel text-4xl md:text-6xl text-white font-bold mt-2 drop-shadow-[0_0_20px_rgba(220,38,38,0.3)]">FC BARCELONA</h2>
                   <p className="font-mono text-sm text-neutral-300 mt-2">2004 - 2021</p>
                 </div>
                 <div className="bg-red-600 text-white font-bold font-mono px-3 py-1 text-sm rounded shadow-lg border border-red-400">CLUB LEGEND</div>
               </div>

               <div className="relative z-10 flex flex-wrap gap-8 md:gap-12 mt-12 transform-style-3d" style={{ transform: "translateZ(60px)" }}>
                 <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-red-900/30">
                   <span className="block text-neutral-400 font-mono text-xs uppercase mb-1">Matches</span>
                   <span className="text-4xl md:text-6xl font-cinzel font-bold text-white">{data.matches_by_club.barcelona.official_matches}</span>
                 </div>
                 <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-red-900/30">
                   <span className="block text-neutral-400 font-mono text-xs uppercase mb-1">La Liga</span>
                   <span className="text-4xl md:text-6xl font-cinzel font-bold text-white">{data.matches_by_club.barcelona.competition_breakdown.la_liga}</span>
                 </div>
                 <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-red-900/30">
                   <span className="block text-neutral-400 font-mono text-xs uppercase mb-1">UCL</span>
                   <span className="text-4xl md:text-6xl font-cinzel font-bold text-white">{data.matches_by_club.barcelona.competition_breakdown.uefa_champions_league}</span>
                 </div>
               </div>
            </div>
            
            {/* Ticket Stub */}
            <div className="w-full lg:w-1/4 relative bg-[#0d0707] p-8 flex flex-col items-center justify-between text-center overflow-hidden rounded-b-2xl lg:rounded-l-2xl lg:rounded-br-none">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 to-transparent" />
               <div className="relative z-10 flex flex-col items-center gap-4 transform-style-3d" style={{ transform: "translateZ(30px)" }}>
                 <span className="font-cinzel text-xl text-neutral-300">TOTAL MINUTES</span>
                 <span className="text-4xl md:text-5xl font-bold text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">{data.matches_by_club.barcelona.official_minutes.toLocaleString()}</span>
                 <span className="text-xs font-mono text-neutral-500 uppercase">Played for Barcelona</span>
               </div>
               
               {/* CSS Barcode */}
               <div className="mt-8 flex gap-1 items-end h-16 w-full justify-center opacity-70 transform-style-3d" style={{ transform: "translateZ(20px)" }}>
                  {[1,5,2,3,1,4,2,3,1,4,2,1,5,1].map((w, i) => (
                    <div key={i} className="bg-red-200 h-full" style={{ width: `${w * 2}px` }} />
                  ))}
               </div>
               <span className="mt-2 text-[10px] font-mono tracking-[0.3em] text-red-800">BARCA-LEGEND-10</span>
            </div>
          </Ticket3D>
        </motion.div>


        {/* TICKET 3: ARGENTINA / WORLD Cup */}
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}>
          <Ticket3D className="flex flex-col lg:flex-row w-full rounded-2xl shadow-[0_30px_60px_-15px_rgba(110,198,255,0.1)] border border-white/20 group hover:border-[#6EC6FF]/50 transition-colors duration-500">
            {/* Main Pass Body */}
            <div className="w-full lg:w-3/4 relative min-h-[400px] p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-dashed border-white/30 bg-[#05101a] flex flex-col justify-between overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
               <motion.div style={{ y: yParallax, scale: 1.2 }} className="absolute inset-0 origin-top">
                 <Image src="/images/Trophies/world-cup.webp" alt="Argentina" fill sizes="(max-width: 768px) 100vw, 75vw" className="object-cover object-top opacity-30 mix-blend-screen filter contrast-125" />
               </motion.div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#0a1a2e]/70 to-transparent" />
               
               <div className="relative z-10 flex justify-between items-start w-full transform-style-3d" style={{ transform: "translateZ(40px)" }}>
                 <div>
                   <span className="text-[#6EC6FF] font-mono tracking-widest text-xs drop-shadow-md">PASS NO. 191</span>
                   <h2 className="font-cinzel text-4xl md:text-6xl text-white font-bold mt-2 drop-shadow-[0_0_20px_rgba(110,198,255,0.3)]">NATIONAL <br/>DUTY</h2>
                   <p className="font-mono text-sm text-[#6EC6FF] mt-2">Argentina National Team</p>
                 </div>
                 <div className="bg-[#6EC6FF] text-black font-bold font-mono px-3 py-1 text-sm rounded shadow-lg">CAPTAIN</div>
               </div>

               <div className="relative z-10 flex flex-wrap gap-8 md:gap-12 mt-12 transform-style-3d" style={{ transform: "translateZ(60px)" }}>
                 <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-[#6EC6FF]/20">
                   <span className="block text-neutral-400 font-mono text-xs uppercase mb-1">Total Caps</span>
                   <span className="text-4xl md:text-6xl font-cinzel font-bold text-white">{data.career_match_statistics.overview.international_matches}</span>
                 </div>
                 <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-[#6EC6FF]/20">
                   <span className="block text-neutral-400 font-mono text-xs uppercase mb-1">World Cup</span>
                   <span className="text-4xl md:text-6xl font-cinzel font-bold text-white">{data.matches_by_competition.international_competitions.fifa_world_cup.matches}</span>
                 </div>
                 <div className="bg-black/50 backdrop-blur-md p-4 rounded-xl border border-[#6EC6FF]/20">
                   <span className="block text-neutral-400 font-mono text-xs uppercase mb-1">Copa América</span>
                   <span className="text-4xl md:text-6xl font-cinzel font-bold text-white">{data.matches_by_competition.international_competitions.copa_america.matches}</span>
                 </div>
               </div>
            </div>
            
            {/* Ticket Stub */}
            <div className="w-full lg:w-1/4 relative bg-[#07131d] p-8 flex flex-col items-center justify-between text-center overflow-hidden rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#6EC6FF] to-transparent" />
               <div className="relative z-10 flex flex-col items-center gap-4 transform-style-3d" style={{ transform: "translateZ(30px)" }}>
                 <span className="font-cinzel text-xl text-neutral-300">WORLD RECORD</span>
                 <span className="text-4xl md:text-5xl font-bold text-[#6EC6FF] drop-shadow-[0_0_15px_rgba(110,198,255,0.5)]">{data.matches_by_competition.international_competitions.fifa_world_cup.matches}</span>
                 <span className="text-xs font-mono text-[#6EC6FF] uppercase">Most FIFA World Cup<br/>Matches in History</span>
               </div>
               
               {/* CSS Barcode */}
               <div className="mt-8 flex gap-1 items-end h-16 w-full justify-center opacity-70 transform-style-3d" style={{ transform: "translateZ(20px)" }}>
                  {[3,2,4,1,2,1,6,2,1,3,2,4,1,2].map((w, i) => (
                    <div key={i} className="bg-blue-100 h-full" style={{ width: `${w * 2}px` }} />
                  ))}
               </div>
               <span className="mt-2 text-[10px] font-mono tracking-[0.3em] text-[#6EC6FF]/50">AFA-CAPTAIN-10</span>
            </div>
          </Ticket3D>
        </motion.div>
        
      </section>

      <FooterSection />
    </>
    )}
    </div>
  );
}
