---
title: "Pay Stubs and Payslips"
category: "Professional & Educational Qualifications"
volume: "Very Large"
retention: "3-7 years (tax + employment disputes)"
slug: "pay-stubs-payslips"
tags: ["pay-stub", "payslip", "income-verification", "employment", "payroll", "tax", "lending", "rental-application"]
furtherDerivations: 2
---

## What is a Pay Stub?

You're applying for a rental apartment. The landlord wants proof of income. You send a PDF of your latest pay stub. The landlord has no way to know if you edited it. You could have changed $3,200/month to $6,400/month in 30 seconds with any PDF editor. Pay stub fraud is one of the most common document frauds in existence — it's trivial to commit and nearly impossible to detect without calling the employer.

This isn't hypothetical. Fake pay stub generators are available online for $10. Mortgage brokers report seeing doctored stubs weekly. Landlords have no verification infrastructure — they look at the PDF, squint at the font, and hope for the best.

With Live Verify, the pay stub carries a `verify:` line bound to the employer's payroll domain. The landlord scans it, gets confirmation that yes, this is the real pay stub issued to this person for this period, and moves on. No phone calls to HR. No guessing. No fraud.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="paystub">[</span>PINNACLE ENGINEERING GROUP, INC.
1200 Industrial Parkway, Suite 400
Columbus, OH 43215
EIN: 31-4829173

─────────────────────────────────────────────────────────────
                     EARNINGS STATEMENT
─────────────────────────────────────────────────────────────

Employee:  MARTINEZ, SOFIA R.            Employee ID: PEG-08842
Pay Period: Feb 01, 2026 - Feb 15, 2026  Pay Date:    Feb 20, 2026
Pay Frequency: Bi-Weekly                 Status:      Full-Time

─────────────────────────────────────────────────────────────
EARNINGS                          CURRENT          YTD
─────────────────────────────────────────────────────────────
Regular (80.00 hrs @ $38.46)    $ 3,076.92     $ 12,307.68
Overtime (4.50 hrs @ $57.69)    $   259.61     $    519.22
─────────────────────────────────────────────────────────────
GROSS PAY                       $ 3,336.53     $ 12,826.90

─────────────────────────────────────────────────────────────
DEDUCTIONS                        CURRENT          YTD
─────────────────────────────────────────────────────────────
Federal Income Tax              $   467.12     $  1,795.77
State Income Tax (OH)           $   133.46     $    513.08
Social Security (6.2%)          $   206.86     $    795.26
Medicare (1.45%)                $    48.38     $    185.99
Health Insurance (Employee)     $   142.50     $    570.00
401(k) (6%)                     $   200.19     $    769.61
─────────────────────────────────────────────────────────────
TOTAL DEDUCTIONS                $ 1,198.51     $  4,629.71

═══════════════════════════════════════════════════════════════
NET PAY                         $ 2,138.02     $  8,197.19
═══════════════════════════════════════════════════════════════

Direct Deposit: ****6847 (Checking)      $ 2,138.02

This pay stub is a verified payroll record.
Alteration of earnings information is fraud.

<span data-verify-line="paystub">verify:payroll.pinnacle-eng.com/stubs/v</span> <span verifiable-text="end" data-for="paystub">]</span></pre>
</div>

## Data Verified

Employee name, employer name, pay period start and end dates, gross pay, net pay, pay frequency (weekly/bi-weekly/semi-monthly/monthly), employment status (full-time/part-time/contract).

**What is deliberately NOT included:** Specific deduction breakdowns (federal tax, state tax, 401(k) contributions, health insurance premiums). Those are between the employee and the employer. A landlord needs to know "this person earns $3,336.53 gross and takes home $2,138.02." They don't need to know the employee's tax bracket or retirement savings rate.

**Document Types:**
- **Standard Pay Stub** — Issued with each pay cycle, physical or PDF
- **Year-to-Date Summary** — Cumulative earnings for the calendar year
- **Final Pay Stub** — Last stub issued upon termination, includes PTO payout

## Verification Response

The endpoint returns the stub's authenticity and current employment status:

- **OK** — Authentic pay stub for the stated period. Employee is currently employed.
- **SUPERSEDED** — A corrected stub was issued for this pay period. The original contained an error (e.g., missed overtime, incorrect tax withholding). The corrected version has its own verify line.
- **NOT_EMPLOYED** — Person is no longer employed by this organization. The stub was authentic when issued, but the employee has since departed.
- **404** — No matching record. Either the stub is fabricated, the details have been altered, or the data has been purged past the retention window.

## Authority Chain

The authority chain applies to pay stubs the same way it applies to proof of employment. The employer's payroll domain is the primary authority. The secondary authority is the tax agency — HMRC (UK), IRS (US), CRA (Canada) — which confirms the employer is a registered entity that files payroll taxes. The chain terminates at statute.

A stub from `payroll.pinnacle-eng.com` gets its credibility reinforced when the IRS confirms Pinnacle Engineering Group is a registered employer filing quarterly 941s. A stub from a shell company with no tax filings breaks at the second link.

See [Proof of Employment](view.html?doc=proof-of-employment) for the full authority chain discussion with worked examples.

## Second-Party Use

The **employee** is the carrier and presenter of the document.

**Rental applications:** The most common use case. Landlords want 2-3 recent pay stubs. Currently unverifiable. With Live Verify, the landlord scans each stub and confirms the income figures are real — in seconds, not days.

**Mortgage applications:** Lenders require pay stubs as part of income verification. Mortgage fraud driven by inflated pay stubs costs the industry billions annually. A verified stub eliminates the guesswork.

**Government benefits applications:** Welfare, housing assistance, Medicaid — all require proof of income. Applicants sometimes deflate their income to qualify. Verified stubs give the agency the real number.

**Child support and alimony proceedings:** Family courts order income disclosure. One party produces pay stubs. The other party has every reason to doubt them. Verification makes the stubs admissible evidence, not just allegations.

**Visa and immigration applications:** Many visa categories require proof of income above a threshold. A verified pay stub from the applicant's employer domain is stronger evidence than an unverifiable PDF.

## Third-Party Use

**Landlords and Property Managers**
Tenant screening. The landlord verifies income against the employer's payroll domain. No more calling HR, no more "can you fax us a letter," no more trusting a PDF that anyone could have edited.

**Mortgage Lenders and Underwriters**
Income verification for loan qualification. Verified stubs replace the current process of manual review, employer callbacks, and hope. The authority chain confirms the employer is real — critical for preventing loans backed by fabricated employment.

**Government Benefits Agencies**
Welfare offices, housing authorities, Medicaid eligibility — all require income documentation. Verified stubs prevent both inflation (to get more benefits than entitled) and deflation (to qualify for programs the applicant shouldn't receive). Agencies currently have no way to verify stubs without contacting employers individually.

**Family Courts**
Child support and alimony calculations depend on accurate income figures. Both parties have incentive to misrepresent. Verified pay stubs give the court reliable numbers. A SUPERSEDED status alerts the court that a correction was issued — potentially significant if one party submitted the original and concealed the correction.

**Immigration Authorities**
Income thresholds matter for sponsor eligibility (e.g., I-864 Affidavit of Support in the US requires income above 125% of the poverty line). Verified stubs prove the sponsor actually earns what they claim.

**Auto Loan and Consumer Lenders**
Income verification for vehicle financing and personal loans. The "stated income" loan era ended badly. Verified stubs bring back trust without bringing back the fraud.

## Verification Architecture — The Pay Stub Fraud Problem

Pay stub fraud is uniquely dangerous because the documents are so easy to fake and so hard to verify.

- **PDF editing** — Trivial. Open the PDF, change any number, save. A $2,500 net pay becomes $5,000 in seconds. Most PDF editors don't leave detectable traces.
- **Fake pay stub generators** — Websites that create realistic stubs for any employer name you type in. Some charge $5-$20. They produce stubs with proper formatting, tax calculations, and deduction breakdowns that look completely authentic.
- **Inflated income for loan qualification** — The classic mortgage fraud. Applicant needs to show $80k/year to qualify for the loan. They actually earn $45k. They edit the stub or generate a fake one. The lender approves the loan. The borrower defaults. Everyone loses.
- **Deflated income for benefits eligibility** — The reverse fraud. Applicant earns too much to qualify for housing assistance. They edit the stub downward. The benefits agency has no way to catch it without calling the employer — which they often don't have time to do.
- **Stale stubs from terminated employees** — Employee was fired in January. In March, they present their December pay stub to a landlord as if they're still employed. The stub is authentic — it just doesn't reflect reality anymore. Live Verify returns NOT_EMPLOYED.

**Issuer Types** (First Party)

**Payroll Providers:** ADP, Paychex, Gusto, Workday — these companies process payroll for millions of employers. They're the natural issuers of verified stubs, publishing hashes to their client's payroll subdomain.
**In-House Payroll:** Large employers (banks, governments, hospitals) that run payroll internally and publish verification on their own domain.
**Gig Platforms:** Uber, DoorDash, Upwork — technically earnings statements, not pay stubs, but the verification pattern is identical. See Further Derivations below.

## Privacy Salt

**High sensitivity.** Pay amounts are deeply private. Nobody should be able to enumerate an employer's payroll by brute-forcing amounts against the verification endpoint.

Without a salt, an attacker who knows someone works at Pinnacle Engineering could try hashing common pay amounts ($3,000, $3,100, $3,200...) against `payroll.pinnacle-eng.com` until they get a match. The salt — a random value unique to each stub, embedded in the verify line — makes this computationally infeasible. Every stub hashes differently even if two employees have the same gross pay.

The salt is also critical because pay stubs contain structured, predictable data. Unlike a free-text document, the fields and formats are constrained. This makes enumeration attacks more feasible without salt protection.

## Competition

| Feature | Live Verify | Call the Employer | Plaid / Payroll API | Tax Returns | Trust the PDF |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Speed** | **Instant.** Scan and verify. | **Slow.** Days to reach the right person in HR. | **Minutes.** But requires setup. | **Weeks to months.** Annual filing only. | **Instant.** But meaningless. |
| **Privacy** | **High.** Employee controls what's shared. No credentials exposed. | **Medium.** HR may disclose more than intended. Employee may not know the call happened. | **Low.** Requires employee's payroll login. Scrapes full history, deductions, SSN. | **High.** But reveals everything on the return. | **N/A.** No verification occurs. |
| **Integrity** | **Cryptographic.** Every field is hash-protected. | **Verbal.** "She earns about $80k" — no paper trail, no precision. | **High.** Direct API to payroll system. | **High.** IRS/HMRC data. But 6-18 months old. | **Zero.** Any number can be changed. |
| **Coverage** | **Universal.** Any employer with a domain. | **Universal.** But requires the employer to answer. | **Limited.** Only employers using supported payroll providers. | **Universal.** But massively delayed. | **Universal.** But unverified. |
| **Detects Termination** | **Yes.** NOT_EMPLOYED status in real time. | **Sometimes.** If you reach the right person. | **Maybe.** If the employee's access is revoked. | **No.** Tax returns are historical. | **No.** |
| **Cost** | **Free for verifier.** Issuer pays. | **Free.** But costs time. | **$2-$10 per verification.** Plus credential risk. | **Free.** Via IRS transcript. But slow. | **Free.** And worthless. |

**Why Live Verify wins here:** The current income verification ecosystem is broken. Plaid requires employees to hand over their payroll credentials to a third party — most people find this invasive, and many employers block it. Calling the employer takes days and produces unreliable verbal confirmation. Tax returns are a year old on the day they're filed. And trusting the PDF is not verification at all. Live Verify provides cryptographic proof of income without requiring the employee to surrender credentials or the verifier to make phone calls.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Issuer cannot deny issuing the document
- **Timestamp proof:** Document existed at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if issuer's systems go down

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party" — infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Gig economy earnings statements** — Uber, DoorDash, Instacart, Upwork, Fiverr. These platforms issue earnings summaries that serve the same purpose as pay stubs but aren't technically payroll. Gig workers applying for apartments or loans face even more skepticism than salaried employees because their income is variable. Verified earnings statements from `drivers.uber.com` or `earnings.doordash.com` give landlords and lenders confidence in the reported figures.
2. **Commission and bonus statements** — Variable compensation is the hardest income to verify. A salesperson claims $200k total comp but their base is $60k — the rest is commission. A verified commission statement from the employer's payroll domain proves the variable component is real, not aspirational. Particularly valuable for mortgage qualification where lenders need to assess sustainable income.
