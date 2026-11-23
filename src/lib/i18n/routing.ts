import { DEFAULT_LANG, isLang, LANGS, type Lang } from "@/i18n/locales";

const LANG_PATTERN = new RegExp(`^/(${LANGS.join("|")})(?=/|$)`);

export function stripLangPrefix(pathname: string): string {
  const match = pathname.match(LANG_PATTERN);
  if (!match) return pathname || "/";
  const rest = pathname.slice(match[0].length);
  return rest === "" ? "/" : rest;
}

export function langFromPathname(pathname: string): Lang | null {
  const match = pathname.match(LANG_PATTERN);
  if (!match) return null;
  const code = match[1];
  return isLang(code) ? code : null;
}

export function localizedPath(lang: Lang, path: string): string {
  const normalized =
    path === "/" || path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${lang}`;
  return `/${lang}${normalized}`;
}

export function defaultLangRedirectPath(pathname: string): string {
  return localizedPath(DEFAULT_LANG, stripLangPrefix(pathname));
}