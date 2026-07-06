import { defineRouting } from "next-intl/routing";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./locales";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // Every locale gets a visible URL prefix, including the default ("en") —
  // simpler to reason about than "no prefix on default", and avoids two
  // different canonical URLs existing for the same English content.
  localePrefix: "always",
});
