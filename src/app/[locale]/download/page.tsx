import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "download" });
  return { title: `${t("title")} — Screen Studio`, description: t("subtitle") };
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("download");

  const requirements = [t("requirement1"), t("requirement2"), t("requirement3")];

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("subtitle")}</p>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
        {/* Build not published yet — wire this href up to the real GitHub
            Release / CDN asset once a signed build is available. */}
        <a
          href="#"
          aria-disabled="true"
          className="inline-flex items-center gap-2 rounded-full bg-foreground/40 px-6 py-3 text-sm font-semibold text-background/80 cursor-not-allowed"
        >
          <AppleIcon />
          {t("cta")}
        </a>
        <p className="mt-4 text-xs text-muted">{t("comingSoon")}</p>
      </div>

      <div className="mt-12 text-start">
        <h2 className="text-sm font-medium text-foreground">{t("requirementsTitle")}</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M16.365 1.43c0 1.14-.415 2.07-1.245 2.79-.83.72-1.83 1.14-3 1.26-.06-1.14.375-2.13 1.215-2.85.84-.72 1.83-1.11 2.97-1.2.03.03.045.03.06 0zM20.85 17.19c-.36.87-.75 1.71-1.32 2.49-.75 1.02-1.5 2.04-2.7 2.07-1.14.03-1.5-.69-2.85-.69-1.35 0-1.77.66-2.85.72-1.11.03-1.98-1.08-2.76-2.1-1.53-2.1-2.7-5.94-1.14-8.55.78-1.29 2.13-2.13 3.63-2.16 1.05-.03 2.04.72 2.7.72.66 0 1.83-.87 3.12-.75.51.03 1.98.21 2.94 1.56-.09.06-1.77 1.02-1.74 3.06.03 2.4 2.1 3.21 2.13 3.24-.03.09-.33 1.14-.15 1.44z" />
    </svg>
  );
}
