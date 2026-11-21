---
title: "Directors' Statutory and Pension Trustee Liability"
category: "Commercial Lines Insurance"
volume: "Very Small"
retention: "Policy term + 20 years (claims tail)"
slug: "directors-statutory-liability-pension"
verificationMode: "clip"
tags: ["pension-trustee", "erisa-liability", "fiduciary-insurance", "pension-fund-governance", "statutory-liability", "risk-management"]
furtherDerivations: 1
---

## What is Pension Trustee Insurance?

The people who manage a company's pension fund (the Trustees) are legally responsible for the employees' retirement money. If they make a bad investment or a mistake in the paperwork, they can be sued *personally*.

**Pension Trustee Liability (PTL)** insurance protects these individuals.

Because these claims can hit 20 years after a person retires, the paperwork must be permanent. Live Verify turns the static certificate in a trustee's home safe into a live, cryptographically trusted link back to the insurance carrier, ensuring they stay protected even decades later.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 2px solid #2c3e50; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #2c3e50; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="pension"></span>AXA XL INSURANCE</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Fiduciary & Pension Trustee Liability</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: PTL-99228877-26</div>
    </div>
  </div>
<div style="padding: 35px;">
    <h2 style="text-align: center; color: #2c3e50; font-size: 1.4em; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">Certificate of Fiduciary Coverage</h2>
<div style="font-size: 1em; line-height: 1.6; color: #333;">
      <p>This document confirms that the following individuals are insured for their fiduciary responsibilities under ERISA Section 409:</p>
<div style="background: #fdfdfd; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
        <p><strong>Pension Scheme:</strong> Globochem Retirement Master Trust<br>
        <strong>Named Trustees:</strong> Peter Gibbons, Michael Bolton, Samir Nagheenanajar</p>
<p><strong>Limit of Indemnity:</strong> $ 10,000,000.00<br>
        <strong>Self-Insured Retention:</strong> $ 100,000.00</p>
      </div>
<p><strong>Coverage Scope:</strong> Breach of Fiduciary Duty, Administrative Errors & Omissions, and Statutory Penalties.</p>
      <p><strong>Policy Period:</strong> Jan 01, 2026 to Dec 31, 2026</p>
    </div>
<div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 0.8em; color: #666; font-style: italic; text-align: center;">
      This evidence is subject to the terms, conditions, and exclusions of the Master Policy.
    </div>
<div data-verify-line="pension" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: AXA XL doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="pension">verify:axaxl.com/fiduciary/v</span> <span verifiable-text="end" data-for="pension"></span>
    </div>
  </div>
</div>

## The Problem: Trustee Blindspot Fraud

- **Insurance Lapsing:** A company entering financial distress "stopping" the PTL premium payments but hiding the cancellation from the trustees to prevent them from resigning.
- **Limit Tampering:** Editing a $1M "Small Business" policy to read $50M to satisfy a high-net-worth trustee's requirement.
- **Retroactive Date Erasure:** Editing the "Prior Acts" date to hide a period where the fund was uninsured or had a known breach.

## What Is Checked

Pension scheme name, individual trustee names, coverage limits (Indemnity), retention amount, ERISA/Statutory compliance status, retroactive date, issuing carrier, policy expiration.

**Document Types:**
- **Pension Trustee Liability (PTL) Certificate:** For annual board review.
- **Fiduciary Liability Policy:** The full legal contract.
- **Run-Off Endorsement:** Protecting retired trustees for 15+ years.
- **Regulatory Filing Summary:** (e.g., for UK Pensions Regulator or US Dept of Labor).

## What the Checker Sees

Shows the issuer domain (`axaxl.com`, `aig.com`) and current policy standing.

**Status Indications:**
- **Active** — Premium paid; trustees protected.
- **Cancelled** — Coverage terminated (major risk for personal assets).
- **Run-Off** — Active for past acts only; no new acts covered.
- **Limit Depleted** — Significant claims have reduced available protection.

## Who Holds It

The Pension Trustee benefits from verification.

**Personal Asset Protection:** Trustees are personally liable for fiduciary breaches. A trustee can scan the "Verified Active" certificate to ensure the company hasn't quietly let the policy lapse to save cash, which would leave the trustee's personal house and bank account exposed to plan participants.

**Board Onboarding:** Proving to a potential new trustee that the fund has verified, high-limit insurance in place before they accept the role.

## Who Checks It

**Pension Regulators (TPR / DoL)**
**Compliance Audit:** Ensuring that multi-billion dollar retirement funds are maintaining the mandatory fiduciary insurance required by law or best practice.

**Plan Participants (Employees)**
**Governance Transparency:** Employees can verify that the people managing their life savings are backed by a verified insurance policy from a top-tier carrier, increasing trust in the fund's management.

**External Auditors**
**Governance Review:** Verifying the "Internal Controls" of the pension fund by ensuring all fiduciary risks are properly insured.

## Who Issues It

**Issuer Types** (First Party)

**Global Commercial Carriers:** (AXA XL, AIG, Chubb, Allianz).
**Fiduciary Benefit Managers.**
**Specialist PTL Brokers.**

## Authority Chain

**Pattern:** Regulated

AIG underwrites directors liability insurance for pension plan fiduciaries.

```
✓ directors.aig.co.uk/pension-liability/verify — Underwrites directors liability for pension issues
  ✓ fca.org.uk/register — Regulates UK life insurance and pensions firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the insurer's hashes and status changes plus structured metadata (policy number, coverage limits, policy effective and expiration dates, named trustees, coverage scope, policy status) — never trustee compensation or specific claims — providing non-repudiation of D&O or pension trustee liability coverage and an audit trail for regulatory compliance and long-tail liability protection.


## Compared With Annual Reports

| Feature | Live Verify | Pension Annual Report | PDF Scan of Policy |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Binds every trustee name. | **Vague.** Often just says "Insurance is in place." | **Zero.** Easily forged. |
| **Freshness** | **Real-time.** Shows if cancelled *today*. | **Historical.** Usually 6-12 months out of date. | **Static.** |
| **Detail** | **High.** Shows specific ERISA triggers. | **Low.** Minimal insurance detail. | **Full.** But untrusted. |
| **Archival** | **Permanent.** Durable for 20-year tail. | **Low.** Often discarded after 5 years. | **Vulnerable.** |

**Where each fits:** The plan's annual report is the proper place for members and regulators to see that fiduciary cover exists, and it will stay the formal disclosure. It is written once a year and seldom records the names, limits or triggers a particular trustee cares about. Live Verify lets a trustee, or someone acting for them long after retirement, confirm that the insurer stands behind the certificate they kept, which fills in detail the report was never meant to carry.
