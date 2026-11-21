---
title: "Manuscript Versions and Edit History"
category: "Art, Media & Publishing"
volume: "Very Small"
retention: "5-10 years (publication records)"
slug: "manuscript-versions-edit-history"
verificationMode: "clip"
tags: ["manuscript", "version-control", "publishing-integrity", "author-attestation", "literary-fraud", "copyright-protection", "editorial-workflow"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fffdf8; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); position: relative;">
  <div style="text-align: left; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px;">
    <div style="font-weight: bold; font-size: 1.2em; color: #1a1a1a;"><span verifiable-text="start" data-for="manu"></span>PENGUIN RANDOM HOUSE</div>
    <div style="font-size: 0.85em; color: #666;">Editorial Operations • New York</div>
  </div>
<h3 style="text-align: center; text-transform: uppercase; margin-bottom: 25px; letter-spacing: 1px;">Manuscript Attestation</h3>
<div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>This document serves as a verified record of the following manuscript version as received by the publisher:</p>
<div style="margin: 20px 0; border-left: 4px solid #333; padding-left: 20px; background: #f9f9f9; padding-top: 10px; padding-bottom: 10px;">
      <p><strong>Title:</strong> "THE VERIFICATION CHRONICLES" (v.2.4)<br>
      <strong>Author:</strong> J.K. Row-Verify<br>
      <strong>Editor:</strong> Marcus J. Miller</p>
<p><strong>File Hash (SHA-256):</strong><br>
      <span style="font-family: monospace; font-size: 0.85em; word-break: break-all;">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></p>
    </div>
<p><strong>Submission Date:</strong> March 15, 2026<br>
    <strong>Verification Status:</strong> CERTIFIED ORIGINAL</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Editorial Director</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="font-size: 0.8em; color: #777;">Internal Ref: MSS-2026-992</div>
    </div>
  </div>
<div data-verify-line="manu" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Publisher doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="manu">verify:penguinrandomhouse.com/mss/v</span> <span verifiable-text="end" data-for="manu"></span>
  </div>
</div>

## The Problem: Manuscript Theft Fraud

- **Idea Poaching:** A rogue editor or assistant stealing a manuscript and claiming they wrote it. Verification timestamps prove the original author's priority.
- **Silent Editing:** A publisher changing a controversial paragraph in a PDF after the author signed off, to avoid a legal risk.
- **Fabricated Submissions:** Someone creating a fake "Penguin Random House" receipt to trick an investor or agent into thinking they have a book deal.

## What Is Checked

Author name, editor name, manuscript title, version ID (e.g., v2.4), SHA-256 hash of the submitted digital file, submission timestamp (to the second), total word count, copyright registration status, issuing publisher domain.

**Document Types:**
- **Manuscript Attestation:** Proving what was actually submitted.
- **Edit History Summary:** Documenting every authorized change.
- **Reader's Report:** (Linked hash) proving the editorial feedback.
- **Copyright Affidavit:** (Linked hash) proving original authorship.

## What the Checker Sees

Shows the issuer domain (`penguinrandomhouse.com`, `harpercollins.com`) and version standing.

**Status Indications:**
- **Certified Original** — Version matches the author's initial submission.
- **Editorial Pass** — Revised version after publisher edits.
- **Final Galleys** — Version approved for typesetting and printing.
- **Retracted** — Authorship or integrity dispute found.

## Who Holds It

The Author benefits from verification.

**Copyright Defense:** Proving to a court or a rival author that their "Version 2.4" existed on March 15, 2026. A verified, timestamped hash from a major publisher's domain is the "Nuclear Option" evidence in plagiarism or "Idea Theft" lawsuits.

**Contractual Milestones:** Proving to an agent that the manuscript was "Verified Delivered" on time, triggering the next advance payment.

## Who Checks It

**Literary Agents**
**Audit Integrity:** Verifying that the manuscript being sent to international sub-agents is the exact verified version authorized by the author, preventing "Version Skew" across different languages.

**Movie Studios / Producers**
**Chain of Title:** Before buying film rights, the studio verifies the "Manuscript Hash" to ensure they are basing the screenplay on the authorized, non-altered version of the book.

**Academic Researchers**
**Provenance Tracking:** For historical or high-value works, verifying the "Edit History" to understand the evolution of the text.

## Who Issues It

**Issuer Types** (First Party)

**Global Publishing Houses.**
**University Presses.**
**Self-Publishing Platforms:** (e.g., Kindle Direct, IngramSpark - hosting the hashes).

**Privacy Salt:** Critical. Manuscript titles and hashes are trade secrets. The hash MUST be salted to prevent competitors from "Guessing" the topics of upcoming high-profile books.

## Authority Chain

**Pattern:** Commercial

Publishers and publishing platforms issue manuscript attestations certifying author submissions and edit history. The issuer is self-authorized as the publisher responsible for manuscript custody.

```
✓ manuscript.example-publisher.com/verify — Certifies manuscript versions and submission timestamps for copyright protection
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Track Changes and Version Control

Authors and editors work on a text together with track changes in Word and similar tools, and some technically minded authors keep a full history in version control such as Git and GitHub. Both are drafting tools run by the people writing. They answer a different question from Live Verify, which lets an outside party confirm that a given manuscript version is the one a publisher recorded, and they work side by side.

| | Track changes | Version control (GitHub) | Live Verify on the manuscript version |
| :--- | :--- | :--- | :--- |
| **Who can check** | Whoever has the file. | Whoever has access to the repository. | Anyone handed the version: an agent, a rights buyer, a translator, a tribunal. |
| **What the checker gets** | The edits recorded in the file, which can be accepted, removed or scrubbed. | A detailed, hard-to-alter history of every change, for those who can read it. | Confirmation that the publisher recorded this exact version, as at its date. |
| **What the author shares** | The file, with whatever history it still carries. | Repository access, or an export. | Only the version they chose to hand over. |
| **Reach** | Anyone using compatible software. | Authors comfortable with version control. | Global in principle: any publisher, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Built into the editor. | Free or low cost, but a learning curve for most authors. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | Nothing beyond the editing software. | A repository and the habit of committing. | The publisher to publish hashes, and Live Verify-aware software on the checker's device. No publisher does this yet. |
| **Best suited to** | Day-to-day collaboration between author and editor. | A thorough technical history of the text. | Showing an outsider which version the publisher recorded and when. |

**Where each fits:** Track changes is how authors and editors actually work on a text together, and version control gives technically minded authors a thorough history. Neither is designed to show an outside party, such as an agent, a rights buyer or a tribunal, that a given PDF is the version the publisher recorded on a given date. Live Verify adds that confirmation against the publisher's domain and leaves the drafting tools as they are.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
