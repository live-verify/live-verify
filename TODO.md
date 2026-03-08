# TODO

## Android: Rich verification payload support

The Chrome extension already parses JSON payloads from the backend and renders
extra fields (e.g. `headshot`, `message`). The Android app currently discards the
response body on HTTP 200 (`VerificationLogic.kt:170`) — it only checks the status
code.

Changes needed:
- `VerificationLogic.verifyHash()` — parse response body as JSON when Content-Type
  is application/json. Extract `status`, `headshot` (base64 data URI), `message`,
  and any other fields.
- `VerificationResult.Verified` — add optional `payload: JSONObject?` field
- `MainActivity` result UI — render headshot image and message text when present
- Match the Chrome extension's popup layout: photo on the left, message on the right

## iOS: Rich verification payload support

Same gap as Android. `VerificationClient.swift` parses for "OK"/"VERIFIED" but
doesn't extract or surface extra JSON fields.

Changes needed:
- `VerificationClient.verify()` — when response is JSON with `status: "OK"`, also
  extract `headshot`, `message`, and other fields into the result
- `VerificationResult` enum — add associated payload data
- `ResultView.swift` — render headshot (base64 data URI → UIImage) and message text
- Match the Chrome extension's layout

## Full-stack tests: Android and iOS

The Chrome extension full-stack test (`full-stack-tests/chrome-extension/`) works.
Android and iOS equivalents are planned in `full-stack-tests/PLAN.md` but not yet
implemented. These depend on the rich payload work above to be meaningful for the
doorstep warrant-card scenario.
