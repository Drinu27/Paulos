import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import BackToTop from "@/components/BackToTop";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_URL = "https://www.paulosgozo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paulos Bar, Pizzeria & Grill · Munxar, Gozo",
    template: "%s · Paulos — Munxar, Gozo",
  },
  description:
    "Family-run bar, pizzeria and grill in the heart of Munxar, Gozo. Artisan pizzas, house-grilled burgers and fresh salads. Open Wednesday to Sunday — book a table.",
  keywords: [
    "Paulos",
    "Paulos Bar",
    "Paulos Munxar",
    "restaurant Munxar",
    "restaurant Gozo",
    "pizza Gozo",
    "pizzeria Gozo",
    "burgers Gozo",
    "grill Gozo",
    "where to eat in Gozo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Paulos Bar, Pizzeria & Grill",
    locale: "en_MT",
    url: SITE_URL,
    title: "Paulos Bar, Pizzeria & Grill · Munxar, Gozo",
    description:
      "Artisan pizzas, house-grilled burgers and fresh salads in the heart of Munxar, Gozo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulos Bar, Pizzeria & Grill · Munxar, Gozo",
    description:
      "Artisan pizzas, house-grilled burgers and fresh salads in the heart of Munxar, Gozo.",
  },
  robots: { index: true, follow: true },
};

/**
 * Structured data (JSON-LD) — the machine-readable business card Google reads to
 * build rich results (map pin, hours, phone). Kept in sync with /location by hand.
 */
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Paulos Bar, Pizzeria & Grill",
  "@id": SITE_URL,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  telephone: "+356 2156 9191",
  email: "paulosmunxar@gmail.com",
  priceRange: "€€",
  servesCuisine: ["Pizza", "Burgers", "Grill", "Bar"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pjazza tal-Knisja",
    addressLocality: "Munxar",
    addressRegion: "Gozo",
    addressCountry: "MT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 36.030476,
    longitude: 14.2324688,
  },
  hasMap:
    "https://www.google.com/maps/place/Paulos+Bar/@36.030476,14.2324688,17z",
  sameAs: [
    "https://www.facebook.com/PaulosMunxar",
    "https://www.instagram.com/paulos_gozo/?hl=en",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday", "Thursday"],
      opens: "18:30",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "17:30",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:30",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "17:30",
      closes: "22:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <head>
        {/* Scroll-reveal hides content until JS brings it back — without JS, show it all */}
        <noscript>
          <style>{`.reveal { opacity: 1; transform: none; }`}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
