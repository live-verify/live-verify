---
title: "Supplier Pre-Qualification Status"
category: "Business & Commerce"
volume: "Large"
retention: "Contract period + 6 years"
slug: "supplier-pre-qualification-status"
verificationMode: "clip"
tags: ["pre-qualification", "approved-supplier", "procurement", "constructionline", "achilles", "RISQS", "SAM-gov", "ESPD", "tender", "supply-chain", "domain-mismatch", "allowedDomains"]
furtherDerivations: 1
---

## The Problem

Before a supplier can tender for work with a large organization — a council, a utility, an infrastructure operator, an NHS trust, an oil and gas company — they must be pre-qualified. The pre-qualification process is extensive: financial standing checks, insurance verification, health and safety records, competence assessments, environmental management, modern slavery statements, and sometimes site visits.

Once the supplier passes, they are placed on an approved supplier list and may be issued a letter or certificate confirming their status.

The problem comes when the supplier needs to prove that status:

- A supplier bidding for a contract claims pre-qualification by referencing their place on the list, producing a PDF letter, or stating it verbally
- The procuring organization's procurement team has no quick way to confirm the claim is current, accurate, and at the correct value tier
- A supplier pre-qualified for contracts up to £500K may claim eligibility for a £5M contract — the letter may be genuine but the value limit is ignored or misrepresented
- Pre-qualification expires, but the letter does not visibly change — a supplier whose status lapsed six months ago may still be presenting the original letter
- Subcontractors have no independent way to verify that the main contractor they are working under is actually pre-qualified by the client

This is compounded by the number of pre-qualification schemes operating in parallel. In UK construction alone, a supplier may hold Constructionline accreditation, Achilles accreditation for utilities work, and RISQS accreditation for rail. Each scheme issues its own documentation. Each procuring organization checks against its own requirements.

## The Verifiable Claim

The pre-qualifying organization issues a verifiable claim that the supplier embeds on their own website:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a3a5c; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="preq1"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">SUPPLIER PRE-QUALIFICATION
Buyer:          Network Rail
Supplier:       Northbridge Civil Engineering Ltd
                (northbridgecivil.co.uk)
Category:       Track renewal and signalling
Value Limit:    Up to GBP 5,000,000 per contract
H&S Assessed:   YES (RISQS accredited)
Insurance:      Confirmed to required levels
Valid Until:    31 Dec 2026
<span data-verify-line="preq1">verify:networkrail.co.uk/suppliers/v</span></pre>
  <span verifiable-text="end" data-for="preq1"></span>
</div>

The supplier embeds this on their website to demonstrate pre-qualification to potential clients and partners. The claim is:

- **Issuer-controlled** — Network Rail issues the claim, not the supplier
- **Value-bounded** — the claim states the value limit explicitly; a supplier cannot inflate their tier
- **Time-limited** — expires on the stated date; re-qualification produces a fresh claim
- **Independently verifiable** — anyone can check the hash against the buyer's domain

## The Self-Inflation Problem

A supplier pre-qualified for contracts up to £500K presents their status when bidding for a £3M project. The procuring organization sees "pre-qualified by Network Rail" and assumes the supplier has been assessed at the relevant scale. The value limit — buried in a PDF letter or not checked at all — is missed.

With a verifiable claim, the value limit is part of the hashed content. The claim says "Up to GBP 5,000,000 per contract" — if the supplier alters this to a higher figure, the hash breaks. If they present a genuine claim with a lower limit, the limit is visible to anyone who reads the claim text.

This does not prevent a supplier from bidding above their pre-qualified tier. It prevents them from misrepresenting their tier.

## Domain-Mismatch Detection

The supplier embeds the claim on `northbridgecivil.co.uk`. The claim text includes the supplier's domain in parentheses. The verification response includes:

```json
{
  "status": "verified",
  "allowedDomains": ["northbridgecivil.co.uk", "*.northbridgecivil.co.uk"]
}
```

If a different company copies the claim onto their own site to borrow Northbridge's pre-qualification status, the browser extension detects the domain mismatch:

> "This pre-qualification claim verified, but it names northbridgecivil.co.uk and you are on otherfirm.co.uk."

The domain in the claim text also serves as a human-readable check — a procurement officer can see the mismatch even without the extension.

## Pre-Qualification Expired or Withdrawn

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #7a1f1f; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">Verification Result
═══════════════════════════════════════════════════════════════════

Status:           REVOKED
Reason:           Pre-qualification withdrawn — insurance lapsed
Result:           This supplier is no longer pre-qualified

verify:networkrail.co.uk/suppliers/v
</pre>
</div>

The claim snippet remains on the supplier's website, but verification now returns REVOKED. A procurement team checking before shortlisting sees the failure immediately.

## Data Verified

Buyer name, supplier name, supplier domain, work category, contract value limit, health and safety assessment status, insurance confirmation, and validity period.

**Document Types:**
- **Pre-Qualification Claim** — The primary claim: this supplier has been pre-qualified by the named buyer for work in the stated category up to the stated value limit.
- **Status Update** — Amended claim reflecting a change in category, value limit, or qualification status.

**Privacy Salt:** Generally not required. Pre-qualification status is commercial information the supplier wants to be public — it is a competitive advantage. The buyer may salt if the specific value tier or category details are commercially sensitive in a particular procurement context.

## Data Visible After Verification

Shows the issuer domain (e.g., `networkrail.co.uk`, `constructionline.co.uk`, `achilles.com`) and current qualification status.

**Verification Response Format:**

```json
{
  "status": "verified",
  "allowedDomains": ["northbridgecivil.co.uk", "*.northbridgecivil.co.uk"]
}
```

The `allowedDomains` field enables browser extensions to detect domain mismatches — where a valid claim has been copied onto another supplier's site.

**Status Indications:**
- **Current** — Pre-qualification is active and the supplier is approved at the stated tier.
- **Expired** — Validity period ended; re-qualification required.
- **Revoked** — Pre-qualification withdrawn (insurance lapse, H&S incident, financial distress, or other disqualifying event).
- **Suspended** — Qualification paused pending investigation or re-assessment.
- **Tier Changed** — Qualification is active but the value limit or category has changed; a new claim has been issued.
- **404** — No such pre-qualification claim was issued by the claimed buyer.

## Second-Party Use

The **supplier** benefits from portability and credibility.

**Bid documentation:** Instead of attaching a PDF letter to every tender submission, the supplier references a live verifiable claim. The procurement team checks it against the buyer's domain — seconds instead of phone calls or email chains to confirm the letter is genuine and current.

**Website credibility:** The supplier embeds the claim on their own site. Potential clients browsing the site can verify the claim in place, without contacting the pre-qualifying organization. This is particularly useful for smaller contractors trying to demonstrate capability to new clients.

**Value-limit transparency:** The supplier cannot be accused of misrepresenting their tier. The claim states the limit explicitly. This protects the supplier from disputes where a procuring organization later claims the supplier overstated their qualification level.

## Third-Party Use

**Procurement Teams at Other Organizations**

**Cross-recognition:** Some organizations recognise pre-qualification by others. A council may accept that a supplier pre-qualified by Network Rail has already passed a comparable assessment. The verifiable claim lets the council confirm the Network Rail qualification is current and at what level, without contacting Network Rail directly.

**Subcontractors**

**Main contractor verification:** A subcontractor considering working under a main contractor on a rail project can verify that the main contractor is actually RISQS-accredited and pre-qualified by Network Rail. Currently, subcontractors take the main contractor's word for it.

**Insurers**

**Underwriting input:** A supplier's pre-qualification status is relevant to their risk profile. An insurer writing contractor's all-risks or professional indemnity cover can verify current qualification status as part of the underwriting process.

**Auditors**

**Compliance verification:** Internal and external auditors reviewing procurement decisions can verify that suppliers on the approved list were genuinely pre-qualified at the time contracts were awarded.

## Verification Architecture

**The Reusable Attestation Pattern**

This follows the same pattern as [Qualified Investor Attestations](qualified-investor-attestations.md): a qualifying organization issues a verifiable claim that the qualified party can present repeatedly across multiple relationships.

- Network Rail pre-qualifies a supplier once (per cycle)
- The supplier presents this qualification dozens of times — in tenders, on their website, to subcontractors, to insurers
- Each party that needs to confirm the qualification checks the same hash against the same domain
- The pre-qualifying organization controls revocation — if the supplier's status changes, verification reflects it immediately

**Who issues the claim (first party):**

- **Infrastructure operators** — Network Rail, National Highways, utility companies
- **Pre-qualification scheme operators** — Constructionline, Achilles, RISQS
- **Public sector bodies** — councils, NHS trusts, government departments
- **Private sector buyers** — oil and gas operators, mining companies, large manufacturers

**Pre-qualification schemes by jurisdiction:**

<details>
<summary>United Kingdom</summary>

- **Constructionline** — Government-backed scheme for construction suppliers; tiered by contract value
- **Achilles** — Utilities and infrastructure; operates UVDB (utilities vendor database) and other sector schemes
- **RISQS** — Rail Industry Supplier Qualification Scheme; mandatory for suppliers working on the UK rail network
- **CHAS, SafeContractor, SMAS** — Health and safety pre-qualification schemes (often complementary to Constructionline)
</details>

<details>
<summary>United States</summary>

- **SAM.gov** — System for Award Management; required for federal government contractors
- **State-level MBE/WBE/DBE certifications** — Minority, Women, and Disadvantaged Business Enterprise certifications; required for state and local government set-aside contracts
- **ISNetworld** — Widely used in oil, gas, and petrochemical for contractor pre-qualification
- **Avetta (formerly PICS)** — Supply chain risk management and pre-qualification
</details>

<details>
<summary>European Union</summary>

- **European Single Procurement Document (ESPD)** — Standardised self-declaration for EU public procurement; could be issuer-verified rather than self-declared
- **National qualification registers** — Some member states maintain official contractor registers (e.g., Italy's SOA system, Portugal's InCI)
</details>

## Authority Chain

**Pattern:** Qualifying Organization / Scheme Operator

```
✓ networkrail.co.uk/suppliers/v — Pre-qualification claim for rail contractors
  ✓ orr.gov.uk — Office of Rail and Road (regulates Network Rail)
```

```
✓ constructionline.co.uk/v — Pre-qualification claim for construction suppliers
  ✓ gov.uk — UK Government (Constructionline is government-backed)
```

```
✓ sam.gov/v — Federal contractor registration
  ✓ gsa.gov — General Services Administration (operates SAM.gov)
```

The pre-qualifying organization is the trust anchor. The regulatory or oversight body provides the authority chain above it.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Current Practice

| Feature | Verifiable Claim | PDF Letter / Certificate | Phone / Email Confirmation | Scheme Portal Login |
| :--- | :--- | :--- | :--- | :--- |
| **Reusable** | **Yes.** One claim, many tenders and relationships. | **No.** Static document; may be outdated. | **No.** Per-enquiry. | **Partially.** Requires login credentials. |
| **Issuer-controlled** | **Yes.** Buyer or scheme operator controls the content and can revoke. | **No.** Once issued, the PDF exists independently. | **Yes.** But slow and manual. | **Yes.** But access is limited to registered users. |
| **Value-limit visible** | **Yes.** Hashed into the claim; cannot be altered. | **Partially.** Stated in the letter but can be misrepresented verbally. | **Yes.** If the person answering knows the details. | **Yes.** If the portal shows tier information. |
| **Tamper-evident** | **Yes.** | **No.** | **N/A.** | **N/A.** |
| **Real-time status** | **Yes.** Revocation reflected immediately. | **No.** Stale from the moment of issue. | **Yes.** But requires a phone call. | **Yes.** If checked at the right time. |
| **Accessible to subcontractors** | **Yes.** Embedded on the supplier's public website. | **Only if shared.** | **Unlikely.** Buyers may not confirm to third parties. | **No.** Portal access is usually restricted. |

**Practical conclusion:** PDF letters and scheme portal logins remain necessary for detailed assessment records. Verifiable claims address the specific problem of proving current status and value tier to multiple parties without requiring each party to contact the pre-qualifying organization.

## Further Derivations

1. **Insurance Certificate Verification for Contractors** — The same supplier that proves pre-qualification also needs to prove current insurance cover (employers' liability, public liability, professional indemnity) at the levels required by the pre-qualifying organization. A verifiable claim from the insurer, following the pattern in [Professional Indemnity Live Status](professional-indemnity-live-status.md), would complement the pre-qualification claim.
2. **Health and Safety Accreditation Status** — CHAS, SafeContractor, and similar schemes could issue verifiable claims of current accreditation, following the same reusable-attestation pattern. Currently, suppliers produce PDF certificates that may have expired.
3. **Modern Slavery Statement Verification** — Large organizations required to publish modern slavery statements under the Modern Slavery Act 2015 could issue verifiable claims confirming their supply chain due diligence status, useful for procurement teams assessing supplier compliance.
