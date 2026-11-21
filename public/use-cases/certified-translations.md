---
title: "Certified Document Translations"
category: "Notary Services"
volume: "Medium"
retention: "Translation purpose + 7-10 years"
slug: "certified-translations"
verificationMode: "clip"
tags: ["translation", "notary", "certified-translation", "ata", "immigration", "legal-docs"]
furtherDerivations: 1
---

## What is a Certified Translation?

Embassies, courts, and universities won't accept a document (like a Birth Certificate or a Diploma) if it's in a foreign language. You must provide a Certified Translation.

A Certified Translation isn't just a translated page; it includes a Certificate of Accuracy where a qualified linguist swears that the English version matches the Spanish (or French, etc.) version exactly.

Fraud is common: people often "edit" their translated grades or court records to look better before sending them to a visa officer. Verified hashes ensure that the *text* of the translation hasn't been tampered with since the linguist signed it.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #999; background: #fff; padding: 40px; box-shadow: 0 4px 10 rgba(0,0,0,0.05);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="trans"></span>LINGUISTIC ACCURACY, INC.</div>
    <div style="font-size: 0.85em; color: #666;">CERTIFIED TRANSLATION SERVICES • ATA MEMBER #998877</div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; margin-bottom: 20px;">Certificate of Translation</h3>
<div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p>I, <strong>MARIA GARCIA</strong>, hereby certify that I am competent to translate from <strong>SPANISH</strong> into <strong>ENGLISH</strong> and that the attached document titled <em>Acta de Nacimiento (Birth Certificate)</em> is a true and accurate translation of the original.</p>
<div style="margin: 20px 0; border: 1px solid #eee; padding: 10px; background: #f9f9f9; font-size: 0.9em;">
      <strong>Subject:</strong> Juan Valdez<br>
      <strong>Document ID:</strong> MEX-998877-BC<br>
      <strong>Pages:</strong> 2
    </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Maria Garcia</div>
        <div style="font-size: 0.8em; color: #777;">Translator ID: MG-2026-04</div>
      </div>
      <div style="text-align: right;">
        <div style="width: 80px; height: 80px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold;">NOTARY<br>SEAL</div>
      </div>
    </div>
  </div>
<div data-verify-line="trans" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Translation firm doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="trans">verify:linguisticaccuracy.com/v</span> <span verifiable-text="end" data-for="trans"></span>
  </div>
</div>

## The Problem: PDF Edit Fraud

- **Terms Alteration:** Changing "Guilty" to "Not Guilty" in a translated court record.
- **Grade Inflation:** Editing a translated university transcript to change a "C" to an "A."
- **Fake Agencies:** Creating a fake "Certified Translation" letterhead for an un-certified, unqualified translator.

## What Is Checked

Translator name, credentials (e.g., ATA certification #), source language, target language, title of original document, subject name, number of pages, date of certification, notary name/commission (if notarized).

**Document Types:**
- **Certificate of Accuracy:** Attached to the front of the translation.
- **Notarized Translation:** Required for many government filings.
- **Sworn Translation:** (Traducteur Assermenté) common in Europe.

## What the Checker Sees

Shows the issuer domain (the Translation Firm or Platform) and current status.

**Status Indications:**
- **Certified** — Translation matches the firm's official output.
- **Superseded** — Replaced by a newer version (e.g., due to a correction).
- **Invalid** — Disavowed by the translator (e.g., signature forgery).

## Who Holds It

The Linguist / Translation Agency benefits from verification.

**Reputation Protection:** Ensuring that an unscrupulous client doesn't "edit" the translated PDF (e.g., changing a date or a legal term) while keeping the translator's official signature/seal on the letterhead.

**Business Efficiency:** Reducing the time spent manually confirming "Did you translate this?" phone calls from embassies or courts.

## Who Checks It

**Embassies / Consulates**
**Visa Adjudication:** Verifying that the birth certificate or marriage license translation hasn't been altered to hide a criminal record or change a name.

**University Admissions**
**Transcript Validation:** Ensuring that the translated "High School Diploma" is exactly what the certified translator issued, preventing grade or degree title inflation.

**Courts / Legal Counsel**
**Evidence Admissibility:** Proving the "Chain of Accuracy" for translated foreign evidence in litigation.

## Who Issues It

**Issuer Types** (First Party)

**Translation Agencies:** (e.g., TransPerfect, Lionbridge).
**Independent Linguists:** (ATA Certified translators).
**Online Platforms:** (Rev, Gengo).

## Authority Chain

**Pattern:** Regulated

Professional translators certify that translations are accurate and complete.

```
✓ translations.example-translators.co.uk/verify — Certifies professional translations and interpretations
  ✓ ciol.org.uk — Accredits professional translators and interpreters
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Notarization

Where an authority requires it, a translator's certification is signed before a notary, or the translation is made by a sworn translator under national rules; which applies depends on the country receiving the document. A notary's seal attests to who signed, not to the text. Notarization and Live Verify answer different questions and work side by side.

| | Notary seal | Live Verify on the translation | Unverified scanned PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who can see the seal, though few can tell a genuine one, and some notaries can be looked up in a public register. | Anyone handed the translation: an immigration office, a university, a court. | Nobody; it can only be taken on trust. |
| **What the checker gets** | An attestation that the named person signed the certification before the notary. Nothing about the wording on later pages. | Confirmation that the translation firm or translator issued this exact wording, as at its date. Nothing about whether the translation is accurate. | A document whose wording may have been edited. |
| **What the holder shares** | The sealed paper original. | Only the translation they chose to hand over. | Only the document they chose to hand over. |
| **Reach** | Accepted where that country's notarial acts are recognized; abroad it may need an apostille or legalization as well. | Global in principle: any translation firm or translator, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | An appointment and a notary's fee per document. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | A notary and the paper original. | The translation firm to publish hashes, and Live Verify-aware software on the checker's device. No translation firm does this yet. | Nothing. |
| **Best suited to** | Meeting a formal requirement for notarization. | Confirming that the wording received is the wording the translator issued. | Nothing where a decision depends on the wording. |

**Where each fits:** a notary's seal attests to who signed the certification, and where an authority requires notarization it still has to be obtained. The seal says nothing about whether the translated text has since been altered. Live Verify lets the receiving office confirm that the translation firm stands behind the exact wording, so it accompanies the seal rather than replacing it. Neither one vouches for the accuracy of the translation itself.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
