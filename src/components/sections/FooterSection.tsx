'use client';

import { Heart, Globe } from 'lucide-react';
import Link from 'next/link';

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#030303] border-t border-white/5 py-20 px-6 md:px-12 text-neutral-500 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#75AADB]/5 rounded-[100%] blur-[100px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-24 relative z-10">
        {/* Left Side: Brand Name & Tribute details */}
        <div className="space-y-6 md:w-1/2">
          <Link href="/" className="font-cinzel text-3xl font-bold tracking-widest text-white block hover:opacity-80 transition-opacity">
            EL MESÍAS<span className="text-[#75AADB]">.</span>
          </Link>
          <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
            A passionate tribute to the greatest footballer of all time, Lionel Andrés Messi. Celebrating the magic, the milestones, and the unparalleled legacy of La Pulga.
          </p>
          <div className="flex items-center gap-2 text-xs text-neutral-600 pt-4">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>by Sanjay • 2026</span>
          </div>
        </div>

        {/* Middle Side: Quick Navigation */}
        <div className="space-y-6 w-full md:w-auto">
          <span className="text-xs uppercase tracking-widest font-bold text-white block flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#75AADB]"></span> Explore
          </span>
          <ul className="flex flex-col gap-3">
            <li><Link href="/" className="text-sm text-neutral-400 hover:text-[#75AADB] transition-colors">Home</Link></li>
            <li><Link href="/about" className="text-sm text-neutral-400 hover:text-[#75AADB] transition-colors">Biography</Link></li>
            <li><Link href="/matches" className="text-sm text-neutral-400 hover:text-[#75AADB] transition-colors">Matches Archive</Link></li>
            <li><Link href="/goals" className="text-sm text-neutral-400 hover:text-[#75AADB] transition-colors">Goals Archive</Link></li>
            <li><Link href="/awards" className="text-sm text-neutral-400 hover:text-[#75AADB] transition-colors">Trophy Cabinet</Link></li>
          </ul>
        </div>

        {/* Right Side: Social / Official */}
        <div className="space-y-6 w-full md:w-auto">
          <span className="text-xs uppercase tracking-widest font-bold text-white block flex items-center gap-2">
             <span className="w-8 h-[1px] bg-[#F6B40E]"></span> Official Channels
          </span>
          <div className="flex flex-col gap-4">
            <a href="https://www.instagram.com/leomessi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white hover:translate-x-1 transition-all">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </span> Instagram
            </a>
            <a href="https://messi.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white hover:translate-x-1 transition-all">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Globe className="w-4 h-4" /></span> messi.com
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-600 uppercase tracking-wider relative z-10">
        <span>© 2026 Lionel Messi Fan Tribute. Not affiliated with Leo Messi Management.</span>
        <span>Made by a Fan, For the Fans.</span>
      </div>
    </footer>
  );
}
