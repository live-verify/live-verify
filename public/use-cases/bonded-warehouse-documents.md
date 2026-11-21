---
title: "Bonded Warehouse Entry and Exit Documents"
category: "Customs & Trade Compliance"
volume: "Medium"
retention: "7-10 years (customs compliance)"
slug: "bonded-warehouse-documents"
verificationMode: "clip"
tags: ["customs", "logistics", "warehouse", "duty-deferral", "international-trade", "cbp"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Courier New', monospace; border: 2px solid #000; background: #fff; padding: 20px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <strong><span verifiable-text="start" data-for="bonded"></span>GLOBAL LOGISTICS BONDED HUB</strong><br>
    U.S. CUSTOMS CLASS 3 WAREHOUSE (#998877)<br>
    -------------------------------------------
  </div>
<div style="font-size: 0.9em; line-height: 1.4;">
    <p><strong>Importer of Record:</strong> Swiss Watch Imports, Inc.<br>
    <strong>Customs Entry #:</strong> 110-9988776-5<br>
    <strong>Warehouse Receipt:</strong> WR-2026-402</p>
<p><strong>Cargo Description:</strong><br>
    10 Pallets: Luxury Watches (High Value)<br>
    Total Weight: 1,200 KG<br>
    Declared Value: $ 2,500,000.00</p>
<div style="background: #eee; padding: 10px; margin: 15px 0; border: 1px solid #999;">
      <strong>STATUS: ADMITTED UNDER BOND</strong><br>
      Entry Date: 15 MAR 2026<br>
      Bond Holder: Great American Insurance Co.<br>
      Duty Deferral Status: ACTIVE
    </div>
<p style="font-size: 0.8em;">Goods may not be removed until Customs Form 7501 is processed and duties paid.</p>
  </div>
<div data-verify-line="bonded" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Warehouse operator doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="bonded">verify:global-bonded.com/receipts/v</span> <span verifiable-text="end" data-for="bonded"></span>
  </div>
</div>

## The Problem: Leakage Fraud

- **Ghost Removals:** Physically removing goods from the warehouse to sell them domestically while keeping the "Admitted" paper receipt on an empty pallet to fool inspectors.
- **Value Swapping:** Admitting a box of "Luxury Watches" but re-writing the exit paper to read "Plastic Toys" to pay lower duties.
- **Fictitious Admissions:** Creating a fake warehouse receipt to trick a bank into giving a loan for cargo that doesn't exist.

## What Is Checked

Importer name, Customs Entry Number, Warehouse Receipt Number, Class of Warehouse (1-11), inventory description, gross weight, declared value, bond reference, admission date, duty deferral status.

**Document Types:**
- **Warehouse Receipt (Form 214 equivalent):** Admission into the bond.
- **Withdrawal for Consumption (Form 7501):** Paying duty and exiting.
- **Withdrawal for Export:** Exiting to another country without paying domestic duty.
- **Transfer Document:** Moving goods between two bonded warehouses.

## What the Checker Sees

Shows the issuer domain (the Warehouse Operator) and current cargo status.

**Status Indications:**
- **Admitted** — Goods are physically in the warehouse and under bond.
- **Released** — Customs duties paid; goods authorized for exit.
- **In-Transit** — Moving between bonded facilities.
- **Seized/Hold** — Customs has frozen the cargo (e.g., for investigation).

## Who Holds It

The Importer benefits from verification.

**Trade Finance:** Proving to a bank that $2.5M worth of watches is "Verified in Custody" at a bonded warehouse. This allows the importer to use the cargo as collateral for a loan before the duties are even paid.

**Audit Compliance:** Providing a "Verified Admission Log" to Customs during an annual audit to prove that all deferred-duty goods are accounted for.

## Who Checks It

**Customs Authorities (CBP / HMRC)**
**Inventory Control:** Customs officers can walk the warehouse floor and scan the paper receipts attached to pallets. "Verified by Warehouse System" ensures the importer hasn't "ghosted" the cargo (sold it without paying duty).

**Lenders / Banks**
**Asset Verification:** Verifying the "Bonded Status" ensures that the bank's collateral is being held in a regulated facility where it can't be legally moved without a Customs release.

**Cargo Insurers**
**Risk Monitoring:** Insurers can verify that high-value cargo is actually inside the high-security bonded zone and not sitting on an unmonitored loading dock.

## Who Issues It

**Issuer Types** (First Party)

**Bonded Warehouse Operators:** (Class 3 Public, Class 4 Yard, etc.).
**Foreign Trade Zone (FTZ) Operators.**
**Customs Brokers.**

## Authority Chain

**Pattern:** Sovereign

HMRC administers bonded warehouse duty deferral and inventory control under the Customs and Excise Management Act 1979.

```
✓ customs.hmrc.gov.uk/bonded/verify — HMRC bonded warehouse duty deferral service
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Customs Systems such as ACE

In the US, entries into and out of bonded warehouses are recorded in CBP's ACE system, which brokers and warehouse operators access with credentials. Other countries run their own customs systems for bonded goods. ACE and Live Verify answer different questions and work side by side: ACE is the official record of the entry, while Live Verify lets someone on the warehouse floor check a receipt or pallet tag issued by the operator.

| | Customs system (ACE) | Live Verify on the warehouse receipt or tag | Paper receipt |
| :--- | :--- | :--- | :--- |
| **Who can check** | Customs, brokers and operators with credentials. | Anyone handed the receipt or tag: a trucker, a lender, an auditor, an insurer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The official entry and its line items. | Confirmation that the warehouse operator issued this exact receipt, as at its date. | A receipt that may have been forged. |
| **What the importer shares** | Data filed with customs. | Only the documents they chose to hand over. | The receipt. |
| **Reach** | One country's customs system and its credentialed users. | Global in principle: any warehouse operator that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Credentialed users must log in and search by entry number. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Credentials for the customs system. | The operator to publish hashes, and Live Verify-aware software on the checker's device. No warehouse operator does this yet. | Nothing. |
| **Best suited to** | Customs filing and compliance. | Checks on the warehouse floor and by lenders and auditors. | Nothing where the goods matter. |

**Where each fits:** the customs portal is the official record of entries and remains what brokers and customs offices file against and query. Truckers, lenders and auditors on the warehouse floor generally hold no credentials for it. Live Verify lets them check a receipt or pallet tag against the warehouse operator's domain on the spot, if their device has software that honours it, and the customs system stays the reference for the entry itself.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
