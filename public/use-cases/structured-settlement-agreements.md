---
title: "Structured Settlements and Annuity Contracts"
category: "Insurance Claims & Operations"
volume: "Very Small"
retention: "Claimant lifetime (50-70+ years / permanent)"
slug: "structured-settlement-agreements"
verificationMode: "clip"
tags: ["structured-settlement", "annuity-contract", "personal-injury", "insurance-payout", "factoring-fraud", "financial-planning", "legal-judgment", "long-term-care"]
furtherDerivations: 1
---

## What is a Structured Settlement?

A Structured Settlement is a financial arrangement typically used in personal injury or wrongful death cases. Instead of a single lump-sum payout, the claimant receives a series of periodic payments over decades (e.g., $5,000 every month for life). These are funded by an Annuity Contract issued by a highly-rated life insurance company.

These documents are the "Financial Lifeline" for injured parties. Fraud is high-stakes: predatory "Cash-Now" factoring companies often trick claimants into signing over their future payments for pennies on the dollar. Similarly, a fraudster might "edit" a settlement agreement to hide an existing lien or a prior transfer of payments to another firm. Verified hashes bind the Payment Schedule, Beneficiary Name, and Contract ID to the annuity issuer's domain (e.g., `metlife.com` or `prudential.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="settle"></span>PACIFIC LIFE & ANNUITY
Structured Settlement Annuity Contract
═══════════════════════════════════════════════════════════════════

Annuitant (Claimant):  SARAH JANE DOE
Date of Birth:         05/15/1985
Contract Number:       PLA-99228877-XJ
Effective Date:        15 MAR 2026

VERIFIED PAYMENT SCHEDULE
───────────────────────────────────────────────────────────────────
Monthly Payment:                                       $ 4,250.00
Guaranteed Period:                                30 Years (Fixed)
Lump Sum (Year 10):                                  $ 100,000.00
───────────────────────────────────────────────────────────────────
Est. Total Value:                                  $ 1,630,000.00

Transfer Restriction: This annuity is non-assignable and
non-transferable without a verified Court Order pursuant to
State Structured Settlement Protection Acts.

<span data-verify-line="settle">verify:pacificlife.com/v</span> <span verifiable-text="end" data-for="settle"></span></pre>
</div>

## The Problem: Cash-Now Fraud

- **Prior Transfer Hiding:** Editing a contract to hide the fact that the next 10 years of payments were already sold to a different firm.
- **Amount Inflation:** Changing a $1,000 monthly payment to $2,000 on a PDF to get a larger lump-sum offer from a buyer.
- **Case Spoofing:** Creating a fake "Court Order" using a real judge's name to trick an insurer into redirecting payments.

## What Is Checked

Contract number, annuity issuer name, claimant name, beneficiary name, payment frequency, individual payment amounts, escalation rates (COLA), total guaranteed value, total expected value, effective date, court case ID (for legal settlements).

**Document Types:**
- **Annuity Contract:** The formal life insurance policy.
- **Settlement Agreement & Release:** The legal contract ending the lawsuit.
- **Qualified Assignment:** (Linked hash) moving the obligation to a funding company.
- **Court Order for Transfer:** Proof of a legal "Cash-Out" sale.

## What the Checker Sees

Shows the issuer domain (`metlife.com`, `prudential.com`, `newyorklife.com`) and the contract standing.

**Status Indications:**
- **Active / Paying** — Payments are being disbursed according to the original schedule.
- **Assigned / Transferred** — Future payments have been legally sold to a factoring company.
- **Lien Active** — A government or legal lien exists against the payments (e.g., child support).
- **Terminated** — All guaranteed payments have been made; contract closed.

## Who Holds It

The Annuitant (Claimant) benefits from verification.

**Anti-Predatory Defense:** If a "Cash-Now" firm sends a letter claiming the claimant's annuity is "at risk" or "undervalued," the claimant can scan their own verified contract. "Verified by Pacific Life" provides them with the peace of mind that their income is secure and accurately valued, helping them resist high-pressure sales tactics.

**Mortgage Prequalification:** Proving to a lender that their $4,250/month income is a verified, "Life-Contingent" asset that can be used to qualify for a home loan, bypassing the need for 50 pages of legacy insurance documents.

## Who Checks It

**Factoring Companies (The Buyers)**
**Lien Verification:** Before buying a stream of payments from a claimant, the factoring firm scans the verified hash. If it returns "LIEN ACTIVE - IRS," they can adjust their offer or deny the purchase, preventing a loss where they buy payments they can't actually collect.

**Civil Courts / Judges**
**Transfer Approval:** Under "Protection Acts," a judge must approve the sale of settlement payments. Live Verify allows the judge's clerk to instantly verify that the "Annuity Contract" presented in court matches the insurer's records, stopping the common fraud of "double-selling" the same payments to two different firms.

**Divorce & Estate Attorneys**
**Asset Valuation:** Verifying the "Present Value" of a lifetime income stream during asset division to ensure a fair settlement between spouses.

## Who Issues It

**Issuer Types** (First Party)

**Life Insurance Companies.**
**Specialized Settlement Obligors.**
**State Administrative Courts.**

**Privacy Salt:** Highly Critical. These contracts contain lifetime income data and medical-linked identifiers. The hash must be salted to prevent "Wealth Mapping" of injured individuals.

## Authority Chain

**Pattern:** Regulated

Life insurance companies issue structured settlement annuity contracts and are regulated by the UK Financial Conduct Authority under the UK insurance framework.

```
✓ settlement.jmfin.com/verify — Life insurance company issuing structured settlement annuities
  ✓ fca.org.uk/register — Regulates UK life insurance and pensions firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Structured settlements are "Financial Anchors" for the most vulnerable. By turning contracts into verifiable digital bridges, we protect the claimant's long-term security from the "Information Asymmetry" that predatory firms use to exploit them.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
