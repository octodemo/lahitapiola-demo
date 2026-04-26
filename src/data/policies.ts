// ===========================================================================
// LähiTapiola — Insurance Policy Catalogue
// ===========================================================================
//
// DEMO MOMENT 1 — Codebase understanding & change impact
// -------------------------------------------------------
// Try asking Copilot: "If I change the monthlyPremium field to an object with
// base + addons, what files would be affected?"
//
// Expected trace:
//   1. policies.ts            — data definition (here)
//   2. PolicyCard.tsx         — displays premium in the browse grid
//   3. policies/[id]/page.tsx — shows premium on detail page + calculates annual
//   4. QuoteContext.tsx        — stores premium in quote state
//   5. quote/page.tsx         — sums premiums for quote total + discount logic
// ===========================================================================

export type PolicyType = "home" | "car" | "health" | "life" | "travel" | "pet";

export interface Policy {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  type: PolicyType;
  /** Base monthly premium in euros (before tax) */
  monthlyPremium: number;
  emoji: string;
  bgColor: string;
  textColor: string;
  coverageHighlights: string[];
  featured?: boolean;
  /**
   * Life and health policies are exempt from Finnish insurance premium tax.
   * Non-life policies (home, car, travel, pet) are subject to 24% tax.
   */
  isLifeOrHealth: boolean;
}

export const policies: Policy[] = [
  // ── HOME ──────────────────────────────────────────────────────────────────
  {
    id: "home-apartment",
    title: "Apartment Insurance",
    shortTitle: "Apartment",
    description:
      "Full coverage for your apartment — contents, liability and sudden damage protection included.",
    type: "home",
    monthlyPremium: 12.5,
    emoji: "🏠",
    bgColor: "#E8F4FD",
    textColor: "#003876",
    coverageHighlights: ["Contents up to €50 000", "Liability €200 000", "Water damage", "Theft"],
    featured: true,
    isLifeOrHealth: false,
  },
  {
    id: "home-house",
    title: "House & Property Insurance",
    shortTitle: "House",
    description:
      "Comprehensive cover for your home and outbuildings — structures, contents and personal liability.",
    type: "home",
    monthlyPremium: 18.9,
    emoji: "🏡",
    bgColor: "#D6EAF8",
    textColor: "#003876",
    coverageHighlights: ["Building up to €300 000", "Contents €80 000", "Storm & flood", "Legal expenses"],
    isLifeOrHealth: false,
  },

  // ── CAR ───────────────────────────────────────────────────────────────────
  {
    id: "car-basic",
    title: "Basic Motor Insurance",
    shortTitle: "Motor Basic",
    description:
      "Statutory third-party liability cover — the legal minimum to drive in Finland.",
    type: "car",
    monthlyPremium: 22.0,
    emoji: "🚗",
    bgColor: "#EAF2FF",
    textColor: "#003876",
    coverageHighlights: ["Third-party liability", "Bodily injury cover", "Property damage €5 000 000", "24/7 claims line"],
    featured: true,
    isLifeOrHealth: false,
  },
  {
    id: "car-comprehensive",
    title: "Comprehensive Motor Insurance",
    shortTitle: "Motor Full",
    description:
      "Complete protection for your vehicle — own damage, theft, fire and roadside assistance.",
    type: "car",
    monthlyPremium: 38.5,
    emoji: "🚙",
    bgColor: "#DDEEFF",
    textColor: "#003876",
    coverageHighlights: ["Own damage", "Theft & fire", "Windscreen", "Roadside assistance 24/7", "Replacement vehicle"],
    isLifeOrHealth: false,
  },

  // ── HEALTH ────────────────────────────────────────────────────────────────
  {
    id: "health-personal",
    title: "Personal Health Insurance",
    shortTitle: "Health Personal",
    description:
      "Fast access to private specialist care, diagnostics and treatments without waiting lists.",
    type: "health",
    monthlyPremium: 15.0,
    emoji: "❤️",
    bgColor: "#E8F8F2",
    textColor: "#00695C",
    coverageHighlights: ["Specialist consultations", "Diagnostics & imaging", "Outpatient surgery", "Mental health support"],
    featured: true,
    isLifeOrHealth: true,
  },
  {
    id: "health-family",
    title: "Family Health Insurance",
    shortTitle: "Health Family",
    description:
      "Covers the whole family with one policy — children, parents and step-family included.",
    type: "health",
    monthlyPremium: 28.0,
    emoji: "👨‍👩‍👧",
    bgColor: "#D5F5E3",
    textColor: "#00695C",
    coverageHighlights: ["Up to 6 family members", "Paediatric specialist", "Dental emergencies", "Annual health check"],
    isLifeOrHealth: true,
  },

  // ── LIFE ──────────────────────────────────────────────────────────────────
  {
    id: "life-term",
    title: "Term Life Insurance",
    shortTitle: "Life Term",
    description:
      "Fixed-term cover that pays a lump sum to your family if you pass away during the policy period.",
    type: "life",
    monthlyPremium: 10.0,
    emoji: "🛡️",
    bgColor: "#EEF2FA",
    textColor: "#1A237E",
    coverageHighlights: ["Sum insured up to €500 000", "10–30 year terms", "Fixed premium", "Tax-free payout"],
    isLifeOrHealth: true,
  },
  {
    id: "life-whole",
    title: "Whole-of-Life Insurance",
    shortTitle: "Life Whole",
    description:
      "Permanent life cover with a savings component — guaranteed payout whenever you pass away.",
    type: "life",
    monthlyPremium: 25.0,
    emoji: "💎",
    bgColor: "#E8EAF6",
    textColor: "#1A237E",
    coverageHighlights: ["Lifelong cover", "Savings accumulation", "Loan collateral option", "Flexible premium holidays"],
    isLifeOrHealth: true,
  },

  // ── TRAVEL ────────────────────────────────────────────────────────────────
  {
    id: "travel-single",
    title: "Single-Trip Travel Insurance",
    shortTitle: "Travel Single",
    description:
      "Peace of mind for a single journey — medical emergencies, cancellation and baggage included.",
    type: "travel",
    monthlyPremium: 9.9,
    emoji: "✈️",
    bgColor: "#FFF8E1",
    textColor: "#E65100",
    coverageHighlights: ["Medical expenses €100 000", "Trip cancellation", "Baggage loss €1 500", "Travel delay"],
    featured: true,
    isLifeOrHealth: false,
  },
  {
    id: "travel-annual",
    title: "Annual Travel Insurance",
    shortTitle: "Travel Annual",
    description:
      "Unlimited trips anywhere in the world for a full year — best value for frequent travellers.",
    type: "travel",
    monthlyPremium: 19.9,
    emoji: "🌍",
    bgColor: "#FFF3E0",
    textColor: "#E65100",
    coverageHighlights: ["Unlimited trips worldwide", "Medical €200 000", "Baggage €3 000", "Adventure sports cover"],
    isLifeOrHealth: false,
  },

  // ── PET ───────────────────────────────────────────────────────────────────
  {
    id: "pet-dog",
    title: "Dog Insurance",
    shortTitle: "Dog",
    description:
      "Comprehensive cover for your dog — vet fees, third-party liability and theft protection.",
    type: "pet",
    monthlyPremium: 14.0,
    emoji: "🐕",
    bgColor: "#FDF2E9",
    textColor: "#784212",
    coverageHighlights: ["Vet fees €5 000/year", "Third-party liability", "Theft & straying", "Dental treatment"],
    isLifeOrHealth: false,
  },
  {
    id: "pet-cat",
    title: "Cat Insurance",
    shortTitle: "Cat",
    description:
      "Affordable cover for your cat — vet bills, illness and accident protection.",
    type: "pet",
    monthlyPremium: 9.0,
    emoji: "🐱",
    bgColor: "#FDEBD0",
    textColor: "#784212",
    coverageHighlights: ["Vet fees €3 000/year", "Illness & accidents", "Surgical procedures", "Post-op care"],
    isLifeOrHealth: false,
  },
];

// ===========================================================================
// Premium calculation utilities
//
// Finnish insurance premium tax (vakuutusmaksuverolaki):
//   • Non-life insurance: 24 %  (home, car, travel, pet)
//   • Life & health insurance:   0 %
// ===========================================================================

/** Returns the applicable insurance tax rate for a policy. */
export function getInsuranceTaxRate(policy: Policy): number {
  // BUG: Flat 20% rate applied to all policies.
  // This is incorrect — Finnish law requires 24% for non-life insurance
  // and 0% for life/health. This causes ~€0.50–€2/month undercharging per policy.
  return 0.2;
}

/** Returns the monthly premium including Finnish insurance tax. */
export function monthlyPremiumWithTax(policy: Policy): number {
  const taxRate = getInsuranceTaxRate(policy);
  return policy.monthlyPremium * (1 + taxRate);
}

/** Returns the annual premium including Finnish insurance tax. */
export function annualPremiumWithTax(policy: Policy): number {
  return monthlyPremiumWithTax(policy) * 12;
}

// ===========================================================================
// Catalogue helpers
// ===========================================================================

export const policyTypes: PolicyType[] = [
  "home", "car", "health", "life", "travel", "pet",
];

export const policyTypeLabels: Record<PolicyType, string> = {
  home: "Home",
  car: "Car",
  health: "Health",
  life: "Life",
  travel: "Travel",
  pet: "Pet",
};

export const policyTypeEmojis: Record<PolicyType, string> = {
  home: "🏠",
  car: "🚗",
  health: "❤️",
  life: "🛡️",
  travel: "✈️",
  pet: "🐾",
};

export const getPolicyById = (id: string): Policy | undefined =>
  policies.find((p) => p.id === id);

export const getPoliciesByType = (type: PolicyType): Policy[] =>
  policies.filter((p) => p.type === type);

export const getFeaturedPolicies = (): Policy[] =>
  policies.filter((p) => p.featured);
