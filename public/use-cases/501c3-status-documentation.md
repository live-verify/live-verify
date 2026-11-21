---
title: "501(c)(3) Status Documentation"
category: "Charitable & Non-Profit"
volume: "Tiny"
retention: "Permanent (legal status)"
slug: "501c3-status-documentation"
verificationMode: "clip"
tags: ["501c3", "status", "documentation", "charitable", "non-profit", "IRS"]
furtherDerivations: 2
---

## What is a 501(c)(3) Letter?

A 501(c)(3) Determination Letter is the official document from the IRS granting a non-profit organization tax-exempt status. It is the "Golden Ticket" of the charity world.

Without this letter:
1.  **Donors** cannot deduct their contributions.
2.  **Foundations** will not give grants.
3.  **Vendors** (like TechSoup or Microsoft) will not give non-profit discounts.

Charities often have to fax, email, or mail this letter dozens of times a year to prove their legitimacy.

The IRS's own database/search path should remain primary where the verifier is willing and able to use it. Live Verify is more credible as a bridge when the determination letter itself is the artifact being forwarded, attached to a grant packet, framed on a wall, or circulated as a PDF outside the IRS workflow.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px;">
  <span verifiable-text="start" data-for="501c3"></span>
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em;">Internal Revenue Service</div>
    <div style="font-size: 0.9em;">Department of the Treasury</div>
    <div style="font-size: 0.9em;">P.O. Box 2508, Cincinnati, OH 45201</div>
  </div>
<div style="margin-bottom: 30px; font-size: 0.9em;">
    <div style="text-align: right; margin-bottom: 20px;">
      Employer Identification Number:<br>
      <span style="font-weight: bold;">12-3456789</span><br>
      DLN: 17053221002025
    </div>
    <div>
      Date: <span style="font-weight: bold;">OCT 24 2025</span><br><br>
      THE HUMAN FUND<br>
      123 CHARITY LANE<br>
      NEW YORK, NY 10001
    </div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; text-align: justify;">
    <p>Dear Applicant:</p>
    <p>We're pleased to tell you we determined you're exempt from federal income tax under Internal Revenue Code (IRC) Section 501(c)(3). Donors can deduct contributions they make to you under IRC Section 170. You're also qualified to receive tax deductible bequests, devises, transfers or gifts under Section 2055, 2106, or 2522.</p>
    <p>Public Charity Status: 170(b)(1)(A)(vi)</p>
  </div>
<div data-verify-line="501c3" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: IRS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="bare2">verify:irs.gov/teos/v</span>
  </div>
  <span verifiable-text="end" data-for="501c3"></span>
</div>

## The Problem: 501(c)(3) Fraud

- **Name Spoofing:** Creating a fake charity with a name very similar to a famous one (e.g., "Cancer Fund of America" vs "American Cancer Society").
- **Status Misrepresentation:** Claiming to be tax-exempt when the status was actually revoked years ago for non-filing.
- **Photoshop:** Altering an old determination letter to change the year or the address.

## What Is Checked

Organization name, EIN (Employer Identification Number), effective date of exemption, public charity status classification, address at time of issuance.

**Document Types:**
- **Determination Letter (Form 1045)**
- **Affirmation Letter** (issued later to confirm status hasn't changed)

## What the Checker Sees

Shows the issuer domain (e.g., `irs.gov`) and current status.

**Status Indications:**
- **Valid** — Organization is currently exempt and in good standing.
- **Revoked** — Exemption was automatically revoked (e.g., for failure to file Form 990 for 3 years).
- **Suspended** — Under investigation or temporarily suspended.

## Who Holds It

The Non-Profit Organization (second party) receives the determination letter from the IRS (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The organization has their own verified copy of tax-exempt status. Most of the time, the document sits in organizational files—the verification value is latent, there *if needed*.

**Peace of Mind:** The organization can confirm at any time that the letter matches what the IRS's system recorded and hasn't been altered since they received it.

**Future Optionality:** If a grant application arises, a state registration is needed, or a donor questions their tax-deductibility, the organization has cryptographic proof ready without needing to contact the IRS.

## Who Checks It

The non-profit organization (second party) may hand the verified document to various third parties:

**Donors and Foundations**
High-net-worth donors want absolute certainty that their large donation will be tax-deductible. Verifying the determination letter confirms the entity is legitimate and currently exempt.

**Corporate Matching Platforms**
Platforms like Benevity or CyberGrants verify charities before allowing employees to donate. Automation via OCR verification reduces manual review time.

**State Regulators**
State Attorneys General can verify the federal status of organizations soliciting funds in their jurisdiction.

## Who Issues It

**Issuer Types (First Party)**

- Internal Revenue Service (IRS) — The sole authority for federal tax exemption

**Privacy Salt:** Not required. The determination letter contains highly unpredictable variables—unique EIN (Employer Identification Number), organization legal name variations, specific determination dates, and DLN (Document Locator Number). These elements combined provide sufficient entropy that enumeration attacks are infeasible. Adding salt would provide no additional security benefit.

## Authority Chain

**Pattern:** Sovereign

Administers federal tax exemptions for charitable organizations.

```
✓ irs.gov/charities/verify — Administers federal tax exemptions for charitable organizations
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify, IRS Search and QR Codes

The IRS runs Tax Exempt Organization Search, a free public lookup of an organisation's current exempt status, and an organisation could also print a QR code on material that links to its record. These cover US organisations only; charities elsewhere sit on their own national registers, where those exist. IRS search, QR codes and Live Verify answer slightly different questions and work side by side: the search tells you the current IRS record, while Live Verify confirms that the determination letter in front of you is one the IRS issued.

| | IRS Tax Exempt Organization Search | QR code on the letter | Live Verify on the determination letter |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone who goes to the IRS site and searches by name or EIN. | Anyone with a phone camera. | Anyone handed the letter: a donor, a grant-maker, a corporate matching programme, a venue. |
| **What the checker gets** | The IRS's current record for that organisation, straight from the source. | Whatever page the code points to; the checker has to judge whether that page is genuine. | Confirmation that the IRS stands behind this exact letter, as at its date, and whether it has since been revoked. |
| **What the organisation shares** | Nothing; the record is public. | The letter, including the link. | Only the letter they chose to hand over. |
| **Reach** | US organisations only. | Works anywhere the link resolves. | Global in principle: any tax authority or charity regulator, in any country, that publishes hashes on its own domain. |
| **Speed and cost** | Free; a search takes a minute or two, and similar names can cause mistakes. | A few seconds to scan. | A few seconds per check: one web lookup, with no fee to the standard. |
| **What it needs** | The checker to navigate to the real IRS site and find the right entry. | A printed code and a live page behind it. | The IRS to publish hashes, and Live Verify-aware software on the checker's device. The IRS does not do this. |
| **Best suited to** | Any checker willing to search the IRS directly; it remains the primary answer. | Pointing a reader to a page quickly. | Bridging a shared or displayed letter back to the issuer without a manual search. |

**Where each fits:** IRS search should remain the main answer when the checker is prepared to use it directly, and it shows current status rather than the status on a letter's date. Live Verify is complementary when the determination letter itself is what is being shared, and the aim is to tie that letter back to its issuer in a few seconds without a manual search, for checkers whose software honours it.

## See Also

- [Professional Licenses](view.html?doc=professional-licenses) — Another case where a wall document is stronger as a visible surface than as the core artifact

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
