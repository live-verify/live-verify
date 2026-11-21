---
title: "Tachograph Records and Driver Logbooks (ELD)"
category: "Chain of Custody & Logistics"
volume: "Very Large"
retention: "6 months - 3 years (DOT/FMCSA compliance)"
slug: "tachograph-records-driver-logs"
verificationMode: "clip"
tags: ["logistics", "trucking", "hos", "eld", "tachograph", "driver-safety", "fmcsa-compliance", "roadside-inspection", "fatigue-management"]
furtherDerivations: 1
---

## What are Tachograph and ELD Records?

In the commercial trucking industry, Hours of Service (HOS) regulations limit how many hours a driver can be behind the wheel without a break. These are recorded via an Electronic Logging Device (ELD) in the US or a Tachograph in Europe. The records prove that the driver isn't dangerously fatigued.

Fraud is common and lethal: drivers or carrier managers often "edit" logbooks to hide the fact that a driver has been working for 20 hours straight to meet a deadline. This practice, known as "Ghost Logs," is a primary cause of highway fatalities. Verified hashes bind the Driver ID, Duty Status Timestamps, and GPS Milestones to the ELD provider's or the carrier's domain (e.g., `samsara.com` or `keep-truckin.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="tacho"></span>DRIVER'S DAILY LOG
In accordance with 49 CFR Part 395
═══════════════════════════════════════════════════════════════════
                                            DATE: 15 MAR 2026
                                            ELD Record ID: #992288-ELD

Driver:      JAMES W. GORDON              Vehicle ID:  TRUCK-42 (NY-ABC1234)
Carrier:     GLOBAL LOGISTICS CORP.       Total Miles: 482
USDOT #:     99228877                     Co-Driver:   N/A

DUTY STATUS SUMMARY (24 Hours)
───────────────────────────────────────────────────────────────────
OFF DUTY:      8 hours
DRIVING:      11 hours
ON DUTY:       3 hours (Not Driving)
───────────────────────────────────────────────────────────────────

Cycle Status:  62 hours worked in 7 days. 8 hours remaining.
Violations:    NONE DETECTED

I certify that these entries are true and correct.

<span data-verify-line="tacho">verify:samsara.com/logs/v</span> <span verifiable-text="end" data-for="tacho"></span></pre>
</div>

## The Problem: Ghost Log Fraud

- **Status Tampering:** Editing "Driving" time to "Off-Duty" in a PDF to hide a violation.
- **Multiple Accounts:** A driver having two separate ELD accounts to double their legal driving time.
- **Sensor Disconnect:** Turning off the ELD/GPS during long hauls and then "hand-writing" a fake log for that period.

## What Is Checked

Driver name, driver ID, carrier name, USDOT number, vehicle ID, trailer numbers, date, 24-hour duty status log (Off-Duty, Sleeper, Driving, On-Duty), total miles, GPS coordinates of status changes, ELD provider ID, electronic signature hash.

**Document Types:**
- **ELD Transfer File:** The digital data sent to inspectors.
- **Driver's Daily Log (Paper/PDF):** The human-readable backup.
- **Tachograph Chart (Circular):** (EU) The analog disk recording.
- **Log Audit Report:** (Linked hash) internal carrier compliance check.

## What the Checker Sees

Shows the issuer domain (`samsara.com`, `motive.com`, `verizonconnect.com`) and the HOS standing.

**Status Indications:**
- **Verified / Compliant** — Log entries match the ELD's original sensor data.
- **HOS Violation** — Driver has exceeded legal driving limits.
- **Log Missing** — Significant gaps found in the duty status record.
- **Unidentified Driving** — Vehicle moved without a driver logged in.

## Who Holds It

The Driver / Fleet Manager benefits from verification.

**Roadside Defense:** During a DOT inspection, the driver shows the verified hash of their daily log. The inspector can instantly see "VERIFIED COMPLIANT" from the ELD provider, removing the suspicion of "Log Doctoring" and getting the driver back on the road in minutes.

**Pay Accuracy:** Drivers can use verified logs to prove their "On-Duty" time to the carrier's payroll department, ensuring they are paid correctly for detention time or breakdowns.

## Who Checks It

**DOT Inspectors / State Troopers**
**Rapid Audit:** Instead of manually scrolling through 7 days of logs on a tiny ELD screen, the officer scans the daily summary hash. Verified hashes eliminate the risk of "Bluetooth Sabotage" where a driver tries to hide logs from an inspector's tablet.

**Insurance Underwriters**
**Risk Scoring:** Verifying the "Safety Culture" of a fleet by scanning random driver logs. A fleet with 100% verified, violation-free logs receives much lower premiums than one with "Un-verifiable" paper logs.

**Shippers (e.g., FedEx, DHL)**
**Carrier Vetting:** Ensuring that the sub-contracted carriers they use are not forcing their drivers to "Run Hot" (exceed HOS) to meet delivery windows.

## Who Issues It

**Issuer Types** (First Party)

**ELD Platform Providers.**
**National Transport Authorities (e.g., VOSA in UK).**
**Corporate Fleet Compliance Depts.**

**Privacy Salt:** Critical. Driver locations and work schedules are highly sensitive. The hash must be salted to prevent "Driver Stalking" or competitor analysis of carrier routes.

## Authority Chain

**Pattern:** Regulated

Tachograph and ELD records are issued by carriers and regulated by the UK driving and vehicle standards authority.

```
✓ tachograph.example-haulier.co.uk/verify — Issues electronic logging device records and driver logbooks
  ✓ dvsa.gov.uk — Enforces UK driving and vehicle standards
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Hours of Service compliance is the "Safety Foundation" of the trucking industry. By turning logs into verifiable digital bridges, we ensure that the "Truth of the Road" is backed by cryptographic proof, protecting both drivers from exploitation and the public from fatigued driving.


## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the ELD provider's or carrier's hashes and status changes plus structured metadata (driver name/ID, vehicle ID, duty status times, date) — never driver location or schedule plaintext — providing non-repudiation of log issuance and compliance audit trails.

### The Specific Consequence

A driver who has been awake for 18 hours has reaction times comparable to someone at twice the legal blood-alcohol limit. When a 40-ton truck at highway speed drifts across the median, the outcome is not a fender-bender — it is a multi-vehicle fatality. In 2024, the FMCSA reported that driver fatigue was a factor in over 13% of fatal large-truck crashes in the US. The falsified log — the "ghost log" that shows the driver resting when they were actually driving — is the specific document failure that enables this. A verifiable driver log, bound to the ELD provider's domain, means a weigh-station officer or a carrier's own safety manager can confirm the hours are what the device actually recorded, not what someone edited afterward.
