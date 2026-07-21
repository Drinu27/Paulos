import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSlideshow from "@/components/HeroSlideshow";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import ReviewCarousel from "@/components/ReviewCarousel";

const FAVOURITES = [
  { name: "BBQ Chicken", image: "/images/dish-bbq-chicken.jpg" },
  { name: "Whiskey Glaze Burger", image: "/images/dish-whiskey-burger.jpg" },
  { name: "Beefy Jack", image: "/images/dish-beefy-jack.jpg" },
];

const GALLERY = [
  { src: "/images/gallery-1.jpg", alt: "Stacked burger with onion rings", slot: "s1" },
  { src: "/images/gallery-2.jpg", alt: "A pizza base being stretched by hand", slot: "s2" },
  { src: "/images/gallery-3.jpg", alt: "Pizzas cooking in the stone oven", slot: "s3" },
  { src: "/images/gallery-4.jpg", alt: "Close-up of a pepperoni pizza", slot: "s4" },
  { src: "/images/gallery-5.jpg", alt: "Burger and fries with a cold beer", slot: "s5" },
  { src: "/images/gallery-6.jpg", alt: "Chicken pizza fresh from the oven", slot: "s6" },
];

export default function HomePage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="hero">
        <HeroSlideshow />
        <div className="hero-overlay" />

        <div className="hero-content">
          <Reveal>
            <div className="eyebrow eyebrow--gold">Est. 2020</div>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="display display--hero hero-title">
              Good <span className="gold">Food.</span>
              <br />
              Good <span className="gold">Times.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <div className="hero-actions">
              <Link className="btn btn--gold btn--lg" href="/booking">
                Reserve the night
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="hero-meta">
          <span className="micro open-late">Open till late</span>
          <span className="micro hero-hours">
            Wed–Thurs · from 6:30 pm – 10:00 pm
            <br />
            Fri – Sat · 5:30 pm – 10:00 pm
            <br />
            Sun · 8:30 am – 1:00 pm, 5:30 – 10:00 pm
          </span>
        </div>
        <div className="hero-rule" />
      </section>

      <Marquee
        items={[
          "Pizzeria",
          "Grill",
          "Homemade",
          "Signature Dishes",
          "Local Ingredients",
        ]}
      />

      {/* ===================== FEATURE: MENU ===================== */}
      <section className="section--card">
        <div className="split">
          <div className="split-media">
            <Image
              src="/images/feature-menu.jpg"
              alt="A pepperoni pizza fresh out of the oven"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <Reveal className="split-panel split-panel--gold">
            <div className="eyebrow">The list</div>
            <h2 className="display display--lg">
              Looking for
              <br />
              our menu?
            </h2>
            <p className="lede">
              From fresh pizzas and grilled favourites to drinks at the bar, our menu is
              all about good food, generous portions, and a relaxed atmosphere. Whether
              you&rsquo;re stopping by for a casual meal, sharing a pizza with friends, or
              enjoying something from the grill, there&rsquo;s something for everyone to
              enjoy.
            </p>
            <Link className="btn btn--ghost btn--lg btn--on-gold" href="/menu">
              See the full menu
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===================== FAVOURITES ===================== */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--split">
            <Reveal delay={1}>
              <h2 className="display display--lg">Some of our Favourites</h2>
            </Reveal>
            <Reveal delay={2}>
              <Link className="text-link" href="/menu">
                All dishes <ArrowRight />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <div className="card-grid">
              {FAVOURITES.map((dish) => (
                <article className="dish-card" key={dish.name}>
                  <div className="media">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 860px) 100vw, 33vw"
                    />
                  </div>
                  <div className="body">
                    <h3>{dish.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee
        reverse
        muted
        items={[
          "Monthly Specials",
          "Warm Atmosphere",
          "Freshly Prepared",
          "Food & Family",
        ]}
      />

      {/* ===================== STORY ===================== */}
      <section className="section--deep">
        <div className="split">
          <Reveal className="split-panel">
            <h2 className="display display--lg">How it all began</h2>
            <p className="lede">
              Our restaurant began as a humble garage, once used by the owner&rsquo;s
              grandfather for his carpentry work. Today, that same space has been brought
              to life as a family run pizzeria, bar and grill, carrying forward a story
              built on family, hard work, and tradition.
            </p>
            <Link className="text-link" href="/about">
              Our story <ArrowRight />
            </Link>
          </Reveal>
          <div className="split-media">
            <Image
              src="/images/story.jpg"
              alt="Pizzas baking inside the stone oven"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="section">
        <div className="container center reviews">
          <div className="section-head section-head--center">
            <Reveal>
              <div className="eyebrow eyebrow--gold">Word of mouth</div>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="display display--lg mt-16">
                What they
                <br />
                say about us
              </h2>
            </Reveal>
          </div>
          <ReviewCarousel />
        </div>
      </section>

      {/* ===================== GALLERY TEASER ===================== */}
      <section className="gallery-teaser section--deep">
        <div className="giant-word">Gallery</div>
        <div className="scatter">
          {GALLERY.map((shot) => (
            <div className={`shot ${shot.slot}`} key={shot.src}>
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 860px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
        <div className="gallery-cta container center">
          <Link className="btn btn--ghost btn--lg" href="/gallery">
            See the whole gallery
          </Link>
        </div>
      </section>
    </>
  );
}
