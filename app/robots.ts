import type { MetadataRoute } from "next";

// Tells search engines they may crawl everything, and where the sitemap lives.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.paulosgozo.com/sitemap.xml",
  };
}
