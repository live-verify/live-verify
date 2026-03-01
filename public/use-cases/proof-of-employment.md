---
title: "Proof of Employment (Employee-Held)"
category: "Professional & Educational Qualifications"
volume: "Very Large"
retention: "Duration of employment + 1 year"
slug: "proof-of-employment"
tags: ["employment", "proof-of-employment", "immigration", "visa", "border-control", "hr", "employer-verification", "authority-chain", "portable-credential"]
furtherDerivations: 2
---

## What is Proof of Employment?

You're at the US immigration counter. The officer asks: "What do you do for work?" You say: "I'm a vice president at HSBC." The officer says: "Can you prove that?"

You can't. Not really. You might show a business card (anyone can print one), pull up LinkedIn (anyone can edit a profile), or offer to call your HR department (it's 3 AM in London). None of this is verifiable in the moment.

**Proof of employment** is a document issued by your employer — a letter or card — that you carry and present when someone needs to confirm you work where you say you work. Currently these are unverifiable pieces of paper on company letterhead. With Live Verify, the letter carries a `verify:` line bound to the employer's HR domain. The immigration officer scans it, gets confirmation from `hr.hsbc.co.uk` that yes, this person is currently employed there in that role, and moves on.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #db0011; padding-bottom: 15px; margin-bottom: 20px;">
    <div>
      <div style="font-weight: bold; font-size: 1.3em; color: #db0011;"><span verifiable-text="start" data-for="employment">[</span>HSBC Holdings plc</div>
      <div style="font-size: 0.8em; color: #666; text-transform: uppercase; letter-spacing: 1px;">Confirmation of Employment</div>
    </div>
    <div style="width: 50px; height: 50px; background: #db0011; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: bold; font-size: 0.7em;">HSBC</div>
  </div>
  <div style="font-size: 0.95em; line-height: 1.8; color: #333;">
    <p style="margin: 0;"><strong>Name:</strong> Jane A. Worthington</p>
    <p style="margin: 0;"><strong>Title:</strong> Vice President, Global Markets</p>
    <p style="margin: 0;"><strong>Employed Since:</strong> April 2019</p>
    <p style="margin: 0;"><strong>Status:</strong> Active, Full-Time</p>
    <p style="margin: 0;"><strong>Work Location:</strong> London, United Kingdom</p>
    <p style="margin: 0;"><strong>Issued:</strong> February 28, 2026</p>
  </div>
  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px dashed #ccc; font-size: 0.85em; color: #666;">
    <p style="margin: 0;">This letter confirms current employment only. It does not constitute a guarantee of future employment or a reference.</p>
  </div>
  <div data-verify-line="employment" style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #999; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
    title="Demo only: HSBC doesn't yet offer verification&#10;endpoints, so this is illustrative">
    verify:hr.hsbc.co.uk/employment/v <span verifiable-text="end" data-for="employment">]</span>
  </div>
</div>

**This is different from an employment reference.** A reference is written for a specific third party (a hiring manager, a lender). Proof of employment is a portable credential the employee carries and presents to anyone who asks — immigration officers, landlords, bank account opening staff, consulates, border agents.

## Data Verified

Employee name, job title, employer name, employment start date, employment status (active/inactive), employment type (full-time/part-time/contract), work location (country/city), date of issuance.

**What is deliberately NOT included:** Salary, performance ratings, disciplinary history, reason for any future departure. This is proof of current employment, not a reference or financial disclosure.

**Document Types:**
- **Employment Confirmation Letter** — Formal letter on employer letterhead, carried by the employee
- **Employment Verification Card** — Wallet-sized card with minimal details and a verify line (for frequent travelers)
- **Digital Employment Credential** — PDF or mobile wallet pass with verify line (for paperless workflows)

## Verification Response

The endpoint returns current employment status:

- **OK** — Currently employed in the stated role. Active.
- **LEAVE** — Currently employed but on authorized leave (parental, medical, sabbatical). Still an employee.
- **NOTICE_PERIOD** — Employee has resigned or been given notice. Still employed until the stated end date.
- **EXPIRED** — The letter was issued more than [X] days ago. The employee should request a fresh one. (Prevents indefinite use of old letters after termination.)
- **NOT_EMPLOYED** — No longer employed by this organization.
- **404** — No matching record. The letter is forged, or the details don't match.

## Authority Chain Verification

When an immigration officer verifies a proof-of-employment letter from `hr.hsbc.co.uk`, they know HSBC says this person works there. But how does the officer know that `hr.hsbc.co.uk` is a legitimate employer authorized to attest employment?

The verification response includes an **authority chain** — a secondary verification link allowing the relying party to confirm that the issuer is itself a recognized authority for the type of claim being made:

```
HTTP/1.1 200 OK
X-Verify-Status: OK
X-Verify-Authority-For: employment-attestation
X-Verify-Authority-Attested-By: https://employers.hmrc.gov.uk/v/{hash}
X-Verify-Authority-Scope: paye-registered-employer
```

The immigration officer's system can optionally follow this chain:

**Step 1 — Primary verification:** `hr.hsbc.co.uk` confirms Jane Worthington is employed as VP, Global Markets.

**Step 2 — Secondary verification:** `employers.hmrc.gov.uk` confirms that HSBC Holdings plc (domain: `hr.hsbc.co.uk`) is a registered PAYE employer. HMRC is the UK tax authority — every legitimate UK employer must be PAYE-registered. This is the government attesting that the employer is real and authorized to employ people.

**Step 3 (optional) — Tertiary verification:** HMRC's own authority is statutory — established by act of Parliament. The chain terminates at a root authority that derives its legitimacy from law, not from another verification endpoint.

**What the authority chain proves:**
1. Jane works at HSBC (primary — employer attests)
2. HSBC is a real, registered employer (secondary — HMRC attests)
3. HMRC is a statutory tax authority (tertiary — the law)

**What the absence of an authority chain means:** If a verification response from `hr.acme-corp.example.com` confirms employment but includes no `X-Verify-Authority-Attested-By` header, the relying party knows the claim is self-attested only — no government or regulatory body has confirmed this is a legitimate employer. The claim may still be genuine (a newly registered company, a foreign employer not yet in the local registry), but the absence is a signal that warrants additional scrutiny.

See [Verification Response Format: Authority Chains](../../docs/Verification-Response-Format.md#authority-chain-verification) for the full specification.

### Worked Examples

**UK Solicitor at Court:**

| Step | Endpoint | Confirms | Authority Header |
| :--- | :--- | :--- | :--- |
| Primary | `members.smithandco.co.uk/v` | Sarah Chen is a practising solicitor at Smith & Co | `X-Verify-Authority-Attested-By: https://sra.org.uk/v/{hash}` |
| Secondary | `sra.org.uk/v/{hash}` | Smith & Co is an SRA-regulated firm; Sarah Chen holds a current practising certificate | `X-Verify-Authority-Attested-By: https://legalservicesboard.org.uk/v/{hash}` |
| Tertiary | `legalservicesboard.org.uk/v/{hash}` | The SRA is an approved regulator under the Legal Services Act 2007 | *(statutory root — chain terminates)* |

**Doctor in Emergency Department:**

| Step | Endpoint | Confirms | Authority Header |
| :--- | :--- | :--- | :--- |
| Primary | `staff.royalfree.nhs.uk/v` | Dr. Patel is a Consultant Cardiologist | `X-Verify-Authority-Attested-By: https://gmc-uk.org/v/{hash}` |
| Secondary | `gmc-uk.org/v/{hash}` | Dr. Patel holds GMC registration, licence to practise, specialist register entry | *(statutory root — GMC established by Medical Act 1983)* |

**US Bank Employee at Immigration:**

| Step | Endpoint | Confirms | Authority Header |
| :--- | :--- | :--- | :--- |
| Primary | `hr.jpmorgan.com/v` | John Smith, Associate, Investment Banking | `X-Verify-Authority-Attested-By: https://employers.irs.gov/v/{hash}` |
| Secondary | `employers.irs.gov/v/{hash}` | JPMorgan Chase & Co is a registered employer, EIN 13-2624428 | *(statutory root — IRS)* |

## Second-Party Use

The **employee** is the primary beneficiary and carrier of the document.

**Immigration and border control:** The most time-critical scenario. "What do you do?" at the immigration counter becomes a 5-second verification instead of a verbal interrogation. Particularly valuable for frequent business travelers, employees on work visas, and anyone whose immigration status depends on continued employment.

**Visa applications:** Consulates require proof of employment for tourist, business, and work visa applications. Currently: a letter from HR that takes 5 business days, is easily forged, and the consulate has no way to verify. With Live Verify: the employee carries a current letter or presents a digital credential; the consulate verifies instantly.

**Landlord/letting agent:** "Prove you're employed" for rental applications. The employee presents the letter; the landlord scans and verifies against the employer's domain. No more calling HR departments during business hours.

**Bank account opening:** KYC requirements often include proof of employment or source of funds. The bank verifies instantly rather than filing the letter and hoping it's genuine.

**School enrollment for dependents:** International school applications for employees on overseas assignments. The school needs proof of the parent's employment to confirm the family's legitimate presence.

## Third-Party Use

**Immigration Authorities**

**Real-time employment verification:** Officer scans the document at the counter. Verified employment status influences visa decisions, entry permissions, and the credibility of the traveler's stated purpose. The authority chain (employer → HMRC/IRS) gives the officer confidence not just that the person claims employment but that the employer is legitimate.

**Consulates and Embassies**

**Visa application processing:** Currently, consulates receive employment letters they cannot verify without calling the employer (often in a different time zone, in a different language). Live Verify eliminates this bottleneck. The authority chain is particularly valuable here — consulates process applications from employers in every country and cannot independently assess whether "Acme Corp Ltd" is a real company.

**Landlords and Letting Agents**

**Tenant screening:** Verification confirms current employment and approximate tenure. The authority chain confirms the employer is real — valuable for preventing fake employment letters from shell companies.

**Banks and Financial Institutions**

**KYC and account opening:** Employment verification as part of know-your-customer checks. The authority chain satisfies the bank's obligation to verify the source of funds at a basic level.

**Other Employers (Moonlighting/Conflict Checks)**

**Dual employment verification:** In regulated industries (banking, law, government), employees may need to disclose secondary employment. A proof-of-employment letter from the second employer, verified with authority chain, provides auditable evidence.

## Verification Architecture

**The Fake Employment Letter Problem**

- **Letterhead forgery** — Anyone with a color printer can produce convincing company letterhead. Logos and signatures are trivially copied.
- **Shell company fraud** — Fake companies issue real-looking employment letters. The authority chain (employer → tax authority) exposes this: a company not registered with HMRC/IRS cannot produce a valid secondary verification.
- **Stale letters** — Employee was terminated last month but still carries the letter from three months ago. The verification endpoint returns NOT_EMPLOYED or EXPIRED.
- **Title inflation** — "I'm the CFO" when they're actually a junior accountant. The verification response confirms the actual title on file.
- **Employment mills** — Services that sell fake employment letters (analogous to diploma mills). The authority chain breaks this: an employment mill's domain won't have a secondary verification from HMRC/IRS.

**Why This Differs from Employment References**

| | Proof of Employment | Employment Reference |
| :--- | :--- | :--- |
| **Audience** | Anyone — immigration, landlords, banks, consulates | Specific third party (hiring manager, lender) |
| **Content** | Current status only — name, title, dates, active/inactive | Qualitative — performance, character, eligibility for rehire |
| **Initiated by** | Employee requests, carries, and presents it | Employer writes it for a specific recipient |
| **Shelf life** | Current — expires when employment ends (or sooner via EXPIRED status) | Point-in-time — describes a past employment period |
| **Authority chain** | Yes — employer → tax authority → statute | Not typically — the recipient judges the employer's credibility |
| **See also** | This document | [Employment References](view.html?doc=employment-references) |

## Privacy Salt

Moderate sensitivity. The employment claim includes the employee's name and employer — not highly secret (it's on LinkedIn), but the verification endpoint should include a salt to prevent enumeration of who works at a given company. Without the salt, an attacker who knows that `hr.hsbc.co.uk` is the endpoint could try common names to discover HSBC employees.

## Competition

| Feature | Live Verify | HR Phone Call | LinkedIn | Company Badge |
| :--- | :--- | :--- | :--- | :--- |
| **Verifiable** | **Yes.** Domain-bound to employer. | **Slow.** Requires calling HR during business hours, correct time zone, correct department. | **No.** Self-reported, trivially edited. | **No.** Easily faked or borrowed. |
| **Authority chain** | **Yes.** Employer → tax authority → statute. | **No.** You're trusting whoever answers the phone. | **No.** | **No.** |
| **Available 24/7** | **Yes.** Hash lookup is always on. | **No.** Business hours only. | **Yes.** But unverified. | **Yes.** But unverifiable. |
| **Works at border** | **Yes.** 5-second scan. | **Impractical.** Immigration won't call your HR department. | **Unreliable.** | **Meaningless.** |
| **Detects termination** | **Yes.** Real-time status. | **Maybe.** If HR updates are timely. | **No.** People leave old jobs on LinkedIn for months. | **Maybe.** If badge is deactivated. |

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

## Further Derivations

1. **Proof of self-employment / freelance status** — For sole traders and freelancers, the "employer" is the individual's registered business. The authority chain would go: business domain → Companies House / state secretary of state → tax authority. Useful for visa applications where self-employed individuals currently struggle to prove legitimate work.
2. **Proof of enrollment (student equivalent)** — University confirms current enrollment for student visa renewals, travel, and discount eligibility. Same pattern: student carries verifiable letter, authority chain goes university → accrediting body → education ministry.
