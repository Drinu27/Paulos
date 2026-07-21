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

export const metadata: Metadata = {
  title: "Paulos — Bar · Pizzeria · Grill",
  description:
    "Family-run bar, pizzeria and grill in Munxar, Gozo. Good food, good times — open Wednesday to Sunday.",
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
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
