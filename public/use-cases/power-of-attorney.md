---
title: "Power of Attorney (Durable, Medical)"
category: "Notary Services"
volume: "Small"
retention: "Permanent (life of principal)"
slug: "power-of-attorney"
tags: ["poa", "power-of-attorney", "notary", "estate-planning", "legal-authority", "medical-directive"]
furtherDerivations: 1
---

## What is a Power of Attorney?

A **Power of Attorney (POA)** is a legal document that gives one person (the Agent or Attorney-in-Fact) the power to act on behalf of another (the Principal).

It is one of the most powerful—and dangerous—documents in law. It allows an agent to:
1.  **Empty Bank Accounts:** Withdraw cash and sell stocks.
2.  **Sell Real Estate:** Sign a deed to transfer a home.
3.  **Medical Decisions:** Decide whether to keep the principal on life support.

**"Elder Financial Abuse"** often starts with a forged POA. A criminal (or unscrupulous family member) creates a fake POA, gets a "lazy" notary to stamp it, and takes it to a bank. Verified hashes bind the **Principal's name and the specific powers granted** to the law firm's or notary's domain. A bank can instantly verify if the POA is authentic, current, and has not been **Revoked**.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px;">
    <h1 style="margin: 0; font-size: 1.6em; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="poa">[</span>Durable Power of Attorney</h1>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #000;">
    <p>I, <strong>MARGARET A. WILLOWS</strong>, a resident of Cook County, IL, hereby appoint <strong>STEVEN J. WILLOWS</strong> as my true and lawful attorney-in-fact.</p>
<div style="background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
      <p style="font-weight: bold; margin-top: 0;">GRANTED POWERS:</p>
      <ul style="font-size: 0.9em; margin-bottom: 0;">
        <li>✅ Access to all financial accounts at First National Bank.</li>
        <li>✅ Power to sell the residential property at 123 Oak St.</li>
        <li>✅ Authority to file and sign tax returns.</li>
      </ul>
    </div>
<p>This Power of Attorney shall not be affected by my subsequent disability or incapacity.</p>
  </div>
<div style="margin-top: 40px; border: 1px solid #000; padding: 10px; width: 200px; text-align: center; font-family: sans-serif; font-size: 0.8em;">
    <div style="font-weight: bold; text-transform: uppercase;">Notary Attestation</div>
    Signed: 03/15/2026<br>
    Seal #: 992288-IL<br>
    Commission Exp: 2030
  </div>
<div data-verify-line="poa" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
    title="Demo only: Law firm doesn't yet offer verification&#10;endpoints, so this is illustrative">
    verify:willows-law.com/poa/v <span verifiable-text="end" data-for="poa">]</span>
  </div>
</div>

## Data Verified

Principal name, Agent name, Specific Granted Powers (e.g., "Real Estate Only"), Effective Date, Durable vs. Springing status, Notary name/commission, Witness names, Law firm ID.

**Document Types:**
- **General Durable POA:** Full financial and legal control.
- **Limited/Special POA:** Specific powers for a single transaction (e.g., selling a car).
- **Medical POA (Healthcare Proxy):** Specifically for medical decisions.
- **Revocation of POA:** (Linked hash) proving the agent's power has been terminated.

## Verification Response

The endpoint returns a simple status code:

- **OK** — Agent is currently authorized to act
- **REVOKED** — The principal has legally terminated this power; do not allow transactions
- **SUPERSEDED** — A newer POA has been issued; this version is outdated
- **VOID_DECEASED** — Principal has passed; POA is legally void; probate required
- **404** — POA not found (forged document, wrong reference, or OCR error)

The issuer domain is visible from the `verify:` line on the document itself (e.g., `willows-law.com`).

## Post-Verification Actions

None typically. The verification confirms the POA's status; that's the decision point.

**Why No Further Action:**

- **Banks** just need status to allow or refuse transactions
- **Hospitals** just need confirmation the agent can make medical decisions
- **Escrow officers** just need to know the agent has authority to sign

The status code is the value. If it's OK, proceed. If it's REVOKED, SUPERSEDED, VOID_DECEASED, or 404, don't. No POST form needed.

## Second-Party Use

The **Attorney-in-Fact (Agent)** benefits from verification.

**Bank Transactions:** Proving to a skeptical bank teller that the "Margaret Willows POA" they are holding is verified and active. This prevents the "Manager Review" delay that often lasts 48 hours, allowing the agent to pay the principal's bills instantly.

**Emergency Medical:** Proving to a hospital at 2 AM that they are the verified "Medical Proxy" for a family member, allowing them to authorize life-saving surgery without legal delays.

## Third-Party Use

**Bank Compliance Officers**
**Asset Protection:** Before allowing a $100,000 wire from a senior's account, the bank scans the POA. "Verified by Willows-Law.com" ensure the document wasn't a "Home-Made" forgery used for elder abuse.

**Real Estate Escrow Officers**
**Closing Security:** Verifying that the person signing the closing documents has the **Verified Specific Power** to sell real estate. This prevents "Unauthorized Sale" litigation later.

**Nursing Home Administrators**
**Liability Defense:** Ensuring that the person making medical or financial decisions for a resident has a verified, active legal right to do so.

## Verification Architecture

**The "Ghost Agent" Fraud Problem**

- **Revocation Hiding:** An agent using a POA that was revoked last month to empty a bank account before the bank finds out.
- **Power Inflation:** Editing a "Medical Only" POA to include "Financial Access."
- **Expiration Faking:** Using a "Limited POA" for a house sale years after it was intended to expire.

**Issuer Types** (First Party)

**Estate Planning Law Firms:** (The most trusted source).
**Online Notary Platforms:** (e.g., Notarize, Proof - hosting the session hashes).
**State Notary Registries.**

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


## Competition vs. QR/Holograms

| Feature | Live Verify | Holographic Seal | QR Code |
| :--- | :--- | :--- | :--- |
| **Revocation** | **Instant.** Shows "REVOKED" today. | **Zero.** The seal is permanent. | **Variable.** Just a link. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Lawyer. | **Physical.** Trust the sticker. | **Low.** Easily phished. |
| **Readability** | **High.** Full text is protected. | **None.** Seals don't protect text. | **None.** |
| **Privacy** | **High.** Hash protects details. | **Low.** Anyone can see the seal. | **Variable.** |

**Why Live Verify wins here:** The "Saturday Morning" reality. Banks are open when law offices are closed. A teller needs to know *right now* if a document is authentic. Live Verify turns the **Lawyer's Letterhead** into a live, high-authority trust anchor, stopping elder abuse and fraud at the teller window.