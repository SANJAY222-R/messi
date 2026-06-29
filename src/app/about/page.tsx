'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function AboutPage() {
  const [personal, setPersonal] = useState<any>(null);
  const [family, setFamily] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/01_personal.json').then(res => res.json()),
      fetch('/DATA/02_family.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([p, f, imgs]) => {
      setPersonal(p);
      setFamily(f);
      setImages(imgs.portraits || []);
    });
  }, []);

  if (!personal || !family) {
    return <div ref={containerRef} className="min-h-screen bg-[#050608]" />;
  }

  return (
    <div ref={containerRef} className="bg-[#050608] min-h-screen text-neutral-300">
      <Header />
      
      {/* EDITORIAL HERO */}
      <section className="relative pt-40 pb-20 px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h2 className="text-accent-blue uppercase tracking-[0.4em] text-xs font-semibold mb-4">The Biography</h2>
            <h1 className="font-cinzel text-6xl md:text-8xl font-bold text-white leading-tight mb-8">
              THE MAN <br/> <span className="text-outline">BEHIND THE</span> <br/> LEGEND
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed max-w-md">
              Beyond the trophies and the records lies a deeply rooted family man whose story begins in Rosario.
            </p>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 relative h-[70vh] rounded-2xl overflow-hidden border border-white/10">
          <motion.div style={{ y: yParallax }} className="absolute inset-0 h-[120%] -top-[10%]">
            <Image src={images[0] || ''} alt="Messi Portrait" fill sizes="50vw" className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" priority />
          </motion.div>
        </div>
      </section>

      {/* ZIG-ZAG SCATTERED EDITORIAL */}
      {/* This section replaces the CategoryGallery dump by interleaving 10+ portrait images seamlessly into the biography text */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto space-y-32">
        
        {/* Personal Details Block */}
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="w-full md:w-1/2 order-2 md:order-1">
            <h3 className="font-cinzel text-4xl text-white mb-8 border-b border-white/10 pb-4">Personal Details</h3>
            <ul className="space-y-6">
              {Object.entries(personal.personal_details || {}).map(([k, v]) => (
                <li key={k} className="flex justify-between items-end group">
                  <span className="text-xs uppercase tracking-widest text-neutral-500 group-hover:text-accent-blue transition-colors">{k.replace(/_/g, ' ')}</span>
                  <span className="text-lg text-white font-medium text-right">{String(v)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <div className="w-full md:w-1/2 order-1 md:order-2 grid grid-cols-2 gap-4">
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-64 md:h-96 rounded-xl overflow-hidden mt-12">
                <Image src={images[1] || ''} alt="Portrait" fill sizes="25vw" className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                <Image src={images[2] || ''} alt="Portrait" fill sizes="25vw" className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
             </motion.div>
          </div>
        </div>

        {/* Family Tree Block */}
        <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="w-full md:w-1/2 order-2 md:order-1">
            <h3 className="font-cinzel text-4xl text-white mb-8 border-b border-white/10 pb-4">Family Tree</h3>
            <div className="space-y-12">
               <div>
                 <span className="text-xs uppercase tracking-widest text-accent-blue block mb-4">Spouse</span>
                 <p className="text-3xl font-cinzel text-white">{family.family?.spouse?.name}</p>
                 <p className="text-sm text-neutral-500 uppercase tracking-widest mt-2">Married {family.family?.spouse?.marriage_year}</p>
               </div>
               <div>
                 <span className="text-xs uppercase tracking-widest text-accent-blue block mb-4">Children</span>
                 <div className="flex flex-col gap-6">
                   {family.family?.children?.map((child: any, idx: number) => (
                     <div key={idx} className="flex items-center gap-4 border-l border-white/10 pl-6">
                       <span className="text-2xl font-cinzel text-white">{child.name}</span>
                       <span className="text-xs text-neutral-500 uppercase tracking-widest">Born {child.birth_year}</span>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </motion.div>
          <div className="w-full md:w-1/2 order-1 md:order-2 grid grid-cols-2 gap-4">
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-64 md:h-96 rounded-xl overflow-hidden mt-12">
                <Image src={images[3] || ''} alt="Portrait" fill sizes="25vw" className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                <Image src={images[4] || ''} alt="Portrait" fill sizes="25vw" className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
             </motion.div>
          </div>
        </div>

        {/* Global Impact Grid */}
        <div className="w-full">
           <h3 className="font-cinzel text-3xl text-center text-white mb-16 uppercase tracking-widest">A Life In Portraits</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {images.slice(5, 9).map((img, i) => (
               <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative aspect-square rounded-lg overflow-hidden group">
                 <Image src={img} alt={`Portrait ${i}`} fill sizes="25vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               </motion.div>
             ))}
           </div>
        </div>

      </section>

      <FooterSection />
    </div>
  );
}
