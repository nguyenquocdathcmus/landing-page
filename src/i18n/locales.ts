/**
 * Same 13 languages as desktop-app (src/shared/locales.ts) — kept in sync
 * manually since this is a separate Next.js project with its own build.
 */
export const SUPPORTED_LOCALES = [
  "en", "ar", "es", "fr", "it", "ja", "ko", "pt-BR", "ru", "tr", "vi", "zh-Hans", "zh-Hant",
] as const;

export type LocaleCode = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: LocaleCode = "en";

export const LOCALE_LABELS: Record<LocaleCode, string> = {
  en: "English",
  ar: "العربية",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  ja: "日本語",
  ko: "한국어",
  "pt-BR": "Português (Brasil)",
  ru: "Русский",
  tr: "Türkçe",
  vi: "Tiếng Việt",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
};

/** Right-to-left languages — used to set `dir="rtl"` at the document root. */
export const RTL_LOCALES: ReadonlySet<LocaleCode> = new Set(["ar"]);
