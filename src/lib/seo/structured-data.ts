import { dictionaries, DEFAULT_LANG, LANGS, type Lang } from "@/i18n/locales";
import { getCategoryCopy, getToolCopy } from "@/i18n/tools/get-copy";
import { localizedPath } from "@/lib/i18n/routing";
import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";
import { categoryPath, toolPath, TOOLS_BY_CATEGORY } from "@/lib/tools/routes";
import { absoluteCanonicalUrl, HREFLANG_MAP } from "@/lib/seo/site";

export function buildSitemapLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of LANGS) {
    languages[HREFLANG_MAP[lang]] = absoluteCanonicalUrl(localizedPath(lang, path));
  }
  languages["x-default"] = absoluteCanonicalUrl(localizedPath(DEFAULT_LANG, path));
  return languages;
}

type FaqItem = { question: string; answer: string };

function faqPageJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function breadcrumbJsonLd(
  items: { name: string; item: string }[],
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

export function buildHomeJsonLd(lang: Lang): Record<string, unknown> {
  const homeUrl = absoluteCanonicalUrl(localizedPath(lang, "/"));
  const dict = dictionaries[lang];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "PureText",
        url: homeUrl,
        inLanguage: HREFLANG_MAP[lang],
        publisher: { "@type": "Organization", name: "kixt.net", url: "https://kixt.net" },
      },
      {
        "@type": "SoftwareApplication",
        name: "PureText",
        url: homeUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        inLanguage: HREFLANG_MAP[lang],
      },
      faqPageJsonLd(dict.faq.items),
    ],
  };
}

export function buildCategoryJsonLd(lang: Lang, categoryId: CategoryId): Record<string, unknown> {
  const copy = getCategoryCopy(lang, categoryId);
  const homeUrl = absoluteCanonicalUrl(localizedPath(lang, "/"));
  const categoryUrl = absoluteCanonicalUrl(localizedPath(lang, categoryPath(categoryId)));
  const tools = TOOLS_BY_CATEGORY[categoryId];

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { name: "PureText", item: homeUrl },
        { name: copy.hubTitle, item: categoryUrl },
      ]),
      {
        "@type": "ItemList",
        name: copy.hubTitle,
        itemListElement: tools.map((sub, index) => {
          const routeId = `${categoryId}/${sub}` as ToolRouteId;
          const tool = getToolCopy(lang, routeId);
          return {
            "@type": "ListItem",
            position: index + 1,
            name: tool.title,
            url: absoluteCanonicalUrl(localizedPath(lang, toolPath(routeId))),
          };
        }),
      },
      faqPageJsonLd(copy.seoFaq),
    ],
  };
}

export function buildToolJsonLd(lang: Lang, routeId: ToolRouteId, categoryId: CategoryId): Record<string, unknown> {
  const tool = getToolCopy(lang, routeId);
  const category = getCategoryCopy(lang, categoryId);
  const homeUrl = absoluteCanonicalUrl(localizedPath(lang, "/"));
  const categoryUrl = absoluteCanonicalUrl(localizedPath(lang, categoryPath(categoryId)));
  const toolUrl = absoluteCanonicalUrl(localizedPath(lang, toolPath(routeId)));

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { name: "PureText", item: homeUrl },
        { name: category.hubTitle, item: categoryUrl },
        { name: tool.title, item: toolUrl },
      ]),
      {
        "@type": "SoftwareApplication",
        name: tool.title,
        description: tool.seoDescription,
        url: toolUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        inLanguage: HREFLANG_MAP[lang],
      },
      faqPageJsonLd(tool.seoFaq),
    ],
  };
}