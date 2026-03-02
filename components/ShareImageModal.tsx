"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "@/components/AdSlot";
import { useLocale } from "@/components/LocaleProvider";
import { drawShareImage, downloadBlob, type ShareRatio } from "@/lib/shareImage";
import type { MealItem } from "@/lib/types";

const AD_SECONDS_MIN = 10;
const AD_SECONDS_MAX = 15;

function getAdSeconds() {
  return AD_SECONDS_MIN + Math.floor(Math.random() * (AD_SECONDS_MAX - AD_SECONDS_MIN + 1));
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

interface ShareImageModalProps {
  open: boolean;
  onClose: () => void;
  meal: MealItem;
  todayLabel: string;
  appName: string;
  isDark: boolean;
}

export function ShareImageModal({
  open,
  onClose,
  meal,
  todayLabel,
  appName,
  isDark,
}: ShareImageModalProps) {
  const { t } = useLocale();
  const [step, setStep] = useState<"ratio" | "ad" | "generating" | "done">("ratio");
  const [countdown, setCountdown] = useState(AD_SECONDS_MIN);
  const [ratio, setRatio] = useState<ShareRatio>("4:5");

  useEffect(() => {
    if (!open) {
      setStep("ratio");
      setCountdown(AD_SECONDS_MIN);
    }
  }, [open]);

  const startAd = (r: ShareRatio) => {
    setRatio(r);
    setCountdown(getAdSeconds());
    setStep("ad");
  };

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
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
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
            <p className="mb-5 text-center text-sm text-mt-muted">{t("share.chooseSize")}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => startAd("4:5")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-mt-border bg-mt-brown-light py-4 text-sm font-medium text-mt-body transition-colors hover:bg-mt-border"
              >
                <ShareIcon className="h-5 w-5 shrink-0" />
                <span>{t("share.ratioPost")}</span>
              </button>
              <button
                type="button"
                onClick={() => startAd("9:16")}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-mt-border bg-mt-brown-light py-4 text-sm font-medium text-mt-body transition-colors hover:bg-mt-border"
              >
                <ShareIcon className="h-5 w-5 shrink-0" />
                <span>{t("share.ratioStory")}</span>
              </button>
            </div>
          </>
        )}

        {step === "ad" && (
          <>
            <div className="mb-4 rounded-2xl border border-mt-border overflow-hidden bg-mt-brown-light/50">
              <AdSlot />
            </div>
            <p className="text-center text-sm text-mt-muted">
              {t("share.adHint")} {countdown > 0 && <span className="font-medium text-mt-body">({countdown}s)</span>}
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
              className="rounded-xl bg-mt-primary px-6 py-2 text-sm font-medium text-white tap-highlight-none hover:bg-mt-primary-hover"
            >
              {t("share.close")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
