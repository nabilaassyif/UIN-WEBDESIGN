import type { Metadata } from "next";
import "./globals.css";
import AccessibilityWidget from "../src/components/accessibility/AccessibilityWidget";
import AccessibilitySync from "../src/components/accessibility/AccessibilitySync";
import { LanguageProvider } from "../src/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "KALIMANTAN — Craft & Heritage | Warisan yang Dibuat untuk Masa Kini",
  description:
    "Eksplorasi mahakarya warisan budaya, anyaman rotan, ukiran kayu ulin, kain tenun, dan kearifan leluhur Dayak Kalimantan yang terkurasi secara kontemporer.",
  keywords: [
    "Kalimantan",
    "Dayak",
    "Craft",
    "Heritage",
    "Anyaman Rotan",
    "Kayu Ulin",
    "Tenun Ikat",
    "Mandau",
    "Budaya Nusantara",
  ],
  authors: [{ name: "Kalimantan Cultural Heritage Organization" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased relative min-h-screen">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('kalimantan-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
        <LanguageProvider>
          <AccessibilitySync />

          <div className="noise-overlay" aria-hidden="true" />

          {children}

          <AccessibilityWidget />

          <div
            id="reading-guide-line"
            className="fixed left-0 right-0 h-[3px] bg-[var(--accent)] shadow-[0_0_8px_rgba(255,181,159,0.8)] z-[9999] pointer-events-none hidden transition-all duration-75"
            aria-hidden="true"
          />

          <div id="access-grayscale-overlay" aria-hidden="true" />
        </LanguageProvider>
      </body>
    </html>
  );
}