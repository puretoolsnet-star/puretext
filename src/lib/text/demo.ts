import type { Lang } from "@/i18n/locales";

export type DemoSource = "default" | "post-format" | "dedupe" | "sort-lines" | "extract";

const DEMOS: Record<Lang, string> = {
  en: `PureText keeps your words in the browser only.

Count characters, clean formatting, sort lines, or compare drafts — without sending data to a server.

Paste any snippet here and switch tools freely; your text stays in memory until you refresh the page.`,
  uk: `PureText зберігає ваш текст лише у браузері.

Рахуйте символи, очищуйте форматування, сортуйте рядки чи порівнюйте версії — без відправки на сервер.

Вставте фрагмент і перемикайте інструменти; текст залишається в пам’яті до оновлення сторінки.`,
  de: `PureText verarbeitet Ihren Text nur im Browser.

Zeichen zählen, formatieren, Zeilen sortieren oder Texte vergleichen — ohne Server-Upload.

Fügen Sie Text ein und wechseln Sie Tools; der Inhalt bleibt bis zum Neuladen erhalten.`,
  es: `PureText guarda tu texto solo en el navegador.

Cuenta caracteres, limpia formato, ordena líneas o compara borradores — sin enviar datos al servidor.

Pega un fragmento y cambia de herramienta; el texto permanece hasta actualizar la página.`,
  pl: `PureText przechowuje tekst wyłącznie w przeglądarce.

Licz znaki, czyść formatowanie, sortuj linie lub porównuj wersje — bez wysyłki na serwer.

Wklej fragment i przełączaj narzędzia; tekst zostaje do odświeżenia strony.`,
  fr: `PureText garde votre texte uniquement dans le navigateur.

Comptez les caractères, nettoyez le format, triez les lignes ou comparez des versions — sans envoi serveur.

Collez un extrait et changez d’outil ; le texte reste en mémoire jusqu’au rechargement.`,
};

/** Long unstructured copy for post formatting (one block — obvious paragraph/wrap changes). */
const POST_FORMAT_DEMOS: Record<Lang, string> = {
  en: `Hey everyone — I wanted to share a quick update about our launch week. We shipped three quality-of-life fixes, refreshed the onboarding copy, and tightened privacy messaging so people immediately understand nothing leaves the browser. The team also recorded a two-minute walkthrough that shows counting, cleaning, and comparison tools without uploading a single byte. If you are drafting a social caption or a newsletter blurb, paste your rough draft here and try different paragraph lengths before you post. Short sentences help scanners, but grouping two or three together often feels more natural in a feed. Thanks for testing PureText and telling us what still feels clunky on mobile.`,
  uk: `Привіт усім — коротке оновлення про наш тиждень релізів. Ми додали кілька дрібних поліпшень, оновили текст онбордингу й чіткіше пояснили, що дані лишаються у браузері. Команда записала двохвилинний огляд: лічильники, очищення й порівняння без жодного завантаження на сервер. Якщо готуєте допис у соцмережі або розсилку, вставте чернетку сюди й перевірте різну довжину абзаців перед публікацією. Короткі речення зручні для сканування, але два-три разом часто виглядають природніше в стрічці. Дякуємо, що тестуєте PureText, і напишіть, що ще незручно на телефоні.`,
  de: `Kurzes Update aus der Launch-Woche: Wir haben drei Komfort-Fixes ausgeliefert, Onboarding-Texte geschärft und die Privatsphäre-Botschaft klarer gemacht — alles bleibt im Browser. Das Team hat einen zweiminütigen Walkthrough aufgenommen, der Zählen, Säubern und Vergleichen ohne Upload zeigt. Wenn Sie einen Social-Post oder Newsletter-Entwurf schreiben, fügen Sie hier Ihren Rohtext ein und testen Sie Absatzlängen, bevor Sie veröffentlichen. Kurze Sätze sind scanbar, aber zwei bis drei zusammen wirken im Feed oft natürlicher. Danke fürs Testen von PureText — sagen Sie uns gern, was auf dem Handy noch hakt.`,
  es: `Una actualización rápida de la semana de lanzamiento: publicamos tres mejoras, refrescamos el onboarding y dejamos más claro que nada sale del navegador. El equipo grabó un recorrido de dos minutos con contadores, limpieza y comparación sin subidas. Si redactas un post social o un boletín, pega aquí el borrador y prueba distintas longitudes de párrafo antes de publicar. Las frases cortas facilitan el escaneo, pero dos o tres juntas suelen sentirse más naturales en el feed. Gracias por probar PureText y contarnos qué sigue siendo incómodo en móvil.`,
  pl: `Krótka aktualizacja z tygodnia premiery: dostarczyliśmy trzy usprawnienia, odświeżyliśmy onboarding i wyraźniej tłumaczymy, że nic nie opuszcza przeglądarki. Zespół nagrał dwuminutowy przewodnik po licznikach, czyszczeniu i porównaniu bez wysyłki danych. Jeśli piszesz post społecznościowy lub newsletter, wklej szkic tutaj i sprawdź różne długości akapitów przed publikacją. Krótkie zdania są wygodne do skanowania, ale dwa–trzy razem często wyglądają naturalniej na feedzie. Dzięki za testy PureText — dajcie znać, co na telefonie nadal przeszkadza.`,
  fr: `Petit point sur la semaine de lancement : nous avons livré trois correctifs, revu l’onboarding et clarifié que rien ne quitte le navigateur. L’équipe a enregistré une démo de deux minutes : compteurs, nettoyage et comparaison sans envoi serveur. Si vous rédigez un post social ou une newsletter, collez le brouillon ici et testez différentes longueurs de paragraphe avant publication. Les phrases courtes se scannent bien, mais deux ou trois ensemble sonnent souvent plus naturel dans le fil. Merci de tester PureText — dites-nous ce qui reste pénible sur mobile.`,
};

const DEDUPE_DEMOS: Record<Lang, string> = {
  en: `apple\nBanana\napple\ncherry\nBanana\n\napple\n  plum\nplum\norange\n`,
  uk: `яблуко\nГруша\nяблуко\nвишня\nГруша\n\nяблуко\n  слива\nслива\nапельсин\n`,
  de: `Apfel\nBanane\nApfel\nKirsche\nBanane\n\nApfel\n  Pflaume\nPflaume\nOrange\n`,
  es: `manzana\nPlátano\nmanzana\ncereza\nPlátano\n\nmanzana\n  ciruela\nciruela\nnaranja\n`,
  pl: `jabłko\nBanan\njabłko\nwiśnia\nBanan\n\njabłko\n  śliwka\nśliwka\npomarańcza\n`,
  fr: `pomme\nBanane\npomme\ncerise\nBanane\n\npomme\n  prune\nprune\norange\n`,
};

const EXTRACT_DEMOS: Record<Lang, string> = {
  en: `Contact us at hello@kixt.net or sales@example.org.\nVisit https://puretext.kixt.net/docs and http://example.com/page).\nBudget: -1200, 3.14, 2,500.50 and 99,9 for EU style.\nDuplicate mail: hello@kixt.net\n`,
  uk: `Пишіть на hello@kixt.net або support@example.org.\nСайт: https://text.kixt.net/uk та https://example.com/).\nЧисла: -42, 3,14, 1.500,25 і 7,5.\nПовтор: hello@kixt.net\n`,
  de: `E-Mail: kontakt@kixt.net, info@beispiel.de.\nLinks: https://kixt.net und http://test.de/seite).\nZahlen: -99, 3,14, 1.000,50.\n`,
  es: `Email: hola@kixt.net, ventas@ejemplo.es.\nURLs: https://kixt.net y http://ejemplo.com/).\nNúmeros: -15, 3,14, 2.500,75.\n`,
  pl: `Mail: kontakt@kixt.net, biuro@przyklad.pl.\nURL: https://kixt.net oraz http://przyklad.pl/).\nLiczby: -7, 3,14, 1.234,56.\n`,
  fr: `E-mail : contact@kixt.net, aide@exemple.fr.\nURL : https://kixt.net et http://exemple.fr/).\nNombres : -8, 3,14, 1 234,56.\n`,
};

const SORT_DEMOS: Record<Lang, string> = {
  en: "banana\nApple\ncherry\napricot\n\nDate\nkiwi\nMango\n",
  uk: "банан\nЯблуко\nвишня\nабрикос\n\nФінік\nківі\nМанго\n",
  de: "Banane\nApfel\nKirsche\nAprikose\n\nDattel\nKiwi\nMango\n",
  es: "plátano\nManzana\ncereza\ndamasco\n\ndátil\nkiwi\nMango\n",
  pl: "banan\nJabłko\nwiśnia\nmorela\n\ndaktyl\nkiwi\nMango\n",
  fr: "banane\nPomme\ncerise\nabricot\n\nDatte\nkiwi\nMangue\n",
};

export function getDemoText(lang: Lang, source: DemoSource = "default"): string {
  if (source === "post-format") return POST_FORMAT_DEMOS[lang] ?? POST_FORMAT_DEMOS.en;
  if (source === "dedupe") return DEDUPE_DEMOS[lang] ?? DEDUPE_DEMOS.en;
  if (source === "sort-lines") return SORT_DEMOS[lang] ?? SORT_DEMOS.en;
  if (source === "extract") return EXTRACT_DEMOS[lang] ?? EXTRACT_DEMOS.en;
  return DEMOS[lang] ?? DEMOS.en;
}

export function getPostFormatDemoText(lang: Lang): string {
  return getDemoText(lang, "post-format");
}

const DIFF_ORIGINAL: Record<Lang, string> = {
  en: "Welcome to PureText.\nLine two stays the same.\nWe removed this sentence entirely.\nOld pricing: $9 per month.\nFooter note.",
  uk: "Ласкаво просимо до PureText.\nДругий рядок без змін.\nЦе речення ми прибрали.\nСтара ціна: 9 $ на місяць.\nПримітка внизу.",
  de: "Willkommen bei PureText.\nZeile zwei bleibt gleich.\nDiesen Satz haben wir entfernt.\nAlter Preis: 9 € pro Monat.\nFußnote.",
  es: "Bienvenido a PureText.\nLa segunda línea no cambia.\nEliminamos esta oración.\nPrecio antiguo: 9 € al mes.\nNota al pie.",
  pl: "Witamy w PureText.\nDrugi wiersz bez zmian.\nTen zdanie usunęliśmy.\nStara cena: 9 zł miesięcznie.\nPrzypis.",
  fr: "Bienvenue sur PureText.\nLa deuxième ligne reste.\nNous avons supprimé cette phrase.\nAncien prix : 9 € par mois.\nNote de bas de page.",
};

const DIFF_MODIFIED: Record<Lang, string> = {
  en: "Welcome to PureText!\nLine two stays the same.\nBrand-new feature: live diff in the browser.\nNew pricing: $12 per month.\nFooter note with link.",
  uk: "Ласкаво просимо до PureText!\nДругий рядок без змін.\nНова функція: живий diff у браузері.\nНова ціна: 12 $ на місяць.\nПримітка внизу з посиланням.",
  de: "Willkommen bei PureText!\nZeile zwei bleibt gleich.\nNeue Funktion: Live-Diff im Browser.\nNeuer Preis: 12 € pro Monat.\nFußnote mit Link.",
  es: "¡Bienvenido a PureText!\nLa segunda línea no cambia.\nNueva función: diff en vivo en el navegador.\nPrecio nuevo: 12 € al mes.\nNota al pie con enlace.",
  pl: "Witamy w PureText!\nDrugi wiersz bez zmian.\nNowa funkcja: diff na żywo w przeglądarce.\nNowa cena: 12 zł miesięcznie.\nPrzypis z linkiem.",
  fr: "Bienvenue sur PureText !\nLa deuxième ligne reste.\nNouvelle fonction : diff en direct dans le navigateur.\nNouveau prix : 12 € par mois.\nNote de bas de page avec lien.",
};

export function getDiffDemoPair(lang: Lang): { original: string; modified: string } {
  return {
    original: DIFF_ORIGINAL[lang] ?? DIFF_ORIGINAL.en,
    modified: DIFF_MODIFIED[lang] ?? DIFF_MODIFIED.en,
  };
}