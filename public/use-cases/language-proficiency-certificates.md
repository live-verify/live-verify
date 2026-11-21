---
title: "Language Proficiency Certificates (TOEFL, IELTS)"
category: "Professional & Educational Qualifications"
volume: "Very Small"
retention: "2-5 years (test validity)"
slug: "language-proficiency-certificates"
verificationMode: "clip"
tags: ["toefl", "ielts", "english-proficiency", "higher-education", "immigration-visa", "test-scores", "academic-credential", "ets"]
furtherDerivations: 1
---

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="lang-test"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">ETS - TOEFL iBT
Test-Taker Score Report
═══════════════════════════════════════════════════════════════════

DOE, JOHN JACOB                              Test Date: MAR 15, 2026
Registration ID: 0000 0000 9922 8877

                                               TOTAL SCORE: 114

SECTION SCORES
───────────────────────────────────────────────────────────────────
Section                                              Score (0-30)
───────────────────────────────────────────────────────────────────
Reading                                                        29
Listening                                                      30
Speaking                                                       27
Writing                                                        28

This report is a verified record of the test-taker's English
proficiency. Valid for 2 years from the test date.

</pre>
<span data-verify-line="lang-test">verify:ets.org/toefl/v</span> <span verifiable-text="end" data-for="lang-test"></span>
</div>

## The Problem: Score Inflation Fraud

- **Numerical Tampering:** Editing a "22" in Writing to a "30" to meet a prestigious university's minimum requirement.
- **Date Stretching:** Altering a 2022 test date to 2026 to hide that the scores have already expired.
- **Impersonation:** Using a high-scoring friend's report but editing the name and photo.

## What Is Checked

Test taker name, registration/appointment ID, test type (iBT/Paper), test date, individual section scores (0-30 scale), total aggregate score, test center ID (or "Home Edition"), date of report issuance, validity period.

**Document Types:**
- **TOEFL / IELTS Score Report:** The primary academic entry requirement.
- **DELF / DALF (French):** Official diplomas for life.
- **DELE (Spanish):** Official certification from Instituto Cervantes.
- **JLPT (Japanese):** Proficiency levels N1-N5.

## What the Checker Sees

Shows the issuer domain (`ets.org`, `ielts.org`, `britishcouncil.org`) and current score standing.

**Status Indications:**
- **Certified** — Scores match the official testing database and are un-altered.
- **Expired** — Test date was > 2 years ago; scores are no longer valid for admissions.
- **Invalid** — Registration ID not found or score mismatch.
- **Under Review** — Scores flagged for statistical anomalies (e.g., potential cheating).

## Who Holds It

The Test Taker (second party) receives the score report from the testing organization (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of their language proficiency scores. Most of the time, the report sits in their application files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the scores match what the testing organization's system recorded and haven't been altered.

**Future Optionality:** If they apply to multiple universities, immigration programs, or employers—they have cryptographic proof ready without needing to pay for multiple official score reports or contact the testing organization.

## Who Checks It

The test taker (second party) may hand the verified document to various third parties:

**University Registrars**
**Instant Vetting:** Admissions officers can instantly verify the scores of 1,000+ international applicants. Live Verify allows the university to skip the manual "Verification Code" login process for every single PDF, clearing the backlog in seconds.

**Employers (Global Teams)**
**Capability Proof:** Verifying the language claims of remote workers or expats before issuing contracts for client-facing roles.

**Immigration Officers**
**Border Integrity:** Instantly verifying the "English Requirement" documents of a traveler at a port of entry.

## Who Issues It

**Issuer Types (First Party)**

- Global Testing Giants (ETS, IELTS Partnership, Pearson)
- National Ministries of Education
- Language Institutes

**Privacy Salt:** Required. While test reports contain unique registration IDs, they also include enumerable values—score ranges (0-30, bands 1-9), standard test dates, common names, and predictable section breakdowns. A malicious actor, predatory recruiter, or competitor could feasibly enumerate combinations to reverse-engineer test taker performance, map student populations by institution, or target specific demographics. Salt protects this sensitive educational and personal information.

## Authority Chain

**Pattern:** Regulated

Language proficiency tests like IELTS are accredited and regulated by Ofqual in the UK, which ensures consistent standards across all test administrations and results.

```
✓ results.britishcouncil.org/ielts/verify — Issues language proficiency test scores
  ✓ ofqual.gov.uk — Regulates qualifications and exams in England
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Official Electronic Score Reports

Testing bodies such as ETS send official score reports electronically to the institutions a candidate names, and many admissions offices and immigration authorities are set up to receive them. The electronic report and Live Verify answer different questions and work side by side: one is a direct channel from testing body to institution, the other lets anyone the candidate shows a score report confirm the testing body issued it.

| | Official electronic score report | Live Verify on the score report | Scanned PDF or paper |
| :--- | :--- | :--- | :--- |
| **Who can check** | Institutions registered with the testing body to receive scores. | Anyone handed the report: an employer, a smaller school, an institution abroad, a landlord. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Scores sent directly by the testing body, which never pass through the candidate's hands. | Confirmation that the testing body issued this exact report, as at its date, and whether it has since been cancelled. | A report whose scores may have been edited. |
| **What the candidate shares** | Their scores, sent to each institution they name. | Only the report they chose to hand over. | Only the report they chose to hand over. |
| **Reach** | Institutions that have a reporting arrangement with that testing body. | Global in principle: any testing body, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Takes days to send and receive; additional reports usually carry a fee. | A few seconds per check: one web lookup, with no fee to the standard. | Immediate and free. |
| **What it needs** | A receiving institution set up with the testing body, and the candidate ordering the report. | The testing body to publish hashes, and Live Verify-aware software on the checker's device. No testing body does this yet. | Nothing. |
| **Best suited to** | University admissions and immigration applications that require direct reporting. | Employers and institutions without a reporting arrangement. | Nothing where the score matters. |

**Where each fits:** Official electronic score reports sent directly from the testing body are what many admissions offices are set up to receive, and where an institution requires them they remain the route to use. The paper or PDF score report is what a candidate shows to employers, smaller schools, or institutions abroad that have no reporting arrangement with the test provider. Live Verify lets those readers confirm the report against the testing body's domain, and direct reporting continues for the institutions that depend on it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
