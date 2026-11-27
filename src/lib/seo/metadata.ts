import type { Metadata } from "next";

import { dictionaries, LANGS, type Lang } from "@/i18n/locales";
import type { PageId } from "@/i18n/types";
import { getCategoryCopy, getToolCopy } from "@/i18n/tools/get-copy";
import { localizedPath } from "@/lib/i18n/routing";
import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";
import { categoryPath, toolPath } from "@/lib/tools/routes";
import {
  absoluteCanonicalUrl,
  DEFAULT_LANG,
  getSiteUrl,
  HREFLANG_MAP,
  OPEN_GRAPH_LOCALE,
} from "@/lib/seo/site";

function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of LANGS) {
    languages[HREFLANG_MAP[lang]] = absoluteCanonicalUrl(localizedPath(lang, path));
  }
  languages["x-default"] = absoluteCanonicalUrl(localizedPath(DEFAULT_LANG, path));
  return languages;
}

function baseMeta(title: string, description: string, path: string, lang: Lang): Metadata {
  const canonical = absoluteCanonicalUrl(localizedPath(lang, path));
  return {
    title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "PureText",
      locale: OPEN_GRAPH_LOCALE[lang],
      alternateLocale: LANGS.filter((item) => item !== lang).map((item) => OPEN_GRAPH_LOCALE[item]),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

export function buildPageMetadata(page: PageId, lang: Lang): Metadata {
  if (page !== "home") return baseMeta("PureText", "", "/", lang);
  const copy = dictionaries[lang].seo.home;
  const meta = baseMeta(copy.title, copy.description, "/", lang);
  return {
    ...meta,
    title: { absolute: copy.title },
    keywords: copy.keywords,
  };
}

export function buildCategoryMetadata(categoryId: CategoryId, lang: Lang): Metadata {
  const copy = getCategoryCopy(lang, categoryId);
  const path = categoryPath(categoryId);
  return baseMeta(copy.seoTitle, copy.seoDescription, path, lang);
}

export function buildToolMetadata(routeId: ToolRouteId, lang: Lang): Metadata {
  const copy = getToolCopy(lang, routeId);
  const path = toolPath(routeId);
  return baseMeta(copy.seoTitle, copy.seoDescription, path, lang);
}

export function siteMetadataBase(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    applicationName: "PureText",
    title: { default: "PureText", template: "%s | PureText" },
    formatDetection: { email: false, address: false, telephone: false },
    verification: {
      google: "NdLL2m61xfnzABPwz5qAmkk0vhEL4f_5eVvJjZynJ5U",
    },
  };
}