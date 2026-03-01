"use client";

import { useEffect } from "react";
import { LocaleProvider } from "@/components/LocaleProvider";
import { runStarterPackSeedIfNeeded } from "@/lib/meals";
import { applyTheme, getTheme } from "@/lib/theme";

/**
 * Runs once on mount: seeds localStorage with starter pack if empty; applies saved theme.
 */
export function StarterPackSeed({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    runStarterPackSeedIfNeeded();
    applyTheme(getTheme());
  }, []);
  return <LocaleProvider>{children}</LocaleProvider>;
}
