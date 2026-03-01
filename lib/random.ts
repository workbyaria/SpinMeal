import type { MealItem } from "./types";

/**
 * Simple string hash for seeding. Deterministic.
 */
function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    h = (h << 5) - h + c;
    h = h & h;
  }
  return h >>> 0;
}

/**
 * Seeded PRNG (mulberry32). Returns 0..1. Deterministic for same seed.
 */
function seededRandom(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Shuffle array deterministically using seed string. Pure, testable.
 */
export function shuffleWithSeed<T>(array: T[], seed: string): T[] {
  const arr = [...array];
  const rand = seededRandom(hashString(seed));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Take N items from array: deterministic shuffle by seed, then first N.
 * When seed changes (e.g. mealType/filters), sample changes. Same seed => same order.
 */
export function sampleN<T>(array: T[], n: number, seed: string): T[] {
  if (array.length <= n) return [...array];
  const shuffled = shuffleWithSeed(array, seed);
  return shuffled.slice(0, n);
}

/**
 * Pick a random meal from the list, optionally excluding one (e.g. last result).
 * Pure and testable.
 */
export function pickRandomMeal(meals: MealItem[], excludeId?: string): MealItem | null {
  const candidates = excludeId ? meals.filter((m) => m.id !== excludeId) : meals;
  if (candidates.length === 0) return null;
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index] ?? null;
}

/**
 * Pick a random index in [0, length), optionally excluding the index of excludeId in the array.
 * Use for wheel: same array + selectedIndex ensures result matches the stopped slice.
 */
export function pickRandomIndex(meals: MealItem[], excludeId?: string): number {
  if (meals.length === 0) return 0;
  const excludeIndex = excludeId ? meals.findIndex((m) => m.id === excludeId) : -1;
  const indices =
    excludeIndex >= 0 && meals.length > 1
      ? meals.map((_, i) => i).filter((i) => i !== excludeIndex)
      : meals.map((_, i) => i);
  const i = Math.floor(Math.random() * indices.length);
  return indices[i] ?? 0;
}
