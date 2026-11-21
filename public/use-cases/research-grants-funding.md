---
title: "Research Grants and Funding Awards"
category: "Scientific & Research"
volume: "Very Small"
retention: "7-10 years (federal audit / financial lifecycle)"
slug: "research-grants-funding"
verificationMode: "clip"
tags: ["research-funding", "nsf", "nih", "grant-award", "academic-integrity", "scientific-funding", "auditing", "pi-credentials"]
furtherDerivations: 1
---

## What are Research Grant Awards?

In the scientific community, a Grant Award Notification (GAN) is the formal document that turns a proposal into a reality. It authorizes the release of millions of dollars in taxpayer or foundation funds to a university or lab.

These documents are the "Proof of Prestige." Researchers use them to secure tenure, hire staff, and lease equipment. Fraud is high-stakes: individuals have been caught creating "Fake Award Letters" to pad their CVs or to trick their universities into providing "Matching Funds" for projects that weren't actually funded. Verified hashes bind the PI Name, Award Amount, and Performance Period to the agency's domain (e.g., `nsf.gov` or `nih.gov`).

<div style="max-width: 650px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.4em; color: #002d62;"><span verifiable-text="start" data-for="grant"></span>NATIONAL SCIENCE FOUNDATION</div>
    <div style="font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px;">Office of Budget, Finance, and Award Management</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 25px;">
      <div>
        <strong>Award Number:</strong> NSF-2026-992288<br>
        <strong>Effective Date:</strong> March 15, 2026
      </div>
      <div style="text-align: right;">
        <strong>Total Amount:</strong> $ 1,250,000.00
      </div>
    </div>
<p>Dear Dr. Ponder Stibbons,</p>
<p>The National Science Foundation is pleased to announce the approval of your research grant award. This funding is authorized for the following project:</p>
<div style="margin: 20px 0; padding: 15px; border-left: 4px solid #002d62; background: #f9f9f9; font-style: italic;">
      <strong>Project Title:</strong> Quantum Thaumaturgy and High-Energy Magic Dynamics in Urban Environments.
    </div>
<p><strong>Principal Investigator:</strong> Dr. Ponder Stibbons<br>
    <strong>Institution:</strong> Unseen University (DUN: 998877665)<br>
    <strong>Period of Performance:</strong> 03/15/2026 to 03/14/2029</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 180px; border-top: 1px solid #000; padding-top: 5px; font-size: 0.8em; text-align: center;">Grants Officer Approval</div>
    <div style="width: 80px; height: 80px; border: 2px solid #002d62; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center; color: #002d62;">NSF<br>VERIFIED</div>
  </div>
<div data-verify-line="grant" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Funding agencies don't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="grant">verify:nsf.gov/awards/v</span> <span verifiable-text="end" data-for="grant"></span>
  </div>
</div>

## The Problem: Prestige Padding Fraud

- **Amount Inflation:** Changing a $125,000 pilot grant to a $1,250,000 major award on a CV or website.
- **PI Impersonation:** Claiming to be the "Lead PI" on a grant where the person was actually just a minor consultant.
- **Dead Award Stays:** Presenting an award that was revoked for ethics violations as if it were still "Active."

## What Is Checked

Award number, agency name, PI name, co-investigator names, host institution, project title, total budget amount, start date, end date, federal program code (e.g., CFDA #).

**Document Types:**
- **Grant Award Notification (GAN):** The primary funding instrument.
- **Grant Amendment:** Proof of budget increases or extensions.
- **Project Progress Report:** (Linked hash) proving milestones were met.
- **Financial Status Report (SF-425):** Final verification of spend.

## What the Checker Sees

Shows the issuer domain (`nsf.gov`, `nih.gov`, `gatesfoundation.org`) and the funding standing.

**Status Indications:**
- **Active / Funded** — Award is current and funds are being disbursed.
- **Completed** — Project finished; final reports verified.
- **Suspended** — Funding paused (e.g., due to compliance/ethics audit).
- **Terminated** — Award revoked (e.g., due to research misconduct).

## Who Holds It

The Researcher (Principal Investigator) benefits from verification.

**Academic Tenure:** A researcher can provide verified hashes of their "Career Funding" to their university's tenure committee. This removes the risk of "Impact Inflation" and proves their ability to attract federal capital with cryptographic certainty.

**Vendor Negotiations:** When leasing high-end lab equipment (e.g., a $2M Electron Microscope), the PI can scan their verified GAN to prove to the vendor that they have the federal funding to back the lease.

## Who Checks It

**University Research Offices (OSP)**
**Financial Audit:** Managing 1,000+ separate grants. Live Verify ensures that the "Award Letter" in the file isn't a draft or a fabricated version, protecting the university from "Single Audit" failures and federal clawbacks.

**Scientific Journals / Peer Reviewers**
**Integrity Filter:** Verifying that a study was actually funded by the agencies claimed in the "Conflict of Interest" disclosure, preventing hidden industry bias.

**Immigration Authorities (O-1 Visas)**
**Extraordinary Ability Proof:** Verifying that a visa applicant's "Millions in Grants" are legitimate awards from recognized global agencies.

## Who Issues It

**Issuer Types** (First Party)

**Federal Agencies (NSF, NIH, DOD).**
**Private Foundations (Gates, Wellcome Trust).**
**University Foundations.**

**Privacy Salt:** Medium. While award amounts are public record, individual salary allocations within the budget are private. The hash should be salted to protect individual compensation data.

## Authority Chain

**Pattern:** Regulated

Research funding is distributed by UKRI (UK Research and Innovation), which is the primary funder of UK research and innovation, operating under government mandate and oversight.

```
✓ grants.ukri.org/verify — Issues research grant awards and funding notifications
  ✓ ukri.org — Funds UK research and innovation
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Research funding is the "Engine of Progress." By turning award letters into verifiable digital bridges, we protect the integrity of the scientific record and ensure that funding goes to those who actually earned it.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
