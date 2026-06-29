'use client';

import { motion } from 'framer-motion';

interface AnimatedTitleProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left' | 'right';
  className?: string;
  accent?: 'blue' | 'gold' | 'none';
}

export default function AnimatedTitle({
  title,
  subtitle,
  align = 'center',
  className = '',
  accent = 'blue',
}: AnimatedTitleProps) {
  const alignmentClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col mb-16 select-none ${alignmentClass} ${className}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className={`text-xs uppercase tracking-[0.3em] font-semibold mb-2 block ${
            accent === 'blue'
              ? 'text-accent-blue'
              : accent === 'gold'
              ? 'text-gold'
              : 'text-neutral-400'
          }`}
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-cinzel text-3xl sm:text-5xl font-bold tracking-wider text-white"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className={`h-[1px] w-24 mt-4 ${
          align === 'center'
            ? 'origin-center'
            : align === 'right'
            ? 'origin-right'
            : 'origin-left'
        } ${
          accent === 'blue'
            ? 'bg-accent-blue/50 shadow-[0_0_8px_#6EC6FF]'
            : accent === 'gold'
            ? 'bg-gold/50 shadow-[0_0_8px_#D4AF37]'
            : 'bg-white/20'
        }`}
      />
    </div>
  );
}
