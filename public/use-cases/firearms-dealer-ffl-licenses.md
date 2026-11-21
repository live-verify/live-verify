---
title: "Firearms Dealer (FFL) Licenses"
category: "Professional & Occupational Licenses"
volume: "Small"
retention: "3 years (license term)"
slug: "firearms-dealer-ffl-licenses"
verificationMode: "clip"
tags: ["ffl", "atf", "gun-shop-license", "firearms-dealer", "second-amendment", "public-safety", "compliance", "federal-firearms-license"]
furtherDerivations: 1
---

## What is an FFL License?

In the USA, you cannot sell firearms as a business without a Federal Firearms License (FFL) from the ATF.

This license is the "Security Key" for the entire industry. If a dealer in Texas wants to ship a rifle to a buyer in New York, the law requires them to ship it to another FFL dealer. Before shipping, the Texas dealer must verify the New York dealer's license is real.

Scammers often create fake FFL PDF papers to trick online sellers into shipping guns directly to their homes (illegal "Ghost Dealing"). Verified hashes allow any seller to scan the license and see the "ACTIVE" status on the `atf.gov` domain in seconds.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 3px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #000; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 1.5em; margin-right: 15px;">⚖️</div>
    <div>
      <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="ffl"></span>FEDERAL FIREARMS LICENSE</h2>
      <div style="font-size: 0.8em; opacity: 0.8;">U.S. DEPT OF JUSTICE • BUREAU OF ALCOHOL, TOBACCO, FIREARMS AND EXPLOSIVES</div>
    </div>
  </div>
<div style="padding: 25px;">
    <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">LICENSE NUMBER: 9-99-887-01-2C-99228</h3>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Licensee Name:</strong> MILLER ARMS & SPORTING GOODS, LLC<br>
      <strong>Premises Address:</strong> 123 Main St, Springfield, IL 62701</p>
<div style="background: #f5f5f5; border: 1px solid #ddd; padding: 10px; margin: 15px 0;">
        <p><strong>Type of License:</strong> 01 - DEALER IN FIREARMS OTHER THAN DESTRUCTIVE DEVICES</p>
        <p><strong>Expiration Date:</strong> March 15, 2027</p>
      </div>
<p style="font-size: 0.8em; color: #555;">The licensee is authorized to transport, ship, and receive firearms in interstate or foreign commerce during the period specified above.</p>
    </div>
<div style="margin-top: 30px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Special Agent in Charge</div>
      </div>
      <div style="text-align: right;">
        <div style="width: 80px; height: 80px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6em; font-weight: bold; text-align: center;">OFFICIAL<br>ATF<br>SEAL</div>
      </div>
    </div>
<div data-verify-line="ffl" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: ATF doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="ffl">verify:atf.gov/fflezcheck/v</span> <span verifiable-text="end" data-for="ffl"></span>
    </div>
  </div>
</div>

## The Problem: Phantom Dealer Fraud

- **Ghost Licenses:** Felons creating fake FFL documents to trick online sellers into shipping guns directly to their homes.
- **Expired Display:** A dealer whose license was revoked for "Straw Purchasing" continuing to use their unexpired paper license to trade illegally.
- **Address Swapping:** Taking a valid FFL for a secure shop and using it to run an illegal warehouse at a different, un-vetted location.

## What Is Checked

Licensee name, trade name (DBA), premises address, mailing address, FFL number (full 15-digit), license type (01-11), expiration date, responsible person ID, issuing ATF region.

**Document Types:**
- **Federal Firearms License (FFL):** The primary paper license for the shop wall.
- **FFL Extract:** For shipping to other dealers.
- **SOT Certificate:** Special Occupational Taxpayer (for silencers/machine guns).
- **ATF Inspection Report:** (Linked hash) proving a successful compliance audit.

## What the Checker Sees

Shows the issuer domain (`atf.gov`) and current regulatory standing.

**Status Indications:**
- **Active** — License is valid; dealer is authorized to trade.
- **Suspended** — Temporary restriction (e.g., due to record-keeping errors).
- **Revoked** — Permanently barred from firearms trade (High-risk).
- **Expired** — Renewal application not received.

## Who Holds It

The FFL Holder (Gun Shop Owner) benefits from verification.

**Interstate Shipping:** Proving to a different dealer in another state that their FFL is "Verified Active." This is a mandatory requirement before shipping any firearm across state lines. A verified hash replaces the "Manual FFL EzCheck" website lookup, reducing friction in the $30B firearms market.

**Lender / Banking:** Proving to a high-risk payment processor or bank that the business is a verified, federally licensed entity, preventing account freezes.

## Who Checks It

**Law Enforcement (ATF / State Police)**
**Audit Efficiency:** During a surprise ATF inspection, the agent can scan the wall license. "Verified by ATF.gov" ensures the shop isn't using a "Homemade License" to hide an illegal operation.

**Private Gun Sellers (Private Citizens)**
**Person-to-Person Transfers:** Before shipping a rifle to a dealer for a buyer, a citizen can verify the dealer's FFL hash. This ensures they aren't mailing a weapon to a "Fake Dealer" or a felon with a color printer.

**Shipping Carriers (FedEx / UPS)**
**Authorization:** Verifying the FFL status of a shipper before accepting hazardous/regulated firearms cargo for transport.

## Who Issues It

**Issuer Types** (First Party)

**Bureau of Alcohol, Tobacco, Firearms and Explosives (ATF):** The sole federal issuer.
**State Departments of Public Safety:** (In states with secondary licensing).

**Privacy Salt:** Highly critical. FFL data is protected by various federal laws (e.g., Tiahrt Amendment). The hash must be salted to prevent "Mass Mapping" of all gun shops in a state by bad actors.

## Authority Chain

**Pattern:** Sovereign

Issues federal firearms dealer licenses for lawful commerce.

```
✓ atf.gov/ffl/verify — Issues federal firearms dealer licenses for lawful commerce
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and ATF's FFL eZ Check

FFL eZ Check is the ATF's official online lookup for confirming a federal firearms licence by its number. It and Live Verify answer different questions and work side by side: one confirms that a licence number is valid in ATF's records, the other confirms that the copy of the licence in hand is the one ATF issued.

| | FFL eZ Check | Live Verify on the licence | Unverified paper or PDF licence |
| :--- | :--- | :--- | :--- |
| **Who can check** | Anyone with the licence number and a browser. | Anyone handed the licence: a shipping dealer, a distributor, a private seller. | Nobody; it can only be taken on trust. |
| **What the checker gets** | Whether the licence number is valid, with the licensee's details from ATF's records. | Confirmation that ATF stands behind this exact licence text, as at its date, and whether it has since been revoked. | A document that may have been edited. |
| **What the holder shares** | The licence number. | Only the licence copy they chose to hand over. | Only the copy they chose to hand over. |
| **Reach** | US federal licences. | US federal licences; the standard itself works for any licensing body in any country that publishes hashes on its own domain. | Anywhere, but untrusted. |
| **Speed and cost** | Free; a minute or two of typing the number into a web form, which is awkward on a phone. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | The full licence number and a browser. | ATF to publish hashes, and Live Verify-aware software on the checker's phone. ATF does not do this yet. | Nothing. |
| **Best suited to** | The official pre-shipment check the regulations point dealers to. | A quick check of the document at a show table or shipping counter, alongside the official query. | Nothing where a firearm is being shipped. |

**Where each fits:** ATF's FFL eZ Check is the official lookup and the one the regulations point dealers towards; a dealer shipping a firearm should continue to use it. It confirms a licence number rather than the copy of the licence in hand, and typing the number into a web form is awkward at a show table or shipping counter. Live Verify offers a quick check of the document itself in those settings, as an additional step and not a replacement for the official query.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
