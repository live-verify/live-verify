---
title: "Named Driver Insurance Certificates"
category: "Personal Lines Insurance"
volume: "Medium"
retention: "Policy term (1 year typical)"
slug: "named-driver-insurance"
verificationMode: "clip"
tags: ["car-insurance", "named-driver", "policy-endorsement", "additional-driver", "telematics-insurance", "uninsured-motorist", "insurance-fraud"]
furtherDerivations: 1
---

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 2px solid #000; background: #fff; padding: 0; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
  <div style="background: #000; color: #fff; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
    <div style="font-weight: bold;"><span verifiable-text="start" data-for="driver"></span>ADMIRAL</div>
    <div style="font-size: 0.8em;">CERTIFICATE OF MOTOR INSURANCE</div>
  </div>
<div style="padding: 15px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.8em; margin-bottom: 10px;">
      <div>
        <strong>Policy Number:</strong><br>
        ADM-99887766
      </div>
      <div style="text-align: right;">
        <strong>Vehicle:</strong><br>
        LV26 ABC (Mini Cooper)
      </div>
    </div>
<div style="font-size: 0.9em; line-height: 1.4; color: #333; background: #f9f9f9; padding: 10px; border: 1px solid #eee;">
      <p style="margin-top: 0;"><strong>PERSONS ENTITLED TO DRIVE:</strong></p>
      <ul style="margin: 0; padding-left: 20px;">
        <li>John Jacob Doe (Policyholder)</li>
        <li><strong>Sarah Jane Smith</strong> (Named Driver)</li>
      </ul>
    </div>
<div style="font-size: 0.8em; margin-top: 10px;">
      <strong>Effective Date:</strong> 15 MAR 2026<br>
      <strong>Expiration Date:</strong> 14 MAR 2027
    </div>
<div style="font-size: 0.7em; color: #777; margin-top: 10px; border-top: 1px solid #eee; padding-top: 5px;">
      This document provides evidence that the persons named are insured to drive the specified vehicle.
    </div>
<div data-verify-line="driver" style="border-top: 1px dashed #999; margin-top: 15px; padding-top: 5px; font-family: 'Courier New', monospace; font-size: 0.7em; color: #555; text-align: center;"
      title="Demo only: Admiral doesn't yet offer verification&#10;endpoints, so this is illustrative">
      <span data-verify-line="driver">verify:admiral.com/check/v</span> <span verifiable-text="end" data-for="driver"></span>
    </div>
  </div>
</div>

## The Problem: Insurance Fronting Fraud

- **Identity Swapping:** A high-risk driver (e.g., a teen with a DUI) editing a parent's policy PDF to add their name as a "Named Driver" without the parent or insurer knowing.
- **Status Faking:** Showing an old "Active" paper for a driver who was excluded from the policy 3 months ago due to a bad driving record.
- **Buy and Cancel:** Printing a 1-year certificate, then cancelling the policy 2 days later.

## What Is Checked

Policyholder name, specific Named Driver names, driver's license numbers (redacted), vehicle registration (License Plate), policy number, effective/expiration dates, coverage type (Comprehensive/3rd Party), issuing carrier.

**Document Types:**
- **Certificate of Motor Insurance:** The primary legal proof in the UK/EU.
- **Named Driver Endorsement:** Proving an addition to a standard US policy.
- **Learner Driver Permit Insurance:** For supervised practice.

## What the Checker Sees

Shows the issuer domain (`admiral.com`, `directline.com`, `geico.com`) and real-time coverage status for the specific driver.

**Status Indications:**
- **Authorized** — The named driver is currently covered for the specified vehicle.
- **Excluded** — This driver has been specifically removed from the policy.
- **Cancelled** — Policy terminated for all drivers.
- **Pending Payment** — Coverage active but subject to premium clearance.

## Who Holds It

The Named Driver benefits from verification.

**Roadside Verification:** When stopped by police or involved in an accident, proving they are legally authorized to drive. Standard paper certificates are easily edited; a verified hash from the insurer provides "Court-Grade" trust that the person behind the wheel is actually on the policy.

**Rental / Car Sharing:** Proving to a car-share platform or a friend that they have verified liability coverage before borrowing a vehicle.

## Who Checks It

**Law Enforcement (Roadside)**
**Frontline Enforcement:** Instantly confirming that a young driver hasn't been "added" to a parent's policy using Photoshop. "Verified by Admiral" stops "Fronting Fraud" where high-risk drivers hide on low-risk policies using fake paperwork.

**Car Owners (Lenders)**
**Risk Management:** A car owner can verify that a friend or family member is actually on their policy before handing over the keys for a weekend trip.

**Insurance Special Investigative Units (SIU)**
**Fraud Detection:** Identifying patterns of "Phantom Drivers" where policies are altered to add drivers only *after* an accident occurs.

## Who Issues It

**Issuer Types** (First Party)

**Retail Auto Insurers.**
**Telematics Platforms:** (e.g., Root, Metromile - hosting live driver hashes).
**National Motor Insurance Databases:** (e.g., UK's MID).

## Authority Chain

**Pattern:** Regulated

Direct Line, a regulated motor insurer, is authorized by the FCA to issue verified named driver insurance certificates.

```
✓ nameddriver.directline.co.uk/verify — Issues verified named driver insurance certificates
  ✓ fca.org.uk/register — Regulates UK general insurance firms
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Where Each Fits: Live Verify and National Motor Insurance Databases

<!-- TODO(verify): the extent of public access to the Motor Insurance Database -->

Many countries keep a national record of insured vehicles; in the UK it is the Motor Insurance Database (MID), used by the police and insurers. Coverage and public access depend on the country: some have such a database, some do not, and public access is usually limited. The database and Live Verify answer different questions and work side by side: the database says whether a vehicle is insured, Live Verify says whether the insurer stands behind a certificate naming this driver.

| | National database (e.g. MID) | Live Verify on the certificate | Paper certificate alone |
| :--- | :--- | :--- | :--- |
| **Who can check** | Police and insurers fully; the public only in limited circumstances. | Anyone handed the certificate: a car owner, a hire or car-share company, the other party after a collision. | Anyone can read it; nobody can confirm it. |
| **What the checker gets** | Whether the vehicle is recorded as insured; it may not show which drivers are covered. | Confirmation that the insurer issued this exact certificate, with its named drivers, and its current status, such as excluded or cancelled. | Whatever the paper says. |
| **What the holder shares** | The vehicle registration. | Only the certificate they chose to show. | The certificate. |
| **Reach** | One country's vehicles and insurers. | Global in principle: any insurer, in any country, that publishes hashes on its own domain. | Universal, but untrusted. |
| **Speed and cost** | Fast for police at the roadside. | A few seconds per check: one web lookup, with no fee to the standard. Needs a data connection. | Immediate. |
| **What it needs** | Insurers reporting to the database, and access to it. | The insurer to publish hashes, and Live Verify-aware software on the checker's device. No insurer does this yet. | Nothing. |
| **Best suited to** | Enforcement: is this vehicle insured at all? | Confirming that a particular driver is covered. | Nothing where liability matters. |

**Where each fits:** A national motor insurance database is the right tool for police and licensing authorities, who need to know quickly whether a vehicle is insured at all. It is generally not open to the public and often records the vehicle, not each named driver. Live Verify lets a car owner, a hire company or the other party after a collision confirm that the insurer's certificate names a particular driver, alongside the official database that enforcement uses.

## See Also

- [Authority-Issued Driving Records](view.html?doc=driving-records) — Before adding a named driver, insurers should verify their points/endorsements
- [Driver's Licenses](view.html?doc=drivers-licenses) — License card verification
- [Vehicle Registration](view.html?doc=vehicle-registration) — Registration and insurance status
- [Additional Driver Endorsements](view.html?doc=additional-driver-endorsements) — Temporary driver coverage

## Independent Record (Optional)

An independent witness can keep a dated record that this document was verified, in case the issuer later withdraws it. The witness holds the hash and never the text. It can be [a witness the person checking chooses](../witnessing.html) or [a witness the issuer contracts for the holder's benefit](../witnessing-issuer-fed.html).
