import type { MetadataRoute } from "next";

const BASE = "https://www.paulosgozo.com";

// Every public page, so Google can discover and index the whole site.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/menu", "/about", "/gallery", "/location", "/booking"];

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
