---
title: "Marine Cargo Insurance Certificates"
category: "Specialty Insurance"
volume: "Small"
retention: "Transit period + 7-10 years"
slug: "marine-insurance"
verificationMode: "clip"
tags: ["cargo-security", "certificate-of-insurance", "certificates", "club", "h-and-m", "hull-and-machinery", "icc-a-clauses", "imo-vessel", "international-trade-finance", "lloyds", "logistics", "marine-cargo", "marine-insurance", "maritime-safety", "ocean-freight-insurance", "risk-management", "ship-finance", "transportation", "vessel-valuation"]
furtherDerivations: 3
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial Narrow', sans-serif; border: 2px solid #002d62; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="cargo-ins"></span>ALLIANZ MARINE & TRANSIT</div>
    <div style="font-size: 0.8em; text-align: right;">Certificate #: AZ-998877-MAR</div>
  </div>
<div style="padding: 15px; font-size: 0.85em;">
    <h2 style="text-align: center; margin: 0 0 15px 0; font-size: 1.3em; text-decoration: underline;">CERTIFICATE OF CARGO INSURANCE</h2>
<div style="display: flex; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 15px;">
      <div style="width: 50%; border-right: 1px solid #000; padding-right: 10px;">
        <strong>Assured:</strong><br>
        Global Retail Hub, Corp.<br>
        New York, NY, USA
      </div>
      <div style="width: 50%; padding-left: 10px;">
        <strong>Loss Payee:</strong><br>
        HSBC Bank PLC<br>
        (Trade Finance Unit)
      </div>
    </div>
<div style="background: #f9f9f9; padding: 10px; border: 1px solid #ccc; margin-bottom: 15px;">
      <p><strong>Voyage:</strong> Shanghai, CN to Long Beach, US<br>
      <strong>Vessel:</strong> MAERSK MC-KINNEY<br>
      <strong>Cargo:</strong> 420 Cartons: Consumer Electronics</p>
<strong>AMOUNT INSURED: USD 1,250,000.00</strong> (110% of CIF)
    </div>
<div style="font-size: 0.8em; line-height: 1.4;">
      <strong>Conditions:</strong> Institute Cargo Clauses (A) 1/1/09, Institute War Clauses, Institute Strikes Clauses.
    </div>
<div style="margin-top: 20px; display: flex; justify-content: space-between;">
      <div><strong>Date Issued:</strong> March 15, 2026</div>
      <div style="text-align: right; width: 60px; height: 60px; border: 2px solid #002d62; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold;">OFFICIAL<br>STAMP</div>
    </div>
<div data-verify-line="cargo-ins" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #555; text-align: center;"
      title="Demo only: Allianz doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="cargo-ins">verify:allianz.com/marine/v</span> <span verifiable-text="end" data-for="cargo-ins"></span>
    </div>
  </div>
</div>

## The Problem: Ghost Policy Fraud

- **Fabricated Certificates:** Small, un-vetted brokers creating fake "Lloyd's" certificates for shipments that don't exist, to trick banks into providing "Trade Financing."
- **Limit Inflation:** Editing a $10,000 policy to read $1,000,000 to use as collateral for a fraudulent loan.
- **Exclusion Concealment:** Deleting the clause that excludes "War Risks" or "Strikes" before sending the policy to a bank during a global conflict.

## What Is Checked

Assured name, Loss Payee (Bank), Certificate number, Vessel name, Voyage route (Port-to-Port), cargo description, total amount insured (usually 110% of CIF), coverage clauses (e.g., ICC A), issuing broker/carrier, date of issuance.

**Document Types:**
- **Marine Cargo Certificate:** Issued per shipment under an open policy.
- **Open Cover Summary:** For high-volume exporters.
- **Declaration of Value:** (Linked hash) for specific high-risk loads.
- **Survey Report:** (Linked hash) proving cargo was non-damaged at loading.

## What the Checker Sees

Shows the issuer domain (`allianz.com`, `zurich.com`, `chubb.com`) and current policy standing.

**Status Indications:**
- **Active/In-Force** — Premium paid; cargo is verified covered.
- **Cancelled** — Coverage terminated (High-risk for banks/sellers).
- **Claim Active** — Incident reported (e.g., General Average or Cargo Loss).
- **Void** — Assigned to wrong vessel or misdeclared.

## Who Holds It

The Exporter / Importer (Assured) benefits from verification.

**Trade Finance (L/C):** Proving to a bank that the $1.25M insurance claim is verified by the source. Banks won't payout on a Letter of Credit without 100% cryptographic certainty that the insurance matches the shipment details. A verified hash prevents the bank from rejecting the certificate due to "Paperwork Inconsistency."

**Payment Assurance:** A buyer in NYC can verify the insurance provided by the Shanghai seller to ensure the goods are fully protected against a "Total Loss at Sea" before wiring the final balance.

## Who Checks It

**Banks (Lenders / Negotiating Banks)**
**Collateral Protection:** Marine insurance is the only thing protecting the bank's money if the ship sinks. Verification ensures the borrower hasn't "Edited" the PDF to show a $1M limit when they only paid for $100k.

**Ocean Carriers / Ship Lines**
**Liability Handoff:** Verifying that "Shipper-Interest Insurance" is in place for high-value or hazardous cargo, reducing the carrier's exposure to 3rd party claims.

**Customs Authorities**
**Valuation Check:** Verifying the "Insured Value" as a secondary check on the "Commercial Invoice" value to catch tax/duty evasion.

## Who Issues It

**Issuer Types** (First Party)

**Global Marine Carriers:** (Allianz, Zurich, Chubb, AXA XL).
**Specialist Brokers:** (Marsh, Aon, Gallagher).
**Lloyd's Syndicates.**

## Where Each Fits: Live Verify and Shared-Ledger Trade Platforms

Shared-ledger trade platforms let shippers, carriers, banks and insurers exchange trade documents on a common network; TradeLens, run by Maersk and IBM, was the best known and has since been discontinued. Such platforms and Live Verify answer different questions and work side by side: one serves members of the same network, the other lets a counterparty outside it confirm a cargo insurance certificate against the insurer's own domain.

| | Shared-ledger trade platform | Live Verify on the insurance certificate | Paper or PDF certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Participants who have joined that network. | Anyone handed the certificate: a local bank, a port agent, a buyer, a small exporter. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Records shared on the network, in structured form. | Confirmation that the insurer issued this exact certificate, insured values included, as at its date, and whether it has since been cancelled. | A certificate whose values may have been edited. |
| **What the shipper shares** | Whatever is put on the network. | Only the certificate they chose to hand over. | Only the certificate they chose to hand over. |
| **Reach** | Members of that platform, for as long as it runs. | Global in principle: any insurer, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Fast among members; joining and integration come first. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | Every party on the same network. | The insurer to publish hashes, and Live Verify-aware software on the checker's device. No marine insurer does this yet. | Nothing. |
| **Best suited to** | Trade lanes where all the main parties have joined. | Counterparties outside any platform who still receive paper or PDF. | Nothing where a claim or payment depends on it. |

**Where each fits:** Shared-ledger trade platforms can work well among participants who have all joined the same network, and where they are in place there is no reason to abandon them. A local bank, port agent or small exporter outside the network still receives the certificate as paper or PDF. Live Verify lets them confirm it against the insurer's own domain, which gives a platform's members a way to deal with counterparties who are not on it.

---

_[Content merged from: marine-hull-machinery]_

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #002366; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #002366; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="hull-ins"></span>GARD MARINE & ENERGY</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Specialist Hull & Machinery Underwriters</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: HM-99228877-26</div>
    </div>
  </div>
<div style="padding: 35px;">
    <h2 style="text-align: center; color: #002366; font-size: 1.4em; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">Evidence of Hull Coverage</h2>
<div style="font-size: 1em; line-height: 1.6; color: #333;">
      <p>This document confirms that the following vessel is insured for Hull & Machinery risks:</p>
<div style="background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
        <strong>Vessel Name:</strong> MV OCEAN VOYAGER<br>
        <strong>IMO Number:</strong> 9988776<br>
        <strong>Flag State:</strong> Marshall Islands
      </div>
<p><strong>Agreed Hull Value:</strong> USD 45,000,000.00<br>
      <strong>Trading Limits:</strong> Worldwide (Excl. Sanctioned Zones).<br>
      <strong>Classification:</strong> Lloyd's Register (Verified)</p>
<p><strong>Effective:</strong> Jan 01, 2026 to Jan 01, 2027</p>
    </div>
<div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 0.8em; color: #666; font-style: italic; text-align: center;">
      Subject to the Nordic Marine Insurance Plan or Institute Time Clauses (Hull).
    </div>
<div data-verify-line="hull-ins" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Gard doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="hull-ins">verify:gard.no/hull/v</span> <span verifiable-text="end" data-for="hull-ins"></span>
    </div>
  </div>
</div>

## What Is Checked

Vessel name, IMO number (unique 7-digit ID), Flag State, agreed hull value (USD), deductible amount, classification society (e.g., ABS, DNV, LR), primary underwriter ID, effective/expiration dates, trading limit inclusions/exclusions.

**Document Types:**
- **Evidence of Hull Insurance:** Required for port entry and bank compliance.
- **Certificate of Entry:** (Linked hash) for P&I crossover items.
- **Vessel Mortgage Endorsement:** Proving the bank is the "Loss Payee."
- **Condition Survey:** (Linked hash) proving the ship is sea-worthy.

## What the Checker Sees

Shows the issuer domain (`gard.no`, `skuld.com`, `chubb.com`) and current policy standing.

**Status Indications:**
- **In Force** — Premium paid; vessel is verified covered.
- **Suspended** — Coverage paused due to class suspension or survey failure.
- **Cancelled** — Policy terminated (Extreme risk for ship-mortgage holders).
- **Lapsed** — Term ended; no renewal found.

## Who Holds It

The Shipowner / Operator benefits from verification.

**Ship Finance:** Proving to a maritime lender (e.g., DNB or Nordea) that the $45M asset is "Verified Insured." Banks won't advance funds for bunker fuel or maintenance without 100% cryptographic certainty that the hull insurance is real and active.

**Port Entry:** Proving to a foreign port authority (e.g., Singapore or Rotterdam) that the vessel has the mandatory hull and pollution-related insurance to enter the harbor.

## Who Checks It

**Ship-Mortgage Lenders**
**Collateral Protection:** H&M insurance is the only thing protecting the bank's $45M loan if the ship sinks. Verification ensures the owner hasn't "Edited" the PDF to show a $45M value when they actually only insured it for $20M to save on premiums.

**Maritime Lawyers / Arbitrators**
**Evidence Audit:** Instantly verifying the "Trading Limits" of a vessel involved in a casualty. If the ship crashed in an "Excluded Zone," the verified hash provides the definitive proof needed for the coverage dispute.

**Bunker Suppliers**
**Credit Vetting:** Verifying the insurance quality of a vessel before providing $500,000 in fuel on credit terms.

## How Verification Works Here

**The "Ghost Ship" Fraud Problem**

- **Value Inflation:** Editing an agreed value from $10M to $50M to trick a bank into giving a larger ship-mortgage.
- **Exclusion Erasure:** Deleting the line that excludes "War Risk Zones" before sailing into a conflict area.
- **Classification Fraud:** Claiming the ship is "In Class" with Lloyd's Register on the paper form when their class has actually been suspended for safety failures.

**Issuer Types** (First Party)

**Marine Mutuals (Clubs):** (e.g., Gard, Skuld).
**Commercial Marine Carriers:** (Chubb, Swiss Re, Munich Re).
**Lloyd's Syndicates.**

## Where Each Fits: Live Verify and Vessel Databases

Equasis, a free public database backed by maritime administrations, and commercial vessel databases such as those formerly run by IHS Markit gather information on ships: history, ownership, inspections and often the name of the insurer. They are the right place to research a ship. They answer a different question from a verified hull and machinery policy, and the two work side by side.

| | Equasis and commercial vessel databases | Live Verify on the policy declaration | Scanned PDF policy |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone registered with Equasis; subscribers for the commercial databases' fuller data. | Anyone handed the declaration: a port authority, a ship financier, a buyer, a lawyer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The ship's record, often including who insures it, but generally not the policy's terms. | Confirmation that the underwriter issued this exact declaration, hull value included, as at its date, and whether it has since been cancelled. | A document whose values may have been edited. |
| **What the owner shares** | Nothing; the data is compiled by others. | Only the declaration they chose to hand over. | Only the declaration they chose to hand over. |
| **Reach** | The world fleet, as far as the database covers it. | Global in principle: any underwriter, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Free or by subscription; updated on the database's own schedule. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate. |
| **What it needs** | A registration or subscription. | The underwriter to publish hashes, and Live Verify-aware software on the checker's device. No marine underwriter does this yet. | Nothing. |
| **Best suited to** | Researching a ship's history, ownership and inspections. | Confirming the cover in a closing file or a port call. | Nothing where the hull value matters. |

**Where each fits:** Equasis and the commercial vessel databases are the right place to research a ship: its history, ownership, inspections and the name of its insurer. They generally do not reproduce the terms of a particular policy, and they update on their own schedule. Live Verify lets a port, financier or lawyer confirm that the underwriter stands behind the declaration page in the closing file, alongside the database search.

---

_[Content merged from: pi-club-certificates]_

## What is a P&I Certificate?

In the world of giant cargo ships, "Normal" insurance isn't enough. Shipowners join a P&I Club (Protection & Indemnity)—a group of owners who share the risk of massive disasters like oil spills or ship collisions.

The Certificate of Entry is the ship's "Unlimited Credit Card" for liability. It is the only paper that port authorities will accept before allowing a $100 million tanker to dock.

Thieves use "Fake P&I Papers" to sneak dangerous or uninsured ships into ports. Verified hashes allow a harbor master to scan the certificate and see the verified $1 billion+ coverage on the Club's official domain in seconds.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #002366; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #002366; padding-bottom: 10px; margin-bottom: 20px;">
    <h2 style="margin: 0; text-transform: uppercase;"><span verifiable-text="start" data-for="pi"></span>THE LONDON P&I CLUB</h2>
  </div>
  <div style="font-size: 1.1em; line-height: 1.6;">
    <p><strong>Vessel:</strong> MV OCEAN VOYAGER (IMO #9988776)<br>
    <strong>Member:</strong> Global Maritime Holdings, Ltd.</p>
    <p>This certifies the above vessel is entered for Protection & Indemnity risks.</p>
    <div data-verify-line="pi" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
      <span data-verify-line="pi">verify:londonpandi.com/v</span> <span verifiable-text="end" data-for="pi"></span>
    </div>
  </div>
</div>

**Certificate Variations:** Multiple certificate types or levels may exist.

## What the Checker Sees

Shows the issuer domain and the responder text (e.g., "Valid ID" or "Denied").

**Status Indications:**
- **Valid** - Document verified and current
- **Expired** - Document has reached expiration
- **Revoked** - Document has been revoked or cancelled
- **Superseded** - A newer version exists

The verification response may include additional context such as issue date, expiration date, or document serial numbers.

## Who Holds It

The document holder (subject/recipient) benefits from verification.

**Authenticity Confirmation:** Verify certificate after receipt to confirm it's genuine.

**Credential Display:** Present verified credentials to employers or clients.

**Professional Development:** Track verified certifications for career advancement.

**Compliance Documentation:** Maintain verified certificates for regulatory requirements.

**Renewal Planning:** Monitor certification status to avoid expiration.

## Who Checks It

**Insurance Companies**

Underwriting and claims processing:

**Policy Underwriting:** Verify supporting documents during policy issuance.

**Claims Verification:** Validate documentation during claims processing.

**Risk Assessment:** Confirm permits, licenses, and certifications for risk evaluation.

**Fraud Detection:** Identify fraudulent documentation in claims or applications.

**Coverage Disputes:** Reference verified documents in coverage determination.

**Customs and Border Authorities**

International trade compliance:

**Import Clearance:** Verify shipping documents for customs clearance.

**Duty Assessment:** Validate commercial invoices and declarations.

**Trade Compliance:** Confirm certificates of origin and trade documents.

**Security Screening:** Verify cargo documentation for security.

**Export Controls:** Validate export documentation and licenses.

**Freight Forwarders and Carriers**

Logistics and transportation:

**Shipment Acceptance:** Verify documents before accepting cargo.

**Carrier Handoffs:** Validate documentation at transfer points.

**Liability Determination:** Reference verified documents for claims.

**Route Planning:** Confirm documentation for transit requirements.

**Delivery Confirmation:** Verify documents at final delivery.

## How Verification Works Here

**The Protection & Indemnity (P&I) club certificates Fraud Problem**

Document fraud creates significant risks:

- **Fabrication:** Entirely fake documents created from scratch
- **Alteration:** Genuine documents with modified content (dates, amounts, names)
- **Impersonation:** Documents falsely claiming to be from legitimate issuers
- **Expired/Revoked Documents:** Presenting invalid documents as current

Live Verify verification addresses fake and altered documents. Domain binding confirms the claimed issuer actually issued the document.

**Issuer Types** (First Party)

Who issues these documents and operates verification endpoints?

**Primary Issuers:** Organizations with direct authority to issue these documents.

**Licensed Professionals:** Professionals authorized to create and certify documents.

**Government Agencies:** Federal, state, or local agencies with jurisdiction.

**Industry Bodies:** Trade associations and professional organizations.

**System Integration**

Verification integrates with relevant systems:

**Issuer Systems:** Core operational systems generate verification hashes at document creation.

**Industry Standards:** Existing data standards extended to include verification.

**Regulatory Systems:** Government databases for systematic hash receipt and oversight.

**Third-Party Platforms:** Industry portals and platforms enable verification access.

## Authority Chain

**Pattern:** Regulated

Lloyd's of London, the world's leading marine insurance market, is regulated by the FCA and issues verified cargo and hull insurance certificates.

```
✓ marine.lloyds.com/verify — Issues verified marine cargo insurance certificates
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Prevents fake P&I certificates. Domain binding verifies International Group P&I club. Extremely high limits ($1bn+ pollution/collision liability). Port state control verification. Oil Pollution Act (OPA 90) compliance. Long claims tail.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
