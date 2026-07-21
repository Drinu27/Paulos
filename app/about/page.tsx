import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata = { title: "About — Paulos" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        image="/images/about-hero.jpg"
        imageAlt="A pizza being pulled from the stone oven"
        crumb="About"
      />

      {/* ===================== STATEMENT ===================== */}
      <section className="section">
        <div className="container center">
          <Reveal>
            <h2 className="display display--lg" style={{ maxWidth: "18ch", margin: "0 auto" }}>
              Built on <span className="gold">family</span>, fired by{" "}
              <span className="gold">flavour</span>, and served with heart.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ===================== STORY ===================== */}
      <section className="section--card">
        <div className="split">
          <div className="split-media">
            <Image
              src="/images/about-story.jpg"
              alt="Hands stretching a pizza base on the counter"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <Reveal className="split-panel">
            <div className="eyebrow eyebrow--gold">How it started</div>
            <h2 className="display display--lg">
              A <span className="gold">family</span> story
            </h2>
            <p className="lede">
              What was once a simple carpenter&rsquo;s garage has been transformed into a
              welcoming family-run restaurant. Inspired by the owner&rsquo;s grandfather, who
              once worked within these walls, the space now carries a new purpose, bringing
              people together over fresh pizza, grilled favourites, drinks, and good company.
              Built on tradition, hard work, and family spirit, this is a place made to feel
              familiar from the moment you walk in.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== BEHIND THE FOOD ===================== */}
      <section className="section--card">
        <div className="split">
          <Reveal className="split-panel">
            <div className="eyebrow eyebrow--gold">Behind the food</div>
            <h2 className="display display--lg">
              Simple <span className="gold">food</span>,
              <br />
              done well
            </h2>
            <p className="lede">
              At Paulos, the focus is on honest food, friendly service, and a relaxed place to
              enjoy it. Pizza, grill, drinks, and familiar favourites, served in a way that
              feels easy, welcoming, and made for everyone.
            </p>
            <Link className="text-link" href="/booking">
              Dine with us <ArrowRight />
            </Link>
          </Reveal>
          <div className="split-media">
            <Image
              src="/images/about-chef.jpg"
              alt="A chef carrying a fresh pizza past the oven"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="section">
        <div className="container center">
          <Reveal delay={1}>
            <h2 className="display display--lg">
              Pizza, <span className="gold">Grill</span>
              <br />
              and Good Nights
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="row row--center mt-32">
              <Link className="btn btn--gold btn--lg" href="/booking">
                Book a table
              </Link>
              <Link className="btn btn--ghost btn--lg" href="/menu">
                See the menu
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
