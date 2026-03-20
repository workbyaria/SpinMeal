import type { LocaleId } from "@/lib/locale";
import type { MealItem } from "@/lib/types";

function id(mealType: "breakfast" | "lunch" | "dinner", n: number): string {
  const p = mealType === "breakfast" ? "bf" : mealType === "lunch" ? "lu" : "di";
  return `starter-${p}-${n}`;
}

/** 純名稱 + emoji 分欄：轉盤只顯示 name，抽中結果才顯示 name + 空格 + emoji */
function e(label: string, emoji: string): Pick<MealItem, "name" | "emoji"> {
  return { name: label, emoji };
}

/** 英文版預設：美式經典 popular dishes，每項縮減為兩個詞 */
function getStarterPackEn(): MealItem[] {
  const breakfast: MealItem[] = [
    { id: id("breakfast", 1), ...e("Avocado Toast", "🥑"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 2), ...e("French Toast", "🍞"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 3), ...e("Bacon Eggs", "🥓"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 4), ...e("Hash Browns", "🥔"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 5), ...e("Eggs Benedict", "🍳"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 6), ...e("Pancake Stack", "🥞"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 7), ...e("Oatmeal Bowl", "🥣"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 8), ...e("Cheese Omelet", "🧀"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 9), ...e("Yogurt Parfait", "🍓"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 10), ...e("Smoothie Bowl", "🥤"), mealType: "breakfast", source: "user" },
  ];
  const lunch: MealItem[] = [
    { id: id("lunch", 1), ...e("Tuna Sandwich", "🥪"), mealType: "lunch", source: "user" },
    { id: id("lunch", 2), ...e("Caesar Salad", "🥗"), mealType: "lunch", source: "user" },
    { id: id("lunch", 3), ...e("Club Sandwich", "🥪"), mealType: "lunch", source: "user" },
    { id: id("lunch", 4), ...e("Fish Tacos", "🌮"), mealType: "lunch", source: "user" },
    { id: id("lunch", 5), ...e("Chicken Wrap", "🌯"), mealType: "lunch", source: "user" },
    { id: id("lunch", 6), ...e("Turkey Club", "🥪"), mealType: "lunch", source: "user" },
    { id: id("lunch", 7), ...e("Tomato Soup", "🍲"), mealType: "lunch", source: "user" },
    { id: id("lunch", 8), ...e("Cobb Salad", "🥗"), mealType: "lunch", source: "user" },
    { id: id("lunch", 9), ...e("Grilled Cheese", "🧀"), mealType: "lunch", source: "user" },
    { id: id("lunch", 10), ...e("Onion Rings", "🧅"), mealType: "lunch", source: "user" },
  ];
  const dinner: MealItem[] = [
    { id: id("dinner", 1), ...e("Grilled Salmon", "🐟"), mealType: "dinner", source: "user" },
    { id: id("dinner", 2), ...e("Meat Loaf", "🍖"), mealType: "dinner", source: "user" },
    { id: id("dinner", 3), ...e("BBQ Ribs", "🍖"), mealType: "dinner", source: "user" },
    { id: id("dinner", 4), ...e("Mac Cheese", "🧀"), mealType: "dinner", source: "user" },
    { id: id("dinner", 5), ...e("Roast Turkey", "🦃"), mealType: "dinner", source: "user" },
    { id: id("dinner", 6), ...e("Chicken Wings", "🍗"), mealType: "dinner", source: "user" },
    { id: id("dinner", 7), ...e("Shrimp Scampi", "🦐"), mealType: "dinner", source: "user" },
    { id: id("dinner", 8), ...e("Clam Chowder", "🥣"), mealType: "dinner", source: "user" },
    { id: id("dinner", 9), ...e("Prime Rib", "🥩"), mealType: "dinner", source: "user" },
    { id: id("dinner", 10), ...e("Fried Chicken", "🍗"), mealType: "dinner", source: "user" },
  ];
  return [...breakfast, ...lunch, ...dinner];
}

/** 繁中／簡體預設：台灣日常選項（emoji 與食物語意對應，與英文版同一套邏輯） */
function getStarterPackZh(): MealItem[] {
  const breakfast: MealItem[] = [
    { id: id("breakfast", 1), ...e("蛋餅", "🌯"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 2), ...e("美而美", "🥪"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 3), ...e("麥味登", "🍔"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 4), ...e("鐵板麵", "🍝"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 5), ...e("飯糰", "🍙"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 6), ...e("吐司", "🍞"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 7), ...e("豆漿油條", "🥛"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 8), ...e("饅頭", "🫓"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 9), ...e("地瓜粥", "🍠"), mealType: "breakfast", source: "user" },
    { id: id("breakfast", 10), ...e("漢堡蛋", "🍔"), mealType: "breakfast", source: "user" },
  ];
  const lunch: MealItem[] = [
    { id: id("lunch", 1), ...e("便當", "🍱"), mealType: "lunch", source: "user" },
    { id: id("lunch", 2), ...e("滷肉飯", "🍚"), mealType: "lunch", source: "user" },
    { id: id("lunch", 3), ...e("牛肉麵", "🍜"), mealType: "lunch", source: "user" },
    { id: id("lunch", 4), ...e("拉麵", "🍜"), mealType: "lunch", source: "user" },
    { id: id("lunch", 5), ...e("麻辣燙", "🌶️"), mealType: "lunch", source: "user" },
    { id: id("lunch", 6), ...e("壽司", "🍣"), mealType: "lunch", source: "user" },
    { id: id("lunch", 7), ...e("韓式拌飯", "🍚"), mealType: "lunch", source: "user" },
    { id: id("lunch", 8), ...e("水餃", "🥟"), mealType: "lunch", source: "user" },
    { id: id("lunch", 9), ...e("炒飯", "🍛"), mealType: "lunch", source: "user" },
    { id: id("lunch", 10), ...e("涼麵", "🍜"), mealType: "lunch", source: "user" },
  ];
  const dinner: MealItem[] = [
    { id: id("dinner", 1), ...e("火鍋", "🍲"), mealType: "dinner", source: "user" },
    { id: id("dinner", 2), ...e("海底撈", "🍲"), mealType: "dinner", source: "user" },
    { id: id("dinner", 3), ...e("義大利麵", "🍝"), mealType: "dinner", source: "user" },
    { id: id("dinner", 4), ...e("酸辣粉", "🍜"), mealType: "dinner", source: "user" },
    { id: id("dinner", 5), ...e("燒肉", "🥩"), mealType: "dinner", source: "user" },
    { id: id("dinner", 6), ...e("串串", "🍢"), mealType: "dinner", source: "user" },
    { id: id("dinner", 7), ...e("泰式料理", "🍛"), mealType: "dinner", source: "user" },
    { id: id("dinner", 8), ...e("熱炒", "🥘"), mealType: "dinner", source: "user" },
    { id: id("dinner", 9), ...e("居酒屋", "🍶"), mealType: "dinner", source: "user" },
    { id: id("dinner", 10), ...e("咖哩飯", "🍛"), mealType: "dinner", source: "user" },
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
