import type { ToolsLocalePack } from "@/i18n/tools/types";

export const de: ToolsLocalePack = {
  categories: {
    analysis: {
      name: "Analyse & Zähler",
      nav: "Analyse",
      hubTitle: "Analyse & Zähler",
      hubLead: "Zeichen, Wörter, Lesezeit, Häufigkeit.",
      seoTitle: "Textanalyse & Zähler",
      seoDescription:
        "Zeichen- und Wortzähler, Lesezeit, Worthäufigkeit im Browser. Sechs Sprachen auf text.kixt.net — ohne Upload.",
      pageIntro:
        "Messen Sie Länge, Lesezeit und Wiederholungen vor der Veröffentlichung. Alle Zähler laufen lokal im Browser; Entwürfe werden nicht an einen Server gesendet.",
    },
    cleanup: {
      name: "Reinigen & Format",
      nav: "Format",
      hubTitle: "Reinigen & Formatieren",
      hubLead: "Schreibweise, Leerzeichen, HTML, Zeilenumbruch.",
      seoTitle: "Text reinigen & formatieren",
      seoDescription:
        "Schreibweise ändern, HTML entfernen, Leerzeichen normalisieren, Posts formatieren. Clientseitig auf text.kixt.net.",
      pageIntro:
        "Bereinigen Sie unordentlichen Text, Markup und Zeilenumbrüche an einem Ort. Die Verarbeitung bleibt auf Ihrem Gerät — kein Upload, kein Serverspeicher.",
    },
    lines: {
      name: "Zeilen & Listen",
      nav: "Zeilen",
      hubTitle: "Zeilen & Listen",
      hubLead: "Duplikate, Sortierung, Extraktion.",
      seoTitle: "Zeilen: Deduplizieren, Sortieren, Extrahieren",
      seoDescription:
        "Doppelte Zeilen entfernen, sortieren und nummerieren, E-Mails, URLs und Zahlen extrahieren. Browser-Tools auf text.kixt.net.",
      pageIntro:
        "Arbeiten Sie zeilenweise mit Listen, Logs und Exporten. Deduplizierung, Sortierung und Extraktion laufen im Browser — Ihr Text wird nicht auf unseren Servern gespeichert.",
    },
    diff: {
      name: "Textvergleich",
      nav: "Diff",
      hubTitle: "Text vergleichen",
      hubLead: "Original vs. Fassung mit Markierung.",
      seoTitle: "Zwei Texte vergleichen (Diff)",
      seoDescription:
        "Zeilen- und Wort-Diff mit Filtern, Statistik und Berichtsexport. Privat auf text.kixt.net.",
      pageIntro:
        "Erkennen Sie Ergänzungen, Löschungen und Wortänderungen zwischen zwei Versionen. Der Vergleich läuft vollständig im Browser — vertrauliche Entwürfe bleiben lokal.",
    },
  },
  tools: {
    "analysis/char-counter": {
      title: "Zeichen- & Wortzähler",
      description: "Zeichen, Wörter, Sätze, Absätze, Lesezeit.",
      hint: "Live beim Tippen.",
      seoTitle: "Zeichen- und Wortzähler online",
      seoDescription:
        "Zeichen, Wörter, Sätze, Absätze und Lesezeit zählen. Lokal im Browser auf text.kixt.net.",
      pageIntro:
        "Fügen Sie Text ein und sehen Sie sofort Statistik, Limits und Lesezeit. Alle Berechnungen erfolgen nur im Browser; nichts wird hochgeladen oder serverseitig gespeichert.",
    },
    "analysis/word-frequency": {
      title: "Worthäufigkeit",
      description: "Häufigste Wörter im Text.",
      hint: "Einbuchstaben werden ignoriert.",
      seoTitle: "Worthäufigkeit & Wiederholungen",
      seoDescription:
        "Häufigste Wörter, Bigramme und Trigramme finden. Browser-Analyse auf text.kixt.net.",
      pageIntro:
        "Finden Sie dominante Begriffe und springen Sie zu jedem Vorkommen. Tabellen werden auf Ihrem Gerät erzeugt — persönlicher Text bleibt offline.",
    },
    "cleanup/case": {
      title: "Schreibweise",
      description: "GROSS, klein, Titel, Satz, wechselnd.",
      hint: "Gilt für den ganzen Text.",
      seoTitle: "Groß-/Kleinschreibung ändern",
      seoDescription:
        "Text in GROSS, klein, Titel, Satz oder invertiert umwandeln. Live-Vorschau auf text.kixt.net.",
      pageIntro:
        "Normalisieren Sie Schreibweise für Titel oder Massenbearbeitung in Sekunden. Die Vorschau aktualisiert sich im Browser — Ihr Text wird nicht übertragen.",
    },
    "cleanup/clean": {
      title: "Text säubern",
      description: "Leerzeichen, Zeilen, Tabs, HTML.",
      hint: "Optionen wählen, anwenden.",
      seoTitle: "Text säubern: HTML & Leerzeichen",
      seoDescription:
        "HTML, zusätzliche Leerzeichen und unsichtbare Zeichen entfernen. Lokal auf text.kixt.net.",
      pageIntro:
        "Wandeln Sie Web-Inhalte in sauberen Fließtext um. Regeln laufen clientseitig mit Vorher/Nachher-Ansicht — ohne Serverspeicherung.",
    },
    "cleanup/format-post": {
      title: "Für Posts formatieren",
      description: "Absätze, Zeilenlänge, Limits und Presets mit Live-Vorschau — nur im Browser.",
      hint: "Feed-Presets testen, Sätze oder Zeichen pro Absatz wählen, Ergebnis kopieren oder übernehmen.",
      seoTitle: "Text für Social Posts formatieren",
      seoDescription:
        "Absätze teilen, Zeilen umbrechen, Zeichenlimits prüfen. Browser-Tool auf text.kixt.net.",
      pageIntro:
        "Bereiten Sie Posts mit lesbaren Absätzen und Längenkontrolle vor. Umbrüche werden lokal berechnet — Ihr Entwurf verlässt den Tab nicht.",
    },
    "lines/dedupe": {
      title: "Doppelte Zeilen entfernen",
      description: "Erstes Vorkommen, Vergleichsoptionen, Statistik und Duplikatliste — nur im Browser.",
      hint: "Demo laden, Optionen wählen, eindeutige Liste kopieren oder übernehmen.",
      seoTitle: "Doppelte Zeilen entfernen",
      seoDescription:
        "Zeilen deduplizieren mit flexiblen Regeln (Groß/Klein, Leerzeichen). text.kixt.net.",
      pageIntro:
        "Entfernen Sie Wiederholungen in Listen und behalten Sie die erste Zeile. Der Vergleich läuft vollständig im Browser — keine Übertragung der Liste.",
    },
    "lines/sort-lines": {
      title: "Sortieren & nummerieren",
      description: "A–Z, Länge, Präfix/Suffix.",
      hint: "Locale der Sprache.",
      seoTitle: "Zeilen sortieren und nummerieren",
      seoDescription:
        "A–Z oder nach Länge sortieren, Präfixe, Suffixe und Nummerierung. text.kixt.net.",
      pageIntro:
        "Ordnen Sie Listen und fügen Sie bei Bedarf Nummerierung hinzu. Sortierung nach UI-Sprache im Browser — Daten werden nicht serverseitig gespeichert.",
    },
    "lines/extract": {
      title: "Daten extrahieren",
      description: "E-Mails, URLs, Zahlen.",
      hint: "Liste zum Kopieren.",
      seoTitle: "E-Mails, URLs & Zahlen extrahieren",
      seoDescription:
        "E-Mail-Adressen, Links und Zahlen aus Text ziehen. Eindeutig-Filter auf text.kixt.net.",
      pageIntro:
        "Sammeln Sie Kontakte, Links oder Zahlen in einem Durchgang. Die Erkennung erfolgt auf Ihrem Gerät — sensible Dokumente bleiben privat.",
    },
    "diff/compare": {
      title: "Text-Diff",
      description: "Zeilen- und Wort-Diff, Statistik, Filter, A↔B tauschen, Bericht exportieren.",
      hint: "Demo laden, Optionen setzen, Diff-Bericht kopieren oder herunterladen.",
      seoTitle: "Text-Diff — Versionen vergleichen",
      seoDescription:
        "Zeilen- und Wort-Diff mit Filtern und Bericht. Privat auf text.kixt.net.",
      pageIntro:
        "Fügen Sie Original und Überarbeitung ein, um Änderungen hervorzuheben. Der Vergleich läuft lokal — keine Version wird zur Verarbeitung hochgeladen.",
    },
  },
};