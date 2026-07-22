"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

// Paulos takes delivery and takeaway orders through Bolt Food, not through this site
const ORDER_URL =
  "https://food.bolt.eu/en/831/p/15567-paulos-bar?utm_source=share_provider&utm_medium=product&utm_content=menu_header";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/location", label: "Location" },
  { href: "/booking", label: "Reserve" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Solid blurred bar once the hero is behind us
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on route change so a tap always lands somewhere
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="Paulos — home">
          <Image
            className="brand-logo"
            src="/images/logo.png"
            alt="Paulos"
            width={480}
            height={251}
            priority
          />
        </Link>

        <nav className={`nav-links${open ? " open" : ""}`}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              className={`nav-link${pathname === link.href ? " active" : ""}`}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          {/* Same order link again, because the desktop one is hidden on phones */}
          <a
            className="btn btn--gold nav-cta-mobile"
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Order
          </a>
        </nav>

        <div className="nav-right">
          <a
            className="btn btn--gold btn--sm nav-cta-desktop"
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Order
          </a>
          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
