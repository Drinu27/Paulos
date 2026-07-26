"use client";

import { useEffect, useState } from "react";

const REVIEWS = [
  { quote: "Burgers are the best on the island — the taste is amazing.", by: "Kerry G." },
  { quote: "A friendly, relaxed atmosphere with really great food. Well worth a visit.", by: "Neil F." },
  { quote: "The food was delicious and abundant, and the staff were super friendly.", by: "Antida R." },
  { quote: "The food was fantastic and exceptionally well priced. We'll definitely be coming back.", by: "Cardiff1984" },
  { quote: "Makes the best pizzas with the thinnest crusts, and excellent service too.", by: "Colin H." },
  { quote: "The burger was to die for — so juicy and cooked perfectly. The best burger in Gozo.", by: "David B." },
  { quote: "Finally a place in Gozo with an amazing home-made burger. Awesome!", by: "Matt G." },
  { quote: "Juicy burgers, excellent service, and a great choice of wraps, pizzas and burgers.", by: "Pommy G." },
  { quote: "Nice and juicy with a mozzarella centre, and the pizza tasted great too. Highly recommended.", by: "Rambo" },
  { quote: "A very good, succulent burger and lovely pizza — good prices and friendly staff.", by: "Vanilla Ginger" },
  { quote: "Best burger ever tried in Gozo and Malta — not overcooked like most places.", by: "Maya B." },
  { quote: "Great burgers, and the ribs were the best I've ever tried.", by: "Luke C." },
  { quote: "Very good pulled pork burger — soft, flavourful, with the perfect burger sauce.", by: "Nicholas" },
  { quote: "One of the best burgers we've ever had — nice and juicy, and you can see it's home-made.", by: "MG Malta" },
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
    </>
  );
}
