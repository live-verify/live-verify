---
title: "Private Security and Armed Guard Licenses"
category: "Professional & Occupational Licenses"
volume: "Small"
retention: "2-5 years (license term)"
slug: "private-security-guard-licenses"
tags: ["private", "security", "guard", "licenses", "professional", "occupational", "guard-card", "armed-guard", "law-enforcement"]
furtherDerivations: 1
---

## What is a Private Security License?

A **Private Security License** (commonly known as a "Guard Card") is the official state credential that allows an individual to work as a security professional.

It proves that the holder has passed a criminal background check (usually via the FBI/DOJ) and completed mandatory training in the use of force, power to arrest, and emergency response.

**"Credential Swapping"** is a major safety risk: an unlicensed individual might use a friend's physical card to gain access to a high-security facility or sensitive event. **Armed Guards** present even higher risks; a guard whose firearms qualification has expired may still be carrying a weapon illegally.

Live Verify binds the **Guard's name, License Number, and Firearms Qualifications** to the state regulatory board's domain. A client or police officer can instantly verify that the guard standing before them is **Active, Vetted, and Qualified** to carry the weapons they are currently using.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #263238; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #263238; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="guard">[</span>STATE REGULATORY BOARD</div>
      <div style="font-size: 0.8em;">PRIVATE SECURITY SERVICES</div>
    </div>
    <div style="font-size: 1.2em;">🛡️</div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 100px; margin-right: 15px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777; font-size: 0.7em; text-align: center;">[VERIFIED<br>PHOTO]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 1.1em; font-weight: bold; margin: 0 0 5px 0;">MILLER, ROBERT J.</div>
      <div style="font-size: 0.85em; color: #333; line-height: 1.4;">
        <strong>License:</strong> SG-992288-A<br>
        <strong>Status:</strong> ARMED GUARD<br>
        <strong>Weapon:</strong> 9mm Handgun<br>
        <strong>Exp:</strong> 03/15/2027
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px;">
    <div style="background: #e8f5e9; color: #2e7d32; padding: 5px; border-radius: 4px; font-weight: bold; font-size: 0.8em; text-align: center; margin-bottom: 10px;">
      ✅ FIREARMS QUALIFIED (REV 2026)
    </div>
    <div data-verify-line="guard" style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: State Bureau doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:securityboard.gov/v <span verifiable-text="end" data-for="guard">]</span>
    </div>
  </div>
</div>

## Data Verified

Licensee Name, Date of Birth (partial), License Number, Registration Type (Armed/Unarmed), Specific Qualifications (Firearms, Baton, Pepper Spray), Expiration Date, Background Check Status, Training Revision ID.

**Document Types:**
- **Security Guard Registration (Guard Card):** The primary ID card.
- **Firearms Permit:** Required for armed roles.
- **Training Completion Certificate:** Verification of specific skill hours.
- **Business License:** For the security firm itself.

## Data Visible After Verification

Shows the issuer domain (e.g., `securityboard.gov`, `dps.state.tx.us`) and the current standing.

**Status Indications:**
- **Active** — Guard is fully authorized and vetted.
- **Firearm Restricted** — **ALERT:** Guard is authorized for security work but *not* authorized to carry a weapon.
- **Suspended/Revoked** — **ALERT:** License pulled due to misconduct or training failure.
- **Expired** — Background check or training is out of date.

## Second-Party Use

The **Security Professional (Guard)** benefits from verification.

**Job Efficiency:** Speeding up access to "High Value" sites. When a guard arrives for a shift at a jewelry exchange or a data center, the site manager can verify their armed status in 5 seconds via the hash, bypassing the 30-minute manual "Call the Office" vetting process.

**Incident Accountability:** If a guard is involved in a use-of-force incident, the verified hash provides an immediate record that they were operating with valid, active legal authority at that exact timestamp.

## Third-Party Use

**Building Managers / Venue Promoters**
**Vetting Contractors:** Before a major event, the promoter scans the lanyards of the 50 "Sub-contracted" guards. Verification ensures the security firm didn't hire "Un-vetted Temp Labor" to fill the gaps, which is a major insurance and safety liability.

**Police Officers**
**Field Integrity:** During a traffic stop or a patrol check, an officer scans the guard's badge. Verification confirms the "Armed" status isn't a fake PDF created to hide an illegal concealed weapon.

**Insurance Underwriters**
**Risk Management:** Verifying that a client's security staff is 100% compliant with state licensing before binding a high-limit general liability policy.

## Verification Architecture

**The "Phantom Guard" Fraud Problem**

- **Weapon Qualification Forgery:** Editing a "Firearms Qualified" line on a PDF to allow a guard to work higher-paying armed shifts without taking the required range tests.
- **Status Concealment:** Terminated guards keeping their physical cards to gain access to apartments or businesses where they were formerly employed.
- **Name Swapping:** Unlicensed individuals with criminal records using a "Clean" friend's Guard Card to get hired at a security firm.

**Issuer Types** (First Party)

**State Departments of Public Safety (DPS).**
**State Bureaus of Security and Investigative Services (BSIS).**
**National Security Accreditation Bodies.**

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


## Competition vs. Physical ID Cards

| Feature | Live Verify | Holographic Card | Central Registry Lookup |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the State Gov. | **Physical.** Trust the printer. | **Database.** High trust but manual. |
| **Integrity** | **Binds Quals.** Protects the Armed status. | **Zero.** Doesn't protect the text. | **Data-Only.** |
| **Speed** | **Instant.** 5-second scan at the door. | **N/A.** Just looking. | **Slow.** Requires typing 10-digit ID. |
| **Hardware** | **Universal.** Any smartphone camera. | **Human Eye.** | **Technical.** Requires laptop/stable 5G. |

**Why Live Verify wins here:** The "Night-Shift" reality. Bouncers and site managers often work in dark, high-pressure environments when government offices are closed. Live Verify turns the **Physical Guard Card** into a live, trusted safety link, ensuring that the person "Protecting the Building" is verified safe at the exact point of risk.