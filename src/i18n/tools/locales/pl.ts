import type { ToolsLocalePack } from "@/i18n/tools/types";

export const pl: ToolsLocalePack = {
  categories: {
    analysis: { name: "Analiza i liczniki", nav: "Analiza", hubTitle: "Analiza i liczniki", hubLead: "Znaki, słowa, czas czytania, częstotliwość." },
    cleanup: { name: "Czyszczenie i format", nav: "Czyszczenie", hubTitle: "Czyszczenie i format", hubLead: "Wielkość liter, spacje, HTML, akapity." },
    lines: { name: "Linie i listy", nav: "Linie", hubTitle: "Linie i listy", hubLead: "Duplikaty, sortowanie, ekstrakcja." },
    diff: { name: "Porównanie tekstów", nav: "Diff", hubTitle: "Porównanie", hubLead: "Oryginał vs. zmiana z kolorami." },
  },
  tools: {
    "analysis/char-counter": { title: "Licznik znaków i słów", description: "Znaki, słowa, zdania, akapity, czytanie.", hint: "Na żywo.", seoDescription: "Licznik znaków w przeglądarce." },
    "analysis/word-frequency": { title: "Częstotliwość słów", description: "Najczęstsze słowa.", hint: "Bez jednoliterowych.", seoDescription: "Częstotliwość słów online." },
    "cleanup/case": { title: "Wielkość liter", description: "WIELKIE, małe, tytuł, zdanie, naprzemienne.", hint: "Cały bufor.", seoDescription: "Zmiana wielkości liter." },
    "cleanup/clean": { title: "Czyść tekst", description: "Spacje, puste linie, tabulatory, HTML.", hint: "Zastosuj w edytorze.", seoDescription: "Usuń HTML i spacje." },
    "cleanup/format-post": {
      title: "Format pod posty",
      description: "Akapity, długość wiersza, limity i presety z podglądem na żywo.",
      hint: "Wypróbuj presety, ustaw zdania lub znaki na akapit, skopiuj lub zastosuj wynik.",
      seoDescription: "Podział tekstu pod social media i zawijanie po granicach słów.",
    },
    "lines/dedupe": {
      title: "Usuń duplikaty linii",
      description: "Pierwsze wystąpienie, opcje porównania, statystyki i lista duplikatów.",
      hint: "Demo, opcje, potem kopiuj lub zastosuj unikalną listę.",
      seoDescription: "Deduplikacja wierszy w przeglądarce.",
    },
    "lines/sort-lines": { title: "Sortuj i numeruj", description: "A–Z, długość, prefiksy.", hint: "Locale języka UI.", seoDescription: "Sortowanie linii tekstu." },
    "lines/extract": { title: "Wyciągnij dane", description: "E-maile, URL, liczby.", hint: "Lista do kopiowania.", seoDescription: "Wyciągnij maile z tekstu." },
    "diff/compare": {
      title: "Diff tekstu",
      description: "Diff linii i słów, statystyki, filtry, zamiana A↔B i eksport raportu.",
      hint: "Wczytaj demo, ustaw opcje, skopiuj lub pobierz raport diff.",
      seoDescription: "Porównaj dwa teksty w przeglądarce — prywatnie i szybko.",
    },
  },
};