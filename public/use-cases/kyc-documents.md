---
title: "KYC Identity Verification Documents"
category: "Financial Compliance"
volume: "Medium"
retention: "5-10 years post-relationship"
slug: "kyc-documents"
tags: ["address-verification", "aml", "bank-onboarding", "customer-due-diligence", "digital-id", "financial-crime", "identity-verification", "kyc", "proof-of-address", "utility-bill"]
furtherDerivations: 2
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="kyc-id">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">REVOLUT BANK
Customer Onboarding & Identity Vetting
═══════════════════════════════════════════════════════════════════

                    VERIFIED CUSTOMER PROFILE

[PHOTO]     DOE, JOHN JACOB

            Document:    US Passport #*******1234
            DOB:         May 15, 1985
            PEP Status:  CLEAR (Non-Political)
            Sanctions:   CLEAR (OFAC/HMT)

BANK ATTESTATION: This identity has been verified against
government databases and biometric liveness checks.
Profile ID: REV-99228877

</pre>
<span data-verify-line="kyc-id">verify:revolut.com/compliance/v</span> <span verifiable-text="end" data-for="kyc-id">]</span>
</div>

## Data Verified

Full name, date of birth, residential address, primary ID number (Passport/SSN), nationality, PEP (Politically Exposed Person) status, adverse media flag, sanctions list status (OFAC/EU), biometric liveness confirmation, date of onboarding.

**Document Types:**
- **KYC Passport/ID Extract:** Summary of the primary ID check.
- **Proof of Address Summary:** (Linked hash) for utility/bill verification.
- **Selfie Liveness Certificate:** Proving the user was physically present.
- **W-8BEN / W-9 Form:** (Linked hash) for tax identity.

## Data Visible After Verification

Shows the issuer domain (`revolut.com`, `chase.com`, `coinbase.com`) and current compliance standing.

**Status Indications:**
- **Verified** — Identity is current and background checks are clear.
- **Restricted** — **ALERT:** Identity verified but account limited due to risk.
- **Suspended** — Potential fraud or expired ID; re-verification required.
- **Blacklisted** — Associated with known criminal activity.

## Second-Party Use

The **Bank Customer** (second party) receives the KYC verification summary from the bank (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of their identity verification status. Most of the time, the record sits in their files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that their identity verification matches what the bank's system recorded and their status remains in good standing.

**Future Optionality:** If they need to open accounts elsewhere or prove their identity—whether for financial services, rentals, or visa applications—they have cryptographic proof ready without needing to contact the original bank.

## Third-Party Use

The customer (second party) may hand the verified document to various third parties:

**Mortgage Lenders / Neobanks**
**Reciprocal KYC:** Instantly verifying the identity claims of an applicant by scanning the hash from their primary bank. This allows for "One-Click Onboarding" across the financial ecosystem.

**FinCEN / Regulators**
**Compliance Audit:** During a bank examination, federal auditors can scan random customer files. "Verified by Revolut" ensures the bank isn't "Ghosting" their KYC duties by maintaining fake or un-vetted accounts.

**Crypto Exchanges**
**Fiat Gateway:** Verifying the source identity of a user before allowing large-scale crypto-to-fiat transfers.

## Verification Architecture

**The "Synthetic Identity" Fraud Problem**

- **Identity Fabrication:** Using a mix of real and fake data to create a "Synthetic Person" who doesn't exist. Verification against the bank domain prevents this.
- **Photo Substitution:** Using a stolen ID number but editing the photo on the PDF to match the fraudster.
- **Revocation Hiding:** A user whose account was closed for money laundering yesterday using their old "Verified" paper summary to open a new account today.

**Issuer Types (First Party)**

- Retail Banks
- Digital Wallets / Neobanks
- KYC Service Providers (e.g., Onfido, Jumio, Persona - hosting the hashes)

**Privacy Salt:** Required. KYC documents contain highly sensitive personal information with enumerable values—common names, standard date of birth formats, publicly listed addresses, passport number patterns, and predictable status categories (verified, restricted, suspended). A malicious actor could feasibly enumerate combinations to reverse-engineer customer identities, map bank populations, or target specific demographics. Salt is absolutely critical to protect this ultimate target for identity theft and financial fraud.

## Jurisdictional Witnessing

A jurisdiction may require banks and KYC providers to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the bank or KYC provider, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change (verified to suspended/blacklisted), or even a 404 (record deleted)
- Receives structured content/metadata (verification dates, document types, PEP status, sanctions check results)
- Does **NOT** receive plaintext (customer names, addresses, passport numbers, biometric data)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to customers/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Bank cannot deny performing KYC verification or the results
- **Timestamp proof:** Verification existed at a specific time (critical for AML compliance and regulatory examinations)
- **Regulatory audit:** FinCEN, banking regulators, or law enforcement can inspect the witness ledger for compliance patterns
- **Resilience:** Verification works even if bank's systems go down or the institution is acquired

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Bank domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. ID Verification APIs (Onfido)

| Feature | Live Verify | KYC API (Jumio/Onfido) | Scanned PDF ID |
| :--- | :--- | :--- | :--- |
| **User Privacy** | **High.** User shares only the *Vetted Profile*. | **Low.** Requires uploading raw ID photos to the cloud. | **High.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Bank. | **System-Bound.** Trust the vendor. | **Zero.** Easily forged. |
| **Interoperability** | **High.** Works across all banks. | **Low.** Every bank uses a different API vendor. | **Universal.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 30-120 seconds for AI processing. | **N/A.** |

**Why Live Verify wins here:** The "Privacy Paradox." Banks don't want to store raw ID photos forever because of liability. Users don't want to upload them to 10 different sites. Live Verify turns the **Vetted Result** into a portable, cryptographically trusted asset that carries the bank's "Authority" without the bank's "Data Liability."


---

_[Content merged from: kyc-proof-of-address]_


<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="address">[</span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">CON-EDISON
Utility Bill & Proof of Service
═══════════════════════════════════════════════════════════════════

Account #: 9922887766

SERVICE ADDRESS
───────────────────────────────────────────────────────────────────
123 Bleecker Street, Apt 4B
New York, NY 10012

Customer: JOHN JACOB DOE

BILLING SUMMARY
───────────────────────────────────────────────────────────────────
Billing Period:                               Feb 01 - Mar 01, 2026
Total Amount Due:                                          $ 142.50
Service Status:                                              ACTIVE

Verification confirms the address and residency status match the
utility company's official billing records.

</pre>
<span data-verify-line="address">verify:coned.com/billing/v</span> <span verifiable-text="end" data-for="address">]</span>
</div>

## Data Verified

Customer name, full service address, billing period dates, total amount due (numerical), account status (Active/Closed), issuing utility/bank name, date of issuance.

**Document Types:**
- **Utility Bill:** (Electric, Water, Gas).
- **Telecom Bill:** (Mobile, Internet).
- **Bank / Credit Card Statement:** (Linked hash) for address proof.
- **Council Tax / Property Tax Bill:** (High trust).

## Data Visible After Verification

Shows the issuer domain (`coned.com`, `verizon.com`, `chase.com`) and current account standing.

**Status Indications:**
- **Verified** — Address and name match the official billing file.
- **Closed** — Account is terminated; address may be outdated.
- **Disconnected** — **ALERT:** Service stopped; residency may be fraudulent.
- **Amended** — A correction was issued for this billing period.

## Second-Party Use

The **Bank Customer / Tenant** benefits from verification.

**Digital Onboarding:** Proving their current residence to a Neobank (e.g., Revolut or Chime) without having to "Wait for a paper letter in the mail." A verified hash from the utility domain removes the #1 cause of KYC rejection: **Unreadable or Outdated Utility Bills.**

**Visa / Residency:** Proving local residency to a foreign embassy or consulate using a verified, cryptographically trusted document.

## Third-Party Use

**Neobanks / Crypto Exchanges**
**Instant Address Match:** Automatically verifying the "Address String" provided in the signup form against the verified utility hash. Live Verify allows for **Zero-Human-Review** onboarding of customers, even those with thin credit files.

**Mortgage Lenders**
**Residency Audit:** Verifying that a borrower is actually living in their primary residence (and not using it as an undisclosed rental) by checking the verified utility status.

**Government Agencies (DMV)**
**Proof of Residency:** Verifying address claims for Real ID issuance without requiring physical paper folders.

## Verification Architecture

**The "Photoshopped Bill" Fraud Problem**

- **Address Forgery:** Scammers taking a real Con-Ed bill and editing the "Apt 4B" to match a more desirable or expensive address to commit bank fraud.
- **Identity Swapping:** Editing the name on a valid bill to match a stolen identity.
- **Date Alteration:** Editing a 2022 bill to read "March 2026" to hide that the person moved away 4 years ago.

**Issuer Types**

**Utility Companies.**
**Telecom Providers.**
**Municipal Tax Authorities.**
**Retail Banks.**

**Privacy Salt:** Critical. Addresses are PII. The hash must be salted to prevent "Mass Mapping" of a city's residents by scanning the utility domain.

## Competition vs. Address Verification APIs (Experian)

| Feature | Live Verify | Address API (Experian/Loqate) | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds the *Name* to the *Address*. | **Vague.** Only proves the address *exists*. | **Zero.** Easily forged. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Utility. | **Data-Bound.** Trust the aggregator. | **Visual.** |
| **Privacy** | **High.** User shares only the *Bill Summary*. | **Low.** Lenders see full credit history. | **High.** |
| **Coverage** | **Universal.** Works for any small utility with a URL. | **Limited.** Only for people with credit records. | **Universal.** |

**Why Live Verify wins here:** The "Thin File" problem. Millions of people (young people, expats, immigrants) don't have enough credit history for Experian to verify their address. But they **all** have a utility or mobile bill. Live Verify allows them to use their **Service Reality** as a verified trust signal, bypassing the need for a legacy credit score.
