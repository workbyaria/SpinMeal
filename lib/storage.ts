import type { MealItem, SpinRecord } from "./types";

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

export function getUserMeals(): MealItem[] {
  return safeParse<MealItem[]>(KEYS.userMeals, []);
}

export function setUserMeals(meals: MealItem[]): void {
  safeSet(KEYS.userMeals, meals);
}

export function getHistory(): SpinRecord[] {
  return safeParse<SpinRecord[]>(KEYS.history, []);
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
