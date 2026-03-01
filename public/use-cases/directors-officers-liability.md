---
title: "Directors & Officers (D&O) Liability Policies"
category: "Commercial Lines Insurance"
volume: "Small"
retention: "Policy term + 10-20 years (claims)"
slug: "directors-officers-liability"
tags: ["d-and-o-insurance", "executive-liability", "securities-litigation", "corporate-governance", "ipo-insurance", "risk-management", "commercial-insurance"]
furtherDerivations: 1
---

## What is D&O Insurance?

If a public company is sued by its shareholders (e.g., for a stock price drop), the **Directors and Officers (D&O)** can be held *personally* liable. This means their personal houses and bank accounts are at risk.

**D&O Insurance** pays for their lawyers and settlements.

High-profile executives won't join a board unless they see verified proof of this insurance. Fraud happens when a struggling company "Photoshops" its insurance papers to look like it has a $25M policy when it actually only has $1M (or none at all). Verified hashes ensure directors are actually protected.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="do-pol">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">CHUBB SPECIALTY INSURANCE
Executive Protection Portfolio
═══════════════════════════════════════════════════════════════════

                     D&O POLICY DECLARATIONS

Policy #: DO-998877-26

Insured Organization: Globochem Worldwide, Inc.
Jurisdiction:         Delaware, USA

COVERAGE LIMITS
───────────────────────────────────────────────────────────────────
Coverage Layer                                  Limit of Liability
───────────────────────────────────────────────────────────────────
Side A (Individual D&O)                              $ 25,000,000
Side B (Corp. Reimbursement)                         $ 25,000,000
Side C (Entity Securities)                           $ 25,000,000

Policy Period:     Jan 01, 2026 to Jan 01, 2027
Retroactive Date:  Jan 01, 2015

NOTICE: This is a Claims-Made and Reported policy. Coverage only
applies to claims first made against the insured during the
policy period.

</pre>
<span data-verify-line="do-pol">verify:chubb.com/do/v</span> <span verifiable-text="end" data-for="do-pol">]</span>
</div>

## Data Verified

Insured company name, specific coverage limits (Side A/B/C), retention (deductible) amounts, policy period, retroactive date (critical for prior acts), exclusion endorsements (e.g., "Pending Litigation Exclusion"), issuing carrier.

**Document Types:**
- **Policy Declarations:** The 1-page executive summary.
- **Binder:** Proving coverage is in force during an IPO or M&A deal.
- **Run-Off / Tail Policy:** Proving 6 years of future coverage for retired directors.
- **Side A DIC (Difference in Conditions):** Essential protection for individuals.

## Data Visible After Verification

Shows the issuer domain (`chubb.com`, `aig.com`, `marsh.com`) and policy status.

**Status Indications:**
- **In Force** — Premium paid; policy active.
- **Cancelled** — Coverage terminated (high-risk for directors).
- **Exhausted** — **ALERT:** Limits have been entirely used up by other claims.
- **In-Litigation** — Coverage is being disputed between the board and the insurer.

## Second-Party Use

The **Board Director** or **Corporate Officer** (second party) receives the D&O policy from the company/insurer (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the coverage protecting them. Most of the time, the policy sits in their personal files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the policy matches what the insurer's system recorded, including coverage limits and retroactive dates, and hasn't been altered.

**Future Optionality:** If a shareholder lawsuit arises years later or a dispute occurs about coverage, they have cryptographic proof of the policy terms ready without needing to contact the insurer or the company.

## Third-Party Use

The director/officer (second party) may hand the verified document to various third parties:

**M&A Buyers / Acquirers**
**Legacy Liability:** In a corporate acquisition, the buyer needs to verify the "Retroactive Date" and "Limits" of the seller's historical D&O policies. Live Verify ensures the seller isn't "Editing" their history to hide past litigation risks.

**Investment Banks / Underwriters**
**IPO Due Diligence:** Ensuring that the "Executive Liability" claims made in the S-1 filing are backed by verified insurance policies.

**Shareholder Plaintiffs' Attorneys**
**Settlement Negotiation:** Verifying the "Side C" limits available to pay out a class-action settlement.

## Verification Architecture

**The "Executive Deception" Fraud Problem**

- **Retroactive Backdating:** Editing a "Retroactive Date" from 2025 back to 2015 to hide that the company was uninsured during a period of illegal activity.
- **Limit Inflation:** A private company editing a $1M "Small Business" policy to read $50M to attract a high-profile board member.
- **Exclusion Erasure:** Deleting the page showing a "Regulatory Investigation Exclusion" before sending the policy to a potential investor.

**Issuer Types (First Party)**

- Specialty Carriers (Chubb, Beazley, AIG, Travelers)
- Executive Liability Brokers (Marsh, Aon, WTW)
- Legal Data Rooms (Intralinks, Merrill)

**Privacy Salt:** Required. D&O policies often contain enumerable values—round dollar limits ($10M, $25M, $50M), standard retroactive dates, and publicly known company names. A competitor or plaintiff's attorney could feasibly enumerate combinations to reverse-engineer a company's insurance coverage strategy and historical risk profile, gaining unfair advantage in litigation or M&A negotiations. Salt protects these sensitive strategic details.

## Jurisdictional Witnessing

A jurisdiction may require D&O insurers to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the insurer, and any subsequent changes to the policy as they happen—which may manifest as a new hash, a status change (cancelled, exhausted), or even a 404 (record deleted)
- Receives structured content/metadata (coverage limits, policy periods, retroactive dates, exclusions)
- Does **NOT** receive plaintext (company names, director names, specific litigation details)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to directors/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Insurer cannot deny issuing the policy or coverage terms
- **Timestamp proof:** Policy hash existed at a specific time (critical for claims-made coverage disputes)
- **Regulatory audit:** State insurance departments can inspect the witness ledger for market conduct
- **Resilience:** Verification works even if insurer's systems go down or the company exits the market

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Insurer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Broker Confirmation

| Feature | Live Verify | Manual Broker Letter | Data Room PDF |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds every limit and date. | **Subjective.** Relies on the broker's clerk. | **Zero.** Easily forged. |
| **Speed** | **Instant.** Scan the paper in the boardroom. | **Slow.** Takes 3-5 days to get a "Confirmation Letter." | **Instant.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Human.** Prone to social engineering. | **Vulnerable.** |
| **Archival** | **Permanent.** Durable for 20-year tail. | **Ephemeral.** Brokers go out of business. | **Vulnerable.** |

**Why Live Verify wins here:** The "Claims-Made" Reality. D&O claims often hit 10 years after the policy was written. By then, the original broker may be gone and the IT systems migrated. Live Verify turns the **Static Paper Record** into an immutable link to the carrier's ledger, protecting directors long after they've left the company.
