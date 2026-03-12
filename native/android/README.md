# Live Verify (Android prototype)

Native Kotlin prototype for on-device document verification.

Pipeline:

1. Capture photo (CameraX)
2. OCR (on-device, ML Kit Text Recognition)
3. Normalize text (mirrors the intent of `public/normalize.js`)
4. SHA-256
5. `GET` the issuer URL implied by the `verify:` line (plus optional `/verification-meta.json`)
6. Show an affirming/denying result

## Privacy model (intent)

- OCR + normalization + hashing are performed on-device.
- The network call is a minimal `GET` to the issuer endpoint (and optionally `/verification-meta.json` for issuer-defined response/normalization rules).
- This is a prototype; production integration would follow the same on-device model.

## Open in Android Studio

- Open `native/android/` as a project.
- Sync Gradle (it will download dependencies the first time).
- Run unit tests in `app/src/test/` (pure Kotlin logic tests).

## Build from CLI

- `cd native/android`
- List tasks: `./gradlew :app:tasks`
- Unit tests: `./gradlew :app:testDebugUnitTest`
- Debug APK: `./gradlew :app:assembleDebug`
- Install on device/emulator: `./gradlew :app:installDebug`
- Instrumented tests (device/emulator): `./gradlew :app:connectedDebugAndroidTest`

### Installing to a specific device (when an emulator is also running)

By default, `:app:installDebug` installs to **all** connected, compatible devices. If you only see an emulator in the output, your phone is not visible to `adb` yet (often because USB debugging isn’t enabled, or you haven’t accepted the RSA prompt).

To target the Galaxy J5 explicitly:

- Find the device serial: `adb devices -l`
- Build the APK: `./gradlew :app:assembleDebug`
- Install to the J5:
  - `adb -s <J5_SERIAL> install -r app/build/outputs/apk/debug/app-debug.apk`

To avoid installing to the emulator, stop it (example): `adb -s emulator-5554 emu kill`

## Notes

- This first cut does **not** implement registration-mark detection + perspective correction.
- Domain “registrable authority” display uses the full host for now (no Public Suffix List integration yet).
