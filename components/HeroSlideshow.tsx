"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg",
  "/images/hero-5.jpg",
];

const INTERVAL_MS = 4500;

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(
      () => setCurrent((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-media">
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          className={`hero-slide${i === current ? " active" : ""}`}
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={i === 0}
        />
      ))}
    </div>
  );
}
