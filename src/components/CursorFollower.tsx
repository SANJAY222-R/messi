'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.classList.contains('cursor-pointer'))
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [visible, cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* Lag-smoothed spotlight ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-blue/30 pointer-events-none z-50 mix-blend-screen hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hovered ? 1.6 : 1,
          backgroundColor: hovered ? 'rgba(110, 198, 255, 0.08)' : 'transparent',
          borderColor: hovered ? '#A7DBFF' : 'rgba(110, 198, 255, 0.3)',
        }}
      />
      {/* Fast, precise center light dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-blue pointer-events-none z-50 translate-x-[12px] translate-y-[12px] hidden lg:block shadow-[0_0_8px_#6EC6FF]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hovered ? 0.5 : 1,
        }}
      />
    </>
  );
}
