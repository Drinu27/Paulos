import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Location — Paulos" };

const MAPS_URL =
  "https://www.google.com/maps/place/Paulos+Bar/@36.030476,14.2324688,17z";

const HOURS = [
  { day: "Monday", time: "Closed", closed: true },
  { day: "Tuesday", time: "Closed", closed: true },
  { day: "Wed – Thu", time: "6:30 PM – 10 PM" },
  { day: "Friday", time: "5:30 PM – 10 PM" },
  { day: "Saturday", time: "5:30 PM – 10 PM" },
  { day: "Sunday", time: "8:30 AM – 1:00 PM, 5:30 PM – 10 PM" },
];

export default function LocationPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <h1 className="display display--lg">
            Where to
            <br />
            find us
          </h1>
          <p className="lede mt-24">In the heart of Munxar.</p>
          <div className="crumbs">
            <Link href="/">Home</Link> · Location
          </div>
        </div>
      </section>

      {/* ===================== MAP + ADDRESS ===================== */}
      <section className="section--card">
        <div className="split">
          <div className="split-media" style={{ minHeight: 520 }}>
            <Image
              src="/images/location-map.png"
              alt="Map showing Paulos Bar in Munxar, Gozo"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <Reveal className="split-panel">
            <div className="eyebrow eyebrow--gold">Visit</div>
            <h2 className="display display--md">
              Pjazza tal-Knisja,
              <br />
              Munxar
            </h2>
            <p className="lede" style={{ margin: 0 }}>
              Gozo, Malta
            </p>

            <div className="stack gap-16 mt-16">
              <a className="contact-line" href="tel:+35621569191">
                <Phone />
                <span className="micro">+356 2156 9191</span>
              </a>
              <a className="contact-line" href="mailto:paulosmunxar@gmail.com">
                <Mail />
                <span className="micro">paulosmunxar@gmail.com</span>
              </a>
            </div>

            <div className="row mt-24">
              <a
                className="btn btn--gold btn--lg"
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
              <Link className="btn btn--ghost btn--lg" href="/booking">
                Book a table
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== HOURS ===================== */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="eyebrow eyebrow--gold">Hours</div>
            <h2 className="display display--md mt-16">
              When we
              <br />
              open
            </h2>
            <div className="info-list mt-32" style={{ maxWidth: 620 }}>
              {HOURS.map((h) => (
                <div className={`info-line${h.closed ? " closed" : ""}`} key={h.day}>
                  <span className="k">{h.day}</span>
                  <span className="v">{h.time}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="cta-gold">
        <div className="container center">
          <Reveal>
            <div className="eyebrow">See you soon</div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="display display--lg mt-24">
              Reserve
              <br />
              the night
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="row row--center mt-32">
              <Link className="btn btn--lg btn--on-black" href="/booking">
                Book a table
              </Link>
              <Link className="btn btn--lg btn--outline-black" href="/menu">
                See the menu
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
