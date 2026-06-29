'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';
import Link from 'next/link';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });

  // Parallax mappings
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 250]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.2], [0, -150]);
  
  // Scatter Parallax Y values (Top Level Hooks)
  const y0 = useTransform(smoothProgress, [0.3, 0.8], [0, -300]);
  const y1 = useTransform(smoothProgress, [0.3, 0.8], [0, 300]);
  const y2 = useTransform(smoothProgress, [0.3, 0.8], [0, -300]);
  const y3 = useTransform(smoothProgress, [0.3, 0.8], [0, 300]);
  const scatterY = [y0, y1, y2, y3];

  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [argentinaImages, setArgentinaImages] = useState<string[]>([]);
  const [goalImages, setGoalImages] = useState<string[]>([]);
  const [portraits, setPortraits] = useState<string[]>([]);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/DATA/17_images.json')
      .then(res => res.json())
      .then(imgData => {
        setHeroImages(imgData.hero || []);
        setArgentinaImages(imgData.argentina || []);
        setGoalImages(imgData.goals || []);
        setPortraits(imgData.portraits || []);
      });
      
    fetch('/DATA/messi.json')
      .then(res => res.json())
      .then(resData => setData(resData));
  }, []);

  if (!data || heroImages.length === 0) {
    return <div ref={containerRef} className="min-h-[200vh] bg-[#050608]" />;
  }

  // Explicitly use confetti.webp for the main hero
  const worldCupImage = '/images/Argentina/confetti.webp';
  // Explicitly use the cinematic dark wallpaper
  const celebrationImage = '/images/wallpapers/cinematic-wallpaper.jpeg';

  return (
    <div ref={containerRef} className="relative bg-[#050608] min-h-[400vh] overflow-hidden">
      <Header />
      
      {/* 1. CINEMATIC WORLD CUP HERO */}
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Argentina Ambient Glow */}
        <div className="absolute inset-0 ambient-glow-blue z-0 opacity-50 pointer-events-none" />
        <div className="absolute inset-0 ambient-glow-gold z-0 opacity-30 pointer-events-none mix-blend-screen" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
          <Image 
            src={worldCupImage} 
            alt="Messi World Cup Champion"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050608]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/40 to-transparent" />
        </motion.div>

        <motion.div 
          style={{ y: textY }}
          className="relative z-10 text-center flex flex-col items-center justify-center w-full px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            <h1 className="font-cinzel text-7xl md:text-[10rem] lg:text-[15rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-600 leading-[0.8] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              MESSI
            </h1>
            <h1 className="font-cinzel text-7xl md:text-[10rem] lg:text-[15rem] font-bold tracking-tighter text-outline opacity-60 leading-[0.8] -mt-4 md:-mt-8">
              GOAT
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
            className="mt-12 flex items-center gap-6 glass-panel px-8 py-3 rounded-full"
          >
            <div className="h-[1px] w-8 md:w-16 bg-gold-gradient" />
            <p className="font-sans uppercase tracking-[0.5em] text-xs md:text-sm text-gold-gradient font-bold drop-shadow-md">
              The Greatest of All Time
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-gold-gradient" />
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </motion.div>
      </div>

      {/* 2. EDITORIAL INTRO STATEMENT (Restored from Previous UI) */}
      <section className="relative w-full py-32 px-6 md:px-12 z-20 bg-[#050608]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full md:w-1/2"
          >
            <h2 className="font-cinzel text-4xl md:text-6xl font-bold leading-tight text-white mb-6">
              A LEGACY <br />
              <span className="text-outline">FORGED IN</span> <br />
              <span className="text-accent-blue">ROSARIO</span>
            </h2>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              From the humble streets of Argentina to the pinnacle of global football. Experience the journey of a boy who dared to dream and redefined the beautiful game forever.
            </p>
            <Link href="/about">
              <span className="inline-flex items-center gap-2 uppercase tracking-widest text-sm font-semibold text-white border-b border-white/30 pb-1 hover:border-white transition-colors cursor-pointer">
                Read Biography
              </span>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="w-full md:w-1/2 h-[600px] relative rounded-2xl overflow-hidden glass-card p-2 group"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image 
                src={portraits[2] || portraits[0]}
                alt="Messi Portrait"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. ICONIC CELEBRATION FEATURED SECTION */}
      <section className="relative w-full py-40 px-6 md:px-12 z-20 bg-[#050608] overflow-hidden">
        <div className="absolute inset-0 ambient-glow-blaugrana opacity-20 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row-reverse gap-16 lg:gap-32 items-center">
          
          {/* Immersive Parallax Image */}
          <div className="w-full lg:w-1/2 relative h-[70vh] lg:h-[90vh] rounded-3xl overflow-hidden glass-card group perspective-1000">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={celebrationImage}
                alt="Messi Iconic Celebration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
            </motion.div>
            
            <div className="absolute bottom-10 left-10 glass-panel px-6 py-4 rounded-xl border-l-4 border-l-accent-blue">
              <span className="font-cinzel text-white text-2xl font-bold block mb-1">879</span>
              <span className="text-[10px] text-neutral-300 uppercase tracking-widest">Official Goals</span>
            </div>
          </div>

          {/* Editorial Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-right items-end"
          >
            <h3 className="text-accent-blue text-sm uppercase tracking-[0.4em] font-bold mb-6">The Signature</h3>
            <h2 className="font-cinzel text-5xl md:text-7xl font-bold leading-[1.1] text-white mb-8">
              A SYMBOL <br />
              <span className="text-outline">OF PURE</span> <br />
              <span className="text-gold-gradient">MAGIC</span>
            </h2>
            <p className="text-neutral-400 text-xl leading-relaxed mb-10 font-light max-w-lg">
              Every time he points to the sky, the world holds its breath. From impossible solo runs to logic-defying free kicks, Lionel Messi has redefined what is possible on a football pitch.
            </p>
            <Link href="/goals">
              <span className="inline-flex items-center justify-center px-8 py-4 glass-card text-white uppercase tracking-widest text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer w-fit">
                Relive The Goals
              </span>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* 4. PARALLAX IMAGE SCATTER GRID (Refined with Glassmorphism) */}
      <section className="relative w-full py-40 min-h-[150vh] bg-[#050608]">
        <div className="absolute inset-0 pointer-events-none opacity-50">
           {heroImages.slice(2, 6).map((img, i) => (
             <motion.div 
               key={i} 
               style={{ 
                 y: scatterY[i]
               }}
               className={`absolute w-64 md:w-96 aspect-[3/4] rounded-2xl overflow-hidden glass-card p-2
                 ${i === 0 ? 'top-10 left-10 md:left-32' : ''}
                 ${i === 1 ? 'top-40 right-10 md:right-32' : ''}
                 ${i === 2 ? 'bottom-32 left-20 md:left-64' : ''}
                 ${i === 3 ? 'bottom-10 right-20 md:right-64' : ''}
               `}
             >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image src={img} alt={`Scatter ${i}`} fill sizes="25vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                </div>
             </motion.div>
           ))}
        </div>
        
        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center px-6 mt-[20vh] glass-panel py-20 rounded-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight drop-shadow-2xl"
          >
            "I HAVE MANY YEARS <br/> TO GET BETTER <br/> AND <span className="text-gold-gradient">THAT HAS TO BE</span> <br/> MY AMBITION."
          </motion.h2>
          <div className="mt-12 h-[1px] w-32 bg-accent-blue mx-auto shadow-[0_0_15px_#6EC6FF]" />
        </div>
      </section>

      {/* 5. PARALLAX STATS SHOWCASE (Restored from Previous UI) */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <Image 
          src={heroImages[6] || heroImages[1]} 
          alt="Messi Action" 
          fill 
          sizes="100vw"
          className="object-cover opacity-20 fixed inset-0 z-0 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608] z-0" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Official Goals', val: '879' },
            { label: 'Ballon d\'Ors', val: '8' },
            { label: 'Trophies', val: '44' },
            { label: 'World Cup', val: '2022' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center p-8 glass-card rounded-2xl shadow-2xl"
            >
              <span className="font-cinzel text-5xl md:text-6xl font-bold text-white mb-2 group-hover:text-gold-gradient transition-colors">{stat.val}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-accent-blue">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
