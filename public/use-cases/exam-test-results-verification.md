---
title: "Exam and Test Results Verification"
category: "Professional & Educational Qualifications"
volume: "Very Large"
retention: "Variable (score validity period — 2 years for TOEFL, permanent for bar admission)"
slug: "exam-test-results-verification"
verificationMode: "clip"
tags: ["exam-results", "test-scores", "SAT", "ACT", "GRE", "GMAT", "A-levels", "GCSE", "bar-exam", "USMLE", "CPA", "SQE", "professional-certification", "score-verification", "fraud-prevention"]
furtherDerivations: 2
---

## What is Exam Results Verification?

An **exam result** is a point-in-time score report issued by an examining body after a specific sitting. SAT scores from the College Board, A-level results from an exam board, bar exam outcomes from a law society, USMLE scores from the NBME, CPA exam results from NASBA, or certification pass/fail from Cisco, AWS, or PMI.

These results currently arrive as paper certificates, PDF score reports, or screenshots from candidate portals. All are forgeable. A PDF editor can change a SAT score from 1200 to 1480 in seconds. AI tools can generate convincing fake certificates for professional exams. The examining body has the authoritative record, but the artifact in circulation — the one the candidate hands to a university admissions office, an employer, or an immigration authority — is typically unverifiable.

This is distinct from:

- **[Course Transcripts](view.html?slug=course-transcripts)** — ongoing academic records and grades from a university over multiple terms
- **[University Degrees](view.html?slug=university-degrees)** — the final degree award from an institution
- **[Language Proficiency Certificates](view.html?slug=language-proficiency-certificates)** — IELTS/TOEFL score reports (there is overlap; language proficiency tests are a subset of the broader exam results category, with their own dedicated page covering that specific testing ecosystem)

This page covers the **score report from the examining body after a specific sitting** — the artifact that proves the candidate achieved a particular result on a particular date.

## Example: Standardised Test Result

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
  <span verifiable-text="start" data-for="exam-sat"></span>
  EXAM RESULT<br>
  Examining Body: &nbsp;College Board<br>
  Exam: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SAT<br>
  Candidate Ref: &nbsp;&nbsp;CB-2026-882199<br>
  Test Date: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;15 Mar 2026<br>
  Score: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1480 (Math 760, EBRW 720)<br>
  Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VERIFIED RESULT<br><br>
  <span data-verify-line="exam-sat">verify:collegeboard.org/scores/v</span>
  <span verifiable-text="end" data-for="exam-sat"></span>
</div>

## Example: Professional Exam Result

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
  <span verifiable-text="start" data-for="exam-sqe"></span>
  EXAM RESULT<br>
  Examining Body: &nbsp;Solicitors Regulation Authority<br>
  Exam: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SQE Part 2<br>
  Candidate Ref: &nbsp;&nbsp;SRA-2026-441882<br>
  Sitting: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;January 2026<br>
  Result: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PASS<br>
  Status: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VERIFIED RESULT<br><br>
  <span data-verify-line="exam-sqe">verify:sra.org.uk/sqe-results/v</span>
  <span verifiable-text="end" data-for="exam-sqe"></span>
</div>

**Privacy note:** The candidate's name is not in the verifiable text — only a reference number. The recipient matches the reference to the person through separate identity verification. This follows the same privacy pattern used for right-to-work checks and DBS status: the verifiable claim proves the examining body issued a result for this reference, not that a specific named individual achieved it. The candidate presents the reference alongside their identity documents.

## Fraud Patterns

**Score inflation.** The most common pattern. A candidate edits a PDF score report to change a number — 1200 becomes 1480, a band 6.0 becomes 7.5, a "Fail" becomes a "Pass." With current PDF tools and AI image generation, the altered document is visually indistinguishable from the original.

**Complete fabrication.** Generating an entire fake score report for an exam that was never sat. AI tools can now produce convincing certificates with correct formatting, logos, and reference numbers. The fabricated document looks authentic because no one checks the reference against the examining body's records.

**Expired or invalidated results.** The examining body cancels or voids a result after the fact — cheating detected during post-sitting analysis, a test centre compromise, or a candidate identity investigation. The paper certificate or PDF still exists and still looks valid. The candidate continues to use it.

**Identity substitution.** Someone else sat the exam. Verification does not solve this — it is a test-centre security problem. But a verified result does prove that the examining body issued a result for the claimed reference number, which narrows the fraud surface to the identity question alone.

## Data Verified

Examining body name, exam name, candidate reference number, test date or sitting period, score or pass/fail result, and current status.

**Document Types:**
- **Score Report:** Numerical results with section breakdowns (SAT, GRE, GMAT, USMLE).
- **Results Notification:** Pass/fail outcome for professional exams (bar exam, SQE, CPA).
- **Certificate of Achievement:** Formal certificate for certification exams (Cisco CCNA, AWS Solutions Architect, PMP).
- **Results Slip:** Concise grade list for school-leaving exams (A-levels, GCSEs, Gaokao).

## Verification Response

```json
{
  "status": "verified"
}
```

**Status Indications:**
- **Verified** — Result matches the examining body's official records.
- **Voided** — Result cancelled (cheating detected, test-centre irregularity, candidate investigation).
- **Expired** — Result is beyond its validity period (relevant for tests with a defined shelf life, such as TOEFL or IELTS).
- **Superseded** — Candidate has re-sat the exam; a newer result exists.
- **404** — No such result was issued by the examining body for this reference.

## Second-Party Use

The **candidate** (second party) receives the score report from the examining body (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**University applications.** Proving SAT/ACT/GRE/GMAT scores to admissions offices. Currently requires paying the examining body to send official score reports to each institution — $12 per recipient for SAT scores, $27 per recipient for GRE scores. A verified result that the candidate can share directly reduces this cost.

**Job applications.** Presenting professional exam results (bar exam pass, CPA exam completion, actuarial exam progress) to employers. The candidate currently provides a PDF or screenshot that the employer takes on trust.

**Professional licensure.** Submitting exam results to a regulatory body as part of a licensing application. The regulatory body currently contacts the examining body separately to confirm — a manual process that adds days or weeks.

**Immigration.** Proving qualifications for points-based visa systems. A verified result from the examining body's domain is stronger than a PDF attachment.

## Third-Party Use

**University Admissions Offices**

**Volume processing.** A selective university receives tens of thousands of applications, each with test scores. Currently, admissions officers cross-reference scores against the examining body's portal, request official score sends, or simply trust the self-reported figures. Verified results allow batch confirmation.

**Employers**

**Professional qualification checks.** An employer hiring a newly qualified solicitor, accountant, or engineer needs to confirm the candidate passed the relevant professional exam. The candidate provides a verified result; the employer checks it against the examining body's domain.

**Professional Regulatory Bodies**

**Licensing decisions.** A state bar, medical board, or accounting board needs to confirm exam passage before granting a licence. A verified result from the examining body's own domain provides this directly.

**Immigration Authorities**

**Points-based assessment.** Visa systems that award points for professional qualifications (UK Skilled Worker, Australian skilled migration) need to confirm exam results. A verified result removes reliance on document inspection.

**Scholarship Committees**

**Merit assessment.** Scholarship providers awarding funding based on test scores need to confirm those scores are genuine. The higher the financial value, the greater the incentive to fabricate.

## Verification Architecture

**The "Score Report" Trust Problem**

- **PDF editing:** Score reports are designed for print. The PDF is the artifact in circulation, and PDFs are trivially editable.
- **Portal screenshots:** Candidates screenshot their results from an online portal. Screenshots are even easier to alter than PDFs.
- **Certificate forgery:** Professional certification bodies (Cisco, AWS, PMI, Microsoft) issue certificates that are just formatted documents — reproducible with the right template.
- **No universal registry:** Unlike university degrees (where clearinghouses exist in some countries), there is no central registry of exam results across examining bodies. Each body maintains its own records.

**Issuer Types (First Party)**

- **Standardised test providers:** College Board (SAT), ETS (GRE, TOEFL), GMAC (GMAT), ACT Inc.
- **School examination boards:** AQA, OCR, Edexcel, Pearson (UK); state boards (India); Gaokao administrators (China).
- **Professional examination bodies:** NCBE (bar exam), NBME (USMLE), NASBA/AICPA (CPA), SRA (SQE), actuarial societies, engineering registration bodies.
- **Certification vendors:** Cisco, AWS, Microsoft, PMI, CompTIA, ISC2.

**Privacy Salt:** Required. Exam results are sensitive personal data. Reference numbers follow predictable patterns (sequential, year-prefixed). Scores fall within known ranges (SAT 400-1600, USMLE three-digit scores, pass/fail binaries). Without salt, an attacker who knows a candidate's approximate test date and reference number format could enumerate hashes to discover their score.

## Authority Chain

**Pattern:** Varies by exam type

For standardised academic tests:

```
✓ collegeboard.org/scores/v — Issues SAT score reports
```

No regulatory chain. Trust rests on the examining body's domain reputation.

For regulated professional exams:

```
✓ sra.org.uk/sqe-results/v — Issues SQE examination results
  ✓ gov.uk/verifiers — UK government root namespace
```

For school-leaving examinations:

```
✓ aqa.org.uk/results/v — Issues GCSE and A-level results
  ✓ ofqual.gov.uk — Regulates qualifications and exams in England
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Current Verification Methods

| Feature | Live Verify | Official Score Send | Candidate Portal / Screenshot | Paper Certificate |
| :--- | :--- | :--- | :--- | :--- |
| **User Control** | **High.** Candidate shares a verified artifact. | **Low.** Examining body sends directly. | **High.** But unverifiable. | **High.** But forgeable. |
| **Trust Anchor** | **Domain-Bound.** Bound to the examining body. | **System-Bound.** Trust the delivery channel. | **None.** Screenshot is trivially editable. | **Visual.** Trust the paper. |
| **Speed** | **Instant.** Verify against the examining body's endpoint. | **Slow.** Days to weeks for official sends. | **Instant.** But no integrity guarantee. | **Instant.** But no integrity guarantee. |
| **Cost** | **Low.** Standard web infrastructure. | **High.** $12-$30 per recipient per send. | **None.** | **None.** |
| **Handles revocation** | **Yes.** Voided results return VOIDED status. | **Snapshot.** Reflects status at time of send only. | **No.** Screenshot persists. | **No.** Paper persists. |

**Practical conclusion:** Official score sends remain primary where the examining body offers them and the recipient accepts them. Live Verify is complementary when the score report PDF or certificate is already the artifact in circulation — which is the case for most professional exams, certification results, and international score sharing where official send infrastructure does not exist or costs prohibitively per recipient.

## Exam Scope

This use case covers point-in-time exam results across a broad range of examining bodies.

<details>
<summary><strong>Standardised Academic Tests (US-centric)</strong></summary>

SAT and ACT for undergraduate admissions. GRE and GMAT for graduate admissions. These are high-volume, high-stakes tests where score inflation fraud is well-documented. The College Board and ETS already operate score-send systems, but candidates still circulate PDF score reports — particularly for employers, scholarship applications, and international use where official sends are not accepted.

</details>

<details>
<summary><strong>School-Leaving Examinations (UK, International)</strong></summary>

A-levels and GCSEs in England, Wales, and Northern Ireland (issued by AQA, OCR, Edexcel/Pearson, WJEC). Scottish Highers (SQA). International Baccalaureate (IBO). India's CBSE and state board examinations. China's Gaokao. These results determine university entry and are high-value targets for fabrication, particularly when used internationally where the receiving institution cannot easily verify against the issuing board.

</details>

<details>
<summary><strong>Legal Profession</strong></summary>

Bar examinations (US state bars via NCBE), Solicitors Qualifying Examination (SQE Parts 1 and 2, issued by SRA in England and Wales), Bar Professional Training Course assessments (BSB). Results determine eligibility for legal practice. A candidate claiming to have passed the bar when they have not — or claiming a higher score on the Multistate Bar Examination — is a serious fraud that verification addresses directly.

</details>

<details>
<summary><strong>Medical Profession</strong></summary>

USMLE Steps 1, 2, and 3 (US, issued by NBME/FSMB). PLAB (UK, issued by GMC). Medical licensing examinations in other jurisdictions. These are career-gating exams with pass/fail outcomes and, in some cases, numerical scores that affect residency matching competitiveness.

</details>

<details>
<summary><strong>Accounting and Finance</strong></summary>

CPA Exam (US, administered by NASBA/AICPA). ACCA examinations (global). ACA examinations (ICAEW, UK). CFA examinations (CFA Institute). Actuarial examinations (IFoA, SOA). These are multi-part exam sequences where candidates may need to prove passage of individual papers over several years.

</details>

<details>
<summary><strong>Technology Certifications</strong></summary>

Cisco (CCNA, CCNP, CCIE). AWS (Solutions Architect, Developer, SysOps). Microsoft (Azure, 365). CompTIA (A+, Security+, Network+). ISC2 (CISSP). PMI (PMP, CAPM). These certifications have defined validity periods and are frequently claimed on CVs without verification. The certification vendor issues a digital badge or PDF certificate; Live Verify adds domain-bound proof that the examining body actually issued the result.

</details>

<details>
<summary><strong>Engineering</strong></summary>

Professional Engineer (PE) examinations (US, administered by NCEES). Chartered Engineer examinations and professional reviews (UK, via Engineering Council member institutions). These are licensure-gating exams required before an engineer can sign off on designs or practise independently.

</details>

## Further Derivations

None yet.
