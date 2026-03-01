export type LocaleId = "zh-TW" | "zh-CN" | "en";

const LOCALE_KEY = "spinmeal_locale";

function getBrowserLocale(): LocaleId {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
  if (lang.startsWith("zh-TW") || lang.startsWith("zh-Hant")) return "zh-TW";
  if (lang.startsWith("zh-CN") || lang.startsWith("zh-Hans") || (lang.startsWith("zh") && !lang.includes("TW"))) return "zh-CN";
  return "en";
}

/** 僅繁中、簡體為中文；其餘語言/地區一律視為英文 */
export function getLocale(): LocaleId {
  if (typeof window === "undefined") return "en";
  const v = localStorage.getItem(LOCALE_KEY);
  if (v === "zh-TW" || v === "zh-CN") return v;
  if (v === "en") return "en";
  return getBrowserLocale(); // 未存過：依瀏覽器；getBrowserLocale 已將非繁/簡體回傳 en
}

export function setLocale(locale: LocaleId): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCALE_KEY, locale);
  window.dispatchEvent(new Event("localechange"));
}
