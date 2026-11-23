import { de } from "@/i18n/dictionaries/de";
import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";
import { fr } from "@/i18n/dictionaries/fr";
import { pl } from "@/i18n/dictionaries/pl";
import { uk } from "@/i18n/dictionaries/uk";
import type { Dictionary } from "@/i18n/types";

export const LANGS = ["en", "uk", "de", "es", "pl", "fr"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export const dictionaries: Record<Lang, Dictionary> = {
  en,
  uk,
  de,
  es,
  pl,
  fr,
};

export const LANG_LABELS: Record<Lang, { code: string; native: string; flag: string }> = {
  en: { code: "EN", native: "English", flag: "🇬🇧" },
  uk: { code: "UA", native: "Українська", flag: "🇺🇦" },
  de: { code: "DE", native: "Deutsch", flag: "🇩🇪" },
  es: { code: "ES", native: "Español", flag: "🇪🇸" },
  pl: { code: "PL", native: "Polski", flag: "🇵🇱" },
  fr: { code: "FR", native: "Français", flag: "🇫🇷" },
};

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

export const STORAGE_KEY = "puretext-lang";