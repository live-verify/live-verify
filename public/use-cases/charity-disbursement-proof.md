---
title: "Charity Disbursement Proof"
category: "Charitable & Non-Profit"
volume: "Medium"
retention: "Permanent (donor transparency)"
slug: "charity-disbursement-proof"
verificationMode: "both"
tags: ["charity", "ngo", "aid", "disbursement", "impact", "embezzlement", "donor-transparency", "financial-crime"]
furtherDerivations: 1
---

## What is Charity Disbursement Proof?

Charitable organizations often face "leakage" or embezzlement where funds donated for a specific project (e.g., building a well, delivering medical supplies) never reach the intended destination.

A **Disbursement Receipt** is an artifact issued at the "Last Mile" of aid delivery. A local recipient or project witness (e.g., a community leader, school principal, or local doctor) confirms receipt of funds or materials. This confirmation is hashed and published to the NGO's domain. Donors scan the hash to verify the impact path.

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 2px solid #2e7d32; background: #fff; padding: 0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #2e7d32; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <div style="font-weight: bold; font-size: 1.2em;"><span verifiable-text="start" data-for="charity"></span>DISBURSEMENT CONFIRMATION</div>
      <div style="font-size: 0.8em; opacity: 0.9;">Impact & Compliance Unit</div>
    </div>
    <div style="text-align: right;">
      <div style="font-weight: bold; font-size: 0.9em;">PROJECT RECORD</div>
      <div style="font-size: 0.7em;">Ref: PROJECT-KE-2026-088</div>
    </div>
  </div>
<div style="padding: 25px; font-size: 0.9em; line-height: 1.6; color: #333;">
    <p><strong>Charity:</strong> GLOBAL WATER INITIATIVE<br>
    <strong>Project:</strong> Village Well #44, Turkana County, Kenya<br>
    <strong>Impact Date:</strong> MARCH 15, 2026</p>
<div style="background: #e8f5e9; border: 1px solid #2e7d32; padding: 15px; margin: 15px 0; border-radius: 4px;">
      <p style="margin: 0;"><strong>Receipt Witnessed By:</strong></p>
      <p style="margin: 5px 0 0; font-weight: bold;">Pastor J. Kiplimo (Community Representative)</p>
      <p style="margin: 5px 0 0;"><strong>Impact Item:</strong> 1x Solar-Powered Water Pump ($2,450)</p>
      <p style="margin: 5px 0 0;"><strong>Status:</strong> RECEIVED & INSTALLED</p>
    </div>
<p style="font-size: 0.8em; color: #666; font-style: italic;">
      This record proves the intended aid reached the project site and was confirmed by a local witness.
    </p>
  </div>
<div style="padding: 20px; background: #f9f9f9; border-top: 1px dashed #2e7d32; text-align: center;">
    <div data-verify-line="charity" style="font-family: 'Courier New', monospace; font-size: 0.8em; color: #000; font-weight: bold;">
      verify:globalwater.org/impact/v <span verifiable-text="end" data-for="charity"></span>
    </div>
  </div>
</div>

## Data Verified

NGO name, project ID, impact location, impact date, local witness name/title, itemized materials/funds, reference number.

**Document Types:**
- **Disbursement Confirmation:** Proof of "Last Mile" receipt.
- **Local Auditor Report:** Verified findings from a project site visit.
- **Project Completion Certificate:** Proof that a specific milestone was met.

## Data Visible After Verification

Shows the issuer domain (`globalwater.org`, `unicef.org`) and the project status.

**Status Indications:**
- **Verified / Received** — Record matches the NGO's official project log.
- **Disputed** — **ALERT:** Local witness reports aid did not arrive as claimed.
- **In-Progress** — Disbursement authorized but final receipt not yet hashed.
- **Cancelled** — Project funding withdrawn or redirected.

## Second-Party Use

The **Local Recipient / Project Witness** benefits from verification.

**Direct Accountability:** Local leaders can prove they received the aid they were promised, or use the *absence* of a verified claim to challenge an NGO's public assertions of impact.

**Community Trust:** By showing a verified record to their community, local leaders prove the source of the aid and the exact amounts involved, preventing accusations of local corruption.

## Third-Party Use

**Donors**
**Impact Verification:** Donors scan the hash on a project report to ensure it corresponds to a real, witnessed disbursement on the NGO's official domain.

**Philanthropy Regulators**
**Systemic Audit:** Regulators can verify a random sample of an NGO's project claims to ensure the "Impact Trail" is backed by local witness attestations.

**Institutional Funders (Gates Foundation, USAID)**
**Monitoring & Evaluation (M&E):** Ensuring that grantee organizations are actually delivering materials to the field.

## Verification Architecture

**The "Ghost Project" Fraud Problem**

- **Fabricated Reports:** NGOs creating realistic-looking reports for projects that don't exist.
- **Embezzlement:** NGO headquarters claims to have sent $10,000 to a project, but only $5,000 arrives; the project report is "fudged" to hide the gap.
- **Duplicate Counting:** Using the same project photo/data for multiple grant applications.

**Important limitation:** Verification confirms that an attestation was published by the NGO's domain — it does not independently confirm that aid reached the ground. A corrupt field officer can fabricate witness names as easily on a verified document as on an unverified one. Verification augments but does not replace on-the-ground Monitoring & Evaluation (M&E). Its value is in creating an auditable, timestamped trail that M&E teams and donors can cross-reference against physical inspections.

**Issuer Types** (First Party)

**International NGOs.**
**Philanthropy Monitoring Platforms.**
**Donor-Advised Funds (DAFs).**

**Privacy Salt:** Recommended. Project details may be sensitive in certain conflict zones.

## Authority Chain

**Pattern:** Regulated

Charities verify that donated funds are properly distributed to beneficiaries.

```
✓ disbursement.redcross.org.uk/verify — Verifies charitable fund disbursements
  ✓ charitycommission.gov.uk — Regulates charities in England and Wales
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Charity fraud thrives on the "Fog of Aid"—the distance between the donor and the recipient. By turning local witness receipts into verifiable digital bridges, we bring "Last Mile" accountability to the entire philanthropy ecosystem.
