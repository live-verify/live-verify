---
title: "Childcare Provider Registration"
category: "Identity & Authority Verification"
volume: "Medium"
retention: "Registration period + inspection cycle"
slug: "childcare-ofsted-registration"
verificationMode: "clip"
tags: ["ofsted", "childcare", "nursery", "childminder", "early-years", "registration", "safeguarding", "child-safety", "inspection-rating", "parental-due-diligence", "acecqa", "state-licensing"]
furtherDerivations: 2
---

## What is a Childcare Provider Registration?

Every jurisdiction regulates who may care for children commercially. A government body or delegated authority maintains a register of approved providers — childminders, nurseries, pre-schools, after-school clubs — and inspects them periodically. Providers display their registration status and any rating on websites, printed materials, and premises certificates. Parents encounter these claims when choosing childcare, but the claims are self-asserted. Confirming them requires navigating to the regulator's own search tool, finding the provider, and checking the details manually.

A verifiable registration claim is text issued by the regulator, embedded on the provider's website or displayed at their premises. The parent verifies it in place — by clipping the text on the website, or by clipping text from a photo of the displayed certificate — without navigating to the regulator's search tool.

**Concrete consequences:** Parents are entrusting pre-school children — the most vulnerable age group — to a provider's care for hours each day. An unregistered childminder operates outside the safeguarding framework entirely: no DBS checks on staff, no ratio requirements, no accident reporting, no regulatory oversight. Providers whose registration has been suspended mid-year (typically for safeguarding concerns) may continue operating because parents don't check the register. The consequences are not abstract — children have been seriously harmed in settings where registration had lapsed or been fabricated.

### Jurisdictional Regulators

| Jurisdiction | Regulator(s) | Rating System | Verification Domain |
| :--- | :--- | :--- | :--- |
| **UK — England** | Ofsted | Outstanding / Good / Requires Improvement / Inadequate | `ofsted.gov.uk/childcare/v` |
| **UK — Wales** | Care Inspectorate Wales (CIW) | Inspection reports (no summary rating) | `careinspectorate.wales/v` |
| **UK — Scotland** | Care Inspectorate | Grades 1-6 across quality themes | `careinspectorate.com/v` |
| **UK — N. Ireland** | RQIA | Inspection reports | `rqia.org.uk/v` |
| **US** | State licensing agencies (vary by state) | QRIS star ratings in some states; inspection reports in others | e.g. `childcare.texas.gov/v`, `cdss.ca.gov/childcare/v` |
| **Australia** | ACECQA / state regulatory authorities | Exceeding / Meeting / Working Towards / Significant Improvement Required | `acecqa.gov.au/services/v` |
| **Canada** | Provincial licensing bodies | Varies by province | e.g. `ontario.ca/childcare/v` |

The examples below use Ofsted (England) as the primary illustration. The pattern is identical for other regulators — only the issuing authority, rating vocabulary, and verification domain change.

## Example: Website Registration Claim (UK — Ofsted)

Ofsted supplies the childcare provider with an HTML snippet to embed on their website. The styling is controlled by the provider to match their site design; only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #2e7d32; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(46,125,50,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #1a237e; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 12px;">Ofsted</div>
    <div style="font-size: 0.75em; color: #000; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Registered Provider</div>
  </div>
  <span verifiable-text="start" data-for="ofsted-web"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Little Stars Nursery</span> <span style="color: #999;">(littlestarsnursery.co.uk)</span><br>
    is registered with Ofsted<br>
    <span style="color: #666;">Rating: Good (inspected Nov 2025)</span> on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="ofsted-web">verify:ofsted.gov.uk/childcare/v</span>
  </div>
  <span verifiable-text="end" data-for="ofsted-web"></span>
</div>

The text that clip mode sees and hashes:

```
Little Stars Nursery (littlestarsnursery.co.uk)
is registered with Ofsted
Rating: Good (inspected Nov 2025) on
verify:ofsted.gov.uk/childcare/v
```

Ofsted controls the claim text. The provider embeds it. The hash is unaffected by styling changes the provider makes to match their site design.

## Example: Physical Premises Display (UK — Ofsted)

The same registration is displayed on a certificate or printed notice at the provider's premises — typically near the entrance where parents sign children in and out. A parent can photograph it and clip the text from the photo.

<div style="max-width: 380px; margin: 24px auto; background: #fff; border: 2px solid #000; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 14px;">
    <div style="width: 36px; height: 36px; background: #1a237e; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.5em; color: #fff; margin-right: 10px;">Ofsted</div>
    <div style="font-size: 0.7em; color: #666; text-transform: uppercase; letter-spacing: 1px;">Registration Certificate</div>
  </div>
  <span verifiable-text="start" data-for="ofsted-premises"></span>
  <div style="color: #000; font-size: 0.95em; line-height: 1.8; font-weight: 500;">
    Little Stars Nursery
  </div>
  <div style="color: #333; font-size: 0.9em; line-height: 1.6;">
    Ofsted Registration: EY441882<br>
    Rating: Good<br>
    Last Inspected: Nov 2025
  </div>
  <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="ofsted-premises">verify:ofsted.gov.uk/childcare/v</span>
  </div>
  <span verifiable-text="end" data-for="ofsted-premises"></span>
</div>

The text from the premises display:

```
Little Stars Nursery
Ofsted Registration: EY441882
Rating: Good
Last Inspected: Nov 2025
verify:ofsted.gov.uk/childcare/v
```

The primary verification path is clip from the website when the parent is researching nurseries. The premises display is a secondary path — available during a visit or settling-in session.

## Example: Unregistered Provider Copies the Claim

If an unregistered childminder copies the website claim onto their own site at `sunshine-childcare.co.uk`, the hash still verifies — the text is identical. But the browser extension detects the mismatch:

1. The claim text contains `(littlestarsnursery.co.uk)` — the extension extracts the domain
2. The verification response includes `"allowedDomains": ["littlestarsnursery.co.uk", "*.littlestarsnursery.co.uk"]`
3. The current page is `sunshine-childcare.co.uk`, which matches neither

The extension shows an amber warning:

> "This registration verified, but it names littlestarsnursery.co.uk and you are on sunshine-childcare.co.uk."

## Example: Expired or Downgraded Registration

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           SUPERSEDED
Reason:           Rating changed after re-inspection
Current Rating:   Requires Improvement (inspected Sep 2026)
Result:           This claim does not reflect the current rating

verify:ofsted.gov.uk/childcare/v
</pre>
</div>

A provider whose rating has changed may continue displaying an outdated claim on their website or premises. The verification endpoint returns the current status — not the status when the claim was first issued. This covers two fraud patterns:

- **Downgrade concealment:** A nursery rated "Good" is re-inspected and rated "Requires Improvement" but does not update its website.
- **De-registration:** A childminder's registration is suspended or cancelled (for safeguarding concerns, for example) but the claim remains on display.

## The Problem: Unregistered and Misrepresented Provider

Parents rely heavily on claimed Ofsted ratings when choosing childcare. The consequences of misrepresentation are direct:

- **Unregistered childminders** — It is a criminal offence to provide childcare for reward without registration, but enforcement is reactive. Unregistered providers advertise on social media, local Facebook groups, and word-of-mouth networks with no Ofsted oversight.
- **Outdated ratings** — A nursery rated "Good" three years ago may have been re-inspected and downgraded to "Requires Improvement" or "Inadequate." The website may not reflect the change for months.
- **Fabricated ratings** — A provider claims "Outstanding" on their website when their actual rating is "Good" or worse. Parents would need to check the Ofsted site to catch this.
- **Suspended providers** — Ofsted can suspend a provider's registration with immediate effect (typically for safeguarding concerns). The provider's website and signage do not update automatically.
- **Transferred registrations** — A nursery changes ownership. The new owner inherits the premises but not necessarily the registration. The old Ofsted rating may remain on the website under the new operator.

The verifiable claim addresses these because:

1. Ofsted issues the claim — it is not self-asserted by the provider
2. The claim names the specific website where it applies
3. Rating changes and suspensions are reflected immediately at the verification endpoint
4. The browser extension detects domain mismatches when claims are copied to other sites
5. The registration number ties the claim to a specific provider, not a premises

## What Is Checked

Provider name, regulator-assigned registration number (e.g. Ofsted URN), registration type (childminder, childcare on domestic/non-domestic premises), current rating (where the regulator issues one), date of last inspection, registered website domain, and current registration status.

**Document Types:**
- **Ofsted Early Years Registration** — Provider registered on the Early Years Register to care for children from birth to age 5. Mandatory for all paid childcare of this age group operating for more than two hours a day.
- **Ofsted Childcare Register (Compulsory)** — Provider caring for children aged 5-7 outside school hours. Required by law.
- **Ofsted Childcare Register (Voluntary)** — Provider caring for children aged 8+ or registered voluntarily to demonstrate quality standards.

**Privacy Salt:** Generally not required. Ofsted registrations are public information. The provider actively wants to display their rating. Ofsted may salt if internal inspection metadata is included in the verified response.

## What the Checker Sees

Shows the issuer domain (`ofsted.gov.uk`) and the provider's current registration status and rating.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["littlestarsnursery.co.uk", "*.littlestarsnursery.co.uk"]
}
```

**Status Indications:**
- **Registered** — Current registration is active with the stated rating.
- **Superseded** — Registration is active but the rating has changed since the claim was issued.
- **Suspended** — Registration suspended pending investigation. Provider should not be operating.
- **Cancelled** — Registration cancelled by Ofsted. Provider is not legally permitted to operate.
- **Expired** — Registration lapsed and was not renewed.
- **404** — No such registration exists at Ofsted.

## Who Holds It

The childcare provider uses the verifiable claim to prove their status to parents.

**On their website:** The nursery embeds the Ofsted-issued claim on their homepage or admissions page. Parents researching nurseries clip the claim and receive confirmation that the registration and rating are current. The provider does not need to direct parents to the Ofsted website or ask them to search by URN.

**At their premises:** The nursery displays the verifiable certificate near the entrance. Parents visiting for the first time — or prospective parents on a tour — can photograph and verify the claim on the spot.

**In communications:** When responding to enquiries from parents, the provider can include the verifiable claim text in emails or messages. The parent verifies without needing to cross-reference the Ofsted website.

## Who Checks It

**Parents**

**Choosing childcare:** A parent comparing nurseries clips the Ofsted claim from each provider's website. Verification confirms the rating is current and the claim belongs to that provider's site. This is the primary use case — parents making one of the most consequential decisions about their child's welfare.

**Local Authority Childcare Teams**

**Sufficiency duty:** Local authorities are required to ensure sufficient childcare in their area. When compiling directories of providers, verified Ofsted claims confirm registration status without manual cross-referencing against the Ofsted register.

**Employers Offering Childcare Vouchers or Tax-Free Childcare**

**Provider validation:** Employers or childcare voucher schemes need to confirm that a provider is Ofsted-registered before directing payments. A verified claim from the provider's website serves as confirmation without the employer needing to search the Ofsted register independently.

**Childminder Agencies**

**Network membership:** Childminder agencies that recruit and support childminders need to confirm individual registration status. Verified claims provide an auditable check at the point of onboarding.

## Where Each Fits: Live Verify and the Inspectorate's Register

Childcare providers are registered and inspected by a national body that varies by country: Ofsted in England, the Care Inspectorate in Scotland, Care Inspectorate Wales, and state licensing agencies in the US, with many countries having their own. Most publish a searchable register and inspection reports, which are the authority. Live Verify works side by side with that register, letting the registration claim a provider shows on its own website be checked against the inspectorate's domain.

| | Inspectorate's website search | Printed certificate at the premises | Word of mouth | Live Verify on the registration claim |
| :--- | :--- | :--- | :--- | :--- |
| **Who can check** | Any parent who searches by name or reference number. | Any parent visiting the premises. | Nobody. | Any parent reading the provider's website, with Live Verify on their device. |
| **What the checker gets** | The full record: registration, current rating, inspection reports. | The rating and registration at the time of printing. | Other parents' impressions. | Confirmation that the inspectorate stands behind this exact claim, and whether it is current, superseded or suspended. |
| **What the provider shares** | Nothing; the register is public. | Its displayed certificate. | Nothing. | A short claim issued by the inspectorate, shown on its website. |
| **Reach** | That inspectorate's own area. | That premises. | Local. | Global in principle: any inspectorate or licensing body, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Free; a few minutes, after leaving the provider's site. | Free and immediate, but may be out of date. | Free. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | A parent who knows to search. | Nothing. | Nothing. | The inspectorate to publish hashes for registration claims, and Live Verify-aware software on the parent's device. No inspectorate does this yet. |
| **Best suited to** | Reading inspection reports and comparing providers. | Confirming a provider is registered at all. | Learning what a setting is like day to day. | A quick check of the claim where the parent first meets it. |

**Where each fits:** the Ofsted search tool works for parents who use it, and remains the place to read inspection reports. Many parents do not use it: they see "Ofsted rated Good" on a nursery website and take it at face value. A claim that can be checked against the inspectorate's domain on the provider's own site turns that self-asserted rating into a checkable one, and shows straight away when the rating has changed or the registration has been suspended.

## Authority Chain

**Pattern:** Regulated

Each jurisdiction's childcare regulator operates its own verification endpoint. The authority chain for the UK (Ofsted) example:

```
✓ ofsted.gov.uk/childcare/v — Childcare provider registration and rating
  ✓ gov.uk — UK government oversight
    ✓ gov.uk/verifiers — UK government root namespace
```

Other regulators follow the same pattern under their own government root namespace (e.g. `acecqa.gov.au` under `gov.au`, state licensing agencies under their respective `.gov` domains).

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently identified.
