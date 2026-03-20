---
title: "Export-Controlled Goods: Licence Chain & Onward Transfer"
category: "Customs & Trade Compliance"
volume: "Medium"
retention: "10-30 years (licence term + statutory retention + enforcement)"
slug: "export-controlled-goods-chain"
verificationMode: "clip"
tags: ["export-controls", "dual-use", "end-user-certificate", "wassenaar", "siel", "ogel", "itar", "ear", "re-export", "onward-transfer", "strategic-goods", "sanctions", "arms-trade", "proliferation"]
furtherDerivations: 4
---

## What is an Export Control Licence Chain?

Some goods are dangerous not because they're hazardous to ship (that's dangerous goods declarations) but because they're dangerous to **possess in the wrong hands**. These are **strategic goods**: military equipment, dual-use technology (items with both civilian and military applications), surveillance equipment, certain chemicals, nuclear materials, and advanced computing components.

When a UK company wants to export a batch of thermal imaging cameras to a distributor in Singapore, they need an **export licence** from the Export Control Joint Unit (ECJU). The licence says: "You may export these items to *this specific end-user*, for *this specific purpose*." The end-user signs an **End-User Undertaking (EUU)** promising not to divert the goods — not to re-export them to a sanctioned country, not to use them for weapons, not to sell them on without permission.

But here's the problem: **what happens next?** The Singapore distributor wants to sell five cameras to a security firm in Malaysia. Do they have permission? Is the Malaysian buyer on a sanctions list? Does the original UK licence allow onward transfer? Currently, this is managed through a tangle of PDFs, faxed letters, and phone calls between export compliance teams — each one unverifiable by the next party in the chain.

The **licence chain** is the sequence of permissions that follows the goods from manufacturer to end-user and beyond. Each link in the chain is a verifiable attestation: "this party has permission to hold these items" and "this party has (or has not) been granted permission for onward transfer."

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="export-licence"></span>EXPORT LICENCE CONFIRMATION
UK Export Control Joint Unit (ECJU)
═══════════════════════════════════════════════════════════════════

Licence Type:         Standard Individual (SIEL)
Licence Ref:          GBSIE/2026/00847
Licensee:             Meridian Optics Ltd (UK)
Consignee:            Temasek Security Solutions Pte Ltd (SG)
End-User:             Temasek Security Solutions Pte Ltd (SG)

Controlled Goods:     Thermal Imaging Cameras (uncooled)
Control List Entry:   6A003.b.4.b
Quantity Authorised:  50 units
Licence Expiry:       15 March 2028

Onward Transfer:      NOT PERMITTED without prior ECJU approval
End-User Undertaking: EUU ref TSS-2026-0091 (verified)

Status: ACTIVE — 35 of 50 units shipped

<span data-verify-line="export-licence">verify:exportcontrol.gov.uk/licence/v</span> <span verifiable-text="end" data-for="export-licence"></span></pre>
</div>

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="onward-transfer"></span>ONWARD TRANSFER AUTHORISATION
UK Export Control Joint Unit (ECJU)
═══════════════════════════════════════════════════════════════════

Parent Licence:       GBSIE/2026/00847
Transfer Ref:         OTA/2026/00847/003
Authorised By:        ECJU (following end-use review)

Transferor:           Temasek Security Solutions Pte Ltd (SG)
Transferee:           KL Infrastructure Security Sdn Bhd (MY)
Verified End-Use:     Critical infrastructure perimeter monitoring

Items:                Thermal Imaging Cameras (uncooled)
Control List Entry:   6A003.b.4.b
Quantity:             5 units
Conditions:           No further transfer without ECJU approval
                      Annual reporting to ECJU on deployment

Sanctions Screening:  Completed 02 Mar 2026 (OFSI, UN, EU, US)
                      No matches found

Status: APPROVED — Valid until 15 March 2028

<span data-verify-line="onward-transfer">verify:exportcontrol.gov.uk/transfer/v</span> <span verifiable-text="end" data-for="onward-transfer"></span></pre>
</div>

## Data Verified

**Export Licence:** Licence type (SIEL/OIEL/OGEL), licence reference, licensee name and country, consignee name and country, end-user name and country, controlled goods description, control list entry (from UK Strategic Export Control Lists / Wassenaar / EU Dual-Use Regulation), quantity authorised, licence expiry date, onward transfer conditions, end-user undertaking reference, units shipped vs. authorised.

**Onward Transfer Authorisation:** Parent licence reference, transfer reference, transferor name and country, transferee name and country, verified end-use, items and control list entry, quantity, conditions, sanctions screening date and result, approval status.

**End-User Undertaking (EUU):** End-user name, address, country, description of goods, stated end-use, non-diversion commitment, non-re-export commitment, signatory name and authority, date.

**Document Types:**
- **Standard Individual Export Licence (SIEL):** One-off licence for specific goods to specific end-user.
- **Open Individual Export Licence (OIEL):** Covers multiple shipments of specified goods to specified destinations.
- **Open General Export Licence (OGEL):** Pre-published licence for lower-risk goods/destinations — no individual application needed but registration and compliance required.
- **End-User Undertaking (EUU) / End-User Certificate (EUC):** Signed by the recipient, promising lawful use and non-diversion.
- **Onward Transfer Authorisation (OTA):** Permission to resell or re-export to a new party.
- **Delivery Verification Certificate (DVC):** Confirmation from destination country's government that goods arrived at the declared end-user.

## Data Visible After Verification

Shows the issuer domain (e.g., `exportcontrol.gov.uk`, `bis.gov` for US BIS, `trade.ec.europa.eu` for EU) and current licence/transfer status.

**Status Indications:**
- **Active** — Licence valid; shipments authorised up to the permitted quantity.
- **Exhausted** — Full quantity shipped; no further shipments permitted under this licence.
- **Expired** — Licence has passed its validity date.
- **Suspended** — Licence temporarily frozen (pending investigation, sanctions change, or end-use concern).
- **Revoked** — Licence permanently cancelled (diversion detected, sanctions breach, false declaration).
- **Amended** — Licence modified (quantity change, end-user change, condition added).
- **Transfer Approved** — Onward transfer to named party has been authorised.
- **Transfer Denied** — Onward transfer request was refused (with no reason disclosed in the public status — the refusal reason is communicated privately to the applicant).
- **Under Review** — Application for transfer or renewal is being assessed.

## Second-Party Use

The **Exporter (Licensee)** benefits from verification.

**Compliance Proof:** When shipping controlled goods, the exporter attaches the verified licence confirmation to the commercial invoice and packing list. The freight forwarder, customs broker, and carrier can all verify that the shipment is lawfully licensed — without calling ECJU or waiting for email confirmation. This is critical at 2am when a shipment is being loaded at Heathrow and the compliance officer is unavailable.

**Due Diligence Defence:** If goods are later found to have been diverted (the Singapore distributor secretly re-exported cameras to a sanctioned country), the UK exporter can prove they held a valid licence and verified the end-user undertaking. The verified chain is their defence against prosecution under the Export Control Act 2002.

**Customer Assurance:** The exporter can share a verified licence excerpt with their customer (the consignee) proving that the goods can be lawfully imported at the destination. This prevents shipments being seized at the destination port because the importer couldn't prove the export was licensed.

## Third-Party Use

**Downstream Buyers (Onward Transfer Recipients)**
**Purchase Confidence:** A Malaysian security firm considering buying thermal cameras from a Singapore distributor can verify that the distributor actually has permission to sell them on. Currently, the buyer relies on the seller's word — or a PDF of an export licence that could be forged, expired, or for different goods. A verified onward transfer authorisation from `exportcontrol.gov.uk` proves the chain is clean before money changes hands.

**Own Compliance:** The Malaysian buyer has their own import licence obligations. Proving that the goods were lawfully exported from the UK and lawfully transferred by the Singapore distributor protects them from allegations of receiving diverted controlled goods.

**Customs Authorities (Importing Country)**
**Import Clearance:** Malaysian customs can verify that the thermal cameras arriving from Singapore were originally exported under a valid UK SIEL and that the onward transfer was authorised. This catches goods that were exported lawfully but diverted unlawfully — a gap that paper documents alone cannot close.

**Red Flag Detection:** If the verified status shows "Suspended" or "Revoked," customs can detain the shipment immediately rather than discovering the problem weeks later during a post-clearance audit.

**Freight Forwarders and Carriers**
**Liability Protection:** A freight forwarder handling controlled goods faces criminal liability if they knowingly facilitate unlicensed exports. Verifying the licence status before accepting the shipment proves they exercised due diligence. "I checked and it said Active" is a far stronger defence than "the customer showed me a PDF."

**Export Control Authorities (Other Jurisdictions)**
**Mutual Recognition:** When goods move through multiple jurisdictions (UK → Singapore → Malaysia), each country's export control authority can verify the permissions granted by the others. This supports the Wassenaar Arrangement's principle of information exchange between participating states — but in real time, rather than through diplomatic cables months after the fact.

**Banks and Trade Finance**
**Sanctions Compliance:** Banks financing the trade (letters of credit, trade loans) must ensure they're not facilitating controlled goods transfers that violate sanctions. A verified licence chain from the originating authority's domain gives the compliance team a definitive answer — not a PDF that might be six months old.

**Internal Compliance Teams (Large Corporations)**
**Group-Wide Visibility:** A multinational with subsidiaries in 30 countries may have hundreds of active export licences. Verified licence statuses, queryable by hash, let the group compliance function monitor the entire licence portfolio without relying on each subsidiary to self-report. A revoked licence shows as revoked regardless of what the local team claims.

## Verification Architecture

**The "Diversion" Fraud Problem**

Export control fraud is not petty crime — it's a matter of national security, international treaty obligations, and (in the worst cases) weapons proliferation. The fraud patterns are:

- **End-User Fabrication:** Creating a fake company in an acceptable country as the "end-user," then diverting the goods to the real (sanctioned) destination after import. The EUU is signed by a shell company that exists only on paper.
- **Licence Shopping:** Applying for an OGEL (which requires no individual approval) when the goods actually require a SIEL (which does). The exporter claims the goods fall under a lower control list entry to avoid scrutiny.
- **Onward Transfer Without Permission:** The consignee receives the goods lawfully but then sells them on to a third party — possibly in a sanctioned country — without seeking the required onward transfer authorisation. This is the most common diversion method and the hardest to detect because the original export was clean.
- **Stale Licence Presentation:** Showing a valid licence for a previous shipment to cover an unlicensed current shipment. The licence reference is real but the goods or quantities don't match.
- **EUU Forgery:** Forging the end-user's signature and stamp on the End-User Undertaking. Some EUUs are verified by the destination country's government; many are not — especially for dual-use goods below the threshold for government-to-government verification.
- **Quantity Manipulation:** A licence authorises 50 units; the exporter ships 50 across multiple consignments but reports only 35, keeping 15 units "off the books" for unlicensed sale.

**Issuer Types** (First Party)

- **National Export Control Authorities:** UK ECJU, US Bureau of Industry and Security (BIS), German BAFA, French SBDU, etc.
- **Destination Country Governments:** Issuing Delivery Verification Certificates (DVCs) and import permits.
- **The Exporter Themselves:** For OGEL registrations and self-certified compliance records.
- **Sanctions Screening Providers:** OFSI (UK), OFAC (US), EU sanctions — providing "no match" attestations as part of the chain.

**Privacy Salt:** Essential. Export licence details — particularly end-user identities, quantities, and control list entries — are commercially sensitive and potentially classified. The hash must be salted to prevent competitors or hostile intelligence services from mapping a company's entire controlled goods trade by brute-forcing licence references.

**The Chain Model**

What makes this use case distinct from single-document verification is that the documents form a **chain**:

```
UK Export Licence (SIEL)
  └── End-User Undertaking (signed by consignee)
       └── Delivery Verification Certificate (issued by destination gov)
            └── Onward Transfer Authorisation (if resale approved)
                 └── New End-User Undertaking (signed by new buyer)
                      └── Sanctions Screening Attestation
```

Each link in the chain is a separate verifiable document, but they reference each other by licence/transfer reference. A verifier checking the bottom of the chain (the new buyer's EUU) can walk up the chain to confirm that every permission was granted and every check was performed. If any link shows "Revoked" or "Suspended," the entire chain below it is invalidated.

This is not a new concept — it's how export controls already work on paper. The difference is that currently, walking the chain requires phone calls, faxed letters, and embassy enquiries that take weeks. With hash-based verification, it takes seconds.

## Authority Chain

**Pattern:** Sovereign

Export control authorities are sovereign bodies with statutory authority to license and control the export of strategic goods.

```
✓ exportcontrol.gov.uk/licence/verify — Issues and verifies UK export licences (SIEL, OIEL)
  ✓ gov.uk/verifiers — UK government root namespace
```

```
✓ exportcontrol.gov.uk/transfer/verify — Issues and verifies onward transfer authorisations
  ✓ gov.uk/verifiers — UK government root namespace
```

For multi-jurisdictional chains, each national authority verifies its own documents:

```
✓ exportcontrol.gov.uk — UK export licence
✓ customs.gov.sg — Singapore import permit / re-export approval
✓ miti.gov.my — Malaysian import licence for controlled goods
```

The verifier walks the chain across domains. Each domain is authoritative for its own jurisdiction's permissions. No single domain controls the whole chain — which is correct, because no single government controls the whole chain.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

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

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

**Special Consideration: Classified Licences**

Some export licences — particularly for military goods or intelligence-related technology — are themselves classified. These cannot be published as verifiable hashes without exposing the existence of a sensitive trade relationship. For classified licences, the witnessing model must support a "government-to-government only" verification path where the hash is queryable by authorised government endpoints but not by the public. The status response would return only "Authorised" or "Not Authorised" without disclosing any licence details. This is a limitation that applies to a small but important subset of export licences.

## Competition vs. SPIRE / LITE / ECJU Online

| Feature | Live Verify | SPIRE/LITE (Gov Portal) | Paper Licence + PDF |
| :--- | :--- | :--- | :--- |
| **Field Access** | **Instant.** Scan the paper at the freight dock. | **Restricted.** Only the licensee has portal access. | **Instant but unverifiable.** |
| **Chain Walking** | **Cross-domain.** Follow references across jurisdictions. | **Single jurisdiction.** SPIRE knows UK licences only. | **Manual.** Phone calls and faxes. |
| **Third-Party Access** | **Open.** Any buyer, forwarder, or bank can verify. | **Closed.** Third parties cannot query SPIRE. | **Trust-based.** "Here's my PDF." |
| **Real-Time Status** | **Live.** Suspension/revocation reflected immediately. | **Delayed.** Portal updates are not real-time for third parties. | **Static.** Paper doesn't update. |
| **Multi-Jurisdiction** | **Native.** Each authority verifies its own link. | **Siloed.** No interop between UK SPIRE and US BIS SNAP-R. | **Impossible at speed.** |

**Why Live Verify wins here:** The "Third-Party Gap." Export control systems (SPIRE in the UK, SNAP-R in the US, ELAN in Germany) are designed for the *applicant-regulator* relationship. They don't serve the downstream parties who need to verify permissions before accepting controlled goods. The freight forwarder, the bank, the downstream buyer — all are locked out of the official system. They rely on PDFs forwarded by the seller, which could be forged, expired, or for different goods. Live Verify turns the licence into a publicly verifiable attestation without exposing classified details — the hash confirms "this licence exists and is active" without revealing its contents.

## The Resale Problem in Detail

The user's core question — "permissions for selling on subject to checks" — deserves specific attention because it's where the current system fails most visibly.

**Current process for onward transfer:**

1. Singapore distributor wants to sell 5 cameras to Malaysian buyer
2. Singapore distributor contacts UK exporter: "Can I sell these on?"
3. UK exporter contacts ECJU: "Can our consignee transfer to this new end-user?"
4. ECJU requests new End-User Undertaking from Malaysian buyer
5. Malaysian buyer signs EUU, sends to ECJU (often via the UK exporter, via the Singapore distributor — a chain of forwarded PDFs)
6. ECJU assesses: sanctions screening, end-use assessment, destination risk
7. ECJU issues (or refuses) Onward Transfer Authorisation
8. Authorisation travels back down the chain: ECJU → UK exporter → Singapore distributor → Malaysian buyer
9. Malaysian buyer receives cameras

**What can go wrong:**

- The EUU forwarded up the chain was altered in transit (quantities changed, end-use modified)
- The OTA forwarded down the chain was forged (the transfer was actually refused)
- The sanctions screening was performed against stale data (buyer was sanctioned after the screening date)
- The Singapore distributor sold the cameras *before* receiving the OTA, relying on an expected approval
- The Malaysian buyer presents an OTA for a *different* transfer to obtain cameras they weren't approved for

**With Live Verify:**

Each document in the chain carries a `verify:` line bound to the issuing authority's domain. The Malaysian buyer can verify the OTA directly against `exportcontrol.gov.uk` — they don't need to trust the chain of forwarded PDFs. The Singapore distributor can verify the EUU was actually received and accepted by ECJU. The UK exporter can verify the OTA was issued before signing off on the transfer. Everyone verifies against the source, not against copies of copies.

The chain becomes:

1. Each party generates their document (EUU, OTA application, licence amendment)
2. The authorising body (ECJU) issues verified attestations for each approval
3. Any party in the chain can verify any other party's documents directly
4. Status changes (suspension, revocation) propagate instantly — a revoked OTA shows as revoked for everyone who checks it, regardless of what PDF the seller is still circulating

## Worked Example: 500 GPUs in 50 Ten-Packs

Advanced compute GPUs (NVIDIA A100, H100, and successors) are export-controlled under US EAR (ECCN 3A090, 4A090) and the Wassenaar Arrangement. They are controlled not because they're dangerous to ship — they're standard electronics — but because they enable weapons simulation, cryptanalysis, AI training for military applications, and mass surveillance. They are among the most actively diverted controlled goods in the world.

This example follows a batch of 500 GPUs from a US manufacturer through a UK distributor, split into 50 ten-packs for onward sale across Asia-Pacific. It shows how each split creates a new link in the permission chain, and how the current paper system fails at exactly the scale where diversion is most likely.

### The Setup

**Manufacturer:** NVIDIA (US)
**UK Distributor:** Apex Compute Distribution Ltd (UK)
**Original Purchase:** 500× NVIDIA H100 SXM GPUs
**BIS Licence:** US Department of Commerce, Bureau of Industry and Security
**ECJU Licence:** UK re-export licence (because Apex is re-exporting US-origin controlled goods from the UK)

Apex holds a UK OIEL (Open Individual Export Licence) covering re-export of US-origin compute accelerators to a list of pre-approved countries — but each onward sale still requires an End-User Undertaking from the buyer and (for certain destinations) an individual Onward Transfer Authorisation.

### The Licence Document

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="gpu-licence"></span>RE-EXPORT LICENCE (OPEN INDIVIDUAL)
UK Export Control Joint Unit (ECJU)
═══════════════════════════════════════════════════════════════════

Licence Ref:          GBOIE/2026/01293
Licence Type:         Open Individual Export Licence (OIEL)
Licensee:             Apex Compute Distribution Ltd (UK)

Controlled Goods:     High-Performance Compute Accelerators
                      (GPU/TPU, ≥4800 TOPS INT8 or equivalent)
Control List Entry:   3A090 (US EAR) / UK ML Cat 3
US Origin Licence:    BIS-2026-EXP-44871 (re-export authorised)

Approved Destinations:  Japan, South Korea, Singapore,
                        Australia, New Zealand, Taiwan
Prohibited:           No re-export to Country Groups D:1, D:5
                      (China, Russia, Iran, North Korea, etc.)

Total Quantity:       500 units (H100 SXM, 80GB HBM3)
Shipped to Date:      320 of 500

Per-Transfer Requirement:
  — End-User Undertaking required for each consignment
  — Sanctions screening within 14 days of shipment
  — ECJU notification within 5 business days of each transfer
  — Buyer must confirm: no resale without Apex/ECJU approval

<span data-verify-line="gpu-licence">verify:exportcontrol.gov.uk/licence/v</span> <span verifiable-text="end" data-for="gpu-licence"></span></pre>
</div>

### Splitting: 50 Ten-Packs, 50 Separate Chains

Apex sells the 500 GPUs as 50 ten-packs to buyers across the approved region. Each ten-pack sale creates its own permission chain:

| Pack # | Buyer | Country | End-Use | OTA Ref | Status |
|--------|-------|---------|---------|---------|--------|
| 001 | NTT Data Corp | Japan | Cloud inference cluster | OTA/01293/001 | Shipped |
| 002 | NTT Data Corp | Japan | Cloud inference cluster | OTA/01293/002 | Shipped |
| ... | | | | | |
| 017 | Hyundai AutoEver | South Korea | Autonomous driving R&D | OTA/01293/017 | Shipped |
| 018 | ST Engineering | Singapore | Defence simulation (additional ECJU review) | OTA/01293/018 | Approved |
| ... | | | | | |
| 033 | DataMesh Pty Ltd | Australia | Academic research (CSIRO) | OTA/01293/033 | Approved |
| ... | | | | | |
| 042 | Unknown buyer via broker | Singapore | "General compute" | OTA/01293/042 | **REFUSED** |
| ... | | | | | |
| 050 | TSMC Research | Taiwan | Chip design simulation | OTA/01293/050 | Under Review |

Each row has its own verified EUU and OTA. Each is independently verifiable against `exportcontrol.gov.uk`.

### The Ten-Pack Transfer Document

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="gpu-transfer"></span>ONWARD TRANSFER AUTHORISATION
UK Export Control Joint Unit (ECJU)
═══════════════════════════════════════════════════════════════════

Transfer Ref:         OTA/01293/017
Parent Licence:       GBOIE/2026/01293

Transferor:           Apex Compute Distribution Ltd (UK)
Transferee:           Hyundai AutoEver Co Ltd (KR)
Verified End-Use:     Autonomous driving R&D
                      (Hyundai Motor Group internal use only)
Facility:             Hyundai AutoEver Pangyo R&D Centre
                      Seongnam-si, Gyeonggi-do, South Korea

Items:                10× NVIDIA H100 SXM 80GB HBM3
Control List Entry:   3A090 (US EAR) / UK ML Cat 3
Serial Range:         H100-SXM-KR-2026-04410 to 04419

Conditions:
  — No resale, lease, or transfer without ECJU approval
  — No use in weapons systems or surveillance applications
  — Annual deployment report to ECJU (location + application)
  — Physical inspection rights reserved (ECJU / BIS)
  — US re-export conditions apply (EAR §744.23)

Sanctions Screening:  Completed 08 Mar 2026
  OFSI: No match    OFAC/SDN: No match
  EU:   No match    UN:       No match
  BIS Entity List: No match

EUU Reference:        HAE-EUU-2026-0038 (verified)

Status: APPROVED — Transfer permitted

<span data-verify-line="gpu-transfer">verify:exportcontrol.gov.uk/transfer/v</span> <span verifiable-text="end" data-for="gpu-transfer"></span></pre>
</div>

### What the Buyer Sees (Verification Response)

Hyundai AutoEver's procurement team receives 10 GPUs with paperwork. Before powering them on, their compliance team verifies the transfer:

**Hash lookup against `exportcontrol.gov.uk`:**
- **Status:** APPROVED
- **Issuer:** UK Export Control Joint Unit
- **Transfer Ref:** OTA/01293/017
- **Valid Until:** 15 March 2028

This tells Hyundai AutoEver: these GPUs were lawfully exported from the US, lawfully re-exported from the UK, and the transfer to us was specifically reviewed and approved. If a BIS or ECJU inspector visits, Hyundai can prove they performed verification at the point of receipt.

### Where It Goes Wrong: Pack #042

Pack #042 tells the real story. A broker in Singapore approaches Apex wanting 10 GPUs for a client whose end-use is described only as "general compute." The broker won't name the ultimate end-user. Apex, following compliance procedure, submits the OTA application to ECJU anyway. ECJU refuses — the application triggers red flags (unnamed end-user, vague end-use, broker intermediary, Singapore as a known transhipment hub for controlled technology).

**Without Live Verify:**
The broker could forge an OTA approval — creating a PDF that looks like OTA/01293/042 with status "APPROVED" — and present it to a different distributor, or use it to source equivalent GPUs from a less diligent supplier. The forged OTA references a real parent licence (GBOIE/2026/01293), which makes it look plausible. The downstream buyer, if there is one, has no way to check.

**With Live Verify:**
Anyone who encounters OTA/01293/042 and checks the hash against `exportcontrol.gov.uk` sees: **REFUSED**. The forgery is caught instantly. The broker cannot circulate a fake approval because the verification endpoint is controlled by ECJU, not by the broker.

### The Resale Cascade

Now consider what happens when Hyundai AutoEver, two years later, decommissions its autonomous driving lab and wants to sell the 10 GPUs to another Korean company — say, Kakao Brain, for LLM training.

**Chain at this point:**

```
BIS Export Licence (US → UK)                      verify:bis.gov/v
  └── ECJU OIEL (UK re-export)                    verify:exportcontrol.gov.uk/licence/v
       └── OTA/01293/017 (UK → Korea, Hyundai)    verify:exportcontrol.gov.uk/transfer/v
            └── NEW: OTA/01293/017/R01             verify:exportcontrol.gov.uk/transfer/v
                 (Korea → Korea, Hyundai → Kakao)
                 └── New EUU from Kakao Brain      verify:kakaobrain.com/compliance/v
                 └── New sanctions screening       verify:sanctions.ofsi.gov.uk/v
```

The chain is now four levels deep. Each level is verifiable. Kakao Brain can walk the entire chain to confirm that:

1. The GPUs were lawfully manufactured and exported from the US
2. They were lawfully re-exported from the UK under a valid OIEL
3. The transfer to Hyundai AutoEver was specifically approved
4. The resale from Hyundai to Kakao was specifically approved
5. Sanctions screening is current at every level

If BIS revokes the original US export licence (e.g., due to a policy change tightening controls on the H100), the revocation propagates: the ECJU OIEL status changes, all downstream OTAs show "Parent Licence Revoked," and every holder of these GPUs worldwide knows immediately that their authorisation basis has changed.

### Quantity Accounting

The OIEL tracks quantity across all 50 transfers:

```
GBOIE/2026/01293 — 500 units authorised

Transferred:   320 (32 approved OTAs × 10 units)
Approved:       30 (3 OTAs approved, not yet shipped)
Under Review:   10 (1 OTA pending)
Refused:        10 (1 OTA refused — Pack #042)
Remaining:     130 (available for new OTA applications)
```

This quantity accounting is visible in the licence verification response. A potential buyer can verify not just that the licence exists, but that there are units remaining to be allocated. This prevents the "overselling" fraud where a distributor sells more units than their licence covers — a form of quantity manipulation that's invisible in the paper system until a post-clearance audit catches it months later.

### Why Ten-Packs Make This Hard (and Why Verification Fixes It)

The ten-pack split is precisely the scale at which export control systems struggle:

**Too many for manual tracking.** Fifty separate OTAs, each with its own EUU, sanctions screening, and conditions. ECJU case officers are managing thousands of these. Paper tracking is error-prone.

**Too few for automated systems.** This isn't a bulk commodity shipment handled by a customs platform. Each ten-pack is a bespoke sale to a named end-user with specific conditions. It falls between the cracks of automated trade systems.

**Perfect for diversion.** Ten GPUs is small enough to fit in a suitcase. Small enough to be "lost" in inventory. Small enough that a single corrupt employee at the distributor could redirect a pack without triggering volume-based audit flags. But ten H100s is worth ~$300,000 and provides meaningful compute for prohibited applications.

**The verification chain changes this calculus.** Every pack is tracked. Every transfer is verified. Every downstream buyer can confirm their specific pack's provenance. And critically: a pack that was refused (like #042) cannot be laundered through a forged approval, because the verification endpoint is authoritative and the refusal is permanent
