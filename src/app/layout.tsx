import type { Metadata } from "next";
import { Jost, Cormorant_Garamond } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ChatBot from "@/components/ChatBot";
import OnboardingTour from "@/components/OnboardingTour";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rbcbuilders.ph"),
  title: "RBC Builders | Architectural Design & Luxury Construction · Pampanga",
  description:
    "Design-build architectural and general construction firm based in San Fernando, Pampanga. Custom residential construction, building permits, labor, materials, and turnkey execution across Central Luzon.",
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
      "Turnkey design-build architectural and general construction services across Pampanga and Central Luzon.",
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
      className={`${jost.variable} ${cormorant.variable} h-full antialiased selection:bg-[#8b6a4e] selection:text-white`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SmoothScroll>{children}</SmoothScroll>
        <ChatBot />
        <OnboardingTour />
      </body>
    </html>
  );
}
