import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { PageTransition } from "@/components/ui/PageTransition";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charchit Studios — The Digital Craft House",
  description:
    "Make your business worth talking about. An independent digital craft house uniting classical Indian craftsmanship and high-performance digital engineering.",
  icons: {
    icon: "/brand/charchit-wordmark.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAF7F2] text-[#14224A] selection:bg-[#C5A059]/30 selection:text-[#080D1A]">
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
