import type { LocaleId } from "@/lib/locale";
import type { MealItem } from "@/lib/types";

function id(mealType: "breakfast" | "lunch" | "dinner", n: number): string {
  const p = mealType === "breakfast" ? "bf" : mealType === "lunch" ? "lu" : "di";
  return `starter-${p}-${n}`;
}

/** 英文版預設：美式經典 popular dishes，每項縮減為兩個詞 */
function getStarterPackEn(): MealItem[] {
  const breakfast: MealItem[] = [
    { id: id("breakfast", 1), name: "Avocado Toast", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 2), name: "French Toast", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 3), name: "Bacon Eggs", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 4), name: "Hash Browns", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 5), name: "Eggs Benedict", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 6), name: "Pancake Stack", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 7), name: "Oatmeal Bowl", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 8), name: "Cheese Omelet", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 9), name: "Yogurt Parfait", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 10), name: "Smoothie Bowl", mealType: "breakfast", source: "user" },
  ];
  const lunch: MealItem[] = [
    { id: id("lunch", 1), name: "Tuna Sandwich", mealType: "lunch", source: "user" },
    { id: id("lunch", 2), name: "Caesar Salad", mealType: "lunch", source: "user" },
    { id: id("lunch", 3), name: "Club Sandwich", mealType: "lunch", source: "user" },
    { id: id("lunch", 4), name: "Fish Tacos", mealType: "lunch", source: "user" },
    { id: id("lunch", 5), name: "Chicken Wrap", mealType: "lunch", source: "user" },
    { id: id("lunch", 6), name: "Turkey Club", mealType: "lunch", source: "user" },
    { id: id("lunch", 7), name: "Tomato Soup", mealType: "lunch", source: "user" },
    { id: id("lunch", 8), name: "Cobb Salad", mealType: "lunch", source: "user" },
    { id: id("lunch", 9), name: "Grilled Cheese", mealType: "lunch", source: "user" },
    { id: id("lunch", 10), name: "Onion Rings", mealType: "lunch", source: "user" },
  ];
  const dinner: MealItem[] = [
    { id: id("dinner", 1), name: "Grilled Salmon", mealType: "dinner", source: "user" },
    { id: id("dinner", 2), name: "Meat Loaf", mealType: "dinner", source: "user" },
    { id: id("dinner", 3), name: "BBQ Ribs", mealType: "dinner", source: "user" },
    { id: id("dinner", 4), name: "Mac Cheese", mealType: "dinner", source: "user" },
    { id: id("dinner", 5), name: "Roast Turkey", mealType: "dinner", source: "user" },
    { id: id("dinner", 6), name: "Chicken Wings", mealType: "dinner", source: "user" },
    { id: id("dinner", 7), name: "Shrimp Scampi", mealType: "dinner", source: "user" },
    { id: id("dinner", 8), name: "Clam Chowder", mealType: "dinner", source: "user" },
    { id: id("dinner", 9), name: "Prime Rib", mealType: "dinner", source: "user" },
    { id: id("dinner", 10), name: "Fried Chicken", mealType: "dinner", source: "user" },
  ];
  return [...breakfast, ...lunch, ...dinner];
}

/** 繁中／簡體預設：台灣日常選項 */
function getStarterPackZh(): MealItem[] {
  const breakfast: MealItem[] = [
    { id: id("breakfast", 1), name: "蛋餅", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 2), name: "美而美", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 3), name: "麥味登", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 4), name: "鐵板麵", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 5), name: "飯糰", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 6), name: "吐司", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 7), name: "豆漿油條", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 8), name: "饅頭", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 9), name: "地瓜粥", mealType: "breakfast", source: "user" },
    { id: id("breakfast", 10), name: "漢堡蛋", mealType: "breakfast", source: "user" },
  ];
  const lunch: MealItem[] = [
    { id: id("lunch", 1), name: "便當", mealType: "lunch", source: "user" },
    { id: id("lunch", 2), name: "滷肉飯", mealType: "lunch", source: "user" },
    { id: id("lunch", 3), name: "牛肉麵", mealType: "lunch", source: "user" },
    { id: id("lunch", 4), name: "拉麵", mealType: "lunch", source: "user" },
    { id: id("lunch", 5), name: "麻辣燙", mealType: "lunch", source: "user" },
    { id: id("lunch", 6), name: "壽司", mealType: "lunch", source: "user" },
    { id: id("lunch", 7), name: "韓式拌飯", mealType: "lunch", source: "user" },
    { id: id("lunch", 8), name: "水餃", mealType: "lunch", source: "user" },
    { id: id("lunch", 9), name: "炒飯", mealType: "lunch", source: "user" },
    { id: id("lunch", 10), name: "涼麵", mealType: "lunch", source: "user" },
  ];
  const dinner: MealItem[] = [
    { id: id("dinner", 1), name: "火鍋", mealType: "dinner", source: "user" },
    { id: id("dinner", 2), name: "海底撈", mealType: "dinner", source: "user" },
    { id: id("dinner", 3), name: "義大利麵", mealType: "dinner", source: "user" },
    { id: id("dinner", 4), name: "酸辣粉", mealType: "dinner", source: "user" },
    { id: id("dinner", 5), name: "燒肉", mealType: "dinner", source: "user" },
    { id: id("dinner", 6), name: "串串", mealType: "dinner", source: "user" },
    { id: id("dinner", 7), name: "泰式料理", mealType: "dinner", source: "user" },
    { id: id("dinner", 8), name: "熱炒", mealType: "dinner", source: "user" },
    { id: id("dinner", 9), name: "居酒屋", mealType: "dinner", source: "user" },
    { id: id("dinner", 10), name: "咖哩飯", mealType: "dinner", source: "user" },
  ];
  return [...breakfast, ...lunch, ...dinner];
}

/**
 * 依語言回傳預設餐點：繁中/簡體用台灣選項，其餘一律英文美式早/午/晚餐。
 * Stored as user meals so they can be edited/deleted.
 */
export function getStarterPack(locale: LocaleId): MealItem[] {
  return locale === "en" ? getStarterPackEn() : getStarterPackZh();
}
