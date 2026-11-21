---
title: "Rental Agreements and Condition Reports"
category: "Travel & Hospitality"
volume: "Very Large"
retention: "Rental period + 3-10 years (liability / dispute period)"
slug: "rental-agreements"
verificationMode: "clip"
tags: ["rental-car", "equipment-rental", "hertz", "enterprise", "ldw-coverage", "odometer-fraud", "damage-claims", "travel-expense", "liability-release"]
furtherDerivations: 1
---

## What is a Rental Agreement?

A Rental Agreement is the temporary contract of possession for a vehicle or piece of high-value equipment (e.g., an excavator or a professional camera). It defines the financial terms (daily rate), the insurance coverage (Loss Damage Waiver), and the "Return Condition."

This sector is plagued by high-volume, low-trust disputes. Damage Fraud is the primary issue: a rental company might "edit" a condition report to charge a customer for a scratch that was already there, or a customer might "edit" an agreement to show they paid for "Full Coverage" when they actually declined it. Verified hashes bind the Odometer Reading, Fuel Level, and Coverage Selections to the rental company's domain (e.g., `hertz.com` or `unitedrentals.com`).

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="rental"></span>Hertz
RENTAL RECORD                                     Ref: RA-99228877-XJ
═══════════════════════════════════════════════════════════════════

Renter:    JOHN JACOB DOE              Pickup:  15 MAR 2026 (JFK)
Vehicle:   2025 Tesla Model Y          Return:  22 MAR 2026 (JFK)
VIN:       1ABC-9922-8877-Z            Unit #:  42-XJ (Verified)

VERIFIED RENTAL STATUS
───────────────────────────────────────────────────────────────────
Odometer (Start):                                      12,450 Miles
Fuel / Charge:                                        85% (Battery)
Coverage (LDW):                                   ACCEPTED ($0 Ded)

Unauthorized alteration of mileage or coverage status
renders this document void.

<span data-verify-line="rental">verify:hertz.com/v</span> <span verifiable-text="end" data-for="rental"></span></pre>
</div>

## The Pre-Rental Condition Report

The condition report is where damage disputes are won or lost, so it must record **each defect
individually — panel location, damage type, and measured size** — not a vague "existing
scratches/dents." A seal over "some scratches" proves nothing; a seal over *"4 cm scratch, left rear
door"* is what defeats a fabricated return charge, because the exact defect either was, or was not, on
the sealed pickup record.

<div style="max-width: 650px; margin: 24px auto; border: 1px solid #ccc; background: #fff; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 0.85em; white-space: pre; color: #000; line-height: 1.6;"><span verifiable-text="start" data-for="condition"></span>Hertz
PRE-RENTAL CONDITION REPORT                       Ref: RA-99228877-XJ
═══════════════════════════════════════════════════════════════════

Vehicle:   2025 Tesla Model Y          Unit #:  42-XJ
VIN:       1ABC-9922-8877-Z            Inspected: 15 MAR 2026 09:14

PRE-EXISTING DAMAGE (recorded at pickup)
───────────────────────────────────────────────────────────────────
#  Location                       Type            Size
1  Left rear door                 Scratch         4 cm
2  Front bumper, driver side      Scuff           8 cm
3  Rear bumper, center            Dent            ~2 cm dia.
4  Windshield, lower passenger    Chip            <5 mm

No other damage recorded. Any defect not listed above is the
renter's responsibility on return.

<span data-verify-line="condition">verify:hertz.com/v</span> <span verifiable-text="end" data-for="condition"></span></pre>
</div>

At return, a claimed defect is checked against this list: if it is not on the sealed pickup record, it
is new; if it *is* on the record (same location, same or smaller size), the renter is not liable. The
size field matters — a "4 cm scratch" that returns as a "20 cm scratch" in the same location is a
*worsening*, a genuine new-damage claim the report supports rather than defeats.

## The Problem: Scratch & Pay Fraud

- **Odometer Padding:** Editing a return receipt to hide 500 "Over-Limit" miles.
- **Coverage Masking:** Changing a "DECLINED" insurance choice to "ACCEPTED" after a crash.
- **Lien Ghosting:** Creating a fake "Paid in Full" receipt to hide a $500 unpaid cleaning fee.

## What Is Checked

Rental Agreement (RA) number, renter name, vehicle VIN/Plate, unit number, pickup location/time, return location/time, starting odometer, fuel/charge level, accepted coverage options (LDW, PAI, SLI), daily rate, mileage limits, deposit amount, date of issuance. On the condition report specifically: **each pre-existing defect itemised by location, type, and measured size.**

**Document Types:**
- **Rental Record:** The primary contract given at the counter.
- **Pre-Rental Condition Report:** Each pre-existing defect itemised by location, type, and measured size (see mockup above).
- **Final Return Receipt:** (Linked hash) showing actual charges.
- **Accident Report Supplement:** Proof of damage reporting.

## What the Checker Sees

Shows the issuer domain (`hertz.com`, `enterprise.com`, `turo.com`) and the rental standing.

**Status Indications:**
- **Rental Active** — Vehicle is currently in the renter's possession.
- **Closed / Settled** — Vehicle returned and final payment cleared.
- **Damage Reported** — A post-rental damage claim is active for this unit.
- **Overdue** — Vehicle has not been returned by the contracted date.

## Who Holds It

The Renter (Customer) benefits from verification.

**Damage Claim Defense:** If a rental company sends a $2,000 bill 3 weeks after the rental for a "dent on the rear bumper," the customer scans the verified hash of their "Pre-Rental Condition Report." Because the report itemises defect #3 as *"Rear bumper, center — Dent — ~2 cm dia."*, the customer has cryptographic proof the damage was recorded at pickup, at that location and size, and stops the fraudulent claim instantly. The itemised, measured list is what makes this defense work — a report that said only "some existing damage" would not.

**Expense Reimbursement:** A business traveler can provide the verified hash of their "Final Receipt" to their employer. "Verified by Hertz" ensures the finance department that the "Fuel Service Charge" or "Upgrade Fee" was an actual corporate cost and not a manual edit to the PDF.

## Who Checks It

**Credit Card Insurers (Secondary Coverage)**
**Claims Adjudication:** Many premium cards provide rental insurance. Before paying a claim, the card insurer scans the verified RA hash. Verification ensures that the renter didn't "edit" the RA to hide that they *accepted* the rental company's own LDW (which would void the credit card's secondary benefit).

**Corporate Travel Managers**
**Compliance Auditing:** Automatically scanning thousands of employee rental hashes. If an employee's verified RA shows they selected a "Luxury SUV" when the company policy only allows "Intermediate," the system flags the violation instantly.

**Law Enforcement**
**Stolen Vehicle Recovery:** During a traffic stop, an officer can scan the "Rental App" or paper RA. Verified hashes eliminate the risk of "Fake Rental" papers used by criminals to drive stolen vehicles across state lines.

## Who Issues It

**Issuer Types** (First Party)

**National Rental Chains.**
**Peer-to-Peer Platforms (Turo, Getaround).**
**Construction Equipment Rental Yards.**

**Privacy Salt:** Essential. Renter names and locations are sensitive travel data. The hash must be salted to prevent "Customer Tracking" by data brokers.

## Authority Chain

**Pattern:** Commercial

Issues car rental agreements and contracts

```
✓ rental.enterprise.co.uk/verify — Issues car rental agreements and contracts
```

Commercial issuer — self-authorized. Trust rests on the issuer's domain reputation.

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Rationale

Rental documentation is the "History of Condition." By turning agreements into verifiable digital bridges, we protect the consumer's wallet and the company's fleet, ensuring that "Responsibility for the Asset" is backed by cryptographic proof.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the rental company's hashes and status changes plus structured metadata (vehicle VIN, unit number, odometer reading, fuel level, coverage selections, pickup/return dates) — never plaintext or sensitive personal information — providing non-repudiation of the rental agreement and condition report.
