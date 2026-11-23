import type { ToolsLocalePack } from "@/i18n/tools/types";

export const pl: ToolsLocalePack = {
  categories: {
    analysis: {
      name: "Analiza i liczniki",
      nav: "Analiza",
      hubTitle: "Analiza i liczniki",
      hubLead: "Znaki, słowa, czas czytania, częstotliwość.",
      seoTitle: "Analiza tekstu i liczniki",
      seoDescription:
        "Licznik znaków i słów, czas czytania, częstotliwość słów w przeglądarce. 6 języków na text.kixt.net.",
      pageIntro:
        "Zmierz długość, czas czytania i powtórzenia przed publikacją. Wszystko działa lokalnie w przeglądarce — szkice nie trafiają na serwer.",
    },
    cleanup: {
      name: "Czyszczenie i format",
      nav: "Format",
      hubTitle: "Czyszczenie i formatowanie",
      hubLead: "Wielkość liter, spacje, HTML, posty.",
      seoTitle: "Czyszczenie i formatowanie tekstu",
      seoDescription:
        "Zmiana wielkości liter, usuwanie HTML, normalizacja spacji, format postów. Na text.kixt.net po stronie klienta.",
      pageIntro:
        "Uporządkuj zły tekst, markup i łamanie wierszy w jednym miejscu. Przetwarzanie na Twoim urządzeniu — wklej, ustaw opcje, skopiuj bez wysyłki.",
    },
    lines: {
      name: "Linie i listy",
      nav: "Linie",
      hubTitle: "Linie i listy",
      hubLead: "Duplikaty, sortowanie, numeracja, ekstrakcja.",
      seoTitle: "Linie: deduplikacja, sortowanie, ekstrakcja",
      seoDescription:
        "Usuń duplikaty linii, sortuj i numeruj, wyciągaj e-maile, URL i liczby. Przeglądarka na text.kixt.net.",
      pageIntro:
        "Pracuj linia po linii na listach i logach. Deduplikacja, sortowanie i ekstrakcja w przeglądarce — tekst nie jest zapisywany na naszych serwerach.",
    },
    diff: {
      name: "Porównanie tekstów",
      nav: "Diff",
      hubTitle: "Porównanie tekstów",
      hubLead: "Diff wizualny z filtrami.",
      seoTitle: "Porównaj dwa teksty (diff)",
      seoDescription:
        "Diff linii i słów ze statystyką, filtrami i raportem. Prywatnie na text.kixt.net.",
      pageIntro:
        "Zobacz dodania, usunięcia i zmiany słowo po słowie między wersjami. Porównanie w całości w przeglądarce — poufne szkice zostają lokalnie.",
    },
  },
  tools: {
    "analysis/char-counter": {
      title: "Licznik znaków i słów",
      description: "Statystyki, czas czytania, limity, eksport.",
      hint: "Limity bez wysyłki na serwer.",
      seoTitle: "Licznik znaków i słów online",
      seoDescription:
        "Zlicz znaki, słowa, zdania i czas czytania. Lokalnie na text.kixt.net.",
      pageIntro:
        "Wklej lub wpisz tekst, by od razu zobaczyć statystyki i czas czytania. Obliczenia tylko w przeglądarce — brak uploadu i zapisu na serwerze.",
    },
    "analysis/word-frequency": {
      title: "Częstotliwość słów",
      description: "Unigramy, bigramy, trigramy, filtry.",
      hint: "Kliknij wiersz dla wystąpień.",
      seoTitle: "Częstotliwość i powtórzenia słów",
      seoDescription:
        "Najczęstsze słowa, bigramy i trigramy. Analiza w przeglądarce na text.kixt.net.",
      pageIntro:
        "Sprawdź dominujące terminy i przejdź do każdego wystąpienia. Tabele powstają na urządzeniu — wrażliwy tekst pozostaje prywatny.",
    },
    "cleanup/case": {
      title: "Wielkość liter",
      description: "Podgląd wszystkich trybów wielkości.",
      hint: "Źródło zostaje do momentu zastosowania.",
      seoTitle: "Zmiana wielkości liter",
      seoDescription:
        "WIELKIE, małe, tytuł, zdanie, odwrócone — podgląd na text.kixt.net.",
      pageIntro:
        "Ujednolić kapitalizację w kilka sekund. Podgląd w przeglądarce — tekst nie jest przesyłany.",
    },
    "cleanup/clean": {
      title: "Wyczyść tekst",
      description: "HTML, spacje, znaki niewidoczne.",
      hint: "Presety i podgląd przed/po.",
      seoTitle: "Czyszczenie: HTML i spacje",
      seoDescription:
        "Usuń HTML, zbędne spacje i znaki niewidoczne. Lokalnie na text.kixt.net.",
      pageIntro:
        "Zamień wklejony web na czysty tekst. Czyszczenie po stronie klienta z widokiem przed/po — bez magazynowania na serwerze.",
    },
    "cleanup/format-post": {
      title: "Format pod posty",
      description: "Akapity, zawijanie, limity, podgląd.",
      hint: "Presety feedu i kopiowanie wyniku.",
      seoTitle: "Formatowanie pod social media",
      seoDescription:
        "Podział na akapity, zawijanie i limity znaków. text.kixt.net.",
      pageIntro:
        "Przygotuj wątki lub opisy z czytelnymi akapitami. Zawijanie lokalnie — szkic nie opuszcza karty.",
    },
    "lines/dedupe": {
      title: "Usuń duplikaty linii",
      description: "Pierwsze wystąpienie, opcje, raport.",
      hint: "Demo, opcje, unikalna lista.",
      seoTitle: "Usuwanie zduplikowanych linii",
      seoDescription:
        "Deduplikacja z elastycznymi regułami (wielkość liter, spacje). text.kixt.net.",
      pageIntro:
        "Usuń powtórzenia w listach, zachowując pierwszą linię. Porównanie w przeglądarce — lista nie jest wysyłana na serwer.",
    },
    "lines/sort-lines": {
      title: "Sortuj i numeruj linie",
      description: "A–Z, długość, prefiksy, numeracja.",
      hint: "Tryb, prefiksy lub numery.",
      seoTitle: "Sortowanie i numeracja linii",
      seoDescription:
        "Sort A–Z lub po długości, prefiksy, sufiksy, numeracja. text.kixt.net.",
      pageIntro:
        "Uporządkuj listy i dodaj numerację. Sortowanie według locale UI w przeglądarce — brak zapisu na serwerze.",
    },
    "lines/extract": {
      title: "Wyciągnij dane",
      description: "E-mail, URL, liczby, filtr unikalnych.",
      hint: "Zakładki typów, eksport .txt.",
      seoTitle: "Ekstrakcja e-mail, URL i liczb",
      seoDescription:
        "Wyciągnij adresy, linki i liczby z tekstu. text.kixt.net bez uploadu.",
      pageIntro:
        "Przeskanuj wklejony tekst jednym przebiegiem. Wykrywanie na Twoim komputerze — poufne dokumenty zostają prywatne.",
    },
    "diff/compare": {
      title: "Diff tekstu",
      description: "Diff linii i słów, statystyki, filtry.",
      hint: "Demo, opcje, kopiuj raport.",
      seoTitle: "Diff tekstu — porównanie wersji",
      seoDescription:
        "Porównanie linii i słów z filtrami i raportem. text.kixt.net.",
      pageIntro:
        "Wklej oryginał i poprawkę, by podświetlić zmiany. Obliczenia lokalne — żadna wersja nie jest uploadowana.",
    },
  },
};