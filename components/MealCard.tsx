"use client";

import { useLocale } from "@/components/LocaleProvider";
import type { MealItem } from "@/lib/types";

interface MealCardProps {
  meal: MealItem;
  onAddToMyMeals?: (id: string) => void;
  compact?: boolean;
  center?: boolean;
  className?: string;
  /** 覆寫「餐點名稱」那行，例如首頁結果用「就決定是」 */
  titleLabel?: string;
}

export function MealCard({
  meal,
  onAddToMyMeals,
  compact = false,
  center = false,
  className = "",
  titleLabel,
}: MealCardProps) {
  const { t } = useLocale();
  const tags = meal.tags?.length ? meal.tags : (meal as MealItem & { cuisine?: string[] }).cuisine ?? [];
  const c = center ? "text-center" : "";
  const label = titleLabel ?? t("mealCard.mealName");
  return (
    <article
      className={`rounded-2xl bg-transparent ${compact ? "p-2" : ""} ${c} ${className}`}
      aria-label={`${label}: ${meal.name}`}
    >
      <div className={`mt-3 border-b border-mt-border pb-4 ${c}`}>
        <p className="text-sm font-medium uppercase tracking-wider text-mt-muted">{label}</p>
        <p className={`mt-2 font-semibold text-mt-body ${compact ? "text-base" : "text-lg"}`}>
          {meal.name}
        </p>
      </div>
      {tags.length > 0 && (
        <div className={`mt-3 border-b border-mt-border pb-2 ${c}`}>
          <p className="text-sm font-medium uppercase tracking-wider text-mt-muted">{t("mealCard.tags")}</p>
          <div className={`mt-1 flex flex-wrap gap-1.5 text-sm text-mt-body ${center ? "justify-center" : ""}`}>
            {tags.map((tag) => (
              <span key={tag} className="rounded bg-mt-brown-light px-2 py-0.5 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      {meal.notes && !compact && (
        <div className={`mt-3 border-b border-mt-border pb-2 ${c}`}>
          <p className="text-sm font-medium uppercase tracking-wider text-mt-muted">{t("mealCard.notes")}</p>
          <p className="mt-0.5 text-sm text-mt-body">{meal.notes}</p>
        </div>
      )}
      {onAddToMyMeals && !compact && meal.source === "seed" && (
        <div className={`mt-3 ${center ? "flex justify-center" : ""}`}>
          <button
            type="button"
            onClick={() => onAddToMyMeals(meal.id)}
            className="rounded-xl border border-mt-border bg-mt-brown-light px-4 py-2 text-sm font-medium text-mt-body tap-highlight-none hover:bg-mt-border"
          >
            {t("mealCard.addToMyMeals")}
          </button>
        </div>
      )}
    </article>
  );
}
