---
title: "IATA and ASTA Travel Agent Credentials"
category: "Travel & Hospitality"
volume: "Small"
retention: "Statement period + 7 years"
slug: "iata-asta-credentials"
verificationMode: "clip"
tags: ["iata-accredited", "asta-member", "travel-agency-credentials", "commission-verification", "travel-industry-standards", "agency-audit", "iata-numeric-code"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 4px solid #002d62; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="iata"></span>IATA ACCREDITED AGENCY</div>
    <div style="width: 50px; height: 50px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #002d62; font-weight: bold; font-size: 0.8em;">IATA</div>
  </div>
<div style="padding: 30px;">
    <div style="text-align: center; border-bottom: 2px solid #002d62; padding-bottom: 10px; margin-bottom: 20px;">
      <h3 style="margin: 0; color: #002d62;">CERTIFICATE OF ACCREDITATION</h3>
      <div style="font-size: 1.2em; font-weight: bold; margin-top: 5px;">Numeric Code: 99-8-2288 7</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p>This certifies that <strong>Apex Global Travel, LLC</strong> is a Passenger Sales Agent in good standing, authorized to issue tickets on behalf of IATA member airlines.</p>
<div style="background: #f0f4f8; border: 1px solid #d1d9e6; padding: 15px; margin: 15px 0; border-radius: 4px;">
        <strong>Agency Location:</strong> 123 Main St, Boston, MA 02108<br>
        <strong>Status:</strong> ACTIVE / FULL ACCREDITATION<br>
        <strong>Last Financial Review:</strong> March 01, 2026
      </div>
<p><strong>Effective Date:</strong> January 01, 2026<br>
      <strong>Annual Review Date:</strong> January 01, 2027</p>
    </div>
<div style="margin-top: 25px; border: 1px solid #ccc; padding: 10px; font-size: 0.8em; color: #555; background: #fafafa; font-style: italic; text-align: center;">
      This credential confirms the agency meets IATA's rigorous financial and professional standards.
    </div>
<div data-verify-line="iata" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: IATA doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="iata">verify:iata.org/check-a-code/v</span> <span verifiable-text="end" data-for="iata"></span>
    </div>
  </div>
</div>

## The Problem: Ghost Agency Fraud

- **Code Borrowing:** An un-accredited sub-agent using a larger agency's IATA number illegally. Verification of the *Address/Name Hash* prevents this.
- **Status Falsification:** Editing a "Suspended" notice to read "Active" to trick an airline into extending credit.
- **Fabricated Certificates:** Using a realistic-looking template to create a fake "IATA Accredited" certificate for a phishing website.

## What Is Checked

Agency name, IATA Numeric Code (8-digit), ASTA membership number, physical address, accreditation status (Full/GoLite/GoStandard), financial security status (e.g., Bonded/Verified Assets), authorized signatory, effective/expiration dates.

**Document Types:**
- **IATA Accreditation Certificate:** The high-trust "Wall License."
- **Agency Status Form:** Proving current financial health to airlines.
- **BSP (Billing & Settlement Plan) Summary:** Verified commission report.
- **ASTA Membership Seal:** Proving professional ethical standards.

## What the Checker Sees

Shows the issuer domain (`iata.org`, `asta.org`) and current agency standing.

**Status Indications:**
- **Active** — Agency is fully authorized to issue tickets and collect commissions.
- **Suspended** — Default on payments or safety violation found.
- **Terminated** — Accreditation revoked; no ticketing authority.
- **Expired** — Annual financial review or fee overdue.

## Who Holds It

The Travel Agency Owner benefits from verification.

**Airline Negotiations:** Proving to a new airline partner (e.g., Emirates or Singapore Air) that their "IATA 8-digit Code" is verified and in good standing. This allows for immediate "Ticketing Authority" setup without waiting for weeks of manual paperwork.

**Customer Trust:** Posting the verified IATA/ASTA badge on the agency's website. High-end corporate clients won't book multi-million dollar travel contracts without seeing verified proof of professional standing.

## Who Checks It

**Airlines / Carriers**
**Agency Vetting:** Instantly verifying the "Financial Health" of an agency before allowing them into the Billing & Settlement Plan (BSP). Verification prevents "Ghost Agencies" from issuing millions in tickets and defaulting on payments.

**Travel Tech Platforms (Saber / Amadeus)**
**GDS Onboarding:** Automatically verifying the IATA credentials of a new agency before granting access to the Global Distribution System (GDS).

**Consumer Protection Agencies**
**Fraud Detection:** Verifying that a "Discount Travel" website is actually a member of ASTA, protecting consumers from "Vapor-Vacation" scams.

## Who Issues It

**Issuer Types** (First Party)

**International Air Transport Association (IATA):** (The primary global authority).
**American Society of Travel Advisors (ASTA).**
**National Travel Associations:** (e.g., ABTA in the UK).

## Authority Chain

**Pattern:** Regulated

IATA accredits travel agents to sell airline tickets under international standards.

```
✓ agents.iata.org — Registers IATA-accredited travel agents
  ✓ iata.org — Sets global air transport industry standards
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the IATA/ASTA body's hashes and status changes plus structured metadata (agency name, numeric code, agency location, accreditation status, last financial review date, effective date, annual review date) — never plaintext financial details — providing non-repudiation of the travel agent credentials.


## Compared With IATA Check-a-Code

| Feature | Live Verify | IATA Check-a-Code (Web) | Scanned PDF |
| :--- | :--- | :--- | :--- |
| **Trust Anchor** | **Domain-Bound.** Bound to IATA. | **Database.** Direct from source. | **Zero.** Easily forged. |
| **Speed** | **Instant.** 5-second scan. | **Slow.** Requires typing 8 digits and solving CAPTCHAs. | **Instant.** |
| **Integrity** | **Binds Details.** Protects the Financial Tier. | **Data-Only.** Doesn't verify the paper. | **Vulnerable.** |
| **User Access** | **Universal.** Any airline/buyer can verify. | **Public.** But often limited to 1 query at a time. | **Universal.** |

**Where each fits:** IATA's Check-a-Code is the direct, authoritative lookup for an agency code, and a supplier checking one agency from a desk loses nothing by using it. It confirms the code rather than the certificate, and it handles one query at a time. Live Verify suits a hotel, tour operator or airline desk that is handed a credential as a document and wants to confirm IATA stands behind what it says. The official lookup remains available beside it.
