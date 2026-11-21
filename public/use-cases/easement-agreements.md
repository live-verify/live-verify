---
title: "Easement Agreements and Grants"
category: "Real Estate & Property"
volume: "Tiny"
retention: "Permanent (property encumbrance)"
slug: "easement-agreements"
verificationMode: "clip"
tags: ["real-estate", "property-rights", "easement-grant", "utility-access", "land-use", "title-search", "legal-description"]
furtherDerivations: 1
---

## What is an Easement?

An Easement is a legal right to use someone else's land for a specific purpose. The most common type is a Utility Easement, where the city or a power company has the right to run pipes or wires through your backyard.

This "Right" is permanent and stays with the land, even if the house is sold.

Fraud happens when sellers "Hide" easements from buyers by deleting pages from legal documents. A verified easement grant ensures the buyer knows exactly where they are not allowed to build a pool or a fence, preventing multimillion-dollar trespassing lawsuits.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #000; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="easement"></span>GRANT OF EASEMENT</h2>
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
      <span data-verify-line="easement">verify:marincounty.gov/recorder/v</span> <span verifiable-text="end" data-for="easement"></span>
  </div>
</div>

## The Problem: Hidden Encumbrance Fraud

- **Scope Alteration:** Editing a "10-foot Utility Easement" to read "5-foot" to make a lot look more buildable to a buyer.
- **Easement Deletion:** Removing the page showing an "Ingress/Egress" easement for a neighboring property, which effectively "lands-locks" the neighbor.
- **Fake Signatures:** Forging a neighbor's signature on an easement grant to get a driveway permit from the city.

## What Is Checked

Grantor name, Grantee name, legal property description (Lot/Block/Plat), easement purpose (Utility, Ingress/Egress, Conservation), width/dimensions, date of grant, Liber/Page/Document reference number, Notary identification.

**Document Types:**
- **Grant of Easement:** The primary transfer of rights.
- **Easement Appurtenant:** Linked to the land itself (survives sale).
- **Easement in Gross:** Linked to a specific person/entity (e.g., utility).
- **Termination of Easement:** Proving the right has been legally extinguished.

## What the Checker Sees

Shows the issuer domain (`marincounty.gov`, `pge.com`) and current recording status.

**Status Indications:**
- **Recorded** — Document is officially filed and legally binding.
- **Active** — Easement is currently in force.
- **Terminated** — Easement has been legally removed from the title.
- **Under Review** — Document submitted but final indexing pending.

## Who Holds It

The Property Owner benefits from verification.

**Clear Title:** When selling a home, the owner can provide a verified hash of all active easements to the buyer. This prevents "Title Surprises" where a buyer's lawyer discovers an undisclosed utility line 3 days before closing.

**Fence/Construction Planning:** Proving the *exact width* of a 10-foot easement to a contractor to ensure a new fence or pool doesn't encroach on a utility company's verified legal rights.

## Who Checks It

**Utility Companies (PG&E / Comcast)**
**Right-of-Entry:** When a crew needs to dig in a private backyard, they can show the homeowner the verified easement hash on their work order. "Verified by Marin County" prevents homeowners from calling the police for trespassing.

**Title Insurance Companies**
**Risk Underwriting:** Title officers verify that the easement they found in the historical records matches the "Final Signed Document" hash, ensuring no pages were swapped or terms edited in the archive.

**Civil Engineers / Surveyors**
**Boundary Integrity:** Instantly verifying the legal descriptions used to set stakes in the ground during a new development.

## Who Issues It

**Issuer Types** (First Party)

**County Recorders / Registrars of Deeds:** (The ultimate authority).
**Utility Companies:** (Hosting their own "Active Rights" database).
**Title Platforms:** (e.g., Simplifile, DataTrace).

## Authority Chain

**Pattern:** Regulated

Solicitors authenticate easement agreements and property access rights.

```
✓ conveyancing.example-solicitors.co.uk/easement/verify — Authorizes easement rights for property use
  ✓ sra.org.uk/solicitors — Regulates solicitors in England and Wales
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Land Records Searches

Easements are recorded in public land records: in the US with the county recorder, and elsewhere in a national or regional land registry. Some places offer good online search, some charge fees or require accounts, and some still keep much of the record on paper in a deed room. The official record and Live Verify answer different questions and work side by side: the record says what is registered against a parcel, and Live Verify says whether the copy in someone's hand matches what the issuer stands behind.

| | Online records search | Deed room search | Live Verify on the easement document |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who can use the search, sometimes with an account or fee. | Anyone who travels there during opening hours. | Anyone handed the document: a buyer, a neighbour, a contractor, a utility crew, a title officer. |
| **What the checker gets** | The recorded instruments for a parcel, as far as they have been digitised and indexed. | The full recorded history, including older instruments. | Confirmation that the issuer stands behind this exact easement text, as at its date, and whether it has since been released or amended. |
| **What the owner shares** | Nothing; the record is public. | Nothing; the record is public. | Only the document they chose to hand over. |
| **Reach** | One county's or registry's records. | One county's or registry's records. | Global in principle: any recorder, registry or utility, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Minutes to hours finding the parcel and the right instrument; sometimes a fee. | Hours, including travel. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | Search skills, and sometimes an account. | A visit. | The issuer to publish hashes, and Live Verify-aware software on the checker's device. No recorder or registry does this yet. |
| **Best suited to** | Title searches and finding what is recorded. | Older records and full title examination. | Checking, on the land, that a copy matches the recorded instrument. |

**Where each fits:** the county's online records and the deed room remain the legal source for what is recorded against a parcel, and a title search will always go there. They take time, sometimes a fee or an account, and a search does not tell you whether the copy in your hand matches the recorded instrument. Live Verify answers that one question for a neighbour, contractor or utility crew standing on the land with the document. A full title examination is still the job of the official record.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
