---
title: "Food Hygiene Postings"
category: "Agriculture & Food"
type: "use-case"
slug: "food-hygiene-postings"
beneficiary: "Customers"
tags: ["food-safety", "hygiene", "ratings", "restaurants", "public-health", "customers", "health-grades", "food-handler"]
furtherDerivations: 1
---

## What are Food Hygiene Postings?

When you walk into a restaurant, the **Food Hygiene Rating** (often an "A" card or a "5-Star" sticker in the window) is the only evidence you have that the kitchen is clean and the food is safe. These ratings are issued by health departments after rigorous, surprise inspections.

The problem is that these stickers are incredibly easy to fake or simply leave on the window for years. A restaurant that was "5-Star" in 2023 but dropped to "1-Star" in 2025 because of a rat infestation will almost certainly leave the old "5-Star" sticker on the door to avoid losing customers.

Live Verify allows a diner to scan the window sticker to verify: **"Is this the official rating from the most recent inspection, and is it still valid?"**

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 4px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #333333; color: #fff; padding: 15px; text-align: center;">
    <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="food">[</span>Food Hygiene Rating</h3>
  </div>
<div style="padding: 25px; text-align: center; background: #ffffcc;">
    <div style="font-size: 0.8em; color: #666; margin-bottom: 5px;">FOOD STANDARDS AGENCY</div>
<div style="display: flex; justify-content: center; align-items: center; margin: 15px 0;">
      <div style="background: #000; color: #fff; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; font-size: 2em; font-weight: bold; margin: 0 5px; opacity: 0.2;">0</div>
      <div style="background: #000; color: #fff; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; font-size: 2em; font-weight: bold; margin: 0 5px; opacity: 0.2;">1</div>
      <div style="background: #000; color: #fff; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; font-size: 2em; font-weight: bold; margin: 0 5px; opacity: 0.2;">2</div>
      <div style="background: #000; color: #fff; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; font-size: 2em; font-weight: bold; margin: 0 5px; opacity: 0.2;">3</div>
      <div style="background: #000; color: #fff; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; font-size: 2em; font-weight: bold; margin: 0 5px; opacity: 0.2;">4</div>
      <div style="background: #2e7d32; color: #fff; width: 65px; height: 65px; line-height: 65px; border-radius: 50%; font-size: 2.5em; font-weight: bold; margin: 0 5px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">5</div>
    </div>
<div style="font-size: 1.2em; font-weight: bold; color: #2e7d32; margin-bottom: 15px;">VERY GOOD</div>
<div style="font-size: 0.9em; line-height: 1.4; color: #333; border-top: 1px solid #ccc; padding-top: 15px;">
      <strong>Establishment:</strong> THE SPICY TACO BAR<br>
      <strong>Last Inspected:</strong> MARCH 15, 2026<br>
      <strong>Address:</strong> 42 HIGH STREET, LONDON
    </div>
  </div>
<div style="padding: 15px; background: #fff;">
    <div data-verify-line="food" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #333; text-align: center; font-weight: bold;"
      title="Demo only: Health departments don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:food.gov.uk/ratings/v <span verifiable-text="end" data-for="food">]</span>
    </div>
  </div>
</div>

## Data Verified

Business name, establishment address, hygiene rating (0-5 or A/B/C), inspection date, inspector ID, specific violations found (optional linked hash), next inspection window.

**Document Types:**
- **Window Placard:** The visible rating for diners.
- **Health Inspection Report:** The detailed multi-page audit (linked).
- **Food Handler Certificate:** Vocational license for individual kitchen staff.
- **Mobile Food Permit:** For food trucks and carts.

## Data Visible After Verification

Shows the issuer domain (`food.gov.uk`, `nyc.gov/health`) and the latest official grade.

**Status Indications:**
- **Current** — Rating matches the most recent inspection on file.
- **Closed** — **CRITICAL:** Facility has been ordered to shut down for safety violations.
- **Appealed** — Rating is currently being contested by the business owner.
- **Expired** — Mandatory inspection period has passed without a new visit.

## Second-Party Use

The **Restaurant Owner / Manager** benefits from verification.

**Brand Integrity:** A restaurant that prides itself on cleanliness can use the "Verified" status to distinguish themselves from competitors who might be using fake stickers.

**Staff Oversight:** Managers can scan the "Food Handler Cards" of their employees to ensure they are actually trained and that the cards aren't "Photoshopped" fakes, protecting the business from liability if an outbreak occurs.

## Third-Party Use

**Diners / Public**
**Real-Time Safety:** A customer can verify that the "5-Star" rating on the window wasn't revoked last week. This is critical for high-risk populations (pregnant women, elderly) who rely on safe food handling.

**Food Delivery Apps (UberEats / DoorDash)**
**Merchant Vetting:** Apps can automatically scan the hashes of their partner restaurants. If a restaurant is marked **"CLOSED - HEALTH VIOLATION,"** the app can instantly delist them from the platform until the issue is resolved.

**Commercial Landlords**
**Compliance Monitoring:** Ensuring that their restaurant tenants are maintaining the hygiene standards required by the lease agreement.

## Verification Architecture

**The "Old Sticker" Fraud Problem**

- **Grade Inflation:** Keeping a 2023 "A" card on the wall to hide a 2025 "C" grade.
- **Template Forgery:** Buying fake "Rating Stickers" on the black market to look official without ever having an inspection.
- **ID Cloning:** Using one staff member's valid "Manager Certificate" for multiple restaurants in a chain.

**Issuer Types** (First Party)

**National Food Standards Agencies.**
**Local / Municipal Health Departments.**
**Private Sanitation Audit Firms.**

**Privacy Salt:** Low. Food hygiene ratings are almost always public record. However, employee IDs for individual food handlers should be salted to protect worker privacy.

## Rationale

Food safety is a "High-Frequency, Low-Trust" domain. By allowing the public to instantly verify the truth behind the window sticker, we create a powerful incentive for restaurant owners to maintain consistent standards between inspections.


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
