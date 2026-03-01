import type { MealItem } from "@/lib/types";

function seedId(prefix: string, n: number): string {
  return `seed-${prefix}-${String(n).padStart(2, "0")}`;
}

export const seedMeals: MealItem[] = [
  // Breakfast (15)
  { id: seedId("bf", 1), name: "Avocado Toast", mealType: "breakfast", tags: ["American"], source: "seed" },
  { id: seedId("bf", 2), name: "Oatmeal with Berries", mealType: "breakfast", tags: ["American"], source: "seed" },
  { id: seedId("bf", 3), name: "Scrambled Eggs & Toast", mealType: "breakfast", tags: ["American"], source: "seed" },
  { id: seedId("bf", 4), name: "Pancakes with Maple Syrup", mealType: "breakfast", tags: ["American"], source: "seed" },
  { id: seedId("bf", 5), name: "Breakfast Burrito", mealType: "breakfast", tags: ["Mexican"], source: "seed" },
  { id: seedId("bf", 6), name: "Congee with Pickles", mealType: "breakfast", tags: ["Chinese", "Taiwanese"], source: "seed" },
  { id: seedId("bf", 7), name: "Miso Soup Set", mealType: "breakfast", tags: ["Japanese"], source: "seed" },
  { id: seedId("bf", 8), name: "French Toast", mealType: "breakfast", tags: ["American"], source: "seed" },
  { id: seedId("bf", 9), name: "Greek Yogurt Parfait", mealType: "breakfast", tags: ["American"], source: "seed" },
  { id: seedId("bf", 10), name: "Eggs Benedict", mealType: "breakfast", tags: ["American"], source: "seed" },
  { id: seedId("bf", 11), name: "Chia Pudding", mealType: "breakfast", tags: ["American"], source: "seed" },
  { id: seedId("bf", 12), name: "Breakfast Tacos", mealType: "breakfast", tags: ["Mexican"], source: "seed" },
  { id: seedId("bf", 13), name: "Smoked Salmon Bagel", mealType: "breakfast", tags: ["American"], source: "seed" },
  { id: seedId("bf", 14), name: "Taiwanese Dan Bing", mealType: "breakfast", tags: ["Taiwanese"], source: "seed" },
  { id: seedId("bf", 15), name: "Smoothie Bowl", mealType: "breakfast", tags: ["American"], source: "seed" },
  // Lunch (15)
  { id: seedId("lu", 1), name: "Tuna Sandwich", mealType: "lunch", tags: ["American"], source: "seed" },
  { id: seedId("lu", 2), name: "Caesar Salad", mealType: "lunch", tags: ["American"], source: "seed" },
  { id: seedId("lu", 3), name: "Mapo Tofu", mealType: "lunch", tags: ["Chinese"], source: "seed" },
  { id: seedId("lu", 4), name: "Bibimbap", mealType: "lunch", tags: ["Korean"], source: "seed" },
  { id: seedId("lu", 5), name: "Pasta Aglio e Olio", mealType: "lunch", tags: ["Italian"], source: "seed" },
  { id: seedId("lu", 6), name: "Chicken Teriyaki Bowl", mealType: "lunch", tags: ["Japanese"], source: "seed" },
  { id: seedId("lu", 7), name: "Beef Noodle Soup", mealType: "lunch", tags: ["Taiwanese", "Chinese"], source: "seed" },
  { id: seedId("lu", 8), name: "Pad Thai", mealType: "lunch", tags: ["Thai"], source: "seed" },
  { id: seedId("lu", 9), name: "Grilled Cheese & Tomato Soup", mealType: "lunch", tags: ["American"], source: "seed" },
  { id: seedId("lu", 10), name: "Chana Masala", mealType: "lunch", tags: ["Indian"], source: "seed" },
  { id: seedId("lu", 11), name: "Fish Tacos", mealType: "lunch", tags: ["Mexican"], source: "seed" },
  { id: seedId("lu", 12), name: "Ramen", mealType: "lunch", tags: ["Japanese"], source: "seed" },
  { id: seedId("lu", 13), name: "BLT Sandwich", mealType: "lunch", tags: ["American"], source: "seed" },
  { id: seedId("lu", 14), name: "Dumplings (Jiaozi)", mealType: "lunch", tags: ["Chinese"], source: "seed" },
  { id: seedId("lu", 15), name: "Caprese Salad", mealType: "lunch", tags: ["Italian"], source: "seed" },
  // Dinner (15)
  { id: seedId("di", 1), name: "Spaghetti Carbonara", mealType: "dinner", tags: ["Italian"], source: "seed" },
  { id: seedId("di", 2), name: "Grilled Salmon", mealType: "dinner", tags: ["American"], source: "seed" },
  { id: seedId("di", 3), name: "Korean BBQ at Home", mealType: "dinner", tags: ["Korean"], source: "seed" },
  { id: seedId("di", 4), name: "Vegetable Curry", mealType: "dinner", tags: ["Indian"], source: "seed" },
  { id: seedId("di", 5), name: "Stir-Fry with Rice", mealType: "dinner", tags: ["Chinese"], source: "seed" },
  { id: seedId("di", 6), name: "Tacos al Pastor", mealType: "dinner", tags: ["Mexican"], source: "seed" },
  { id: seedId("di", 7), name: "Thai Green Curry", mealType: "dinner", tags: ["Thai"], source: "seed" },
  { id: seedId("di", 8), name: "Braised Pork over Rice", mealType: "dinner", tags: ["Taiwanese"], source: "seed" },
  { id: seedId("di", 9), name: "Margherita Pizza", mealType: "dinner", tags: ["Italian"], source: "seed" },
  { id: seedId("di", 10), name: "Sushi Bowl", mealType: "dinner", tags: ["Japanese"], source: "seed" },
  { id: seedId("di", 11), name: "Chicken Stir-Fry", mealType: "dinner", tags: ["American", "Chinese"], source: "seed" },
  { id: seedId("di", 12), name: "Lamb Kebabs", mealType: "dinner", tags: ["Indian"], source: "seed" },
  { id: seedId("di", 13), name: "Tom Yum Soup", mealType: "dinner", tags: ["Thai"], source: "seed" },
  { id: seedId("di", 14), name: "Risotto", mealType: "dinner", tags: ["Italian"], source: "seed" },
  { id: seedId("di", 15), name: "Hot Pot at Home", mealType: "dinner", tags: ["Chinese", "Taiwanese"], source: "seed" },
];
