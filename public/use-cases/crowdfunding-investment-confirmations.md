---
title: "Crowdfunding Investment Confirmations"
category: "Investment & Fintech"
volume: "Small"
retention: "3-7 years (fulfillment disputes)"
slug: "crowdfunding-investment-confirmations"
verificationMode: "clip"
tags: ["kickstarter", "indiegogo", "crowdfunding", "pledge-confirmation", "equity-crowdfunding", "backer-reward", "consumer-trust"]
furtherDerivations: 1
---

## What is a Pledge Confirmation?

When you back a project on Kickstarter or Indiegogo, you are often buying a "Future Product" (like a new watch or board game).

The Pledge Confirmation is your receipt. It proves you were "Backer #4" and are entitled to a specific "Early Bird" reward.

In the "Secondary Market" for gadgets, people often try to sell their "Reservation Spots" to others. Verified hashes prevent "Vapor-Pledge" fraud where someone tries to sell a high-value reward tier they never actually bought.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #05ce78; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #05ce78; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.4em;"><span verifiable-text="start" data-for="crowd"></span>KICKSTARTER</div>
    <div style="font-size: 0.8em; font-weight: bold; text-transform: uppercase;">Pledge Confirmation</div>
  </div>
<div style="padding: 30px;">
    <div style="text-align: center; margin-bottom: 25px;">
      <div style="font-size: 0.9em; color: #666;">Backer ID: #998877-K</div>
      <div style="font-size: 2.2em; font-weight: bold; color: #05ce78; margin-top: 5px;">$ 1,200.00</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333; border-top: 1px solid #eee; padding-top: 20px;">
      <p><strong>Backer:</strong> SARAH CONNOR</p>
      <p><strong>Project:</strong> Next-Gen Cyber-Eye (Wearable Tech)<br>
      <strong>Reward Tier:</strong> The Founder's Limited Edition (Serial #004)</p>
<p><strong>Delivery Estimate:</strong> December 2026<br>
      <strong>Pledge Status:</strong> COLLECTED & VERIFIED</p>
<p><strong>Date:</strong> March 15, 2026</p>
    </div>
<div style="margin-top: 30px; padding: 10px; background: #f0fff4; border: 1px solid #05ce78; border-radius: 6px; font-size: 0.8em; color: #006b3c;">
      <strong>Note:</strong> This receipt is a verified record of your pledge. If the project creator fails to deliver, use this hash for dispute resolution.
    </div>
<div data-verify-line="crowd" style="border-top: 1px dashed #05ce78; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Kickstarter doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="crowd">verify:kickstarter.com/pledges/v</span> <span verifiable-text="end" data-for="crowd"></span>
    </div>
  </div>
</div>

## The Problem: Vapor-Pledge Fraud

- **Fabricated Confirmations:** Scammers creating fake Kickstarter emails to trick people into buying "Resale Spots" for a sold-out gadget.
- **Amount Tampering:** Editing a $10 pledge to look like a $1,000 "Titanium Tier" pledge to gain access to exclusive creator forums or events.
- **Status Faking:** Showing a "Sent" status on a PDF when the payment actually failed.

## What Is Checked

Backer name, project title, pledge amount, reward tier description, estimated delivery date, project creator name, transaction date, unique pledge ID.

**Document Types:**
- **Pledge Confirmation:** For reward-based sites (Kickstarter/Indiegogo).
- **Equity Certificate:** For investment-based sites (Wefunder/Republic).
- **Tax Receipt:** For charitable crowdfunding (GoFundMe).

## What the Checker Sees

Shows the issuer domain (`kickstarter.com`, `wefunder.com`) and pledge status.

**Status Indications:**
- **Collected** — Funds successfully charged to backer.
- **Refunded** — Campaign failed or creator issued a refund.
- **Cancelled** — Backer withdrew pledge before deadline.
- **Shipped** — Creator has verified delivery of reward.

## Who Holds It

The Backer / Investor benefits from verification.

**Secondary Market:** If a backer wants to sell their "Founder's Edition" serial number before the product even ships, they can show a potential buyer the "Verified Pledge" from Kickstarter. This prevents "Vapor-Pledge" fraud where someone tries to sell a reward they never actually bought.

**Dispute Resolution:** Proving to a credit card company that a $1,200 charge was for a specific "Founder's Edition" reward if the creator tries to send a cheaper "Basic Edition" instead.

## Who Checks It

**Project Creators**
**Inventory Audit:** Instantly verifying the eligibility of a backer during a face-to-face pickup event at a launch party.

**Platform Safety Teams**
**Shill Bidding Detection:** Verifying the authenticity of large, unusual pledges to ensure they aren't "Fake" pledges from the creator's friends to pump up the campaign's popularity.

**Tax Accountants**
**Donation Verification:** Verifying that a large "Pledge" to a non-profit crowdfunding campaign is a legitimate tax-deductible event.

## Who Issues It

**Issuer Types** (First Party)

**Reward Platforms:** (Kickstarter, Indiegogo).
**Equity Crowdfunding Portals:** (Wefunder, SeedInvest).
**Philanthropy Platforms:** (GoFundMe, Classy).

**Privacy Salt:** Critical. Pledges can reveal personal interests and political affiliations. The hash must be salted to prevent "Guessing" names of backers for controversial projects.

## Authority Chain

**Pattern:** Regulated

Seedrs issues investment confirmations for UK crowdfunding platforms.

```
✓ invest.seedrs.com/confirm/verify — Issues investment confirmations for crowdfunding platforms
  ✓ fca.org.uk/register — Regulates UK investment firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With Platform Dashboards

| Feature | Live Verify | Platform Dashboard | Scanned PDF / Email |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to the Platform. | **System-Bound.** | **Zero.** Easily forged. |
| **Interoperability** | **Universal.** Works for secondary sales. | **Siloed.** Hard to prove status to a 3rd party buyer. | **Universal.** |
| **Integrity** | **Binds Tier.** Protects the "Reward Level." | **Data-Only.** | **Vulnerable.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires 2FA and navigation. | **N/A.** |

**Where each fits:** the platform dashboard is the backer's own authoritative view and the place where any change to a pledge is made. A third party cannot see it without the backer's login. Live Verify lets the backer show a confirmation that the other person can check against the platform's domain, while the dashboard remains the record. Whether a pledge can be transferred is still a matter for the platform's terms.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
