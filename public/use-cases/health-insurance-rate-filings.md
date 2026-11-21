---
title: "Health Insurance Rate Filing Certifications"
category: "Actuarial & Insurance Mathematics"
volume: "Very Small"
retention: "5-10 years (rate approval)"
slug: "health-insurance-rate-filings"
verificationMode: "clip"
tags: ["actuarial-certification", "health-insurance-rates", "medical-loss-ratio", "rate-filing", "insurance-regulation", "solvency-compliance"]
furtherDerivations: 1
---

## What is a Health Insurance Rate Filing?

Insurance companies cannot just raise your premiums whenever they want. In most states, they must submit a formal Rate Filing to the government explaining the math behind the price hike.

The Actuarial Certification is the heart of this filing. A math expert (the Actuary) must swear that the new rates are "Fair" and that at least 80% of the premium will be spent on actual medical care.

Verification ensures that the "4.2% Average Increase" the company announces to the public matches the verified math they submitted to the regulators. It prevents "Messaging Fraud" where companies hide large price hikes for specific groups.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #333; background: #fff; padding: 40px; box-shadow: 2px 2px 12px rgba(0,0,0,0.1);">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.1em; color: #1a237e;"><span verifiable-text="start" data-for="rate-filing"></span>BLUE SHIELD OF CALIFORNIA</div>
    <div style="text-align: right; font-size: 0.8em; color: #666;">
      Compliance Filing: RATE-2026-042<br>
      March 15, 2026
    </div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; letter-spacing: 1px; color: #1a237e; border-bottom: 2px solid #1a237e; padding-bottom: 10px;">Actuarial Certification of Rates</h3>
<div style="font-size: 0.95em; line-height: 1.6; text-align: justify; color: #333; margin-top: 20px;">
    <p>I, <strong>Robert Miller, FSA, MAAA</strong>, do hereby certify that the proposed rates for the <strong>2027 Individual PPO Portfolio</strong>:</p>
<ul>
      <li>Are developed in accordance with generally accepted actuarial principles.</li>
      <li>Are not excessive, inadequate, or unfairly discriminatory.</li>
      <li>Meet the minimum 80% Medical Loss Ratio (MLR) requirement under the ACA.</li>
    </ul>
<p><strong>Proposed Weighted Average Increase:</strong> 4.2%</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Robert Miller, FSA</div>
    <div style="text-align: right;">
      <div style="border: 1px solid #1a237e; display: inline-block; padding: 5px 10px; font-size: 0.8em; color: #1a237e; font-weight: bold;">FILED & APPROVED</div>
    </div>
  </div>
<div data-verify-line="rate-filing" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Blue Shield doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="rate-filing">verify:blueshieldca.com/actuarial/v</span> <span verifiable-text="end" data-for="rate-filing"></span>
  </div>
</div>

## The Problem: Rate Padding Fraud

- **Trend Inflation:** Manually editing the "Medical Cost Trend" from 5% to 8% in the PDF to justify a higher premium hike.
- **MLR Manipulation:** Hiding "Administrative Costs" as "Quality Improvement" in the text to appear compliant with the 80% rule.
- **Signature Forgery:** Forging the Enrolled Actuary's signature on a memo they didn't actually vet.

## What Is Checked

Certifying actuary name/qualifications, insurer name, specific plan portfolio (e.g., "2027 Individual PPO"), proposed % increase, medical loss ratio (MLR) projection, medical cost trend assumptions, filing ID, jurisdiction of approval.

**Document Types:**
- **Actuarial Memorandum:** The technical justification for rates.
- **Rate Filing Summary:** For public review periods.
- **MLR Compliance Report:** Annual proof that 80-85% of premiums went to care.
- **State DOI Approval Letter:** (Linked hash) for legal authorization.

## What the Checker Sees

Shows the issuer domain (the Insurance Carrier or the Actuarial Firm) and the filing status.

**Status Indications:**
- **Filed & Approved** — Rates are legally authorized for sale.
- **Under Regulatory Review** — Filing is active but pending state DOI approval.
- **Withdrawn/Rejected** — Rates were found excessive or flawed.
- **Superseded** — Replaced by a corrected or later filing.

## Who Holds It

The Insurer's Compliance Officer benefits from verification.

**Regulatory Defense:** Proving to a state Department of Insurance (DOI) auditor that the "Rate Memo" circulating in the office matches the version signed by the actuary. Verification prevents "Internal Data Drift" where different departments use different versions of a proposed rate.

**Market Conduct Exams:** Providing verified hashes of all 50 state filings to examiners to prove 100% filing integrity and consistency.

## Who Checks It

**State Insurance Regulators (DOI)**
**Audit Integrity:** Regulators can verify the authenticity of the actuarial signature and the specific data points (MLR, Trends) in the filing. Live Verify prevents a carrier from submitting a "Optimistic" version to the regulator and a "Pessimistic" version to the rating agencies.

**Healthcare Advocacy Groups**
**Transparency:** Allowing public interest groups to verify the *actual* approved rate increases, stopping "Messaging Fraud" where a company announces a 4% increase but the verified filing shows 14% for certain segments.

**Rating Agencies (S&P / A.M. Best)**
**Solvency Review:** Verifying that the rates are "Adequate" to cover future claims, protecting against insurer insolvency.

## Who Issues It

**Issuer Types** (First Party)

**Health Insurance Carriers.**
**Actuarial Consulting Firms:** (Milliman, Mercer, Oliver Wyman).
**State Departments of Insurance (DOI):** (As the ultimate approving authority).

## Authority Chain

**Pattern:** Regulated

Actuaries and insurers issue rate filings under federal insurance regulator authority (CMS in the US).

```
✓ ratefiling.example-insurer.com/verify — Issues actuarial rate certifications
  ✓ cms.gov — Administers US Medicare and Medicaid programs
    ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and SERFF

In the US, insurers file rates with state regulators, mostly through SERFF, the system run by the National Association of Insurance Commissioners, and many states offer a public search of filings. Other countries regulate premiums differently, and many publish nothing comparable. SERFF and Live Verify answer different questions and work side by side: one is the full regulatory record, the other confirms that the actuary or insurer stands behind a copy of the certification circulating outside it.

| | SERFF and state public search | Live Verify on the actuarial certification | Unverified PDF memo |
| :--- | :--- | :--- | :--- |
| **Who can check** | Regulators; the public, where a state offers public access. | Anyone handed the memo: a consumer advocate, a journalist, a legislator at a hearing. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The full filing, with correspondence and supporting exhibits. | Confirmation that the actuary or insurer stands behind this exact memo, including its stated increases, as at its date, and whether it has since been withdrawn. | A document that may have been edited. |
| **What the holder shares** | Nothing; public filings are open. | Only the memo they chose to hand over. | Only the memo they chose to hand over. |
| **Reach** | States that use the system and open filings to the public. | Global in principle: any insurer or actuary, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Free; finding a filing can take time with the search forms. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Public access in that state, and the filing's tracking number or company name. | The insurer or actuary to publish hashes, and Live Verify-aware software on the checker's device. No insurer does this yet. | Nothing. |
| **Best suited to** | Analysis of the whole filing before a hearing. | Confirming the copy being quoted in a hearing room or the press. | Nothing where premiums are being debated. |

**Where each fits:** SERFF and the state public search tools are the regulatory record of a rate filing, complete with correspondence and supporting exhibits, and analysts preparing for a hearing should work from them. In the hearing room, and in press coverage afterwards, people handle a copy of the actuarial memorandum instead. Live Verify lets a consumer advocate or journalist confirm that the actuary or insurer stands behind that copy, with the state system still holding the full file.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
