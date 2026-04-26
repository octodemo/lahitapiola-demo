"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import {
  getPolicyById,
  monthlyPremiumWithTax,
  annualPremiumWithTax,
  getInsuranceTaxRate,
} from "@/data/policies";
import PolicyImage from "@/components/PolicyCard";
import { useQuote } from "@/context/QuoteContext";
import { FileText, Check, Shield, Info } from "lucide-react";
import Link from "next/link";

// ===========================================================================
// DEMO MOMENT 1 callout — this page is one of the 5 affected files if you
// change the premium calculation logic. Copilot can trace the full impact.
// ===========================================================================

export default function PolicyDetailPage({ params }: { params: { id: string } }) {
  const policy = getPolicyById(params.id);
  if (!policy) notFound();

  const { addItem, items } = useQuote();
  const [insuredName, setInsuredName] = useState("");
  const [added, setAdded] = useState(false);

  const alreadyInQuote = items.some((i) => i.policy.id === policy.id);

  const handleAddToQuote = () => {
    addItem(policy, insuredName || "Not specified");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const taxRate = getInsuranceTaxRate(policy);
  const monthlyTotal = monthlyPremiumWithTax(policy);
  const annualTotal = annualPremiumWithTax(policy);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-lt-navy">Home</Link>
        <span>/</span>
        <Link href="/policies" className="hover:text-lt-navy">Insurance</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium capitalize">{policy.type}</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">{policy.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Left: Policy visual + highlights */}
        <div className="space-y-6">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <PolicyImage policy={policy} size="lg" />
          </div>

          {/* Coverage highlights */}
          <div className="bg-lt-cream rounded-2xl p-6">
            <h3 className="font-bold text-lt-navy mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              What's covered
            </h3>
            <ul className="space-y-2">
              {policy.coverageHighlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-lt-teal flex-shrink-0 mt-0.5" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Quote builder */}
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-lt-teal bg-green-50 px-3 py-1 rounded-full mb-3 capitalize">
            {policy.type} Insurance
          </span>
          <h1 className="text-3xl font-black text-gray-900 mb-2">{policy.title}</h1>
          <p className="text-gray-500 mb-5 leading-relaxed">{policy.description}</p>

          {/* Pricing breakdown */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 shadow-sm">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl font-black text-lt-navy">
                €{monthlyTotal.toFixed(2)}
              </span>
              <span className="text-gray-400 text-sm">/month incl. tax</span>
            </div>
            <div className="space-y-1 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Base premium</span>
                <span className="font-medium">€{policy.monthlyPremium.toFixed(2)}/mo</span>
              </div>
              <div className="flex justify-between">
                <span>
                  Insurance tax
                  {taxRate === 0 ? " (exempt)" : ` (${(taxRate * 100).toFixed(0)}%)`}
                </span>
                <span className="font-medium">
                  {taxRate === 0 ? "€0.00" : `€${(policy.monthlyPremium * taxRate).toFixed(2)}`}/mo
                </span>
              </div>
              <div className="flex justify-between border-t pt-2 font-semibold text-gray-700">
                <span>Annual total</span>
                <span className="text-lt-navy">€{annualTotal.toFixed(2)}/year</span>
              </div>
            </div>
            {taxRate > 0 && (
              <div className="flex items-start gap-1.5 mt-3 text-xs text-gray-400 bg-gray-50 rounded-lg p-2">
                <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>
                  Finnish insurance premium tax ({(taxRate * 100).toFixed(0)}%) applies to
                  non-life insurance under Finnish law (vakuutusmaksuverolaki).
                </span>
              </div>
            )}
          </div>

          {/* Insured name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Who or what is being insured? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              placeholder={
                policy.type === "car"
                  ? "e.g. 2022 Volvo XC60, reg ABC-123"
                  : policy.type === "pet"
                  ? "e.g. Max, Golden Retriever"
                  : "e.g. Matti Virtanen / Home address"
              }
              value={insuredName}
              onChange={(e) => setInsuredName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lt-navy focus:border-transparent transition-all"
            />
          </div>

          {/* Add to quote */}
          <button
            onClick={handleAddToQuote}
            disabled={alreadyInQuote}
            className={`w-full flex items-center justify-center gap-3 text-base font-semibold py-3 px-6 rounded-full transition-all shadow-md active:scale-95 ${
              added
                ? "bg-lt-teal text-white shadow-green-200"
                : alreadyInQuote
                ? "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                : "bg-lt-orange hover:bg-lt-orange-dark text-white hover:shadow-lg"
            }`}
          >
            {added ? (
              <>
                <Check className="w-5 h-5" />
                Added to Quote!
              </>
            ) : alreadyInQuote ? (
              <>
                <Check className="w-5 h-5" />
                Already in your quote
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Add to Quote — €{monthlyTotal.toFixed(2)}/mo
              </>
            )}
          </button>

          {(added || alreadyInQuote) && (
            <Link
              href="/quote"
              className="block text-center text-lt-navy font-semibold text-sm mt-3 hover:underline"
            >
              View My Quote →
            </Link>
          )}

          {/* Guarantee */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
            <p>🔒 <strong>Data protected</strong> — GDPR compliant, Finnish data residency</p>
            <p>✅ <strong>14-day cooling-off period</strong> — cancel without penalty</p>
            <p>⚡ <strong>Instant cover</strong> — policy starts same day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
