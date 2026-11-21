---
title: "Proof of Address (Utility / Telco Confirmation)"
category: "Identity & Authority Verification"
volume: "Very Large"
retention: "Duration of account + 2 years"
slug: "proof-of-address"
verificationMode: "clip"
tags: ["proof-of-address", "utility-bill", "telco", "kyc", "aml", "address-verification", "bank-account-opening", "background-check", "identity", "onboarding"]
furtherDerivations: 2
---

## What is Proof of Address?

You're opening a bank account. The advisor says: "I need proof of address — a recent utility bill or bank statement." You pull up a PDF of your electricity bill on your phone. The advisor glances at it. That's the entire "verification" — a human eyeballing a PDF that takes three minutes to forge.

Utility bills, broadband bills, and mobile phone statements are the world's most commonly accepted proof of address documents. They are also among the easiest to fake. The address, the name, and the account number are plain text in a standard layout. Anyone with a PDF editor and a template can produce a convincing forgery.

Live Verify flips the model. Instead of the bank trusting a document the *customer* provides, the telco or energy provider publishes a salted hash confirming: **"We write to this person at this address concerning an active account."** The bank checks the hash against the provider's domain. The document becomes a carrier for the claim — the authority rests with the issuer's endpoint, not the PDF.

This remains a strong case because the utility or telco is itself the source of truth for the narrow claim being checked. There usually is no better universal native system than the provider saying "yes, this account is active at this address."

<div style="max-width: 550px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 20px; position: relative;">
  <div style="font-size: 0.85em; color: #555; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
    <strong>From:</strong> noreply@britishgas.co.uk<br>
    <strong>To:</strong> james.chen@gmail.com<br>
    <strong>Subject:</strong> Your monthly statement — March 2026
  </div>
  <div style="font-size: 0.95em; color: #333; margin-bottom: 15px;">
    Dear James,<br><br>
    Here is your statement for the period 1 Feb – 28 Feb 2026.
  </div>
  <div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6;">
    <span verifiable-text="start" data-for="addr"></span>British Gas<br>
    James T. Chen<br>
    42 Primrose Hill Road, London NW3 1AJ<br>
    Account active since: June 2023<span verifiable-text="end" data-for="addr"></span><br>
    <span data-verify-line="addr">verify:britishgas.co.uk/address</span>
  </div>
</div>

<div style="max-width: 550px; margin: 24px auto; font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; position: relative;">
  BT Group<br>
  James T. Chen<br>
  42 Primrose Hill Road, London NW3 1AJ<br>
  Account active since: March 2021<br>
  <span data-verify-line="bare24">verify:bt.com/address</span>
</div>

## The Problem: Utility Bill Fraud

A bank advisor, letting agent or employer asks for proof of address during onboarding and is shown a bill, often as a PDF on a phone. The check is a glance at a document the customer supplied, so a forged or out-of-date bill passes as easily as a real one. The cost is accounts, credit and services opened at addresses the person has no connection to.

- **PDF forgery:** Templates for every major UK utility are available online. Change the name and address, export as PDF, done. Even experienced compliance officers struggle to spot good forgeries.
- **Screenshot manipulation:** Mobile screenshots of utility apps are trivially editable.
- **Borrowed bills:** Using a friend's or relative's bill at the correct address but wrong name, then editing the name.
- **Expired accounts:** Presenting bills from closed accounts as proof of current address.
- **Address harvesting:** Stealing bills from letterboxes or bins to use as proof of address for fraud.

Live Verify addresses these because the hash resolves against the provider's domain. A forged PDF won't hash to anything the provider has published. A closed account will return "Closed" status. A stolen bill used by someone else fails because the third party sees the issuer-attested name, not just whatever's printed on the document.

## What Is Checked

Account holder full name, service address (full postal address), account active-since date, issuer identity (utility/telco name).

**Document Types:**
- **Utility Statement Address Block:** Structured block from gas, electricity, or water provider confirming name and address.
- **Telco Statement Address Block:** Same from broadband, mobile, or landline provider.
- **Council Tax Bill Address Block:** Local authority confirming name and address for tax purposes.

**Privacy Salt:** Essential. Name + address combinations are low entropy and easily guessable. Without a salt, an attacker could hash common names against known addresses to discover who lives where. The issuer includes a per-account salt in the hash computation. The salt is printed on the statement (or embedded in the verification line) so the verifier can reconstruct the hash, but an attacker without the document cannot enumerate.

## What the Checker Sees

Shows the issuer domain (`britishgas.co.uk`, `bt.com`, `thameswater.co.uk`) and account status.

**Status Indications:**
- **Verified** — Active account at this address, name matches issuer records.
- **Closed** — Account has been closed (customer moved or cancelled service).
- **Superseded** — A newer address confirmation exists (customer changed address but kept account).
- **Disputed** — Account holder has flagged the record as incorrect.

## Who Holds It

The Account Holder benefits from verification.

**Faster Onboarding:** Opening a bank account, applying for a mortgage, registering with a GP — anywhere proof of address is required. Instead of uploading a PDF and waiting for manual review, the verifier checks the hash in seconds.

**Multiple Verifiers, One Document:** The same statement can be verified by the bank, the landlord, the solicitor, and HMRC — each independently, without the account holder needing to request separate confirmation letters.

**Self-Verification:** Confirming that your own address records are correct before submitting them. Catches errors in the provider's records before they cause problems downstream.

**Immigration & Visa Applications:** Many visa categories require proof of UK/local address. A verified utility confirmation from a known provider's domain is stronger than an unverifiable PDF.

## Who Checks It

**Banks & Financial Institutions**
**KYC/AML Compliance:** Banks are required to verify customer addresses for anti-money-laundering compliance. Currently this means eyeballing PDFs or paying third-party data providers. A direct hash check against the utility provider's domain is cryptographically stronger and costs less.

**Background Checking Organisations**
**Streamlined Address History:** Firms like Experian, Equifax, Sterling, and First Advantage currently verify addresses through credit bureau data, electoral roll lookups, or manual document review. Live Verify gives them a direct channel to the authoritative source — the utility provider who actually sends mail to that address. This collapses a multi-step, multi-day process into a single hash lookup. Background checkers processing thousands of checks daily would see significant throughput gains.

**Landlords & Letting Agents**
**Tenant Screening:** Verifying that a prospective tenant actually lives where they claim. A verified address from a utility provider's domain is harder to fake than a PDF bill.

**Government Agencies**
**Benefits & Services:** DWP, HMRC, local councils — all require address verification for benefits, tax, voter registration. Direct verification against a utility provider eliminates reliance on self-declared addresses.

**Solicitors & Conveyancers**
**Property Transactions:** Verifying that the person selling a property actually lives there. Address fraud in property transactions costs millions annually.

**Employers**
**Right-to-Work Checks:** Some employment checks require address confirmation. HR departments can verify instantly rather than filing photocopied bills.

## Who Issues It

**Issuer Types** (First Party)

**Energy Providers:** British Gas, EDF, SSE, Octopus Energy, OVO, Scottish Power, and equivalents in other countries.
**Telco Providers:** BT, Sky, Virgin Media, Vodafone, Three, EE, and equivalents.
**Water Companies:** Thames Water, Severn Trent, United Utilities, and equivalents.
**Council Tax:** Local authorities issuing council tax bills.

**Privacy Salt:** Critical for this use case. The combination of a common name and a residential address has very low entropy. The issuer must include a random salt per account (or per statement period) to prevent rainbow-table attacks against the endpoint. The salt appears on the statement so the legitimate verifier can reconstruct the hash, but is not guessable by an attacker who doesn't possess the document.

## Authority Chain

**Pattern:** Institutional

```
✓ britishgas.co.uk/address — Energy provider confirming account holder address
✓ bt.com/address — Telco confirming account holder address
✓ thameswater.co.uk/address — Water company confirming account holder address
```

Trust derives from the utility provider's institutional authority. They know where they send bills because they operate the billing system.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## International Equivalents

| Country | Common Issuers | Notes |
|---------|---------------|-------|
| **UK** | British Gas, BT, Thames Water, council tax offices | Utility bills are the standard KYC address proof; Ofgem/Ofcom regulate providers |
| **USA** | Con Edison, AT&T, Comcast, PG&E, local water authorities | PATRIOT Act KYC requirements; utility bills widely accepted for address verification |
| **Canada** | Hydro-Québec, Bell, Rogers, Enbridge | Provincial utility regulators; bills accepted for federal ID applications |
| **Australia** | AGL, Origin Energy, Telstra, local water authorities | 100-point ID system accepts utility bills; ACMA regulates telcos |
| **Germany** | E.ON, Telekom, Stadtwerke (municipal utilities) | Meldebescheinigung (registration certificate) is primary; utility bills secondary |
| **France** | EDF, Orange, Veolia | Justificatif de domicile required for most administrative procedures |
| **India** | BSNL, Jio, state electricity boards | Aadhaar is primary but utility bills remain common for address proof |
| **South Africa** | Eskom, Telkom, municipal utilities | FICA requires proof of address for financial account opening |

## Where Each Fits: Live Verify and Existing Address Verification

Firms that must check a customer's address today typically query credit bureau data, such as Experian's, or review a utility bill or bank statement by hand. Coverage depends on where you are: credit bureau address data is well developed in some countries and thin or absent in many others. Bureau data and Live Verify answer different questions and work side by side: one draws on aggregated reported data, the other on the provider's confirmation of the bill in hand.

| | Credit bureau data (Experian etc.) | Live Verify on the bill or confirmation | Manual document review |
| :--- | :--- | :--- | :--- |
| **Who can check** | Firms with a contract with the bureau. | Anyone handed the document: a bank, a landlord, a government office. | Anyone, by eye. |
| **What the checker gets** | Address data that providers have reported, which can be stale or incomplete. | Confirmation that the utility or telco issued this exact document, as at its date, and its current account status if the provider shows it. | A document that may have been forged. |
| **What the customer shares** | Consent to a lookup; the bureau already holds the data. | Only the document they chose to hand over. | The document. |
| **Reach** | Countries with developed credit reporting, and providers that report to the bureau. | Global in principle: any utility or telco, in any country, that publishes hashes on its own domain. | Universal, but unreliable. |
| **Speed and cost** | Seconds by API; per-lookup fees apply. | A few seconds per check: one web lookup, with no fee to the standard. | Staff time, from hours to days in a review queue. |
| **What it needs** | A bureau contract and a customer with a credit footprint. | The provider to publish hashes, and Live Verify-aware software on the checker's device. No utility or telco does this yet. | Trained reviewers. |
| **Best suited to** | High-volume automated checks of customers with a credit history. | Customers with a thin credit file, recent movers, and countries without bureau coverage. | Fallback cases. |

**Where each fits:** Credit bureau checks are fast and suit high-volume onboarding where the customer has a credit footprint. Bureau data reflects what providers reported, which can lag a move, and many people have little or no credit history. Live Verify lets the firm check a bill against the provider's own domain, which covers those customers and markets directly.

## See Also

- [Social Security Benefit Statements](view.html?doc=social-security-benefit-statements) — Another proof document often shared in onboarding workflows
