import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  const columns = [
    {
      title: t("product"),
      links: [
        { href: "/#features", label: t("features") },
        { href: "/pricing", label: t("pricing") },
        { href: "/download", label: t("download") },
      ],
    },
    {
      title: t("resources"),
      links: [
        { href: "/help", label: t("helpFaq") },
        { href: "/changelog", label: t("changelog") },
      ],
    },
    {
      title: t("company"),
      links: [
        { href: "mailto:hello@screenstudio.example", label: t("contact") },
        { href: "/legal/privacy", label: t("privacy") },
        { href: "/legal/terms", label: t("terms") },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white">
                S
              </span>
              Screen Studio
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">{t("tagline")}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith("mailto:");
                  return (
                    <li key={link.href}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          className="text-sm text-muted transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} Screen Studio. {t("rights")}
          </p>
          <p>{t("madeFor")}</p>
        </div>
      </div>
    </footer>
  );
}
