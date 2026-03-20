"use client";

import { useLocale } from "@/components/LocaleProvider";

/**
 * Google 多媒體／AdSense 最常嵌入的尺寸之一是 **Medium Rectangle（MPU）300×250**（IAB 標準），
 * 版位充足、適合內文／彈窗。分享圖倒數頁用 `mediumRectangle` 對齊此比例並放大可視區域。
 * @see https://support.google.com/adsense/answer/6002621
 */
export type AdSlotLayout = "compact" | "mediumRectangle";

interface AdSlotProps {
  layout?: AdSlotLayout;
  className?: string;
}

export function AdSlot({ layout = "compact", className = "" }: AdSlotProps) {
  const { t } = useLocale();

  if (layout === "mediumRectangle") {
    return (
      <div
        role="region"
        className={[
          /* 寬度盡量用大：手機滿寬、平板／桌機約 400–420px，高度依 300:250 比例 */
          "mx-auto flex w-full max-w-[min(100%,100vw-2rem)] flex-col items-center justify-center gap-2",
          "rounded-xl border border-dashed border-mt-border bg-mt-brown-light/40 p-4",
          "aspect-[300/250] sm:max-w-[420px]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={`${t("ad.ariaLabel")} — ${t("ad.mpuHint")}`}
      >
        <span className="text-sm font-semibold tracking-wide text-mt-muted">{t("ad.ariaLabel")}</span>
        <span className="max-w-[280px] text-center text-[11px] leading-snug text-mt-muted">{t("ad.mpuHint")}</span>
      </div>
    );
  }

  return (
    <div
      className={`mx-auto flex max-w-md items-center justify-center rounded-2xl border border-dashed border-mt-border bg-mt-brown-light/50 py-8 ${className}`}
      aria-label={t("ad.ariaLabel")}
    >
      <span className="text-[11px] font-normal text-mt-muted">Ad</span>
    </div>
  );
}
