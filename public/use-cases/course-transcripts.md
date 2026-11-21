---
title: "Course Transcripts and Grade Verification"
category: "Professional & Educational Qualifications"
volume: "Small"
retention: "Permanent (academic records)"
slug: "course-transcripts"
verificationMode: "clip"
tags: ["academic-transcript", "grades", "registrar", "university-transfer", "educational-verification", "higher-education"]
furtherDerivations: 1
---

## What is an Academic Transcript?

An Academic Transcript is the "Final Gradebook" of your education. It lists every class you took and exactly what grade you earned.

You need this "Official" paper to apply for Grad School or to prove to an employer that you actually have the skills listed on your resume.

"Transcript Padding" is a common fraud: people often edit a "C" to an "A" or add a "Computer Science" class they never actually took. Verified hashes allow an employer or university to scan the PDF and see the un-altered grades directly from the Registrar's database.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="transcript"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">UNIVERSITY OF OXFORD
Office of the University Registrar
═══════════════════════════════════════════════════════════════════

              OFFICIAL ACADEMIC TRANSCRIPT EXTRACT

Student:    PONDER STIBBONS                   Date: March 15, 2026
Student ID: OX-992288                         Page: 1 of 1

COURSE RECORD
───────────────────────────────────────────────────────────────────
Course Code   Course Title                        Grade    Credits
───────────────────────────────────────────────────────────────────
CS-402        Advanced Thaumaturgy                  A+        4.0
CS-310        High Energy Magic                      A        3.0
MT-201        Stochastic Divination                 A-        3.0
───────────────────────────────────────────────────────────────────
CUMULATIVE GPA:                                   3.92       10.0

Verification confirms the grades and credits match the student's
official record.

</pre>
<span data-verify-line="transcript">verify:ox.ac.uk/registrar/v</span> <span verifiable-text="end" data-for="transcript"></span>
</div>

## The Problem: Transcript Padding Fraud

- **Grade Alteration:** Changing a "C" to an "A" in a PDF editor to get into a top-tier grad school.
- **Ghost Courses:** Adding non-existent courses to a transcript to meet job requirements.
- **Fictitious Degrees:** Creating a fake transcript from a real, famous university for a person who never attended.

## What Is Checked

Student name, student ID, specific course codes/titles, individual grades (A-F), credit hours per course, cumulative GPA, degree program, enrollment dates, date of transcript issuance.

**Document Types:**
- **Official Transcript:** Comprehensive history of all terms.
- **Transcript Extract:** Verified proof of specific grades for a job/transfer.
- **Dean's List / Honors Letter:** Proving academic excellence.
- **Transfer Credit Report:** Proving credits from a previous institution.

## What the Checker Sees

Shows the issuer domain (`ox.ac.uk`, `harvard.edu`) and current record status.

**Status Indications:**
- **Verified** — Content matches the official university database.
- **Amended** — Grade change processed; this version is outdated.
- **Subject to Investigation** — Transcript flagged for potential academic integrity issues.
- **Invalid** — Student ID or course data mismatch.

## Who Holds It

The Student / Alumnus (second party) receives the transcript from the university (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of their academic record. Most of the time, the transcript sits in their files—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that it matches what the Registrar's system recorded and hasn't been altered.

**Future Optionality:** If a dispute arises about grades, transfer credits, or degree requirements, they have cryptographic proof ready without needing to contact the university.

## Who Checks It

The student (second party) may hand the verified document to various third parties:

**Graduate School Admissions**
**Instant Evaluation:** Admissions officers can instantly verify the grades of international applicants by scanning their PDF transcripts, bypassing the expensive and slow "Third-Party Evaluation" services (e.g., WES).

**Employers (HR Departments)**
**GPA Verification:** Ensuring that a candidate hasn't "Rounded Up" their 2.9 GPA to a 3.5 on their resume. A verified transcript provides the "Source of Truth."

**Professional Licensing Boards**
**Prerequisite Proof:** Verifying that a candidate has taken the mandatory courses required for a professional license (e.g., the CPA exam or Medical Board).

## Who Issues It

**Issuer Types (First Party)**

- University Registrars (The primary authority)
- National Student Clearinghouse (Centralized US record hub)
- Digital Credential Platforms (e.g., Parchment, Digitary)

**Privacy Salt:** Required. Academic records are highly private (FERPA in the USA). Unlike documents with many unpredictable variables, transcripts combine student ID numbers, course codes, and specific grades that could theoretically be enumerated. More critically, the hash must be salted to prevent "Guess-and-Check" searches for individual student grades—a significant privacy violation that could enable unauthorized academic background checks.

## Authority Chain

**Pattern:** Regulated

University registrars are governed by the Office for Students in the UK, which sets standards for higher education institutions and regulates their operations.

```
✓ transcripts.cam.ac.uk/verify — Issues official academic transcripts
  ✓ officeforstudents.org.uk — Regulates English higher education providers
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Official Transcript Delivery

Universities and colleges send official transcripts directly to the recipient, on paper or through electronic delivery services such as Parchment, usually for a fee per transcript. Other countries have their own arrangements, including national degree-verification services in some. Official delivery remains the accepted route where it is available. Live Verify answers a different question, whether a transcript PDF the candidate has already sent is one the institution issued, and the two work side by side.

| | Official electronic delivery | Live Verify on the transcript | Unverified scanned PDF or paper |
| :--- | :--- | :--- | :--- |
| **Who can check** | The recipient the student orders it to be sent to. | Anyone the student hands the transcript to: an employer, a graduate school, a licensing body. | Whoever receives it, trusting it as it stands. |
| **What the checker gets** | An official transcript delivered from the registrar's side, with the vendor's assurance it was not altered. | Confirmation that the institution issued this exact transcript, as at its date. | A transcript whose grades may have been edited. |
| **What the student shares** | The full transcript, sent to a named recipient. | Only the transcript they chose to hand over. | Only the document they chose to hand over. |
| **Reach** | Institutions and recipients that use that service. | Global in principle: any institution, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | A fee per transcript and some processing time. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The institution to offer the service, and the student to order a transcript for each recipient. | The institution to publish hashes, and Live Verify-aware software on the checker's device. No institution does this yet. | Nothing. |
| **Best suited to** | Admissions and licensing processes that require official delivery. | Checking a transcript already in circulation, for example during hiring. | Nothing where a decision depends on it. |

**Where each fits:** official registrar delivery and transcript services should remain primary where they are available and accepted. Live Verify is complementary when the candidate's transcript PDF is already the document in circulation and the checker would otherwise either trust a scan or wait for formal delivery.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
