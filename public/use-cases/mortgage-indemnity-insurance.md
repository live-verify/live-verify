---
title: "Mortgage Indemnity Insurance (LMI)"
category: "Specialty Insurance"
volume: "Small"
retention: "Mortgage term (15-30 years)"
slug: "mortgage-indemnity-insurance"
verificationMode: "clip"
tags: ["lenders-mortgage-insurance", "lmi", "mortgage-insurance", "high-ltv-loan", "pmi-certificate", "mortgage-finance", "risk-mitigation"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #002d62; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="mort-ins"></span>ARCH MORTGAGE INSURANCE</div>
      <div style="font-size: 0.8em; opacity: 0.9;">Certificate of Private Mortgage Insurance</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Cert #: PMI-99228877-26</div>
    </div>
  </div>
<div style="padding: 25px;">
    <h2 style="text-align: center; color: #002d62; font-size: 1.4em; margin-bottom: 20px; text-transform: uppercase;">PMI Coverage Confirmation</h2>
<div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p><strong>Insured Lender:</strong> Wells Fargo Bank, N.A.<br>
      <strong>Borrower:</strong> Sarah Jane Smith</p>
<div style="background: #f0f4f8; border: 1px solid #d1d9e6; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <p><strong>Loan Amount:</strong> $ 450,000.00<br>
        <strong>Loan-to-Value (LTV):</strong> 95.00%</p>
        <p><strong>Insurance Coverage:</strong> 30.00% of Loss<br>
        <strong>Monthly Premium:</strong> $ 142.50</p>
      </div>
<p><strong>Effective Date:</strong> March 15, 2026<br>
      <strong>Master Policy:</strong> AM-99887766</p>
    </div>
<div style="margin-top: 30px; border: 1px solid #ccc; padding: 10px; font-size: 0.8em; color: #555; background: #fafafa; font-style: italic;">
      This certificate is for the benefit of the lender and is subject to the terms of the Master Policy on file with Arch MI.
    </div>
<div data-verify-line="mort-ins" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Arch MI doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="mort-ins">verify:archmi.com/v</span> <span verifiable-text="end" data-for="mort-ins"></span>
    </div>
  </div>
</div>

## The Problem: High-LTV Fraud

- **Certificate Forgery:** A dishonest loan officer creating a fake "PMI Certificate" to trick a lender into funding a 97% LTV loan that the insurer actually rejected.
- **Limit Padding:** Editing a PDF to show "30% Coverage" when the insurer only authorized "12% Coverage" to meet secondary market rules.
- **Cancellation Concealment:** Hiding the fact that the PMI was cancelled due to a borrower's missed payments.

## What Is Checked

Lender name, borrower name, loan ID, original loan amount, Loan-to-Value (LTV) ratio, insurance coverage percentage (e.g., 25-30%), monthly premium amount, effective date, issuing carrier (e.g., Arch, MGIC, Radian), master policy reference.

**Document Types:**
- **PMI Certificate:** The primary proof of "Mortgage Guarantee."
- **Evidence of LMI:** For international markets (e.g., Genworth in Australia).
- **Premium Notice:** For the borrower's annual escrow analysis.
- **Cancellation Notice:** Proving the loan has reached 78-80% LTV and PMI is removed.

## What the Checker Sees

Shows the issuer domain (`archmi.com`, `mgic.com`, `radian.com`) and current coverage standing.

**Status Indications:**
- **In Force** — Premium paid; lender is verified protected against default.
- **Cancelled** — Policy terminated (often due to payoff or 80% LTV reached).
- **Lapsed** — Payment missing; coverage at risk.
- **Claim Active** — Foreclosure occurred; claim in processing.

## Who Holds It

The Mortgage Lender (Insured) benefits from verification.

**Secondary Market Sales:** Proving to a buyer of the mortgage (e.g., Fannie Mae or a private REIT) that the loan is "Verified Insured" by a top-tier PMI carrier. Loans with verified LMI sell for a higher premium because the "Default Risk" is cryptographically confirmed as mitigated.

**Internal Audit:** Ensuring that the "PMI Certificates" in thousands of loan files match the insurer's records, catching "Uninsured High-LTV" loans before they become a regulatory liability.

## Who Checks It

**Government Sponsored Enterprises (Fannie/Freddie)**
**Quality Control:** Automatically verifying the LMI status of thousands of loans being delivered for securitization. Live Verify allows the GSEs to skip the manual "Evidence Review" for every single loan file.

**Mortgage Servicers**
**Escrow Reconciliation:** Verifying the "Monthly Premium" amount before paying the insurer, ensuring the borrower isn't being over-charged.

**Borrowers (Homeowners)**
**Termination Monitoring:** Proving to the lender that the home's value has increased enough to hit the 80% LTV threshold, requiring the "Verified Cancellation" of the PMI expense.

## Who Issues It

**Issuer Types** (First Party)

**Private Mortgage Insurers:** (Arch, MGIC, Radian, Essent, Enact).
**FHA / VA Government Agencies:** (Hosting hashes for federal guarantees).
**National LMI Bureaus:** (In international markets like Australia/UK).

## Authority Chain

**Pattern:** Regulated

Genworth, a regulated mortgage insurance provider, is authorized by the FCA to issue verified lenders mortgage insurance certificates.

```
✓ lmi.genworth.co.uk/verify — Issues verified mortgage indemnity insurance certificates
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the insurance carrier's hashes and status changes plus structured metadata (key identifiers and dates) — never plaintext or sensitive personal information — providing non-repudiation of issuing the mortgage indemnity insurance certificate.

## Compared With MERS / Industry Databases

| Feature | Live Verify | MERS / Industry Portal | Scanned PDF Certificate |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **Data-Bound.** Trust the aggregator. | **Zero.** Easily forged. |
| **User Access** | **Universal.** Any buyer or auditor can verify. | **Restricted.** Requires paid membership. | **Instant.** |
| **Timeliness** | **Real-time.** Shows if premium paid *today*. | **Laggy.** Updates take weeks. | **Static.** |
| **Integrity** | **Cryptographic.** Binds the *LTV Ratio*. | **Data-Only.** | **Vulnerable.** |

**Where each fits:** Industry registries such as MERS serve their members well for tracking loans and servicing rights at scale, and participants will keep relying on them. A loan buyer or auditor reviewing a file may not be a member, and is in any case examining the certificate in the file and not a database row. Live Verify lets them confirm that the insurer stands behind that certificate, in step with whatever registry checks they also run.
