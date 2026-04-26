"use client";

import { useState, useMemo } from "react";
import { cards, occasions } from "@/data/cards";
import { ProductCard } from "@/components/CardImage";
import { SlidersHorizontal, X } from "lucide-react";

export default function CardsPage() {
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(10);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      const occasionMatch = !selectedOccasion || c.occasion === selectedOccasion;
      const priceMatch = c.price <= maxPrice;
      return occasionMatch && priceMatch;
    });
  }, [selectedOccasion, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900 mb-1">Greeting Cards</h1>
        <p className="text-gray-500">{filtered.length} cards available · Free personalisation on all cards</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters — Desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <h2 className="font-bold text-gray-800 mb-4">Filter by</h2>

            {/* Occasion */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Occasion</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedOccasion(null)}
                  className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${!selectedOccasion ? "bg-moonpig-pink text-white font-semibold" : "hover:bg-gray-50 text-gray-700"}`}
                >
                  All Occasions
                </button>
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ === selectedOccasion ? null : occ)}
                    className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${selectedOccasion === occ ? "bg-moonpig-pink text-white font-semibold" : "hover:bg-gray-50 text-gray-700"}`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Max Price</h3>
              <input
                type="range"
                min={2}
                max={10}
                step={0.5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-moonpig-pink"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>£2.00</span>
                <span className="font-semibold text-moonpig-pink">up to £{maxPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(selectedOccasion || maxPrice < 10) && (
                <span className="bg-moonpig-pink text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {[selectedOccasion, maxPrice < 10].filter(Boolean).length}
                </span>
              )}
            </button>
            {showFilters && (
              <div className="mt-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setSelectedOccasion(null)}
                    className={`text-sm py-1 px-3 rounded-full border transition-colors ${!selectedOccasion ? "bg-moonpig-pink text-white border-moonpig-pink" : "border-gray-200 text-gray-700 hover:border-moonpig-pink"}`}
                  >
                    All
                  </button>
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ === selectedOccasion ? null : occ)}
                      className={`text-sm py-1 px-3 rounded-full border transition-colors ${selectedOccasion === occ ? "bg-moonpig-pink text-white border-moonpig-pink" : "border-gray-200 text-gray-700 hover:border-moonpig-pink"}`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Max Price: <span className="text-moonpig-pink">£{maxPrice.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={10}
                    step={0.5}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-moonpig-pink mt-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Active filters */}
          {(selectedOccasion) && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {selectedOccasion && (
                <span className="inline-flex items-center gap-1 bg-pink-50 text-moonpig-pink text-sm font-medium px-3 py-1 rounded-full border border-pink-200">
                  {selectedOccasion}
                  <button onClick={() => setSelectedOccasion(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Cards Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="text-lg font-semibold">No cards found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((card) => (
                <ProductCard key={card.id} card={card} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
