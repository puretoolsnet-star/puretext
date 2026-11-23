import { LANGS, type Lang } from "@/i18n/locales";
import { localizedPath } from "@/lib/i18n/routing";

export const CURRENT_ECOSYSTEM_PROJECT_ID = "pureText" as const;

export type EcosystemProjectId =
  | "purepdf"
  | "pureQr"
  | "pureTable"
  | "pureSign"
  | "pureImage"
  | "pureConvert"
  | "pureText";

export type EcosystemProjectStatus = "active" | "comingSoon";

export type EcosystemProjectMeta = {
  id: EcosystemProjectId;
  status: EcosystemProjectStatus;
  href?: string;
  external?: boolean;
};

function origin(value: string | undefined, fallback: string) {
  return (value?.trim() || fallback).replace(/\/$/, "");
}

const purepdfOrigin = origin(process.env.NEXT_PUBLIC_ECOSYSTEM_PUREPDF_URL, "https://pdf.kixt.net");
const pureQrOrigin = origin(process.env.NEXT_PUBLIC_ECOSYSTEM_PUREQR_URL, "https://qr.kixt.net");
const pureTableOrigin = origin(process.env.NEXT_PUBLIC_ECOSYSTEM_PURETABLE_URL, "https://table.kixt.net");
const pureSignOrigin = origin(process.env.NEXT_PUBLIC_ECOSYSTEM_PURESIGN_URL, "https://sign.kixt.net");
const pureImageOrigin = origin(process.env.NEXT_PUBLIC_ECOSYSTEM_PUREIMAGE_URL, "https://img.kixt.net");
const pureConvertOrigin = origin(process.env.NEXT_PUBLIC_ECOSYSTEM_PURECONVERT_URL, "https://convert.kixt.net");
export const KIXT_HUB_ORIGIN = origin(process.env.NEXT_PUBLIC_KIXT_URL, "https://kixt.net");

export const ECOSYSTEM_PROJECTS: EcosystemProjectMeta[] = [
  { id: "purepdf", status: "active", href: purepdfOrigin, external: true },
  { id: "pureQr", status: "active", href: pureQrOrigin, external: true },
  { id: "pureTable", status: "active", href: pureTableOrigin, external: true },
  { id: "pureSign", status: "active", href: pureSignOrigin, external: true },
  { id: "pureImage", status: "active", href: pureImageOrigin, external: true },
  { id: "pureConvert", status: "active", href: pureConvertOrigin, external: true },
  { id: "pureText", status: "active", href: "/" },
];

const langSuffix = new RegExp(`/(${LANGS.join("|")})$`);

export function ecosystemHref(project: EcosystemProjectMeta, lang: Lang): string | undefined {
  if (!project.href) return undefined;
  if (!project.external) return localizedPath(lang, project.href);
  const base = project.href.replace(/\/$/, "").replace(langSuffix, "");
  return `${base}/${lang}`;
}

export function kixtHubHref(lang: Lang): string {
  const base = KIXT_HUB_ORIGIN.replace(/\/$/, "").replace(langSuffix, "");
  return `${base}/${lang}`;
}

export function isCurrentEcosystemProject(id: EcosystemProjectId): boolean {
  return id === CURRENT_ECOSYSTEM_PROJECT_ID;
}