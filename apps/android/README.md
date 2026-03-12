# Live Verify Android App

Native Android app for camera-based document verification — scan claims on paper with quick mathematical verification.

![Live Verify Android Screenshot](screencap.jpg)

^ Still under development but the app works for a printed test case. This is a screencap from 2022 Pixel 6a running Android 16. As it happens, this is a real-life peer reference.

## Requirements

- Android Studio Hedgehog (2023.1.1) or later
- JDK 17
- Android SDK 35 (Android 15)

## Building

1. Open `apps/android/` folder in Android Studio
2. Sync Gradle files
3. Run on device or emulator (API 26+)

Or from command line:
```bash
./gradlew assembleDebug
```

## Architecture

- **TextNormalizer.kt**: Text normalization matching the JavaScript implementation
- **VerificationLogic.kt**: URL extraction, HTTP verification against issuer endpoints
- **MainActivity.kt**: CameraX preview, ML Kit OCR, verification flow

## Dependencies

- CameraX 1.3.1 - Camera capture
- ML Kit Text Recognition 16.0.0 - OCR
- OkHttp 4.12.0 - HTTP client
- Kotlin Coroutines - Async operations

## Target Configuration

- compileSdk: 35 (Android 15)
- targetSdk: 35
- minSdk: 26 (Android 8.0)

This covers ~95% of active Android devices.

## Testing

Run unit tests:
```bash
./gradlew test
```

Run instrumented tests (requires device/emulator):
```bash
./gradlew connectedAndroidTest
```

### Test Files

- `TextNormalizerTest.kt` - Text normalization, SHA-256 hashing, cross-platform consistency
- `VerificationLogicTest.kt` - URL extraction, cert text extraction, verification flow

**Important:** The `training page Bachelor hash should match JavaScript implementation` test ensures the Kotlin normalization produces identical hashes to the JavaScript implementation. If this test fails, the implementations are out of sync.

## License

Apache License 2.0 (Apache-2.0)
