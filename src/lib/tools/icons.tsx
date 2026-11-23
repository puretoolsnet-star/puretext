import {
  AlignLeft,
  BarChart3,
  Braces,
  CaseSensitive,
  Eraser,
  FileDiff,
  Hash,
  Layers,
  LineChart,
  Link2,
  ListOrdered,
  ListTree,
  Mail,
  Merge,
  Pilcrow,
  RemoveFormatting,
  Rows3,
  Sparkles,
  TextQuote,
  Type,
  type LucideIcon,
} from "lucide-react";

import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";

export const CATEGORY_ICONS: Record<CategoryId, LucideIcon> = {
  analysis: BarChart3,
  cleanup: Sparkles,
  lines: ListTree,
  diff: FileDiff,
};

export const TOOL_ICONS: Record<ToolRouteId, LucideIcon> = {
  "analysis/char-counter": Hash,
  "analysis/word-frequency": LineChart,
  "cleanup/case": CaseSensitive,
  "cleanup/clean": Eraser,
  "cleanup/format-post": Pilcrow,
  "lines/dedupe": Layers,
  "lines/sort-lines": ListOrdered,
  "lines/extract": Braces,
  "diff/compare": FileDiff,
};

export function getCategoryIcon(id: CategoryId): LucideIcon {
  return CATEGORY_ICONS[id];
}

export function getToolIcon(id: ToolRouteId): LucideIcon {
  return TOOL_ICONS[id];
}

export {
  AlignLeft,
  TextQuote,
  Type,
  RemoveFormatting,
  Rows3,
  Link2,
  Mail,
  Merge,
};