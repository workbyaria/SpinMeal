"use client";

/**
 * 左上角 logo：轉盤造型，圓心＋細指針。
 */
export function WheelLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 轉盤外圓 */}
      <circle cx="12" cy="12" r="9" />
      {/* 六條分割線（扇形） */}
      <line x1="12" y1="12" x2="21" y2="12" />
      <line x1="12" y1="12" x2="16.5" y2="4.2" />
      <line x1="12" y1="12" x2="7.5" y2="4.2" />
      <line x1="12" y1="12" x2="3" y2="12" />
      <line x1="12" y1="12" x2="7.5" y2="19.8" />
      <line x1="12" y1="12" x2="16.5" y2="19.8" />
      {/* 中心點 */}
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      {/* 細指針（上方） */}
      <path
        d="M 12 1.2 L 11.2 5.5 L 12.8 5.5 Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
