---
title: "Land Surveys"
category: "Real Estate & Property"
volume: "Very Small"
retention: "Permanent (property records)"
slug: "land-surveys"
tags: ["boundary", "boundary-dispute", "encroachment-check", "estate", "land", "land-survey", "plat", "plat-map", "property", "property-boundary", "real", "real-estate-due-diligence", "surveyor-seal", "surveys"]
furtherDerivations: 1
---

## What is a Land Survey?

A **Land Survey** is the official "Map of Truth" for your property. It is created by a licensed professional who visits the site with high-precision GPS and lasers to mark the exact boundaries of your land.

It proves the "Dirt Integrity" of your investment:
1.  **Encroachments:** "Is my neighbor's fence 2 feet on my land?"
2.  **Easements:** "Exactly where is the city allowed to dig pipes on my property?"
3.  **Building Lines:** "Can I legally build this ADU or pool here?"

**"Boundary Fraud"** occurs when developers or shady sellers "edit" a survey PDF to hide an encroachment or to make a small lot look slightly larger to a buyer. A 2-foot error can lead to a $50,000 lawsuit. Verified hashes protect the **Surveyor's original coordinates and measurements**, ensuring the "Dirt" you are buying matches the paper.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #1a1a1a; color: #fff; padding: 15px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="survey">[</span>Record of Survey</h2>
    <div style="font-size: 0.8em; opacity: 0.8;">MILLER LAND SURVEYING, P.C.</div>
  </div>
<div style="padding: 25px;">
    <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">BOUNDARY RETRACEMENT PLAT</h3>
      <div style="font-size: 1.1em; font-weight: bold; margin-top: 5px;">Project ID: SKYLINE-42-2026</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.5; color: #333;">
      <p><strong>Property:</strong> Lot 42, Block 7, Skyline Heights Addition<br>
      <strong>Address:</strong> 4500 Skyline Blvd, Austin, TX</p>
<div style="width: 100%; height: 200px; border: 1px solid #ccc; background: #f9f9f9; display: flex; align-items: center; justify-content: center; color: #999; font-style: italic;">
        [SIMULATED PLAT DIAGRAM WITH METES & BOUNDS]
      </div>
<div style="background: #fffde7; border: 1px solid #fbc02d; padding: 10px; margin: 15px 0; border-radius: 4px;">
        <strong>FIELD FINDINGS:</strong><br>
        ✅ SW Corner: Found 5/8" Iron Rod<br>
        ⚠️ Encroachment: Wood fence 1.2' West of East Property Line.
      </div>
<p><strong>Licensee:</strong> Robert J. Miller, RPLS (TX #9982)<br>
      <strong>Date of Survey:</strong> March 15, 2026</p>
    </div>
<div data-verify-line="survey" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Surveyor doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:miller-surveying.com/v <span verifiable-text="end" data-for="survey">]</span>
    </div>
  </div>
</div>

## Data Verified

Property Lot/Block, Metes and Bounds strings, Specific Encroachment descriptions (e.g., "1.2' West"), Monument types (Iron Rod, Brass Cap), Surveyor license number, Elevation data (if included), Certification timestamp.

**Document Types:**
- **Boundary Plat:** The primary map of property lines.
- **ALTA/NSPS Survey:** The "Gold Standard" for commercial closings.
- **Elevation Certificate:** Proving height for flood insurance (FEMA).
- **As-Built Survey:** Proving a new building was placed correctly.

## Data Visible After Verification

Shows the issuer domain (the Surveying Firm) and the responder text.

**Status Indications:**
- **Certified** — Survey is authentic and matches the surveyor's field notes.
- **Amended** — A correction was issued (e.g., to fix a typo in a bearing).
- **Superseded** — **ALERT:** A newer survey of this property exists; this one is outdated.
- **Void** — Survey retracted due to professional error or fraud.

## Second-Party Use

The **Homeowner / Seller** benefits from verification.

**Disclosure Integrity:** When selling a home, providing a "Verified Survey" to the buyer. This prevents the buyer from claiming "Non-Disclosure" later if they find an encroachment, as the verified survey clearly documented the fence or shed at the time of sale.

**Permit Speed:** Proving to the City Planning Dept that your "Setback Math" is verified by a licensed professional, allowing for instant approval of a pool or fence permit.

## Third-Party Use

**Title Insurance Underwriters**
**Risk Removal:** Title companies use surveys to remove the "Standard Survey Exception" from a policy. "Verified by Surveyor" ensures the paper isn't a "Photoshopped" copy designed to hide a title-blocking encroachment.

**Mortgage Lenders**
**Asset Security:** Verifying that the home they are financing is actually located on the land described in the deed. This stops "Air Loan" fraud where a house is built on the wrong lot.

**Adjacent Neighbors**
**Boundary Peace:** If a neighbor disputes a new fence line, scanning the hash provides instant, authoritative proof of the surveyor's findings, often de-escalating neighborhood conflicts before they reach a lawyer.

## Verification Architecture

**The "Plat Padding" Fraud Problem**

- **Encroachment Removal:** Editing a PDF to delete the text "Fence encroaches 2.0 feet" to make a title clean for a sale.
- **Odometer Fraud (Lot Size):** Changing "100.0 feet" to "105.0 feet" to make a lot look buildable when it isn't.
- **Stale Surveys:** Leaving a 1995 survey in a closing packet to hide that a neighbor built a massive garage on the property line in 2015.

**Issuer Types** (First Party)

**Private Surveying Firms:** (The primary issuers).
**Municipal GIS Departments:** (In some jurisdictions).
**State Boards of Professional Land Surveying.**

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


## Competition vs. Digital Plat Portals

| Feature | Live Verify | County GIS Viewer | Paper Plat |
| :--- | :--- | :--- | :--- |
| **Precision** | **High.** Binds to the specific PE seal. | **Low.** GIS maps are often "General" and not legally binding. | **Instant.** |
| **Integrity** | **Binds Text.** Protects measurements. | **Data-Only.** Doesn't protect the paper. | **Zero.** Easily edited. |
| **Trust Anchor** | **The Surveyor.** (Professional Liability). | **The County.** (Assessor data). | **The Ink.** |
| **Field Access** | **Instant.** Scan the paper at the property corner. | **Difficult.** Hard to align GIS pins with physical dirt. | **Instant.** |

**Why Live Verify wins here:** The "Fence Line" reality. Neighbors and surveyors argue in backyards and driveways. They need a **zero-friction trust anchor** that works on the paper they are holding. Live Verify turns the **Static Map** into a live safety dashboard, making "Boundary Truth" a transparent fact at the exact point of the property line.

---

_[Content merged from: land-surveys-property-boundaries]_


<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #333; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 2em; margin-right: 15px;">📐</div>
    <div>
      <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">CERTIFIED LAND SURVEY</h2>
      <div style="font-size: 0.8em; opacity: 0.8;">OFFICIAL BOUNDARY DELINEATION</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">BOUNDARY PLAT MAP</h3>
      <div style="font-size: 1.1em; font-weight: bold; margin-top: 5px;">Property: <span verifiable-text="start" data-for="survey">[</span>123 Desert Lane, Austin, TX</div>
    </div>
<div style="font-size: 0.9em; line-height: 1.5; color: #333;">
      <p><strong>Legal Description:</strong> Lot 42, Block 7, Map of Skyline Heights, recorded in Travis County Doc #992288.</p>
<div style="width: 100%; height: 200px; background: #f5f5f5; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; color: #999; font-style: italic;">
        [SIMULATED PROPERTY BOUNDARY DIAGRAM]
      </div>
<p style="margin-top: 15px;"><strong>Surveyor:</strong> Michael J. Miller, RPLS (Lic #9982)<br>
      <strong>Field Work Date:</strong> March 15, 2026</p>
    </div>
<div style="margin-top: 25px; display: flex; align-items: center; justify-content: center; border: 1px solid #ccc; padding: 10px; border-radius: 4px; background: #fafafa;">
      <div style="width: 60px; height: 60px; border: 2px solid #333; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; transform: rotate(-10deg);">RPLS SEAL</div>
      <div style="margin-left: 15px; font-size: 0.85em; font-style: italic;">"Accuracy and Integrity in Land Measurement."</div>
    </div>
<div data-verify-line="survey" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Surveyor doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:miller-surveying.com/v <span verifiable-text="end" data-for="survey">]</span>
    </div>
  </div>
</div>

## Data Verified

Property address, legal description (Lot/Block/Subdivision), surveyor name/RPLS license, date of field work, boundary coordinates (metes and bounds), presence of encroachments (e.g., fences over line), total acreage, issuing surveying firm.

**Document Types:**
- **Boundary Survey (Plat Map):** The primary legal diagram.
- **Topographic Survey:** For elevation and grading design.
- **ALTA/NSPS Land Title Survey:** The high-detail standard for commercial deals.
- **Elevation Certificate:** (Linked hash) for flood insurance.

## Data Visible After Verification

Shows the issuer domain (the Surveying Firm or County Surveyor) and current record standing.

**Status Indications:**
- **Certified** — Survey matches the surveyor's official field notes and stamp.
- **Superseded** — A newer survey exists (e.g., after a lot-line adjustment).
- **In-Dispute** — Boundary markers challenged by a neighboring property.
- **Void** — Retracted due to mathematical error or un-calibrated equipment.

## Second-Party Use

The **Property Owner / Developer** benefits from verification.

**Fence / Pool Construction:** Proving to a neighbor or a municipal inspector exactly where the property line is. A verified hash from the surveyor's domain prevents "Line Creep" disputes and reduces the chance of expensive "Fence Wars" or lawsuits.

**Title Clearance:** Providing a verified, non-alterable ALTA survey to a title insurance company to remove "Survey Exceptions" from a title policy, which is essential for a clean closing.

## Third-Party Use

**Mortgage Lenders**
**Collateral Integrity:** Verifying that the building being used as collateral is actually *inside* the property boundaries and doesn't encroach on a neighbor's land.

**Real Estate Attorneys**
**Due Diligence:** Instantly verifying that the "Plat Map" in the data room is the original, un-edited version from the licensed surveyor.

**Civil Engineers**
**Design Accuracy:** Ensuring that new utility or road designs are based on verified, non-falsified boundary data.

## Verification Architecture

**The "Line Shifting" Fraud Problem**

- **Boundary Tampering:** A property owner editing a PDF survey to move a line by 2 feet to make their lot look large enough for a specific building project.
- **Encroachment Erasure:** Deleting the surveyor's note that mentions "Neighbor's shed is 3 feet over the line" before selling the house.
- **Surveyor Impersonation:** Creating a fake survey using the name and seal of a local surveyor who never actually visited the site.

**Issuer Types** (First Party)

**Registered Professional Land Surveyors (RPLS).**
**Civil Engineering & Surveying Firms.**
**County Surveyors / Recorders.**

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Physical Iron Pins

| Feature | Live Verify | Iron Pins (In the Ground) | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Surveyor. | **Physical.** Trust the iron. | **Zero.** Easily forged. |
| **Reliability** | **High.** Digital record can't be moved. | **Low.** Pins are often pulled out or moved by neighbors. | **Vulnerable.** |
| **Integrity** | **Cryptographic.** Binds every word. | **None.** No data on the pin. | **None.** |
| **Speed** | **Instant.** 5-second scan. | **Very Slow.** Requires digging/metal detector. | **Instant.** |

**Why Live Verify wins here:** The "Pulled Pin" reality. Survey markers in the ground are notoriously unreliable—they are moved by construction, kids, or dishonest neighbors. Live Verify turns the **Paper Survey** into an immutable digital anchor, ensuring that the legal intent of the boundary remains clear even when the physical markers are gone.
