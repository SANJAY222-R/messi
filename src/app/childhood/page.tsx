'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function ChildhoodPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  
  // Parallax Values
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, 200]);
  const textY = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const bgTextY = useTransform(smoothProgress, [0, 1], [0, 600]);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/DATA/03_childhood.json')
      .then(res => res.json())
      .then(childData => setData(childData.childhood || childData));
  }, []);

  if (!data) return <div ref={containerRef} className="min-h-[200vh] bg-[#0c0a09]" />;

  // Local Childhood Images Map
  const images = {
    baby: '/images/childhood/baby-photo.jpeg',
    rosario: '/images/childhood/childhood-rosario.jpg',
    family: '/images/childhood/family-young.jpeg',
    grandoli: '/images/childhood/grandoli-fc.jpeg',
    newells: '/images/childhood/newells-old-boys.jpg',
    youthPlay: '/images/childhood/youth-football.jpg',
    age10: '/images/childhood/age-10.jpg',
    messiChild: '/images/childhood/childhood-messi.jpeg',
    training: '/images/childhood/childhood-training.jpeg',
    laMasia: '/images/childhood/la-masia.webp'
  };

  return (
    <div ref={containerRef} className="relative bg-[#0c0a09] min-h-[500vh] text-[#d6caba] selection:bg-[#c2a67e] selection:text-black font-sans">
      <Header />
      
      {/* VINTAGE FILM GRAIN OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-overlay z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* BACKGROUND TYPOGRAPHY */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
        <motion.h1 style={{ y: bgTextY }} className="font-cinzel text-[15rem] md:text-[25rem] font-bold leading-none tracking-tighter">
          1987
        </motion.h1>
      </div>

      {/* 1. SEPIA HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-[#c2a67e]/20">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 h-[120%] -top-[10%] sepia-[0.5] contrast-[1.2]">
          <Image 
            src={images.baby} 
            alt="Baby Messi" 
            fill 
            sizes="100vw" 
            priority
            className="object-cover opacity-50 mix-blend-luminosity" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-[#0c0a09]/80" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 flex flex-col items-center text-center px-4 w-full">
          <h3 className="text-[#c2a67e] uppercase tracking-[0.5em] text-sm font-bold mb-6">
            {data.birth?.date} — {data.birth?.city}
          </h3>
          <h1 className="font-cinzel text-6xl md:text-[8rem] lg:text-[10rem] font-bold uppercase tracking-widest text-[#ece6dc] leading-none drop-shadow-2xl">
            GENESIS
          </h1>
          <p className="mt-8 max-w-2xl text-[#a89b88] text-lg md:text-xl font-light italic leading-relaxed">
            {data.overview?.description}
          </p>
        </motion.div>
      </section>

      {/* 2. THE ORIGINS (Sticky Split Scroll) */}
      <section className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 py-32 flex flex-col lg:flex-row gap-16 lg:gap-24 z-10">
        
        {/* LEFT COLUMN: STICKY DATA */}
        <div className="w-full lg:w-1/3 h-fit lg:sticky lg:top-32 flex flex-col gap-12">
          <div>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold uppercase tracking-widest text-[#ece6dc] mb-4">
              The <span className="text-[#c2a67e]">Origins</span>
            </h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#c2a67e] to-transparent mb-8" />
            
            <div className="space-y-8">
              <div className="bg-black/40 border border-[#c2a67e]/20 p-6 rounded-xl">
                <span className="text-[#c2a67e] text-xs uppercase tracking-widest block mb-4">Birth Details</span>
                <ul className="space-y-3 text-sm text-[#a89b88]">
                  <li className="flex justify-between"><strong className="text-[#ece6dc]">Date:</strong> {data.birth?.day}, {data.birth?.date}</li>
                  <li className="flex justify-between"><strong className="text-[#ece6dc]">Hospital:</strong> {data.birth?.hospital}</li>
                  <li className="flex justify-between"><strong className="text-[#ece6dc]">Birth Order:</strong> Child #{data.birth?.birth_order}</li>
                </ul>
              </div>

              <div className="bg-black/40 border border-[#c2a67e]/20 p-6 rounded-xl">
                <span className="text-[#c2a67e] text-xs uppercase tracking-widest block mb-4">The Family</span>
                <p className="text-sm text-[#a89b88] mb-3"><strong className="text-[#ece6dc]">Father:</strong> {data.parents?.father_role}</p>
                <p className="text-sm text-[#a89b88] mb-3"><strong className="text-[#ece6dc]">Mother:</strong> {data.parents?.mother_role}</p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-sm text-[#c2a67e] italic">"{data.grandmother?.importance[0]}" — Grandmother Celia</p>
                </div>
              </div>

              <div className="bg-black/40 border border-[#c2a67e]/20 p-6 rounded-xl">
                <span className="text-[#c2a67e] text-xs uppercase tracking-widest block mb-4">Education</span>
                <p className="text-sm text-[#a89b88] mb-1"><strong className="text-[#ece6dc]">School:</strong> {data.education?.primary_school?.name}</p>
                <p className="text-sm text-[#a89b88] italic">{data.education?.academic_notes?.[0]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SCROLLING IMAGES */}
        <div className="w-full lg:w-2/3 flex flex-col gap-16 pb-16">
          <div className="relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 sepia-[0.3]">
             <Image src={images.rosario} alt="Rosario Streets" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover object-top" />
             <div className="absolute bottom-6 left-6 bg-black/80 px-4 py-2 text-xs uppercase tracking-widest border border-[#c2a67e]/30">The Streets of Rosario</div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 sepia-[0.3]">
               <Image src={images.family} alt="Messi Family" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" />
               <div className="absolute bottom-6 left-6 bg-black/80 px-4 py-2 text-xs uppercase tracking-widest border border-[#c2a67e]/30">Family Roots</div>
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 sepia-[0.3] mt-16">
               <Image src={images.messiChild} alt="Young Messi" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FIRST TOUCHES (Grandoli & Newell's) */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-[#12100e] border-y border-[#c2a67e]/10 z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-20">
          <h2 className="font-cinzel text-4xl md:text-6xl font-bold uppercase tracking-widest text-[#ece6dc] mb-6">
            The Machine <span className="text-[#c2a67e]">of '87</span>
          </h2>
          <p className="text-[#a89b88] max-w-2xl text-lg italic">
            From his first touches at Grandoli at age {data.football_beginnings?.started_playing_age} to becoming the focal point of Newell's Old Boys' legendary youth academy.
          </p>
          <div className="mt-8 flex gap-4 text-xs font-mono uppercase tracking-widest text-[#c2a67e]">
            {data.early_personality?.traits?.map((trait: string, i: number) => (
              <span key={i} className="border border-[#c2a67e]/30 px-3 py-1 rounded-full bg-[#c2a67e]/10">{trait}</span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden sepia-[0.4] group">
            <Image src={images.grandoli} alt="Grandoli FC" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="text-[#c2a67e] text-xs uppercase tracking-widest mb-1">{data.football_beginnings?.first_club?.joined_year}</span>
              <h3 className="font-cinzel text-2xl text-white">Grandoli FC</h3>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden sepia-[0.4] group md:-mt-12">
            <Image src={images.youthPlay} alt="Youth Match" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="text-[#c2a67e] text-xs uppercase tracking-widest mb-1">First Position</span>
              <h3 className="font-cinzel text-2xl text-white">{data.football_beginnings?.first_position}</h3>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden sepia-[0.4] group">
            <Image src={images.newells} alt="Newells Old Boys" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
              <span className="text-[#c2a67e] text-xs uppercase tracking-widest mb-1">{data.newells_old_boys?.joined}</span>
              <h3 className="font-cinzel text-2xl text-white">Newell's Old Boys</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE MEDICAL CHALLENGE (GHD) */}
      <section className="relative w-full py-32 px-6 md:px-12 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-red-900/5 mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.1)] grayscale">
              <Image src={images.age10} alt="Age 10 Messi" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-red-900/20 blur-[100px] rounded-full pointer-events-none" />
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold uppercase tracking-widest text-[#ece6dc] mb-8">
              The Greatest <br/><span className="text-red-500">Challenge</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
               <div className="bg-black/50 border border-red-900/30 p-6 rounded-xl">
                 <span className="block text-3xl font-cinzel text-white mb-2">{data.medical_history?.diagnosis?.diagnosed_age}</span>
                 <span className="text-xs uppercase tracking-widest text-red-500">Age of Diagnosis</span>
               </div>
               <div className="bg-black/50 border border-red-900/30 p-6 rounded-xl">
                 <span className="block text-3xl font-cinzel text-white mb-2">${data.medical_history?.treatment?.estimated_cost_per_month_usd}</span>
                 <span className="text-xs uppercase tracking-widest text-red-500">Monthly Cost</span>
               </div>
            </div>

            <h3 className="text-xl font-bold text-[#ece6dc] mb-4">{data.medical_history?.diagnosis?.condition}</h3>
            <p className="text-[#a89b88] leading-relaxed mb-6">
              {data.medical_history?.impact?.[0]} His treatment required {data.medical_history?.treatment?.frequency.toLowerCase()} {data.medical_history?.treatment?.therapy.toLowerCase()}.
            </p>

            <div className="flex gap-12 border-t border-white/10 pt-6 mt-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c2a67e] block mb-3">Known Strengths</span>
                <ul className="space-y-1 text-sm text-[#ece6dc]">
                  {data.skills_before_barcelona?.strengths?.slice(0,3).map((s: string, i: number) => <li key={i}>+ {s}</li>)}
                </ul>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-red-500 block mb-3">Primary Weakness</span>
                <ul className="space-y-1 text-sm text-[#ece6dc]">
                  {data.skills_before_barcelona?.weaknesses?.map((w: string, i: number) => <li key={i}>- {w}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DESTINY CALLS (Napkin & La Masia) */}
      <section className="relative w-full py-32 px-6 md:px-12 bg-[#12100e] border-y border-[#c2a67e]/10 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/2">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold uppercase tracking-widest text-[#ece6dc] mb-6">
              A Contract on a <br/><span className="text-[#c2a67e]">Napkin</span>
            </h2>
            <p className="text-[#a89b88] text-lg leading-relaxed italic mb-8">
              {data.napkin_contract?.description}
            </p>
            <div className="bg-black/40 border border-[#c2a67e]/20 p-8 rounded-2xl">
              <span className="text-[#c2a67e] text-xs uppercase tracking-widest block mb-4">Relocation to Spain</span>
              <ul className="space-y-3 text-[#ece6dc]">
                {data.move_to_spain?.reason?.map((r: string, i: number) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-[#c2a67e] font-bold">{i+1}.</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden sepia-[0.3]">
               <Image src={images.laMasia} alt="La Masia Arrival" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" />
               <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest bg-black/80 px-2 py-1 border border-[#c2a67e]/30">La Masia</div>
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden sepia-[0.3] mt-12">
               <Image src={images.training} alt="Childhood Training" fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover" />
               <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest bg-black/80 px-2 py-1 border border-[#c2a67e]/30">Trial at Age {data.barcelona_trial?.age}</div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. TIMELINE OF A PRODIGY */}
      <section className="relative w-full py-32 px-6 md:px-12 z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cinzel text-3xl font-bold uppercase tracking-widest text-[#ece6dc] mb-16 text-center">Timeline of a Prodigy</h2>
          
          <div className="relative border-l border-[#c2a67e]/30 ml-4 md:ml-12 space-y-12 pb-12">
            {data.timeline?.map((item: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 md:pl-16"
              >
                <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-[#12100e] border-2 border-[#c2a67e]" />
                <span className="text-[#c2a67e] font-cinzel text-3xl font-bold block mb-2">{item.year}</span>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-3">Age: {item.age}</span>
                <p className="text-[#ece6dc] text-lg">{item.event}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center bg-black/40 border border-white/5 p-8 rounded-3xl">
            <h3 className="text-[#c2a67e] text-xs uppercase tracking-widest mb-4">Legacy of Childhood</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {data.legacy_of_childhood?.key_lessons?.map((lesson: string, i: number) => (
                <span key={i} className="text-[#ece6dc] font-cinzel text-xl uppercase tracking-widest px-4 py-2 bg-white/5 rounded-lg border border-white/10">{lesson}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
