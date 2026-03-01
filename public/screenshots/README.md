# Training Page Screenshots

This directory contains screenshots of the live-verify training pages, generated for documentation and demo purposes.

## Generation

Screenshots are automatically generated from HTML training pages using:

```bash
cd public/training-pages
./screenshot-training-pages.sh
```

This script:
1. Takes screenshots of each training page HTML file
2. Saves base screenshots here (`public/screenshots/`)
3. Generates rotated variants (85°/175°/265°) in `test/fixtures/screenshots/` (test-specific)

E2E tests reference base screenshots from this directory. Rotated variants are kept in `test/fixtures/screenshots/` only (test-specific).

## Usage

These screenshots can be:
- Embedded in documentation (e.g., Use_Case-Sales_Receipts.md)
- Linked from the web: `https://live-verify.github.io/live-verify/screenshots/uk-coffee-shop.png`
- Used for demos and presentations

## File Naming

Screenshots are named after their source HTML file:
- `bachelor-thaumatology.html` → `bachelor-thaumatology.png`
- `uk-coffee-shop.html` → `uk-coffee-shop.png`

Rotated variants (for testing OCR robustness) are kept in `test/fixtures/screenshots/` only.
