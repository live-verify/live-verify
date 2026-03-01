---
title: "Auction Records and Sale Documents"
category: "Art, Media & Publishing"
volume: "Very Small"
retention: "Permanent (price history)"
slug: "auction-records-sale-documents"
tags: ["auction", "price-history", "hammer-price", "provenance", "collectibles", "sales-receipt"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="auction">[</span>
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
  <span data-verify-line="auction">verify:phillips.com/sales/v</span> <span verifiable-text="end" data-for="auction">]</span>
</div>

## Data Verified

Auction house name, sale ID, lot number, artwork title/artist, hammer price, buyer's premium, total price, bidder ID (redacted/partial), date of sale, payment status.

**Document Types:**
- **Purchase Statement / Invoice:** Proving ownership and price paid.
- **Settlement Statement:** For the seller (net proceeds).
- **Price Result List:** Public list of hammer prices for a specific sale.

## Data Visible After Verification

Shows the issuer domain (`phillips.com`, `sothebys.com`) and the sale confirmation.

**Status Indications:**
- **Paid** — Funds received; title transfer verified.
- **Withdrawn** — The sale was cancelled or the item returned (e.g., authenticity dispute).
- **In-Dispute** — Payment or authenticity being litigated.

## Second-Party Use

The **Buyer** (second party) receives the purchase statement from the auction house (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The buyer has their own verified copy of the purchase. Most of the time, the document sits in their art collection files—the verification value is latent, there *if needed*.

**Peace of Mind:** The buyer can confirm at any time that the statement matches what the auction house's system recorded and hasn't been altered since they received it.

**Future Optionality:** If an estate valuation is needed, an insurance policy requires updating, or a loan is sought against the artwork, the buyer has cryptographic proof ready without needing to contact the auction house.

## Third-Party Use

The buyer (second party) may hand the verified document to various third parties:

**Insurance Underwriters**
Preventing "over-insurance" where a buyer claims they paid $5M for a work they actually won for $1M. Verification of the hammer price ensures the policy limit is accurate.

**Tax Authorities (Capital Gains)**
When the collector sells the work 10 years later, the tax authority can verify the original "Purchase Statement" to confirm the starting cost basis for capital gains tax.

**Art Market Researchers**
Verifying that "record-breaking prices" reported in the media are authentic and matched by actual paid invoices, preventing "shill bidding" or fabricated price reports.

## Verification Architecture

**The "Hammer Price" Fraud Problem**

- **Price Pumping:** Creating a fake auction invoice showing a $5M price for a piece actually worth $50k, to trick a lender or a future buyer.
- **Tax Evasion:** Fabricating an invoice with a *lower* price to reduce sales tax or import duties.
- **Identity Theft:** Using a real auction invoice from a famous collector to "legitimize" a fake version of the same painting.

**Issuer Types (First Party)**

- Major Auction Houses (Phillips, Christie's, Sotheby's, Bonhams)
- Online Platforms (Artsy, LiveAuctioneers, Heritage Auctions)

**Privacy Salt:** Not required. Auction purchase statements contain highly unpredictable variables—unique lot numbers, specific sale IDs with dates, buyer/bidder IDs, artwork titles and years, precise hammer prices, and calculated premiums with exact tax percentages. These elements combined provide sufficient entropy that enumeration attacks are infeasible. Adding salt would provide no additional security benefit.

## Jurisdictional Witnessing

A jurisdiction may require auction houses to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the auction house, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change (withdrawn, in-dispute), or even a 404 (record deleted)
- Receives structured content/metadata (sale IDs, lot numbers, hammer prices, total amounts)
- Does **NOT** receive plaintext (buyer names, bidder identities, payment details)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to buyers/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Auction house cannot deny issuing the purchase statement
- **Timestamp proof:** Sale occurred at a specific time with specific terms
- **Regulatory audit:** Art market regulators can inspect the witness ledger for price manipulation
- **Resilience:** Verification works even if auction house's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Auction house domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. Public Price Databases

| Feature | Live Verify | Public Database (Artnet/Artprice) | Private PDF / Invoice |
| :--- | :--- | :--- | :--- |
| **Privacy** | **High.** Only the specific buyer/lot is verified. | **Low.** Everyone sees the price (but not who bought it). | **None.** Easily forged with Photoshop. |
| **Authority** | **Direct.** Binds the paper to the house's domain. | **Indirect.** Relies on third-party scrapers/reporters. | **Subjective.** "Is this signature real?" |
| **Detail** | **Full.** Includes premium, tax, and bidder ID. | **Partial.** Often just hammer price + premium. | **Full.** But untrusted. |

**Why Live Verify wins here:** An auction invoice is a private financial document. While the *price* might be public, the *fact that you paid it* is private. Live Verify allows a collector to prove their cost basis to a bank or tax office without the house needing to publish private bidder data to a public database.
