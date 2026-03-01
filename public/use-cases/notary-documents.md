---
title: "Notarial Wills"
category: "Notary Services"
volume: "Small"
retention: "Permanent (estate records)"
slug: "notary-documents"
tags: ["acknowledgment", "apostille", "civil-law", "commission-fraud", "digital-notarization", "document-authentication", "e-signing", "estate-planning", "identity-verification", "jurat", "legal-authority", "legal-witness", "legalization", "mortgage-closing", "notarial-act", "notary", "ron", "succession", "sworn-statement", "wills", "witnessing"]
furtherDerivations: 3
---

## What is a Notarial Will?

In **Civil Law** jurisdictions (like France, Quebec, or Louisiana), a **Notarial Will** is a highly formal document prepared by a Notary and signed in the presence of witnesses. Unlike "Common Law" wills, which are private until death, a Notarial Will is an "Authentic Act"—it is a public document that proves itself in court.

Because it is an "Authentic Act," it has enormous legal weight:
1.  **Immediate Execution:** It can often be executed without a long "Probate" court process.
2.  **Immutability:** The original is kept by the Notary in their official archives (*Minutier*).
3.  **Presumption of Truth:** The law presumes the contents are 100% accurate.

**"Succession Fraud"** occurs when heirs present a fake "Notarial Will" or a modified copy to a bank to claim an inheritance illegally. Verified hashes bind the **Testator's name, the Notary's archive ID, and the date of execution** to the National Notary Chamber's domain. This allows a bank or a land registrar to instantly verify if the document is authentic and has not been **Revoked** by a later act.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #999; background: #fff; padding: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 40px;">
    <div style="font-weight: bold; font-size: 1.3em; letter-spacing: 2px;"><span verifiable-text="start" data-for="not-will">[</span>NOTARY OFFICE</div>
    <div style="font-size: 0.9em; text-transform: uppercase;">ACTE DE DERNIÈRE VOLONTÉ</div>
  </div>
<div style="font-size: 1.1em; line-height: 1.8; color: #000; text-align: justify;">
    <p>BEFORE US, <strong>Maitre JEAN-PIERRE LEFEBVRE</strong>, Notary in the City of Montreal, appeared <strong>MARCUS A. WILLOWS</strong>, who declared this to be his Last Will and Testament.</p>
<p>The Testator bequeaths his entire estate, both real and personal, to his surviving spouse, <strong>MARIE WILLOWS</strong>, and appoints her as the Liquidator of the Succession.</p>
  </div>
<div style="margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="width: 100px; height: 100px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; transform: rotate(-10deg);">OFFICIAL<br>NOTARY<br>ARCHIVE SEAL</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em; color: #777;">Archive Ref: 2026-ACTE-992288</div>
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Jean-Pierre Lefebvre, Notary</div>
    </div>
  </div>
<div data-verify-line="not-will" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Notary Chamber doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:notaires.qc.ca/v <span verifiable-text="end" data-for="not-will">]</span>
  </div>
</div>

## Data Verified

Testator name, Notary name, Commission Number, Date of Act, Witness names, Archive Reference ID, Succession location, Liquidator/Executor name, Specific bequests (digest).

**Document Types:**
- **Notarial Will:** Prepared by and kept by the Notary.
- **Codicil (Notarial):** Official amendment to a prior act.
- **Succession Certificate:** Proof issued by the Notary after death.
- **Revocation Act:** Proving a prior Will has been voided.

## Verification Response (Notarial Wills)

The endpoint returns a simple status code:

- **OK** — The Will is verified and is the latest act in the registry
- **SUPERSEDED** — A more recent Notarial Will exists; do not rely on this version
- **REVOKED** — The testator has formally cancelled this act
- **LIQUIDATED** — The succession is complete and assets distributed
- **404** — Will not found (never executed, wrong reference, or OCR error)

The issuer domain is visible from the `verify:` line on the document itself (e.g., `notaires.qc.ca`).

## Second-Party Use

The **Liquidator (Executor)** benefits from verification.

**Asset Control:** Proving to a bank or an investment house that they are the verified "Liquidator" of the estate. Because Notarial Wills are self-proving, a verified hash allows the Liquidator to bypass the 30-day "Succession Search" delay, moving money to pay debts in seconds.

**International Recognition:** Providing a verified hash to a foreign consulate or bank to prove heirship for assets held in another country.

## Third-Party Use

**Commercial Banks**
**Fraud Prevention:** Before releasing a €500,000 account, the bank scans the Will. "Verified by Notaires.fr" ensures the document isn't a fake copy created by a disgruntled relative.

**Land Registrars**
**Title Integrity:** Instantly verifying the authority of a Liquidator to sign a deed for the deceased's home, preventing "Title Gaps" and illegal sales.

**Superior Courts**
**Litigation Speed:** In a succession dispute, providing the court with a cryptographically verified record of the act, reducing the need for costly expert handwriting analysis.

## Verification Architecture

**The "Hidden Codicil" Fraud Problem**

- **Act Suppression:** Hiding a newer Notarial Will so that an older, more favorable one can be used. Live Verify stops this by showing the old Will as "Superseded" when scanned.
- **Copy Tampering:** Editing a "True Copy" of the Will to change the names of heirs.
- **Notary Impersonation:** Forging the seal of a retired or deceased Notary on a fake Succession Certificate.

**Issuer Types** (First Party)

**National Notary Chambers:** (e.g., *Chambre des Notaires du Québec*, *Conseil Supérieur du Notariat*).
**Regional Notary Councils.**
**Central Successions Registries:** (e.g., *Registre des Dispositions de Dernières Volontés*).

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


## Competition vs. Apostilles

| Feature | Live Verify | Apostille (Traditional) | Online Will Search |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Notary Org. | **Gov-Bound.** Trust the state seal. | **Database.** High trust but manual. |
| **Integrity** | **High.** Protects every line of text. | **Low.** Only verifies the signature. | **None.** For the specific paper. |
| **Speed** | **Instant.** 5-second scan. | **Very Slow.** Often takes weeks to get. | **Medium.** requires manual entry. |
| **Revocation** | **Real-time.** Shows latest status. | **Zero.** Apostilles never expire. | **Manual.** |

**Why Live Verify wins here:** The "Authentic Act" reality. In Civil Law, the document is the law. Live Verify turns the **Paper Copy** into a live, high-authority trust anchor, ensuring that "The Testator's Final Voice" is heard and verified exactly as recorded in the Notary's vault.

---

_[Content merged from: notarized-documents]_


## What is a Notarization?

A **Notarization** is the official act of a Notary Public—an officer of the state—verifying that a person signing a document is who they say they are.

It is the "Final Seal" of trust for life's most important moments:
1.  **Buying a Home:** Signing loan documents.
2.  **Parental Consent:** Allowing a child to travel internationally.
3.  **Legal Affidavits:** Swearing to facts in a court case.

**"Notary Fraud"** is a low-tech, high-impact crime. Criminals buy fake rubber stamps online for $20 or use "Photoshop" to move a real stamp from an old document to a new, forged one. They use these "Official" documents to steal identities, property, or even children.

Live Verify binds the **Notary's commission number, the signer's name, and the specific date** to the state's or the notary platform's domain. A fake stamp creates a hash that fails verification, instantly exposing the document as un-vetted.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #999; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="font-size: 1.1em; line-height: 1.6; color: #000;">
    <p style="text-align: right; font-size: 0.9em;"><span verifiable-text="start" data-for="notary">[</span>STATE OF FLORIDA<br>COUNTY OF MIAMI-DADE</p>
<p>The foregoing instrument was acknowledged before me this 15th day of March, 2026, by <strong>ROBERT J. MILLER</strong>, who is personally known to me or who has produced a Driver License as identification.</p>
  </div>
<div style="margin-top: 40px; display: flex; align-items: flex-start; justify-content: space-between;">
    <div style="width: 200px; border: 2px solid #000; padding: 10px; text-align: center; font-family: sans-serif; font-size: 0.75em; line-height: 1.3;">
      <div style="font-weight: bold; text-transform: uppercase;">Jane Doe</div>
      NOTARY PUBLIC<br>
      STATE OF FLORIDA<br>
      Comm# HH 992288<br>
      Expires: 12/31/2029
    </div>
    <div style="flex-grow: 1; margin-left: 30px; border-bottom: 1px solid #000; padding-top: 40px; font-style: italic; font-size: 0.9em;">
      Notary Signature
    </div>
  </div>
<div data-verify-line="notary" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
    title="Demo only: Florida Secretary of State doesn't yet offer verification&#10;endpoints, so this is illustrative">
    verify:flsos.gov/notary/v <span verifiable-text="end" data-for="notary">]</span>
  </div>
</div>

## Data Verified

Signer name, Notary name, Commission Number, Jurisdiction (State/County), Type of Notarial Act (Acknowledgment vs. Jurat), Identification Method (ID vs. Knowledge), Expiration Date of Commission, Date of Act.

**Document Types:**
- **Acknowledgment:** Signer declares they signed the document voluntarily.
- **Jurat:** Signer swears or affirms that the contents are true.
- **Copy Certification:** Notary verifies a copy is a true reproduction.
- **Apostille:** (Linked hash) for international recognition.

## Verification Response (Notarization)

The endpoint returns a simple status code:

- **OK** — The notary session is authentic and recorded in the journal
- **COMMISSION_REVOKED** — The notary's commission has been suspended for misconduct; do not rely on this act
- **COMMISSION_EXPIRED** — The notary performed the act after their commission lapsed; invalid
- **404** — Act not found (never recorded, wrong commission number, or forged seal)

The issuer domain is visible from the `verify:` line on the document itself (e.g., `flsos.gov`).

## Second-Party Use

**The Citizen (Signer)** benefits from verification.

**International Travel:** Proving to an airline or a foreign customs agent that a "Parental Consent" letter is verified. Without instant verification, a single parent traveling with a child can be detained for hours while the agent tries to "Verify the Stamp."

**Loan Processing:** Ensuring your notarized "Source of Funds" letter is verified, preventing a 24-hour delay in a mortgage closing.

## Third-Party Use

**County Recorders**
**Recording Security:** Before accepting a deed for recording, the clerk scans the notary seal. "Verified by flsos.gov" ensure the deed isn't being filed by a "Serial Forger" using a fake stamp.

**Foreign Embassies**
**Legalization:** Speeding up the Apostille process by verifying the underlying state notary act instantly, reducing wait times from weeks to seconds.

**Hospital Administrators**
**Directive Validity:** Verifying a "Do Not Resuscitate" (DNR) or Medical Power of Attorney at the bedside during a life-safety crisis.

## Verification Architecture

**The "Rubber Stamp" Fraud Problem**

- **Stamp Theft:** Using a legitimate notary's stolen stamp to authorize a fraudulent document.
- **Post-Dated Notarization:** Notaries signing a document months *after* the signer has left (illegal in all jurisdictions).
- **Template Forgery:** Creating a completely fake "Seal of the State" to trick people into trusting a contract.

**Issuer Types** (First Party)

**Secretaries of State:** (The primary regulating authority in the USA).
**Remote Online Notary (RON) Platforms:** (e.g., Proof, Notarize - hosting the cryptographically secure session hashes).
**National Notary Associations.**

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## The End of the Notary Seal

Traditional notary seals — rubber stamps, embossers, digital images — are visual trust signals. They say "this looks official." But they're trivially forged: a $20 custom stamp, a Photoshopped image, or a stolen embosser.

With verification text embedded in the document, the seal becomes vestigial:

| Feature | Verification Text | Physical Seal |
| :--- | :--- | :--- |
| **Trust anchor** | Cryptographic hash verified against issuer domain | Visual inspection ("does this look right?") |
| **Forgery resistance** | High — hash must match issuer's records | Zero — stamps are trivially copied |
| **Audit trail** | Instant link to notary journal | Manual — call the notary, check the journal |

**The seal doesn't disappear overnight.** It remains for ceremony and legacy recognition. But the verification line is now the trust mechanism; the seal is decoration.

## Document Format Considerations

Notarized documents are often multi-page legal contracts where the notary acknowledgment is a small section.

**One verification per page:**

A 20-page contract has 20 verification lines — one per page. This ensures:
- Page 3 can't be swapped for a different page 3
- Page order is locked (page number is part of the hashed content)
- Individual pages can be verified independently
- The notary acknowledgment is just one page among many

**Camera OCR limitations:**

Camera-app Live Verify works well for simple documents: a badge, an ID card, a certificate with a handful of lines. But a dense legal page with small fonts, justified text, and complex formatting? OCR errors accumulate quickly. A single misread character breaks the hash.

For multi-page legal documents, camera OCR is not a realistic verification path.

**Practical verification paths:**

- **PDF with embedded text** — Browser extensions extract verification text reliably from digital PDFs, even across 50 pages. This is the primary path for notarized documents.
- **HTML with verification markup** — Native support; the `[` and `]` delimiters define exactly what to hash
- **Physical paper** — Requires digitization first (scan to PDF), then browser extension verification

The browser extension is the long-term path for notarized document verification. Camera OCR remains useful for simple credentials (badges, cards, certificates) but not for complex legal documents.

---

_[Content merged from: notary-services]_


## What are Notary Services?

A **Notary Public** is a government-appointed official who acts as an impartial witness. Their primary job is to prevent fraud by verifying the identity of someone signing a high-stakes document (like a **Deed**, **Will**, or **Power of Attorney**). They record every act in a mandatory "Notary Journal."

The problem is that the "Notary Seal" (the ink stamp or embossed circle) is a physical feature that is easily forged using a $20 custom stamp maker. Even a real seal doesn't prove that the person whose name is on the paper actually appeared before the notary. Live Verify allows a recipient to scan the notary's seal or certificate to verify: **"Is this a legitimate commissioned official, and does this specific act exist in their digital or physical journal?"**

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Times, serif; border: 1px solid #000; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; text-transform: uppercase;">Notary Acknowledgment</div>
    <div style="font-size: 0.9em; font-style: italic;">Official Certificate of Act</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p>State of <strong>CALIFORNIA</strong><br>
    County of <strong>LOS ANGELES</strong></p>
<p>On March 15, 2026 before me, <span verifiable-text="start" data-for="notary">[</span><strong>SARAH J. JENKINS</strong>, Notary Public, personally appeared <strong>JOHN JACOB DOE</strong>, who proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to the within instrument.</p>
<p>I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Sarah Jenkins</div>
      <div style="font-size: 0.8em; color: #777;">Commission #: 992288-CA<br>Expires: Dec 31, 2028</div>
    </div>
    <div style="text-align: right;">
      <div style="width: 100px; height: 100px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; transform: rotate(-10deg);">NOTARY<br>OFFICIAL<br>SEAL</div>
    </div>
  </div>
<div style="padding: 20px; background: #f9f9f9; border: 1px dashed #999; margin-top: 40px; text-align: center;">
    <div data-verify-line="notary" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: Individual notaries don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:sarahnotary.com/v <span verifiable-text="end" data-for="notary">]</span>
    </div>
    <div style="font-size: 0.7em; color: #666; margin-top: 10px;">
      Scan to verify notary commission standing, witness authority, and journal entry integrity.
    </div>
  </div>
</div>

## Data Verified

Notary name, commission number, state of jurisdiction, expiration date, signer name, type of act (Acknowledgment/Jurat), date of act, identification method (e.g., Driver's License), journal entry ID, document description (hash).

**Document Types:**
- **Acknowledgment:** For deeds and contracts.
- **Jurat:** (Sworn statement) for affidavits.
- **Certified Copy:** Proving a copy matches the original.
- **Apostille:** (Linked hash) for international recognition.

## Verification Response (Notary Services)

The endpoint returns a simple status code:

- **OK** — The act is recorded in the official notary journal
- **COMMISSION_EXPIRED** — The notary's commission has lapsed since the act; may be invalid
- **COMMISSION_REVOKED** — The notary's commission was voided for misconduct
- **404** — Act not found (never recorded, wrong commission number, or forged seal)

The issuer domain is visible from the `verify:` line on the document itself.

## Second-Party Use

The **Signer (Consumer)** benefits from verification.

**Deed Fraud Defense:** An elderly homeowner can maintain a verified hash of their "House Deed." If a scammer tries to file a forged deed at the county office, the verified hash of the *legitimate* notary act provides the owner with the proof needed to stop the theft.

**Contract Finality:** Proving to a business partner that a signature was properly witnessed by a commissioned official, removing the risk of a "He-Said-She-Said" dispute in court later.

## Third-Party Use

**County Recorders / Registrars**
**Vetting Integrity:** Before recording a property transfer, the clerk scans the notary's seal hash. Verification ensures the "Sarah Jenkins" on the stamp is a real, active notary and isn't a "Phantom Commission" created by a fraudster.

**Lenders and Title Companies**
**Closing Audit:** Verifying that thousands of loan documents in a portfolio were actually notarized according to state law, protecting the bank's security interest.

**Foreign Consulates**
**Legalization Speed:** Verifying that a US-based affidavit is authentic before issuing an Apostille or Consular Legalization for use in another country.

## Verification Architecture

**The "Rubber Stamp" Fraud Problem**

- **Seal Harvesting:** Criminals buying a used notary embosser at an antique shop and using it to forge documents.
- **Commission Masking:** Continuing to notarize using a physical "Valid" stamp after the state revoked the commission for fraud.
- **Journal Erasure:** Signing a document today but refusing to record it in the mandatory journal to hide the signer's identity.

**Issuer Types** (First Party)

**Individual Notaries (Professional Portals).**
**Large Law Firms / Banks (Internal Notaries).**
**RON (Remote Online Notary) Platforms.**

**Privacy Salt:** Essential. Signer names and legal document titles are highly sensitive. The hash must be salted to prevent "Journal Scraping" by unauthorized data brokers.

## Rationale

Notarization is the "Trust Link" of the legal system. By turning static stamps into verifiable digital bridges, we ensure that "Witnessing" is backed by cryptographic proof, protecting the public from the multi-billion dollar cost of document forgery.

---

_[Content merged from: remote-online-notarizations]_


## What is a Remote Online Notarization (RON)?

A **Remote Online Notarization (RON)** is a digital evolution of the traditional notary act. Instead of meeting in person, the signer and the notary connect via a secure video session. The notary verifies the signer's identity using "Knowledge-Based Authentication" (KBA) and "Credential Analysis" before applying an electronic seal to the document.

The problem is that a "Digital Seal" is often just a pretty image on a PDF. Fraudsters can easily copy a legitimate notary's seal image and paste it onto a forged deed or power of attorney. Verified hashes bind the **Session ID, Notary Commission, and Signer Identity** to the RON platform's domain (e.g., `notarize.com` or `notarybridge.com`).

<div style="max-width: 500px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 2px solid #333; background: #fff; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
    <div style="font-weight: bold; font-size: 1.3em; text-transform: uppercase;"><span verifiable-text="start" data-for="ron">[</span>Remote Online Notary Certificate</div>
    <div style="font-size: 0.9em; letter-spacing: 1px;">AUTHENTICATED VIA SECURE VIDEO SESSION</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6;">
    <p>This document was notarized remotely on <strong>MARCH 15, 2026</strong> pursuant to the laws of the <strong>STATE OF TEXAS</strong>.</p>
<div style="margin: 20px 0; display: flex; align-items: flex-start; border: 1px solid #ccc; padding: 15px; background: #f9f9f9;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-right: 20px; color: #000;">DIGITAL<br>SEAL</div>
      <div style="flex-grow: 1;">
        <strong>Notary:</strong> SARAH J. JENKINS<br>
        <strong>Commission #:</strong> 992288-TX<br>
        <strong>Expires:</strong> 12/31/2028<br>
        <strong>Session ID:</strong> RON-8844-X92
      </div>
    </div>
<p><strong>Signer:</strong> JOHN JACOB DOE<br>
    <strong>ID Verified via:</strong> KBA + Bio-Metric Credential Analysis</p>
  </div>
<div style="margin-top: 30px; border-top: 1px dashed #999; padding-top: 15px; text-align: center;">
    <div style="font-size: 0.75em; color: #666; font-style: italic; margin-bottom: 10px;">
      This electronic act is recorded in the platform's digital journal. Scan to verify session integrity and notary authority.
    </div>
    <div data-verify-line="ron" style="font-family: 'Courier New', monospace; font-size: 0.85em; color: #000; font-weight: bold;"
      title="Demo only: RON platforms don't yet offer verification&#10;endpoints, so this is illustrative">
      verify:notarize.com/v <span verifiable-text="end" data-for="ron">]</span>
    </div>
  </div>
</div>

## Data Verified

Notary name, commission number, state of jurisdiction, session ID, signer name, date/time of act, document type hash, RON platform name, electronic journal entry ID.

**Document Types:**
- **RON Notarial Certificate:** The page attached to the legal document.
- **Electronic Journal Extract:** Proof of the act for court/audit.
- **Credential Analysis Report:** (Linked hash) proving the ID was scanned and passed.

## Verification Response (RON)

The endpoint returns a simple status code:

- **OK** — The session is valid and recorded in the official journal
- **VIDEO_ARCHIVED** — Session valid; video record retained as required
- **DISAVOWED** — The notary act has been revoked due to reported fraud
- **NOTARY_SUSPENDED** — The notary's commission was inactive at the time of the act; invalid
- **404** — Session not found (never occurred, wrong session ID, or OCR error)

The issuer domain is visible from the `verify:` line on the certificate itself (e.g., `notarize.com`).

## Second-Party Use

The **Signer (Consumer)** benefits from verification.

**Mortgage Closing Integrity:** A homebuyer signing $500,000 in loan docs via RON can scan the notary's seal to ensure they are using a legitimate, state-authorized platform and not a phishing site designed to steal their signature and PII.

**Global Business:** An executive in London signing a contract for a New York company can provide the verified hash to prove the notarization meets "Interstate Recognition" laws without needing a physical apostille.

## Third-Party Use

**County Recorders / Registrars**
**Deed Fraud Prevention:** Before recording a property transfer, the clerk scans the RON seal. If the hash returns **"VALID - SESSION #8844,"** they know the digital signature isn't a simple "Copy-Paste" forgery.

**Lenders and Title Companies**
**Post-Closing Audit:** Instantly verifying thousands of digital loan files. Live Verify ensures that every "Digital Seal" in the portfolio is backed by a real video session and a valid notary commission.

**Courts and Litigants**
**Evidence Admissibility:** In a dispute over a "Forged Signature," the court can verify the RON hash to see the exact timestamp and platform that vouches for the identity check.

## Verification Architecture

**The "Digital Xerox" Fraud Problem**

- **Seal Harvesting:** Criminals taking a screenshot of a real RON seal and using it to "notarize" fake documents.
- **Credential Spoofing:** Using a deepfake video or a stolen ID to trick a remote notary.
- **Session Fabricating:** Creating a fake "Certificate of Completion" for a session that never occurred.

**Issuer Types** (First Party)

**Authorized RON Platforms.**
**State Secretary of State (SOS) Portals.**
**Large Law Firms (Internal RON).**

**Privacy Salt:** Essential. Signer names and session IDs are sensitive legal data. The hash must be salted to prevent "Journal Scraping" by unauthorized parties.

## Rationale

RON verification solves the "Digital-to-Physical" trust gap. By turning an electronic seal into a verifiable digital bridge, it ensures that "Remote" trust is just as strong as "In-Person" trust.