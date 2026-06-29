'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CareerStatistics } from '@/types/messi';
import CountUp from '../CountUp';
import SpotlightCard from '../SpotlightCard';

export default function StatsDashboardSection() {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/DATA/09_statistics.json')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load stats data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !stats) {
    return (
      <div className="h-96 flex items-center justify-center bg-black text-neutral-500">
        Loading Statistics...
      </div>
    );
  }

  const { official, club, international, captain, shooting, disciplinary_record } = stats.career_totals;

  const keyMetrics = [
    { title: 'Official Matches', value: official.matches, suffix: '' },
    { title: 'Career Goals', value: official.goals, suffix: '', gradient: 'text-gold-gradient' },
    { title: 'Career Assists', value: official.assists, suffix: '' },
    { title: 'Goal Contributions', value: official.goal_contributions, suffix: '' },
  ];

  return (
    <section className="relative min-h-screen w-full bg-black py-24 px-6 md:px-12 flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            The Historical Numbers
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white">
            STATS DASHBOARD
          </h2>
          <div className="h-[1px] w-24 bg-gold mt-4 mx-auto" />
        </div>

        {/* Major Counters Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {keyMetrics.map((m) => (
            <SpotlightCard
              key={m.title}
              spotlightColor="rgba(212, 175, 55, 0.12)"
              className="text-center p-6 border border-white/5"
            >
              <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-3">
                {m.title}
              </h3>
              <CountUp
                end={m.value}
                suffix={m.suffix}
                className={`font-cinzel text-4xl sm:text-6xl font-extrabold tracking-tight ${
                  m.gradient || 'text-white'
                }`}
              />
            </SpotlightCard>
          ))}
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Club vs International Comparison */}
          <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.05)" className="p-8">
            <h3 className="font-cinzel text-xl font-bold text-white mb-8 tracking-wide">
              Club vs. International Ratio
            </h3>
            <div className="space-y-6">
              {/* Goals Ratio */}
              <div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-neutral-400 mb-2">
                  <span>Goals</span>
                  <span className="font-semibold text-white">
                    {club.goals} Club / {international.goals} Int
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden flex border border-white/5">
                  <div
                    style={{ width: `${(club.goals / official.goals) * 100}%` }}
                    className="h-full bg-gold transition-all duration-1000"
                  />
                  <div
                    style={{ width: `${(international.goals / official.goals) * 100}%` }}
                    className="h-full bg-argentine transition-all duration-1000"
                  />
                </div>
              </div>

              {/* Matches Ratio */}
              <div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-neutral-400 mb-2">
                  <span>Matches</span>
                  <span className="font-semibold text-white">
                    {club.matches} Club / {international.matches} Int
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden flex border border-white/5">
                  <div
                    style={{ width: `${(club.matches / official.matches) * 100}%` }}
                    className="h-full bg-gold transition-all duration-1000"
                  />
                  <div
                    style={{ width: `${(international.matches / official.matches) * 100}%` }}
                    className="h-full bg-argentine transition-all duration-1000"
                  />
                </div>
              </div>

              {/* Assists Ratio */}
              <div>
                <div className="flex justify-between text-xs uppercase tracking-widest text-neutral-400 mb-2">
                  <span>Assists</span>
                  <span className="font-semibold text-white">
                    {club.assists} Club / {international.assists} Int
                  </span>
                </div>
                <div className="w-full h-3 bg-neutral-900 rounded-full overflow-hidden flex border border-white/5">
                  <div
                    style={{ width: `${(club.assists / official.assists) * 100}%` }}
                    className="h-full bg-gold transition-all duration-1000"
                  />
                  <div
                    style={{ width: `${(international.assists / official.assists) * 100}%` }}
                    className="h-full bg-argentine transition-all duration-1000"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-6 mt-8 text-xs font-semibold tracking-wider uppercase">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gold" />
                <span className="text-neutral-300">Club</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-argentine" />
                <span className="text-neutral-300">International</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Special Achievements Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Captaincy Stats */}
            <SpotlightCard spotlightColor="rgba(212, 175, 55, 0.1)">
              <h4 className="font-cinzel text-sm uppercase tracking-wider text-gold mb-4 font-bold">
                Armband Leadership
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Captain Matches</span>
                  <span className="text-white font-medium">{captain.matches}</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Wins</span>
                  <span className="text-white font-medium">{captain.wins}</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span className="text-neutral-500">Captain Goals</span>
                  <span className="text-white font-medium">{captain.goals}</span>
                </li>
              </ul>
            </SpotlightCard>

            {/* Shooting & fouls suffered */}
            <SpotlightCard spotlightColor="rgba(116, 172, 223, 0.1)">
              <h4 className="font-cinzel text-sm uppercase tracking-wider text-argentine mb-4 font-bold">
                Shooting & Agility
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-300">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Shot Accuracy</span>
                  <span className="text-white font-medium">{shooting.shot_accuracy_percentage}%</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Conversion Rate</span>
                  <span className="text-white font-medium">{shooting.shot_conversion_percentage}%</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span className="text-neutral-500">Fouls Suffered</span>
                  <span className="text-argentine font-bold">{disciplinary_record.fouls_suffered}</span>
                </li>
              </ul>
            </SpotlightCard>
            
          </div>
        </div>

      </div>
    </section>
  );
}
