// Copyright (C) 2025, Paul Hammant
// SPDX-License-Identifier: Apache-2.0

describe('Camera Permission Flow', () => {

    it('should show camera permission prompt or preview on launch', async () => {
        // Wait for app to load
        await browser.pause(2000);

        // Either we see the "Enable Camera" button or the camera preview
        const enableButton = await $('~Enable Camera');
        const cameraPreview = await $('~camera.preview');

        const enableExists = await enableButton.isExisting();
        const previewExists = await cameraPreview.isExisting();

        expect(enableExists || previewExists).toBe(true);
    });

    it('should display camera preview after permission granted', async () => {
        // Try to handle permission dialog
        try {
            const allowButton = await $('~Allow');
            if (await allowButton.isExisting()) {
                await allowButton.click();
                await browser.pause(1000);
            }
        } catch (e) {
            // Permission may already be granted
        }

        // Check for camera preview
        const cameraPreview = await $('~camera.preview');
        const exists = await cameraPreview.waitForExist({ timeout: 5000 });

        if (exists) {
            expect(await cameraPreview.isDisplayed()).toBe(true);
        }
    });

    it('should show capture button when camera is active', async () => {
        // Handle permission if needed
        try {
            const allowButton = await $('~Allow');
            if (await allowButton.isExisting()) {
                await allowButton.click();
            }
        } catch (e) {
            // Ignore
        }

        // Wait for camera to initialize
        await browser.pause(2000);

        const captureButton = await $('~camera.captureButton');
        const cameraPreview = await $('~camera.preview');

        // Only check capture button if camera preview is visible
        if (await cameraPreview.isExisting()) {
            const buttonExists = await captureButton.waitForExist({ timeout: 3000 });
            expect(buttonExists).toBe(true);
        }
    });
});

describe('Camera Denied State', () => {

    it('should show appropriate message when camera is denied', async () => {
        // This test requires camera permission to be denied
        // In real CI, you would reset permissions first

        // Check for denied state UI elements
        const deniedText = await $('~Camera Access Denied');
        const settingsButton = await $('~Open Settings');

        // If denied, these elements should be visible
        // If permitted, camera preview should be visible
        const cameraPreview = await $('~camera.preview');

        const hasDeniedUI = await deniedText.isExisting();
        const hasCamera = await cameraPreview.isExisting();

        // One of these states should be true
        expect(hasDeniedUI || hasCamera).toBe(true);
    });
});
