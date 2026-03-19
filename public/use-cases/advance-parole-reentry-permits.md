---
title: "Advance Parole and Re-Entry Permits"
category: "Immigration & Visa Documents"
volume: "Medium"
retention: "Permit validity + 7 years"
slug: "advance-parole-reentry-permits"
verificationMode: "clip"
tags: ["advance", "parole", "reentry", "permits", "immigration", "visa", "uscis"]
furtherDerivations: 1
---

## What is Advance Parole?

Immigrants waiting for a Green Card (or DACA recipients) cannot just fly home for a visit. If they leave the US without permission, their application is considered "abandoned" and they are banned from returning.

**Advance Parole (Form I-512)** is the permission slip to travel. It is a simple sheet of paper with a photo.

If a traveler loses this paper, or if an airline agent in Paris thinks it looks "fake," the traveler is stranded abroad. The strongest answer is still direct access to current DHS/USCIS/CBP status where policy allows. Live Verify is only plausible as a bridge from the paper artifact to that official status for lower-capability relying parties outside the U.S. system.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fdfdfd; padding: 0;">
  <div style="background: #eef; padding: 15px; border-bottom: 1px solid #ccc; display: flex; align-items: center;">
    <div style="width: 50px; height: 50px; background: #ccc; border-radius: 50%; margin-right: 15px; display: flex; align-items: center; justify-content: center; font-size: 0.8em; text-align: center;">[Seal]</div>
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="parole"></span>Department of Homeland Security</div>
      <div style="font-size: 0.9em;">U.S. Citizenship and Immigration Services</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div style="border: 1px solid #000; padding: 5px 10px; font-weight: bold;">I-512L</div>
      <div style="font-family: monospace;">A# 123-456-789</div>
    </div>
<h2 style="text-align: center; font-size: 1.3em; margin-bottom: 20px;">AUTHORIZATION FOR PAROLE OF AN ALIEN<br>INTO THE UNITED STATES</h2>
<div style="display: flex; margin-bottom: 20px;">
      <div style="width: 100px; height: 120px; background: #eee; margin-right: 20px; display: flex; align-items: center; justify-content: center; color: #777;">[Photo]</div>
      <div style="font-size: 0.95em; line-height: 1.5; color: #333;">
        <p><strong>Name:</strong> JUAN VALDEZ<br>
        <strong>Date of Birth:</strong> 05/05/1980<br>
        <strong>Country of Birth:</strong> COLOMBIA</p>
        <p><strong>Date of Issuance:</strong> JAN 15, 2026<br>
        <strong>Valid Until:</strong> JAN 14, 2027</p>
      </div>
    </div>
<p style="font-size: 0.9em; text-align: justify;">Presentation of this authorization will permit the above named alien to seek parole at a port of entry. Officer at POE: Please endorse below.</p>
<div data-verify-line="parole" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: USCIS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="parole">verify:uscis.gov/v/i512</span> <span verifiable-text="end" data-for="parole"></span>
    </div>
  </div>
</div>

## Data Verified

Full name, Alien Registration Number (A-Number), date of birth, country of birth, permit type (Advance Parole vs Re-Entry Permit), validity dates, photograph (via hash of photo data or photo ID), restrictions.

**Document Types:**
- **I-512L:** Advance Parole (paper document).
- **I-327:** Re-Entry Permit (passport-style booklet).
- **Refugee Travel Document:** (I-571).

## Data Visible After Verification

Shows the issuer domain (`uscis.gov`) and the document status.

**Status Indications:**
- **Valid** — Document was issued and is currently valid.
- **Revoked** — The underlying application (e.g., I-485) was denied, invalidating the parole document.
- **Lost/Stolen** — Document reported missing.

## Second-Party Use

The **Applicant** (traveler) benefits from verification.

**Airline Boarding:** The biggest anxiety for Advance Parole holders is being denied boarding in a foreign country because the airline staff doesn't recognize the paper document. A bridge from the paper to current official status may help in that edge case, but it should not be treated as a replacement for carrier-facing government document checks.

**Employer I-9:** Proving work authorization (parole documents can sometimes be used for I-9 purposes).

## Third-Party Use

**Airlines (Foreign Airports)**

**Carrier Sanctions:** Airlines are fined heavily for bringing passengers with invalid documents. They are risk-averse. The dominant architecture should still be direct carrier access to official boarding-status systems. Live Verify is more defensible as a fallback when staff are working from the travel document itself and lack a clean official channel.

**Social Security Administration**

**Benefit Eligibility:** Verifying status for SSN issuance or benefits.

**State DMVs**

**Driver's Licenses:** States require proof of legal presence. Verifying I-512 documents helps issue Real ID-compliant licenses.

## Verification Architecture

**The Parole Fraud Problem**

- **Photo Substitution:** Replacing the photo on the paper I-512L with a lookalike.
- **Expired Documents:** Altering the "Valid Until" date to extend travel windows.
- **Revoked Status:** Using a parole document after the underlying Green Card application has been denied (which voids the parole), but the physical paper wasn't surrendered.

**Issuer Types** (First Party)

**USCIS:** The sole issuer.

**Privacy Salt:** Critical for immigration documents. The hash must be salted to prevent enumeration of A-Numbers.

## Authority Chain

**Pattern:** Sovereign

Issues immigration travel permits for temporary protection.

```
✓ uscis.gov/ap/verify — Issues immigration travel permits for temporary protection
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

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

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Central Databases (CBP)

| Feature | Live Verify | CBP Systems (TECS) |
| :--- | :--- | :--- |
| **User Access** | **Potential bridge for lower-capability relying parties.** | **Primary for government/border use.** |
| **Airline Check-in** | **Possible fallback from the paper artifact.** | **Dominant if direct carrier access exists.** |
| **Physical Security** | **Tamper-Evident.** Hash protects the printed dates/names. | **None.** The paper itself has weak security features compared to a passport. |
| **Cost** | **Low.** Standard web infrastructure. | **High.** Secure leased lines/VPNs required for database access. |

**Narrower conclusion:** This is only strong as an edge-case bridge for airlines, DMVs, or other relying parties that are staring at the paper and do not have a clean official status path. It is not a substitute for border systems, carrier document systems, or USCIS/CBP databases.

## See Also

- [Passports & Visa Documents](view.html?slug=passports-visa-documents) — Complementary only outside native travel-document systems
- [Work Permits & Work Visas](view.html?slug=work-permits) — Similar “official system primary, copied artifact secondary” pattern
- [Border Crossing Receipts (I-94)](view.html?slug=border-crossing-receipts-i94) — Another DHS/CBP status artifact
