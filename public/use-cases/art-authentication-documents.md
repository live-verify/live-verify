---
title: "Art Appraisals and Valuations"
category: "Art, Media & Publishing"
volume: "Small"
retention: "5-10 years (insurance/tax)"
slug: "art-authentication-documents"
tags: ["appraisal", "art", "art-market", "artist", "auction", "authenticity", "coa", "collectibles", "connoisseurship", "edition", "gallery", "history", "insurance", "ownership", "print", "provenance", "sculpture", "signature", "stamp", "tax", "title", "uspap", "valuation"]
furtherDerivations: 5
---

## What is an Art Appraisal?

An **Art Appraisal** is a formal document where an expert (at Sotheby's, Christie's, or a private firm) determines how much a painting is worth.

This value is used for:
1.  **Insurance:** So you know how much to pay in premiums.
2.  **Taxes:** If you donate the art or leave it in a will.
3.  **Loans:** If you want to borrow money using the art as collateral.

High-end art is a target for money laundering. Verified appraisals ensure that a $1,000 painting isn't being "appraised" at $1,000,000 to trick a bank into giving a massive loan.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #ccc; background: #fffef5; padding: 40px; box-shadow: 2px 2px 15px rgba(0,0,0,0.05);">
  <div style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.4em; letter-spacing: 1px;"><span verifiable-text="start" data-for="appraisal">[</span>SOTHEBY'S ADVISORY</div>
    <div style="font-size: 0.8em; color: #666; margin-top: 5px;">APPRAISAL & VALUATION SERVICES</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <p><strong>Date:</strong> March 15, 2026<br>
    <strong>Client:</strong> The Sterling Cooper Foundation</p>
<h3 style="text-align: center; margin: 20px 0;">SUMMARY VALUATION REPORT</h3>
<div style="background: #fdfdfd; border: 1px solid #eee; padding: 15px; margin-bottom: 20px;">
      <p><strong>Artist:</strong> Mark Rothko (1903-1970)<br>
      <strong>Title:</strong> <em>No. 6 (Violet, Green and Red)</em><br>
      <strong>Medium:</strong> Oil on canvas<br>
      <strong>Dimensions:</strong> 94 in x 56 in</p>
<p style="border-top: 1px solid #ddd; padding-top: 10px; font-size: 1.1em;">
        <strong>Fair Market Value:</strong> $ 186,000,000.00
      </p>
    </div>
<p><strong>Purpose of Appraisal:</strong> Insurance Placement / Estate Tax</p>
    <p><strong>Standards:</strong> This appraisal conforms to the Uniform Standards of Professional Appraisal Practice (USPAP).</p>
  </div>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
    <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Arthur Jensen, AAA</div>
    <div style="font-size: 0.8em; color: #777;">Report #: VAL- Rothko-2026-01</div>
  </div>
<div data-verify-line="appraisal" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Sotheby's doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:sothebys.com/valuation/v <span verifiable-text="end" data-for="appraisal">]</span>
  </div>
</div>

## Data Verified

Appraiser name/credentials (AAA/ISA), client name, artwork details (Artist, Title, Medium), effective date of valuation, Purpose (Insurance/Tax/Collateral), Fair Market Value (FMV) or Replacement Value, Report ID.

**Document Types:**
- **Full Appraisal Report:** 50+ page document (requires per-page verification).
- **Valuation Summary:** 1-page extract for insurance brokers.
- **Fairness Opinion:** For corporate art acquisitions.

## Verification Response

The endpoint returns a simple status code:

- **OK** — Report is current and matches the issuer's file
- **SUPERSEDED** — A more recent valuation exists; request updated report
- **RETRACTED** — Report was withdrawn (e.g., due to discovery of forgery)
- **404** — Report not found (never issued, or OCR error)

The issuer domain is visible from the `verify:` line on the document itself (e.g., `sothebys.com`).

## Post-Verification Actions

None typically. The verification confirms the appraisal is genuine and current; that's the value.

**Why No Further Action:**

Art collectors are intensely private. They don't want inquiries about pieces that aren't for sale, and their agents (galleries, family offices) have no incentive to respond to verification-related contact. The verification system respects this by:

- **No owner contact information** in the response
- **No "inquiry" forms** that would generate unwanted solicitation
- **Issuer is the trust anchor** — Sotheby's or Christie's stands behind the document; the owner doesn't need to be involved

If someone needs to contact the owner (for acquisition, loan, or exhibition), that happens through existing art market channels — not through a verification endpoint.

## Second-Party Use

The **Art Collector** benefits from verification.

**Insurance Placement:** Proving to an insurance broker that the $186M valuation isn't a "fake PDF" to over-insure a worthless piece (insurance fraud).

**Collateralized Lending:** Proving to a bank (e.g., J.P. Morgan Private Bank) that the artwork being used as collateral for a loan was legitimately valued by a top-tier appraiser.

## Third-Party Use

**Insurance Underwriters**
**Risk Assessment:** Underwriters see thousands of PDFs. Verification ensures the value they are insuring matches the appraiser's official record, preventing "over-valuation fraud" where collectors try to profit from a staged theft.

**The IRS (Art Advisory Panel)**
**Audit Defense:** When a collector donates art for a tax deduction, the IRS scrutinizes the appraisal. A verified, tamper-evident report from a domain like `sothebys.com` reduces audit friction.

**Auction Houses**
**Consignment:** Verifying prior appraisals when a piece comes up for sale to establish a baseline for reserves.

## Verification Architecture

**The "Value Padding" Fraud Problem**

- **Photoshop:** Editing a $18,600 valuation to read $186,000,000 to trick a bank into giving a massive loan.
- **Fictitious Appraisers:** Creating a fake appraisal from a non-existent firm with a real-looking website.
- **Old Appraisals:** Presenting a 2010 valuation as a 2026 valuation to hide a market crash for that specific artist.

**Issuer Types** (First Party)

**Auction Houses:** (Sotheby's, Christie's, Phillips).
**Independent Firms:** (Appraisers Association of America members).
**Art Research Firms:** (Artnet, Artprice).

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


## Competition vs. Appraisal Databases

| Feature | Live Verify | Private Portal (Sotheby's) | Blockchain Art Registry |
| :--- | :--- | :--- | :--- |
| **Privacy** | **High.** Only the specific report is shared. | **Low.** Accessing a portal might reveal the collector's entire portfolio. | **Low.** Public ledgers can reveal transaction history. |
| **User Experience** | **Instant.** Scan the PDF/Paper in the data room. | **Hard.** Requires logins, passwords, and permissions. | **Medium.** Requires crypto-wallets/explorers. |
| **Authority** | **Domain-Bound.** Trust the brand you know. | **Portal-Bound.** | **Ambiguous.** Who controls the registry? |

**Why Live Verify wins here:** The high-end art market is obsessed with **discretion**. Collectors do not want their entire portfolio in a searchable database. Live Verify allows them to share a **single, verified document** with a single lender or insurer without exposing their identity or other assets to a platform.


---

_[Content merged from: art-certificates-of-authenticity]_


## What is a Certificate of Authenticity (COA)?

In the art world, the painting itself is only half the value. The other half is the **COA**—the paper proving it was actually made by the artist.

A **COA** is issued by the artist's estate or a top-tier gallery. Without a verified COA, a multimillion-dollar Basquiat or Warhol is nearly impossible to sell.

Forgeries are common. Fraudsters often forge the "paperwork" (the COA) using fake letterheads and signatures to "prove" that a fake painting is real.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 3px double #000; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 2px;"><span verifiable-text="start" data-for="art">[</span>CERTIFICATE OF AUTHENTICITY</h2>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <p>This document certifies that the following work of art is an original work by the artist named herein.</p>
<div style="margin: 20px 0; border-left: 4px solid #000; padding-left: 20px;">
      <p><strong>Artist:</strong> Jean-Michel Basquiat<br>
      <strong>Title:</strong> <em>Untitled (Skull)</em><br>
      <strong>Year:</strong> 1981<br>
      <strong>Medium:</strong> Acrylic and mixed media on canvas<br>
      <strong>Dimensions:</strong> 207 cm &times; 176 cm</p>
    </div>
<p>This work is registered in the archives of the <strong>Basquiat Authentication Committee</strong> and is included in the Catalogue Raisonné (Vol III, Page 12).</p>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Gerard Basquiat</div>
        <div style="font-size: 0.8em; color: #777;">For the Authentication Committee</div>
      </div>
      <div style="text-align: right;">
        <strong>Certificate ID:</strong> JMB-1981-0992
      </div>
    </div>
  </div>
<div data-verify-line="art" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Authentication committee doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:basquiat-estate.org/v <span verifiable-text="end" data-for="art">]</span>
  </div>
</div>

## Data Verified

Artist name, artwork title, creation year, medium, dimensions, edition number (if applicable), unique certificate ID, archive/registration number, name of the authenticating authority.

**Document Types:**
- **Artist COA:** Signed by the living artist.
- **Estate COA:** Issued by the artist's foundation after death.
- **Gallery COA:** Issued by the primary representing gallery.
- **Catalogue Raisonné Extract:** Official scholarly entry.

## Verification Response (COA)

The endpoint returns a simple status code:

- **OK** — The work is recognized as authentic by the authority
- **DISPUTED** — The work is currently under scholarly review or litigation
- **DE_AUTHENTICATED** — The certificate is a known forgery or the work has been rejected
- **STOLEN** — The work is registered on the Art Loss Register; do not transact
- **404** — Certificate not found (never issued, or OCR error)

The issuer domain is visible from the `verify:` line on the certificate itself (e.g., `basquiat-estate.org`).

## Second-Party Use

The **Art Owner** benefits from verification.

**Market Value Retention:** A Basquiat with a "Verified by Estate" digital status is worth millions more than one with a "doubtful" paper certificate. Verification protects the asset's value.

**Cross-Border Shipping:** Proving to Customs that the work is a genuine cultural artifact (and not a "fake" used for money laundering or smuggling).

## Third-Party Use

**Prospective Buyers**
**Due Diligence:** High-end art transactions happen in hours. Scanning the COA hash instantly proves provenance, allowing the buyer to wire funds with confidence before the "sale of the century" goes to someone else.

**Auction Houses (Consignment)**
**Intake Integrity:** Specialists can instantly filter out high-quality forgeries by scanning COAs during the intake process, protecting the auction house's reputation.

**Lenders (Art-Backed Loans)**
**Collateral Verification:** Private banks verify the COA before issuing multimillion-dollar lines of credit backed by the art.

## Verification Architecture

**The Art Forgery Problem**

- **Certificate Forgery:** It is often easier to forge a piece of paper (the COA) than to forge a Basquiat canvas. Fraudsters create fake estate letters to "legitimize" fake paintings.
- **Provenance Laundering:** Creating a fake chain of ownership (COAs from defunct galleries) to hide that a painting was created in a basement last week.
- **Double-Issue:** Selling the same painting multiple times to different buyers using duplicate forged certificates.

**Issuer Types** (First Party)

**Artist Estates:** (e.g., Warhol Foundation, Basquiat Estate).
**Major Galleries:** (Gagosian, Pace, Hauser & Wirth).
**Scholarly Committees:** Dedicated authentication boards.

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. NFTs / Blockchain

| Feature | Live Verify | NFT (Digital Twin) | Physical Seal (Microchip) |
| :--- | :--- | :--- | :--- |
| **Physical Link** | **Textual.** Binds the *claim* to the art. | **None.** The token is on-chain; the art is off-chain. Easy to "de-couple." | **Mechanical.** A chip is glued/embedded in the frame. |
| **Market Standard** | **High.** Matches the traditional "Paper COA" culture of high-end art. | **Low.** High-end collectors are skeptical of crypto-volatility and tech-debt. | **Medium.** Seen as invasive by some conservators. |
| **Durability** | **Durable.** Text is archival. | **Fragile.** Requires the blockchain/IPFS to exist in 100 years. | **Fragile.** Chips can break or be removed. |

**Why Live Verify wins here:** The high-end art world is traditional. It relies on scholarly provenance and paper records. Live Verify respects this tradition while adding a modern "Digital Seal." It doesn't require collectors to understand crypto-wallets; it just requires them to trust the **Domain Name** of the estate, which is the most stable form of digital identity.


---

_[Content merged from: art-edition-numbers]_


## What is an Edition Number?

When an artist makes a print or a sculpture, they often make a limited number (e.g., 50 copies). Each one is numbered, like **14 / 50**.

This creates "Scarcity." Number 14 is valuable because there are only 49 others like it. If the artist (or the printer) secretly makes 500 copies instead of 50, the value of everyone's art collapses.

Live Verify allows a collector to verify that their "14 / 50" is an officially recognized number in the publisher's ledger and not a "backdoor" extra copy.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 2px solid #444; background: #fff; padding: 40px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em; letter-spacing: 2px;"><span verifiable-text="start" data-for="edition">[</span>PACE EDITIONS</div>
    <div style="font-size: 0.8em; color: #666; margin-top: 5px;">NEW YORK • LONDON • HONG KONG</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <h3 style="text-align: center; text-transform: uppercase; margin-bottom: 20px;">Edition Certification</h3>
<p>This certifies that the work described below is part of an authorized limited edition.</p>
<div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border: 1px solid #eee;">
      <p><strong>Artist:</strong> Chuck Close<br>
      <strong>Title:</strong> <em>Self-Portrait (Scribble)</em><br>
      <strong>Medium:</strong> Soft ground etching<br>
      <strong>Year:</strong> 2025</p>
<p style="border-top: 1px solid #ddd; padding-top: 10px; font-size: 1.1em; font-weight: bold;">
        Edition Number: 14 / 50
      </p>
    </div>
<p>Signed and numbered by the artist in pencil, lower right. Published by Pace Editions, Inc.</p>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div style="border-top: 1px solid #000; width: 180px; padding-top: 5px; font-style: italic;">Pace Editions Archive</div>
        <div style="font-size: 0.8em; color: #777;">Authorized Representative</div>
      </div>
      <div style="text-align: right; font-size: 0.8em; color: #777;">
        Registry #: PE-2025-042
      </div>
    </div>
  </div>
<div data-verify-line="edition" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Publisher doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:pacegallery.com/editions/v <span verifiable-text="end" data-for="edition">]</span>
  </div>
</div>

## Data Verified

Artist name, title of work, year, medium, total edition size (e.g., 50), specific print number (e.g., 14), number of Artist Proofs (APs), publisher name, registry number.

**Document Types:**
- **Edition Certificate:** Issued with the physical print or sculpture.
- **Inventory Receipt:** For gallery internal tracking.
- **Sculpture Casting Certificate:** Proving the foundry used an authorized mold.

## Verification Response (Editions)

The endpoint returns a simple status code:

- **OK** — Number matches the publisher's official record
- **SOLD_OUT** — Edition complete; no more numbers will be issued
- **DESTROYED** — The specific numbered piece was reported destroyed (important for insurance)
- **DUPLICATE_ALERT** — Another party has already verified this specific number; possible fraud
- **404** — Edition number not found (never issued, exceeds edition size, or OCR error)

The issuer domain is visible from the `verify:` line on the certificate itself (e.g., `pacegallery.com`).

## Second-Party Use

The **Collector** benefits from verification.

**Value Protection:** Proving that the print is 14/50 and not an "unauthorized extra" run by the printer (backdoor editions). A verified limited edition holds its value; a "leaked" print does not.

**Insurance Claims:** If print 14/50 is lost in a fire, the verified certificate proves its scarcity and value to the insurance adjuster.

## Third-Party Use

**Auction Houses**
**Cataloging:** Specialists verify that the print number being consigned matches the known characteristics of that edition (e.g., paper type, dimensions) listed in the publisher's hash.

**Customs (Import/Export)**
**Duty Classification:** Original prints (limited editions < 50 or < 100) often have lower import duties than generic posters. Verification proves the "original art" status to border agents.

**Online Marketplaces (eBay/Artsper)**
**Trust Badge:** Sellers can include the "Verified by Pace" link in their listing to prevent buyers from worrying about "fake numbers."

## Verification Architecture

**The "Extra Run" Fraud Problem**

- **Ghost Editions:** A publisher authorized for 50 prints actually runs 100, selling the extra 50 "under the table" with duplicated numbers or "Artist Proof" designations.
- **Number Tampering:** Changing a high number (48/50) to a more desirable low number (1/50) using a pencil and eraser.
- **Color Photocopies:** Selling high-quality scans of an original print as if they were part of the numbered edition.

**Issuer Types** (First Party)

**Galleries/Publishers:** (Pace Editions, Gemini G.E.L., Crown Point Press).
**Foundries:** (For bronze sculptures).
**Artist Estates:** (Managing posthumous editions).

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Physical Holograms

| Feature | Live Verify | Hologram Sticker | Blind Stamp (Embossing) |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Binds Content.** Hash protects the *Number* and *Artist Name*. | **Binds Paper.** Proves the paper is real, but not what is written on it. | **Physical.** Hard to forge, but can be faked with a custom die. |
| **Registry Link** | **Direct.** Links instantly to the publisher's database. | **Manual.** Requires looking up a serial number on a website. | **None.** Just a mark on the paper. |
| **Durability** | **Archival.** Ink/pencil text lasts centuries. | **Fragile.** Stickers peel off or degrade over time. | **Durable.** But can be flattened. |

**Why Live Verify wins here:** Limited editions are all about **Math**. Is the denominator (total size) real? Is the numerator (my number) unique? Live Verify connects the physical number written in pencil to the publisher's official spreadsheet, ensuring the math stays honest.


---

_[Content merged from: artist-signatures-stamps]_


## What is a Signature Authentication?

Sometimes a painting isn't signed on the front, or the signature is illegible. Experts (Graphologists) are hired to study the ink and the "hand" of the artist to verify if the signature is real.

They produce a **Signature Authentication Letter** that details things like ink flow, pressure, and characteristic letter formations (e.g., "The way Picasso crossed his 't' in 1937").

These letters are high-value targets for forgery—criminals create fake "expert reports" to sell fake art.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Georgia', serif; border: 1px solid #000; background: #fff; padding: 40px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="sig">[</span>Signature Authentication Letter</h3>
    <div style="font-size: 0.8em; color: #666; margin-top: 5px;">THE INTERNATIONAL FOUNDATION FOR ART RESEARCH (IFAR)</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <p><strong>Ref:</strong> SIG-2026-042-PC</p>
    <p>To Whom It May Concern,</p>
<p>We have examined the signature and estate stamp appearing on the reverse of the work titled <em>Guernica Sketch IV</em>, attributed to <strong>PABLO PICASSO</strong>.</p>
<div style="margin: 20px 0; border: 1px solid #eee; padding: 15px; background: #f9f9f9; text-align: center;">
      <div style="font-style: italic; font-size: 1.2em; border-bottom: 1px solid #ccc; display: inline-block; padding: 0 20px;">Picasso</div>
      <div style="font-size: 0.8em; color: #777; margin-top: 5px;">Analysis of hand-written signature (Black Ink)</div>
    </div>
<p>Our analysis included comparison with known exemplars from 1937. The ink flow, pressure, and characteristic "P" formation are consistent with the artist's hand during this period.</p>
<div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <div style="border-top: 1px solid #000; width: 200px; padding-top: 5px; font-style: italic;">Authentication Committee</div>
        <div style="font-size: 0.8em; color: #777;">March 15, 2026</div>
      </div>
      <div style="width: 60px; height: 60px; border: 2px solid #333; display: flex; align-items: center; justify-content: center; font-size: 0.7em; font-weight: bold;">SEAL</div>
    </div>
  </div>
<div data-verify-line="sig" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: IFAR doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:ifar.org/signatures/v <span verifiable-text="end" data-for="sig">]</span>
  </div>
</div>

## Data Verified

Artist name, signature type (Wet Ink, Pencil, Crayon), location of signature (Front/Back), date of analysis, authentication firm/expert name, comparison exemplars used, result (Consistent/Inconsistent/Inconclusive).

**Document Types:**
- **Signature Analysis Report:** Technical breakdown of the handwriting.
- **Estate Stamp Certification:** Verifying the "chop mark" or rubber stamp used by an estate.
- **Graphology Report:** Forensic analysis of ink and pressure.

## Verification Response (Signatures)

The endpoint returns a simple status code:

- **OK** — Signature matches the artist's known hand
- **ASCRIBED** — Signature is from the "circle of" or "studio of" the artist; not the master
- **FORGERY_ALERT** — The signature is a known apocryphal mark; do not transact
- **RETRACTED** — Expert has withdrawn their opinion; seek fresh authentication
- **404** — Report not found (never issued, or OCR error)

The issuer domain is visible from the `verify:` line on the letter itself (e.g., `ifar.org`).

## Second-Party Use

The **Collector** or **Gallerist** benefits from verification.

**Vetting:** Proving to a potential buyer that the signature on the back of a "found" painting isn't just a clever fake, but has been verified by a handwriting expert.

**Legal Defense:** Defending against claims of "knowingly selling a forgery" by showing a verified authentication report from a reputable domain.

## Third-Party Use

**Auction Houses (Cataloging)**
**Specialist Review:** When writing a catalog description ("Signed 'Picasso' lower right"), the specialist scans the verification hash to ensure the claim is backed by a forensic report, reducing the house's liability.

**Insurance Companies (Claims)**
**Loss of Value:** If a signature is damaged during cleaning, the insurer needs to know the original signature was verified authentic before paying out for "loss of value" to the asset.

**Fine Art Logisticians**
**Condition Reporting:** Verifying that the signature present at pickup matches the signature present at delivery (preventing "signature swapping" or tampering during transit).

## Verification Architecture

**The "Apocryphal Mark" Fraud Problem**

- **Added Signatures:** Taking an unsigned work by a lesser-known contemporary of a master and adding the master's signature to increase the value by $1M+.
- **Rubber Stamp Forgery:** Re-creating an artist's estate stamp (Chop mark) to "authenticate" sketches that the artist actually discarded.
- **Ink Matching:** Fraudsters using 19th-century ink from old bottles to sign new forgeries. Verification links the signature to a specific forensic report that checks for these tricks.

**Issuer Types** (First Party)

**Forensic Experts:** (Graphologists specializing in art).
**Artist Foundations:** (e.g., Picasso Administration).
**Art Research Foundations:** (IFAR, Appraisers Association).

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Visual Connoisseurship

| Feature | Live Verify | Visual Inspection (The Eye) | Carbon Dating / Chemical |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Cryptographic.** Bound to the expert's domain. | **Subjective.** Relies on the reputation of the person standing there. | **Scientific.** Analysis of physical matter. |
| **Durability** | **High.** The report is permanent. | **Low.** The expert dies or changes their mind. | **High.** But invasive (requires taking a sample). |
| **Speed** | **Instant.** Scan the report. | **Slow.** Requires scheduling a viewing with an expert. | **Very Slow.** Takes weeks/months in a lab. |

**Why Live Verify wins here:** Connoisseurship is a "Black Box." An expert says "It feels right," but that opinion is hard to trade or insure. Live Verify turns that subjective "feeling" into a **documented, verifiable event** that can travel with the painting across the global market.


---

_[Content merged from: art-provenance-documentation]_


## What is Art Provenance?

**Provenance** is the "Chain of Ownership" of an artwork. It's the list of everyone who has owned the painting since it left the artist's studio (e.g., "Owned by the Artist -> Sold to Gallery X in 1920 -> Sold to Museum Y in 1955").

Provenance is used to prove:
1.  **Authenticity:** If you can trace it back to the artist, it's real.
2.  **Clear Title:** It wasn't stolen from a museum or looted during a war (like Nazi-era looting).

Verified provenance documentation is the "History of Truth" that allows million-dollar sales to happen with confidence.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', Georgia, serif; border: 1px solid #999; background: #fff; padding: 40px; box-shadow: 2px 2px 10px rgba(0,0,0,0.05);">
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.3em; letter-spacing: 1px;"><span verifiable-text="start" data-for="prov">[</span>CHRISTIE'S PROVENANCE RESEARCH</div>
    <div style="font-size: 0.8em; color: #666; margin-top: 5px;">ARCHIVAL DEPARTMENT • LONDON</div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
    <h3 style="text-align: center; text-transform: uppercase; margin-bottom: 20px;">Ownership History Statement</h3>
<p><strong>Object:</strong> Claude Monet, <em>Water Lilies</em> (1906)<br>
    <strong>Ref:</strong> CHR-LDN-2026-992</p>
<div style="margin: 20px 0; border-top: 1px solid #ccc; padding-top: 15px;">
      <strong>PROVENANCE:</strong><br>
      <ul style="margin-left: 20px; list-style-type: circle;">
        <li><strong>1906:</strong> Purchased from the artist by Paul Durand-Ruel, Paris.</li>
        <li><strong>1922:</strong> Collection of Dr. Albert Barnes, Philadelphia.</li>
        <li><strong>1955:</strong> Inherited by the current estate.</li>
        <li><strong>2026:</strong> Consigned to Christie's for public auction.</li>
      </ul>
    </div>
<p style="font-style: italic;">We have researched the history of this work and found no evidence of claims or restitution issues during the 1933-1945 period.</p>
<div style="margin-top: 40px; text-align: right;">
      <div style="border-top: 1px solid #000; width: 200px; display: inline-block; padding-top: 5px;">Archival Research Lead</div>
      <div style="font-size: 0.8em; color: #777;">March 10, 2026</div>
    </div>
  </div>
<div data-verify-line="prov" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: Christie's doesn't yet offer verification&#10;endpoints, so this is illustrative">
      verify:christies.com/provenance/v <span verifiable-text="end" data-for="prov">]</span>
  </div>
</div>

## Data Verified

Full ownership chain (dates and names), dealer/gallery references, exhibition history, publication references, restitution status (e.g., Nazi-era check), object reference ID, researcher name.

**Document Types:**
- **Ownership History Statement:** A formal summary of provenance.
- **Restitution Clearance Letter:** Confirming the work isn't on the Art Loss Register.
- **Consignment Record Extract:** Proving the work was legally transferred to an auction house.

## Verification Response (Provenance)

The endpoint returns a simple status code:

- **OK** — The ownership chain matches the issuer's archival research
- **GAPS_IDENTIFIED** — History is incomplete (common in historical art); proceed with caution
- **CLAIM_PENDING** — There is an active ownership claim against this piece; do not transact
- **SEIZED** — The item is reported stolen or looted; do not transact
- **404** — Provenance record not found (never issued, or OCR error)

The issuer domain is visible from the `verify:` line on the document itself (e.g., `christies.com`).

## Post-Verification Actions (Provenance)

None typically. Provenance verification confirms the research is genuine; contacting current owners is neither expected nor welcomed.

**Owner Privacy:**

Art collectors — whether private individuals, family trusts, or institutions — guard their holdings carefully. Verification of a provenance document does not imply consent to contact. The verification system respects this:

- **No owner contact details** in the response (even if known to the issuer)
- **No acquisition inquiry forms** — if a work isn't consigned for sale, the owner doesn't want to hear from you
- **Agents (galleries, family offices) are gatekeepers** — and they're paid to say "not for sale" unless there's a compelling offer through proper channels

The verification proves the document is real. It doesn't open a door to the owner.

## Second-Party Use

The **Current Owner** (Seller) benefits from verification.

**Market Value:** Provenance is everything in the art market. A verified history from Christie's or a top gallery can increase a painting's value by 10x compared to an "undocumented" piece.

**Restitution Defense:** Proving that the work has been "Verified Clean" of Nazi-era looting claims, protecting the seller from future lawsuits or seizures.

## Third-Party Use

**Prospective Buyers**
**Due Diligence:** High-end buyers won't touch a work without verified provenance. Scanning the link provides immediate comfort that the history isn't fabricated.

**Customs & Border Protection (CBP)**
**Cultural Property Enforcement:** Verifying that a work being imported has a documented, legal history and isn't being smuggled from a conflict zone (e.g., Syria, Iraq).

**Museums (Loans)**
**Ethical Guidelines:** Museums must verify provenance before accepting works for exhibition to avoid the scandal of displaying stolen/looted items.

## Verification Architecture

**The "Phantom Owner" Fraud Problem**

- **Fabricated Gallery Labels:** Creating fake labels from famous, now-defunct galleries (like Durand-Ruel) to "insert" a fake work into a real historical chain.
- **Restitution Laundering:** Hiding the 1933-1945 ownership history to mask that a work was seized from a Jewish family.
- **Signature Forgery:** Forging the signature of a famous scholar or archivist on a provenance summary.

**Issuer Types** (First Party)

**Auction Houses:** (Archival departments of major houses).
**Artist Foundations:** (Managing the official archive of the artist).
**Galleries:** (Primary dealers who handle the "first sale").

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

**Jurisdictional Requirements (United States)**

The IRS does not mandate or recognize third-party witnessing firms for federal tax documents. The IRS maintains authoritative records within its own systems, and verification occurs via direct query to IRS endpoints.

However:
- **State tax authorities** may have different requirements (e.g., state-level charity registration requires independent witness firms)
- **International stakeholders** (foreign tax authorities, treaty partners) may demand independent verification from witness firms not located in the US
- **FATCA compliance** (Foreign Account Tax Compliance Act) may require US documents to be witnessed by non-US firms when shared across borders

**Public Blockchain (Non-Party)**

Witnessing firms may periodically commit rollups to an inexpensive public blockchain, providing an ultimate immutability guarantee. The blockchain is a "non-party"—infrastructure, not a participant in the transaction. This creates multiple verification paths:

1. **Issuer domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion


## Competition vs. Physical Labels / Archival Photos

| Feature | Live Verify | Gallery Labels (Reverse of Frame) | Archival Photo (Black & White) |
| :--- | :--- | :--- | :--- |
| **Trust** | **Cryptographic.** Bound to the institution's domain. | **Visual.** Very easy to forge using tea-stained paper. | **Subjective.** Is that the *exact* same painting in the grainy 1920s photo? |
| **Searchability** | **Instant.** Links to the full digital archive entry. | **None.** Just a physical sticker. | **Hard.** Requires visual comparison experts. |
| **Updateability** | **Yes.** Can note "New claim surfaced" instantly. | **Static.** Once it's on the frame, it stays there. | **Fixed.** |

**Why Live Verify wins here:** Provenance is a "Living History." New information surfaces, claims are filed, and research progresses. Live Verify turns a static piece of paper (the research summary) into a dynamic window into the institution's latest knowledge about that work.

## Text-to-Hash Suitability

**Primary scenario: Text-to-hash is the natural fit.**

Art documentation circulates digitally far more often than physically:
- **Data rooms:** Due diligence for acquisitions happens in virtual deal rooms. Buyers receive PDFs of COAs, appraisals, and provenance summaries.
- **Email attachments:** Galleries, collectors, and insurers share documents as attachments and inline images.
- **Consignment portals:** Auction houses receive digital submissions before physical inspection.
- **Lending platforms:** Art-backed loan applications include digital documentation.

**Browser-based text selection works well because:**
- Documents are typically clean, typed text (not handwritten)
- High-value transactions justify the 5 seconds to select text and verify
- Recipients are already viewing documents on screens
- PDF readers support text selection natively

**Physical OCR is secondary:** Useful when examining original paper certificates during in-person inspections, but the digital workflow is primary for art market participants.

This is an ideal text-to-hash use case.
