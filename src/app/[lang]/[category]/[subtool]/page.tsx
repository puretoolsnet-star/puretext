import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { ToolRouteClient } from "@/components/tools/ToolRouteClient";
import { isLang, type Lang } from "@/i18n/locales";
import { buildToolMetadata } from "@/lib/seo/metadata";
import { buildToolJsonLd } from "@/lib/seo/structured-data";
import { CATEGORIES, TOOLS_BY_CATEGORY, routeFromSegments, type CategoryId } from "@/lib/tools/routes";

type PageProps = { params: Promise<{ lang: string; category: string; subtool: string }> };

export function generateStaticParams() {
  const langs = ["en", "uk", "de", "es", "pl", "fr"];
  return CATEGORIES.flatMap((category) =>
    TOOLS_BY_CATEGORY[category].flatMap((subtool) => langs.map((lang) => ({ lang, category, subtool }))),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: raw, category, subtool } = await params;
  const lang = isLang(raw) ? raw : "en";
  const routeId = routeFromSegments(category, subtool);
  if (!routeId) return {};
  return buildToolMetadata(routeId, lang);
}

export default async function ToolPage({ params }: PageProps) {
  const { lang: raw, category, subtool } = await params;
  const routeId = routeFromSegments(category, subtool);
  if (!routeId) notFound();
  const lang: Lang = isLang(raw) ? raw : "en";
  return (
    <>
      <JsonLd data={buildToolJsonLd(lang, routeId, category as CategoryId)} />
      <ToolRouteClient routeId={routeId} categoryId={category as CategoryId} />
    </>
  );
}