---
title: "Bank Fraud Report Acknowledgments"
category: "Banking & Payments"
volume: "Large"
retention: "7-10 years (regulatory requirement)"
slug: "bank-fraud-report-acknowledgments"
verificationMode: "clip"
tags: ["bank-fraud", "unauthorized-transactions", "regulation-e", "fraud-report", "account-takeover", "ach-fraud", "wire-fraud", "provisional-credit", "consumer-protection"]
furtherDerivations: 2
---

## What is a Bank Fraud Report Acknowledgment?

When a customer discovers unauthorized transactions — their accounts drained, cards used fraudulently, wires sent to strangers — the bank's fraud department takes a report. The customer receives... what, exactly? A phone call saying "we're looking into it." Maybe a case number scrawled on a Post-it. Maybe an email that says "allow 10 business days." Maybe nothing at all.

The problem is acute. The customer is in crisis. Their rent is due. Their direct debits are bouncing. They need to know: what did the bank actually commit to? When did they report it? What are their regulatory rights? What happens next?

Under **Regulation E** (Electronic Fund Transfer Act) in the US, banks have strict obligations once fraud is reported: investigate within 10 business days (or 20 for new accounts), issue provisional credit if the investigation takes longer, and provide written results. Under the UK's **Payment Services Regulations 2017**, the bank must refund unauthorized transactions by the end of the next business day unless they suspect the customer is complicit.

In practice, these obligations are routinely violated or obscured. The customer has no verified record of what was reported, when it was reported, or what the bank said it would do. If the bank later claims "you didn't report it within 60 days" or "we never received that call," the customer has no proof. It's their word against a regulated institution with a legal department.

With Live Verify, the bank issues a verified fraud report acknowledgment — a plain-text document carrying a verify line. The customer has cryptographic proof of exactly what was reported, what the bank's initial findings were, and what regulatory protections apply. If the bank later drags its feet, denies the report, or fails to issue provisional credit, the customer has a timestamped, domain-verified receipt.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #0a3d7c; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="fraudack">[</span>CHASE FRAUD DEPARTMENT</div>
      <div style="font-size: 0.8em; opacity: 0.85; margin-top: 2px;">Fraud Report Acknowledgment</div>
    </div>
    <div style="text-align: right; font-size: 0.8em;">
      Case: FRD-2026-03-08841<br>
      Reported: March 6, 2026
    </div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6; color: #333;">
    <p style="margin-top: 0;"><strong>Account Holder:</strong> SARAH M. KOWALSKI<br>
    <strong>Account:</strong> ****4418 (Checking) and ****4419 (Savings)<br>
    <strong>Reported Via:</strong> Phone (888-978-2670) — 14:22 ET</p>
    <div style="background: #fef3f3; border: 1px solid #e57373; padding: 15px; margin: 15px 0;">
      <p style="margin: 0 0 8px; font-weight: bold; color: #c62828;">UNAUTHORIZED TRANSACTIONS REPORTED</p>
      <p style="margin: 0; font-size: 0.9em;">
        3 ACH debits totaling $8,240.00 (March 3-5)<br>
        1 wire transfer: $12,500.00 (March 4)<br>
        2 Zelle transfers totaling $4,000.00 (March 5)<br>
        <strong>Total disputed: $24,740.00</strong>
      </p>
    </div>
    <div style="background: #f5f5f5; border: 1px solid #ddd; padding: 15px; margin: 15px 0;">
      <p style="margin: 0 0 8px; font-weight: bold;">ACTIONS TAKEN</p>
      <p style="margin: 0; font-size: 0.9em;">
        Account frozen pending investigation<br>
        New debit card issued (arrives 3-5 business days)<br>
        Online banking credentials reset required<br>
        ACH block placed on reported originator IDs
      </p>
    </div>
    <div style="background: #e8f5e9; border: 1px solid #81c784; padding: 15px; margin: 15px 0;">
      <p style="margin: 0 0 8px; font-weight: bold; color: #2e7d32;">YOUR REGULATORY RIGHTS (REG E)</p>
      <p style="margin: 0; font-size: 0.85em;">
        We must complete our investigation within 10 business days of this report.<br>
        If we need more time, we will issue provisional credit within 10 business days.<br>
        You will receive written results when our investigation concludes.<br>
        You may file a complaint with the CFPB at consumerfinance.gov or the OCC at helpwithmybank.gov.
      </p>
    </div>
  </div>
  <div style="padding: 0 20px 20px 20px;">
    <div style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Chase doesn't yet offer verification endpoints, so this is illustrative">
      verify:chase.com/fraud/v <span verifiable-text="end" data-for="fraudack">]</span>
    </div>
  </div>
</div>

## The Clock Problem

Regulation E creates a timeline that favors the informed. Key deadlines:

| Deadline | Consequence |
|---|---|
| **60 days** from statement date | Customer must report unauthorized EFTs within 60 days or lose protection entirely |
| **10 business days** from report | Bank must complete investigation (20 days for new accounts) |
| **10 business days** from report | If investigation incomplete, bank must issue provisional credit |
| **3 business days** from conclusion | Bank must notify customer of results |
| **1 business day** (UK PSR 2017) | UK banks must refund unauthorized transactions by end of next business day |

Banks know these deadlines. Customers usually don't. A verified acknowledgment with the report date is the customer's proof that the clock started — and when it started.

Without verification, the bank can claim the report was made on March 10 instead of March 6, shifting every deadline by four days. With a verified, timestamped acknowledgment, the date of report is cryptographically fixed.

## Verification Response

| Payload | Class | Meaning |
|---|---|---|
| `RECEIVED` | affirming | Fraud report received and acknowledged |
| `UNDER_INVESTIGATION` | affirming | Active investigation in progress |
| `PROVISIONAL_CREDIT_ISSUED` | affirming | Provisional credit applied to account |
| `RESOLVED_IN_FAVOR` | affirming | Investigation complete — customer's claim upheld, funds restored |
| `RESOLVED_AGAINST` | denying | Investigation complete — claim denied |
| `PARTIALLY_RESOLVED` | affirming | Some transactions refunded, others denied |
| `ESCALATED` | affirming | Referred to law enforcement or regulatory body |

The lifecycle: `RECEIVED` → `UNDER_INVESTIGATION` → one of `PROVISIONAL_CREDIT_ISSUED` / `RESOLVED_IN_FAVOR` / `RESOLVED_AGAINST` / `PARTIALLY_RESOLVED`.

`PROVISIONAL_CREDIT_ISSUED` is particularly important — it proves the bank met its Reg E obligation to provide interim relief. If the bank later resolves against the customer, the provisional credit is reversed — but the customer has a verified record that it was issued, preventing disputes about what happened when.

## Data Verified

Account holder name, case number, date and time reported, reporting channel, affected account(s), transaction count and total disputed amount, actions taken, regulatory rights stated. The hash does NOT contain full account numbers or transaction-level detail — only the acknowledgment summary.

**Document Types:**
- **Initial Fraud Report Acknowledgment** — Issued when the customer first reports unauthorized activity.
- **Investigation Status Update** — Periodic updates during the investigation window.
- **Provisional Credit Notice** — Confirming interim funds have been applied.
- **Final Resolution Letter** — The outcome of the investigation with detailed findings.

## Second-Party Use

The **Account Holder** (fraud victim) benefits from verification.

**Regulatory Complaints:** Filing a complaint with the CFPB or OCC requires evidence that the bank was notified and when. A verified acknowledgment is stronger than "I called them on March 6 and they said they'd look into it." The CFPB received over 1.3 million complaints in 2023 — banking and credit complaints are the largest categories.

**Credit Bureau Disputes:** Unauthorized transactions may cause missed payments, overdrafts, or negative balances that hit the customer's credit report. Disputing these with Equifax, Experian, or TransUnion requires proof that the transactions were fraudulent and reported. A verified fraud acknowledgment from the bank's own domain is direct evidence.

**Landlord/Employer Explanation:** A customer whose rent bounced or payroll deposit failed due to a frozen account can show a verified fraud acknowledgment to explain the disruption — without revealing the details of the fraud or account balances.

**Legal Proceedings:** If the bank fails to meet its Reg E obligations and the customer sues, the verified acknowledgment is evidence of when the bank was put on notice.

## Third-Party Use

**Regulators (CFPB / OCC / State Banking Departments)**
A verified acknowledgment proves the bank acknowledged the fraud report at a specific date and time. When a customer files a complaint alleging the bank failed to investigate within 10 business days, the regulator can verify the report date independently rather than relying on the bank's internal records.

**Credit Bureaus (Equifax / Experian / TransUnion)**
When a customer disputes a negative entry caused by fraud, the credit bureau currently contacts the bank to verify — a process that takes 30 days and often results in the bank simply confirming the negative mark. A verified fraud acknowledgment from the bank's own domain, predating the negative entry, shifts the burden: the bank already acknowledged these transactions were disputed as unauthorized.

**Law Enforcement**
Police and FBI investigating account takeover fraud need to establish timelines. A verified acknowledgment proves when the victim reported the fraud to their bank, which may differ from when the bank filed a Suspicious Activity Report (SAR) or contacted law enforcement.

**Other Financial Institutions**
If the fraud involved transfers to accounts at other banks, those banks' fraud departments can verify that the originating bank has acknowledged the fraud — useful for coordinating recovery of funds that may still be in transit or in a mule account.

**Attorneys**
Consumer protection attorneys handling Reg E violations need proof of the bank's obligations and timeline. A verified acknowledgment that explicitly states the customer's regulatory rights is evidence that the bank was aware of its obligations from day one.

## Verification Architecture

**The "We Never Received That Report" Problem**

- **Disputed report dates** — The bank claims the customer reported on March 10 (within 10-day window) when the customer actually reported on March 6 (window has expired). Without verification, the bank's internal records prevail.
- **Vanishing case numbers** — The bank's system "loses" the original case, or the case is closed and reopened under a new number, resetting all timelines.
- **Selective documentation** — The bank's internal notes omit key details the customer reported (e.g., that the customer mentioned a specific suspicious email or phone call), which later proves relevant to the investigation.
- **Provisional credit denial** — The bank claims it completed its investigation within 10 business days (so no provisional credit was owed) when the investigation was actually still open.

**Issuer Types** (First Party)

**National Banks:** (Chase, Bank of America, Wells Fargo, Citibank) — regulated by the OCC.
**State-Chartered Banks:** (local and regional banks) — regulated by state banking departments and the FDIC.
**Credit Unions:** (federally insured) — regulated by the NCUA.
**UK Banks:** (HSBC UK, Barclays, NatWest, Lloyds) — regulated by the FCA under Payment Services Regulations 2017.

## Authority Chain

**Pattern:** Regulated

Banks issue fraud report acknowledgments as part of their statutory obligations under consumer protection law.

US chain (national banks → OCC → federal law):

```
✓ chase.com/fraud/v — Issues fraud report acknowledgments for account holders
  ✓ occ.gov/verify — Regulates national banks and federal savings associations
    ✓ treasury.gov/verifiers — US Treasury Department root namespace
```

US chain (state-chartered banks → FDIC → federal law):

```
✓ regions.com/fraud/v — Issues fraud report acknowledgments for account holders
  ✓ fdic.gov/verify — Regulates state-chartered insured banks
    ✓ treasury.gov/verifiers — US Treasury Department root namespace
```

UK chain (banks → FCA → statute):

```
✓ hsbc.co.uk/fraud/v — Issues fraud report acknowledgments for account holders
  ✓ fca.org.uk/register — Regulates UK payment service providers
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen — which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (case number, report date, disputed amount, status changes)
- Does **NOT** receive plaintext or sensitive personal information (no account numbers, no transaction details)
- Provides an immutable, timestamped audit trail — available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** Bank cannot deny receiving the fraud report
- **Timestamp proof:** Report existed at a specific date and time — critical for Reg E deadlines
- **Regulatory audit:** CFPB and OCC can inspect the witness ledger for systemic delays in fraud investigation
- **Resilience:** Verification works even if the bank's systems go down

Witnessing is particularly valuable here because the bank is both the issuer of the acknowledgment *and* the party with an incentive to deny or delay it. An independent witness creates a record the bank cannot unilaterally alter.

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party" — infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the bank
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Voluntary Witnessing

This use case is a strong candidate for **voluntary witnessing** by the account holder. The bank has a structural incentive to minimize fraud payouts. A customer who suspects the bank may later deny or delay their obligations can engage a witnessing organization to independently fetch and record the verification endpoint immediately after receiving the acknowledgment.

The witnessing organization performs its own GET against the bank's verification URL, records the HTTP response (including the `RECEIVED` status and timestamp), and stores this in its own immutable ledger. If the bank later claims "we completed the investigation within 10 days" when it actually took 30, the witness can attest to the original report date and status timeline.

See [Witnessing and Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full witnessing protocol.

## Competition vs. Phone Records

| Feature | Live Verify | Phone Records / Emails | Bank's Internal System |
| :--- | :--- | :--- | :--- |
| **Proof of report date** | **Cryptographic.** Timestamped hash on bank's domain. | **Weak.** Call logs prove a call happened, not what was said. | **Bank-controlled.** They can edit their own records. |
| **Content proof** | **Exact.** Hash covers what was acknowledged. | **None.** No record of what was discussed. | **Opaque.** Customer can't see internal notes. |
| **Regulatory filing** | **Direct evidence.** Attach to CFPB/OCC complaint. | **Circumstantial.** "I called them." | **Adversarial.** Bank produces its own version. |
| **Credit bureau disputes** | **Authoritative.** Bank's own domain confirms fraud was reported. | **Indirect.** Bureau must contact bank anyway. | **Conflicted.** Bank confirms to bureau on its own timeline. |
| **Permanence** | **Snapshot.** Immutable hash. | **Ephemeral.** Voicemails deleted, emails buried. | **Mutable.** Internal systems change. |

**Why Live Verify wins here:** The fundamental asymmetry. The bank has lawyers, compliance teams, and complete control over its own records. The customer has a phone call and a memory. Live Verify gives the customer a verified receipt from the bank's own domain — evidence the bank cannot deny without denying its own infrastructure.

## International Equivalents

| Country | Consumer Protection | Regulator | Key Difference |
|---|---|---|---|
| **US** | Regulation E (EFTA) — 10 business day investigation window | CFPB (complaints), OCC (national banks), FDIC (state banks), NCUA (credit unions) | Multiple regulators; provisional credit required if investigation exceeds 10 days |
| **UK** | Payment Services Regulations 2017 — refund by end of next business day | FCA, Financial Ombudsman Service (FOS) | Faster refund obligation; FOS provides free dispute resolution |
| **EU** | Payment Services Directive 2 (PSD2) — refund immediately | National regulators (BaFin, AMF, etc.) | Harmonized across EU; strong customer authentication (SCA) reduces fraud |
| **Canada** | No federal equivalent to Reg E — governed by voluntary codes | FCAC (Financial Consumer Agency of Canada) | Weaker consumer protections; bank-by-bank policies |
| **Australia** | ePayments Code — voluntary but widely adopted | AFCA (Australian Financial Complaints Authority) | Voluntary code; AFCA provides binding dispute resolution |

## Further Derivations

1. **Investigation status updates** — As the investigation progresses, the bank issues updated acknowledgments with new statuses. Each is independently verifiable, creating a timestamped audit trail of the bank's investigation timeline. A customer who received `UNDER_INVESTIGATION` on March 6 and still has no `RESOLVED_*` status 30 days later has verified proof of Reg E violation.
2. **Cross-institution fraud reports** — When fraud spans multiple banks (e.g., unauthorized wire from Chase to a mule account at another bank), each bank's fraud acknowledgment is independently verifiable. A coordinated recovery effort can be documented with verified receipts from all involved institutions.
