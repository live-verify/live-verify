---
title: "Health Insurance Summary of Benefits (SBC)"
category: "Personal Lines Insurance"
volume: "Medium"
retention: "Policy term + 7 years"
slug: "health-insurance-policies-sbc"
verificationMode: "clip"
tags: ["health-insurance", "sbc", "aca-compliance", "summary-of-benefits", "coverage-verification", "healthcare-reform", "medical-policy"]
furtherDerivations: 1
---

## What is an SBC?

Under the Affordable Care Act (ACA), every health insurance plan must provide a Summary of Benefits and Coverage (SBC). It is a standardized 8-page document that allows you to compare plans fairly ("Apples to Apples").

It lists your Deductible, your Copay, and what you pay for an ER visit.

Fraud happens during the sales process: some brokers edit the SBC PDF to show a "$500 Deductible" when the actual plan has a "$5,000 Deductible." Verified hashes turn the SBC into a live link to the insurer's official filing, ensuring you are buying the coverage you were promised.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="health-sbc"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">AETNA HEALTH
Summary of Benefits and Coverage (SBC)
═══════════════════════════════════════════════════════════════════

Form #: SBC-2026-NY-99

PLAN: BRONZE PPO 1000
Coverage for: Individual & Family
Plan Period: 01/01/26 - 12/31/26

This is only a summary. For more information, see www.aetna.com.

COVERAGE SUMMARY
───────────────────────────────────────────────────────────────────
Important Questions                                        Answers
───────────────────────────────────────────────────────────────────
Individual Deductible?        $ 1,000 In-network / $ 5,000 Out
Out-of-Pocket Limit?          $ 8,500 In-network / $ 15,000 Out
Network Provider?             Yes. See Aetna Open Access Network.

This SBC is a verified extract of the Aetna Bronze PPO policy
filed with the NY Dept of Financial Services.

</pre>
<span data-verify-line="health-sbc">verify:aetna.com/sbc/v</span> <span verifiable-text="end" data-for="health-sbc"></span>
</div>

## The Problem: Standardized Confusion Fraud

- **Deductible Lowering:** Editing a $5,000 deductible PDF to read $500 to trick a hospital into providing care without an upfront deposit.
- **Network Misrepresentation:** editing the "Network" section to include a prestigious hospital system that isn't actually part of the plan.
- **Outdated SBCs:** A broker using a 2024 SBC to sell a 2026 plan that has significantly worse coverage.

## What Is Checked

Plan name, network ID, individual/family deductibles, out-of-pocket maximums, primary care copay, specialist copay, emergency room fees, pharmacy tiers, policy effective/expiration dates, state of filing.

**Document Types:**
- **Summary of Benefits and Coverage (SBC):** Standardized 8-page ACA disclosure.
- **Certificate of Coverage:** The full legal policy book.
- **Evidence of Coverage (EOC):** Specific to Medicare Advantage plans.
- **Glossary of Health Coverage:** Standardized federal terminology.

## What the Checker Sees

Shows the issuer domain (`aetna.com`, `anthem.com`, `uhc.com`) and the plan status.

**Status Indications:**
- **Current** — Plan is verified and matches the federal/state filing.
- **Superseded** — Plan terms were amended mid-year; view new SBC.
- **Recalled** — Plan withdrawn from the market.
- **Disputed** — Specific benefit trigger being challenged by regulators.

## Who Holds It

The Policyholder (second party) receives the Summary of Benefits and Coverage from the insurer (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of their coverage details. Most of the time, the SBC sits in their insurance folder—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the deductibles and copays match what the insurer's system recorded and what was filed with state regulators.

**Future Optionality:** If a dispute arises—whether about coverage denials, billing errors, or network status—they have cryptographic proof ready without needing to contact the insurer.

## Who Checks It

The policyholder (second party) may hand the verified document to various third parties:

**Healthcare Providers (Hospitals)**
**Revenue Cycle Management:** Instantly verifying the "Deductible" and "Out-of-Pocket" limits before scheduling a $20,000 procedure. Live Verify connects the hospital's billing system directly to the insurer's verified plan definitions.

**HR / Benefit Platforms**
**Automated Onboarding:** Using the SBC hash to automatically populate the benefit details into a new employee's portal, ensuring zero data-entry errors.

**Mortgage Lenders**
**Expense Audit:** Verifying the "Family Deductible" amount when calculating a borrower's emergency reserve requirements.

## Who Issues It

**Issuer Types (First Party)**

- Health Insurers (Aetna, Blue Cross, Kaiser)
- State Insurance Commissioners (e.g., NY DFS, CA CDI - who approve the filings)
- Federal Centers for Medicare & Medicaid Services (CMS)

**Privacy Salt:** Required. While SBCs contain some unique elements, they also include enumerable values—standard deductible tiers ($500, $1000, $2500, $5000), predictable copay amounts ($20, $40, $50 for common services), and publicly known plan names (Bronze, Silver, Gold, Platinum). A competitor or data aggregator could feasibly enumerate combinations to reverse-engineer market pricing strategies, subscriber demographics by zip code, or competitive positioning. Salt protects this sensitive market intelligence.

## Authority Chain

**Pattern:** Regulated

Health insurers issue SBCs under federal insurance regulator authority (CMS in the US).

```
✓ sbc.unitedhealthcare.com/verify — Issues summaries of benefits and coverage
  ✓ cms.gov — Administers US Medicare and Medicaid programs
    ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Healthcare.gov Plan Data

In the US, Healthcare.gov and the plan data published by CMS let anyone look up plans sold on the federal marketplace; some states run their own marketplaces. The plan data and Live Verify answer different questions and work side by side: one is the official reference for marketplace plans, the other confirms that the insurer stands behind the printed summary of benefits someone has in hand.

| | Healthcare.gov and CMS plan data | Live Verify on the summary of benefits | Unverified PDF or paper summary |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone, online. | Anyone handed the summary: a buyer, a practice front desk, an employer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Official plan details for marketplace plans. | Confirmation that the insurer stands behind this exact summary, including deductibles and copays, as at its date. | A document that may have been edited. |
| **What the holder shares** | Nothing; the data is public. | Only the summary they chose to hand over. | Only the summary they chose to hand over. |
| **Reach** | Plans on the federal marketplace; state marketplaces and employer plans are elsewhere. | Global in principle: any insurer, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Free; a few minutes to find the plan ID and navigate. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The plan ID and a browser. | The insurer to publish hashes, and Live Verify-aware software on the checker's device. No insurer does this yet. | Nothing. |
| **Best suited to** | Comparing marketplace plans at enrolment. | Checking a summary handed over by a broker, or brought to a front desk. | Nothing where a purchase depends on it. |

**Where each fits:** Healthcare.gov and the CMS plan data are the official reference for marketplace plans and are well suited to comparing options at enrolment. They do not list every plan, and they do not vouch for the printed summary a patient brings to a front desk. Live Verify lets the practice, or the patient, confirm the insurer stands behind that summary of benefits and coverage as issued. For the full plan filing, the government sources remain the place to look.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
