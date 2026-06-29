'use client';

import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string; // Default: Argentina Accent Blue glow
  className?: string;
}

export default function SpotlightCard({
  children,
  spotlightColor = 'rgba(110, 198, 255, 0.15)',
  className = '',
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(0.85);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-border-accent bg-card-bg p-6 backdrop-blur-md transition-all duration-300 hover:border-accent-blue/40 ${className}`}
      {...props}
    >
      {/* Light spotlight follower glow */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          opacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
