---
title: "Equity Crowdfunding Certificates"
category: "Investment & Fintech"
volume: "Very Small"
retention: "Permanent (securities holding)"
slug: "equity-crowdfunding-certificates"
verificationMode: "clip"
tags: ["equity-crowdfunding", "startengine", "wefunder", "republic", "securities", "shareholder-certificate", "regulation-cf", "cap-table"]
furtherDerivations: 1
---

## What is a Reg CF Certificate?

In the old days, only rich people could invest in startups. Today, through Regulation Crowdfunding (Reg CF), anyone can buy shares in a "Future Unicorn" for as little as $100.

The Stock Certificate is your proof of ownership. It proves you own a tiny piece of a private company (like a robotics startup or a new brewery).

Because these shares aren't traded on the stock market (like Apple or Tesla), they are easy to fake. Scammers often sell "Fake Equity" in hot startups using realistic-looking PDF certificates. Verified hashes allow an investor to prove their ownership to a bank or a secondary buyer instantly.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 4px double #1a237e; background: #fff; padding: 40px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); position: relative;">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 2px;"><span verifiable-text="start" data-for="equity"></span>CERTIFICATE OF STOCK</div>
    <div style="font-size: 0.9em; margin-top: 5px;">INCORPORATED UNDER THE LAWS OF DELAWARE</div>
  </div>
<div style="font-size: 1em; line-height: 1.6; color: #333; text-align: center;">
    <p>This certifies that</p>
    <p style="font-size: 1.5em; font-weight: bold; color: #1a237e; margin: 15px 0;">SARAH J. SMITH</p>
    <p>is the registered holder of</p>
    <p style="font-size: 1.2em; font-weight: bold;">1,000 SHARES OF COMMON STOCK</p>
    <p>of</p>
    <p style="font-size: 1.4em; font-weight: bold; margin: 10px 0;">FUTURE-TECH ROBOTICS, INC.</p>
  </div>
<div style="margin: 30px 0; font-size: 0.9em; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 15px 0; text-align: left;">
    <strong>Certificate #:</strong> FT-2026-0992<br>
    <strong>Issuance Date:</strong> March 15, 2026<br>
    <strong>Offering Type:</strong> Regulation Crowdfunding (Reg CF)
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="width: 45%;">
      <div style="border-top: 1px solid #000; padding-top: 5px; font-style: italic;">Elon Miller, CEO</div>
    </div>
    <div style="text-align: right; width: 45%;">
      <div style="width: 80px; height: 80px; border: 2px solid #1a237e; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; color: #1a237e; font-weight: bold; text-align: center; margin-left: auto;">CORP<br>SEAL</div>
    </div>
  </div>
<div data-verify-line="equity" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: StartEngine doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="equity">verify:startengine.com/shares/v</span> <span verifiable-text="end" data-for="equity"></span>
  </div>
</div>

## The Problem: Zombies and Ghosts Fraud

- **Zombie Certificates:** Selling shares that were already transferred to someone else 6 months ago. Verification shows the "Transferred" status.
- **Phantom Equity:** Using a template to create a fake certificate for a hot startup (e.g., SpaceX) to trick a private buyer into wiring money.
- **Amount Tampering:** Changing 100 shares to 10,000 shares on a PDF to use as collateral for a loan.

## What Is Checked

Shareholder name, company name, number of shares, share class (Common/Preferred), issuance date, certificate number, regulation type (Reg CF, Reg A+), valuation at time of issuance (optional), platform ID.

**Document Types:**
- **Stock Certificate:** Formal proof of ownership.
- **Investment Confirmation:** Issued immediately after the "Close" of a round.
- **SAFE Agreement:** Simple Agreement for Future Equity (with hash of terms).
- **K-1 Tax Form:** (Linked hash) for annual tax reporting.

## What the Checker Sees

Shows the issuer domain (`startengine.com`, `wefunder.com`, `republic.com`) and current share standing.

**Status Indications:**
- **Active** — Shareholder is on the official cap table.
- **Transferred** — Shares have been sold or moved to a secondary market.
- **Cancelled** — Shareholder has exited or round was voided.
- **Converted** — SAFE or Note has converted into equity.

## Who Holds It

The Investor (Shareholder) benefits from verification.

**Secondary Sales:** If an investor wants to sell their private shares on a secondary platform (e.g., Forge or EquityZen), they can show the "Verified Certificate." This prevents "Phantom Stock" fraud and allows the buyer to trust the holding without waiting for the company's legal team to reply.

**Mortgage / Wealth Proof:** Proving to a bank's wealth management department that the investor has $100,000 in "Verified Private Equity," which can be used to qualify for "Asset-Based" loans or high-tier credit cards.

## Who Checks It

**Secondary Market Platforms**
**Cap Table Integrity:** Before listing a company's shares for trade, the platform verifies the individual certificates of the sellers. Live Verify ensures the seller actually owns the 1,000 shares they claim.

**Startup CEOs / Founders**
**Governance:** Instantly verifying the identity and holding of a shareholder who is requesting access to a private company meeting or voting on a board resolution.

**The SEC / Regulators**
**Compliance Audit:** Ensuring that "Regulation Crowdfunding" companies are staying within their 2,000-investor limits by verifying the digital trail of issued certificates.

## Who Issues It

**Issuer Types** (First Party)

**Funding Portals:** (StartEngine, Wefunder, Republic).
**Transfer Agents:** (e.g., Carta, Computershare).
**Law Firms:** (Managing private cap tables).

## Authority Chain

**Pattern:** Regulated

Crowdcube issues equity crowdfunding investment certificates for UK startups.

```
✓ shares.crowdcube.com/verify — Issues equity crowdfunding investment certificates
  ✓ fca.org.uk/register — Regulates UK investment firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Cap-Table Platforms

Private companies, including those that raise money through crowdfunding, keep their shareholder records on cap-table platforms such as Carta and Pulley, or with a transfer agent or law firm. Investors see their own holdings there, and outsiders see nothing unless invited. The platform and Live Verify answer different questions and work side by side: the platform is the working record of ownership, and Live Verify lets an outsider check a certificate the investor hands them.

| | Cap-table platform | Live Verify on the share certificate | Unverified PDF |
| :--- | :--- | :--- | :--- |
| **Who can check** | The company, its investors, and anyone the company invites. | Anyone handed the certificate: a secondary buyer, a bank, an executor, a regulator. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The live record of who owns what, with transfer history. | Confirmation that the issuer or transfer agent stands behind this exact certificate, with this share count, as at its date, and whether it has since been transferred or cancelled. | A certificate that may have been edited or invented. |
| **What the investor shares** | An invitation, which only the company can give. | Only the certificate they chose to hand over. | Only the document they chose to hand over. |
| **Reach** | Companies using that platform; the platform a company uses can change over the years. | Global in principle: any company, platform or transfer agent, in any country, that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Fast for invited users; outsiders wait for the company to respond. | A few seconds per check: one web lookup, with no fee to the standard and no account. | Free and immediate. |
| **What it needs** | An account, and the company's agreement to invite the checker. | The issuer to publish hashes, and Live Verify-aware software on the checker's device. No platform or transfer agent does this yet. | Nothing. |
| **Best suited to** | Managing ownership and transfers. | An outsider checking a holding before buying, lending or settling an estate. | Nothing where money changes hands. |

**Where each fits:** cap-table platforms such as Carta and Pulley are the working record of who owns what, and a company and its existing investors should keep managing holdings there. A prospective buyer, a bank or an estate executor usually has no invitation to the platform, and the platform a company uses can change over the years. Live Verify lets that outside party confirm the transfer agent or issuer stands behind the certificate they were shown, without needing an account.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
