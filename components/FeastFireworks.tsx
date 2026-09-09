"use client";

import { useEffect, useRef } from "react";

/**
 * Feast fireworks — a short, celebratory burst that plays once when a page loads,
 * then fades away. It runs only during the feast week, in step with <ClosureNotice />.
 *
 * SHOW_UNTIL must match the same constant in ClosureNotice.tsx: once it's passed,
 * nothing renders, so the effect retires itself when the feast is over.
 * To remove it sooner, delete <FeastFireworks /> from app/layout.tsx.
 */
const SHOW_UNTIL = new Date(2026, 8, 15, 23, 59, 59); // Tue 15 Sep 2026 (month is 0-based)

// Warm, on-brand palette — gold and champagne, no rainbow, to keep the premium feel.
const COLORS = ["#ffc000", "#ffd95a", "#ffffff", "#ff9d2f", "#f6e7c1"];

const LAUNCH_MS = 6000; // stop sending up new rockets after this, then let them finish
const GRAVITY = 0.045;
const FRICTION = 0.985;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // 1 → 0
  decay: number;
  color: string;
  size: number;
};

type Rocket = {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
};

export default function FeastFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (new Date() > SHOW_UNTIL) return; // feast over — never run
    // Respect people who ask their device for less motion.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // Capture non-null locals so the nested closures below stay type-safe.
    const el = canvas;
    const c = ctx;

    let width = 0;
    let height = 0;

    function resize() {
      // Cap the pixel ratio at 2 so very dense screens don't over-draw.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      el.width = Math.floor(width * dpr);
      el.height = Math.floor(height * dpr);
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    const start = performance.now();
    let lastLaunch = 0;
    let raf = 0;

    function spawnRocket() {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      rockets.push({
        x: width * (0.15 + Math.random() * 0.7),
        y: height,
        vy: -(height * 0.011 + Math.random() * height * 0.004),
        targetY: height * (0.22 + Math.random() * 0.3),
        color,
      });
    }

    function explode(x: number, y: number, color: string) {
      const count = 40 + Math.floor(Math.random() * 22);
      for (let i = 0; i < count; i++) {
        // Even ring plus a little jitter, so the burst looks natural not mechanical.
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = 2 + Math.random() * 4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.006 + Math.random() * 0.008, // linger a little so the burst reads
          color,
          size: 2 + Math.random() * 2,
        });
      }
    }

    function frame(now: number) {
      const elapsed = now - start;
      c.clearRect(0, 0, width, height);

      // Send up new rockets, spaced out, only during the launch window.
      if (elapsed < LAUNCH_MS && now - lastLaunch > 620) {
        spawnRocket();
        if (Math.random() > 0.6) spawnRocket(); // an occasional double launch
        lastLaunch = now;
      }

      // Rockets climb, slow, then burst near the top of their arc.
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy += GRAVITY * 2;
        c.globalAlpha = 1;
        c.fillStyle = r.color;
        c.shadowBlur = 8;
        c.shadowColor = r.color;
        c.beginPath();
        c.arc(r.x, r.y, 1.8, 0, Math.PI * 2);
        c.fill();
        if (r.y <= r.targetY || r.vy >= 0) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Sparks drift out, fall under gravity, and fade.
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.vy += GRAVITY;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        c.globalAlpha = Math.max(p.life, 0);
        c.fillStyle = p.color;
        c.shadowBlur = 10;
        c.shadowColor = p.color;
        c.beginPath();
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        c.fill();
      }

      c.globalAlpha = 1;
      c.shadowBlur = 0;

      // Once the window has closed and everything has burnt out, fade the canvas
      // and stop the loop so it costs nothing for the rest of the visit.
      if (elapsed >= LAUNCH_MS && rockets.length === 0 && particles.length === 0) {
        el.style.opacity = "0";
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="feast-fireworks" aria-hidden="true" />;
}
