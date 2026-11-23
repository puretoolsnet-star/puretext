import type { MetadataRoute } from "next";

import { LANGS } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { buildSitemapLanguageAlternates } from "@/lib/seo/structured-data";
import { getSitemapPageMeta, INDEXABLE_PATHS, type IndexablePath } from "@/lib/seo/sitemap-routes";
import { absoluteCanonicalUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of INDEXABLE_PATHS) {
    const meta = getSitemapPageMeta(path as IndexablePath);
    for (const lang of LANGS) {
      entries.push({
        url: absoluteCanonicalUrl(localizedPath(lang, path)),
        lastModified,
        changeFrequency: meta.changeFrequency,
        priority: meta.priority,
        alternates: { languages: buildSitemapLanguageAlternates(path) },
      });
    }
  }

  return entries;
}