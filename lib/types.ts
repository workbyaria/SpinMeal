export type MealType = "breakfast" | "lunch" | "dinner";

export interface MealItem {
  id: string;
  name: string;
  /** 轉盤區塊不顯示；僅結果卡／分享圖等用 getResultDisplayName 時加上「名稱 + 空格 + emoji」 */
  emoji?: string;
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
