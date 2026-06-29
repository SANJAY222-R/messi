'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  pulseSpeed: number;
}

export default function StadiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15 - 0.05, // slow upward drift
      alpha: Math.random() * 0.4 + 0.1,
      pulseSpeed: Math.random() * 0.01 + 0.005,
    });

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 80);
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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.pulseSpeed;

        // Pulse opacity
        if (p.alpha > 0.55 || p.alpha < 0.05) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Loop off-screen
        if (p.y < -10) {
          particles[idx] = createParticle();
          particles[idx].y = canvas.height + 10;
        }
        if (p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 198, 255, ${Math.max(0, p.alpha)})`; // Sky Blue particle
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden bg-[#050608] select-none pointer-events-none">
      {/* Background Stadium Spotlight Mesh */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] bg-[radial-gradient(circle_at_50%_0%,rgba(110,198,255,0.06)_0%,transparent_70%)]" />
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(110,198,255,0.03)_0%,transparent_80%)] blur-[80px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(110,198,255,0.02)_0%,transparent_80%)] blur-[100px]" />

      {/* Stadium Fog/Glow overlay */}
      <div className="absolute bottom-0 inset-x-0 h-[30vh] bg-gradient-to-t from-[#050608] via-transparent to-transparent" />
      
      {/* Interactive canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65" />
    </div>
  );
}
