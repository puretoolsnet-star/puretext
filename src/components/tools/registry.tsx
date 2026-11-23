"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { ToolRouteId } from "@/lib/tools/routes";

function lazy<T extends ComponentType<object>>(loader: () => Promise<{ default: T }>) {
  return dynamic(loader, { loading: () => <p className="text-sm text-slate-500">…</p> });
}

export const TOOL_PANELS: Record<ToolRouteId, ReturnType<typeof lazy>> = {
  "analysis/char-counter": lazy(() => import("./panels/analysis").then((m) => ({ default: m.CharCounterPanel }))),
  "analysis/word-frequency": lazy(() => import("./panels/analysis").then((m) => ({ default: m.WordFrequencyPanel }))),
  "cleanup/case": lazy(() => import("./panels/cleanup").then((m) => ({ default: m.CasePanel }))),
  "cleanup/clean": lazy(() => import("./panels/cleanup").then((m) => ({ default: m.CleanPanel }))),
  "cleanup/format-post": lazy(() => import("./panels/cleanup").then((m) => ({ default: m.FormatPostPanel }))),
  "lines/dedupe": lazy(() => import("./panels/lines").then((m) => ({ default: m.DedupePanel }))),
  "lines/sort-lines": lazy(() => import("./panels/lines").then((m) => ({ default: m.SortLinesPanel }))),
  "lines/extract": lazy(() => import("./panels/lines").then((m) => ({ default: m.ExtractPanel }))),
  "diff/compare": lazy(() => import("./panels/diff").then((m) => ({ default: m.ComparePanel }))),
};