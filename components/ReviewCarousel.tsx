"use client";

import { useEffect, useState } from "react";

const REVIEWS = [
  { quote: "The best pizza I've had outside Naples.", by: "Felix B." },
  { quote: "A hidden gem in Munxar. The burgers are unreal.", by: "James K." },
  { quote: "Warm atmosphere, generous portions, great family night out.", by: "Sophie M." },
  { quote: "Freshly made, full of flavour — we'll be back every week.", by: "David C." },
];

const INTERVAL_MS = 4000;

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0);

  // Restarts whenever `current` changes, so clicking a dot resets the timer
  useEffect(() => {
    const id = setTimeout(
      () => setCurrent((i) => (i + 1) % REVIEWS.length),
      INTERVAL_MS
    );
    return () => clearTimeout(id);
  }, [current]);

  return (
    <>
      <div className="review-stage">
        {REVIEWS.map((review, i) => (
          <figure
            key={review.by}
            className={`review-slide${i === current ? " active" : ""}`}
            aria-hidden={i !== current}
          >
            <p className="display display--md">&ldquo;{review.quote}&rdquo;</p>
            <figcaption className="micro">★★★★★ — {review.by}</figcaption>
          </figure>
        ))}
      </div>

      <div className="review-dots">
        {REVIEWS.map((review, i) => (
          <button
            key={review.by}
            className={`rdot${i === current ? " active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Show review from ${review.by}`}
          />
        ))}
      </div>
    </>
  );
}
