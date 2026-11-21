---
title: "Border Crossing Receipts (I-94)"
category: "Immigration & Visa Documents"
volume: "Large"
retention: "Travel + 5-10 years (immigration)"
slug: "border-crossing-receipts-i94"
verificationMode: "clip"
tags: ["immigration", "i-94", "visa", "cbp", "border-crossing", "entry-record", "employment-eligibility"]
furtherDerivations: 1
---

<div style="max-width: 600px; margin: 24px auto; font-family: sans-serif; border: 1px solid #ccc; background: #fff; padding: 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <div style="background: #002d62; color: #fff; padding: 15px; display: flex; align-items: center; justify-content: space-between;">
    <div>
      <div style="font-weight: bold; font-size: 1.1em;"><span verifiable-text="start" data-for="i94"></span>U.S. CUSTOMS AND BORDER PROTECTION</div>
      <div style="font-size: 0.8em;">Electronic I-94 Admission Record</div>
    </div>
    <div style="width: 40px; height: 40px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #002d62; font-weight: bold; font-size: 0.7em; text-align: center;">CBP</div>
  </div>
<div style="padding: 25px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <h2 style="margin: 0; font-size: 1.3em;">ADMISSION (I-94) RECORD NUMBER</h2>
      <div style="font-size: 1.5em; font-weight: bold; margin-top: 5px; color: #002d62;">998877665 42</div>
    </div>
<div style="font-size: 0.95em; line-height: 1.6; color: #333;">
      <p><strong>Most Recent Admission:</strong> March 15, 2026<br>
      <strong>Class of Admission:</strong> H-1B<br>
      <strong>Admit Until Date:</strong> March 14, 2029</p>
<div style="border-top: 1px solid #eee; padding-top: 10px; margin-top: 10px;">
        <strong>Family Name:</strong> DOE<br>
        <strong>First (Given) Name:</strong> JOHN<br>
        <strong>Birth Date:</strong> 05/05/1985<br>
        <strong>Passport Number:</strong> ********1234
      </div>
    </div>
<div style="margin-top: 25px; padding: 10px; background: #f9f9f9; border: 1px solid #eee; font-size: 0.8em; color: #555;">
      This record is a printout of the official electronic I-94 admission record maintained by DHS.
    </div>
<div data-verify-line="i94" style="border-top: 1px dashed #999; margin-top: 30px; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #555; text-align: center;"
      title="Demo only: CBP doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="i94">verify:cbp.gov/i94/v</span> <span verifiable-text="end" data-for="i94"></span>
    </div>
  </div>
</div>

## The Problem: I-94 Alteration Fraud

- **Date Extension:** Changing the "Admit Until" date from 2024 to 2026 in a PDF editor to hide an overstay.
- **Class Swapping:** Changing a "B-2" (Tourist - No Work) to an "H-1B" (Work Authorized) to get a job.
- **Record Fabrication:** Creating a fake I-94 number for a person who entered the country illegally.

## What Is Checked

Admission (I-94) Record Number, full name, date of birth, passport number, country of issuance, class of admission (e.g., B-1, F-1, H-1B), date of entry, "Admit Until" date.

**Document Types:**
- **Electronic I-94 Printout:** The standard proof of legal entry.
- **Paper I-94 (White/Green):** Issued at land borders or in rare cases.
- **I-94A:** For certain classes of admission.

## What the Checker Sees

Shows the issuer domain (`cbp.gov`) and current admission status.

**Status Indications:**
- **Valid** — Traveler is currently in legal status.
- **Overstay** — "Admit Until" date has passed without extension.
- **Departed** — Traveler has left the U.S. (record closed).
- **Adjusted** — Status has changed (e.g., to Permanent Resident).

## Who Holds It

The Traveler (Non-citizen) benefits from verification.

**Employment (I-9):** The authoritative answer should still come from the official employer-authorization workflow where one exists. Live Verify is more credible when the employer is holding only a copied I-94 printout and needs a bridge back to current government status.

**Driver's License:** DMVs require proof of legal presence. A document-to-status bridge may help when staff are working from the printout, but SAVE or other direct government checks should remain primary.

**SSN Application:** Proving legal status to the Social Security Administration for number issuance.

## Who Checks It

**Employers (HR Departments)**
**Compliance:** Ensuring they don't hire someone with an expired or fake I-94, which avoids massive federal fines. The strongest production path is still the official employer-authorization workflow; Live Verify is only the portability layer when the copied printout is what is actually circulating.

**Universities (DSOs)**
**Student Monitoring:** International Student Offices (DSOs) verify the I-94s of thousands of students every semester to maintain SEVIS compliance.

**Banks / Mortgage Lenders**
**Legal Presence:** Verifying that a borrower is legally present in the U.S. for the duration of a loan or to comply with KYC/AML regulations.

## Who Issues It

**Issuer Types** (First Party)

**U.S. Customs and Border Protection (CBP):** The primary issuer.
**DHS SAVE System:** (The backend database).

**Privacy Salt:** Essential. I-94 numbers and names are highly sensitive. The hash must be salted to prevent status enumeration.

## Authority Chain

**Pattern:** Sovereign

Records US border entry admissions and permits.

```
✓ i94.cbp.dhs.gov/verify — Records US border entry admissions and permits
  ✓ usa.gov/verifiers — US federal government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and DHS SAVE

DHS runs SAVE, which lets registered government agencies confirm a person's immigration status, including from I-94 records, as part of benefit and licensing decisions. Other countries have their own status checks for officials and employers. SAVE and Live Verify answer different questions: SAVE is the formal status check for government users, while Live Verify could help a private relying party who has only an emailed or printed I-94.

| | DHS SAVE | Live Verify on the I-94 printout | Paper printout |
| :--- | :--- | :--- | :--- |
| **Who can check** | Registered government agencies. | Anyone handed the printout: a landlord, a university, a private employer, a bank. | Anyone, on trust. |
| **What the checker gets** | A formal status answer from DHS; some cases need further manual verification, which takes longer. | Confirmation that CBP issued this exact record, as at its date. | A printout that may have been edited. |
| **What the traveller shares** | Nothing extra; agencies query the system. | Only the printout they chose to hand over. | The printout. |
| **Reach** | US agencies that have registered. | Global in principle: any immigration authority that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Integration and federal vetting before use. | A few seconds per check: one web lookup, with no fee to the standard. | Free and immediate. |
| **What it needs** | An agency agreement with DHS. | CBP to publish hashes, and Live Verify-aware software on the checker's device. CBP does not do this. | Nothing. |
| **Best suited to** | Formal immigration-status decisions. | Private parties working from a printout outside government systems. | Nothing where status matters. |

**Where each fits:** this is not a replacement for SAVE, CBP systems, or formal immigration-status adjudication. It is only defensible as a lighter bridge for relying parties who are already working from an emailed or printed I-94 outside those systems, and who have software that honours Live Verify.

## See Also

- [Advance Parole and Re-Entry Permits](view.html?doc=advance-parole-reentry-permits) — Similar “official system primary, artifact bridge secondary” pattern
- [Work Permits & Work Visas](view.html?doc=work-permits) — Broader right-to-work framing across jurisdictions

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
