'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClubData } from '@/types/messi';
import { Landmark, Trophy, Calendar, Shirt } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';

interface ClubProfile {
  id: string;
  name: string;
  accentColor: string;
  spotlightColor: string;
  dataUrl: string;
  summary: string;
  highlights: string[];
}

export default function ClubShowcaseSection() {
  const [activeTab, setActiveTab] = useState('fc-barcelona');
  const [clubData, setClubData] = useState<Record<string, ClubData>>({});
  const [loading, setLoading] = useState(true);

  const clubs: ClubProfile[] = [
    {
      id: 'fc-barcelona',
      name: 'FC Barcelona',
      accentColor: 'text-[#004D98]', // Blaugrana Blue
      spotlightColor: 'rgba(0, 77, 152, 0.15)',
      dataUrl: '/DATA/05_barcelona.json',
      summary: 'The Golden Era. Spanning 21 years from a child in La Masia to the greatest player in history. With 672 official goals, 35 trophies, and unparalleled magic at Camp Nou.',
      highlights: ['Historic Sextuple in 2009', 'Two Trebles (2009, 2015)', '672 Goals in 778 Matches'],
    },
    {
      id: 'paris-saint-germain',
      name: 'Paris Saint-Germain',
      accentColor: 'text-[#E51B24]', // Rouge et Bleu
      spotlightColor: 'rgba(229, 27, 36, 0.12)',
      dataUrl: '/DATA/06_psg.json',
      summary: 'A new chapter in the French Capital. Partnering with elite players to secure consecutive Ligue 1 titles and bringing global prestige to the Parc des Princes.',
      highlights: ['2x Ligue 1 Champion', '1x Trophée des Champions', '32 Goals & 35 Assists in 75 Games'],
    },
    {
      id: 'inter-miami-cf',
      name: 'Inter Miami CF',
      accentColor: 'text-[#F49AC2]', // Pink / Vice City
      spotlightColor: 'rgba(244, 154, 194, 0.15)',
      dataUrl: '/DATA/07_inter_miami.json',
      summary: 'Conquering the MLS. Igniting soccer culture in America by winning the Leagues Cup in his first month, securing Inter Miami’s first-ever official trophy.',
      highlights: ['2023 Leagues Cup Champion', 'Supporters Shield 2024', 'Highest merchandise sales in MLS history'],
    },
  ];

  useEffect(() => {
    // Fetch all club data in parallel
    Promise.all(
      clubs.map((c) =>
        fetch(c.dataUrl)
          .then((res) => res.json())
          .then((data) => ({ id: c.id, data }))
      )
    )
      .then((results) => {
        const dataMap: Record<string, ClubData> = {};
        results.forEach((item) => {
          dataMap[item.id] = item.data;
        });
        setClubData(dataMap);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load club data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center bg-black text-neutral-500">
        Loading Club Showcase...
      </div>
    );
  }

  const currentClubProfile = clubs.find((c) => c.id === activeTab)!;
  const currentClubData = clubData[activeTab];

  return (
    <section className="relative min-h-screen w-full bg-black py-24 px-6 md:px-12 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            Domestic Legacies
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white">
            CLUB LEGENDS
          </h2>
          <div className="h-[1px] w-24 bg-gold mt-4 mx-auto" />
        </div>

        {/* Club Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {clubs.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`px-6 py-3 rounded-xl font-cinzel tracking-wider text-sm transition-all duration-300 font-bold ${
                activeTab === c.id
                  ? 'bg-neutral-900 text-white border border-white/20 glow-shadow-gold'
                  : 'bg-transparent text-neutral-500 hover:text-neutral-300 border border-transparent'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Dynamic Display Panel */}
        <AnimatePresence mode="wait">
          {currentClubData && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
            >
              {/* Left Column: Summary */}
              <div className="lg:col-span-2 space-y-6">
                <SpotlightCard
                  spotlightColor={currentClubProfile.spotlightColor}
                  className="p-8 h-full flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-cinzel text-2xl font-bold text-white mb-4">
                      {currentClubData.club.name}
                    </h3>
                    <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                      {currentClubProfile.summary}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-1">
                      Key Highlights
                    </h4>
                    {currentClubProfile.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                        <Trophy className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </div>

              {/* Right Column: Detailed Stats */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Contract / Timeline Card */}
                <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.05)">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-gold" />
                    <h4 className="font-cinzel text-lg font-semibold text-white">Tenure</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-300">
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500">Joined</span>
                      <span className="text-white">
                        {typeof currentClubData.club.joined === 'string'
                          ? currentClubData.club.joined
                          : currentClubData.club.joined.first_team}
                      </span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500">Departed</span>
                      <span className="text-white">{currentClubData.club.left || 'Current'}</span>
                    </li>
                    <li className="flex justify-between pb-1">
                      <span className="text-neutral-500">Total Years</span>
                      <span className="text-gold font-bold">{currentClubData.club.years} Years</span>
                    </li>
                  </ul>
                </SpotlightCard>

                {/* Stadium Card */}
                <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.05)">
                  <div className="flex items-center gap-3 mb-4">
                    <Landmark className="w-5 h-5 text-gold" />
                    <h4 className="font-cinzel text-lg font-semibold text-white">Home Ground</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-neutral-300">
                    <li className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500">Stadium</span>
                      <span className="text-white text-right">{currentClubData.club.stadium.name}</span>
                    </li>
                    <li className="flex justify-between pb-1">
                      <span className="text-neutral-500">Capacity</span>
                      <span className="text-white font-medium">
                        {currentClubData.club.stadium.capacity.toLocaleString()}
                      </span>
                    </li>
                  </ul>
                </SpotlightCard>

                {/* Tactical / Role Card */}
                <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.05)" className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Shirt className="w-5 h-5 text-gold" />
                    <h4 className="font-cinzel text-lg font-semibold text-white">Tactical Role</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {currentClubData.career.positions.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1 rounded bg-neutral-900 border border-white/5 text-xs text-neutral-300"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-white/5 pt-3">
                      <span className="text-neutral-500">Shirt Numbers Worn</span>
                      <span className="text-gold font-bold tracking-widest">
                        {currentClubData.career.shirt_numbers.join(', ')}
                      </span>
                    </div>
                  </div>
                </SpotlightCard>
                
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
