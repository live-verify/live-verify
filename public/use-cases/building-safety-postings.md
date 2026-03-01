---
title: "Building Safety Postings"
category: "Site & Equipment Safety"
type: "use-case"
slug: "building-safety-postings"
beneficiary: "Occupants/Public"
tags: ["building-safety", "inspection", "certificates", "elevator", "fire-safety", "evacuation", "public-safety", "occupants"]
furtherDerivations: 1
---

## What are Building Safety Postings?

In every modern building, safety is governed by a layer of "Compliance Paper." From the **Elevator Inspection Certificate** in the cab to the **Fire Extinguisher Tags** (mandated by OSHA 29 CFR 1910.157 and NFPA 10) in the hallway, these documents are the only way for the public to know if the equipment they are using is safe and maintained.

The problem is that these papers are easy to fake, "Pencil Whip" (signing without inspecting), or simply leave expired for years. A landlord might keep a 2023 certificate on the wall to hide the fact that the elevator failed its 2025 brake test.

Live Verify allows a tenant, visitor, or fire marshal to scan the posting to verify: **"Is this equipment currently certified safe by the city or an authorized inspector?"**

<div style="max-width: 500px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 4px solid #000; background: #fff; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.3em; text-transform: uppercase;"><span verifiable-text="start" data-for="elevator">[</span>Department of Buildings</div>
    <div style="font-size: 1em; letter-spacing: 1px;">ELEVATOR INSPECTION CERTIFICATE</div>
  </div>
<div style="font-size: 0.9em; line-height: 1.6;">
    <p><strong>Building Address:</strong> 42 SKYSCRAPER PLAZA, NEW YORK, NY<br>
    <strong>Device ID:</strong> ELV-992288-B (Car #2)<br>
    <strong>Capacity:</strong> 3,500 LBS / 22 PERSONS</p>
<div style="margin: 20px 0; padding: 15px; border: 1px solid #ccc; background: #f9f9f9;">
      <div style="text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 10px;">CERTIFICATION OF SAFETY</div>
      This device has been inspected and found to be in compliance with the Safety Code for Elevators and Escalators (ASME A17.1).
    </div>
<p><strong>Inspection Date:</strong> MARCH 15, 2026<br>
    <strong>Expires:</strong> MARCH 15, 2027<br>
    <strong>Inspector:</strong> ROBERT J. MILLER (License #992)</p>
  </div>
<div data-verify-line="elevator" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Municipalities don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:dob.city.gov/v <span verifiable-text="end" data-for="elevator">]</span>
  </div>
</div>

## Data Verified

Equipment ID (Serial Number), building address, capacity/rating, inspector name/license, date of inspection, expiration date, safety code version (e.g., ASME A17.1), maintenance company name.

**Document Types:**
- **Elevator/Escalator Certificate:** Posted in the cab or lobby.
- **Fire Extinguisher Tag:** Yellow/Green tag hanging from the nozzle.
- **Pool/Spa Sanitation Rating:** Posted at the facility entrance.
- **Boiler/Pressure Vessel Permit:** In the mechanical room.

## Verification Response

The endpoint returns a simple status code:

- **OK** — Equipment/facility is current and passed all tests
- **RED_TAGGED** — Equipment failed inspection and is unsafe for use; do not use
- **EXPIRED** — Inspection is overdue; use at own risk
- **INACTIVE** — Equipment has been decommissioned
- **404** — Certificate not found (forged document, wrong ID, or OCR error)

The issuer domain is visible from the `verify:` line on the certificate itself (e.g., `dob.city.gov`).

## Post-Verification Actions

For public-facing inspections, the response includes a link to inspection history:

```
HTTP 200 OK
Status: OK

History: https://dob.city.gov/inspections/ELV-992288-B
```

**Why Inspection History Matters:**

The current status tells you "it's safe now" — but history provides context:
- **Elevator** passed today but failed brake tests twice last year
- **Restaurant** has an A rating but had three B ratings in the past 12 months
- **Pool** is OK now but was red-tagged for contamination last month

For informed decisions, patterns matter as much as current status.

**URL Variations by Context:**

- **Public facilities** (elevators, restaurants, pools) — Public URL to city/county inspection database
- **Office restrooms/facilities** — Intranet URL for employees/tenants (not publicly accessible)
- **Private equipment** (boilers, pressure vessels) — May not have public history; status code only

## Second-Party Use

The **Building Owner / Property Manager** benefits from verification.

**Liability Protection:** By maintaining a verified "Chain of Safety," the owner can prove to insurers and courts that they met all mandatory safety standards, defending against "Negligence" lawsuits if an accident occurs.

**Maintenance Audit:** The owner can scan the tags left by their sub-contractors (e.g., the elevator repair firm) to ensure the tech actually updated the city's database and didn't just scribble on a piece of paper.

## Third-Party Use

**Building Occupants / Tenants**
**Personal Safety:** A parent entering an elevator with their child can scan the certificate. If it returns **"RED TAGGED - FAILED BRAKE TEST,"** they can choose to exit the car immediately and report the landlord.

**Fire Marshals / Inspectors**
**Rapid Compliance Check:** During a surprise walkthrough, an inspector can scan 50 fire extinguishers in minutes. Live Verify prevents "Tag Swapping" (moving a good tag from a new unit to an old one).

**Insurance Underwriters**
**Risk Pricing:** Insurers can verify that a building's life-safety systems are actually current before renewing a commercial liability policy.

## Scope and Limitations

**What Live Verify verifies:** The *certificate* is genuine — the building department actually issued it for this equipment.

**What Live Verify does NOT verify:** That the *inspection* was legitimate. A corrupt or lazy inspector can still "pass" equipment without visiting the site, and Live Verify will faithfully verify their fraudulent certificate.

This is a limitation, not a flaw — the system is explicit about proving *issuer attestation*, not *underlying truth*. But verifiers (tenants, fire marshals) should understand that "certificate verified" means "the department stands behind this," not "the inspector did their job."

**Who benefits most:** This use case works best when the building department (first party) has its own integrity controls. If the inspection system is corrupt, verification infrastructure just adds trust theater on top of garbage data.

## Verification Architecture

**The "Ghost Certificate" Fraud Problem**

- **Expired Stays:** Keeping an old certificate in the elevator frame but using a PDF editor to change "2024" to "2026."
- **Pencil Whipping:** An inspector signing a fire tag today but dating it "Yesterday" to meet a quota, or signing without visiting the site.
- **Serial Swapping:** Using one "Pass" certificate for multiple identical machines across different floors.

**Inspector Authentication (Separate Problem)**

Live Verify verifies that a certificate is genuine — it answers "did the building department really issue this?" But it doesn't solve the problem of inspectors faking inspections remotely.

Without physical presence proof, someone could script fake inspections:
```bash
curl -X POST https://dob.city.gov/api/inspect \
  -d "device=ELV-992288-B&status=PASS&inspector=BOB"
```

The inspection *recording* system (first party) needs separate authentication that proves physical presence:
- **NFC tag** on the equipment — inspector's app taps to prove they're standing there
- **iButton/1-Wire** — ruggedized for industrial environments (boilers, elevators)
- **GPS + time window** — weaker, but adds friction to remote fraud
- **Photo with metadata** — timestamped photo of equipment captured by inspector's app

This is infrastructure the building department must implement; Live Verify assumes the inspection record is legitimate and focuses on verifying the certificate presented to the public.

**Issuer Types** (First Party)

**Municipal Building Departments.**
**State Safety Boards (Boilers/Elevators).**
**Certified Third-Party Inspection Firms.**

**Privacy Salt:** Low. Building safety info is generally public record. However, equipment IDs should be salted to prevent competitors from mapping a city's entire infrastructure density.

## Rationale

Building safety is about "Passive Trust." By turning every safety placard into a live, verifiable bridge to the regulator, we empower the public to enforce the codes that protect their lives.

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
