import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BasketProvider } from "@/context/BasketContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Moonpig 🐷 — Cards, Gifts & Flowers",
  description: "Send personalised greeting cards, flowers and gifts. UK's number one personalised card company.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-white text-gray-800`}>
        <BasketProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </BasketProvider>
      </body>
    </html>
  );
}
