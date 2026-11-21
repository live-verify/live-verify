---
title: "Investment Advisor Certifications (RIA, IAR)"
category: "Investment & Fintech"
volume: "Very Small"
retention: "Permanent (may show REVOKED status)"
slug: "investment-advisor-certifications"
verificationMode: "clip"
tags: ["ria", "iar", "investment-advisor", "sec-registered", "fiduciary", "wealth-management", "compliance-audit", "iapd"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 4px solid #002d62; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 20px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 1.5em; margin-right: 15px;">🏛️</div>
    <div>
      <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="advisor"></span>REGISTERED INVESTMENT ADVISER</h2>
      <div style="font-size: 0.8em; opacity: 0.8;">U.S. SECURITIES AND EXCHANGE COMMISSION</div>
    </div>
  </div>
<div style="padding: 25px; display: flex;">
    <div style="width: 100px; margin-right: 20px;">
      <div style="width: 100px; height: 125px; background: #eee; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; color: #777; border-radius: 4px;">[PHOTO ID]</div>
    </div>
    <div style="flex-grow: 1;">
      <h3 style="margin: 0; color: #002d62;">REPRESENTATIVE CREDENTIAL</h3>
      <div style="font-size: 1.1em; font-weight: bold; margin: 5px 0;">SARAH J. MILLER</div>
<div style="font-size: 0.9em; color: #333; line-height: 1.4;">
        <strong>Individual CRD #:</strong> 9922887<br>
        <strong>Firm:</strong> Miller Wealth Management, LLC<br>
        <strong>Status:</strong> REGISTERED / ACTIVE
      </div>
    </div>
  </div>
<div style="padding: 0 25px 25px 25px;">
    <div style="background: #f9f9f9; border: 1px solid #eee; padding: 10px; font-size: 0.85em; color: #555;">
      <strong>Fiduciary Status:</strong> This representative is a fiduciary under the Investment Advisers Act of 1940. Last ADV filing: Jan 15, 2026.
    </div>
    <div data-verify-line="advisor" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: SEC/FINRA doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="advisor">verify:adviserinfo.sec.gov/v</span> <span verifiable-text="end" data-for="advisor"></span>
    </div>
  </div>
</div>

## The Problem: Fake Fiduciary Fraud

- **Ghost Credentials:** A barred advisor using their old, unexpired "SEC Registration" wall certificate to lure in victims.
- **ADV Falsification:** Editing the mandatory "ADV Brochure" to remove mention of a prior felony conviction or a regulatory fine.
- **Identity Swapping:** Using a real person's CRD number but editing the photo on the "Representative Card."

## What Is Checked

Representative name, photo (hash), Individual CRD number, Firm CRD number, registration status (Registered/Suspended/Barred), jurisdictions of authority, ADV Part 2B (Brochure Supplement) status, date of last filing, disciplinary disclosure flag.

**Document Types:**
- **IAR Credential Card:** Carried by the advisor.
- **ADV Part 2B Extract:** The mandatory "Advisor Biography" disclosure.
- **SEC Registration Certificate:** For the RIA firm's office.
- **Client Service Agreement:** (Linked hash) for legal onboarding.

## What the Checker Sees

Shows the issuer domain (`sec.gov`, `finra.org`) and current regulatory standing.

**Status Indications:**
- **Registered** — Representative is authorized to provide investment advice for a fee.
- **Barred** — Permanently prohibited from the industry.
- **Suspended** — Temporarily restricted (dates and reasons verified).
- **Inactive** — No longer affiliated with a registered firm.

## Who Holds It

The Investment Advisor (IAR) benefits from verification.

**Trust Building:** Proving to a potential high-net-worth client that they are a "Verified Fiduciary" and not an unlicensed "Guru" or a "Barred Broker." The client can scan the badge during an initial meeting to see the "Active" status directly from the SEC domain.

**Institutional Onboarding:** Proving to a major custodian bank (e.g., Schwab or Fidelity) that their individual credentials are verified and current, speeding up the "Trading Authority" setup.

## Who Checks It

**Retail Investors (Consumers)**
**Fraud Prevention:** Before handing over life savings, an investor can verify the advisor's credentials. This stops "Affinity Fraud" where scammers pose as legitimate advisors to target specific religious or professional communities.

**Compliance Departments (CCOs)**
**Oversight:** Ensuring that every advisor in a large firm is actually keeping their filings current. Live Verify allows for automated credential auditing across thousands of employees.

**Referral Platforms**
**Merchant Vetting:** Ensuring that only verified, non-barred advisors are being recommended to users on financial lead-gen platforms.

## Who Issues It

**Issuer Types** (First Party)

**U.S. Securities and Exchange Commission (SEC).**
**FINRA:** (Managing the IAPD database).
**State Securities Regulators.**

**Privacy Salt:** Critical. CRD numbers and names are public, but the hash must be salted to prevent "Mass Scraping" of the advisor database by marketers or scammers.

## Authority Chain

**Pattern:** Regulated

The SEC registers investment advisors and maintains certification records.

```
✓ adviserinfo.sec.gov — Registers US investment advisors
  ✓ sec.gov — Regulates US securities markets
    ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the certifying organization's hashes and status changes plus structured metadata (advisor names, credential types, CRD numbers, approval dates, status) — never financial information — providing non-repudiation of advisor certification status.

## Compared With SEC Advisor Search (IAPD)

| Feature | Live Verify | IAPD / BrokerCheck (Web) | Scanned PDF Brochure |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to `sec.gov`. | **Database.** Direct from source. | **Zero.** Easily forged. |
| **Integrity** | **Binds Identity.** Proves *Who* is at the desk. | **Vague.** Hard to prove the person in front of you is the person in the DB. | **None.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires typing names/CRDs and navigating Gov UI. | **N/A.** |
| **Hardware** | **Ordinary smartphone.** Needs Live Verify on it (an app today). | **Technical.** Requires laptop/dedicated search. | **Visual.** |

**Where each fits:** IAPD and BrokerCheck are the authoritative public records, with disciplinary history and detail that no certificate carries, and a client doing proper diligence should read them. The gap is the first meeting, when a client is looking at a business card or a wall certificate and is unlikely to stop and search a database by name. Live Verify gives a quick confirmation that the registration text is one the issuer stands behind, and points naturally to the fuller record for anyone who wants to read on.
