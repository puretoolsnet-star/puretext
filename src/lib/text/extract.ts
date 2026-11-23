export type ExtractKind = "email" | "url" | "number";

export type ExtractResult = {
  items: string[];
  totalMatches: number;
};

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
const URL_RE = /https?:\/\/[^\s<>"{}|\\^`[\]]+/gi;
const NUMBER_RE = /-?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?|-?\d+,\d+/g;

export function extractFromText(text: string, kind: ExtractKind, uniqueOnly = true): ExtractResult {
  const matches = collectMatches(text, kind);
  const cleaned = matches.map((m) => cleanMatch(m, kind));
  const totalMatches = cleaned.length;
  const items = uniqueOnly ? uniquePreserveOrder(cleaned, kind) : cleaned;
  return { items, totalMatches };
}

export function extractCounts(text: string, uniqueOnly = true): Record<ExtractKind, number> {
  return {
    email: extractFromText(text, "email", uniqueOnly).items.length,
    url: extractFromText(text, "url", uniqueOnly).items.length,
    number: extractFromText(text, "number", uniqueOnly).items.length,
  };
}

function collectMatches(text: string, kind: ExtractKind): string[] {
  const re = kind === "email" ? EMAIL_RE : kind === "url" ? URL_RE : NUMBER_RE;
  return [...text.matchAll(re)].map((m) => m[0]);
}

function cleanMatch(value: string, kind: ExtractKind): string {
  if (kind === "number") return normalizeNumber(value);
  return trimEdgePunctuation(value.trim());
}

function trimEdgePunctuation(value: string): string {
  return value
    .replace(/^[<(\['"`]+/u, "")
    .replace(/[.,;:!?)>\]'"]+$/u, "");
}

function normalizeNumber(raw: string): string {
  const v = raw.trim();
  if (v.includes(",") && !v.includes(".")) {
    const parts = v.split(",");
    if (parts.length === 2 && parts[1]?.length <= 3) return `${parts[0]}.${parts[1]}`;
  }
  return v.replace(/,/g, "");
}

function uniquePreserveOrder(items: string[], kind: ExtractKind): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = kind === "email" || kind === "url" ? item.toLocaleLowerCase() : item;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

/** @deprecated */
export function extractEmails(text: string): string[] {
  return extractFromText(text, "email", true).items;
}

export function extractUrls(text: string): string[] {
  return extractFromText(text, "url", true).items;
}

export function extractNumbers(text: string): string[] {
  return extractFromText(text, "number", true).items;
}