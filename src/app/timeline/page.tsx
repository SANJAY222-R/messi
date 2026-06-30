'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function TimelinePage() {
  const [groupedEvents, setGroupedEvents] = useState<any[]>([]);
  const [allImages, setAllImages] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/15_timeline.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([timeline, images]) => {
      
      // 1. Flatten all events
      let rawEvents: any[] = [];
      const timelines = [
        timeline.personal_life_timeline?.timeline,
        timeline.barcelona_academy_timeline?.timeline,
        timeline.barcelona_career_timeline?.timeline,
        timeline.psg_career_timeline?.timeline,
        timeline.argentina_career_timeline?.timeline,
        timeline.inter_miami_career_timeline?.timeline
      ];

      timelines.forEach(t => {
        if (t && Array.isArray(t)) {
          rawEvents = [...rawEvents, ...t];
        }
      });

      // 2. Sort chronologically by year (and date if available)
      rawEvents.sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year;
        if (a.date && b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
        return 0;
      });

      // 3. Group by Year
      const grouped: { [year: string]: any[] } = {};
      rawEvents.forEach(ev => {
        const y = ev.year || 'Unknown';
        if (!grouped[y]) grouped[y] = [];
        grouped[y].push(ev);
      });

      const finalGrouped = Object.keys(grouped).sort().map(year => ({
        year,
        events: grouped[year]
      }));

      setGroupedEvents(finalGrouped);

      // 4. Flatten all images
      let imgList: string[] = [];
      const categories = ['childhood', 'barcelona', 'argentina', 'psg', 'interMiami', 'goals', 'trophies', 'portraits', 'wallpapers'];
      categories.forEach(cat => {
        if (images[cat] && Array.isArray(images[cat])) {
          imgList = [...imgList, ...images[cat]];
        }
      });
      setAllImages(imgList);

    });
  }, []);

  if (groupedEvents.length === 0 || allImages.length === 0) {
    return <div ref={containerRef} className="min-h-screen bg-[#050608]" />;
  }

  return (
    <div ref={containerRef} className="relative bg-[#050608] min-h-[400vh] text-white font-sans selection:bg-[#F6B40E] selection:text-black">
      <Header />

      {/* HERO SECTION */}
      <section className="relative h-[80vh] w-full flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
        {/* Massive Ambient Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={allImages[0] || '/images/Wallpapers/dark-wallpaper.jpg'} 
            alt="Timeline Hero" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 grayscale blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/80 via-[#050608]/60 to-[#050608]" />
        </div>
        
        <div className="relative z-10 text-center">
          <h3 className="text-[#F6B40E] uppercase tracking-[0.8em] text-sm font-bold mb-6">
            The Complete History
          </h3>
          <h1 className="font-cinzel text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-widest text-white uppercase leading-none drop-shadow-2xl">
            LEGACY
          </h1>
          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-[7rem] font-bold tracking-widest text-transparent uppercase leading-none mt-2" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
            1987 — PRESENT
          </h1>
        </div>
      </section>

      {/* TIMELINE MUSEUM */}
      <div className="relative w-full max-w-[1600px] mx-auto px-6 md:px-12 py-32">
        
        {groupedEvents.map((group, groupIndex) => (
          <div key={group.year} className="relative w-full flex flex-col lg:flex-row gap-16 mb-40 last:mb-0 items-start">
            
            {/* STICKY YEAR DISPLAY */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-32 z-20 flex flex-col pt-4">
              <h2 className="font-cinzel text-[8rem] md:text-[12rem] font-black leading-none text-white/5 tracking-tighter absolute -top-10 -left-10 z-0 pointer-events-none select-none">
                {group.year}
              </h2>
              <h2 className="relative z-10 font-cinzel text-6xl md:text-8xl font-bold text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30">
                {group.year}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#F6B40E] to-transparent mt-4 mb-8" />
              <p className="text-white/40 uppercase tracking-widest font-mono text-sm">
                {group.events.length} {group.events.length === 1 ? 'Event' : 'Events'} Recorded
              </p>
            </div>

            {/* EVENTS GRID FOR THE YEAR */}
            <div className="w-full lg:w-2/3 flex flex-col gap-12 z-10">
              {group.events.map((event: any, i: number) => {
                
                // Deterministically grab an image from the massive pool of 117 images
                // Offset by groupIndex and i to ensure variety
                const imgIndex = (groupIndex * 7 + i * 3) % allImages.length;
                const eventImg = allImages[imgIndex];
                
                // Only show image for some events so it doesn't get completely overwhelming
                // Or show for all if we want extreme visuals. Let's show for most (2 out of 3).
                const showImage = i % 3 !== 2;

                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative bg-[#0a0c10]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl group hover:border-white/30 transition-all duration-500"
                  >
                    
                    {/* OPTIONAL IMAGE FOR EVENT */}
                    {showImage && eventImg && (
                      <div className="relative w-full mb-8 rounded-xl overflow-hidden shadow-lg border border-white/5 bg-[#0a0c10] flex justify-center items-center">
                        <img 
                          src={eventImg} 
                          alt={event.title} 
                          className="w-full h-auto max-h-[600px] object-contain opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700" 
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/20 to-transparent pointer-events-none" />
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#F6B40E] transition-colors">{event.title}</h3>
                      {event.date && (
                        <span className="text-[#F6B40E] font-mono tracking-widest text-sm whitespace-nowrap bg-[#F6B40E]/10 px-3 py-1 rounded">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-[#cbd5e1] text-lg leading-relaxed mb-6 font-light">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {event.category && <span className="px-3 py-1 bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/70 rounded-full">{event.category}</span>}
                      {event.club && <span className="px-3 py-1 bg-[#A50044]/20 border border-[#A50044]/50 text-xs uppercase tracking-widest text-white/90 rounded-full">{event.club}</span>}
                      {event.competition && <span className="px-3 py-1 bg-[#43A1D5]/20 border border-[#43A1D5]/50 text-xs uppercase tracking-widest text-white/90 rounded-full">{event.competition}</span>}
                      {event.team && <span className="px-3 py-1 bg-white/10 border border-white/20 text-xs uppercase tracking-widest text-white/90 rounded-full">{event.team}</span>}
                    </div>

                  </motion.div>
                )
              })}
            </div>

          </div>
        ))}
      </div>

      <FooterSection />
    </div>
  );
}
