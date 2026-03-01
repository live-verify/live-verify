---
title: "Insurance No Claims Certificates"
category: "Personal Lines Insurance"
volume: "Large"
retention: "5-7 years (claims history)"
slug: "insurance-no-claims-certificates"
tags: ["no-claims", "NCB", "NCD", "bonus", "discount", "claims-free", "insurance", "auto", "motor"]
---

## What is a No Claims Certificate?

A No Claims Certificate (also called No Claims Bonus/NCB, No Claims Discount/NCD, or Claims-Free Certificate) proves that a policyholder has not made any claims against their insurance policy for a specified period. This claims-free history entitles them to significant premium discounts, often 50-75% after 5+ years.

The certificate is essential when switching insurers, as the new insurer needs verified proof of claims history to apply the discount. Fraud is common: fake certificates claiming more years of claims-free driving than actually earned, or hiding claims that were made.

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="ncb">[</span>NO CLAIMS BONUS CERTIFICATE<br>
  Direct Line Insurance<br>
  Policy #DL-8847221-MOT<br>
  Policyholder: James Wilson<br>
  Vehicle Class: Private Motor<br>
  Claims-Free Years: 7<br>
  Last Claim: None on Record<br>
  Policy Period: Jan 2025 - Jan 2026<br>
  Certificate Issued: January 5, 2026<br>
  <span data-verify-line="ncb">verify:directline.com/ncb</span> <span verifiable-text="end" data-for="ncb">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="home">[</span>CLAIMS-FREE LETTER<br>
  State Farm Insurance<br>
  Policy #HO-44-8892-71<br>
  Policyholder: Sarah Chen<br>
  Coverage Type: Homeowners<br>
  Coverage Period: March 2020 - March 2025<br>
  Claims Filed: Zero<br>
  Claims Paid: Zero<br>
  Issued: January 6, 2026<br>
  <span data-verify-line="home">verify:statefarm.com/claims</span> <span verifiable-text="end" data-for="home">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="protected">[</span>PROTECTED NO CLAIMS BONUS<br>
  Admiral Insurance<br>
  Policy #ADM-2025-774412<br>
  Policyholder: Michael Torres<br>
  NCB Years: 9+ (Maximum)<br>
  Protection Status: Active<br>
  Fault Claims Allowed: 2 per 3 years<br>
  Current Fault Claims: 0<br>
  Valid Through: February 28, 2026<br>
  <span data-verify-line="protected">verify:admiral.com/ncb</span> <span verifiable-text="end" data-for="protected">]</span>
</div>

## Data Verified

Insurer name, policy number, policyholder name, coverage type, claims-free years earned, last claim date (if any), policy period, protection status, certificate issue date.

**Document Types:**
- **No Claims Bonus Certificate:** Standard NCB/NCD proof for motor insurance.
- **Claims-Free Letter:** General claims history for any insurance type.
- **Protected NCB Certificate:** Shows NCB protection status and terms.
- **International Claims History:** For drivers moving between countries.
- **Fleet Driver Claims Record:** Individual driver history within a fleet policy.

## Data Visible After Verification

Shows the issuer domain (`directline.com`, `admiral.com`) and claims status.

**Status Indications:**
- **Valid** — Certificate is current and claims history accurate.
- **Expired** — Coverage period ended, may need updated certificate.
- **Claim Filed** — Claim has been made since certificate issued.
- **Reduced** — NCB reduced due to recent claim.
- **Protected** — NCB protected despite fault claim.

## Second-Party Use

The **Policyholder** benefits from verification.

**Switching Insurers:** When getting quotes from new insurers, verified NCB certificates enable immediate discount application without waiting for manual verification.

**Premium Disputes:** If a new insurer claims they couldn't verify the NCB and charged full premium, verified certificates provide irrefutable proof.

**Claims Protection:** After a claim, verified pre-claim NCB status proves the policyholder was entitled to protection benefits.

**International Moves:** Drivers relocating between countries can prove their claims-free history to foreign insurers.

## Third-Party Use

**New Insurers**
**Underwriting:** When onboarding new customers, insurers verify NCB certificates to apply appropriate discounts and assess risk.

**Price Comparison Sites**
**Quote Accuracy:** Comparison platforms can verify NCB claims in real-time to ensure accurate quotes.

**Insurance Brokers**
**Customer Service:** Brokers placing coverage can instantly verify claims history rather than waiting for manual confirmation.

**Fleet Managers**
**Driver Assessment:** When adding drivers to fleet policies, managers verify individual claims histories.

**Motor Finance Companies**
**Risk Assessment:** Lenders on vehicle finance verify insurance history as part of affordability checks.

## Verification Architecture

**The NCB Fraud Problem**

- **Years Inflation:** Claiming 9 years NCB when only 3 years earned.
- **Claims Hiding:** Omitting recent claims to preserve full discount.
- **Policy Invention:** Entirely fake certificates from non-existent insurers.
- **Identity Fraud:** Using another person's claims-free history.

**Issuer Types** (First Party)

**Motor Insurers:** (Direct Line, Admiral, GEICO, Progressive) issue NCB certificates.
**Home Insurers:** (State Farm, Allstate, Aviva) issue claims-free letters.
**Brokers:** Some brokers issue certificates on behalf of underlying insurers.
**MIB (Motor Insurers Bureau):** Central database for UK claims history.

**NCB Protection**

Many policies offer "protected" NCB that survives one or two fault claims. The protection status is important information that should be included in verified certificates.

**Cross-Border Recognition**

NCB earned in one country may be recognized by insurers in another. Verified certificates from the original insurer help foreign insurers trust the claims history.

**Expiry Considerations**

NCB typically expires if not used within 2 years of policy end. Certificates should indicate both the earning period and the expiry date of the NCB entitlement.


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
