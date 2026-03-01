---
title: "Firearms Dealer (FFL) Licenses"
category: "Professional & Occupational Licenses"
volume: "Small"
retention: "3 years (license term)"
slug: "firearms-dealer-ffl-licenses"
tags: ["ffl", "atf", "gun-shop-license", "firearms-dealer", "second-amendment", "public-safety", "compliance", "federal-firearms-license"]
furtherDerivations: 1
---

## What is an FFL License?

In the USA, you cannot sell firearms as a business without a **Federal Firearms License (FFL)** from the ATF.

This license is the "Security Key" for the entire industry. If a dealer in Texas wants to ship a rifle to a buyer in New York, the law **requires** them to ship it to another FFL dealer. Before shipping, the Texas dealer must verify the New York dealer's license is real.

Scammers often create fake FFL PDF papers to trick online sellers into shipping guns directly to their homes (illegal "Ghost Dealing"). Verified hashes allow any seller to scan the license and see the "ACTIVE" status on the `atf.gov` domain in seconds.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 3px solid #000; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
  <div style="background: #000; color: #fff; padding: 15px; text-align: center; display: flex; align-items: center; justify-content: center;">
    <div style="font-size: 1.5em; margin-right: 15px;">⚖️</div>
    <div>
      <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="ffl">[</span>FEDERAL FIREARMS LICENSE</h2>
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
      verify:atf.gov/fflezcheck/v <span verifiable-text="end" data-for="ffl">]</span>
    </div>
  </div>
</div>

## Data Verified

Licensee name, trade name (DBA), premises address, mailing address, FFL number (full 15-digit), license type (01-11), expiration date, responsible person ID, issuing ATF region.

**Document Types:**
- **Federal Firearms License (FFL):** The primary paper license for the shop wall.
- **FFL Extract:** For shipping to other dealers.
- **SOT Certificate:** Special Occupational Taxpayer (for silencers/machine guns).
- **ATF Inspection Report:** (Linked hash) proving a successful compliance audit.

## Data Visible After Verification

Shows the issuer domain (`atf.gov`) and current regulatory standing.

**Status Indications:**
- **Active** — License is valid; dealer is authorized to trade.
- **Suspended** — Temporary restriction (e.g., due to record-keeping errors).
- **Revoked** — Permanently barred from firearms trade (High-risk).
- **Expired** — Renewal application not received.

## Second-Party Use

The **FFL Holder (Gun Shop Owner)** benefits from verification.

**Interstate Shipping:** Proving to a different dealer in another state that their FFL is "Verified Active." This is a mandatory requirement before shipping any firearm across state lines. A verified hash replaces the "Manual FFL EzCheck" website lookup, reducing friction in the $30B firearms market.

**Lender / Banking:** Proving to a high-risk payment processor or bank that the business is a verified, federally licensed entity, preventing account freezes.

## Third-Party Use

**Law Enforcement (ATF / State Police)**
**Audit Efficiency:** During a surprise ATF inspection, the agent can scan the wall license. "Verified by ATF.gov" ensures the shop isn't using a "Homemade License" to hide an illegal operation.

**Private Gun Sellers (Private Citizens)**
**Person-to-Person Transfers:** Before shipping a rifle to a dealer for a buyer, a citizen can verify the dealer's FFL hash. This ensures they aren't mailing a weapon to a "Fake Dealer" or a felon with a color printer.

**Shipping Carriers (FedEx / UPS)**
**Authorization:** Verifying the FFL status of a shipper before accepting hazardous/regulated firearms cargo for transport.

## Verification Architecture

**The "Phantom Dealer" Fraud Problem**

- **Ghost Licenses:** Felons creating fake FFL documents to trick online sellers into shipping guns directly to their homes.
- **Expired Display:** A dealer whose license was revoked for "Straw Purchasing" continuing to use their unexpired paper license to trade illegally.
- **Address Swapping:** Taking a valid FFL for a secure shop and using it to run an illegal warehouse at a different, un-vetted location.

**Issuer Types** (First Party)

**Bureau of Alcohol, Tobacco, Firearms and Explosives (ATF):** The sole federal issuer.
**State Departments of Public Safety:** (In states with secondary licensing).

**Privacy Salt:** Highly critical. FFL data is protected by various federal laws (e.g., Tiahrt Amendment). The hash must be salted to prevent "Mass Mapping" of all gun shops in a state by bad actors.

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


## Competition vs. ATF FFL EzCheck

| Feature | Live Verify | FFL EzCheck (Web) | Paper License |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to `atf.gov`. | **Database.** Direct from source. | **Zero.** Easily forged. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires typing 15 digits into a web form. | **Instant.** |
| **Integrity** | **Binds Photo/Signer.** Protects every word. | **Data-Only.** Doesn't verify the paper. | **Vulnerable.** |
| **Mobile Use** | **High.** Built for phones. | **Low.** Web form is hard to use on mobile. | **High.** |

**Why Live Verify wins here:** The "Shipping Counter" reality. Gun owners and dealers are often at shipping docks or gun shows where they need to verify credentials *now*. Live Verify turns the **Physical License** into a live, high-speed digital credential, bringing federal-level security to the point of transfer.
