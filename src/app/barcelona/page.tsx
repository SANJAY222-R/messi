'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function BarcelonaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 200]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/DATA/05_barcelona.json')
      .then(res => res.json())
      .then(fcbData => setData(fcbData));
  }, []);

  if (!data) return <div ref={containerRef} className="min-h-[200vh] bg-[#00143F]" />;

  const bcaImages = {
    hero: '/images/Barcelona/camp-nou-celebration.jpg',
    debut: '/images/Barcelona/debut-camp-nou.jpeg',
    kissingBadge: '/images/Barcelona/kissing-badge.jpg',
    elClasico: '/images/Barcelona/el-clasico-shirt.jpeg',
    realMadrid: '/images/Barcelona/real-madrid-celebration.jpg',
    freeKick: '/images/Barcelona/free-kick-wall.jpeg',
    dribble: '/images/Barcelona/dribbling-defender.jpg',
    xaviIniesta: '/images/Barcelona/xavi-iniesta.jpeg',
    msn: '/images/Barcelona/msn.jpeg',
    ucl2011: '/images/Barcelona/ucl-final-2011.jpg',
    ucl2015: '/images/Barcelona/ucl-trophy-2015.jpeg',
    laliga: '/images/Barcelona/laliga-trophy.jpeg',
    ballonDor: '/images/Barcelona/ballon-dor.jpeg',
    captain: '/images/Barcelona/captain.jpeg',
    farewell: '/images/Barcelona/farewell.jpeg'
  };

  return (
    <div ref={containerRef} className="relative bg-[#000b24] min-h-[400vh] text-[#e2e8f0] font-sans selection:bg-[#D4AF37] selection:text-[#000b24]">
      <Header />
      
      {/* 1. MUSEUM HERO */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center border-b-4 border-[#A50044]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
          <Image 
            src={bcaImages.hero} 
            alt="Camp Nou Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000b24]/80 via-transparent to-[#000b24]" />
        </motion.div>

        <div className="relative z-10 text-center flex flex-col items-center justify-center w-full px-4 mt-20">
          <h3 className="text-[#D4AF37] uppercase tracking-[0.5em] text-sm md:text-md font-bold mb-6">
            Exhibition I: The Golden Era
          </h3>
          <h1 className="font-cinzel text-6xl md:text-[8rem] lg:text-[10rem] font-bold tracking-widest text-[#ffffff] leading-[0.85] drop-shadow-2xl uppercase">
            CAMP NOU
          </h1>
          <h1 className="font-cinzel text-4xl md:text-[5rem] lg:text-[7rem] font-bold tracking-widest text-transparent leading-[0.85] uppercase" style={{ WebkitTextStroke: '1px #D4AF37' }}>
            MASTERPIECE
          </h1>
          
          <div className="mt-12 flex gap-12 text-[#e2e8f0] font-mono tracking-widest text-xs uppercase border-y border-[#D4AF37]/30 py-4 px-12">
            <span>{data.club?.joined?.first_team?.split('-')[0]}</span>
            <span className="text-[#A50044]">///</span>
            <span>{data.club?.left?.split('-')[0]}</span>
          </div>
        </div>
      </section>

      {/* 2. THE EMERGENCE (Properly framed portraits) */}
      <section className="relative w-full py-24 px-6 md:px-12 z-20">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="w-full lg:w-1/3 flex flex-col gap-10">
            <div>
              <h2 className="font-cinzel text-3xl md:text-5xl font-bold uppercase tracking-widest text-white mb-6">
                The <span className="text-[#D4AF37]">Emergence</span>
              </h2>
              <div className="h-1 w-24 bg-[#A50044] mb-8" />
              <p className="text-[#94a3b8] text-lg leading-relaxed font-light">
                {data.legacy?.description}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
              <span className="text-[#D4AF37] text-xs uppercase tracking-widest block mb-4">Official Debut</span>
              <p className="text-white font-bold">{data.debut?.official_debut?.date}</p>
              <p className="text-[#94a3b8] text-sm mb-2">{data.debut?.official_debut?.result}</p>
              <p className="text-[#94a3b8] text-sm mb-4">Manager: {data.debut?.official_debut?.manager}</p>
              <p className="text-white text-sm">First Goal: {data.debut?.first_goal?.date} vs {data.debut?.first_goal?.opponent}</p>
            </div>
          </div>
          
          {/* Right Image Block (Portrait framing) */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
               <Image src={bcaImages.debut} alt="Messi Debut" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
               <div className="absolute bottom-6 left-6 bg-[#000b24]/90 backdrop-blur px-4 py-2 text-xs uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30">The Beginning</div>
            </div>
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 md:mt-16">
               <Image src={bcaImages.kissingBadge} alt="Kissing the Badge" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
               <div className="absolute bottom-6 left-6 bg-[#000b24]/90 backdrop-blur px-4 py-2 text-xs uppercase tracking-widest text-[#A50044] border border-[#A50044]/30">Blaugrana Blood</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. BROTHERS IN ARMS (Landscape framing) */}
      <section className="relative w-full py-24 px-6 md:px-12 bg-[#02102f] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold uppercase tracking-widest text-white mb-6">
              Symphony <span className="text-[#D4AF37]">of Football</span>
            </h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto italic">
              Surrounded by generational talents, he formed partnerships that defined modern football.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-2xl border border-[#A50044]/30 group">
                <Image src={bcaImages.xaviIniesta} alt="Xavi and Iniesta" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-[#A50044]/10 mix-blend-screen" />
              </div>
              <h3 className="font-cinzel text-xl text-white tracking-widest uppercase">The Engine Room</h3>
              <p className="text-[#94a3b8] text-sm">The golden triangle of La Masia: Messi, Xavi, and Iniesta.</p>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 group">
                <Image src={bcaImages.msn} alt="MSN Trio" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-screen" />
              </div>
              <h3 className="font-cinzel text-xl text-white tracking-widest uppercase">The Ultimate Attack</h3>
              <p className="text-[#94a3b8] text-sm">Messi, Suárez, Neymar (MSN) — The most feared attacking trio in history.</p>
            </div>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {data.important_teammates?.map((tm: string, i: number) => (
              <span key={i} className="px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#000b24] text-xs uppercase tracking-widest text-[#94a3b8]">
                {tm}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GALLERY OF MASTERPIECES (Asymmetric Grid) */}
      <section className="relative w-full py-32 px-6 md:px-12 z-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-8 mb-16">
            <h2 className="font-cinzel text-3xl md:text-5xl font-bold uppercase tracking-widest text-white whitespace-nowrap">
              Iconic <span className="text-[#A50044]">Masterpieces</span>
            </h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* El Clasico Shirt - Portrait */}
            <div className="md:col-span-4 relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
               <Image src={bcaImages.elClasico} alt="El Clasico Shirt" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
               <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#000b24] to-transparent p-6 pt-24 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-white font-cinzel text-xl tracking-widest uppercase block">Silence at the Bernabéu</span>
               </div>
            </div>

            {/* Dribbling - Square */}
            <div className="md:col-span-8 relative aspect-[16/9] md:aspect-auto md:h-full w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
               <Image src={bcaImages.dribble} alt="Dribbling" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover object-center" />
               <div className="absolute top-6 right-6 bg-[#000b24]/90 backdrop-blur px-4 py-2 text-xs uppercase tracking-widest text-[#94a3b8]">Unstoppable Force</div>
            </div>

            {/* Real Madrid Celeb - Landscape */}
            <div className="md:col-span-8 relative aspect-[16/9] md:aspect-auto md:h-full w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
               <Image src={bcaImages.realMadrid} alt="Real Madrid Celeb" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover object-top" />
            </div>

            {/* Free Kick - Portrait */}
            <div className="md:col-span-4 relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
               <Image src={bcaImages.freeKick} alt="Free Kick Wall" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
               <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#000b24] to-transparent p-6 pt-24 opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-white font-cinzel text-xl tracking-widest uppercase block">Dead Ball Specialist</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE RECORD BOOKS (Hardware) */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-gradient-to-b from-[#000b24] to-black">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/20">
                <Image src={bcaImages.ballonDor} alt="Ballon d'Or" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
              </div>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <Image src={bcaImages.ucl2011} alt="UCL 2011" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top grayscale" />
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-16">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <Image src={bcaImages.laliga} alt="La Liga" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
              </div>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl border border-[#A50044]/20">
                <Image src={bcaImages.ucl2015} alt="UCL 2015" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-4 md:px-12">
            <h2 className="font-cinzel text-4xl md:text-6xl font-bold uppercase tracking-widest text-[#D4AF37] mb-8">
              The <span className="text-white">Record Books</span>
            </h2>
            <div className="grid grid-cols-2 gap-8">
               <div>
                 <span className="block text-5xl font-cinzel font-bold text-white mb-2">{data.seasons?.reduce((acc: number, s: any) => acc + (s.statistics?.goals || 0), 0)}</span>
                 <span className="text-xs uppercase tracking-widest text-[#94a3b8]">Total Goals</span>
               </div>
               <div>
                 <span className="block text-5xl font-cinzel font-bold text-white mb-2">{data.seasons?.reduce((acc: number, s: any) => acc + (s.statistics?.assists || 0), 0)}</span>
                 <span className="text-xs uppercase tracking-widest text-[#94a3b8]">Total Assists</span>
               </div>
               <div>
                 <span className="block text-3xl font-cinzel font-bold text-white mb-2">35</span>
                 <span className="text-xs uppercase tracking-widest text-[#94a3b8]">Major Trophies</span>
               </div>
               <div>
                 <span className="block text-3xl font-cinzel font-bold text-white mb-2">#1</span>
                 <span className="text-xs uppercase tracking-widest text-[#94a3b8]">{data.legacy?.considered?.[0]}</span>
               </div>
            </div>

            <div className="mt-16 bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
              <h3 className="font-cinzel text-xl text-[#D4AF37] uppercase tracking-widest mb-6">Masterminds</h3>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {data.managers?.slice(0, 6).map((mgr: any, i: number) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-white font-bold">{mgr.name}</span>
                    <span className="text-xs text-[#A50044] tracking-widest">{mgr.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 6. THE CAPTAIN & FAREWELL */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-black z-20 border-t border-[#A50044]/20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-8">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold uppercase tracking-widest text-white mb-4">
              The <span className="text-[#A50044]">Captain</span>
            </h2>
            <div className="bg-[#000b24] border border-[#D4AF37]/30 p-8 rounded-xl">
               <p className="text-[#94a3b8] mb-4"><strong className="text-white">Named Club Captain:</strong> {data.captaincy?.club_captain_since}</p>
               <p className="text-[#94a3b8] mb-4"><strong className="text-white">Succeeded:</strong> {data.captaincy?.previous_captain}</p>
               <p className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2 mt-6">Leadership Style:</p>
               <ul className="text-sm text-white space-y-1">
                 {data.captaincy?.captaincy_style?.map((style: string, i: number) => (
                   <li key={i}>• {style}</li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl border border-[#D4AF37]/20">
               <Image src={bcaImages.captain} alt="Captain Messi" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
            </div>
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden shadow-2xl border border-white/10 mt-12 group">
               <Image src={bcaImages.farewell} alt="Farewell Messi" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-[#A50044]/20 mix-blend-multiply" />
            </div>
          </div>

        </div>
      </section>

      <FooterSection />
    </div>
  );
}
