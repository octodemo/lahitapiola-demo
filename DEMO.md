# LähiTapiola Demo Script — GitHub Copilot

> **Audience:** Engineering leadership / senior engineers  
> **Duration:** ~30–40 minutes  
> **Goal:** Show how GitHub Copilot accelerates real development work on a realistic codebase — codebase understanding, feature implementation with tests, and agentic incident triage

---

## Overview

This demo uses a Finnish insurance buying app to showcase three distinct Copilot capabilities. The app has a real Next.js architecture, TypeScript types, React Context state, a Jest test suite, and a CI pipeline — similar to what you'd find in a production codebase.

The three moments are designed to escalate in ambition:

| # | Moment | What it shows |
|---|--------|---------------|
| 1 | Codebase understanding + change impact | Copilot reads your whole codebase, not just one file |
| 2 | Implement feature + write tests | Copilot as a coding collaborator, not just autocomplete |
| 3 | Agentic triage loop | Copilot detects a CI failure, diagnoses the bug, and fixes it autonomously |

---

## Pre-Demo Setup Checklist

Do this **before** the call starts:

- [ ] `cd lahitapiola-demo && npm run dev` — confirm app at http://localhost:3000
- [ ] Open VS Code with the `lahitapiola-demo` folder
- [ ] Open these files in tabs, ready to switch to:
  - `src/data/policies.ts`
  - `src/app/quote/page.tsx`
  - `src/context/QuoteContext.tsx`
  - `__tests__/premiumCalculator.test.ts`
- [ ] Enable **Copilot Chat** sidebar, switch to **agent mode**
- [ ] Open http://localhost:3000 in browser (full screen)
- [ ] Open http://localhost:3000/policies in a second tab
- [ ] Open http://localhost:3000/policies/home-apartment in a third tab
- [ ] Have https://github.com/octodemo/lahitapiola-demo/pull/2 open in a browser tab (for Demo 3)
- [ ] Terminal open and ready
- [ ] Run `npm test` once to confirm 25 tests pass — shows the green baseline

---

## Demo Act 1: The App (5 minutes)

**Goal:** Ground the audience in what we're working with before touching Copilot.

### Script

> "Before we show Copilot, let me walk you through the app. It's a Finnish insurance quote platform — home, car, health, life, travel, pet. Built with Next.js 14, TypeScript, Tailwind — the kind of stack your teams use every day."

**Walk through:**

1. **Homepage** (http://localhost:3000)
   - Show the hero, category tiles, trust bar, bundle CTA
   - "Proper production structure — components, context, typed data layer"

2. **Policy catalogue** (http://localhost:3000/policies)
   - Filter by "Car" — grid updates live
   - "Client-side filtering hooked into `src/data/policies.ts`"

3. **Policy detail** (http://localhost:3000/policies/home-apartment)
   - Point out the Finnish tax breakdown (24% on non-life)
   - Type a name in the insured field, click **Add to Quote**
   - Show the quote badge counter increment in the navbar

4. **Quote summary** (http://localhost:3000/quote)
   - Add 2 more policies to trigger the bundle discount
   - Show the **10% bundle discount** appearing live
   - "The logic lives in `QuoteContext.tsx`. There's a TODO comment in `quote/page.tsx` we'll use in a moment."

---

## Demo Act 2: Codebase Understanding + Change Impact (10 minutes)

**Goal:** Show Copilot reading and reasoning across the whole codebase.

**File:** `src/data/policies.ts`  
**Hook:** The comment at the top of the file says *"DEMO MOMENT 1"*

### Step 1 — Ask Copilot to analyse impact

Open Copilot Chat (agent mode). Type:

```
If I change the monthlyPremium field on the Policy interface from a flat number
to an object { base: number; addons: number[] }, what files in this codebase
would be affected, and what would need to change in each one?
```

> **Talking point while Copilot works:** "We're not asking it to make any changes yet — we're asking it to *think*. This is critical for large codebases where a data model change can ripple unexpectedly."

Copilot should identify all 5 touch points:
1. `src/data/policies.ts` — type definition + `monthlyPremiumWithTax()` helper
2. `src/components/PolicyCard.tsx` — renders `policy.monthlyPremium` in the grid
3. `src/app/policies/[id]/page.tsx` — shows premium + tax breakdown
4. `src/context/QuoteContext.tsx` — aggregates premiums for quote total
5. `src/app/quote/page.tsx` — line items + discount calculation

### Step 2 — Follow up on one file

```
Focus on QuoteContext.tsx. Show me exactly what the totalMonthlyWithTax
calculation would look like after the change.
```

> **Talking point:** "It's not just listing files — it's reasoning about what the actual code change looks like in context. That's the difference between a search tool and a thinking collaborator."

---

## Demo Act 3: Implement Feature + Write Tests (12 minutes)

**Goal:** Show Copilot implementing a feature and writing the test suite for it.

**File:** `src/app/quote/page.tsx`  
**Hook:** Find the `TODO` comment (clearly marked *DEMO MOMENT 2*)

### Step 1 — Ask Copilot to implement

```
In src/app/quote/page.tsx, find the TODO comment about the bundle discount
line item. Add a "Bundle discount (–10%)" row to the quote breakdown table.
It should only appear when bundleDiscountActive is true, show the discount
percentage, display the saving amount in green, and align with the existing
table layout.
```

> **Talking point while Copilot works:** "Watch it read the existing JSX structure — it's picking up the Tailwind classes, the existing row pattern, the colour tokens from globals.css. It's writing *our* code, not generic code."

### Step 2 — Show the result in browser

- Refresh `/quote` with 3+ policies — the discount row appears
- "One prompt. No copy-paste. It matched the design system perfectly."

### Step 3 — Ask for tests

```
Now write tests for the bundle discount calculation in __tests__/discount.test.ts.
Cover: no discount below the threshold, discount applied at exactly 3 policies,
correct discount amount on a real policy mix, and that the threshold and rate
constants match expectations.
```

> **Talking point:** "This is the shift engineers feel most. Not just 'write code' — but 'write code *and* prove it works'. The test file already has some stubs; watch Copilot fill them in using the real policy data from `policies.ts`."

### Step 4 — Run the tests live

```bash
npm test
```

> "25 tests, all green. The implementation and the proof — in one conversation."

---

## Demo Act 4: Agentic Triage Loop (8 minutes)

**Goal:** Show the Copilot cloud agent detecting a CI failure, understanding the root cause, and fixing it autonomously.

**PR:** https://github.com/octodemo/lahitapiola-demo/pull/2

### Background (explain to audience)

> "Someone opened a PR that 'fixes' the insurance tax rate. The commit message looks fine. But our CI runs `npm test` on every PR — and it's failing. Let's see Copilot triage it."

### Step 1 — Show the failing PR

Open PR #2 in the browser. Show:
- The commit: "fix: update insurance tax rate"
- The CI check: ❌ `Unit Tests` failing
- Click into the failing check — show the test output:
  ```
  ✕ returns 24% for non-life insurance (home)
    Expected: 0.24
    Received: 0.2
  ```

> "The test is crystal clear — the function is returning 20% instead of 24%. Finnish insurance law requires 24% on non-life policies. This is a real compliance bug."

### Step 2 — Assign to Copilot agent

Open the PR in Copilot Workspace (or assign to Copilot from the Assignees panel):

> "Instead of paging an engineer at midnight, we assign this to the Copilot agent. It will read the failing test, find the broken function, fix it, and push a commit."

### Step 3 — Walk through what the agent does

While the agent works (or narrate from a pre-run result):

1. Agent reads the CI log → identifies `getInsuranceTaxRate()` in `src/data/policies.ts`
2. Sees `return 0.2` instead of `return policy.isLifeOrHealth ? 0 : 0.24`
3. Applies the fix, pushes a commit
4. CI re-runs → ✅ all 25 tests pass

> "No Slack message. No incident channel. No engineer pulled off their current task. The agent closed the loop — detected, diagnosed, fixed, verified."

### Step 4 — Key talking point

> "What makes this powerful isn't just that it fixed one bug. It's that the agent *understood why* the test was failing — it knew about Finnish insurance tax law because that context is in the codebase comments and the test descriptions. Copilot reads your domain knowledge, not just your syntax."

---

## Key Talking Points

### For Engineering Leaders

- **"Copilot reads your codebase, not just your file."** The change impact analysis in Demo 1 only works because it indexes the whole repo. This is fundamentally different from autocomplete.

- **"Tests become a first-class output, not an afterthought."** When writing tests takes seconds, engineers actually write them. That changes your quality culture.

- **"The agent works in your CI pipeline."** It's not a chatbot — it runs your tests, reads the output, and responds to it. That's a new category of automation.

- **"Your senior engineers spend less time on triage."** The agentic loop handles the routine investigation. Seniors spend their time on architecture decisions, not `git bisect`.

### For CTOs / VPs Engineering

- **Velocity:** GitHub's data shows 55% faster task completion for common development workflows.
- **Quality:** Teams using Copilot write more tests, not fewer. The tool makes testing cheaper, so it happens more.
- **Risk:** The compliance bug in Demo 3 (wrong VAT rate) would have been a real financial and regulatory risk. Automated triage catches it before it ships.
- **Adoption:** No migration required. Works in the IDE, the browser, the CI pipeline. Meets engineers where they are.

---

## Recovery Plan

### If the dev server crashes

```bash
cd lahitapiola-demo && npm run dev
```

### If Copilot produces broken TypeScript

```bash
# Reset the file
git checkout -- src/app/quote/page.tsx

# Confirm tests still pass
npm test
```

### If Copilot is slow or unresponsive

- Check https://githubstatus.com
- Walk through the pre-existing `__tests__/discount.test.ts` file and explain what *would* have been generated
- For Demo 3, show the diff of the fixed PR manually — the 1-line change is self-explanatory

### If the audience asks about something outside the demo scope

- "Great question — let me follow up after the call with a specific example"
- Don't ad-lib features live
- The change-impact analysis (Demo 1) is a great fallback — it always works and always impresses

---

## Appendix: All Copilot Prompts (Quick Reference)

### Demo 2 — Change Impact

```
If I change the monthlyPremium field on the Policy interface from a flat number
to an object { base: number; addons: number[] }, what files in this codebase
would be affected, and what would need to change in each one?
```

```
Focus on QuoteContext.tsx. Show me exactly what the totalMonthlyWithTax
calculation would look like after the change.
```

### Demo 3 — Feature + Tests

```
In src/app/quote/page.tsx, find the TODO comment about the bundle discount
line item. Add a "Bundle discount (–10%)" row to the quote breakdown table.
It should only appear when bundleDiscountActive is true, show the discount
percentage, display the saving amount in green, and align with the existing
table layout.
```

```
Now write tests for the bundle discount calculation in __tests__/discount.test.ts.
Cover: no discount below the threshold, discount applied at exactly 3 policies,
correct discount amount on a real policy mix, and that the threshold and rate
constants match expectations.
```


> **Audience:** Moonpig Engineering Leadership  
> **Duration:** ~30–40 minutes  
> **Goal:** Show how GitHub Copilot accelerates real feature development on a realistic codebase

---

## Overview

This demo uses a Moonpig-inspired greeting card e-commerce app to showcase GitHub Copilot's capabilities — specifically **Copilot in the IDE (agent mode)** and the **Copilot cloud agent**. The app is intentionally realistic: it has brand colours, a proper component structure, TypeScript, and mock data — just like you'd find in a real product codebase.

Two features have been left as TODOs in the code. We'll implement them live using Copilot, showing:

1. How Copilot understands codebase context (not just autocomplete)
2. How agent mode reasons, plans, and makes multi-file edits
3. How the cloud agent can run async in the background
4. How engineers can iterate naturally with Copilot in conversation

---

## Pre-Demo Setup Checklist

Do this **before** the call starts:

- [ ] `cd moonpig-demo && npm run dev` — confirm app is running at http://localhost:3000
- [ ] Open VS Code with the `moonpig-demo` folder
- [ ] Open the following files in tabs, ready to switch to:
  - `src/app/cards/[id]/page.tsx`
  - `src/app/basket/page.tsx`
  - `src/data/cards.ts`
- [ ] Enable **Copilot Chat** panel (sidebar)
- [ ] Make sure **agent mode** is enabled in Copilot Chat
- [ ] Browser open at http://localhost:3000 (full screen, not a small window)
- [ ] Have http://localhost:3000/cards/birthday-sis open in a second tab
- [ ] Have http://localhost:3000/basket open in a third tab
- [ ] Terminal open and ready (for git commands + `npm run dev`)
- [ ] Know your recovery commands (see Recovery Plan section below)
- [ ] Confirm `demo-backup` branch exists: `git branch -a | grep demo-backup`

---

## Demo Act 1: The App (5 minutes)

**Goal:** Ground the audience in what we've built before showing Copilot.

### Script

> "So before we dive into Copilot, let me show you what we're working with. This is a greeting card e-commerce app — think Moonpig. It's built with Next.js 14, TypeScript, and Tailwind. Real stack, real structure."

**Walk through:**

1. **Homepage** (http://localhost:3000)
   - Point out the hero section, category grid, trending cards
   - "This is the kind of polished UI your front-end teams build every day."

2. **Cards listing** (http://localhost:3000/cards)
   - Filter by occasion (Birthday), show it updating live
   - "Filtering is client-side, hook into the mock data in `src/data/cards.ts`."

3. **Card detail** (http://localhost:3000/cards/birthday-sis)
   - Type something in the message field — show live preview appearing
   - Add to basket
   - "Notice the live message preview. Already pretty polished — but there's a TODO we left here intentionally."

4. **Basket** (http://localhost:3000/basket)
   - Show the items, quantities, order total
   - "And another TODO here. Let's fix both of these — with Copilot."

---

## Demo Act 2: Gift Add-ons with Copilot Agent Mode (12 minutes)

**Goal:** Show Copilot agent mode understanding context and making multi-step edits.

**File:** `src/app/cards/[id]/page.tsx`  
**TODO:** `// TODO: Add Copilot-suggested add-ons (e.g. gift wrap, balloon)`

### Step 1 — Ask Copilot to plan first

Open Copilot Chat (agent mode). Type:

```
Before you make any changes, explain your plan for adding a gift add-ons section to the card personalise page.
```

> **Talking point:** "Notice we're asking it to *plan* before acting. This is great for building trust with the team — you can review what it's about to do before it changes anything. This is different from just autocomplete."

Let Copilot explain its approach. It should mention:
- Where it'll add the UI (below the message input)
- What state it needs (selected add-ons)
- How it'll affect the basket total

### Step 2 — Implement with the detailed prompt

Once the plan looks good, follow up with:

```
Add a gift add-ons section below the message input on the card personalise page. Show three options: Gift Wrap (£1.99), Balloon (£3.99), and Chocolates (£5.99). Each should have an emoji, name, price, and a toggle to select it. Selected add-ons should be reflected in the basket total. Use the existing pink brand colour (#E8175D) and Tailwind classes consistent with the rest of the page.
```

> **Talking point while Copilot works:** "Watch how it's reading the existing component — it knows about the `useBasket` hook, the Tailwind classes already in use, the TypeScript types. It's not working in isolation, it understands the codebase."

### Step 3 — Show the result

- Switch to the browser, refresh `/cards/birthday-sis`
- Toggle Gift Wrap and Balloon on
- Show the price updating in the "Add to Basket" button

> **Talking point:** "That took about 60 seconds. A junior engineer might spend half a day on that — getting the design right, the state management, the TypeScript types, hooking it into the basket. Copilot did it in one prompt."

### Step 4 — Iterate naturally (conversational follow-up)

```
I want to upsell customers on the card detail page. Can you add a 'Make it extra special' section header above the add-ons, and make selected add-ons show a checkmark and a highlighted border?
```

> **Talking point:** "This is the shift — from autocomplete to a genuine collaborator. You can have a back-and-forth. Ask it to refine, iterate, improve. That's what makes this different."

---

## Demo Act 3: Promo Code with Copilot (10 minutes)

**Goal:** Show iteration and a more conversational flow.

**File:** `src/app/basket/page.tsx`  
**TODO:** `// TODO: Add promo code field`

### Step 1 — Full feature prompt

```
Add a promo code input field to the basket page order summary. Support two codes: MOONPIG10 for 10% off, and WELCOME5 for £5 off. Show a success or error message after applying. Deduct the discount from the order total and allow the user to remove the applied code.
```

> **Talking point:** "Same pattern — one prompt, multi-step implementation. Watch it handle the state for applied/rejected codes, the validation logic, and the UI all at once."

### Step 2 — Show the result

- Switch to browser, go to `/basket`
- Type `MOONPIG10`, click Apply — show the 10% discount appearing
- Try `BADCODE` — show the error message
- Remove the code — show total resetting

### Step 3 — Iterate on tone/design

```
The promo code works but the success message isn't very Moonpig. Make it more playful — add a confetti emoji 🎉 and make it feel more celebratory when a valid code is applied.
```

> **Talking point:** "This is something that usually falls through the cracks in sprints — the micro-UX, the copy, the personality. With Copilot you can iterate on it in seconds. The designer says 'make it more fun' and you can do it right there in the review."

---

## Demo Act 4: Cloud Agent — Async Backup (5 minutes)

**Goal:** Show the Copilot cloud agent for async, background work.

> **Talking point:** "Everything we've shown so far is Copilot in the IDE — synchronous, you're watching it work. But there's another mode: the cloud agent. You assign it a GitHub Issue and it works in the background, opens a PR, runs CI. Your engineers don't even have to be at their desk."

### How to demo this

1. Go to https://github.com/octodemo/moonpig-demo/issues
2. Create a new issue (or show a pre-created one):

**Example issue title:** `Add a "Recently Viewed" section to the homepage`

**Example issue body:**
```
On the homepage, below the Trending Now section, add a "Recently Viewed" section that shows the last 3 cards the user has viewed. 

- Track viewed cards in localStorage
- Show up to 3 cards in the same ProductCard component style
- Section should only appear if at least one card has been viewed
- Use the same pink/white brand styling
```

3. Assign the issue to **Copilot** (using the Assignees field)
4. Watch it start working — explain what's happening:

> "The cloud agent picks this up, clones the repo into a sandboxed environment, understands the codebase, implements the feature, runs the build, and opens a pull request. All without anyone writing a line of code."

5. If a PR already exists from a previous run, show it:
   - Show the diff
   - Show that it used the right components, the right patterns
   - "It read the existing code. It used `ProductCard`. It followed the Tailwind conventions. It didn't just write something generic — it wrote *Moonpig* code."

---

## Key Talking Points

### For Engineering Leaders

- **"This isn't replacing engineers — it's removing the friction."** Copilot handles boilerplate, state wiring, type definitions. Engineers focus on architecture, product decisions, code review.

- **"The quality bar is set by your codebase."** Copilot learns from your patterns. It used `#E8175D` because that's already in the code. It used `BasketContext` because that's your abstraction.

- **"Iteration speed changes the conversation with product."** When changes take minutes instead of days, you can say yes to more experiments. That changes how product and engineering work together.

- **"Your juniors level up faster."** A junior engineer with Copilot can implement features that used to require senior guidance. The gap narrows.

- **"The cloud agent is async leverage."** While your team is in sprint ceremonies, Copilot is already working on the next ticket. PRs are ready for review when engineers sit down.

### For CTOs / VPs

- **ROI framing:** GitHub's internal data shows 55% faster task completion for common development tasks.
- **Adoption:** Copilot is additive — no migration, no new infra, works in the IDE your team already uses.
- **Security:** Code stays in your environment. The cloud agent works in an isolated sandbox.
- **Enterprise controls:** Policy controls for which files/repos Copilot can access. Audit logs. SSO integration.

---

## Recovery Plan

### If the dev server crashes

```bash
cd moonpig-demo
npm run dev
```

### If Copilot produces broken TypeScript

```bash
# Reset a single file
git checkout -- src/app/cards/[id]/page.tsx

# Or reset the basket
git checkout -- src/app/basket/page.tsx
```

### If everything goes wrong — switch to demo-backup branch

```bash
git stash
git checkout demo-backup
npm run dev
```

The `demo-backup` branch has **both features already implemented**. Navigate the app as if you just built it live.

> Narrate: "Let me just show you what the finished version looks like — this is what Copilot would produce."

### If Copilot is slow or unresponsive

- Check https://githubstatus.com for any incidents
- Switch to the `demo-backup` branch and walk through the pre-built code
- Show the code Copilot *would have* written: "Here's exactly the kind of output you'd get"

### If the audience asks about something Copilot can't do live

- "Great question — let me show you after the call / in a follow-up"
- Don't ad-lib new features live unless you're confident
- The cloud agent demo is great for showing scope beyond the IDE

---

## Appendix: All Copilot Prompts (Quick Reference)

### Gift Add-ons

**Plan first:**
```
Before you make any changes, explain your plan for adding a gift add-ons section to the card personalise page.
```

**Implement (detailed):**
```
Add a gift add-ons section below the message input on the card personalise page. Show three options: Gift Wrap (£1.99), Balloon (£3.99), and Chocolates (£5.99). Each should have an emoji, name, price, and a toggle to select it. Selected add-ons should be reflected in the basket total. Use the existing pink brand colour (#E8175D) and Tailwind classes consistent with the rest of the page.
```

**Iterate:**
```
I want to upsell customers on the card detail page. Can you add a 'Make it extra special' section header above the add-ons, and make selected add-ons show a checkmark and a highlighted border?
```

### Promo Code

**Implement:**
```
Add a promo code input field to the basket page order summary. Support two codes: MOONPIG10 for 10% off, and WELCOME5 for £5 off. Show a success or error message after applying. Deduct the discount from the order total and allow the user to remove the applied code.
```

**Iterate:**
```
The promo code works but the success message isn't very Moonpig. Make it more playful — add a confetti emoji 🎉 and make it feel more celebratory when a valid code is applied.
```

### General exploration prompts (bonus, if time allows)

```
Explain how the basket state management works in this codebase.
```

```
What would I need to change to add a "Favourites" feature to this app?
```

```
Add unit tests for the getCardsByOccasion function in src/data/cards.ts
```
