---
title: "Directors & Officers (D&O) Liability Policies"
category: "Commercial Lines Insurance"
volume: "Small"
retention: "Policy term + 10-20 years (claims)"
slug: "directors-officers-liability"
verificationMode: "clip"
tags: ["d-and-o-insurance", "executive-liability", "securities-litigation", "corporate-governance", "ipo-insurance", "risk-management", "commercial-insurance"]
furtherDerivations: 1
---

## What is D&O Insurance?

If a public company is sued by its shareholders (e.g., for a stock price drop), the Directors and Officers (D&O) can be held *personally* liable. This means their personal houses and bank accounts are at risk.

**D&O Insurance** pays for their lawyers and settlements.

High-profile executives won't join a board unless they see verified proof of this insurance. Fraud happens when a struggling company "Photoshops" its insurance papers to look like it has a $25M policy when it actually only has $1M (or none at all). Verified hashes ensure directors are actually protected.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="do-pol"></span>
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
<span data-verify-line="do-pol">verify:chubb.com/do/v</span> <span verifiable-text="end" data-for="do-pol"></span>
</div>

## The Problem: Executive Deception Fraud

- **Retroactive Backdating:** Editing a "Retroactive Date" from 2025 back to 2015 to hide that the company was uninsured during a period of illegal activity.
- **Limit Inflation:** A private company editing a $1M "Small Business" policy to read $50M to attract a high-profile board member.
- **Exclusion Erasure:** Deleting the page showing a "Regulatory Investigation Exclusion" before sending the policy to a potential investor.

## What Is Checked

Insured company name, specific coverage limits (Side A/B/C), retention (deductible) amounts, policy period, retroactive date (critical for prior acts), exclusion endorsements (e.g., "Pending Litigation Exclusion"), issuing carrier.

**Document Types:**
- **Policy Declarations:** The 1-page executive summary.
- **Binder:** Proving coverage is in force during an IPO or M&A deal.
- **Run-Off / Tail Policy:** Proving 6 years of future coverage for retired directors.
- **Side A DIC (Difference in Conditions):** Essential protection for individuals.

## What the Checker Sees

Shows the issuer domain (`chubb.com`, `aig.com`, `marsh.com`) and policy status.

**Status Indications:**
- **In Force** — Premium paid; policy active.
- **Cancelled** — Coverage terminated (high-risk for directors).
- **Exhausted** — Limits have been entirely used up by other claims.
- **In-Litigation** — Coverage is being disputed between the board and the insurer.

## Who Holds It

The Board Director or Corporate Officer (second party) receives the D&O policy from the company/insurer (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the coverage protecting them. Most of the time, the policy sits in their personal files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the policy matches what the insurer's system recorded, including coverage limits and retroactive dates, and hasn't been altered.

**Future Optionality:** If a shareholder lawsuit arises years later or a dispute occurs about coverage, they have cryptographic proof of the policy terms ready without needing to contact the insurer or the company.

## Who Checks It

The director/officer (second party) may hand the verified document to various third parties:

**M&A Buyers / Acquirers**
**Legacy Liability:** In a corporate acquisition, the buyer needs to verify the "Retroactive Date" and "Limits" of the seller's historical D&O policies. Live Verify ensures the seller isn't "Editing" their history to hide past litigation risks.

**Investment Banks / Underwriters**
**IPO Due Diligence:** Ensuring that the "Executive Liability" claims made in the S-1 filing are backed by verified insurance policies.

**Shareholder Plaintiffs' Attorneys**
**Settlement Negotiation:** Verifying the "Side C" limits available to pay out a class-action settlement.

## Who Issues It

**Issuer Types (First Party)**

- Specialty Carriers (Chubb, Beazley, AIG, Travelers)
- Executive Liability Brokers (Marsh, Aon, WTW)
- Legal Data Rooms (Intralinks, Merrill)

**Privacy Salt:** Required. D&O policies often contain enumerable values—round dollar limits ($10M, $25M, $50M), standard retroactive dates, and publicly known company names. A competitor or plaintiff's attorney could feasibly enumerate combinations to reverse-engineer a company's insurance coverage strategy and historical risk profile, gaining unfair advantage in litigation or M&A negotiations. Salt protects these sensitive strategic details.

## Authority Chain

**Pattern:** Regulated

AIG underwrites directors and officers liability insurance for UK companies.

```
✓ dno.aig.co.uk/verify — Underwrites directors and officers liability insurance
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Broker Confirmation

Today a director, acquirer or lender who wants to confirm D&O cover usually asks the company's insurance broker for a confirmation letter, or looks at the policy documents placed in a data room. The broker's letter and Live Verify answer different questions and work side by side: the broker can explain the programme and its terms, while Live Verify confirms that a declarations page is exactly what the carrier issued.

| | Broker confirmation letter | Live Verify on the declarations page | Policy PDF in a data room |
| :--- | :--- | :--- | :--- |
| **Who can check** | Whoever the broker agrees to write to. | Anyone handed the page: a prospective director, an acquirer, an underwriter, a lender. | Anyone with data-room access. |
| **What the checker gets** | The broker's statement of the cover, with professional context about the programme, towers and exclusions. | Confirmation that the carrier issued this exact page, with these limits and retroactive dates, as at its date, and its current status as the carrier publishes it. | A document that may have been edited before upload. |
| **What the company shares** | A request to its broker. | Only the pages it chose to hand over. | Whatever it uploads. |
| **Reach** | Wherever the broker is engaged. | Global in principle: any carrier, in any country, that publishes hashes on its own domain. | Wherever the data room is shared. |
| **Speed and cost** | Often takes days to arrange, and depends on the broker still holding the file. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate once access is granted. |
| **What it needs** | A broker willing and able to confirm. | The carrier to publish hashes, and to keep them published for as long as checks may be needed; and Live Verify-aware software on the checker's device. No carrier does this yet. | A data-room provider. |
| **Best suited to** | Questions about how the cover works, and live placements. | Confirming on the day, or years later, that the carrier issued this declarations page. | Sharing documents in a transaction. |

**Where each fits:** a broker's confirmation letter carries professional judgement and context that a hash lookup cannot, and for a live placement the broker remains the person to ask. The letter takes time to arrange and depends on the broker still holding the file. Live Verify suits the other cases: a director, acquirer or lender who needs to confirm on the day that the carrier issued this declarations page, or who comes back to it years later during the claims-made tail, provided the carrier still publishes the record.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
