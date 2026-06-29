'use client';

import { useEffect, useState } from 'react';
import { ExternalLink, Heart } from 'lucide-react';

export default function FooterSection() {
  const [sources, setSources] = useState<any[]>([]);

  useEffect(() => {
    fetch('/DATA/19_references.json')
      .then((res) => res.json())
      .then((data) => {
        setSources(data.official_sources?.sources?.slice(0, 3) || []);
      })
      .catch((err) => {
        console.error('Failed to load references data:', err);
      });
  }, []);

  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 py-16 px-6 md:px-12 text-neutral-500 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        {/* Left Side: Brand Name & Developer details */}
        <div className="space-y-4">
          <span className="font-cinzel text-xl font-bold tracking-widest text-white block">
            MESSI<span className="text-gold">.</span>DB
          </span>
          <p className="text-xs text-neutral-600 max-w-sm leading-relaxed">
            A premium, high-performance visual archive cataloging the career milestones, statistics, awards, and historical triumphs of the legendary Lionel Andrés Messi.
          </p>
          <div className="flex items-center gap-1 text-xs text-neutral-600">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-gold fill-gold" />
            <span>by sanjay • 2026</span>
          </div>
        </div>

        {/* Middle Side: Reference Links */}
        {sources.length > 0 && (
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 block">
              Official Database Sources
            </span>
            <div className="flex flex-col gap-2">
              {sources.map((s) => (
                <a
                  key={s.id}
                  href={s.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-gold transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Right Side: Quick navigation or info */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 block">
            Database Info
          </span>
          <ul className="text-xs space-y-1.5 text-neutral-600">
            <li>
              <span className="text-neutral-500">Edition:</span> 2.0 (Canary)
            </li>
            <li>
              <span className="text-neutral-500">Last Synced:</span> Dec 31, 2024
            </li>
            <li>
              <span className="text-neutral-500">Status:</span> Active Legacy
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/5 mt-12 pt-8 flex justify-between items-center text-[10px] text-neutral-600">
        <span>© 2026 Lionel Messi Archive. All rights reserved.</span>
        <span>For educational and demonstration purposes only.</span>
      </div>
    </footer>
  );
}
