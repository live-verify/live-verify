---
title: "Student Loan Enrollment Attestations"
category: "Government & Civic Documents"
volume: "Large"
retention: "Duration of loan + 7 years"
slug: "student-loan-enrollment-attestations"
verificationMode: "clip"
tags: ["student-loans", "enrollment-fraud", "degree-mills", "named-accountability", "witnessing", "regulatory", "ofs", "fsa", "vet-fee-help", "for-profit-college"]
furtherDerivations: 1
---

## The Problem

Government-funded student loans create a structural incentive for fraud: colleges are paid per enrolled student, not per graduating student. A college that enrolls students who never attend — or who attend briefly and disappear — collects the same tuition as one that educates them.

The fraud pattern is consistent across countries:

- **UK:** Various private colleges have enrolled students primarily to access Student Loans Company funding, with minimal educational delivery
- **US:** For-profit college scandals (Corinthian Colleges, ITT Tech, DeVry) involved billions in federal student loan fraud
- **Australia:** The VET FEE-HELP scandal (2015-2017) saw $2.8 billion in fraudulent vocational loans written off by the government. Colleges signed up thousands of students who never attended and collected government funding.

In every case, the college attested that students were genuinely enrolled. Those attestations turned out to be false. But the attestations were institutional — "the college enrolled this student" — with no named individual on the hook for the specific claim.

## Enrollment Attestation with Named Individual Accountability

At the point of enrollment, a named individual at the college issues a verifiable claim that the enrollment is genuine:

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #1a5276; background: #fff; padding: 0;">
  <div style="background: #1a5276; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="enrollattest"></span>STUDENT ENROLLMENT ATTESTATION</div>
    <div style="font-size: 0.8em;">Funded Enrollment Confirmation</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Institution:</strong> Northbridge College of Business<br>
    <strong>Student Ref:</strong> NCB-2026-441882<br>
    <strong>Programme:</strong> HND Business Management<br>
    <strong>Mode:</strong> Full-time<br>
    <strong>Start Date:</strong> 15 Sep 2026<br>
    <strong>Expected End:</strong> 30 Jun 2028<br>
    <strong>Loan Eligible:</strong> YES (OfS registered)</p>
    <p style="font-size: 0.85em; color: #666;"><strong>Attested By:</strong> Dr M. Rahman, Academic Registrar</p>
    <div data-verify-line="enrollattest" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;">
      <span data-verify-line="enrollattest">verify:northbridgecollege.ac.uk/enrollment/v</span> <span verifiable-text="end" data-for="enrollattest"></span>
    </div>
  </div>
</div>

The "Attested By" line names the individual who is personally attesting that this enrollment is genuine. Not "the institution" — a named person with a professional role. This is a backward-looking factual claim: "this person did enroll today, on this programme, in this mode." If the enrollment turns out to be fabricated — a ghost student who never existed, or a real person who was enrolled without their knowledge — Dr Rahman personally attested it.

This follows the [Corporate Signing Authority](view.html?doc=contract-signing-authority) pattern: the institution declares who can make enrollment attestations, and each attestation names the individual who made it.

## Witnessing by the Funding Body

The funding body (Student Loans Company in the UK, Federal Student Aid in the US, Department of Education in Australia) witnesses the enrollment attestation at the point of issuance, following the regulatory witnessing model in [Witnessing and Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md).

The funding body now has a verifiable, timestamped record that:
- This college attested this student enrolled on this programme on this date
- This specific named individual made the attestation
- The attestation was published to the college's domain and witnessed at this timestamp

If the college later claims "we never enrolled that student" or disputes the terms, the witnessed attestation is on record.

## What This Does NOT Cover

This use case covers enrollment attestation only — the factual claim that a student enrolled on a specific date, on a specific programme, at a specific institution.

It does not cover ongoing attendance monitoring, participation tracking, or engagement measurement. Those are operationally important but the verification model for them is weaker:
- Attendance attestation is a forward prediction, not a backward fact
- Named individuals cannot be held criminally liable for predictions that turn out wrong
- Source systems (VLE, swipe cards) are controlled by the college and can be gamed
- The loan company has no financial incentive to scrutinise attendance because the government bears the default risk

Ongoing attendance monitoring may be better handled by separate systems — attendance databases, VLE analytics, completion-rate reporting — that the funding body accesses directly, rather than through the attestation model.

## The Absence Signal for Enrollment

The absence signal still works at the enrollment level. If a college claims 500 funded students but only 300 enrollment attestations are witnessed by the funding body, the 200-student gap is visible immediately. Funding for unattestedstudents does not flow.

This is simpler and more defensible than attendance-based absence signals: either the enrollment attestation exists or it doesn't. No judgment calls about attendance thresholds or engagement metrics.

## What Is Checked

Institution name, student reference, programme title, mode of study (full-time/part-time), start date, expected end date, loan eligibility status, and the name and role of the attesting individual.

**Privacy Salt:** Required. Student references combined with institution identifiers could be enumerated.

## What the Checker Sees

Shows the institution's domain and the enrollment status.

**Status Indications:**
- **Enrolled** — Student is currently enrolled on the stated programme
- **Withdrawn** — Student has formally withdrawn; the college notified the funding body
- **Suspended** — Enrollment paused (e.g., intermission, medical leave)
- **Completed** — Programme finished
- **Revoked** — Enrollment attestation withdrawn by the institution (e.g., discovered to be fraudulent)
- **404** — No such enrollment attestation exists

## Who Holds It

The student benefits from a verifiable enrollment record:

**Visa compliance:** International students must prove genuine enrollment for visa purposes. A verified attestation from the college, checkable against the college's domain, is stronger than a letter.

**Benefits eligibility:** Students claiming means-tested benefits or council tax exemptions need proof of enrollment.

**Employer education benefits:** Some employers fund employee education and require proof of enrollment before reimbursing fees.

## Who Checks It

**Funding Bodies (SLC, FSA, Dept of Education)**

The primary beneficiary. Real-time visibility into which colleges are attesting enrollments, which individuals are making the attestations, and where gaps exist.

**Regulators (OfS, Department of Education)**

Pattern detection: a college where a single registrar attests 2,000 enrollments at an institution with no physical campus warrants investigation.

**Immigration Authorities**

Student visa compliance: is this person genuinely enrolled at the institution they claimed on their visa application?

**Auditors**

The witnessed attestation trail is an auditable record of enrollment claims, traceable to named individuals.

## Authority Chain

**Pattern:** Government / Regulated

```
✓ northbridgecollege.ac.uk/enrollment/v — Enrollment attestation
  ✓ officeforstudents.org.uk — Registers and regulates English HE providers
    ✓ gov.uk/verifiers — UK government root namespace
```

The funding body witnesses the attestation but does not issue it. The college issues; the funding body witnesses and monitors.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

<details>
<summary>US equivalent</summary>

```
✓ northbridgecollege.edu/enrollment/v — Enrollment attestation
  ✓ studentaid.gov — Federal Student Aid (Title IV compliance)
```

US accreditation is handled by regional and national accrediting agencies recognised by the Department of Education. Title IV eligibility (access to federal student loans) depends on accreditation status.
</details>

<details>
<summary>Australia equivalent</summary>

```
✓ northbridgecollege.edu.au/enrollment/v — Enrollment attestation
  ✓ teqsa.gov.au — Tertiary Education Quality and Standards Agency
```

Post-VET FEE-HELP reform, provider registration requirements were tightened, but enrollment verification remains institution-level.
</details>

## Where Each Fits: Live Verify and Institutional Enrolment Reporting

Today funding bodies such as the Student Loans Company in the UK, Federal Student Aid in the US and Australia's Department of Education learn about enrolments from the institutions themselves, through periodic bulk returns and through confirmations entered in online portals. Those returns remain necessary for funding calculations and statistics. A verifiable enrolment attestation answers a narrower question, whether a named person at the college stands behind this student's enrolment as at a date, and works alongside the existing reporting.

| | Institutional bulk reporting | Portal self-service confirmation | Live Verify on the enrolment attestation |
| :--- | :--- | :--- | :--- |
| **Who can check** | The funding body and regulators. | The funding body, through its portal. | Anyone handed the attestation: the funding body, a regulator, an immigration authority, an auditor, an employer or benefits office. |
| **What the checker gets** | The institution's return, usually termly or annual, as the institution chose to submit it. | The institution's confirmation, with timing that depends on the institution. <!-- TODO(verify): which portal process this column refers to (e.g. SLC attendance confirmation) and how quickly confirmations reach the funding body --> | Confirmation that the college stands behind this exact enrolment, attested by the named individual, as at its date, and its current status (enrolled, withdrawn, suspended, revoked). |
| **What the student shares** | Nothing directly. | Nothing directly. | Only the attestation they chose to hand over, for visa, benefits or employer purposes. |
| **Reach** | One country's funding system. | One funding body's portal. | Global in principle: any college, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Slow: discrepancies surface at the next reporting cycle. | Varies. | A few seconds per check: one web lookup, with no fee to the standard. Where the funding body also records each attestation's hash at issue, gaps between claimed and attested enrolments show early. |
| **What it needs** | The institution's student records system and reporting staff. | Portal access for the institution. | The college to publish hashes, and Live Verify-aware software on the checker's device. No college or funding body does this yet. |
| **Best suited to** | Funding calculations and statistical analysis. | Routine operational confirmations. | Individually accountable enrolment claims, checked before the first loan disbursement, and portable proof for the student. |

**Where each fits:** institutional bulk reporting remains necessary for funding and statistics, and attendance is better monitored through systems the funding body accesses directly. A verifiable enrolment attestation adds an individually accountable record, made at the point of enrolment, that a funding body, regulator or immigration authority can check quickly and cheaply, wherever they have software that honours Live Verify.

## Further Derivations

1. **Programme Withdrawal Attestations** — The complement to enrollment: a named individual attests that a student has withdrawn, triggering funding cessation. Currently, late withdrawal notification is one of the ways colleges extend the funding period for students who have already left.
