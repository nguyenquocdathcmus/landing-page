import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  return { title: `${t("successTitle")} — Screen Studio` };
}

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-2/10">
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-accent-2">
          <path
            d="M5 12.5L10 17.5L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">
        {t("successTitle")}
      </h1>
      <p className="mt-4 text-muted">{t("successBody")}</p>
      <p className="mt-2 text-sm text-muted">{t("successHint")}</p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface-2"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
