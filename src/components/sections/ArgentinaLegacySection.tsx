'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NationalTeamData } from '@/types/messi';
import { Shield, Sparkles, Award, Star } from 'lucide-react';
import SpotlightCard from '../SpotlightCard';

export default function ArgentinaLegacySection() {
  const [argentina, setArgentina] = useState<NationalTeamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/DATA/08_argentina.json')
      .then((res) => res.json())
      .then((data) => {
        setArgentina(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load Argentina data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !argentina) {
    return (
      <div className="h-96 flex items-center justify-center bg-black text-neutral-500">
        Loading Argentina Legacy...
      </div>
    );
  }

  const { national_team, career } = argentina;

  const triumphs = [
    {
      title: 'FIFA World Cup 2022',
      year: '2022',
      location: 'Qatar',
      description: 'The ultimate crowning glory. Scored 7 goals (including 2 in the final), won the Golden Ball, and brought Argentina its 3rd World Cup star after a historic final against France.',
    },
    {
      title: 'Copa América 2021 & 2024',
      year: '2021 / 2024',
      location: 'Brazil / USA',
      description: 'Ended a 28-year national trophy drought in 2021 at the Maracanã. Defended the title in 2024, cementing Argentina as the dominant force in South American football.',
    },
    {
      title: 'CONMEBOL–UEFA Cup of Champions',
      year: '2022',
      location: 'Wembley, London',
      description: 'The Finalissima. Delivered an MVP performance, providing 2 assists to lead Argentina to a spectacular 3-0 victory over Euro champions Italy.',
    },
    {
      title: 'Olympic Gold Medal',
      year: '2008',
      location: 'Beijing, China',
      description: 'An early taste of glory on the international stage. Provided the crucial assist to Ángel Di María in the final to claim Olympic Gold.',
    },
  ];

  return (
    <section className="relative min-h-screen w-full bg-black py-24 px-6 md:px-12 flex flex-col justify-center border-t border-white/5 overflow-hidden">
      {/* Light Argentine Blue Glow Spotlight Behind Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-argentine/5 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto w-full relative">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-argentine font-semibold mb-2 block">
            The Albiceleste Legacy
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white">
            ARGENTINA GLORY
          </h2>
          <div className="h-[1px] w-24 bg-argentine mt-4 mx-auto" />
        </div>

        {/* Intro Grid: Stats and Story */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          {/* General Stats Card */}
          <div className="lg:col-span-1">
            <SpotlightCard spotlightColor="rgba(116, 172, 223, 0.15)">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-argentine" />
                <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">
                  La Selección Profile
                </h3>
              </div>
              <div className="space-y-4 text-sm font-sans">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Official Association</span>
                  <span className="text-white text-right text-xs max-w-[180px] font-medium">
                    {national_team.association}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Senior Debut</span>
                  <span className="text-white font-medium">{national_team.senior_debut}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Years Active</span>
                  <span className="text-argentine font-bold">{national_team.years} Years</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-400">Captain Since</span>
                  <span className="text-white font-medium">2011</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-neutral-400">Dominant Role</span>
                  <span className="text-white font-medium">{career.positions[0]}</span>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Core Story Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative p-8 rounded-2xl border border-argentine/10 bg-neutral-950/60 backdrop-blur-md">
              <div className="absolute top-4 right-4 flex gap-1">
                <Star className="w-4 h-4 text-argentine fill-argentine" />
                <Star className="w-4 h-4 text-argentine fill-argentine" />
                <Star className="w-4 h-4 text-argentine fill-argentine" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-argentine" />
                Three-Star Champions
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                No journey in football has been as emotionally charged as Lionel Messi's relationship with 
                Argentina. From early heartbreak in consecutive finals to his brief retirement in 2016, 
                he persisted under manager Lionel Scaloni to orchestrate one of the most successful international 
                periods in modern football history.
              </p>
              <p className="text-neutral-400 text-xs italic">
                "Winning the World Cup was the dream I had since I was a child. I was able to achieve everything 
                with my club, and completing it with the national team was the ultimate prize."
              </p>
            </div>
          </div>
        </div>

        {/* Triumphs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {triumphs.map((t, idx) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <SpotlightCard spotlightColor="rgba(116, 172, 223, 0.12)" className="h-full flex flex-col justify-between p-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold font-mono tracking-widest text-argentine uppercase">
                      {t.year}
                    </span>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">
                      {t.location}
                    </span>
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold" />
                    {t.title}
                  </h4>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {t.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
