---
title: "Living Wills and Advance Directives"
category: "Healthcare & Medical Records"
volume: "Very Small"
retention: "Permanent (end-of-life care)"
slug: "living-wills-advance-directives"
tags: ["advance-directive", "living-will", "healthcare-proxy", "end-of-life-care", "medical-ethics", "patient-rights", "palliative-care", "legal-document"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #000; background: #fffdf5; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="will">[</span>ADVANCE HEALTH CARE DIRECTIVE</h2>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p>I, <strong>JOHN JACOB DOE</strong>, being of sound mind, willfully and voluntarily make this declaration to be followed if I become incapacitated and am unable to participate in decisions regarding my medical care.</p>
<div style="margin: 20px 0; background: #f9f9f9; padding: 15px; border: 1px solid #eee;">
      <p><strong>1. HEALTH CARE AGENT:</strong> Mary Alice Jacob (Spouse)<br>
      <strong>2. END-OF-LIFE WISHES:</strong> If I have an incurable and irreversible condition, I direct that life-sustaining treatment be withheld or withdrawn.</p>
      <p><strong>3. COMFORT CARE:</strong> I direct that I be given all care necessary to alleviate pain.</p>
    </div>
<p><strong>Witnesses:</strong> Robert Miller, Sarah Connor<br>
    <strong>Date of Execution:</strong> March 15, 2026</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px;">John Jacob Doe</div>
      <div style="font-size: 0.8em; color: #777;">Declarant</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; margin-left: auto;">OFFICIAL<br>NOTARY<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="will" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Healthcare system doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:cedars-sinai.org/legal/v <span verifiable-text="end" data-for="will">]</span>
  </div>
</div>

## Data Verified

Declarant name, date of birth, appointed Health Care Agent (Proxy) name, specific life-sustaining treatment choices (Yes/No), comfort care directives, organ donor status, date of execution, witness names, Notary commission (if applicable), issuing healthcare system/attorney domain.

**Document Types:**
- **Living Will:** Specific instructions for terminal conditions.
- **Healthcare Power of Attorney:** Appointing a decision-maker.
- **POLST / MOLST Form:** Physician Orders for Life-Sustaining Treatment (for the fridge).
- **Five Wishes Document:** A comprehensive family-centered directive.

## Data Visible After Verification

Shows the issuer domain (`cedars-sinai.org`, `mayoclinic.org`, `legalzoom.com`) and current document status.

**Status Indications:**
- **Active** — This is the latest verified directive on file.
- **Superseded** — **ALERT:** A newer directive has been issued; this version is void.
- **Revoked** — Declarant has formally cancelled this directive.
- **Under Challenge** — Legal dispute regarding the declarant's competency at signing.

## Second-Party Use

The **Patient (Declarant)** benefits from verification.

**Ensuring Compliance:** Proving to a hospital's ethics committee or a hesitant doctor that their "End-of-Life Wishes" are verified and un-altered. Verification prevents family members from "Losing" or "Editing" a paper directive to keep a patient on life-support against their verified will.

**Portability:** Carrying a verified digital link to their living will while traveling, ensuring their wishes are respected in a different state or country where their local doctor isn't available.

## Third-Party Use

**Hospital Ethics Committees / ER Staff**
**Immediate Action:** In a trauma situation where a patient is unconscious, doctors scan the hash on the "POLST" card. "Verified by Cedars-Sinai" provides the immediate legal and ethical cover needed to follow the patient's "No Intubation" wish without fear of a lawsuit from relatives.

**Health Care Agents (Proxies)**
**Authority Proof:** Proving to a nursing home or insurance company that they are the verified, legally appointed decision-maker for the patient.

**Probate Attorneys**
**Estate Integrity:** Ensuring that the healthcare decisions made at the end of life were consistent with the verified legal documents in the estate file.

## Verification Architecture

**The "Daughter from California" Fraud Problem**

- **Directive Hiding:** Relatives intentionally hiding a "No Life Support" document to keep a patient alive for social or financial reasons. Verification allows the hospital to check the domain record directly.
- **Content Alteration:** Editing a PDF to change the "Health Care Agent" from a spouse to a predatory stranger.
- **Competency Fraud:** Fabricating an advance directive after a patient has already lost mental capacity (Dementia/Coma).

**Issuer Types** (First Party)

**Healthcare Systems:** (Kaiser, Mayo Clinic, HCA).
**Online Legal Services:** (LegalZoom, RocketLawyer).
**State Registries:** (e.g., California Secretary of State Advance Directive Registry).

**Privacy Salt:** ABSOLUTELY CRITICAL. End-of-life wishes are the most private data imaginable. The hash MUST be salted to prevent "Guess-and-Check" attacks to find someone's medical directives.

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


## Competition vs. State Registries

| Feature | Live Verify | State Registry (Online) | The "Fridge" Magnet |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Hospital/Firm. | **Gov-Bound.** Bound to the State. | **None.** Trust the paper. |
| **Integrity** | **Cryptographic.** Protects every wish. | **Data-Only.** Doesn't protect the paper. | **Zero.** Easily forged. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires login/fees and manual search. | **Instant.** |
| **Freshness** | **Real-time.** Shows if superseded. | **Laggy.** Updates take weeks. | **Static.** |

**Why Live Verify wins here:** The "ICU Reality." Decisions in the ICU are made in minutes. Doctors don't have time to navigate a state government website or pay a $10 fee to see a directive. Live Verify turns the **Paper on the Clipboard** into a live, trusted clinical link, ensuring the patient's dignity is protected by the latest technology.
