"use client";

import type { ReactNode } from "react";

import { KixtGtmRouteSync } from "@/components/analytics/KixtGtmRouteSync";
import { HtmlLangSync } from "@/components/i18n/HtmlLangSync";
import { TextSessionProvider } from "@/context/TextSessionContext";
import { I18nProvider } from "@/i18n/context";
import type { Lang } from "@/i18n/locales";

export function LangShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <I18nProvider initialLang={lang}>
      <TextSessionProvider>
        <HtmlLangSync />
        <KixtGtmRouteSync />
        {children}
      </TextSessionProvider>
    </I18nProvider>
  );
}