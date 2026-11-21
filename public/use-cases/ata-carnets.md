---
title: "ATA Carnets (Temporary Import/Export)"
category: "Customs & Trade Compliance"
volume: "Small"
retention: "Carnet validity + 7 years"
slug: "ata-carnets"
verificationMode: "clip"
tags: ["carnet", "customs", "trade", "logistics", "export", "import", "wco"]
furtherDerivations: 1
---

## What is an ATA Carnet?

An ATA Carnet is a "Passport for Goods." It allows businesses to temporarily ship equipment (like camera gear for a movie, or instruments for a rock band) into a foreign country without paying customs duties.

The catch is that you must bring the goods back home. If you sell the gear in the foreign country, you owe massive fines.

The Carnet is a physical booklet of colored papers that customs officers stamp at every border. If the booklet is fake or altered, the gear can be seized at the airport, ruining a tour or a film shoot.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #005a9c; background: #fff; padding: 0;">
  <div style="background: #005a9c; color: #fff; padding: 15px; text-align: center;">
    <h3 style="margin: 0; text-transform: uppercase;"><span verifiable-text="start" data-for="carnet"></span>ATA CARNET</h3>
    <div style="font-size: 0.8em;">UNITED STATES COUNCIL FOR INTERNATIONAL BUSINESS</div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div>
        <strong>Carnet No:</strong> US-99887766<br>
        <strong>Issued by:</strong> USCIB
      </div>
      <div style="text-align: right;">
        <strong>Valid Until:</strong> 15 MAR 2027
      </div>
    </div>
<div style="font-size: 0.9em; line-height: 1.5; color: #333;">
      <p><strong>Holder:</strong> RockBand Tours, LLC<br>
      123 Soundstage Way, Nashville, TN</p>
<p><strong>General Description of Goods:</strong><br>
      Musical Instruments, Amplifiers, and Audio Recording Equipment for Professional Use (Total Items: 42)</p>
<div style="background: #f0f7ff; border: 1px solid #b3d7ff; padding: 10px; margin: 15px 0;">
        <strong>Intended Use:</strong> Professional Equipment<br>
        <strong>Countries:</strong> UK, EU, JAPAN, AUSTRALIA
      </div>
<p style="font-size: 0.8em;">Customs at POE: Please endorse corresponding counterfoils.</p>
    </div>
<div data-verify-line="carnet" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: USCIB doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="carnet">verify:uscib.org/carnets/v</span> <span verifiable-text="end" data-for="carnet"></span>
    </div>
  </div>
</div>

## The Problem: Temporary Import Fraud

- **Ghost Exports:** Claiming to re-export goods (to close the carnet and get the bond back) while actually selling them on the black market in the foreign country.
- **Value Under-reporting:** Listing a $1M diamond as "Glass Sample" on the paper carnet to reduce the bond requirement.
- **Date Forgery:** Altering the "Valid Until" date to avoid paying duties when equipment stays in a country longer than 12 months.

## What Is Checked

Carnet number, holder name, total items, value of goods, countries of transit, expiration date, intended use (Commercial Samples, Professional Equipment, Fair/Exhibition).

**Document Types:**
- **Carnet Green Cover:** The main identification document.
- **Yellow Vouchers:** For the country of origin (Export/Re-import).
- **White Vouchers:** For the country of destination (Import/Re-export).
- **Blue Vouchers:** For transit countries.

## What the Checker Sees

Shows the issuer domain (`uscib.org`, `iccwbo.org`) and document status.

**Status Indications:**
- **Valid** — Carnet is active and backed by a security bond.
- **Closed** — All goods have been verified as returned; bond released.
- **Expired** — Re-export deadline passed; duties may be triggered.
- **Invalid** — Serial number mismatch or fraudulent document.

## Who Holds It

The Carnet Holder (Exporter) benefits from verification.

**Customs Clearance:** Proving to a Japanese customs officer that the Nashville band's 42 flight cases are "Verified Professional Equipment" and not illegal imports intended for sale. A verified carnet prevents the seizure of equipment or the demand for cash duties at the border.

**Bond Management:** Proving to the bond insurer that the carnet was properly closed at the final port of entry, speeding up the release of the collateral deposit.

## Who Checks It

**Customs Authorities (Foreign)**
**Risk Assessment:** Customs can verify the Carnet data against the national chamber of commerce record instantly. If the paper says "Musical Instruments" but the hash says "Luxury Watches," the discrepancy triggers an immediate inspection.

**Freight Forwarders**
**Acceptance:** Verifying the carnet is valid before accepting high-value temporary exports, ensuring they won't be held liable for foreign duties if the document is rejected at the destination.

**Event Organizers**
**Trade Show Logistics:** Ensuring all international exhibitors have valid carnets for their displays, preventing last-minute booth empty spaces due to customs hold-ups.

## Who Issues It

**Issuer Types** (First Party)

**National Chambers of Commerce:** (e.g., USCIB in the US, London Chamber in the UK).
**International Chamber of Commerce (ICC):** Overseeing the global chain.

## Authority Chain

**Pattern:** Regulated

Chambers of commerce issue carnets to certify the temporary export of goods across borders without duty.

```
✓ carnet.londonchamber.co.uk — Authorizes temporary import/export
  ✓ iccwbo.org — Administers international carnet conventions
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the customs authority's hashes and status changes plus structured metadata (carnet number, items, dates) — never plaintext or sensitive personal information — providing non-repudiation of the document.

## Compared With e-ATA (Digital Carnet)

| Feature | Live Verify | e-ATA (ICC Project) | Paper Carnet (Traditional) |
| :--- | :--- | :--- | :--- |
| **Connectivity** | **Needed for the check.** The paper carnet can be carried and read without a connection; checking it takes one small web request over any data connection. | **Needed.** Requires the app and a connection to the platform at the border. | **Manual.** Relies on physical stamps. |
| **Trust** | **Domain-Bound.** Trust the National Chamber. | **Platform-Bound.** Requires all countries to join the same IT system. | **Visual.** Prone to stamp forgery. |
| **Audit Trail** | **Hybrid.** Physical stamps + digital snapshots. | **Digital Only.** Hard to reconcile with physical boxes in a truck. | **Physical.** Hard to audit centrally. |

**Where each fits:** where both the issuing and the receiving customs administrations are on the e-ATA system and the officer has a working connection to it, the digital carnet is the more complete record. Many crossings still run on the paper carnet, and an officer at a smaller port may have no access to the platform. Live Verify lets that officer check the paper against the national chamber's domain with an ordinary browser, and the stamps and the e-ATA record continue to do their own jobs.
