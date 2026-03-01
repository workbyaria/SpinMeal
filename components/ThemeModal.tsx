"use client";

import { useEffect } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { setTheme, type ThemeId } from "@/lib/theme";

function useThemeOptions(): { id: ThemeId; label: string }[] {
  const { t } = useLocale();
  return [
    { id: "light", label: t("theme.light") },
    { id: "dark", label: t("theme.dark") },
  ];
}

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ThemeId;
  onSelect: (theme: ThemeId) => void;
}

export function ThemeModal({ isOpen, onClose, currentTheme, onSelect }: ThemeModalProps) {
  const THEMES = useThemeOptions();
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 tap-highlight-none"
        aria-hidden
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-modal-title"
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border border-mt-border border-b-0 bg-mt-surface p-6 shadow-xl"
      >
        <h2 id="theme-modal-title" className="mb-4 text-base font-semibold text-mt-body">
          外觀設定
        </h2>
        <ul className="space-y-2">
          {THEMES.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => {
                  setTheme(id);
                  onSelect(id);
                  onClose();
                }}
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium tap-highlight-none ${
                  currentTheme === id
                    ? "bg-mt-primary text-white"
                    : "border border-mt-border bg-mt-brown-light text-mt-body hover:bg-mt-border"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
