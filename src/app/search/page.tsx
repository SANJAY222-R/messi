'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { Search, Flame, Trophy, Award, Landmark, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import FooterSection from '@/components/sections/FooterSection';
import SpotlightCard from '@/components/SpotlightCard';
import PageHeader from '@/components/PageHeader';

interface SearchItem {
  title: string;
  subtitle: string;
  description: string;
  path: string;
  category: 'Record' | 'Trophy' | 'Club' | 'Country' | 'General';
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [allItems, setAllItems] = useState<SearchItem[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch records and trophies files to dynamically index
    Promise.all([
      fetch('/DATA/12_records.json').then((res) => res.json()).catch(() => ({})),
      fetch('/DATA/10_trophies.json').then((res) => res.json()).catch(() => ({})),
    ])
      .then(([recordsData, trophiesData]) => {
        const indexList: SearchItem[] = [
          // Base Chapters
          { title: 'Rosario Childhood & Early Years', subtitle: 'Biography', description: 'His childhood at Grandoli, Newell\'s Old Boys, and diagnosing growth deficiency.', path: '/childhood', category: 'General' },
          { title: 'FC Barcelona Senior Career', subtitle: 'Blaugrana', description: 'La Masia, Camp Nou debuts, MSN years, 672 goals, and 35 club trophies.', path: '/barcelona', category: 'Club' },
          { title: 'Paris Saint-Germain Tenure', subtitle: 'Ligue 1', description: 'Two seasons in France, two Ligue 1 titles, and Champions League stats.', path: '/psg', category: 'Club' },
          { title: 'Inter Miami CF MLS Journey', subtitle: 'MLS', description: 'Soccer revolution in the USA, Leagues Cup 2023, Supporters Shield 2024.', path: '/inter-miami', category: 'Club' },
          { title: 'Argentina National Team Career', subtitle: 'Albiceleste', description: 'World Cup 2022 champion in Qatar, 2x Copa America titles, 112 international goals.', path: '/argentina', category: 'Country' },
          { title: 'Overall Career Statistics', subtitle: 'Analytics', description: 'Official matches, goals, assists, penalty success ratios, and leadership stats.', path: '/statistics', category: 'General' },
          { title: 'Individual Awards', subtitle: 'Honours', description: '8x Ballon d\'Or, 6x European Golden Shoes, World Cup Golden Balls, Pichichi.', path: '/awards', category: 'General' },
        ];

        // Index World Records (flattened)
        const staticRecords = [
          { title: 'Most Trophies in Football History (46)', subtitle: 'World Record', description: 'Highest count of collective official trophies by a single player.', path: '/records' },
          { title: 'Most Goals in a Calendar Year (91)', subtitle: 'World Record', description: 'Scored 91 goals in 2012 for Barcelona and Argentina.', path: '/records' },
          { title: 'Most Goals for a Single Club (672)', subtitle: 'World Record', description: 'Scored 672 official goals for FC Barcelona.', path: '/records' },
          { title: 'Most Ballon d\'Or Awards (8)', subtitle: 'World Record', description: 'Only player in football history to win 8 titles.', path: '/records' },
          { title: 'All-Time Top Scorer in La Liga (474)', subtitle: 'League Record', description: 'Spanish first division league record.', path: '/records' },
          { title: 'All-Time Top Scorer for Argentina (112)', subtitle: 'National Record', description: 'Leader in goals for the Albiceleste national team.', path: '/records' },
        ];

        staticRecords.forEach((r) => {
          indexList.push({
            title: r.title,
            subtitle: r.subtitle,
            description: r.description,
            path: r.path,
            category: 'Record',
          });
        });

        // Index Trophies
        const staticTrophies = [
          { name: 'FIFA World Cup', team: 'Argentina', desc: 'World Cup championship in Qatar 2022' },
          { name: 'Copa América', team: 'Argentina', desc: 'Won in 2021 (Brazil) and 2024 (USA)' },
          { name: 'UEFA Champions League', team: 'Barcelona', desc: 'Won 4 times (2006, 2009, 2011, 2015)' },
          { name: 'La Liga', team: 'Barcelona', desc: 'Won 10 Spanish league titles' },
          { name: 'Copa del Rey', team: 'Barcelona', desc: 'Won 7 Spanish domestic cups' },
          { name: 'Ligue 1', team: 'PSG', desc: 'Won 2 French domestic league titles' },
          { name: 'Leagues Cup', team: 'Inter Miami', desc: 'Won in 2023' },
        ];

        staticTrophies.forEach((t) => {
          indexList.push({
            title: t.name,
            subtitle: t.team,
            description: t.desc,
            path: '/trophies',
            category: 'Trophy',
          });
        });

        setAllItems(indexList);

        // Setup Fuse
        const fuseInstance = new Fuse(indexList, {
          keys: ['title', 'subtitle', 'description', 'category'],
          threshold: 0.35,
        });
        setFuse(fuseInstance);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to index database:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!fuse) return;
    if (query.trim() === '') {
      setResults(allItems.slice(0, 4)); // Show featured items initially
    } else {
      const searchRes = fuse.search(query).map((res) => res.item);
      setResults(searchRes);
    }
  }, [query, fuse, allItems]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050608] text-neutral-500">
        Indexing Museum Database...
      </div>
    );
  }

  return (
    <>
      <Header />
      <PageHeader
        title="DATABASE SEARCH"
        subtitle="Search Across Records, Stats & Trophies"
        imageCategory="hero"
      />
      
      <main className="min-h-screen bg-[#050608] pb-16 pt-16 px-6 md:px-12 flex flex-col justify-start">
        <div className="max-w-4xl mx-auto w-full">
          
          

          {/* Search bar input */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search records, club careers, trophies (e.g. World Cup, La Liga, 91)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#0A0F17] border border-border-accent/40 rounded-2xl text-base text-white placeholder-neutral-500 focus:outline-none focus:border-accent-blue/40 transition-colors font-sans"
            />
          </div>

          {/* Results Grid */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {results.map((item) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <SpotlightCard className="p-5 flex justify-between items-center hover:border-accent-blue/30 group">
                    <div className="flex gap-4 items-center">
                      <div className="p-3 rounded-lg bg-neutral-900 border border-white/5 text-accent-blue group-hover:text-white transition-colors">
                        {item.category === 'Trophy' && <Trophy className="w-5 h-5" />}
                        {item.category === 'Record' && <Flame className="w-5 h-5 text-gold" />}
                        {item.category === 'Club' && <Landmark className="w-5 h-5" />}
                        {item.category === 'Country' && <Award className="w-5 h-5" />}
                        {item.category === 'General' && <Award className="w-5 h-5" />}
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500 block mb-0.5">
                          {item.category} • {item.subtitle}
                        </span>
                        <h4 className="font-cinzel text-sm font-bold text-white group-hover:text-accent-blue transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-neutral-400 text-xs mt-1 leading-relaxed max-w-xl">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={item.path}
                      className="p-3 rounded-full border border-white/5 text-neutral-400 group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-all flex items-center justify-center cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>

            {results.length === 0 && (
              <div className="text-center py-12 text-neutral-500 font-sans text-xs">
                No items matching your query found in the index.
              </div>
            )}
          </div>

        </div>
      </main>

      <FooterSection />
    </>
  );
}
