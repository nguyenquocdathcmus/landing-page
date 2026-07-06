import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

// Sprint 30 US-224 — the Footer has linked here since launch; this page makes
// the link real. Hand-authored user-facing highlights, mirroring the in-app
// "What's New" panel (desktop-app app-handlers.ts CHANGELOG).
const RELEASES: { version: string; date: string; items: string[] }[] = [
  {
    version: "0.1.0",
    date: "2026-07",
    items: [
      "Proxy preview for smooth scrubbing on large 4K recordings",
      "Chapter markers and a shareable timestamp link",
      "Project templates to reuse a structure across a video series",
      "Pro subscription launch — 4K 60fps export, webcam & audio recording, on-device transcripts",
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "changelog" });
  return { title: `${t("title")} — Screen Studio` };
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("changelog");

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("subtitle")}</p>

      <div className="mt-12 space-y-12">
        {RELEASES.map((release) => (
          <section key={release.version} className="relative border-s border-border ps-6">
            <span className="absolute -start-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <h2 className="text-lg font-medium">
              v{release.version}
              <span className="ms-3 text-sm font-normal text-muted">{release.date}</span>
            </h2>
            <ul className="mt-3 space-y-2">
              {release.items.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted">
                  • {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
