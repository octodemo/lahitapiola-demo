"use client";

import { useState, useMemo } from "react";
import { policies, policyTypes, policyTypeLabels, policyTypeEmojis, PolicyType } from "@/data/policies";
import { PolicyCard } from "@/components/PolicyCard";
import { SlidersHorizontal, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PoliciesContent() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get("type") as PolicyType | null) ?? null;

  const [selectedType, setSelectedType] = useState<PolicyType | null>(initialType);
  const [maxPremium, setMaxPremium] = useState<number>(50);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return policies.filter((p) => {
      const typeMatch = !selectedType || p.type === selectedType;
      const priceMatch = p.monthlyPremium <= maxPremium;
      return typeMatch && priceMatch;
    });
  }, [selectedType, maxPremium]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900 mb-1">Insurance Policies</h1>
        <p className="text-gray-500">
          {filtered.length} policies available · Bundle 3+ policies for 10% off
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — Desktop */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <h2 className="font-bold text-gray-800 mb-4">Filter by</h2>

            {/* Type */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Insurance type
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedType(null)}
                  className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors ${
                    !selectedType
                      ? "bg-lt-navy text-white font-semibold"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  All types
                </button>
                {policyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type === selectedType ? null : type)}
                    className={`w-full text-left text-sm py-1.5 px-3 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedType === type
                        ? "bg-lt-navy text-white font-semibold"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span>{policyTypeEmojis[type]}</span>
                    {policyTypeLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Range */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                Max monthly premium
              </h3>
              <input
                type="range"
                min={5}
                max={50}
                step={1}
                value={maxPremium}
                onChange={(e) => setMaxPremium(Number(e.target.value))}
                className="w-full accent-lt-orange"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>€5/mo</span>
                <span className="font-semibold text-lt-orange">up to €{maxPremium}/mo</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(selectedType || maxPremium < 50) && (
                <span className="bg-lt-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {[selectedType, maxPremium < 50].filter(Boolean).length}
                </span>
              )}
            </button>
            {showFilters && (
              <div className="mt-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`text-sm py-1 px-3 rounded-full border transition-colors ${
                      !selectedType
                        ? "bg-lt-navy text-white border-lt-navy"
                        : "border-gray-200 text-gray-700"
                    }`}
                  >
                    All
                  </button>
                  {policyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type === selectedType ? null : type)}
                      className={`text-sm py-1 px-3 rounded-full border transition-colors ${
                        selectedType === type
                          ? "bg-lt-navy text-white border-lt-navy"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {policyTypeEmojis[type]} {policyTypeLabels[type]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active filter chip */}
          {selectedType && (
            <div className="flex gap-2 mb-4">
              <span className="inline-flex items-center gap-1 bg-blue-50 text-lt-navy text-sm font-medium px-3 py-1 rounded-full border border-blue-200">
                {policyTypeEmojis[selectedType]} {policyTypeLabels[selectedType]}
                <button onClick={() => setSelectedType(null)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            </div>
          )}

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <span className="text-5xl block mb-4">🔍</span>
              <p className="text-lg font-semibold">No policies found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((policy) => (
                <PolicyCard key={policy.id} policy={policy} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PoliciesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading policies…</div>}>
      <PoliciesContent />
    </Suspense>
  );
}
