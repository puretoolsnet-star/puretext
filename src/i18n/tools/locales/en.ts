import type { ToolsLocalePack } from "@/i18n/tools/types";

export const en: ToolsLocalePack = {
  categories: {
    analysis: {
      name: "Analysis & counts",
      nav: "Analyze",
      hubTitle: "Analysis & counters",
      hubLead: "Character, word, and reading-time stats plus word frequency.",
    },
    cleanup: {
      name: "Clean & format",
      nav: "Clean",
      hubTitle: "Cleaning & formatting",
      hubLead: "Case transforms, whitespace/HTML cleanup, and messenger-friendly wrapping.",
    },
    lines: {
      name: "Lines & lists",
      nav: "Lines",
      hubTitle: "Lines & lists",
      hubLead: "Deduplicate, sort, number, and pull emails, URLs, or numbers.",
    },
    diff: {
      name: "Text comparison",
      nav: "Diff",
      hubTitle: "Compare texts",
      hubLead: "Side-by-side diff with optional space and case insensitivity.",
    },
  },
  tools: {
    "analysis/char-counter": {
      title: "Character & word counter",
      description: "Live stats, read/speak time, limits, top words, copy or download reports — all local.",
      hint: "Set a character limit preset or custom cap; export TXT/CSV without uploading.",
      seoDescription: "Free character and word counter with reading time — no upload.",
    },
    "analysis/word-frequency": {
      title: "Word frequency",
      description: "Unigrams, bigrams, and trigrams with filters, bars, highlights, and CSV/TXT export.",
      hint: "Tap a row to see occurrences; stop-word lists follow your UI language.",
      seoDescription: "Word frequency and keyword repetition counter in the browser.",
    },
    "cleanup/case": {
      title: "Text case",
      description: "Live preview for all case modes, smart titles, invert, copy/download, and apply.",
      hint: "Source text stays in the editor until you replace it with the preview result.",
      seoDescription: "Change text case online without sending data to a server.",
    },
    "cleanup/clean": {
      title: "Clean text",
      description: "HTML-aware strip, invisible chars, line modes, presets, live diff stats, export.",
      hint: "Use presets or mix options — preview and before/after metrics update instantly.",
      seoDescription: "Strip HTML and normalize whitespace locally.",
    },
    "cleanup/format-post": {
      title: "Format for posts",
      description:
        "Smart paragraph breaks, line wrapping, post limits, presets, and live preview — all in the browser.",
      hint: "Try feed presets, set sentences per paragraph or char budget, then copy or apply the result.",
      seoDescription:
        "Split text into social-friendly paragraphs, wrap lines at word boundaries, and track character limits.",
    },
    "lines/dedupe": {
      title: "Remove duplicate lines",
      description:
        "First occurrence wins — case, trim, space collapse, empty lines, live stats, and duplicate report.",
      hint: "Use demo text, tune comparison options, then copy or apply the unique list.",
      seoDescription: "Deduplicate lines locally with flexible matching rules.",
    },
    "lines/sort-lines": {
      title: "Sort & number lines",
      description:
        "A–Z, length, locale-aware sort, prefixes/suffixes, numbering formats — live preview in the browser.",
      hint: "Pick sort mode, add affixes or numbers, then copy or apply the result.",
      seoDescription: "Sort and number lines locally with prefixes and flexible options.",
    },
    "lines/extract": {
      title: "Extract data",
      description:
        "Emails, URLs, and numbers with unique filter, per-row copy, and bulk export — all local.",
      hint: "Switch type tabs, copy one match or the full list, download as .txt.",
      seoDescription: "Extract emails, links, and numbers from text in your browser.",
    },
    "diff/compare": {
      title: "Text diff",
      description: "Line and word-level diff, stats, filters, swap A↔B, and report export.",
      hint: "Load demo texts, adjust options, copy or download the diff report.",
      seoDescription: "Compare two texts with a visual diff — private and fast.",
    },
  },
};