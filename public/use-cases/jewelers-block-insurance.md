---
title: "Jewelers Block Insurance (Stock & Transit)"
category: "Specialty Insurance"
volume: "Small"
retention: "Policy term + 10 years"
slug: "jewelers-block-insurance"
tags: ["jewelers-block", "diamond-trade", "luxury-goods-insurance", "vault-security", "stock-insurance", "transit-coverage", "lloyds"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #1a1a1a; color: #d4af37; padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d4af37;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em; letter-spacing: 1px;"><span verifiable-text="start" data-for="jewel">[</span>BERKLEY ASSET PROTECTION</div>
      <div style="font-size: 0.8em; color: #fff;">Specialist Jewelers Block Underwriters</div>
    </div>
    <div style="font-size: 1.5em;">💎</div>
  </div>
<div style="padding: 35px;">
    <h2 style="text-align: center; color: #000; font-size: 1.4em; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">Certificate of Jewelers Insurance</h2>
<div style="font-size: 1em; line-height: 1.6; color: #333;">
      <p>This document confirms that all-risk coverage is in effect for the following inventory:</p>
<div style="background: #fdfcf0; border: 1px solid #d4af37; padding: 15px; margin: 20px 0;">
        <strong>Insured:</strong> Imperial Diamonds & Fine Gems, LLC<br>
        <strong>Location:</strong> 42 Diamond Way, New York, NY
      </div>
<p><strong>Stock Limit (At Premises):</strong> $ 15,000,000.00<br>
      <strong>Transit Limit (FedEx/Brinks):</strong> $ 2,000,000.00<br>
      <strong>Vault Class:</strong> UL Class 3 / Verified</p>
<p><strong>Effective Date:</strong> March 15, 2026 to March 15, 2027</p>
    </div>
<div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 0.8em; color: #666; font-style: italic; text-align: center;">
      Subject to maintenance of verified alarm systems and 24-hour video surveillance.
    </div>
<div data-verify-line="jewel" style="border-top: 1px dashed #d4af37; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Berkley doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:berkleyassetpro.com/v <span verifiable-text="end" data-for="jewel">]</span>
    </div>
  </div>
</div>

## Data Verified

Insured name, premises address, stock-on-hand limit (USD), transit/shipping limits, specific vault/safe classification (UL Class), alarm monitoring status, trade show exhibition limits, memo/consignment limits, effective dates, issuing carrier.

**Document Types:**
- **Jewelers Block Certificate:** The primary proof of inventory protection.
- **Shipping Manifest Insurance:** For high-value FedEx/UPS/Brinks moves.
- **Consignment Memo:** (Linked hash) proving insurance for borrowed items.
- **Security Audit Report:** (Linked hash) proving the vault meets the policy terms.

## Data Visible After Verification

Shows the issuer domain (`berkleyassetpro.com`, `chubb.com`, `lloyds.com`) and current policy standing.

**Status Indications:**
- **In Force** — Premium paid; $15M inventory is covered.
- **Cancelled** — **ALERT:** Coverage terminated (High-risk for suppliers).
- **Excursion Alert** — Vault or Alarm status found non-compliant in recent audit.
- **Lapsed** — Renewal pending or overdue.

## Second-Party Use

The **Jeweler (Store Owner)** benefits from verification.

**Consignment Vetting:** Proving to a high-end diamond supplier (e.g., De Beers or a private dealer) that their $2M stone is "Verified Covered" while sitting in the store's vault. No supplier will hand over diamonds on "Memo" without 100% cryptographic certainty that the insurance is real and active.

**Trade Show Access:** Proving coverage to specialized logistics firms or show organizers (e.g., JCK Las Vegas) before moving millions in stock into a temporary booth.

## Third-Party Use

**Diamond & Gem Suppliers**
**Inventory Risk:** Before shipping a high-value parcel, the supplier scans the jeweler's COI. "Verified by Berkley" ensures the jeweler hasn't "Edited" the $500k limit to look like $5M to hide their actual exposure.

**Banks / Lenders**
**Collateral Vetting:** Verifying the "Stock-on-Hand" insurance before using the jeweler's inventory as collateral for an operating loan.

**High-Value Couriers (Brinks / Malca-Amit)**
**Handoff Integrity:** Verifying that the jeweler's "Transit Limits" are verified and in force before accepting a parcel for pickup.

## Verification Architecture

**The "Vapor-Block" Fraud Problem**

- **Limit Inflation:** Editing a $1M "Small Shop" policy to read $10M to trick suppliers into sending more diamonds on consignment than the jeweler can safely insure.
- **Cancellation Hiding:** Keeping a valid-looking "Active" paper certificate after the insurer cancelled the policy due to a security failure (e.g., broken alarm).
- **Vault Fraud:** Claiming a "UL Class 3" vault status on the paper certificate when the actual verified policy only covers a residential-grade safe.

**Issuer Types** (First Party)

**Specialty Luxury Carriers:** (Berkley Asset Protection, Chubb, Jewelers Mutual).
**Lloyd's Syndicates.**
**Security Auditing Firms:** (Hosting the verified vault hashes).

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


## Competition vs. Manual Broker Letters

| Feature | Live Verify | Manual Broker Letter | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Vault Class*. | **Subjective.** Relies on the broker's memory. | **Zero.** Easily forged. |
| **Speed** | **Instant.** 5-second scan at the vault. | **Slow.** Takes 2-3 business days to get a "Confirmation." | **Instant.** |
| **Availability** | **24/7.** Works during after-hours trades. | **Restricted.** Business hours only. | **Universal.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Carrier. | **Human.** Prone to social engineering. | **Vulnerable.** |

**Why Live Verify wins here:** The "Memo Moment." High-stakes gem trades often happen at 10 PM in hotel rooms or private clubs. Suppliers need to trust the insurance *right now* before handing over the stones. Live Verify turns the **Standard Insurance Folder** into a live digital checkpoint that provides "Bank-Vault" level trust anywhere in the world.
