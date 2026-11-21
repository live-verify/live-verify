---
title: "Invoice Financing and Factoring"
category: "Trade Finance"
volume: "Small"
retention: "Invoice term + 7-10 years"
slug: "invoice-financing-factoring"
verificationMode: "clip"
tags: ["factoring", "invoice-financing", "accounts-receivable", "supply-chain-finance", "working-capital", "fraud-prevention", "credit-risk"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="factor"></span>BLUE-VINE CAPITAL</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Commercial Factoring & Liquidity</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Factor Ref: BV-992288</div>
    </div>
  </div>
<div style="padding: 25px;">
    <h3 style="margin-top: 0; color: #002d62; border-bottom: 2px solid #002d62; padding-bottom: 5px;">FACTORING CONFIRMATION</h3>
<div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p>This document confirms that the following accounts receivable have been purchased by the Factor:</p>
<div style="background: #fdfdfd; border: 1px solid #eee; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p><strong>Seller:</strong> Apex Manufacturing, Ltd.<br>
        <strong>Buyer (Debtor):</strong> Global Retail Hub, Corp.</p>
<strong>Invoice Total:</strong> $ 100,000.00<br>
        <strong>Advance Rate:</strong> 85.00% ($ 85,000.00 Paid)<br>
        <strong>Reserve Fund:</strong> $ 15,000.00
      </div>
<p style="font-weight: bold; color: #d32f2f;">NOTICE OF ASSIGNMENT: All future payments for this invoice MUST be remitted directly to Blue-Vine Capital.</p>
    </div>
<div data-verify-line="factor" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: BlueVine doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="factor">verify:bluevine.com/factoring/v</span> <span verifiable-text="end" data-for="factor"></span>
    </div>
  </div>
</div>

## The Problem: Double Factoring Fraud

- **Double-Financing:** A dishonest seller selling the same $100,000 invoice to two different factoring companies. Live Verify allows factors to check the hash status of an invoice ID across a shared (or individual) domain index.
- **Amount Inflation:** Editing a $10,000 invoice PDF to read $100,000 to get a larger cash advance.
- **Fake NOAs:** Hackers creating fake assignment letters to redirect payments from a legitimate factor to a private criminal wallet.

## What Is Checked

Seller (client) name, Buyer (debtor) name, Invoice number, total invoice amount, advance rate %, cash advance amount, factor fee structure, date of purchase, notice of assignment (remit-to) bank details.

**Document Types:**
- **Factoring Confirmation:** The "Receipt" for the cash advance.
- **Notice of Assignment (NOA):** The legal letter sent to the buyer.
- **Verification of Debt (VOD):** (Linked hash) where the buyer confirms the invoice is real.
- **UCC-1 Filing Extract:** Proving the factor's legal lien on the assets.

## What the Checker Sees

Shows the issuer domain (`bluevine.com`, `fundbox.com`) and current asset status.

**Status Indications:**
- **Advanced** — Factor has purchased the invoice and paid the seller.
- **Paid** — Buyer has settled the invoice with the factor.
- **In-Dispute** — Buyer has challenged the goods/invoice quality.
- **Void** — Transaction reversed; seller repurchased the invoice.

## Who Holds It

The Seller (Small Business) benefits from verification.

**Line of Credit Extension:** Proving to their primary bank that their "Accounts Receivable" are verified assets that have already been vetted by a major factoring firm. This allows the business to get higher credit limits by demonstrating a "Verified Liquid" balance sheet.

**Vendor Assurance:** Proving to a raw material supplier that they have the verified "Cash Advance" coming, ensuring the supplier continues to ship the next batch of parts.

## Who Checks It

**The Debtor (Buyer's Accounts Payable)**
**Remit-to Integrity:** When a buyer receives a "Notice of Assignment" telling them to pay a different bank, they are often terrified of wire fraud. Live Verify allows the AP clerk to verify the NOA against the Factor's domain. "Verified by BlueVine" ensures the buyer isn't paying a hacker.

**Alternative Lenders**
**Lien Vetting:** Ensuring that an invoice isn't being "Double Factored" (sold to two different firms). A verified hash proves who currently owns the legal right to the cash.

**External Auditors**
**Existence of Assets:** Verifying the "Advance Rate" and "Reserve Fund" totals during a corporate audit.

## Who Issues It

**Issuer Types** (First Party)

**Fintech Factors:** (BlueVine, Fundbox, FundThrough).
**Commercial Banks.**
**UCC-1 Registries:** (Hosting the verified lien hashes).

## Authority Chain

**Pattern:** Regulated

Close Brothers, a regulated financial services firm, is authorized by the FCA to issue verified invoice financing and factoring agreements.

```
✓ factoring.closebrothers.co.uk/verify — Issues verified invoice financing and factoring confirmations
  ✓ fca.org.uk/register — Regulates UK trade finance providers
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Verification-of-Debt Calls

Factors routinely confirm an invoice by contacting the buyer's accounts payable team by phone or email, a verification-of-debt (VOD) check. It is run by the factor, and it can surface things no document will. The call and Live Verify answer different questions and work side by side: one asks the buyer whether the debt is good, the other lets the buyer confirm that a notice of assignment, and the bank details on it, really came from the factor.

| | Verification-of-debt call or email | Live Verify on the notice of assignment | Scanned PDF notice |
| :--- | :--- | :--- | :--- |
| **Who can check** | The factor, by reaching the buyer. | The buyer's accounts payable team, or anyone else handed the notice. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The buyer's own word on whether the invoice is owed, and any dispute, set-off or delivery problem. | Confirmation that the factor issued this exact notice, including its payment details, as at its date, and whether it has since been withdrawn. | A notice whose bank details may have been changed. |
| **What the seller shares** | The fact that it is factoring, which the conversation makes plain to the buyer. | Only the notice it chose to send. | Only the notice it chose to send. |
| **Reach** | Wherever the factor can reach the right person, and be sure they are who they say. | Global in principle: any factor, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Staff time on both sides, and it can take days to reach the right person. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | A genuine contact at the buyer, and care against fake buyers and social engineering. | The factor to publish hashes, and Live Verify-aware software on the buyer's device. No factor does this yet. | Nothing. |
| **Best suited to** | Confirming the debt itself before funding. | Confirming that payment instructions came from the factor before money is redirected. | Nothing where a payment is redirected. |

**Where each fits:** A verification-of-debt call remains valuable, because a conversation with the buyer's accounts payable team can surface disputes, set-offs or delivery problems that no notice of assignment will mention. What a call handles less well is confirming that the payment instructions on a letter really came from the factor, and it can take days to reach the right person. Live Verify lets the buyer check the notice against the factor's domain straight away, and the two checks sit comfortably in the same process.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
