---
title: "HMRC Trust Registration Service Confirmations"
category: "Financial Compliance"
volume: "Large"
retention: "Lifetime of trust + 5 years (MLR 2017)"
slug: "hmrc-trust-registration-confirmations"
verificationMode: "clip"
tags: ["hmrc", "trust", "trs", "beneficial-ownership", "aml", "compliance", "uk-trusts", "ubo", "5mld"]
furtherDerivations: 0
---

## What is an HMRC Trust Registration Confirmation?

Since 2022 (implementing the EU's 5th Money Laundering Directive, retained post-Brexit), most UK trusts must register with HMRC's **Trust Registration Service (TRS)**. The registration records the trust's beneficial ownership structure — the settlor, trustees, beneficiaries, and any protector or enforcer. HMRC issues a **Unique Taxpayer Reference (UTR)** for the trust and a registration confirmation.

Fund managers encounter trust structures constantly: family trusts investing in funds, charitable trusts, employee benefit trusts, offshore trusts with UK-resident beneficiaries. Under the Money Laundering Regulations 2017 (as amended), the fund manager must verify the trust's beneficial ownership. The TRS registration confirmation is a key piece of that evidence.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #0d47a1; background: #fff; padding: 0;">
  <div style="background: #0d47a1; color: #fff; padding: 15px;">
    <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="trs"></span>HM REVENUE & CUSTOMS</div>
    <div style="font-size: 0.8em;">Trust Registration Service — Registration Confirmation</div>
  </div>
  <div style="padding: 20px; font-size: 0.9em; line-height: 1.6;">
    <p><strong>Trust Name:</strong> The Ashworth Family Settlement<br>
    <strong>Trust UTR:</strong> 4829 173 882<br>
    <strong>Date of Registration:</strong> 14 September 2023<br>
    <strong>Trust Type:</strong> Discretionary Settlement<br>
    <strong>Date of Settlement:</strong> 3 April 2018</p>
    <div style="background: #e3f2fd; padding: 15px; margin: 15px 0; border: 1px solid #1976d2;">
      <p style="margin: 0; font-weight: bold;">REGISTRATION CONFIRMED</p>
      <p style="margin: 10px 0 0;"><strong>Lead Trustee:</strong> Margaret Ashworth</p>
      <p style="margin: 5px 0 0;"><strong>Number of Beneficiaries:</strong> 4</p>
      <p style="margin: 5px 0 0;"><strong>Annual Declaration Due:</strong> 31 January 2027</p>
      <p style="margin: 5px 0 0;"><strong>Registration Status:</strong> Up to date</p>
    </div>
    <p style="font-size: 0.85em; color: #666;">This confirmation is issued under the Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (as amended).</p>
    <div style="margin-top: 15px; font-size: 0.8em; font-family: monospace; text-align: center; color: #666; border-top: 1px dashed #ccc; padding-top: 10px;">
      <div data-verify-line="trs" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #555;">
        <span data-verify-line="trs">verify:hmrc.gov.uk/trust-register</span> <span verifiable-text="end" data-for="trs"></span>
      </div>
    </div>
  </div>
</div>

## Data Verified

Trust name, UTR, date of registration, trust type (bare, discretionary, interest in possession, etc.), date of settlement, lead trustee name, number of beneficiaries disclosed, annual declaration status, registration status.

**Privacy note:** Individual beneficiary names are NOT included in the verifiable text. The confirmation discloses the trust exists and is registered, the lead trustee, and the count of beneficiaries — but not their identities. Full beneficial ownership details remain in HMRC's confidential records, accessible only to those with a "legitimate interest" under the regulations.

## Data Visible After Verification

**Status Indications:**
- **Up to Date** — Trust registered and annual declaration current
- **Declaration Overdue** — Annual declaration not filed by deadline
- **Ceased** — Trust has been wound up and final declaration filed
- **Under Enquiry** — HMRC has opened an enquiry into the trust's registration
- **Suspended** — Registration suspended pending compliance action

## Why This Matters for Fund Managers

When a trust invests in a fund, the fund manager must perform CDD (Customer Due Diligence) on the trust structure under MLR 2017 Regulation 28. This includes:

1. **Verifying the trust exists** — Is this a genuine trust, or is the "settlor" fabricating a trust structure to obscure the real source of funds?
2. **Confirming registration** — Has the trust complied with its TRS obligation? An unregistered trust is a red flag for money laundering.
3. **Checking the lead trustee** — Does the lead trustee match who the fund manager is dealing with?
4. **Annual declaration status** — A trust that hasn't filed its annual declaration may have changed its beneficial ownership without updating the register.

Currently, fund managers rely on the trustee's self-declaration or a solicitor's confirmation letter. A verified TRS confirmation from `hmrc.gov.uk` is far stronger evidence.

**The fabrication risk:** Sophisticated money launderers use layered trust structures. "The Ashworth Family Settlement" sounds legitimate, but does it actually exist on the TRS? A fabricated confirmation letter from "HMRC" is trivially easy to produce. Verification eliminates this.

## Second-Party Use

**Fund managers** — CDD evidence that the investing trust is genuinely registered with HMRC. Presented during FCA audits to demonstrate adequate trust verification.

**Banks** — Account opening for trusts. The TRS confirmation is increasingly requested alongside the trust deed.

**Solicitors / accountants** — Professional advisers acting for the trust need to confirm the registration is current before signing off on transactions.

## Third-Party Use

**FCA supervisors** — Checking that fund managers verify trust registration as part of their CDD. If a fund has trust investors but no TRS confirmations on file, that's a compliance gap.

**Law enforcement (NCA, HMRC)** — Investigating layered ownership structures. Verified trust registrations help trace the chain of beneficial ownership.

**Other regulated firms** — When a trust is a counterparty in a transaction (e.g., buying property, entering a joint venture), the other party needs to verify the trust's legitimacy.

**Beneficiaries** — In trust disputes, beneficiaries may need to verify the trust's registration status and the identity of the lead trustee.

## Verification Architecture

**The Problem:**
- Fabricated trust structures used to obscure beneficial ownership
- Unregistered trusts operating in breach of MLR 2017
- Outdated trust registrations with changed beneficial ownership
- Forged HMRC confirmation letters presented during CDD
- Nominee trustee arrangements hiding the real controllers

**The Fix:** HMRC hashes each TRS confirmation at time of issue. The registration status is updated if the annual declaration lapses or the trust is wound up. Fund managers can verify the confirmation against `hmrc.gov.uk` instantly, rather than relying on paper letters or trustee self-declarations.

## Authority Chain

**Pattern:** Government Direct

HMRC operates the Trust Registration Service under statutory authority (MLR 2017 as amended).

```
✓ hmrc.gov.uk/trust-register — Maintains the UK Trust Registration Service under MLR 2017
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Equivalents

| | UK | US | EU |
|---|---|---|---|
| **Authority** | HMRC (Trust Registration Service) | IRS / FinCEN | Member state central registers |
| **Document** | TRS registration confirmation | IRS Form 3520-A (annual return of foreign trust); FinCEN Beneficial Ownership Information (BOI) report | Central Register of Beneficial Ownership entry (per 5MLD) |
| **Legal basis** | MLR 2017 (as amended); implementing 5MLD | IRC §6048 (Form 3520-A); Corporate Transparency Act 2021 (BOI) | EU Directive 2018/843 (5MLD) Art. 31; national implementing legislation |
| **Potential verify: domain** | `hmrc.gov.uk/trust-register` | `fincen.gov/boi-register` | Varies (e.g., `rbe.economie.fgov.be`, `register.bnotk.de`) |
| **Key difference** | Since 2022, most UK trusts must register; access restricted to those with "legitimate interest" | No single trust register; Form 3520-A is tax-focused (not AML); FinCEN BOI covers companies but not trusts specifically | Each member state maintains its own register; 5MLD requires "legitimate interest" access; some states (Luxembourg, Austria) fought implementation |

**Further Jurisdictional Peers**

- **Australia (ATO)** — Trusts must obtain an Australian Business Number (ABN) and Tax File Number (TFN) from the Australian Taxation Office (ATO). Trustees file annual trust tax returns (Trust Tax Return form). Under the *AML/CTF Act 2006*, reporting entities must identify and verify beneficial owners of trust customers. Key difference: Australia has no centralised trust register for AML purposes — trust identification relies on ABN/TFN registration (tax-focused) and the customer due diligence obligations on financial institutions.
- **Canada (CRA)** — Trusts must file annual T3 trust income tax returns with the Canada Revenue Agency (CRA). Since 2023, bare trusts and most express trusts must report beneficial ownership information (settlors, trustees, beneficiaries) under enhanced *Income Tax Act* requirements. Key difference: Canada's expanded trust reporting since 2023 is primarily tax-driven (following FATF recommendations) rather than AML-specific, but it effectively creates a beneficial ownership database accessible to law enforcement.
- **Singapore** — Trusts are governed by the *Trustees Act* and must be registered with the Inland Revenue Authority of Singapore (IRAS) for tax purposes. Licensed trust companies are regulated by MAS under the *Trust Companies Act*. Key difference: Singapore has no public trust register; trust transparency relies on MAS-regulated trust companies conducting CDD on their own trust structures, creating a private-sector-led model rather than a centralised registry.
- **Switzerland** — Switzerland has no public trust register and does not recognise trusts under domestic law (though it ratified the Hague Trust Convention in 2007). Financial intermediaries must identify beneficial owners of trusts under the *Anti-Money Laundering Act (AMLA)* and the *Agreement on the Swiss Banks' Code of Conduct (CDB 20)*. Key difference: the absence of a trust register means trust transparency relies entirely on the due diligence obligations of Swiss financial intermediaries — a significant gap that FATF has repeatedly flagged.

**Tax Evasion & Transparency**

Trust registration is primarily a tax transparency measure. Trusts are a dominant vehicle for tax planning and, in abuse cases, tax evasion — using distinct legal frameworks from AML:

- **UK:** TRS (Trust Registration Service) was created primarily to implement 4MLD/5MLD trust transparency requirements — but HMRC uses it for tax compliance (income tax, IHT, CGT on trust assets)
- **US:** IRS Form 3520/3520-A for foreign trust reporting; FATCA reporting of trust accounts; grantor trust rules
- **FATCA/CRS:** Trusts are a key CRS reporting entity; trust UBO data feeds automatic exchange of financial account information across 100+ jurisdictions
- **EU:** DAC6 — cross-border trust arrangements are reportable; 5MLD expanded trust registration requirements across member states
- **Australia:** ATO trust tax compliance programs; trusts are the dominant business/investment structure — significant tax compliance focus
- **Canada:** T3 Trust Income Tax and Information Return; CRA scrutiny of trust arrangements for tax avoidance
- **Offshore jurisdictions:** Jersey, Guernsey, Cayman, BVI trust registers — increasing transparency requirements under FATF/EU/UK pressure; Economic Substance Requirements
- **OECD:** Mandatory Disclosure Rules for CRS Avoidance Arrangements (MDR) — specifically targets trust structures used to circumvent CRS

## Jurisdictional Witnessing

A jurisdiction may require the issuer to retain a **witnessing firm** for regulatory compliance. The witnessing firm:

- Receives all hashes from the issuer, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change, or even a 404 (record deleted)
- Receives structured content/metadata (key identifiers and dates)
- Does **NOT** receive plaintext or sensitive personal information
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to document holders/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** HMRC cannot deny issuing the registration confirmation
- **Timestamp proof:** Trust was registered at a specific time
- **Regulatory audit:** Jurisdictions can inspect the witness ledger for registration integrity
- **Resilience:** Verification works even if issuer's systems go down
