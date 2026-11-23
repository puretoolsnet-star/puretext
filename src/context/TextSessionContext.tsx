"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getDemoText, getDiffDemoPair, type DemoSource } from "@/lib/text/demo";
import type { Lang } from "@/i18n/locales";

type TextSessionValue = {
  text: string;
  setText: (value: string) => void;
  demoSource: DemoSource;
  setDemoSource: (source: DemoSource) => void;
  diffOriginal: string;
  diffModified: string;
  setDiffOriginal: (value: string) => void;
  setDiffModified: (value: string) => void;
  loadDemo: (lang: Lang) => void;
  loadDiffDemo: (lang: Lang) => void;
  clear: () => void;
  clearDiff: () => void;
};

const TextSessionContext = createContext<TextSessionValue | null>(null);

export function TextSessionProvider({ children }: { children: ReactNode }) {
  const [text, setText] = useState("");
  const [diffOriginal, setDiffOriginal] = useState("");
  const [diffModified, setDiffModified] = useState("");
  const [demoSource, setDemoSource] = useState<DemoSource>("default");

  const loadDemo = useCallback(
    (lang: Lang) => {
      setText(getDemoText(lang, demoSource));
    },
    [demoSource],
  );

  const loadDiffDemo = useCallback((lang: Lang) => {
    const pair = getDiffDemoPair(lang);
    setDiffOriginal(pair.original);
    setDiffModified(pair.modified);
  }, []);

  const clear = useCallback(() => {
    setText("");
  }, []);

  const clearDiff = useCallback(() => {
    setDiffOriginal("");
    setDiffModified("");
  }, []);

  const value = useMemo(
    () => ({
      text,
      setText,
      diffOriginal,
      diffModified,
      setDiffOriginal,
      setDiffModified,
      demoSource,
      setDemoSource,
      loadDemo,
      loadDiffDemo,
      clear,
      clearDiff,
    }),
    [text, diffOriginal, diffModified, demoSource, loadDemo, loadDiffDemo, clear, clearDiff],
  );

  return <TextSessionContext.Provider value={value}>{children}</TextSessionContext.Provider>;
}

export function useTextSession() {
  const ctx = useContext(TextSessionContext);
  if (!ctx) throw new Error("useTextSession requires TextSessionProvider");
  return ctx;
}