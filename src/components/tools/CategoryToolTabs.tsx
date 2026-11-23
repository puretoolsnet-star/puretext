"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ToolIconInline } from "@/components/icons/CategoryToolIcons";
import { useI18n } from "@/i18n/context";
import { getToolCopy } from "@/i18n/tools/get-copy";
import { stripLangPrefix } from "@/lib/i18n/routing";
import { useLocalizedPath } from "@/lib/i18n/use-localized-path";
import { getToolIcon } from "@/lib/tools/icons";
import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";
import { TOOLS_BY_CATEGORY, toolPath } from "@/lib/tools/routes";
import { cn } from "@/lib/cn";

export function CategoryToolTabs({
  categoryId,
  activeRouteId,
}: {
  categoryId: CategoryId;
  activeRouteId: ToolRouteId;
}) {
  const { lang } = useI18n();
  const href = useLocalizedPath();
  const pathname = usePathname();

  return (
    <nav
      className="mt-6 -mb-1 flex gap-1 overflow-x-auto pb-1"
      aria-label={getToolCopy(lang, activeRouteId).title}
    >
      {TOOLS_BY_CATEGORY[categoryId].map((sub) => {
        const routeId = `${categoryId}/${sub}` as ToolRouteId;
        const tool = getToolCopy(lang, routeId);
        const Icon = getToolIcon(routeId);
        const target = href(toolPath(routeId));
        const active =
          activeRouteId === routeId || stripLangPrefix(pathname ?? "") === toolPath(routeId);

        return (
          <Link
            key={sub}
            href={target}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-medium transition-colors sm:py-1.5",
              active
                ? "border-teal-400/45 bg-teal-500/15 text-teal-100"
                : "border-slate-800 text-slate-400 hover:border-teal-500/30 hover:text-teal-200",
            )}
          >
            <ToolIconInline icon={Icon} className={active ? "text-teal-200" : undefined} />
            <span className="max-w-[10rem] truncate">{tool.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}