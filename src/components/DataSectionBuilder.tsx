'use client';

import React from 'react';
import SpotlightCard from './SpotlightCard';
import { motion } from 'framer-motion';

interface DataSectionBuilderProps {
  data: any;
  title?: string;
  level?: number;
}

export default function DataSectionBuilder({ data, title, level = 2 }: DataSectionBuilderProps) {
  if (!data) return null;

  const HeadingTag = `h${Math.min(level, 6)}` as React.ElementType;
  const nextLevel = Math.min(level + 1, 6);

  // Format keys: "major_goal_achievements" -> "Major Goal Achievements"
  const formatKey = (key: string) => {
    if (!key) return '';
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // 1. Primitive Values
  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    return (
      <div className="mb-4 text-neutral-300 leading-relaxed">
        {title && <span className="font-semibold text-accent-blue mr-2 uppercase tracking-wide text-sm">{formatKey(title)}:</span>}
        <span className="text-white/90">{data.toString()}</span>
      </div>
    );
  }

  // 2. Arrays
  if (Array.isArray(data)) {
    if (data.length === 0) return null;

    const isPrimitiveArray = typeof data[0] === 'string' || typeof data[0] === 'number';

    // 2a. Array of Primitives (Tag Cloud)
    if (isPrimitiveArray) {
      return (
        <div className="mb-10">
          {title && (
            <HeadingTag className={`font-cinzel font-bold text-white mb-4 ${level === 2 ? 'text-2xl' : 'text-xl'}`}>
              {formatKey(title)}
            </HeadingTag>
          )}
          <div className="flex flex-wrap gap-3">
            {data.map((item, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-300 hover:bg-white/10 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );
    }

    // 2b. Array of Objects (Card Grid)
    return (
      <div className="mb-16">
        {title && (
          <div className="flex items-center gap-4 mb-8">
            <HeadingTag className={`font-cinzel font-bold text-white uppercase tracking-widest ${level === 2 ? 'text-3xl' : 'text-xl'}`}>
              {formatKey(title)}
            </HeadingTag>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-accent-blue/30 to-transparent" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, idx) => (
            <SpotlightCard key={idx}>
              <div className="p-6 h-full flex flex-col justify-start">
                {Object.entries(item).map(([key, val]) => {
                  if (val === null || val === undefined) return null;
                  
                  return (
                    <div key={key} className="mb-4 last:mb-0">
                      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-neutral-500 block mb-1">
                        {formatKey(key)}
                      </span>
                      {typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean' ? (
                        <span className="text-white/90 font-medium">{val.toString()}</span>
                      ) : Array.isArray(val) ? (
                        <span className="text-neutral-400 text-sm leading-relaxed block">
                          {val.map(v => (typeof v === 'object' ? JSON.stringify(v) : v)).join(', ')}
                        </span>
                      ) : (
                        <span className="text-neutral-500 text-xs italic bg-white/5 px-2 py-1 rounded">Detailed Record</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    );
  }

  // 3. Objects (Dictionaries)
  if (typeof data === 'object') {
    // Separate primitives (for the stat grid) from nested structures
    const primitiveEntries = Object.entries(data).filter(
      ([, val]) => typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean'
    );
    const complexEntries = Object.entries(data).filter(
      ([, val]) => typeof val === 'object' && val !== null
    );

    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 w-full"
      >
        {title && (
          <div className="mb-8 border-b border-white/10 pb-4">
            <HeadingTag className={`font-cinzel font-bold text-white uppercase tracking-wider ${level === 2 ? 'text-4xl' : 'text-2xl text-accent-blue/80'}`}>
              {formatKey(title)}
            </HeadingTag>
          </div>
        )}
        
        {/* Primitives Grid */}
        {primitiveEntries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {primitiveEntries.map(([key, val]) => (
              <div key={key} className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                <div className="text-[10px] sm:text-xs text-accent-blue uppercase tracking-widest mb-2 font-semibold">
                  {formatKey(key)}
                </div>
                <div className="text-lg sm:text-xl text-white font-medium break-words leading-tight">
                  {String(val)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Nested Objects/Arrays */}
        {complexEntries.length > 0 && (
          <div className="w-full space-y-12">
            {complexEntries.map(([key, val]) => (
              <DataSectionBuilder key={key} title={key} data={val} level={nextLevel} />
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  return null;
}
