---
title: "Electrical System Inspections"
category: "Site & Equipment Safety"
volume: "Large"
retention: "3-5 years (commercial wiring cycle)"
slug: "electrical-safety-inspections"
verificationMode: "both"
tags: ["electrical-safety", "eawr", "nfpa-70e", "fixed-wire-test", "panel-inspection", "fire-prevention", "electrical-code"]
furtherDerivations: 1
---

## What is an Electrical System Inspection?

Fixed electrical installations (wiring, fuse boxes, panels) are a primary source of workplace fires. Under the EAWR (UK) and NFPA 70E (US), these systems must be periodically inspected by a qualified electrician to find loose connections, overloaded circuits, or degraded insulation.

An inspection certificate, or a sticker placed on the panel itself, is the evidence that the work was done. A verified hash binds the Panel/Circuit ID, Test Result, and Electrician's License to the contractor's or the city's domain.

<div style="max-width: 400px; margin: 24px auto; font-family: sans-serif; border: 3px solid #ff9800; border-radius: 8px; background: #fff; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
  <div style="background: #ff9800; color: #fff; padding: 12px; text-align: center; font-weight: bold;">
    ELECTRICAL SAFETY PASS
  </div>
  <div style="padding: 20px;">
    <div style="font-size: 0.9em; margin-bottom: 10px;">
      <strong><span verifiable-text="start" data-for="electric"></span>Panel ID:</strong> MAIN-DB-04<br>
      <strong>Location:</strong> Warehouse North Wall
    </div>
    <div style="background: #fff8e1; border: 1px solid #ffe082; padding: 10px; margin: 15px 0;">
      <strong>Tested:</strong> 15 MAR 2026<br>
      <strong>Condition:</strong> SATISFACTORY<br>
      <strong>Electrician:</strong> Mike J. Miller (Lic #9922)
    </div>
    <div data-verify-line="electric" style="border-top: 1px dashed #999; padding-top: 10px; font-family: 'Courier New', monospace; font-size: 0.8em; color: #e65100; text-align: center; font-weight: bold;">
      <span data-verify-line="electric">verify:miller-electric.com/v</span> <span verifiable-text="end" data-for="electric"></span>
    </div>
  </div>
</div>

## The Problem: Inspections Signed Off but Not Done

A facility manager, insurer or fire inspector looking at a panel sticker has no way to tell whether the test behind it was carried out. Remedial wiring is expensive, so there is pressure to record a pass without doing the work.

- **Pencil whipping:** A pass is recorded for a panel that was never tested, to avoid the cost of remedial work.
- **Fake or copied stickers:** A sticker is printed, or lifted from another panel, with no inspection behind it.
- **Expired passes:** An old sticker stays on the panel long after the inspection interval has lapsed.

## What Is Checked

The text on the panel sticker: panel ID, location, test date, condition (Satisfactory/Unsatisfactory), and the electrician's name and licence number.

The full inspection report is a separate document with its own hash. It carries the measured values (insulation resistance, earth loop impedance), the circuit numbers, the next inspection date and the regulation reference (e.g., BS 7671 / NFPA 70).

## What the Checker Sees

Shows the issuer domain (the Electrical Contractor) and the current safety standing.

**Status Indications:**
- **Satisfactory** — System is safe for continued use.
- **Unsatisfactory** — Remedial work required; fire/shock risk detected.
- **Expired** — Periodic inspection is overdue.

## Who Holds It

The Facility Manager / Landlord benefits from verification.
- **Insurance Compliance:** Proving to a commercial property insurer that the building's wiring is verified safe, which is often a condition of fire coverage.

## Who Checks It

**Fire Marshals / Safety Inspectors**
- **Rapid Vetting:** Scanning stickers on panels during a fire safety audit to ensure they aren't fake or expired.

**Maintenance Engineers**
- **Safe Working:** Verifying that a specific panel was recently vetted before opening it for maintenance.


## Authority Chain

**Pattern:** Regulated

The contractor publishes the result on its own domain. A registration body (NICEIC in the UK, in this example) vouches that the contractor is registered to do the work.

```
✓ miller-electric.com/v — Electrical contractor; issues inspection results for its own work
  ✓ niceic.com/verify — Electrical contractor registration
    ✓ gov.uk/verifiers — UK government root namespace
```

See [Authority Chain Specification](../../docs/authority-chain-spec.md) for the full protocol.

## Jurisdictional Witnessing (Optional)

An independent witness layer may apply — see [Witnessing Third Parties](../../docs/WITNESSING-THIRD-PARTIES.md) for the full mechanism (what a witness receives, non-repudiation, optional public-blockchain rollups). For this use case: a witness would receive the electrical contractor's hashes and status changes plus structured metadata (panel IDs, test dates, insulation resistance values, test results, electrician licenses) — never facility addresses or identification details — providing non-repudiation of the inspection and an audit trail state regulators can inspect.
