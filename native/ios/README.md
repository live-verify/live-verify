# Live Verify (iOS prototype)

Native Swift prototype for on-device document verification.

Pipeline:

1. Capture photo (on-device camera)
2. OCR (on-device, Apple Vision)
3. Normalize text (same spirit as `public/normalize.js`)
4. SHA-256 (CryptoKit)
5. `GET` the issuer URL implied by the `verify:` line (plus optional `/verification-meta.json`)
6. Show an affirming/denying result

## Privacy model (intent)

- OCR + normalization + hashing are performed on-device.
- The network call is a minimal `GET` to the issuer endpoint (and optionally `/verification-meta.json` for issuer-defined response/normalization rules).
- This is a prototype; production integration would follow the same on-device model.

## Build requirements

- macOS + Xcode (you’ll need to set your own signing team).
- Deployment target is currently set to iOS 17.0 in the project; bump as needed.

## Open in Xcode

- Open `native/ios/LiveVerifyPrototype/LiveVerifyPrototype.xcodeproj`.
- Select a device (camera required) and run.
- Run unit tests via Product → Test.

## What’s intentionally not in this first cut

- Registration-mark detection + perspective correction (the web demo uses OpenCV for this). This prototype OCRs the captured frame.
- Public Suffix List based “registrable domain” extraction (the UI displays the full host).

