import type { MetadataRoute } from "next";

import { CATEGORIES, TOOLS_BY_CATEGORY } from "@/lib/tools/routes";

/**
 * Indexable route stems (without lang prefix).
 * 1 home + 4 category hubs + 9 tools = 14 paths × 6 langs => 84 sitemap URLs.
 */
export const INDEXABLE_PATHS = [
  "/",
  ...CATEGORIES.map((c) => `/${c}`),
  ...CATEGORIES.flatMap((c) => TOOLS_BY_CATEGORY[c].map((sub) => `/${c}/${sub}`)),
] as const;

export type IndexablePath = (typeof INDEXABLE_PATHS)[number];

export type SitemapPageMeta = Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority">;

export function getSitemapPageMeta(path: IndexablePath): SitemapPageMeta {
  if (path === "/") {
    return { changeFrequency: "weekly", priority: 1 };
  }
  if (path.split("/").length === 2) {
    return { changeFrequency: "monthly", priority: 0.75 };
  }
  return { changeFrequency: "weekly", priority: 0.9 };
}