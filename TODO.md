# TODO

## iOS: Rich verification payload support

Same gap as Android. `VerificationClient.swift` parses for "verified"/"VERIFIED" but
doesn't extract or surface extra JSON fields.

Changes needed:
- `VerificationClient.verify()` — when response is JSON with `status: "verified"`, also
  extract `headshot`, `message`, and other fields into the result
- `VerificationResult` enum — add associated payload data
- `ResultView.swift` — render headshot (base64 data URI → UIImage) and message text
- Match the Chrome extension's layout

## Browser extension ships auto-generated copies of canonical JS that can go stale

The browser extension (`apps/browser-extension/shared/`) contains auto-generated copies
of `public/normalize.js`, `public/app-logic.js`, and `public/domain-authority.js`. These
copies have ES module transformations applied by `scripts/sync-shared.js`. If canonical
files in `public/` change without running `npm run sync-shared`, the **shipped extension**
uses stale logic — this is a production bug, not just a test problem.

**Mitigation:** Run `npm run sync-shared` after changing any file in `public/` and commit
the result. Symlinks aren't feasible because the sync applies ES module transformations.
Full CI is too heavyweight for this project, so this is a manual discipline step.

## Full-stack tests: iOS

macOS only. Planned in `simulated-integration-tests/PLAN.md` but not yet implemented.
