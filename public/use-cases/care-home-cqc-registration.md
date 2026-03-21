---
title: "Residential Care Facility Registration"
category: "Identity & Authority Verification"
volume: "Medium"
retention: "Registration period + inspection cycle"
slug: "care-home-cqc-registration"
verificationMode: "clip"
tags: ["cqc", "care-home", "care-quality-commission", "social-care", "elderly-care", "safeguarding", "registration", "inspection-rating", "vulnerable-adults", "residential-care", "nursing-home", "aged-care", "long-term-care"]
furtherDerivations: 2
---

## What is a Residential Care Facility Registration?

Every country regulates residential care facilities — nursing homes, aged care homes, assisted living residences — through a public registration and inspection regime. The regulator issues a licence or registration, conducts periodic inspections, and publishes findings. Families choosing care for a vulnerable relative encounter the facility's claimed status on its own website or marketing materials, not on the regulator's, and have no easy way to confirm that the claim is current and genuine.

A verifiable registration claim is a short statement, issued by the regulator, naming the facility, its registration number, its current status or rating, and when it was last inspected. The family member verifies it on the facility's website by clipping the text, or from a photograph of printed materials — without navigating to the regulator's own search tool.

### Regulatory Equivalents by Jurisdiction

| Jurisdiction | Regulator(s) | Scope |
| :--- | :--- | :--- |
| **UK — England** | Care Quality Commission (CQC) | All health and social care providers |
| **UK — Scotland** | Care Inspectorate | Care homes, care at home, childcare |
| **UK — Wales** | Care Inspectorate Wales (CIW) | Social care and childcare |
| **UK — Northern Ireland** | Regulation and Quality Improvement Authority (RQIA) | Health and social care services |
| **USA** | State health departments; CMS (federal oversight) | Nursing homes, assisted living (state-level licensing varies) |
| **Australia** | Aged Care Quality & Safety Commission | Residential and home care for older people |
| **Canada** | Provincial health authorities (e.g., Ontario MLTC, BC Licensing) | Long-term care homes, assisted living |
| **Ireland** | Health Information and Quality Authority (HIQA) | Residential care for older people and people with disabilities |

The examples below use England's CQC as the primary illustration, but the verification pattern applies identically to any regulator that issues registrations and ratings.

### UK Example: CQC Registration (England)

The Care Quality Commission (CQC) is the independent regulator of health and social care in England. Every care home operating legally must be registered with the CQC and is subject to periodic inspection. Inspections produce a rating: Outstanding, Good, Requires Improvement, or Inadequate.

Care homes display their CQC registration and rating on their own websites and in printed marketing materials — brochures, reception signage, and information packs given to prospective residents and their families. The CQC maintains a public register at cqc.org.uk where anyone can look up a provider, but in practice, families encounter the rating claim on the care home's own site or in its printed materials, not on the regulator's.

## Example: Website Registration Claim

The CQC supplies the care home with an HTML snippet to embed on their website. The inline styling is ignored by clip mode — only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #005eb8; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(0,94,184,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #005eb8; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 12px;">CQC</div>
    <div style="font-size: 0.75em; color: #005eb8; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Registered Provider</div>
  </div>
  <span verifiable-text="start" data-for="cqc-web"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Riverside Care Home</span> <span style="color: #999;">(riversidecare.co.uk)</span><br>
    is registered with the Care Quality Commission<br>
    Rating: Requires Improvement <span style="color: #666;">(inspected Sep 2025)</span> on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="cqc-web">verify:cqc.org.uk/providers/v</span>
  </div>
  <span verifiable-text="end" data-for="cqc-web"></span>
</div>

The text that clip mode sees and hashes:

```
Riverside Care Home (riversidecare.co.uk)
is registered with the Care Quality Commission
Rating: Requires Improvement (inspected Sep 2025) on
verify:cqc.org.uk/providers/v
```

The CQC controls the claim text. The care home embeds it. The hash is unaffected by styling changes the care home makes to match their site design. The rating shown is the current rating at the time the claim was issued — "Requires Improvement" in this example, because the system works for all ratings, not just flattering ones.

## Example: Physical Premises Display

The same registration is displayed in the care home's reception area, on printed materials, or on information packs given to prospective families. A family member visiting the home can photograph the display and clip the text from the photo.

<div style="max-width: 380px; margin: 24px auto; background: #fff; border: 2px solid #005eb8; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 14px;">
    <div style="width: 36px; height: 36px; background: #005eb8; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.5em; color: #fff; margin-right: 10px;">CQC</div>
    <div style="font-size: 0.7em; color: #666; text-transform: uppercase; letter-spacing: 1px;">Registered Care Home</div>
  </div>
  <span verifiable-text="start" data-for="cqc-premises"></span>
  <div style="color: #000; font-size: 0.95em; line-height: 1.8; font-weight: 500;">
    Riverside Care Home
  </div>
  <div style="color: #333; font-size: 0.9em; line-height: 1.6;">
    CQC Registration: 1-441882199<br>
    Rating: Requires Improvement<br>
    Last Inspected: Sep 2025
  </div>
  <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="cqc-premises">verify:cqc.org.uk/providers/v</span>
  </div>
  <span verifiable-text="end" data-for="cqc-premises"></span>
</div>

The text from the premises display:

```
Riverside Care Home
CQC Registration: 1-441882199
Rating: Requires Improvement
Last Inspected: Sep 2025
verify:cqc.org.uk/providers/v
```

The primary verification path is clip from the website when the family is researching care homes. The premises display is a secondary path — available when visiting the home in person.

## Example: Unregistered Care Home Fabricates a Claim

If an unregistered care home copies the website claim onto their own site at `sunnymeadows-care.co.uk`, the hash still verifies — the text is identical. But the browser extension detects the mismatch:

1. The claim text contains `(riversidecare.co.uk)` — the extension extracts the domain
2. The verification response includes `"allowedDomains": ["riversidecare.co.uk", "*.riversidecare.co.uk"]`
3. The current page is `sunnymeadows-care.co.uk`, which matches neither

The extension shows an amber warning:

> "This registration verified, but it names riversidecare.co.uk and you are on sunnymeadows-care.co.uk."

## Example: Outdated Rating Displayed

A care home was rated "Good" in 2023 but was reinspected in September 2025 and downgraded to "Requires Improvement." The care home continues displaying the old "Good" rating on its website and marketing materials. The old claim still hashes correctly, but the verification endpoint returns the current status:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           SUPERSEDED
Reason:           Rating changed following reinspection (Sep 2025)
Current rating:   Requires Improvement
Result:           The displayed rating is no longer current

verify:cqc.org.uk/providers/v
</pre>
</div>

## Example: Suspended or Cancelled Registration

Following safeguarding concerns, the CQC may suspend or cancel a care home's registration entirely. The home may continue to display its old registration claim. Verification returns:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           CANCELLED
Reason:           Registration cancelled — safeguarding enforcement
Result:           This provider is not currently registered to operate

verify:cqc.org.uk/providers/v
</pre>
</div>

A family relying on the care home's own marketing materials would see the registration claim and assume it was current. Verification catches this before a vulnerable person is placed there.

## Data Verified

Facility name, registration or licence number, current registration status, current inspection rating or accreditation level, date of last inspection, registered services (e.g., accommodation for persons who require nursing or personal care), and the registered site domain. The specific fields vary by jurisdiction — for example, CQC registration number in England, CMS certification number in the US, or HIQA registration number in Ireland.

**Privacy Salt:** Generally not required. CQC registrations and inspection ratings are public information that care homes are legally required to display.

## Data Visible After Verification

Shows the issuer domain (`cqc.org.uk`) and the care home's current registration status and rating.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["riversidecare.co.uk", "*.riversidecare.co.uk"]
}
```

**Status Indications:**
- **Registered** — Current registration is active. Rating reflects the most recent inspection.
- **Superseded** — The claim verified but the rating has changed since the claim was issued.
- **Suspended** — Registration suspended pending investigation or enforcement action.
- **Cancelled** — Registration cancelled. The provider is not legally permitted to operate.
- **Conditions applied** — Registration is active but the CQC has imposed conditions restricting the provider's operations.
- **404** — No such registration exists at the CQC.

## Second-Party Use

The **care home** benefits by proving its status to prospective families.

**On the care home's website:** A family researching care options encounters the care home's site. The site claims CQC registration with a specific rating. The family clips the claim. Verification confirms the registration is current and the rating matches. The family proceeds knowing the claim is not self-asserted.

**In printed materials:** The care home provides a brochure or information pack during a visit. The family photographs the registration claim and clips the text. This confirms that the printed rating is current — not a leftover from a previous, more favourable inspection.

**Competitive differentiation:** A care home with a genuine "Good" or "Outstanding" rating can prove it verifiably, distinguishing itself from homes that merely claim a good rating in their marketing.

## Third-Party Use

**Families and Representatives**

**Choosing care for a relative:** Adult children choosing residential care for an elderly parent need to confirm that the home is registered and that the claimed rating is current. They encounter the rating on the care home's own website or marketing, not on the CQC's search tool. Verification confirms the claim without requiring them to know the CQC's URL or navigate to it.

**Local Authority Adult Social Care Teams**

**Placement decisions:** Local authorities commission and fund care home placements for adults who meet eligibility criteria. Social workers selecting a placement can verify the home's current registration and rating from the home's own materials, supplementing their own records.

**NHS Discharge Teams**

**Hospital discharge:** NHS teams arranging discharge to a care home need to confirm the home is registered and not subject to enforcement action. Verified registration on the home's site provides a quick check during discharge planning.

**CQC Enforcement**

**Evidence gathering:** When investigating unregistered providers or providers displaying outdated ratings, the CQC can use the verification trail to establish what claims were displayed on the provider's site and when. A home displaying a verified "Good" rating that has been superseded by "Requires Improvement" creates a clear evidence trail.

**Solicitors and Court of Protection**

**Deputyship and welfare decisions:** Solicitors acting as deputies for adults who lack capacity to make their own decisions need to confirm the regulatory status of care providers. Verified registration claims provide a documented check that the provider was registered at the time of placement.

## Verification Architecture

**The Unregistered and Misrated Care Home Problem**

In every jurisdiction, the regulator's register is public and searchable, but families typically encounter a care home's rating on the home's own website or marketing materials, not on the regulator's site. The following patterns use CQC as the example, but apply universally:

- **Unregistered care homes** operating without CQC registration. This is a criminal offence but it happens, particularly with smaller providers offering domiciliary care or supported living that blurs the boundary with regulated activity.
- **Outdated ratings** — a care home was rated "Good" two years ago but has since been reinspected and downgraded. The website still shows the old rating because nobody updated the page, or because the home deliberately chose not to update it.
- **Suspended or cancelled registration** — following safeguarding concerns, the CQC suspends or cancels registration. The home's website and reception display continue showing the old registration as if nothing has changed.
- **Fabricated registration numbers** — an unregistered provider displays a plausible-looking CQC registration number and rating on their website. A family unfamiliar with the CQC's search tool has no easy way to check.

The verifiable claim addresses these because:

1. The CQC issues the claim — it is not self-asserted by the care home
2. The claim names the specific website where it applies
3. Rating changes and registration cancellations are reflected immediately — the endpoint returns the current status
4. The browser extension detects domain mismatches when claims are copied to other sites
5. Families can verify at the moment they are making their decision, on the care home's own site

## Competition vs. Current Practice

| Feature | Live Verify | CQC Website Lookup | Care Home's Own Marketing | Phone Call to CQC |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** CQC issues the claim. | **Yes.** But requires the family to navigate there. | **No.** Self-asserted by the care home. | **Yes.** But slow and inconvenient. |
| **Verifiable at point of encounter** | **Yes.** On the care home's own website. | **No.** Requires leaving the site. | **No.** No verification mechanism. | **No.** Requires a separate call. |
| **Shows current rating** | **Yes.** Live response from CQC. | **Yes.** If the family knows to check. | **Not necessarily.** May show an outdated rating. | **Yes.** But requires a phone call. |
| **Detects suspended registration** | **Yes.** Endpoint returns SUSPENDED or CANCELLED. | **Yes.** If checked. | **No.** Marketing continues unchanged. | **Yes.** |
| **Detects outdated rating** | **Yes.** Response flags SUPERSEDED. | **Yes.** If the family compares. | **No.** | **Yes.** If the family asks. |
| **Detects copied claims** | **Yes.** Domain mismatch warning. | **No.** | **No.** | **No.** |

## Authority Chain

**Pattern:** Regulated

Each jurisdiction's regulator forms its own authority chain. The CQC example for England:

The CQC is an independent regulator established by the Health and Social Care Act 2008, accountable to Parliament through the Department of Health and Social Care.

```
✓ cqc.org.uk/providers/v — Care home registration and rating
  ✓ gov.uk/government/organisations/care-quality-commission — DHSC oversight
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

<details>
<summary>Other UK and international authority chains</summary>

- **Scotland:** Care Inspectorate (careinspectorate.com) — regulates care homes under the Public Services Reform (Scotland) Act 2010
- **Wales:** Care Inspectorate Wales (CIW) — regulates under the Regulation and Inspection of Social Care (Wales) Act 2016
- **Northern Ireland:** Regulation and Quality Improvement Authority (RQIA) — regulates under the Health and Personal Social Services (Quality, Improvement and Regulation) (Northern Ireland) Order 2003
- **Ireland:** Health Information and Quality Authority (HIQA) — regulates residential care under the Health Act 2007
- **USA:** State-level licensing varies; Centers for Medicare & Medicaid Services (CMS) maintains federal certification and star ratings for nursing homes via medicare.gov
- **Australia:** Aged Care Quality and Safety Commission — regulates under the Aged Care Quality and Safety Commission Act 2018
- **Canada:** Provincial health authorities (e.g., Ontario Ministry of Long-Term Care, BC Community Care and Assisted Living Act)

</details>

## Further Derivations

None currently identified.
