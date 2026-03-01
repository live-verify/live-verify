---
title: "Protection & Indemnity (P&I) Club Certificates"
category: "Specialty Insurance"
volume: "Very Small"
retention: "Policy term + 10-20 years (maritime claims lifecycle)"
slug: "protection-indemnity-certificates"
tags: ["maritime-insurance", "p-and-i-club", "vessel-insurance", "oil-pollution", "shipping-liability", "port-state-control", "imo-compliance", "marine-fraud"]
furtherDerivations: 1
---

## What is a P&I Certificate of Entry?

In the global shipping industry, **Protection & Indemnity (P&I)** is a specialized form of mutual insurance. A **Certificate of Entry** is the proof that a vessel (e.g., a container ship or oil tanker) is a member of a "Club" and is insured for high-stakes liabilities: **Oil Spills**, **Crew Injury**, **Cargo Damage**, and **Wreck Removal**. These certificates are mandatory for a ship to enter any major port.

These documents are the "Entry Ticket" to global trade. Fraud is high-stakes: owners of "Substandard Ships" (which legitimate clubs won't insure) often create fake certificates from non-existent or "Shadow" P&I clubs to trick port authorities. If such a ship has an oil spill, there is no money for cleanup, leaving the host nation with billions in damage. Verified hashes bind the **Vessel IMO Number, Gross Tonnage, and Club Name** to the International Group of P&I Clubs' or the individual club's domain (e.g., `ukpandi.com` or `gard.no`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="pi">[</span>THE UK P&I CLUB
Member of the International Group of P&I Clubs
═══════════════════════════════════════════════════════════════════

                      CERTIFICATE OF ENTRY

Vessel Name:    MV OCEAN TRADER           Certificate #:  UK-2026-8844
IMO Number:     9922887                   Policy Year:    2026/27
Gross Tonnage:  42,500 GT                 Flag:           Panama

VERIFIED COVERAGE LIMITS
───────────────────────────────────────────────────────────────────
Oil Pollution (CLC):                            $ 1,000,000,000.00
Crew & Passenger Liability:                            AS PER RULES
Wreck Removal:                                           FULL COVER

Subject to the Rules of the Association.

<span data-verify-line="pi">verify:ukpandi.com/v</span> <span verifiable-text="end" data-for="pi">]</span></pre>
</div>

## Data Verified

IMO number, vessel name, gross tonnage, call sign, member (owner) name, certificate number, policy year, coverage limits (Oil, Bunkers, Wreck), "Blue Card" status (CLC/Bunker conventions), P&I club name, date of entry.

**Document Types:**
- **Certificate of Entry:** The primary proof of P&I membership.
- **Blue Card:** Specific certificate required for oil pollution liability.
- **Letter of Undertaking (LOU):** (Linked hash) a guarantee to prevent ship arrest.
- **War Risk Addendum:** Proving coverage for conflict zones.

## Data Visible After Verification

Shows the issuer domain (`ukpandi.com`, `gard.no`, `skuld.com`) and the vessel standing.

**Status Indications:**
- **Active Member** — Vessel is currently insured and premium is paid.
- **Terminated** — **CRITICAL:** Coverage has ended (e.g., due to vessel sale or safety breach).
- **Blue Card Suspended** — **ALERT:** The pollution-specific guarantee is no longer valid.
- **Under Sanctions** — **CRITICAL:** The vessel or owner has been flagged for international sanctions.

## Second-Party Use

The **Shipowner / Manager** benefits from verification.

**Port Entry Clearance:** Upon arrival at a port (e.g., Singapore or Rotterdam), the Master provides the verified hash of the P&I certificate. Port State Control (PSC) can instantly see **"ACTIVE - GARD"** on their tablet, bypassing the need for manual email verification and allowing the ship to dock immediately.

**Chartering Credibility:** Before a major oil company (e.g., Shell or Exxon) hires a tanker, they scan the P&I hash. Verification ensures the ship has the $1 billion pollution coverage required by their "Vetting Department."

## Third-Party Use

**Port State Control (PSC) Inspectors**
**Substandard Ship Detection:** Thousands of ships use fake "non-IG" club certificates to hide poor maintenance. Live Verify connects the inspector directly to the legitimate P&I club's domain, allowing them to instantly identify and "Arrest" ships with fraudulent insurance.

**Maritime Lawyers (Admiralty)**
**Arrest Prevention:** If a ship is involved in a collision, the P&I club issues a verified "Letter of Undertaking" (LOU). The victim's lawyer scans the hash to ensure the LOU is an authentic commitment from a solvent club, preventing the need to physically seize (arrest) the ship.

**Coastal Guard / Environmental Agencies**
**Spill Response Audit:** Instantly verifying the insurance limits of a grounded vessel to determine the available budget for emergency salvage and cleanup operations.

## Verification Architecture

**The "Shadow Club" Fraud Problem**

- **Logo Mimicry:** Creating a fake certificate using the name of a famous club but with a fraudulent contact address.
- **Limit Inflation:** Changing a $10M "non-IG" limit to a $1B "International Group" limit on a PDF.
- **Sanction Hiding:** Editing a certificate to hide the true "Beneficial Owner" of a vessel from a sanctioned nation.

**Issuer Types** (First Party)

**International Group (IG) P&I Clubs.**
**Fixed-Premium Marine Insurers.**
**National Maritime Authorities.**

**Privacy Salt:** Low to Medium. While vessel names are public, the specific "Claims History" and member premium rates are sensitive. The hash should be salted to protect commercial confidentiality.

## Rationale

P&I insurance is the "Global Shield" of the oceans. By turning certificates into verifiable digital bridges, we protect the world's coastlines from the catastrophic cost of un-insured oil spills and ensure that "Safety at Sea" is backed by cryptographic proof.

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
