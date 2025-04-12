'use client';

import { useEffect } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function BlockchainBg() {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // nods
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffd200';
        ctx.fill();
      });

      // lines
      particles.forEach((p1) => {
        particles.forEach((p2) => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(255, 210, 0, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // animation
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      id="bg-canvas"
      className="w-full h-full fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
