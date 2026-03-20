import type { MealItem } from "./types";

/**
 * 用 \p{Extended_Pictographic} 需較新引擎；舊瀏覽器在「解析字面量正則」時就會整包腳本失敗 → 白屏。
 * 改為執行期 new RegExp + try/catch，不支援則略過拆 emoji（至少頁面能開）。
 */
let emojiOnlyPatternCache: RegExp | null | undefined;
function getEmojiOnlyPattern(): RegExp | null {
  if (emojiOnlyPatternCache !== undefined) return emojiOnlyPatternCache;
  try {
    emojiOnlyPatternCache = new RegExp("^[\\p{Extended_Pictographic}\\uFE0F\\u200D]+$", "u");
    if (!emojiOnlyPatternCache.test("🍱")) emojiOnlyPatternCache = null;
  } catch {
    emojiOnlyPatternCache = null;
  }
  return emojiOnlyPatternCache;
}

function isEmojiOnlyTail(tail: string): boolean {
  const re = getEmojiOnlyPattern();
  if (!re) return false;
  try {
    return re.test(tail);
  } catch {
    return false;
  }
}

/**
 * 從「名稱 空格 emoji」拆成純名稱與 emoji（相容舊版把兩者寫在同一字串）。
 */
export function splitTrailingEmoji(name: string): { base: string; emoji?: string } {
  const trimmed = name.trimEnd();
  const i = trimmed.lastIndexOf(" ");
  if (i <= 0) return { base: trimmed };
  const base = trimmed.slice(0, i).trimEnd();
  const tail = trimmed.slice(i + 1);
  if (!tail || tail.length > 24) return { base: trimmed };
  if (!isEmojiOnlyTail(tail)) return { base: trimmed };
  return { base: base || trimmed, emoji: tail };
}

/** 轉盤區塊、列表純文字：不含 emoji */
export function getWheelDisplayName(meal: MealItem): string {
  return typeof meal.name === "string" ? meal.name : "";
}

/** 抽中結果、分享圖、歷史紀錄：名稱 + 空格 + emoji（無 emoji 則僅名稱） */
export function getResultDisplayName(meal: MealItem): string {
  const n = getWheelDisplayName(meal);
  const e = typeof meal.emoji === "string" ? meal.emoji.trim() : "";
  return e ? `${n} ${e}` : n;
}

/** 讀取 storage 後正規化：拆開舊版合併字串，或保留既有 emoji 欄位 */
export function normalizeMealEmojiFields(meal: MealItem): MealItem {
  if (typeof meal.name !== "string") return meal;
  const emojiStored =
    typeof meal.emoji === "string" && meal.emoji.trim().length > 0 ? meal.emoji.trim() : undefined;
  let name = meal.name.trim();
  if (emojiStored) {
    const { base, emoji: tail } = splitTrailingEmoji(name);
    if (tail === emojiStored) name = base;
    return { ...meal, name, emoji: emojiStored };
  }
  const { base, emoji } = splitTrailingEmoji(name);
  if (!emoji) return { ...meal, name: base };
  return { ...meal, name: base, emoji };
}
