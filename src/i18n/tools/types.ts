import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";

export type SeoFaqItem = { question: string; answer: string };

export type SeoContentBlock = {
  seoUsage: string;
  seoBenefits: string;
  seoFaq: SeoFaqItem[];
};

export type CategoryBaseCopy = {
  name: string;
  nav: string;
  hubTitle: string;
  hubLead: string;
  seoTitle: string;
  seoDescription: string;
  pageIntro: string;
};

export type ToolBaseCopy = {
  title: string;
  description: string;
  hint: string;
  seoTitle: string;
  seoDescription: string;
  pageIntro: string;
};

export type CategoryCopy = CategoryBaseCopy & SeoContentBlock;

export type ToolCopy = ToolBaseCopy & SeoContentBlock;

export type ToolsLocalePack = {
  categories: Record<CategoryId, CategoryBaseCopy>;
  tools: Record<ToolRouteId, ToolBaseCopy>;
};