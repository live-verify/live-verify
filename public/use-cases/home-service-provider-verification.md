---
title: "Home Service Provider Verification"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Service + 3-7 years (liability/tax)"
slug: "home-service-provider-verification"
tags: ["plumber-verification", "electrician-license", "home-service-safety", "personal-safety", "background-check", "tradesperson-vetting", "home-security"]
furtherDerivations: 1
---

## What is a Tradesperson Badge?

When you hire a plumber or electrician, you are letting a stranger into your private home.

The **Verified Badge** is the worker's digital or physical ID. It proves:
1.  **Licensure:** They are a real "Master Electrician" and not just an amateur.
2.  **Insurance:** The company has active liability insurance if they break your house.
3.  **Safety:** They have passed a recent criminal background check.

"Fake Repairman" scams are a common way for burglars to case a house. Live Verify allows a homeowner to scan the badge at the door and see a green "ACTIVE" status from the state board, ensuring only legitimate professionals enter the home.

<div style="max-width: 480px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; border-radius: 12px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); position: relative;">
  <a href="data/slides/home-service-provider-verification-1.html" style="position: absolute; right: -50px; top: 50%; transform: translateY(-50%); background: #e0e0e0; border: 1px solid #999; border-radius: 4px; padding: 6px 8px; font-size: 0.75em; line-height: 1.2; cursor: pointer; color: #333; text-decoration: none;">show<br>me</a>
  <div style="background: #1a237e; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 1.5em; margin-right: 10px;">🛠️</div>
    <div>
      <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">VERIFIED TRADESPERSON</h3>
      <div style="font-size: 0.8em; opacity: 0.8;">OFFICIAL LICENSE & SAFETY CLEARANCE</div>
    </div>
  </div>
  <div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; display: flex; align-items: center; justify-content: center; color: #777; border: 1px solid #ccc; border-radius: 4px;">[PHOTO ID]</div>
    </div>
    <div style="flex-grow: 1; background: #f9f9f9; border: 1px solid #999; padding: 12px; font-size: 0.9em; color: #000; line-height: 1.5;">
      MASTER ELECTRICIAN<br>
      MIKE J. MILLER<br>
      License #: ELEC-992288 (TX)<br>
      Company: Sparky's Power, LLC<br>
      Status: ACTIVE / INSURED<br>
      Verified via the State Licensing Board.<br>
      Includes current general liability insurance<br>
      and criminal background clearance.<br>
      <span style="font-family: 'Courier New', monospace;"
        title="Demo only: Licensing board doesn't yet offer verification&#10;endpoints, so this is illustrative">verify:tx-license.gov/v</span>
    </div>
  </div>
</div>

## Data Verified

Tradesperson name, photo (hash), professional license type (Master/Journeyman), license number, company name, insurance status (Liability/WC), background check date, issuing state board.

**Document Types:**
- **Pocket License Card:** Carried by the individual.
- **Service Work Order:** (Linked hash) proving the authorized visit.
- **Certificate of Insurance:** Proving the specific worker is covered.
- **Background Clearance Summary:** For high-trust in-home services.

## Verification Response

The endpoint returns a simple status code:

- **OK** — License is valid and insurance is in force
- **SUSPENDED** — License removed due to disciplinary action; do not hire
- **EXPIRED** — Renewal or updated insurance required; do not proceed
- **ALERT** — Unresolved consumer safety reports found; proceed with caution
- **404** — License not found (forged badge, wrong state, or OCR error)

The issuer domain is visible from the `verify:` line on the badge itself (e.g., `tx-license.gov`).

## Post-Verification Actions

After successful verification, homeowners may record the service visit:

```
HTTP 200 OK
Status: OK

--- Optional Follow-Up ---

You may record details of this service visit.
You will NEVER be told not to do this or that it is not needed.

POST to: https://tx-license.gov/consumer-feedback/visit

Fields:
- Service type: [Plumbing / Electrical / HVAC / Roofing / Other]
- Work completed: [Yes / Partially / No]
- Quality: [Excellent / Good / Concerns]
- Was estimate accurate? [Yes / Higher / Lower]
- Any concerns or issues?
- Would you hire again? [Y/N]
```

**Why This Matters:**

- **Pattern detection:** Tradesperson receiving frequent "concerns" across multiple jobs triggers board review
- **Consumer protection:** Creates contemporaneous record if dispute arises later
- **Quality accountability:** Licensing boards see which contractors deliver quality work
- **Scam deterrent:** Contractors know homeowners can easily report; reduces bait-and-switch pricing
- **Market signal:** Good contractors benefit from positive feedback patterns

**The "Never Discouraged" Principle:**

Tradespeople should never tell homeowners "don't bother" or "that's not necessary." Every report is logged. The licensing board can triage later—but the homeowner is never made to feel their input isn't wanted.

## Second-Party Use

The **Tradesperson (Plumber/Electrician)** benefits from verification.

**Customer Trust:** Proving to a homeowner at the door that they aren't just "somebody with a van," but a verified professional who has passed a background check and has active insurance. This removes the "Stranger Danger" friction and allows the worker to start the job faster.

**Job Bidding:** Including a "Verified License Badge" in digital quotes to win more work from premium clients who value safety.

## Third-Party Use

**Homeowners (Vulnerable Residents)**
**Assault Prevention:** Before opening the door, a resident (or their remote family via doorbell cam) can scan the badge. "Verified by State Board" ensure the person at the door isn't a "Fake Repairman" predator with a stolen uniform.

**Service Marketplaces (Angi / Thumbtack)**
**Merchant Vetting:** Automatically verifying the licenses of all service providers on the platform. A verified "Suspended" status triggers an immediate removal from the marketplace, protecting the brand's reputation.

**Insurance Companies**
**Claim Adjudication:** Verifying that a plumbing repair was performed by a verified, licensed professional before paying out a water-damage claim.

## Verification Architecture

**The "Fake Tradesman" Fraud Problem**

- **Identity Theft:** Burglars posing as "Gas Inspectors" or "Water Repairmen" to gain entry to homes to steal or case the interior.
- **Licensure Hiding:** A contractor whose license was revoked for unsafe work keeping their physical card to find work through private Craigslist ads.
- **Insurance Forgery:** Creating a fake COI PDF to trick a homeowner into thinking they are protected against accidents.

**Issuer Types** (First Party)

**State Licensing Boards:** (e.g., Texas TDLR, California CSLB).
**Trade Associations.**
**Verified Marketplaces:** (e.g., Checkatrade, TrustMark).

**Privacy Salt:** Highly critical. Worker and job site association data is sensitive. The hash MUST be salted to prevent "Mass Scraping" of contractor routes.

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


## Competition vs. Review Sites (Yelp)

| Feature | Live Verify | Review Sites (Yelp/Google) | Physical ID Card |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Gov/Board. | **Social-Bound.** Trusted only via crowd opinion. | **Zero.** Easily forged. |
| **Integrity** | **Cryptographic.** Binds face to license. | **Vulnerable.** Reviews can be faked/bought. | **None.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires reading multiple reviews. | **Instant.** |
| **Safety Data** | **High.** Shows background/insurance status. | **None.** Only shows quality of work. | **N/A.** |

**Why Live Verify wins here:** The "Threshold Moment." Homeowners make the decision to open the door in seconds. They don't want to read 50 Yelp reviews while a stranger stands on their porch. Live Verify turns the **ID Badge** into a live, non-confrontational safety tool that provides instant, high-authority trust.
