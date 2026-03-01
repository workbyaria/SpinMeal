"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { Footer } from "@/components/Footer";
import { LanguageMenu } from "@/components/LanguageMenu";
import { Nav } from "@/components/Nav";
import { WheelLogo } from "@/components/WheelLogo";
import { Tabs } from "@/components/Tabs";
import { useLocale } from "@/components/LocaleProvider";
import { getStarterPack } from "@/data/starterPack";
import { filterMealsByType } from "@/lib/filter";
import { getUserMeals, setUserMeals } from "@/lib/storage";
import { getTheme, toggleTheme, type ThemeId } from "@/lib/theme";
import type { MealItem, MealType } from "@/lib/types";

function isStarterItem(meal: MealItem): boolean {
  return meal.id.startsWith("starter-");
}

const MEAL_TYPE_LABEL_KEYS: Record<MealType, "tabs.breakfast" | "tabs.lunch" | "tabs.dinner"> = {
  breakfast: "tabs.breakfast",
  lunch: "tabs.lunch",
  dinner: "tabs.dinner",
};

const emptyForm = {
  name: "",
  mealType: "lunch" as MealType,
  tags: "",
  notes: "",
};

function parseTags(s: string): string[] {
  return s
    .split(/[,，、\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function MyMealsPage() {
  const { t, locale } = useLocale();
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [mealTypeTab, setMealTypeTab] = useState<MealType>("lunch");
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [theme, setThemeState] = useState<ThemeId>("light");

  useEffect(() => {
    setThemeState(getTheme());
  }, []);

  const load = useCallback(() => setMeals(getUserMeals()), []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const onMealsChange = () => load();
    window.addEventListener("mealschange", onMealsChange);
    return () => window.removeEventListener("mealschange", onMealsChange);
  }, [load]);

  useEffect(() => {
    if (!editingId) setForm((f) => ({ ...f, mealType: mealTypeTab }));
  }, [mealTypeTab, editingId]);

  const filteredByType = useMemo(
    () => filterMealsByType(meals, mealTypeTab),
    [meals, mealTypeTab]
  );
  const filteredBySearch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return filteredByType;
    return filteredByType.filter((m) => m.name.toLowerCase().includes(q));
  }, [filteredByType, searchQuery]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const tags = parseTags(form.tags);
    const item: MealItem = {
      id: editingId ?? `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: form.name.trim(),
      mealType: form.mealType,
      ...(tags.length > 0 && { tags }),
      source: "user",
      ...(form.notes.trim() && { notes: form.notes.trim() }),
    };
    const list = getUserMeals();
    if (editingId) {
      setUserMeals(list.map((m) => (m.id === editingId ? item : m)));
    } else {
      setUserMeals([...list, item]);
    }
    setForm(emptyForm);
    setEditingId(null);
    load();
  };

  const remove = (id: string) => {
    setUserMeals(getUserMeals().filter((m) => m.id !== id));
    load();
    if (editingId === id) {
      setForm(emptyForm);
      setEditingId(null);
    }
  };

  const resetToStarterPack = () => {
    setUserMeals(getStarterPack(locale));
    setForm(emptyForm);
    setEditingId(null);
    load();
  };

  const startEdit = (m: MealItem) => {
    const tagsArr = m.tags ?? (m as MealItem & { cuisine?: string[] }).cuisine ?? [];
    setForm({
      name: m.name,
      mealType: m.mealType,
      tags: Array.isArray(tagsArr) ? tagsArr.join(", ") : "",
      notes: m.notes ?? "",
    });
    setEditingId(m.id);
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
          <div className="relative pt-5">
            <div className="card-raised rounded-2xl p-4 pt-5">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-lg border border-mt-border bg-mt-brown-light px-3 py-1 text-xs font-medium text-mt-body">
                {t("myMeals.mealTypeTag")}
              </span>
              <Tabs value={mealTypeTab} onChange={setMealTypeTab} className="mt-1" />
            </div>
          </div>

          <form onSubmit={submit} className="card-raised rounded-2xl p-4 text-center">
            <h2 className="mb-4 text-base font-semibold text-mt-body">
              {editingId ? t("myMeals.editMeal") : t("myMeals.addMeal")}
            </h2>
          <div className="mx-auto max-w-xs space-y-4">
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-mt-muted">{t("myMeals.nameLabel")}</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder={t("myMeals.namePlaceholder")}
                className="input-meal mt-1 w-full rounded-lg border border-mt-border px-3 py-2 text-mt-body"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium uppercase tracking-wider text-mt-muted">{t("myMeals.notesLabel")}</label>
              <input
                type="text"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder={t("myMeals.notesPlaceholder")}
                className="input-meal mt-1 w-full rounded-lg border border-mt-border px-3 py-2 text-mt-body"
              />
            </div>
            <div className="flex justify-center gap-2">
              <button
                type="submit"
                className="selected-primary rounded-xl bg-mt-primary px-4 py-2 font-medium text-white tap-highlight-none hover:bg-mt-primary-hover"
              >
                {editingId ? t("myMeals.save") : t("myMeals.add")}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setForm(emptyForm); setEditingId(null); }}
                  className="rounded-xl bg-mt-border px-4 py-2 font-medium text-mt-body tap-highlight-none hover:bg-mt-border-strong"
                >
                  {t("myMeals.cancel")}
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="card-raised rounded-2xl p-4">
          <p className="text-sm font-medium uppercase tracking-wider text-mt-muted">
            {t("myMeals.optionsCount", { type: t(MEAL_TYPE_LABEL_KEYS[mealTypeTab]), count: filteredBySearch.length })}
          </p>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("myMeals.searchPlaceholder")}
            className="mt-2 w-full rounded-xl border border-mt-border bg-mt-bg px-3 py-2 text-sm text-mt-body placeholder:text-mt-muted"
            aria-label={t("myMeals.searchPlaceholder")}
          />
          <p className="mt-3 text-xs text-mt-muted">
            {t("myMeals.wheelLimitHint")}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetToStarterPack}
            className="header-action-btn"
          >
            {t("myMeals.resetDefault")}
          </button>
        </div>

        {filteredBySearch.length === 0 ? (
          <div className="card-raised rounded-2xl p-6 text-center">
            <p className="text-sm text-mt-muted">
              {filteredByType.length === 0
                ? t("myMeals.emptyByType")
                : t("myMeals.emptySearch")}
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredBySearch.map((meal) => (
              <li
                key={meal.id}
                className="card-raised flex items-center gap-2 rounded-2xl py-3 pl-4 pr-3"
              >
                <div className="min-w-0 flex-1">
                  {isStarterItem(meal) && (
                    <span className="default-tag mr-2 inline-block rounded bg-mt-pink/40 px-1.5 py-0.5 text-xs font-medium text-mt-pink-text">
                      {t("myMeals.defaultTag")}
                    </span>
                  )}
                  <span className="font-medium text-mt-body">
                    {meal.name}
                    {meal.notes?.trim() ? ` (${meal.notes.trim()})` : ""}
                  </span>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(meal)}
                    className="rounded-xl border border-mt-border bg-mt-brown-light px-3 py-1.5 text-xs font-medium text-mt-body hover:bg-mt-border tap-highlight-none"
                  >
                    {t("myMeals.edit")}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(meal.id)}
                    className="rounded-xl border border-mt-border bg-mt-brown-light px-3 py-1.5 text-xs font-medium text-mt-muted hover:bg-mt-border tap-highlight-none"
                  >
                    {t("myMeals.delete")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <AdSlot />
        </div>
      </main>

      <Footer />
      <Nav />
    </div>
  );
}
