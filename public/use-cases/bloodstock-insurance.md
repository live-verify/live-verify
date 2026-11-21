---
title: "Bloodstock Insurance (Racehorses)"
category: "Specialty Insurance"
volume: "Very Small"
retention: "Horse lifetime (15-25 years)"
slug: "bloodstock-insurance"
verificationMode: "clip"
tags: ["horse-racing", "bloodstock", "insurance", "lloyds", "mortality", "breeding", "livestock"]
furtherDerivations: 1
---

## What is Bloodstock Insurance?

A champion racehorse or a top-tier breeding stallion can be worth $10 million or more. Because these animals are fragile, owners buy "Bloodstock" (equine mortality) insurance.

The Certificate of Insurance is the financial proof of the horse's value. It is used at auctions (to prove the horse is worth the starting bid) and by banks (who lend money using the horse as collateral).

If an owner "Photoshops" a $100k policy to look like a $10M policy, they can commit massive bank fraud or trick buyers into overpaying for a horse.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #002366; background: #fff; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <div style="background: #002366; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="horse"></span>LLOYD'S OF LONDON</div>
      <div style="font-size: 0.8em;">Specialist Bloodstock Syndicate 1967</div>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 0.8em;">Policy #: B-9988-BS-26</div>
    </div>
  </div>
<div style="padding: 35px;">
    <h2 style="text-align: center; color: #002366; font-size: 1.4em; margin-bottom: 25px; text-transform: uppercase; letter-spacing: 1px;">Certificate of Bloodstock Insurance</h2>
<div style="font-size: 1em; line-height: 1.6; color: #333;">
      <p>This is to certify that insurance has been effected on the following animal:</p>
<div style="background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0;">
        <strong>Animal Name:</strong> "MIDNIGHT RUNNER" (2022 Colt)<br>
        <strong>Sire/Dam:</strong> Galileo / Urban Sea<br>
        <strong>Registration:</strong> Weatherbys ID #992288
      </div>
<p><strong>Insured Value:</strong> $ 12,500,000.00 (Twelve Million Five Hundred Thousand USD)</p>
<p><strong>Coverage:</strong> All Risks of Mortality, including Infertility & Theft.<br>
      <strong>Territory:</strong> Worldwide, including transit.</p>
<p><strong>Effective:</strong> 01 JAN 2026 to 01 JAN 2027</p>
    </div>
<div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 0.8em; color: #666; font-style: italic;">
      Subject to veterinary certificate of health dated within 30 days of inception.
    </div>
<div data-verify-line="horse" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: Lloyd's Syndicate doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="horse">verify:lloyds-bloodstock.com/v</span> <span verifiable-text="end" data-for="horse"></span>
    </div>
  </div>
</div>

## The Problem: Phantom Stallion Fraud

- **Value Padding:** Editing a $100,000 policy to look like a $1,000,000 policy to inflate the horse's value before a private sale.
- **Hidden Injuries:** Keeping an active mortality certificate while hiding a career-ending injury that has already "Suspended" the actual coverage.
- **Ownership Scams:** Forging a certificate to claim ownership of a famous horse to solicit "investments" in a fake syndicate.

## What Is Checked

Horse name, pedigree (Sire/Dam), registration number (Weatherbys/Jockey Club), insured value, coverage type (Mortality, AS&I - Accident, Sickness & Infertility), effective dates, syndicate identification.

**Document Types:**
- **Mortality Certificate:** The primary proof of value and coverage.
- **Veterinary Certificate of Health:** Required for policy inception (linked hash).
- **Stallion Infertility Certificate:** For breeding stock valuation.
- **Syndicate Share Certificate:** Proof of partial ownership.

## What the Checker Sees

Shows the issuer domain (`lloyds-bloodstock.com`, `starr.com`) and policy standing.

**Status Indications:**
- **In Force** — Premium paid; horse is covered.
- **Suspended** — Pending veterinary re-exam (e.g., after injury).
- **Claim Paid** — Horse has died; policy settled.
- **Void** — Misrepresentation of value found.

## Who Holds It

The Horse Owner or Syndicate Manager benefits from verification.

**Auction Sales:** Proving to potential buyers at Tattersalls or Keeneland that the yearling being sold for $2M is already fully insured for that amount by a top-tier syndicate.

**Breeding Contracts:** Proving to the owner of a champion mare that the stallion has "AS&I" (Infertility) insurance, ensuring that stud fees are protected if the stallion becomes unable to breed.

**International Transit:** Proving coverage to specialized equine air-freight companies (e.g., IRT) during high-stakes transcontinental shipping.

## Who Checks It

**Auction Houses**
**Seller Vetting:** Verifying the insurance value of horses being consigned. If a seller claims a horse is worth $10M, but the verified insurance is only for $1M, it triggers a red flag for valuation fraud.

**Banks (Lenders)**
**Equine Financing:** Thoroughbreds are often used as collateral for multimillion-dollar loans. Banks verify the "Mortality" insurance to ensure the loan is protected if the horse dies.

**Racecourse Authorities**
**Entry Compliance:** Ensuring all competing horses meet the minimum liability/medical insurance requirements.

## Who Issues It

**Issuer Types** (First Party)

**Lloyd's Syndicates:** (Specializing in Bloodstock).
**Managing General Agents (MGAs):** (e.g., Markel, Great American).
**Equine Registries:** (Weatherbys, The Jockey Club).

## Authority Chain

**Pattern:** Regulated

Lycetts underwrites insurance for thoroughbred and bloodstock animals globally.

```
✓ bloodstock.lycetts.co.uk/verify — Underwrites insurance for thoroughbred and bloodstock animals
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and Breed Registries

Thoroughbreds are recorded in national stud books, kept by bodies such as the Jockey Club, which hold each horse's identity and parentage. Each country has its own stud book. A registry and Live Verify answer different questions about the same horse: the registry says who the horse is, and Live Verify confirms what the insurer has agreed to cover.

| | Breed registry or stud book | Live Verify on the mortality insurance certificate | Paper certificate |
| :--- | :--- | :--- | :--- |
| **Who can check** | Registry users, sometimes by login or subscription. | Anyone handed the certificate: a lender, a buyer, a syndicate member, a stud. | Nobody; it can only be taken on trust. |
| **What the checker gets** | The horse's identity and parentage; nothing about insurance. | Confirmation that the underwriter issued this exact certificate, with its insured sum and dates, and whether the cover has since been cancelled. | A certificate that may have been edited. |
| **What the owner shares** | Nothing; the registry holds the record. | Only the certificate they chose to hand over. | The certificate. |
| **Reach** | One country's stud book. | Global in principle: any underwriter that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Quick for users; may need a subscription. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | Registry access. | The underwriter to publish hashes, and Live Verify-aware software on the checker's device. No underwriter does this yet. | Nothing. |
| **Best suited to** | Identity and breeding. | Lending against, or buying, an insured horse. | Nothing where the sum matters. |

**Where each fits:** the breed registry is the authority on a horse's identity and parentage, and buyers and lenders should keep using it for that. It holds nothing about insurance. Live Verify covers the mortality certificate, letting a lender or buyer at the stable, with software that honours it, confirm the underwriter stands behind the cover and the insured sum stated, so the two answer different questions about the same horse.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
