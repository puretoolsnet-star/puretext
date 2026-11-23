import type { Metadata } from "next";

import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLang, type Lang } from "@/i18n/locales";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildHomeJsonLd } from "@/lib/seo/structured-data";

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = isLang(raw) ? raw : "en";
  return buildPageMetadata("home", lang);
}

export default async function Page({ params }: PageProps) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  return (
    <>
      <JsonLd data={buildHomeJsonLd(lang)} />
      <HomePage />
    </>
  );
}