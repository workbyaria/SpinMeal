"use client";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-3 text-center">
      <p className="text-[11px] text-mt-muted">
        SpinMeal © {year} · Friendly Cat Group
      </p>
    </footer>
  );
}
