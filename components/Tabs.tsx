"use client";

import { useLocale } from "@/components/LocaleProvider";
import type { MealType } from "@/lib/types";

interface TabsProps {
  value: MealType;
  onChange: (v: MealType) => void;
  className?: string;
  disabled?: boolean;
}

export function Tabs({ value, onChange, className = "", disabled = false }: TabsProps) {
  const { t } = useLocale();
  const options: MealType[] = ["breakfast", "lunch", "dinner"];
  const labelKeys = { breakfast: "tabs.breakfast" as const, lunch: "tabs.lunch" as const, dinner: "tabs.dinner" as const };
  return (
    <div
      role="tablist"
      className={`flex gap-0 rounded-xl bg-mt-brown-light/80 p-1 ${className}`}
      aria-label={t("tabs.ariaLabel")}
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="tab"
          aria-selected={value === opt}
          disabled={disabled}
          aria-disabled={disabled}
          onClick={() => !disabled && onChange(opt)}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all tap-highlight-none ${
            disabled ? "cursor-not-allowed opacity-50" : ""
          } ${
            value === opt
              ? "selected-primary bg-mt-primary text-white shadow-sm"
              : "text-mt-body hover:text-mt-body"
          }`}
        >
          {t(labelKeys[opt])}
        </button>
      ))}
    </div>
  );
}
