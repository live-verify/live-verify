---
title: "Estate Clearance Authorizations"
category: "Identity & Authority Verification"
volume: "Medium"
retention: "7 years post-clearance"
slug: "estate-clearance-authorizations"
tags: ["estate-clearance", "probate", "executor", "property", "fraud-prevention", "site-notice"]
furtherDerivations: 0
---

## The Problem: Will Fraud and Estate Theft

In 2025, BBC News exposed a criminal gang systematically stealing from deceased estates by:
- Monitoring the Bona Vacantia register (unclaimed estates)
- Fabricating wills naming themselves as beneficiaries
- Applying for probate online (no human scrutiny)
- Clearing properties before families could challenge
- Undervaluing estates to evade inheritance tax

The current system relies on self-declaration and trust. Criminals exploit this because:
- No cross-checking against Land Registry, HMRC, or witness records
- Online probate removed human verification
- Neighbors watch clearances but can't verify legitimacy
- Police treat disputes as "civil matters"
- By the time fraud is discovered, valuables are gone

## The Solution: Verified Chain + Mandatory Site Notice

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #003366; background: #fff; padding: 0;">
  <div style="background: #003366; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="estateclearanceautho">[</span>AUTHORIZED PROPERTY CLEARANCE IN PROGRESS</div>
    <div style="font-size: 0.8em;">Mandatory Site Notice — Scan to Verify</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Property:</strong> 42 Wimbledon Park Road, London SW19 5NE<br>
    <strong>Deceased:</strong> Christine Harverson<br>
    <strong>Probate Reference:</strong> PR-2024-887432<br>
    <strong>Executor:</strong> John Smith (ID verified by court)</p>
<div style="background: #f0f4f8; padding: 15px; margin: 15px 0; border-left: 3px solid #003366;">
      <p style="margin: 0;"><strong>Clearance Firm:</strong> Belgravia Estate Services Ltd</p>
      <p style="margin: 5px 0 0;"><strong>License:</strong> ECA-2019-4421</p>
      <p style="margin: 5px 0 0;"><strong>Authorized Dates:</strong> 15 Feb 2026 – 28 Feb 2026</p>
    </div>
<div style="text-align: center; margin: 20px 0;">
      <div style="display: inline-block; border: 2px solid #003366; padding: 10px;">
        <strong>[QR CODE]</strong><br>
        <span style="font-size: 0.8em;">SCAN TO VERIFY</span>
      </div>
    </div>
<p style="font-size: 0.85em; color: #666; text-align: center;">
      <div data-verify-line="estateclearanceautho" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:gov.uk/probate <span verifiable-text="end" data-for="estateclearanceautho">]</span>
      </div>
    </p>
<p style="font-size: 0.8em; color: #8B0000; text-align: center; margin-top: 15px;">
      <strong>Concerns?</strong> Call 0800 XXX XXXX or local police non-emergency
    </p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="estateclearanceautho" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:belgravia-estates.co.uk/jobs <span verifiable-text="end" data-for="estateclearanceautho">]</span>
      </div>
    </div>
  </div>
</div>

## The Verification Chain

```
DEATH CERTIFICATE
  │ Issued by: Registrar
  │ Verified: Identity of deceased, cause of death
  │ Hash stored: gov.uk/deaths
  ▼
GRANT OF PROBATE
  │ Issued by: Probate Court
  │ Verified against: Land Registry, death cert, HMRC, witness checks
  │ Hash stored: gov.uk/probate
  ▼
EXECUTOR AUTHORIZATION TO CLEARANCE FIRM
  │ Issued by: Executor (ID verified by court)
  │ Verified: Probate grant reference, clearance firm license
  │ Hash stored: Solicitor's domain (who handled probate)
  ▼
CLEARANCE WORK ORDER
  │ Issued by: Licensed clearance firm
  │ References: Executor authorization + probate grant
  │ Hash stored: Clearance firm's domain
  ▼
MANDATORY SITE NOTICE
  │ Posted at property entrance
  │ Scannable by anyone (neighbors, police, passersby)
  │ Links to full verification chain
```

## What Verification Returns

**When neighbor or police scans the site notice:**

<div style="max-width: 500px; margin: 24px auto; font-family: monospace; background: #f5fff5; border: 2px solid #228B22; padding: 20px; font-size: 0.85em;">
  <p style="color: #228B22; font-weight: bold; font-size: 1.1em; margin: 0;">✓ VERIFIED CLEARANCE</p>
<p style="margin: 15px 0 5px;"><strong>Probate Reference:</strong> PR-2024-887432</p>
  <p style="margin: 0;">Status: GRANTED (verified 10 Feb 2026)</p>
  <p style="margin: 0;">Court: Principal Registry, Family Division</p>
<p style="margin: 15px 0 5px;"><strong>Deceased:</strong> Christine Harverson</p>
  <p style="margin: 0;"><strong>Property:</strong> 42 Wimbledon Park Road, SW19 5NE</p>
  <p style="margin: 0;"><strong>Executor:</strong> John Smith (ID verified by court)</p>
<p style="margin: 15px 0 5px;"><strong>Clearance authorized:</strong></p>
  <p style="margin: 0;">Firm: Belgravia Estate Services Ltd</p>
  <p style="margin: 0;">License: ECA-2019-4421 (valid)</p>
  <p style="margin: 0;">Dates: 15 Feb 2026 – 28 Feb 2026</p>
<p style="margin: 15px 0 5px;"><strong>Solicitor:</strong> Harrison & Co, Wimbledon</p>
  <p style="margin: 0;">verify:harrison-solicitors.co.uk/probate</p>
</div>

**If verification fails:**

<div style="max-width: 500px; margin: 24px auto; font-family: monospace; background: #fff5f5; border: 2px solid #8B0000; padding: 20px; font-size: 0.85em;">
  <p style="color: #8B0000; font-weight: bold; font-size: 1.1em; margin: 0;">⚠ VERIFICATION FAILED</p>
<p style="margin: 15px 0 5px;">One or more checks failed:</p>
  <p style="margin: 0;">☐ Probate reference not found in court system</p>
  <p style="margin: 0;">☐ Clearance firm license: EXPIRED / NOT FOUND</p>
  <p style="margin: 0;">☐ Dates: OUTSIDE AUTHORIZED WINDOW</p>
  <p style="margin: 0;">☐ Property address: DOES NOT MATCH</p>
<p style="margin: 20px 0 0; color: #8B0000; font-weight: bold;">
    DO NOT ALLOW CLEARANCE TO PROCEED<br>
    Call police: 999
  </p>
</div>

## How This Stops Estate Fraud

| BBC fraud method | How verification blocks it |
|------------------|---------------------------|
| Fake will appears | Probate court must verify against Land Registry ownership, HMRC records, witness existence |
| Criminals create fake companies | Clearance firms must be licensed; license verified against trade body registry |
| No human scrutiny | Neighbors become scrutineers — anyone can scan the mandatory notice |
| Police say "civil matter" | Police scan notice, see verified chain or RED FLAGS — clear basis for intervention |
| Quick clearance before challenge | Site notice must be posted X days BEFORE clearance begins |
| Property ransacked secretly | No sign posted = immediate suspicion, neighbors call police |
| Undervalued estate (tax fraud) | HMRC cross-check built into probate verification |

## Mandatory Obligations

### Probate Court
- Must verify grant applications against:
  - Land Registry (does applicant have right to property?)
  - Death certificate (is person actually deceased?)
  - HMRC (estate valuation cross-check)
  - Named witnesses (do they exist? can they be contacted?)
- Must issue verifiable grant with hash stored on gov.uk domain

### Executor
- Must use licensed clearance firm (not unlicensed "man with van")
- Authorization to clearance firm must reference probate grant number
- Must be issued through solicitor who verified executor's identity

### Clearance Firm
- Must be licensed with trade body (bond, insurance, accountability)
- Must verify executor authorization before accepting job
- Must post site notice at property entrance before starting work
- Notice must be:
  - Clearly visible from street
  - Weatherproof
  - Minimum A3 size
  - Posted for duration of clearance
  - Scannable QR code linking to verification

### Solicitor
- Professional liability for verifying executor ID
- Their domain stores hash of executor authorization
- Can be struck off for facilitating fraud

## Site Notice Requirements

### Two-Notice System

**Notice 1: Advance Notice (posted 48+ hours before clearance)**

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #ff6600; background: #fff; padding: 0;">
  <div style="background: #ff6600; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;">NOTICE OF UPCOMING ESTATE CLEARANCE</div>
    <div style="font-size: 0.8em;">Advance Notification — 48 Hours</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Property:</strong> 42 Wimbledon Park Road, London SW19 5NE<br>
    <strong>Deceased:</strong> Christine Harverson<br>
    <strong>Probate Reference:</strong> PR-2024-887432</p>
<div style="background: #fff8f0; padding: 15px; margin: 15px 0; border: 1px solid #ff6600;">
      <p style="margin: 0; font-weight: bold;">ESTATE CLEARANCE WILL BEGIN:</p>
      <p style="margin: 10px 0 0; font-size: 1.2em;">Saturday 15 February 2026</p>
      <p style="margin: 10px 0 0;">This notice will be replaced by a full clearance authorization notice when work commences.</p>
    </div>
<p style="font-size: 0.85em; color: #666;">
      <strong>Concerns about this clearance?</strong><br>
      Contact before work begins: 0800 XXX XXXX<br>
      or local police non-emergency: 101
    </p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="estateclearanceautho" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:gov.uk/probate <span verifiable-text="end" data-for="estateclearanceautho">]</span>
      </div>
    </div>
  </div>
</div>

**Purpose:** Gives neighbors and family time to challenge BEFORE clearance begins. If someone disputes the probate, they can act before valuables are removed.

---

**Notice 2: Clearance In Progress (replaces Notice 1 when work starts)**

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #003366; background: #fff; padding: 0;">
  <div style="background: #003366; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;">AUTHORIZED PROPERTY CLEARANCE IN PROGRESS</div>
    <div style="font-size: 0.8em;">Scan to Verify — Challenge if Concerned</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Property:</strong> 42 Wimbledon Park Road, London SW19 5NE<br>
    <strong>Deceased:</strong> Christine Harverson<br>
    <strong>Probate Reference:</strong> PR-2024-887432<br>
    <strong>Executor:</strong> John Smith (ID verified by court)</p>
<div style="background: #f0f4f8; padding: 15px; margin: 15px 0; border-left: 3px solid #003366;">
      <p style="margin: 0;"><strong>Clearance Firm:</strong> Belgravia Estate Services Ltd</p>
      <p style="margin: 5px 0 0;"><strong>License:</strong> ECA-2019-4421</p>
      <p style="margin: 5px 0 0;"><strong>Authorized Dates:</strong> 15–18 Feb 2026</p>
      <p style="margin: 15px 0 0;"><strong>Authorized Workers On-Site:</strong></p>
      <p style="margin: 5px 0 0;">• Mike Thompson (Team Lead) — ID: BES-447</p>
      <p style="margin: 5px 0 0;">• Sarah Collins — ID: BES-512</p>
      <p style="margin: 5px 0 0;">• James Okonkwo — ID: BES-489</p>
    </div>
<p style="font-size: 0.85em; color: #8B0000; text-align: center;">
      <strong>Only the named individuals above are authorized.<br>
      Anyone else claiming to work here — call police.</strong>
    </p>
<p style="font-size: 0.85em; color: #003366; text-align: center; margin-top: 10px;">
      Individual worker verification posters are displayed at the entrance.<br>
      Scan any worker's poster to verify their authorization.
    </p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="estateclearanceautho" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:gov.uk/probate<br> <span verifiable-text="end" data-for="estateclearanceautho">]</span>
      </div>
      <div data-verify-line="estateclearanceautho" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:belgravia-estates.co.uk/jobs <span verifiable-text="end" data-for="estateclearanceautho">]</span>
      </div>
    </div>
  </div>
</div>

**Key difference from advance notice:** Lists specific individuals authorized to be on-site. Neighbor sees unfamiliar face → checks notice → name not listed → challenge or call police.

---

**Individual Worker Poster (co-located at entrance):**

<div style="max-width: 300px; margin: 24px auto; font-family: sans-serif; border: 2px solid #003366; background: #fff; padding: 0;">
  <div style="background: #003366; color: #fff; padding: 10px; text-align: center;">
    <div style="font-weight: bold;">AUTHORIZED WORKER</div>
  </div>
  <div style="padding: 15px; text-align: center; font-size: 0.9em;">
    <p style="margin: 0; font-size: 1.2em; font-weight: bold;">Mike Thompson</p>
    <p style="margin: 5px 0; color: #666;">Team Lead — ID: BES-447</p>
    <p style="margin: 10px 0 0; font-size: 0.85em;">Belgravia Estate Services Ltd</p>
    <p style="margin: 5px 0;">Authorized for: 42 Wimbledon Park Road</p>
    <p style="margin: 5px 0;">Dates: 15–18 Feb 2026</p>
<div style="margin: 15px 0; border: 1px solid #003366; padding: 8px; display: inline-block;">
      <strong>[QR CODE]</strong>
    </div>
<p style="margin: 5px 0; font-size: 0.75em; font-family: monospace; color: #666;">
      <div data-verify-line="estateclearanceautho" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        verify:belgravia-estates.co.uk/staff <span verifiable-text="end" data-for="estateclearanceautho">]</span>
      </div>
    </p>
  </div>
</div>

Each worker has their own scannable poster. Neighbor approaches worker → worker points to their poster → neighbor scans → verified as authorized for this job.

---

### Physical Specifications

- Minimum size: A3 (297mm × 420mm)
- Weather-resistant material
- Placed at main entrance, visible from public way
- Must include QR code (minimum 50mm × 50mm)
- Must include text verification URL for those without smartphones

### Timing

| Notice | When Posted | Duration |
|--------|-------------|----------|
| **Advance Notice** | Minimum 48 hours before clearance | Until work begins |
| **Clearance Notice** | When work commences (replaces advance notice) | Until clearance complete |

**Red flags:**
- No advance notice posted = immediate suspicion
- Clearance starts before 48-hour notice period = challenge
- Notice removed before completion = call police

### Information Displayed

**Advance Notice (simple — invitation to challenge):**
- Property address
- Deceased name
- Probate reference number
- Clearance firm name
- Work start date and timespan
- Contact for challenges
- Verification QR code (probate only)

**Clearance Notice (full — includes individuals):**
- All of the above, plus:
- Executor name (ID verified by court)
- Clearance firm license number
- **Named individuals authorized on-site** (with employee IDs)
- Reference to co-located individual worker posters
- Full verification chain QR codes (probate + clearance firm)

**Individual Worker Posters (one per worker, co-located):**
- Worker name and employee ID
- Firm name
- Property address authorized for
- Authorized dates
- Individual QR code linking to worker-specific verification

## Third-Party Use

**Neighbors** — Scan to verify clearance is legitimate before valuables disappear
**Police** — On-scene verification; clear basis for intervention if verification fails
**Local authority** — Monitoring for unlicensed clearance operations
**Other family members** — Verify executor is legitimate, not fraudster
**Heir hunters** — Verify competing claims to estate
**HMRC** — Cross-reference estate valuations

## Jurisdiction Differences

| Jurisdiction | Probate Authority | Key Points |
|--------------|-------------------|------------|
| **England & Wales** | HM Courts & Tribunals Service | Online probate since 2017; Bona Vacantia register public |
| **Scotland** | Sheriff Courts | Confirmation (not probate); different process |
| **Northern Ireland** | Probate Office Belfast | Separate system |
| **US** | State probate courts | Varies by state; some require court supervision of sales |

## Verification Architecture

**The core insight:** Live Verify only works if the attestation comes from an authority that:
1. Cannot be created by criminals
2. Has access to ground truth (Land Registry, death records, tax)
3. Actually verified something before issuing

**The chain:**
- Probate court (government, verified against multiple registries)
- Solicitor (regulated profession, professional liability, can be struck off)
- Licensed clearance firm (trade body, bonded, insured)

Each link is an institution with reputation at stake and regulatory oversight.

**Community verification:** The site notice transforms every neighbor into a potential fraud detector. Criminals can't operate in daylight when anyone with a phone can verify legitimacy in seconds.

## See Also

Other authorized agent confirmations:
- [Authorized Agent Confirmations](view.html?slug=authorized-agent-confirmations) — Repo agents, bailiffs, tow operators, locksmiths
- [Security Testing Authorizations](view.html?slug=security-testing-authorizations) — Pentest, bug bounty, red team authorizations


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
