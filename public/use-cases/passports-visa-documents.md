---
title: "Passports and Visa Documents"
category: "Government & Civic Documents"
volume: "Medium-Small"
retention: "10-20 years (security requirements)"
slug: "passports-visa-documents"
verificationMode: "clip"
tags: ["passports", "visa", "identity-verification", "kyc", "border-security", "international-travel", "real-id", "consular-services"]
furtherDerivations: 1
---

## What is a Passport?

A Passport is your "Global Identity Card." It is the most powerful travel document in the world, proving both your identity and your citizenship. A Visa is the official permission granted by a *foreign* country allowing you to enter their borders for a specific purpose (work, study, or tourism).

Beyond the airport, passports are used as the "Primary ID" for:
1.  **Opening Bank Accounts:** Satisfying strict AML/KYC laws.
2.  **Renting High-Value Assets:** Cars, apartments, or luxury equipment.
3.  **Cross-Border Business:** Signing contracts as a foreign entity.

**"High-Grade Clones"** are a major security threat. Sophisticated forgers can replicate holograms, security paper, and even RFID chips. But the strongest passport verification still belongs inside the passport's native machine-readable ecosystem: chip reads, MRZ checks, and official government systems.

The Live Verify use case is narrower. It is for **third-party relying parties outside formal government verification channels**: hotels, employers, landlords, banks, remote onboarding teams, and background-check providers. Those parties often receive a scan, PDF, or phone photo of the data page but do not have chip-reading hardware or direct access to border-grade systems. In that setting, Live Verify turns the Data Page Copy into a live link back to the issuing authority's status.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #333; border-radius: 12px; background: #fff; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
  <div style="background: #002d62; color: #fff; padding: 20px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="pass"></span>UNITED KINGDOM OF GREAT BRITAIN</div>
      <div style="font-size: 0.8em;">PASSPORT / PASSEPORT</div>
    </div>
    <div style="font-size: 1.5em;">🇬🇧</div>
  </div>
<div style="padding: 20px; display: flex;">
    <div style="width: 120px; margin-right: 20px;">
      <div style="width: 120px; height: 150px; background: #eee; border: 1px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #777; font-size: 0.7em; text-align: center;">[AUTHORITATIVE<br>DMV/PASSPORT<br>PHOTO]</div>
    </div>
    <div style="flex-grow: 1;">
      <div style="font-size: 1.1em; font-weight: bold; margin: 0 0 5px 0;">DOE, JOHN JACOB</div>
      <div style="font-size: 0.85em; color: #333; line-height: 1.4;">
        <strong>Passport No:</strong> 992288776<br>
        <strong>Nationality:</strong> BRITISH CITIZEN<br>
        <strong>DOB:</strong> 15 MAY 1985<br>
        <strong>Sex:</strong> M  |  <strong>Place of Birth:</strong> LONDON<br>
        <strong>Expires:</strong> 15 MAR 2031
      </div>
    </div>
  </div>
<div style="padding: 0 20px 20px 20px;">
    <div style="font-family: 'Courier New', monospace; font-size: 0.9em; background: #f5f5f5; padding: 10px; border: 1px solid #ddd; letter-spacing: 1px; margin-bottom: 10px;">
      P&lt;GBRDOE&lt;&lt;JOHN&lt;JACOB&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br>
      9922887762GBR8505151M3103158&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;06
    </div>
    <div data-verify-line="pass" style="border-top: 1px dashed #999; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: HM Passport Office doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="pass">verify:gov.uk/passport/v</span> <span verifiable-text="end" data-for="pass"></span>
    </div>
  </div>
</div>

## The Problem: Copied Data Page Fraud

- **Identity Theft:** Using a real person's data on a cloned book with a different photo.
- **Status Hiding:** Sending a scan of a passport that has since been reported lost, replaced, or revoked.
- **Scan Reuse:** Reusing an old passport image in onboarding flows long after a replacement document was issued.
- **The Doppelganger Attack:** Using a valid passport belonging to a similar-looking person. Live Verify with Photo Return (returning the official face on file) helps non-government verifiers detect this faster.

## What Is Checked

Full name, Nationality, Date of Birth, Passport Number, Document Serial Number, Issuing Authority ID, Place of Birth, Expiration Date, MRZ (Machine Readable Zone) checksums, Photo (via secure hash).

**Document Types:**
- **Standard Passport:** The foundational data page.
- **Entry/Exit Visa:** Full-page stickers for foreign entry.
- **Residency Permit (BRP):** Long-term stay authorization.
- **Emergency Travel Document:** Temporary 1-way paper for lost passports.

## What the Checker Sees

Shows the issuer domain (`gov.uk`, `state.gov`, `singpass.gov.sg`) and the live security status.

**Status Indications:**
- **Valid** — Passport is authentic and in good standing.
- **Reported Stolen/Lost** — Bearer has reported this physical book missing.
- **Revoked** — Citizenship or travel rights have been terminated.
- **Replaced** — A newer passport version exists for this person (common in clone detection).

## Who Holds It

The Passport Holder (Traveler) benefits from verification.

**Digital Onboarding:** Proving their identity to an online bank or crypto exchange in seconds. A verified hash allows the bank to trust the "Data Page" without requiring the user to record a 3D "Video Selfie" (which many find invasive and buggy).

**Remote Work / Visas:** Providing a verified digital copy of their passport to a foreign employer, ensuring the HR team that the document is authentic without mailing the physical book across borders.

## Who Checks It

**Hotels and Hospitality**
**Remote Copy Trust:** A hotel receiving a passport image during pre-arrival check-in can verify that the copied data page still maps to an issuer-backed record rather than trusting a bare JPEG sent over email or chat.

**Employers / Background Checks**
**Identity and Work-History Support:** A foreign employer or screening firm reviewing a passport copy can verify that the document is not an obvious fabrication or stale replacement before proceeding to deeper checks.

**Banks / KYC Teams**
**Copy-of-Passport Workflows:** Many KYC teams still receive uploaded passport scans during onboarding. Live Verify gives them a stronger authenticity and status signal without requiring full passport-reader hardware.

## Who Issues It

**Issuer Types** (First Party)

**National Passport Agencies:** (HM Passport Office, U.S. State Dept).
**Consulates / Embassies:** (For Visas and CRBAs).
**International Aviation Bodies:** (ICAO PKD integration).

**Privacy Salt:** ABSOLUTELY CRITICAL. Passport data is the "Crown Jewels" of identity. The hash MUST be salted to prevent foreign intelligence or hackers from "Mass Mapping" a population's travel documents.

## Authority Chain

**Pattern:** Sovereign

```
✓ hmpo.gov.uk/verify — Issues and renews UK passports
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Photo Return: Stronger Copy-of-ID Checks

Verification responses can include the issuing authority's authoritative photo of the holder — not just status, but the actual face on file.

**Why This Matters:**
A sophisticated forger can perfectly replicate holograms and security paper. But they cannot forge what the government server sends back. When a hotel, employer, or KYC analyst sees a returned photo that does not match the submitted document or the live selfie they requested, the fraud is exposed.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the issuing government's hashes and status changes plus structured metadata (passport number, document type, issuing country, expiration date) — never biometric data or full passport information — providing non-repudiation of passport issuance.


## Compared With NFC (Electronic Passports)

| Feature | Live Verify | NFC / e-Passport | Scanned PDF / Image |
| :--- | :--- | :--- | :--- |
| **Primary Use Case** | **Third-party copy verification.** Good for uploaded scans and PDF workflows. | **Gold standard.** Best when native passport-reading infrastructure is available. | **Weak.** Easy to forge and replay. |
| **Hardware** | **Ordinary smartphone.** Needs Live Verify on it (an app today). | **Restricted.** Requires NFC-capable devices and chip-reading support. | **Universal.** |
| **Verifier Access** | **Broad.** Useful for hotels, employers, banks, and screening teams. | **Limited.** Best suited to formal travel and government workflows. | **Broad.** But untrusted. |
| **Status Signal** | **Good.** Issuer-domain response can show replacement or revocation state. | **Strong.** Native passport trust path. | **None.** Static copy only. |

**Where each fits:** Reading the chip over NFC is the strongest check of a passport and remains the right method at borders and wherever reader infrastructure exists. Hotels, employers, banks and screening teams often handle only a copy and have no such infrastructure. Live Verify is for those copy-based workflows; it does not replace NFC or official border systems.

## Further Reading

[Deep dive: Government IDs](https://github.com/live-verify/live-verify/tree/main/deep-dives/Government_IDs.md)
