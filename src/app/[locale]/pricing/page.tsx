import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return { title: `${t("title")} — Screen Studio` };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pricing");

  const freeFeatures = [t("free1"), t("free2"), t("free3"), t("free4")];
  const proFeatures = [t("pro1"), t("pro2"), t("pro3"), t("pro4"), t("pro5"), t("pro6")];
  const faq = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("subtitle")}</p>
      </div>

      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Free */}
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-lg font-medium">{t("freeName")}</h2>
          <p className="mt-2 text-sm text-muted">{t("freeTagline")}</p>
          <p className="mt-6 text-4xl font-semibold">
            $0
            <span className="text-base font-normal text-muted">{t("freePeriod")}</span>
          </p>
          <Link
            href="/download"
            className="mt-8 block rounded-full border border-border py-3 text-center text-sm font-semibold transition-colors hover:bg-surface-2"
          >
            {t("freeCta")}
          </Link>
          <ul className="mt-8 space-y-3 text-sm">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-foreground/90">
                <CheckIcon /> {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="relative rounded-2xl border border-accent bg-surface p-8 shadow-[0_0_0_1px_var(--accent)]">
          <span className="absolute -top-3 start-8 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
            {t("proBadge")}
          </span>
          <h2 className="text-lg font-medium">{t("proName")}</h2>
          <p className="mt-2 text-sm text-muted">{t("proTagline")}</p>
          <p className="mt-6 text-4xl font-semibold">
            $9.99
            <span className="text-base font-normal text-muted">{t("proPeriod")}</span>
          </p>
          <Link
            href="/download"
            className="mt-8 block rounded-full bg-accent py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t("proCta")}
          </Link>
          <ul className="mt-8 space-y-3 text-sm">
            {proFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-foreground/90">
                <CheckIcon /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-md text-center text-xs text-muted">{t("upgradeNote")}</p>

      {/* FAQ */}
      <div className="mx-auto mt-24 max-w-2xl">
        <h2 className="text-center text-2xl font-semibold tracking-tight">{t("faqTitle")}</h2>
        <div className="mt-8 space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="rounded-xl border border-border bg-surface p-5">
              <p className="font-medium">{item.q}</p>
              <p className="mt-2 text-sm text-muted">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent-2"
    >
      <path
        d="M4 10.5L8 14.5L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
