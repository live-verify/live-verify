---
title: "Cyber Insurance Policies and Breach Response"
category: "Commercial Lines Insurance"
volume: "Small"
retention: "Policy term + 10 years (claims)"
slug: "cyber-insurance-policies"
verificationMode: "clip"
tags: ["cyber-insurance", "breach-response", "forensic-investigation", "privacy-liability", "incident-response", "risk-management", "security-compliance"]
furtherDerivations: 1
---

## What is Cyber Insurance?

If a company is hacked and customer data is stolen, they can be sued for millions. Cyber Insurance covers these legal fees, government fines, and the cost of "breach response" (like mailing notices to customers).

Large corporations (like Apple or Walmart) require all their vendors to have verified cyber insurance policies.

Fraudsters often "Photoshop" a low-limit policy ($100k) to look like a $10M policy to win big contracts. Live Verify allows a procurement officer to scan the vendor's policy and see the true limits on the insurer's domain instantly.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="cyber-pol"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">AIG SPECIALTY INSURANCE
CyberEdge Policy Declarations
═══════════════════════════════════════════════════════════════════

                  CERTIFICATE OF CYBER COVERAGE

Policy #: CE-99228877-26

Named Insured: Waystar Royco Digital, LLC
Industry:      Media & Technology Services

COVERAGE LIMITS
───────────────────────────────────────────────────────────────────
Coverage Module                                    Limit per Event
───────────────────────────────────────────────────────────────────
Privacy & Network Security Liability                 $ 10,000,000
Incident Response & Forensics                         $ 2,000,000
Cyber Extortion (Ransomware)                          $ 5,000,000

Policy Period: March 01, 2026 to March 01, 2027

SECURITY ATTESTATION: Insured warrants that Multi-Factor
Authentication (MFA) is active on all remote access points.

</pre>
<span data-verify-line="cyber-pol">verify:aig.com/cyber/v</span> <span verifiable-text="end" data-for="cyber-pol"></span>
</div>

## The Problem: MFA Misrepresentation Fraud

- **Warrant Falsification:** A company editing their policy PDF to hide the fact that the insurer *excluded* coverage because the company didn't have MFA.
- **Ghost Policies:** Buying a policy, printing the papers, then cancelling it immediately to bypass vendor security requirements.
- **Limit Inflation:** Changing a $1M "Incident Response" limit to $10M to win a prestigious tech contract.

## What Is Checked

Named insured, industry class code, specific coverage module limits (Liability, Response, Extortion), business interruption daily limit, effective/expiration dates, security warrants (e.g., "MFA active"), issuing carrier.

**Document Types:**
- **Policy Declarations:** The 1-page summary required by partners.
- **Forensic Case Report:** Summary of a verified breach investigation.
- **Remediation Certification:** Proving that security gaps were fixed post-breach.

## What the Checker Sees

Shows the issuer domain (`aetna.com`, `chubb.com`, `aig.com`) and current policy status.

**Status Indications:**
- **Active** — Premium paid; coverage in force.
- **Restricted** — Coverage limited due to safety/security non-compliance.
- **Cancelled** — Policy terminated (e.g., for misrepresentation of security posture).
- **Claim Active** — Incident response currently being funded.

## Who Holds It

The Insured Business (second party) receives the policy from the insurer (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** They have their own verified copy of the coverage terms. Most of the time, the policy sits in their business records—the verification value is latent, there *if needed*.

**Peace of Mind:** They can confirm at any time that the policy matches what the insurer's system recorded and hasn't been altered.

**Future Optionality:** If a cyber incident occurs or a dispute arises about coverage, they have cryptographic proof of the policy terms ready without needing to contact the insurer.

## Who Checks It

The insured business (second party) may hand the verified document to various third parties:

**Enterprise Procurement Teams**
**Vendor Vetting:** Procurement officers scan the COI/Dec Page of every vendor who has access to their data. "Verified by AIG" ensures the vendor isn't using a "Photoshopped" high-limit policy to hide their actual low-limit coverage.

**Banks / Lenders**
**Loan Compliance:** Verifying that a tech-heavy borrower has adequate cyber insurance to survive a ransomware attack, protecting the bank's repayment source.

**Regulators (State Insurance Depts)**
**Market Oversight:** Ensuring carriers are accurately reporting their "Cyber Exposure" totals by verifying the hashes of issued policies.

## Who Issues It

**Issuer Types (First Party)**

- Global Cyber Carriers (AIG, Beazley, Chubb, Travelers)
- Cyber Insurtechs (Coalition, At-Bay, Corvus)
- Managed Security Service Providers (MSSPs - who often co-sign the security warrants)

**Privacy Salt:** Required. Cyber insurance policies often contain enumerable values—round dollar coverage limits ($1M, $5M, $10M), standard retention amounts, and publicly known company names. A competitor could feasibly enumerate combinations to reverse-engineer a company's cyber risk profile and coverage strategy, gaining unfair market intelligence. Salt protects these strategic business decisions.

## Authority Chain

**Pattern:** Regulated

Beazley underwrites cyber liability and data breach insurance for global enterprises.

```
✓ cyber.beazley.com/verify — Underwrites cyber liability and data breach insurance
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Automated Security Scans (Bitsight)

| Feature | Live Verify | Security Rating (Bitsight/SecurityScorecard) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Binds the Financials.** Proves the *Money* exists. | **Binds the Tech.** Measures the *Security Score*. | **Zero.** Easily forged. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Insurer. | **Platform-Bound.** Trust the scanner algorithm. | **Visual.** |
| **Context** | **Legal.** Shows the actual contract limits. | **Predictive.** Guesses the risk from the outside. | **Full.** |
| **Freshness** | **Real-time.** Queries the carrier's live file. | **Weekly/Monthly.** Scans take time to refresh. | **Static.** |

**Where each fits:** Security ratings services such as Bitsight and SecurityScorecard measure something a policy document cannot: how a company's defences look from the outside, tracked over time. A counterparty weighing technical risk should keep using them. What a rating does not show is whether cover is in place and at what limits, and that is the question a contract clause usually asks. Live Verify lets a customer or partner with no relationship to the insurer confirm that the policy text they were handed is the insurer's own, so the two answer different questions about the same vendor.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
