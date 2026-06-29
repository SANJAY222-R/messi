'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function InterMiamiPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 200]);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/DATA/07_inter_miami.json')
      .then(res => res.json())
      .then(miamiData => setData(miamiData));
  }, []);

  if (!data) return <div ref={containerRef} className="min-h-[200vh] bg-[#0a0a0a]" />;

  const images = {
    hero: '/images/InterMiami/wallpaper.jpg',
    presentation: '/images/InterMiami/presentation.jpg',
    beckham: '/images/InterMiami/david-beckham.jpg',
    portrait: '/images/InterMiami/portrait.jpeg',
    jersey: '/images/InterMiami/pink-jersey.jpeg',
    debut: '/images/InterMiami/debut.webp',
    firstGoal: '/images/InterMiami/first-goal.webp',
    freeKick: '/images/InterMiami/free-kick.jpg',
    training: '/images/InterMiami/training.jpg',
    fans: '/images/InterMiami/fans.jpeg',
    mlsCeleb: '/images/InterMiami/mls-celebration.jpg',
    celeb: '/images/InterMiami/celebration.webp',
    leaguesCup: '/images/InterMiami/leagues-cup.jpg',
    trophy: '/images/InterMiami/trophy.webp',
    captain: '/images/InterMiami/captain.jpg'
  };

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] min-h-[400vh] text-[#f8fafc] font-sans selection:bg-[#F36C95] selection:text-[#0a0a0a]">
      <Header />
      
      {/* 1. NEON VICE CITY HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center border-b-2 border-[#F36C95]/50 shadow-[0_0_50px_rgba(243,108,149,0.3)]">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
          <Image 
            src={images.hero} 
            alt="Inter Miami Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-70 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-[#F36C95]/10 mix-blend-overlay" />
        </motion.div>

        <div className="relative z-10 w-full px-6 md:px-12 mt-20 flex flex-col md:flex-row justify-between items-end pb-20 h-full max-w-[1600px] mx-auto">
          <div className="flex flex-col">
             <h3 className="text-[#00f0ff] uppercase tracking-[0.5em] text-sm md:text-md font-bold mb-4 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
               {data.club?.city}
             </h3>
             <h1 className="font-black text-6xl md:text-[8rem] lg:text-[10rem] uppercase tracking-tighter text-[#F36C95] leading-[0.85] drop-shadow-[0_0_30px_rgba(243,108,149,0.5)]">
               VICE <span className="text-white">CITY</span>
             </h1>
          </div>
          
          <div className="mt-12 md:mt-0 flex flex-col text-right">
            <span className="text-[#00f0ff] font-mono tracking-widest text-xs uppercase mb-2">The American Dream</span>
            <span className="text-2xl font-bold text-white tracking-widest">{data.career?.start_date?.split('-')[0]} — PRESENT</span>
          </div>
        </div>
      </section>

      {/* 2. THE NEW WORLD (Arrival & Beckham) */}
      <section className="relative w-full py-32 px-6 md:px-12 z-20">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="w-full lg:w-1/3 flex flex-col gap-8 sticky top-32">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              The <span className="text-[#F36C95]">Arrival</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#F36C95] to-[#00f0ff] mb-4" />
            <p className="text-[#cbd5e1] text-lg leading-relaxed">
              {data.legacy?.description}
            </p>
            
            <div className="border border-[#F36C95]/30 p-8 rounded-2xl mt-8 bg-[#F36C95]/5 backdrop-blur-md shadow-[0_0_30px_rgba(243,108,149,0.1)]">
              <span className="text-[#00f0ff] text-xs uppercase tracking-widest block mb-4">Official Presentation</span>
              <p className="text-sm text-[#e2e8f0] mb-2"><strong className="text-white">Date:</strong> {data.debut?.official_debut?.date}</p>
              <p className="text-sm text-[#e2e8f0] mb-4"><strong className="text-white">Venue:</strong> {data.debut?.official_debut?.venue}</p>
              <p className="text-sm text-[#F36C95] italic">"{data.shirt_history?.[0]?.reason}"</p>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
               <Image src={images.presentation} alt="Messi Presentation" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[#F36C95] uppercase tracking-widest text-xs font-bold">Unveiling</span>
               </div>
            </div>
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#00f0ff]/30 md:mt-16 group">
               <Image src={images.beckham} alt="Messi and Beckham" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[#00f0ff] uppercase tracking-widest text-xs font-bold">The Visionaries</span>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THE DEBUT & FREE KICK MAGIC */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-[#101010] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
              A Scripted <span className="text-[#00f0ff]">Beginning</span>
            </h2>
            <p className="text-[#cbd5e1] max-w-2xl mx-auto">
              {data.debut?.first_goal?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#F36C95]/20">
               <Image src={images.freeKick} alt="Free Kick Debut" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover object-center" />
               <div className="absolute bottom-6 right-6 bg-black/80 px-4 py-2 text-xs uppercase tracking-widest text-[#F36C95] border border-[#F36C95]/50">90+4' Stoppage Time</div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                 <Image src={images.firstGoal} alt="First Goal Celebration" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
              </div>
              <div className="relative aspect-[16/9] md:aspect-auto md:h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-[#00f0ff]/20">
                 <Image src={images.debut} alt="Debut Moment" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE MESSI EFFECT & REUNION */}
      <section className="relative w-full py-32 px-6 md:px-12 z-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(243,108,149,0.2)] border border-[#F36C95]/30">
                 <Image src={images.jersey} alt="Pink Jersey" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
              </div>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                 <Image src={images.fans} alt="Inter Miami Fans" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-center grayscale" />
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-16">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.2)] border border-[#00f0ff]/30">
                 <Image src={images.portrait} alt="Portrait" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
              </div>
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                 <Image src={images.training} alt="Training" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-8">
               The <span className="text-[#F36C95]">Reunion</span>
             </h2>
             <p className="text-[#cbd5e1] mb-8 text-lg">Reunited with his greatest teammates from Barcelona, he immediately elevated the standards of American football.</p>
             
             <div className="bg-[#101010] border border-white/10 p-8 rounded-2xl">
               <h3 className="text-[#00f0ff] text-xs uppercase tracking-widest mb-4">The Architects (Important Teammates)</h3>
               <div className="flex flex-wrap gap-3">
                 {data.important_teammates?.map((tm: string, i: number) => (
                   <span key={i} className="px-4 py-2 bg-black border border-[#F36C95]/20 rounded-full text-xs uppercase tracking-widest text-white hover:border-[#F36C95] transition-colors">
                     {tm}
                   </span>
                 ))}
               </div>
             </div>

             <div className="mt-8 space-y-4">
                {data.playing_roles?.slice(1, 3).map((role: any, i: number) => (
                  <div key={i} className="border-l-2 border-[#00f0ff] pl-4">
                    <span className="text-white font-bold block uppercase tracking-widest text-sm mb-1">{role.role}</span>
                    <span className="text-[#9ca3af] text-xs leading-relaxed block">{role.description}</span>
                  </div>
                ))}
             </div>
          </div>
          
        </div>
      </section>

      {/* 5. THE FIRST SILVERWARE (Leagues Cup) */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-gradient-to-t from-black to-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="flex items-center gap-8 mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white whitespace-nowrap">
              First <span className="text-[#F36C95]">Silverware</span>
            </h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#F36C95]/50 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-7 relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(243,108,149,0.15)] border border-[#F36C95]/30">
               <Image src={images.leaguesCup} alt="Leagues Cup Win" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover object-center" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                 <div>
                   <h3 className="text-white font-black text-2xl uppercase tracking-widest">2023 Leagues Cup</h3>
                   <span className="text-[#00f0ff] text-xs uppercase tracking-widest mt-1 block">Best Player & Top Scorer</span>
                 </div>
               </div>
            </div>
            <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto md:h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
               <Image src={images.trophy} alt="Holding Trophy" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
               <Image src={images.mlsCeleb} alt="MLS Celeb" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-center" />
            </div>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.15)] border border-[#00f0ff]/30">
               <Image src={images.captain} alt="Captain Messi" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
               <div className="absolute bottom-6 left-6 bg-black/80 px-4 py-2 text-xs uppercase tracking-widest text-[#00f0ff]">The Captain</div>
            </div>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
               <Image src={images.celeb} alt="Celebration" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-center" />
            </div>
          </div>

          {/* Record Books Block */}
          <div className="bg-[#101010] border-t-4 border-[#F36C95] rounded-b-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
            <div className="flex gap-12">
               <div>
                 <span className="block text-5xl font-black text-white mb-2">{data.seasons?.reduce((acc: number, s: any) => acc + (s.statistics?.goals || 0), 0)}</span>
                 <span className="text-xs uppercase tracking-widest text-[#F36C95]">Total Goals</span>
               </div>
               <div>
                 <span className="block text-5xl font-black text-white mb-2">{data.seasons?.reduce((acc: number, s: any) => acc + (s.statistics?.assists || 0), 0)}</span>
                 <span className="text-xs uppercase tracking-widest text-[#F36C95]">Total Assists</span>
               </div>
            </div>
            <div className="text-right border-l border-white/10 pl-8">
              <h3 className="text-[#00f0ff] text-xs uppercase tracking-widest mb-4">Masterminds</h3>
              {data.managers?.map((mgr: any, i: number) => (
                <p key={i} className="text-white text-sm mb-1"><strong className="text-[#cbd5e1]">{mgr.period}:</strong> {mgr.name}</p>
              ))}
            </div>
          </div>

        </div>
      </section>

      <FooterSection />
    </div>
  );
}
