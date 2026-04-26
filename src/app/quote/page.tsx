"use client";

import { useQuote, BUNDLE_DISCOUNT_THRESHOLD, BUNDLE_DISCOUNT_RATE } from "@/context/QuoteContext";
import { monthlyPremiumWithTax, policyTypeEmojis } from "@/data/policies";
import { Trash2, FileText, Tag } from "lucide-react";
import Link from "next/link";

// ===========================================================================
// DEMO MOMENT 2 — Bundle discount is already implemented in QuoteContext.
// The TODO below is intentionally left for the live Copilot demo:
//
// TODO: The bundle discount badge below only appears when bundleDiscountActive
//       is true, but the discount isn't shown as a line item in the breakdown.
//       Ask Copilot to add a "Bundle discount (–10%)" row to the summary table.
// ===========================================================================

export default function QuotePage() {
  const {
    items,
    removeItem,
    clearQuote,
    totalMonthlyWithTax,
    bundleDiscountActive,
    bundleDiscountAmount,
    totalMonthlyAfterDiscount,
  } = useQuote();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-gray-900 mb-2">Your quote is empty</h1>
        <p className="text-gray-500 mb-8">
          Browse our insurance policies and add them to your personalised quote.
        </p>
        <Link href="/policies" className="btn-primary inline-block">
          Browse Policies
        </Link>
      </div>
    );
  }

  const policiesUntilDiscount = BUNDLE_DISCOUNT_THRESHOLD - items.length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-black text-gray-900">Your Insurance Quote</h1>
        <button
          onClick={clearQuote}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Bundle discount nudge */}
      {!bundleDiscountActive && policiesUntilDiscount > 0 && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-sm">
          <Tag className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <span className="text-amber-800">
            Add <strong>{policiesUntilDiscount} more {policiesUntilDiscount === 1 ? "policy" : "policies"}</strong> to unlock your{" "}
            <strong>{(BUNDLE_DISCOUNT_RATE * 100).toFixed(0)}% bundle discount</strong>!
          </span>
          <Link href="/policies" className="ml-auto text-lt-orange font-semibold hover:underline whitespace-nowrap">
            Add more →
          </Link>
        </div>
      )}

      {bundleDiscountActive && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-sm">
          <Tag className="w-5 h-5 text-lt-teal flex-shrink-0" />
          <span className="text-green-800">
            🎉 <strong>Bundle discount applied!</strong> You're saving{" "}
            <strong>€{bundleDiscountAmount.toFixed(2)}/month</strong> by bundling{" "}
            {items.length} policies.
          </span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Policy list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.policy.id}
              className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex gap-4"
            >
              {/* Policy icon */}
              <div
                className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: item.policy.bgColor }}
              >
                <span className="text-3xl">{item.policy.emoji}</span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{item.policy.title}</h3>
                {item.insuredName && item.insuredName !== "Not specified" && (
                  <p className="text-xs text-gray-500 italic truncate mt-0.5">
                    Insured: {item.insuredName}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-0.5 capitalize">{item.policy.type} insurance</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-500">
                    <span>€{item.policy.monthlyPremium.toFixed(2)} + tax</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lt-orange">
                      €{monthlyPremiumWithTax(item.policy).toFixed(2)}/mo
                    </span>
                    <button
                      onClick={() => removeItem(item.policy.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/policies"
            className="block text-center text-lt-navy font-semibold text-sm py-3 border-2 border-dashed border-lt-navy/30 rounded-2xl hover:bg-lt-cream transition-colors"
          >
            + Add more policies
          </Link>
        </div>

        {/* Quote summary */}
        <div>
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sticky top-24">
            <h2 className="font-bold text-gray-800 text-lg mb-5">Quote Summary</h2>

            <div className="space-y-3 text-sm">
              {items.map((item) => (
                <div key={item.policy.id} className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    {policyTypeEmojis[item.policy.type]} {item.policy.shortTitle}
                  </span>
                  <span className="font-medium">€{monthlyPremiumWithTax(item.policy).toFixed(2)}/mo</span>
                </div>
              ))}

              <div className="border-t border-gray-100 pt-3 flex justify-between text-gray-600">
                <span>Subtotal ({items.length} {items.length === 1 ? "policy" : "policies"})</span>
                <span className="font-medium">€{totalMonthlyWithTax.toFixed(2)}/mo</span>
              </div>

              <div className="border-t border-gray-100 pt-3 flex justify-between font-black text-lg text-gray-900">
                <span>Monthly total</span>
                <span className="text-lt-navy">€{totalMonthlyAfterDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Annual total</span>
                <span>€{(totalMonthlyAfterDiscount * 12).toFixed(2)}/year</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-lt-orange hover:bg-lt-orange-dark text-white font-semibold py-3 px-6 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95">
              Confirm & Buy 🔒
            </button>

            <div className="mt-4 text-center text-xs text-gray-400 space-y-1">
              <p>🔒 SSL encrypted checkout</p>
              <p>🇫🇮 Finnish data residency (GDPR)</p>
              <p>✅ 14-day cooling-off period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
