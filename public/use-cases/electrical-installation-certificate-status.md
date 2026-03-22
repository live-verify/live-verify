---
title: "Electrical Installation Certificate Status"
category: "Real Estate & Property"
volume: "Large"
retention: "5 years (EICR cycle)"
slug: "electrical-installation-certificate-status"
verificationMode: "clip"
tags: ["property", "electrical", "eicr", "landlord", "rental", "conveyancing", "safety", "real-estate", "niceic", "napit"]
furtherDerivations: 2
---

## The Problem

When a rental property is let in England, the landlord must hold a valid Electrical Installation Condition Report (EICR), renewed every five years. For property sales, buyers' solicitors routinely request one as part of pre-contract enquiries. The EICR is currently a paper or PDF certificate issued by the electrician who carried out the testing. There is no centralised register that a third party can check against.

This creates several problems. A certificate could be fabricated entirely. It could be genuine but relate to a different property. It could have expired. The electrician who signed it may not have been registered with a competent person scheme at the time of testing. A tenant or buyer's solicitor has no practical way to confirm any of these things without contacting the electrician directly — assuming they can be found and are still trading.

The testing body's registration scheme (NICEIC, NAPIT, or equivalent) is the natural authority. If the scheme operator issued a verifiable claim confirming the certificate's existence, the property it relates to, the result, and the validity period, any recipient could check it in seconds against the scheme operator's domain. This would not replace the full EICR document, but it would confirm the key facts that matter during a letting or sale: was this property tested, did it pass, and is the certificate still current.

**Why verification matters here:**

- **Faulty electrics kill and cause fires.** Electrical faults are the single largest cause of accidental house fires in the UK. An unsatisfactory EICR with C1 codes means "danger present" — exposed live conductors, absent earthing, or overloaded circuits. A fabricated "satisfactory" certificate conceals conditions that can kill occupants.
- **Landlords face unlimited fines.** Since July 2020, landlords in England must obtain an EICR before letting and renew every five years. Failure carries fines of up to £30,000 per breach. A fabricated or expired certificate does not constitute compliance — and the local authority can require the landlord to obtain a genuine one within 28 days.
- **Tenants have the right to see it.** Tenants can request the EICR and should receive a copy within 28 days of the test. A verifiable status from the scheme operator's domain lets the tenant confirm the certificate is genuine and current without having to trust a PDF provided by the landlord.

## Electrical Installation Status — Satisfactory

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="eicr-satisfactory"></span>ELECTRICAL INSTALLATION STATUS
Property:       14 Cedar Grove, York
Report Type:    EICR (Electrical Installation
                Condition Report)
Result:         SATISFACTORY
Tested By:      SafeWire Electrical (NICEIC registered)
Test Date:      15 Sep 2025
Valid Until:    15 Sep 2030
<span data-verify-line="eicr-satisfactory">verify:niceic.com/certificates/v</span> <span verifiable-text="end" data-for="eicr-satisfactory"></span></pre>
</div>

## Electrical Installation Status — Unsatisfactory

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="eicr-unsatisfactory"></span>ELECTRICAL INSTALLATION STATUS
Property:       Flat 8, 29 North Street, Bristol
Report Type:    EICR
Result:         UNSATISFACTORY (C1 codes present)
Tested By:      BrightSpark Electrical (NAPIT registered)
Test Date:      15 Jan 2026
Remedial Work:  REQUIRED WITHIN 28 DAYS
<span data-verify-line="eicr-unsatisfactory">verify:napit.org.uk/certificates/v</span> <span verifiable-text="end" data-for="eicr-unsatisfactory"></span></pre>
</div>

**Observation code detail is excluded from the verifiable text.** The snapshot confirms whether the installation passed or failed, but does not enumerate individual observation codes (C1, C2, C3, FI). An unsatisfactory result with C1 codes indicates danger is present or likely. A solicitor or landlord seeing this result would obtain the full EICR to understand the specific defects. The verifiable snapshot flags the outcome; the detail follows through established channels.

## Data Verified

Property address, report type, test result (satisfactory or unsatisfactory), testing contractor name and registration scheme, test date, validity expiry date (for satisfactory results), and remedial work requirement (for unsatisfactory results).

## Data Visible After Verification

Shows the issuer domain (`niceic.com` or `napit.org.uk`) and confirms whether the electrical installation certificate claim is current.

**Status Indications:**
- **SATISFACTORY** — The installation was tested and no codes requiring remedial action were found. The certificate is valid for five years from the test date.
- **UNSATISFACTORY** — The installation was tested and observation codes requiring remedial action were found. C1 codes indicate danger present; C2 codes indicate potentially dangerous conditions. The landlord or owner must arrange remedial work and re-testing.
- **EXPIRED** — The five-year validity period has passed. A new EICR is required.

## Second-Party Use

The **landlord or property seller** uses this to demonstrate that the electrical installation has been tested and certified. When a prospective tenant asks about electrical safety, or a buyer's solicitor raises it during pre-contract enquiries, the landlord or seller clips the certificate status and shares it. The recipient verifies the hash against the registration scheme's domain, confirming the test result and validity without needing to contact the electrician or request sight of the original certificate.

Letting agents acting on behalf of landlords can hold and share verified certificate statuses as part of their compliance documentation.

## Third-Party Use

**Tenants**
The primary beneficiary in the rental sector. A tenant can verify that the property they are renting has a current, satisfactory EICR before signing a tenancy agreement. Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must provide a copy of the EICR to tenants. A verifiable status snapshot gives the tenant confidence that the certificate is genuine and current.

**Buyers' Solicitors**
During conveyancing, a solicitor acting for a buyer can verify the electrical installation status as part of property due diligence. An unsatisfactory or missing EICR may affect the purchase price or lead to a retention being held until remedial work is completed.

**Mortgage Lenders**
Lenders assessing a property as security for a mortgage may require evidence of electrical safety, particularly for buy-to-let mortgages where the landlord's legal obligations include holding a valid EICR.

**Local Authority Enforcement**
Local housing authorities have powers to enforce the electrical safety regulations in the private rented sector. A verifiable certificate status gives enforcement officers a fast way to confirm compliance without requesting paper documentation from the landlord.

## Verification Architecture

**The "Is It Real?" Problem**

- **Fabricated Certificates:** A paper EICR with a plausible-looking contractor name and registration number is straightforward to forge. There is no public lookup to confirm a specific certificate exists.
- **Wrong Property:** A genuine EICR for one property could be presented as evidence for a different property. Without checking the original against a central record, the mismatch is invisible.
- **Expired Certificates:** A five-year-old EICR may be presented as current when it has in fact expired. The expiry date on the paper certificate could be altered.
- **Unregistered Electricians:** The electrician who signed the certificate may not have been registered with a competent person scheme at the time of testing, making the certificate invalid regardless of its content.

**Issuer Types** (First Party)

**Competent Person Scheme Operators:** NICEIC, NAPIT, ELECSA, and other scheme operators approved by the UK government to certify electrical installation work. These bodies maintain registers of their members and the certificates they issue.

<details>
<summary>International Equivalents</summary>

**United States:** Electrical installations are inspected by local building departments or authorised inspection agencies. The authority having jurisdiction (AHJ) issues the inspection result. There is no single national scheme, but the local inspector's sign-off is the authoritative record.

**Australia:** Each state has its own electrical safety regulator (e.g., Energy Safe Victoria, NSW Fair Trading). Compliance certificates are issued by licensed electrical contractors and lodged with the state regulator. The regulator is the authoritative source for verification.
</details>

**Privacy Salt:** Required. Property addresses combined with test dates and contractor names could be enumerated. The hash must be salted to prevent an adversary from constructing lookups against known rental property addresses.

Scheme operators (NICEIC, NAPIT) can authoritatively confirm that a contractor is registered with them and was registered at the time a certificate was reportedly issued. Whether the scheme operator also holds and can verify the specific EICR record depends on the operator's data retention and notification requirements, which vary. For some operators, contractors are required to notify completed work; for others, the contractor retains the primary record. The verification model is strongest where the scheme operator receives notification of each certificate. Where they do not, the verification falls back to the individual contractor's domain — which is a weaker trust anchor.

## Authority Chain

**Pattern:** Regulated

The competent person scheme operator (here, NICEIC) is the authoritative source for certificates issued by its registered members. NICEIC is itself approved by the UK government as a competent person scheme operator.

```
✓ niceic.com/certificates/verify — Issues verified EICR status
  ✓ niceic.com — Competent person scheme operator
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Manual Verification

| Feature | Live Verify | Contacting the Electrician | Paper/PDF Certificate |
| :--- | :--- | :--- | :--- |
| **Speed** | **Seconds.** Hash check against scheme operator domain. | **Hours to days.** Phone or email the contractor, hope they respond. | **N/A.** No verification — you trust the document as presented. |
| **Trust Anchor** | **Domain-Bound.** Tied to the scheme operator (NICEIC, NAPIT). | **Institutional.** Trust the contractor's verbal confirmation. | **None.** Paper can be fabricated or altered. |
| **Coverage** | **Any registered contractor.** Scheme operator holds all certificates for its members. | **Single contractor.** Only the firm that did the work can confirm it. | **Single document.** No way to confirm it matches scheme records. |
| **Integrity** | **Cryptographic.** Binds property, result, and validity to scheme domain. | **None.** Verbal or email confirmation with no tamper evidence. | **None.** Paper or PDF with no integrity mechanism. |

## Further Derivations

None currently identified.
