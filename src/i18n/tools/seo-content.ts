import type { Lang } from "@/i18n/locales";
import type { SeoContentBlock } from "@/i18n/tools/types";
import type { CategoryId, ToolRouteId } from "@/lib/tools/routes";

type CategorySeoMap = Record<CategoryId, SeoContentBlock>;
type ToolSeoMap = Record<ToolRouteId, SeoContentBlock>;

const enCategories: CategorySeoMap = {
  analysis: {
    seoUsage:
      "Check article length, ad copy limits, and repeated terms before publishing blogs, newsletters, or landing pages.",
    seoBenefits:
      "Counters and frequency tables are computed in your browser — source text is not uploaded to text.kixt.net servers.",
    seoFaq: [
      {
        question: "Do stats update while I edit?",
        answer: "Yes. Metrics read from the shared editor buffer on your device.",
      },
      {
        question: "Can I export word-frequency data?",
        answer: "Copy or download TXT/CSV reports locally without sending the text upstream.",
      },
    ],
  },
  cleanup: {
    seoUsage:
      "Fix pasted web content, normalize casing, strip HTML, and wrap long posts for social feeds or messengers.",
    seoBenefits:
      "Cleaning and formatting rules run client-side with a live preview — drafts stay in your tab, not on a server.",
    seoFaq: [
      {
        question: "Will cleaning change my original draft?",
        answer: "The editor keeps your source until you click Apply to replace it with the preview.",
      },
      {
        question: "Is HTML removed safely?",
        answer: "Tags are stripped in the browser; scripts are not executed during cleanup.",
      },
    ],
  },
  lines: {
    seoUsage:
      "Deduplicate logs, sort SKU lists, number bullet points, or pull emails and URLs from bulk paste exports.",
    seoBenefits:
      "List operations process strings entirely on your device, so inventories and contact dumps never leave your machine.",
    seoFaq: [
      {
        question: "Which duplicate line is kept?",
        answer: "By default the first occurrence wins; options control case, spaces, and empty lines.",
      },
      {
        question: "Does sorting use my UI language?",
        answer: "Locale-aware sorting follows your selected PureText language where supported.",
      },
    ],
  },
  diff: {
    seoUsage:
      "Compare contract revisions, translation drafts, or config files to see added, removed, and changed lines.",
    seoBenefits:
      "Diff logic executes locally — neither the original nor the modified version is sent for server-side comparison.",
    seoFaq: [
      {
        question: "Can I ignore whitespace or case?",
        answer: "Yes. Toggle ignore options before reviewing the highlighted report.",
      },
      {
        question: "Can I export the diff report?",
        answer: "Copy or download a text report from the tool without uploading either input.",
      },
    ],
  },
};

const enTools: ToolSeoMap = {
  "analysis/char-counter": {
    seoUsage:
      "Measure tweets, SMS segments, meta descriptions, or manuscript length with live character and word counts.",
    seoBenefits:
      "All statistics are derived in-browser from your paste — nothing is logged or stored on text.kixt.net.",
    seoFaq: [
      { question: "Are spaces included in character counts?", answer: "The panel shows counts with and without spaces." },
      { question: "Do limit presets block typing?", answer: "No. Limits are advisory and show remaining characters only." },
    ],
  },
  "analysis/word-frequency": {
    seoUsage:
      "Find overused terms in SEO copy, speeches, or study notes using unigrams, bigrams, and trigrams.",
    seoBenefits:
      "Frequency analysis runs on your CPU in the tab; proprietary content is not transmitted for indexing.",
    seoFaq: [
      { question: "Can I filter stop words?", answer: "Yes. Stop-word lists follow your UI language." },
      { question: "How do I jump to a match?", answer: "Select a row to highlight occurrences in the shared editor." },
    ],
  },
  "cleanup/case": {
    seoUsage:
      "Normalize titles, headings, SKUs, or bulk renames across upper, lower, title, and sentence case modes.",
    seoBenefits:
      "Case transforms preview instantly client-side; the source string is not sent anywhere for conversion.",
    seoFaq: [
      { question: "What is smart title case?", answer: "It keeps small words lowercased inside titles when enabled." },
      { question: "Can I invert case?", answer: "Yes. Invert swaps the case of each letter in the preview." },
    ],
  },
  "cleanup/clean": {
    seoUsage:
      "Strip HTML from CMS exports, collapse duplicate spaces, and remove invisible characters from pasted text.",
    seoBenefits:
      "Before/after metrics and cleaning run locally — cleaned output is never persisted on a server.",
    seoFaq: [
      { question: "Do presets replace manual options?", answer: "Presets set a starting mix; you can still tweak toggles." },
      { question: "Can I see how many chars were removed?", answer: "Live stats show character and line deltas in the panel." },
    ],
  },
  "cleanup/format-post": {
    seoUsage:
      "Split long walls of text into feed-friendly paragraphs and respect social character budgets before posting.",
    seoBenefits:
      "Wrapping and paragraph breaks are calculated in the browser; post drafts are not uploaded for formatting.",
    seoFaq: [
      { question: "Do feed presets change limits?", answer: "Presets set typical line and post length targets you can override." },
      { question: "Can I apply the formatted text to the editor?", answer: "Use Apply to replace the buffer with the preview result." },
    ],
  },
  "lines/dedupe": {
    seoUsage:
      "Remove repeated emails, URLs, or inventory rows from CSV-style line lists while keeping the first entry.",
    seoBenefits:
      "Deduplication compares lines entirely on your device — large lists are not uploaded for processing.",
    seoFaq: [
      { question: "Can duplicates be case-insensitive?", answer: "Enable ignore case so ABC and abc count as the same line." },
      { question: "Is there a duplicate report?", answer: "Yes. See which lines were removed and how often they appeared." },
    ],
  },
  "lines/sort-lines": {
    seoUsage:
      "Alphabetize name lists, sort by line length, or add prefixes, suffixes, and running numbers to each row.",
    seoBenefits:
      "Sorting and affixes are applied in-memory in your browser without server round-trips.",
    seoFaq: [
      { question: "Can empty lines be removed before sorting?", answer: "Toggle remove empty lines in the sort options." },
      { question: "Which numbering formats are supported?", answer: "Dot, parenthesis, and zero-padded styles are available." },
    ],
  },
  "lines/extract": {
    seoUsage:
      "Pull email addresses, URLs, or numeric tokens from logs, resumes, or scraped text in one pass.",
    seoBenefits:
      "Pattern matching scans pasted text locally — extracted values are not sent to text.kixt.net.",
    seoFaq: [
      { question: "Can I copy one match only?", answer: "Each row has a copy action; you can also export the full list." },
      { question: "Does unique filter dedupe results?", answer: "Yes. Enable unique only to collapse repeated matches." },
    ],
  },
  "diff/compare": {
    seoUsage:
      "Review edits between two versions of copy, code comments, or translated paragraphs side by side.",
    seoBenefits:
      "Line and word diffs are computed client-side so confidential drafts never leave your session.",
    seoFaq: [
      { question: "Can I swap version A and B?", answer: "Use Swap to flip inputs without re-pasting." },
      { question: "Is there a word-level view?", answer: "Yes. Switch between line and word diff modes in the panel." },
    ],
  },
};

const ukCategories: CategorySeoMap = {
  analysis: {
    seoUsage:
      "Перевіряйте довжину статей, ліміти реклами та повторення слів перед публікацією блогів, розсилок чи лендингів.",
    seoBenefits:
      "Лічильники й частотні таблиці рахуються у браузері — вихідний текст не завантажується на сервери text.kixt.net.",
    seoFaq: [
      { question: "Статистика оновлюється під час редагування?", answer: "Так. Показники беруться зі спільного буфера редактора на пристрої." },
      { question: "Чи можна експортувати частотність слів?", answer: "Копіюйте або завантажте TXT/CSV локально без відправки тексту." },
    ],
  },
  cleanup: {
    seoUsage:
      "Виправляйте текст з вебу, нормалізуйте регістр, прибирайте HTML і форматуйте довгі пости для соцмереж.",
    seoBenefits:
      "Очищення та форматування з попереднім переглядом виконуються на клієнті — чернетки лишаються у вкладці.",
    seoFaq: [
      { question: "Чи замінить очищення оригінал у редакторі?", answer: "Джерело зберігається, доки не натиснете «Застосувати»." },
      { question: "HTML видаляється безпечно?", answer: "Теги знімаються в браузері; скрипти під час очищення не виконуються." },
    ],
  },
  lines: {
    seoUsage:
      "Прибирайте дублікати в логах, сортуйте списки SKU, нумеруйте пункти або витягуйте email і URL з масових вставок.",
    seoBenefits:
      "Операції з рядками обробляють дані лише на вашому пристрої — списки не відправляються на сервер.",
    seoFaq: [
      { question: "Який дублікат рядка зберігається?", answer: "За замовчуванням — перша поява; є опції регістру та пробілів." },
      { question: "Сортування враховує мову інтерфейсу?", answer: "Локалізоване сортування слідує обраній мові PureText." },
    ],
  },
  diff: {
    seoUsage:
      "Порівнюйте редакції договорів, перекладів або конфігів і бачте додані, видалені та змінені рядки.",
    seoBenefits:
      "Diff виконується локально — жодна з версій не надсилається для серверного порівняння.",
    seoFaq: [
      { question: "Чи можна ігнорувати пробіли чи регістр?", answer: "Так. Увімкніть відповідні опції перед переглядом звіту." },
      { question: "Чи можна експортувати звіт diff?", answer: "Копіюйте або завантажте текстовий звіт без завантаження вводу." },
    ],
  },
};

const ukTools: ToolSeoMap = {
  "analysis/char-counter": {
    seoUsage: "Рахуйте твіти, SMS, meta-описи чи обсяг рукопису з живими лічильниками символів і слів.",
    seoBenefits: "Уся статистика з вашої вставки обчислюється в браузері — нічого не зберігається на text.kixt.net.",
    seoFaq: [
      { question: "Пробіли враховуються в підрахунку?", answer: "Панель показує значення з пробілами та без них." },
      { question: "Пресети ліміту блокують ввід?", answer: "Ні. Ліміти лише підказують залишок символів." },
    ],
  },
  "analysis/word-frequency": {
    seoUsage: "Знаходьте зайві терміни в SEO-текстах, промовах чи конспектах за uni/bi/tri-грамами.",
    seoBenefits: "Аналіз частотності на вашому CPU у вкладці; конфіденційний текст не передається назовні.",
    seoFaq: [
      { question: "Чи є фільтр стоп-слів?", answer: "Так. Списки стоп-слів відповідають мові інтерфейсу." },
      { question: "Як перейти до збігу?", answer: "Оберіть рядок — входження підсвітяться в редакторі." },
    ],
  },
  "cleanup/case": {
    seoUsage: "Нормалізуйте заголовки, SKU чи масові перейменування між режимами регістру.",
    seoBenefits: "Перетворення регістру з миттєвим прев’ю на клієнті; рядок нікуди не відправляється.",
    seoFaq: [
      { question: "Що таке розумний Title Case?", answer: "Короткі слова в заголовку лишаються в нижньому регістрі." },
      { question: "Чи є інверсія регістру?", answer: "Так. Invert міняє регістр кожної літери в прев’ю." },
    ],
  },
  "cleanup/clean": {
    seoUsage: "Знімайте HTML з експорту CMS, згортайте зайві пробіли та невидимі символи.",
    seoBenefits: "Метрики до/після і очищення локально — результат не зберігається на сервері.",
    seoFaq: [
      { question: "Пресети замінюють ручні опції?", answer: "Пресети — стартова комбінація; перемикачі можна змінювати." },
      { question: "Чи видно скільки символів прибрано?", answer: "Жива статистика показує різницю символів і рядків." },
    ],
  },
  "cleanup/format-post": {
    seoUsage: "Діліть довгі тексти на абзаци для стрічок і контролюйте ліміти символів перед публікацією.",
    seoBenefits: "Переноси й абзаци рахуються в браузері; чернетки постів не завантажуються.",
    seoFaq: [
      { question: "Пресети стрічки змінюють ліміти?", answer: "Пресети задають типові цілі, які можна перевизначити." },
      { question: "Застосувати формат до редактора?", answer: "Натисніть «Застосувати», щоб підставити результат прев’ю." },
    ],
  },
  "lines/dedupe": {
    seoUsage: "Прибирайте повтори email, URL чи рядків інвентарю, зберігаючи перший запис.",
    seoBenefits: "Дедуплікація лише на пристрої — великі списки не відправляються на обробку.",
    seoFaq: [
      { question: "Дублікати без урахування регістру?", answer: "Увімкніть ignore case, щоб ABC і abc були однаковими." },
      { question: "Є звіт про дублікати?", answer: "Так. Видно видалені рядки та кількість повторів." },
    ],
  },
  "lines/sort-lines": {
    seoUsage: "Сортуйте імена, за довжиною рядка, додавайте префікси, суфікси й нумерацію.",
    seoBenefits: "Сортування й афікси в пам’яті браузера без запитів на сервер.",
    seoFaq: [
      { question: "Прибрати порожні рядки перед сортуванням?", answer: "Увімкніть відповідну опцію в налаштуваннях." },
      { question: "Які формати нумерації?", answer: "Крапка, дужки та доповнення нулями." },
    ],
  },
  "lines/extract": {
    seoUsage: "Витягуйте email, URL або числа з логів, резюме чи скрапленого тексту за один прохід.",
    seoBenefits: "Пошук патернів локально — витягнуті значення не надсилаються на text.kixt.net.",
    seoFaq: [
      { question: "Копіювати один збіг?", answer: "У кожного рядка є копіювання; можна експортувати весь список." },
      { question: "Фільтр unique згортає повтори?", answer: "Так. Unique only прибирає дублікати в результаті." },
    ],
  },
  "diff/compare": {
    seoUsage: "Переглядайте зміни між двома версіями тексту, коментарів коду чи перекладів.",
    seoBenefits: "Diff рядків і слів на клієнті — конфіденційні чернетки не покидають сесію.",
    seoFaq: [
      { question: "Поміняти версії A і B?", answer: "Swap міняє поля без повторної вставки." },
      { question: "Є подання на рівні слів?", answer: "Так. Перемикайте режими рядків і слів у панелі." },
    ],
  },
};

const deCategories: CategorySeoMap = {
  analysis: {
    seoUsage:
      "Prüfen Sie Länge, Anzeigenlimits und Wiederholungen vor dem Veröffentlichen von Blogs, Newslettern oder Landingpages.",
    seoBenefits:
      "Zähler und Häufigkeitstabellen laufen im Browser — Quelltext wird nicht an text.kixt.net-Server gesendet.",
    seoFaq: [
      { question: "Aktualisieren sich die Werte beim Tippen?", answer: "Ja. Die Metriken lesen aus dem gemeinsamen Editorpuffer." },
      { question: "Worthäufigkeit exportieren?", answer: "TXT/CSV lokal kopieren oder herunterladen, ohne Upload." },
    ],
  },
  cleanup: {
    seoUsage:
      "Webtext bereinigen, Groß-/Kleinschreibung normalisieren, HTML entfernen und Posts für Social Media umbrechen.",
    seoBenefits:
      "Reinigung und Formatierung mit Live-Vorschau clientseitig — Entwürfe bleiben in Ihrem Tab.",
    seoFaq: [
      { question: "Wird der Originalentwurf ersetzt?", answer: "Erst nach „Anwenden“ ersetzt die Vorschau den Editorinhalt." },
      { question: "Wird HTML sicher entfernt?", answer: "Tags werden im Browser entfernt; Skripte werden nicht ausgeführt." },
    ],
  },
  lines: {
    seoUsage:
      "Logs deduplizieren, SKU-Listen sortieren, Aufzählungen nummerieren oder E-Mails und URLs extrahieren.",
    seoBenefits:
      "Listenoperationen nur auf Ihrem Gerät — Bestände und Kontaktdaten verlassen es nicht.",
    seoFaq: [
      { question: "Welche Zeile bleibt beim Dedup?", answer: "Standard: erste Zeile; Optionen für Groß-/Kleinschreibung und Leerzeichen." },
      { question: "Sortierung nach UI-Sprache?", answer: "Lokales Sortieren folgt der gewählten PureText-Sprache." },
    ],
  },
  diff: {
    seoUsage:
      "Vertragsfassungen, Übersetzungen oder Konfigs vergleichen und Änderungen sichtbar machen.",
    seoBenefits:
      "Diff vollständig lokal — keine Version wird zum Server-Vergleich gesendet.",
    seoFaq: [
      { question: "Leerzeichen oder Groß-/Kleinschreibung ignorieren?", answer: "Ja, über die entsprechenden Schalter." },
      { question: "Diff-Bericht exportieren?", answer: "Bericht kopieren oder herunterladen, ohne Upload der Eingaben." },
    ],
  },
};

const deTools: ToolSeoMap = {
  "analysis/char-counter": {
    seoUsage: "Tweets, SMS, Meta-Beschreibungen oder Manuskriptlänge mit Live-Zählern messen.",
    seoBenefits: "Alle Statistiken im Browser aus Ihrer Eingabe — nichts wird auf text.kixt.net gespeichert.",
    seoFaq: [
      { question: "Zählen Leerzeichen mit?", answer: "Anzeige mit und ohne Leerzeichen." },
      { question: "Blockieren Limit-Presets die Eingabe?", answer: "Nein. Limits sind Hinweise mit Restanzeige." },
    ],
  },
  "analysis/word-frequency": {
    seoUsage: "Übernutzte Begriffe in SEO-Texten oder Notizen per Uni-/Bi-/Trigrammen finden.",
    seoBenefits: "Häufigkeitsanalyse im Tab auf Ihrer CPU; kein Upload vertraulicher Inhalte.",
    seoFaq: [
      { question: "Stoppwörter filtern?", answer: "Ja, Listen passen zur UI-Sprache." },
      { question: "Zu Treffern springen?", answer: "Zeile wählen — Vorkommen werden im Editor markiert." },
    ],
  },
  "cleanup/case": {
    seoUsage: "Titel, Überschriften oder SKUs in verschiedenen Schreibweisen normalisieren.",
    seoBenefits: "Umwandlung mit Sofortvorschau clientseitig; keine Serverübertragung.",
    seoFaq: [
      { question: "Was ist smart Title Case?", answer: "Kurze Wörter im Titel bleiben klein, wenn aktiv." },
      { question: "Invertieren möglich?", answer: "Ja, invertiert die Schreibweise je Buchstabe in der Vorschau." },
    ],
  },
  "cleanup/clean": {
    seoUsage: "HTML aus CMS-Exporten, doppelte Leerzeichen und unsichtbare Zeichen entfernen.",
    seoBenefits: "Vorher/Nachher und Reinigung lokal — kein Serverspeicher.",
    seoFaq: [
      { question: "Ersetzen Presets manuelle Optionen?", answer: "Presets sind Startwerte; Schalter bleiben editierbar." },
      { question: "Entfernte Zeichen sichtbar?", answer: "Live-Statistik zeigt Zeichen- und Zeilendifferenzen." },
    ],
  },
  "cleanup/format-post": {
    seoUsage: "Lange Texte in feed-taugliche Absätze teilen und Zeichenbudgets prüfen.",
    seoBenefits: "Umbrüche im Browser; Postentwürfe werden nicht hochgeladen.",
    seoFaq: [
      { question: "Feed-Presets ändern Limits?", answer: "Sie setzen typische Ziele, die überschreibbar sind." },
      { question: "Format in Editor übernehmen?", answer: "„Anwenden“ ersetzt den Puffer durch die Vorschau." },
    ],
  },
  "lines/dedupe": {
    seoUsage: "Doppelte E-Mails, URLs oder Zeilen in Listen entfernen, erste Zeile behalten.",
    seoBenefits: "Dedup nur auf dem Gerät — große Listen ohne Upload.",
    seoFaq: [
      { question: "Ohne Berücksichtigung der Groß-/Kleinschreibung?", answer: "Option ignore case aktivieren." },
      { question: "Duplikatbericht vorhanden?", answer: "Ja, mit entfernten Zeilen und Häufigkeit." },
    ],
  },
  "lines/sort-lines": {
    seoUsage: "Namen alphabetisch sortieren, nach Länge, Präfixe/Suffixe und Nummerierung setzen.",
    seoBenefits: "Sortierung im Browser-Speicher ohne Serverroundtrip.",
    seoFaq: [
      { question: "Leere Zeilen vor Sort entfernen?", answer: "Option in den Sortiereinstellungen." },
      { question: "Nummerierungsformate?", answer: "Punkt, Klammer und führende Nullen." },
    ],
  },
  "lines/extract": {
    seoUsage: "E-Mails, URLs oder Zahlen aus Logs oder Textblöcken in einem Durchgang ziehen.",
    seoBenefits: "Mustersuche lokal — extrahierte Werte nicht an text.kixt.net.",
    seoFaq: [
      { question: "Einzelnen Treffer kopieren?", answer: "Pro Zeile kopieren oder Gesamtliste exportieren." },
      { question: "Unique filtert Duplikate?", answer: "Ja, „nur eindeutig“ kollabiert Wiederholungen." },
    ],
  },
  "diff/compare": {
    seoUsage: "Zwei Versionen von Text, Kommentaren oder Übersetzungen vergleichen.",
    seoBenefits: "Zeilen- und Wort-Diff clientseitig — vertrauliche Entwürfe bleiben privat.",
    seoFaq: [
      { question: "A und B tauschen?", answer: "Swap vertauscht die Felder ohne Neueinfügen." },
      { question: "Wortebene verfügbar?", answer: "Ja, zwischen Zeilen- und Wortmodus wechseln." },
    ],
  },
};

const esCategories: CategorySeoMap = {
  analysis: {
    seoUsage:
      "Comprueba longitud, límites de anuncios y repeticiones antes de publicar blogs, boletines o landings.",
    seoBenefits:
      "Contadores y tablas de frecuencia en el navegador — el texto no se sube a servidores de text.kixt.net.",
    seoFaq: [
      { question: "¿Las estadísticas se actualizan al escribir?", answer: "Sí, leen del búfer compartido del editor." },
      { question: "¿Puedo exportar frecuencias?", answer: "Copia o descarga TXT/CSV localmente sin subir el texto." },
    ],
  },
  cleanup: {
    seoUsage:
      "Corrige texto web, normaliza mayúsculas, quita HTML y formatea publicaciones largas para redes.",
    seoBenefits:
      "Limpieza y vista previa en el cliente — los borradores permanecen en tu pestaña.",
    seoFaq: [
      { question: "¿La limpieza reemplaza el borrador?", answer: "Solo al pulsar Aplicar para usar la vista previa." },
      { question: "¿Se elimina HTML de forma segura?", answer: "Las etiquetas se quitan en el navegador sin ejecutar scripts." },
    ],
  },
  lines: {
    seoUsage:
      "Deduplica registros, ordena listas SKU, numera viñetas o extrae correos y URL de pegados masivos.",
    seoBenefits:
      "Las operaciones con líneas se hacen en tu dispositivo — los datos no salen de la máquina.",
    seoFaq: [
      { question: "¿Qué duplicado se conserva?", answer: "Por defecto la primera aparición; hay opciones de mayúsculas y espacios." },
      { question: "¿Ordenación según el idioma de la UI?", answer: "Sí, según el idioma PureText elegido." },
    ],
  },
  diff: {
    seoUsage:
      "Compara revisiones de contratos, traducciones o configs y ve líneas añadidas, quitadas o cambiadas.",
    seoBenefits:
      "El diff es local — ninguna versión se envía para comparación en servidor.",
    seoFaq: [
      { question: "¿Ignorar espacios o mayúsculas?", answer: "Sí, activa las opciones antes de revisar el informe." },
      { question: "¿Exportar el informe diff?", answer: "Copia o descarga sin subir las entradas." },
    ],
  },
};

const esTools: ToolSeoMap = {
  "analysis/char-counter": {
    seoUsage: "Mide tuits, SMS, meta descripciones o longitud de manuscritos con contadores en vivo.",
    seoBenefits: "Todas las métricas en el navegador — nada se guarda en text.kixt.net.",
    seoFaq: [
      { question: "¿Cuentan los espacios?", answer: "Se muestran totales con y sin espacios." },
      { question: "¿Los presets bloquean escribir?", answer: "No, solo indican caracteres restantes." },
    ],
  },
  "analysis/word-frequency": {
    seoUsage: "Detecta términos repetidos en SEO, discursos o apuntes con uni/bi/trigramas.",
    seoBenefits: "Análisis en tu CPU en la pestaña; contenido sensible no se transmite.",
    seoFaq: [
      { question: "¿Filtro de stop words?", answer: "Sí, según el idioma de la interfaz." },
      { question: "¿Saltar a una coincidencia?", answer: "Elige una fila para resaltar en el editor." },
    ],
  },
  "cleanup/case": {
    seoUsage: "Normaliza títulos, encabezados o SKU entre modos de mayúsculas.",
    seoBenefits: "Transformación con vista previa instantánea en el cliente.",
    seoFaq: [
      { question: "¿Qué es title case inteligente?", answer: "Mantiene palabras cortas en minúsculas dentro del título." },
      { question: "¿Invertir mayúsculas?", answer: "Sí, invierte cada letra en la vista previa." },
    ],
  },
  "cleanup/clean": {
    seoUsage: "Quita HTML de export CMS, colapsa espacios y caracteres invisibles.",
    seoBenefits: "Métricas antes/después locales — sin almacenamiento en servidor.",
    seoFaq: [
      { question: "¿Los presets sustituyen opciones?", answer: "Son punto de partida; puedes ajustar interruptores." },
      { question: "¿Ver cuántos caracteres se quitaron?", answer: "Estadísticas en vivo con diferencias." },
    ],
  },
  "cleanup/format-post": {
    seoUsage: "Divide textos largos en párrafos para feeds y controla límites antes de publicar.",
    seoBenefits: "Saltos de línea en el navegador; borradores no se suben.",
    seoFaq: [
      { question: "¿Los presets cambian límites?", answer: "Fijan objetivos típicos que puedes cambiar." },
      { question: "¿Aplicar al editor?", answer: "Usa Aplicar para reemplazar el búfer." },
    ],
  },
  "lines/dedupe": {
    seoUsage: "Elimina correos, URL o filas repetidas conservando la primera.",
    seoBenefits: "Deduplicación solo en el dispositivo — listas grandes sin upload.",
    seoFaq: [
      { question: "¿Sin distinguir mayúsculas?", answer: "Activa ignorar mayúsculas." },
      { question: "¿Informe de duplicados?", answer: "Sí, con líneas eliminadas y repeticiones." },
    ],
  },
  "lines/sort-lines": {
    seoUsage: "Ordena nombres, por longitud, añade prefijos, sufijos y numeración.",
    seoBenefits: "Todo en memoria del navegador sin ida al servidor.",
    seoFaq: [
      { question: "¿Quitar líneas vacías antes?", answer: "Opción en ajustes de ordenación." },
      { question: "¿Formatos de numeración?", answer: "Punto, paréntesis y relleno con ceros." },
    ],
  },
  "lines/extract": {
    seoUsage: "Extrae correos, URL o números de logs o texto pegado de una vez.",
    seoBenefits: "Patrones locales — valores extraídos no se envían a text.kixt.net.",
    seoFaq: [
      { question: "¿Copiar un solo match?", answer: "Acción por fila o exportar lista completa." },
      { question: "¿Unique colapsa repetidos?", answer: "Sí, con el filtro de únicos." },
    ],
  },
  "diff/compare": {
    seoUsage: "Revisa cambios entre dos versiones de texto o traducciones.",
    seoBenefits: "Diff de líneas y palabras en el cliente; borradores confidenciales privados.",
    seoFaq: [
      { question: "¿Intercambiar A y B?", answer: "Swap invierte campos sin volver a pegar." },
      { question: "¿Vista por palabras?", answer: "Sí, cambia entre modos en el panel." },
    ],
  },
};

const plCategories: CategorySeoMap = {
  analysis: {
    seoUsage:
      "Sprawdź długość artykułu, limity reklam i powtórzenia przed publikacją blogów, newsletterów czy landingów.",
    seoBenefits:
      "Liczniki i częstotliwości w przeglądarce — tekst źródłowy nie trafia na serwery text.kixt.net.",
    seoFaq: [
      { question: "Czy statystyki aktualizują się na żywo?", answer: "Tak, z współdzielonego bufora edytora." },
      { question: "Eksport częstotliwości słów?", answer: "Kopiuj lub pobierz TXT/CSV lokalnie bez uploadu." },
    ],
  },
  cleanup: {
    seoUsage:
      "Popraw tekst z sieci, normalizuj wielkość liter, usuń HTML i formatuj długie posty pod social media.",
    seoBenefits:
      "Czyszczenie i podgląd po stronie klienta — szkice zostają w karcie przeglądarki.",
    seoFaq: [
      { question: "Czy czyszczenie nadpisze szkic?", answer: "Dopiero po „Zastosuj” z podglądu." },
      { question: "Bezpieczne usuwanie HTML?", answer: "Tagi zdejmowane w przeglądarce bez uruchamiania skryptów." },
    ],
  },
  lines: {
    seoUsage:
      "Deduplikuj logi, sortuj listy SKU, numeruj punkty lub wyciągaj e-maile i URL z masowych wklejek.",
    seoBenefits:
      "Operacje na liniach tylko na urządzeniu — dane nie opuszczają komputera.",
    seoFaq: [
      { question: "Która linia zostaje przy deduplikacji?", answer: "Domyślnie pierwsza; opcje wielkości liter i spacji." },
      { question: "Sortowanie wg języka UI?", answer: "Sortowanie lokalne według wybranego języka PureText." },
    ],
  },
  diff: {
    seoUsage:
      "Porównuj wersje umów, tłumaczeń lub configów i widź dodane, usunięte i zmienione linie.",
    seoBenefits:
      "Diff lokalnie — żadna wersja nie jest wysyłana do porównania serwerowego.",
    seoFaq: [
      { question: "Ignorować spacje lub wielkość liter?", answer: "Tak, włącz opcje przed przeglądem raportu." },
      { question: "Eksport raportu diff?", answer: "Kopiuj lub pobierz bez wysyłania wejść." },
    ],
  },
};

const plTools: ToolSeoMap = {
  "analysis/char-counter": {
    seoUsage: "Mierz tweety, SMS, meta opisy lub długość manuskryptu z licznikami na żywo.",
    seoBenefits: "Statystyki w przeglądarce z wklejki — bez zapisu na text.kixt.net.",
    seoFaq: [
      { question: "Czy spacje wliczane?", answer: "Widok z spacjami i bez." },
      { question: "Czy presety blokują pisanie?", answer: "Nie — tylko pokazują pozostałe znaki." },
    ],
  },
  "analysis/word-frequency": {
    seoUsage: "Znajdź nadużywane słowa w SEO, przemówieniach lub notatkach (uni/bi/trigramy).",
    seoBenefits: "Analiza na CPU w karcie; treści poufne nie są przesyłane.",
    seoFaq: [
      { question: "Filtr słów stop?", answer: "Tak, listy wg języka interfejsu." },
      { question: "Skok do wystąpienia?", answer: "Wybierz wiersz — podświetlenie w edytorze." },
    ],
  },
  "cleanup/case": {
    seoUsage: "Normalizuj tytuły, nagłówki lub SKU między trybami wielkości liter.",
    seoBenefits: "Transformacja z podglądem w kliencie; brak wysyłki na serwer.",
    seoFaq: [
      { question: "Co to smart Title Case?", answer: "Krótkie słowa w tytule pozostają małe." },
      { question: "Odwracanie wielkości?", answer: "Tak, tryb invert w podglądzie." },
    ],
  },
  "cleanup/clean": {
    seoUsage: "Usuń HTML z eksportu CMS, zwiń spacje i znaki niewidoczne.",
    seoBenefits: "Metryki przed/po lokalnie — bez trwałego zapisu na serwerze.",
    seoFaq: [
      { question: "Presety vs ręczne opcje?", answer: "Presety to start; przełączniki można zmieniać." },
      { question: "Widać ile znaków usunięto?", answer: "Statystyki na żywo pokazują różnice." },
    ],
  },
  "cleanup/format-post": {
    seoUsage: "Dziel długie teksty na akapity pod feedy i kontroluj limity znaków.",
    seoBenefits: "Łamanie wierszy w przeglądarce; szkice postów bez uploadu.",
    seoFaq: [
      { question: "Presety feedu a limity?", answer: "Ustawiają typowe cele do nadpisania." },
      { question: "Zastosować do edytora?", answer: "„Zastosuj” podstawia wynik podglądu." },
    ],
  },
  "lines/dedupe": {
    seoUsage: "Usuń powtórzone e-maile, URL lub wiersze, zostawiając pierwszy wpis.",
    seoBenefits: "Deduplikacja na urządzeniu — duże listy bez wysyłki.",
    seoFaq: [
      { question: "Bez rozróżniania wielkości liter?", answer: "Włącz ignorowanie wielkości." },
      { question: "Raport duplikatów?", answer: "Tak, z usuniętymi liniami i liczbą powtórzeń." },
    ],
  },
  "lines/sort-lines": {
    seoUsage: "Sortuj alfabetycznie, po długości, dodawaj prefiksy, sufiksy i numerację.",
    seoBenefits: "Sortowanie w pamięci przeglądarki bez round-tripu.",
    seoFaq: [
      { question: "Usunąć puste linie przed sortem?", answer: "Opcja w ustawieniach sortowania." },
      { question: "Formaty numeracji?", answer: "Kropka, nawias i zera wiodące." },
    ],
  },
  "lines/extract": {
    seoUsage: "Wyciągnij e-maile, URL lub liczby z logów lub wklejonych bloków.",
    seoBenefits: "Dopasowanie wzorców lokalnie — wyniki nie idą na text.kixt.net.",
    seoFaq: [
      { question: "Kopiować pojedynczy wynik?", answer: "Akcja w wierszu lub eksport całej listy." },
      { question: "Unique scala powtórzenia?", answer: "Tak, z filtrem unikalnych." },
    ],
  },
  "diff/compare": {
    seoUsage: "Przejrzyj różnice między dwiema wersjami tekstu lub tłumaczeń.",
    seoBenefits: "Diff linii i słów po stronie klienta; poufne szkice zostają prywatne.",
    seoFaq: [
      { question: "Zamienić A i B?", answer: "Swap bez ponownego wklejania." },
      { question: "Widok słowny?", answer: "Tak, przełącz tryby w panelu." },
    ],
  },
};

const frCategories: CategorySeoMap = {
  analysis: {
    seoUsage:
      "Vérifiez longueur, limites pub et répétitions avant de publier blogs, newsletters ou landing pages.",
    seoBenefits:
      "Compteurs et fréquences dans le navigateur — le texte source n’est pas envoyé aux serveurs text.kixt.net.",
    seoFaq: [
      { question: "Les stats se mettent-elles à jour en tapant ?", answer: "Oui, depuis le tampon partagé de l’éditeur." },
      { question: "Exporter les fréquences ?", answer: "Copiez ou téléchargez TXT/CSV localement sans upload." },
    ],
  },
  cleanup: {
    seoUsage:
      "Corrigez du texte web, normalisez la casse, retirez le HTML et formatez les posts pour les réseaux.",
    seoBenefits:
      "Nettoyage et aperçu côté client — les brouillons restent dans l’onglet.",
    seoFaq: [
      { question: "Le nettoyage remplace-t-il le brouillon ?", answer: "Seulement après « Appliquer » depuis l’aperçu." },
      { question: "HTML retiré en sécurité ?", answer: "Balises supprimées dans le navigateur sans exécuter de scripts." },
    ],
  },
  lines: {
    seoUsage:
      "Dédoublonnez des logs, triez des listes SKU, numérotez des puces ou extrayez e-mails et URL.",
    seoBenefits:
      "Traitement des lignes sur votre appareil — les données n’en sortent pas.",
    seoFaq: [
      { question: "Quel doublon est conservé ?", answer: "Par défaut la première ligne ; options de casse et espaces." },
      { question: "Tri selon la langue de l’UI ?", answer: "Oui, selon la langue PureText choisie." },
    ],
  },
  diff: {
    seoUsage:
      "Comparez révisions de contrats, traductions ou configs et voyez lignes ajoutées, supprimées ou modifiées.",
    seoBenefits:
      "Diff entièrement local — aucune version n’est envoyée pour comparaison serveur.",
    seoFaq: [
      { question: "Ignorer espaces ou casse ?", answer: "Oui, activez les options avant le rapport." },
      { question: "Exporter le rapport diff ?", answer: "Copie ou téléchargement sans envoyer les entrées." },
    ],
  },
};

const frTools: ToolSeoMap = {
  "analysis/char-counter": {
    seoUsage: "Mesurez tweets, SMS, meta descriptions ou longueur de manuscrit avec compteurs en direct.",
    seoBenefits: "Toutes les stats dans le navigateur — rien n’est stocké sur text.kixt.net.",
    seoFaq: [
      { question: "Les espaces comptent-ils ?", answer: "Affichage avec et sans espaces." },
      { question: "Les presets bloquent-ils la saisie ?", answer: "Non, ils indiquent seulement le reste." },
    ],
  },
  "analysis/word-frequency": {
    seoUsage: "Repérez les termes surutilisés en SEO, discours ou notes via uni/bi/trigrammes.",
    seoBenefits: "Analyse sur votre CPU dans l’onglet ; contenu sensible non transmis.",
    seoFaq: [
      { question: "Filtre de mots vides ?", answer: "Oui, selon la langue de l’interface." },
      { question: "Aller à une occurrence ?", answer: "Choisissez une ligne pour surligner dans l’éditeur." },
    ],
  },
  "cleanup/case": {
    seoUsage: "Normalisez titres, en-têtes ou SKU entre modes de casse.",
    seoBenefits: "Transformation avec aperçu instantané côté client.",
    seoFaq: [
      { question: "Qu’est-ce que le title case intelligent ?", answer: "Petits mots en minuscules dans le titre." },
      { question: "Inverser la casse ?", answer: "Oui, inverse chaque lettre dans l’aperçu." },
    ],
  },
  "cleanup/clean": {
    seoUsage: "Retirez le HTML d’exports CMS, compressez espaces et caractères invisibles.",
    seoBenefits: "Métriques avant/après locales — pas de stockage serveur.",
    seoFaq: [
      { question: "Les presets remplacent-ils les options ?", answer: "Point de départ ; réglages modifiables." },
      { question: "Voir les caractères supprimés ?", answer: "Stats en direct avec écarts." },
    ],
  },
  "cleanup/format-post": {
    seoUsage: "Découpez de longs textes en paragraphes pour feeds et contrôlez les limites.",
    seoBenefits: "Retours à la ligne dans le navigateur ; brouillons non uploadés.",
    seoFaq: [
      { question: "Les presets modifient-ils les limites ?", answer: "Objectifs typiques modifiables." },
      { question: "Appliquer à l’éditeur ?", answer: "« Appliquer » remplace le tampon par l’aperçu." },
    ],
  },
  "lines/dedupe": {
    seoUsage: "Supprimez e-mails, URL ou lignes en double en gardant la première.",
    seoBenefits: "Dédoublonnage sur l’appareil — grandes listes sans upload.",
    seoFaq: [
      { question: "Sans tenir compte de la casse ?", answer: "Activez ignorer la casse." },
      { question: "Rapport des doublons ?", answer: "Oui, avec lignes retirées et fréquence." },
    ],
  },
  "lines/sort-lines": {
    seoUsage: "Triez des noms, par longueur, ajoutez préfixes, suffixes et numérotation.",
    seoBenefits: "Tri en mémoire navigateur sans aller-retour serveur.",
    seoFaq: [
      { question: "Retirer les lignes vides avant tri ?", answer: "Option dans les réglages de tri." },
      { question: "Formats de numérotation ?", answer: "Point, parenthèses et zéros initiaux." },
    ],
  },
  "lines/extract": {
    seoUsage: "Extrayez e-mails, URL ou nombres de logs ou blocs collés en une passe.",
    seoBenefits: "Correspondance locale — valeurs extraites non envoyées à text.kixt.net.",
    seoFaq: [
      { question: "Copier une seule entrée ?", answer: "Action par ligne ou export de la liste." },
      { question: "Unique fusionne les répétitions ?", answer: "Oui, avec filtre unique." },
    ],
  },
  "diff/compare": {
    seoUsage: "Passez en revue les changements entre deux versions de texte ou traductions.",
    seoBenefits: "Diff lignes et mots côté client ; brouillons confidentiels privés.",
    seoFaq: [
      { question: "Échanger A et B ?", answer: "Swap sans recoller." },
      { question: "Vue au niveau des mots ?", answer: "Oui, changez de mode dans le panneau." },
    ],
  },
};

export const categorySeoContent: Record<Lang, CategorySeoMap> = {
  en: enCategories,
  uk: ukCategories,
  de: deCategories,
  es: esCategories,
  pl: plCategories,
  fr: frCategories,
};

export const toolSeoContent: Record<Lang, ToolSeoMap> = {
  en: enTools,
  uk: ukTools,
  de: deTools,
  es: esTools,
  pl: plTools,
  fr: frTools,
};