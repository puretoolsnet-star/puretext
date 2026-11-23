import type { MetadataRoute } from "next";

import { CANONICAL_SITE_ORIGIN } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/ads.txt", "/robots.txt", "/sitemap.xml"],
      disallow: ["/_next/", "/api/"],
    },
    sitemap: `${CANONICAL_SITE_ORIGIN}/sitemap.xml`,
    host: CANONICAL_SITE_ORIGIN,
  };
}