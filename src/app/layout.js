import { Markazi_Text, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import FloatingWidget from "@/components/FloatingWidget";

const markazi = Markazi_Text({
  variable: "--font-markazi",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "مكتبة الأصيل — اكتشف الكتاب الذي يشبهك",
  description: "منصة كتب عربية تفهم ذوقك القرائي وترشّح لك من بين مكتبة حقيقية من الكتب.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${markazi.variable} ${plexArabic.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <NavBar />
        <main>{children}</main>
        <FloatingWidget />
      </body>
    </html>
  );
}
