---
title: "Contracts & Agreements (Multi-Page)"
category: "Corporate & Legal Documents"
volume: "Very Large"
retention: "Contract term + 6-10 years"
slug: "contracts-agreements-multipage"
tags: ["contract", "agreement", "multi-page", "signature", "terms", "legal", "page-substitution"]
---

## What are Multi-Page Contracts?

Contracts are legally binding agreements between parties. Multi-page contracts include commercial agreements, employment contracts, real estate transactions, loan documents, and partnership agreements. Each page must be verifiable to prevent page substitution attacks where favorable terms are swapped for unfavorable ones.

Contract fraud includes altering terms after signing, substituting pages, forging signatures, and misrepresenting agreed terms. Per-page verification creates an immutable record of exactly what was signed.

**Note:** Due to multi-page complexity, contract verification is typically **browser-extension only** rather than camera-based OCR.

## Per-Page Verification

Each page carries its own verification line. The signature page contains a rollup hash of all prior pages, binding the entire document together.

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="con1">[</span>SERVICES AGREEMENT<br>
  <br>
  This Agreement dated January 5, 2026<br>
  <br>
  BETWEEN:<br>
  Acme Corporation ("Client")<br>
  123 Main Street, Springfield<br>
  <br>
  AND:<br>
  TechServices LLC ("Provider")<br>
  456 Oak Avenue, Capital City<br>
  <br>
  1. SERVICES<br>
  Provider shall deliver software development<br>
  services as described in Exhibit A.<br>
  <br>
  Page 1 of 4<br>
  <span data-verify-line="con1">verify:acme-corp.com/contracts</span> <span verifiable-text="end" data-for="con1">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="con2">[</span>2. COMPENSATION<br>
  Client shall pay Provider $150,000<br>
  in monthly installments of $12,500.<br>
  <br>
  3. TERM<br>
  This Agreement begins January 15, 2026<br>
  and continues for 12 months unless<br>
  terminated per Section 7.<br>
  <br>
  4. INTELLECTUAL PROPERTY<br>
  All work product shall be owned by Client<br>
  upon full payment.<br>
  <br>
  Page 2 of 4<br>
  <span data-verify-line="con2">verify:acme-corp.com/contracts</span> <span verifiable-text="end" data-for="con2">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="con3">[</span>5. CONFIDENTIALITY<br>
  Both parties shall maintain confidentiality<br>
  of proprietary information for 5 years.<br>
  <br>
  6. LIMITATION OF LIABILITY<br>
  Provider liability limited to fees paid<br>
  in the 12 months preceding the claim.<br>
  <br>
  7. TERMINATION<br>
  Either party may terminate with 30 days<br>
  written notice for material breach.<br>
  <br>
  8. GOVERNING LAW<br>
  This Agreement governed by Delaware law.<br>
  <br>
  Page 3 of 4<br>
  <span data-verify-line="con3">verify:acme-corp.com/contracts</span> <span verifiable-text="end" data-for="con3">]</span>
</div>

<div style="font-family: 'Courier New', monospace; background: #f9f9f9; padding: 15px; border: 1px solid #999; font-size: 1em; color: #000; line-height: 1.6; max-width: 550px; margin: 24px auto;">
  <span verifiable-text="start" data-for="con4">[</span>IN WITNESS WHEREOF the parties have<br>
  executed this Agreement.<br>
  <br>
  ACME CORPORATION<br>
  By: _________________<br>
  Name: John Smith<br>
  Title: CEO<br>
  Date: January 5, 2026<br>
  <br>
  TECHSERVICES LLC<br>
  By: _________________<br>
  Name: Jane Doe<br>
  Title: Managing Partner<br>
  Date: January 5, 2026<br>
  <br>
  Page 4 of 4 (Signature Page)<br>
  Prior Page Hashes:<br>
  P1: 7c3a9f... P2: 2d8b4e... P3: 5f1c7a...<br>
  <span data-verify-line="con4">verify:acme-corp.com/contracts</span> <span verifiable-text="end" data-for="con4">]</span>
</div>

## Data Verified

Parties, effective date, key terms (compensation, term, obligations), signatures, page sequence integrity, exhibit references.

**Document Types:**
- **Commercial Contracts:** Service agreements, supply contracts.
- **Employment Agreements:** Offer letters, employment contracts.
- **Real Estate Contracts:** Purchase agreements, leases.
- **Loan Documents:** Credit agreements, promissory notes.
- **Partnership/Operating Agreements:** Entity governance documents.
- **Licensing Agreements:** IP licenses, software licenses.

## Data Visible After Verification

Shows the issuer domain (`acme-corp.com`, law firm domain) and contract status.

**Status Indications:**
- **Executed** — All parties have signed.
- **Pending Signature** — Awaiting one or more signatures.
- **Amended** — Modified by subsequent amendment.
- **Terminated** — Contract ended per terms or mutual agreement.
- **Expired** — Contract term completed.
- **Disputed** — Terms or validity under dispute.

## Second-Party Use

The **Contracting Parties** benefit from verification.

**Dispute Prevention:** Both parties can verify they have identical copies of what was signed.

**Enforcement:** In litigation, verified contracts prove exact terms agreed.

**Audits:** Proving contract terms to auditors, regulators, or tax authorities.

## Third-Party Use

**Courts / Arbitrators**
**Dispute Resolution:** Verified contracts establish what terms were actually agreed.

**Auditors**
**Contract Review:** Verify material contracts for financial statement purposes.

**Regulators**
**Compliance:** Verify required contract terms are present (e.g., consumer protections).

**Insurers**
**Coverage Determination:** Verify contract terms when determining liability coverage.

**Banks / Lenders**
**Collateral Review:** Verify contract terms before accepting contracts as collateral.

**M&A Advisors**
**Due Diligence:** Verify key contract terms of acquisition targets.

## Verification Architecture

**The Contract Fraud Problem**

- **Page Substitution:** Swapping pages to change terms after signing.
- **Term Alteration:** Editing amounts, dates, or obligations.
- **Signature Forgery:** Adding unauthorized signatures.
- **Version Confusion:** Presenting draft versions as final.
- **Exhibit Fraud:** Substituting referenced exhibits.

**Issuer Types** (First Party)

**Law Firms:** Drafting and maintaining executed contracts.
**Corporate Legal Departments:** In-house contract management.
**Contract Management Platforms:** (DocuSign, Ironclad, Agiloft).
**Notaries:** For contracts requiring notarization.
**Escrow Agents:** For contracts with escrow requirements.

**Per-Page Integrity**

Each page hash prevents substitution. The signature page's rollup hash creates a cryptographic chain binding all pages. If any page is modified, the rollup verification fails.

**Browser Extension Only**

Camera-based OCR is impractical for contracts due to:
- Document length (5-100+ pages for complex agreements)
- Complex formatting (numbered sections, exhibits, schedules)
- Legal precision requirements (every word matters)
- Multi-party signature verification

Browser extension allows verification of digital contracts page-by-page with automatic rollup validation. For physical contracts, scanning to PDF then browser verification is the recommended path.

**Amendment Handling**

Amendments reference the original contract and modify specific terms. Each amendment is verified separately, with the amendment hash chain linked to the original contract hash.


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
