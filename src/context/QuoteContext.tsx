"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Policy, monthlyPremiumWithTax } from "@/data/policies";

export interface QuoteItem {
  policy: Policy;
  /** Insured person / object name, e.g. "John Smith" or "2024 Toyota Corolla" */
  insuredName: string;
}

// ===========================================================================
// DEMO MOMENT 2 — Feature implementation + tests
// -------------------------------------------------------
// TODO: Implement a multi-policy bundle discount.
//   • When the quote contains 3 or more policies, apply a 10% discount to
//     the total monthly premium.
//   • Wire the discount into `totalMonthlyWithTax` below.
//   • After implementing, ask Copilot to write tests in
//     __tests__/discount.test.ts
// ===========================================================================

export const BUNDLE_DISCOUNT_THRESHOLD = 3;
export const BUNDLE_DISCOUNT_RATE = 0.1; // 10 %

interface QuoteContextType {
  items: QuoteItem[];
  addItem: (policy: Policy, insuredName: string) => void;
  removeItem: (policyId: string) => void;
  clearQuote: () => void;
  totalItems: number;
  /** Sum of all monthly premiums (inc. tax, before any discount). */
  totalMonthlyWithTax: number;
  /** True when the bundle discount is active. */
  bundleDiscountActive: boolean;
  /** Monthly savings from the bundle discount (0 when not active). */
  bundleDiscountAmount: number;
  /** Final monthly total after discount. */
  totalMonthlyAfterDiscount: number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);

  const addItem = (policy: Policy, insuredName: string) => {
    setItems((prev) => {
      if (prev.find((i) => i.policy.id === policy.id)) return prev;
      return [...prev, { policy, insuredName }];
    });
  };

  const removeItem = (policyId: string) => {
    setItems((prev) => prev.filter((i) => i.policy.id !== policyId));
  };

  const clearQuote = () => setItems([]);

  const totalItems = items.length;

  const totalMonthlyWithTax = items.reduce(
    (sum, item) => sum + monthlyPremiumWithTax(item.policy),
    0
  );

  const bundleDiscountActive = totalItems >= BUNDLE_DISCOUNT_THRESHOLD;
  const bundleDiscountAmount = bundleDiscountActive
    ? totalMonthlyWithTax * BUNDLE_DISCOUNT_RATE
    : 0;
  const totalMonthlyAfterDiscount = totalMonthlyWithTax - bundleDiscountAmount;

  return (
    <QuoteContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearQuote,
        totalItems,
        totalMonthlyWithTax,
        bundleDiscountActive,
        bundleDiscountAmount,
        totalMonthlyAfterDiscount,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}
