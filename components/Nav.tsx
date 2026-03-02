"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";

const LINKS = [
  { href: "/", labelKey: "nav.wheel" as const },
  { href: "/history", labelKey: "nav.history" as const },
  { href: "/my-meals", labelKey: "nav.myMeals" as const },
];

export function Nav() {
  const pathname = usePathname();
  const { t } = useLocale();
  return (
    <nav
      className="sticky bottom-0 z-10 flex min-h-[52px] items-center border-t border-mt-border bg-mt-surface px-2 py-3"
      aria-label={t("nav.ariaLabel")}
    >
      <ul className="flex w-full justify-around">
        {LINKS.map(({ href, labelKey }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={
                  active
                    ? "selected-primary flex min-h-[44px] items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-white tap-highlight-none bg-mt-primary"
                    : "flex min-h-[44px] items-center justify-center rounded-xl px-4 py-3 text-sm font-medium text-mt-muted tap-highlight-none hover:text-mt-body"
                }
              >
                {t(labelKey)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
