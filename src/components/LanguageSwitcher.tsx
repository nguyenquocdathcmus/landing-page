"use client";

import { useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { SUPPORTED_LOCALES, LOCALE_LABELS, type LocaleCode } from "@/i18n/locales";

export function LanguageSwitcher() {
  const locale = useLocale() as LocaleCode;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  function selectLocale(next: LocaleCode) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium text-muted transition-colors hover:text-foreground"
      >
        <GlobeIcon className="h-3.5 w-3.5" />
        {LOCALE_LABELS[locale]}
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute end-0 top-full z-50 mt-2 max-h-80 w-48 overflow-y-auto rounded-xl border border-border bg-surface p-1 shadow-2xl shadow-black/40"
        >
          {SUPPORTED_LOCALES.map((code) => (
            <button
              key={code}
              role="option"
              aria-selected={code === locale}
              onClick={() => selectLocale(code)}
              className={`block w-full rounded-lg px-3 py-2 text-start text-sm transition-colors ${
                code === locale
                  ? "bg-surface-2 text-foreground"
                  : "text-muted hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              {LOCALE_LABELS[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M10 2.5c2.5 2 2.5 13 0 15M10 2.5c-2.5 2-2.5 13 0 15M2.7 10h14.6"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
