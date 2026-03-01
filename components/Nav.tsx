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
      className="sticky bottom-0 z-10 border-t border-mt-border bg-mt-surface py-2"
      aria-label={t("nav.ariaLabel")}
    >
      <ul className="flex justify-around">
        {LINKS.map(({ href, labelKey }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={
                  active
                    ? "selected-primary block rounded-xl px-4 py-2 text-sm font-medium text-white tap-highlight-none bg-mt-primary"
                    : "block rounded-xl px-4 py-2 text-sm font-medium text-mt-muted tap-highlight-none hover:text-mt-body"
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
