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

## Data Verified

Representative name, CRD (Central Registration Depository) number, current firm affiliation, registration status (Active/Suspended/Barred), examination history (Series 7, 63, 24), disciplinary disclosures flag, date of issuance.

**Document Types:**
- **Registration Certificate:** Wall-hung proof of firm registration.
- **Representative ID Card:** For face-to-face client meetings.
- **Disciplinary Summary:** Detailed list of past "Regulator Alerts."

## Data Visible After Verification

Shows the issuer domain (`finra.org`, `sec.gov`) and current regulatory standing.

**Status Indications:**
- **Registered** — Individual is authorized to sell securities.
- **Barred** — Permanently prohibited from the industry.
- **Suspended** — Temporarily prohibited (dates provided).
- **Inactive** — Not currently affiliated with a firm.

## Why Would You Bother Verifying?

Because the person sitting across the table is asking you to hand over your retirement savings. FINRA bars roughly 500 individuals per year for fraud, theft, or unauthorized trading. A barred broker who keeps their old registration certificate can open a new "advisory firm," target communities where word-of-mouth referrals substitute for due diligence, and run the same scheme again. The consequences for the investor are not abstract: retirees lose homes, college funds disappear, and recovery through FINRA arbitration — where it is available — takes years and often returns pennies on the dollar. BrokerCheck exists precisely because the industry knows this happens. Verification at the point of the meeting, from the credential itself, closes the gap between "I should check" and "I actually did."

## Second-Party Use

The **Broker / Representative** benefits from verification.

**Client Trust:** Proving to a potential high-net-worth investor that they are a "Verified Registered Rep" and not an impostor. The client can scan the badge during an initial meeting to see the "Active" status directly from FINRA.

**License Portability:** Speeding up the onboarding process when moving to a new firm by providing a verified record of their exams and clean disciplinary history.

## Third-Party Use

**Retail Investors (Consumers)**
**Fraud Prevention:** Before handing over a life-savings check, an investor can verify the broker's credentials. This stops "affinity fraud" where scammers pose as brokers to target specific communities.

**Compliance Departments**
**Due Diligence:** Recruiting teams at major firms (e.g., Morgan Stanley, Merrill) can instantly verify the "Series 7" claims of a new hire by scanning their previous registration certificate.

**Lenders / Banks**
**Authorized Signers:** Verifying that the person signing a corporate brokerage resolution has the regulatory authority to do so.

## Verification Architecture

**The "Barred Broker" Fraud Problem**

- **Ghost Credentials:** A broker who was barred for stealing client funds continuing to use their old, unexpired "Registration Certificate" to lure in new victims.
- **Firm Impersonation:** Using the name of a real, famous firm (e.g., Goldman Sachs) on a fake certificate to legitimize a Ponzi scheme.
- **Disciplinary Hiding:** Editing a PDF summary to remove "Customer Complaints" or "Regulatory Fines."

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

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

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

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. FINRA BrokerCheck (Search)

| Feature | Live Verify | BrokerCheck Website | Paper Certificate |
| :--- | :--- | :--- |
| **Integrity** | **Binds Identity.** Proves *this* person is the one. | **Live.** Shows status *today*. | **Static.** Easily forged. |
| **User Experience** | **Seamless.** Scan the badge/paper. | **Hard.** Ask for CRD #, type it, find the right name. | **Manual.** |
| **Trust** | **Domain-Bound.** Bound to `finra.org`. | **High.** Direct DB access. | **Medium.** |
| **Disclosures** | **Active Alert.** Can highlight a BARRED status in red. | **Deep.** Requires reading long PDF reports. | **Hidden.** |

**Narrower conclusion:** BrokerCheck and other regulator search tools should remain primary where the verifier is prepared to use them directly. Live Verify is complementary when the business card or displayed credential is the visible surface in the room and the client wants a discreet bridge to the live regulatory record without name-search friction.
