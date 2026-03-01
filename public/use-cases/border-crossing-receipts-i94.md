---
title: "Border Crossing Receipts (I-94)"
category: "Immigration & Visa Documents"
volume: "Large"
retention: "Travel + 5-10 years (immigration)"
slug: "border-crossing-receipts-i94"
tags: ["immigration", "i-94", "visa", "cbp", "border-crossing", "entry-record", "employment-eligibility"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="i94">[</span>U.S. CUSTOMS AND BORDER PROTECTION</div>
      <div style="font-size: 0.8em;">Electronic I-94 Admission Record</div>
    </div>
    <div style="width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #002d62; font-weight: bold; font-size: 0.7em; text-align: center;">CBP</div>
  </div>
<div style="padding: 25px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 1.3em;">ADMISSION (I-94) RECORD NUMBER</h2>
      <div style="font-size: 1.5em; font-weight: bold; margin-top: 5px; color: #002d62;">998877665 42</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Most Recent Admission:</strong> March 15, 2026<br>
      <strong>Class of Admission:</strong> H-1B<br>
      <strong>Admit Until Date:</strong> March 14, 2029</p>
<div style="border-top: 1px solid #eee; padding-top: 10px; margin-top: 10px;">
        <strong>Family Name:</strong> DOE<br>
        <strong>First (Given) Name:</strong> JOHN<br>
        <strong>Birth Date:</strong> 05/05/1985<br>
        <strong>Passport Number:</strong> ********1234
      </div>
    </div>
<div style="margin-top: 25px; padding: 10px; background: #f9f9f9; border: 1px solid #eee; font-size: 0.8em; color: #555;">
      This record is a printout of the official electronic I-94 admission record maintained by DHS.
    </div>
<div data-verify-line="i94" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: CBP doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:cbp.gov/i94/v <span verifiable-text="end" data-for="i94">]</span>
    </div>
  </div>
</div>

## Data Verified

Admission (I-94) Record Number, full name, date of birth, passport number, country of issuance, class of admission (e.g., B-1, F-1, H-1B), date of entry, "Admit Until" date.

**Document Types:**
- **Electronic I-94 Printout:** The standard proof of legal entry.
- **Paper I-94 (White/Green):** Issued at land borders or in rare cases.
- **I-94A:** For certain classes of admission.

## Data Visible After Verification

Shows the issuer domain (`cbp.gov`) and current admission status.

**Status Indications:**
- **Valid** — Traveler is currently in legal status.
- **Overstay** — "Admit Until" date has passed without extension.
- **Departed** — Traveler has left the U.S. (record closed).
- **Adjusted** — Status has changed (e.g., to Permanent Resident).

## Second-Party Use

The **Traveler** (Non-citizen) benefits from verification.

**Employment (I-9):** Proving to a new employer that they are legally authorized to work in H-1B or L-1 status. A verified I-94 printout provides the HR manager with confidence that the PDF hasn't been altered.

**Driver's License:** DMVs require proof of legal presence. Verification bypasses the frequent "SAVE" database delays by providing a direct link to the CBP record.

**SSN Application:** Proving legal status to the Social Security Administration for number issuance.

## Third-Party Use

**Employers (HR Departments)**
**Compliance:** Ensuring they don't hire someone with an expired or fake I-94, which avoids massive federal fines. Verification allows for "Zero-Trust" onboarding of foreign nationals.

**Universities (DSOs)**
**Student Monitoring:** International Student Offices (DSOs) verify the I-94s of thousands of students every semester to maintain SEVIS compliance.

**Banks / Mortgage Lenders**
**Legal Presence:** Verifying that a borrower is legally present in the U.S. for the duration of a loan or to comply with KYC/AML regulations.

## Verification Architecture

**The "I-94 Alteration" Fraud Problem**

- **Date Extension:** Changing the "Admit Until" date from 2024 to 2026 in a PDF editor to hide an overstay.
- **Class Swapping:** Changing a "B-2" (Tourist - No Work) to an "H-1B" (Work Authorized) to get a job.
- **Record Fabrication:** Creating a fake I-94 number for a person who entered the country illegally.

**Issuer Types** (First Party)

**U.S. Customs and Border Protection (CBP):** The primary issuer.
**DHS SAVE System:** (The backend database).

**Privacy Salt:** Essential. I-94 numbers and names are highly sensitive. The hash must be salted to prevent status enumeration.

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


## Competition vs. DHS SAVE System

| Feature | Live Verify | DHS SAVE System | Paper Printout |
| :--- | :--- | :--- | :--- |
| **Accessibility** | **Open.** Any employer or bank can verify. | **Restricted.** Only Gov agencies and some employers have access. | **Manual.** |
| **Speed** | **Instant.** Scan the paper. | **Slow.** Often takes 3-10 days for "Manual Verification" step. | **Instant.** |
| **Trust** | **Cryptographic.** Bound to `cbp.gov`. | **High.** Direct DB access. | **Low.** Easily faked. |
| **Integration** | **Web-Native.** Easy to add to onboarding apps. | **Heavy.** Requires complex API integration and federal vetting. | **None.** |

**Why Live Verify wins here:** The "Employer Gap." Most small businesses do not have access to the DHS SAVE system. They are forced to trust a piece of paper provided by the employee. Live Verify allows **every employer** to have "Government-Grade" trust in the I-94 record without needing a federal contract.
