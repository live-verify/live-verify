---
title: "Aviation Insurance Policies and Certificates"
category: "Specialty Insurance"
volume: "Small"
retention: "Policy term + 10-20 years"
slug: "aviation-insurance"
verificationMode: "clip"
tags: ["aviation", "aircraft", "insurance", "hull", "liability", "compliance", "faa"]
furtherDerivations: 1
---

## What is Aviation Insurance?

Insuring a jet is not like insuring a car. A single Gulfstream can be worth $75 million, and if it crashes into a building, the liability can be billions.

The Certificate of Insurance (COI) is the high-stakes document that pilots must show to airport towers and customs agents around the world.

If a pilot presents a fake certificate to land in London or Dubai, they are flying "uninsured" for hundreds of millions of dollars. Because there is no global database of plane insurance, officials rely on these printed papers. Live Verify provides the digital bridge they need.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <span verifiable-text="start" data-for="aviation"></span>
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;">GLOBAL AEROSPACE, INC.
Specialist Aviation Underwriters
═══════════════════════════════════════════════════════════════════

                    CERTIFICATE OF INSURANCE

Policy #: AV-998877-26

Insured:       Cyberdyne Systems Charter, LLC
Aircraft:      2024 Gulfstream G650ER
Registration:  N101CS

COVERAGE LIMITS
───────────────────────────────────────────────────────────────────
Coverage Type                                   Limit of Liability
───────────────────────────────────────────────────────────────────
Aircraft Hull (All Risks)                           $ 75,000,000
Combined Single Limit (CSL)                        $ 500,000,000
Passenger Liability                                 Included in CSL

Policy Period: January 1, 2026 to January 1, 2027

NOTE: This certificate is issued as a matter of information only
and confers no rights upon the holder.

</pre>
  <span data-verify-line="aviation">verify:global-aerospace.com/v</span> <span verifiable-text="end" data-for="aviation"></span>
</div>

## The Problem: High-Stakes Fraud

- **Liability Padding:** Editing a $10M liability policy to look like a $100M policy to meet international landing requirements.
- **Cancellation Concealment:** Keeping a printed certificate after the policy was cancelled for non-payment (common in the small-aircraft/single-pilot world).
- **Hull Inflation:** Claiming a $5M hull value for a $1M aircraft to profit from an intentional crash (insurance fraud).

## What Is Checked

Insured name, aircraft registration (N-number), hull value, liability limits (CSL), policy effective/expiration dates, war risk inclusion, primary/excess carrier identification.

**Document Types:**
- **Certificate of Insurance (COI):** The standard "Proof of Insurance" for airports.
- **Aircraft Hull & Liability Policy:** The full multi-page contract.
- **War Risk Endorsement:** Critical for international flight into restricted zones.
- **Hangar Keepers Liability:** For FBOs and maintenance shops.

## What the Checker Sees

Shows the issuer domain (the Underwriter) and current policy status.

**Status Indications:**
- **In Force** — Premium paid; policy active.
- **Cancelled** — Policy terminated (often due to non-payment or safety violations).
- **Expired** — Term ended; no coverage.
- **Grounded** — Underwriter has restricted flight (e.g., due to maintenance lapse).

## Who Holds It

The Aircraft Owner/Operator (second party) receives the certificate of insurance from the underwriter (first party), keeps it, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The owner has their own verified copy of insurance coverage. Most of the time, the document sits in the aircraft's documentation package—the verification value is latent, there *if needed*.

**Peace of Mind:** The owner can confirm at any time that the certificate matches what the underwriter's system recorded and hasn't been altered since they received it.

**Future Optionality:** If landing rights are needed at a foreign airport, an FBO requires proof of coverage, or a charter customer questions insurance adequacy, the owner has cryptographic proof ready without needing to contact the underwriter.

## Who Checks It

The aircraft owner/operator (second party) may hand the verified document to various third parties:

**Airport Authorities (CAA / DGAC)**
Civil aviation inspectors can instantly verify the "War Risk" and "Liability" status of a foreign aircraft by scanning the COI, preventing unsafe or under-insured flight.

**Lienholders (Banks)**
Private jet lenders (e.g., Credit Suisse, Citi) verify that the $75M hull value is accurately insured and that the bank is listed as "Loss Payee."

**Charter Brokers**
Brokers like NetJets or Wheels Up can automatically verify the insurance status of "off-fleet" aircraft before booking them for a client.

## Who Issues It

**Issuer Types (First Party)**

- Aviation Underwriters (Global Aerospace, Allianz, AXA XL, Starr)
- Specialist Brokers (Marsh, Aon, JLT)

**Privacy Salt:** Required. Aviation insurance certificates contain enumerable values—round dollar hull values ($75M, $100M), standard liability limits ($500M, $1B), common policy periods (annual), and publicly registered aircraft tail numbers. A competitor could feasibly enumerate combinations to reverse-engineer an operator's fleet insurance portfolio and undercut their renewal pricing. Salt protects these competitive insurance positions.

## Authority Chain

**Pattern:** Regulated

Global Aerospace underwrites aircraft hull and liability insurance for aviation operations.

```
✓ aviation.globalae.com/verify — Underwrites aircraft hull and liability insurance
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Compared With FAA Registries

| Feature | Live Verify | FAA Civil Aviation Registry | Paper COI |
| :--- | :--- | :--- | :--- |
| **Granularity** | **High.** Shows insurance limits and dates. | **Zero.** FAA registry shows ownership but *not* insurance. | **High.** But untrusted. |
| **Cross-Border** | **Universal.** Works for any N-number or G-registration. | **Siloed.** National registries don't talk. | **Manual.** |
| **Freshness** | **Real-time.** Checks if the premium was paid today. | **Laggy.** Changes take weeks to update. | **Static.** |

**Where each fits:** the national aircraft registry is the authority on ownership and registration, and remains the place to check those. It does not record insurance, and registries in different countries are not linked. The certificate of insurance is what airports, lessors and foreign authorities are actually handed, and Live Verify lets them confirm the insurer stands behind it, wherever the aircraft is registered.

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
