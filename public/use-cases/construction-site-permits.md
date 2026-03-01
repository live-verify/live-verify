---
title: "Construction Site Permits"
category: "Permits & Approvals"
type: "use-case"
slug: "construction-site-permits"
beneficiary: "Neighbors/Public"
tags: ["construction", "permits", "building", "demolition", "electrical", "plumbing", "grading", "public-safety"]
furtherDerivations: 1
---

## What are Construction Site Permits?

Construction permits are the "Permission Slips" from the city that allow major work to occur on private property. Whether it's a kitchen remodel or a 50-story skyscraper, these permits ensure the work is done by licensed pros and follows safety codes.

The problem is that neighbors and passersby often see work that looks suspicious—illegal "Midnight Demo," un-fenced pits, or additions that look much larger than what was approved. Shady contractors often "Photoshop" a real permit from a different project to hide their illegal work from the city and the neighborhood.

Live Verify allows a neighbor or building inspector to scan the permit from the sidewalk to verify: **"Is this project actually authorized, and does the scope on the paper match the city's official record?"**

<div style="max-width: 500px; margin: 24px auto; font-family: sans-serif; border: 3px solid #d32f2f; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
  <div style="background: #d32f2f; color: #fff; padding: 15px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; font-size: 1.3em; letter-spacing: 1px;"><span verifiable-text="start" data-for="permit">[</span>Building Permit</h2>
    <div style="font-size: 0.8em; font-weight: bold; opacity: 0.9;">POST IN A CONSPICUOUS PLACE</div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px;">
      <div>
        <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Permit Number</div>
        <div style="font-size: 1.2em; font-weight: bold; color: #d32f2f;">B-9922-8877-Z</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 0.7em; color: #888; text-transform: uppercase;">Issue Date</div>
        <div style="font-size: 1em; font-weight: bold;">MARCH 15, 2026</div>
      </div>
    </div>
<div style="font-size: 0.9em; line-height: 1.5; color: #333;">
      <p><strong>Address:</strong> 123 MAPLE AVENUE, SPRINGFIELD, USA</p>
<div style="margin: 15px 0; padding: 15px; border: 1px solid #ccc; background: #fdfdfd; font-style: italic;">
        <strong>Description of Work:</strong><br>
        Two-story residential addition (850 sq ft) including new foundation, plumbing, and 200A electrical service upgrade.
      </div>
<p><strong>Contractor:</strong> TOP-NOTCH BUILDERS LLC (Lic #992288)<br>
      <strong>Owner:</strong> ROBERT & MARY SMITH TRUST</p>
    </div>
<div style="margin-top: 25px; font-size: 0.75em; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
      This permit must remain posted until final inspection sign-off.
    </div>
<div data-verify-line="permit" style="margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.85em; color: #d32f2f; text-align: center; font-weight: bold; border-top: 1px dashed #bbb;"
      title="Demo only: Municipalities don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:springfield.gov/build/v <span verifiable-text="end" data-for="permit">]</span>
    </div>
  </div>
</div>

## Data Verified

Permit number, project address, description of work (scope), contractor name/license, owner name, issue date, expiration date, required inspection list, plan version hash.

**Document Types:**
- **Building Permit Card:** The large placard posted in the window.
- **Stop Work Order:** Red/Orange notice posted for violations.
- **Certificate of Occupancy (CO):** Final proof that the building is safe to live in.
- **Demolition Authorization:** For safe removal of structures.

## Data Visible After Verification

Shows the issuer domain (`springfield.gov`, `cityofchicago.org`) and the project standing.

**Status Indications:**
- **Active** — Permit is valid; work is authorized.
- **Stop Work Order** — **CRITICAL:** City has ordered all work to cease due to a violation.
- **Expired** — Time limit for work has passed; renewal required.
- **Completed** — Final inspections passed; CO issued.

## Second-Party Use

The **Homeowner / Contractor** benefits from verification.

**Neighbor Relations:** A homeowner can proactively show neighbors the "Verified" status of their project to prove they aren't "Cutting Corners" or building an illegal structure, reducing neighborhood friction and anonymous complaints.

**Bank Progress Payments:** Contractors can scan the permit's verified inspection milestones (e.g., "Foundation Passed") to trigger automated progress payments from the owner's construction loan.

## Third-Party Use

**Neighbors / Community**
**Enforcement Accountability:** A neighbor sees a contractor dumping debris into a local creek. They scan the permit and see **"STOP WORK ORDER - HAZMAT VIOLATION."** This allows them to provide verified evidence to authorities that the order is being ignored.

**Real Estate Buyers**
**Due Diligence:** A potential buyer can scan the permits posted at a "Fix-and-Flip" house to ensure the new kitchen and bath were actually permitted and inspected, protecting them from buying a "Death Trap" with faulty wiring.

**Building Inspectors**
**Fraud Detection:** An inspector arriving at a site scans the placard. If the hash returns **"PERMIT CANCELLED - NON-PAYMENT,"** they can immediately issue a citation, even if the paper placard looks perfectly real.

## Verification Architecture

**The "Sidewalk Scrape" Fraud Problem**

- **Scope Inflation:** A permit authorized for a "Kitchen Remodel" being used to build an entire ADU (Accessory Dwelling Unit).
- **Date Stretching:** Using an expired 2024 permit placard for a 2026 project.
- **Unlicensed Impersonation:** Using a reputable contractor's name and license number on a fake permit to trick the building department.

**Issuer Types** (First Party)

**Municipal Building Departments.**
**County Planning Offices.**
**Environmental Protection Agencies.**

**Privacy Salt:** Essential. Project descriptions and owner names are sensitive. The hash must be salted to prevent "Data Mining" of all local renovation budgets.

## Rationale

Construction permits are about "Community Trust." By allowing the public to instantly verify the legality of a construction project, we transform the permit from a passive piece of paper into a live, transparent contract between the builder and the city.

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
