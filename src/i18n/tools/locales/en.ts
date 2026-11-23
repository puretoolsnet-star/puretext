import type { ToolsLocalePack } from "@/i18n/tools/types";

export const en: ToolsLocalePack = {
  categories: {
    analysis: {
      name: "Analysis & counts",
      nav: "Analyze",
      hubTitle: "Analysis & counters",
      hubLead: "Character, word, and reading-time stats plus word frequency.",
      seoTitle: "Text analysis & counters",
      seoDescription:
        "Count characters and words, estimate reading time, and analyze word frequency in your browser. Six languages on text.kixt.net — no uploads.",
      pageIntro:
        "Measure length, reading time, and repetition before you publish. Every counter and frequency report runs locally in your browser, so drafts are never sent to a server.",
    },
    cleanup: {
      name: "Clean & format",
      nav: "Clean",
      hubTitle: "Cleaning & formatting",
      hubLead: "Case transforms, whitespace/HTML cleanup, and messenger-friendly wrapping.",
      seoTitle: "Clean & format text online",
      seoDescription:
        "Change case, strip HTML, normalize whitespace, and format posts for social feeds. Private tools at text.kixt.net — 100% client-side.",
      pageIntro:
        "Fix messy copy, unwanted markup, and awkward line breaks in one place. Processing stays on your device: paste text, adjust options, and copy the result without uploading.",
    },
    lines: {
      name: "Lines & lists",
      nav: "Lines",
      hubTitle: "Lines & lists",
      hubLead: "Deduplicate, sort, number, and pull emails, URLs, or numbers.",
      seoTitle: "Line tools: dedupe, sort, extract",
      seoDescription:
        "Remove duplicate lines, sort and number lists, extract emails, URLs, and numbers. Free in-browser tools on text.kixt.net.",
      pageIntro:
        "Work with lists, logs, and exports line by line. Deduplication, sorting, numbering, and extraction all happen in the browser — your source text is not stored on our servers.",
    },
    diff: {
      name: "Text comparison",
      nav: "Diff",
      hubTitle: "Compare texts",
      hubLead: "Side-by-side diff with optional space and case insensitivity.",
      seoTitle: "Compare two texts (diff)",
      seoDescription:
        "Visual line and word diff with stats, filters, and report export. Compare document versions privately at text.kixt.net.",
      pageIntro:
        "Spot additions, removals, and inline edits between two versions. The diff engine runs entirely in your browser, so confidential drafts never leave your machine.",
    },
  },
  tools: {
    "analysis/char-counter": {
      title: "Character & word counter",
      description: "Live stats, read/speak time, limits, top words, copy or download reports — all local.",
      hint: "Set a character limit preset or custom cap; export TXT/CSV without uploading.",
      seoTitle: "Character & word counter (browser)",
      seoDescription:
        "Free online character and word counter with sentences, paragraphs, and reading time. Works locally on text.kixt.net — no sign-up.",
      pageIntro:
        "Paste or type text to see live counts, limits, and reading or speaking time. Statistics and exports are computed in your browser only; nothing is uploaded or saved on a server.",
    },
    "analysis/word-frequency": {
      title: "Word frequency",
      description: "Unigrams, bigrams, and trigrams with filters, bars, highlights, and CSV/TXT export.",
      hint: "Tap a row to see occurrences; stop-word lists follow your UI language.",
      seoTitle: "Word frequency & repetition counter",
      seoDescription:
        "Find the most common words, bigrams, and trigrams in any text. Browser-based analysis on text.kixt.net — private and fast.",
      pageIntro:
        "Discover which terms dominate your draft and jump to each occurrence. Frequency tables are built on your device, so proprietary or personal text stays offline.",
    },
    "cleanup/case": {
      title: "Text case",
      description: "Live preview for all case modes, smart titles, invert, copy/download, and apply.",
      hint: "Source text stays in the editor until you replace it with the preview result.",
      seoTitle: "Change text case online",
      seoDescription:
        "Convert text to upper, lower, title, sentence, or alternating case with live preview. Client-side on text.kixt.net.",
      pageIntro:
        "Normalize capitalization for titles, headings, or bulk edits in seconds. Preview updates instantly in the browser; your original text is not transmitted anywhere.",
    },
    "cleanup/clean": {
      title: "Clean text",
      description: "HTML-aware strip, invisible chars, line modes, presets, live diff stats, export.",
      hint: "Use presets or mix options — preview and before/after metrics update instantly.",
      seoTitle: "Clean text: HTML & whitespace",
      seoDescription:
        "Remove HTML tags, extra spaces, invisible characters, and line noise. Clean copy locally at text.kixt.net.",
      pageIntro:
        "Turn pasted web content or messy exports into plain, consistent text. Cleaning rules run client-side with a live before/after view — no server storage.",
    },
    "cleanup/format-post": {
      title: "Format for posts",
      description:
        "Smart paragraph breaks, line wrapping, post limits, presets, and live preview — all in the browser.",
      hint: "Try feed presets, set sentences per paragraph or char budget, then copy or apply the result.",
      seoTitle: "Format text for social posts",
      seoDescription:
        "Split long text into feed-friendly paragraphs, wrap lines, and track character limits. Browser tool on text.kixt.net.",
      pageIntro:
        "Prepare newsletters, threads, or captions with readable breaks and length checks. Wrapping and paragraph logic execute locally; your post draft never leaves the tab.",
    },
    "lines/dedupe": {
      title: "Remove duplicate lines",
      description:
        "First occurrence wins — case, trim, space collapse, empty lines, live stats, and duplicate report.",
      hint: "Use demo text, tune comparison options, then copy or apply the unique list.",
      seoTitle: "Remove duplicate lines online",
      seoDescription:
        "Deduplicate line lists with flexible matching (case, spaces, empty lines). Private browser tool on text.kixt.net.",
      pageIntro:
        "Collapse repeated rows in logs, SKU lists, or email blocks while keeping the first occurrence. The comparison runs entirely in your browser without sending the list upstream.",
    },
    "lines/sort-lines": {
      title: "Sort & number lines",
      description:
        "A–Z, length, locale-aware sort, prefixes/suffixes, numbering formats — live preview in the browser.",
      hint: "Pick sort mode, add affixes or numbers, then copy or apply the result.",
      seoTitle: "Sort and number lines",
      seoDescription:
        "Sort lines A–Z or by length, add prefixes, suffixes, or numbering. Free line list tool at text.kixt.net.",
      pageIntro:
        "Reorder bullet lists, inventories, or name files and optionally add running numbers. Sorting uses your UI locale in-browser; data is not persisted on a server.",
    },
    "lines/extract": {
      title: "Extract data",
      description:
        "Emails, URLs, and numbers with unique filter, per-row copy, and bulk export — all local.",
      hint: "Switch type tabs, copy one match or the full list, download as .txt.",
      seoTitle: "Extract emails, URLs & numbers",
      seoDescription:
        "Pull email addresses, links, and numbers from any text. Unique filter and export on text.kixt.net — no upload.",
      pageIntro:
        "Scan pasted content for contacts, links, or numeric values in one pass. Pattern matching happens on your machine so sensitive documents stay private.",
    },
    "diff/compare": {
      title: "Text diff",
      description: "Line and word-level diff, stats, filters, swap A↔B, and report export.",
      hint: "Load demo texts, adjust options, copy or download the diff report.",
      seoTitle: "Text diff — compare two versions",
      seoDescription:
        "Line and word-level diff with filters, stats, and copyable reports. Compare texts privately on text.kixt.net.",
      pageIntro:
        "Paste original and revised text to highlight adds, deletes, and inline word changes. Comparison is computed locally; neither version is uploaded for processing.",
    },
  },
};