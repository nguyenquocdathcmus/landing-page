import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("nav");

  const navLinks = [
    { href: "/#features", label: t("product") },
    { href: "/help", label: t("help") },
    { href: "/pricing", label: t("pricing") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-sm font-bold text-white">
            S
          </span>
          Screen Studio
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/download"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t("download")}
          </Link>
        </div>
      </div>
    </header>
  );
}
