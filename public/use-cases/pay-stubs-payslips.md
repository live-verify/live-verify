---
title: "Pay Stubs and Payslips"
category: "Professional & Educational Qualifications"
volume: "Very Large"
retention: "3-7 years (tax + employment disputes)"
slug: "pay-stubs-payslips"
verificationMode: "clip"
tags: ["pay-stub", "payslip", "income-verification", "employment", "payroll", "tax", "lending", "rental-application"]
furtherDerivations: 1
---

## What is a Pay Stub?

You're applying for a rental apartment. The landlord wants proof of income. You send a PDF of your latest pay stub. The landlord has no way to know if you edited it. You could have changed $3,200/month to $6,400/month in 30 seconds with any PDF editor. Pay stub fraud is one of the most common document frauds in existence — it's trivial to commit and nearly impossible to detect without calling the employer.

This isn't hypothetical. Fake pay stub generators are available online for $10. Mortgage brokers report seeing doctored stubs weekly. Landlords have no verification infrastructure — they look at the PDF, squint at the font, and hope for the best.

With Live Verify, the pay stub carries a `verify:` line bound to the employer's payroll domain. The landlord scans it, gets confirmation that yes, this is the real pay stub issued to this person for this period, and moves on. No phone calls to HR. No guessing. No fraud.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="paystub"></span>PINNACLE ENGINEERING GROUP, INC.
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

<span data-verify-line="paystub">verify:payroll.pinnacle-eng.com/stubs/v</span> <span verifiable-text="end" data-for="paystub"></span></pre>
</div>

## The Problem: Pay Stub Fraud

A landlord, lender, benefits officer or family court is handed a pay stub as proof of income and has to decide on it the same day. The document is easy to alter and hard to check: the only real test is calling the employer, which is slow and often skipped. A wrong figure means a tenancy or loan the applicant cannot afford, or benefits paid to someone who does not qualify.

- **PDF editing:** Open the PDF, change any number, save; a $2,500 net pay becomes $5,000 and most editors leave no obvious trace.
- **Fake pay stub generators:** Websites create realistic stubs for any employer name typed in, with plausible formatting, tax calculations and deduction breakdowns.
- **Inflated income for loan qualification:** The applicant earns less than the loan requires, so the stub is edited or generated to show more; the lender approves a loan the borrower cannot service.
- **Deflated income for benefits eligibility:** The reverse case: the applicant earns too much to qualify, so the stub is edited downward, and the agency cannot catch it without calling the employer.
- **Stale stubs from former employees:** Someone who left in January presents a December stub in March as if still employed; the stub is authentic but no longer reflects reality, and the endpoint returns NOT_EMPLOYED.

## What Is Checked

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

**Pattern:** Commercial

Payroll providers and employers issue pay stubs certifying employee earnings and deductions. The issuer is self-authorized as the payroll service provider or employer.

```
✓ payroll.pinnacle-eng.com/stubs/v — Issues verified pay stubs with earnings, deductions, and net pay
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Who Holds It

The employee is the carrier and presenter of the document.

**Rental applications:** The most common use case. Landlords want 2-3 recent pay stubs. Currently unverifiable. With Live Verify, the landlord scans each stub and confirms the income figures are real — in seconds, not days.

**Mortgage applications:** Lenders require pay stubs as part of income verification. Mortgage fraud driven by inflated pay stubs costs the industry billions annually. A verified stub eliminates the guesswork.

**Government benefits applications:** Welfare, housing assistance, Medicaid — all require proof of income. Applicants sometimes deflate their income to qualify. Verified stubs give the agency the real number.

**Child support and alimony proceedings:** Family courts order income disclosure. One party produces pay stubs. The other party has every reason to doubt them. Verification makes the stubs admissible evidence, not just allegations.

**Visa and immigration applications:** Many visa categories require proof of income above a threshold. A verified pay stub from the applicant's employer domain is stronger evidence than an unverifiable PDF.

## Who Checks It

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

## Who Issues It

**Issuer Types** (First Party)

**Payroll Providers:** ADP, Paychex, Gusto, Workday — these companies process payroll for millions of employers. They're the natural issuers of verified stubs, publishing hashes to their client's payroll subdomain.
**In-House Payroll:** Large employers (banks, governments, hospitals) that run payroll internally and publish verification on their own domain.
**Gig Platforms:** Uber, DoorDash, Upwork — technically earnings statements, not pay stubs, but the verification pattern is identical. See Further Derivations below.

## Privacy Salt

**High sensitivity.** Pay amounts are deeply private. Nobody should be able to enumerate an employer's payroll by brute-forcing amounts against the verification endpoint.

Without a salt, an attacker who knows someone works at Pinnacle Engineering could try hashing common pay amounts ($3,000, $3,100, $3,200...) against `payroll.pinnacle-eng.com` until they get a match. The salt — a random value unique to each stub, embedded in the verify line — makes this computationally infeasible. Every stub hashes differently even if two employees have the same gross pay.

The salt is also critical because pay stubs contain structured, predictable data. Unlike a free-text document, the fields and formats are constrained. This makes enumeration attacks more feasible without salt protection.

## Compared With the Alternatives

| Feature | Live Verify | Call the Employer | Plaid / Payroll API | Tax Returns | Trust the PDF |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Speed** | **Instant.** Scan and verify. | **Slow.** Days to reach the right person in HR. | **Minutes.** But requires setup. | **Weeks to months.** Annual filing only. | **Instant.** But meaningless. |
| **Privacy** | **High.** Employee controls what's shared. No credentials exposed. | **Medium.** HR may disclose more than intended. Employee may not know the call happened. | **Low.** Requires employee's payroll login. Scrapes full history, deductions, SSN. | **High.** But reveals everything on the return. | **N/A.** No verification occurs. |
| **Integrity** | **Cryptographic.** Every field is hash-protected. | **Verbal.** "She earns about $80k" — no paper trail, no precision. | **High.** Direct API to payroll system. | **High.** IRS/HMRC data. But 6-18 months old. | **Zero.** Any number can be changed. |
| **Coverage** | **Universal.** Any employer with a domain. | **Universal.** But requires the employer to answer. | **Limited.** Only employers using supported payroll providers. | **Universal.** But massively delayed. | **Universal.** But unverified. |
| **Detects Termination** | **Yes.** NOT_EMPLOYED status in real time. | **Sometimes.** If you reach the right person. | **Maybe.** If the employee's access is revoked. | **No.** Tax returns are historical. | **No.** |
| **Cost** | **Free for verifier.** Issuer pays. | **Free.** But costs time. | **$2-$10 per verification.** Plus credential risk. | **Free.** Via IRS transcript. But slow. | **Free.** And worthless. |

**Narrower conclusion:** Direct payroll APIs should remain primary where they are available, accepted, and proportionate. Live Verify is strongest when the pay stub or payslip PDF is already the artifact in circulation and the alternatives are invasive credential sharing, stale tax returns, or manual employer calls.

## Further Derivations

1. **Gig economy earnings statements** — Uber, DoorDash, Instacart, Upwork, Fiverr. These platforms issue earnings summaries that serve the same purpose as pay stubs but aren't technically payroll. Gig workers applying for apartments or loans face even more skepticism than salaried employees because their income is variable. Verified earnings statements from `drivers.uber.com` or `earnings.doordash.com` give landlords and lenders confidence in the reported figures.
2. **Commission and bonus statements** — Variable compensation is the hardest income to verify. A salesperson claims $200k total comp but their base is $60k — the rest is commission. A verified commission statement from the employer's payroll domain proves the variable component is real, not aspirational. Particularly valuable for mortgage qualification where lenders need to assess sustainable income.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
