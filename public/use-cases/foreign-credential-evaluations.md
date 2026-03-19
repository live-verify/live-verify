---
title: "Foreign Credential Evaluations"
category: "Professional & Educational Qualifications"
volume: "Large"
retention: "Permanent (credential equivalency doesn't expire)"
slug: "foreign-credential-evaluations"
verificationMode: "clip"
tags: ["credential-evaluation", "wes", "ece", "naces", "foreign-degree", "immigration", "professional-licensing", "university-admission", "equivalency"]
furtherDerivations: 2
---

## What is a Foreign Credential Evaluation?

You earned a medical degree from the University of Lagos. You want to practice medicine in Canada. The Canadian medical licensing board needs to know: is a Nigerian MBBS equivalent to a Canadian MD? You can't answer that yourself — you need an accredited evaluation agency (like WES — World Education Services, or ECE — Educational Credential Evaluators) to assess your foreign credentials and produce a formal equivalency report.

These reports are gatekeeping documents. They determine whether an immigrant can practice their profession, enroll in graduate school, or qualify for skilled worker immigration programs. The problem: evaluation reports are PDFs on the agency's letterhead. They're routinely forged — especially for immigration applications where the stakes are high and the receiving authority has no way to verify whether WES actually issued the report, or whether the applicant fabricated one showing a higher equivalency than they received.

With Live Verify, the evaluation report carries a `verify:` line bound to the evaluation agency's domain. The immigration officer, the licensing board, the university admissions office scans it and confirms: WES actually issued this evaluation, for this person, with this equivalency determination.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #ccc; background: #fff; padding: 30px 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="fce"></span>
  <div style="text-align: center; margin-bottom: 20px;">
    <div style="font-family: sans-serif; font-weight: bold; font-size: 1.3em; color: #003366;">World Education Services</div>
    <div style="font-family: sans-serif; font-size: 0.85em; color: #555;">Bowling Green Station, P.O. Box 5087, New York, NY 10274-5087</div>
    <div style="font-family: sans-serif; font-size: 0.85em; color: #555;">www.wes.org</div>
  </div>
  <hr style="border: none; border-top: 2px solid #003366; margin: 15px 0;">
  <div style="text-align: center; font-family: sans-serif; font-weight: bold; font-size: 1.1em; color: #003366; margin-bottom: 15px;">CREDENTIAL EVALUATION REPORT</div>
  <div style="font-size: 0.9em; line-height: 1.8; color: #222;">
    <div style="margin-bottom: 8px;"><strong>Report Number:</strong> WES-2026-4418773</div>
    <div style="margin-bottom: 8px;"><strong>Applicant:</strong> ADEBAYO, OLUWASEUN MICHAEL</div>
    <div style="margin-bottom: 15px;"><strong>Date of Evaluation:</strong> February 12, 2026</div>
    <div style="padding: 12px; background: #f7f7f7; border-left: 3px solid #003366; margin-bottom: 15px;">
      <strong>Country of Education:</strong> Nigeria<br>
      <strong>Institution:</strong> University of Lagos<br>
      <strong>Credential Earned:</strong> Bachelor of Medicine, Bachelor of Surgery (MBBS)<br>
      <strong>Original Language:</strong> Medicinae Baccalaureus, Baccalaureus Chirurgiae<br>
      <strong>Year Conferred:</strong> 2019
    </div>
    <div style="padding: 12px; background: #e8f0e8; border-left: 3px solid #2e7d32; margin-bottom: 15px;">
      <strong>Equivalency Determination:</strong><br>
      Equivalent to a Bachelor's degree from an accredited U.S. institution
    </div>
    <div style="font-size: 0.85em; color: #555;">
      This evaluation was prepared by WES, a charter member of NACES<br>
      (National Association of Credential Evaluation Services).
    </div>
  </div>
  <hr style="border: none; border-top: 1px dashed #999; margin: 15px 0 8px 0;">
  <div data-verify-line="fce" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;">
    <span data-verify-line="fce">verify:wes.org/eval/v</span> <span verifiable-text="end" data-for="fce"></span>
  </div>
</div>

## Data Verified

Applicant name, evaluation agency, report number, country of education, institution name, credential earned (original), equivalency determination (the critical field), date of evaluation.

NOT included: transcripts, course-by-course details (those are in detailed reports, not the summary).

## Verification Response

The endpoint returns a status code:

- **VERIFIED** — Evaluation is authentic and current
- **REVISED** — The evaluation was updated (e.g., additional credentials evaluated, equivalency changed after appeal)
- **WITHDRAWN** — Agency withdrew the evaluation (e.g., discovered the underlying credential was fraudulent)
- **IN_PROGRESS** — Application received, evaluation not yet complete
- **404** — No matching record (forged report, wrong number, or OCR error)

The issuer domain is visible from the `verify:` line on the report itself (e.g., `wes.org`).

## Second-Party Use

The **applicant** (second party) receives the evaluation from the evaluation agency (first party), **keeps it**, and presents it to third parties as needed.

**Immigration Authorities:** Presenting to Express Entry (Canada), H-1B (US), Skilled Worker visa (UK), or equivalent skilled immigration pathways. Credential evaluation is mandatory for most of these programs, and the evaluation is a primary document in the application. A forged evaluation showing a higher equivalency can mean the difference between qualifying and not qualifying.

**Professional Licensing Boards:** Presenting to medical boards, engineering boards, legal bar associations, accounting bodies. The licensing board needs to know the foreign degree is equivalent before allowing the applicant to sit qualifying exams. A Nigerian MBBS holder can't sit the USMLE without a verified equivalency determination.

**University Admissions Offices:** Presenting for graduate school applications. The admissions office needs to know whether the foreign degree qualifies the applicant for a master's or doctoral program. Unverified evaluations create risk for both the university and the student.

**Employers:** Presenting to employers who require degree equivalency for certain roles — particularly in regulated industries where specific degree equivalency is required by law.

## Third-Party Use

**Immigration Authorities**
The primary verifier. Credential evaluation is mandatory for most skilled immigration pathways — Canada's Express Entry, Australia's Skilled Migration, the UK's Skilled Worker visa, and others. Immigration officers process thousands of evaluation reports and have no practical way to confirm each one with the evaluation agency. Live Verify gives them instant confirmation: this evaluation was issued by WES, it's current, it hasn't been withdrawn.

**Professional Licensing Boards**
Medical boards, engineering boards, bar associations, accounting boards — they all need to know the foreign degree is equivalent before allowing the applicant to sit exams. A fake evaluation claiming a 3-year diploma is equivalent to a 4-year degree can put an unqualified professional into practice. The licensing board scans the evaluation and confirms: real, current, this equivalency determination.

**Universities**
Graduate admissions offices and transfer credit offices. A student applying for a master's program with a forged evaluation showing a bachelor's equivalency (when the actual determination was a diploma) gains admission they're not qualified for. Verified evaluations let admissions offices trust what they're reading.

**Employers**
Particularly in regulated industries where specific degree equivalency is required by law. An engineering firm hiring for a Professional Engineer track needs to know the foreign degree genuinely equates to a 4-year ABET-accredited degree. HR scans the evaluation — confirmed.

**Government Agencies**
Public sector hiring with degree requirements. Federal and state government positions that mandate "bachelor's degree or equivalent" need to confirm that "equivalent" has been formally evaluated, not self-declared.

**Scholarship Committees**
International scholarship programs requiring equivalency — Fulbright, Chevening, DAAD, and others. These programs receive applications from dozens of countries with different education systems. Verified evaluations eliminate guesswork.

## Verification Architecture

**Credential Evaluation Fraud**

- **Fabricated evaluation reports** — the most common pattern. Fake WES or ECE reports showing higher equivalency than the applicant actually received, or evaluations that were never issued at all. The reports look professional — the agencies' letterheads are publicly available, and a competent forger can produce convincing fakes.
- **Altered equivalency** — changing "equivalent to a 3-year diploma" to "equivalent to a 4-year bachelor's degree." This is the difference between qualifying for immigration and not. Between being eligible to sit a licensing exam and not. Between getting into graduate school and not. A single word changed in the equivalency field has life-altering consequences.
- **Fake evaluation agencies** — agencies that aren't NACES or AICE accredited but produce official-looking reports. Names like "Global Credentials Evaluation Services" or "International Education Assessment Center" — plausible-sounding organizations with professional websites that issue worthless evaluations. The receiving authority has no easy way to check whether an agency is legitimately accredited.
- **Fraudulent underlying credentials** — the evaluation is real, but the degree being evaluated is fake. This is the evaluation agency's problem, not Live Verify's directly, but the authority chain helps: a verified evaluation from WES attests that WES performed their standard verification process on the underlying institution and degree.
- **Stale evaluations presented after credential was revoked** — rare but possible. If the underlying university revoked the degree (academic fraud discovered years later), the evaluation based on that degree is no longer valid. The WITHDRAWN status catches this.
- The **WITHDRAWN** status is critical: if WES discovers the underlying degree was from a diploma mill, they withdraw the evaluation — and anyone who verified it previously would get WITHDRAWN on re-verification. This is the safety net that doesn't exist with PDF evaluations.

**Issuer Types (First Party)**

- WES (World Education Services) — the largest, operating in the US and Canada
- ECE (Educational Credential Evaluators)
- NACES member organizations (approximately 20 accredited agencies in the US)
- AICE member organizations (Association of International Credential Evaluators)
- UK NARIC / ENIC-NARIC (European Network of Information Centres)
- Country-specific evaluation bodies (IQAS in Alberta, WES Canada, ICAS in Ontario)

## Privacy Salt

Moderate. Education credentials are semi-public — people list degrees on CVs, mention their alma mater in conversation, display diplomas on walls. But the equivalency determination can be sensitive. Being told your degree is worth less than you expected is a private matter, not something you want enumerable by anyone with a hash dictionary. Salt prevents enumeration of who has had their credentials evaluated and what the outcomes were.

## Authority Chain

**Pattern:** Regulated

Foreign credential evaluations are performed by accredited agencies that are recognized and regulated by the Office for Students in the UK, ensuring only legitimate equivalency determinations are issued.

```
✓ evaluations.enic-naric.net/verify — Issues credential equivalency evaluations
  ✓ officeforstudents.org.uk — Regulates English higher education providers
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Existing Verification

| Feature | Live Verify | Contacting the Agency Directly | Checking NACES/AICE Lists | Trusting the PDF |
| :--- | :--- | :--- | :--- | :--- |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Days to weeks. Verification departments are overwhelmed with requests. | **Minutes.** Confirms the agency exists. | **Instant.** But no verification. |
| **Scope** | **Full.** Confirms this specific report was issued with this equivalency. | **Full.** But slow. | **Partial.** Confirms agency is accredited, not that this report was issued. | **None.** No verification occurs. |
| **Access** | **Open.** Anyone with a phone camera — immigration officer, HR manager, admissions clerk. | **Restricted.** Requires phone/email during business hours, may require applicant consent. | **Open.** Lists are public. | **Open.** Anyone can read a PDF. |
| **Fraud Resistance** | **High.** Hash-bound to issuer domain; authority chain to accrediting body. | **High.** Direct confirmation from the source. | **Low.** Confirms agency exists, not that this report is real. | **None.** Fake PDFs pass. |
| **Scalability** | **High.** Handles thousands of verifications per second. | **Low.** One phone call or email at a time. Agencies have backlogs. | **N/A.** Doesn't verify individual reports. | **N/A.** |

**Why Live Verify wins here:** The current default is trusting the PDF. Immigration officers processing hundreds of applications don't have time to individually contact WES or ECE for each evaluation. Checking NACES membership confirms the agency is real but says nothing about whether this specific report was issued. Live Verify gives every verifier — from an immigration officer in Ottawa to a medical licensing clerk in Sydney — instant confirmation that the evaluation is real, current, and unaltered.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the evaluation agency, and any subsequent changes to the evaluation as they happen — which may manifest as a new hash, a status change (REVISED, WITHDRAWN), or even a 404 (record deleted)
- Receives structured content/metadata (report number, applicant identifiers, equivalency determination, dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to applicants/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Evaluation agency cannot deny issuing the evaluation
- **Timestamp proof:** Evaluation existed at a specific time (critical for immigration application timelines)
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection — patterns of withdrawn evaluations from a specific agency, for instance
- **Resilience:** Verification works even if the evaluation agency's systems go down

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Evaluation agency's domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Professional license reciprocity assessments** — mutual recognition agreements between countries (e.g., Washington Accord for engineering, Lisbon Recognition Convention for academic degrees). These assessments determine whether a professional license earned in one country is recognized in another, following a similar evaluation-and-report pattern with similar fraud risks. The verification need is identical: did this accredited body actually issue this reciprocity assessment?
2. **Language proficiency score reports** — IELTS, TOEFL, Duolingo English Test. Similar pattern, similar fraud risk, similar verification need for immigration and university admission. Score reports are PDFs from testing organizations, routinely forged to show higher scores than actually achieved. The stakes are the same: a fraudulent IELTS score can qualify an applicant for immigration who wouldn't otherwise meet the language requirement.
