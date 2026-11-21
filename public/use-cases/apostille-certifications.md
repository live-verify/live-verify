---
title: "Apostille Certifications (Hague Convention)"
category: "Notary Services"
volume: "Small"
retention: "Document lifetime + permanent"
slug: "apostille-certifications"
verificationMode: "clip"
tags: ["apostille", "hague", "international", "notary", "legalization", "authentication"]
furtherDerivations: 1
---

## What is an Apostille?

If you want to use a US document (like a Birth Certificate or a Diploma) in another country (like Spain or Italy), foreign officials won't just trust a US notary stamp. They need an Apostille.

An Apostille is an "International Notary" certificate issued by the Secretary of State. It basically says: "We know this Notary, and their signature is legitimate."

It's a huge target for fraud—fake apostilles are often used to "legalize" fake degrees or stolen property documents for use in foreign courts.

This remains a strong portability case because the apostille is specifically designed to cross borders into systems that usually do not share a native registry or direct lookup workflow.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 3px solid #000; background: #fff; padding: 40px; position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 2px;"><span verifiable-text="start" data-for="apostille"></span>APOSTILLE</h2>
    <div style="font-size: 0.9em;">(Convention de La Haye du 5 octobre 1961)</div>
  </div>
<div style="font-size: 0.9em; line-height: 1.8;">
    <p><strong>1. Country:</strong> United States of America</p>
    <p>This public document<br>
    <strong>2. has been signed by:</strong> <strong>John Hancock</strong><br>
    <strong>3. acting in the capacity of:</strong> Notary Public, State of New York<br>
    <strong>4. bears the seal/stamp of:</strong> John Hancock, Notary Public</p>
<div style="border: 1px solid #000; padding: 10px; margin: 10px 0; text-align: center; font-weight: bold; background: #f9f9f9;">
      CERTIFIED
    </div>
<p><strong>5. at:</strong> Albany, New York<br>
    <strong>6. the:</strong> 15th day of March, 2026<br>
    <strong>7. by:</strong> Secretary of State, State of New York<br>
    <strong>8. Number:</strong> NY-2026-998877</p>
<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
      <div>
        <strong>9. Seal/stamp:</strong><br>
        <div style="width: 80px; height: 80px; border: 2px dashed #999; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7em; color: #999;">[GOLD SEAL]</div>
      </div>
      <div style="text-align: right;">
        <strong>10. Signature:</strong><br>
        <em>Robert J. Rodriguez</em><br>
        Secretary of State
      </div>
    </div>
  </div>
<div data-verify-line="apostille" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: State Dept doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="apostille">verify:dos.ny.gov/apostille/v</span> <span verifiable-text="end" data-for="apostille"></span>
  </div>
</div>

## The Problem: Fake Legalization Fraud

- **Phony Apostilles:** High-quality forgeries of state certificates, often attached to fake degrees or fabricated legal documents.
- **Seal Theft:** Using a genuine state seal image on a fabricated certificate number.
- **Underlying Fraud:** An Apostille is only as good as the underlying signature. If the Notary signature was forged, the Apostille (if it could be verified) would be part of a fraudulent chain.

## What Is Checked

Signer name, capacity of signer (Notary/Judge/Clerk), seal/stamp identification, location of issuance, date of issuance, certificate number (Apostille ID), issuing authority (Secretary of State).

**Document Types:**
- **Standard Apostille:** For countries in the Hague Convention.
- **Certificate of Authentication:** For non-Hague countries (requires multi-step legalization).
- **Federal Apostille:** Issued by U.S. Dept of State for federal documents (FBI checks, etc.).

## What the Checker Sees

Shows the issuer domain (`dos.ny.gov`, `state.gov`) and the document status.

**Status Indications:**
- **Verified** — Certificate is legitimate and matches the state record.
- **Invalid** — Serial number not found or details mismatch.
- **Withdrawn** — Authority has revoked the authentication (e.g., discovery of fraud in the underlying document).

## Who Holds It

The Document Holder (e.g., expat, international student) benefits from verification.

**Visa Applications:** Proving to a foreign consulate (e.g., Spain, Italy) that their background check or birth certificate is legitimately authenticated for use abroad.

**Property Purchase:** Verifying their own Power of Attorney document before sending it overseas to ensure it won't be rejected by a foreign notary.

## Who Checks It

**Foreign Governments / Registries**
**Authenticity Check:** A land registry in Greece receiving a US Power of Attorney needs to know if the "Apostille" attached to it is real. Scanning the verification link instantly proves the New York Secretary of State actually issued it, without needing to understand US state seals.

**International Banks**
**KYC/Onboarding:** Verifying corporate "Certificates of Good Standing" from foreign subsidiaries.

**Universities (Admissions)**
**Degree Validation:** Verifying that a foreign transcript's authentication is legitimate.

## Who Issues It

**Issuer Types** (First Party)

**Secretary of State (U.S. States):** Primary issuers for state-level docs.
**U.S. Department of State:** For federal documents.
**Competent Authorities:** National ministries in foreign countries.

## Authority Chain

**Pattern:** Sovereign

The UK Foreign, Commonwealth & Development Office legalises and authenticates documents for use abroad under the Hague Apostille Convention 1961.

```
✓ legalisation.fcdo.gov.uk/verify — UK Foreign Office document legalisation service
  ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and e-Apostille Registers

Under the Hague Apostille Convention, each member country designates authorities that issue apostilles, and many now run an e-Register where a recipient can check an apostille by its number and date, or issue e-Apostilles directly. Coverage depends on the issuing country: some have an e-Register, some issue only paper, and countries outside the Convention use consular legalisation instead. An e-Register and Live Verify answer much the same question and work side by side; the difference is how the checker gets from the paper in hand to the issuer's record.

| | e-Register or e-Apostille | Live Verify on the apostille | Paper apostille with seal |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who knows which country's register to use and can find it. | Anyone handed the apostille, in any country. | Anyone comparing the seal and signature with reference examples. |
| **What the checker gets** | The issuing authority's own record of that apostille. | Confirmation that the issuing authority stands behind this exact text, as at its date. | A judgement by eye, which a good copy can fool. |
| **What the holder shares** | The apostille details. | Only the apostille they chose to hand over. | The paper apostille. |
| **Reach** | One issuing country's apostilles, where it runs a register. | Global in principle: any issuing authority that publishes hashes on its own domain. | Every Convention country. |
| **Speed and cost** | Free where available; finding the right register and entering details can be awkward across borders. | A few seconds per check: one web lookup, with no fee to the standard. | No lookup needed. |
| **What it needs** | A register in the issuing country, and the checker to find and use it. | The issuing authority to publish hashes, and Live Verify-aware software on the checker's device. No apostille authority does this yet. | Reference examples and a trained eye. |
| **Best suited to** | Checkers who know the issuing country's register. | A foreign official holding the paper with no idea where its register lives. | Nothing where forgery is a concern. |

**Where each fits:** e-Registers and e-Apostilles are the right source of truth where they exist and are easy to use. The practical problem remains cross-border: an official abroad is holding paper from a country whose register they may never have used. Live Verify gives that official a quick route from the paper to the issuing authority, provided they have software that honours it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
