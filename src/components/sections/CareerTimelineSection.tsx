'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineEvent } from '@/types/messi';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';

export default function CareerTimelineSection() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Key milestone years we want to curate from the main list of events
  const keyYears = [1987, 2000, 2004, 2005, 2008, 2009, 2012, 2015, 2021, 2022, 2023, 2024];

  useEffect(() => {
    fetch('/DATA/15_timeline.json')
      .then((res) => res.json())
      .then((data) => {
        const allEvents: TimelineEvent[] = data.personal_life_timeline.timeline;
        
        // Filter down to key years, prioritizing the most important title or event for that year
        const filtered = keyYears.map((year) => {
          const yearEvents = allEvents.filter((e) => e.year === year);
          // Prefer football-related events or just take the first one
          const preferred = yearEvents.find((e) => e.category === 'Football') || yearEvents[0];
          return preferred;
        }).filter(Boolean) as TimelineEvent[];

        setEvents(filtered);
        // Find index of 2022 (World Cup) to set it as a nice middle default
        const wcIdx = filtered.findIndex((e) => e.year === 2022);
        setActiveIdx(wcIdx !== -1 ? wcIdx : 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load timeline:', err);
        setLoading(false);
      });
  }, []);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < events.length - 1 ? prev + 1 : prev));
  };

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.children[activeIdx] as HTMLElement;
      if (activeEl) {
        scrollRef.current.scrollTo({
          left: activeEl.offsetLeft - scrollRef.current.clientWidth / 2 + activeEl.clientWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeIdx]);

  if (loading || events.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-black text-neutral-500">
        Loading Timeline...
      </div>
    );
  }

  const activeEvent = events[activeIdx];

  return (
    <section className="relative min-h-screen w-full bg-black py-24 px-6 md:px-12 flex flex-col justify-center border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            The Historical Journey
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white">
            CAREER CHRONICLES
          </h2>
          <div className="h-[1px] w-24 bg-gold mt-4 mx-auto" />
        </div>

        {/* Timeline Horizontal Selector Track */}
        <div className="relative mb-12 select-none">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div
            ref={scrollRef}
            className="flex items-center gap-4 overflow-x-auto py-6 px-12 scrollbar-none snap-x"
            style={{ scrollbarWidth: 'none' }}
          >
            {events.map((e, idx) => (
              <button
                key={e.year}
                onClick={() => setActiveIdx(idx)}
                className={`snap-center flex-shrink-0 px-6 py-3 rounded-full text-sm font-sans tracking-widest uppercase transition-all duration-300 font-bold ${
                  idx === activeIdx
                    ? 'bg-gold text-black glow-shadow-gold scale-105'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {e.year}
              </button>
            ))}
          </div>
        </div>

        {/* Focus Milestone Display Card */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center min-h-[350px]">
          {/* Year Big Display */}
          <div className="md:col-span-2 text-center md:text-left flex flex-col justify-center">
            <motion.h3
              key={`year-${activeEvent.year}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="font-cinzel text-8xl md:text-9xl font-extrabold text-neutral-800 tracking-tighter"
            >
              {activeEvent.year}
            </motion.h3>
            <motion.span
              key={`age-${activeEvent.year}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="text-xs uppercase tracking-[0.25em] text-neutral-400 mt-2 font-mono"
            >
              Age: {activeEvent.age ?? activeEvent.year - 1987} years old
            </motion.span>
          </div>

          {/* Details Card */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${activeEvent.year}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <SpotlightCard
                  spotlightColor={
                    activeEvent.category === 'Football'
                      ? 'rgba(116, 172, 223, 0.15)'
                      : 'rgba(212, 175, 55, 0.15)'
                  }
                  className="p-8 md:p-10 border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-wider text-gold">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span>{activeEvent.category}</span>
                    {activeEvent.club && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-neutral-600" />
                        <span className="text-white">{activeEvent.club}</span>
                      </>
                    )}
                  </div>
                  <h4 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide leading-tight">
                    {activeEvent.title}
                  </h4>
                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                    {activeEvent.description}
                  </p>
                  {activeEvent.location && (
                    <div className="mt-6 text-xs text-neutral-500 uppercase tracking-widest font-mono">
                      Location: {activeEvent.location}
                    </div>
                  )}
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex justify-center md:justify-end gap-4 mt-12">
          <button
            onClick={handlePrev}
            disabled={activeIdx === 0}
            className={`p-3 rounded-full border transition-all duration-300 ${
              activeIdx === 0
                ? 'border-white/5 text-neutral-700 cursor-not-allowed'
                : 'border-white/10 text-white hover:bg-neutral-900 hover:border-white/30'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={activeIdx === events.length - 1}
            className={`p-3 rounded-full border transition-all duration-300 ${
              activeIdx === events.length - 1
                ? 'border-white/5 text-neutral-700 cursor-not-allowed'
                : 'border-white/10 text-white hover:bg-neutral-900 hover:border-white/30'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
