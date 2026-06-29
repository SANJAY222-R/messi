'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function ArgentinaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 300]);
  const opacityFade = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const paradeY = useTransform(smoothProgress, [0.7, 1], [0, -200]);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/DATA/08_argentina.json')
      .then(res => res.json())
      .then(argData => setData(argData));
  }, []);

  if (!data) return <div ref={containerRef} className="min-h-[200vh] bg-black" />;

  const images = {
    hero: '/images/Argentina/world-cup-kiss.webp',
    debut: '/images/Argentina/debut.jpg',
    portrait: '/images/Argentina/portrait-2024.jpeg',
    diMaria: '/images/Argentina/di-maria.jpeg',
    emi: '/images/Argentina/emi-martinez.jpeg',
    copa: '/images/Argentina/copa-america-2021.jpeg',
    finalissima: '/images/Argentina/finalissima.jpeg',
    france: '/images/Argentina/world-cup-final-france.webp',
    goldenBall: '/images/Argentina/golden-ball.webp',
    captain: '/images/Argentina/captain.webp',
    wc2022: '/images/Argentina/world-cup-2022.webp',
    parade: '/images/Argentina/parade.webp',
    fans: '/images/Argentina/fans-celebration.jpg',
    lifting: '/images/Argentina/lifting-copa.jpeg',
    confetti: '/images/Argentina/confetti.webp',
  };

  return (
    <div ref={containerRef} className="relative bg-black min-h-[500vh] text-white font-sans selection:bg-[#F6B40E] selection:text-black overflow-hidden">
      <Header />
      
      {/* AMBIENT SUN OF MAY GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#43A1D5] rounded-full blur-[150px] opacity-30 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#F6B40E] rounded-full blur-[120px] opacity-20" />
      </div>

      {/* 1. IMMORTAL HERO (The Kiss) */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <motion.div style={{ y: heroY, opacity: opacityFade }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
          <Image 
            src={images.hero} 
            alt="World Cup Kiss"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
          <div className="absolute inset-0 bg-[#F6B40E]/5 mix-blend-color" />
        </motion.div>

        <div className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center text-center mt-20">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.2 }}>
            <h3 className="text-[#F6B40E] uppercase tracking-[0.6em] text-sm md:text-md font-bold mb-8">
              The Culmination of a Lifetime
            </h3>
            <h1 className="font-cinzel text-6xl md:text-[8rem] lg:text-[11rem] font-bold tracking-widest text-white leading-[0.85] drop-shadow-[0_0_50px_rgba(246,180,14,0.3)] uppercase">
              IMMORTAL
            </h1>
            <h1 className="font-cinzel text-5xl md:text-[6rem] lg:text-[8rem] font-bold tracking-widest text-transparent leading-[0.85] uppercase mt-2" style={{ WebkitTextStroke: '1px #43A1D5' }}>
              ALBICELESTE
            </h1>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 2 }} className="mt-16 flex items-center gap-12 border-t border-white/20 pt-8">
            <div className="flex flex-col">
              <span className="text-[#43A1D5] text-xs font-mono uppercase tracking-widest">Debut</span>
              <span className="text-xl font-cinzel">{data.career?.start_date?.split('-')[0]}</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div className="flex flex-col">
              <span className="text-[#F6B40E] text-xs font-mono uppercase tracking-widest">Ultimate Glory</span>
              <span className="text-xl font-cinzel">2022</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE LONG ROAD (Debut & Captaincy) */}
      <section className="relative w-full py-40 px-6 md:px-12 z-20">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-20 items-center">
          
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-8">
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-white/10 group">
               <Image src={images.debut} alt="Argentina Debut" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000" />
               <div className="absolute inset-0 bg-[#43A1D5]/20 mix-blend-multiply" />
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_0_40px_rgba(246,180,14,0.15)] border border-[#F6B40E]/30 mt-16">
               <Image src={images.portrait} alt="Messi Portrait" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            <div>
              <h2 className="font-cinzel text-5xl md:text-6xl font-bold uppercase tracking-widest text-white mb-6">
                A Journey of <br/><span className="text-[#43A1D5]">Resilience</span>
              </h2>
              <div className="h-[2px] w-32 bg-gradient-to-r from-[#43A1D5] to-[#F6B40E] mb-8" />
              
              <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-md rounded-lg mb-8">
                <span className="text-[#F6B40E] text-xs font-mono uppercase tracking-widest block mb-4">Official Debut (Age {data.debut?.official_debut?.age?.years})</span>
                <p className="text-white text-xl mb-4">{data.debut?.official_debut?.date} vs {data.debut?.official_debut?.opponent}</p>
                <p className="text-[#a1a1aa] italic">{data.debut?.official_debut?.notable_event}</p>
              </div>

              <div className="bg-[#43A1D5]/10 border border-[#43A1D5]/30 p-8 backdrop-blur-md rounded-lg">
                <span className="text-[#43A1D5] text-xs font-mono uppercase tracking-widest block mb-4">The Captain</span>
                <ul className="space-y-3">
                  {data.captaincy?.captaincy_style?.map((style: string, i: number) => (
                    <li key={i} className="flex gap-4 items-center">
                      <div className="w-2 h-2 rounded-full bg-[#F6B40E]" />
                      <span className="text-[#e4e4e7] uppercase tracking-wider text-sm">{style}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. THE DISCIPLES OF LA SCALONETA */}
      <section className="relative w-full py-40 px-6 md:px-12 bg-gradient-to-b from-black via-[#04111d] to-black border-y border-[#43A1D5]/20">
        <div className="max-w-[1600px] mx-auto text-center">
          
          <h2 className="font-cinzel text-4xl md:text-6xl font-bold uppercase tracking-widest text-white mb-8">
            The <span className="text-[#F6B40E]">Scaloneta</span> Era
          </h2>
          <p className="text-[#a1a1aa] max-w-3xl mx-auto text-lg italic mb-20 leading-relaxed">
            "We are 26 warriors who are prepared to fight for him." — The generation that refused to let Messi retire without a World Cup.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-20">
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-white/10 group">
                 <Image src={images.diMaria} alt="Di Maria" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <span className="font-cinzel text-xl tracking-widest text-[#43A1D5]">Ángel Di María</span>
            </div>
            
            <div className="flex flex-col gap-6 scale-110 z-10">
              <div className="relative aspect-[3/4] w-full overflow-hidden shadow-[0_0_50px_rgba(246,180,14,0.3)] border-2 border-[#F6B40E]">
                 <Image src={images.captain} alt="Captain Messi" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top" />
              </div>
              <span className="font-cinzel text-2xl font-bold tracking-widest text-[#F6B40E]">Lionel Messi</span>
            </div>

            <div className="flex flex-col gap-6">
              <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-white/10 group">
                 <Image src={images.emi} alt="Emi Martinez" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <span className="font-cinzel text-xl tracking-widest text-[#43A1D5]">Emi Martínez</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {data.important_teammates?.slice(0, 15).map((tm: string, i: number) => (
              <span key={i} className="px-4 py-2 border border-white/10 bg-black text-xs uppercase tracking-widest text-[#e4e4e7] shadow-lg">
                {tm}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE TRINITY OF GLORY (Copa, Finalissima, World Cup) */}
      <section className="relative w-full py-40 px-6 md:px-12 z-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col items-center mb-24">
            <h3 className="text-[#F6B40E] text-xs font-mono uppercase tracking-[0.5em] mb-6">2021 — 2022</h3>
            <h2 className="font-cinzel text-5xl md:text-7xl font-bold uppercase tracking-widest text-white">
              The <span className="text-[#43A1D5]">Trinity</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Copa America (Landscape) */}
            <div className="lg:col-span-12 relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden shadow-[0_0_40px_rgba(67,161,213,0.2)] border border-[#43A1D5]/40 mb-12 group">
               <Image src={images.copa} alt="Copa America" fill sizes="100vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-12">
                 <h3 className="font-cinzel text-4xl md:text-5xl font-bold text-white uppercase tracking-widest mb-2">Copa América 2021</h3>
                 <span className="text-[#43A1D5] font-mono tracking-widest">The curse is broken at the Maracanã.</span>
               </div>
            </div>

            {/* Finalissima (Square/Landscape) */}
            <div className="lg:col-span-5 relative aspect-[4/5] w-full overflow-hidden shadow-2xl border border-white/10">
               <Image src={images.finalissima} alt="Finalissima" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" />
               <div className="absolute top-8 left-8 bg-black/80 px-4 py-2 border border-[#a1a1aa]/30 text-xs font-mono uppercase tracking-widest text-white">
                 Finalissima 2022
               </div>
            </div>

            {/* World Cup Qatar (Portrait Focus) */}
            <div className="lg:col-span-7 relative aspect-[4/5] md:aspect-[16/9] lg:aspect-auto lg:h-full w-full overflow-hidden shadow-[0_0_60px_rgba(246,180,14,0.3)] border border-[#F6B40E]">
               <Image src={images.wc2022} alt="World Cup Qatar" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover object-top" />
               <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent flex flex-col justify-end items-end p-12 text-right">
                 <h3 className="font-cinzel text-4xl md:text-5xl font-bold text-[#F6B40E] uppercase tracking-widest mb-2">FIFA World Cup</h3>
                 <span className="text-white font-mono tracking-widest">Qatar 2022 — The Ultimate Prize</span>
               </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. THE RECORD BOOKS & THE CROWN */}
      <section className="relative w-full py-40 px-6 md:px-12 bg-[#0a0a0a] border-y border-white/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="grid grid-cols-2 gap-8">
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-[#F6B40E]/40">
               <Image src={images.goldenBall} alt="Golden Ball" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top" />
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl border border-white/10 mt-16 group">
               <Image src={images.france} alt="World Cup Final France" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
          
          <div className="flex flex-col">
            <h2 className="font-cinzel text-5xl md:text-6xl font-bold uppercase tracking-widest text-white mb-16">
              The <span className="text-[#F6B40E]">Crown</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-10 mb-16">
               <div>
                 <span className="block text-7xl font-sans font-black text-white mb-2">109</span>
                 <span className="text-sm font-mono uppercase tracking-widest text-[#43A1D5]">Intl Goals</span>
               </div>
               <div>
                 <span className="block text-7xl font-sans font-black text-white mb-2">55</span>
                 <span className="text-sm font-mono uppercase tracking-widest text-[#43A1D5]">Intl Assists</span>
               </div>
            </div>

            <div className="space-y-6 bg-black p-8 border border-white/10">
              <h3 className="text-[#F6B40E] text-xs font-mono uppercase tracking-widest mb-6">International Major Honors</h3>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white text-lg tracking-wider">FIFA World Cup</span>
                <span className="text-[#F6B40E] font-cinzel font-bold">2022</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white text-lg tracking-wider">Copa América</span>
                <span className="text-[#43A1D5] font-cinzel font-bold">2021, 2024</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-white text-lg tracking-wider">Finalissima</span>
                <span className="text-[#e4e4e7] font-cinzel font-bold">2022</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. IMMORTAL PARADE & GLORY */}
      <section className="relative w-full h-[150vh] flex flex-col justify-end pb-32">
        <motion.div style={{ y: paradeY }} className="absolute inset-0 z-0 h-[150%] -top-[25%]">
          <Image 
            src={images.parade} 
            alt="Buenos Aires Parade"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          
          <div className="relative aspect-[16/9] w-full overflow-hidden shadow-[0_0_50px_rgba(246,180,14,0.3)] border-4 border-[#F6B40E]">
            <Image src={images.lifting} alt="Lifting Copa" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-top" />
          </div>

          <div className="flex flex-col gap-8 pb-8 text-right">
            <h2 className="font-cinzel text-5xl md:text-7xl font-bold uppercase tracking-widest text-[#F6B40E]">
              ETERNAL
            </h2>
            <p className="text-[#e4e4e7] text-xl font-light italic leading-relaxed">
              "I knew God was going to give it to me. I had a feeling that this was the one."
            </p>
            <div className="flex justify-end mt-8">
              <div className="relative w-64 aspect-[16/9] overflow-hidden border border-white/20">
                <Image src={images.fans} alt="Fans" fill sizes="30vw" className="object-cover grayscale" />
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
