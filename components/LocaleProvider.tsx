"use client";

import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { getStarterPack } from "@/data/starterPack";
import { getLocale, setLocale as setLocaleStorage, type LocaleId } from "@/lib/locale";
import { getMessage, type MessageKey } from "@/lib/translations";
import { getUserMeals, setUserMeals } from "@/lib/storage";

type T = (key: MessageKey, params?: { type?: string; count?: number }) => string;

interface LocaleContextValue {
  locale: LocaleId;
  setLocale: (l: LocaleId) => void;
  t: T;
}

export const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>("en");

  useEffect(() => {
    setLocaleState(getLocale());
    const onChange = () => setLocaleState(getLocale());
    window.addEventListener("localechange", onChange);
    return () => window.removeEventListener("localechange", onChange);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const lang = locale === "zh-TW" ? "zh-TW" : locale === "zh-CN" ? "zh-CN" : "en";
    document.documentElement.lang = lang;
  }, [locale]);

  const setLocale = useCallback((l: LocaleId) => {
    setLocaleStorage(l);
    const meals = getUserMeals();
    if (meals.length > 0 && meals.every((m) => m.id.startsWith("starter-"))) {
      setUserMeals(getStarterPack(l));
      window.dispatchEvent(new Event("mealschange"));
    }
    setLocaleState(l);
  }, []);

  const t: T = useCallback(
    (key, params) => getMessage(locale, key, params),
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
