---
title: "Investment Suitability Reports"
category: "Professional Ethics & Compliance"
volume: "Large"
retention: "7-10 years (regulatory, litigation)"
slug: "investment-suitability-reports"
verificationMode: "clip"
tags: ["suitability", "investment-advice", "mifid", "reg-bi", "financial-advice", "know-your-client"]
furtherDerivations: 1
---

## What is a Suitability Report?

When a financial advisor recommends an investment, they must ensure it's suitable for you — considering your financial situation, investment objectives, risk tolerance, and knowledge. The suitability report documents this assessment and the rationale for the recommendation.

If things go wrong, this report is critical evidence. Did the advisor understand your circumstances? Did they recommend something appropriate? Disputes often hinge on what was documented at the time.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #4a4a4a; background: #fff; padding: 0;">
  <div style="background: #4a4a4a; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="investmentsuitabilit"></span>SUITABILITY REPORT</div>
    <div style="font-size: 0.8em;">Investment Recommendation Assessment</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Client:</strong> Margaret Chen<br>
    <strong>Advisor:</strong> James Wilson, CFA (FCA Approved CF30)<br>
    <strong>Firm:</strong> Hartley Wealth Management<br>
    <strong>Date:</strong> February 15, 2026</p>
<div style="background: #f5f5f5; padding: 15px; margin: 15px 0;">
      <p style="margin: 0;"><strong>Client Profile Summary:</strong></p>
      <p style="margin: 10px 0 0;">Risk Tolerance: Moderate | Time Horizon: 10+ years</p>
      <p style="margin: 5px 0 0;">Investment Objective: Growth with income</p>
      <p style="margin: 5px 0 0;">Experience Level: Intermediate</p>
    </div>
<div style="background: #fff; padding: 15px; margin: 15px 0; border: 1px solid #ddd;">
      <p style="margin: 0;"><strong>Recommendation:</strong></p>
      <p style="margin: 10px 0 0;">Balanced Multi-Asset Fund (60% equity / 40% bonds)</p>
      <p style="margin: 10px 0 0;"><strong>Suitability Rationale:</strong> Aligns with moderate risk tolerance, provides growth potential with income, appropriate for 10+ year horizon.</p>
    </div>
<p style="font-size: 0.85em; color: #666;">This report should be read alongside the Key Information Document (KID) provided separately.</p>
<div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="investmentsuitabilit" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
        title="Demo only: This is an illustrative example of the verification line">
        <span data-verify-line="investmentsuitabilit">verify:hartley-wealth.com/advice</span> <span verifiable-text="end" data-for="investmentsuitabilit"></span>
      </div>
    </div>
  </div>
</div>

## The Problem: Disputed Advice Records

When an investment performs badly and the client complains, the suitability report becomes the main evidence of what the advisor understood and recommended. An ombudsman, arbitrator or successor advisor then has to decide whether the report in the firm's file is the one the client received at the time. Without a fixed record the dispute is one party's word against the other: the client says "they told me it was low risk"; the advisor says "I explained the risks clearly." Mis-selling episodes such as PPI, endowment mortgages and pension transfers all involved advice that was documented one way but may have been delivered differently, or was simply unsuitable.

- **Altered after a complaint:** The firm provides a revised suitability report once a complaint arises.
- **Never delivered:** The firm claims a report existed that was never given to the client.
- **Backdated rationale:** The reasoning is modified or backdated after the investment performs poorly.

Verification proves that this exact suitability assessment existed at this time. It does not prove the advice was suitable.

## What Is Checked

**Client name**, advisor name/credentials, firm name, report date, client profile summary (risk tolerance, objectives, experience), recommendation details, suitability rationale.

## What the Checker Sees

**Status Indications:**
- **On Record** — Suitability report is authenticated as issued
- **Superseded** — Updated advice has been provided
- **Under Review** — Firm is reviewing the advice (possible complaint)
- **Complaint Upheld** — Regulator/ombudsman found the advice unsuitable

## Jurisdiction Differences

| Jurisdiction | Regulator | Framework | Key Requirements |
|--------------|-----------|-----------|------------------|
| **UK** | FCA | COBS 9 (suitability), Consumer Duty | Suitability report required for personal recommendations |
| **US** | SEC, FINRA | Regulation Best Interest (Reg BI) | "Best interest" standard, Form CRS disclosure |
| **EU** | National + ESMA | MiFID II Article 25 | Suitability assessment, appropriateness test |

US Reg BI is newer (2020) and weaker than UK/EU fiduciary-style requirements, but all require documented rationale.

## Who Checks It

**Clients** — Verify the advice record matches what they received
**Financial Ombudsman / FINRA arbitration** — Evidence in disputes
**Successor advisors** — Understanding prior advice when taking over a client
**Regulators** — Thematic reviews of advice quality

## How Verification Works Here

The report is hashed at the time of delivery, and the client receives a copy with a verification line. If the advice is disputed later, both parties can verify the report is exactly what was issued — no alterations, no backdating.

## Authority Chain

**Pattern:** Regulated

St. James's Place, a regulated financial advisory firm, is authorized by the FCA to issue verified investment suitability reports and financial advice documentation.

```
✓ advice.sjp.co.uk/suitability/verify — Issues verified investment suitability reports
  ✓ fca.org.uk/register — Regulates UK investment firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
