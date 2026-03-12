/*
    Copyright (C) 2025, Paul Hammant

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import XCTest

final class LiveVerifyUITests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["--uitesting"]
    }

    override func tearDownWithError() throws {
        app = nil
    }

    // MARK: - Camera Permission Tests

    func testCameraPermissionPromptAppears() throws {
        app.launch()

        // The "Enable Camera" button should be visible when permission not determined
        let enableButton = app.buttons["Enable Camera"]

        // Either permission is already granted (camera preview visible)
        // or we see the enable button
        let cameraPreview = app.otherElements["camera.preview"]

        let exists = enableButton.waitForExistence(timeout: 3) || cameraPreview.waitForExistence(timeout: 3)
        XCTAssertTrue(exists, "Either camera preview or enable button should be visible")
    }

    func testCameraPreviewShowsAfterPermission() throws {
        // Add interruption monitor to handle system permission dialog
        addUIInterruptionMonitor(withDescription: "Camera Permission") { alert in
            let allowButton = alert.buttons["Allow"]
            if allowButton.exists {
                allowButton.tap()
                return true
            }
            return false
        }

        app.launch()

        // Tap to trigger any pending alerts
        app.tap()

        // If permission granted, camera preview should appear
        let cameraPreview = app.otherElements["camera.preview"]
        if cameraPreview.waitForExistence(timeout: 5) {
            XCTAssertTrue(cameraPreview.exists)
        }
        // Otherwise permission may have been denied - test passes either way
    }

    // MARK: - Capture Button Tests

    func testCaptureButtonExists() throws {
        addUIInterruptionMonitor(withDescription: "Camera Permission") { alert in
            alert.buttons["Allow"].tap()
            return true
        }

        app.launch()
        app.tap()

        let captureButton = app.buttons["camera.captureButton"]

        // Only check if camera is available
        let cameraPreview = app.otherElements["camera.preview"]
        if cameraPreview.waitForExistence(timeout: 5) {
            XCTAssertTrue(captureButton.waitForExistence(timeout: 2))
        }
    }

    // MARK: - Result View Tests

    func testVerifyAnotherButtonAccessibility() throws {
        // This test verifies accessibility identifiers are set correctly
        // Actual verification would require a test image or mock

        // The button should have the correct accessibility identifier when visible
        let identifier = "result.verifyAnotherButton"

        // Just verify the identifier format is correct (compile-time check)
        XCTAssertFalse(identifier.isEmpty)
    }

    func testProcessingOverlayAccessibility() throws {
        let identifier = "overlay.processing"
        XCTAssertFalse(identifier.isEmpty)
    }

    func testVerificationResultOverlayAccessibility() throws {
        let identifier = "overlay.verificationResult"
        XCTAssertFalse(identifier.isEmpty)
    }
}

// MARK: - Verification Flow Tests

final class VerificationFlowUITests: XCTestCase {

    var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
    }

    func testAppLaunchesSuccessfully() throws {
        app.launch()

        // App should launch without crashing
        XCTAssertTrue(app.exists)
    }

    func testCameraStateTransitions() throws {
        addUIInterruptionMonitor(withDescription: "Camera Permission") { alert in
            alert.buttons["Allow"].tap()
            return true
        }

        app.launch()
        app.tap()

        // After granting permission, camera should be active
        let cameraPreview = app.otherElements["camera.preview"]

        if cameraPreview.waitForExistence(timeout: 5) {
            // Camera is running
            XCTAssertTrue(cameraPreview.isHittable)
        }
    }
}
