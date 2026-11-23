import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";

export type CategoryCopy = {
  name: string;
  nav: string;
  hubTitle: string;
  hubLead: string;
};

export type ToolCopy = {
  title: string;
  description: string;
  hint: string;
  seoDescription: string;
};

export type ToolsLocalePack = {
  categories: Record<CategoryId, CategoryCopy>;
  tools: Record<ToolRouteId, ToolCopy>;
};