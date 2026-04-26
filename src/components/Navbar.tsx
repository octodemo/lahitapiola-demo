"use client";

import Link from "next/link";
import { FileText, Search, Menu, X, Phone } from "lucide-react";
import { useQuote } from "@/context/QuoteContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useQuote();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navLinks = [
    { label: "Home Insurance", href: "/policies?type=home" },
    { label: "Car Insurance", href: "/policies?type=car" },
    { label: "Health", href: "/policies?type=health" },
    { label: "Life", href: "/policies?type=life" },
    { label: "Travel", href: "/policies?type=travel" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      {/* Top utility bar */}
      <div className="bg-lt-navy text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>🇫🇮 LähiTapiola — Your local Finnish insurer</span>
          <a href="tel:0200600600" className="flex items-center gap-1 hover:underline">
            <Phone className="w-3 h-3" />
            020 060 0600
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-lt-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">LT</span>
            </div>
            <span className="text-xl font-black text-lt-navy tracking-tight">
              LähiTapiola
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-lt-navy font-medium transition-colors duration-150 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search + Quote */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-lt-navy focus-within:border-lt-navy">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search insurance…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-transparent outline-none text-sm w-40 text-gray-700 placeholder-gray-400"
              />
            </div>

            <Link href="/quote" className="relative p-2 rounded-full hover:bg-lt-cream transition-colors">
              <FileText className="w-6 h-6 text-lt-navy" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-lt-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 gap-2 mt-3 mb-3">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search insurance…"
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block py-2 text-gray-700 font-medium border-b border-gray-50 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
