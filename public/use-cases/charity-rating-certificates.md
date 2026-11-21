---
title: "Charity Rating Certificates"
category: "Charitable & Non-Profit"
volume: "Tiny"
retention: "3-5 years (rating validity)"
slug: "charity-rating-certificates"
verificationMode: "clip"
tags: ["charity", "non-profit", "rating", "transparency", "impact", "donor-trust", "charity-navigator"]
furtherDerivations: 1
---

## What is a Charity Rating?

A Charity Rating is a "Grade" for a non-profit organization. Watchdog groups (like Charity Navigator) look at a charity's taxes to see if they are actually spending money on the mission or just on big salaries and marketing.

A 4-Star Rating is the "Gold Standard" that charities display in their lobbies and on their websites to win over big donors.

Because a higher rating leads directly to more donations, some charities "Inflate" their stars on their marketing materials or hide that their rating was recently revoked. Live Verify turns the wall certificate into a real-time link to the watchdog's database.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #004d40; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <div style="background: #004d40; color: #fff; padding: 20px; text-align: center;">
    <h3 style="margin: 0; letter-spacing: 1px;"><span verifiable-text="start" data-for="rating"></span>CHARITY NAVIGATOR</h3>
    <div style="font-size: 0.8em; opacity: 0.8;">OFFICIAL ACCREDITATION CERTIFICATE</div>
  </div>
<div style="padding: 30px; text-align: center;">
    <div style="margin-bottom: 20px;">
      <div style="font-size: 3em; color: #ffca28;">★★★★</div>
      <div style="font-weight: bold; font-size: 1.2em; color: #004d40; margin-top: -10px;">4-STAR RATING</div>
    </div>
<div style="font-size: 1.1em; line-height: 1.6; color: #333; margin-bottom: 25px;">
      This is to certify that<br>
      <strong>THE HUMAN FUND</strong><br>
      has achieved our highest rating for fiscal responsibility, transparency, and impact.
    </div>
<div style="display: flex; justify-content: space-around; font-size: 0.9em; color: #555; background: #f9f9f9; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
      <div>
        <strong>Efficiency:</strong><br>92.4%
      </div>
      <div>
        <strong>Governance:</strong><br>PASS
      </div>
      <div>
        <strong>Reporting:</strong><br>VERIFIED
      </div>
    </div>
<div style="font-size: 0.8em; color: #777;">
      <strong>Issue Date:</strong> January 15, 2026<br>
      <strong>Valid Until:</strong> January 14, 2027
    </div>
<div data-verify-line="rating" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Charity Navigator doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="rating">verify:charitynavigator.org/v</span> <span verifiable-text="end" data-for="rating"></span>
    </div>
  </div>
</div>

## The Problem: Rating Inflation Fraud

- **Fake Stars:** A 2-star charity using Photoshop to change their certificate to show 4 stars.
- **Date Stretching:** Hiding a recent rating drop by changing the "Valid Until" date on an old certificate.
- **Name Spoofing:** A fraudulent "The American Cancer Fund" creating a fake certificate that looks like it belongs to the legitimate "American Cancer Society."

## What Is Checked

Non-profit legal name, EIN, rating score (e.g., 4-stars), numerical efficiency percentage, governance pass/fail, reporting compliance, issue date, expiration date.

**Document Types:**
- **Accreditation Certificate:** The "Diploma" for the wall.
- **Rating Summary:** 1-page impact report for major donors.
- **Seal of Transparency:** For digital use (with OCR back-link).

## What the Checker Sees

Shows the issuer domain (`charitynavigator.org`, `givewell.org`, `guidestar.org`) and current rating status.

**Status Indications:**
- **Current** — Rating is active and based on latest tax filings.
- **Under Review** — Rating paused due to major controversy or leadership shift.
- **Expired** — New financial data required for update.
- **Revoked** — Rating removed due to fraudulent reporting.

## Who Holds It

The Non-Profit Organization benefits from verification.

**Major Giving:** Proving to a high-net-worth donor or a family foundation that their "4-Star" claim is verified by the source. This overcomes the "Skepticism Gap" in large-scale philanthropy.

**Corporate Matching:** Proving to a corporate matching partner (e.g., Microsoft or Google) that the charity meets the minimum required rating threshold for employee donations.

**Fundraising Appeals:** Including the verification link in year-end mailers to show donors that the "92% Efficiency" claim is a cryptographically verified fact.

## Who Checks It

**Philanthropists / Donors**
**Due Diligence:** Before writing a $10,000 check, a donor scans the certificate displayed in the lobby. "Verified by Charity Navigator" provides instant confidence that the numbers aren't "self-reported fiction."

**Family Foundations**
**Grant Vetting:** Program officers can instantly verify the ratings of dozens of grant applicants by scanning their PDF summaries, bypassing manual database lookups.

**Media / Press**
**Fact Checking:** Verifying the "Top-Rated" claims made by charities in press releases or television interviews.

## Who Issues It

**Issuer Types** (First Party)

**Watchdogs:** (Charity Navigator, BBB Wise Giving Alliance).
**Impact Evaluators:** (GiveWell, ImpactMatters).
**Data Aggregators:** (Candid / GuideStar).

## Authority Chain

**Pattern:** Commercial

Charity watchdogs and rating organizations evaluate non-profit financial data to issue ratings and accreditations. Self-authorized by their industry reputation and independent research methodology.

```
✓ rating.charitynavigator.org/verify — Issues charity ratings and accreditation certificates
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the rater's hashes and status changes plus structured metadata (key identifiers, dates) — never plaintext or sensitive personal information — providing non-repudiation of the rating it issued.


## Compared With Guidestar Search

| Feature | Live Verify | GuideStar / Candid Search | Scanned JPEG Badge |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Rater. | **Database.** High trust but requires manual navigation. | **Zero.** Easily copied. |
| **Integrity** | **Binds Numbers.** Protects the % Efficiency. | **Live.** Shows latest data. | **Vulnerable.** |
| **User Experience** | **Instant.** Scan the paper/PDF. | **Slow.** Requires typing EIN and finding the record. | **N/A.** |
| **B2B Integration** | **High.** Can be automated into grant software. | **Medium.** Requires expensive API access. | **Low.** |

**Where each fits:** searching the rating body's own database gives the fullest and most current picture, and a donor or grant-maker doing proper diligence should do that. Someone looking at a certificate on a lobby wall or in an appeal letter usually will not. Live Verify gives them a quick check that the rater issued that certificate with those figures, and points them back to the rater for anything more.
