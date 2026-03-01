export type ThemeId = "light" | "dark";

const THEME_KEY = "spinmeal_theme";

export function getTheme(): ThemeId {
  if (typeof window === "undefined") return "light";
  const v = localStorage.getItem(THEME_KEY);
  if (v === "dark" || v === "light") return v;
  return "light";
}

export function setTheme(theme: ThemeId): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
}

export function applyTheme(theme: ThemeId): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}

export function toggleTheme(): ThemeId {
  const next = getTheme() === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}
