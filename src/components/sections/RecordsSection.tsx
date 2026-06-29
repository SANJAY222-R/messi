'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trophy, Medal, Star, Flame } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';

interface RecordItem {
  id: string;
  title: string;
  value: string;
  category: 'World' | 'League' | 'Club' | 'Country' | 'World Cup';
  details: string;
  featured?: boolean;
}

export default function RecordsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const records: RecordItem[] = [
    {
      id: 'rec_01',
      title: 'Most Trophies in Football History',
      value: '46 Trophies',
      category: 'World',
      details: 'Holds the official world record for the most collective trophies won by a professional footballer, completing the tally with the 2024 Copa América.',
      featured: true,
    },
    {
      id: 'rec_02',
      title: 'Most Goals in a Calendar Year',
      value: '91 Goals',
      category: 'World',
      details: 'Scored 91 official goals in 2012 for Barcelona and Argentina in just 69 games, breaking Gerd Müller\'s previous world record of 85 goals.',
      featured: true,
    },
    {
      id: 'rec_03',
      title: 'Most Goals for a Single Club',
      value: '672 Goals',
      category: 'World',
      details: 'Scored 672 official goals in 778 appearances for FC Barcelona, surpassing Pelé\'s record of 643 goals for Santos.',
      featured: true,
    },
    {
      id: 'rec_04',
      title: 'Most Ballon d\'Or Awards',
      value: '8 Awards',
      category: 'World',
      details: 'Only player in football history to win 8 Ballon d\'Or titles (2009, 2010, 2011, 2012, 2015, 2019, 2021, 2023).',
      featured: true,
    },
    {
      id: 'rec_05',
      title: 'Most Goals in a Single Season',
      value: '73 Goals',
      category: 'World',
      details: 'Scored 73 goals in 60 games for FC Barcelona in the 2011-12 season across all club competitions.',
    },
    {
      id: 'rec_06',
      title: 'Most European Golden Shoes',
      value: '6 Awards',
      category: 'World',
      details: 'Holds the record for the most European Golden Shoe trophies, representing Europe\'s top league scorer.',
    },
    {
      id: 'rec_07',
      title: 'All-Time Top Scorer in La Liga',
      value: '474 Goals',
      category: 'League',
      details: 'Scored 474 goals in 520 matches in La Liga for FC Barcelona, the all-time record for the Spanish first division.',
    },
    {
      id: 'rec_08',
      title: 'All-Time Assist Leader in La Liga',
      value: '192 Assists',
      category: 'League',
      details: 'Provided 192 assists in La Liga matches, the highest count ever recorded in the history of Spanish league football.',
    },
    {
      id: 'rec_09',
      title: 'All-Time Top Scorer for Argentina',
      value: '112 Goals',
      category: 'Country',
      details: 'Argentina\'s all-time leading goalscorer, surpassing Gabriel Batistuta (54 goals) in 2016.',
    },
    {
      id: 'rec_10',
      title: 'Most Caps for Argentina',
      value: '197 Appearances',
      category: 'Country',
      details: 'The most-capped player in the history of the Argentine Football Association (AFA).',
    },
    {
      id: 'rec_11',
      title: 'Most FIFA World Cup Appearances',
      value: '26 Matches',
      category: 'World Cup',
      details: 'Passed Lothar Matthäus (25) at the 2022 World Cup Final in Qatar to become the player with the most appearances in World Cup finals.',
    },
    {
      id: 'rec_12',
      title: 'Most World Cup Player of the Match Awards',
      value: '14 Awards',
      category: 'World Cup',
      details: 'Holds the record for the most Player of the Match awards received in FIFA World Cup history.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Records' },
    { id: 'World', label: 'World Records' },
    { id: 'League', label: 'League (La Liga)' },
    { id: 'Club', label: 'Club (Barcelona)' },
    { id: 'Country', label: 'Country (Argentina)' },
    { id: 'World Cup', label: 'World Cup' },
  ];

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.value.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative min-h-screen w-full bg-black py-24 px-6 md:px-12 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            The History Maker
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white">
            LEGENDARY RECORDS
          </h2>
          <div className="h-[1px] w-24 bg-gold mt-4 mx-auto" />
        </div>

        {/* Search and Filters Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Search Input */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search records (e.g. 91 goals, World Cup)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-950/80 border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-gold/50 transition-colors font-sans"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                  activeCategory === c.id
                    ? 'bg-gold text-black font-bold glow-shadow-gold'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Records Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredRecords.map((r, idx) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={r.featured ? 'md:col-span-2' : ''}
              >
                <SpotlightCard
                  spotlightColor={r.featured ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.05)'}
                  className={`h-full flex flex-col md:flex-row gap-6 p-6 sm:p-8 hover:border-gold/20 ${
                    r.featured ? 'border border-gold/30 bg-neutral-950/80' : ''
                  }`}
                >
                  {/* Left part: Value badge */}
                  <div className="flex flex-col justify-center items-center md:items-start flex-shrink-0 md:w-48 text-center md:text-left border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-6">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2 flex items-center gap-1">
                      {r.category === 'World' && <Flame className="w-3.5 h-3.5 text-gold fill-gold/10" />}
                      {r.category} Record
                    </span>
                    <h3 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-gold-gradient leading-tight tracking-tight">
                      {r.value}
                    </h3>
                  </div>

                  {/* Right part: Description */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-cinzel text-lg font-bold text-white mb-2 tracking-wide">
                      {r.title}
                    </h4>
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                      {r.details}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-16 text-neutral-500 text-sm font-sans">
            No records match your search query.
          </div>
        )}

      </div>
    </section>
  );
}
