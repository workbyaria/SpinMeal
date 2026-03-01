"use client";

import { useLocale } from "@/components/LocaleProvider";
import type { MealType } from "@/lib/types";

interface TabsProps {
  value: MealType;
  onChange: (v: MealType) => void;
  className?: string;
}

export function Tabs({ value, onChange, className = "" }: TabsProps) {
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
          role="tab"
          aria-selected={value === opt}
          onClick={() => onChange(opt)}
          className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-all tap-highlight-none ${
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
