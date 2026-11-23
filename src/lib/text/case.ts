import type { Lang } from "@/i18n/locales";

import { isStopWord } from "@/lib/text/stopwords";

export type CaseMode =
  | "upper"
  | "lower"
  | "title"
  | "titleSmart"
  | "sentence"
  | "alternate"
  | "invert";

export type AlternateStart = "upper" | "lower";

export type CaseTransformOptions = {
  mode: CaseMode;
  lang: Lang;
  alternateStart: AlternateStart;
};

export function transformCase(text: string, opts: CaseTransformOptions): string {
  switch (opts.mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "title":
      return toTitleCase(text);
    case "titleSmart":
      return toSmartTitleCase(text, opts.lang);
    case "sentence":
      return toSentenceCase(text);
    case "alternate":
      return alternateCase(text, opts.alternateStart);
    case "invert":
      return invertCase(text);
    default:
      return text;
  }
}

/** @deprecated Use transformCase — kept for one-shot apply in other tools */
export function applyCase(text: string, mode: Exclude<CaseMode, "titleSmart" | "invert">): string {
  return transformCase(text, { mode: mode === "title" ? "title" : mode, lang: "en", alternateStart: "upper" });
}

function toTitleCase(text: string): string {
  return text.replace(/\S+/gu, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

function toSmartTitleCase(text: string, lang: Lang): string {
  const parts = text.split(/(\s+)/);
  let seenWord = false;
  return parts
    .map((part) => {
      if (!/\S/.test(part)) return part;
      const lower = part.toLowerCase();
      const capitalize = () => lower.charAt(0).toUpperCase() + lower.slice(1);
      if (!seenWord) {
        seenWord = true;
        return capitalize();
      }
      if (isStopWord(lower, lang) || lower.length <= 2) return lower;
      return capitalize();
    })
    .join("");
}

function toSentenceCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*\p{L})|([.!?…]+[\s"'«»(\[]*\p{L})|(\n\s*\p{L})/gu, (m) => {
    const chars = [...m];
    for (let i = chars.length - 1; i >= 0; i--) {
      const ch = chars[i]!;
      if (/\p{L}/u.test(ch)) {
        chars[i] = ch.toUpperCase();
        break;
      }
    }
    return chars.join("");
  });
}

function alternateCase(text: string, start: AlternateStart): string {
  let wantUpper = start === "upper";
  return [...text]
    .map((ch) => {
      if (!/\p{L}/u.test(ch)) return ch;
      const out = wantUpper ? ch.toUpperCase() : ch.toLowerCase();
      wantUpper = !wantUpper;
      return out;
    })
    .join("");
}

function invertCase(text: string): string {
  return [...text]
    .map((ch) => {
      if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) return ch.toLowerCase();
      if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) return ch.toUpperCase();
      return ch;
    })
    .join("");
}