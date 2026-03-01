"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { Footer } from "@/components/Footer";
import { LanguageMenu } from "@/components/LanguageMenu";
import { MealCard } from "@/components/MealCard";
import { Nav } from "@/components/Nav";
import { Tabs } from "@/components/Tabs";
import { Wheel } from "@/components/Wheel";
import { useLocale } from "@/components/LocaleProvider";
import { filterMealsByType } from "@/lib/filter";
import { getAllMeals, getAllMealsForSpinning, copyMealAsUser } from "@/lib/meals";
import { pickRandomIndex, sampleN } from "@/lib/random";
import { getGreetingMessage } from "@/lib/translations";
import { getDisplayName, getHistory, setHistory } from "@/lib/storage";
import { getTheme, toggleTheme, type ThemeId } from "@/lib/theme";
import type { MealItem, MealType, SpinRecord } from "@/lib/types";

const MAX_WHEEL_SLICES = 16;

export default function HomePage() {
  const [mealType, setMealType] = useState<MealType>("lunch");
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [result, setResult] = useState<MealItem | null>(null);
  const [lastResultId, setLastResultId] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [displayName, setDisplayNameState] = useState("");
  const [theme, setThemeState] = useState<ThemeId>("light");
  const { t, locale } = useLocale();

  useEffect(() => {
    setMeals(getAllMealsForSpinning());
    setDisplayNameState(getDisplayName());
    setThemeState(getTheme());
  }, []);

  useEffect(() => {
    const onMealsChange = () => setMeals(getAllMealsForSpinning());
    window.addEventListener("mealschange", onMealsChange);
    return () => window.removeEventListener("mealschange", onMealsChange);
  }, []);

  const wheelCandidates = useMemo(() => {
    const optionsForType = filterMealsByType(meals, mealType);
    const seed = JSON.stringify({ mealType });
    return optionsForType.length <= MAX_WHEEL_SLICES
      ? [...optionsForType]
      : sampleN(optionsForType, MAX_WHEEL_SLICES, seed);
  }, [meals, mealType]);

  const handleSpin = useCallback(() => {
    if (wheelCandidates.length === 0) return;
    const idx = pickRandomIndex(wheelCandidates, lastResultId ?? undefined);
    const chosen = wheelCandidates[idx];
    setSelectedIndex(idx);
    setResult(chosen);
    setLastResultId(chosen.id);
    setIsSpinning(true);
    setSpinKey((k) => k + 1);
  }, [wheelCandidates, lastResultId]);

  const handleSpinComplete = useCallback(() => {
    if (selectedIndex == null || !result) {
      setIsSpinning(false);
      return;
    }
    if (process.env.NODE_ENV === "development" && wheelCandidates[selectedIndex] && result.id !== wheelCandidates[selectedIndex].id) {
      console.warn("[SpinMeal] Result mismatch: result.id !== wheelCandidates[selectedIndex].id", {
        resultId: result.id,
        candidateId: wheelCandidates[selectedIndex].id,
        selectedIndex,
      });
    }
    const record: SpinRecord = {
      id: `spin-${Date.now()}`,
      createdAt: new Date().toISOString(),
      mealType,
      resultMealId: result.id,
    };
    const history = getHistory();
    setHistory([record, ...history]);
    setIsSpinning(false);
  }, [selectedIndex, result, mealType, wheelCandidates]);

  const handleAddToMyMeals = useCallback((id: string) => {
    const meal = getAllMeals().find((m) => m.id === id);
    if (!meal || meal.source === "user") return;
    const newMeal = copyMealAsUser(meal);
    setMeals(getAllMealsForSpinning());
    setResult((r) => (r?.id === id ? newMeal : r));
  }, []);

  const emptyState = wheelCandidates.length === 0;
  const greeting = getGreetingMessage(locale);
  const promptText = t("home.prompt");
  const promptDisplay =
    locale === "en" ? promptText.charAt(0).toLowerCase() + promptText.slice(1) : promptText;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-mt-border bg-mt-surface px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mt-brown-light text-mt-body" aria-hidden>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </span>
          <h1 className="text-lg font-bold tracking-tight text-mt-body">{t("header.appName")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setThemeState(toggleTheme())}
            className="header-btn"
          >
            {theme === "dark" ? t("theme.light") : t("theme.dark")}
          </button>
          <LanguageMenu />
        </div>
      </header>

      <main className="flex-1 overflow-auto px-4 pb-28 pt-6">
        <p className="mb-6 text-center text-sm text-mt-muted">
          {greeting}{locale === "en" ? ", " : "，"}{displayName ? `${displayName} ` : ""}
          {promptDisplay}
        </p>

        <div className="mx-auto max-w-md space-y-6">
          <div className="relative pt-5">
            <div className="card-raised rounded-2xl p-4 pt-5">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border border-mt-border bg-mt-brown-light px-3 py-1 text-xs font-medium text-mt-body">
                {t("home.mealTypeTag")}
              </span>
              <Tabs value={mealType} onChange={setMealType} className="mt-1" />
            </div>
          </div>

          <div className="relative pt-5">
            <div className="card-raised flex flex-col items-center rounded-2xl px-4 pt-6 pb-6">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border border-mt-border bg-mt-brown-light px-3 py-1 text-xs font-medium text-mt-body">
                {t("home.wheelTag")}
              </span>
              <Wheel
                key={spinKey}
                candidates={wheelCandidates}
                selectedIndex={selectedIndex}
                isSpinning={isSpinning}
                onSpinEnd={handleSpinComplete}
                className="mt-8 mb-5"
                isDark={theme === "dark"}
              />
              <button
                type="button"
                onClick={handleSpin}
                disabled={emptyState || isSpinning}
                className="selected-primary mt-5 mb-6 w-full max-w-[200px] rounded-xl bg-mt-primary py-3.5 text-base font-semibold text-white tap-highlight-none hover:bg-mt-primary-hover disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSpinning ? t("home.spinning") : t("home.spin")}
              </button>
            </div>
          </div>

          <AdSlot />

          {emptyState && (
            <div className="card-raised rounded-2xl p-6 text-center">
              <p className="text-sm text-mt-muted">{t("home.emptyMessage")}</p>
              <Link
                href="/my-meals"
                className="mt-4 inline-block rounded-xl bg-mt-primary px-6 py-3 text-sm font-medium text-white tap-highlight-none hover:bg-mt-primary-hover"
              >
                {t("home.goToMyMeals")}
              </Link>
            </div>
          )}

          {result && !isSpinning && (
            <div className="relative pt-5">
              <div className="card-raised rounded-2xl p-4 pt-8 pb-5">
                <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border border-mt-border bg-mt-brown-light px-3 py-1 text-xs font-medium text-mt-body">
                  {t("home.resultTag")}
                </span>
                <MealCard
                  meal={result}
                  onAddToMyMeals={handleAddToMyMeals}
                  center
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <Nav />
    </div>
  );
}
