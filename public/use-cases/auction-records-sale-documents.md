---
title: "Auction Records and Sale Documents"
category: "Art, Media & Publishing"
volume: "Very Small"
retention: "Permanent (price history)"
slug: "auction-records-sale-documents"
verificationMode: "clip"
tags: ["auction", "price-history", "hammer-price", "provenance", "collectibles", "sales-receipt"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="auction"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">PHILLIPS
NEW YORK - 432 PARK AVENUE
═══════════════════════════════════════════════════════════════════

                      PURCHASE STATEMENT

Sale:       NY010126 - Modern Masterpieces
Date:       15 March 2026
Bidder #:   9988

PURCHASE DETAIL
───────────────────────────────────────────────────────────────────
Lot 42: "The Electric Violin" (1962)                $ 1,200,000.00
Buyer's Premium:                                      $ 300,000.00
Sales Tax (8.875%):                                   $ 133,125.00
───────────────────────────────────────────────────────────────────
TOTAL AMOUNT DUE:                                   $ 1,633,125.00

Payment received in full. Title transferred upon clearance of funds.

                    ________________________
                    Auction House Controller
                    Invoice #: INV-9982-X

</pre>
  <span data-verify-line="auction">verify:phillips.com/sales/v</span> <span verifiable-text="end" data-for="auction"></span>
</div>

## The Problem: Hammer Price Fraud

- **Price Pumping:** Creating a fake auction invoice showing a $5M price for a piece actually worth $50k, to trick a lender or a future buyer.
- **Tax Evasion:** Fabricating an invoice with a *lower* price to reduce sales tax or import duties.
- **Identity Theft:** Using a real auction invoice from a famous collector to "legitimize" a fake version of the same painting.

## What Is Checked

Auction house name, sale ID, lot number, artwork title/artist, hammer price, buyer's premium, total price, bidder ID (redacted/partial), date of sale, payment status.

**Document Types:**
- **Purchase Statement / Invoice:** Proving ownership and price paid.
- **Settlement Statement:** For the seller (net proceeds).
- **Price Result List:** Public list of hammer prices for a specific sale.

## What the Checker Sees

Shows the issuer domain (`phillips.com`, `sothebys.com`) and the sale confirmation.

**Status Indications:**
- **Paid** — Funds received; title transfer verified.
- **Withdrawn** — The sale was cancelled or the item returned (e.g., authenticity dispute).
- **In-Dispute** — Payment or authenticity being litigated.

## Who Holds It

The Buyer (second party) receives the purchase statement from the auction house (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The buyer has their own verified copy of the purchase. Most of the time, the document sits in their art collection files—the verification value is latent, there *if needed*.

**Peace of Mind:** The buyer can confirm at any time that the statement matches what the auction house's system recorded and hasn't been altered since they received it.

**Future Optionality:** If an estate valuation is needed, an insurance policy requires updating, or a loan is sought against the artwork, the buyer has cryptographic proof ready without needing to contact the auction house.

## Who Checks It

The buyer (second party) may hand the verified document to various third parties:

**Insurance Underwriters**
Preventing "over-insurance" where a buyer claims they paid $5M for a work they actually won for $1M. Verification of the hammer price ensures the policy limit is accurate.

**Tax Authorities (Capital Gains)**
When the collector sells the work 10 years later, the tax authority can verify the original "Purchase Statement" to confirm the starting cost basis for capital gains tax.

**Art Market Researchers**
Verifying that "record-breaking prices" reported in the media are authentic and matched by actual paid invoices, preventing "shill bidding" or fabricated price reports.

## Who Issues It

**Issuer Types (First Party)**

- Major Auction Houses (Phillips, Christie's, Sotheby's, Bonhams)
- Online Platforms (Artsy, LiveAuctioneers, Heritage Auctions)

**Privacy Salt:** Not required. Auction purchase statements contain highly unpredictable variables—unique lot numbers, specific sale IDs with dates, buyer/bidder IDs, artwork titles and years, precise hammer prices, and calculated premiums with exact tax percentages. These elements combined provide sufficient entropy that enumeration attacks are infeasible. Adding salt would provide no additional security benefit.

## Authority Chain

**Pattern:** Commercial

Auction houses are self-authorized to issue purchase statements and hammer price confirmations. They hold both the buyer and seller contract, making them the definitive source for sale records and payment terms.

```
✓ sales.sothebys.com/verify — Issues auction purchase statements and price confirmations
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Public Price Databases

Price databases such as Artnet and Artprice compile auction results from sales around the world, and valuers and researchers rely on them for what a lot sold for. They answer a different question from Live Verify and work side by side: the database records the public sale price, while Live Verify lets a buyer prove the private details of their own purchase, as invoiced by the auction house.

| | Public price database | Live Verify on the invoice or sale record | Invoice as PDF or paper |
| :--- | :--- | :--- | :--- |
| **Who can check** | Subscribers and, for some data, the public. | Anyone handed the invoice: a bank, a tax office, an insurer, a later buyer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The published result for the lot, usually the hammer price or price with premium, without the buyer's identity. | Confirmation that the auction house issued this exact invoice, including premium, tax and buyer, as at its date. | A document that may have been edited. |
| **What the buyer shares** | Nothing; the result is published by the house. | Only the invoice they chose to hand over. | The invoice. |
| **Reach** | Sales the database covers, across many houses and countries. | Global in principle: any auction house that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Fast to search; many services charge a subscription. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The house to publish results and the database to collect them. | The auction house to publish hashes, and Live Verify-aware software on the checker's device. No auction house does this yet. | Nothing. |
| **Best suited to** | Market research and valuation. | Proving a specific purchase to a bank or tax office. | Nothing where the amount matters. |

**Where each fits:** public price databases are the right reference for what a lot sold for, and valuers and researchers will go on using them. They do not show who bought it or what that buyer paid in premium and tax. Live Verify lets a collector prove those private details to a bank or tax office by showing an invoice the auction house stands behind, without the house publishing any bidder data, provided the checker has software that honours it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
