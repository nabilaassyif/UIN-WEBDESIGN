import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
// Menggunakan path yang akurat keluar dari folder app lalu masuk ke src
import AccessibilityWidget from "../src/components/accessibility/AccessibilityWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "KALIMANTAN - Craft & Heritage",
  description: "Warisan yang Dibuat untuk Masa Kini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} bg-background text-on-background antialiased selection:bg-secondary-container selection:text-on-secondary-container relative`}
      >
        <div className="noise-overlay"></div>
        
        {children}

        {/* Widget Aksesibilitas */}
        <AccessibilityWidget />
        
        {/* Elemen pembantu untuk fitur Reading Guide */}
        <div 
          id="reading-guide-line" 
          className="fixed left-0 right-0 h-[4px] bg-secondary z-[9999] pointer-events-none hidden" 
        />
      </body>
    </html>
  );
}