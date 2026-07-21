import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./BrandIcons";

const MAPS_URL =
  "https://www.google.com/maps/place/Paulos+Bar/@36.030476,14.2324688,17z";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-col">
          <Link className="brand" href="/" aria-label="Paulos — home">
            <Image
              className="brand-logo"
              src="/images/logo.png"
              alt="Paulos"
              width={480}
              height={251}
            />
          </Link>
          <p>
            Bar · Pizzeria · Grill.
            <br />
            Good Food, Good Times.
          </p>
        </div>

        <div className="footer-col">
          <h4>Visit</h4>
          <p>Pjazza tal-Knisja, Munxar</p>
          <p style={{ marginTop: 14 }}>
            <a href="tel:+35621569191">+356 2156 9191</a>
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <nav className="footer-nav">
            <Link href="/menu">Menu</Link>
            <Link href="/about">About</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/location">Location</Link>
            <Link href="/booking">Reserve</Link>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="micro">Designed by Drynu</span>
        <div className="social">
          <a
            href="https://www.instagram.com/paulos_gozo/?hl=en"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.facebook.com/PaulosMunxar"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </a>
          <a href={MAPS_URL} target="_blank" rel="noreferrer" aria-label="Map">
            <MapPin />
          </a>
        </div>
        <span className="micro">Open Wed – Sun</span>
      </div>
    </footer>
  );
}
