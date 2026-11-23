import { CATEGORIES, TOOLS_BY_CATEGORY } from "@/lib/tools/routes";

export const INDEXABLE_PATHS = [
  "/",
  ...CATEGORIES.map((c) => `/${c}`),
  ...CATEGORIES.flatMap((c) => TOOLS_BY_CATEGORY[c].map((sub) => `/${c}/${sub}`)),
] as const;