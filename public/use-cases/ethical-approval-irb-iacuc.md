---
title: "Ethical Approval (IRB, IACUC) Documents"
category: "Scientific & Research"
volume: "Very Small"
retention: "7-30 years (regulatory compliance)"
slug: "ethical-approval-irb-iacuc"
tags: ["irb-approval", "iacuc", "research-ethics", "human-subjects", "animal-welfare", "clinical-research", "academic-integrity"]
furtherDerivations: 1
---

## What is Ethical Approval?

Before a scientist can start a study involving humans (like testing a new drug) or animals, they must get permission from an **Ethics Committee** (called an **IRB** or **IACUC**).

The committee reviews the plan to ensure people aren't being exploited and animals aren't being mistreated. The **Notice of Ethical Approval** is the formal "OK" to start the research.

"Ethics Forgery" is a major scandal in science: sometimes researchers fabricate these letters to get their papers published or to bypass university rules. Verified hashes ensure the study's approval is backed by the university's official ethics office.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: left; margin-bottom: 30px; border-bottom: 2px solid #1a237e; padding-bottom: 10px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #1a237e;"><span verifiable-text="start" data-for="ethics">[</span>STANFORD UNIVERSITY - RESEARCH COMPLIANCE</div>
    <div style="font-size: 0.85em; color: #666;">Institutional Review Board (IRB)</div>
  </div>
<h2 style="text-align: center; text-transform: uppercase; letter-spacing: 1px; color: #1a237e;">Notice of Ethical Approval</h2>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; text-align: justify;">
    <p>This document confirms that the research protocol described below has been reviewed and approved by the Stanford IRB.</p>
<div style="margin: 20px 0; border-left: 4px solid #1a237e; padding-left: 20px; background: #f5f5f5; padding-top: 10px; padding-bottom: 10px;">
      <p><strong>Protocol ID:</strong> IRB-2026-992288<br>
      <strong>Study Title:</strong> Neural Response to Digital Verification Affordances<br>
      <strong>Principal Investigator:</strong> Prof. Albus Dumbledore<br>
      <strong>Risk Level:</strong> Minimal Risk</p>
    </div>
<p><strong>Approval Date:</strong> March 15, 2026<br>
    <strong>Expiration Date:</strong> March 14, 2027</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Dr. Minerva McGonagall</div>
      <div style="font-size: 0.8em; color: #777;">IRB Chair</div>
    </div>
    <div style="width: 45%; text-align: right;">
      <div style="width: 80px; height: 80px; border: 2px solid #1a237e; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #1a237e; font-weight: bold; text-align: center; margin-left: auto;">ETHICS<br>OFFICE</div>
    </div>
  </div>
<div data-verify-line="ethics" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Stanford doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:stanford.edu/compliance/v <span verifiable-text="end" data-for="ethics">]</span>
  </div>
</div>

## Data Verified

Protocol ID, Principal Investigator (PI) name, study title (digest), IRB/IACUC committee ID, risk level classification, approval date, expiration date, number of subjects authorized, specific interventions allowed.

**Document Types:**
- **IRB Approval Letter:** For human subjects research.
- **IACUC Approval Letter:** For animal research.
- **Continuing Review Approval:** Annual renewal of ethics.
- **Exemption Notice:** For low-risk data-only research.

## Data Visible After Verification

Shows the issuer domain (`stanford.edu`, `nih.gov`) and current approval status.

**Status Indications:**
- **Approved** — Research is authorized and ethically vetted.
- **Expired** — Approval has lapsed; data collection must stop.
- **Suspended** — Halted due to an adverse event or ethics violation.
- **Closed** — Study completed; final report filed.

## Second-Party Use

The **Principal Investigator (PI)** benefits from verification.

**Grant Funding:** Proving to a funding agency (e.g., NIH or NSF) that they have "Verified Ethical Approval" for their study. This is often a "Hard Stop" requirement before grant money is released.

**Publication Submission:** Providing a verified link to the IRB approval in a manuscript submission to a major journal (e.g., Nature or Science), proving the study was conducted under official oversight.

**Cross-Institutional Collaboration:** Proving to a partner university's compliance office that the primary site's IRB has already verified and approved the protocol.

## Third-Party Use

**Academic Journals / Editors**
**Integrity Review:** Instantly verifying that the "IRB Number" cited in a research paper is authentic and matches the study title/dates. This prevents "Ethics Fabrications" in high-profile research.

**Regulatory Agencies (FDA / OHRP)**
**Audit Efficiency:** During a federal audit, inspectors can scan the hashes of all site approval letters to ensure they haven't been "Backdated" or "Self-Signed" by the PI.

**Clinical Trial Participants**
**Personal Safety:** A participant can scan the hash on the consent form. "Verified by Stanford IRB" provides the peace of mind that the study is legitimate and overseen by a real ethics committee.

## Verification Architecture

**The "Ethics Forgery" Fraud Problem**

- **Fabricated Approvals:** A researcher creating a fake "IRB Approved" letter to bypass university rules or to get a paper published.
- **Scope Creep:** Taking an approval for "Survey Research" and using the paper to hide invasive "Clinical Sampling" that the IRB never saw.
- **Date Alteration:** Changing a 2022 approval to 2026 to hide that the study has been operating without oversight for years.

**Issuer Types** (First Party)

**Universities:** (Stanford, Harvard, Oxford).
**Commercial IRBs:** (e.g., WCG, Advarra - for private pharma trials).
**Government Research Offices.**

**Privacy Salt:** Critical. Study titles can reveal sensitive disease research or vulnerable populations. The hash must be salted to prevent "Guessing" which PIs are working on specific sensitive topics.

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


## Competition vs. IRB Management Systems (Click/InfoEd)

| Feature | Live Verify | IRB Portal (Click/InfoEd) | Scanned PDF Letter |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the University. | **System-Bound.** Trust the DB admin. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across any institution. | **Low.** Journal editors don't have Click logins. | **Universal.** |
| **Integrity** | **Binds Scope.** Protects the study title. | **Data-Only.** | **Vulnerable.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires manual search by ID. | **N/A.** |

**Why Live Verify wins here:** The "External Review" gap. Ethics committees operate in private silos. Journals, funders, and the public are locked out. Live Verify turns the **Internal Ethical Approval** into a portable, cryptographically trusted artifact that bridges the gap between institutional oversight and the global scientific community.
