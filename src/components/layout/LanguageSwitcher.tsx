"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n/context";
import { LANG_LABELS, LANGS, type Lang } from "@/i18n/locales";
import { cn } from "@/lib/cn";
import { Z } from "@/lib/layer-stack";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const current = LANG_LABELS[lang];

  return (
    <div className="relative hidden md:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="glass-card flex items-center gap-2 rounded-xl border border-slate-700/80 px-2.5 py-2 text-sm text-slate-200 hover:border-teal-500/40"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.nav.selectLanguage}
      >
        <span aria-hidden>{current.flag}</span>
        <span className="font-medium">{current.code}</span>
        <ChevronDown className={cn("h-4 w-4 text-slate-500", open && "rotate-180")} />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 py-1 shadow-xl"
          style={{ zIndex: Z.dropdown }}
        >
          {LANGS.map((code) => {
            const item = LANG_LABELS[code];
            const selected = code === lang;
            return (
              <li key={code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm",
                    selected ? "bg-teal-500/15 text-teal-200" : "text-slate-300 hover:bg-slate-800",
                  )}
                  onClick={() => {
                    setLang(code as Lang);
                    setOpen(false);
                  }}
                >
                  <span aria-hidden>{item.flag}</span>
                  <span>{item.native}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}