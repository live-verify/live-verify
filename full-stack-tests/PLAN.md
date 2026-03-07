# Full-Stack Tests Plan

End-to-end tests that exercise real clients (browser extension, Android app, iOS app)
against a running backend, verifying a complete government authorization chain.

## Non-Functional Compromises

These tests prioritise functional correctness over production fidelity:

- **No mTLS between tiers.** The three backend tiers run as sibling processes on
  localhost using plain HTTP. mTLS and network segmentation are already validated
  by `backend/integration-tests/`.
- **No Docker.** Avoids container startup time and network plumbing. Each tier is
  `go run` or `cargo run` with `--listen 127.0.0.1:PORT`.
- **No FreeBSD.** All tiers run on the host OS (Linux or macOS). OS heterogeneity
  is an operational concern, not a functional one.
- **No ZFS.** BadgerDB writes to a temp directory. Replication is irrelevant here.
- **Single pod.** No multi-pod testing — that's covered by `multi_pod_test.sh`.
- **Self-signed HTTPS where needed.** Android and iOS clients require HTTPS. We use
  a test CA trusted by the test harness, not the system trust store.

## Functional Focus

Each test proves the same scenario across a different client:

1. A mock government issuer (`dept.gov.test`) publishes a claim
2. `dept.gov.test` is authorized by a root authority (`cabinet.gov.test`)
3. The client scans/selects the claim text, computes SHA-256, looks up the hash
4. The client resolves the full `authorizedBy` chain:
   `dept.gov.test` ← authorized by `cabinet.gov.test`
5. The UI displays: verified, with the authority chain visible

This exercises: OCR/text extraction → normalization → hashing → hash lookup →
metadata fetch → authorization chain walk → UI rendering.

### Test Data

Seeded into the backend before each test run:

- `cabinet.gov.test/verification-meta.json` — root authority (no `authorizedBy`)
- `dept.gov.test/verification-meta.json` — issuer, `authorizedBy: cabinet.gov.test/v1`
- SHA-256 of `dept.gov.test`'s canonical meta → stored at `cabinet.gov.test` (authorization proof)
- A sample claim hash → stored at `dept.gov.test` with payload `OK`

### Video Capture

Tests are designed so their UI output can be screen-recorded for demo purposes.
Automated recording where tooling supports it (Playwright, Android `screenrecord`,
iOS Simulator `recordVideo`). Manual capture is acceptable where automated recording
is impractical — the goal is a polished demo video, not CI-gated recording.

## Domain Name Tricks

All clients must resolve `*.gov.test` to `127.0.0.1` (or `10.0.2.2` for Android
emulator). Each client has a different mechanism:

### Shared: dnsmasq on localhost

Run a lightweight `dnsmasq` instance resolving `*.gov.test` → `127.0.0.1`:

```sh
# /tmp/dnsmasq-test.conf
address=/gov.test/127.0.0.1
port=5553
no-resolv
no-daemon
```

This is the single source of truth. Each client is configured to use it.

### Per-Client DNS Configuration

| Client | Mechanism |
|--------|-----------|
| Chrome (Playwright) | `--host-resolver-rules="MAP *.gov.test 127.0.0.1"` — no dnsmasq needed |
| Android Emulator | `-dns-server 10.0.2.2:5553` flag at emulator launch (10.0.2.2 = host loopback) |
| iOS Simulator | Inherits macOS `/etc/hosts` — add `127.0.0.1 dept.gov.test cabinet.gov.test` |

### HTTPS

All clients convert `verify:` URLs to `https://`. The backend tiers run plain HTTP
on localhost, so we need a TLS terminator or the clients need to accept HTTP:

- **Chrome:** `--ignore-certificate-errors` + `--allow-insecure-localhost`, or use
  Playwright's `ignoreHTTPSErrors: true`
- **Android:** Network security config allowing cleartext to `*.gov.test` in a
  debug build, or install test CA via `adb`
- **iOS Simulator:** Install test CA profile via `xcrun simctl` + allow cleartext
  in a debug `Info.plist` (`NSAppTransportSecurity` exception for `gov.test`)

Alternatively: run a single `caddy` or `mkcert`-backed reverse proxy on 443 that
terminates TLS and forwards to the plain HTTP backend. This is simpler than
per-client TLS exceptions.

## Backend Harness

`backend-harness.sh` starts and stops the three tiers:

```
Tier 3 (vault):     go run ./backend/tier3-vault --listen 127.0.0.1:9090 --db-path /tmp/fst-badger --no-tls
Tier 2 (inspector): cargo run --manifest-path backend/tier2-inspector/Cargo.toml -- --read-port 8080 --write-port 8081 --tier3 http://127.0.0.1:9090 --no-tls
Tier 1 (edge):      go run ./backend/tier1-edge --listen 127.0.0.1:8080 --upstream http://127.0.0.1:8080 --no-tls
```

Each tier needs a `--no-tls` flag (or equivalent) to skip mTLS when running as
sibling processes. This is a code change to each tier's `main` — guarded behind
a flag, never the default.

`seed-demo-chain.sh` PUTs the test data (meta hashes + claim hashes) via the
Tier 2 write port.

## Chrome Extension

**Platform:** Linux or macOS
**Tooling:** Playwright with `--load-extension` flag

### Approach

1. Start backend harness + seed data
2. Launch Chromium via Playwright with:
   - `--disable-extensions-except=apps/browser-extension`
   - `--load-extension=apps/browser-extension`
   - `--host-resolver-rules="MAP *.gov.test 127.0.0.1"`
   - `ignoreHTTPSErrors: true`
3. Navigate to a test HTML page containing a verifiable claim with
   `verify:dept.gov.test/c` at the bottom
4. Select the claim text (Playwright mouse drag)
5. Right-click → "Verify with Live Verify" (or trigger via extension API message)
6. Assert: extension badge turns green, popup shows "VERIFIED", authority chain
   shows `dept.gov.test` ← `cabinet.gov.test`
7. Playwright's built-in video recording captures the session

### Files

```
full-stack-tests/chrome-extension/
  playwright.config.ts
  gov-chain.spec.ts        # The actual test
  fixtures/
    test-claim.html        # Page with a verifiable government claim
```

### Video

Playwright supports `video: 'on'` in config — produces `.webm` per test.
Sufficient for demo purposes.

## Android App

**Platform:** Linux (or macOS) with Android SDK
**Tooling:** Android Emulator + adb + Gradle

### Approach

1. Start backend harness + seed data + dnsmasq
2. Launch emulator: `emulator -avd test_device -dns-server 10.0.2.2:5553 -no-snapshot`
   - Use a Pixel device profile, API 34+
   - `-gpu swiftshader_indirect` for headless Linux servers, or `-gpu host` with display
3. Build and install debug APK: `./gradlew :app:installDebug`
   - Debug build includes network security config allowing cleartext to `*.gov.test`
4. Push a test document image to the device or display it on-screen for camera capture
   - Simpler: use `adb shell am start` with an intent that injects text directly
     (avoids needing a physical camera pointed at a screen)
   - For video demo: display the test document in a second emulator window or on
     the host screen, point the emulator's virtual camera at it
5. App scans → verifies → shows result with authority chain
6. Record: `adb shell screenrecord /sdcard/demo.mp4` (max 3 min, 1280×720)

### Camera Simulation

The Android emulator supports a "virtual scene" camera that can display an image file:

```sh
# Set the emulator's back camera to show a specific image
emulator -avd test_device -camera-back virtualscene
# Then use Extended Controls > Camera to load the test document image
```

Alternatively, for automated tests without camera:
- Add a debug-only "paste text" entry point in the app that bypasses camera/OCR
- This tests the verification pipeline without needing camera simulation

### Files

```
full-stack-tests/android/
  run-emulator-demo.sh       # Start emulator, install APK, seed, record
  test-document.png          # Rendered claim image for virtual camera
  network_security_config.xml # Cleartext config for *.gov.test (copied into debug build)
```

### Video

`adb shell screenrecord` captures the emulator display. Transfer with
`adb pull /sdcard/demo.mp4`. For a higher-quality recording, use host-side
screen capture (`ffmpeg -f x11grab` on Linux) of the emulator window.

### Can Kotlin Android Run Without an Emulator?

No — not in a way that produces a real UI for video. Robolectric runs tests on
JVM but doesn't render. Waydroid is fragile. The emulator is the right tool here;
it runs on Linux without a physical device.

## iOS App

**Platform:** macOS only (Apple requirement)
**Tooling:** iOS Simulator + xcodebuild + xcrun simctl

### Approach

1. Start backend harness + seed data
2. Add `/etc/hosts` entries: `127.0.0.1 dept.gov.test cabinet.gov.test`
   - iOS Simulator inherits macOS DNS resolution (it's a process, not a VM)
3. Build for simulator: `xcodebuild -scheme LiveVerify -destination 'platform=iOS Simulator,name=iPhone 15 Pro' build`
4. Boot simulator: `xcrun simctl boot "iPhone 15 Pro"`
5. Install app: `xcrun simctl install booted path/to/LiveVerify.app`
6. Launch app: `xcrun simctl launch booted com.liveverify.app`
7. For camera simulation: push a test image and open it, or use the simulator's
   photo library injection (`xcrun simctl addmedia booted test-document.png`)
   - The app uses VisionKit DataScanner which may not work in simulator — fallback
     to a debug "paste text" mode that bypasses camera
8. App verifies → shows result with authority chain
9. Record: `xcrun simctl io booted recordVideo demo.mov`

### Camera Limitation

VisionKit's `DataScannerViewController` requires a physical camera and does not
work in the iOS Simulator. Two options:

- **Debug text entry mode:** Add a debug-only UI that accepts pasted text, bypassing
  the camera. This tests the full verification pipeline without hardware.
- **Physical device:** For the polished demo video, use a real iPhone pointed at a
  printed test document. Record the screen via QuickTime or Xcode.

### Files

```
full-stack-tests/ios/
  run-simulator-demo.sh      # Build, boot, install, record
  test-document.png          # Claim image for photo library injection
```

### Video

`xcrun simctl io booted recordVideo output.mov` captures the simulator screen.
For the camera-based demo, use a physical device with QuickTime screen mirroring.

## Directory Structure

```
full-stack-tests/
  PLAN.md                       # This file
  backend-harness.sh            # Start/stop 3 tiers as plain HTTP processes
  seed-demo-chain.sh            # Seed government authority chain + test claim
  fixtures/
    test-claim.html             # HTML page with verifiable claim
    test-document.png           # Rendered claim image for camera simulation
    cabinet-gov-test-meta.json  # Root authority metadata
    dept-gov-test-meta.json     # Issuer metadata (authorizedBy cabinet)
  chrome-extension/
    playwright.config.ts
    gov-chain.spec.ts
  android/
    run-emulator-demo.sh
    network_security_config.xml
  ios/
    run-simulator-demo.sh
```

## Execution Order

1. **Chrome extension first** — runs anywhere (Linux/macOS), no emulator, fastest feedback loop
2. **Android second** — needs Android SDK + emulator but runs on Linux
3. **iOS last** — macOS only, camera limitations in simulator

## Open Questions

- Do the tier binaries already support `--no-tls`? If not, each tier's `main` needs
  a small change to make TLS optional.
- Should the Android debug build's cleartext exception live in the app's source tree
  (guarded by build variant) or be patched in by the test harness?
- For the demo video: is a composite video (all three clients, split-screen) the goal,
  or three separate clips?
