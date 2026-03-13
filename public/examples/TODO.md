# Examples Page: Replace Discworld Content

## Problem

The examples page (`index.html`) uses Discworld (Terry Pratchett) fictional content for the two main examples:

1. **Unseen University degree** (Ponder Stibbons, Bachelor of Thaumatology) — verifies OK
2. **Barber-Surgeons medical licence** (Dr. Mossy Lawn) — verifies as REVOKED

Trusted reviewers found these off-putting. The Discworld references undermine credibility with exactly the audience we need to take this seriously. Now that we have real test infrastructure (Rust backend, Docker, Playwright, authority chains), the examples should reflect that maturity.

## What to keep

- **Costa coffee receipt** — grounded, relatable, real brand. Keep as-is.
- **Fake claim (404 failure)** — demonstrates the failure case. Keep as-is.

## What to replace with

We need examples that are:
- Realistic enough to be taken seriously
- Clearly fictitious (to avoid implying real organisations participate)
- Cover different document types (not just one category)
- Include at least one REVOKED example (the current Discworld one is the only revoked demo)

### Candidates from existing simulated-integration-tests

These already have full test infrastructure (Docker, Caddy, seeding scripts, Playwright specs). Creating examples page versions means hosting the hash on `live-verify.github.io/live-verify/c` (static JSON) rather than against Docker backends.

| Test | Script | Status | Good example candidate? |
|---|---|---|---|
| **Gina Coulby police ID** | `run-gina-test.sh` | Verified + headshot | Yes — identity verification is the strongest demo. Would need to seed hash on GitHub Pages. |
| **Lex Luthor fake ID** | `run-lex-test.sh` | 404 (never issued) | Overlaps with existing "fake claim" example. Skip — we already have a failure case. |
| **James bank statement** | `run-james-test.sh` | Verified | Yes — bank statements are a high-value use case (mortgage, visa, landlord). Lots of line-item detail shows that any alteration breaks the hash. |
| **OFSI sanctions licence** | `run-ofsi-test.sh` | Verified | Maybe — niche but impressive. Shows government authority chain. Might be too specialised for a general examples page. |

### New tests to create (fill gaps)

| Gap | Proposed test | Authority chain | Status | Why |
|---|---|---|---|---|
| **Revoked document** | Employment reference that's been revoked (e.g., "Superseded" or "Revoked — employee misconduct discovered post-departure") | `acme-corp.com` (commercial, no chain) | REVOKED | Replaces the Discworld revoked medical licence. Employment references are universally understood. |
| **Peer reference (real)** | Kevin Behr peer reference | `paulhammant.com/refs` (self-certified) | Verified | The only example that actually works against a real domain. No Docker needed — hash is live. Could be on the examples page today. |
| **Receipt / short-form** | The Costa receipt already covers this | — | — | No new test needed. |
| **Government document** | Could promote the OFSI test to the examples page | `ofsi.hm-treasury.gov.uk → gov.uk` | Verified | But this only works against Docker backends, not GitHub Pages. Would need a GitHub Pages version or a note saying "this one requires the test suite." |

## Recommended new examples page lineup

1. **Peer reference** (real — verifies now against paulhammant.com) — *replaces Unseen University*
2. **Employment reference, revoked** (new test needed) — *replaces Barber-Surgeons*
3. **Costa coffee receipt** (keep)
4. **Fake claim / 404** (keep)

## Work required

### Immediate (no new test infrastructure)

- [ ] Add peer reference example to `index.html` — seed hash on `live-verify.github.io/live-verify/c` OR verify against `paulhammant.com/refs` directly
- [ ] Remove Unseen University example

### New test: revoked employment reference

- [ ] Create `simulated-integration-tests/run-revoked-reference-test.sh`
- [ ] Fixture HTML: employment reference from a fictitious company (e.g., "Meridian Consulting Group") for a fictitious person, with `verify:` line
- [ ] Seed script: seed the hash with `{"status":"revoked","message":"Reference withdrawn — post-departure misconduct"}`
- [ ] Playwright spec: verify the extension shows REVOKED status
- [ ] Seed the same hash on `live-verify.github.io/live-verify/c` with revoked status
- [ ] Replace Barber-Surgeons example on `index.html`
- [ ] Remove Discworld content

### Optional: promote existing tests to examples page

- [ ] Seed Gina police ID hash on GitHub Pages (`live-verify.github.io/live-verify/c`) — but without authority chain walk (GitHub Pages can't simulate `policing.gov.uk → gov.uk`). Would verify as OK but without chain display.
- [ ] Seed James bank statement hash similarly — but the plain text is long, which may be awkward in the examples page layout.
- [ ] Consider whether examples page should note "for the full authority chain experience, see the demo videos above."
