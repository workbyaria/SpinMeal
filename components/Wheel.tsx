"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import type { MealItem } from "@/lib/types";

/* 淺色模式：中性棕色／杏色系，不鮮豔 */
const SEGMENT_COLORS_LIGHT = [
  "#c4b5a5", "#d4c4b4", "#b8a898", "#e0d4c8", "#a89888",
  "#d0c0b0", "#c8b8a8", "#e4dcd4", "#d8c8b8", "#b0a090",
  "#c0b0a0", "#dcccb8", "#a89080", "#e8e0d4", "#c0b0a0",
  "#d4c4b4", "#b8a898", "#e0d8cc", "#a89888", "#c8b8a8",
];

/* 深色模式：深灰區塊 + 淺色字，與整體 dark 風格一致 */
const SEGMENT_COLORS_DARK = [
  "#404040", "#4a4a4a", "#525252", "#5a5a5a", "#606060",
  "#454545", "#4d4d4d", "#555555", "#5c5c5c", "#484848",
  "#404040", "#525252", "#5a5a5a", "#4a4a4a", "#555555",
  "#4d4d4d", "#606060", "#404040", "#5a5a5a", "#4a4a4a",
];

interface WheelProps {
  candidates: MealItem[];
  selectedIndex: number | null;
  isSpinning: boolean;
  onSpinEnd?: () => void;
  className?: string;
  isDark?: boolean;
}

export function Wheel({
  candidates,
  selectedIndex,
  isSpinning,
  onSpinEnd,
  className = "",
  isDark = false,
}: WheelProps) {
  const segmentColors = isDark ? SEGMENT_COLORS_DARK : SEGMENT_COLORS_LIGHT;
  const textFill = isDark ? "#e8e4e0" : "#3d3630"; /* 深色模式用淺灰字，與 --mt-body 一致 */
  const segmentStroke = isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.6)";
  const [rotation, setRotation] = useState(0);
  const [spinRotation, setSpinRotation] = useState<number | null>(null);
  const [justStopped, setJustStopped] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const hasTriggeredEnd = useRef(false);

  const displayList = candidates;
  const segmentCount = displayList.length;
  const segmentAngle = segmentCount > 0 ? 360 / segmentCount : 0;

  useEffect(() => {
    if (!isSpinning || segmentCount === 0 || selectedIndex == null || selectedIndex < 0 || selectedIndex >= segmentCount) return;
    hasTriggeredEnd.current = false;
    const index = selectedIndex;
    const segmentCenter = (index + 0.5) * segmentAngle;
    const minTurns = 5 + Math.floor(Math.random() * 4);
    const k = Math.ceil((rotation + minTurns * 360 - segmentCenter) / 360) + Math.floor(Math.random() * 2);
    const total = segmentCenter + 360 * Math.max(k, minTurns);
    const start = total - 360 * minTurns;
    const waypoint3 = total - 3 * segmentAngle;
    const waypoint2 = total - 2 * segmentAngle;
    const waypoint1 = total - 1 * segmentAngle;
    const edge = total - 0.4 * segmentAngle;

    const DURATION_MS = 8000;
    const T1 = 1100;
    const T2 = 2600;
    const T3 = 4600;
    const T4 = 7200;

    const easeOutCubic = (t: number) => 1 - (1 - t) * (1 - t) * (1 - t);

    const startTime = performance.now();
    setSpinRotation(start);

    let rafId: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed >= DURATION_MS) {
        setSpinRotation(null);
        setRotation(total);
        setJustStopped(true);
        if (!hasTriggeredEnd.current) {
          hasTriggeredEnd.current = true;
          onSpinEnd?.();
        }
        return;
      }
      let current: number;
      if (elapsed < T1) {
        const t = elapsed / T1;
        current = start + t * (waypoint3 - start);
      } else if (elapsed < T2) {
        const t = (elapsed - T1) / (T2 - T1);
        current = waypoint3 + t * (waypoint2 - waypoint3);
      } else if (elapsed < T3) {
        const t = (elapsed - T2) / (T3 - T2);
        current = waypoint2 + t * (waypoint1 - waypoint2);
      } else if (elapsed < T4) {
        const t = (elapsed - T3) / (T4 - T3);
        current = waypoint1 + t * (edge - waypoint1);
      } else {
        const t = easeOutCubic((elapsed - T4) / (DURATION_MS - T4));
        current = edge + t * (total - edge);
      }
      setSpinRotation(current);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isSpinning]);

  useEffect(() => {
    if (!justStopped) return;
    const id = setTimeout(() => setJustStopped(false), 320);
    return () => clearTimeout(id);
  }, [justStopped]);

  const { t: tMsg, locale } = useLocale();
  const isZh = locale === "zh-TW" || locale === "zh-CN";
  const textRadius = isZh ? 30 : 32;
  const maxLabelLen = segmentCount <= 6 ? 20 : segmentCount <= 12 ? 16 : 14;
  const labelFontSize = isZh
    ? (segmentCount <= 6 ? 6.2 : segmentCount <= 12 ? 5.4 : 4.8)
    : (segmentCount <= 6 ? 5 : segmentCount <= 12 ? 4.2 : 3.6);

  const truncateLabel = (name: string): string => {
    if (name.length <= maxLabelLen) return name;
    if (isZh) return name.slice(0, maxLabelLen) + "…";
    const words = name.trim().split(/\s+/);
    let len = 0;
    const taken: string[] = [];
    for (const w of words) {
      if (len + (len ? 1 : 0) + w.length > maxLabelLen - 1) break;
      taken.push(w);
      len += (len ? 1 : 0) + w.length;
    }
    if (taken.length === 0) return name.slice(0, maxLabelLen) + "…";
    return taken.join(" ") + "…";
  };

  if (segmentCount === 0) {
    return (
      <div
        className={`flex aspect-square max-w-[280px] items-center justify-center rounded-full border-4 border-dashed border-mt-border bg-mt-brown-light ${className}`}
        aria-hidden
      >
        <span className="text-sm text-mt-muted">{tMsg("wheel.noOptions")}</span>
      </div>
    );
  }

  return (
    <div className={`relative flex aspect-square max-w-[280px] items-center justify-center ${className}`}>
      {/* Stopper：上方圓弧、下方尖角，位置維持新位置 */}
      <svg
        className={`wheel-stopper absolute left-1/2 top-0 z-10 w-12 -translate-x-1/2 -translate-y-6 drop-shadow-lg ${justStopped ? "animate-stopper-shake" : ""}`}
        viewBox="0 0 48 56"
        fill="var(--mt-primary)"
        stroke="var(--mt-body)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M 24 56 L 12 20 A 12 12 0 0 1 36 20 Z" />
      </svg>
      <div
        ref={wheelRef}
        className={`relative z-0 aspect-square w-full max-w-[280px] overflow-hidden rounded-full shadow-xl ring-2 ${isDark ? "ring-neutral-500/50" : "ring-[#a89888]/40"}`}
        style={{
          transform: `rotate(${-(spinRotation ?? rotation)}deg)`,
        }}
        aria-hidden
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
          {displayList.map((meal, i) => {
            const startAngle = (i * segmentAngle - 90) * (Math.PI / 180);
            const endAngle = ((i + 1) * segmentAngle - 90) * (Math.PI / 180);
            const midAngleRad = ((i + 0.5) * segmentAngle - 90) * (Math.PI / 180);
            const midAngleDeg = (i + 0.5) * segmentAngle - 90;
            const r = 50;
            const x1 = 50 + r * Math.cos(startAngle);
            const y1 = 50 + r * Math.sin(startAngle);
            const x2 = 50 + r * Math.cos(endAngle);
            const y2 = 50 + r * Math.sin(endAngle);
            const large = segmentAngle > 180 ? 1 : 0;
            const d = `M 50 50 L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
            const color = segmentColors[i % segmentColors.length];
            const tx = 50 + textRadius * Math.cos(midAngleRad);
            const ty = 50 + textRadius * Math.sin(midAngleRad);
            const flipLeft = midAngleDeg > 90 && midAngleDeg < 270;
            const rotateDeg = midAngleDeg + (flipLeft ? 180 : 0);
            return (
              <g key={meal.id}>
                <path d={d} fill={color} stroke={segmentStroke} strokeWidth="0.35" />
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={textFill}
                  transform={`rotate(${rotateDeg} ${tx} ${ty})`}
                  style={{
                    fontSize: `${labelFontSize}px`,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {truncateLabel(meal.name)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
