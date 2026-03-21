---
title: "Pension Transfer Value Statements"
category: "Investment & Fintech"
volume: "Large"
retention: "Guarantee period"
slug: "pension-transfer-value-statements"
verificationMode: "clip"
tags: ["pension", "transfer-value", "CETV", "pension-scam", "defined-benefit", "divorce", "pension-sharing", "retirement", "IFA", "FCA", "TPR"]
furtherDerivations: 1
---

## The Problem

Pension transfer value statements tell a member what their defined benefit (DB) pension is worth as a lump sum if they transfer out. These statements are issued as letters or PDFs — formats that are straightforward to alter. Pension scams exploit this: a fraudster shows the victim a fabricated transfer value to make a scam scheme look attractive, or inflates the value to justify excessive advisory fees. The victim has no quick way to confirm the numbers came from the actual pension scheme.

The problem extends beyond fraud. Divorce proceedings require accurate pension valuations for pension sharing orders, and courts rely on Cash Equivalent Transfer Values (CETVs) that arrive as unverifiable documents. Financial advisers building retirement plans face the same gap: the numbers matter, but the document carrying them cannot be independently confirmed without contacting the scheme administrator directly — a process that takes weeks.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="pensiontv"></span>PENSION TRANSFER VALUE
Scheme:         Northbridge DB Pension Scheme
Member Ref:     NB-441882
Transfer Value: GBP 342,000.00
Guarantee Date: 21 Mar 2026
Valid Until:    21 Jun 2026 (3-month guarantee)
Scheme Status:  OPEN TO TRANSFERS
<span data-verify-line="pensiontv">verify:northbridgepensions.co.uk/transfer-values/v</span> <span verifiable-text="end" data-for="pensiontv"></span></pre>
</div>

## Data Verified

Scheme name, member reference, cash equivalent transfer value (CETV), guarantee date, guarantee expiry date, and scheme transfer status.

## Data Visible After Verification

Shows the issuer domain (`northbridgepensions.co.uk`, `railwayspensions.co.uk`, `uss.co.uk`) and current statement status.

**Status Indications:**
- **Current** — Transfer value is within the guarantee period and the scheme remains open to transfers.
- **Expired** — The guarantee period has passed; a new CETV must be requested.
- **Superseded** — A newer transfer value statement has been issued for this member.
- **Scheme Closed to Transfers** — **ALERT:** The scheme is no longer accepting transfer-out requests. This may indicate a scheme in wind-up or under a Pensions Regulator order.

## Second-Party Use

The **Scheme Member** benefits from a verifiable transfer value statement in several contexts.

**Retirement Planning:** Presenting a verified CETV to an independent financial adviser so the adviser can give accurate guidance on whether transferring out is appropriate, without waiting for a separate confirmation from the scheme.

**Divorce Proceedings:** Providing a verified transfer value to a solicitor for inclusion in a pension sharing order application. The other party's legal team can confirm the value independently, reducing disputes over pension assets.

## Third-Party Use

**Receiving Pension Schemes / SIPP Providers**
**Transfer-In Due Diligence:** When a member requests a transfer, the receiving scheme must confirm the transfer value is genuine. A verified statement from the ceding scheme provides immediate confirmation, reducing the window in which a scam intermediary could substitute fabricated documents.

**Independent Financial Advisers (IFAs)**
**Transfer Advice:** Under FCA rules, members with DB pensions above the advice threshold must take regulated advice before transferring. The IFA needs confidence that the CETV they are analysing is the real figure issued by the scheme. A verified statement removes the risk of advising on a manipulated number.

**Divorce Solicitors / Family Courts**
**Pension Sharing Orders:** Pension assets are often the second-largest marital asset after the home. Courts rely on CETVs to determine the pension share. A verified statement ensures the figure presented to the court has not been altered by either party.

**FCA / The Pensions Regulator (TPR)**
**Scam Investigation:** When investigating suspected pension fraud, regulators need to compare what the member was shown with what the scheme actually issued. Verified statements create a clear evidence trail.

## Verification Architecture

**The Fabrication Problem**

- **Value Inflation:** Editing a statement to show GBP 342,000 when the actual CETV is GBP 142,000, making a scam scheme's promised returns look plausible relative to the amount being transferred.
- **Value Suppression:** Understating the transfer value during divorce proceedings to reduce the pension asset subject to sharing.
- **Status Fabrication:** Altering a statement to show "Open to Transfers" when the scheme has actually closed to transfers or is in assessment by the Pension Protection Fund.
- **Guarantee Date Manipulation:** Extending the "Valid Until" date on an expired CETV to pressure the member into a hasty transfer decision.

**Issuer Types** (First Party)

**Occupational DB Schemes:** Administered by trustees or third-party administrators (e.g., WTW, Mercer, XPS Pensions) on behalf of sponsoring employers.
**Public Sector Schemes:** Teachers' Pension Scheme, NHS Pension Scheme, Local Government Pension Scheme, USS.
**Industry-Wide Schemes:** Railways Pension Scheme, Merchant Navy Officers Pension Fund.

**Privacy Salt:** Required. A pension transfer value reveals personal wealth and can indicate salary history, length of service, and age. The hash must be salted to prevent adversaries from guessing transfer values through brute-force hash comparison. This is particularly sensitive because CETVs are calculated using member-specific demographic and service data.

## Authority Chain

**Pattern:** Regulated

Northbridge DB Pension Scheme, a UK occupational pension scheme, is authorized by its trustees and regulated by The Pensions Regulator to issue verified transfer value statements.

```
✓ northbridgepensions.co.uk/transfer-values/v — Issues verified pension transfer value statements
  ✓ thepensionsregulator.gov.uk/schemes — Regulates UK occupational pension schemes
    ✓ gov.uk/verifiers — UK Government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Manual Verification

| Feature | Live Verify | Direct Scheme Contact | Scanned PDF / Letter |
| :--- | :--- | :--- | :--- |
| **Speed** | **Instant.** Clip and verify. | **Weeks.** Written request to scheme administrator. | **Instant.** But unverifiable. |
| **Trust Anchor** | **Domain-Bound.** Tied to the scheme administrator. | **Phone/Letter.** Trust the process. | **Zero.** Trivially altered. |
| **Guarantee Period** | **Verified.** Expiry date in the hash. | **Confirmed.** If specifically asked. | **Editable.** Dates easily changed. |
| **Scheme Status** | **Included.** Open/closed status verified. | **Included.** If specifically requested. | **Omittable.** Easy to remove warnings. |
| **Third-Party Access** | **Universal.** Anyone with the document. | **Restricted.** Requires member authorization and weeks of turnaround. | **Universal.** But worthless for trust. |

## Further Derivations

None yet.
