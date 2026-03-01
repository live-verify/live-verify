---
title: "Board Resolutions and Written Consents"
category: "Business & Commerce"
volume: "Small"
retention: "Permanent"
slug: "board-resolutions-written-consents"
tags: ["corporate-governance", "board-of-directors", "resolution", "written-consent", "legal-authority", "m-and-a"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="board">[</span>ACTION BY UNANIMOUS WRITTEN CONSENT</div>
    <div style="font-size: 0.9em; margin-top: 5px;">OF THE BOARD OF DIRECTORS OF</div>
    <div style="font-weight: bold; font-size: 1.1em; margin-top: 5px;">INITECH HOLDINGS, INC.</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>The undersigned, being all the members of the Board of Directors of Initech Holdings, Inc., a Delaware corporation (the "Company"), hereby take the following actions by written consent:</p>
<p><strong>RESOLVED:</strong> That the Company is hereby authorized to enter into the Merger Agreement with Globochem Corp. dated as of March 15, 2026.</p>
<p><strong>RESOLVED FURTHER:</strong> That the Officers of the Company are authorized to execute all such documents as are necessary to effectuate the foregoing resolution.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Bill Lumbergh</div>
      <div style="font-size: 0.8em; color: #777;">Director</div>
    </div>
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Peter Gibbons</div>
      <div style="font-size: 0.8em; color: #777;">Director</div>
    </div>
  </div>
<div data-verify-line="board" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Law firm doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:wilson-sonsini.com/docs/v <span verifiable-text="end" data-for="board">]</span>
  </div>
</div>

## Data Verified

Corporate name, resolution text (digest), date of action, names of directors/officers signing, type of action (Unanimous Written Consent vs. Meeting Minutes), jurisdiction of incorporation.

**Document Types:**
- **Unanimous Written Consent:** Signed by all directors without a meeting.
- **Board Meeting Minutes:** Summary of a formal meeting.
- **Secretary's Certificate:** Certification that a resolution is true and in effect.
- **Officer's Certificate:** For high-level corporate actions (e.g., IPO).

## Data Visible After Verification

Shows the issuer domain (e.g., the Corporation or its primary Law Firm) and current status.

**Status Indications:**
- **In Effect** — Resolution is valid and has not been rescinded.
- **Superseded** — A later resolution has modified or replaced this one.
- **Rescinded** — The Board has formally cancelled this action.
- **Void** — Action determined to be ultra vires or legally invalid.

## Second-Party Use

The **Corporation** benefits from verification.

**Bank Account Opening:** Proving to a bank that the "Resolution to Open Account" isn't a fake PDF created by a rogue employee, but is an official board-sanctioned document.

**Real Estate Closing:** Proving to a title company that the officers signing the deed have the verified authority from the Board to sell the property.

**M&A Due Diligence:** Providing a "Verified Minute Book" to a buyer, reducing the thousands of hours lawyers spend manually confirming signatures and corporate actions.

## Third-Party Use

**Investment Banks / Underwriters**
**IPO Due Diligence:** Ensuring every major corporate milestone (funding rounds, stock grants) has a verified, timestamped board resolution, preventing "Founders Disputes" later.

**Commercial Lenders**
**Authority Verification:** Confirming that the people signing a $100M loan agreement are the actual authorized representatives of the company.

**Landlords / Lessors**
**Lease Signing:** Verifying the "Corporate Authority" of the person signing a 10-year commercial lease.

## Verification Architecture

**The "Backdated Resolution" Fraud Problem**

- **Retroactive Grants:** Issuing stock options today but "resolving" them at last year's lower price (Stock Option Backdating). Verification timestamps prevent this.
- **Unauthorized Actions:** A CEO fabricating a resolution to sell a company asset without Board knowledge.
- **Phantom Directors:** Creating a resolution signed by non-existent or "straw" directors to bypass governance.

**Issuer Types** (First Party)

**Corporations:** (Hosting on their own internal IR/Legal domain).
**Law Firms:** (e.g., WSGR, Fenwick, Cooley - hosting on behalf of clients).
**Equity Platforms:** (e.g., Carta, Pulley - who manage the cap table and resolutions).

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


## Competition vs. Corporate Registries (Delaware SOS)

| Feature | Live Verify | Secretary of State (SOS) | Virtual Data Room (VDR) |
| :--- | :--- | :--- | :--- |
| **Granularity** | **High.** Verifies specific *resolutions*. | **Low.** SOS only tracks broad status (e.g., Good Standing). | **Full.** But requires gated access. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Law Firm/Corp. | **Gov-Bound.** | **System-Bound.** Trust the VDR vendor. |
| **Cost** | **Low.** Standard web infra. | **High.** SOS filings/searches cost fees. | **High.** VDRs cost thousands/month. |
| **Interoperability** | **Universal.** PDFs stay verifiable anywhere. | **Siloed.** | **Restricted.** Access usually revoked post-deal. |

**Why Live Verify wins here:** Specificity. A "Certificate of Good Standing" from Delaware only says the company exists. It doesn't say "The Board authorized the sale of the factory." Live Verify turns the **Private Resolution** into a verifiable artifact that can be shared with banks and buyers without exposing the entire secret minute book.
