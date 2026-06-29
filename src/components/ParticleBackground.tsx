'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = [
      'rgba(212, 175, 55, 0.4)', // Gold
      'rgba(116, 172, 223, 0.4)', // Argentine Blue
      'rgba(255, 255, 255, 0.3)', // Soft white
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x?: number, y?: number): Particle => {
      const size = Math.random() * 2 + 0.5;
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.1, // Drifts slightly upwards
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        decay: Math.random() * 0.002 + 0.0005,
      };
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 120);
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    };

    resizeCanvas();
    initParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Interaction with mouse
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            // Slights pull or push
            const force = (150 - dist) / 150;
            p.x -= (dx / dist) * force * 0.6;
            p.y -= (dy / dist) * force * 0.6;
          }
        }

        // Drifting movement update
        p.x += p.speedX;
        p.y += p.speedY;

        // Reset if off-screen or faded
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles[index] = createParticle(
            Math.random() * canvas.width,
            canvas.height + 10 // Start at bottom
          );
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full bg-black"
    />
  );
}
