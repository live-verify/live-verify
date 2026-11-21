---
title: "Non-Disclosure Agreements (NDA)"
category: "Legal & Court Documents"
volume: "Very Large"
retention: "Duration of agreement + 5-10 years"
slug: "non-disclosure-agreements"
verificationMode: "clip"
tags: ["NDA", "legal", "contracts", "confidentiality", "intellectual-property", "trade-secrets", "m-and-a-due-diligence"]
furtherDerivations: 1
---

## What is a Verified NDA?

A Non-Disclosure Agreement (NDA) is a foundational contract where parties agree not to share confidential information. In high-stakes business—such as tech demos, M&A due diligence, or celebrity employment—proving that an NDA was signed before secrets were revealed is the difference between a successful lawsuit and losing your IP forever.

A Verified NDA adds a cryptographic hash to the signature page. This proves:
1.  **Existence:** The specific version of the document existed on a specific date.
2.  **Integrity:** The "Scope of Confidentiality" terms haven't been altered since signing.
3.  **Identity:** The issuer (the law firm or the Disclosing Party) attests to the signature.

**"Page Swapping"** is a major risk in physical contracts. Disgruntled employees or rogue partners might swap a middle page of a physical NDA to remove a high-value technology from the "Confidential" list. Live Verify provides Per-Page Verification, ensuring that every paragraph of the contract remains exactly as it was when the digital hash was anchored to the legal domain.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="text-align: center; font-weight: bold; margin-bottom: 30px; font-size: 1.2em; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="nda"></span>Mutual Non-Disclosure Agreement</div>
<div style="font-size: 1em; line-height: 1.6; text-align: justify; color: #000;">
    <p>This Agreement is made effective as of <strong>January 15, 2026</strong>, by and between:</p>
<p><strong>Disclosing Party:</strong> Acme Global Hub, Inc.<br>
    <strong>Receiving Party:</strong> <strong>Consultant Dynamics, LLC</strong></p>
<p><strong>1. Confidential Information.</strong> Receiving Party shall not disclose any technical data, designs, trade secrets, or unreleased software code related to the "Project X" initiative...</p>
<p><strong>2. Term.</strong> This protection lasts for <strong>5 years</strong> from the date of disclosure.</p>
  </div>
<div style="margin-top: 40px; border-top: 2px solid #000; padding-top: 15px;">
    <div style="float: left; width: 45%;">
      Signed:<br>
      <em style="font-family: cursive;">/s/ Jane Doe</em>, CEO<br>
      Acme Global Hub, Inc.
    </div>
    <div style="float: right; width: 45%;">
      Signed:<br>
      <em style="font-family: cursive;">/s/ John Smith</em>, Director<br>
      Consultant Dynamics, LLC
    </div>
    <div style="clear: both;"></div>
  </div>
<div style="margin-top: 40px; font-size: 0.8em; color: #666; text-align: center;">
    Page 1 of 8  |  Contract ID: ACME-NDA-2026-042
  </div>
<div data-verify-line="nda" style="border-top: 1px dashed #999; margin-top: 20px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
    title="Demo only: Acme doesn't yet offer verification&#10;endpoints, so this is illustrative">
    <span data-verify-line="nda">verify:acme-corp.legal/v</span> <span verifiable-text="end" data-for="nda"></span>
  </div>
</div>

## The Problem: Backdated Leak Fraud

- **Backdating:** Signing an NDA *after* a leak happens and pretending it was signed before to avoid a lawsuit.
- **Page Substitution:** Replacing the "Scope" page in a physical contract to remove a specific technology from protection.
- **Status Faking:** Presenting an "Active" looking PDF for an NDA that was formally terminated months ago.

## What Is Checked

Party names, Effective date, Agreement ID, Page number (e.g., "Page 1 of 8"), Specific Scope of Confidentiality, Governing Law, Signature IDs, Law firm or Corporate Legal ID.

**Document Types:**
- **Mutual NDA:** Both sides share secrets.
- **One-Way NDA:** Used for investor pitches or vendor vetting.
- **Employee NDA:** Part of the onboarding/PIIA process.
- **Non-Compete Addendum:** (Linked hash) if allowed by local law.

## What the Checker Sees

Shows the issuer domain (the Disclosing Party's Counsel or CLM Platform) and current status.

**Status Indications:**
- **Active** — Agreement is currently in force and within its 5-year term.
- **Expired** — The confidentiality term has ended naturally.
- **Terminated** — The agreement was voided early by mutual consent.
- **Amended** — Superseded by a newer contract (linked hash).

## Who Holds It

The Receiving Party (Vendor/Contractor) benefits from verification.

**Compliance Clarity:** Proving to their own staff exactly *which* version of the NDA was signed. This prevents "Contract Creep" where the Disclosing Party tries to claim a stricter set of terms was in place than what was actually agreed upon.

**Audit Readiness:** Providing a verified list of active NDAs to an insurer or auditor to prove that the firm handles client trade secrets responsibly.

## Who Checks It

**M&A Due Diligence Teams**
**IP Vetting:** When "Acquiring Corp" buys "Acme Corp," they need to verify that Acme actually has NDAs in place with all 500 of its former contractors. Live Verify allows for Automated Due Diligence, where an AI can scan thousands of NDAs and verify their status instantly against the legal domain.

**Courts and Arbitrators**
**Evidence Admissibility:** Proving that the NDA presented in a "Trade Secret Theft" case is the exact, un-altered original signed 3 years ago, reducing the "He-said-she-said" arguments over PDF versions.

## Who Issues It

**Issuer Types** (First Party)

**Law Firms:** (e.g., "verify:skadden.com/...").
**Corporate Legal Departments:** (e.g., "verify:google.legal/...").
**CLM Platforms:** (e.g., Ironclad, Icertis, LinkSquares - hosting the verified hashes).

## Authority Chain

**Pattern:** Commercial

Law firms and corporate legal departments issue NDA verifications certifying signed confidentiality agreements. The issuer is self-authorized as the legal custodian of the contract.

```
✓ legal.example-corp.com/nda/verify — Certifies non-disclosure agreements with scope and term
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and E-Signature Platforms

E-signature platforms such as DocuSign handle the signing of an agreement and attach a digital signature to the electronic file. Live Verify answers a different question, mainly for printed or rescanned copies: does the issuing firm stand behind this exact text? The two work side by side.

| | E-signature platform | Live Verify on the NDA | Physical paper alone |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone with the original electronic file and software that validates its signature, or access to the platform. | Anyone holding a copy, printed or electronic. | Anyone can read it; checking ink signatures needs an expert. |
| **What the checker gets** | Strong evidence of who signed and that the file is unchanged, while it stays in its original electronic form. | Confirmation that the law firm or issuer published this exact text, as at its date, and whether it has been superseded or terminated. | The text as presented. |
| **What the holder shares** | The signed file. | Only the document they chose to hand over. | The paper. |
| **Reach** | Wherever the platform's signatures are accepted and can be validated. | Global in principle: any firm, in any country, that publishes hashes on its own domain. | Universal. |
| **Speed and cost** | Fast to sign; usually a paid subscription. | A few seconds per check: one web lookup, with no fee to the standard. | Free. |
| **What it needs** | The original file, and later checks can depend on the account or service remaining available. | The firm to publish hashes, and Live Verify-aware software on the checker's device. No law firm does this yet. | Nothing. |
| **Printing and scanning** | The digital signature does not survive printing. | Survives printing and scanning, since the check is on the visible text. | Not applicable. |
| **Best suited to** | Executing the agreement. | Checking a printed or filed copy years later. | Low-stakes agreements. |

**Where each fits:** E-signature platforms are a sound way to execute an agreement, and while the signed file stays in its original electronic form its embedded signature is strong evidence. That evidence does not survive printing or rescanning, and checking it years later can depend on the signing account or service still being available. Live Verify lets someone holding a printed or filed copy confirm the text against the law firm's domain, so an agreement can be signed electronically and remain checkable on paper.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
