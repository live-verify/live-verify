---
title: "Fidelity Bonds and Employee Dishonesty"
category: "Insurance Claims & Operations"
volume: "Small"
retention: "Policy term + 10 years"
slug: "fidelity-bonds"
verificationMode: "clip"
tags: ["fidelity-bond", "employee-dishonesty", "erisa-bond", "crime-insurance", "commercial-surety", "fiduciary-responsibility", "theft-protection"]
furtherDerivations: 1
---

## What is a Fidelity Bond?

A Fidelity Bond is a type of insurance that protects a business from its own employees. If an employee steals money, embezzles funds, or commits forgery, the bond pays the business back.

By federal law (ERISA), any company with a 401(k) plan must have a fidelity bond to protect the employees' retirement savings.

Companies that provide in-home services (like cleaning or IT repair) use these bonds to prove to customers: "Our workers are verified bonded." Fraud happens when a firm shows a fake $1M bond paper but only actually has a $10k bond. Verified hashes prove the true protection limit.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #1a237e; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #1a237e; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="fidelity"></span>TRAVELERS CASUALTY & SURETY</div>
      <div style="font-size: 0.8em; opacity: 0.8;">Commercial Crime & Fidelity Bond</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Bond #: FB-99228877-26</div>
    </div>
  </div>
<div style="padding: 30px;">
    <h2 style="text-align: center; color: #1a237e; font-size: 1.4em; margin-bottom: 20px; text-transform: uppercase;">Certificate of Bonding</h2>
<div style="font-size: 0.9em; line-height: 1.6; color: #333;">
      <p>This certifies that the following entity is bonded against acts of Employee Dishonesty:</p>
<p style="background: #f5f5f5; padding: 10px; border-left: 4px solid #1a237e;">
        <strong>Principal:</strong> Initech Financial Services, LLC<br>
        <strong>Bond Amount:</strong> $ 1,000,000.00<br>
        <strong>Covered Class:</strong> All Employees (Blanket Bond)
      </p>
<p><strong>ERISA Compliance:</strong> YES (Meets Section 412 requirements)<br>
      <strong>Effective Date:</strong> March 15, 2026 to March 15, 2027</p>
    </div>
<div style="margin-top: 30px; border: 1px solid #ccc; padding: 10px; font-size: 0.8em; color: #555; background: #fafafa; font-style: italic; text-align: center;">
      This bond protects the assets of the company and its employee benefit plans from theft, forgery, or embezzlement.
    </div>
<div data-verify-line="fidelity" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Travelers doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="fidelity">verify:travelers.com/surety/v</span> <span verifiable-text="end" data-for="fidelity"></span>
    </div>
  </div>
</div>

## The Problem: Employee Theft Fraud

- **Ghost Bonds:** Creating a fake "Certificate of Bonding" to win a high-security contract, while actually having no coverage.
- **Limit Inflation:** Editing a $25,000 bond to read $250,000 to meet a client's RFP requirements.
- **Status Concealment:** Hiding that a bond was cancelled by the surety after a series of small "inventory shrinkage" claims.

## What Is Checked

Principal name (Company), bond amount, coverage type (Blanket/Position), ERISA compliance flag, effective/expiration dates, surety company name, specific exclusions (e.g., "Owners excluded"), date of issuance.

**Document Types:**
- **Blanket Fidelity Bond:** Covering all employees.
- **ERISA Fidelity Bond:** Specifically for 401(k)/Pension plans.
- **Business Service Bond:** For companies whose staff enter client homes.
- **Janitorial Bond:** Specific to the cleaning industry.

## What the Checker Sees

Shows the issuer domain (`travelers.com`, `libertymutual.com`) and current bond status.

**Status Indications:**
- **In Force** — Premium paid; bond active and legally binding.
- **Cancelled** — Bond terminated (often due to internal theft discovery).
- **Limit Depleted** — Recent claims have reduced the available protection.
- **Expired** — Term ended; no coverage for current acts.

## Who Holds It

The Business Owner benefits from verification.

**Client Trust:** Proving to a major client (e.g., a bank or hospital) that every employee entering their facility is "Verified Bonded" for $1M. This is a competitive requirement for high-security service contracts.

**ERISA Compliance:** Proving to the Department of Labor (DOL) that the company's 401(k) plan is properly bonded, avoiding heavy fines during a benefits audit.

**Financing:** Proving to a lender that the company's cash assets are protected from internal embezzlement, which de-risks the loan.

## Who Checks It

**Enterprise Procurement Teams**
**Vendor Vetting:** Ensuring that the outsourced IT or Janitorial firm actually has the "Blanket Bond" they claim in their bid. Verification prevents the common fraud where a firm shows a $1M bond paper but actually only paid for a $10k bond.

**Pension Plan Auditors**
**Fiduciary Audit:** Instantly verifying that the "ERISA Bond" matches the plan's required 10% funding level, ensuring the participants' retirement funds are legally protected.

**Homeowners / Consumers**
**In-Home Service Safety:** Verifying that the contractor (e.g., HVAC or house-cleaner) has a verified bond before giving them a key to the house.

## Who Issues It

**Issuer Types** (First Party)

**Commercial Surety Carriers:** (Travelers, Liberty Mutual, CNA).
**Specialist MGAs.**
**Broker Platforms:** (e.g., BondExchange, Propeller).

## Authority Chain

**Pattern:** Regulated

Travelers underwrites employee fidelity bonds and crime insurance for employers.

```
✓ fidelity.travelers.com/verify — Underwrites employee fidelity bonds and crime insurance
  ✓ fca.org.uk/register — Regulates UK surety and bond providers
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Broker Letters

Today a client or plan sponsor who wants to confirm a fidelity bond usually asks the insurance broker or surety for a letter. A broker's letter and Live Verify answer different questions and work side by side: one brings a person who can explain the cover, the other lets anyone confirm that the surety stands behind a bond certificate and its limit.

| | Broker letter | Live Verify on the bond certificate | Unverified scan or PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Whoever asks the broker and is given an answer. | Anyone handed the certificate: a client, a plan auditor, a procurement team. | Nobody; it can only be taken on trust. |
| **What the checker gets** | A written statement, and someone to ask about exclusions and conditions. | Confirmation that the surety stands behind this exact certificate, including its limit, as at its date, and whether it has since been cancelled. | A document that may have been edited. |
| **What the holder shares** | Permission for the broker to discuss their cover. | Only the certificate they chose to hand over. | Only the certificate they chose to hand over. |
| **Reach** | Wherever the broker can be reached, in their office hours. | Global in principle: any surety or insurer, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Can take days; costs the broker's time. | A few seconds per check: one web lookup, with no fee to the standard, at any hour. | Free and immediate. |
| **What it needs** | A broker willing to respond, and a way to be sure the letter really came from them. | The surety to publish hashes, and Live Verify-aware software on the checker's device. No surety does this yet. | Nothing. |
| **Best suited to** | Unusual bonds, or questions about what the cover actually includes. | Routine checks of many bidders or contractors against a deadline. | Nothing where the limit matters. |

**Where each fits:** A broker's letter comes with a person who can answer follow-up questions, and for an unusual bond that conversation is worth the wait. It takes days and happens in office hours. A procurement team checking many bidders against a deadline, or a client in another time zone, can use Live Verify to confirm that the surety stands behind each certificate and its limit, and then call the broker only where something needs explaining.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
