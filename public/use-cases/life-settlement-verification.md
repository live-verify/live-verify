---
title: "Life Settlement / Policy Sale Verification"
category: "Investment & Fintech"
volume: "Small"
retention: "Policy lifetime (until maturity or death benefit paid)"
slug: "life-settlement-verification"
verificationMode: "clip"
tags: ["life-settlement", "policy-sale", "secondary-market", "life-insurance", "insurable-interest", "STOLI", "assignment", "investment", "longevity-risk"]
furtherDerivations: 1
---

## The Problem

A life settlement is the sale of an existing life insurance policy to a third party. The policyholder receives a lump sum greater than the cash surrender value but less than the death benefit. The buyer becomes the new owner and beneficiary, assumes premium payments, and collects the death benefit when the insured dies.

The secondary market for life insurance policies is substantial but opaque. Buyers rely on documentation provided by sellers, brokers, and carriers to value policies and assess risk. The fraud surface is wide:

- **Fabricated policies:** A policy document is forged or edited to show a face amount, carrier, or policy number that does not exist.
- **Inflated face amounts:** A real policy exists but its death benefit has been edited upward in the settlement paperwork.
- **Concealed loans:** Outstanding policy loans reduce the net death benefit. Sellers omit or understate them.
- **Undisclosed prior assignments:** The same policy is offered to multiple buyers, or a prior lien exists that the seller does not disclose.
- **Stranger-Originated Life Insurance (STOLI):** The policy was taken out by investors with no insurable interest, specifically to be sold on the secondary market. These policies are voidable in most jurisdictions.
- **Misrepresented insured age:** The insured's age drives life expectancy underwriting and therefore the policy's economic value. A two-year error in age can shift the settlement price by tens of thousands of dollars.

The buyer's due diligence depends on carrier-issued documents that travel as PDFs through brokers, escrow agents, and attorneys. Each intermediary is a point where documents can be altered.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="lifeset"></span>LIFE SETTLEMENT VERIFICATION
═══════════════════════════════════════════════════════════════════

Policy:             99228877-WL
Carrier:            New York Life
Face Amount:        $1,000,000.00
Status:             IN FORCE
Premium Current:    YES (paid through Mar 2027)
Outstanding Loans:  NONE
Prior Assignments:  NONE
Policy Age:         10 years
Insured Age:        72

<span data-verify-line="lifeset">verify:newyorklife.com/settlement-verify/v</span> <span verifiable-text="end" data-for="lifeset"></span></pre>
</div>

## What Is Checked

Carrier name, policy number, face amount (death benefit), policy status (in force, lapsed, paid-up), premium payment status and paid-through date, outstanding loan balance, prior assignment history, policy age (years since issue), insured age at last birthday, and policy type (whole life, universal life, term).

**Document Types:**
- **Settlement Verification Letter:** Carrier-issued confirmation of policy status, face amount, loans, and assignments — the core document in any life settlement transaction.
- **Policy Illustration / In-Force Ledger:** Projections of cash value and death benefit under current assumptions.
- **Assignment Release:** Confirmation that no prior collateral assignments or ownership transfers encumber the policy.
- **Premium Payment History:** Record of payments confirming the policy has not lapsed and been reinstated under different terms.

## What the Checker Sees

Shows the issuer domain (`newyorklife.com`, `prudential.com`, `metlife.com`) and current policy standing.

**Status Indications:**
- **In Force** — Coverage active, premiums current.
- **Lapsed** — Coverage terminated due to non-payment.
- **Loans Outstanding** — Policy has one or more outstanding loans reducing the net death benefit.
- **Assignment on Record** — A prior ownership transfer or collateral assignment exists.
- **Paid-Up** — No further premiums required.

## Who Holds It

The policyholder selling their policy benefits from verification.

**Proving a clean policy:** A seller offering their policy on the secondary market can provide a verifiable settlement letter showing no outstanding loans, no prior assignments, and current premium status. This reduces buyer skepticism and speeds up the transaction.

**Demonstrating policy age:** A verifiable record showing the policy has been in force for a decade, with consistent premium payments by the original insured, is helpful evidence in assessing the policy's history. However, carrier verification of age and premium history does not by itself prove that insurable interest existed at origination — that is a legal question about the circumstances at inception, not a fact the carrier's records can establish.

**Price negotiation:** A seller with a verifiable, unencumbered policy can negotiate from a stronger position than one whose documentation is unverifiable.

## Who Checks It

**Life Settlement Providers and Institutional Investors**

**Pre-purchase due diligence:** Before committing capital, buyers can verify that the policy details — face amount, loan status, assignment history — match what the broker or seller represented. This catches inflated face amounts and concealed encumbrances before funds move.

**Portfolio acquisition:** Institutional buyers acquiring blocks of policies can verify each one individually rather than relying on a single broker's summary spreadsheet.

**State Insurance Regulators**

**Settlement market oversight:** Regulators in states that license life settlement providers can verify that policies being transacted are genuine and unencumbered, reducing the regulatory burden of manual carrier inquiries.

**STOLI screening:** Carrier verification can confirm policy age, premium payment history, and whether the policy changed ownership early — facts that are useful inputs to STOLI screening. But verification does not prove or disprove that insurable interest existed at origination. That determination requires investigation into the origination circumstances, not just the carrier's current records.

**Life Expectancy Underwriters**

**Input validation:** Medical underwriters pricing the longevity risk of the insured need confidence that the insured's age and policy details are as represented. A verified insured age eliminates one variable from the underwriting model.

## How Verification Works Here

**The "Multiple Sale" Fraud Problem**

- **Double-selling:** The same policy is offered to two or more buyers simultaneously. Neither buyer knows the other exists until both attempt to record the assignment with the carrier.
- **Phantom policy:** A policy number is fabricated entirely. The settlement paperwork looks authentic but no underlying policy exists.
- **Loan concealment:** A $200,000 policy loan on a $1,000,000 policy means the net death benefit is $800,000. The seller's paperwork omits the loan.
- **Assignment layering:** A policy already assigned as collateral for a bank loan is offered for sale without disclosing the prior lien.
- **Age misrepresentation:** The insured is younger than claimed, meaning the buyer will wait longer for the death benefit and the policy is worth less at the offered price.

**Issuer Types (First Party)**

- National life insurance carriers (New York Life, Prudential, MetLife, Northwestern Mutual)
- Mutual life insurance companies
- Fraternal benefit societies

The carrier is the only entity that can authoritatively confirm whether a policy is in force, what the face amount is, whether loans exist, and whether prior assignments have been recorded. Broker representations are not substitutes for carrier-issued verification.

**Privacy Salt:** Required. Life settlement verification involves the insured's age, which correlates directly with health status and life expectancy — the central economic variable in the transaction. The face amount reveals wealth. Salt prevents adversarial enumeration of high-value policies held by elderly insureds.

## Authority Chain

**Pattern:** Regulated

New York Life, a regulated life insurance carrier, is authorized by state insurance departments to issue verified policy status confirmations for settlement transactions.

```
✓ newyorklife.com/settlement-verify/v — Issues verified life settlement status letters
  ✓ dfs.ny.gov — New York Department of Financial Services regulates life insurers
    ✓ ny.gov/verifiers — New York State government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Carrier Verification of Coverage

Licensed life settlement providers confirm a policy's details, loans and assignments directly with the carrier, through its portal or by phone or fax with the owner's authorization, and some industry data services are available to members. These remain the primary route for the provider. They answer a different question from a Live Verify statement, which travels with the transaction to parties who have no carrier access, and they work side by side.

| | Carrier phone, fax or portal inquiry | Industry database | Live Verify on the carrier's policy statement | Broker-provided PDF |
| :--- | :--- | :--- | :--- | :--- |
| **Who can check** | Authorized callers or portal users, usually the licensed provider. | Industry members only.<!-- TODO(verify): the original table names a "LISA / Industry Database"; confirm which industry database (if any) life settlement providers actually use for policy loans and assignments, and what it covers --> | Anyone handed the statement: buyer, seller, escrow agent, co-investor, regulator, attorney. | Anyone handed it. |
| **What the checker gets** | The carrier's current answer, including loans and assignments if asked. | What members have reported, which may lag. | Confirmation that the carrier issued this exact statement, loans and prior assignments included, as at its date, and whether it is still current. | A document the seller's side controls, which may have been edited. |
| **What the seller shares** | An authorization for the carrier to disclose. | Whatever is reported. | Only the statement they chose to hand over. | Only what they chose to hand over. |
| **Reach** | One carrier, by its own process. | Members of that service. | Global in principle: any carrier, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Can take days or longer for a carrier response. | Fast for members. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | The owner's authorization and the carrier's process. | Membership. | The carrier to publish hashes, and Live Verify-aware software on the checker's device. No carrier does this yet. | Nothing. |
| **Best suited to** | The licensed provider's own due diligence before purchase. | Cross-checking within the industry. | Parties further along the transaction who need to rely on the same facts without their own carrier access. | Nothing where the price depends on it. |

**Where each fits:** Carrier portal login and direct carrier inquiry remain primary for licensed settlement providers. Live Verify is strongest when the verification artifact needs to travel — to an escrow agent, a co-investor, a regulator, or an attorney — and keep its integrity outside the carrier's own systems.

## Further Derivations

1. **Life Settlement Escrow Confirmations** — Verification that settlement funds are held in escrow and will be released only upon confirmed assignment transfer.
2. **Policy Assignment Transfer Confirmations** — Carrier-issued confirmation that ownership has been formally transferred to the new owner/beneficiary.
