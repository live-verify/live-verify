---
title: "Credit Reports and Credit Scores"
category: "Banking & Financial Services"
volume: "Very Large"
retention: "7 years (Fair Credit Reporting Act)"
slug: "credit-reports-scores"
verificationMode: "clip"
tags: ["credit-report", "credit-score", "fico", "equifax", "experian", "transunion", "lending", "rental-application", "employment-screening"]
furtherDerivations: 2
---

## What is a Credit Report?

Your credit report is the single most consequential document most people never see — until they need it. It determines whether you get the mortgage, the apartment, the car loan, sometimes the job. Credit bureaus issue them; consumers receive them; third parties make life-altering decisions based on them. The problem: a PDF of a credit report is trivially editable. A 520 score becomes a 780 in seconds. And the recipient has no practical way to verify it without pulling their own copy (which requires the subject's SSN and consent).

With Live Verify, the credit report carries a verify line bound to the bureau's domain. The landlord or lender scans the report the applicant provided and gets confirmation from equifax.com or experian.com that this is the authentic, unaltered report for this individual as of the stated date.

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="creditreport"></span>EQUIFAX CREDIT REPORT SUMMARY<br>
  ────────────────────────────────<br>
  Consumer: MARIA T. DELGADO<br>
  Report Date: February 15, 2026<br>
  Report #: EFX-2026-04419827<br>
  <br>
  FICO Score 8: 742<br>
  Score Range: 300–850<br>
  <br>
  Open Accounts: 11<br>
  Total Balances: $187,420<br>
  Payment History: 99% on-time<br>
  Hard Inquiries (24 mo): 2<br>
  Derogatory Marks: 0<br>
  Oldest Account: 14 years 3 months<br>
  Credit Utilization: 22%<br>
  ────────────────────────────────<br>
  <span data-verify-line="creditreport">verify:equifax.com/report</span> <span verifiable-text="end" data-for="creditreport"></span>
</div>

## Data Verified

**Consumer name**, **report date**, **credit score**, **score model** (FICO 8, VantageScore 3.0), **number of open accounts**, **total balances**, **payment history percentage**, **number of hard inquiries**, **derogatory marks count**.

**NOT included:** Individual account details, SSN, full account numbers. The verification hash covers the summary — enough to confirm the score and overall credit profile without exposing the granular trade-line data that makes identity theft so profitable.

## Verification Response

- **OK** — Authentic report as of the stated date
- **UPDATED** — A newer report is available (credit data changes frequently; balances update monthly, new accounts appear, inquiries drop off)
- **DISPUTED** — Consumer has an active dispute on file (the report may change pending investigation)
- **FROZEN** — Consumer has a security freeze; limited data available
- **404** — No matching record (forged report, wrong report number, or OCR error)

## Second-Party Use

The **consumer**. The person whose credit is being reported.

**Proving creditworthiness to landlords:** Apartment applicants routinely submit credit reports. Landlords currently have two options: trust the PDF or pay to pull their own copy. Live Verify gives them a third: scan what the applicant provided and confirm it's real. No SSN collection, no hard inquiry, no cost.

**Preparing for mortgage applications:** Consumers pull their own reports months before applying. A verified copy lets them show a mortgage broker exactly what the bureau reported — useful when negotiating rates and identifying errors early.

**Disputing inaccuracies:** When a bureau reports incorrect information and then claims they didn't, the consumer has a verified, timestamped copy of what was actually reported. This is evidence in CFPB complaints and litigation.

**Sharing with financial advisors:** Clients share credit reports with advisors for debt management planning. Verification confirms the advisor is working from real data, not an optimistic summary the client doctored to avoid embarrassment.

## Third-Party Use

**Landlords/property managers** — Verifying applicant-provided reports without pulling a fresh one (saves $30-50 per application, avoids collecting SSNs)

**Mortgage lenders** — Cross-checking consumer-provided reports against what they pull; flagging discrepancies early

**Auto lenders** — Confirming creditworthiness at the dealership before running their own pull

**Credit card issuers** — Pre-qualification confirmations where the consumer shares their own report

**Employers (background screening)** — Some states allow credit checks for certain positions; verification proves the report is authentic without requiring the employer to pull one

**Insurance underwriters** — Credit-based insurance scores affect premiums; verification confirms the score the applicant claims

**Utility companies** — Deposit decisions based on credit; verification avoids the cost of pulling a full report for a $200 deposit decision

## Verification Architecture — The Credit Report Fraud Problem

**The core vulnerability:** Credit reports are high-stakes documents delivered as unprotected PDFs. The incentive to alter them is enormous, and the tools required are trivial.

- **PDF editing to inflate scores** — The most common fraud. Change "520" to "780" in any PDF editor. Landlords and lenders see thousands of reports; they can't visually distinguish a real 780 from an edited one.
- **Fake credit report generators** — Websites and software that produce realistic-looking credit reports from scratch. Some charge $50-100 per fake report. The formatting is indistinguishable from genuine bureau output.
- **Synthetic identity fraud** — Fabricated identities with built credit histories. The "person" doesn't exist, but their credit file does. A verified report bound to the bureau's domain confirms the report was actually issued, though it doesn't solve the synthetic identity problem upstream.
- **"Credit repair" scams using altered reports** — Shady operators show clients "before and after" reports where the "after" is simply an edited PDF. The client pays thousands for nothing. Verification proves whether the "improved" report actually came from the bureau.
- **Stale reports presented as current** — Credit data changes monthly. A report from six months ago may show a score 100 points higher than today's. The UPDATED status catches this — the bureau flags that a newer report exists.
- **Selective sharing** — A consumer has three bureau reports and shares only the best one. This isn't fraud per se, but verification timestamps prevent presenting a six-month-old Equifax report (score: 760) when the current Equifax report (score: 640) tells a different story.

**The fix:** Bureau issues report with verify line. Consumer shares report with landlord/lender. Recipient scans the verify line. Bureau's domain confirms: yes, this is the authentic report we issued for this consumer on this date, with this score. No SSN exchange, no consent form, no cost to the verifier, no hard inquiry on the consumer's file.

## Privacy Salt

**Critical.** Credit data is extremely sensitive. The hash must be salted to prevent enumeration attacks. Without salt, an attacker who knows the bureau's endpoint could try hashing combinations of common names and dates to discover whether specific individuals have credit reports at specific bureaus, what their approximate score ranges are, or whether they have derogatory marks. The salt makes this computationally infeasible — you need the actual document to produce the correct hash.

## Authority Chain

**Pattern:** Regulated

Credit bureaus are regulated consumer reporting agencies — licensed by financial regulators under statute.

US chain (Equifax, Experian, TransUnion → CFPB → Fair Credit Reporting Act):

```
✓ equifax.com/report — Issues consumer credit reports in the US
  ✓ consumerfinance.gov/register — Supervises consumer reporting agencies
    ✓ usa.gov/verifiers — US federal government root namespace
```

UK chain (Experian UK, Equifax UK, TransUnion UK → FCA → Consumer Credit Act 1974):

```
✓ experian.co.uk/consumer/verify — Issues consumer credit reports in the UK
  ✓ fca.org.uk/register — Regulates UK consumer credit firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition

| Feature | Live Verify | Pull a Fresh Report | Trust the PDF | Third-Party Verification Services | Consumer-Permissioned Data APIs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Verifiable** | **Yes.** Domain-bound to the bureau. | **Yes.** Direct from source. | **No.** Trivially editable. | **Slow.** Days turnaround. | **Yes.** But requires credential sharing. |
| **Requires SSN** | **No.** Scan what the consumer provided. | **Yes.** Must collect SSN and consent. | **No.** But also no verification. | **Yes.** Full application process. | **No.** But requires bank login credentials. |
| **Creates Hard Inquiry** | **No.** No credit pull occurs. | **Yes.** Hard inquiry hits the consumer's file. | **No.** | **Yes.** | **No.** |
| **Cost to Verifier** | **Free.** GET request. | **$15-50** per pull. | **Free.** But worthless. | **$25-100+** per verification. | **API fees** per connection. |
| **Speed** | **Instant.** 5-second scan. | **Minutes to hours.** Account setup, consent, processing. | **Instant.** But unverified. | **1-5 business days.** | **Minutes.** OAuth flow + API call. |
| **Privacy** | **High.** No data leaves the consumer's hands. | **Low.** SSN collected, stored by verifier. | **N/A.** | **Low.** Full credit pull by third party. | **Very low.** Consumer shares bank login credentials with third party. |
| **Recency** | **Flagged.** UPDATED status if report is stale. | **Current.** Fresh pull. | **Unknown.** Could be months old. | **Current.** Fresh pull. | **Current.** Direct API connection. |

**Why Live Verify wins here:** The status quo forces a brutal tradeoff. Either the verifier trusts an unverifiable PDF, or they collect the consumer's SSN and pay for a fresh pull (creating a hard inquiry that damages the consumer's score). Live Verify eliminates this tradeoff entirely. The consumer controls their data, the verifier gets cryptographic confirmation, and nobody's SSN ends up in another database.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

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

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Further Derivations

1. **Business credit reports** — Dun & Bradstreet PAYDEX scores, Experian Business credit reports, Equifax Business. Same verification architecture, different data (payment history with suppliers, legal filings, company financials). Business-to-business lending decisions depend on these.
2. **Tenant screening reports** — Combined credit + eviction history + criminal background. The landlord-side equivalent: a bundled report from services like TransUnion SmartMove or Experian RentBureau. Verification confirms the screening company actually produced this combined report with these results.
