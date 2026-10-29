import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import ChatBot from "@/components/ChatBot";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RBC Builders | Design + Build, Pampanga",
  description:
    "RBC Builders: design-to-completion construction in Pampanga and Central Luzon. Labor, materials, government permits, and bank application assistance under one roof.",
  keywords: [
    "RBC Builders",
    "construction Pampanga",
    "house construction Philippines",
    "design and build",
    "San Fernando Pampanga contractor",
  ],
  openGraph: {
    title: "RBC Builders | Design + Build, Pampanga",
    description:
      "Every home tells a different story, but every dream begins with you. Design to completion construction services across Central Luzon.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
        <ChatBot />
        <CustomCursor />
      </body>
    </html>
  );
}
