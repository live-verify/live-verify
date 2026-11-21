---
title: "Ethical Approval (IRB, IACUC) Documents"
category: "Scientific & Research"
volume: "Very Small"
retention: "7-30 years (regulatory compliance)"
slug: "ethical-approval-irb-iacuc"
verificationMode: "clip"
tags: ["irb-approval", "iacuc", "research-ethics", "human-subjects", "animal-welfare", "clinical-research", "academic-integrity"]
furtherDerivations: 1
---

## What is Ethical Approval?

Before a scientist can start a study involving humans (like testing a new drug) or animals, they must get permission from an Ethics Committee (called an IRB or IACUC).

The committee reviews the plan to ensure people aren't being exploited and animals aren't being mistreated. The Notice of Ethical Approval is the formal "OK" to start the research.

"Ethics Forgery" is a major scandal in science: sometimes researchers fabricate these letters to get their papers published or to bypass university rules. Verified hashes ensure the study's approval is backed by the university's official ethics office.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: left; margin-bottom: 30px; border-bottom: 2px solid #1a237e; padding-bottom: 10px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #1a237e;"><span verifiable-text="start" data-for="ethics"></span>STANFORD UNIVERSITY - RESEARCH COMPLIANCE</div>
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
      <span data-verify-line="ethics">verify:stanford.edu/compliance/v</span> <span verifiable-text="end" data-for="ethics"></span>
  </div>
</div>

## The Problem: Ethics Forgery Fraud

- **Fabricated Approvals:** A researcher creating a fake "IRB Approved" letter to bypass university rules or to get a paper published.
- **Scope Creep:** Taking an approval for "Survey Research" and using the paper to hide invasive "Clinical Sampling" that the IRB never saw.
- **Date Alteration:** Changing a 2022 approval to 2026 to hide that the study has been operating without oversight for years.

## What Is Checked

Protocol ID, Principal Investigator (PI) name, study title (digest), IRB/IACUC committee ID, risk level classification, approval date, expiration date, number of subjects authorized, specific interventions allowed.

**Document Types:**
- **IRB Approval Letter:** For human subjects research.
- **IACUC Approval Letter:** For animal research.
- **Continuing Review Approval:** Annual renewal of ethics.
- **Exemption Notice:** For low-risk data-only research.

## What the Checker Sees

Shows the issuer domain (`stanford.edu`, `nih.gov`) and current approval status.

**Status Indications:**
- **Approved** — Research is authorized and ethically vetted.
- **Expired** — Approval has lapsed; data collection must stop.
- **Suspended** — Halted due to an adverse event or ethics violation.
- **Closed** — Study completed; final report filed.

## Who Holds It

The Principal Investigator (PI) benefits from verification.

**Grant Funding:** Proving to a funding agency (e.g., NIH or NSF) that they have "Verified Ethical Approval" for their study. This is often a "Hard Stop" requirement before grant money is released.

**Publication Submission:** Providing a verified link to the IRB approval in a manuscript submission to a major journal (e.g., Nature or Science), proving the study was conducted under official oversight.

**Cross-Institutional Collaboration:** Proving to a partner university's compliance office that the primary site's IRB has already verified and approved the protocol.

## Who Checks It

**Academic Journals / Editors**
**Integrity Review:** Instantly verifying that the "IRB Number" cited in a research paper is authentic and matches the study title/dates. This prevents "Ethics Fabrications" in high-profile research.

**Regulatory Agencies (FDA / OHRP)**
**Audit Efficiency:** During a federal audit, inspectors can scan the hashes of all site approval letters to ensure they haven't been "Backdated" or "Self-Signed" by the PI.

**Clinical Trial Participants**
**Personal Safety:** A participant can scan the hash on the consent form. "Verified by Stanford IRB" provides the peace of mind that the study is legitimate and overseen by a real ethics committee.

## Who Issues It

**Issuer Types** (First Party)

**Universities:** (Stanford, Harvard, Oxford).
**Commercial IRBs:** (e.g., WCG, Advarra - for private pharma trials).
**Government Research Offices.**

**Privacy Salt:** Critical. Study titles can reveal sensitive disease research or vulnerable populations. The hash must be salted to prevent "Guessing" which PIs are working on specific sensitive topics.

## Authority Chain

**Pattern:** Regulated

Research ethics committees issue approval letters under healthcare research regulator authority (HRA in the UK).

```
✓ ethics.hra.nhs.uk/verify — Issues research ethics approvals
  ✓ hra.nhs.uk — Oversees research ethics in the UK health service
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the IRB's hashes and status changes plus structured metadata (protocol ID, principal investigator name, study title, approval date, expiration date) — never plaintext or sensitive personal information — providing non-repudiation of the ethical approval.

## Compared With IRB Management Systems (Click/InfoEd)

| Feature | Live Verify | IRB Portal (Click/InfoEd) | Scanned PDF Letter |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the University. | **System-Bound.** Trust the DB admin. | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works across any institution. | **Low.** Journal editors don't have Click logins. | **Universal.** |
| **Integrity** | **Binds Scope.** Protects the study title. | **Data-Only.** | **Vulnerable.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires manual search by ID. | **N/A.** |

**Where each fits:** An institution's IRB system holds the full protocol, amendments and correspondence, and the committee and researchers should continue to work in it. Journal editors, funders and collaborators at other institutions have no login and usually receive the approval letter as a PDF. Live Verify lets them confirm that the institution stands behind that letter and the study title and scope it states, while the detailed file stays inside the institution.

### Why Would a Journal Editor Bother?

The reproducibility crisis has a document layer that nobody talks about. A journal receives a manuscript claiming "IRB-approved" with a protocol number. The editor has no practical way to check — they are outside the institution's ethics system, and no university gives journal editors login access to their IRB portal. The editor trusts the author. In 2024, investigations revealed paper mills fabricating entire ethics approval letters, complete with letterheads and protocol numbers, for studies that were never reviewed. A verifiable ethics approval — one the editor can scan and confirm against the university's own domain — closes the gap between institutional oversight and the global scientific publishing system. The five-second check replaces a trust assumption that has been systematically exploited.
