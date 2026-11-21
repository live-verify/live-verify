---
title: "Consular Letters and Attestations"
category: "Immigration & Visa Documents"
volume: "Small"
retention: "Case + 5-10 years"
slug: "consular-letters-attestations"
verificationMode: "clip"
tags: ["embassy", "consulate", "consular-letter", "attestation", "diplomatic-mission", "visa-support", "legalization"]
furtherDerivations: 1
---

## What is a Consular Attestation?

If you are an expat living in a foreign country, your home government's Embassy acts as your local "High-Level Notary."

A Consular Letter (or Attestation) is a formal document from a diplomat stating a fact about you (e.g., "We certify that Sarah Smith has a pension of $3,000/month").

Foreign governments (like Thailand or Spain) require these letters for visas. Because they are so powerful, "Embassy Letter Forgery" is a massive industry. Verified hashes allow a foreign immigration officer to scan the letter and see "VERIFIED" on the official `usembassy.gov` domain in seconds.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); position: relative;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="consul"></span>EMBASSY OF THE UNITED STATES OF AMERICA</div>
    <div style="font-size: 0.9em; margin-top: 5px;">Consular Section • London, United Kingdom</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p><strong>Date:</strong> March 15, 2026<br>
    <strong>Ref:</strong> LON-2026-992288</p>
<h3 style="text-align: center; text-transform: uppercase; margin: 20px 0;">Consular Attestation</h3>
<p>The Consular Section of the Embassy of the United States of America in London hereby attests that <strong>SARAH JANE SMITH</strong> (Passport No: *******1234) has appeared before me and presented evidence of her residency and financial standing for the purpose of a retirement visa application.</p>
<p>This attestation is issued at the request of the named individual for submission to the Ministry of Interior, Kingdom of Thailand.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div>
      <div style="width: 100px; height: 100px; border: 2px solid #002d62; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #002d62; font-weight: bold; text-align: center;">OFFICIAL<br>CONSULAR<br>SEAL</div>
    </div>
    <div style="text-align: right;">
      <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Quincy J. Consular Officer</div>
      <div style="font-size: 0.8em; color: #777;">Vice Consul</div>
    </div>
  </div>
<div data-verify-line="consul" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: US Embassy doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="consul">verify:usembassy.gov/london/v</span> <span verifiable-text="end" data-for="consul"></span>
  </div>
</div>

## The Problem: Fake Embassy Fraud

- **High-End Forgeries:** Using heavy bond paper and fake embossed seals to create "Income Letters" for people who don't meet the financial requirements for a visa.
- **Signature Swapping:** Taking a real letter from a low-income person and editing the name and amount to match a high-value fraudster.
- **Unauthorized Issuance:** Local staff at a consulate issuing "under-the-table" letters that aren't in the official system. Verification only shows hashes from the official ledger.

## What Is Checked

Applicant name, passport number (partial), attestation reference number, consular officer name/rank, embassy/consulate location, date of issuance, specific fact being attested (e.g., residency, signature, income).

**Document Types:**
- **Income Attestation:** For retirement or digital nomad visas.
- **Statement of No Impediment:** For getting married abroad.
- **Criminal Record Attestation:** Local missions verifying home-country background checks.
- **Consular Marriage Certificate:** Issued by some missions for citizens abroad.

## What the Checker Sees

Shows the issuer domain (`usembassy.gov`, `gov.uk`, `diplomatie.gouv.fr`) and current validity.

**Status Indications:**
- **Verified** — Letter is authentic and matches the mission's log.
- **Void** — Retracted due to discovery of fraudulent underlying documents.
- **Expired** — Many consular letters are only valid for 3-6 months.
- **Invalid** — Serial number or details mismatch.

## Who Holds It

The Citizen abroad benefits from verification.

**Visa Approval:** Proving to a foreign immigration office (e.g., Thai Immigration or Spanish Extranjería) that their "Income Letter" is a legitimate diplomatic document and not a "High-Quality Forgery." Verification prevents the 30-day delay of "Consular Confirmation" via email.

**Property Purchase:** Verifying a consular-authenticated Power of Attorney to satisfy a local notary in a foreign country.

## Who Checks It

**Foreign Immigration Authorities**
**Efficiency:** Instead of sending batch emails to embassies to confirm "Did you issue these 50 letters?", the immigration officer scans the hashes at the desk. "Verified by usembassy.gov" provides instant diplomatic-level trust.

**International Banks**
**KYC/Onboarding:** Verifying the "Address Attestation" of an expat client trying to open a local account.

**Foreign Notaries**
**Legalization Proof:** Confirming that the consular stamp on a legal document is authentic before performing a local notarial act.

## Who Issues It

**Issuer Types** (First Party)

**National Ministries of Foreign Affairs:** (e.g., U.S. State Dept, UK FCDO).
**Embassies & Consulates.**
**Consular Sections of Representative Offices:** (e.g., for Taiwan/AIT).

**Privacy Salt:** Critical. Consular records involve citizenship and financial data. The hash must be salted to prevent "Guessing" the names of citizens living in a specific foreign city.

## Authority Chain

**Pattern:** Sovereign

Diplomatic missions derive their consular authority from international law and are self-authorized to issue attestations on behalf of their home governments.

```
✓ gov.uk/government/world/organisations/verify — Issues consular attestations and certifications
```

Self-authorized — this is a sovereign body whose authority derives from statute.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Apostille or Legalization

Countries in the Hague Apostille Convention authenticate public documents for use abroad with an apostille from a designated authority; between other countries, documents go through multi-step legalization by ministries and embassies. Which applies depends on the two countries involved. Both authenticate the signature and seal, not the contents. They and Live Verify answer different questions and work side by side.

| | Apostille or legalization | Live Verify on the consular letter | Unverified scanned PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | The receiving authority, and anyone who can check the apostille in the issuing country's register, where one exists. | Anyone handed the letter: a visa office, a bank, a landlord, an employer. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Formal authentication that the signature and seal are genuine. Nothing about the figures on the page. | Confirmation that the mission issued this exact text, including figures such as a stated income, as at its date. | A letter whose contents may have been edited. |
| **What the holder shares** | The original document with its apostille or legalization. | Only the letter they chose to hand over. | Only the document they chose to hand over. |
| **Reach** | Countries that recognize the apostille, or that have legalized the document through their own chain. | Global in principle: any mission or ministry, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Days to weeks, with a fee at each step. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The designated authorities, and often several appointments or postal steps. | The mission to publish hashes, and Live Verify-aware software on the checker's device. No mission does this yet. | Nothing. |
| **Best suited to** | Any case where the receiving authority requires it by law. | Letters accepted without legalization, or a further check on the contents of one that has been legalized. | Nothing where a decision depends on it. |

**Where each fits:** where a receiving authority requires an apostille or full legalization, that is what must be obtained, and Live Verify does not change the legal requirement. An apostille authenticates the signature and seal rather than the contents. For consular letters accepted without legalization, or as a further check on one that has been legalized, Live Verify lets the recipient confirm the mission stands behind the text, including figures such as a stated income.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
