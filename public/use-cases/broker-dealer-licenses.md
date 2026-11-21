---
title: "Broker-Dealer Licenses and Registrations"
category: "Investment & Fintech"
volume: "Very Small"
retention: "Permanent (may show REVOKED status)"
slug: "broker-dealer-licenses"
verificationMode: "clip"
tags: ["finra", "sec", "broker-dealer", "investment-advisor", "series-7", "brokercheck", "compliance"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 4px solid #002d62; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 20px; text-align: center;">
    <h2 style="margin: 0; font-size: 1.3em; letter-spacing: 1px;"><span verifiable-text="start" data-for="broker"></span>CERTIFICATE OF REGISTRATION</h2>
    <div style="font-size: 0.8em; margin-top: 5px;">FINANCIAL INDUSTRY REGULATORY AUTHORITY (FINRA)</div>
  </div>
<div style="padding: 25px; display: flex;">
    <div style="width: 100px; margin-right: 20px;">
      <div style="width: 100px; height: 125px; background: #eee; display: flex; align-items: center; justify-content: center; color: #777; border: 1px solid #ccc;">[Photo]</div>
    </div>
    <div style="flex-grow: 1;">
      <h3 style="margin-top: 0; color: #002d62; font-size: 1.2em;">REGISTERED REPRESENTATIVE</h3>
<div style="font-size: 0.95em; line-height: 1.5; color: #333;">
        <p><strong>Individual:</strong> JORDAN BELFORT<br>
        <strong>CRD Number:</strong> 9988776<br>
        <strong>Firm:</strong> Stratton Oakmont, Inc.</p>
<p><strong>Status:</strong> REGISTERED<br>
        <strong>Examinations:</strong> Series 7, Series 63</p>
<p style="font-size: 0.8em; margin-top: 10px;">This individual is authorized to engage in the sale of securities products.</p>
      </div>
    </div>
  </div>
<div data-verify-line="broker" style="border-top: 1px dashed #999; margin-top: 10px; padding: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center; background: #f9f9f9;"
      title="Demo only: FINRA doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="broker">verify:finra.org/brokercheck/v</span> <span verifiable-text="end" data-for="broker"></span>
  </div>
</div>

## The Problem: Barred Broker Fraud

- **Ghost Credentials:** A broker who was barred for stealing client funds continuing to use their old, unexpired "Registration Certificate" to lure in new victims.
- **Firm Impersonation:** Using the name of a real, famous firm (e.g., Goldman Sachs) on a fake certificate to legitimize a Ponzi scheme.
- **Disciplinary Hiding:** Editing a PDF summary to remove "Customer Complaints" or "Regulatory Fines."

## What Is Checked

Representative name, CRD (Central Registration Depository) number, current firm affiliation, registration status (Active/Suspended/Barred), examination history (Series 7, 63, 24), disciplinary disclosures flag, date of issuance.

**Document Types:**
- **Registration Certificate:** Wall-hung proof of firm registration.
- **Representative ID Card:** For face-to-face client meetings.
- **Disciplinary Summary:** Detailed list of past "Regulator Alerts."

## What the Checker Sees

Shows the issuer domain (`finra.org`, `sec.gov`) and current regulatory standing.

**Status Indications:**
- **Registered** — Individual is authorized to sell securities.
- **Barred** — Permanently prohibited from the industry.
- **Suspended** — Temporarily prohibited (dates provided).
- **Inactive** — Not currently affiliated with a firm.

## Why Would You Bother Verifying?

Because the person sitting across the table is asking you to hand over your retirement savings. FINRA bars roughly 500 individuals per year for fraud, theft, or unauthorized trading. A barred broker who keeps their old registration certificate can open a new "advisory firm," target communities where word-of-mouth referrals substitute for due diligence, and run the same scheme again. The consequences for the investor are not abstract: retirees lose homes, college funds disappear, and recovery through FINRA arbitration — where it is available — takes years and often returns pennies on the dollar. BrokerCheck exists precisely because the industry knows this happens. Verification at the point of the meeting, from the credential itself, closes the gap between "I should check" and "I actually did."

## Who Holds It

The Broker / Representative benefits from verification.

**Client Trust:** Proving to a potential high-net-worth investor that they are a "Verified Registered Rep" and not an impostor. The client can scan the badge during an initial meeting to see the "Active" status directly from FINRA.

**License Portability:** Speeding up the onboarding process when moving to a new firm by providing a verified record of their exams and clean disciplinary history.

## Who Checks It

**Retail Investors (Consumers)**
**Fraud Prevention:** Before handing over a life-savings check, an investor can verify the broker's credentials. This stops "affinity fraud" where scammers pose as brokers to target specific communities.

**Compliance Departments**
**Due Diligence:** Recruiting teams at major firms (e.g., Morgan Stanley, Merrill) can instantly verify the "Series 7" claims of a new hire by scanning their previous registration certificate.

**Lenders / Banks**
**Authorized Signers:** Verifying that the person signing a corporate brokerage resolution has the regulatory authority to do so.

## Who Issues It

**Issuer Types** (First Party)

**FINRA:** (The primary self-regulatory organization).
**SEC:** (Federal oversight).
**State Securities Regulators:** (e.g., NASAA members).

## Authority Chain

**Pattern:** Regulated

FINRA registers broker-dealers and representatives authorized to sell securities.

```
✓ brokercheck.finra.org — Registers securities representatives
  ✓ finra.org — Regulates US broker-dealers and investment advisers
    ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and FINRA BrokerCheck

In the US, FINRA's BrokerCheck is a free public search of registered brokers and firms, including disciplinary disclosures. Other countries have their own regulator registers, such as the FCA's register in the UK, and coverage and detail vary. BrokerCheck and Live Verify answer different questions and work side by side: BrokerCheck shows the full record today, while Live Verify lets a client check the credential on a business card or display in front of them.

| | FINRA BrokerCheck | Live Verify on the broker's credential | Paper certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who searches by name or CRD number. | Anyone shown the credential: a prospective client, an employer, a compliance officer. | Anyone, on trust. |
| **What the checker gets** | Current registration and detailed disclosures, which can take time to read. | Confirmation that the regulator stands behind this exact credential, for this person, and its current status, including a bar or suspension. | A certificate that may have been forged or be out of date. |
| **What the broker shares** | Nothing; the record is public. | Only the credential they chose to show. | The certificate. |
| **Reach** | FINRA-registered brokers and firms. | Global in principle: any regulator that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Free; finding the right person among similar names takes a few minutes. | A few seconds per check: one web lookup, with no fee to the standard. | No lookup. |
| **What it needs** | The client to search and read the record. | The regulator to publish hashes, and Live Verify-aware software on the checker's device. No regulator does this yet. | Nothing. |
| **Best suited to** | Full research into a broker's history. | A discreet check in the room. | Nothing where money is at stake. |

**Where each fits:** BrokerCheck and other regulator search tools should remain primary where the client is prepared to use them, and they give the fuller history. Live Verify is complementary when the business card or displayed credential is what is in front of the client, offering a discreet route to the regulator's record without the friction of a name search, for clients whose software honours it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
