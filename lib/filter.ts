import type { MealItem } from "./types";

/**
 * Filter meals by mealType only. Pure and testable.
 */
export function filterMealsByType(
  meals: MealItem[],
  mealType: MealItem["mealType"]
): MealItem[] {
  return meals.filter((meal) => meal.mealType === mealType);
}
