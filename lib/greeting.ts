/**
 * Time-based greeting and support message for Home.
 */
export function getGreeting(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return "早安";
  if (h >= 11 && h < 17) return "午安";
  if (h >= 17 && h < 24) return "晚安";
  return "夜深了";
}

export function getSupportMessage(): string {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "今天也辛苦了 🤍";
  if (h >= 12 && h < 18) return "我們一起把選擇變簡單";
  return "今天也辛苦了 🤍";
}
