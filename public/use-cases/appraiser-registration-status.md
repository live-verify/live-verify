---
title: "Appraiser Registration & Credential Status"
category: "Professional & Occupational Licenses"
volume: "Medium"
retention: "Registration period + renewal cycle"
slug: "appraiser-registration-status"
verificationMode: "clip"
tags: ["appraiser", "valuer", "credential", "registration-status", "good-standing", "asc", "rics", "asa", "isa", "gia", "naj", "uspap", "phantom-appraiser", "valuation-fraud", "professional-licence"]
furtherDerivations: 2
---

## What is an Appraiser Registration Status?

An **appraisal is only as trustworthy as the person who signed it.** Every appraisal report — for a house, a diamond ring, a painting, a coin collection — carries the appraiser's name and a string of credentials after it: "Certified Residential Appraiser," "GG (GIA)," "ISA AM," "MRICS." Those letters are the trust anchor. But the letters themselves are just text on a page, and the single most common appraisal fraud is the **phantom appraiser**: a forged report from someone who isn't credentialed at all, or who once held a credential that has since lapsed, been suspended, or been revoked.

Appraisers are registered or accredited by a regulator or professional body, which maintains a register, grants and revokes standing, and publishes each appraiser's current status. The body varies by jurisdiction and by what is being appraised, but the verification problem is universal: an insurer, lender, court, or buyer encounters the appraiser's credential claim *on the appraisal report itself* — far from the register — and currently must either trust the letters after the name or perform a separate manual lookup.

| Jurisdiction / Domain | Authority | Notes |
| :--- | :--- | :--- |
| **US real estate** | State appraiser boards; **ASC** national registry | Federally mandated registry of state-certified/licensed real-estate appraisers at `asc.gov` |
| **US personal property** | **ASA**, **ISA**, **AAA** | Accrediting bodies for personal-property, gems & jewelry, fine-art appraisers |
| **US gemstones** | **GIA** (Graduate Gemologist), **NAJA** | Gemological credentials and jewelry-appraisal accreditation |
| **UK** | **RICS** (Registered Valuer scheme) | Chartered surveyors/valuers; `rics.org` "Find a Surveyor" register |
| **Canada** | **AIC** (Appraisal Institute of Canada) | AACI / CRA designations |
| **Australia** | **API** (Australian Property Institute) | Certified Practising Valuer (CPV) |

A verifiable credential claim is text issued by the relevant authority that can appear in any of these contexts: in the signature block of an appraisal report, on the appraiser's website or letterhead, in a directory listing, or on a business card. The verifier checks it in place — by clipping or photographing — without navigating to the register separately.

The examples below use the US **ASC** registry and a personal-property **ISA/GIA** credential as the primary illustrations, but the pattern applies identically to RICS, AIC, API, or any other appraiser authority.

This complements [Appraisals & Valuations (Art, Antiques, Jewelry & Collectibles)](view.html?doc=art-authentication-documents) and [Property Appraisals and Valuations](view.html?doc=property-appraisals-valuations): those verify the *report*; this verifies the *appraiser behind it*.

**"Why would you bother?"** A homeowner buying insurance, a co-heir dividing an estate, or a bank lending against a property all receive a finished appraisal with impressive credentials in the signature block. A suspended or never-credentialed appraiser's report looks identical to a legitimate one. The consequences are direct: an inflated valuation from a phantom appraiser is the document that enables over-insurance and staged losses, padded charitable-donation deductions, and the loan-collateral inflation that drove the 2008 mortgage collapse. Verifying the appraiser's standing at the point the report is read turns a string of letters into a regulator-confirmed statement.

## Example: Report Signature Block (Real Estate, ASC)

The signature block of a Uniform Residential Appraisal Report carries the appraiser's certification. The authority supplies the verifiable claim text; styling is ignored by clip mode.

<div style="max-width: 520px; margin: 24px auto; background: #fff; border: 2px solid #1f5130; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(31,81,48,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #1f5130; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 12px;">ASC</div>
    <div style="font-size: 0.75em; color: #000; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Certified Appraiser</div>
  </div>
  <span verifiable-text="start" data-for="asc"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Daniel R. Okafor</span><br>
    State Certified Residential Appraiser<br>
    <span style="color: #666;">TX Licence CR-9922, ASC ID 1004773</span><br>
    Status: Active &mdash; in good standing
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="asc">verify:asc.gov/appraisers/v</span>
  </div>
  <span verifiable-text="end" data-for="asc"></span>
</div>

The text that clip mode sees and hashes:

```
Daniel R. Okafor
State Certified Residential Appraiser
TX Licence CR-9922, ASC ID 1004773
Status: Active — in good standing
verify:asc.gov/appraisers/v
```

The authority controls the claim text. The appraiser embeds it in the report. The hash is unaffected by styling.

## Example: Personal-Property Credential (ISA / GIA)

A gemologist's appraisal for an insurance schedule carries personal-property and gemological credentials. The same pattern applies.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #5a3b8c; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(90,59,140,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="font-size: 0.7em; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Accredited Personal Property Appraiser</div>
  <span verifiable-text="start" data-for="isa"></span>
  <div style="color: #000; font-size: 0.95em; line-height: 1.8; font-weight: 500;">
    Dara Okafor
  </div>
  <div style="color: #333; font-size: 0.9em; line-height: 1.6;">
    GG (GIA) Graduate Gemologist<br>
    ISA Accredited Member (ISA AM)<br>
    Member ID: ISA-44218<br>
    Status: Accredited &mdash; current
  </div>
  <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="isa">verify:isa-appraisers.org/members/v</span>
  </div>
  <span verifiable-text="end" data-for="isa"></span>
</div>

The text from the credential block:

```
Dara Okafor
GG (GIA) Graduate Gemologist
ISA Accredited Member (ISA AM)
Member ID: ISA-44218
Status: Accredited — current
verify:isa-appraisers.org/members/v
```

A gemological credential (GG) and an appraisal accreditation (ISA AM) are different things — one says the person can grade the stone, the other that they are accredited to appraise its value. Listing both, each verifiable, lets the recipient confirm the appraiser is qualified for the specific task.

## Example: Credential Statuses

Appraiser registers record several distinct statuses, each with different implications for whether the appraiser's signature can be relied upon.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           SUSPENDED
Reason:           State board disciplinary order — pending review
Result:           This appraiser may not currently issue certified appraisals

verify:asc.gov/appraisers/v
</pre>
</div>

A suspended or lapsed appraiser may continue signing reports for weeks before enforcement catches up. The endpoint returns the current status — not the status when the report was signed.

**Key statuses:**
- **Active / in good standing** — Full registration or accreditation; the appraiser is entitled to issue appraisals.
- **Inactive / lapsed** — On the register but renewal lapsed (e.g., CE credits or fees outstanding). Not currently entitled to issue certified appraisals.
- **Suspended** — Standing suspended following a disciplinary order. The appraiser must not issue certified appraisals during the suspension.
- **Revoked / removed** — Credential withdrawn (e.g., for fraud or repeated USPAP violations). The appraiser is no longer authorised.
- **Conditions / supervised** — Active but subject to conditions (e.g., trainee under a supervisory appraiser, or restrictions imposed after discipline).
- **404** — No such registration exists on the register.

## Data Verified

Appraiser's name, registration/licence/member number, issuing authority, credential level or designation (e.g., Certified Residential, GG, ISA AM, MRICS), scope of practice where recorded (real estate / personal property / gems / fine art), current status, and any conditions or restrictions.

**Document Types:**
- **State / National Registration** — Confirmation that the appraiser holds a current state or national appraiser licence (e.g., ASC registry entry).
- **Professional Accreditation** — Confirmation of membership in good standing of an accrediting body (ASA, ISA, AAA, RICS, AIC, API).
- **Gemological Credential** — Confirmation of a grading qualification (e.g., GIA Graduate Gemologist).

**Privacy Salt:** Generally not required. Appraiser registrations are public information; registers such as ASC and RICS "Find a Surveyor" are publicly searchable by name or number. Appraisers issuing certified valuations are expected to be identifiable.

## Data Visible After Verification

Shows the issuer domain (e.g., `asc.gov` or `isa-appraisers.org`) and the appraiser's current standing.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["okafor-appraisal.com", "*.okafor-appraisal.com"]
}
```

**Status Indications:**
- **Active / good standing** — Current registration or accreditation; entitled to issue appraisals.
- **Inactive / lapsed** — On the register but not currently entitled to issue certified appraisals.
- **Suspended** — Standing suspended following disciplinary proceedings.
- **Revoked / removed** — Credential withdrawn.
- **Conditions** — Active, but conditions apply; the response includes a summary.
- **404** — No such registration exists.

## Second-Party Use

The **appraiser** benefits directly by proving their standing.

**Report credibility:** An independent appraiser embeds the authority-issued claim in every report's signature block. Insurers, lenders, and courts verify it rather than taking the letters after the name on trust — turning the appraiser's own assertion into a regulator-confirmed statement.

**Panel and AMC onboarding:** Appraisers join lender panels and Appraisal Management Company rosters. A verifiable credential gives the AMC immediate, current confirmation of standing rather than a self-declared licence number checked manually.

**Expert-witness work:** An appraiser engaged to give valuation testimony can present verifiable credentials to opposing counsel and the court, pre-empting challenges to qualifications.

## Third-Party Use

**Insurance Underwriters and Claims Adjusters**

**Anti-padding:** Inflated jewelry, art, and property valuations are a perennial fraud vector. Confirming the signing appraiser is genuinely credentialed and in good standing blunts the phantom-appraiser scheme at the point the schedule or claim is reviewed.

**Lenders and Appraisal Management Companies**

**Collateral integrity:** Before relying on a valuation to size a loan, the lender confirms the appraiser holds a current state certification. A revoked or lapsed appraiser's report is flagged before funds are committed — directly addressing the inflated-appraisal pattern that enabled the 2008 collapse.

**Courts, Probate, and Estate Attorneys**

**Admissible valuations:** Estate divisions and litigation rely on appraiser qualifications. Verifying standing confirms the valuation came from a person actually entitled to give it.

**The IRS / Tax Authorities**

**Qualified-appraiser test:** Non-cash charitable deductions above thresholds require a "qualified appraiser." Verifying the appraiser's credential supports the deduction and reduces audit friction on Form 8283 filings.

**Buyers and Co-Heirs**

**Independent check:** A buyer relying on a valuation, or a co-heir reviewing an estate appraisal, can clip the appraiser's credential and confirm it is current and unrevoked.

## Verification Architecture

**The Phantom Appraiser Problem**

Appraiser registers are largely public and searchable. The problem is the gap between where the standing is recorded and where the report is read:

- **Self-asserted credentials** — A report says "ISA AM, GG (GIA)" but those letters are typed by whoever produced the document. There is no link between the letters and the register.
- **Stale standing** — An appraiser is suspended or lets a licence lapse, but reports already in circulation (and new ones) still carry the old credentials. Suspensions take time to surface, and recipients have no automated notification.
- **Fictitious appraisers** — A fabricated report from a non-existent firm with real-looking credentials and a plausible licence number.
- **Scope mismatch** — A residential-certified appraiser signing a complex commercial valuation, or a general appraiser signing a gemstone appraisal they are not gemologically qualified to grade.

The verifiable claim addresses these because:

1. The authority issues the claim — it is not self-asserted in the signature block
2. The claim names the appraiser's own website domain via `allowedDomains`, so a credential copied onto an unauthorised site is flagged
3. Status changes (lapse, suspension, revocation) are reflected immediately at the endpoint
4. The recorded scope/designation lets the recipient confirm the appraiser is qualified for the specific item

## Competition vs. Current Practice

| Feature | Live Verify | Register Lookup (ASC/RICS) | Letters After Name | AMC Self-Declaration |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Authority issues the claim. | **Yes.** But requires navigating there. | **No.** Typed by the report author. | **No.** Declared by the appraiser. |
| **Verifiable at point of encounter** | **Yes.** In the report's signature block. | **No.** Requires leaving the document. | **No.** | **No.** |
| **Shows current status** | **Yes.** Live response from authority. | **Yes.** If someone checks. | **No.** Static text. | **No.** As-of onboarding only. |
| **Detects suspension/revocation** | **Yes.** Endpoint returns the status. | **Yes.** If checked. | **No.** | **No.** |
| **Detects copied credentials** | **Yes.** Domain mismatch warning. | **N/A.** | **N/A.** | **N/A.** |

**Practical conclusion:** Appraiser registers are authoritative and public, but recipients rarely use them — they read the letters after the name and accept them. A verifiable credential embedded where the report is read turns those letters into a regulator-issued, checkable statement.

## Authority Chain

**Pattern:** Regulated

In the US, real-estate appraiser certification is mandated under Title XI of FIRREA, with the Appraisal Subcommittee (ASC) maintaining the national registry over state boards.

```
✓ asc.gov/appraisers/v — Appraiser registration & credential status
  ✓ asc.gov — Appraisal Subcommittee (national registry)
    ✓ [state appraiser board] — State certifying authority
```

<details>
<summary>Other Authorities</summary>

**US — Personal Property & Gems (Accrediting Bodies)**

Personal-property, fine-art, and gem appraisers are accredited by professional bodies rather than a federal registry. Each maintains its own membership register.

```
✓ isa-appraisers.org/members/v — Accredited member status
  ✓ isa-appraisers.org — International Society of Appraisers (also ASA, AAA, NAJA; GIA for gemological credentials)
```

**UK — RICS Registered Valuer**

The Royal Institution of Chartered Surveyors operates the Registered Valuer scheme and a public "Find a Surveyor" register.

```
✓ rics.org/find-a-surveyor/v — Registered Valuer status
  ✓ rics.org — Royal Institution of Chartered Surveyors
```

**Canada — Appraisal Institute of Canada**

```
✓ aicanada.ca/members/v — AACI / CRA designation status
  ✓ aicanada.ca — Appraisal Institute of Canada
```

**Australia — Australian Property Institute**

```
✓ api.org.au/members/v — Certified Practising Valuer status
  ✓ api.org.au — Australian Property Institute
```

</details>

## Further Derivations

1. **Designation / Scope Verification** — Verification not just of membership but of the specific designation and scope (e.g., Certified General vs. Certified Residential; personal property vs. real estate; gemstones vs. fine art). Lets a recipient confirm the appraiser is qualified for the particular item, not merely credentialed in general.
2. **USPAP Compliance / CE Currency** — Verification that the appraiser's continuing-education and USPAP-update requirements are current, since lapsed CE is a common reason a credential moves to "inactive" without the appraiser advertising the change.
