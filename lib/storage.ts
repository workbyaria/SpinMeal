import { normalizeMealEmojiFields } from "./mealDisplay";
import type { MealItem, MealType, SpinRecord } from "./types";

const KEYS = {
  userMeals: "spinmeal-user-meals",
  history: "spinmeal-history",
  seededFlag: "spinmeal_seeded_v1",
  displayName: "spinmeal_user_name",
} as const;

function safeParse<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function isMealType(v: unknown): v is MealType {
  return v === "breakfast" || v === "lunch" || v === "dinner";
}

/** 避免 localStorage 被改壞時 .filter is not a function 導致整頁白屏 */
function parseUserMealsFromStorage(raw: unknown): MealItem[] {
  if (!Array.isArray(raw)) return [];
  const out: MealItem[] = [];
  for (const x of raw) {
    if (!x || typeof x !== "object") continue;
    const o = x as Record<string, unknown>;
    const id = o.id;
    const name = o.name;
    const mealType = o.mealType;
    const sourceRaw = o.source;
    if (typeof id !== "string" || !id.trim()) continue;
    if (typeof name !== "string" || !name.trim()) continue;
    if (!isMealType(mealType)) continue;
    /* 舊版或未帶 source：非 seed 則視為 user */
    const source: MealItem["source"] = sourceRaw === "seed" ? "seed" : "user";
    const item: MealItem = {
      id: id.trim(),
      name: name.trim(),
      mealType,
      source,
    };
    if (Array.isArray(o.tags)) {
      const tags = o.tags
        .filter((t): t is string => typeof t === "string" && t.trim().length > 0)
        .map((t) => t.trim());
      if (tags.length > 0) item.tags = tags;
    }
    if (typeof o.notes === "string" && o.notes.trim()) item.notes = o.notes.trim();
    if (typeof o.emoji === "string" && o.emoji.trim()) item.emoji = o.emoji.trim();
    try {
      out.push(normalizeMealEmojiFields(item));
    } catch {
      out.push(item);
    }
  }
  return out;
}

function parseSpinRecordsFromStorage(raw: unknown): SpinRecord[] {
  if (!Array.isArray(raw)) return [];
  const out: SpinRecord[] = [];
  for (const x of raw) {
    if (!x || typeof x !== "object") continue;
    const o = x as Record<string, unknown>;
    if (typeof o.id !== "string" || !o.id) continue;
    if (typeof o.createdAt !== "string") continue;
    if (!isMealType(o.mealType)) continue;
    if (typeof o.resultMealId !== "string") continue;
    out.push({
      id: o.id,
      createdAt: o.createdAt,
      mealType: o.mealType,
      resultMealId: o.resultMealId,
    });
  }
  return out;
}

export function getUserMeals(): MealItem[] {
  return parseUserMealsFromStorage(safeParse<unknown>(KEYS.userMeals, []));
}

export function setUserMeals(meals: MealItem[]): void {
  safeSet(KEYS.userMeals, meals);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("mealschange"));
  }
}

export function getHistory(): SpinRecord[] {
  return parseSpinRecordsFromStorage(safeParse<unknown>(KEYS.history, []));
}

export function setHistory(records: SpinRecord[]): void {
  safeSet(KEYS.history, records);
}

export function getSeededFlag(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEYS.seededFlag) === "true";
}

export function setSeededFlag(): void {
  safeSet(KEYS.seededFlag, "true");
}

export function getDisplayName(): string {
  if (typeof window === "undefined") return "";
  const v = localStorage.getItem(KEYS.displayName);
  return typeof v === "string" && v.trim() ? v.trim() : "";
}

export function setDisplayName(name: string): void {
  safeSet(KEYS.displayName, name.trim());
}
