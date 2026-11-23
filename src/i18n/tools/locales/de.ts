import type { ToolsLocalePack } from "@/i18n/tools/types";

export const de: ToolsLocalePack = {
  categories: {
    analysis: { name: "Analyse & Zähler", nav: "Analyse", hubTitle: "Analyse & Zähler", hubLead: "Zeichen, Wörter, Lesezeit, Häufigkeit." },
    cleanup: { name: "Reinigen & Format", nav: "Format", hubTitle: "Reinigen & Formatieren", hubLead: "Schreibweise, Leerzeichen, HTML, Zeilenumbruch." },
    lines: { name: "Zeilen & Listen", nav: "Zeilen", hubTitle: "Zeilen & Listen", hubLead: "Duplikate, Sortierung, Extraktion." },
    diff: { name: "Textvergleich", nav: "Diff", hubTitle: "Text vergleichen", hubLead: "Original vs. Fassung mit Markierung." },
  },
  tools: {
    "analysis/char-counter": { title: "Zeichen- & Wortzähler", description: "Zeichen, Wörter, Sätze, Absätze, Lesezeit.", hint: "Live beim Tippen.", seoDescription: "Zeichenzähler im Browser." },
    "analysis/word-frequency": { title: "Worthäufigkeit", description: "Häufigste Wörter im Text.", hint: "Einbuchstaben werden ignoriert.", seoDescription: "Worthäufigkeit online, lokal." },
    "cleanup/case": { title: "Schreibweise", description: "GROSS, klein, Titel, Satz, wechselnd.", hint: "Gilt für den ganzen Text.", seoDescription: "Groß/Kleinschreibung ändern." },
    "cleanup/clean": { title: "Text säubern", description: "Leerzeichen, Zeilen, Tabs, HTML.", hint: "Optionen wählen, anwenden.", seoDescription: "Whitespace & HTML entfernen." },
    "cleanup/format-post": {
      title: "Für Posts formatieren",
      description: "Absätze, Zeilenlänge, Limits und Presets mit Live-Vorschau — nur im Browser.",
      hint: "Feed-Presets testen, Sätze oder Zeichen pro Absatz wählen, Ergebnis kopieren oder übernehmen.",
      seoDescription: "Text für Social Posts in Absätze teilen und an Wortgrenzen umbrechen.",
    },
    "lines/dedupe": {
      title: "Doppelte Zeilen entfernen",
      description: "Erstes Vorkommen, Vergleichsoptionen, Statistik und Duplikatliste — nur im Browser.",
      hint: "Demo laden, Optionen wählen, eindeutige Liste kopieren oder übernehmen.",
      seoDescription: "Zeilen lokal deduplizieren mit flexiblen Regeln.",
    },
    "lines/sort-lines": { title: "Sortieren & nummerieren", description: "A–Z, Länge, Präfix/Suffix.", hint: "Locale der Sprache.", seoDescription: "Textzeilen sortieren." },
    "lines/extract": { title: "Daten extrahieren", description: "E-Mails, URLs, Zahlen.", hint: "Liste zum Kopieren.", seoDescription: "E-Mails aus Text extrahieren." },
    "diff/compare": {
      title: "Text-Diff",
      description: "Zeilen- und Wort-Diff, Statistik, Filter, A↔B tauschen, Bericht exportieren.",
      hint: "Demo laden, Optionen setzen, Diff-Bericht kopieren oder herunterladen.",
      seoDescription: "Zwei Texte im Browser vergleichen — privat und schnell.",
    },
  },
};