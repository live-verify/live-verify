---
title: "Data Sharing Agreements (DSA)"
category: "Scientific & Research"
volume: "Very Small"
retention: "7-20 years (IP/legal)"
slug: "data-sharing-agreements"
verificationMode: "clip"
tags: ["data-governance", "dsa", "research-agreement", "gdpr-compliance", "privacy-policy", "academic-collaboration", "legal-contract"]
furtherDerivations: 1
---

## What is a Data Sharing Agreement?

When universities or hospitals share sensitive data (like DNA sequences or patient records) for research, they sign a Data Sharing Agreement (DSA).

This contract is the "Legal Firewall." It says: "You can use this data for cancer research, but you are not allowed to sell it or try to identify the people in it."

Ethics violations are common: researchers sometimes use data for a different purpose than they promised. Verified hashes allow compliance officers to verify the exact authorized use of a dataset, protecting patient privacy across international borders.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 10px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="dsa"></span>DATA SHARING & USE AGREEMENT</div>
    <div style="font-size: 0.9em; margin-top: 5px;">OXFORD UNIVERSITY - RESEARCH SERVICES</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>This Agreement governs the transfer of Data from the <strong>Provider:</strong> Oxford University to the <strong>Recipient:</strong> Stanford Medical Research Center.</p>
<p><strong>Dataset ID:</strong> OX-BIO-2026-992 (Genomic Sequences)<br>
    <strong>Authorized Use:</strong> Cancer Research Initiative only.<br>
    <strong>Restrictions:</strong> No re-identification; No third-party transfer.</p>
<p><strong>Execution Date:</strong> March 15, 2026<br>
    <strong>Termination Date:</strong> March 14, 2031</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Prof. Albus Dumbledore</div>
      <div style="font-size: 0.8em; color: #777;">Authorized Signatory (Oxford)</div>
    </div>
    <div style="width: 45%; text-align: right;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; margin-left: auto;">RESEARCH<br>OFFICE</div>
    </div>
  </div>
<div data-verify-line="dsa" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: University doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="dsa">verify:ox.ac.uk/legal/v</span> <span verifiable-text="end" data-for="dsa"></span>
  </div>
</div>

## The Problem: Data Misuse Fraud

- **Scope Creep:** A researcher having a DSA for "Diabetes Research" but using the data for "Insurance Modeling" (a common ethics violation).
- **Unauthorized Transfers:** A recipient sharing the data with a third-party company without the provider's knowledge.
- **Fabricated DSAs:** Creating a fake agreement PDF to bypass institutional IRB (Ethics Board) review.

## What Is Checked

Provider institution name, Recipient institution name, Dataset ID/Title, specific Authorized Use (Scope), execution date, termination/expiration date, data protection status (e.g., GDPR compliant), authorized signatories.

**Document Types:**
- **Data Sharing Agreement (DSA):** The primary legal contract.
- **Material Transfer Agreement (MTA):** For biological/physical samples.
- **Data Use Certification (DUC):** For individual researchers.
- **Privacy Impact Assessment (PIA):** (Linked hash) proving risk review.

## What the Checker Sees

Shows the issuer domain (`ox.ac.uk`, `stanford.edu`) and agreement status.

**Status Indications:**
- **Active** — Agreement is fully executed and in effect.
- **Expired** — Data use period has ended; data must be destroyed.
- **Revoked** — Permission pulled due to a security breach or misuse.
- **Amended** — Replaced by a newer version (e.g., scope expanded).

## Who Holds It

The Data Recipient (Researcher) benefits from verification.

**Grant Funding:** Proving to a funding agency (e.g., NIH or Wellcome Trust) that they have "Verified Legal Access" to the necessary dataset. This prevents delays in grant disbursement.

**Publication Integrity:** Providing a verified link to the DSA in a published paper, proving the research was conducted under an official, institutional agreement.

## Who Checks It

**University Compliance Officers**
**Portfolio Audit:** Instantly verifying that all outgoing datasets are covered by active, non-expired agreements. Live Verify allows for a "Digital Census" of physical/PDF legal files.

**GDPR / Privacy Regulators**
**Chain of Custody:** If a data breach occurs, regulators can verify the "Authorized Use" and "Restrictions" of the original agreement to determine which party is liable.

**Collaborating Journals**
**Ethical Review:** Ensuring that the authors of a study had the legal right to use the data before publishing the results.

## Who Issues It

**Issuer Types** (First Party)

**Universities / Research Institutes:** (Oxford, Stanford, Max Planck).
**Medical Centers / Biobanks.**
**Tech Platforms:** (e.g., Vivli, Sage Bionetworks - who host shared data).

**Privacy Salt:** Highly critical. DSAs often involve sensitive health or genetic data labels. The hash must be salted to prevent "Guess-and-Check" searches for specific clinical trial involvements.

## Authority Chain

**Pattern:** Regulated

Research institutions document legal agreements for sharing research data.

```
✓ dsa.ukri.org/verify — Manages UK research data sharing agreements
  ✓ ico.org.uk — Regulates UK data protection and information rights
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Contract Management Systems

Universities, hospitals and companies use contract lifecycle management (CLM) software, such as Ironclad, to draft, approve, sign, store and renew agreements. Each institution runs its own, and the other parties to an agreement usually use a different one or none. A CLM system and Live Verify answer different questions and work side by side: the CLM manages the institution's own contracts, and Live Verify lets someone outside it check that a signed copy carries the wording the institution stands behind.

| | Contract management system | Live Verify on the signed agreement | Unverified PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Staff of the institution that runs it, and anyone it invites in. | Anyone handed the agreement: the counterparty, a funder, a journal, a regulator. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The full contract record: versions, approvals, obligations and renewal dates. | Confirmation that the issuing institution stands behind this exact text, including the authorised-use and restriction clauses, as at its date, and whether it has been terminated or superseded. | A document whose terms may have been edited. |
| **What the institution shares** | Access to its system, which it is often unwilling to grant to outsiders. | Only the agreement it chose to hand over. | Only the agreement it chose to hand over. |
| **Reach** | One institution and the people it lets in. | Global in principle: any institution, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Fast for its own users; licence fees for the institution. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A licence and an account. | The institution to publish hashes, and Live Verify-aware software on the checker's device. No institution does this yet. | Nothing. |
| **Best suited to** | Managing an institution's own contracts through their life. | An outside party checking the terms of an agreement they have been shown. | Nothing where data protection depends on it. |

**Where each fits:** a contract lifecycle management system serves an institution well for its own drafting, approvals and renewals, and nothing here suggests replacing it. The difficulty comes when the counterparty, a funder or a data protection reviewer sits outside that system and will not be given access to it. Live Verify lets any of them confirm that the signed PDF they hold carries the wording the institution stands behind, while each side keeps its own CLM.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
