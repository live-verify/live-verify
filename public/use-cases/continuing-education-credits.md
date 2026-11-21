---
title: "Continuing Education Credits (CME, CLE, CPE)"
category: "Professional & Educational Qualifications"
volume: "Large"
retention: "3-7 years (renewal cycles)"
slug: "continuing-education-credits"
verificationMode: "clip"
tags: ["professional-education", "cle", "cme", "cpe", "licensing", "compliance", "training-certificate"]
furtherDerivations: 1
---

## What is a Continuing Education Certificate?

Lawyers (CLE), Doctors (CME), and CPAs (CPE) must take a certain number of hours of training every year to keep their licenses active.

When they finish a course, they receive a Certificate of Attendance. They must save these papers and show them to the State Board to renew their license.

Because these credits are mandatory, some busy professionals "Fake" the certificates using old templates or "Rounding Up" 1 hour of training to 10 hours. Verified hashes allow licensing boards to audit these certificates instantly without calling every training provider.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 4px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="padding: 40px; text-align: center; border: 1px solid #ccc; margin: 10px;">
    <div style="margin-bottom: 20px;">
      <div style="font-size: 1.4em; font-weight: bold; letter-spacing: 1px;"><span verifiable-text="start" data-for="cle"></span>CERTIFICATE OF ATTENDANCE</div>
      <div style="font-size: 0.9em; font-style: italic;">Continuing Legal Education (CLE)</div>
    </div>
<div style="margin: 30px 0;">
      <div style="font-size: 1.1em;">This is to certify that</div>
      <div style="font-size: 1.8em; font-weight: bold; margin: 10px 0; color: #1a237e;">SAUL GOODMAN, ESQ.</div>
      <div style="font-size: 1.1em;">has successfully completed</div>
      <div style="font-size: 1.3em; font-weight: bold; margin: 10px 0;">ETHICS IN CRIMINAL DEFENSE</div>
      <div style="font-size: 1.1em;">presented by</div>
      <div style="font-size: 1.4em; font-weight: bold; margin: 10px 0;">ABA LEGAL ACADEMY</div>
    </div>
<div style="margin: 30px 0; font-size: 0.95em; background: #f9f9f9; padding: 15px;">
      <strong>Credit Hours:</strong> 2.0 Ethics / 1.0 General<br>
      <strong>Date:</strong> March 15, 2026<br>
      <strong>Course ID:</strong> ABA-2026-9922
    </div>
<div data-verify-line="cle" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Provider doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="cle">verify:americanbar.org/cle/v</span> <span verifiable-text="end" data-for="cle"></span>
    </div>
  </div>
</div>

## The Problem: Pencil Whipping Fraud

- **Certificate Forgery:** Professionals using a real provider's template to create a "Certificate of Attendance" for a course they never took.
- **Hour Inflation:** Changing "1.0 Credit Hours" to "10.0 Credit Hours" on a PDF to meet a deadline.
- **Course Sharing:** One person taking a webinar and sending the PDF certificate to 5 friends, who then edit the name to their own.

## What Is Checked

Professional name, license number (optional), course title, education provider name, credit hours (by category: Ethics, Tech, General), date of completion, provider accreditation number, certificate serial ID.

**Document Types:**
- **CLE Certificate:** Continuing Legal Education (Lawyers).
- **CME Certificate:** Continuing Medical Education (Doctors/Nurses).
- **CPE Certificate:** Continuing Professional Education (CPAs).
- **CEU Certificate:** General education units.

## What the Checker Sees

Shows the issuer domain (`americanbar.org`, `ama-assn.org`) and the credit status.

**Status Indications:**
- **Verified** — Course completed and credits issued.
- **Accredited** — Provider is currently authorized by the State Board to issue credits.
- **Expired/Superseded** — Course content no longer meets current board standards.
- **Invalid** — Serial number mismatch or attendance not recorded.

## Who Holds It

The Professional (Attorney/Doctor/CPA) benefits from verification.

**License Renewal:** Proving to the State Licensing Board that they have met their 2-year mandatory education requirements. A verified "Token of Credit" speeds up the renewal process and reduces the chance of an "Audit" due to unreadable or suspicious paper certificates.

**Employer Tracking:** Providing verified credits to their firm's HR department to trigger salary increases or promotion eligibility linked to advanced training.

## Who Checks It

**State Licensing Boards (The Bar / Medical Board)**
**Audit Efficiency:** Boards conduct random audits of 5-10% of all professionals. Live Verify allows board staff to instantly verify a pile of certificates without calling 50 different education providers to confirm "Did John Smith really attend this webinar?"

**Insurance Carriers (Professional Liability)**
**Risk Assessment:** Verifying that a professional is staying current with latest safety/ethics training, which can lead to lower E&O (Errors & Omissions) premiums.

**Patients / Clients**
**Professionalism:** A client can verify that their doctor or lawyer is actually doing the work to stay current in their field.

## Who Issues It

**Issuer Types** (First Party)

**National Associations:** (ABA, AMA, AICPA).
**Universities:** (Law/Medical schools).
**Commercial Providers:** (e.g., Practising Law Institute - PLI).

## Authority Chain

**Pattern:** Regulated

Education providers issue continuing education certificates under medical regulator authority (GMC in the UK).

```
✓ cme.bma.org.uk/verify — Issues continuing education credits
  ✓ gmc-uk.org/register — Registers and regulates UK medical doctors
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Learning Management Systems

Continuing education providers record completions in their own learning management systems, and some licensing boards and professional bodies receive completions directly or run their own tracking registries. Arrangements differ by profession, state and country. Where a board already receives data directly, nothing more is needed. Live Verify answers a different question, whether a certificate a professional submits is one the provider issued, and the two work side by side.

| | Learning management system or board registry | Live Verify on the completion certificate | Unverified paper or PDF certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | The provider, and boards that receive its data or run the registry. | Anyone handed the certificate: a licensing board, an employer, an auditor. | Whoever receives it, trusting it as it stands. |
| **What the checker gets** | The provider's or registry's records, in that system's format. | Confirmation that the provider issued this exact certificate, for these credits and this date. | A certificate whose hours or dates may have been edited. |
| **What the professional shares** | Their record, through an export or a login. | Only the certificates they submit. | Only the certificate. |
| **Reach** | The boards and providers connected to that system. | Global in principle: any provider, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Automatic where a direct feed exists; otherwise a login, an export and a manual upload. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A connection between provider and board, or a registry both use. | The provider to publish hashes, and Live Verify-aware software on the checker's device. No provider does this yet. | Nothing. |
| **Best suited to** | Providers and boards already connected. | Certificates from many providers, gathered by a professional and submitted at renewal or audit. | Nothing where a license depends on it. |

**Where each fits:** a learning management system is the right home for a provider's course records, and where a licensing board receives completions directly from it nothing more is needed. Many boards do not, and the professional submits certificates collected over the year. Live Verify lets the board confirm each certificate with the provider that issued it, whichever system that provider runs.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
