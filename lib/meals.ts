import { getStarterPack } from "@/data/starterPack";
import { seedMeals } from "@/data/seedMeals";
import { getLocale } from "./locale";
import { getSeededFlag, getUserMeals, setSeededFlag, setUserMeals } from "./storage";
import type { MealItem } from "./types";

/**
 * All meals = seed + user. Use for resolving ids in history and for "add to my meals" from seed.
 */
export function getAllMeals(): MealItem[] {
  const user = getUserMeals();
  return [...seedMeals, ...user];
}

/**
 * User-created meals only. Use for wheel candidates on Home (spinning).
 */
export function getAllMealsForSpinning(): MealItem[] {
  return getUserMeals();
}

/**
 * Run once on first client load: if user has no meals and not yet seeded, fill with starter pack.
 */
export function runStarterPackSeedIfNeeded(): void {
  if (typeof window === "undefined") return;
  if (getSeededFlag()) return;
  if (getUserMeals().length > 0) return;
  setUserMeals(getStarterPack(getLocale()));
  setSeededFlag();
}

/**
 * Clone a meal as user-created (new id, source: 'user'). Saves to localStorage.
 */
export function copyMealAsUser(meal: MealItem): MealItem {
  const copy: MealItem = {
    ...meal,
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    source: "user",
  };
  const user = getUserMeals();
  setUserMeals([...user, copy]);
  return copy;
}
