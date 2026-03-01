---
title: "Easement Agreements and Grants"
category: "Real Estate & Property"
volume: "Tiny"
retention: "Permanent (property encumbrance)"
slug: "easement-agreements"
tags: ["real-estate", "property-rights", "easement-grant", "utility-access", "land-use", "title-search", "legal-description"]
furtherDerivations: 1
---

## What is an Easement?

An **Easement** is a legal right to use someone else's land for a specific purpose. The most common type is a **Utility Easement**, where the city or a power company has the right to run pipes or wires through your backyard.

This "Right" is permanent and stays with the land, even if the house is sold.

Fraud happens when sellers "Hide" easements from buyers by deleting pages from legal documents. A verified easement grant ensures the buyer knows exactly where they are **not** allowed to build a pool or a fence, preventing multimillion-dollar trespassing lawsuits.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #000; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="easement">[</span>GRANT OF EASEMENT</h2>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #000; text-align: justify;">
    <p>This Grant of Easement is made on March 15, 2026, between <strong>Grantor:</strong> <strong>John Jacob Doe</strong> and <strong>Grantee:</strong> Pacific Gas & Electric Company.</p>
<p>The Grantor hereby grants to the Grantee a permanent non-exclusive easement for the purpose of installing and maintaining subterranean electrical conduits across the following described property:</p>
<p style="background: #f9f9f9; padding: 10px; border: 1px solid #eee; font-family: monospace; font-size: 0.9em;">
      LOT 42, BLOCK 7, MAP OF SKYLINE HEIGHTS, RECORDED IN LIBER 123, PAGE 456, COUNTY OF MARIN.
    </p>
<p>The easement area shall be a strip of land 10 feet in width as shown on Exhibit A attached hereto.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px;">John Jacob Doe</div>
      <div style="font-size: 0.8em; color: #777;">Grantor</div>
    </div>
    <div style="width: 45%; text-align: right;">
      <div style="width: 80px; height: 80px; border: 2px solid #000; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; margin-left: auto;">NOTARY<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="easement" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: County Recorder doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:marincounty.gov/recorder/v <span verifiable-text="end" data-for="easement">]</span>
  </div>
</div>

## Data Verified

Grantor name, Grantee name, legal property description (Lot/Block/Plat), easement purpose (Utility, Ingress/Egress, Conservation), width/dimensions, date of grant, Liber/Page/Document reference number, Notary identification.

**Document Types:**
- **Grant of Easement:** The primary transfer of rights.
- **Easement Appurtenant:** Linked to the land itself (survives sale).
- **Easement in Gross:** Linked to a specific person/entity (e.g., utility).
- **Termination of Easement:** Proving the right has been legally extinguished.

## Data Visible After Verification

Shows the issuer domain (`marincounty.gov`, `pge.com`) and current recording status.

**Status Indications:**
- **Recorded** — Document is officially filed and legally binding.
- **Active** — Easement is currently in force.
- **Terminated** — Easement has been legally removed from the title.
- **Under Review** — Document submitted but final indexing pending.

## Second-Party Use

The **Property Owner** benefits from verification.

**Clear Title:** When selling a home, the owner can provide a verified hash of all active easements to the buyer. This prevents "Title Surprises" where a buyer's lawyer discovers an undisclosed utility line 3 days before closing.

**Fence/Construction Planning:** Proving the *exact width* of a 10-foot easement to a contractor to ensure a new fence or pool doesn't encroach on a utility company's verified legal rights.

## Third-Party Use

**Utility Companies (PG&E / Comcast)**
**Right-of-Entry:** When a crew needs to dig in a private backyard, they can show the homeowner the verified easement hash on their work order. "Verified by Marin County" prevents homeowners from calling the police for trespassing.

**Title Insurance Companies**
**Risk Underwriting:** Title officers verify that the easement they found in the historical records matches the "Final Signed Document" hash, ensuring no pages were swapped or terms edited in the archive.

**Civil Engineers / Surveyors**
**Boundary Integrity:** Instantly verifying the legal descriptions used to set stakes in the ground during a new development.

## Verification Architecture

**The "Hidden Encumbrance" Fraud Problem**

- **Scope Alteration:** Editing a "10-foot Utility Easement" to read "5-foot" to make a lot look more buildable to a buyer.
- **Easement Deletion:** Removing the page showing an "Ingress/Egress" easement for a neighboring property, which effectively "lands-locks" the neighbor.
- **Fake Signatures:** Forging a neighbor's signature on an easement grant to get a driveway permit from the city.

**Issuer Types** (First Party)

**County Recorders / Registrars of Deeds:** (The ultimate authority).
**Utility Companies:** (Hosting their own "Active Rights" database).
**Title Platforms:** (e.g., Simplifile, DataTrace).

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


## Competition vs. County Records Search

| Feature | Live Verify | County Search (Online) | Physical Deed Room |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the County. | **Database-Bound.** High trust but manual. | **Physical.** Trust the paper. |
| **Speed** | **Instant.** 5-second scan at the fence line. | **Slow.** Requires finding the parcel # and navigating old UIs. | **Very Slow.** Hours of travel/search. |
| **Integrity** | **Binds Content.** Protects the legal text. | **Data-Only.** Doesn't verify the paper in your hand. | **Vulnerable.** |
| **User Access** | **Universal.** Anyone with the document. | **Difficult.** Many counties charge fees or require logins. | **Restricted.** |

**Why Live Verify wins here:** The "Field Reality." Disputes about property rights happen in backyards and at construction sites. People don't have Libers and Pages memorized. Live Verify turns the **Physical Agreement** into a live digital portal, ending trespassing disputes and title confusion in seconds.
