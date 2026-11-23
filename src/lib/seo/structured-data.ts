import { LANGS } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";
import { absoluteCanonicalUrl, HREFLANG_MAP } from "@/lib/seo/site";

export function buildSitemapLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of LANGS) {
    languages[HREFLANG_MAP[lang]] = absoluteCanonicalUrl(localizedPath(lang, path));
  }
  return languages;
}

export function buildHomeJsonLd(lang: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PureText",
    url: absoluteCanonicalUrl(localizedPath(lang as (typeof LANGS)[number], "/")),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}