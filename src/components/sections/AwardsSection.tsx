'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Star } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';

export default function AwardsSection() {
  const [awards, setAwards] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/DATA/11_awards.json')
      .then((res) => res.json())
      .then((data) => {
        setAwards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load awards:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !awards) {
    return (
      <div className="h-96 flex items-center justify-center bg-black text-neutral-500">
        Loading Awards...
      </div>
    );
  }

  const { major_awards_summary } = awards.overview;

  const displayAwards = [
    {
      name: "Ballon d'Or",
      count: major_awards_summary.ballon_dor,
      years: ['2009', '2010', '2011', '2012', '2015', '2019', '2021', '2023'],
      description: 'The most prestigious individual award in football. Messi holds the all-time record with 8 historic titles.',
    },
    {
      name: 'European Golden Shoe',
      count: major_awards_summary.european_golden_shoe,
      years: ['2010', '2012', '2013', '2017', '2018', '2019'],
      description: 'Awarded to the top goalscorer in European league matches. Record 6-time winner.',
    },
    {
      name: "The Best FIFA Men's Player",
      count: major_awards_summary.the_best_fifa_mens_player,
      years: ['2019', '2022', '2023'],
      description: 'Global federation individual accolade for the outstanding world player of the year.',
    },
    {
      name: 'Pichichi Trophy',
      count: major_awards_summary.pichichi_trophy,
      years: ['2010', '2012', '2013', '2017', '2018', '2019', '2020', '2021'],
      description: 'Awarded to the top goalscorer in Spain\'s La Liga. All-time record 8-time winner.',
    },
    {
      name: 'FIFA World Cup Golden Ball',
      count: major_awards_summary.world_cup_golden_ball,
      years: ['2014', '2022'],
      description: 'Awarded to the best player of the FIFA World Cup tournament. Only player to win it twice.',
    },
    {
      name: 'Copa América Best Player',
      count: major_awards_summary.copa_america_best_player,
      years: ['2015', '2021'],
      description: 'Awarded to the outstanding player of the South American championship.',
    },
  ];

  return (
    <section className="relative min-h-screen w-full bg-black py-24 px-6 md:px-12 flex flex-col justify-center border-t border-white/5">
      {/* Subtle radial spotlight behind individual awards */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full relative">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-semibold mb-2 block">
            Individual Honours
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white">
            INDIVIDUAL AWARDS
          </h2>
          <div className="h-[1px] w-24 bg-gold mt-4 mx-auto" />
        </div>

        {/* Highlight Quote or Banner */}
        <div className="mb-12 p-8 rounded-2xl border border-gold/20 bg-neutral-950/80 backdrop-blur-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-5">
            <Award className="w-48 h-48 text-gold" />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">
                The Greatest Individual Legacy
              </span>
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white mb-2">
                Unrivaled Accolades Record
              </h3>
              <p className="text-neutral-400 text-sm max-w-2xl">
                Throughout his two-decade career, Lionel Messi has rewritten individual records. From being 
                the only player to win 4 consecutive Ballon d'Or awards to securing the World Cup Golden Ball 
                twice, his individual trophies speak to an era of total dominance.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gold text-black px-6 py-4 rounded-xl font-cinzel font-bold text-lg glow-shadow-gold">
              <Sparkles className="w-5 h-5 fill-black" />
              <span>8x Ballon d'Or King</span>
            </div>
          </div>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAwards.map((a, idx) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
            >
              <SpotlightCard
                spotlightColor="rgba(212, 175, 55, 0.15)"
                className="h-full flex flex-col justify-between p-6 hover:scale-[1.01] hover:border-gold/30"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-gold">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="font-cinzel text-3xl font-extrabold text-gold-gradient">
                      x{a.count}
                    </span>
                  </div>
                  <h4 className="font-cinzel text-lg font-bold text-white mb-2">
                    {a.name}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                    {a.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-2">
                  <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold block mb-2">
                    Years Achieved
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {a.years.map((y) => (
                      <span
                        key={y}
                        className="px-2 py-0.5 rounded bg-neutral-900 border border-white/5 text-[9px] text-neutral-300 font-mono"
                      >
                        {y}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
