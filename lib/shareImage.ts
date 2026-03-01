/**
 * 生成分享圖：Canvas 繪製 4:5（貼文）或 9:16（現實動態），含結果與品牌。
 */

export type ShareRatio = "4:5" | "9:16";

const W = 1080;

function getHeight(ratio: ShareRatio): number {
  if (ratio === "4:5") return Math.round((W * 5) / 4);
  return Math.round((W * 16) / 9);
}

const THEME = {
  light: {
    bg: "#f8f5f1",
    surface: "#ffffff",
    body: "#4a4a4a",
    muted: "#888888",
    primary: "#705b51",
  },
  dark: {
    bg: "#1c1b1a",
    surface: "#2a2826",
    body: "#e8e4e0",
    muted: "#9a9590",
    primary: "#e5e7eb",
  },
} as const;

function getTheme(isDark: boolean) {
  return isDark ? THEME.dark : THEME.light;
}

export interface ShareImageOptions {
  mealName: string;
  todayLabel: string;
  appName: string;
  ratio: ShareRatio;
  isDark: boolean;
}

export function drawShareImage(opts: ShareImageOptions): Promise<Blob> {
  const { mealName, todayLabel, appName, ratio, isDark } = opts;
  const theme = getTheme(isDark);
  const height = getHeight(ratio);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return Promise.reject(new Error("Canvas not supported"));

  // 背景
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, W, height);

  const padding = 80;
  const centerX = W / 2;

  // 上方小標「今天吃這個」
  ctx.fillStyle = theme.muted;
  ctx.font = "bold 48px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const topY = padding + 60;
  ctx.fillText(todayLabel, centerX, topY);

  // 餐點名稱（主標）
  ctx.fillStyle = theme.body;
  const maxWidth = W - padding * 2;
  ctx.font = "bold 120px system-ui, sans-serif";
  const mealY = topY + 140;
  wrapText(ctx, mealName, centerX, mealY, maxWidth, 120);

  // 底部品牌
  ctx.fillStyle = theme.muted;
  ctx.font = "36px system-ui, sans-serif";
  const bottomY = height - padding - 40;
  ctx.fillText(appName, centerX, bottomY);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))),
      "image/png",
      1
    );
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split("");
  let line = "";
  const lines: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== "") {
      lines.push(line);
      line = words[i];
    } else {
      line = testLine;
    }
  }
  if (line) lines.push(line);

  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((ln, i) => {
    ctx.fillText(ln, x, startY + i * lineHeight);
  });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
