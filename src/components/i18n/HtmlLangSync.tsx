"use client";

import { useEffect } from "react";

import { useI18n } from "@/i18n/context";

export function HtmlLangSync() {
  const { lang } = useI18n();
  useEffect(() => {
    document.documentElement.lang = lang === "uk" ? "uk" : lang;
  }, [lang]);
  return null;
}