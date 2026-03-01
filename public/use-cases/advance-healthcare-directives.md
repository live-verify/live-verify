---
title: "Advance Healthcare Directives"
category: "Notary Services"
volume: "Small"
retention: "Permanent (end-of-life care)"
slug: "advance-healthcare-directives"
tags: ["advance", "healthcare", "directives", "living", "will", "medical", "power", "attorney"]
furtherDerivations: 1
---

## What is an Advance Directive?

An **Advance Healthcare Directive** (or Living Will) is a legal document where you tell doctors what to do if you can't speak for yourself (e.g., you are in a coma).

It typically covers:
1.  **The Agent:** "Who decides for me?" (Medical Power of Attorney).
2.  **The Wishes:** "Do I want a ventilator? CPR? Artificial feeding?"

Doctors in the ER need to see this *immediately* to know whether to resuscitate. Paper copies are often lost, locked away, or outdated, leading to unwanted treatments or agonizing delays.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Arial', sans-serif; border: 2px solid #000; background: #fff; padding: 30px;">
  <div style="text-align: center; border-bottom: 2px solid #000; margin-bottom: 20px;">
    <h2 style="margin: 0;"><span verifiable-text="start" data-for="directive">[</span>ADVANCE HEALTH CARE DIRECTIVE</h2>
    <div style="font-size: 0.9em; margin-bottom: 10px;">(California Probate Code §4701)</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.5; color: #333;">
    <p><strong>1. POWER OF ATTORNEY FOR HEALTH CARE</strong></p>
    <p>I, <strong>ELEANOR RIGBY</strong> (DOB: 02/14/1950), designate the following individual as my agent to make health care decisions for me:</p>
<p style="margin-left: 20px;"><strong>Agent:</strong> FATHER MCKENZIE<br>
    <strong>Phone:</strong> (555) 867-5309<br>
    <strong>Authority:</strong> Effective immediately upon my incapacity.</p>
<p><strong>2. INSTRUCTIONS FOR HEALTH CARE</strong></p>
    <p>If I am in an irreversible coma or persistent vegetative state:</p>
    <ul style="list-style-type: square;">
      <li>I <strong>DO NOT</strong> want life-sustaining treatment (ventilator, etc.).</li>
      <li>I <strong>DO NOT</strong> want artificial nutrition and hydration.</li>
      <li>I <strong>DO</strong> want treatment for pain relief.</li>
    </ul>
<p><strong>3. SIGNATURES</strong></p>
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <div>
        Executed: <strong>June 15, 2026</strong><br>
        Signature: <em>Eleanor Rigby</em>
      </div>
      <div style="text-align: right;">
        Notary Public: <strong>John Hancock</strong><br>
        Comm #: 1234567
      </div>
    </div>
  </div>
<div data-verify-line="directive" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Registry doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uslivingwillregistry.com/v <span verifiable-text="end" data-for="directive">]</span>
  </div>
</div>

## Data Verified

Patient name, date of birth, designated healthcare agent (proxy) and alternates, specific life-sustaining treatment wishes (DNR/DNI), organ donation preference, notary/witness attestation, date of execution.

**Document Types:**
- **Living Will:** Instructions for end-of-life care.
- **Medical Power of Attorney:** Appointing a decision-maker.
- **POLST/MOLST:** Physician Orders for Life-Sustaining Treatment (bright pink/green forms).
- **DNR Order:** Do Not Resuscitate.

**Privacy Note:** While the directive contains sensitive data, the *hash* reveals nothing until the document is presented. A "Privacy Salt" line should be added to prevent enumeration attacks (guessing patient names).

## Data Visible After Verification

Shows the issuer domain (e.g., `uslivingwillregistry.com` or a hospital system) and current status.

**Status Indications:**
- **Active** — This is the latest known directive.
- **Revoked** — The patient cancelled this directive (e.g., made a new one).
- **Superseded** — A newer directive exists (date provided).

## Second-Party Use

The **Patient** benefits from verification.

**Emergency Access:** Carrying a wallet card with the verification URL/hash allows ER doctors to instantly verify and retrieve the directive details, even if the patient is unconscious and the paper document is at home.

**Family Clarity:** Resolving disputes between family members about "what Mom wanted." A verified document provides definitive proof of her wishes.

**Portability:** Ensuring wishes are honored even if the patient falls ill while traveling in another state (portability of directives).

## Third-Party Use

**Emergency Room Doctors**
**Immediate Decisions:** In critical moments (stroke/trauma), doctors hesitate to withhold care based on a crumpled photocopy or a family member's word. A verified "Active" status gives them the legal confidence to honor a DNR/DNI order immediately.

**Hospitals and Surgery Centers**
**Admission Compliance:** Hospitals must ask about advance directives (Patient Self-Determination Act). Verification simplifies this workflow.

**Estate Attorneys**
**Drafting Integrity:** Ensuring the directive they drafted is the one being used, and that no "home-made" modifications were added later.

## Verification Architecture

**The "Lost Directive" Problem**

- **Inaccessibility:** The Directive is in a safety deposit box when the patient is in the ER at 2 AM.
- **Outdated Versions:** A family member presents an old directive appointing themselves as agent, hiding the new one that appointed the estranged sibling.
- **Interoperability:** The directive is in the Kaiser Permanente system, but the patient is in a Banner Health ER. The systems don't talk.

**Issuer Types** (First Party)

**National Registries:** (e.g., U.S. Living Will Registry)
**Healthcare Systems:** (Epic MyChart, etc.)
**Secretary of State Offices:** (Some states maintain directive registries)

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


## Competition vs. HIEs and EHRs

| Feature | Live Verify | Health Info Exchange (HIE) | Wallet Card / USB |
| :--- | :--- | :--- | :--- |
| **Interoperability** | **Universal.** Works on any device with a browser. No integration needed. | **Limited.** Requires hospitals to be on the same network (e.g., Epic to Epic). Often fails across state lines. | **Medium.** USBs may be blocked by hospital security; physical cards can be lost. |
| **Speed** | **Instant.** Scan and view. | **Variable.** Can take time to query external records; may require patient consent (impossible if unconscious). | **Fast.** But relies on physical possession. |
| **Authority** | **High.** Shows issuer domain (Registry/Notary). | **High.** Trusted clinical data. | **Low.** Could be an old/fake card. |
| **Revocation** | **Real-time.** Status changes to REVOKED instantly. | **Good.** Updates eventually propagate. | **None.** Physical card still looks valid after revocation. |

**Why Live Verify wins here:** The "Last Mile" problem in healthcare. Even with billion-dollar EHRs, doctors often rely on paper delivered by family. Live Verify bridges the gap: it turns that paper (or a wallet card) into a real-time link to the source of truth, bypassing the complex and often broken HIE networks.