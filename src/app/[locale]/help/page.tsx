import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "help" });
  return { title: `${t("title")} — Screen Studio` };
}

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("help");

  const categories = [
    {
      title: t("categoryGettingStarted"),
      items: [
        { q: t("gs1Q"), a: t("gs1A") },
        { q: t("gs2Q"), a: t("gs2A") },
        { q: t("gs3Q"), a: t("gs3A") },
      ],
    },
    {
      title: t("categoryEditing"),
      items: [
        { q: t("ed1Q"), a: t("ed1A") },
        { q: t("ed2Q"), a: t("ed2A") },
        { q: t("ed3Q"), a: t("ed3A") },
      ],
    },
    {
      title: t("categoryExporting"),
      items: [
        { q: t("ex1Q"), a: t("ex1A") },
        { q: t("ex2Q"), a: t("ex2A") },
      ],
    },
    {
      title: t("categoryAccount"),
      items: [
        { q: t("ac1Q"), a: t("ac1A") },
        { q: t("ac2Q"), a: t("ac2A") },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-muted">
          {t("subtitlePrefix")}{" "}
          <a
            href="mailto:hello@screenstudio.example"
            className="text-accent-2 underline underline-offset-4"
          >
            {t("contactUs")}
          </a>
          .
        </p>
      </div>

      <div className="mt-16 space-y-12">
        {categories.map((category) => (
          <div key={category.title}>
            <h2 className="text-lg font-semibold">{category.title}</h2>
            <div className="mt-4 space-y-3">
              {category.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-border bg-surface p-5 open:pb-5"
                >
                  <summary className="cursor-pointer list-none font-medium marker:content-none">
                    <span className="flex items-center justify-between gap-4">
                      {item.q}
                      <span className="text-muted transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
