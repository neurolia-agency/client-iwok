import type { MetadataRoute } from "next";
import { SECTIONS } from "@/data/portfolio-projects";
import { getShopVisibility } from "@/lib/queries/shop";

const BASE_URL = "https://guihomedecoration.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const shopVisibility = await getShopVisibility();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...(shopVisibility.enabled
      ? [
          {
            url: `${BASE_URL}/shop`,
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const subcategoryRoutes: MetadataRoute.Sitemap = SECTIONS.map((s) => ({
    url: `${BASE_URL}/portfolio/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...subcategoryRoutes];
}
