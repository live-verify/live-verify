# TODO

## ~~Android: Rich verification payload support~~ ✓ DONE

`VerificationLogic.verifyHash()` now parses JSON response body, extracts `status`,
`headshot`, `message`. `VerificationResult.Verified` carries optional `payload: JSONObject?`.
`MainActivity` renders headshot (base64 → Bitmap) and message text in result overlay.

## ~~Android: Authority chain display~~ ✓ DONE

Chain display follows `docs/authority-chain-app-display.md` spec: indented lines with
`✓ domain — description` format. Broken chains show `✗ NOT CONFIRMED`. Tap for
`formalName` detail. `AuthorizationChainEntry` now carries `formalName`.

## Android: Full-stack test — IMPLEMENTED, NOT YET RUN

`simulated-integration-tests/android/run-android-test.sh` launches emulator, builds debug APK,
starts containerized backend, seeds Gina scenario, launches app with text-paste intent
(bypasses camera/OCR), captures screenshot + video. Debug build trusts user-installed
CAs via `network_security_config.xml`. Needs first real run to validate.

## iOS: Rich verification payload support

Same gap as Android. `VerificationClient.swift` parses for "verified"/"VERIFIED" but
doesn't extract or surface extra JSON fields.

Changes needed:
- `VerificationClient.verify()` — when response is JSON with `status: "verified"`, also
  extract `headshot`, `message`, and other fields into the result
- `VerificationResult` enum — add associated payload data
- `ResultView.swift` — render headshot (base64 data URI → UIImage) and message text
- Match the Chrome extension's layout

## Full-stack tests: iOS

macOS only. Planned in `simulated-integration-tests/PLAN.md` but not yet implemented.
