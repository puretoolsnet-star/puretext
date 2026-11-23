import { notFound } from "next/navigation";

import { LangShell } from "@/components/i18n/LangShell";
import { isLang, LANGS, type Lang } from "@/i18n/locales";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  return <LangShell lang={raw as Lang}>{children}</LangShell>;
}