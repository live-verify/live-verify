---
title: "HVAC and Ventilation Compliance"
category: "Site & Equipment Safety"
volume: "Medium"
retention: "14 months - 5 years (COSHH / OSHA cycles)"
slug: "hvac-ventilation-compliance"
verificationMode: "clip"
tags: ["hvac", "lev", "coshh", "air-quality", "ventilation-safety", "osha-1910-94", "industrial-hygiene"]
furtherDerivations: 1
---

## What is Ventilation Compliance?

Local Exhaust Ventilation (LEV) systems are critical for removing toxic fumes, dust, and airborne pathogens (such as COVID-19) from the workplace. Under COSHH (UK) and OSHA 29 CFR 1910.94 (US), these systems must be tested and certified—typically every 14 months—to ensure they provide enough airflow to protect workers. Recent and forthcoming guidance on viral exposure also emphasizes the need for verified ventilation performance and filter schedules. "Shadow Failures" occur when a system sounds like it is working but the airflow is actually below the safety threshold. Verified hashes bind the System ID, Measured Flow Rates, and Filter Status to the engineering firm's domain.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #0277bd; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #0277bd; color: #fff; padding: 12px; text-align: center; font-weight: bold;">
    LEV SYSTEM COMPLIANCE
  </div>
  <div style="padding: 20px;">
    <div style="font-size: 0.9em; margin-bottom: 10px;">
      <strong><span verifiable-text="start" data-for="hvac"></span>System ID:</strong> EXH-LAB-42<br>
      <strong>Location:</strong> Chemical Lab Room 4
    </div>
    <div style="background: #e1f5fe; border: 1px solid #b3e5fc; padding: 10px; margin: 15px 0;">
      <strong>Avg Face Velocity:</strong> 105 fpm (PASS)<br>
      <strong>Filter Change:</strong> 15 MAR 2026<br>
      <strong>Next Test Due:</strong> MAY 2027
    </div>
    <div data-verify-line="hvac" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #0277bd; text-align: center; font-weight: bold;">
      <span data-verify-line="hvac">verify:air-safety.com/v</span> <span verifiable-text="end" data-for="hvac"></span>
    </div>
  </div>
</div>

## The Problem: Unverified Airflow

A lab technician or factory worker about to start a hazardous process looks at the test sticker on the hood and assumes the extraction is working. They cannot measure airflow themselves, and a fan that sounds normal may be moving too little air to protect them. An auditor or investigator later has the same difficulty with the test report: it is a piece of paper from an outside firm that they cannot readily confirm.

- **Silent underperformance:** The system runs and sounds normal while airflow is below the safety threshold.
- **Lapsed testing:** The periodic test is overdue but the old sticker is still on the hood.
- **Altered or invented results:** Readings, test dates or filter-change dates on a report are edited or made up to avoid the cost of a repair or retest.

## What Is Checked

System ID, facility address, test date, face velocity / flow rate (m/s or fpm), filter type/status, hood number, inspector name, next test due date, regulation reference (COSHH / OSHA).

## What the Checker Sees

Shows the issuer domain (the Industrial Hygiene firm) and current air safety standing.

**Status Indications:**
- **Certified / Safe** — System meets airflow and filtration requirements.
- **Fail / Repair Required** — Airflow is insufficient to protect workers.
- **Expired** — Mandatory 14-month test window has passed.

## Who Holds It

The Industrial Hygienist / Safety Manager benefits from verification.
- **Audit Defense:** Proving to a labor union or insurance auditor that the ventilation in a hazardous zone is verified active and meeting the legal CFM (Cubic Feet per Minute) requirements.

## Who Checks It

**Lab Staff / Factory Workers**
- **Point-of-Use Trust:** Scanning the sticker on a fume hood before starting a chemical process to ensure the air extraction is verified.

**Environmental Health Officers**
- **Incident Investigation:** Verifying the historical airflow logs after an reported exposure event to see if the system was in-spec on that date.


## Authority Chain

**Pattern:** Regulated

Accredited HVAC engineers certify ventilation systems meet building code standards.

```
✓ hvac.example-engineer.co.uk — Inspects HVAC compliance
  ✓ cibse.org — Certifies building services engineers in UK
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the HVAC engineer's hashes and status changes plus structured metadata (system IDs, test dates, face velocities, filter status, next test dates, regulation references, inspector names) — never facility addresses or commercial tenant details — providing non-repudiation of the certification and an audit trail health officers and environmental regulators can inspect.

