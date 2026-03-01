"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { Footer } from "@/components/Footer";
import { LanguageMenu } from "@/components/LanguageMenu";
import { Nav } from "@/components/Nav";
import { WheelLogo } from "@/components/WheelLogo";
import { useLocale } from "@/components/LocaleProvider";
import { getAllMeals } from "@/lib/meals";
import { getHistory, setHistory } from "@/lib/storage";
import { getTheme, toggleTheme, type ThemeId } from "@/lib/theme";
import type { MealItem, SpinRecord } from "@/lib/types";

const MEAL_TYPE_KEYS: Record<SpinRecord["mealType"], "tabs.breakfast" | "tabs.lunch" | "tabs.dinner"> = {
  breakfast: "tabs.breakfast",
  lunch: "tabs.lunch",
  dinner: "tabs.dinner",
};

const DATE_LOCALE: Record<string, string> = { "zh-TW": "zh-TW", "zh-CN": "zh-CN", en: "en-US" };

export default function HistoryPage() {
  const { t, locale } = useLocale();
  const [records, setRecords] = useState<SpinRecord[]>([]);
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [theme, setThemeState] = useState<ThemeId>("light");

  useEffect(() => {
    setRecords(getHistory());
    setMeals(getAllMeals());
  }, []);

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const mealMap = new Map(meals.map((m) => [m.id, m]));

  const handleClear = () => {
    setHistory([]);
    setRecords([]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-mt-border bg-mt-surface px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mt-brown-light text-mt-body" aria-hidden>
            <WheelLogo />
          </span>
          <h1 className="text-lg font-bold tracking-tight text-mt-body">{t("header.appName")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setThemeState(toggleTheme())}
            className="header-action-btn"
          >
            {theme === "dark" ? t("theme.light") : t("theme.dark")}
          </button>
          <LanguageMenu />
        </div>
      </header>

      <main className="flex-1 overflow-auto px-4 pb-28 pt-6">
        <div className="mx-auto max-w-md space-y-6">
          {records.length === 0 ? (
            <div className="card-raised rounded-2xl p-8 text-center">
              <p className="text-sm text-mt-muted">{t("history.empty")}</p>
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClear}
                  className="header-action-btn"
                >
                  {t("history.clear")}
                </button>
              </div>
              <ul className="space-y-3">
              {records.map((r) => {
                const meal = mealMap.get(r.resultMealId);
                const date = new Date(r.createdAt);
                const dateStr = date.toLocaleDateString(DATE_LOCALE[locale] ?? "en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <li key={r.id} className="card-raised rounded-2xl p-4">
                    <p className="text-sm font-medium uppercase tracking-wider text-mt-muted">{t("history.time")}</p>
                    <p className="text-sm text-mt-body">{dateStr}</p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-wider text-mt-muted">{t("history.result")}</p>
                    <p className="font-semibold text-mt-body">
                      {t(MEAL_TYPE_KEYS[r.mealType])} → {meal?.name ?? r.resultMealId}
                    </p>
                  </li>
                );
              })}
              </ul>
            </>
          )}
          <AdSlot />
        </div>
      </main>

      <Footer />
      <Nav />
    </div>
  );
}
