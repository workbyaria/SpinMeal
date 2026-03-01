"use client";

import { useLocale } from "@/components/LocaleProvider";

/**
 * 廣告區塊 placeholder，之後可替換成實際廣告代碼。
 * 位置：首頁轉盤卡片下方、結果區塊上方。
 */
export function AdSlot() {
  const { t } = useLocale();
  return (
    <div
      className="mx-auto flex max-w-md items-center justify-center rounded-2xl border border-dashed border-mt-border bg-mt-brown-light/50 py-8"
      aria-label={t("ad.ariaLabel")}
    >
      <span className="text-[11px] font-normal text-mt-muted">Ad</span>
    </div>
  );
}
