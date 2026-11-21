---
title: "Aggregate Deductible and Retrospective Rating Documentation"
category: "Insurance Claims & Operations"
volume: "Small"
retention: "Policy term + 10 years"
slug: "aggregate-deductible-retrospective"
verificationMode: "clip"
tags: ["aggregate", "deductible", "retrospective", "insurance", "risk", "management", "premium"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="retro"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PREMIUM ADJUSTMENT STATEMENT
CONFIDENTIAL
═══════════════════════════════════════════════════════════════════

Insurer:  ACE American Insurance Co.     Insured:   MegaCorp Logistics, Inc.
          123 Market St, Philadelphia    Policy No: WC-9922-88
                                         Adjustment Period: 3rd (36 Months)

RETROSPECTIVE CALCULATION
───────────────────────────────────────────────────────────────────
Description                                                 Amount
───────────────────────────────────────────────────────────────────
Standard Premium                                        $2,500,000
Incurred Losses (Paid + Reserved)                       $1,850,000
Basic Premium Factor (0.25)                               $625,000
Converted Losses (x 1.10)                               $2,035,000
───────────────────────────────────────────────────────────────────
Retrospective Premium                                   $2,660,000
Previously Paid                                         $2,500,000
───────────────────────────────────────────────────────────────────
ADDITIONAL PREMIUM DUE                                    $160,000

* Subject to Aggregate Deductible Limit of $3,000,000.

</pre>
  <span data-verify-line="retro">verify:chubb.com/retro/v</span> <span verifiable-text="end" data-for="retro"></span>
</div>

## The Problem: Clean Loss Run Fraud

- **Photoshop:** Editing the "Incurred Losses" column in a PDF loss run to make a bad year look good.
- **Omission:** Deleting pages of large claims from the report.
- **Fake Paid status:** Forging a document saying "All retro premiums paid" to avoid disclosing a liability during M&A.

## What Is Checked

Insured name, policy number, adjustment period (1st, 2nd, 3rd, etc.), incurred loss amount, total retrospective premium, amount due/returned, aggregate limit status.

**Document Types:**
- **Retrospective Premium Adjustment:** The bill/refund calculation.
- **Loss Run Report:** Detailed list of claims supporting the calculation.
- **Collateral Adjustment Notice:** Demand for Letter of Credit increase.

## What the Checker Sees

Shows the issuer domain (the Insurance Carrier) and the document validity.

**Status Indications:**
- **Valid** — Document matches the carrier's system of record.
- **Void** — Adjustment was recalculated (common in retro plans).
- **Disputed** — The insured has formally contested this calculation.

## Who Holds It

The Insured (second party) receives the premium adjustment statement from the insurance carrier (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The insured has their own verified copy of the retrospective premium calculation. Most of the time, the document sits in their risk management files—the verification value is latent, there *if needed*.

**Peace of Mind:** The insured can confirm at any time that the calculation matches what the carrier's system recorded and hasn't been altered since they received it.

**Future Optionality:** If a dispute arises about premium amounts, or if they need to prove collateral requirements to a bank, the insured has cryptographic proof ready without needing to contact the carrier.

## Who Checks It

The insured (second party) may hand the verified document to various third parties:

**New Insurers (Underwriters)**
When a company switches insurers, the new underwriter demands "Loss Runs" (5-year history). Companies often manipulate these PDF reports to hide bad claims and get cheaper rates. Verified documents prevent this fraud.

**Reinsurers**
Reinsurers need to verify that the primary carrier is calculating retro premiums correctly according to the treaty terms.

**M&A Due Diligence**
In a corporate acquisition, the buyer needs to know if the target company has a "ticking time bomb" of retrospective premium adjustments waiting to be billed. Verified adjustment statements reveal the true liability.

## Who Issues It

**Issuer Types (First Party)**

- Commercial Carriers (Chubb, Travelers, Zurich, AIG, etc.)
- Third Party Administrators (TPAs) (Sedgwick, Gallagher Bassett) who handle claims and issue loss runs

**Privacy Salt:** Required. Retrospective premium adjustments contain enumerable values—round dollar amounts for standard premiums, predictable loss conversion factors (1.10, 1.15), and common policy periods. A competitor could feasibly enumerate combinations to reverse-engineer a company's risk profile and undercut their renewal pricing. Salt protects these competitive insurance positions.

## Authority Chain

**Pattern:** Regulated

Zurich issues retrospective premium adjustments for UK commercial insurance policies.

```
✓ retro.zurich.co.uk/verify — Issues retrospective premium adjustments for commercial insurance
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Broker Portals

| Feature | Live Verify | Broker Portal (Marsh/Aon) |
| :--- | :--- | :--- |
| **Cross-Carrier** | **Universal.** Works for any carrier document. | **Siloed.** Portals usually only show data for *current* placements. Hard to get historical data from 5 years ago/different broker. |
| **M&A Access** | **Easy.** Seller sends verified PDFs to Data Room. Buyer verifies. | **Hard.** Buyer cannot access Seller's private broker portal without complex permissioning. |
| **Immutability** | **High.** Hash proves the document hasn't changed. | **Medium.** Portal data changes dynamically; hard to prove "what was the loss number on Dec 31?" |

**Where each fits:** a broker portal is the right tool for the insured and its current broker, who need live figures on current placements. Loss runs and adjustment statements also go to people who will never have a login: a buyer's advisers in a data room, or an underwriter quoting a new programme. Live Verify lets them confirm that the carrier issued that exact snapshot, as at its date, while the portal carries on serving the people who manage the programme day to day.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
