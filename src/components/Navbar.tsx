"use client";

import Link from "next/link";
import { ShoppingBasket, Search, Menu, X } from "lucide-react";
import { useBasket } from "@/context/BasketContext";
import { useState } from "react";

export default function Navbar() {
  const { totalItems } = useBasket();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const categories = [
    { label: "Cards", href: "/cards" },
    { label: "Gifts", href: "/cards?category=gifts" },
    { label: "Flowers", href: "/cards?category=flowers" },
    { label: "Offers", href: "/cards?category=offers" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl font-black text-moonpig-pink tracking-tight">
              🐷 Moonpig
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="text-gray-600 hover:text-moonpig-pink font-medium transition-colors duration-150"
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Search + Basket */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-moonpig-pink focus-within:border-moonpig-pink">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cards & gifts…"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-transparent outline-none text-sm w-48 text-gray-700 placeholder-gray-400"
              />
            </div>

            <Link href="/basket" className="relative p-2 rounded-full hover:bg-pink-50 transition-colors">
              <ShoppingBasket className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-moonpig-pink text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
              placeholder="Search cards & gifts…"
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="block py-2 text-gray-700 font-medium border-b border-gray-50 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
