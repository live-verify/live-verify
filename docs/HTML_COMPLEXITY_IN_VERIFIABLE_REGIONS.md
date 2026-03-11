# HTML Complexity in Verifiable Regions

This document identifies use-case examples where embedded HTML inside markdown creates structures that are too complex for OCR to reliably extract as simple CR-delimited text lines.

## Problem Summary

The verification system expects OCR to extract text as sequential lines that can be normalized and hashed. However, many use-case examples use HTML structures that render visually as tables or multi-column layouts, which OCR may read in unpredictable order:

1. **HTML Tables** - `<table>`, `<tr>`, `<td>` - OCR reads left-to-right across columns, potentially producing "Amount Billed $ 250.00 Patient Owes $ 25.00" instead of proper line-by-line extraction
2. **CSS Grid Layouts** - `display: grid; grid-template-columns` - Creates side-by-side content blocks with unpredictable reading order
3. **Flexbox with space-between** - `display: flex; justify-content: space-between` - Puts content on opposite sides of the page
4. **Multiple `<br>` tags** - Visual line breaks that depend on HTML rendering

## Good Example: employment-references.md

The `employment-references.md` file is a good reference pattern because:
- Uses `<br>` tags for line breaks within a single-column div
- Content flows top-to-bottom in reading order
- OCR can reasonably extract as CR-delimited lines

```html
<div style="font-family: 'Courier New', monospace; ...">
  <span verifiable-text="start" data-for="voe">[</span>Acme Corporation<br>
  John D. Smith<br>
  Senior Software Engineer<br>
  March 2020 – October 2025<br>
  Eligible for Rehire<br>
  <span data-verify-line="voe">verify:acme-corp.com/staff</span> <span verifiable-text="end" data-for="voe">]</span>
</div>
```

## Most Problematic Files (Tables with Financial Data)

These files have `<table>` structures inside verifiable regions where column alignment is critical for meaning:

### Financial/Accounting Tables (HIGH PRIORITY)
| File | Issue |
|------|-------|
| `bank-statements.md` | Table with Beginning Balance, Deposits, Withdrawals, Ending Balance columns |
| `settlement-statements.md` | CSS Grid header + Table with Description/Buyer Debit/Seller Credit columns |
| `health-insurance-eobs.md` | Table with Service Description/Amount Billed/Patient Owes columns |
| `freight-bills-carrier-invoices.md` | Table with Charge Description/Amount columns |
| `cruise-final-folios.md` | Table with itemized charges |
| `gig-economy-payout-receipts.md` | Earnings breakdown table |
| `hotel-booking-documents.md` | Room rate/fees table |
| `insurance-claims-processing.md` | Claims amounts table |
| `travel-agency-invoices.md` | Travel costs breakdown |
| `pension-actuarial-valuations.md` | Actuarial values table |
| `structured-settlement-agreements.md` | Payment schedule table |
| `donation-receipts-tax-deductions.md` | Deduction amounts table |
| `currency-transaction-reports-customer.md` | Financial transaction table |

### Logistics/Shipping Tables
| File | Issue |
|------|-------|
| `air-waybills.md` | Cargo details table |
| `ocean-waybills.md` | Shipment details table |
| `rail-waybills.md` | Rail cargo table |
| `packing-lists-shipping-manifests.md` | Item list table |
| `container-packing-lists-vgm.md` | Container contents table |
| `customs-entry-clearance.md` | Customs declarations table |
| `dangerous-goods-declarations.md` | Hazmat details table |
| `proof-of-delivery-pod.md` | Delivery items table |
| `purchase-orders-delivery-notes.md` | Order line items table |
| `cmr-consignment-notes.md` | Consignment table |
| `commercial-invoices-customs.md` | Commercial invoice table |

### Insurance/Claims Tables
| File | Issue |
|------|-------|
| `insurance-policy-documents.md` | Coverage limits table |
| `auto-insurance-documents.md` | Coverage summary table |
| `homeowners-renters-insurance.md` | Policy limits table |
| `travel-insurance-claims.md` | Claim amounts table |
| `crop-hail-insurance.md` | Crop coverage table |
| `livestock-crop-insurance.md` | Agriculture coverage table |
| `catastrophe-claims-batch-reports.md` | Claims summary table |
| `workers-comp-certificates.md` | Coverage table |
| `disability-benefit-calculations.md` | Benefit amounts table |
| `life-insurance-policies.md` | Policy values table |

## CSS Grid Layout Files (54 files)

These use `grid-template-columns` to create multi-column layouts inside verifiable sections:

**Examples:**
- `settlement-statements.md` - 2-column header layout for buyer/seller info
- `warranty-documents.md` - Product/warranty details grid
- `vacation-rental-agreements.md` - Property details grid
- `training-completion-certificates.md` - Certificate info grid
- `vehicle-inspection-reports-dot.md` - Inspection details grid
- `tax-forms-receipts.md` - Tax form grid
- `voter-registration.md` - Registration info grid
- `refugee-asylee-travel-documents.md` - Document details grid
- `tachograph-records-driver-logs.md` - Driver log grid
- `temporary-short-term-insurance.md` - Policy details grid

Full list (54 total): workers-comp-certificates, wetlands-fill-mitigation-permits, warranty-documents, wetlands-delineation-reports, war-risk-piracy-insurance, warehouse-receipts, vocational-certifications, volunteer-hours-verification, voter-registration, visa-extension-change-of-status, vehicle-inspection-reports-dot, vacation-rental-agreements, umbrella-liability-policies, trade-finance-documents, training-completion-certificates, trade-credit-insurance, tournament-brackets-standings, total-loss-valuations-acv, telecom-service-agreements, temporary-short-term-insurance, tax-forms-receipts, tachograph-records-driver-logs, tank-ust-inspection-certificates, stormwater-discharge-permits, structured-settlement-agreements, specie-insurance, soil-test-results, solar-panel-efficiency-certificates, soil-geotechnical-reports, settlement-statements, sanctions-screening-attestations, satellite-insurance, safety-certifications, salvage-subrogation-documentation, reverse-factoring-supply-chain, renewable-energy-certificates, rental-agreements, refugee-asylee-travel-documents, quality-control-inspection-reports, rail-waybills, publishing-contracts-royalties, purchase-orders-delivery-notes, protection-indemnity-certificates, property-appraisals-valuations, property-condition-disclosures, product-liability-insurance, prize-indemnity-insurance, political-risk-insurance, pesticide-application-logs, photo-credits-image-licensing, payment-processor-merchant-statements, ocean-waybills, nvocc-tariffs, additional-driver-endorsements

## Files Using `<br>` for Line Breaks (Acceptable Pattern)

These files use a simpler pattern with `<br>` tags that should be more OCR-friendly:

**25 files total:**
- `employment-references.md` (canonical example)
- `trade-finance-documents.md`
- `trademarks.md`
- `temporary-short-term-insurance.md`
- `surety-bonds.md`
- `recording-page-abstracts.md`
- `registrar-residency-status-letters.md`
- `probate-documents.md`
- `passports-visa-documents.md`
- `notary-documents.md`
- `mortgage-satisfaction-lien-release.md`
- `medical-device-certifications.md`
- `marriage-divorce-documents.md`
- `living-wills-advance-directives.md`
- `international-title-insurance.md`
- `firearms-dealer-ffl-licenses.md`
- `fingerprint-certifications.md`
- `educational-institution-accreditation.md`
- `court-orders-judgments.md`
- `consular-letters-attestations.md`
- `certificates-of-origin.md`
- `builder-warranties.md`
- `birth-death-certificates.md`
- `adoption-custody-orders.md`
- `501c3-status-documentation.md`

## Statistics

| Pattern | File Count | OCR Risk |
|---------|------------|----------|
| Tables in verifiable sections | 187 | HIGH - Column order unpredictable |
| CSS Grid layouts | 54 | HIGH - Reading order unpredictable |
| Flexbox space-between | 321+ | MEDIUM - Side content may merge |
| `<br>` line breaks only | 25 | LOW - Generally OCR-friendly |
| Total files with verifiable-text | 374 | - |

## Recommendations

### Option 1: Simplify Verifiable Regions
Restructure verifiable content to use only:
- Simple text lines separated by `<br>` or newlines
- Single-column layouts
- No tables or grid layouts

**Before (problematic):**
```html
<table>
  <tr><td>Office Visit</td><td>$250.00</td><td>$25.00</td></tr>
</table>
```

**After (OCR-friendly):**
```html
<div>
  Office Visit<br>
  Amount Billed: $250.00<br>
  Patient Owes: $25.00<br>
</div>
```

### Option 2: Document Expected OCR Output
For each use case with complex HTML, document the expected "canonical" text that OCR should produce, so normalization rules can handle the output.

### Option 3: Mark Complex Regions as "Display Only"
Move the `verifiable-text` markers to encompass only the simple text portions, leaving tables as visual context outside the verified region.

### Option 4: Use Pre-Rendered Text Version
Instead of relying on OCR to parse HTML tables, provide a plain-text version of the verifiable content that issuers would print alongside the visual table.

## Next Steps

1. Prioritize the financial/accounting tables (bank-statements, settlement-statements, health-insurance-eobs) for refactoring
2. Create a standard pattern guide for new use cases
3. Consider whether tables should ever be inside verifiable regions, or if the verification should only cover header/summary fields
