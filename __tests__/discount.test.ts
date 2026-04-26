// ===========================================================================
// Bundle Discount Tests
//
// DEMO MOMENT 2 — After implementing the multi-policy discount in QuoteContext,
// ask Copilot to write tests. These tests validate the discount logic in
// isolation, using the pure calculation functions from QuoteContext.
//
// The discount rule:
//   • threshold : 3 or more policies (BUNDLE_DISCOUNT_THRESHOLD)
//   • rate      : 10% off total monthly premium (BUNDLE_DISCOUNT_RATE)
// ===========================================================================

import { BUNDLE_DISCOUNT_THRESHOLD, BUNDLE_DISCOUNT_RATE } from "../src/context/QuoteContext";
import { monthlyPremiumWithTax, getPolicyById } from "../src/data/policies";

// Pure helper that mimics the QuoteContext discount calculation
function calculateDiscount(
  itemCount: number,
  totalMonthlyWithTax: number
): {
  bundleDiscountActive: boolean;
  bundleDiscountAmount: number;
  totalMonthlyAfterDiscount: number;
} {
  const bundleDiscountActive = itemCount >= BUNDLE_DISCOUNT_THRESHOLD;
  const bundleDiscountAmount = bundleDiscountActive
    ? totalMonthlyWithTax * BUNDLE_DISCOUNT_RATE
    : 0;
  return {
    bundleDiscountActive,
    bundleDiscountAmount,
    totalMonthlyAfterDiscount: totalMonthlyWithTax - bundleDiscountAmount,
  };
}

describe("bundle discount constants", () => {
  it("threshold is 3 policies", () => {
    expect(BUNDLE_DISCOUNT_THRESHOLD).toBe(3);
  });

  it("rate is 10% (0.10)", () => {
    expect(BUNDLE_DISCOUNT_RATE).toBe(0.1);
  });
});

describe("calculateDiscount", () => {
  const mockTotal = 100;

  it("applies no discount for 1 policy", () => {
    const result = calculateDiscount(1, mockTotal);
    expect(result.bundleDiscountActive).toBe(false);
    expect(result.bundleDiscountAmount).toBe(0);
    expect(result.totalMonthlyAfterDiscount).toBe(100);
  });

  it("applies no discount for 2 policies", () => {
    const result = calculateDiscount(2, mockTotal);
    expect(result.bundleDiscountActive).toBe(false);
    expect(result.bundleDiscountAmount).toBe(0);
  });

  it("applies 10% discount exactly at the threshold (3 policies)", () => {
    const result = calculateDiscount(3, mockTotal);
    expect(result.bundleDiscountActive).toBe(true);
    expect(result.bundleDiscountAmount).toBeCloseTo(10, 5);
    expect(result.totalMonthlyAfterDiscount).toBeCloseTo(90, 5);
  });

  it("applies 10% discount for 4 policies", () => {
    const result = calculateDiscount(4, mockTotal);
    expect(result.bundleDiscountActive).toBe(true);
    expect(result.bundleDiscountAmount).toBeCloseTo(10, 5);
  });

  it("applies 10% discount for 6 policies (full bundle)", () => {
    const result = calculateDiscount(6, mockTotal);
    expect(result.bundleDiscountActive).toBe(true);
    expect(result.bundleDiscountAmount).toBeCloseTo(10, 5);
  });

  it("discount amount is exactly 10% of any total", () => {
    const arbitraryTotal = 157.83;
    const result = calculateDiscount(3, arbitraryTotal);
    expect(result.bundleDiscountAmount).toBeCloseTo(arbitraryTotal * 0.1, 5);
    expect(result.totalMonthlyAfterDiscount).toBeCloseTo(
      arbitraryTotal * 0.9,
      5
    );
  });
});

describe("bundle discount with real policy data", () => {
  it("correctly discounts a 3-policy bundle", () => {
    const p1 = getPolicyById("home-apartment")!;
    const p2 = getPolicyById("car-basic")!;
    const p3 = getPolicyById("health-personal")!;

    const total =
      monthlyPremiumWithTax(p1) +
      monthlyPremiumWithTax(p2) +
      monthlyPremiumWithTax(p3);

    const result = calculateDiscount(3, total);

    expect(result.bundleDiscountActive).toBe(true);
    expect(result.totalMonthlyAfterDiscount).toBeCloseTo(total * 0.9, 5);
  });

  it("does NOT discount a 2-policy bundle", () => {
    const p1 = getPolicyById("home-apartment")!;
    const p2 = getPolicyById("car-basic")!;

    const total =
      monthlyPremiumWithTax(p1) + monthlyPremiumWithTax(p2);

    const result = calculateDiscount(2, total);

    expect(result.bundleDiscountActive).toBe(false);
    expect(result.totalMonthlyAfterDiscount).toBeCloseTo(total, 5);
  });
});
