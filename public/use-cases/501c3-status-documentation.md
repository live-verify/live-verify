---
title: "501(c)(3) Status Documentation"
category: "Charitable & Non-Profit"
volume: "Tiny"
retention: "Permanent (legal status)"
slug: "501c3-status-documentation"
verificationMode: "clip"
tags: ["501c3", "status", "documentation", "charitable", "non-profit", "IRS"]
furtherDerivations: 2
---

## What is a 501(c)(3) Letter?

A **501(c)(3) Determination Letter** is the official document from the IRS granting a non-profit organization tax-exempt status. It is the "Golden Ticket" of the charity world.

Without this letter:
1.  **Donors** cannot deduct their contributions.
2.  **Foundations** will not give grants.
3.  **Vendors** (like TechSoup or Microsoft) will not give non-profit discounts.

Charities often have to fax, email, or mail this letter dozens of times a year to prove their legitimacy.

The IRS's own database/search path should remain primary where the verifier is willing and able to use it. Live Verify is more credible as a bridge when the determination letter itself is the artifact being forwarded, attached to a grant packet, framed on a wall, or circulated as a PDF outside the IRS workflow.

<div style="max-width: 600px; margin: 24px auto; font-family: 'Times New Roman', serif; border: 1px solid #ccc; background: #fff; padding: 40px;">
  <span verifiable-text="start" data-for="501c3"></span>
  <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
    <div style="font-weight: bold; font-size: 1.2em;">Internal Revenue Service</div>
    <div style="font-size: 0.9em;">Department of the Treasury</div>
    <div style="font-size: 0.9em;">P.O. Box 2508, Cincinnati, OH 45201</div>
  </div>
<div style="margin-bottom: 30px; font-size: 0.9em;">
    <div style="text-align: right; margin-bottom: 20px;">
      Employer Identification Number:<br>
      <span style="font-weight: bold;">12-3456789</span><br>
      DLN: 17053221002025
    </div>
    <div>
      Date: <span style="font-weight: bold;">OCT 24 2025</span><br><br>
      THE HUMAN FUND<br>
      123 CHARITY LANE<br>
      NEW YORK, NY 10001
    </div>
  </div>
<div style="font-size: 0.95em; line-height: 1.6; text-align: justify;">
    <p>Dear Applicant:</p>
    <p>We're pleased to tell you we determined you're exempt from federal income tax under Internal Revenue Code (IRC) Section 501(c)(3). Donors can deduct contributions they make to you under IRC Section 170. You're also qualified to receive tax deductible bequests, devises, transfers or gifts under Section 2055, 2106, or 2522.</p>
    <p>Public Charity Status: 170(b)(1)(A)(vi)</p>
  </div>
<div data-verify-line="501c3" style="border-top: 1px dashed #999; margin-top: 40px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.75em; color: #555; text-align: center;"
      title="Demo only: IRS doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="bare2">verify:irs.gov/teos/v</span>
  </div>
  <span verifiable-text="end" data-for="501c3"></span>
</div>

## Data Verified

Organization name, EIN (Employer Identification Number), effective date of exemption, public charity status classification, address at time of issuance.

**Document Types:**
- **Determination Letter (Form 1045)**
- **Affirmation Letter** (issued later to confirm status hasn't changed)

## Data Visible After Verification

Shows the issuer domain (e.g., `irs.gov`) and current status.

**Status Indications:**
- **Valid** — Organization is currently exempt and in good standing.
- **Revoked** — Exemption was automatically revoked (e.g., for failure to file Form 990 for 3 years).
- **Suspended** — Under investigation or temporarily suspended.

## Second-Party Use

The **Non-Profit Organization** (second party) receives the determination letter from the IRS (first party), **keeps it**, and may later hand it to third parties for various reasons, or never do so.

**Personal Record:** The organization has their own verified copy of tax-exempt status. Most of the time, the document sits in organizational files—the verification value is latent, there *if needed*.

**Peace of Mind:** The organization can confirm at any time that the letter matches what the IRS's system recorded and hasn't been altered since they received it.

**Future Optionality:** If a grant application arises, a state registration is needed, or a donor questions their tax-deductibility, the organization has cryptographic proof ready without needing to contact the IRS.

## Third-Party Use

The non-profit organization (second party) may hand the verified document to various third parties:

**Donors and Foundations**
High-net-worth donors want absolute certainty that their large donation will be tax-deductible. Verifying the determination letter confirms the entity is legitimate and currently exempt.

**Corporate Matching Platforms**
Platforms like Benevity or CyberGrants verify charities before allowing employees to donate. Automation via OCR verification reduces manual review time.

**State Regulators**
State Attorneys General can verify the federal status of organizations soliciting funds in their jurisdiction.

## Verification Architecture

**The 501(c)(3) Fraud Problem**

- **Name Spoofing:** Creating a fake charity with a name very similar to a famous one (e.g., "Cancer Fund of America" vs "American Cancer Society").
- **Status Misrepresentation:** Claiming to be tax-exempt when the status was actually revoked years ago for non-filing.
- **Photoshop:** Altering an old determination letter to change the year or the address.

**Issuer Types (First Party)**

- Internal Revenue Service (IRS) — The sole authority for federal tax exemption

**Privacy Salt:** Not required. The determination letter contains highly unpredictable variables—unique EIN (Employer Identification Number), organization legal name variations, specific determination dates, and DLN (Document Locator Number). These elements combined provide sufficient entropy that enumeration attacks are infeasible. Adding salt would provide no additional security benefit.

## Authority Chain

**Pattern:** Sovereign

Administers federal tax exemptions for charitable organizations.

```
✓ irs.gov/charities/verify — Administers federal tax exemptions for charitable organizations
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

Some jurisdictions, contracts, or multi-party workflows may add an independent witness layer. When used, the witnessing firm:

- Receives all hashes from the IRS, and any subsequent changes to the payload as they happen—which may manifest as a new hash, a status change (revoked, suspended), or even a 404 (record deleted)
- Receives structured content/metadata (organization name, EIN, exemption date, public charity classification)
- Does **NOT** receive plaintext (donor information, financial details)
- Provides an immutable, timestamped audit trail—available to the jurisdiction on demand, to organizations/third parties during disputes, or as expert witness testimony in legal proceedings

This provides:
- **Non-repudiation:** IRS cannot deny issuing the determination letter
- **Timestamp proof:** Exemption existed at a specific time
- **Regulatory audit:** State charity bureaus can inspect the witness ledger for fraud detection
- **Resilience:** Verification works even if IRS systems go down

**Public Blockchain (Non-Party)**

If a witness layer exists, it may periodically commit rollups to a public blockchain as an additional timestamping mechanism. That is optional, not inherent to the use case. The verification paths would then be:

1. **IRS domain** — Direct check against the issuer
2. **Witnessing firm** — Independent confirmation with timestamp
3. **Public blockchain** — Decentralized trust anchor via rollup inclusion

## Competition vs. QR/NFC and IRS Search

| Feature | Live Verify | QR Code | IRS Search / TEOS |
| :--- | :--- | :--- | :--- |
| **Trust Model** | **Strong.** Links directly to `irs.gov`. | **Depends on what it resolves to.** | **Primary.** Direct IRS status path. |
| **User Experience** | **Fast.** Scan the letter -> verified. | **Fast.** Scan the code. | **Sometimes slower.** Search workflow and user error. |
| **Offline Proof** | **Medium.** Hash proves integrity of the paper text. | **Low.** Just a link. | **None.** Requires internet to search DB. |
| **Phishing Resistance** | **High.** `verify:` line is human-readable. | **Variable.** Depends on visible domain and user behaviour. | **High.** If the user navigates directly to IRS. |

**Narrower conclusion:** IRS search should remain the dominant answer when the verifier is prepared to use it directly. Live Verify is complementary when the determination letter itself is the thing being shared and the goal is to bridge that visible or portable artifact back to current IRS status without manual search friction.

## See Also

- [Professional Licenses](view.html?slug=professional-licenses) — Another case where a wall document is stronger as a visible surface than as the core artifact
