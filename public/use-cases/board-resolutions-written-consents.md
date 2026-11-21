---
title: "Board Resolutions and Written Consents"
category: "Business & Commerce"
volume: "Small"
retention: "Permanent"
slug: "board-resolutions-written-consents"
verificationMode: "clip"
tags: ["corporate-governance", "board-of-directors", "resolution", "written-consent", "legal-authority", "m-and-a"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="board"></span>ACTION BY UNANIMOUS WRITTEN CONSENT</div>
    <div style="font-size: 0.9em; margin-top: 5px;">OF THE BOARD OF DIRECTORS OF</div>
    <div style="font-weight: bold; font-size: 1.1em; margin-top: 5px;">INITECH HOLDINGS, INC.</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #333; text-align: justify;">
    <p>The undersigned, being all the members of the Board of Directors of Initech Holdings, Inc., a Delaware corporation (the "Company"), hereby take the following actions by written consent:</p>
<p><strong>RESOLVED:</strong> That the Company is hereby authorized to enter into the Merger Agreement with Globochem Corp. dated as of March 15, 2026.</p>
<p><strong>RESOLVED FURTHER:</strong> That the Officers of the Company are authorized to execute all such documents as are necessary to effectuate the foregoing resolution.</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Bill Lumbergh</div>
      <div style="font-size: 0.8em; color: #777;">Director</div>
    </div>
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Peter Gibbons</div>
      <div style="font-size: 0.8em; color: #777;">Director</div>
    </div>
  </div>
<div data-verify-line="board" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Law firm doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="board">verify:wilson-sonsini.com/docs/v</span> <span verifiable-text="end" data-for="board"></span>
  </div>
</div>

## The Problem: Backdated Resolution Fraud

- **Retroactive Grants:** Issuing stock options today but "resolving" them at last year's lower price (Stock Option Backdating). Verification timestamps prevent this.
- **Unauthorized Actions:** A CEO fabricating a resolution to sell a company asset without Board knowledge.
- **Phantom Directors:** Creating a resolution signed by non-existent or "straw" directors to bypass governance.

## What Is Checked

Corporate name, resolution text (digest), date of action, names of directors/officers signing, type of action (Unanimous Written Consent vs. Meeting Minutes), jurisdiction of incorporation.

**Document Types:**
- **Unanimous Written Consent:** Signed by all directors without a meeting.
- **Board Meeting Minutes:** Summary of a formal meeting.
- **Secretary's Certificate:** Certification that a resolution is true and in effect.
- **Officer's Certificate:** For high-level corporate actions (e.g., IPO).

## What the Checker Sees

Shows the issuer domain (e.g., the Corporation or its primary Law Firm) and current status.

**Status Indications:**
- **In Effect** — Resolution is valid and has not been rescinded.
- **Superseded** — A later resolution has modified or replaced this one.
- **Rescinded** — The Board has formally cancelled this action.
- **Void** — Action determined to be ultra vires or legally invalid.

## Who Holds It

The Corporation benefits from verification.

**Bank Account Opening:** Proving to a bank that the "Resolution to Open Account" isn't a fake PDF created by a rogue employee, but is an official board-sanctioned document.

**Real Estate Closing:** Proving to a title company that the officers signing the deed have the verified authority from the Board to sell the property.

**M&A Due Diligence:** Providing a "Verified Minute Book" to a buyer, reducing the thousands of hours lawyers spend manually confirming signatures and corporate actions.

## Who Checks It

**Investment Banks / Underwriters**
**IPO Due Diligence:** Ensuring every major corporate milestone (funding rounds, stock grants) has a verified, timestamped board resolution, preventing "Founders Disputes" later.

**Commercial Lenders**
**Authority Verification:** Confirming that the people signing a $100M loan agreement are the actual authorized representatives of the company.

**Landlords / Lessors**
**Lease Signing:** Verifying the "Corporate Authority" of the person signing a 10-year commercial lease.

## Who Issues It

**Issuer Types** (First Party)

**Corporations:** (Hosting on their own internal IR/Legal domain).
**Law Firms:** (e.g., WSGR, Fenwick, Cooley - hosting on behalf of clients).
**Equity Platforms:** (e.g., Carta, Pulley - who manage the cap table and resolutions).

## Authority Chain

**Pattern:** Commercial

Corporations issue board resolutions and written consents to document their own internal governance decisions. Self-authorized by company bylaws and corporate law.

```
✓ corporate.example-corp.com/resolution/verify — Issues board resolutions and written consents
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, Corporate Registries and Virtual Data Rooms

A Secretary of State, such as Delaware's, or a national companies registry elsewhere, records whether a company exists and is in good standing, and during a deal the board's minutes and resolutions are shared through a virtual data room. Registries vary by country in what they hold, but board resolutions are rarely filed with them. These and Live Verify answer different questions and work side by side: the registry confirms the company, the data room supports full diligence, and Live Verify lets a recipient check one resolution.

| | Secretary of State or companies registry | Virtual data room | Live Verify on the resolution |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone, by search, often for a fee. | Invited parties, during the deal. | Anyone handed the resolution: a bank, a counterparty, an auditor, a notary. |
| **What the checker gets** | The company's existence and good standing; not its board decisions. | The full set of documents the company chose to load. | Confirmation that the company or its law firm issued this exact resolution, as at its date. |
| **What the company shares** | What it is required to file. | Everything in the room, with invited parties. | Only the resolution it chose to hand over. |
| **Reach** | Companies formed in that jurisdiction. | Parties invited to that room; access usually ends after the deal. | Global in principle: any company or law firm that publishes hashes on its own domain. |
| **Speed and cost** | Searches and certificates often carry fees. | Convenient for invited parties; the company pays for the platform. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | The company to be registered. | A data room subscription and invitations. | The company or law firm to publish hashes, and Live Verify-aware software on the checker's device. No company or law firm does this yet. |
| **Best suited to** | Confirming the company exists and is in good standing. | Full diligence during a transaction. | A bank or counterparty outside the deal needing one authority. |

**Where each fits:** the Secretary of State is the authority on whether a company exists and is in good standing, and a data room is the right place for full diligence during a deal. Neither tells a bank outside the deal that the board approved a particular transaction. Live Verify lets the company or its law firm share that one resolution in a form the recipient can check, if their software honours it, without opening the rest of the minute book.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
