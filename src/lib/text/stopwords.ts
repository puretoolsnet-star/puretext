import type { Lang } from "@/i18n/locales";

const EN = new Set(
  "a an the and or but if then else when at by for with about against between into through during before after above below to from up down in out on off over under again further once here there all any both each few more most other some such no nor not only own same so than too very can will just don should now".split(
    " ",
  ),
);

const UK = new Set(
  "і та й що на в у з для до як або але не ні коли це той цей ця ці він вона воно вони мене тебе його її нас вас їх уже ще вже бути є був була були щоб усього всі кожен би ж".split(
    " ",
  ),
);

const DE = new Set(
  "der die das und oder aber wenn während nach vor über unter aus bei mit von zu an auf ein eine einer eines einen einem eines ist sind war waren sein haben hat wird kann nicht nur auch sehr noch schon noch als wie".split(
    " ",
  ),
);

const ES = new Set(
  "el la los las un una unos unas y o pero si porque como cuando donde del de la en con por para sin sobre entre hasta desde ya muy tan también este esta estos esas ese esos esas ser es son fue eran".split(
    " ",
  ),
);

const FR = new Set(
  "le la les un une des et ou mais si car comme dans pour avec sans sur sous entre vers chez du de des au aux est sont était été être avoir a ont été ce cette ces il elle ils elles nous vous je tu".split(
    " ",
  ),
);

const PL = new Set(
  "i w z do na od za po przy o u dla że to ten ta te jest są był była było nie tak jak ale czy już też jeszcze od może jego jej ich się go je mu nią nim niej nim".split(
    " ",
  ),
);

export const STOPWORDS: Record<Lang, Set<string>> = {
  en: EN,
  uk: UK,
  de: DE,
  es: ES,
  fr: FR,
  pl: PL,
};

export function isStopWord(token: string, lang: Lang): boolean {
  return STOPWORDS[lang].has(token.toLowerCase());
}