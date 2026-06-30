'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function AboutPage() {
  const [data, setData] = useState<any>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const rotateSun = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    fetch('/DATA/01_personal.json')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-slate-800 font-sans selection:bg-[#75AADB]/30 overflow-hidden relative">
      {/* Argentina Theme Global Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-white via-slate-50 to-[#75AADB]/10"></div>
      
      {/* Rotating Sun of May Graphic */}
      <motion.div 
        style={{ rotate: rotateSun }} 
        className="fixed top-20 right-10 md:top-40 md:right-20 z-0 opacity-10 pointer-events-none blur-[2px]"
      >
        <svg width="600" height="600" viewBox="0 0 100 100" className="fill-[#F6B40E]">
           {/* Abstract Sun shape representing the Sun of May */}
           <circle cx="50" cy="50" r="20" />
           {Array.from({ length: 32 }).map((_, i) => (
             <line key={i} x1="50" y1="50" x2="50" y2="5" transform={`rotate(${i * (360/32)} 50 50)`} stroke="#F6B40E" strokeWidth={i % 2 === 0 ? "2" : "1"} />
           ))}
        </svg>
      </motion.div>

      <Header />
      
      {!data ? (
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="w-16 h-16 border-4 border-[#75AADB]/30 border-t-[#F6B40E] rounded-full animate-spin shadow-xl"></div>
        </div>
      ) : (
        <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-32">
          
          {/* 1. THE ALBICELESTE HERO (Bento Grid) */}
          <section className="flex flex-col gap-6">
             <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1 }}
               className="mb-8"
             >
               <div className="flex items-center gap-4 mb-4">
                 <h1 className="font-cinzel text-5xl md:text-8xl font-bold text-slate-900 uppercase tracking-widest drop-shadow-sm">
                   EL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#75AADB] to-[#4A90E2]">MESÍAS</span>
                 </h1>
                 <div className="hidden md:flex flex-col gap-2 mt-2">
                    <a href={data.social_media.instagram} target="_blank" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#75AADB] hover:text-white transition-colors">IG</a>
                    <a href={data.social_media.facebook} target="_blank" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#75AADB] hover:text-white transition-colors">FB</a>
                    <a href={data.social_media.website} target="_blank" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#75AADB] hover:text-white transition-colors">WEB</a>
                 </div>
               </div>
               <p className="text-slate-500 font-mono tracking-[0.2em] uppercase">{data.full_name}</p>
               
               {/* Current Status Glass Banner */}
               <div className="mt-6 flex flex-wrap gap-4 items-center bg-white/50 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-sm w-max max-w-full">
                  <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                     <span className="text-xs font-mono text-slate-400 uppercase">Club</span>
                     <span className="font-bold text-slate-800">{data.current_status.club}</span>
                  </div>
                  <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                     <span className="text-xs font-mono text-slate-400 uppercase">League</span>
                     <span className="font-bold text-slate-800">{data.current_status.league}</span>
                  </div>
                  <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
                     <span className="text-xs font-mono text-slate-400 uppercase">No.</span>
                     <span className="font-bold text-slate-800 text-xl font-cinzel">{data.current_status.shirt_number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-mono text-slate-400 uppercase">Status</span>
                     <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{data.current_status.career_status}</span>
                  </div>
               </div>
             </motion.div>

             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
                
                {/* Hero Portrait */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                  className="md:col-span-2 lg:col-span-2 row-span-2 rounded-3xl overflow-hidden relative shadow-2xl group border border-[#75AADB]/20"
                >
                  <Image src="/images/Portraits/portrait-4k.jpg" alt="Lionel Messi" fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                     <span className="bg-[#F6B40E] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider mb-3 inline-block">Captain</span>
                     <h2 className="text-white font-cinzel text-4xl md:text-5xl font-bold leading-none">{data.personal_information.nationality}</h2>
                     <p className="text-[#75AADB] font-mono mt-2 flex items-center gap-2">
                       <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                       {data.personal_information.place_of_birth.city}, {data.personal_information.place_of_birth.province}
                     </p>
                  </div>
                </motion.div>

                {/* Heritage & Identity Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                  className="rounded-3xl bg-white shadow-[0_20px_50px_-12px_rgba(117,170,219,0.2)] p-8 border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#75AADB]/10 rounded-full blur-3xl group-hover:bg-[#F6B40E]/20 transition-colors duration-500" />
                  
                  <div>
                    <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-3">Citizenship</h3>
                    <div className="flex gap-2 mb-4">
                      {data.personal_information.citizenship.map((c: string) => <span key={c} className="text-sm font-bold text-slate-800">{c}</span>)}
                    </div>
                    <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-2">Heritage</h3>
                    <p className="text-sm text-slate-700 mb-1"><span className="font-medium">Ethnicity:</span> {data.personal_information.ethnicity}</p>
                    <p className="text-sm text-slate-700 mb-1"><span className="font-medium">Religion:</span> {data.personal_information.religion}</p>
                    <p className="text-sm text-slate-700 mb-4"><span className="font-medium">Languages:</span> {data.personal_information.languages.join(", ")}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-2">Known As</h3>
                    <div className="flex flex-wrap gap-1">
                      {data.nicknames.slice(0, 3).map((nickname: string, i: number) => (
                        <span key={i} className="bg-slate-50 text-slate-700 border border-slate-200 px-2 py-1 rounded text-xs hover:bg-[#75AADB] hover:text-white transition-colors cursor-default">
                          {nickname}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Physical Stats Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                  className="rounded-3xl bg-gradient-to-br from-[#75AADB] to-[#4A90E2] shadow-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                  <h3 className="font-mono text-sm uppercase tracking-widest text-white/80 z-10 mb-2">Physicality</h3>
                  <div className="z-10 flex flex-col gap-2">
                    <div className="flex justify-between items-end border-b border-white/20 pb-1">
                       <span className="text-white/60 font-medium text-sm">Height</span>
                       <span className="text-xl font-bold font-cinzel">{data.personal_information.height.cm} <span className="text-xs">cm</span></span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/20 pb-1">
                       <span className="text-white/60 font-medium text-sm">Weight</span>
                       <span className="text-xl font-bold font-cinzel">{data.personal_information.weight.kg} <span className="text-xs">kg</span></span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/20 pb-1">
                       <span className="text-white/60 font-medium text-sm">Dominant Foot</span>
                       <span className="text-sm font-bold uppercase tracking-wider">{data.personal_information.dominant_foot}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/20 pb-1">
                       <span className="text-white/60 font-medium text-sm">Dominant Hand</span>
                       <span className="text-sm font-bold uppercase tracking-wider">{data.personal_information.dominant_hand}</span>
                    </div>
                    <div className="flex justify-between items-end text-xs pt-1">
                       <span className="text-white/80">Eye: {data.personal_information.eye_color}</span>
                       <span className="text-white/80">Hair: {data.personal_information.hair_color}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Medical History Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                  className="md:col-span-2 lg:col-span-4 rounded-3xl bg-slate-900 shadow-2xl p-8 text-white relative overflow-hidden group"
                >
                  <div className="absolute inset-0">
                    <Image src="/images/Portraits/black-background.jpeg" alt="Medical History" fill sizes="(max-width: 768px) 100vw, 100vw" className="object-cover opacity-20 group-hover:opacity-10 transition-opacity duration-700" />
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-between md:flex-row md:items-end gap-6">
                    <div>
                      <h3 className="text-[#F6B40E] font-mono text-sm uppercase tracking-widest flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
                        Overcoming the Odds
                      </h3>
                      <p className="text-3xl font-cinzel text-white mb-2">{data.medical_history.condition}</p>
                    </div>
                    <p className="text-slate-400 font-light max-w-lg md:text-right">Diagnosed at age {data.medical_history.diagnosed_age}. Treatment required {data.medical_history.treatment.type} for {data.medical_history.treatment.duration.toLowerCase()}, famously funded by {data.medical_history.treatment.funded_by}.</p>
                  </div>
                </motion.div>

             </div>
          </section>

          {/* 2. THE PLAYMAKER'S BLUEPRINT */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-baseline gap-4 mb-4">
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-slate-900 border-b-4 border-[#75AADB] pb-2 inline-block">THE BLUEPRINT</h2>
              <span className="text-slate-400 font-mono tracking-widest uppercase">Style of Play</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Traits & Roles */}
               <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col gap-8 relative overflow-hidden">
                 <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                    <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                 </div>
                 
                 <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                     <span className="w-8 h-8 rounded-full bg-[#75AADB]/20 text-[#75AADB] flex items-center justify-center font-mono text-sm">01</span> 
                     Primary Roles
                   </h3>
                   <div className="flex gap-4 flex-wrap">
                      <div className="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg font-cinzel tracking-wider">{data.professional_information.primary_role}</div>
                      {data.professional_information.secondary_roles.slice(0,2).map((role:string, i:number) => (
                        <div key={i} className="bg-white text-slate-800 border-2 border-slate-200 px-6 py-3 rounded-xl font-cinzel tracking-wider">{role}</div>
                      ))}
                   </div>
                 </div>

                 <div>
                   <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                     <span className="w-8 h-8 rounded-full bg-[#F6B40E]/20 text-[#F6B40E] flex items-center justify-center font-mono text-sm">02</span> 
                     Signature Traits
                   </h3>
                   <div className="flex flex-wrap gap-3">
                     {data.playing_style.traits.map((trait: string, i: number) => (
                       <span key={i} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-sm border border-slate-200 shadow-sm hover:border-[#75AADB] transition-colors cursor-default">
                         {trait}
                       </span>
                     ))}
                   </div>
                 </div>
               </div>

               <div className="flex flex-col gap-8">
                 {/* Strengths Visualizer */}
                 <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden flex-1">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#75AADB]/20 to-transparent" />
                   <h3 className="text-[#75AADB] font-mono text-sm uppercase tracking-widest mb-6 relative z-10">Core Attributes</h3>
                   
                   <div className="flex flex-col gap-4 relative z-10">
                     {data.playing_style.strengths.slice(0, 5).map((strength: string, i: number) => {
                       const width = 85 + Math.random() * 15; 
                       return (
                         <div key={i} className="group">
                           <div className="flex justify-between text-white/80 text-sm mb-1 font-medium">
                             <span>{strength}</span>
                             <span className="text-[#F6B40E] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">MAX</span>
                           </div>
                           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }} 
                               whileInView={{ width: `${width}%` }} 
                               viewport={{ once: true }} 
                               transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                               className="h-full bg-gradient-to-r from-[#75AADB] to-[#F6B40E] rounded-full"
                             />
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>

                 {/* EA FC Rating Card */}
                 <div className="bg-[#F6B40E] rounded-3xl p-6 shadow-[0_10px_30px_-10px_rgba(246,180,14,0.5)] flex gap-6 items-center overflow-hidden relative group">
                   <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                     <svg width="200" height="200" viewBox="0 0 100 100" className="fill-black"><path d="M50 0L100 25L100 75L50 100L0 75L0 25Z" /></svg>
                   </div>
                   <div className="relative z-10 w-24 h-24 bg-black rounded-full flex flex-col items-center justify-center text-[#F6B40E] border-4 border-white/20">
                     <span className="text-3xl font-bold font-cinzel leading-none">99</span>
                     <span className="text-[10px] font-mono uppercase tracking-widest">OVR</span>
                   </div>
                   <div className="relative z-10 flex-1">
                     <h3 className="text-black font-cinzel font-bold text-xl uppercase mb-2">FIFA Profile</h3>
                     <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-black/80 font-medium">
                       <div>Work Rate: <span className="font-bold text-black">{data.fifa_profile.work_rate}</span></div>
                       <div>Skill Moves: <span className="font-bold text-black">{data.fifa_profile.skill_moves}★</span></div>
                       <div>Weak Foot: <span className="font-bold text-black">{data.fifa_profile.weak_foot}★</span></div>
                       <div>Reputation: <span className="font-bold text-black">{data.fifa_profile.international_reputation}★</span></div>
                     </div>
                   </div>
                 </div>
               </div>

            </div>
          </section>

          {/* 3. THE ROSARIO ROOTS (Family & Childhood Parallax Gallery) */}
          <section className="flex flex-col gap-10">
            <div className="flex flex-col md:flex-row items-baseline gap-4 mb-4">
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-slate-900 border-b-4 border-[#F6B40E] pb-2 inline-block">THE ROOTS</h2>
              <span className="text-slate-400 font-mono tracking-widest uppercase">Rosario, Argentina</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[600px]">
               
               {/* Interactive Info Board */}
               <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 flex flex-col justify-center shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#75AADB]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#75AADB]/10 transition-colors duration-700" />
                  
                  <div className="mb-10 relative z-10">
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-6">Family Tree</h3>
                    <div className="flex flex-col gap-4">
                       <p className="text-slate-800 text-lg"><span className="text-slate-500 font-medium">Father:</span> {data.family.father}</p>
                       <p className="text-slate-800 text-lg"><span className="text-slate-500 font-medium">Mother:</span> {data.family.mother}</p>
                       <p className="text-slate-800 text-lg"><span className="text-slate-500 font-medium">Spouse:</span> {data.family.spouse}</p>
                       <div className="mt-2 flex flex-wrap gap-2 items-center">
                         <span className="text-slate-500 font-medium block">Children:</span>
                         {data.family.children.map((child: string, i: number) => (
                           <span key={i} className="bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm text-sm font-medium text-[#75AADB]">{child}</span>
                         ))}
                       </div>
                       <div className="mt-2 text-slate-800 text-sm">
                         <span className="text-slate-500 font-medium block mb-1">Siblings:</span>
                         {data.family.siblings.map((s: any) => s.name).join(", ")}
                       </div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-slate-400 font-mono text-sm uppercase tracking-widest mb-4">Education</h3>
                    <p className="text-xl font-cinzel text-slate-800 font-bold">{data.education.schools[0].name}</p>
                    <p className="text-slate-500 mt-1">{data.education.schools[0].location}</p>
                  </div>
               </div>

               {/* Childhood Gallery Collage */}
               <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-full border border-slate-200 group">
                  <motion.div style={{ y: yParallax, scale: 1.2 }} className="absolute inset-0 origin-top">
                     <Image src="/images/childhood/childhood-rosario.jpg" alt="Childhood Rosario" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top opacity-80 mix-blend-multiply filter contrast-125 grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  {/* Floating Polaroids */}
                  <div className="absolute inset-0 pointer-events-none">
                     <motion.div 
                       initial={{ opacity: 0, rotate: -10, x: -20 }} 
                       whileInView={{ opacity: 1, rotate: -5, x: 0 }} 
                       transition={{ duration: 1, delay: 0.2 }}
                       className="absolute top-10 left-10 w-32 h-40 md:w-40 md:h-48 bg-white p-2 shadow-2xl rounded"
                     >
                       <div className="relative w-full h-[85%] bg-slate-200 mb-1 overflow-hidden">
                         <Image src="/images/childhood/baby-photo.jpeg" alt="Baby Messi" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover" />
                       </div>
                       <p className="text-[10px] md:text-xs font-mono text-center text-slate-500 uppercase mt-1">La Pulga</p>
                     </motion.div>
                     
                     <motion.div 
                       initial={{ opacity: 0, rotate: 10, x: 20 }} 
                       whileInView={{ opacity: 1, rotate: 5, x: 0 }} 
                       transition={{ duration: 1, delay: 0.4 }}
                       className="absolute bottom-10 right-10 md:bottom-20 md:right-10 w-40 h-48 md:w-48 md:h-56 bg-white p-2 shadow-2xl rounded"
                     >
                       <div className="relative w-full h-[85%] bg-slate-200 mb-1 overflow-hidden">
                         <Image src="/images/childhood/grandoli-fc.jpeg" alt="Grandoli" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover object-top" />
                       </div>
                       <p className="text-[10px] md:text-xs font-mono text-center text-slate-500 uppercase mt-1">Grandoli FC</p>
                     </motion.div>
                  </div>
               </div>

            </div>
          </section>

          {/* 4. GLOBAL EMPIRE & WEALTH */}
          <section className="flex flex-col items-center justify-center text-center pb-20 border-t border-slate-200 pt-20">
            <h2 className="font-cinzel text-3xl font-bold text-slate-800 mb-2">Global Empire</h2>
            <p className="text-slate-500 mb-8 max-w-lg">
              Beyond the pitch, Messi's brand is a global phenomenon. {data.net_worth.estimated ? `Estimated at ${data.net_worth.estimated}` : data.net_worth.note}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {data.sponsorships.map((sponsor: string, i: number) => (
                <div key={i} className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-full text-slate-600 font-semibold shadow-sm hover:shadow-md hover:bg-[#75AADB] hover:text-white hover:border-[#75AADB] transition-all cursor-default">
                  {sponsor}
                </div>
              ))}
            </div>

            <p className="text-[10px] font-mono uppercase text-slate-400 max-w-xs text-center border-t border-slate-100 pt-4 mt-8">
              Data created for {data.metadata.created_for} • v{data.metadata.version} • {data.metadata.last_updated}
            </p>
          </section>

        </div>
      )}
      <FooterSection />
    </div>
  );
}
