---
title: "Lead Paint Disclosure (Pre-1978 Properties)"
category: "Real Estate & Property"
volume: "Very Large"
retention: "3-7 years (EPA requirement)"
slug: "lead-paint-disclosure"
verificationMode: "clip"
tags: ["lead-paint", "epa-disclosure", "real-estate-closing", "tenant-rights", "environmental-compliance", "public-health", "property-management"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #333; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #1a1a1a; color: #fff; padding: 15px; text-align: center;">
    <h2 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;"><span verifiable-text="start" data-for="lead"></span>LEAD PAINT DISCLOSURE</h2>
    <div style="font-size: 0.8em; opacity: 0.8;">In compliance with U.S. EPA / HUD Regulations</div>
  </div>
<div style="padding: 25px;">
    <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #333;">DISCLOSURE OF INFORMATION</h3>
      <div style="font-size: 1.1em; font-weight: bold; margin-top: 5px;">Property: 123 Historic Street, Boston, MA</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Seller/Lessor's Disclosure:</strong></p>
      <div style="background: #f9f9f9; padding: 10px; border: 1px solid #ddd; margin-bottom: 15px;">
        [ ] Presence of lead-based paint/hazards is known.<br>
        [X] <strong>Seller has no knowledge of lead-based paint/hazards in the housing.</strong>
      </div>
<p><strong>Records and Reports available to the Seller:</strong></p>
      <div style="background: #f9f9f9; padding: 10px; border: 1px solid #ddd;">
        [ ] Seller has provided all available records.<br>
        [X] <strong>Seller has no reports or records pertaining to lead-based paint.</strong>
      </div>
    </div>
<div style="margin-top: 25px; border: 1px solid #ccc; padding: 10px; font-size: 0.8em; color: #555; background: #fafafa; font-style: italic; text-align: center;">
      Verified compliant with the Residential Lead-Based Paint Hazard Reduction Act of 1992.
    </div>
<div data-verify-line="lead" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: EPA doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="lead">verify:epa.gov/lead/v</span> <span verifiable-text="end" data-for="lead"></span>
    </div>
  </div>
</div>

## The Problem: Safe Harbor Fraud

- **Report Deletion:** A landlord receiving a positive lead test result and simply "forgetting" to attach it to the disclosure PDF.
- **Check-box Tampering:** Changing a "Presence Known" check to "No Knowledge" after the document is signed.
- **Date Forgery:** Backdating an acknowledgment to hide that the tenant didn't receive the lead pamphlet until after they moved in.

## What Is Checked

Property address, Seller/Lessor name, Buyer/Lessee name, specific disclosure checkboxes (Known vs Unknown), list of attached reports (if any), presence of "Protect Your Family from Lead" pamphlet, date of acknowledgment, broker/agent ID.

**Document Types:**
- **Lead Paint Disclosure Form:** (Form LP-42 equivalent).
- **Lead Inspection / Risk Assessment:** (Linked hash) if hazards are known.
- **Lead Abatement Certificate:** Proving the property was made safe.
- **Lease Addendum:** Specifically for rental transactions.

## What the Checker Sees

Shows the issuer domain (`epa.gov`, `hud.gov`, `firstam.com`) and current filing status.

**Status Indications:**
- **Verified** — Disclosure matches the official closing/escrow record.
- **Incomplete** — Mandatory signatures or check-boxes are missing.
- **Void** — Replaced by a corrected disclosure (e.g., after an inspection found lead).
- **Abated** — Associated with a verified lead-free certification.

## Who Holds It

The Seller / Landlord benefits from verification.

**Liability Shield:** Proving to a court or a tenant that they fulfilled their federal duty to disclose "No Knowledge" of lead. Verification ensures that a tenant can't later claim the landlord "Deleted" a page from the disclosure PDF after the lease was signed.

**Closing Speed:** Proving to a title company that the mandatory federal disclosure is verified and compliant, preventing a last-minute closing delay.

## Who Checks It

**Tenants / Home Buyers**
**Health Assurance:** Before moving a family with small children into a pre-1978 home, the buyer scans the hash. "Verified by EPA.gov" ensures the seller isn't "Hiding" a known lead report that could cause brain damage to their children.

**Real Estate Brokers**
**Compliance Monitoring:** Ensuring that every agent in the firm is getting the mandatory disclosures signed and verified, reducing the firm's exposure to massive federal fines.

**Attorneys / Litigators**
**Chain of Disclosure:** Verifying exactly what was disclosed at the time of sale in a "Failure to Disclose" toxic tort lawsuit.

## Who Issues It

**Issuer Types** (First Party)

**Federal Agencies:** (EPA, HUD).
**Title Companies:** (Hosting verified hashes for closings).
**Property Management Platforms:** (e.g., AppFolio, RealPage).

## Authority Chain

**Pattern:** Sovereign

Regulates lead paint disclosure in residential properties.

```
✓ epa.gov/lead/disclosure/verify — Regulates lead paint disclosure in residential properties
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the property record issuer's hashes and status changes plus structured metadata (property address, disclosure date, seller/buyer names, signed status) — never lead inspection details or remediation costs — providing non-repudiation of the disclosure and an audit trail attorneys can inspect.


## Compared With Disclosure Portals

| Feature | Live Verify | Disclosure Portal | Scanned PDF / Paper |
| :--- | :--- | :--- | :--- |
| **Integrity** | **Cryptographic.** Protects the check-boxes. | **Data-Only.** | **Zero.** Easily forged. |
| **Persistence** | **High.** Remains verifiable for decades. | **Low.** Portals often purge data after 3 years. | **Vulnerable.** |
| **Trust Anchor** | **Domain-Bound.** Bound to the Gov/Title Co. | **System-Bound.** Trust the vendor. | **Visual.** |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires paying a fee or finding a login. | **Instant.** |

**Where each fits:** A disclosure portal is a practical way to deliver and sign the form at the start of a tenancy or sale, and the parties to that transaction are well served by it. Questions about the disclosure can arise many years later, sometimes after the portal account or the managing agent has gone. Live Verify keeps the signed text checkable against the issuer's domain for as long as the issuer publishes the hash, so the paper copy in someone's file can still be confirmed.
