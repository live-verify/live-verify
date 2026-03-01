---
title: "Client Money Segregation Confirmations"
category: "Professional Ethics & Compliance"
volume: "Small"
retention: "7-10 years (CASS audit / legal statute)"
slug: "client-money-segregation-confirmations"
tags: ["client-money", "segregation", "cass-compliance", "investor-protection", "ring-fencing", "custody-audit", "financial-solvency", "brokerage-safety"]
furtherDerivations: 1
---

## What is a Client Money Segregation Confirmation?

In the investment and brokerage industry, **Client Money Segregation** (e.g., CASS in the UK) is the legal requirement that a firm must keep its customers' cash in separate bank accounts from the firm's own operating funds. This ensures that if the firm goes bankrupt (like Lehman Brothers or MF Global), the clients' money is "Ring-Fenced" and cannot be seized by the firm's creditors.

These documents are the "Safety Certificates" for an investor's cash. Fraud is high-stakes: a struggling firm might "edit" a segregation report to hide a shortfall or to cover up the illegal "commingling" of funds to pay for firm expenses. Verified hashes bind the **Audit Date, Shortfall Status, and Auditor's Name** to the firm's or the auditor's domain (e.g., `hl.co.uk` or `pwc.com`).

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #1a5f2a; background: #fff; padding: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #1a5f2a; color: #fff; padding: 20px; text-align: center;">
    <div style="font-weight: bold; font-size: 1.2em; letter-spacing: 1px;"><span verifiable-text="start" data-for="cass">[</span>CLIENT MONEY SEGREGATION</div>
    <div style="font-size: 0.8em; opacity: 0.9; text-transform: uppercase; margin-top: 5px;">CASS 7 Compliance Attestation</div>
  </div>
<div style="padding: 30px; font-size: 0.95em; line-height: 1.6; color: #333;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
      <div>
        <strong>Firm:</strong> STERLING INVESTMENTS LTD<br>
        <strong>FCA FRN:</strong> 789012 (Authorized)
      </div>
      <div style="text-align: right;">
        <strong>Reference:</strong> SEG-2026-Q1<br>
        <strong>As of Date:</strong> MARCH 31, 2026
      </div>
    </div>
<div style="background: #f0fff0; border: 1px solid #1a5f2a; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
      <p style="margin: 0; font-weight: bold; color: #1a5f2a;">THE FIRM HEREBY ATTESTS THAT:</p>
      <p style="margin: 10px 0 0;">1. All client money is held in <strong>Designated Client Accounts</strong>.</p>
      <p style="margin: 5px 0 0;">2. Funds are fully segregated from the firm's proprietary assets.</p>
      <p style="margin: 5px 0 0;">3. Daily internal reconciliations show <strong>ZERO SHORTFALL</strong>.</p>
    </div>
<p style="font-size: 0.85em; color: #666; font-style: italic;">
      "This attestation has been reviewed by our external auditors per the annual CASS audit cycle."
    </p>
  </div>
<div style="padding: 20px; background: #fdfdfd; border-top: 1px dashed #1a5f2a; text-align: center;">
    <div data-verify-line="cass" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Investment firms don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:sterling-invest.co.uk/v <span verifiable-text="end" data-for="cass">]</span>
    </div>
    <div style="font-size: 0.7em; color: #777; margin-top: 10px;">
      Scan to verify segregation integrity, view the latest shortfall history, and check for CASS breach notifications.
    </div>
  </div>
</div>

## Data Verified

Firm name, regulatory ID (FRN), confirmation date, segregation status (Pass/Fail), account designation type, reconciliation frequency, shortfall amount (if any), CASS oversight officer name, external auditor name/ID, date of last CASS audit report.

**Document Types:**
- **Monthly Segregation Attestation:** The primary proof for clients.
- **CASS Audit Opinion:** The formal year-end independent review.
- **Acknowledgement Letter:** (Linked hash) from the bank holding the client funds.
- **Breach Notification:** Proof that a previous shortfall was corrected.

## Data Visible After Verification

Shows the issuer domain (`hl.co.uk`, `fidelity.com`, `barclays.co.uk`) and the safety standing.

**Status Indications:**
- **Verified / Compliant** — The firm is currently meeting all segregation rules.
- **Shortfall Alert** — **CRITICAL:** The firm has reported a deficiency in client funds.
- **Audit Overdue** — **ALERT:** The mandatory annual CASS audit has not been completed.
- **Superseded** — A newer quarterly attestation is available.

## Second-Party Use

The **Retail / Institutional Client** benefits from verification.

**Investor Confidence:** Before depositing $1M into a new brokerage account, an institutional investor scans the firm's verified "Segregation Hash." "Verified by Sterling" ensures the investor that their cash is legally ring-fenced, removing the "Lehman Risk" and allowing the account opening to proceed.

**Annual Portfolio Review:** An individual investor can maintain a verified digital library of their firm's monthly attestations. During a personal financial audit, they can prove that their cash assets were held in a compliant, low-risk environment.

## Third-Party Use

**Insolvency Practitioners (Liquidators)**
**Asset Reconciliation:** In the event of a firm failure, the liquidator scans the verified hashes of the last 12 months of segregation reports. This provides the "Digital Map" needed to quickly return cash to clients, potentially saving years of legal gridlock.

**National Regulators (FCA / SEC)**
**Prudential Oversight:** Instead of manually reviewing 500 firms, the regulator can use an API to bulk-scan verified hashes. Any firm whose hash returns **"SHORTFALL ALERT"** is instantly flagged for an immediate on-site inspection.

**Trustees and Fiduciaries**
**Fiduciary Duty Proof:** Verifying that the investment platforms they use for their clients are maintaining the highest standards of fund segregation.

## Verification Architecture

**The "Commingling" Fraud Problem**

- **Shortfall Hiding:** Manually editing a "$10M shortfall" into "Zero" on a PDF report before sending it to a large client.
- **Account Mis-labeling:** Presenting a standard corporate account as a "Designated Client Account" to bypass audit controls.
- **Date Back-dating:** Creating a "Clean" report for a day when the firm actually illegally used client cash to cover a margin call.

**Issuer Types** (First Party)

**Global Custodian Banks.**
**Retail Stockbrokers.**
**Financial Audit Firms (CASS Units).**

**Privacy Salt:** Highly Critical. Individual account volumes are sensitive business intelligence. The hash must be salted and access restricted to authorized clients and regulators.

## Rationale

Client money is the "Trust Core" of the financial system. By turning technical attestations into verifiable digital bridges, we protect the public from the devastating cost of firm failure and ensure that "Segregated" means "Safe."

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

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

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion
