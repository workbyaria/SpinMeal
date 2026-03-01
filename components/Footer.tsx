"use client";

const INSTAGRAM_URL = "https://instagram.com/friendlycatgroup";
const EMAIL_URL = "mailto:workbyaria@gmail.com";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-mt-surface py-4 text-center">
      <p className="text-[11px] text-mt-muted">
        SpinMeal © {year} · Friendly Cat Group
      </p>
      <div className="mt-2 flex justify-center gap-4">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mt-muted hover:text-mt-body transition-colors"
          aria-label="Instagram"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a
          href={EMAIL_URL}
          className="text-mt-muted hover:text-mt-body transition-colors"
          aria-label="Email"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
