---
title: "Immigration Status Documents"
category: "Immigration & Visa Documents"
volume: "Medium (aggregate)"
retention: "Varies (visa validity to permanent)"
slug: "immigration-status-documents"
tags: ["green-card", "i-551", "naturalization-certificate", "visa-status", "uscis", "immigration-verification", "i-9-compliance"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
  <div style="background: #002d62; color: #fff; padding: 20px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="im-status">[</span>U.S. CITIZENSHIP & IMMIGRATION</div>
      <div style="font-size: 0.8em;">Permanent Resident Card (I-551)</div>
    </div>
    <div style="font-size: 1.5em;">🦅</div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 120px; margin-right: 20px;">
      <div style="width: 120px; height: 150px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777;">[PHOTO]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 1.2em; font-weight: bold; margin: 0 0 5px 0;">DOE, JOHN JACOB</div>
      <div style="font-size: 0.9em; color: #333; line-height: 1.5;">
        <strong>USCIS #:</strong> 992-288-776<br>
        <strong>Birth Date:</strong> 05/15/1985<br>
        <strong>Resident Since:</strong> 01/01/2020<br>
        <strong>Expires:</strong> 01/01/2030
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px;">
    <div style="font-size: 0.8em; font-weight: bold; color: #002d62; text-align: center; margin-bottom: 5px;">UNITED STATES OF AMERICA</div>
    <div data-verify-line="im-status" style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: USCIS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:uscis.gov/status/v <span verifiable-text="end" data-for="im-status">]</span>
    </div>
  </div>
</div>

## Data Verified

Full name, Alien Registration Number (A-Number), Date of birth, Country of birth, Resident Since date, Card expiration date, Visa Category (e.g., IR1, EB2), Photo (via hash), Fingerprint status (hash), Issuing USCIS office.

**Document Types:**
- **Green Card (I-551):** Proof of permanent residency.
- **Naturalization Certificate (N-550):** Proof of citizenship.
- **I-797 Approval Notice:** Proving a pending or approved petition.
- **Advance Parole (I-512L):** Travel authorization for pending applicants.

## Data Visible After Verification

Shows the issuer domain (`uscis.gov`) and real-time legal standing.

**Status Indications:**
- **Active** — Bearer has valid legal status in the U.S.
- **Terminated** — **ALERT:** Status has been revoked (e.g., due to criminal conviction).
- **In-Removal** — Bearer is currently in deportation proceedings.
- **Expired** — Card is no longer valid; renewal or status proof required.

## Second-Party Use

The **Named Individual** benefits from verification.

**Identity Protection:** Proving their status to a landlord, bank, or employer without handing over the high-value physical card (which costs $540+ to replace if lost). A verified digital hash allows the holder to keep the original in a safe deposit box.

**Domestic Travel:** Proving legal residency to TSA or local police during domestic travel, especially in "Border Zones" where proof of status is legally required.

## Third-Party Use

**Employers (I-9 Compliance)**
**Zero-Trust Onboarding:** Instantly verifying that a candidate's Green Card isn't a "High-Quality Forgery." Black-market cards look perfect to the eye; Live Verify connects the manager directly to the USCIS record in seconds.

**Mortgage Lenders**
**Loan Eligibility:** Verifying that a borrower is a "Lawful Permanent Resident," which is a mandatory requirement for most Fannie Mae/Freddie Mac conforming loans.

**Local Police (Traffic Stops)**
**Status Verification:** Confirming the legal status of an individual during a stop in jurisdictions that coordinate with federal immigration authorities.

## Verification Architecture

**The "Black Market" Fraud Problem**

- **Novice Fakes:** Realistic-looking plastic cards sold online for $200. These lack the cryptographic link to `uscis.gov`.
- **Identity Swapping:** Using a "Clean" person's A-number and editing the photo on the card.
- **Revocation Hiding:** A person who was deported last month keeping their physical Green Card to return to the U.S. and find work.

**Issuer Types** (First Party)

**U.S. Citizenship and Immigration Services (USCIS).**
**DHS SAVE System:** (The backend data source).
**National Registries:** (In other countries, e.g., UK Home Office).

**Privacy Salt:** ABSOLUTELY CRITICAL. Immigration data is a high-value target for hackers and activists. The hash MUST be salted to prevent "Guess-and-Check" attacks to map the entire immigrant population.

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


## Competition vs. E-Verify / SAVE

| Feature | Live Verify | E-Verify (Employer System) | Physical Card |
| :--- | :--- | :--- | :--- |
| **User Access** | **Open.** Small businesses/landlords can verify. | **Restricted.** Only for registered federal contractors/employers. | **Manual.** |
| **Trust Anchor** | **Domain-Bound.** Bound to `uscis.gov`. | **Direct DB Access.** High trust. | **Mechanical.** Prone to forgery. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Often flags for "Manual Review" taking 3-10 days. | **Instant.** |
| **Interoperability** | **High.** Verified PDF works for banks/lawyers. | **Zero.** Data is trapped in the gov portal. | **Universal.** |

**Why Live Verify wins here:** Reach and Portability. Most people who need to see a Green Card (Bankers, Landlords, DMV clerks) do not have access to the E-Verify system. They are forced to "Trust their eyes." Live Verify allows **every citizen and business** to have "Federal-Level" trust in an immigration document using only their phone.