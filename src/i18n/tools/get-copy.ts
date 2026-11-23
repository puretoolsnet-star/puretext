import { de } from "@/i18n/tools/locales/de";
import { en } from "@/i18n/tools/locales/en";
import { es } from "@/i18n/tools/locales/es";
import { fr } from "@/i18n/tools/locales/fr";
import { pl } from "@/i18n/tools/locales/pl";
import { uk } from "@/i18n/tools/locales/uk";
import type { Lang } from "@/i18n/locales";
import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";

const PACKS = { en, uk, de, es, pl, fr } as const satisfies Record<Lang, typeof en>;

export function getCategoryCopy(lang: Lang, id: CategoryId) {
  return PACKS[lang].categories[id];
}

export function getToolCopy(lang: Lang, routeId: ToolRouteId) {
  return PACKS[lang].tools[routeId];
}

export function allCategories(lang: Lang) {
  return PACKS[lang].categories;
}