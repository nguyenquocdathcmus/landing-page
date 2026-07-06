import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const features = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`feature${n}Title` as "feature1Title"),
    description: t(`feature${n}Description` as "feature1Description"),
  }));

  const testimonials = [1, 2, 3].map((n) => ({
    quote: t(`testimonial${n}Quote` as "testimonial1Quote"),
    name: t(`testimonial${n}Name` as "testimonial1Name"),
    role: t(`testimonial${n}Role` as "testimonial1Role"),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(ellipse_at_top,_var(--accent)_0%,_transparent_60%)] opacity-20"
        />
        <p className="mx-auto mb-6 inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
          {t("badge")}
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          {t("heroTitleLine1")}
          <br />
          {t("heroTitleLine2")}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{t("heroSubtitle")}</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/download"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {t("downloadCta")}
          </Link>
          <Link
            href="/pricing"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            {t("pricingCta")}
          </Link>
        </div>

        {/* Demo mockup placeholder */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-surface-2 via-surface to-background">
              <span className="text-sm text-muted">{t("demoPreview")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-border/60 bg-surface/40 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm font-medium tracking-wide text-muted">
          <span>{t("trustedBy")}</span>
          <span className="text-foreground/70">Framewire</span>
          <span className="text-foreground/70">Nimbus</span>
          <span className="text-foreground/70">Lightframe</span>
          <span className="text-foreground/70">Northbeam</span>
          <span className="text-foreground/70">Cascade</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("featuresTitle")}
          </h2>
          <p className="mt-4 text-muted">{t("featuresSubtitle")}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <div className="mb-4 h-9 w-9 rounded-lg bg-gradient-to-br from-accent to-accent-2" />
              <h3 className="font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border/60 bg-surface/40 px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("testimonialsTitle")}
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <blockquote className="text-sm text-foreground/90">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium">{testimonial.name}</span>
                <span className="text-muted"> — {testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("ctaTitle")}</h2>
        <p className="mx-auto mt-4 max-w-md text-muted">{t("ctaSubtitle")}</p>
        <div className="mt-8">
          <Link
            href="/download"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {t("downloadCta")}
          </Link>
        </div>
      </section>
    </>
  );
}
