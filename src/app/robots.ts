import type { MetadataRoute } from "next";
import { theme } from "@/config/theme.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${theme.siteUrl}/sitemap.xml`,
  };
}
