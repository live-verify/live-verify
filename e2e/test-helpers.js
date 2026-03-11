/*
    Test Orchestration Helpers

    This file contains test-specific orchestration logic that was previously
    embedded in production code. Following "Design for Testability" principles:

    - Production code exposes clean seams for testing
    - Test code (this file) handles mocking, setup, and orchestration
    - Zero test logic ships in production bundle

    This is the Mockito/interface-based testing pattern adapted for JavaScript.
*/

/**
 * Test helper to verify a base64 image through the full pipeline
 * with optional mock verification to avoid network dependencies.
 *
 * This replaces the old window.testVerifyFromCanvas() that had test
 * logic embedded in production code.
 *
 * @param {Page} page - Playwright page object
 * @param {string} base64Image - Base64-encoded image data
 * @param {string} expectedHash - Expected hash for mock comparison (empty string for discovery mode)
 * @param {Object} injectedVerifcationMeta - Optional verification-meta.json to inject (for OCR normalization testing)
 * @returns {Promise<Object>} Test result with success, extracted values, etc.
 */
export async function testVerifyFromBase64(page, base64Image, expectedHash, injectedVerificationMeta = null) {
    // Mock verification-meta.json fetch if provided (Design for Testability: mock at network layer)
    if (injectedVerificationMeta) {
        await page.route('**/verification-meta.json', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(injectedVerificationMeta)
            });
        });
    }

    return await page.evaluate(async ({ base64Image, expectedHash }) => {
        try {
            // Create canvas from base64 image
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = `data:image/png;base64,${base64Image}`;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // TEST ORCHESTRATION: Use liveVerifyApp seams to run pipeline with mocked verification
            const app = window.liveVerifyApp;

            // Reset UI state
            app.resetForTest();

            // Mock verification function (Mockito-style swap)
            let originalVerify = null;
            if (expectedHash) {
                originalVerify = app.verifyAgainstClaimedUrl;
                app.verifyAgainstClaimedUrl = async function(claimedUrl, computedHash) {
                    const matches = computedHash === expectedHash;
                    const { status, result, url } = app.verification;
                    result.style.display = 'block';
                    status.className = 'verification-status';
                    url.innerHTML = `Mock verification: <strong>${claimedUrl}</strong>`;

                    if (matches) {
                        status.textContent = '✅ MOCK VERIFIED - Hash matches expected';
                        status.classList.add('verified');
                        return { status: 200, body: 'OK', mocked: true };
                    } else {
                        status.textContent = `❌ MOCK FAILED - Hash mismatch`;
                        status.classList.add('not-found');
                        return { status: 'HASH_MISMATCH', mocked: true };
                    }
                };
            }

            try {
                // Run the pipeline using production code
                await app.processImageCanvas(canvas, 'Test');

                // Get state and return for assertions (including cropped image)
                const state = app.getState();
                const croppedImg = document.getElementById('croppedImage');
                return {
                    success: true,
                    rawText: state.rawText,
                    normalized: state.normalized,
                    hash: state.hash,
                    baseUrl: state.baseUrl,
                    hashMatches: expectedHash ? (state.hash === expectedHash) : undefined,
                    croppedImageData: croppedImg ? croppedImg.src : null
                };
            } finally {
                // Restore original function (cleanup after mock)
                if (originalVerify) {
                    app.verifyAgainstClaimedUrl = originalVerify;
                }
            }
        } catch (error) {
            return {
                success: false,
                error: error.name || 'EXCEPTION',
                message: error.message || String(error),
                stack: error.stack
            };
        }
    }, { base64Image, expectedHash });
}
