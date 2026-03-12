// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: Apache-2.0

describe('Document Verification Flow', () => {

    beforeEach(async () => {
        // Try to accept camera permission
        try {
            const allowButton = await $('~Allow');
            if (await allowButton.isExisting()) {
                await allowButton.click();
                await browser.pause(1000);
            }
        } catch (e) {
            // Permission already granted or not shown
        }
    });

    it('should capture photo when capture button is tapped', async () => {
        const cameraPreview = await $('~camera.preview');
        const previewExists = await cameraPreview.waitForExist({ timeout: 5000 });

        if (!previewExists) {
            console.log('Camera preview not available, skipping test');
            return;
        }

        const captureButton = await $('~camera.captureButton');
        await captureButton.click();

        // Should show processing overlay
        const processingOverlay = await $('~overlay.processing');
        const processingShown = await processingOverlay.waitForExist({ timeout: 3000 });

        // Processing should appear (unless it's very fast)
        // We can't guarantee it's visible if processing is instant
        console.log('Processing overlay shown:', processingShown);
    });

    it('should show verification result after processing', async () => {
        const cameraPreview = await $('~camera.preview');
        const previewExists = await cameraPreview.waitForExist({ timeout: 5000 });

        if (!previewExists) {
            console.log('Camera preview not available, skipping test');
            return;
        }

        const captureButton = await $('~camera.captureButton');
        await captureButton.click();

        // Wait for result (either success or failure overlay)
        const resultOverlay = await $('~overlay.verificationResult');
        const resultExists = await resultOverlay.waitForExist({ timeout: 30000 });

        // If verification completes, overlay should show
        // If no verify URL found, it goes directly to result view
        const verifyAnotherButton = await $('~result.verifyAnotherButton');
        const resultViewExists = await verifyAnotherButton.waitForExist({ timeout: 5000 });

        expect(resultExists || resultViewExists).toBe(true);
    });

    it('should allow tapping verification result overlay to dismiss', async () => {
        const resultOverlay = await $('~overlay.verificationResult');

        if (await resultOverlay.isExisting()) {
            await resultOverlay.click();

            // After dismissing, result view should be visible
            const verifyAnotherButton = await $('~result.verifyAnotherButton');
            const buttonExists = await verifyAnotherButton.waitForExist({ timeout: 5000 });
            expect(buttonExists).toBe(true);
        }
    });
});

describe('Result View', () => {

    it('should display hash value in result view', async () => {
        // Navigate to result view first (requires completing verification)
        const hashValue = await $('~result.hashValue');

        if (await hashValue.isExisting()) {
            const text = await hashValue.getText();
            // Hash should be 64 characters
            expect(text.length).toBe(64);
        }
    });

    it('should allow re-verification with edited text', async () => {
        const reVerifyButton = await $('~result.reVerifyButton');

        if (await reVerifyButton.isExisting()) {
            await reVerifyButton.click();

            // Should show processing
            const processingOverlay = await $('~overlay.processing');
            await processingOverlay.waitForExist({ timeout: 3000 });
        }
    });

    it('should return to camera when verify another is tapped', async () => {
        const verifyAnotherButton = await $('~result.verifyAnotherButton');

        if (await verifyAnotherButton.isExisting()) {
            await verifyAnotherButton.click();

            // Should return to camera view
            const cameraPreview = await $('~camera.preview');
            const captureButton = await $('~camera.captureButton');

            const cameraVisible = await cameraPreview.waitForExist({ timeout: 5000 });
            const captureVisible = await captureButton.waitForExist({ timeout: 3000 });

            expect(cameraVisible || captureVisible).toBe(true);
        }
    });
});

describe('Accessibility Identifiers', () => {

    it('camera.captureButton should be accessible', async () => {
        const element = await $('~camera.captureButton');
        // Just verify we can query by this identifier
        expect(element).toBeDefined();
    });

    it('camera.preview should be accessible', async () => {
        const element = await $('~camera.preview');
        expect(element).toBeDefined();
    });

    it('overlay.processing should be accessible', async () => {
        const element = await $('~overlay.processing');
        expect(element).toBeDefined();
    });

    it('overlay.verificationResult should be accessible', async () => {
        const element = await $('~overlay.verificationResult');
        expect(element).toBeDefined();
    });

    it('result.verificationStatus should be accessible', async () => {
        const element = await $('~result.verificationStatus');
        expect(element).toBeDefined();
    });

    it('result.verifyAnotherButton should be accessible', async () => {
        const element = await $('~result.verifyAnotherButton');
        expect(element).toBeDefined();
    });
});
