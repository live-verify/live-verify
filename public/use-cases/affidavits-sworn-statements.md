---
title: "Affidavits and Sworn Statements"
category: "Legal & Court Documents"
volume: "Small"
retention: "10-30 years (legal proceedings)"
slug: "affidavits-sworn-statements"
verificationMode: "clip"
tags: ["affidavits", "sworn", "statements", "financial", "legal", "notary", "court"]
furtherDerivations: 1
---

## What is an Affidavit?

An Affidavit is a written promise. It is a document where you swear under penalty of perjury that certain facts are true (e.g., "I am the same person named in that Deed").

To prevent people from lying, affidavits must be Notarized. A Notary Public checks your ID and watches you sign.

In the "Robo-Signing" scandal of 2008, banks forged millions of affidavits to foreclose on homes illegally. Verification ensures that the Notary *actually* witnessed the signing and that the text hasn't been changed since.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 2px 2px 8px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 20px;">
    <h3 style="text-decoration: underline; text-transform: uppercase;"><span verifiable-text="start" data-for="affidavit"></span>AFFIDAVIT OF IDENTITY</h3>
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
      <span data-verify-line="affidavit">verify:notary-check.ny.gov/v</span> <span verifiable-text="end" data-for="affidavit"></span>
  </div>
</div>

## The Problem: Robo-Signing Fraud

- **Mass Production:** In the 2008 crisis, thousands of affidavits were signed by people who didn't read them or swear to them, often with fake notary signatures.
- **Backdating:** Signing a document today but dating it last month to meet a deadline.
- **Seal Forgery:** Buying a rubber stamp online and pretending to be a notary.

## What Is Checked

Affiant name, sworn facts (digest), date of execution, jurisdiction (State/County), notary name and commission number, type of notarial act (Jurat vs Acknowledgment).

**Document Types:**
- **Affidavit of Service:** Proving a lawsuit was served.
- **Affidavit of Heirship:** Real estate transfers without probate.
- **Financial Affidavit:** Divorce assets/debts.
- **Self-Proving Affidavit:** Attached to a Will.

## What the Checker Sees

Shows the issuer domain (e.g., the electronic notary platform or state registry) and the document status.

**Status Indications:**
- **Verified** — Matches the official journal entry of the notary.
- **Invalid** — Notary commission was expired at time of signing, or document altered.
- **Withdrawn** — Affiant recanted the statement (rare, but possible).

## Who Holds It

The Affiant (signer) benefits from verification.

**Anti-Tampering:** Ensuring that extra paragraphs aren't added to their sworn statement after they signed it.

**Acceptance:** Ensuring their affidavit is accepted by the court/bank without "rejected for bad seal" issues.

## Who Checks It

**Courts and Clerks**
**Filing Review:** Clerks can instantly verify that the notary is legitimate and the commission is active, preventing "robo-signing" fraud in foreclosure or debt collection cases.

**Title Companies**
**Clear Title:** Relying on Affidavits of Heirship to insure title. Verification reduces the risk of future claims by "missing heirs" who claim the affidavit was forged.

**Banks**
**Identity Theft:** Preventing fraudsters from using fake Affidavits of Identity to access dormant bank accounts.

## Who Issues It

**Issuer Types** (First Party)

**e-Notary Platforms:** (DocuSign, Notarize, etc.)
**State Secretary of State:** (Some states are building central notary registries)

## Authority Chain

**Pattern:** Regulated

```
✓ solicitors.example-firm.co.uk/affidavit/verify — Prepares and certifies sworn legal statements
  ✓ sra.org.uk/solicitors — Regulates solicitors in England and Wales
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, e-Notarization and Wet-Ink Notarization

Affidavits are sworn before a notary or commissioner, either in person with a wet-ink signature and stamp, or through e-notarization, where the document carries a digital signature. Which forms are accepted depends on where you are: some jurisdictions accept remote online notarization, others require in-person wet ink, and rules differ between courts. Notarization and Live Verify answer different questions and can sit on the same affidavit: notarization records that the oath was taken, while Live Verify lets the holder of any copy confirm the text has not changed.

| | e-Notarization with digital signature | Live Verify on the affidavit | Wet-ink notarization |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone with the original signed file and software that validates the signature. | Anyone holding the affidavit, printed or digital: a court, opposing counsel, a registry. | Anyone looking at the stamp and signature, who must judge them by eye. |
| **What the checker gets** | Confirmation that the electronic file has not changed since it was signed. | Confirmation that the notary or issuing firm stands behind this exact text, as at its date. | A stamp and signature that are hard to judge and can be forged. |
| **What the deponent shares** | The signed file. | Only the affidavit they chose to hand over. | The paper affidavit. |
| **Reach** | Wherever the file stays in its original electronic form and remote notarization is accepted; the signature is lost when the document is printed or flattened. | Global in principle: any notary or firm that publishes hashes on its own domain. | Accepted almost everywhere. |
| **Speed and cost** | Quick to validate in the right software; platforms and certificates cost money. | A few seconds per check: one web lookup, with no fee to the standard. | No checking cost; following up with the notary takes time. |
| **Long-term** | Depends on certificates and formats remaining checkable. | The text stays readable; checking depends on the issuer keeping its hashes online. | Paper lasts, but the stamp proves little years later. |
| **What it needs** | An e-notary platform, a signing certificate, and acceptance by the receiving court. | The notary or firm to publish hashes, and Live Verify-aware software on the checker's device. No notary does this yet. | A notary in person. |
| **Best suited to** | Documents that stay digital from signing to filing. | Printed and flattened copies passed between parties. | Courts and registries that require wet ink. |

**Where each fits:** e-notarization works well while a document stays in its signed digital form, and wet-ink notarization remains what many courts and counterparties expect. Affidavits are also printed for a judge, flattened into a case file, or posted to another party, and the digital signature does not carry over to those copies. Live Verify lets whoever holds one of those copies, with software that honours it, confirm that the notary or issuing firm stands behind the exact text, so it adds to either form of notarization rather than standing in for it.

See also [Legal Witnessing Future Architecture](../../docs/legal-witnessing-future-architecture.md) for a generalised model where the commissioner/notary confirms the hash corresponds to the sworn statement, and the attestation is published to an independent registry.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
