---
title: "Jewelers Block Insurance (Stock & Transit)"
category: "Specialty Insurance"
volume: "Small"
retention: "Policy term + 10 years"
slug: "jewelers-block-insurance"
verificationMode: "clip"
tags: ["jewelers-block", "diamond-trade", "luxury-goods-insurance", "vault-security", "stock-insurance", "transit-coverage", "lloyds"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #1a1a1a; color: #d4af37; padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d4af37;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em; letter-spacing: 1px;"><span verifiable-text="start" data-for="jewel"></span>BERKLEY ASSET PROTECTION</div>
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
      <span data-verify-line="jewel">verify:berkleyassetpro.com/v</span> <span verifiable-text="end" data-for="jewel"></span>
    </div>
  </div>
</div>

## The Problem: Vapor-Block Fraud

- **Limit Inflation:** Editing a $1M "Small Shop" policy to read $10M to trick suppliers into sending more diamonds on consignment than the jeweler can safely insure.
- **Cancellation Hiding:** Keeping a valid-looking "Active" paper certificate after the insurer cancelled the policy due to a security failure (e.g., broken alarm).
- **Vault Fraud:** Claiming a "UL Class 3" vault status on the paper certificate when the actual verified policy only covers a residential-grade safe.

## What Is Checked

Insured name, premises address, stock-on-hand limit (USD), transit/shipping limits, specific vault/safe classification (UL Class), alarm monitoring status, trade show exhibition limits, memo/consignment limits, effective dates, issuing carrier.

**Document Types:**
- **Jewelers Block Certificate:** The primary proof of inventory protection.
- **Shipping Manifest Insurance:** For high-value FedEx/UPS/Brinks moves.
- **Consignment Memo:** (Linked hash) proving insurance for borrowed items.
- **Security Audit Report:** (Linked hash) proving the vault meets the policy terms.

## What the Checker Sees

Shows the issuer domain (`berkleyassetpro.com`, `chubb.com`, `lloyds.com`) and current policy standing.

**Status Indications:**
- **In Force** — Premium paid; $15M inventory is covered.
- **Cancelled** — Coverage terminated (High-risk for suppliers).
- **Excursion Alert** — Vault or Alarm status found non-compliant in recent audit.
- **Lapsed** — Renewal pending or overdue.

## Who Holds It

The Jeweler (Store Owner) benefits from verification.

**Consignment Vetting:** Proving to a high-end diamond supplier (e.g., De Beers or a private dealer) that their $2M stone is "Verified Covered" while sitting in the store's vault. No supplier will hand over diamonds on "Memo" without 100% cryptographic certainty that the insurance is real and active.

**Trade Show Access:** Proving coverage to specialized logistics firms or show organizers (e.g., JCK Las Vegas) before moving millions in stock into a temporary booth.

## Who Checks It

**Diamond & Gem Suppliers**
**Inventory Risk:** Before shipping a high-value parcel, the supplier scans the jeweler's COI. "Verified by Berkley" ensures the jeweler hasn't "Edited" the $500k limit to look like $5M to hide their actual exposure.

**Banks / Lenders**
**Collateral Vetting:** Verifying the "Stock-on-Hand" insurance before using the jeweler's inventory as collateral for an operating loan.

**High-Value Couriers (Brinks / Malca-Amit)**
**Handoff Integrity:** Verifying that the jeweler's "Transit Limits" are verified and in force before accepting a parcel for pickup.

## Who Issues It

**Issuer Types** (First Party)

**Specialty Luxury Carriers:** (Berkley Asset Protection, Chubb, Jewelers Mutual).
**Lloyd's Syndicates.**
**Security Auditing Firms:** (Hosting the verified vault hashes).

## Authority Chain

**Pattern:** Regulated

Chubb, a regulated specialty insurer, is authorized by the FCA to issue verified jewelers block insurance policies for stock and transit coverage.

```
✓ jewelers.chubb.com/verify — Issues verified jewelers block insurance policies
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Broker Confirmation Letters

When a supplier wants to know that a jeweler's block policy is in force before handing over goods on memo, the usual route is a confirmation letter from the jeweler's broker. The broker can explain terms and exclusions in a way no certificate can. The letter and Live Verify answer different questions and work side by side: one is the broker's considered account of the cover, the other lets the supplier confirm on the spot that the carrier stands behind the certificate as presented.

| | Broker confirmation letter | Live Verify on the insurance certificate | Scanned PDF certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | The supplier, once the broker responds. | Anyone handed the certificate: a supplier, a consignor, a trade-show organizer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The broker's written account of the cover, with room for explanation of terms and exclusions. | Confirmation that the carrier issued this exact certificate, including the vault class and limits, as at its date, and whether it has since been cancelled. | A certificate whose limits or vault class may have been edited. |
| **What the jeweler shares** | Whatever the broker is asked to confirm. | Only the certificate they chose to hand over. | Only the certificate they chose to hand over. |
| **Reach** | Wherever the broker can be reached, in business hours. | Global in principle: any carrier, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Usually days, and dependent on office hours. | A few seconds per check, at any hour: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | A broker who responds, and care that the request is not being intercepted or spoofed. | The carrier to publish hashes, and Live Verify-aware software on the checker's device. No carrier does this yet. | Nothing. |
| **Best suited to** | Large or unusual consignments, where the terms matter in detail. | Trades agreed out of hours or away from the office. | Nothing where the goods are valuable. |

**Where each fits:** A broker's confirmation letter is still the right route when there is time, since the broker can explain terms and exclusions in a way a certificate cannot. Trades agreed out of hours or away from the office do not always allow days for that. Live Verify lets the supplier confirm then and there that the carrier stands behind the certificate as presented, and a broker letter can follow where the deal warrants it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
