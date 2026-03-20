---
title: "Home Service Provider Verification"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Service + 3-7 years (liability/tax)"
slug: "home-service-provider-verification"
verificationMode: "camera"
tags: ["plumber-verification", "electrician-license", "home-service-safety", "personal-safety", "background-check", "tradesperson-vetting", "home-security"]
furtherDerivations: 0
---

## What is a Home Service Credential?

When you hire a plumber or electrician, you are letting a stranger into your private home.

The **Verified Credential** is the worker's digital or physical doorstep credential. It is strongest when it proves four narrow things:
1.  **Which company is actually standing at the door** — so the homeowner can detect bait-and-switch or undisclosed subcontractor substitution.
2.  **What task they are here to do** — not just "electrician," but whether the worker is assigned for this job at this address now.
3.  **Whether their license scope matches the claimed work** — for example, whether the claimed trade authorization actually covers the service being offered.
4.  **Whether the company stands behind the visit** — insurance, work order, and current authorization.

"Fake Repairman" scams are a common way for burglars to case a house. Live Verify allows a homeowner to scan the credential at the door and answer the real threshold question: **"Is this the right worker from the right company, here for the right job, with the right scope of authorization?"**

<div style="max-width: 480px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; border-radius: 12px; background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); position: relative;">

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
      Salt: a4e62b6<br>
      <span style="font-family: 'Courier New', monospace;"
        title="Demo only: Licensing board doesn't yet offer verification&#10;endpoints, so this is illustrative">verify:tx-license.gov/v</span>
    </div>
  </div>
</div>

## Data Verified

Tradesperson name, professional license type (Master/Journeyman), license number, company name, salt. The badge text is deliberately minimal — it identifies the worker and company, not the job details.

**What the badge does NOT carry:** job address, scope of work, assignment details. Those are live dispatch state and belong in the verification response payload, not baked into the badge text.

**Document Types:**
- **Doorstep Badge (eInk or printed):** Carried by the individual worker. Contains the salted identity claim.
- **Service Work Order / Visit Authorization:** Separate artifact, may also carry its own `verify:` line from the dispatching company.
- **Certificate of Insurance:** Proving the company or visit is covered.

## Verification Response

The endpoint returns a status and an optional payload with live dispatch context:

- **`{"status":"verified"}`** — Worker is currently licensed and active. The payload may include live details the issuer chooses to surface:
  - `"message": "On call to job at: 14 Oak Street"` — current assignment
  - `"scope": "Residential electrical"` — license scope
  - `"insured": true` — current insurance status
  - `"company": "Sparky's Power, LLC"` — confirming the employing company
- **SUSPENDED** — License removed due to disciplinary action; do not admit
- **EXPIRED** — Renewal or updated insurance required; do not proceed
- **ALERT** — Unresolved consumer safety reports found; proceed with caution
- **404** — Badge not found (forged, wrong state, or OCR error)

The homeowner reads the payload and makes their own judgment: does the address match mine? Does the scope match what I called about? Is the company the one I booked? These are human decisions informed by the payload, not protocol-level error codes.

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

- **Pattern detection:** Tradesperson or firm receiving frequent "wrong company," "not assigned," or safety concerns triggers review
- **Consumer protection:** Creates contemporaneous record if dispute arises later
- **Quality accountability:** Licensing boards see which contractors deliver quality work
- **Scam deterrent:** Contractors know homeowners can easily report bait-and-switch, wrong-company substitution, or out-of-scope work
- **Market signal:** Good contractors benefit from positive feedback patterns

**The "Never Discouraged" Principle:**

Tradespeople should never tell homeowners "don't bother" or "that's not necessary." Every report is logged. The licensing board can triage later—but the homeowner is never made to feel their input isn't wanted.

## Second-Party Use

The **Tradesperson (Plumber/Electrician)** benefits from verification.

**Customer Trust:** Proving to a homeowner at the door that they are not just licensed in the abstract, but are the right worker from the right company for the right job. This removes stranger-danger friction without forcing the homeowner into a long phone call.

**Job Bidding:** Including a "Verified License Badge" in digital quotes to win more work from premium clients who value safety.

## Third-Party Use

**Homeowners (Vulnerable Residents)**
**Doorstep Decision:** Before opening the door, a resident or remote family member can scan the credential and see not just licensure, but company identity, assignment, and task scope. That is what prevents fake-repairman and bait-and-switch scams.

**Service Marketplaces (Angi / Thumbtack)**
**Merchant Vetting:** Automatically verifying the licenses, company identity, and insurance position of listed providers. A verified "Suspended," "Wrong Company," or "Out of Scope" status should trigger review or removal.

**Insurance Companies**
**Claim Adjudication:** Verifying that a plumbing repair was performed by a verified, licensed professional before paying out a water-damage claim.

## Verification Architecture

**The "Fake Tradesman" Fraud Problem**

- **Identity Theft:** Burglars posing as gas inspectors or repair workers to gain entry to homes to steal or case the interior.
- **Licensure Hiding:** A contractor whose license was revoked for unsafe work keeping their physical card to find work through private Craigslist ads.
- **Insurance Forgery:** Creating a fake COI PDF to trick a homeowner into thinking they are protected against accidents.
- **Company Substitution:** Homeowner books one company, but a different and less trusted company arrives at the door.
- **Scope Overreach:** Worker is licensed for one class of work but claims authority for a broader or more dangerous task.

**Issuer Types** (First Party)

**State Licensing Boards:** (e.g., Texas TDLR, California CSLB).
**Trade Associations.**
**Verified Marketplaces:** (e.g., Checkatrade, TrustMark).

**Privacy Salt:** Highly critical. Worker and job site association data is sensitive. The hash MUST be salted to prevent "Mass Scraping" of contractor routes.

## Authority Chain

**Pattern:** Regulated / commercial

The strongest version is layered: the board or licensing body confirms scope and standing; the company or marketplace confirms assignment and firm identity for this visit.

```
✓ pro.checkatrade.com/verify — Confirms company identity, assignment, and marketplace standing
  ✓ gov.uk/verifiers — jurisdictional or board root where applicable
```

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


## Competition vs. Review Sites (Yelp)

| Feature | Live Verify | Review Sites (Yelp/Google) | Physical ID Card |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Gov/Board. | **Social-Bound.** Trusted only via crowd opinion. | **Zero.** Easily forged. |
| **Integrity** | **Cryptographic.** Binds face to license. | **Vulnerable.** Reviews can be faked/bought. | **None.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires reading multiple reviews. | **Instant.** |
| **Safety Data** | **High.** Shows background/insurance status. | **None.** Only shows quality of work. | **N/A.** |

**Why Live Verify wins here:** The "Threshold Moment." Homeowners make the decision to open the door in seconds. They don't want to read 50 Yelp reviews while a stranger stands on their porch. Live Verify turns the **ID Badge** into a live, non-confrontational safety tool that provides instant, high-authority trust.

## See Also

- [Locksmith Licenses](view.html?slug=locksmith-licenses) — Another threshold-decision trade with company and dispatch checks
- [Pest Control Operator Licenses](view.html?slug=pest-control-operator-licenses) — Task-scope and chemical-category variant
- [Trades and Home-Visit Cluster](../../trades-home-visit-cluster.md) — Cluster note for doorstep and threshold verification
