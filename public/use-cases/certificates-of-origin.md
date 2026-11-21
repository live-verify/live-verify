---
title: "Certificates of Origin"
category: "Customs & Trade Compliance"
volume: "Medium"
retention: "7-10 years (customs audit, shipment records)"
slug: "certificates-of-origin"
verificationMode: "clip"
tags: ["trade-compliance", "customs", "export", "import", "logistics", "tariff-benefits", "origin-verification", "chamber-of-commerce", "international-trade"]
furtherDerivations: 1
---

## What is a Certificate of Origin?

A Certificate of Origin (CO) is the "Nationality Passport" for a shipment of goods. It is issued by a Chamber of Commerce and certifies that the products (microprocessors, precision gears, electronics, etc.) were truly "Born" in a specific country.

It's not just for geography—it's for Tariffs. If a company ships microprocessors from the USA to South Korea, they might pay 0% duty (tax) if they have a verified CO. If they don't have one, they might pay 10% or more. For a $1M shipment, a verified CO can save $50,000 in duties.

**The Fraud Problem:** Fraudsters often "launder" products—shipping goods from a high-tax country (like China) to a neutral country (like Vietnam) and creating a fake CO to avoid paying US or EU duties. Because these documents save companies millions in "Preferential Tariffs," they are high-value targets for forgery. Scammers create fake Chamber stamps and letterheads to trick customs agents into allowing duty-free entry for sanctioned or high-tariff goods.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0;">
  <div style="background: #333; color: #fff; padding: 10px; text-align: center;">
    <h3 style="margin: 0; text-transform: uppercase;"><span verifiable-text="start" data-for="origin-us"></span>CERTIFICATE OF ORIGIN</h3>
    <div style="font-size: 0.8em;">U.S. CHAMBER OF COMMERCE • WASHINGTON D.C.</div>
  </div>
<div style="padding: 20px; font-size: 0.8em;">
    <div style="display: flex; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 10px;">
      <div style="width: 50%; border-right: 1px solid #333; padding-right: 10px;">
        <strong>1. Exporter:</strong><br>
        Texas Instruments, Inc.<br>
        12500 TI Blvd, Dallas, TX 75243
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>2. Consignee:</strong><br>
        Samsung Electronics<br>
        Suwon, South Korea
      </div>
    </div>
<p><strong>3. Country of Origin:</strong> UNITED STATES OF AMERICA</p>
<p><strong>4. Description of Goods:</strong><br>
    Integrated Circuits (Microprocessors)<br>
    HS Code: 8542.31<br>
    Weight: 450 KG</p>
<div style="margin-top: 20px; border: 1px solid #000; padding: 10px;">
      <strong>CERTIFICATION:</strong><br>
      The U.S. Chamber of Commerce certifies that the goods described above originated in the country shown in box 3.
      <br><br>
      Date: 15 March 2026<br>
      Authorized Signature: <em>M. J. Smith</em>
    </div>
<div data-verify-line="origin-us" style="border-top: 1px dashed #999; margin-top: 25px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: US Chamber doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="origin-us">verify:uschamber.com/v</span> <span verifiable-text="end" data-for="origin-us"></span>
    </div>
  </div>
</div>

## The Problem: Origin Laundering Fraud

- **Transshipment Fraud:** Shipping goods from a high-tariff country (e.g., China) to a low-tariff neutral country (Vietnam), then creating a fake "Vietnam Origin" certificate to enter the US/EU duty-free.
- **HS Code Tampering:** Editing the HS code on the paper CO to a category with lower taxes.
- **Fake Stamps:** Forging the physical rubber stamp of a legitimate Chamber of Commerce.
- **Fabricated Chambers:** Creating fake "Chamber of Commerce" websites and domains to "verify" fake certificates.
- **Duplicate COs:** Using one legitimate CO for multiple shipments of the same goods.

## What Is Checked

Exporter name and location, Consignee name and location, specific Country of Origin, detailed description of goods, Harmonized System (HS) Codes, quantity/weight, Certificate ID number, certifying authority (Chamber name and location), date of certification.

**Document Types:**
- **Generic Certificate of Origin:** For countries without a specific FTA; non-preferential (quota monitoring, general trade).
- **Preferential CO:** Used for Free Trade Agreements (USMCA, CPTPP, bilateral FTAs) to get 0% or reduced duty.
- **GSP Certificate (Form A):** For preferential treatment for developing nations under Generalized System of Preferences.
- **Self-Certification:** Form filled out by the exporter (requires domain binding to the exporting company).

## What the Checker Sees

Shows the issuer domain (`uschamber.com`, `iccwbo.org`) and current certificate status.

**Status Indications:**
- **Verified** — Certificate is legitimate and recorded in the Chamber's official ledger; active and valid.
- **Revoked** — Exporter found to have misrepresented origin; certificate actively cancelled.
- **Amended** — Original certificate updated (e.g., due to quantity correction, correction of HS code).
- **Invalid** — Serial number mismatch; certificate rejected by customs.
- **Void** — Certificate has been cancelled (e.g., due to trade dispute, fraud investigation).
- **Superseded** — Replaced by a corrected or reissued certificate.
- **Alert** — Associated with a known "Origin Fraud" scheme or sanctioned trader.

## Who Holds It

The Exporter benefits from verification.

**Tariff Exemption:** Proving to foreign customs that the high-value electronics are US-origin, qualifying for 0% duty under a trade agreement. Verification prevents "Customs Holds" that can delay supply chains for weeks.

**Fast Customs Clearance:** Proving to Japanese/EU/Canadian customs that goods are truly UK/US/Korean origin. Verification prevents goods from being held at the port for 2 weeks while customs waits for a physical letter from the Chamber.

**Tariff Savings:** Proving eligibility for preferential tariff rates under FTAs. For a $1M shipment, savings can exceed $50,000.

**Brand Protection:** Proving the "Country of Manufacture" to consumers and retailers, protecting the "Made in USA," "Made in UK," or "Swiss Made" premium.

## Who Checks It

**Customs Authorities (CBP, HMRC, KCS, etc.)**
**Compliance Enforcement:** Instantly verifying that the "Country of Origin" on the paper invoice matches the official Chamber of Commerce record. This stops "Tariff Engineering" where high-tariff goods are mislabeled as lower-tariff origins.

**Anti-Fraud Enforcement:** Scanning the verification link instantly proves the Chamber of Commerce actually vouches for the origin claim, catching fake chambers and forged certificates.

**Freight Forwarders**
**Documentation Vetting:** Verifying the CO before the ship departs to ensure all export paperwork is compliant, preventing port rejections/fines at the destination.

**Risk Management:** Verifying the CO before loading the ship to ensure they won't be liable for "Origin Fraud" charges at the destination.

**Trade Finance Banks**
**Documentary Compliance:** Banks paying out on Letters of Credit verify the CO to ensure it hasn't been altered to bypass trade sanctions or quotas. Verification proves the document is authentic.

**Procurement Teams**
**Sourcing Transparency:** Large corporations (e.g., Apple, BMW, SpaceX) can verify the origin claims of their tier-2 and tier-3 suppliers to ensure compliance with ethical sourcing and trade laws.

## Who Issues It

**Issuer Types** (First Party)

- **Chambers of Commerce:** Primary issuers for Non-Preferential and Preferential COs (most countries have one per major city/region).
- **Government Trade Ministries:** Some nations issue COs directly via trade/commerce departments.
- **Customs Agencies:** Export/Import authorities that certify origin (CBP, HMRC).

## Authority Chain

**Pattern:** Regulated

Chambers of commerce issue origin certificates that customs agencies rely upon for tariff classification.

```
✓ origin.londonchamber.co.uk — Certifies country of product origin
  ✓ hmrc.gov.uk — Administers UK customs and excise
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Shared Trade Platforms

Shared trade-document platforms, such as the shipping-industry network GSBN (and TradeLens, before it closed)<!-- TODO(verify): TradeLens was discontinued by Maersk and IBM around early 2023; confirm closure date --> let carriers, ports and authorities that have joined exchange documents on a common ledger. Most certificates of origin are still issued on paper or PDF by chambers of commerce whose counterparties are on no common platform. The two answer different questions and work side by side.

| | Shared trade platform | Live Verify on the certificate | Unverified paper or PDF certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Members of that platform. | Anyone handed the certificate: a customs officer, an importer, a bank. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Shared document data, as posted by the participants. | Confirmation that the chamber issued this exact certificate, including the stated origin, as at its date. Nothing about whether the origin claim is correct. | A form whose country and stamps may have been forged. |
| **What the exporter shares** | Shipment documents with other members. | Only the certificate. | Only the certificate. |
| **Reach** | Participants in that platform, which only some carriers, ports and authorities have joined. | Global in principle: any chamber or issuing authority, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Fast between members; joining and integrating come first. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Every party in the chain to be on the same platform. | The chamber to publish hashes, and Live Verify-aware software on the checker's device. No chamber does this yet. | Nothing. |
| **Best suited to** | Trade lanes where the main parties are already members. | Certificates moving between parties who share no platform. | Nothing where duty rates depend on it. |

**Where each fits:** shared trade platforms can work well among the carriers, ports and authorities that have joined them. Most certificates of origin are still issued on paper or PDF by local chambers whose counterparties are not on any common platform. Live Verify lets a chamber of any size make its certificates checkable from its own domain, and a platform member can use both.

## Where Each Fits: Live Verify and Electronic Certificate Registries

Many chambers issue electronic certificates of origin through an accredited system, often run by a platform provider under the ICC World Chambers Federation framework<!-- TODO(verify): how ICC WCF accreditation relates to electronic certificate-of-origin platforms and their lookup pages -->, with an online page or login where the certificate can be looked up. Coverage depends on the chamber: some issue through such a system, some through a national one, and many still issue only on paper. Electronic registries and Live Verify answer different questions and work side by side.

| | Electronic certificate registry | Live Verify on the certificate | Unverified paper certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Customs and importers with access to that registry or its lookup page. | Anyone handed the certificate, including at a border gate. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The registry's record of the certificate. | Confirmation that the issuing chamber stands behind this exact certificate, as at its date. | A form whose stamps are easy to forge. |
| **What the exporter shares** | The certificate number or document. | Only the certificate. | Only the certificate. |
| **Reach** | Chambers that issue through that system. | Global in principle: any chamber, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Quick for those with access; issuing chambers pay to use the system. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The chamber to issue through the registry, and the checker to know how to reach it. | The chamber to publish hashes, and Live Verify-aware software on the checker's device. No chamber does this yet. | Nothing. |
| **Best suited to** | Chambers and customs authorities already working with the system. | Certificates from chambers outside any registry, and officers without registry access. | Nothing where duty rates depend on it. |

**Where each fits:** the ICC's electronic registry is a sound route where the chamber participates and the checking officer has access to it. A customs officer at a border gate may not, and many smaller chambers issue outside the registry. Live Verify lets the officer check the paper against the issuing chamber's own domain, so each chamber keeps its independence and the registry continues to serve those who use it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
