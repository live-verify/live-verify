# Live Verify iOS App

SwiftUI iOS app for camera-based document verification — scan claims on paper using iOS Live Text (Vision framework).

## Features

- **iOS Live Text OCR** - Uses Vision framework's `VNRecognizeTextRequest` for text recognition
- **Shared JavaScript Logic** - Runs the same `normalize.js` and `app-logic.js` via JavaScriptCore
- **Native SHA-256** - Uses CryptoKit for fast hashing
- **SwiftUI Interface** - Modern declarative UI with camera preview and results display

## Requirements

- iOS 16.0+
- Xcode 15.0+
- Camera access (physical device required for camera testing)

## Simulator Limitations

The app uses `DataScanner` (from VisionKit) which is Apple's Live Text API. This API checks for Neural Engine hardware which simulators don't properly report having - even when simulating devices that have it (e.g., iPhone 16 Pro).

**Key point:** This doesn't affect the tests. The tests use `VNRecognizeTextRequest` (Vision framework) directly, which *does* work in simulators. The app's DataScanner UI just won't function in simulators - you'll see "Not Supported" even on simulated devices that would support it on real hardware.

## Project Structure

```
LiveVerify/
├── App/
│   ├── LiveVerifyApp.swift      # App entry point
│   └── ContentView.swift        # Main view coordinator
├── Camera/
│   ├── CameraService.swift      # AVFoundation camera management
│   └── CameraView.swift         # SwiftUI camera preview
├── Pipeline/
│   ├── JSBridge.swift           # JavaScriptCore bridge for normalize.js
│   ├── TextRecognizer.swift     # Vision framework OCR
│   ├── SHA256Hasher.swift       # CryptoKit hashing
│   ├── VerificationClient.swift # Network requests
│   └── VerificationPipeline.swift # Main orchestration
├── Views/
│   ├── ResultView.swift         # Results display
│   └── VerificationOverlay.swift # Success/failure overlays
└── Resources/
    ├── Info.plist
    └── JS/
        ├── normalize.js         # Symlink to public/normalize.js
        └── app-logic.js         # Symlink to public/app-logic.js
```

## Building

1. Open `LiveVerify.xcodeproj` in Xcode
2. Select your development team in Signing & Capabilities
3. Build and run on device (camera requires physical device)

```bash
open LiveVerify.xcodeproj
```

## JavaScript Bridge

The app executes the web app's JavaScript directly via JavaScriptCore:

```swift
let bridge = try JSBridge()

// Uses same normalization as web app
let normalized = bridge.normalizeText(rawText, metadata: meta)

// Uses same URL extraction logic
let (url, lineIndex) = bridge.extractVerificationURL(from: text)
```

This ensures identical behavior between web and iOS apps.

## Testing

### Unit Tests

```bash
# Run in Xcode: ⌘U
# Or via command line:
xcodebuild test -scheme LiveVerify -destination 'platform=iOS Simulator,name=iPhone 15 Pro'
```

### UI Tests (XCUITest)

```bash
xcodebuild test -scheme LiveVerifyUITests -destination 'platform=iOS Simulator,name=iPhone 15 Pro'
```

### Appium Tests

```bash
cd Appium
npm install

# Start Appium server
npx appium

# In another terminal, run tests
npm test
```

## Verification Flow

1. **Capture** - User frames document and taps capture button
2. **OCR** - Vision framework extracts text
3. **Extract URL** - JSBridge finds `verify:` or `vfy:` URL
4. **Fetch Metadata** - Optional `verification-meta.json` for normalization rules
5. **Normalize** - JSBridge applies normalization (same as web app)
6. **Hash** - CryptoKit computes SHA-256
7. **Verify** - GET request to verification URL
8. **Display** - Success/failure overlay, then detailed results

## Accessibility Identifiers

For UI testing:

- `camera.captureButton` - Shutter button
- `camera.preview` - Camera preview view
- `overlay.processing` - Processing spinner overlay
- `overlay.verificationResult` - Success/failure overlay
- `result.verificationStatus` - Status banner
- `result.hashValue` - SHA-256 hash display
- `result.verifyAnotherButton` - Return to camera button
- `result.reVerifyButton` - Re-verify with edited text

## License

Apache License 2.0 (Apache-2.0)
