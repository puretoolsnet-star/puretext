import { CURRENT_ECOSYSTEM_PROJECT_ID, KIXT_HUB_ORIGIN } from "@/lib/ecosystem";
import type { Lang } from "@/i18n/locales";

export const KIXT_GTM_ID = "GTM-K2VWRNJ7";

export const KIXT_ECOSYSTEM_CONTEXT = {
  ecosystem: "kixt.net",
  ecosystemHub: KIXT_HUB_ORIGIN,
  product: CURRENT_ECOSYSTEM_PROJECT_ID,
  siteHost: "text.kixt.net",
} as const;

export type KixtDataLayerPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: KixtDataLayerPayload[];
  }
}

export function pushKixtDataLayer(payload: KixtDataLayerPayload): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

export function kixtPageContext(lang: Lang, pathname: string, pageRoute: string): KixtDataLayerPayload {
  return {
    event: "kixt_page_context",
    ...KIXT_ECOSYSTEM_CONTEXT,
    page_lang: lang,
    page_path: pathname,
    page_route: pageRoute,
  };
}

export function kixtGtmBootstrapScript(): string {
  const init = JSON.stringify({
    ...KIXT_ECOSYSTEM_CONTEXT,
    event: "kixt_ecosystem_init",
  });
  const id = KIXT_GTM_ID;
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push(${init});w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;
}