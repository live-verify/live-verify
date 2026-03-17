---
title: "Donation Receipts for Tax Deductions"
category: "Charitable & Non-Profit"
volume: "Medium"
retention: "7-10 years (tax audit)"
slug: "donation-receipts-tax-deductions"
verificationMode: "clip"
tags: ["non-profit", "donation-receipt", "irs-compliance", "tax-deduction", "charity-fraud", "philanthropy", "gift-aid", "hmrc", "uk"]
furtherDerivations: 1
---

## What is a Donation Receipt?

If you donate $1,000 to a charity, you can lower your income taxes by $1,000. But the IRS won't just take your word for it; they need an **Official Receipt** from the charity.

In the UK, the mechanism is different but the document problem is the same. Under **Gift Aid**, the donor signs a declaration confirming they're a UK taxpayer, and the *charity* claims back the basic-rate tax from HMRC — 25p for every £1 donated. The charity holds the declaration; HMRC never sees individual declarations unless they audit. HMRC pays out based on the charity's bulk assertion: "We received £100,000 in Gift Aid-eligible donations this quarter, please send us £25,000."

Both systems are vulnerable to the same fraud: fabricated or inflated receipts. In the US, scammers create fake receipts from real charities to claim deductions. In the UK, charities (bogus or real) submit Gift Aid claims for donations that never happened, or claim Gift Aid on donations from non-taxpayers whose income tax was never paid in the first place.

Verified hashes allow tax authorities to scan a receipt and see "VERIFIED" on the charity's own domain — stopping fabricated receipts in the US and giving HMRC a way to spot-check individual declarations behind a bulk Gift Aid claim.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="donate"></span>AMERICAN RED CROSS
OFFICIAL CHARITABLE CONTRIBUTION RECEIPT

Dear JOHN JACOB DOE,

Thank you for your generous gift. This letter confirms that
the American Red Cross received your contribution as
described below:

Donation Amount:    $ 1,000.00
Date Received:      December 15, 2025
Donation Type:      Cash / Credit Card

No goods or services were provided in exchange for this
contribution. The American Red Cross is a 501(c)(3)
organization. Federal Tax ID: 12-3456789.

                                    ───────────────────────
                                    Treasurer, ARC

<span data-verify-line="donate">verify:redcross.org/receipts/v</span> <span verifiable-text="end" data-for="donate"></span></pre>
</div>

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="giftaid"></span>BRITISH RED CROSS
GIFT AID DONATION RECEIPT

Dear SARAH J. THOMPSON,

Thank you for your donation of £500.00 received on
12 November 2025.

GIFT AID DECLARATION CONFIRMED
You have declared that you are a UK taxpayer and that
income tax and/or capital gains tax paid is at least
equal to the tax the charity will reclaim on your
donations in the current tax year.

Gift Aid claimed:         £125.00
Total value to charity:   £625.00

Charity No: 220949
Declaration Ref: GA-2025-884721

<span data-verify-line="giftaid">verify:redcross.org.uk/giving/v</span> <span verifiable-text="end" data-for="giftaid"></span></pre>
</div>

## Data Verified

Donor name, donation amount, date received, charity registration (US: EIN / UK: Charity Commission number), charity name, donation type (Cash/Stock/In-Kind), tax status statement (US: 501(c)(3) / UK: Gift Aid declaration confirmed), Gift Aid amount claimed (UK), receipt or declaration reference number.

**Document Types:**
- **Single Gift Receipt (US):** Issued immediately after a donation, citing 501(c)(3) status.
- **Annual Giving Statement:** Summary of all gifts for the tax year.
- **Gift Aid Receipt (UK):** Confirms the donor's Gift Aid declaration and shows the tax reclaimed.
- **Gift Aid Declaration (UK):** The donor's signed statement that they are a UK taxpayer — held by the charity, verifiable by HMRC on audit.
- **In-Kind Donation Receipt:** Describing physical goods (e.g., clothes/cars).
- **Stock Transfer Confirmation:** For high-value security gifts.

## Data Visible After Verification

Shows the issuer domain (`redcross.org`, `unicef.org`) and current standing.

**Status Indications:**
- **Verified** — Receipt matches the charity's official financial record.
- **Refunded** — The donation was returned (e.g., due to credit card chargeback).
- **Void** — Transaction cancelled or re-issued.
- **In-Dispute** — Associated with a contested estate or gift.

## Second-Party Use

The **Donor** benefits from verification.

**Tax Audit Protection (US):** If the IRS audits a donor's 2025 return in 2028, the donor can provide the verified receipt hash. This proves the $1,000 deduction wasn't "Fabricated" or "Photoshopped," giving the auditor instant trust in the claim.

**Higher-Rate Relief (UK):** Higher-rate and additional-rate taxpayers can claim the difference between their rate and basic rate on their Self Assessment. A verified Gift Aid receipt from the charity's domain proves the donation and the Gift Aid declaration in one step — no paper trail to reconstruct years later.

**Matching Gifts:** Proving to an employer (e.g., Google or Starbucks) that a personal donation was actually made and cleared, triggering the corporate matching funds without manual HR review.

## Third-Party Use

**The IRS (US)**
**Enforcement:** During an audit, agents scan the receipt hash. "Verified by redcross.org" prevents the most common form of tax fraud: creating fake receipts from real charities to lower taxable income.

**HMRC (UK)**
**Gift Aid Audit:** HMRC pays out Gift Aid claims based on charities' bulk assertions. Currently, auditing means requesting the charity's paper declarations and cross-referencing manually. With verified receipts, HMRC can spot-check a random sample of individual declarations against the charity's domain — confirming both that the donation happened and that a valid Gift Aid declaration exists for it. This closes the gap between the bulk claim and the underlying evidence.

**Corporate Matching Platforms (Benevity)**
**Automation:** Platforms can use the verification hash to instantly validate employee donations, releasing millions in matching funds days faster than manual verification.

**Estate Attorneys / Probate**
**Gift Validation:** Verifying the charitable lead trusts and donations made by a deceased person during the probate process.

## Verification Architecture

**The "Tax Deduction" Fraud Problem**

- **Receipt Generators (US):** Using online templates to create fake receipts for real, high-profile charities like the Red Cross.
- **Amount Inflation:** Editing a $10/£10 donation to read $1,000/£1,000 on the paper receipt.
- **Date Alteration:** Moving a January donation back to December to claim it on the previous tax year's return.
- **Phantom Gift Aid Claims (UK):** Charities (bogus or real) submitting Gift Aid claims to HMRC for donations that never happened. HMRC pays out 25% of the claimed amount with no way to verify individual declarations without a full audit.
- **Non-Taxpayer Declarations (UK):** Donors signing Gift Aid declarations when they don't actually pay enough income tax to cover the reclaim. The charity gets the 25% top-up from HMRC, but the tax was never paid — HMRC is out of pocket.
- **Declaration Harvesting (UK):** Collecting blanket Gift Aid declarations ("all my future donations") from donors who later cease to be taxpayers (retired, moved abroad). The charity continues claiming on autopilot.

**Issuer Types** (First Party)

**National Non-Profits:** (Red Cross / British Red Cross, United Way, St. Jude, Oxfam, Cancer Research UK).
**Religious Organizations.**
**Donor Advised Funds (DAFs):** (Fidelity Charitable, Schwab Charitable, Charities Aid Foundation).

## Authority Chain

**Pattern:** Regulated

Charities issue receipts confirming donation amounts for tax purposes.

```
✓ receipt.redcross.org.uk/verify — Issues charitable donation receipts
  ✓ charitycommission.gov.uk — Regulates charities in England and Wales
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Existing Systems

| Feature | Live Verify | IRS TEOS / HMRC Charities Register | Paper Receipt / Declaration |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Binds Amount.** Protects the $/£ value. | **Zero.** Only verifies the *Charity*, not the *Gift*. | **Zero.** Easily forged. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Charity. | **Gov-Bound.** | **Visual.** |
| **User Experience** | **Instant.** Scan the paper. | **Slow.** Requires typing EIN/Charity No and finding the record. | **N/A.** |
| **Audit-ability** | **High.** Individual receipts verifiable on demand. | **None** for individual gifts (US). **Bulk only** (UK — HMRC sees aggregate claims, not individual declarations). | **Low.** |

**Why Live Verify wins here:** The "Gift Specificity." The IRS TEOS database can tell you if the Red Cross is a real charity. HMRC's register can confirm a charity is registered for Gift Aid. Neither can tell you if a specific person actually gave them a specific amount on a specific date. Live Verify turns the **Static Receipt** into a live, verifiable financial link that bridges the gap between the donor's claim (US) or the charity's bulk assertion (UK) and the actual individual transaction.
