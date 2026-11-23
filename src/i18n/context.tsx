"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_LANG, dictionaries, STORAGE_KEY, type Lang } from "@/i18n/locales";
import type { Dictionary } from "@/i18n/types";
import { langFromPathname, localizedPath, stripLangPrefix } from "@/lib/i18n/routing";

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  initialLang = DEFAULT_LANG,
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const fromPath = langFromPathname(pathname);
    if (!fromPath || fromPath === lang) return;
    const id = window.requestAnimationFrame(() => setLangState(fromPath));
    return () => window.cancelAnimationFrame(id);
  }, [pathname, lang]);

  useEffect(() => {
    document.documentElement.lang = lang === "uk" ? "uk" : lang;
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode */
      }
      document.documentElement.lang = next === "uk" ? "uk" : next;
      const rest = stripLangPrefix(pathname);
      router.push(localizedPath(next, rest));
    },
    [pathname, router],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}