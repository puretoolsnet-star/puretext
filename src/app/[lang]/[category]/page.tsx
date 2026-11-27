import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryHub } from "@/components/hub/CategoryHub";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLang, type Lang } from "@/i18n/locales";
import { buildCategoryMetadata } from "@/lib/seo/metadata";
import { buildCategoryJsonLd } from "@/lib/seo/structured-data";
import { CATEGORIES, type CategoryId } from "@/lib/tools/routes";

type PageProps = { params: Promise<{ lang: string; category: string }> };

export async function generateStaticParams() {
  return CATEGORIES.flatMap((category) =>
    ["en", "uk", "de", "es", "pl", "fr"].map((lang) => ({ lang, category })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: raw, category } = await params;
  const lang = isLang(raw) ? raw : "en";
  if (!(CATEGORIES as readonly string[]).includes(category)) return {};
  return buildCategoryMetadata(category as CategoryId, lang);
}

export default async function CategoryPage({ params }: PageProps) {
  const { lang: raw, category } = await params;
  if (!(CATEGORIES as readonly string[]).includes(category)) notFound();
  const lang: Lang = isLang(raw) ? raw : "en";
  const categoryId = category as CategoryId;
  return (
    <>
      <JsonLd data={buildCategoryJsonLd(lang, categoryId)} />
      <CategoryHub categoryId={categoryId} />
    </>
  );
}