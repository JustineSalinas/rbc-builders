import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ChatBot from "@/components/ChatBot";
import OnboardingTour from "@/components/OnboardingTour";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rbcbuilders.ph"),
  title: "RBC Builders | Architectural Design & Luxury Construction · Pampanga",
  description:
    "Premier design-build architectural and general construction firm based in San Fernando, Pampanga. Engineering bespoke luxury residences, government permits, labor, materials, and turnkey execution across Central Luzon.",
  keywords: [
    "RBC Builders",
    "luxury architecture Pampanga",
    "design and build contractor Philippines",
    "custom home construction San Fernando",
    "general contractor Central Luzon",
    "luxury residential builders",
    "turnkey house construction",
  ],
  openGraph: {
    title: "RBC Builders | Architecture & Luxury Construction",
    description:
      "Architecture with permanence. Built with precision. Turnkey design-build construction services across Central Luzon.",
    images: ["/images/hero.jpg"],
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
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased selection:bg-[#c5a880] selection:text-[#0c0c0b]`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SmoothScroll>{children}</SmoothScroll>
        <ChatBot />
        <OnboardingTour />
      </body>
    </html>
  );
}
