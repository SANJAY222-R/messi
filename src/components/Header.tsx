'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Search, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  label: string;
  path: string;
}

interface DropdownCategory {
  title: string;
  links: NavLink[];
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const categories: DropdownCategory[] = [
    {
      title: 'Career',
      links: [
        { label: 'Childhood', path: '/childhood' },
        { label: 'FC Barcelona', path: '/barcelona' },
        { label: 'Paris SG', path: '/psg' },
        { label: 'Inter Miami', path: '/inter-miami' },
        { label: 'Argentina Selection', path: '/argentina' },
        { label: 'Historical Timeline', path: '/timeline' },
      ],
    },
    {
      title: 'Analytics',
      links: [
        { label: 'Overall Statistics', path: '/statistics' },
        { label: 'Trophy Room', path: '/trophies' },
        { label: 'Individual Awards', path: '/awards' },
        { label: 'World Records', path: '/records' },
        { label: 'Goals Catalog', path: '/goals' },
        { label: 'Appearances & Matches', path: '/matches' },
      ],
    },
    {
      title: 'Archive',
      links: [
        { label: 'About (Biography)', path: '/about' },
        { label: 'Media Gallery', path: '/gallery' },
        { label: 'Database References', path: '/references' },
      ],
    },
  ];

  return (
    <>
      {/* Floating Header Navbar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#050608]/70 backdrop-blur-xl border-b border-border-accent/40 px-6 md:px-12 py-4 flex justify-between items-center select-none transition-all duration-300">
        
        <Link href="/" className="font-cinzel text-xl font-bold tracking-[0.3em] text-white flex items-center gap-3 hover:opacity-80 transition-opacity">
          <span>MESSI</span>
          <span className="h-4 w-[1px] bg-accent-blue/50" />
          <span className="text-[10px] text-accent-blue font-sans tracking-[0.4em] uppercase mt-1">
            GOAT
          </span>
        </Link>

        {/* Links (Desktop Dropdowns) */}
        <nav className="hidden lg:flex items-center gap-8">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="relative"
              onMouseEnter={() => setActiveDropdown(cat.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-300 hover:text-accent-blue transition-colors font-semibold py-2">
                <span>{cat.title}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              <AnimatePresence>
                {activeDropdown === cat.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-56 bg-[#0A0F17]/95 border border-border-accent/60 backdrop-blur-xl rounded-xl p-4 shadow-2xl flex flex-col gap-2.5 z-50"
                  >
                    {cat.links.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        className={`text-xs tracking-wider text-neutral-400 hover:text-accent-blue transition-colors block pb-1 border-b border-white/5 last:border-b-0 last:pb-0 ${
                          pathname === link.path ? 'text-accent-blue font-semibold' : ''
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Search CTA */}
          <Link
            href="/search"
            className={`p-2 rounded-lg bg-neutral-900 border border-white/5 text-neutral-400 hover:text-accent-blue hover:border-accent-blue/30 transition-all ${
              pathname === '/search' ? 'text-accent-blue border-accent-blue/30' : ''
            }`}
          >
            <Search className="w-4 h-4" />
          </Link>
        </nav>

        {/* Mobile Toggle & Search Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/search"
            className="p-2 rounded-lg bg-neutral-900 border border-white/5 text-neutral-400 hover:text-accent-blue"
          >
            <Search className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[64px] z-30 bg-[#050608]/98 border-b border-border-accent/40 p-6 flex flex-col gap-6 select-none lg:hidden max-h-[85vh] overflow-y-auto backdrop-blur-xl"
          >
            {categories.map((cat) => (
              <div key={cat.title} className="space-y-2.5">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold block border-b border-white/5 pb-1">
                  {cat.title}
                </span>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  {cat.links.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`text-xs tracking-wide text-neutral-300 hover:text-accent-blue transition-colors ${
                        pathname === link.path ? 'text-accent-blue font-bold' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
