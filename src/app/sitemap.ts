import type { MetadataRoute } from "next";
import { theme } from "@/config/theme.config";
import { getAllProducts } from "@/lib/data/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = theme.siteUrl;
  const products = getAllProducts().map((p) => ({
    url: `${base}/pecas/${p.reference.toLowerCase()}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/experimentar`, changeFrequency: "monthly", priority: 0.6 },
    ...products,
  ];
}
