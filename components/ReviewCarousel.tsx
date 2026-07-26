"use client";

import { useEffect, useState } from "react";

const REVIEWS = [
  { quote: "Burgers are the best on the island — the taste is amazing.", by: "Kerry G." },
  { quote: "A friendly, relaxed atmosphere with really great food. Well worth a visit.", by: "Neil F." },
  { quote: "Makes the best pizzas with the thinnest crusts, and excellent service too.", by: "Colin H." },
  { quote: "The food was delicious and abundant, and the staff were super friendly.", by: "Antida R." },
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
