import type { MetadataRoute } from "next";

import { LANGS } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { buildSitemapLanguageAlternates } from "@/lib/seo/structured-data";
import { INDEXABLE_PATHS } from "@/lib/seo/sitemap-routes";
import { absoluteCanonicalUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of INDEXABLE_PATHS) {
    for (const lang of LANGS) {
      const url = absoluteCanonicalUrl(localizedPath(lang, path));
      entries.push({
        url,
        lastModified,
        changeFrequency: "weekly",
        priority: 1,
        alternates: { languages: buildSitemapLanguageAlternates(path) },
      });
    }
  }

  return entries;
}