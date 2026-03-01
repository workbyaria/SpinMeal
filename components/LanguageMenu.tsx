"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import type { LocaleId } from "@/lib/locale";

const LOCALES: { id: LocaleId; label: string }[] = [
  { id: "zh-TW", label: "繁體中文" },
  { id: "zh-CN", label: "简体中文" },
  { id: "en", label: "English" },
];

export function LanguageMenu() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) {
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg p-2 text-mt-muted hover:bg-mt-brown-light hover:text-mt-body tap-highlight-none"
        aria-label={t("settings.ariaLabel")}
        aria-expanded={open}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border border-mt-border bg-mt-surface py-2 shadow-lg"
          role="menu"
        >
          {LOCALES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="menuitem"
              onClick={() => {
                setLocale(id);
                setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm tap-highlight-none hover:bg-mt-brown-light ${
                locale === id ? "font-bold text-mt-body" : "font-normal text-mt-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
