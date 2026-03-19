---
title: "Job Offers & Acceptance Letters"
category: "Professional & Educational Qualifications"
volume: "Large"
retention: "Employment term + dispute window"
slug: "job-offers-acceptance"
verificationMode: "clip"
tags: ["job-offer", "acceptance", "employment", "compensation", "start-date", "immigration", "mortgage", "cross-org", "hr"]
furtherDerivations: 0
---

## What is a Verifiable Job Offer?

"We offer you the role of Senior Engineer at $180,000, start date June 1." This claim travels by email to the candidate, who forwards it to their immigration lawyer, mortgage broker, spouse, and current employer (for a counteroffer). It's an unsigned PDF or email. Anyone in that chain could edit it. The candidate could claim "they promised $190k." The employer could claim "the start date was July not June."

A verifiable job offer is a short summary of the material terms with a `verify:` line. The employer's domain attests the exact text. The candidate's acceptance is a separate verifiable claim attested by their own domain.

<div style="max-width: 580px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
OFFER OF EMPLOYMENT<br>
Acme Corporation<br>
To: Sarah Chen<br>
Role: Senior Software Engineer<br>
Compensation: $180,000 base + benefits per schedule<br>
Start date: 1 June 2026<br>
Location: San Jose, CA (hybrid)<br>
Detailed in: Email of 18 March 2026 / 2:15 pm<br>
Offer valid until: 1 April 2026<br>
<span data-verify-line="offer" style="color: #667;">verify:hr.acme-corp.com/offers</span>
</div>

### Acceptance

<div style="max-width: 580px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f0f9f0; padding: 15px; border: 1px solid #999; font-size: 0.9em; color: #000; line-height: 1.7;" verifiable-text-element="true">
ACCEPTED<br>
Senior Software Engineer, Acme Corporation<br>
Compensation: $180,000 base<br>
Start date: 1 June 2026<br>
Sarah Chen<br>
22 March 2026<br>
<span data-verify-line="offer-accept" style="color: #667;">verify:mail.sarahchen.dev/employment</span>
</div>

The employer attests the offer. The candidate attests the acceptance. Both are independently verifiable by third parties who receive the forwarded documents.

## "Detailed in" and Non-Divergence

The offer summary references an elaborating document (the full offer letter with benefits schedule, equity vesting, non-compete terms, etc.) via a `Detailed in:` line. The elaboration adds specifics, but the attested summary governs on compensation, role, start date, and location.

Where the attested summary and the elaboration diverge, the recipient may choose which interpretation applies. This protects the candidate: if the full letter says "start date subject to background check completion" but the attested summary says "Start date: 1 June 2026," the candidate can hold the employer to June 1st.

## Data Verified

Employer name, candidate name, role/title, base compensation, start date, location, offer validity period, elaboration reference.

**What the summary does NOT carry:** full benefits schedule, equity details, non-compete clauses, arbitration terms. Those live in the elaborating document. The summary covers the terms the candidate negotiated and the third parties (immigration lawyer, mortgage broker) need to see.

## Verification Response

- **`{"status":"verified"}`** — The employer currently stands behind this offer at these terms
- **SUPERSEDED** — Offer was revised (different comp, start date, or role)
- **RESCINDED** — Offer withdrawn by the employer
- **EXPIRED** — Offer validity period has passed
- **404** — Offer not found (forged or wrong domain)

## Second-Party Use

The **candidate** benefits from verification:

**Immigration filing:** The immigration lawyer needs proof of a job offer at a specific salary for an H-1B or work visa petition. A verified offer from `hr.acme-corp.com` is stronger than a forwarded PDF. (See also: [H-1B Visa Fraud Documents](view.html?doc=h1b-visa-fraud-documents).)

**Mortgage application:** The lender needs proof of future income. A verified offer with compensation and start date, attested by the employer's domain, removes the "is this letter real?" question.

**Counteroffer negotiation:** The candidate shows their current employer a verified offer. The current employer knows it's genuine — no need to call Acme's HR to confirm.

## Third-Party Use

**Immigration Authorities**
Verifying that the sponsoring employer actually issued the offer at the claimed salary and role. Reduces petition fraud where applicants fabricate or inflate offer letters.

**Mortgage Lenders**
Confirming future employment and income for pre-approval. The verified offer supplements (but does not replace) traditional employment verification.

**Background Check Firms**
Cross-referencing the candidate's claimed offer against the employer's attested record.

## Verification Architecture

**The "Inflated Offer" Problem**

- **Salary inflation:** Candidate edits the PDF to show a higher salary for a mortgage or visa application
- **Role inflation:** "Senior Engineer" becomes "VP of Engineering" in the forwarded version
- **Fabricated offers:** Creating an offer letter from a company that never made one
- **Stale offers:** Presenting a rescinded or expired offer as current

**Issuer Types** (First Party)

- Corporations (HR departments)
- HRIS platforms (Workday, SAP SuccessFactors, BambooHR) on behalf of employers
- Recruitment agencies issuing offers on behalf of clients

## Authority Chain

**Pattern:** Commercial

```
✓ hr.acme-corp.com/offers — Issues employment offers for Acme Corporation
```

No regulatory chain. Trust rests on the employer's domain.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Relationship to Employment References

[Employment References](view.html?doc=employment-references) verify *past* employment. Job offers verify a *future* commitment. The two are complementary: the reference says "she worked here and was good," the offer says "we want her to work here at this salary." Both travel outside their source systems and both benefit from issuer attestation.

## Jurisdictional Witnessing (Optional)

Not typically needed. The employer's endpoint is the source of truth. Witnessing might add value for executive-level offers where the terms have material financial significance and disputes are likelier.
