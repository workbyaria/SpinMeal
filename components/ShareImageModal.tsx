"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { drawShareImage, downloadBlob, type ShareRatio } from "@/lib/shareImage";
import type { MealItem } from "@/lib/types";

const AD_SECONDS = 5;

type TranslateFn = (key: string) => string;

interface ShareImageModalProps {
  open: boolean;
  onClose: () => void;
  meal: MealItem;
  todayLabel: string;
  appName: string;
  isDark: boolean;
  t: TranslateFn;
}

export function ShareImageModal({
  open,
  onClose,
  meal,
  todayLabel,
  appName,
  isDark,
  t,
}: ShareImageModalProps) {
  const [step, setStep] = useState<"ratio" | "ad" | "generating" | "done">("ratio");
  const [countdown, setCountdown] = useState(AD_SECONDS);
  const [ratio, setRatio] = useState<ShareRatio>("1:1");

  useEffect(() => {
    if (!open) {
      setStep("ratio");
      setCountdown(AD_SECONDS);
    }
  }, [open]);

  useEffect(() => {
    if (step !== "ad" || !open) return;
    if (countdown <= 0) {
      setStep("generating");
      drawShareImage({
        mealName: meal.name,
        todayLabel,
        appName,
        ratio,
        isDark,
      })
        .then((blob) => {
          const name = `SpinMeal-${meal.name.replace(/[^\w\s\u4e00-\u9fff]/g, "")}.png`;
          downloadBlob(blob, name);
          setStep("done");
        })
        .catch(() => setStep("done"));
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown, open, meal.name, todayLabel, appName, ratio, isDark]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-md overflow-auto rounded-2xl border border-mt-border bg-mt-surface p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "ratio" && (
          <>
            <p className="mb-4 text-center text-sm text-mt-muted">{t("share.adHint")}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setRatio("1:1");
                  setStep("ad");
                }}
                className="flex-1 rounded-xl border border-mt-border bg-mt-brown-light py-3 text-sm font-medium text-mt-body hover:bg-mt-border"
              >
                {t("share.ratioPost")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setRatio("9:16");
                  setStep("ad");
                }}
                className="flex-1 rounded-xl border border-mt-border bg-mt-brown-light py-3 text-sm font-medium text-mt-body hover:bg-mt-border"
              >
                {t("share.ratioStory")}
              </button>
            </div>
          </>
        )}

        {step === "ad" && (
          <>
            <div className="mb-3 rounded-2xl border border-mt-border overflow-hidden">
              <AdSlot />
            </div>
            <p className="text-center text-sm text-mt-muted">
              {t("share.adHint")} {countdown > 0 && `(${countdown}s)`}
            </p>
          </>
        )}

        {(step === "generating" || step === "done") && (
          <p className="py-6 text-center text-mt-body">
            {step === "generating" ? t("share.generating") : t("share.done")}
          </p>
        )}

        {step === "done" && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-mt-primary px-6 py-2 text-sm font-medium text-white hover:bg-mt-primary-hover"
            >
              {t("share.close")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
