export type MealType = "breakfast" | "lunch" | "dinner";

export interface MealItem {
  id: string;
  name: string;
  mealType: MealType;
  tags?: string[];
  source: "seed" | "user";
  notes?: string;
}

export interface SpinRecord {
  id: string;
  createdAt: string;
  mealType: MealType;
  resultMealId: string;
}
