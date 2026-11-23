"use client";

import Link from "next/link";
import { CategoryIconTile, ToolIconInline } from "@/components/icons/CategoryToolIcons";
import { ChevronRight } from "lucide-react";
import { getCategoryIcon, getToolIcon } from "@/lib/tools/icons";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useI18n } from "@/i18n/context";
import { getCategoryCopy } from "@/i18n/tools/get-copy";
import { CATEGORIES, categoryPath, TOOLS_BY_CATEGORY } from "@/lib/tools/routes";
import { getToolCopy } from "@/i18n/tools/get-copy";
import { useLocalizedPath } from "@/lib/i18n/use-localized-path";
import { toolPath, type ToolRouteId } from "@/lib/tools/routes";
import { cn } from "@/lib/cn";

export function HomePage() {
  const { t, lang } = useI18n();
  const href = useLocalizedPath();

  return (
    <div className="puretext-page-shell flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-white">{t.home.heroTitle}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-400">{t.home.heroSubtitle}</p>
        </header>
        <section className="mt-8 glass-card rounded-2xl border border-teal-500/20 bg-teal-500/10 p-4 sm:p-5">
          <h2 className="text-sm font-medium text-teal-200">{t.security.title}</h2>
          <p className="mt-2 text-xs text-slate-400">{t.security.body}</p>
        </section>
        <h2 className="mt-10 text-lg font-semibold text-white">{t.home.categoriesHeading}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {CATEGORIES.map((cat) => {
            const copy = getCategoryCopy(lang, cat);
            const CatIcon = getCategoryIcon(cat);
            return (
              <article
                key={cat}
                className={cn(
                  "glass-card flex h-full flex-col rounded-2xl border border-slate-800 p-4 transition-colors",
                  "hover:border-teal-500/40",
                )}
              >
                <Link href={href(categoryPath(cat))} className="group">
                  <div className="flex items-start gap-3">
                    <CategoryIconTile icon={CatIcon} />
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-white group-hover:text-teal-200">{copy.name}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{copy.hubLead}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-teal-300">
                        {t.home.openCategory}
                        <ChevronRight className="h-3 w-3" aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
                <ul className="mt-4 space-y-1 border-t border-slate-800/80 pt-3">
                  {TOOLS_BY_CATEGORY[cat].map((sub) => {
                    const routeId = `${cat}/${sub}` as ToolRouteId;
                    const tool = getToolCopy(lang, routeId);
                    const ToolIcon = getToolIcon(routeId);
                    return (
                      <li key={sub}>
                        <Link
                          href={href(toolPath(routeId))}
                          className="flex items-center gap-2 truncate rounded-lg px-2 py-1.5 text-xs text-slate-400 hover:bg-slate-800/60 hover:text-teal-200"
                        >
                          <ToolIconInline icon={ToolIcon} />
                          <span className="truncate">{tool.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
        <section className="mt-12 glass-card rounded-2xl border border-slate-800 p-5">
          <h2 className="text-sm font-semibold text-white">{t.faq.heading}</h2>
          <dl className="mt-4 space-y-4">
            {t.faq.items.map((item) => (
              <div key={item.question}>
                <dt className="text-sm font-medium text-teal-200">{item.question}</dt>
                <dd className="mt-1 text-xs text-slate-400">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}