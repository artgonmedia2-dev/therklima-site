import type { MetadataRoute } from "next";
import { COMPANY, METIERS } from "@/lib/constants";
import { BLOG_ARTICLES } from "@/lib/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.url;
  const now = new Date();

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/devis`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/devis-climatisation`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/devis-electricite`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/realisations`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/avis`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/tarifs`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/zone-intervention`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const metierPages = METIERS.map((m) => ({
    url: `${base}${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogPages = BLOG_ARTICLES.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...metierPages, ...blogPages];
}
