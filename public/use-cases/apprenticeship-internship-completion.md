---
title: "Apprenticeship and Internship Completion"
category: "Professional & Educational Qualifications"
volume: "Very Small"
retention: "7-10 years (employment verification)"
slug: "apprenticeship-internship-completion"
verificationMode: "clip"
tags: ["apprenticeship", "internship", "completion", "trade", "skill", "certificate"]
furtherDerivations: 1
---

## What is an Apprenticeship Certificate?

In trades like plumbing, electrical, or software engineering, you don't just go to school; you complete thousands of hours of on-the-job training.

The Certificate of Completion is the proof that you finished those hours. For a plumber, it's the "Journeyman" card that lets them work without a supervisor. For a software intern, it's the proof that they actually did real work at a major company.

Because these lead directly to high-paying jobs, "internship fraud" (faking a certificate from Google or a local union) is a major problem for recruiters.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 10px solid #eee; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="padding: 40px; text-align: center; border: 1px solid #ccc; margin: 10px;">
    <div style="margin-bottom: 20px;">
      <div style="font-size: 1.5em; font-weight: bold; letter-spacing: 2px;"><span verifiable-text="start" data-for="intern"></span>CERTIFICATE OF COMPLETION</div>
      <div style="font-size: 0.9em; font-style: italic;">Professional Development Program</div>
    </div>
<div style="margin: 30px 0;">
      <div style="font-size: 1.1em;">This is to certify that</div>
      <div style="font-size: 1.8em; font-weight: bold; margin: 10px 0; color: #2c3e50;">SARAH J. MILLER</div>
      <div style="font-size: 1.1em;">has successfully completed a</div>
      <div style="font-size: 1.3em; font-weight: bold; margin: 10px 0;">SOFTWARE ENGINEERING INTERNSHIP</div>
      <div style="font-size: 1.1em;">at</div>
      <div style="font-size: 1.4em; font-weight: bold; margin: 10px 0;">TECHNO-DYNAMIC SYSTEMS, LLC</div>
    </div>
<div style="margin: 30px 0; font-size: 0.95em;">
      <strong>Program Duration:</strong> June 1, 2025 to August 31, 2025<br>
      <strong>Total Hours:</strong> 480 Hours<br>
      <strong>Supervisor:</strong> Dr. David Chen, CTO
    </div>
<div style="display: flex; justify-content: space-around; margin-top: 40px;">
      <div style="width: 40%; border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em;">Program Director Signature</div>
      <div style="width: 40%; border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em;">Supervisor Signature</div>
    </div>
<div data-verify-line="intern" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Company doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="intern">verify:techno-dynamic.com/interns/v</span> <span verifiable-text="end" data-for="intern"></span>
    </div>
  </div>
</div>

## The Problem: Fake Internship Fraud

- **Impostor Companies:** Websites that pretend to be real companies and provide fake "completion letters" for a fee.
- **Inflated Scope:** Changing a "Marketing Intern" certificate to read "Senior Product Intern" to get a better job.
- **Date Stretching:** Altering a 4-week internship to appear as a 12-week program.

## What Is Checked

Intern/Apprentice name, sponsor organization, specific program name (e.g., "Journeyman Electrician"), start/end dates, total hours completed, supervisor name, issuing date.

**Document Types:**
- **Internship Completion Certificate:** For students/graduates.
- **Journeyman Card:** For skilled trades (Electrical, Plumbing, HVAC).
- **Certificate of Apprenticeship:** Formal government-recognized program.

## What the Checker Sees

Shows the issuer domain (the Company or Union) and current status.

**Status Indications:**
- **Completed** — Program successfully finished.
- **In-Progress** — Currently enrolled (shows hours to date).
- **Withdrawn** — Did not finish the program.
- **Revoked** — Certificate pulled due to disciplinary issues.

## Who Holds It

The Intern or Apprentice benefits from verification.

**Job Hunting:** Proving to a future employer that they didn't just "hang out" at a famous company for a summer, but actually completed a structured 480-hour program with a verified CTO.

**College Credit:** Submitting verified proof of internship hours to their university to receive academic credit.

**Trade Licensing:** Using verified hours to qualify for a state professional license (e.g., a Master Plumber license requires verified apprenticeship hours).

## Who Checks It

**Hiring Managers / Recruiters**
**Resume De-risking:** Internship fraud is common. Scanning the certificate hash instantly confirms the candidate actually worked those dates and wasn't just a friend of someone at the company.

**State Licensing Boards**
**Verification of Experience:** Boards can instantly verify that the hours claimed on a license application match the sponsor's official records, preventing "ghost hours."

**University Registrars**
**Credit Validation:** Ensuring that the "summer internship" submitted for credit was a legitimate, completed program.

## Who Issues It

**Issuer Types** (First Party)

**Corporations:** (Google, Goldman Sachs, local businesses).
**Trade Unions:** (IBEW, UA, Teamsters).
**Government Depts:** (Department of Labor Apprenticeship office).

## Authority Chain

**Pattern:** Regulated

Apprenticeships are regulated in the UK through the Office of Qualifications and Examinations Regulation (Ofqual).

```
✓ apprenticeships.education.gov.uk/verify — Issues apprenticeship completion certificates
  ✓ ofqual.gov.uk — Regulates qualifications and exams in England
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Scope and Limitations

**Where verification adds the most value:**

- **Major employers with brand reputation** (Google, Goldman Sachs, Fortune 500) — These companies have reputational stakes; their attestation carries weight.
- **Trade unions with licensing authority** (IBEW, UA, Teamsters) — Journeyman cards are prerequisites for state licenses; verification prevents "ghost hours."
- **Government-registered apprenticeship programs** — Department of Labor oversight provides institutional backing.

**Where verification adds less value:**

- **Unknown SMEs** — If a verifier has never heard of "Techno-Dynamic Systems, LLC," the company's domain attestation doesn't tell them whether the program was legitimate or just an owner's nephew fetching coffee.
- **Informal internships** — "Helping out at a friend's startup" isn't made more credible by a hash.

**The trust hierarchy:** Verification proves "this domain attests to this claim." For major employers, that attestation is valuable because their reputation is on the line. For unknown companies, the verifier still needs to assess whether the *issuer* is credible — and verification doesn't help with that step.

## Where Each Fits: Live Verify, LinkedIn and Background Checks

Employers usually learn about a candidate's apprenticeship or internship from their CV or LinkedIn profile, and confirm it, when it matters, through a background screening company that contacts the former employer. Screening firms operate in many countries, though what they can confirm and how quickly depends on the country and on the former employer's willingness to respond. These answer different questions and work side by side with Live Verify: a profile is the candidate's own account, a background check is an independent investigation, and Live Verify confirms one certificate.

| | LinkedIn profile | Background check | Live Verify on the completion certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone viewing the profile. | An employer who orders and pays for it, with the candidate's consent. | Anyone handed the certificate: a recruiter, a university, an immigration officer. |
| **What the checker gets** | The candidate's own description; internships are rarely confirmed by the employer. | A report from a screening firm, which may cover much more than one placement. | Confirmation that the issuing company stands behind this exact certificate, as at its date. |
| **What the candidate shares** | Their public profile. | Consent to a broader investigation. | Only the certificate they chose to hand over. |
| **Reach** | Global. | Depends on the screening firm's coverage of the former employer's country. | Global in principle: any company or training provider that publishes hashes on its own domain. |
| **Speed and cost** | Free and immediate. | Takes days and carries a fee. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | A profile. | A screening contract and a responsive former employer. | The issuing company to publish hashes, and Live Verify-aware software on the checker's device. No employer does this yet. |
| **Best suited to** | Discovering candidates and their stated history. | Formal pre-employment screening across a whole history. | A quick check during early screening. |

**Where each fits:** a background check remains the right tool for formal pre-employment screening, and LinkedIn remains where recruiters find candidates and read their stated history. A recruiter could use Live Verify to check an internship certificate during a first phone screen, before paying for a full check, if their software honours it. It confirms only that the named company issued the certificate; for an unfamiliar company, the recruiter still has to judge whether the issuer itself is credible.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
