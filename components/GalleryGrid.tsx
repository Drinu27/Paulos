"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Categories reflect the photography that actually exists — the original design
 * had frames for Drinks, The Room and Nights, which there are no photos for yet.
 */
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "pizza", label: "Pizza" },
  { id: "burgers", label: "Burgers" },
  { id: "kitchen", label: "The Kitchen" },
];

type Shot = { src: string; alt: string; cat: string; w: number; h: number };

const SHOTS: Shot[] = [
  { src: "/images/gal-01.jpg", alt: "BBQ chicken pizza", cat: "pizza", w: 900, h: 1350 },
  { src: "/images/gal-02.jpg", alt: "Beefy Jack pizza with a burger and fries", cat: "pizza", w: 900, h: 600 },
  { src: "/images/gal-03.jpg", alt: "Close-up of a pepperoni pizza", cat: "pizza", w: 900, h: 600 },
  { src: "/images/gal-04.jpg", alt: "Cranberry chicken pizza", cat: "pizza", w: 900, h: 600 },
  { src: "/images/gal-05.jpg", alt: "Spiroz Royal burger stacked with onion rings", cat: "burgers", w: 900, h: 1350 },
  { src: "/images/gal-06.jpg", alt: "Truffle Parm burger with fries and a beer", cat: "burgers", w: 900, h: 600 },
  { src: "/images/gal-07.jpg", alt: "Whiskey glaze burger with bacon", cat: "burgers", w: 900, h: 1350 },
  { src: "/images/gal-08.jpg", alt: "A chef carrying a pizza past the oven", cat: "kitchen", w: 900, h: 1350 },
  { src: "/images/gal-09.jpg", alt: "A pizza base being stretched by hand", cat: "kitchen", w: 900, h: 600 },
  { src: "/images/gal-10.jpg", alt: "Pizzas baking inside the stone oven", cat: "kitchen", w: 900, h: 600 },
  { src: "/images/gal-11.jpg", alt: "A finished pizza coming out of the oven", cat: "kitchen", w: 900, h: 600 },
];

export default function GalleryGrid() {
  const [category, setCategory] = useState("all");

  const shots =
    category === "all" ? SHOTS : SHOTS.filter((s) => s.cat === category);

  return (
    <>
      <div className="filter-row" style={{ marginBottom: "clamp(32px, 4vw, 48px)" }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`pds-tag${category === c.id ? " selected" : ""}`}
            onClick={() => setCategory(c.id)}
            aria-pressed={category === c.id}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="masonry">
        {shots.map((shot) => (
          <div key={shot.src}>
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.w}
              height={shot.h}
              sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </>
  );
}
