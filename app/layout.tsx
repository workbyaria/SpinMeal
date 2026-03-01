import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { StarterPackSeed } from "@/components/StarterPackSeed";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const siteTitle = "SpinMeal – Meal Spinner";
const siteDescription = "Breakfast, lunch, and dinner roulette. Spin and get a random meal suggestion.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={outfit.variable}>
      <body className="font-sans tap-highlight-none">
        <StarterPackSeed>{children}</StarterPackSeed>
      </body>
    </html>
  );
}
