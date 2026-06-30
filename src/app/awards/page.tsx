'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';

export default function AwardsPage() {
  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [parsedAwards, setParsedAwards] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/DATA/11_awards.json').then(res => res.json()),
      fetch('/DATA/17_images.json').then(res => res.json())
    ]).then(([awardsData, imgData]) => {
      setData(awardsData);
      setImages(imgData.portraits || []); 
      
      // Parse the complex 11_awards.json into a flat list for the UI
      const parsed: any[] = [];
      
      if (awardsData.ballon_dor) {
        parsed.push({ name: "Ballon d'Or", count: awardsData.ballon_dor.overview.total_titles, details: awardsData.ballon_dor.titles.map((t:any) => t.year).join(', ') });
      }
      
      if (awardsData.fifa_awards) {
        parsed.push({ name: "FIFA World Player of the Year", count: awardsData.fifa_awards.fifa_world_player_of_the_year.titles, details: awardsData.fifa_awards.fifa_world_player_of_the_year.years.join(', ') });
        parsed.push({ name: "FIFA Ballon d'Or", count: awardsData.fifa_awards.fifa_ballon_dor.titles, details: awardsData.fifa_awards.fifa_ballon_dor.years.join(', ') });
        parsed.push({ name: "The Best FIFA Men's Player", count: awardsData.fifa_awards.the_best_fifa_mens_player.titles, details: awardsData.fifa_awards.the_best_fifa_mens_player.years.join(', ') });
        parsed.push({ name: "FIFPRO World 11", count: awardsData.fifa_awards.fifa_fifpro_world11.appearances, details: 'Record 17 Selections' });
        parsed.push({ name: "FIFA World Cup Golden Ball", count: awardsData.fifa_awards.fifa_world_cup_awards.golden_ball.titles, details: awardsData.fifa_awards.fifa_world_cup_awards.golden_ball.years.join(', ') });
        parsed.push({ name: "FIFA World Cup Player of the Match", count: awardsData.fifa_awards.fifa_world_cup_awards.player_of_the_match.awards, details: 'Most in World Cup History' });
        parsed.push({ name: "Club World Cup Golden Ball", count: awardsData.fifa_awards.fifa_club_world_cup.golden_ball.titles, details: awardsData.fifa_awards.fifa_club_world_cup.golden_ball.years.join(', ') });
        parsed.push({ name: "U-20 World Cup Golden Ball", count: awardsData.fifa_awards.fifa_u20_world_cup.golden_ball.titles, details: '2005' });
      }

      if (awardsData.uefa_awards) {
        parsed.push({ name: "UEFA Best Player in Europe", count: awardsData.uefa_awards.uefa_best_player_in_europe.titles, details: awardsData.uefa_awards.uefa_best_player_in_europe.years.join(', ') });
        parsed.push({ name: "UEFA Club Footballer of the Year", count: awardsData.uefa_awards.uefa_club_footballer_of_the_year.titles, details: '2009' });
        parsed.push({ name: "Champions League Top Scorer", count: awardsData.uefa_awards.uefa_champions_league_top_scorer.titles, details: '6 Seasons' });
        parsed.push({ name: "UEFA Team of the Year", count: awardsData.uefa_awards.uefa_team_of_the_year.selections, details: '12 Selections' });
      }

      if (awardsData.domestic_league_awards) {
        parsed.push({ name: "Pichichi Trophy", count: awardsData.domestic_league_awards.pichichi_trophy.titles, details: 'Record 8 Titles' });
        parsed.push({ name: "European Golden Shoe", count: awardsData.domestic_league_awards.european_golden_shoe.titles, details: 'Record 6 Titles' });
        parsed.push({ name: "La Liga Best Player", count: awardsData.domestic_league_awards.la_liga_mvp.titles, details: '9 Titles' });
        parsed.push({ name: "La Liga Best Forward", count: awardsData.domestic_league_awards.la_liga_best_forward.titles, details: '7 Titles' });
        parsed.push({ name: "MLS Most Valuable Player", count: awardsData.domestic_league_awards.major_league_soccer.most_valuable_player.titles, details: '2024' });
      }

      if (awardsData.international_tournament_awards) {
        parsed.push({ name: "Copa América Best Player", count: awardsData.international_tournament_awards.copa_america.best_player.titles, details: awardsData.international_tournament_awards.copa_america.best_player.years.join(', ') });
        parsed.push({ name: "Copa América Golden Boot", count: awardsData.international_tournament_awards.copa_america.golden_boot.titles, details: '2021' });
        parsed.push({ name: "Olympic Gold Medal", count: awardsData.international_tournament_awards.olympic_games.gold_medal.titles, details: '2008' });
      }

      setParsedAwards(parsed);
    });
  }, []);

  if (!data) return <div className="min-h-screen bg-[#050608]" />;

  // Chunk the awards array for Zig-Zag layout (e.g., 4 awards per section)
  const chunkSize = 4;
  const chunks = [];
  for (let i = 0; i < parsedAwards.length; i += chunkSize) {
    chunks.push(parsedAwards.slice(i, i + chunkSize));
  }

  return (
    <div className="bg-[#050608] min-h-screen text-neutral-300 overflow-x-hidden">
      <Header />
      
      {/* AWARDS HERO */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h2 className="text-gold-gradient uppercase tracking-[0.4em] text-xs font-semibold mb-4">Individual Honors</h2>
            <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
              PEERLESS <br/> <span className="text-outline">EXCELLENCE</span>
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              A record-breaking 8 Ballon d'Or awards and countless individual accolades cementing his status as the best to ever play the game.
            </p>
          </motion.div>
        </div>
        
        {/* Hero Portrait */}
        <div className="w-full md:w-1/2 relative h-[600px] rounded-full overflow-hidden border-2 border-white/5 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
           <Image 
             src={images[0] || '/images/Portraits/dramatic-lighting.jpeg'} 
             alt="Award Winner" 
             fill 
             sizes="(max-width: 768px) 100vw, 50vw" 
             className="object-cover object-[center_15%] grayscale hover:grayscale-0 transition-all duration-1000" 
             priority 
           />
        </div>
      </section>

      {/* SCATTERED ZIG-ZAG AWARDS LAYOUT */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
        <div className="text-center mb-12 border-b border-white/10 pb-16">
          <h3 className="font-cinzel text-4xl md:text-5xl text-white mb-4 uppercase tracking-widest">The Collection</h3>
          <p className="text-neutral-500 uppercase tracking-widest text-sm">A legacy of unprecedented individual dominance</p>
        </div>

        {chunks.map((chunk, chunkIndex) => {
          // Determine if section is even or odd for Zig-Zag
          const isEven = chunkIndex % 2 === 0;
          // Offset image index by 1 to skip the hero image. Use modulo to wrap around if we run out of portraits.
          const imageIndex = (chunkIndex + 1) % Math.max(1, images.length);
          const imageSrc = images[imageIndex] || '/images/Portraits/serious-face.jpeg';

          return (
            <div key={chunkIndex} className="flex flex-col lg:flex-row gap-16 items-center">
              
              {/* Text/Awards Column */}
              <div className={`w-full lg:w-1/2 space-y-6 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                {chunk.map((award: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="flex justify-between items-center p-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-500 hover:scale-[1.02] shadow-xl group"
                  >
                    <div>
                      <span className="text-2xl font-cinzel text-white group-hover:text-gold-gradient transition-colors capitalize">{award.name}</span>
                      <p className="text-sm text-neutral-400 uppercase tracking-widest mt-2 leading-relaxed">{award.details}</p>
                    </div>
                    <span className="text-5xl font-cinzel text-[#D4AF37] font-bold drop-shadow-lg">{award.count}</span>
                  </motion.div>
                ))}
              </div>

              {/* Scattered Image Column */}
              <div className={`w-full lg:w-1/2 ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative h-[500px] md:h-[700px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] group"
                >
                  <Image 
                    src={imageSrc} 
                    alt={`Scattered portrait ${chunkIndex}`} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 50vw" 
                    className="object-cover object-[center_15%] opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 grayscale hover:grayscale-0" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </motion.div>
              </div>

            </div>
          );
        })}
      </section>

      <FooterSection />
    </div>
  );
}
