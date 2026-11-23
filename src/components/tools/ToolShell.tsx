"use client";

import { ArrowLeft, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { CategoryIconTile } from "@/components/icons/CategoryToolIcons";
import { CategoryToolTabs } from "@/components/tools/CategoryToolTabs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { useI18n } from "@/i18n/context";
import { getCategoryCopy, getToolCopy } from "@/i18n/tools/get-copy";
import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";
import { getCategoryIcon } from "@/lib/tools/icons";
import { categoryPath } from "@/lib/tools/routes";
import { useLocalizedPath } from "@/lib/i18n/use-localized-path";

export function ToolShell({
  routeId,
  categoryId,
  icon: Icon,
  children,
}: {
  routeId: ToolRouteId;
  categoryId: CategoryId;
  icon: LucideIcon;
  children: ReactNode;
}) {
  const { lang } = useI18n();
  const href = useLocalizedPath();
  const copy = getToolCopy(lang, routeId);
  const category = getCategoryCopy(lang, categoryId);
  const CategoryIcon = getCategoryIcon(categoryId);

  return (
    <div className="puretext-page-shell flex min-h-dvh flex-col">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <Link
          href={href(categoryPath(categoryId))}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-teal-300"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <CategoryIconTile icon={CategoryIcon} size="sm" />
          {category.hubTitle}
        </Link>
        <CategoryToolTabs categoryId={categoryId} activeRouteId={routeId} />
        <header className="mt-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 ring-1 ring-teal-400/35">
            <Icon className="h-6 w-6 text-teal-300" aria-hidden />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-white">{copy.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{copy.pageIntro}</p>
            <p className="mt-2 text-xs text-teal-300/80">{copy.hint}</p>
          </div>
        </header>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_160px]">
          <main className="glass-card min-w-0 rounded-2xl border border-slate-800 p-4 sm:p-6">{children}</main>
          <aside
            id="puretext-ad-tool-sidebar"
            className="hidden min-h-[200px] lg:block"
            data-ad-slot="tool-sidebar"
            data-adsense-unit=""
            aria-hidden
          />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}