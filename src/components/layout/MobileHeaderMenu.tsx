"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BodyPortal } from "@/components/layout/BodyPortal";
import { EcosystemProjectList } from "@/components/layout/EcosystemProjectList";
import { useI18n } from "@/i18n/context";
import { LANG_LABELS, LANGS, type Lang } from "@/i18n/locales";
import { Z } from "@/lib/layer-stack";
import { cn } from "@/lib/cn";

export function MobileHeaderMenu() {
  const { lang, setLang, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
      <button
        type="button"
        aria-expanded={menuOpen}
        aria-label={t.nav.menuAria}
        onClick={() => setMenuOpen((o) => !o)}
        className="glass-card inline-flex h-10 w-10 items-center justify-center rounded-xl border-slate-800 md:hidden"
      >
        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      <BodyPortal open={menuOpen}>
        <div
          className="fixed inset-0 flex flex-col bg-slate-950 md:hidden"
          style={{ zIndex: Z.mobileMenu }}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuAria}
        >
          <div className="flex shrink-0 items-center justify-end border-b border-slate-800 bg-slate-950 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <CloseButton onClose={() => setMenuOpen(false)} label={t.nav.menuClose} />
          </div>
          <nav
            className="min-h-0 flex-1 space-y-8 overflow-y-auto overscroll-contain bg-slate-950 px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
            aria-label={t.nav.menuAria}
          >
            <section aria-labelledby="mobile-menu-lang">
              <p
                id="mobile-menu-lang"
                className="text-xs font-medium uppercase tracking-wide text-slate-500"
              >
                {t.nav.selectLanguage}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {LANGS.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm",
                      code === lang
                        ? "border-teal-400/50 bg-teal-500/20 text-teal-200"
                        : "border-slate-700 bg-slate-900 text-slate-300",
                    )}
                    onClick={() => {
                      setLang(code as Lang);
                      setMenuOpen(false);
                    }}
                  >
                    {LANG_LABELS[code].native}
                  </button>
                ))}
              </div>
            </section>

            <section aria-labelledby="mobile-menu-ecosystem">
              <p
                id="mobile-menu-ecosystem"
                className="text-xs font-medium uppercase tracking-wide text-teal-400/90"
              >
                {t.ecosystem.menuLabel}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{t.ecosystem.menuHint}</p>
              <EcosystemProjectList className="mt-4" onNavigate={() => setMenuOpen(false)} />
            </section>
          </nav>
        </div>
      </BodyPortal>
    </>
  );
}

function CloseButton({ onClose, label }: { onClose: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
      aria-label={label}
    >
      <X className="h-5 w-5" />
    </button>
  );
}