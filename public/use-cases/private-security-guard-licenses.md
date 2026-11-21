---
title: "Private Security and Armed Guard Licenses"
category: "Professional & Occupational Licenses"
volume: "Small"
retention: "2-5 years (license term)"
slug: "private-security-guard-licenses"
verificationMode: "clip"
tags: ["private", "security", "guard", "licenses", "professional", "occupational", "guard-card", "armed-guard", "law-enforcement"]
furtherDerivations: 1
---

## What is a Private Security License?

A Private Security License (commonly known as a "Guard Card") is the official state credential that allows an individual to work as a security professional.

It proves that the holder has passed a criminal background check (usually via the FBI/DOJ) and completed mandatory training in the use of force, power to arrest, and emergency response.

**"Credential Swapping"** is a major safety risk: an unlicensed individual might use a friend's physical card to gain access to a high-security facility or sensitive event. Armed Guards present even higher risks; a guard whose firearms qualification has expired may still be carrying a weapon illegally.

Live Verify binds the Guard's name, License Number, and Firearms Qualifications to the state regulatory board's domain. A client or police officer can instantly verify that the guard standing before them is Active, Vetted, and Qualified to carry the weapons they are currently using.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #263238; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #263238; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="guard"></span>STATE REGULATORY BOARD</div>
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
      <span data-verify-line="guard">verify:securityboard.gov/v</span> <span verifiable-text="end" data-for="guard"></span>
    </div>
  </div>
</div>

## The Problem: Phantom Guard Fraud

- **Weapon Qualification Forgery:** Editing a "Firearms Qualified" line on a PDF to allow a guard to work higher-paying armed shifts without taking the required range tests.
- **Status Concealment:** Terminated guards keeping their physical cards to gain access to apartments or businesses where they were formerly employed.
- **Name Swapping:** Unlicensed individuals with criminal records using a "Clean" friend's Guard Card to get hired at a security firm.

## What Is Checked

Licensee Name, Date of Birth (partial), License Number, Registration Type (Armed/Unarmed), Specific Qualifications (Firearms, Baton, Pepper Spray), Expiration Date, Background Check Status, Training Revision ID.

**Document Types:**
- **Security Guard Registration (Guard Card):** The primary ID card.
- **Firearms Permit:** Required for armed roles.
- **Training Completion Certificate:** Verification of specific skill hours.
- **Business License:** For the security firm itself.

## What the Checker Sees

Shows the issuer domain (e.g., `securityboard.gov`, `dps.state.tx.us`) and the current standing.

**Status Indications:**
- **Active** — Guard is fully authorized and vetted.
- **Firearm Restricted** — Guard is authorized for security work but *not* authorized to carry a weapon.
- **Suspended/Revoked** — License pulled due to misconduct or training failure.
- **Expired** — Background check or training is out of date.

## Who Holds It

The Security Professional (Guard) benefits from verification.

**Job Efficiency:** Speeding up access to "High Value" sites. When a guard arrives for a shift at a jewelry exchange or a data center, the site manager can verify their armed status in 5 seconds via the hash, bypassing the 30-minute manual "Call the Office" vetting process.

**Incident Accountability:** If a guard is involved in a use-of-force incident, the verified hash provides an immediate record that they were operating with valid, active legal authority at that exact timestamp.

## Who Checks It

**Building Managers / Venue Promoters**
**Vetting Contractors:** Before a major event, the promoter scans the lanyards of the 50 "Sub-contracted" guards. Verification ensures the security firm didn't hire "Un-vetted Temp Labor" to fill the gaps, which is a major insurance and safety liability.

**Police Officers**
**Field Integrity:** During a traffic stop or a patrol check, an officer scans the guard's badge. Verification confirms the "Armed" status isn't a fake PDF created to hide an illegal concealed weapon.

**Insurance Underwriters**
**Risk Management:** Verifying that a client's security staff is 100% compliant with state licensing before binding a high-limit general liability policy.

## Who Issues It

**Issuer Types** (First Party)

**State Departments of Public Safety (DPS).**
**State Bureaus of Security and Investigative Services (BSIS).**
**National Security Accreditation Bodies.**

## Authority Chain

**Pattern:** Regulated

Security guard licenses are issued and monitored by the UK private security regulator.

```
✓ sia.homeoffice.gov.uk/licence/verify — Issues armed and unarmed guard licenses and firearms qualifications
  ✓ sia.homeoffice.gov.uk — Regulates the UK private security industry
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Guard Cards and Licensing Registers

Security guard licensing is run by national or state regulators, depending on the country, and many publish an online register. Guards carry a physical licence card. Coverage depends on where you are: some countries have a national licensing body, some license by state, and registers differ in what they show. The register is the authoritative source; Live Verify carries its current status to the card in hand. They work side by side.

| | Physical licence card | Central registry lookup | Live Verify on the licence |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone, by eye. | Anyone who can reach the register and enter the licence number. | Anyone shown the licence, with Live Verify on their device: venue staff, site managers, clients. |
| **What the checker gets** | The name, photo and categories printed on the card, which may be forged or out of date. | The regulator's current record. | Confirmation that the regulator issued this exact licence, including any armed endorsement, and its current status, such as suspended. |
| **What the guard shares** | The card. | Their licence number. | Only the licence they chose to show. |
| **Reach** | Anywhere, but unchecked. | One regulator's register. | Global in principle: any licensing body, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Immediate. | Free, but slower: finding the register and typing in the number. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection. |
| **What it needs** | Nothing. | A register for that jurisdiction and time to search it. | The licensing body to publish hashes, and Live Verify-aware software on the checker's device. No licensing body does this yet. |
| **Best suited to** | A first look. | Hiring and contract checks where there is time. | Threshold decisions at a door or gate, at night and under pressure. |

**Where each fits:** A central registry lookup should remain the first choice where it is practical. But door staff, site managers and venue staff often make a threshold decision at night, under pressure, with only the guard's card in hand. Live Verify links that card to the regulator's current licensing status, as a complement to the register.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
