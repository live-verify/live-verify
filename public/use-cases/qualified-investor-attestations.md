---
title: "Qualified Investor and Accredited Status Attestations"
category: "Investment & Fintech"
volume: "Large"
retention: "Audit cycle + 7 years"
slug: "qualified-investor-attestations"
verificationMode: "clip"
tags: ["qib", "qualified-institutional-buyer", "accredited-investor", "rule-144a", "reg-d", "institutional-access", "onboarding", "kyc", "aifmd", "mifid", "wholesale-investor", "platform-access"]
furtherDerivations: 2
---

## The Problem

Before an investor can access private placements, alternative funds, structured products, or institutional trading platforms, they must prove they meet a regulatory threshold — Qualified Institutional Buyer (QIB), accredited investor, professional investor, or equivalent.

This verification happens **repeatedly, manually, and identically** across every new relationship:

- Each new fund subscription requires QIB/accredited self-certification
- Each new platform onboarding (Tremor, Tradeweb, MarketAxess, Forge, Carta) requires the same proof
- Each Rule 144A private placement requires the same attestation
- Each new prime broker, counterparty, or dealer relationship re-verifies the same status

The process is always the same: the investor signs a self-certification letter, attaches supporting documentation (audited financials, AUM statements, net worth declarations), and the counterparty's legal/compliance team reviews it manually. Weeks pass. The same investor does this dozens of times per year across different relationships.

**Investor status categories:**

| Status | Jurisdiction | Threshold | Applies to |
|:---|:---|:---|:---|
| **Qualified Institutional Buyer (QIB)** | US (SEC Rule 144A) | $100M+ in securities owned/managed | 144A private placements, institutional-only platforms |
| **Accredited Investor** | US (SEC Reg D) | $1M net worth (ex. primary residence) or $200K income | Private fund subscriptions, Reg D offerings |
| **Professional Client** | EU/UK (MiFID II) | Meets quantitative/qualitative criteria | Access to complex products, reduced regulatory protection |
| **Wholesale Investor** | Australia | $2.5M net assets or $250K gross income | Wholesale-only fund access |
| **Qualified Purchaser** | US (Investment Company Act) | $5M+ in investments | Section 3(c)(7) fund access |

Every one of these is currently a manual, per-relationship re-verification of the same underlying fact.

## How Verified Attestations Change This

The investor's auditor, fund administrator, or regulated legal counsel issues a verifiable attestation:

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #1a3a5c; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="qib1"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">QUALIFIED INSTITUTIONAL BUYER ATTESTATION
Investor:       Meridian Capital Partners LP
Status:         QUALIFIED INSTITUTIONAL BUYER
Basis:          SEC Rule 144A (securities owned/managed > $100M)
Attested By:    PricewaterhouseCoopers LLP
Audit Period:   Year ended 31 Dec 2025
Valid Until:    31 Mar 2027
<span data-verify-line="qib1">verify:pwc.com/qib-attestations/v</span></pre>
  <span verifiable-text="end" data-for="qib1"></span>
</div>

The investor produces this once per audit cycle. Every platform, counterparty, and dealer checks it against the auditor's domain. The attestation is:

- **Reusable** — one attestation, dozens of relationships
- **Auditor-issued** — not self-certified; the auditor vouches based on the audit
- **Time-limited** — valid until the next audit cycle, then a fresh one is issued
- **Independently verifiable** — the platform checks the hash against PwC's domain, not against the investor's word

## Example: Accredited Investor (Individual)

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #2d5f2d; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="accred1"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">ACCREDITED INVESTOR ATTESTATION
Investor:       J. Williams
Status:         ACCREDITED INVESTOR
Basis:          SEC Reg D (net worth > $1M excl. primary residence)
Attested By:    Connolly Wealth Advisors LLC (SEC-registered RIA)
As At:          15 Mar 2026
Valid Until:    15 Mar 2027
<span data-verify-line="accred1">verify:connollywealthadvisors.com/attestations/v</span></pre>
  <span verifiable-text="end" data-for="accred1"></span>
</div>

For individuals, the attestor may be a registered investment adviser, a CPA, or an attorney — any regulated professional who can attest to net worth or income based on professional knowledge.

## Example: Platform Onboarding (Tremor, Tradeweb, etc.)

A fund applying to trade on an electronic platform presents its QIB attestation as part of onboarding. The platform's compliance team verifies the hash against the auditor's domain — seconds instead of weeks.

The platform still performs its own diligence (mandate review, legal entity checks, AML/KYC). But the QIB hurdle — the most standardised and most repetitive part of onboarding — is cleared instantly.

For platforms like Tremor that require the investor to demonstrate authority to write reinsurance risk, the QIB attestation clears one hurdle. The mandate review (does the fund's LPA permit reinsurance risk?) remains a separate, more bespoke check that verified attestations don't fully replace.

## Data Verified

Investor name, investor status category (QIB, accredited, professional client, wholesale, qualified purchaser), regulatory basis (Rule 144A, Reg D, MiFID II, etc.), attestor name and regulatory status, audit or assessment period, validity window.

**Document Types:**
- **QIB Attestation** — Auditor-issued for institutional investors ($100M+ threshold)
- **Accredited Investor Attestation** — RIA/CPA/attorney-issued for individuals
- **Professional Client Classification** — MiFID II firm-issued classification confirmation
- **Wholesale Investor Certificate** — Australian equivalent

**Privacy Salt:** Required. Investor identities and AUM thresholds are commercially sensitive. The hash must be salted to prevent competitors from probing whether specific funds hold QIB status.

## Data Visible After Verification

Shows the attestor's domain (`pwc.com`, `ey.com`, `connollywealthadvisors.com`) and the attestation status.

**Status Indications:**
- **Current** — Attestation is within its validity window
- **Expired** — Validity window has passed; a fresh attestation is needed
- **Withdrawn** — Attestor has withdrawn the attestation (e.g., AUM dropped below threshold, audit qualification)
- **Superseded** — A newer attestation has been issued
- **404** — No such attestation exists at this attestor's domain

## Second-Party Use

The **investor** benefits from portability and speed.

**Onboarding acceleration:** Instead of assembling the same documentation package for every new relationship, the investor shares a single verifiable attestation. The compliance review that currently takes weeks becomes a hash check that takes seconds.

**Competitive access:** In time-sensitive situations (a 144A placement closing in days, a reinsurance renewal window), the investor who can demonstrate QIB status instantly has an advantage over one still assembling paper documentation.

**Reduced disclosure:** The attestation proves threshold status without disclosing exact AUM, net worth, or detailed financials. "QIB — manages $100M+" reveals the threshold was met; it doesn't reveal whether AUM is $100M or $10B.

## Third-Party Use

**Electronic Trading Platforms**

**Onboarding compliance:** Tremor, Tradeweb, MarketAxess, Forge, Carta, and any platform with investor qualification requirements can accept verified attestations as part of their onboarding flow. The platform's compliance team verifies the hash; the auditor's domain is the trust anchor.

**Fund Managers and General Partners**

**Subscription processing:** When a new LP subscribes to a fund, the GP's legal team requires QIB/accredited certification. A verified attestation from the LP's auditor or adviser accelerates closing.

**Broker-Dealers and Placement Agents**

**144A distribution:** Every 144A private placement requires the dealer to confirm buyer QIB status. Currently this is a manual certification per transaction. A standing verified attestation from the buyer's auditor would streamline every 144A purchase.

**Regulators**

**SEC, FCA, ASIC:** Regulators don't certify investor status directly, but they define the thresholds and rules. Verified attestations create an auditable trail of who was classified as what, by whom, and when — useful for enforcement if a non-qualified investor was improperly given access.

## Verification Architecture

**The Repetitive Verification Problem**

- A single institutional investor may verify its QIB status 20-50 times per year across different relationships
- Each verification is the same substantive check against the same underlying facts (audited AUM)
- Each counterparty performs the check independently, with no way to know or reuse what others have already confirmed
- The investor assembles the same documentation package each time: audited financials, self-certification letter, supporting schedules

**Why self-certification is weak:**

The current system is largely self-certification — the investor signs a letter saying "we are a QIB." The counterparty accepts this at face value unless they have reason to doubt it. This is why auditor-issued attestations are stronger: the auditor has actually examined the financials, not just accepted the investor's assertion.

**Who issues the attestation (first party):**

- **Big 4 and mid-tier audit firms** — for institutional investors whose AUM is audited
- **Fund administrators** — for funds whose AUM is independently calculated (Citco, SS&C, Apex, etc.)
- **Registered Investment Advisers** — for individual accredited investor attestations
- **CPAs and attorneys** — for individual net worth / income attestations

## Authority Chain

**Pattern:** Regulated Professional / Auditor

```
✓ pwc.com/qib-attestations/v — QIB attestation for institutional investors
  ✓ pcaobus.org — Public Company Accounting Oversight Board (regulates audit firms)
```

```
✓ connollywealthadvisors.com/attestations/v — Accredited investor attestation
  ✓ sec.gov/adviser — SEC-registered investment adviser
```

The attestor is the trust anchor, not the investor. The regulatory body (PCAOB for auditors, SEC for RIAs) oversees the attestor.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Competition vs. Current Practice

| Feature | Verified Attestation | Self-Certification Letter | Platform-Specific Form | Audited Financials Package |
| :--- | :--- | :--- | :--- | :--- |
| **Reusable** | **Yes.** One attestation, many relationships. | **No.** Per-counterparty letter. | **No.** Per-platform form. | **Partially.** Same docs, different recipients. |
| **Auditor-backed** | **Yes.** Attestor is the auditor/admin. | **No.** Self-asserted. | **No.** Self-asserted. | **Yes.** But the full package, not a portable claim. |
| **Verification speed** | **Seconds.** Hash check. | **Days to weeks.** Manual review. | **Days to weeks.** Manual review. | **Weeks.** Full document review. |
| **Privacy-preserving** | **Yes.** Threshold only, not exact AUM. | **Partially.** Letter may disclose more. | **Varies.** | **No.** Full financials disclosed. |
| **Tamper-evident** | **Yes.** | **No.** | **No.** | **No.** |

**Practical conclusion:** self-certification and audited financials packages remain necessary for initial diligence. Verified attestations accelerate the repetitive re-verification that currently consumes weeks of compliance time across dozens of relationships per year.

## Further Derivations

1. **Mandate and Risk Authority Attestations** — Beyond investor status: a verifiable claim that a fund's governing documents permit specific activities (writing reinsurance risk, trading derivatives, holding illiquid assets). More bespoke than QIB status but follows the same attestor-issued pattern.
2. **KYC/AML Passporting** — A verified KYC attestation from one regulated entity (bank, broker) that other entities can rely on, reducing duplicative KYC across relationships. Already emerging as "KYC utilities" (e.g., SWIFT KYC Registry, Refinitiv) but without portable verified claims.
