---
title: "Franchise Agreements and Disclosure Documents"
category: "Business & Commerce"
volume: "Small"
retention: "Term plus 7+ years"
slug: "franchise-agreements"
verificationMode: "clip"
tags: ["franchise-agreement", "fdd", "item-19", "business-opportunity", "corporate-compliance", "ftc-rule", "franchisor-verification"]
furtherDerivations: 1
---

## What is a Franchise Disclosure?

If you want to open a McDonald's or a 7-Eleven, you must receive a Franchise Disclosure Document (FDD). This is a massive 200-page book where the brand must tell you the truth about how much money their stores actually make.

The most important part is Item 19, where the company lists verified profits.

Fraud is high-stakes: some "Salesmen" edit the FDD to hide lawsuits or to inflate the profits to trick people into buying a failing franchise. Verified hashes ensure the financial claims in your copy match the official version filed with the government.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 10px;">
    <div style="font-weight: bold; font-size: 1.4em; color: #000;"><span verifiable-text="start" data-for="franchise"></span>7-ELEVEN, INC.</div>
    <div style="font-size: 0.85em; color: #666; margin-top: 5px;">OFFICIAL FRANCHISE DISCLOSURE DOCUMENT (FDD)</div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 1px;">Disclosure Verification</h3>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; text-align: justify;">
    <p>This document serves as a verified extract of the FDD provided to <strong>John Jacob Doe</strong> for the proposed franchise location at:</p>
<p style="text-align: center; font-weight: bold;">123 Convenience Way, Austin, TX 78701</p>
<div style="background: #f9f9f9; border: 1px solid #eee; padding: 15px; margin: 20px 0;">
      <p><strong>Item 19 (Financial Performance):</strong> 2025 Average Net Sales: $ 1,450,000.00 (Verified by Milliman Audit #992)</p>
      <p><strong>Initial Franchise Fee:</strong> $ 25,000.00<br>
      <strong>Ongoing Royalty:</strong> 5.0% of Gross Sales</p>
    </div>
<p><strong>FDD Fiscal Year:</strong> 2026 (Edition 1.0)<br>
    <strong>Receipt Date:</strong> March 15, 2026</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Sarah Miller, VP Development</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-left: auto;">CORP<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="franchise" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: 7-Eleven doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:7-eleven.com/franchise/v <span verifiable-text="end" data-for="franchise"></span>
    </div>
</div>

## The Problem: Item 19 Fraud

- **Earnings Inflation:** Editing the PDF to change a $100k average profit to $500k to trick a buyer into an expensive franchise.
- **Litigation Hiding:** Removing the pages from "Item 3" that list the 50 pending lawsuits against the franchisor.
- **Backdating Receipts:** Fabricating a disclosure receipt from 14 days ago to bypass the mandatory federal waiting period and force a fast closing.

## What Is Checked

Franchisor legal name, Franchisee candidate name, proposed location/territory, FDD fiscal year/version, Item 19 earnings claims (numerical), initial fees, royalty rates, date of disclosure receipt (starting the 14-day clock), term length, renewal rights.

**Document Types:**
- **Franchise Disclosure Document (FDD):** The 200+ page primary disclosure.
- **Franchise Agreement:** The final signed 10-year contract.
- **Area Development Agreement:** For multi-unit investors.
- **Disclosure Receipt:** Mandatory proof of the 14-day cooling-off period.

## What the Checker Sees

Shows the issuer domain (`7-eleven.com`, `subway.com`, `mcdonalds.com`) and current agreement status.

**Status Indications:**
- **Disclosed** — FDD has been officially provided to the candidate.
- **Under Cooling-Off** — Mandated 14-day waiting period is active.
- **Fully Executed** — Agreement is signed and binding.
- **Terminated** — Franchise rights revoked (e.g., for non-payment or brand standards).

## Who Holds It

The Franchisee (Investor) benefits from verification.

**Due Diligence Defense:** Proving to their lawyers and family that the "Item 19" earnings claims aren't just verbal promises from a salesman, but are verified, audited facts from the franchisor's own domain. This stops the most common form of franchise fraud: "Earnings Misrepresentation."

**SBA Loan Approval:** Proving to a lender that the "Franchise Package" is authentic and current. Lenders often reject outdated FDDs; a verified hash from the franchisor removes this delay.

## Who Checks It

**The Federal Trade Commission (FTC)**
**Enforcement:** Regulators can verify that the FDD version being handed to candidates matches the latest version filed with the government. Live Verify prevents "Selective Disclosure" where a franchisor hides a negative lawsuit from a prospect.

**Lenders / Banks**
**Risk Management:** Verifying the "Termination Provisions" and "Royalties" before lending $500,000 for a store build-out.

**Commercial Landlords**
**Tenant Vetting:** Ensuring that a new "Starbucks" or "7-Eleven" tenant actually has a verified franchise agreement in place before signing a 10-year commercial lease.

## Who Issues It

**Issuer Types** (First Party)

**Franchisors:** (National brands).
**Franchise Law Firms:** (Hosting verified hashes for their clients).
**State Securities Regulators:** (In "Registration States" like NY or CA).

## Authority Chain

**Pattern:** Regulated

Franchisors disclose franchise agreements under UK and US franchise regulations.

```
✓ franchise.mcdonalds.co.uk — Discloses franchise agreements
  ✓ bfa.org.uk — Registers UK franchise disclosures
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and State Franchise Registries

In the US, franchisors must give prospects a Franchise Disclosure Document under federal rules, and a number of states also require the document to be registered and keep their own registries. Many states have no registry, and other countries regulate franchise disclosure differently or not at all. The registry and Live Verify answer different questions and work side by side: one holds the filing made with the state, the other confirms that the franchisor stands behind the copy a particular prospect was handed.

| | State franchise registry | Live Verify on the disclosure document | Unverified scan or PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who searches the registry of a state that keeps one. | Anyone handed the document: the prospect, their lawyer, a lender. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The franchisor's filing with that state. | Confirmation that the franchisor stands behind this exact document, including its financial performance figures, as at its date. | A document that may have been edited. |
| **What the holder shares** | Nothing; the filings are public where they exist. | Only the document they chose to hand over. | Only the document they chose to hand over. |
| **Reach** | Only states with a registry. | Global in principle: any franchisor, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Varies by state; searching or obtaining copies can be slow. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A registry in the relevant state. | The franchisor to publish hashes, and Live Verify-aware software on the checker's device. No franchisor does this yet. | Nothing. |
| **Best suited to** | Legal due diligence on what the franchisor has filed. | Confirming that the copy received is the franchisor's own, page by page. | Nothing where an investment depends on it. |

**Where each fits:** State franchise registries are the official record of what a franchisor has filed, and a prospect's lawyer should look there. Not every state keeps one, searching can be slow, and the registry holds the generic filing rather than the copy handed to a particular candidate. Live Verify lets the prospect or their lender confirm that the franchisor stands behind the disclosure document actually received, including its financial performance figures, as a complement to the registry search.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
