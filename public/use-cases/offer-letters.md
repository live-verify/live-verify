---
title: "Employment Offer Letters"
category: "Professional & Educational Qualifications"
volume: "Large"
retention: "Duration of employment + 2 years"
slug: "offer-letters"
verificationMode: "clip"
tags: ["offer-letter", "employment-offer", "job-offer", "hiring", "compensation", "visa", "mortgage", "relocation"]
furtherDerivations: 2
---

## What is an Offer Letter?

You've just accepted a job offer from Google in London. You need to apply for a UK Skilled Worker visa. The Home Office wants proof of the offer — the role, the salary, the start date. You have a PDF. The Home Office has no way to verify it's real. They can't call Google HR at scale for every visa applicant. The PDF could be fabricated — and visa fraud using fake offer letters is a well-documented problem.

An offer letter sits in a unique temporal gap: you're not yet employed (so proof-of-employment doesn't work), but you need to prove future employment to third parties right now. It's the bridge document between "I've been hired" and "I work here."

With Live Verify, the offer letter carries a `verify:` line bound to the employer's HR domain. The consulate, the mortgage lender, the relocation company scans it and gets real-time confirmation: this offer is genuine, it's been accepted, and it hasn't been withdrawn.

<div style="max-width: 620px; margin: 24px auto; font-family: 'Georgia', 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
    <div>
      <div style="font-family: 'Product Sans', 'Helvetica Neue', sans-serif; font-size: 1.6em; font-weight: bold;">
        <span verifiable-text="start" data-for="offerletter">[</span><span style="color: #4285F4;">G</span><span style="color: #EA4335;">o</span><span style="color: #FBBC05;">o</span><span style="color: #4285F4;">g</span><span style="color: #34A853;">l</span><span style="color: #EA4335;">e</span>
      </div>
      <div style="font-family: sans-serif; font-size: 0.75em; color: #666; letter-spacing: 0.5px;">Google UK Ltd</div>
    </div>
    <div style="font-family: sans-serif; font-size: 0.85em; color: #555; text-align: right;">
      Belgrave House<br>
      76 Buckingham Palace Road<br>
      London SW1W 9TQ
    </div>
  </div>

  <div style="font-size: 0.9em; color: #555; margin-bottom: 25px;">February 28, 2026</div>

  <div style="font-size: 0.95em; line-height: 1.8; color: #333; margin-bottom: 20px;">
    <p style="margin: 0 0 15px 0;">Dear <strong>Priya Ramaswamy</strong>,</p>
    <p style="margin: 0 0 15px 0;">We are pleased to offer you the position of <strong>Senior Software Engineer, L6</strong> in the <strong>Cloud AI</strong> department at Google UK Ltd. We believe your skills and experience will be a valuable addition to our team.</p>
  </div>

  <div style="font-family: sans-serif; font-size: 0.9em; line-height: 1.9; color: #333; margin-bottom: 25px; padding: 15px; background: #f8f9fa; border-radius: 4px;">
    <p style="margin: 0;"><strong>Position:</strong> Senior Software Engineer, L6</p>
    <p style="margin: 0;"><strong>Department:</strong> Cloud AI</p>
    <p style="margin: 0;"><strong>Start Date:</strong> April 14, 2026</p>
    <p style="margin: 0;"><strong>Annual Base Salary:</strong> &pound;145,000</p>
    <p style="margin: 0;"><strong>Employment Type:</strong> Full-Time, Permanent</p>
    <p style="margin: 0;"><strong>Work Location:</strong> London, United Kingdom (King's Cross)</p>
    <p style="margin: 0;"><strong>Reporting To:</strong> Dr. Sarah Chen, Director of Engineering</p>
  </div>

  <div style="font-size: 0.9em; line-height: 1.7; color: #333; margin-bottom: 25px;">
    <p style="margin: 0 0 10px 0;">This offer is contingent upon satisfactory completion of background checks and your legal right to work in the United Kingdom. This offer supersedes any prior verbal or written discussions regarding compensation.</p>
    <p style="margin: 0;">Please confirm your acceptance by March 14, 2026.</p>
  </div>

  <div style="margin-bottom: 25px;">
    <div style="font-size: 0.9em; color: #333;">Sincerely,</div>
    <div style="font-style: italic; color: #555; margin: 8px 0; font-size: 1.1em;">Katherine Howell</div>
    <div style="font-family: sans-serif; font-size: 0.8em; color: #666;">Katherine Howell<br>VP, People Operations<br>Google UK Ltd</div>
  </div>

  <div data-verify-line="offerletter" style="margin-top: 20px; padding-top: 10px; border-top: 1px dashed #999; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
    title="Demo only: Google doesn't yet offer verification&#10;endpoints, so this is illustrative">
    verify:hr.google.com/offers/v <span verifiable-text="end" data-for="offerletter">]</span>
  </div>
</div>

## Data Verified

Candidate name, position title, employer name, start date, salary/compensation (base), employment type (full-time/part-time/contract), work location.

**What is deliberately NOT included:** Equity grants, bonus targets, benefits details, signing bonuses, non-compete terms. Those are in separate documents (equity grant agreements, benefits enrollment forms) and carry their own verification if needed. The offer letter verifies the core employment commitment — role, pay, start date — nothing more.

## Verification Response

The endpoint returns the current status of the offer:

- **ACTIVE** — Offer is current and has been accepted
- **PENDING** — Offer has been extended but not yet accepted
- **WITHDRAWN** — Employer withdrew the offer
- **DECLINED** — Candidate declined
- **SUPERSEDED** — A revised offer was issued (e.g., different salary, different start date)
- **STARTED** — Candidate has commenced employment (offer fulfilled — see [Proof of Employment](view.html?doc=proof-of-employment))
- **EXPIRED** — Offer had an acceptance deadline that passed without acceptance
- **404** — No matching record (forged document, wrong details, or OCR error)

## Second-Party Use

The **candidate** is the primary beneficiary.

**Visa applications (the primary driver).** Skilled Worker visas, H-1B transfers, intra-company transfers — all require proof that a real employer is offering a real job at a real salary. Currently, consulates receive PDFs they cannot verify. With Live Verify, the consulate scans the offer letter and confirms it against the employer's HR domain in seconds.

**Mortgage pre-approval.** Lenders will lend against a signed offer letter. A borrower relocating from Berlin to London needs mortgage pre-approval before their first paycheck. The lender scans the offer letter, confirms it's ACTIVE, and proceeds with underwriting based on the verified salary.

**Rental applications.** Moving to a new city for a job you haven't started yet. The landlord sees a salary figure on a piece of paper — unverifiable. With Live Verify, the landlord confirms the offer is real and the start date is imminent.

**Relocation company engagement.** Relocation firms arrange international moves — shipping, temporary housing, school enrollment for dependents. They need to verify the offer is genuine before committing resources.

**Resignation from current employer.** Proving the new offer is real before burning bridges. In some industries (banking, law), employees must disclose and evidence their next role before departing.

## Third-Party Use

**Immigration Authorities and Consulates**

Visa applications — the biggest use case by volume. Every Skilled Worker visa, every H-1B, every intra-company transfer requires an offer letter. Consulates currently have no way to verify these at scale. Fake offer letters from real companies are a documented fraud vector. The authority chain (employer domain → HMRC/IRS) confirms both that the offer is genuine and that the employer is a real, registered entity.

**Mortgage Lenders**

Pre-approval based on future income. A signed offer letter with ACTIVE status and a verified salary gives the lender confidence to underwrite. SUPERSEDED or WITHDRAWN status prevents lending against offers that no longer exist.

**Landlords**

Especially for cross-city and cross-country moves where the tenant hasn't started the job yet. The landlord can't call references at the new employer (the tenant hasn't worked there yet). The verified offer letter is the only reliable signal.

**Relocation Companies**

Need to verify the offer before arranging international moves worth tens of thousands of pounds. A WITHDRAWN offer after the shipping container has left port is expensive for everyone.

**Background Check Companies**

Verifying offer details during pre-employment screening. Some employers run background checks after extending an offer — the background check firm can verify the offer details match what the candidate reported.

**Banks**

New account opening in a new city or country. KYC requirements include proof of income or employment. A verified offer letter satisfies this before the first paycheck arrives.

## Verification Architecture — The Offer Letter Fraud Problem

**Fabricated offers for visa fraud** — the #1 problem. Fraudsters produce convincing offer letters from real companies (Google, Deloitte, HSBC) to support visa applications. The consulate has no practical way to check. Live Verify eliminates this entirely: a fabricated letter won't hash-match against the employer's endpoint.

**Salary inflation for mortgage qualification** — A real offer letter is altered to show a higher salary, qualifying the borrower for a larger mortgage. The hash breaks if any character changes.

**Fake offers to justify relocation expenses or visa sponsorship** — Fraudulent offers used to extract relocation packages, corporate housing, or immigration sponsorship from third parties. Verification catches these instantly.

**"Rescinded but still presented"** — The employer withdrew the offer, but the candidate continues to show the PDF to lenders, landlords, and consulates. The endpoint returns WITHDRAWN, and the fraud stops.

**Fake company offers** — An offer from a company that doesn't exist or didn't make the offer. The authority chain (employer → HMRC/IRS) exposes this: a fake company's domain won't have a secondary verification from a tax authority.

**Offer mills** — Services that produce fake offer letters, similar to diploma mills. Entire businesses exist to fabricate employment offers for visa applicants. The authority chain breaks this model: an offer mill's domain cannot produce a valid HMRC/IRS registration.

## Privacy Salt

High sensitivity. Salary information is private. The hash MUST be salted to prevent enumeration attacks. Without a salt, an attacker who knows the employer's endpoint and a candidate's name could brute-force the salary by hashing different amounts until one matches. The salt ensures that only someone holding the original document can produce the correct hash.

## Authority Chain

The authority chain for offer letters follows the same pattern as [Proof of Employment](view.html?doc=proof-of-employment):

**Employer domain → tax authority (HMRC/IRS) → statute.**

The employer is attesting to a *future* employment relationship — a commitment to hire. The secondary verification confirms the employer is a legitimate, registered entity authorized to employ people. The chain terminates at the statutory root (the tax authority's enabling legislation).

```
HTTP/1.1 200 OK
X-Verify-Status: ACTIVE
X-Verify-Authority-For: employment-offer-attestation
X-Verify-Authority-Attested-By: https://employers.hmrc.gov.uk/v/{hash}
X-Verify-Authority-Scope: paye-registered-employer
```

See [Verification Response Format: Authority Chains](../../docs/Verification-Response-Format.md#authority-chain-verification) for the full specification.

## Competition

| Feature | Live Verify | Calling the Employer | Background Check Services (Equifax/The Work Number) | Trusting the PDF |
| :--- | :--- | :--- | :--- | :--- |
| **Verifiable** | **Yes.** Domain-bound to employer's HR system. | **Slow.** HR won't confirm details for privacy reasons. May take days. | **No.** Don't cover offers — only post-start employment. | **No.** Unverifiable. |
| **Real-time status** | **Yes.** ACTIVE, WITHDRAWN, SUPERSEDED — instantly. | **Maybe.** If you reach the right person. | **N/A.** No offer data. | **No.** A withdrawn offer still looks valid on paper. |
| **Works at scale** | **Yes.** Automated hash lookup. | **No.** One phone call per applicant. Consulates process thousands. | **No.** No offer coverage. | **N/A.** |
| **Authority chain** | **Yes.** Employer → HMRC/IRS. | **No.** You're trusting whoever answers the phone. | **Partial.** Equifax is trusted, but doesn't cover offers. | **No.** |
| **Cost** | **Free at point of use.** | **Staff time.** | **Expensive.** Per-query fees. | **Free.** But worthless. |
| **Detects withdrawal** | **Yes.** Instant status update. | **Maybe.** If HR is responsive. | **No.** | **No.** |

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the offer
- **Timestamp proof:** Offer existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party" — infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Internship and placement offer letters** — Lower stakes individually but the same verification need. Student visa applications (Tier 4/Student Route in the UK, J-1 in the US) require proof of a placement or internship offer. Universities and immigration authorities need to verify these offers are genuine. Same protocol, same authority chain — the employer is still PAYE/EIN-registered.
2. **Contractor/consulting engagement letters** — SOW-based, no employment relationship, but the same verification need for visas and lending. A contractor relocating to a new country on a consulting engagement needs to prove the engagement is real. The engagement letter carries a verify line bound to the client's procurement domain. The authority chain follows: client domain → tax authority → statute.
