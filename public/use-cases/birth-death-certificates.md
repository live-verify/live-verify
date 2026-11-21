---
title: "Birth and Death Certificates"
category: "Government & Civic Documents"
volume: "Small (per certificate, but billions exist globally)"
retention: "Permanent (vital records)"
slug: "birth-death-certificates"
verificationMode: "clip"
tags: ["birth-certificate", "death-certificate", "vital-records", "identity", "probate", "ancestry"]
furtherDerivations: 1
---

## What is a Vital Record?

**Birth and Death Certificates** are the "Breeding Documents" of identity. Almost every other ID (Passport, Driver's License, Social Security Card) is issued based on a Birth Certificate.

Because they are so powerful, they are the #1 target for identity thieves. A criminal can use the birth certificate of a child who died young to "become" that person, opening bank accounts and taking out loans.

The strongest architecture is still the issuing vital-records office or the formal government verification channel where one exists. Live Verify is more credible when the certificate itself is the artifact in hand and the verifier needs a practical path back to current record status outside that government workflow.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 3px double #1a365d; background: #fdfcf0; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); position: relative; border-radius: 4px;">
  <div style="text-align: center; border-bottom: 2px solid #1a365d; padding-bottom: 15px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.3em; letter-spacing: 2px; color: #1a365d;"><span verifiable-text="start" data-for="birth"></span>COMMONWEALTH OF PENNSYLVANIA</div>
    <div style="font-size: 0.9em; text-transform: uppercase; color: #2c5282;">Department of Health • Vital Statistics</div>
  </div>
<h2 style="text-align: center; font-size: 1.5em; color: #1a365d; margin-bottom: 25px;">CERTIFICATION OF BIRTH</h2>
<div style="font-size: 1em; line-height: 1.8; color: #333;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
      <div><strong>Name:</strong> <strong>JOHN JACOB DOE</strong></div>
      <div style="text-align: right;"><strong>File No:</strong> 137-2026-9922</div>
    </div>
<div style="margin-bottom: 10px;"><strong>Date of Birth:</strong> May 15, 2026</div>
    <div style="margin-bottom: 10px;"><strong>Sex:</strong> Male</div>
    <div style="margin-bottom: 10px;"><strong>Place of Birth:</strong> Philadelphia, PA (Hospital: Penn Medicine)</div>
<div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 15px;">
      <div style="margin-bottom: 10px;"><strong>Mother/Parent:</strong> Mary Alice Jacob</div>
      <div style="margin-bottom: 10px;"><strong>Father/Parent:</strong> Robert Q. Doe</div>
    </div>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="width: 90px; height: 90px; border: 2px dashed #1a365d; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #1a365d; font-weight: bold; text-align: center;">STATE<br>REGISTRAR<br>SEAL</div>
    </div>
    <div style="text-align: right;">
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Quincy J. Registrar</div>
      <div style="font-size: 0.8em; color: #777;">Date Issued: June 01, 2026</div>
    </div>
  </div>
<div data-verify-line="birth" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: PA Health Dept doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="birth">verify:health.pa.gov/vital/v</span> <span verifiable-text="end" data-for="birth"></span>
  </div>
</div>

## The Problem: Breeding Document Fraud

- **Ghosting:** Using the birth certificate of a child who died young to assume their identity. Verification catches this by showing a "DECEASED" flag on the birth record.
- **Alteration:** Changing the date of birth to appear younger (for sports/schools) or older (for retirement benefits).
- **Fictitious Records:** Creating a realistic birth certificate for a non-existent person to get a "real" ID.

## What Is Checked

Full name at birth, date of birth, place of birth (City/County/State), parents' full names (including maiden), sex, file/registration number, date of registration, date of issuance.

**Document Types:**
- **Standard Birth Certificate:** Long or short form.
- **Death Certificate:** Including date/place of death and social security number.
- **Stillbirth Certificate:** (Certificate of Birth Resulting in Stillbirth).
- **Consular Report of Birth Abroad (CRBA):** For citizens born overseas.

## What the Checker Sees

Shows the issuer domain (`health.pa.gov`, `cdc.gov`) and current record status.

**Status Indications:**
- **Verified** — Record matches the vital statistics database.
- **Amended** — Original record was legally changed (e.g., adoption or name change).
- **Deceased** — (For Birth Certs) Cross-referenced with death registry to prevent "Ghost" identity theft.
- **Invalid** — File number mismatch or known fraudulent document series.

## Who Holds It

The Named Person or Next of Kin benefits from verification.

**Passport Applications:** The issuing authority's own government verification channel should remain primary. The complementary case is when the certificate itself is what is circulating and the verifier needs a direct bridge back to issuer status.

**Real ID Licensing:** Speeding up checks when staff are working from the certificate and unclear paper quality is the immediate problem, not replacing the underlying government lookup.

**Estate Settlement:** Proving to a bank or life insurer that a family member has indeed passed away using a verified death certificate.

## Who Checks It

**The State Department (Passport Agency)**
**Identity Integrity:** Passport fraud is often built on stolen or fake birth certificates. Verification directly against the issuing state's domain stops "Paper Forgery" cold.

**Banks and Lenders**
**KYC/Onboarding:** Using the birth certificate as a foundational "Breeding Document" for identity. Verification prevents fraudsters from using deceased persons' identities to open lines of credit.

**Genealogists / Historians**
**Record Accuracy:** Ensuring that historical records being used for lineage research are authentic government-issued documents.

## Who Issues It

**Issuer Types** (First Party)

**State Departments of Health:** (Managing Vital Statistics).
**County Clerks:** (In some jurisdictions).
**Embassies/Consulates:** (For CRBA).

**Privacy Salt:** Critical. Vital records are protected by law. The hash must be salted to prevent enumeration/guessing of birth records.

## Authority Chain

**Pattern:** Sovereign

```
✓ gro.gov.uk/verify — Registers births, deaths, and marriages in England and Wales
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Security Paper and Government Verification Networks

Birth and death certificates are protected by security paper and printing features, and in the US government agencies can confirm them with the issuing state through EVVE, a network for government users. Coverage depends on where the certificate was issued: each country, and in the US each state, uses its own paper and its own channels, and few offer any check to the private sector. These and Live Verify answer different questions and work side by side: security paper protects the sheet, government networks serve officials, and Live Verify lets a private-sector checker confirm the text of a certificate presented to them.

| | Government verification network (such as EVVE) | Security paper features | Live Verify on the certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Authorised government agencies. | Anyone, though judging the features takes expertise in each issuer's paper. | Anyone handed the certificate: a bank, an insurer, an employer, a foreign authority. |
| **What the checker gets** | Confirmation from the issuing vital records office. | Evidence that the paper is genuine, but not that the text on it is unaltered. | Confirmation that the issuing office stands behind this exact text, as at its date. |
| **What the holder shares** | Nothing extra; agencies query the record. | The certificate. | Only the certificate they chose to hand over. |
| **Reach** | Government users, for participating issuers. | Wherever the certificate goes, if the checker knows that issuer's paper. | Global in principle: any vital records office that publishes hashes on its own domain. |
| **Speed and cost** | Fast for those with access; access and charges are set by the operator. | No lookup; specialty printing costs the issuer. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | Government access. | Specialty paper and a trained eye. | The issuing office to publish hashes, and Live Verify-aware software on the checker's device. No vital records office does this yet. |
| **Best suited to** | Passports, benefits and other government decisions. | A first physical check. | Private-sector and cross-border checks where the certificate itself is presented. |

**Where each fits:** government channels should remain primary where they exist and are usable. Live Verify is most useful for private-sector and cross-jurisdiction checks, where the certificate itself is presented outside those channels and the checker would otherwise fall back to inspecting the paper, provided their software honours it.

## See Also

- [Passports & Visa Documents](view.html?doc=passports-visa-documents) — Similar “copied/portable artifact outside native system” framing
- [Probate Documents](view.html?doc=probate-documents) — Death-related authority workflows downstream of the vital record

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
