---
title: "Affidavits and Sworn Statements"
category: "Financial & Legal Documents"
volume: "Small"
retention: "10-30 years (legal proceedings)"
slug: "affidavits-sworn-statements"
tags: ["affidavits", "sworn", "statements", "financial", "legal", "notary", "court"]
furtherDerivations: 1
---

## What is an Affidavit?

An **Affidavit** is a written promise. It is a document where you swear under penalty of perjury that certain facts are true (e.g., "I am the same person named in that Deed").

To prevent people from lying, affidavits must be **Notarized**. A Notary Public checks your ID and watches you sign.

In the "Robo-Signing" scandal of 2008, banks forged millions of affidavits to foreclose on homes illegally. Verification ensures that the Notary *actually* witnessed the signing and that the text hasn't been changed since.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 2px 2px 8px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 20px;">
    <h3 style="text-decoration: underline; text-transform: uppercase;"><span verifiable-text="start" data-for="affidavit">[</span>AFFIDAVIT OF IDENTITY</h3>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; text-align: justify;">
    <p>STATE OF NEW YORK )<br>
    COUNTY OF KINGS ) ss.:</p>
<p>I, <strong>JANE DOE</strong>, being duly sworn, deposes and says:</p>
<p>1. I reside at 123 Maple Street, Brooklyn, NY 11201.</p>
    <p>2. I am the identical person named as the grantee in the deed recorded in Liber 1234, Page 567.</p>
    <p>3. I make this affidavit to induce Title Insurance Co. to issue a policy free of exception.</p>
<div style="margin-top: 30px; margin-bottom: 30px;">
      <div style="border-bottom: 1px solid #000; width: 250px; margin-bottom: 5px;"></div>
      JANE DOE (Affiant)
    </div>
<p>Sworn to before me this 15th day of March, 2026.</p>
<div style="margin-top: 20px;">
      <div style="border-bottom: 1px solid #000; width: 250px; margin-bottom: 5px;"></div>
      NOTARY PUBLIC
    </div>
<div style="border: 1px solid #000; display: inline-block; padding: 10px; margin-top: 10px; font-size: 0.8em;">
      <strong>JOHN SMITH</strong><br>
      Notary Public, State of New York<br>
      No. 01SM6005555<br>
      Qualified in Kings County<br>
      Commission Expires April 1, 2028
    </div>
  </div>
<div data-verify-line="affidavit" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Notary platform doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:notary-check.ny.gov/v <span verifiable-text="end" data-for="affidavit">]</span>
  </div>
</div>

## Data Verified

Affiant name, sworn facts (digest), date of execution, jurisdiction (State/County), notary name and commission number, type of notarial act (Jurat vs Acknowledgment).

**Document Types:**
- **Affidavit of Service:** Proving a lawsuit was served.
- **Affidavit of Heirship:** Real estate transfers without probate.
- **Financial Affidavit:** Divorce assets/debts.
- **Self-Proving Affidavit:** Attached to a Will.

## Data Visible After Verification

Shows the issuer domain (e.g., the electronic notary platform or state registry) and the document status.

**Status Indications:**
- **Verified** — Matches the official journal entry of the notary.
- **Invalid** — Notary commission was expired at time of signing, or document altered.
- **Withdrawn** — Affiant recanted the statement (rare, but possible).

## Second-Party Use

The **Affiant** (signer) benefits from verification.

**Anti-Tampering:** Ensuring that extra paragraphs aren't added to their sworn statement after they signed it.

**Acceptance:** Ensuring their affidavit is accepted by the court/bank without "rejected for bad seal" issues.

## Third-Party Use

**Courts and Clerks**
**Filing Review:** Clerks can instantly verify that the notary is legitimate and the commission is active, preventing "robo-signing" fraud in foreclosure or debt collection cases.

**Title Companies**
**Clear Title:** Relying on Affidavits of Heirship to insure title. Verification reduces the risk of future claims by "missing heirs" who claim the affidavit was forged.

**Banks**
**Identity Theft:** Preventing fraudsters from using fake Affidavits of Identity to access dormant bank accounts.

## Verification Architecture

**The "Robo-Signing" Fraud Problem**

- **Mass Production:** In the 2008 crisis, thousands of affidavits were signed by people who didn't read them or swear to them, often with fake notary signatures.
- **Backdating:** Signing a document today but dating it last month to meet a deadline.
- **Seal Forgery:** Buying a rubber stamp online and pretending to be a notary.

**Issuer Types** (First Party)

**e-Notary Platforms:** (DocuSign, Notarize, etc.)
**State Secretary of State:** (Some states are building central notary registries)

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


## Competition vs. e-Notary / Digital Signatures

| Feature | Live Verify | e-Notary (Digital Sig) | Wet Ink (Traditional) |
| :--- | :--- | :--- | :--- |
| **Physicality** | **Bridges Gap.** Verifies the *printed* version of an e-notarized doc. | **Purely Digital.** Verification breaks if you print it out (signature invalid). | **Purely Physical.** Relies on looking at a rubber stamp. |
| **Court Filing** | **Easy.** Courts often require paper or flattened PDFs. OCR works on both. | **Hard.** Flattening a PDF removes the crypto-signature. | **Standard.** But prone to forgery. |
| **Long-Term** | **Durable.** Text is readable in 50 years. | **Fragile.** Root certificates expire; proprietary formats become obsolete. | **Durable.** |

**Why Live Verify wins here:** The legal world is "Paper-Persistent." Even if a document starts digital, it often ends up printed for a judge, scanned into a case file, or mailed to a defendant. Live Verify ensures the chain of verification survives these format shifts.
