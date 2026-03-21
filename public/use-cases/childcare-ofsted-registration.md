---
title: "Childminder/Nursery Ofsted Registration"
category: "Identity & Authority Verification"
volume: "Medium"
retention: "Registration period + inspection cycle"
slug: "childcare-ofsted-registration"
verificationMode: "clip"
tags: ["ofsted", "childcare", "nursery", "childminder", "early-years", "registration", "safeguarding", "child-safety", "inspection-rating", "parental-due-diligence"]
furtherDerivations: 2
---

## What is a Childminder/Nursery Ofsted Registration?

Ofsted (the Office for Standards in Education, Children's Services and Skills) maintains a register of all childcare providers in England who are legally permitted to care for children. Childminders, nurseries, pre-schools, and out-of-school clubs must register with Ofsted and are inspected periodically. Each provider receives a rating: Outstanding, Good, Requires Improvement, or Inadequate.

The provider displays their Ofsted registration and rating on their own website, on printed materials, and on a certificate displayed at their premises. Parents encounter this claim when choosing childcare — typically on the nursery's website or during a visit to the setting. The claim is self-asserted by the provider. A parent who wants to confirm it must navigate to Ofsted's own search tool, find the provider, and check the details manually.

A verifiable registration claim is text issued by Ofsted, embedded on the provider's website or displayed at the premises. The parent verifies it in place — by clipping the text on the website, or by clipping text from a photo of the displayed certificate — without navigating to the Ofsted search tool.

## Example: Website Registration Claim

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

## Example: Physical Premises Display

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

## Data Verified

Provider name, Ofsted registration number (URN), registration type (childminder, childcare on domestic/non-domestic premises), current rating, date of last inspection, registered website domain, and current registration status.

**Document Types:**
- **Ofsted Early Years Registration** — Provider registered on the Early Years Register to care for children from birth to age 5. Mandatory for all paid childcare of this age group operating for more than two hours a day.
- **Ofsted Childcare Register (Compulsory)** — Provider caring for children aged 5-7 outside school hours. Required by law.
- **Ofsted Childcare Register (Voluntary)** — Provider caring for children aged 8+ or registered voluntarily to demonstrate quality standards.

**Privacy Salt:** Generally not required. Ofsted registrations are public information. The provider actively wants to display their rating. Ofsted may salt if internal inspection metadata is included in the verified response.

## Data Visible After Verification

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

## Second-Party Use

The **childcare provider** uses the verifiable claim to prove their status to parents.

**On their website:** The nursery embeds the Ofsted-issued claim on their homepage or admissions page. Parents researching nurseries clip the claim and receive confirmation that the registration and rating are current. The provider does not need to direct parents to the Ofsted website or ask them to search by URN.

**At their premises:** The nursery displays the verifiable certificate near the entrance. Parents visiting for the first time — or prospective parents on a tour — can photograph and verify the claim on the spot.

**In communications:** When responding to enquiries from parents, the provider can include the verifiable claim text in emails or messages. The parent verifies without needing to cross-reference the Ofsted website.

## Third-Party Use

**Parents**

**Choosing childcare:** A parent comparing nurseries clips the Ofsted claim from each provider's website. Verification confirms the rating is current and the claim belongs to that provider's site. This is the primary use case — parents making one of the most consequential decisions about their child's welfare.

**Local Authority Childcare Teams**

**Sufficiency duty:** Local authorities are required to ensure sufficient childcare in their area. When compiling directories of providers, verified Ofsted claims confirm registration status without manual cross-referencing against the Ofsted register.

**Employers Offering Childcare Vouchers or Tax-Free Childcare**

**Provider validation:** Employers or childcare voucher schemes need to confirm that a provider is Ofsted-registered before directing payments. A verified claim from the provider's website serves as confirmation without the employer needing to search the Ofsted register independently.

**Childminder Agencies**

**Network membership:** Childminder agencies that recruit and support childminders need to confirm individual registration status. Verified claims provide an auditable check at the point of onboarding.

## Verification Architecture

**The Unregistered and Misrepresented Provider Problem**

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

## Competition vs. Current Practice

| Feature | Live Verify | Ofsted Website Search | Printed Ofsted Certificate | Word of Mouth |
| :--- | :--- | :--- | :--- | :--- |
| **Issuer-controlled** | **Yes.** Ofsted issues the claim. | **Yes.** But requires the parent to navigate there. | **Yes.** But static at time of printing. | **No.** |
| **Verifiable at point of decision** | **Yes.** On the provider's own website. | **No.** Requires leaving the site and searching by name or URN. | **Partially.** Visible at premises but not verifiable as current. | **No.** |
| **Shows current rating** | **Yes.** Live response from Ofsted. | **Yes.** If the parent knows to check. | **No.** Shows rating at time of printing. | **No.** |
| **Detects rating changes** | **Yes.** Endpoint returns current rating. | **Yes.** If checked after re-inspection. | **No.** Certificate may show outdated rating. | **No.** |
| **Detects suspended registration** | **Yes.** Endpoint returns SUSPENDED. | **Yes.** If checked. | **No.** Certificate still displayed. | **Possibly.** If news spreads. |
| **Detects copied claims** | **Yes.** Domain mismatch warning. | **No.** | **No.** | **No.** |

**Practical conclusion:** The Ofsted search tool works for parents who use it. The problem is that many parents do not — they see "Ofsted rated Good" on a nursery website and take it at face value. A verifiable claim embedded on the provider's own site turns a self-asserted rating into a checkable one at the moment the parent is deciding where to entrust their child.

<details>
<summary>Other Jurisdictions</summary>

**United States — State Childcare Licensing**

Each US state operates its own childcare licensing authority. Providers must be licensed by the state to operate legally. Ratings and inspection systems vary by state — some use Quality Rating and Improvement Systems (QRIS) with star ratings, others publish inspection reports without summary ratings. The same pattern applies: the licensing authority issues a verifiable claim that the provider embeds on their website. The verification endpoint is operated by the state licensing body (e.g., `childcare.texas.gov/v`, `cdss.ca.gov/childcare/v`).

**Australia — ACECQA National Quality Framework**

The Australian Children's Education and Care Quality Authority (ACECQA) oversees the National Quality Framework. Providers are assessed against the National Quality Standard and receive a rating: Exceeding, Meeting, Working Towards, or Significant Improvement Required. State and territory regulatory authorities conduct assessments. The claim pattern is the same: `verify:acecqa.gov.au/services/v` with the rating and assessment date in the claim text.

**Other UK Nations**

Ofsted covers England only. Equivalent bodies exist for the other UK nations:
- **Wales** — Care Inspectorate Wales (CIW): `verify:careinspectorate.wales/v`
- **Scotland** — Care Inspectorate: `verify:careinspectorate.com/v`
- **Northern Ireland** — Health and Social Care Trusts, overseen by the Regulation and Quality Improvement Authority (RQIA): `verify:rqia.org.uk/v`

</details>

## Authority Chain

**Pattern:** Regulated

Ofsted is a non-ministerial government department reporting directly to Parliament. It has sole authority to register and inspect childcare providers in England.

```
✓ ofsted.gov.uk/childcare/v — Childcare provider registration and rating
  ✓ gov.uk — UK government oversight
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently identified.
