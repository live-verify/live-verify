# Single Retailer with Multiple Verifiable Things

A large retailer like Tesco operates in multiple regulated domains simultaneously. Each domain has its own authority chain, even though they all share the same top-level domain.

## The Setup

Tesco issues verifiable claims from different parts of its business, each served from a different path under `tesco.com`:

- `verify:tesco.com/receipts/store` — grocery and general merchandise receipts
- `verify:tesco.com/receipts/fuel` — fuel purchase receipts
- `verify:tesco.com/receipts/pharmacy` — pharmacy prescription records

Each path has its own `verification-meta.json` with its own `authorizedBy`, pointing to the regulator relevant to that business activity.

## Different Chains for Different Roles

**Grocery receipts:**

```
tesco.com/receipts/store/verification-meta.json
{
  "description": "Tesco PLC retail store receipts",
  "authorizedBy": "dti.gov.uk/retail",
  ...
}
```

Display:
```
✓ tesco.com — Tesco PLC retail store receipts
  ✓ dti.gov.uk — Approved company selling goods in UK
    ✓ gov.uk — Root authorization for government digital identities
```

**Fuel receipts:**

```
tesco.com/receipts/fuel/verification-meta.json
{
  "description": "Tesco PLC fuel station receipts",
  "authorizedBy": "ofgem.gov.uk/retailers",
  ...
}
```

Display:
```
✓ tesco.com — Tesco PLC fuel station receipts
  ✓ ofgem.gov.uk — Licensed fuel retailer
    ✓ gov.uk — Root authorization for government digital identities
```

**Pharmacy prescriptions:**

```
tesco.com/receipts/pharmacy/verification-meta.json
{
  "description": "Tesco Pharmacy prescription records",
  "authorizedBy": "gphc.org.uk/premises",
  ...
}
```

Display:
```
✓ tesco.com — Tesco Pharmacy prescription records
  ✓ gphc.org.uk — Registered pharmacy premises
```

## What the Chain Tells You

The domain is the same in every case — `tesco.com`. What differs is the **role** the chain establishes. The `description` field in each `verification-meta.json` says what kind of claim this is, and the `authorizedBy` chain says who vouches for Tesco's authority to make that kind of claim.

This matters because "Tesco issued this" isn't enough on its own. A fuel receipt needs Ofgem backing. A pharmacy prescription needs GPHC backing. The chain answers "authorized to do **what**?" — not just "authorized."

## Paths vs. Display

The directory paths (`/receipts/fuel`, `/receipts/pharmacy`, `/receipts/store`) are implementation details. The chain display shows only **domains and roles**, not paths. The verifier sees:

```
✓ tesco.com — Tesco PLC fuel station receipts
  ✓ ofgem.gov.uk — Licensed fuel retailer
```

Not `tesco.com/receipts/fuel`. The `description` field is what differentiates the business activities in the user-facing display.

## Self-Verified Comparison

A retailer *could* issue verifiable claims with no authority chain at all. For a well-known brand like Tesco, the domain alone carries significant trust. But the chain adds:

1. **Scoped trust** — not just "Tesco says so" but "Tesco says so, and Ofgem confirms they're licensed to sell fuel"
2. **Regulatory accountability** — the chain is auditable; the regulator committed to the authorization by publishing a hash
3. **Revocability** — if Tesco loses its pharmacy licence, GPHC can stop authorizing that path without affecting fuel or grocery receipts

Without a chain, the display shows "Self-verified by tesco.com" — which is honest but doesn't tell you whether this particular claim is within Tesco's regulated scope.
