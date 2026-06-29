'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Shield, Landmark, Globe, Award } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';

interface TrophyItem {
  name: string;
  count: number;
  team: string;
  category: 'Club' | 'International';
  seasons: string[];
  description: string;
}

export default function TrophyRoomSection() {
  const [filter, setFilter] = useState('all');

  const trophies: TrophyItem[] = [
    {
      name: 'FIFA World Cup',
      count: 1,
      team: 'Argentina',
      category: 'International',
      seasons: ['2022'],
      description: 'The pinnacle of international glory achieved in Qatar.',
    },
    {
      name: 'Copa América',
      count: 2,
      team: 'Argentina',
      category: 'International',
      seasons: ['2021', '2024'],
      description: 'South American continental championship.',
    },
    {
      name: 'UEFA Champions League',
      count: 4,
      team: 'Barcelona',
      category: 'Club',
      seasons: ['2005-06', '2008-09', '2010-11', '2014-15'],
      description: 'Europe\'s elite club championship.',
    },
    {
      name: 'La Liga',
      count: 10,
      team: 'Barcelona',
      category: 'Club',
      seasons: [
        '2004-05', '2005-06', '2008-09', '2009-10', '2010-11',
        '2012-13', '2014-15', '2015-16', '2017-18', '2018-19'
      ],
      description: 'Spanish top division league title.',
    },
    {
      name: 'Copa del Rey',
      count: 7,
      team: 'Barcelona',
      category: 'Club',
      seasons: ['2008-09', '2011-12', '2014-15', '2015-16', '2016-17', '2017-18', '2020-21'],
      description: 'Spanish domestic cup.',
    },
    {
      name: 'Ligue 1',
      count: 2,
      team: 'PSG',
      category: 'Club',
      seasons: ['2021-22', '2022-23'],
      description: 'French top division league title.',
    },
    {
      name: 'Leagues Cup',
      count: 1,
      team: 'Inter Miami',
      category: 'Club',
      seasons: ['2023'],
      description: 'North American leagues cup, Inter Miami\'s first-ever trophy.',
    },
    {
      name: 'MLS Supporters\' Shield',
      count: 1,
      team: 'Inter Miami',
      category: 'Club',
      seasons: ['2024'],
      description: 'Awarded to the MLS team with the best regular season record.',
    },
    {
      name: 'FIFA Club World Cup',
      count: 3,
      team: 'Barcelona',
      category: 'Club',
      seasons: ['2009', '2011', '2015'],
      description: 'Global club championship.',
    },
    {
      name: 'UEFA Super Cup',
      count: 3,
      team: 'Barcelona',
      category: 'Club',
      seasons: ['2009', '2011', '2015'],
      description: 'Annual match between Champions League and Europa League winners.',
    },
    {
      name: 'Supercopa de España',
      count: 8,
      team: 'Barcelona',
      category: 'Club',
      seasons: ['2005', '2006', '2009', '2010', '2011', '2013', '2016', '2018'],
      description: 'Spanish domestic super cup.',
    },
    {
      name: 'Finalissima',
      count: 1,
      team: 'Argentina',
      category: 'International',
      seasons: ['2022'],
      description: 'CONMEBOL-UEFA Cup of Champions.',
    },
    {
      name: 'Olympic Gold Medal',
      count: 1,
      team: 'Argentina',
      category: 'International',
      seasons: ['2008'],
      description: 'Summer Olympic games football champion.',
    },
    {
      name: 'Trophée des Champions',
      count: 1,
      team: 'PSG',
      category: 'Club',
      seasons: ['2022'],
      description: 'French domestic super cup.',
    },
    {
      name: 'FIFA U-20 World Cup',
      count: 1,
      team: 'Argentina',
      category: 'International',
      seasons: ['2005'],
      description: 'World youth championship.',
    }
  ];

  const filteredTrophies = trophies.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'barcelona') return t.team === 'Barcelona';
    if (filter === 'argentina') return t.team === 'Argentina';
    if (filter === 'psg') return t.team === 'PSG';
    if (filter === 'miami') return t.team === 'Inter Miami';
    return true;
  });

  const categories = [
    { id: 'all', label: 'All Trophies' },
    { id: 'barcelona', label: 'FC Barcelona' },
    { id: 'argentina', label: 'Argentina' },
    { id: 'psg', label: 'PSG' },
    { id: 'miami', label: 'Inter Miami' },
  ];

  return (
    <section className="relative min-h-screen w-full bg-black py-24 px-6 md:px-12 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            The Golden Cabinet
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white">
            THE TROPHY ROOM
          </h2>
          <div className="h-[1px] w-24 bg-gold mt-4 mx-auto" />
        </div>

        {/* Overview Stats Summary */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16 text-center">
          <div className="p-4 rounded-xl bg-neutral-950 border border-white/5">
            <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold block mb-1">
              Total Titles
            </span>
            <span className="font-cinzel text-2xl sm:text-4xl font-extrabold text-gold">46</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950 border border-white/5">
            <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold block mb-1">
              Club Titles
            </span>
            <span className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white">39</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-950 border border-white/5">
            <span className="text-neutral-500 text-[10px] uppercase tracking-wider font-semibold block mb-1">
              National
            </span>
            <span className="font-cinzel text-2xl sm:text-4xl font-extrabold text-argentine">7</span>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                filter === c.id
                  ? 'bg-gold text-black glow-shadow-gold font-bold'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Trophy Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTrophies.map((t, idx) => (
              <motion.div
                key={t.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <SpotlightCard
                  spotlightColor={
                    t.category === 'International'
                      ? 'rgba(116, 172, 223, 0.12)'
                      : 'rgba(212, 175, 55, 0.12)'
                  }
                  className="h-full flex flex-col justify-between p-6 hover:border-gold/30"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-2.5 py-1 rounded text-[9px] uppercase tracking-widest font-bold ${
                        t.category === 'International'
                          ? 'bg-argentine/10 text-argentine border border-argentine/20'
                          : 'bg-gold/10 text-gold border border-gold/20'
                      }`}>
                        {t.team}
                      </span>
                      <div className="flex items-center gap-1 text-gold">
                        <Trophy className="w-4 h-4 fill-gold/10" />
                        <span className="font-cinzel text-lg font-extrabold">x{t.count}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-cinzel text-lg font-bold text-white mb-2 leading-snug">
                      {t.name}
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                      {t.description}
                    </p>
                  </div>

                  {/* Seasons list tag */}
                  <div className="border-t border-white/5 pt-4 mt-2">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">
                      Winning Seasons / Years
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {t.seasons.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded bg-neutral-900 border border-white/5 text-[10px] text-neutral-300 font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
