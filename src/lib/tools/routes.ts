export const CATEGORIES = ["analysis", "cleanup", "lines", "diff"] as const;
export type CategoryId = (typeof CATEGORIES)[number];

export const TOOLS_BY_CATEGORY = {
  analysis: ["char-counter", "word-frequency"] as const,
  cleanup: ["case", "clean", "format-post"] as const,
  lines: ["dedupe", "sort-lines", "extract"] as const,
  diff: ["compare"] as const,
} as const;

export type AnalysisToolId = (typeof TOOLS_BY_CATEGORY.analysis)[number];
export type CleanupToolId = (typeof TOOLS_BY_CATEGORY.cleanup)[number];
export type LinesToolId = (typeof TOOLS_BY_CATEGORY.lines)[number];
export type DiffToolId = (typeof TOOLS_BY_CATEGORY.diff)[number];

export type SubtoolId<C extends CategoryId = CategoryId> = (typeof TOOLS_BY_CATEGORY)[C][number];

export type ToolRouteId =
  | `analysis/${AnalysisToolId}`
  | `cleanup/${CleanupToolId}`
  | `lines/${LinesToolId}`
  | `diff/${DiffToolId}`;

export const TOOL_ROUTE_IDS = CATEGORIES.flatMap((category) =>
  TOOLS_BY_CATEGORY[category].map((sub) => `${category}/${sub}` as ToolRouteId),
);

export function toolPath(routeId: ToolRouteId): string {
  return `/${routeId}`;
}

export function categoryPath(category: CategoryId): string {
  return `/${category}`;
}

export function parseToolRoute(routeId: string): ToolRouteId | null {
  if ((TOOL_ROUTE_IDS as string[]).includes(routeId)) return routeId as ToolRouteId;
  return null;
}

export function routeFromSegments(category: string, subtool: string): ToolRouteId | null {
  if (!(CATEGORIES as readonly string[]).includes(category)) return null;
  const list = TOOLS_BY_CATEGORY[category as CategoryId];
  if (!(list as readonly string[]).includes(subtool)) return null;
  return parseToolRoute(`${category}/${subtool}`);
}