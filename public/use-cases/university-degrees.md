---
title: "University Degrees and Transcripts"
category: "Professional & Educational Qualifications"
volume: "Large"
retention: "Permanent (academic record)"
slug: "university-degrees"
tags: ["education", "degrees", "diploma", "transcripts", "hiring", "background-check", "diploma-mill", "university-registrar"]
furtherDerivations: 1
---

## What is a University Degree?

A **University Degree** (Diploma) is the official credential proving that an individual has completed a specific course of study at an accredited institution. It is the "Master Key" for high-value employment.

Beyond the diploma on the wall, the **Academic Transcript** is the granular record of every class, grade, and credit hour earned.

**"Diploma Mill"** fraud is a multi-billion dollar industry. Criminals create fake universities with real-sounding names or buy high-quality forged diplomas from prestigious schools like Harvard or Oxford for a few hundred dollars. Even more common is **"GPA Inflation,"** where applicants edit their PDF transcripts to turn a "C" in a critical math class into an "A." Live Verify binds the **Student name, Degree classification, and major** to the university registrar's domain (e.g., `.edu` or `.ac.uk`).

<div style="max-width: 600px; margin: 24px auto; font-family: 'Old English Text MT', serif; border: 10px solid #d4af37; padding: 50px; text-align: center; background: #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.1); position: relative;">
  <div style="margin-bottom: 40px;">
    <h1 style="margin: 0; font-size: 2.2em; color: #000;"><span verifiable-text="start" data-for="degree">[</span>University of Cambridge</h1>
    <div style="font-family: 'Times New Roman'; font-size: 1.1em; margin-top: 10px;">The Chancellor, Masters, and Scholars of the University</div>
  </div>
<p style="font-family: 'Times New Roman'; font-size: 1.3em; font-style: italic;">This is to certify that</p>
<h2 style="font-family: 'Arial'; margin: 25px 0; font-size: 1.8em;">SARAH JANE CONNOR</h2>
<p style="font-family: 'Times New Roman'; font-size: 1.3em;">having satisfied the Examiners in the required course of study was on the 15th day of July, 2026 admitted to the degree of</p>
<h3 style="margin: 30px 0; font-size: 1.6em; color: #003366;">Master of Science in Artificial Intelligence</h3>
<p style="font-family: 'Arial'; font-weight: bold; font-size: 1.1em;">CLASS I (DISTINCTION)</p>
<div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: center;">
    <div style="width: 100px; height: 100px; border: 2px solid #d4af37; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; transform: rotate(-10deg);">UNIVERSITY<br>SEAL</div>
    <div style="text-align: right; font-family: 'Times New Roman'; font-size: 0.9em;">
      <em>Vice-Chancellor</em><br>
      <div style="border-top: 1px solid #000; width: 150px; margin-top: 5px;"></div>
    </div>
  </div>
<div data-verify-line="degree" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: University doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:degrees.cam.ac.uk/v <span verifiable-text="end" data-for="degree">]</span>
  </div>
</div>

## Data Verified

Student name, University name, Degree title (e.g., MSc, PhD), Major/Major field of study, Date of graduation, Classification/Honors (e.g., Class I, Summa Cum Laude), Unique Student ID, Registrar signature ID.

**Document Types:**
- **Diploma:** The formal decorative certificate.
- **Academic Transcript:** Detailed semester-by-base report.
- **Letter of Completion:** Temporary proof before the graduation ceremony.
- **Enrollment Verification:** Proving current student status.

## Verification Response

The endpoint returns a simple status code:

- **OK** — Degree is authentic and verified in the registrar's ledger
- **REVOKED** — Degree was withdrawn (e.g., due to plagiarism or ethical violation); do not proceed with hiring
- **WITHHELD** — Graduation requirements met, but degree not released (e.g., unpaid fees)
- **IN_PROGRESS** — Student is currently enrolled and in good standing; not yet graduated
- **404** — Degree not found (never awarded, wrong name, or OCR error)

The issuer domain is visible from the `verify:` line on the diploma itself (e.g., `cam.ac.uk`).

## Post-Verification Actions

None typically. The verification confirms the degree is genuine; that's the value for hiring decisions.

**Why No Further Action:**

- **Hiring managers** just need confirmation the degree is real before extending an offer
- **Immigration authorities** just need status for visa points calculations
- **Licensing boards** just need proof of graduation before allowing exam registration

The status code is the decision point. No POST form or additional workflow needed.

**For Transcript Details:**

If an employer needs the full transcript (GPA, specific courses), that's a separate request to the registrar — not a post-verification action. The diploma verification answers "did they graduate?" not "what grades did they get?"

## Second-Party Use

The **Graduate (Alumnus)** benefits from verification.

**Job Applications:** Proving to a potential employer that their "Distinction" grade isn't a fabrication. A verified hash allows the candidate to bypass the 2-week delay of traditional "Education Clearinghouses," potentially securing a job offer faster than competitors.

**Global Mobility:** Providing a verified hash to an international visa agency. This removes the need for expensive "Consular Legalization" or "Apostille" of physical diplomas, which can cost $500+ and take months.

## Third-Party Use

**Hiring Managers / HR Teams**
**Fraud Prevention:** Diploma mills sell realistic-looking degrees for any subject. Live Verify connects the recruiter directly to the real university's domain, stopping "Fake Ivy League" fraud at the source.

**Immigration Authorities (UK Home Office / US USCIS)**
**Visa Vetting:** Verifying the points-based qualifications of high-skilled migrants by confirming their degrees match the university's official records.

**Professional Licensing Boards**
**Credentialing:** Ensuring that a candidate for a Medical or Law license has actually graduated from an accredited university before they are allowed to take the board exams.

## Verification Architecture

**The "Diploma Mill" Fraud Problem**

- **Template Forgery:** Using high-end parchment and fake seals to create a "Degree" from a real university for someone who never attended.
- **GPA Tampering:** Editing a 2.5 GPA to 3.9 on a PDF transcript to get into a top-tier MBA program.
- **Major Inflation:** Changing a "Sociology" degree to "Computer Science" to qualify for a technical role.

**Issuer Types** (First Party)

**National Universities:** (Hosting on their own `/registrar` or `/verify` domain).
**Ministry of Education:** (In countries with a centralized national degree database).
**Credly / Parchment:** (Digital credential platforms hosting verified hashes).

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Education Clearinghouses (NSC)

| Feature | Live Verify | National Student Clearinghouse | Physical Diploma |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the University. | **Data-Bound.** Trust the aggregator. | **Visual.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Often takes 3-10 days for a response. | **Instant.** |
| **Cost** | **Low.** Standard web infra. | **High.** Employers pay $15-$50 per check. | **Zero.** |
| **Integrity** | **Cryptographic.** Binds GPA and Honors. | **Data-Only.** | **Vulnerable.** |

**Why Live Verify wins here:** The "Speed of Hiring." In a competitive labor market, high-quality candidates don't want to wait 10 days for a "Background Check Firm" to call a university registrar. Live Verify allows for **Instant Trust**, turning the diploma on the wall into a live, cryptographic bridge to the university's source of truth.