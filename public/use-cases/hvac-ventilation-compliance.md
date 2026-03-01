---
title: "HVAC and Ventilation Compliance"
category: "Site & Equipment Safety"
volume: "Medium"
retention: "14 months - 5 years (COSHH / OSHA cycles)"
slug: "hvac-ventilation-compliance"
tags: ["hvac", "lev", "coshh", "air-quality", "ventilation-safety", "osha-1910-94", "industrial-hygiene"]
furtherDerivations: 1
---

## What is Ventilation Compliance?

Local Exhaust Ventilation (LEV) systems are critical for removing toxic fumes, dust, and airborne pathogens (such as COVID-19) from the workplace. Under **COSHH** (UK) and **OSHA 29 CFR 1910.94** (US), these systems must be tested and certified—typically every 14 months—to ensure they provide enough airflow to protect workers. Recent and forthcoming guidance on viral exposure also emphasizes the need for verified ventilation performance and filter schedules. "Shadow Failures" occur when a system sounds like it is working but the airflow is actually below the safety threshold. Verified hashes bind the **System ID, Measured Flow Rates, and Filter Status** to the engineering firm's domain.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #0277bd; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #0277bd; color: #fff; padding: 12px; text-align: center; font-weight: bold;">
    LEV SYSTEM COMPLIANCE
  </div>
  <div style="padding: 20px;">
    <div style="font-size: 0.9em; margin-bottom: 10px;">
      <strong><span verifiable-text="start" data-for="hvac">[</span>System ID:</strong> EXH-LAB-42<br>
      <strong>Location:</strong> Chemical Lab Room 4
    </div>
    <div style="background: #e1f5fe; border: 1px solid #b3e5fc; padding: 10px; margin: 15px 0;">
      <strong>Avg Face Velocity:</strong> 105 fpm (PASS)<br>
      <strong>Filter Change:</strong> 15 MAR 2026<br>
      <strong>Next Test Due:</strong> MAY 2027
    </div>
    <div data-verify-line="hvac" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #0277bd; text-align: center; font-weight: bold;">
      verify:air-safety.com/v <span verifiable-text="end" data-for="hvac">]</span>
    </div>
  </div>
</div>

## Data Verified

System ID, facility address, test date, face velocity / flow rate (m/s or fpm), filter type/status, hood number, inspector name, next test due date, regulation reference (COSHH / OSHA).

## Data Visible After Verification

Shows the issuer domain (the Industrial Hygiene firm) and current air safety standing.

**Status Indications:**
- **Certified / Safe** — System meets airflow and filtration requirements.
- **Fail / Repair Required** — **CRITICAL:** Airflow is insufficient to protect workers.
- **Expired** — **ALERT:** Mandatory 14-month test window has passed.

## Second-Party Use

The **Industrial Hygienist / Safety Manager** benefits from verification.
- **Audit Defense:** Proving to a labor union or insurance auditor that the ventilation in a hazardous zone is verified active and meeting the legal CFM (Cubic Feet per Minute) requirements.

## Third-Party Use

**Lab Staff / Factory Workers**
- **Point-of-Use Trust:** Scanning the sticker on a fume hood before starting a chemical process to ensure the air extraction is verified.

**Environmental Health Officers**
- **Incident Investigation:** Verifying the historical airflow logs after an reported exposure event to see if the system was in-spec on that date.


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

**Jurisdictional Requirements (Insurance)**

Insurance regulation is heavily fragmented:

**US Domestic Insurance:** State insurance commissioners do not mandate witness firms; companies maintain independent records via NAIC databases and state filings.

**Cross-Border Insurance / Reinsurance:** International reinsurance treaties increasingly demand independent witness firms:
- **Lloyd's of London & London Market:** Expect independent verification for catastrophe claims and high-value policies
- **EU Insurance Directive (Solvency II):** May require witness firms for cross-border policy documents
- **Bermuda (Captive Insurance):** Non-US witness firms required for policies involving US insureds to satisfy double-trigger documentation rules

**Litigation/Claims:** Once insurance moves to litigation phase, court-appointed independent witnesses become mandatory, superseding issuer verification entirely.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion
