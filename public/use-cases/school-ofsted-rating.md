---
title: "School Inspection Rating"
category: "Identity & Authority Verification"
volume: "Large"
retention: "Inspection cycle (typically 4-5 years)"
slug: "school-ofsted-rating"
verificationMode: "clip"
tags: ["ofsted", "school", "education", "inspection-rating", "parental-due-diligence", "academy", "free-school", "maintained-school", "estyn", "education-scotland", "eti", "greatschools", "myschool", "acara"]
furtherDerivations: 2
---

## What is a School Inspection Rating?

Most countries have a government body that inspects schools and publishes performance ratings. Parents rely on these ratings when choosing schools, but schools self-assert the rating on their own websites, prospectuses, and premises signage. A parent who wants to confirm a claimed rating must navigate to the inspector's own website and search — a step most parents skip.

In England, this body is Ofsted. It inspects state-funded schools — maintained schools, academies, free schools, and some independent schools — and publishes a rating: Outstanding, Good, Requires Improvement, or Inadequate. The pattern described here uses Ofsted as the primary example, but the same verification architecture applies to every jurisdiction listed below.

| Jurisdiction | Inspection / Rating Body | Notes |
| :--- | :--- | :--- |
| **England** | Ofsted | Ratings: Outstanding, Good, Requires Improvement, Inadequate |
| **Wales** | Estyn | Narrative judgements rather than single-word grades |
| **Scotland** | Education Scotland | Quality indicators rated 1-6 |
| **Northern Ireland** | Education and Training Inspectorate (ETI) | Six-point performance scale |
| **United States** | State education agencies (e.g. TEA, FLDOE) | Varies by state — A-F grades, star ratings, or descriptive levels under ESSA |
| **Australia** | ACARA (MySchool) | NAPLAN and ICSEA data rather than an inspection rating, but schools cite it the same way |
| **Germany** | Varies by Bundesland | School inspection (Schulinspektion) is state-level; no single federal body |

This is the same pattern as [childcare Ofsted registration](childcare-ofsted-registration), applied to schools.

## Example: School Website

Ofsted supplies the school with an HTML snippet to embed on their website. The styling is controlled by the school; only the text content matters for hashing.

<div style="max-width: 480px; margin: 24px auto; background: #fff; border: 2px solid #1a237e; border-radius: 8px; padding: 24px; box-shadow: 0 4px 12px rgba(26,35,126,0.15); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 16px;">
    <div style="width: 40px; height: 40px; background: #1a237e; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.55em; color: #fff; margin-right: 12px;">Ofsted</div>
    <div style="font-size: 0.75em; color: #000; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">School Inspection Rating</div>
  </div>
  <span verifiable-text="start" data-for="ofsted-school-web"></span>
  <div style="color: #333; font-size: 0.95em; line-height: 1.7;">
    <span style="color: #000; font-weight: 600;">Northbridge Academy</span> <span style="color: #999;">(northbridgeacademy.org.uk)</span><br>
    is rated Good by Ofsted<br>
    <span style="color: #666;">(inspected Mar 2025)</span> on
  </div>
  <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #ddd; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="ofsted-school-web">verify:ofsted.gov.uk/schools/v</span>
  </div>
  <span verifiable-text="end" data-for="ofsted-school-web"></span>
</div>

The text that clip mode sees and hashes:

```
Northbridge Academy (northbridgeacademy.org.uk)
is rated Good by Ofsted
(inspected Mar 2025) on
verify:ofsted.gov.uk/schools/v
```

## Example: Physical Premises Display

Schools typically display their Ofsted rating on a notice in the reception area. A parent can photograph it and clip the text from the photo.

<div style="max-width: 380px; margin: 24px auto; background: #fff; border: 2px solid #000; border-radius: 8px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: 'Segoe UI', Arial, sans-serif;">
  <div style="display: flex; align-items: center; margin-bottom: 14px;">
    <div style="width: 36px; height: 36px; background: #1a237e; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.5em; color: #fff; margin-right: 10px;">Ofsted</div>
    <div style="font-size: 0.7em; color: #666; text-transform: uppercase; letter-spacing: 1px;">Inspection Rating</div>
  </div>
  <span verifiable-text="start" data-for="ofsted-school-premises"></span>
  <div style="color: #000; font-size: 0.95em; line-height: 1.8; font-weight: 500;">
    Northbridge Academy
  </div>
  <div style="color: #333; font-size: 0.9em; line-height: 1.6;">
    Ofsted Rating: Good<br>
    URN: 114882<br>
    Last Inspected: Mar 2025
  </div>
  <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #ccc; font-family: 'Courier New', monospace; font-size: 0.78em; color: #000;">
    <span data-verify-line="ofsted-school-premises">verify:ofsted.gov.uk/schools/v</span>
  </div>
  <span verifiable-text="end" data-for="ofsted-school-premises"></span>
</div>

The text from the premises display:

```
Northbridge Academy
Ofsted Rating: Good
URN: 114882
Last Inspected: Mar 2025
verify:ofsted.gov.uk/schools/v
```

## The Problem: Outdated or Misrepresented Ratings

Parents choosing a school see its inspection rating on the school's own website, prospectus or reception wall, where the school itself asserts it. Confirming it means going to the inspectorate's website and searching, a step most parents skip, so an out-of-date or misleading rating can shape an admissions decision.

The fraud patterns for schools mirror those described in [childcare Ofsted registration](childcare-ofsted-registration), with school-specific variants:

- **Downgrade concealment:** A school rated "Good" is re-inspected and downgraded to "Requires Improvement" but does not update its website or reception signage. This is common during admissions season when parents are actively choosing schools.
- **Academies under special measures:** An academy placed in special measures or issued a termination warning notice continues displaying its previous rating. The trust's central website may also retain outdated ratings across multiple schools.
- **Free schools claiming Ofsted status before first inspection:** Newly opened free schools have no Ofsted rating until their first inspection (typically within two years of opening). Some imply a rating or display language that suggests inspection has occurred.

The verification endpoint returns the current status. A claim that was valid when issued returns SUPERSEDED if the rating has changed since.

## What Is Checked

School name, URN, school type (maintained, academy, free school), current Ofsted rating, date of last inspection, registered website domain, and current status.

**Privacy Salt:** Not required. School Ofsted ratings are public information. Schools are expected to display their rating.

## What the Checker Sees

Shows the issuer domain (`ofsted.gov.uk`) and the school's current rating and inspection status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["northbridgeacademy.org.uk", "*.northbridgeacademy.org.uk"]
}
```

**Status Indications:**
- **Verified** — Current rating matches the claim.
- **Superseded** — The school has been re-inspected and the rating has changed.
- **Special Measures** — The school is in special measures. The displayed rating is no longer current.
- **Closed** — The school has closed.
- **404** — No such school exists at Ofsted.

## Who Holds It

The school uses the verifiable claim to prove its rating to parents.

**On the school website:** The school embeds the Ofsted-issued claim on its homepage or admissions page. Parents researching schools clip the claim and receive confirmation that the rating is current.

**At the premises:** The school displays the verifiable notice in reception. Parents visiting for tours or open evenings can photograph and verify the claim.

**In admissions materials:** The school includes the verifiable claim text in prospectuses or communications sent to parents during the admissions process.

## Who Checks It

**Parents**

**Choosing schools:** A parent comparing schools clips the Ofsted claim from each school's website. Verification confirms the rating is current and belongs to that school's site.

**Local Authority Admissions Teams**

**Admissions booklets:** Local authorities publish school directories for parents. Including verified Ofsted claims in these materials means the rating information is issuer-confirmed at time of publication, not manually transcribed from the Ofsted website.

**Multi-Academy Trusts**

**Trust-level oversight:** A multi-academy trust managing multiple schools can embed verified claims on its central website. Parents browsing the trust's portfolio of schools see issuer-confirmed ratings rather than trust-asserted ones.

## How Verification Works Here

The architecture is identical to [childcare Ofsted registration](childcare-ofsted-registration). Ofsted issues the claim, the school embeds it, and the verification endpoint reflects the current status. The `allowedDomains` field prevents a school from copying another school's claim to its own site.

The domain mismatch detection works the same way: if a school copies a claim from another school's site, the browser extension detects that the embedded domain does not match the current page and shows an amber warning.

## Where Each Fits: Live Verify and Inspectorate Websites

Each inspectorate publishes its own ratings: Ofsted in England, Estyn in Wales, Education Scotland, the ETI in Northern Ireland, state education agencies in the US, and so on; some countries have no single body at all. A parent can look a school up on the inspectorate's site, and that remains the authoritative record. A verifiable claim on the school's own website answers a narrower question at the point where parents actually read the rating, whether the inspectorate stands behind this rating for this school, and works alongside the inspectorate's search. <!-- TODO(verify): England replaced single-word Ofsted judgements with report cards from 2025; confirm how this page's rating examples should read now -->

| | Inspectorate website search | Live Verify on the school's rating claim | School's own website | Council admissions booklet |
| :--- | :--- | :--- | :--- | :--- |
| **Who can check** | Any parent who leaves the school's site and searches the inspectorate's. | Any parent reading the claim on the school's website or a printed display. | Nobody; the school asserts it. | Nobody; it is a transcription. |
| **What the checker gets** | The inspectorate's current published rating and full report. | Confirmation that the inspectorate stands behind this rating, for this school's domain, as at the moment of the check; a superseded rating shows as superseded, and a copied claim shows a domain mismatch. | The school's statement, which may be out of date. | The rating as it was when the booklet was printed. |
| **What the school shares** | Nothing; the record is public. | Only the claim it chose to display. | Whatever it chooses. | Whatever the council transcribed. |
| **Reach** | One inspectorate's schools; the parent must know which body applies. | Global in principle: any inspectorate or education agency, in any country, that publishes hashes on its own domain. | Anywhere, but self-asserted. | One council area. |
| **Speed and cost** | Free; a few minutes to search. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. | Free. |
| **What it needs** | A parent who thinks to look. | The inspectorate to publish hashes, and Live Verify-aware software on the parent's device. No inspectorate does this yet. | Nothing. | Nothing. |
| **Best suited to** | Reading the full report and comparing schools. | Confirming the rating shown at the point of decision is current and genuine. | Introducing the school. | Overview of local options. |

**Where each fits:** the inspectorate's own website remains the place to read the full report, and a parent comparing schools should still go there. The weak point is the rating the school displays on its own site, prospectus or reception wall, which may be out of date. A verifiable claim lets a parent check that rating where they see it, in seconds, wherever they have software that honours Live Verify.

<details>
<summary>Jurisdiction-Specific Verification Endpoints</summary>

Each inspection body would host its own verification endpoint:

- **England (Ofsted):** `verify:ofsted.gov.uk/schools/v`
- **Wales (Estyn):** `verify:estyn.gov.wales/schools/v`
- **Scotland (Education Scotland):** `verify:education.gov.scot/schools/v`
- **Northern Ireland (ETI):** `verify:etini.gov.uk/schools/v`
- **Texas (TEA):** `verify:tea.texas.gov/schools/v`
- **Florida (FLDOE):** `verify:fldoe.org/schools/v`
- **Australia (ACARA):** `verify:acara.edu.au/schools/v`

The verification architecture is identical across jurisdictions — only the issuing domain changes.

</details>

## Authority Chain

**Pattern:** Regulated

Ofsted is a non-ministerial government department reporting directly to Parliament. It has sole authority to inspect schools in England.

```
✓ ofsted.gov.uk/schools/v — School inspection rating
  ✓ gov.uk — UK government oversight
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

None currently identified.
