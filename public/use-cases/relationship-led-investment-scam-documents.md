---
title: "Relationship-Led Investment Scam Documents"
category: "Investment & Fintech"
volume: "Large"
retention: "7-10 years (fraud investigation, complaints, recovery efforts)"
slug: "relationship-led-investment-scam-documents"
verificationMode: "clip"
tags: ["investment-fraud", "crypto-fraud", "romance-scam", "withdrawal-scam", "fake-broker", "authorized-push-payment", "consumer-protection", "fintech-fraud", "social-engineering", "retail-investor"]
furtherDerivations: 1
---

## What are Relationship-Led Investment Scam Documents?

A victim meets someone online. Sometimes it looks like romance. Sometimes friendship. Sometimes a mentor, trader, or "helpful" investor community. The conversation is patient, flattering, and ordinary. Then it turns to money.

The victim is introduced to a trading app, crypto platform, OTC desk, or "private" investment portal. At first the numbers look plausible. Small deposits appear to grow. Screenshots show profits. Customer-service agents answer quickly. A first small withdrawal may even succeed to build trust.

Then the trap closes.

Larger deposits are demanded. The platform claims taxes are due before release. A "security deposit" is required. A wallet address changes. A compliance team appears. A withdrawal receipt is shown. A profits statement looks official. None of it is real.

Live Verify applies here because the scam runs on portable artifacts that look authoritative outside the true system of record: account statements, profit screenshots, withdrawal notices, tax-demand letters, and payment instructions. Victims, family members, banks, and police often see only those artifacts.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #0c4a6e; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="relscam"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.84em; white-space: pre; color: #000; line-height: 1.6;">RETAIL INVESTMENT WITHDRAWAL CONFIRMATION
═══════════════════════════════════════════════════════════════════

Platform:         Northbridge Markets UK
Client ID:        NBM-441882
Account Holder:   Sarah K
Portfolio Type:   Retail CFD / Crypto
Withdrawal Ref:   WD-2026-03-11842
Amount Requested: GBP 18,500.00
Destination:      HSBC ****8842
Request Time:     20 Mar 2026 14:22 UTC
Status:           PENDING COMPLIANCE REVIEW
Reason Code:      SOURCE-OF-FUNDS CHECK
Extra Fee Due:    NONE

<span data-verify-line="relscam">verify:northbridgemarkets.co.uk/withdrawals/v</span></pre>
  <span verifiable-text="end" data-for="relscam"></span>
</div>

## Data Verified

Platform name, regulated entity or operator name, client ID, account holder name or privacy-preserving form, product/account type, portfolio balance summary or withdrawal amount, request/reference number, destination bank or wallet identifier (masked), timestamp, current status, hold reason if any, and whether any additional fee is legitimately due.

**Document Types:**
- **Account Balance / Profit Statement** — Summary of positions, cash balance, and realized or unrealized gains.
- **Withdrawal Confirmation** — The strongest scam-control document because fake platforms routinely fabricate these.
- **Compliance Hold Notice** — Platform explanation for a delay or review.
- **Fee Demand / Tax Demand Notice** — The highest-risk artifact, because scammers use it to justify repeated top-up payments.
- **Customer-Service Escalation Summary** — A portable record of what the platform actually requested and why.

**Privacy Salt:** Required. Account identifiers, balances, and timestamps are sensitive and partially enumerable. Salt should be issuer-generated and time-limited to prevent population scraping of retail clients.

## Data Visible After Verification

Shows the issuer domain (`broker.example.com`, `exchange.example.com`, `wealth.example.co.uk`) and the current status.

**Status Indications:**
- **On Record** — This document was genuinely issued by the platform.
- **Pending Review** — Withdrawal or account action is under genuine review.
- **Approved** — Withdrawal has been approved by the platform.
- **Paid Out** — Funds have actually been released.
- **Rejected** — Withdrawal or request denied.
- **No Additional Fee Due** — Important anti-scam status: the platform is not asking for a release payment.
- **Fee Due** — A legitimate fee exists and is part of the platform's real fee schedule.
- **Superseded** — A later statement or withdrawal update replaced this one.
- **404** — The document was never issued by the claimed platform.

## Second-Party Use

The **customer or victim** benefits first.

**Reality check before sending more money:** A victim can verify whether the "withdrawal blocked pending tax" notice was ever issued by the actual platform, rather than by a scammer's PDF generator or chat agent.

**Trusted-family intervention:** Adult children, partners, or friends shown a screenshot can verify whether the supposed profit statement or release notice actually comes from the named broker.

**Fraud complaint support:** When reporting APP fraud, card fraud, or crypto-transfer fraud, the victim can show exactly what the platform claimed and whether the artifact was genuine.

**Platform dispute clarity:** Honest customers of legitimate firms benefit too. They can prove whether a hold notice or fee notice is real instead of acting on an impersonation email or WhatsApp message.

## Third-Party Use

**Banks and Payment-Fraud Teams**

**Last-mile intervention:** When a customer tries to send another urgent payment to "unlock" profits, the bank can ask for the withdrawal notice or fee demand and verify whether it came from the named platform.

**APP fraud triage:** Banks handling authorized-push-payment scam claims can distinguish a genuine broker hold notice from a fabricated screenshot designed to manipulate the customer into sending more funds.

**Family Offices, Caregivers, and Trusted Contacts**

**Protective review:** A trusted contact who is shown a trading dashboard screenshot or "tax certificate" can verify whether the claimed issuer actually produced it.

**De-escalation:** The intervention is less confrontational when the conclusion is "this screenshot does not verify against the broker's domain" rather than "I don't believe you."

**Police, Regulators, and Recovery Specialists**

**Evidence triage:** Investigators can quickly separate artifacts issued by regulated firms from those created by scam sites, clone brands, or ad hoc CRM panels.

**Narrative reconstruction:** Verification shows when the victim moved from genuine investing into a fabricated environment built to extract repeated payments.

## Verification Architecture

**The "Fake Profit Dashboard" Fraud Problem**

- **Fabricated account growth:** Scammers show a dashboard or PDF statement claiming the victim's balance has doubled.
- **Withdrawal theater:** The victim is shown a fake withdrawal confirmation or "processing" screen to maintain belief in the platform.
- **Release-fee extortion:** The platform demands a tax payment, wallet activation fee, anti-money-laundering deposit, or security bond before funds can be released.
- **Clone-brand impersonation:** A fake site borrows the name, colors, and logos of a legitimate broker or exchange.
- **Chat-agent fabrication:** "Customer service" sends ad hoc PDFs and screenshots that never existed in the real system.
- **Destination swapping:** The victim is told to send the next payment to a different wallet, OTC agent, or personal account under a pretext of urgency.

This pattern does not require an international organized-crime framing. It fits perfectly inside ordinary domestic fraud markets: online dating apps, Telegram groups, SMS lures, fake broker ads, cloned websites, and ordinary bank rails.

**Issuer Types (First Party)**

- Retail brokers and trading platforms
- Crypto exchanges and custodians
- Investment apps and neobrokers
- Payment firms issuing withdrawal and payout confirmations
- Regulators or ombudsman-linked complaint portals for later-stage dispute records

The strongest implementation is not "verify every screenshot on the internet." It is narrower:

1. Real platforms issue verifiable statements and withdrawal notices
2. Real platforms make clear whether any additional release fee is genuinely due
3. Banks and victims treat unverifiable fee-demand artifacts as high-risk by default

## Relationship to Existing Payment Documents

This use case is complementary to:

- [P2P Payment Receipts](view.html?doc=p2p-payment-receipts) — verifies whether a payment screenshot is real
- [Wire Transfer Confirmations (SWIFT/Fedwire)](view.html?doc=wire-transfer-documentation) — verifies whether a high-value transfer was actually executed
- [Remittance Transfer Confirmations](view.html?doc=remittance-transfer-confirmations) — verifies cash-transfer receipts often used in scam narratives
- [Bank Fraud Report Acknowledgments](view.html?doc=bank-fraud-report-acknowledgments) — protects the victim after the fraud is reported
- [Investment Suitability Reports](view.html?doc=investment-suitability-reports) — applies where a real regulated advisor is involved rather than a fabricated one

The difference is that this use case targets the social-engineering fraud layer built around fake investing, fake profits, and fake withdrawals.

## Competition vs. Current Practice

| Feature | Live Verify | Screenshot / PDF | App Store Presence | Phone Call to "Customer Service" |
| :--- | :--- | :--- | :--- | :--- |
| **Portable** | **Yes.** Victim can show it anywhere. | **Yes.** But trivial to fake. | **No.** App listing proves little. | **No.** Ephemeral only. |
| **Verifies fee demand** | **Yes.** Can show whether extra payment is actually due. | **No.** | **No.** | **Weak.** Caller may be scammer-controlled. |
| **Helps bank intervention** | **Yes.** Fraud team can inspect one artifact. | **Weak.** | **Weak.** | **Weak.** |
| **Detects clone-brand scams** | **Partially.** Domain mismatch becomes obvious. | **No.** | **No.** | **No.** |
| **Works after the fact** | **Yes.** Useful in complaints and investigations. | **Weak.** Easy to fabricate later. | **No.** | **No.** |

**Practical conclusion:** direct login to a regulated broker or exchange remains primary. Live Verify is strongest when the artifact has escaped the platform and is being used to persuade someone else to send more money.

## Authority Chain

**Pattern:** Regulated when the platform is real; absent when it is not

```
✓ withdrawals.examplebroker.co.uk/v — Broker-issued withdrawal confirmations
  ✓ fca.org.uk/register — Regulates UK investment firms
    ✓ gov.uk/verifiers — UK government root namespace
```

US equivalent:

```
✓ accounts.examplebroker.com/v — Broker-issued client statements and withdrawal notices
  ✓ finra.org/brokercheck — Registered broker-dealer framework
    ✓ sec.gov — Federal securities regulator
```

The absence of a plausible authority chain is itself informative. A "platform" moving large sums while offering only unverifiable screenshots and chat messages should be treated as high risk.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Further Derivations

1. **Crypto Asset Recovery Engagement Letters** — A follow-on scam layer where a fake recovery firm claims it can recover the victim's losses for an upfront fee.
2. **Trusted Contact Scam Intervention Notices** — Bank or platform notices allowing a vulnerable customer's nominated contact to verify that a warning or intervention really came from the institution.

## Note: Why Withdrawal Notices Matter More Than Profit Statements

The scam succeeds because victims stop asking "is the platform real?" and start asking "how do I get my money out?"

That makes the **withdrawal confirmation**, **hold notice**, and **fee-demand letter** the most decision-relevant documents in the scam chain. If those documents had a clear verification path, many repeat-loss events could be interrupted before the final and largest transfers.
