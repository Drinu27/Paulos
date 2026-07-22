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

/** Ordered so the unfiltered grid alternates food and kitchen rather than clumping. */
const SHOTS: Shot[] = [
  { src: "/images/gal-01.jpg", alt: "A chef carrying a freshly baked pizza past the oven", cat: "kitchen", w: 933, h: 1400 },
  { src: "/images/gal-02.jpg", alt: "BBQ chicken pizza", cat: "pizza", w: 933, h: 1400 },
  { src: "/images/gal-03.jpg", alt: "A table laid with burgers, pizza and drinks", cat: "burgers", w: 1400, h: 787 },
  { src: "/images/gal-04.jpg", alt: "Spiros Royale burger stacked with onion rings", cat: "burgers", w: 933, h: 1400 },
  { src: "/images/gal-05.jpg", alt: "Pepperoni pizza straight from the oven", cat: "pizza", w: 1400, h: 933 },
  { src: "/images/gal-06.jpg", alt: "A chef topping a pizza base by hand", cat: "kitchen", w: 933, h: 1400 },
  { src: "/images/gal-07.jpg", alt: "Four pizzas laid out side by side", cat: "pizza", w: 933, h: 1400 },
  { src: "/images/gal-08.jpg", alt: "Truffle Parm burger with fries and a beer", cat: "burgers", w: 933, h: 1400 },
  { src: "/images/gal-09.jpg", alt: "A pizza going into the stone oven", cat: "kitchen", w: 1400, h: 933 },
  { src: "/images/gal-10.jpg", alt: "Cranberry chicken pizza", cat: "pizza", w: 933, h: 1400 },
  { src: "/images/gal-11.jpg", alt: "Whiskey glaze burger with bacon", cat: "burgers", w: 933, h: 1400 },
  { src: "/images/gal-12.jpg", alt: "A pizza sliding off the peel into the oven", cat: "kitchen", w: 933, h: 1400 },
  { src: "/images/gal-13.jpg", alt: "Beefy Jack pizza beside a burger and fries", cat: "pizza", w: 1400, h: 933 },
  { src: "/images/gal-14.jpg", alt: "New Haven burger and fries seen from above, with a beer", cat: "burgers", w: 933, h: 1400 },
  { src: "/images/gal-15.jpg", alt: "Pepperoni pizza on the table", cat: "pizza", w: 933, h: 1400 },
  { src: "/images/gal-16.jpg", alt: "Sauce being poured over a burger", cat: "kitchen", w: 933, h: 1400 },
  { src: "/images/gal-17.jpg", alt: "Mac Attack burger with melted cheese and tomato", cat: "burgers", w: 933, h: 1400 },
  { src: "/images/gal-18.jpg", alt: "Two chicken pesto pizzas", cat: "pizza", w: 933, h: 1400 },
  { src: "/images/gal-19.jpg", alt: "A burger in front of a pizza on the bar", cat: "burgers", w: 1400, h: 933 },
  { src: "/images/gal-20.jpg", alt: "New Haven burger on a wooden board", cat: "burgers", w: 933, h: 1400 },
  { src: "/images/gal-21.jpg", alt: "Beefy Jack burger against the brick wall", cat: "burgers", w: 933, h: 1400 },
  { src: "/images/gal-22.jpg", alt: "Smoked chilli burger with fries", cat: "burgers", w: 933, h: 1400 },
  { src: "/images/gal-23.jpg", alt: "Burger and a beer at the bar", cat: "burgers", w: 933, h: 1400 },
  { src: "/images/gal-24.jpg", alt: "Pizzas baking inside the stone oven", cat: "kitchen", w: 900, h: 600 },
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
