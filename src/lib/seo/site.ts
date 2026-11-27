import { DEFAULT_LANG, type Lang } from "@/i18n/locales";

export const CANONICAL_SITE_ORIGIN = "https://text.kixt.net";

export { DEFAULT_LANG };

export function absoluteCanonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${CANONICAL_SITE_ORIGIN}${normalized}`;
}

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return CANONICAL_SITE_ORIGIN;
}

export const HREFLANG_MAP: Record<Lang, string> = {
  en: "en",
  uk: "uk-UA",
  de: "de",
  es: "es",
  pl: "pl",
  fr: "fr",
};

export const OPEN_GRAPH_LOCALE: Record<Lang, string> = {
  en: "en_GB",
  uk: "uk_UA",
  de: "de_DE",
  es: "es_ES",
  pl: "pl_PL",
  fr: "fr_FR",
};