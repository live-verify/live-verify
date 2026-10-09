---
title: "Lab Test Results and Pathology Reports"
category: "Healthcare & Medical Records"
volume: "Medium"
retention: "10-30 years (medical necessity)"
slug: "lab-test-pathology-reports"
verificationMode: "both"
tags: ["medical-diagnostics", "pathology-report", "lab-results", "cancer-screening", "biopsy-verification", "healthcare-data-integrity", "labcorp", "quest-diagnostics", "blood-tests", "patient-carried-results", "primary-care", "clinical-handoff"]
furtherDerivations: 2
---

## The Patient-Carried Results Problem

A patient downloads blood-test results from a laboratory such as Labcorp, prints them at home, and takes them to a GP, primary care physician (PCP), or specialist. The receiving clinician may work outside the laboratory's connected health-record network. They can read the results, but a logo and plausible layout do not establish who issued the text or whether someone changed a value.

**Printing your own copy is legitimate. The question is whether the copy contains the laboratory's unaltered report.** [Labcorp supports viewing, downloading and printing test results](https://www.labcorp.com/patients/tests/results), and [suggests bringing a downloaded or printed copy to a provider visit](https://www.ondemand.labcorp.com/blog/test-results-with-your-provider-five-tips-to-make-the-most). Live Verify is a proposed addition to that existing handoff, not a claim that Labcorp currently offers these endpoints.

The pattern is global: a reference laboratory, hospital laboratory or performing laboratory issues results; the patient carries them; another clinician verifies the presented text against the issuing laboratory's domain. The clinical report may arrive as paper, an emailed PDF or text on screen.

## Blood Tests Taken to a GP or PCP

1. The laboratory issues a report containing a verification line and an unpredictable receipt ID, and publishes the corresponding hash/status.
2. The patient prints or forwards the report, including its verification region. No laboratory login credentials need to be shared with the clinician for this proposed check.
3. The clinician captures the region by camera or selects its digital text where supported. The device normalizes the extracted text, hashes it and checks the laboratory's endpoint.
4. A matching response establishes that the laboratory stands behind that exact text. The clinician checks the patient identifiers, collection date, report version and status alongside the results.
5. No match calls for checking extraction and the issuer, or obtaining the original report. It is not by itself proof that the patient falsified anything.

### Illustrative blood-result extract

This fictional extract demonstrates the verification fields, not clinical interpretation. Its reserved `.example` domain has no live endpoint. A production report should include the laboratory's full relevant reporting fields.

<div style="font-family: Arial, sans-serif; border: 1px solid #999; padding: 18px; max-width: 650px; margin: 24px auto;">
<span verifiable-text="start" data-for="blood-panel"></span>
BLOOD TEST RESULT EXTRACT<br>
Issuer: Meridian Reference Laboratory — lab.meridian.example<br>
Patient: Alex Morgan; DOB: 1985-05-15<br>
Accession: MR-2026-7148<br>
Specimen: Blood<br>
Collected: 2026-10-05 08:40 UTC<br>
Reported: 2026-10-06 12:10 UTC<br>
Version: 1; laboratory report status: FINAL<br>
Test: Haemoglobin<br>
Result: 142 g/L<br>
Laboratory reference interval: 130–170 g/L<br>
Laboratory flag: None<br>
Extract scope: This result only; not the complete blood panel<br>
Receipt ID: c71f5e02496a4e829db381a70562f4cd<br>
<span data-verify-line="blood-panel" style="font-family: 'Courier New', monospace;">verify:lab.meridian.example/results</span>
<span verifiable-text="end" data-for="blood-panel"></span>
</div>

For this rendition, the issuer's metadata would declare `"ocrFonts": ["Arial", "Courier New"]`. That is an OCR hint, not a font-based authenticity test. The numerical result, unit, laboratory reference interval and flag are all inside the hashed region. A report number alone would not protect the result from alteration. The extract deliberately states its limited scope; it cannot stand in for the whole panel.

### What the check addresses

| Presented document or problem | Contribution and limit |
|---|---|
| Entirely invented report using a real laboratory's logo | The invented text has no corresponding entry at the real lab, assuming it has adopted verification |
| Changed result, decimal point, unit, reference interval or flag | The altered text does not match the issuer's hash |
| Changed patient identifiers, collection date or report version | These fields are bound when included in the verified region |
| Genuine results belonging to someone else | Bound identifiers help the clinician match the report to the patient; the hash alone does not establish the presenter's identity |
| Genuine but old results | Collection/report dates remain visible; authenticity is not a finding that results reflect today's condition |
| Corrected report presented in its original form | Issuer status can flag the earlier version as amended or withdrawn; the corrected report needs its own verification |
| Abnormal rows or additional pages omitted | A checked extract proves only its declared scope. Full-page or manifest verification is needed to check a defined report's completeness |
| Fake laboratory operating its own domain | Successful lookup there only authenticates that issuer's statement. The clinician must assess the laboratory's identity and authority |

Dense tables are a harder camera-OCR case than a short extract. See [page-at-a-time hashing](../../docs/page-at-a-time-hashing.md): bind the relevant page text or use a short, explicitly scoped lab-issued extract; do not imply that checking the header authenticates every result row or omitted page.

## Pathology Report Example

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #004a99; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="lab-res"></span>QUEST DIAGNOSTICS</div>
      <div style="font-size: 0.8em; opacity: 0.8;">CAP Accredited Laboratory #998877</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Accession #: 26-992288</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="border-bottom: 2px solid #004a99; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">SURGICAL PATHOLOGY REPORT</h3>
      <div style="font-size: 0.9em; color: #666;">Patient: <strong>DOE, JOHN JACOB</strong> (DOB: 05/15/1985)</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Specimen:</strong> Biopsy, Right Upper Lobe (Lung)</p>
<div style="background: #fdf2f2; border: 1px solid #ffcdd2; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p style="font-weight: bold; color: #b71c1c; margin-top: 0;">FINAL DIAGNOSIS:</p>
        <p style="margin-bottom: 0;">INVASIVE ADENOCARCINOMA (Grade 2). Margin clearance confirmed at 5mm. No lymphovascular invasion identified.</p>
      </div>
<p><strong>Pathologist:</strong> Dr. Leslie Thompkins, MD<br>
      <strong>Date of Report:</strong> March 15, 2026</p>
    </div>
<div style="margin-top: 25px; padding: 10px; background: #f9f9f9; border: 1px solid #eee; font-size: 0.8em; color: #555; font-style: italic; text-align: center;">
      Verification authenticates this report text against the issuing laboratory; it does not establish diagnostic accuracy.
    </div>
<div data-verify-line="lab-res" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Quest doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="lab-res">verify:questdiagnostics.com/v</span> <span verifiable-text="end" data-for="lab-res"></span>
    </div>
  </div>
</div>

## Framing Insights

**Specific consequences (Pattern E):** An oncologist who begins chemotherapy based on a pathology report that has been altered — "Grade 2" changed to "Grade 3," or a benign finding edited to malignant — subjects the patient to months of toxic treatment they do not need. Conversely, a patient who edits a malignant result to benign to avoid treatment, then presents the altered report to a new doctor, delays life-saving intervention. In both directions, the unverifiable paper report is the weak link between the laboratory finding and the clinical decision.

**"Why would you bother?" (Pattern A):** Insurance fraud and denial drive most alterations. A patient scrubs a positive drug test before a custody hearing. A pilot edits a cardiac finding to pass a flight physical. A disability claimant adds findings that do not exist to support a claim. A life insurance applicant removes a cancer diagnosis to qualify for coverage. The lab's internal system is unaltered, but the paper that travels to the third party is trivially editable.

## Data Verified

Patient identifiers, accession number, specimen type, test names, numerical results and units, qualitative findings, laboratory reference intervals and flags, reporting professional where applicable, collection date/time, report date/time, version, declared page/extract scope, and unpredictable receipt ID.

**Document Types:**
- **Pathology Report:** The high-stakes "Biopsy Result."
- **Standard Lab Panel:** (CBC, Lipid, Metabolic).
- **Toxicology Report:** Proving "Clean" or "Positive" status.
- **Genetic Screen:** Complex multi-page DNA analysis.

## Data Visible After Verification

Shows the issuer domain (`questdiagnostics.com`, `labcorp.com`) and current report standing.

**Status Indications:**
- **Final** — Report is complete and verified by the medical director.
- **Amended** — **ALERT:** Original result was corrected; this version is void.
- **Preliminary** — Initial findings; this is not the final report.
- **Cancelled** — Specimen was compromised; no result issued.

## Second-Party Use

The **Patient** benefits from verification.

**Primary-care consultations:** Taking externally obtained blood-test results to a GP or PCP without relying on an unverifiable printout or giving the clinician access to the patient's laboratory account.

**Second Opinions:** Giving another clinician a report whose text can be authenticated against the original lab. This does not replace slide review, repeat testing or other clinical checks where those are appropriate.

**Personal Health Records:** Carrying a source-attributed report and choosing whom to share it with. A verified report is an issuer's statement about a specimen and date, not a complete or current account of a person's health.

## Third-Party Use

**Specialist Physicians / Oncologists**
**Report provenance:** A consulting clinician checks the presented report against the laboratory's published hash/status. This helps detect altered text; it does not establish diagnostic accuracy or make the report sufficient for a treatment decision.

**Life & Disability Insurers**
**Risk Underwriting:** Verifying high-stakes health markers (like cancer staging) before issuing multimillion-dollar policies. Live Verify connects the underwriter directly to the performing lab.

**Clinical Trial Monitors**
**Eligibility Vetting:** Ensuring that participants in a lung cancer trial actually have the "Verified Grade 2" diagnosis required by the protocol.

## Verification Architecture

**The "Medical Denial" Fraud Problem**

- **Diagnosis Scrubbing:** A patient editing a "Positive" cancer report to "Negative" to pass a life insurance exam or to hide a condition from a family member.
- **Result Alteration:** Changing a positive finding to negative, changing a number, or removing an abnormal-result flag.
- **Pathologist Impersonation:** Creating a fake report on the letterhead of a reputable lab to justify an experimental or unauthorized treatment.

**Issuer Types** (First Party)

**National Reference Labs:** (Quest, LabCorp, ARUP).
**Hospital Labs:** (Academic medical center pathology units).
**Direct-to-Consumer Labs:** (e.g., Everlywell, Thorne).

**Privacy Salt:** Include an issuer-generated unpredictable receipt ID (at least 128 random bits) in the hashed report text to reduce guess-and-check enumeration of patient results. Do not echo patient names or results in public verification responses. A random ID does not prevent someone who already possesses the report from forwarding it, and lookup privacy still needs consideration.

## Authority Chain

**Pattern:** Regulated

NHS pathology labs test specimens and issue reports following UK medical device regulations.

```
✓ pathology.guysandstthomas.nhs.uk — Tests pathology specimens in UK hospitals
  ✓ ukas.com — Accredits UK testing laboratories
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the laboratory's hashes and status changes plus structured metadata (specimen ID, test type, result status, report date, pathologist ID) — never patient name, diagnosis details, or medical history — providing non-repudiation of the test results and an audit trail insurers and clinicians can inspect.


## Competition vs. Patient Portals / HIEs

| Feature | Live Verify | Patient Portal (MyQuest) | Health Info Exchange (HIE) |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Lab. | **System-Bound.** Requires login. | **Network-Bound.** |
| **User Access** | Capture the paper or select supported digital text; depends on issuer adoption and extraction. | Patient or authorised provider accesses the original results. | Receiving provider accesses connected records. |
| **Integrity** | **Cryptographic.** Binds the *Diagnosis*. | **High.** Direct DB access. | **High.** |
| **Cross-System** | Portable text check where the lab publishes hashes and the verifier supports it. | Downloads can travel beyond the portal. | Depends on participating systems and access arrangements. |

**Practical fit:** Patient-carried results are useful precisely because they travel outside the issuing laboratory's system. Live Verify could authenticate that travelling text without requiring every receiving practice to integrate with the same portal or health-information exchange. Existing authenticated clinical exchange remains preferable where available; verification complements it.

**Clinical limit:** An authentic report can contain a laboratory error, refer to a misidentified specimen, be outdated, or omit other relevant tests. Verification does not establish specimen identity, diagnostic accuracy, clinical relevance or completeness beyond the checked scope. The receiving clinician retains responsibility for interpretation and any further checks.