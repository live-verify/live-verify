---
title: "Corporate Resolutions and Board Minutes"
category: "Notary Services"
volume: "Small"
retention: "7-10 years (corporate records)"
slug: "corporate-resolutions-board-minutes"
tags: ["corporate-governance", "board-minutes", "resolution", "secretary-certificate", "legal-authority", "notary", "m-and-a", "authority-to-sign"]
furtherDerivations: 1
---

## What is a Corporate Resolution?

When a major corporation (like Waystar Royco) wants to borrow $500 million, sell a subsidiary, or sign a high-value contract, the bank or buyer doesn't just take the CEO's word for it. They need a **Corporate Resolution**.

This is an official document—usually a **Secretary's Certificate**—where the "Corporate Secretary" swears: "Our Board of Directors met on Tuesday and officially voted to allow the CEO to sign this specific deal."

**"Authority Fraud"** is a high-stakes corporate risk. Disgruntled or rogue officers sometimes fabricate these papers to open secret bank accounts, embezzle funds, or sell company land without board approval. Verified hashes turn these private papers into a live link to the company's official "Minute Book," protecting the corporation from its own executives.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="corp">[</span>SECRETARY'S CERTIFICATE OF RESOLUTION</div>
    <div style="font-size: 0.9em; margin-top: 5px;">OF THE BOARD OF DIRECTORS OF</div>
    <div style="font-weight: bold; font-size: 1.1em; margin-top: 5px;">WAYSTAR ROYCO CORP.</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>I, the undersigned, Secretary of Waystar Royco Corp. (the "Corporation"), hereby certify that the following is a true and correct copy of a resolution adopted by the Board of Directors on <strong>March 15, 2026</strong>:</p>
<div style="background: #fdfdfd; border-left: 4px solid #000; padding: 15px; margin: 20px 0;">
      <p style="margin-top: 0;"><strong>RESOLVED:</strong> That the Corporation is authorized to open a commercial credit facility with JPMorgan Chase Bank, N.A. in the amount of <strong>$500,000,000.00</strong> and that the CEO is authorized to execute all loan documents.</p>
    </div>
<p>I further certify that the said resolution has not been amended or rescinded and is in full force and effect as of the date hereof.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Gerri Kellman</div>
      <div style="font-size: 0.8em; color: #777;">Corporate Secretary</div>
    </div>
    <div style="width: 45%; text-align: right;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-left: auto;">NOTARY<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="corp" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Corporation doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:waystar-royco.com/legal/v <span verifiable-text="end" data-for="corp">]</span>
  </div>
</div>

## Data Verified

Corporation name, Date of board action, Specific resolution text (digest), Authorized signatories, Dollar amounts (if financial), Secretary's name, Notary name/commission, Date of certification, Law firm reference ID.

**Document Types:**
- **Secretary's Certificate:** Certifying a resolution for a third party.
- **Unanimous Written Consent:** Action taken without a formal meeting.
- **Board Minutes Extract:** A specific section of formal meeting notes.
- **Officer's Certificate:** Certifying corporate facts (e.g., "Active Status").

## Data Visible After Verification

Shows the issuer domain (`waystar-royco.com`, `wsgr.com`) and current authority status.

**Status Indications:**
- **Active/Effective** — Resolution is valid and the authority is current.
- **Rescinded** — **ALERT:** The Board has formally cancelled this authority.
- **Superseded** — A later resolution has modified these terms (linked hash).
- **Void** — Action determined to be unauthorized or fraudulent.

## Second-Party Use

The **Corporation** benefits from verification.

**Risk Management:** Ensuring that a disgruntled executive doesn't fabricate a "Resolution to Sell Intellectual Property" to liquidate assets behind the board's back. Live Verify provides an immutable audit trail of who was authorized to sign what.

**Banking / KYB:** Proving to a lender that the $500M loan authorization is verified. This speeds up "Know Your Business" (KYB) checks and reduces the risk of document rejection by bank compliance teams.

## Third-Party Use

**Commercial Lenders (Banks)**
**Authority Vetting:** Before releasing $500M, the bank's legal team must be 100% certain the person signing the loan has the board's authority. Live Verify turns the Secretary's Certificate into a live, trusted link to the company's official minute book.

**M&A Buyers**
**Due Diligence:** A buyer needs to verify that all major milestones (funding rounds, stock grants, mergers) were properly authorized. A "Verified Minute Book" reduces thousands of hours of legal review in a virtual data room (VDR).

**Real Estate Title Companies**
**Closing Security:** Ensuring that the corporate officers signing a deed for a multi-million dollar property sale have the verified authority to do so, preventing future "Quiet Title" lawsuits.

## Verification Architecture

**The "Phantom Resolution" Fraud Problem**

- **Signature Forgery:** Forging the signature of the Corporate Secretary or a Notary on a PDF extract.
- **Backdating:** Fabricating a resolution today but dating it "Last Year" to cover up an illegal or unauthorized corporate action.
- **Power Inflation:** Editing a resolution for a $1M loan to read $10M.

**Issuer Types** (First Party)

**Corporations:** (Hosting on their own `/legal` or `/compliance` domain).
**Law Firms:** (e.g., Skadden, Sullivan & Cromwell - hosting on behalf of clients).
**Equity Management Platforms:** (e.g., Carta, Pulley - managing board consents).

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


## Competition vs. Secretary of State (SOS)

| Feature | Live Verify | Secretary of State (SOS) | Private Virtual Data Room |
| :--- | :--- | :--- | :--- |
| **Granularity** | **High.** Verifies specific *Board Actions*. | **Low.** Only shows the company exists (Good Standing). | **Full.** But requires gated access. |
| **Trust Anchor** | **Domain-Bound.** Bound to the Corp/Law Firm. | **Gov-Bound.** | **System-Bound.** |
| **Cost** | **Low.** Standard web infra. | **High.** Filing/Search fees per document. | **Very High.** Monthly VDR costs. |
| **User Access** | **Instant.** Scan the paper at the bank. | **Slow.** Requires filing search and payment. | **Restricted.** Access often revoked post-deal. |

**Why Live Verify wins here:** Specificity. A government "Certificate of Good Standing" doesn't tell a bank who is authorized to sign a loan. Only a Corporate Resolution does. Live Verify turns that **Private Internal Document** into a verifiable artifact that can be safely shared with third parties without exposing the entire secret minute book.