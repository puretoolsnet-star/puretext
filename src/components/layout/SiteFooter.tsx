"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/i18n/context";
import {
  ECOSYSTEM_PROJECTS,
  ecosystemHref,
  isCurrentEcosystemProject,
  kixtHubHref,
} from "@/lib/ecosystem";
import { cn } from "@/lib/cn";

export function SiteFooter() {
  const { t, lang } = useI18n();

  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/90 py-8" aria-label={t.footer.networkAria}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <section>
          <h2 className="text-sm font-semibold text-white">{t.footer.ecosystemTitle}</h2>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">{t.footer.ecosystemLead}</p>
          <ul className="mt-4 flex flex-wrap gap-2" role="list">
            {ECOSYSTEM_PROJECTS.map((project) => {
              const copy = t.ecosystem.items[project.id];
              const isCurrent = isCurrentEcosystemProject(project.id);
              const href = ecosystemHref(project, lang);
              const pillClass = cn(
                "inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isCurrent
                  ? "border-teal-500/40 bg-teal-500/10 text-teal-200"
                  : href
                    ? "border-slate-700 text-slate-300 hover:border-teal-500/40 hover:text-teal-200"
                    : "cursor-default border-slate-800 text-slate-500",
              );
              const label = (
                <>
                  <span className="truncate">{copy.name}</span>
                  {isCurrent ? (
                    <span className="shrink-0 text-[10px] uppercase text-teal-300">
                      {t.ecosystem.currentShort}
                    </span>
                  ) : href && project.external ? (
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-60" aria-hidden />
                  ) : null}
                </>
              );
              return (
                <li key={project.id}>
                  {href && project.external ? (
                    <a href={href} rel="noopener noreferrer" className={pillClass} title={copy.tagline}>
                      {label}
                    </a>
                  ) : href ? (
                    <Link href={href} className={pillClass} aria-current="page">
                      {label}
                    </Link>
                  ) : (
                    <span className={pillClass}>{label}</span>
                  )}
                </li>
              );
            })}
            <li>
              <a
                href={kixtHubHref(lang)}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-xs font-medium text-teal-200"
              >
                {t.footer.kixtHub}
                <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
              </a>
            </li>
          </ul>
        </section>
        <div
          id="puretext-ad-footer"
          className="mt-6 min-h-0 w-full"
          data-ad-slot="footer-responsive"
          data-adsense-unit=""
          aria-hidden
        />
        <p className="mt-6 text-center text-[11px] text-slate-600">
          {t.brand.name} · {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}