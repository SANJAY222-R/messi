'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function PSGPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 200]);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/DATA/06_psg.json')
      .then(res => res.json())
      .then(psgData => setData(psgData));
  }, []);

  if (!data) return <div ref={containerRef} className="min-h-[200vh] bg-[#02050f]" />;

  const images = {
    hero: '/images/Psg/wallpaper.jpg',
    presentation: '/images/Psg/presentation.jpg',
    portrait: '/images/Psg/portrait.jpeg',
    debut: '/images/Psg/debut.jpg',
    mnm: '/images/Psg/neymar-mbappe.jpeg',
    training: '/images/Psg/training.jpeg',
    freeKick: '/images/Psg/free-kick.jpg',
    ucl: '/images/Psg/champions-league.jpeg',
    goalCeleb: '/images/Psg/goal-celebration.jpg',
    celeb: '/images/Psg/celebration.webp',
    trophy: '/images/Psg/ligue1-trophy.jpeg',
    leaving: '/images/Psg/leaving.jpg',
  };

  return (
    <div ref={containerRef} className="relative bg-[#02050f] min-h-[400vh] text-[#e5e7eb] font-sans selection:bg-[#DA291C] selection:text-white">
      <Header />
      
      {/* 1. HIGH-FASHION PARISIAN HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center border-b border-[#004170]/30">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
          <Image 
            src={images.hero} 
            alt="PSG Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#02050f]/80 via-transparent to-[#02050f]" />
        </motion.div>

        <div className="relative z-10 w-full px-6 md:px-12 mt-20 flex flex-col md:flex-row justify-between items-end pb-20 h-full max-w-[1600px] mx-auto">
          <div className="flex flex-col">
             <h3 className="text-[#DA291C] uppercase tracking-[0.4em] text-sm font-bold mb-4">
               {data.club?.city}, {data.club?.country}
             </h3>
             <h1 className="font-sans text-5xl md:text-[7rem] lg:text-[9rem] font-black uppercase tracking-tighter text-white leading-[0.85]">
               LE MAGICIEN <br/> DE <span className="text-transparent" style={{ WebkitTextStroke: '2px #004170' }}>PARIS</span>
             </h1>
          </div>
          
          <div className="mt-12 md:mt-0 flex flex-col text-right">
            <span className="text-[#9ca3af] font-mono tracking-widest text-xs uppercase mb-2">The Parisian Era</span>
            <span className="text-2xl font-bold text-white tracking-widest">{data.career?.start_date?.split('-')[0]} — {data.career?.end_date?.split('-')[0]}</span>
          </div>
        </div>
      </section>

      {/* 2. THE ARRIVAL (Editorial Layout) */}
      <section className="relative w-full py-32 px-6 md:px-12 z-20">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="w-full lg:w-1/3 flex flex-col gap-8 sticky top-32">
            <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              The <span className="text-[#DA291C]">Arrival</span>
            </h2>
            <p className="text-[#9ca3af] text-lg leading-relaxed font-light">
              {data.legacy?.description}
            </p>
            
            <div className="border border-[#004170]/30 p-8 rounded-none mt-8 bg-black/40">
              <span className="text-[#DA291C] text-xs uppercase tracking-widest block mb-4">The No. 30 Shirt</span>
              <p className="text-sm text-[#e5e7eb] italic leading-relaxed">"{data.shirt_history?.[0]?.reason}"</p>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-2xl border border-white/5">
               <Image src={images.presentation} alt="Messi Presentation" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-[#004170]/30 md:mt-16 group">
               <Image src={images.portrait} alt="Messi Portrait" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-[#004170]/20 mix-blend-multiply" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. MNM & TACTICAL EVOLUTION */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-[#050b1f] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden shadow-2xl border border-[#DA291C]/30">
               <Image src={images.mnm} alt="MNM Trio" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" />
               <div className="absolute bottom-6 left-6 bg-[#02050f]/90 backdrop-blur px-4 py-2 text-xs uppercase tracking-widest text-[#e5e7eb]">The MNM Trio</div>
            </div>
            <div className="relative aspect-[16/9] w-full overflow-hidden shadow-2xl border border-white/5">
               <Image src={images.training} alt="Training" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top grayscale" />
            </div>
          </div>

          <div className="flex flex-col gap-12 pl-0 lg:pl-12">
            <div>
              <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
                The Playmaker <br/><span className="text-[#004170]">Evolved</span>
              </h2>
              <p className="text-[#9ca3af] mb-8">Surrounded by Mbappé and Neymar, Messi transitioned into the ultimate creator in Ligue 1.</p>
              
              <div className="space-y-6">
                {data.playing_roles?.map((role: any, i: number) => (
                  <div key={i} className="border-l-2 border-[#DA291C] pl-6 py-2">
                    <span className="text-white font-bold block uppercase tracking-widest mb-1">{role.role}</span>
                    <span className="text-[#9ca3af] text-sm">{role.description}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
               <span className="text-xs uppercase tracking-widest text-white mb-2 w-full">Key Teammates:</span>
               {data.important_teammates?.slice(0, 6).map((tm: string, i: number) => (
                 <span key={i} className="px-3 py-1 border border-white/10 text-xs text-[#9ca3af]">{tm}</span>
               ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. ICONIC MOMENTS (Editorial Grid) */}
      <section className="relative w-full py-32 px-6 md:px-12 z-20">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-16 text-center">
            Moments of <span className="text-[#004170]">Brilliance</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-8 relative aspect-[16/9] md:aspect-auto md:h-full w-full overflow-hidden border border-white/5">
               <Image src={images.debut} alt="PSG Debut" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover object-top" />
               <div className="absolute bottom-6 left-6 bg-[#02050f]/90 px-4 py-2 text-xs uppercase tracking-widest text-[#DA291C]">The Debut: {data.debut?.official_debut?.date}</div>
            </div>

            <div className="md:col-span-4 relative aspect-[3/4] w-full overflow-hidden border border-white/5 group">
               <Image src={images.goalCeleb} alt="Goal Celeb" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>

            <div className="md:col-span-4 relative aspect-[4/5] w-full overflow-hidden border border-[#004170]/30 group">
               <Image src={images.freeKick} alt="Free Kick" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                 <span className="text-white text-sm uppercase tracking-widest block">Dead Ball Maestro</span>
               </div>
            </div>

            <div className="md:col-span-4 relative aspect-[4/5] w-full overflow-hidden border border-white/5">
               <Image src={images.celeb} alt="Celebration" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
            </div>

            <div className="md:col-span-4 relative aspect-[4/5] w-full overflow-hidden border border-[#DA291C]/30 group">
               <Image src={images.ucl} alt="UCL Magic" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                 <span className="text-[#DA291C] text-sm uppercase tracking-widest block">First Goal vs Man City</span>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. THE TROPHIES & FAREWELL */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-black border-t border-[#004170]/20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
                The <span className="text-white">Record Books</span>
              </h2>
              <div className="grid grid-cols-2 gap-8">
                 <div>
                   <span className="block text-6xl font-sans font-black text-white mb-1">{data.seasons?.reduce((acc: number, s: any) => acc + (s.statistics?.goals || 0), 0)}</span>
                   <span className="text-xs uppercase tracking-widest text-[#004170]">Total Goals</span>
                 </div>
                 <div>
                   <span className="block text-6xl font-sans font-black text-white mb-1">{data.seasons?.reduce((acc: number, s: any) => acc + (s.statistics?.assists || 0), 0)}</span>
                   <span className="text-xs uppercase tracking-widest text-[#004170]">Total Assists</span>
                 </div>
                 <div className="col-span-2">
                   <span className="block text-3xl font-sans font-bold text-white mb-1">Back-to-Back</span>
                   <span className="text-xs uppercase tracking-widest text-[#DA291C]">Ligue 1 Titles</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#02050f] border border-[#004170]/30 p-8">
              <h3 className="text-white text-xs uppercase tracking-widest mb-4">Managers</h3>
              <div className="space-y-4">
                {data.managers?.map((mgr: any, i: number) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-white font-bold">{mgr.name}</span>
                    <span className="text-xs text-[#9ca3af]">{mgr.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-[#D4AF37]/20">
               <Image src={images.trophy} alt="Ligue 1 Trophy" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-white/10 mt-12 group">
               <Image src={images.leaving} alt="Leaving PSG" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute bottom-6 left-6 bg-black/80 px-4 py-2 text-[10px] uppercase tracking-widest text-white border border-white/20">Au Revoir</div>
            </div>
          </div>

        </div>
      </section>

      <FooterSection />
    </div>
  );
}
