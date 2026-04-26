// ===========================================================================
// Premium Calculator Tests
//
// DEMO MOMENT 3 — Agentic triage loop
// -------------------------------------------------------
// These tests validate Finnish insurance premium tax logic.
//
// Finnish law (vakuutusmaksuverolaki):
//   • Non-life insurance: 24% tax (home, car, travel, pet)
//   • Life & health insurance: 0% tax (exempt)
//
// The bug to introduce in the `vat-bug` branch:
//   getInsuranceTaxRate() incorrectly returns 0.20 for all policies instead
//   of 0.24 for non-life — causing ~€0.50–€2/month undercharging per policy.
// ===========================================================================

import {
  getInsuranceTaxRate,
  monthlyPremiumWithTax,
  annualPremiumWithTax,
  getPolicyById,
  policies,
} from "../src/data/policies";

describe("getInsuranceTaxRate", () => {
  it("returns 24% for non-life insurance (home)", () => {
    const policy = getPolicyById("home-apartment")!;
    expect(getInsuranceTaxRate(policy)).toBe(0.24);
  });

  it("returns 24% for non-life insurance (car)", () => {
    const policy = getPolicyById("car-basic")!;
    expect(getInsuranceTaxRate(policy)).toBe(0.24);
  });

  it("returns 24% for travel insurance", () => {
    const policy = getPolicyById("travel-single")!;
    expect(getInsuranceTaxRate(policy)).toBe(0.24);
  });

  it("returns 24% for pet insurance", () => {
    const policy = getPolicyById("pet-dog")!;
    expect(getInsuranceTaxRate(policy)).toBe(0.24);
  });

  it("returns 0% for life insurance (exempt)", () => {
    const policy = getPolicyById("life-term")!;
    expect(getInsuranceTaxRate(policy)).toBe(0);
  });

  it("returns 0% for health insurance (exempt)", () => {
    const policy = getPolicyById("health-personal")!;
    expect(getInsuranceTaxRate(policy)).toBe(0);
  });
});

describe("monthlyPremiumWithTax", () => {
  it("adds 24% tax to home-apartment (€12.50 → €15.50)", () => {
    const policy = getPolicyById("home-apartment")!;
    // 12.50 * 1.24 = 15.50
    expect(monthlyPremiumWithTax(policy)).toBeCloseTo(15.5, 2);
  });

  it("adds 24% tax to car-comprehensive (€38.50 → €47.74)", () => {
    const policy = getPolicyById("car-comprehensive")!;
    // 38.50 * 1.24 = 47.74
    expect(monthlyPremiumWithTax(policy)).toBeCloseTo(47.74, 2);
  });

  it("does NOT add tax to life-term (€10.00 → €10.00)", () => {
    const policy = getPolicyById("life-term")!;
    expect(monthlyPremiumWithTax(policy)).toBeCloseTo(10.0, 2);
  });

  it("does NOT add tax to health-family (€28.00 → €28.00)", () => {
    const policy = getPolicyById("health-family")!;
    expect(monthlyPremiumWithTax(policy)).toBeCloseTo(28.0, 2);
  });
});

describe("annualPremiumWithTax", () => {
  it("is exactly 12x the monthly premium with tax", () => {
    policies.forEach((policy) => {
      expect(annualPremiumWithTax(policy)).toBeCloseTo(
        monthlyPremiumWithTax(policy) * 12,
        5
      );
    });
  });
});

describe("policy catalogue integrity", () => {
  it("all non-life policies have isLifeOrHealth = false", () => {
    const nonLifeTypes = ["home", "car", "travel", "pet"];
    policies
      .filter((p) => nonLifeTypes.includes(p.type))
      .forEach((p) => {
        expect(p.isLifeOrHealth).toBe(false);
      });
  });

  it("all life/health policies have isLifeOrHealth = true", () => {
    const lifeTypes = ["life", "health"];
    policies
      .filter((p) => lifeTypes.includes(p.type))
      .forEach((p) => {
        expect(p.isLifeOrHealth).toBe(true);
      });
  });

  it("every policy has at least one coverage highlight", () => {
    policies.forEach((p) => {
      expect(p.coverageHighlights.length).toBeGreaterThan(0);
    });
  });

  it("every policy has a positive monthly premium", () => {
    policies.forEach((p) => {
      expect(p.monthlyPremium).toBeGreaterThan(0);
    });
  });
});
