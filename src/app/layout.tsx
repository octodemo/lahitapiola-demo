import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import { BasketProvider } from "@/context/BasketContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LähiTapiola — Insurance for Every Stage of Life",
  description:
    "Finland's trusted mutual insurance group. Home, car, health, life, travel and pet insurance — get your personalised quote online.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi">
      <body className={`${inter.variable} font-sans bg-white text-gray-800`}>
        {/* QuoteProvider wraps new insurance routes; BasketProvider kept for legacy /cards & /basket */}
        <QuoteProvider>
          <BasketProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </BasketProvider>
        </QuoteProvider>
      </body>
    </html>
  );
}
