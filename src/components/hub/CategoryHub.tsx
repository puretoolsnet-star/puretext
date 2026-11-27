"use client";

import Link from "next/link";
import { CategoryIconTile, ToolIconTile } from "@/components/icons/CategoryToolIcons";
import { ChevronRight } from "lucide-react";
import { getCategoryIcon, getToolIcon } from "@/lib/tools/icons";

import { PageSeoSection } from "@/components/seo/PageSeoSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useI18n } from "@/i18n/context";
import { getCategoryCopy, getToolCopy } from "@/i18n/tools/get-copy";
import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";
import { TOOLS_BY_CATEGORY, toolPath } from "@/lib/tools/routes";
import { useLocalizedPath } from "@/lib/i18n/use-localized-path";
import { cn } from "@/lib/cn";

export function CategoryHub({ categoryId }: { categoryId: CategoryId }) {
  const { lang, t } = useI18n();
  const href = useLocalizedPath();
  const copy = getCategoryCopy(lang, categoryId);

  return (
    <div className="puretext-page-shell flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <div className="flex items-start gap-4">
          <CategoryIconTile icon={getCategoryIcon(categoryId)} />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-white">{copy.hubTitle}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{copy.pageIntro}</p>
          </div>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {TOOLS_BY_CATEGORY[categoryId].map((sub) => {
            const routeId = `${categoryId}/${sub}` as ToolRouteId;
            const tool = getToolCopy(lang, routeId);
            const ToolIcon = getToolIcon(routeId);
            return (
              <li key={sub}>
                <Link
                  href={href(toolPath(routeId))}
                  className={cn(
                    "glass-card flex h-full flex-col rounded-2xl border border-slate-800 p-4 transition-colors",
                    "hover:border-teal-500/40",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <ToolIconTile icon={ToolIcon} />
                    <h2 className="text-sm font-semibold text-white">{tool.title}</h2>
                  </div>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500">{tool.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-teal-300">
                    {t.home.openCategory}
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <PageSeoSection content={copy} />
      </main>
      <SiteFooter />
    </div>
  );
}