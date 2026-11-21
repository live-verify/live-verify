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

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the testing organization's hashes and status changes plus structured metadata (test dates, score ranges, section breakdowns, test center IDs) — never plaintext such as test taker names — providing non-repudiation of issuing the language proficiency certificate.

## Compared With Official Score Reports (Electronic)

| Feature | Live Verify | Official Electronic Report | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **User Control** | **High.** Student shares only the *Verified PDF*. | **Low.** Testing body sends data directly to the school. | **High.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Test Body (ETS). | **System-Bound.** | **Zero.** Easily forged. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Takes 3-7 days to "Send" and "Receive." | **Instant.** |
| **Cost** | **Low.** Standard web infra. | **Medium.** Fees of $20+ per report are standard. | **None.** |

**Where each fits:** Official electronic score reports sent directly from the testing body are what many admissions offices are set up to receive, and where an institution requires them they remain the route to use. The paper or PDF score report is what a candidate shows to employers, smaller schools, or institutions abroad that have no reporting arrangement with the test provider. Live Verify lets those readers confirm the report against the testing body's domain, and direct reporting continues for the institutions that depend on it.
