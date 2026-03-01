/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// Camera and UI Elements
const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const startCameraBtn = document.getElementById('startCamera');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const stopCameraBtn = document.getElementById('stopCamera');
const statusIndicator = document.getElementById('statusIndicator');
const progressBar = document.getElementById('progressBar');

// Build timestamp easter egg
const BUILD_TIMESTAMP = '2025-10-25T16:45:43.080Z';
const appTitle = document.getElementById('appTitle');
const buildTimestamp = document.getElementById('buildTimestamp');

appTitle.style.cursor = 'pointer';
appTitle.addEventListener('click', () => {
    // Format timestamp to be human-friendly and local with timezone
    const date = new Date(BUILD_TIMESTAMP);
    const formatted = date.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZoneName: 'short'
    });
    buildTimestamp.textContent = `Build: ${formatted}`;
    buildTimestamp.style.display = 'block';
    setTimeout(() => {
        buildTimestamp.style.display = 'none';
    }, 2000);
});

// Result Elements
const textResult = document.getElementById('textResult');
const croppedImage = document.getElementById('croppedImage');
const extractedText = document.getElementById('extractedText');
const normalizedText = document.getElementById('normalizedText');
const hashResult = document.getElementById('hashResult');
const hashValue = document.getElementById('hashValue');
const copyHashBtn = document.getElementById('copyHash');
const verificationResult = document.getElementById('verificationResult');
const verificationStatus = document.getElementById('verificationStatus');
const verificationDetails = document.getElementById('verificationDetails');
const verificationDisclaimer = document.getElementById('verificationDisclaimer');
const verifyAnotherBtn = document.getElementById('verifyAnotherBtn');
const resubmitBtn = document.getElementById('resubmitBtn');
// Capture info elements (for user-facing diagnostics)
const captureInfo = document.getElementById('captureInfo');
const captureMethodEl = document.getElementById('captureMethod');
const captureResolutionEl = document.getElementById('captureResolution');

// Camera-native overlay elements
const successOverlay = document.getElementById('successOverlay');
const successDomain = document.getElementById('successDomain');
const failureOverlay = document.getElementById('failureOverlay');
const failureReason = document.getElementById('failureReason');
const processingOverlay = document.getElementById('processingOverlay');
const processingText = document.getElementById('processingText');
const resultsSection = document.querySelector('.results-section');

let stream = null;
let deviceOrientation = { alpha: 0, beta: 0, gamma: 0 };
let currentBaseUrl = null; // Store base URL for re-verification when user edits normalized text
const metaCache = {}; // Cache verification-meta.json by URL

// Get meta from cache or fetch it
async function getVerificMeta(baseUrl) {
    if (!baseUrl) return null;
    if (metaCache[baseUrl] !== undefined) {
        return metaCache[baseUrl];
    }
    const meta = await fetchVerificationMeta(baseUrl);
    metaCache[baseUrl] = meta; // Cache even if null (to avoid re-fetching 404s)
    return meta;
}

// Debug console for mobile
const debugConsole = document.getElementById('debugConsole');
const debugLogs = [];
function debugLog(msg) {
    const timestamp = new Date().toLocaleTimeString();
    debugLogs.push(`${timestamp}: ${msg}`);
    if (debugLogs.length > 10) debugLogs.shift();
    debugConsole.textContent = debugLogs.join('\n');
    debugConsole.style.display = 'block';
    console.log(msg); // Also log to real console
}

// ============================================================================
// Camera-native overlay functions
// ============================================================================

function showProcessingOverlay(text) {
    processingText.textContent = text;
    processingOverlay.style.display = 'flex';
    successOverlay.style.display = 'none';
    failureOverlay.style.display = 'none';
}

function hideProcessingOverlay() {
    processingOverlay.style.display = 'none';
}

function showSuccessOverlay(domain) {
    hideProcessingOverlay();
    successDomain.textContent = domain;
    successOverlay.style.display = 'flex';
    failureOverlay.style.display = 'none';

    // Hide results section on success
    resultsSection.classList.remove('show-failure');
}

function showFailureOverlay(reason) {
    hideProcessingOverlay();
    failureReason.textContent = reason;
    failureOverlay.style.display = 'flex';
    successOverlay.style.display = 'none';
}

function hideAllOverlays() {
    processingOverlay.style.display = 'none';
    successOverlay.style.display = 'none';
    failureOverlay.style.display = 'none';
    resultsSection.classList.remove('show-failure');
}

// Success overlay tap handler - dismiss and return to camera
successOverlay.addEventListener('click', () => {
    hideAllOverlays();

    // Reset for next scan
    currentBaseUrl = null;
    resubmitBtn.style.display = 'none';

    // Clear the frozen viewfinder
    const overlayCtx = overlay.getContext('2d');
    overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

    // Show camera section and capture button
    document.querySelector('.camera-section').style.display = '';
    captureBtn.style.display = 'flex';
    captureBtn.disabled = false;
    retakeBtn.style.display = 'none';
});

// Failure overlay tap handler - show details panel
failureOverlay.addEventListener('click', () => {
    failureOverlay.style.display = 'none';

    // Show the failure details panel
    resultsSection.classList.add('show-failure');

    // Show retake button
    retakeBtn.style.display = '';
});

async function startStreamWithConstraintsSequence() {
    const attempts = [
        {
            label: '4K',
            constraints: {
                video: {
                    facingMode: { exact: 'environment' },
                    width: { exact: 3840 },
                    height: { exact: 2160 },
                    frameRate: { ideal: 30, max: 60 }
                }
            }
        },
        {
            label: '1080p',
            constraints: {
                video: {
                    facingMode: { exact: 'environment' },
                    width: { exact: 1920 },
                    height: { exact: 1080 },
                    frameRate: { ideal: 30, max: 60 }
                }
            }
        },
        {
            label: '720p',
            constraints: {
                video: {
                    facingMode: { exact: 'environment' },
                    width: { exact: 1280 },
                    height: { exact: 720 },
                    frameRate: { ideal: 30, max: 60 }
                }
            }
        }
    ];

    let lastError = null;
    for (const attempt of attempts) {
        try {
            console.log(`Requesting camera at ${attempt.label}...`);
            const s = await navigator.mediaDevices.getUserMedia(attempt.constraints);
            return s;
        } catch (e) {
            console.warn(`Failed ${attempt.label} constraints`, e);
            lastError = e;
        }
    }
    throw lastError || new Error('Unable to access camera with provided constraints');
}

// Tab switching functionality
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        switchToTab(tabName);
    });
});

// Helper function to switch tabs
function switchToTab(tabName) {
    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    // Add active class to clicked button and corresponding pane
    const btn = document.querySelector(`[data-tab="${tabName}"]`);
    if (btn) btn.classList.add('active');
    const pane = document.getElementById(`tab-${tabName}`);
    if (pane) pane.classList.add('active');
}

// Update status indicator
function updateStatus(icon, text, color = '#4a5568') {
    statusIndicator.querySelector('.status-icon').textContent = icon;
    statusIndicator.querySelector('.status-text').textContent = text;
    statusIndicator.querySelector('.status-text').style.color = color;
}

// Reset UI when camera stops (called when stream ends)
function resetCameraUI() {
    startCameraBtn.style.display = '';
    startCameraBtn.disabled = false;
    captureBtn.style.display = 'none';
    captureBtn.disabled = true;
    retakeBtn.style.display = 'none';
    stopCameraBtn.disabled = true;
    updateStatus('📷', 'Ready to scan', '#4a5568');
}

// Track device orientation for rotation detection
if (window.DeviceOrientationEvent) {
    // iOS 13+ requires permission
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // Don't request yet - will request when camera starts
    } else {
        window.addEventListener('deviceorientation', (event) => {
            deviceOrientation = {
                alpha: event.alpha || 0,
                beta: event.beta || 0,
                gamma: event.gamma || 0
            };
        });
    }
}

// Start Camera
startCameraBtn.addEventListener('click', async () => {
    try {
        updateStatus('📷', 'Enabling camera...', '#667eea');

        stream = await startStreamWithConstraintsSequence();

        // Request DeviceOrientation permission on iOS 13+
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceOrientationEvent.requestPermission();
                if (permission === 'granted') {
                    window.addEventListener('deviceorientation', (event) => {
                        deviceOrientation = {
                            alpha: event.alpha || 0,
                            beta: event.beta || 0,
                            gamma: event.gamma || 0
                        };
                    });
                    console.log('DeviceOrientation permission granted');
                } else {
                    console.warn('DeviceOrientation permission denied');
                }
            } catch (e) {
                console.warn('DeviceOrientation permission request failed:', e);
            }
        }

        // Attach stream to video (viewfinder), but treat it as optional UI now
        video.srcObject = stream;

        // Diagnostics and guidance
        const settings = stream.getVideoTracks()[0].getSettings?.() || {};
        console.log('Actual camera settings (preview track):', settings);
        updateStatus('✅', 'Camera active - fill the frame; marks just off-screen', '#48bb78');
        captureInfo.style.display = 'block';
        captureMethodEl.textContent = 'Capture method: Preview (waiting for capture)';
        const width = settings.width || video.videoWidth || '-';
        const height = settings.height || video.videoHeight || '-';
        captureResolutionEl.textContent = `Resolution: ${width} x ${height} (preview)`;

        // Listen for when the stream ends (e.g., iOS stops camera when page loses focus)
        stream.getTracks().forEach(track => {
            track.addEventListener('ended', () => {
                console.log('Camera track ended (likely due to browser/OS stopping it)');
                video.srcObject = null;
                stream = null;
                resetCameraUI();
            });
        });

        startCameraBtn.style.display = 'none';
        captureBtn.style.display = 'flex';
        captureBtn.disabled = false;
        stopCameraBtn.disabled = false;
        retakeBtn.style.display = 'none'; // Hide retake until after capture

        updateStatus('✅', 'Camera active - fill the frame; marks just off-screen', '#48bb78');
    } catch (error) {
        console.error('Error accessing camera:', error);
        updateStatus('❌', 'Camera access denied', '#f56565');
        alert('Unable to access camera. Please grant camera permissions.');
    }
});

// Stop Camera
stopCameraBtn.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        stream = null;
    }

    // Hide all overlays and results
    hideAllOverlays();
    textResult.style.display = 'none';
    hashResult.style.display = 'none';
    verificationResult.style.display = 'none';
    debugConsole.style.display = 'none';

    // Reset for next scan
    currentBaseUrl = null;
    resubmitBtn.style.display = 'none';

    resetCameraUI();
});

// Retake button - clear results and show capture button again
retakeBtn.addEventListener('click', () => {
    // Hide all overlays and results
    hideAllOverlays();
    textResult.style.display = 'none';
    hashResult.style.display = 'none';
    verificationResult.style.display = 'none';
    debugConsole.style.display = 'none';

    // Reset for next scan
    currentBaseUrl = null;
    resubmitBtn.style.display = 'none';

    // Show camera section again
    document.querySelector('.camera-section').style.display = '';

    // Clear the frozen viewfinder overlay
    const overlayCtx = overlay.getContext('2d');
    overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

    // Show capture button again
    captureBtn.style.display = 'flex';
    captureBtn.disabled = false;
    retakeBtn.style.display = 'none';
});

// Verify Another button - same behavior as Retake
verifyAnotherBtn.addEventListener('click', () => {
    // Hide all overlays and results
    hideAllOverlays();
    textResult.style.display = 'none';
    hashResult.style.display = 'none';
    verificationResult.style.display = 'none';
    verificationDisclaimer.style.display = 'none';
    verifyAnotherBtn.style.display = 'none';
    debugConsole.style.display = 'none';

    // Reset for next scan
    currentBaseUrl = null;
    resubmitBtn.style.display = 'none';

    // Show camera section again
    document.querySelector('.camera-section').style.display = '';

    // Clear the frozen viewfinder overlay
    const overlayCtx = overlay.getContext('2d');
    overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

    // Show capture button again
    captureBtn.style.display = 'flex';
    captureBtn.disabled = false;
    retakeBtn.style.display = 'none';
});

// Core processing function - extracted for testability
// Processes a canvas through the full OCR-to-hash verification pipeline
async function processImageCanvas(canvas, captureMethod = 'Unknown') {
    // Update capture diagnostics visible to user
    captureInfo.style.display = 'block';
    captureMethodEl.textContent = `Capture method: ${captureMethod}`;
    captureResolutionEl.textContent = `Resolution: ${canvas.width} x ${canvas.height}`;

    // Freeze the viewfinder by drawing the captured image onto the overlay canvas (if video exists)
    if (video && video.clientWidth > 0) {
        overlay.width = video.clientWidth;
        overlay.height = video.clientHeight;
        const overlayCtx = overlay.getContext('2d');
        overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
        overlayCtx.drawImage(canvas, 0, 0, overlay.width, overlay.height);
    }

    // Show processing overlay (camera-native UX)
    showProcessingOverlay('Detecting...');

    // Run OpenCV-based detection (always-on, no silent fallback)
    await (window.cvReady || Promise.reject(new Error('Computer vision not ready')));
    const detection = await window.detectSquaresFromCanvas(canvas);

    if (!detection.ok) {
        // Expected failure: user needs to adjust framing
        croppedImage.src = canvas.toDataURL();
        textResult.style.display = 'block';

        showFailureOverlay('No registration marks found');
        return; // Early return, not an exception
    }

    let cropped = detection.croppedCanvas;

    // Try OCR at multiple orientations and pick the best one
    // Order by likelihood: 0° most common, 90°/270° sideways, 180° very unlikely
    showProcessingOverlay('Reading text...');
    debugLog('Trying orientations (0°, 90°, 270°, 180°)...');

    const orientations = [
        { rotation: 0, canvas: cropped },
        { rotation: 90, canvas: rotateCanvas(cropped, 90) },
        { rotation: 270, canvas: rotateCanvas(cropped, 270) },
        { rotation: 180, canvas: rotateCanvas(cropped, 180) }
    ];

    let bestResult = null;
    let bestConfidence = 0;
    let bestRotation = 0;

    for (const { rotation, canvas } of orientations) {
        try {
            const result = await Tesseract.recognize(canvas.toDataURL(), 'eng', {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        debugLog(`OCR ${rotation}°: ${Math.round(m.progress * 100)}%`);
                    }
                }
            });

            const confidence = result.data.confidence || 0;
            debugLog(`${rotation}°: confidence ${confidence.toFixed(1)}`);

            if (confidence > bestConfidence) {
                bestConfidence = confidence;
                bestResult = result;
                bestRotation = rotation;
            }
        } catch (e) {
            debugLog(`${rotation}° failed: ${e.message}`);
        }
    }

    if (!bestResult) {
        // Expected failure: OCR couldn't extract text at any rotation
        croppedImage.src = cropped.toDataURL();
        textResult.style.display = 'block';

        showFailureOverlay('Could not read text');
        return; // Early return, not an exception
    }

    debugLog(`Best: ${bestRotation}° (conf: ${bestConfidence.toFixed(1)})`);

    // Use the best orientation
    if (bestRotation !== 0) {
        cropped = rotateCanvas(cropped, bestRotation);
    }

    // Display the correctly oriented cropped image
    croppedImage.src = cropped.toDataURL();
    textResult.style.display = 'block';

    const rawText = bestResult.data.text;
    console.log('Raw OCR Text:', rawText);

    // Display extracted text and switch to extracted tab
    extractedText.textContent = rawText;
    switchToTab('extracted');

    // Extract verification URL (using app-logic.js)
    const { url: baseUrl, urlLineIndex } = extractVerificationUrl(rawText);

    if (!baseUrl) {
        // Expected failure: No verification URL found in OCR text
        croppedImage.src = cropped.toDataURL();
        textResult.style.display = 'block';
        extractedText.textContent = rawText;
        switchToTab('extracted');

        showFailureOverlay('No verify: URL recognized');
        console.log('OCR did not find verify: or vfy: prefix. Raw text:', rawText);
        return; // Early return, not an exception
    }

    currentBaseUrl = baseUrl; // Store for re-verification when user edits normalized text
    debugLog(`Base URL: ${baseUrl.substring(0, 40)}...`);
    console.log('Base URL:', baseUrl);

    // Extract certification text (using app-logic.js)
    const certText = extractCertText(rawText, urlLineIndex);
    debugLog(`Cert text: ${certText.substring(0, 50)}...`);

    // Fetch verification-meta.json for OCR normalization rules (if available)
    const meta = await getVerificMeta(baseUrl);
    if (meta) {
        console.log('Using normalization rules from verification-meta.json:', meta);
    }

    // Clean OCR artifacts then normalize text
    showProcessingOverlay('Normalizing...');
    const cleanedText = cleanOcrArtifacts(certText);
    const normalized = normalizeText(cleanedText, meta);
    debugLog(`Normalized: ${normalized.length} chars`);
    console.log('Normalized Text:', normalized);

    // Display normalized text and switch to normalized tab
    normalizedText.value = normalized;
    switchToTab('normalized');

    // Generate SHA-256 hash
    showProcessingOverlay('Verifying...');
    const hash = await sha256(normalized);
    console.log('SHA-256 Hash:', hash);

    hashValue.textContent = hash;
    hashResult.style.display = 'block';

    // Build full verification URL (converts verify: to https:// and appends hash)
    const fullVerificationUrl = buildVerificationUrl(baseUrl, hash);
    console.log('Full Verification URL:', fullVerificationUrl);

    // Verify against the full URL
    const verifyResult = await verifyAgainstClaimedUrl(fullVerificationUrl, hash);

    // If 404, try fetching verification-meta.json and retry with optimized OCR
    if (verifyResult.status === 404) {
        console.log('Got 404, attempting to fetch verification-meta.json for optimized OCR retry...');
        showProcessingOverlay('Retrying...');

        const meta = await fetchVerificationMeta(baseUrl);

        if (meta && meta.tesseract) {
            console.log('Found verification-meta.json, retrying OCR with optimized settings:', meta.tesseract);
            debugLog('Retrying OCR with domain-specific settings...');

            // Retry OCR with optimized Tesseract settings

            const orientations = [
                { rotation: 0, canvas: cropped },
                { rotation: 90, canvas: rotateCanvas(cropped, 90) },
                { rotation: 270, canvas: rotateCanvas(cropped, 270) },
                { rotation: 180, canvas: rotateCanvas(cropped, 180) }
            ];

            let retryBestResult = null;
            let retryBestConfidence = 0;
            let retryBestRotation = 0;

            for (const { rotation, canvas } of orientations) {
                try {
                    const result = await Tesseract.recognize(canvas.toDataURL(), meta.tesseract.lang || 'eng', meta.tesseract);
                    const confidence = result.data.confidence || 0;
                    debugLog(`Retry ${rotation}°: confidence ${confidence.toFixed(1)}`);

                    if (confidence > retryBestConfidence) {
                        retryBestConfidence = confidence;
                        retryBestResult = result;
                        retryBestRotation = rotation;
                    }
                } catch (e) {
                    debugLog(`Retry ${rotation}° failed: ${e.message}`);
                }
            }

            if (retryBestResult) {
                debugLog(`Retry best: ${retryBestRotation}° (conf: ${retryBestConfidence.toFixed(1)})`);

                // Re-process with new OCR result
                const retryRawText = retryBestResult.data.text;
                console.log('Retry OCR Text:', retryRawText);

                const { url: retryBaseUrl, urlLineIndex: retryUrlLineIndex } = extractVerificationUrl(retryRawText);
                const retryCertText = extractCertText(retryRawText, retryUrlLineIndex);
                const retryCleanedText = cleanOcrArtifacts(retryCertText);
                const retryNormalized = normalizeText(retryCleanedText, meta);
                const retryHash = await sha256(retryNormalized);

                console.log('Retry SHA-256 Hash:', retryHash);
                hashValue.textContent = retryHash;

                const retryFullUrl = buildVerificationUrl(retryBaseUrl, retryHash);
                console.log('Retry Verification URL:', retryFullUrl);

                // Try verification again
                await verifyAgainstClaimedUrl(retryFullUrl, retryHash);
            } else {
                console.log('Retry OCR also failed at all orientations');
            }
        } else {
            console.log('No verification-meta.json found or no tesseract settings');
        }
    }

    // Hide processing overlay (success/failure overlay already shown by verifyAgainstClaimedUrl)
    hideProcessingOverlay();

    // Enable manual editing of normalized text with auto re-verification (for failure cases)
    setupNormalizedTextEditor();
}

// Capture and process
captureBtn.addEventListener('click', async () => {
    try {
        captureBtn.style.display = 'none'; // Hide button during processing

        // Reset for new capture
        currentBaseUrl = null;
        resubmitBtn.style.display = 'none';

        // Hide previous results and reset to cropped image tab
        textResult.style.display = 'none';
        hashResult.style.display = 'none';
        verificationResult.style.display = 'none';

        // Start at captured image tab (will advance as pipeline progresses)
        switchToTab('captured');

        // Capture the image FIRST (shutter action)
        updateStatus('📸', 'Capturing...', '#667eea');

        // Prefer high-res still photo via ImageCapture API
        const track = stream.getVideoTracks()[0];
        let imageBitmap = null;
        let usedMethod = 'Video frame';
        if ('ImageCapture' in window) {
            try {
                const ic = new ImageCapture(track);
                const photo = await ic.takePhoto(); // Blob
                imageBitmap = await createImageBitmap(photo);
                console.log('Captured still via ImageCapture:', photo.type, photo.size, photo);
                usedMethod = 'ImageCapture.takePhoto()';
            } catch (e) {
                console.warn('ImageCapture.takePhoto failed, falling back to canvas frame', e);
            }
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (imageBitmap) {
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            ctx.drawImage(imageBitmap, 0, 0);
        } else {
            // Fallback to current video frame
            const vw = video.videoWidth || (video.srcObject ? (stream.getVideoTracks()[0].getSettings().width || 1280) : 1280);
            const vh = video.videoHeight || (video.srcObject ? (stream.getVideoTracks()[0].getSettings().height || 720) : 720);
            canvas.width = vw;
            canvas.height = vh;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        // Call the extracted processing function
        await processImageCanvas(canvas, usedMethod);

    } catch (error) {
        console.error('Error processing image:', error);
        hideProcessingOverlay();

        // Log error
        debugLog(`ERROR: ${error.message || error}`);

        // Show failure overlay with error
        showFailureOverlay('Processing error');
    }
});

// rotateCanvas(), extractVerificationUrl(), extractCertText(), hashMatchesUrl(), buildVerificationUrl(), fetchVerificationMeta() are loaded from app-logic.js
// normalizeText() and sha256() are loaded from normalize.js

// Setup event listeners for manual editing of normalized text (one-time setup)
let normalizedTextListenersSetup = false; // True once listeners are attached (never reset)
let originalNormalizedText = ''; // Track original text to detect changes (reset per capture)

function setupNormalizedTextEditor() {
    // Store original text for this capture
    originalNormalizedText = normalizedText.value;

    // Only attach listeners once globally (not per capture)
    if (normalizedTextListenersSetup) return;
    normalizedTextListenersSetup = true;

    // Show re-verify button when text changes
    normalizedText.addEventListener('input', () => {
        const hasChanged = normalizedText.value !== originalNormalizedText;
        resubmitBtn.style.display = hasChanged ? 'inline-block' : 'none';
    });

    // Handle re-verify button click
    resubmitBtn.addEventListener('click', async () => {
        try {
            const editedText = normalizedText.value;
            console.log('User clicked re-verify, re-hashing and re-verifying...');

            // Hide the button while processing
            resubmitBtn.style.display = 'none';
            showProcessingOverlay('Re-verifying...');

            // Generate new SHA-256 hash
            const hash = await sha256(editedText);
            console.log('New SHA-256 Hash:', hash);
            hashValue.textContent = hash;

            // Build full verification URL
            if (currentBaseUrl) {
                const fullVerificationUrl = buildVerificationUrl(currentBaseUrl, hash);
                console.log('New Verification URL:', fullVerificationUrl);

                // Re-verify
                await verifyAgainstClaimedUrl(fullVerificationUrl, hash);

                // Update original text after successful verify
                originalNormalizedText = editedText;
            } else {
                console.warn('No base URL available for re-verification');
                hideProcessingOverlay();
            }
        } catch (error) {
            console.error('Error re-verifying edited text:', error);
            hideProcessingOverlay();
            // Show button again on error so user can retry
            resubmitBtn.style.display = 'inline-block';
        }
    });
}

// Verify against the claimed URL (returns status code for retry logic)
async function verifyAgainstClaimedUrl(claimedUrl, computedHash) {
    // Prepare results section (hidden until failure tap)
    verificationResult.style.display = 'block';
    verificationStatus.className = 'verification-status';

    // Extract domain/authority for display
    const authority = extractDomainAuthority(claimedUrl);

    // Get meta config (cached) - fetch early so it's available for all outcomes
    const meta = await getVerificMeta(currentBaseUrl);
    const metaInfo = meta
        ? `<small style="color: #4ade80;">verification-meta.json: ${JSON.stringify(meta)}</small>`
        : `<small style="color: #fbbf24;">no verification-meta.json</small>`;

    // Check if the URL contains the hash (using app-logic.js)
    if (!hashMatchesUrl(claimedUrl, computedHash)) {
        verificationStatus.textContent = `Hash not found at claimed URL`;
        verificationDetails.innerHTML = `<small style="color: rgba(255,255,255,0.6);">${claimedUrl}</small><br>${metaInfo}`;
        verificationStatus.classList.add('not-found');
        console.log('Hash mismatch: computed hash not in claimed URL');

        textResult.style.display = 'block';
        showFailureOverlay('Hash mismatch');
        return { status: 'HASH_MISMATCH' };
    }

    // Set initial details (will be updated if error occurs)
    verificationDetails.innerHTML = `<small style="color: rgba(255,255,255,0.6);">${claimedUrl}</small><br>${metaInfo}`;

    // Fetch the URL and verify response
    try {
        let fetchUrl = claimedUrl;

        // Check for appendToHashFileName config (e.g., "/" for GitHub Pages, ".json" for other hosts)
        if (meta && meta.appendToHashFileName) {
            fetchUrl = claimedUrl + meta.appendToHashFileName;
        }

        const response = await fetch(fetchUrl, {
            redirect: 'follow',
        });

        // Accept any 2xx status (not just 200) - redirects resolve to final status
        if (!response.ok) {
            verificationStatus.textContent = `URL returned status ${response.status}`;
            verificationStatus.classList.add('not-found');
            console.log(`Verification failed: HTTP ${response.status}`);

            textResult.style.display = 'block';
            showFailureOverlay(`Not found (${response.status})`);
            return { status: response.status };
        }

        // Read response body
        const body = await response.text();
        const trimmedBody = body.trim();

        // Check for exact "OK" or try parsing as JSON
        let isVerified = false;
        let statusText = null;

        if (trimmedBody === 'OK') {
            isVerified = true;
        } else {
            // Try parsing as JSON for structured response
            try {
                const json = JSON.parse(trimmedBody);
                if (json.status === 'OK' || json.status === 'VERIFIED') {
                    isVerified = true;
                } else {
                    statusText = json.status || json.message || trimmedBody;
                }
            } catch (e) {
                // Not JSON, treat as plain text status
                statusText = trimmedBody.toUpperCase().substring(0, 50);
            }
        }

        if (!isVerified) {
            // Show the actual status from the server (e.g., "REVOKED")
            const status = statusText;

            // Use cached verification-meta.json to get custom responseTypes
            let displayText = status;
            let statusClass = 'not-found';

            if (meta && meta.responseTypes && meta.responseTypes[status]) {
                const responseType = meta.responseTypes[status];
                displayText = responseType.text || status;
                statusClass = responseType.class === 'affirming' ? 'verified' : 'not-found';
            }

            verificationStatus.textContent = displayText;
            verificationStatus.classList.add(statusClass);
            console.log(`Verification failed: response status is "${status}"`);

            textResult.style.display = 'block';
            showFailureOverlay(displayText);
            return { status: 'NOT_OK', body: status };
        }

        // Success: 200 status + "OK" in body
        verificationStatus.innerHTML = `Verified by ${authority}`;
        verificationStatus.classList.add('verified');

        // Show camera-native success overlay
        showSuccessOverlay(authority);

        return { status: 200, body: 'OK' };

    } catch (error) {
        // Network error or CORS issue
        console.error('Could not fetch URL:', error);

        // Provide more specific error message
        let errorMsg = 'Network error';
        if (error.message && error.message.includes('CORS')) {
            errorMsg = 'CORS blocked';
        } else if (error.message && error.message.includes('Failed to fetch')) {
            errorMsg = 'Failed to fetch (CORS or unreachable)';
        } else if (error.name === 'TypeError') {
            errorMsg = 'Network/CORS error';
        }

        verificationStatus.textContent = 'Not Verified';
        verificationStatus.classList.add('not-found');
        verificationDetails.innerHTML = `<small style="color: rgba(255,255,255,0.6);">${claimedUrl}</small><br>${metaInfo}<br><small style="color: #f56565;">${errorMsg}</small>`;

        textResult.style.display = 'block';
        showFailureOverlay('Network error');
        return { status: 'NETWORK_ERROR', error };
    }
}

// Show overlay on video
function showOverlay(color, text) {
    const ctx = overlay.getContext('2d');
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    // Set canvas size to match video display dimensions
    overlay.width = video.clientWidth;
    overlay.height = video.clientHeight;

    // Semi-transparent background
    ctx.fillStyle = color === 'green' ? 'rgba(72, 187, 120, 0.3)' : 'rgba(245, 101, 101, 0.3)';
    ctx.fillRect(0, 0, overlay.width, overlay.height);

    // Bold text
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Text with shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    ctx.fillStyle = color === 'green' ? '#22543d' : '#742a2a';
    ctx.fillText(text, overlay.width / 2, overlay.height / 2);

    // Add disclaimer for verified messages
    if (color === 'green') {
        ctx.font = '18px Arial';
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = '#22543d';
        ctx.fillText('Screencaps of this verified message are not proof of anything', overlay.width / 2, overlay.height / 2 + 60);
    }

    // Clear overlay after 3 seconds
    setTimeout(() => {
        ctx.clearRect(0, 0, overlay.width, overlay.height);
    }, 3000);
}

// Copy hash to clipboard
copyHashBtn.addEventListener('click', async () => {
    const hashText = hashValue.textContent;
    await navigator.clipboard.writeText(hashText);

    const originalText = copyHashBtn.textContent;
    copyHashBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyHashBtn.textContent = originalText;
    }, 2000);
});

// Copy image to clipboard
const copyImageBtn = document.getElementById('copyImage');
const downloadImageBtn = document.getElementById('downloadImage');

copyImageBtn.addEventListener('click', async () => {
    try {
        const img = document.getElementById('croppedImage');

        // Convert data URL to blob
        const response = await fetch(img.src);
        const blob = await response.blob();

        // Copy to clipboard
        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]);

        const originalText = copyImageBtn.textContent;
        copyImageBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyImageBtn.textContent = originalText;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy image:', error);
        // Show download button as fallback
        downloadImageBtn.style.display = 'inline-block';
        copyImageBtn.textContent = '❌ Clipboard Failed';
    }
});

// Download image button (shown when clipboard fails)
downloadImageBtn.addEventListener('click', () => {
    const img = document.getElementById('croppedImage');

    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = img.src; // This is already a data URL from canvas
    link.download = `live-verify-capture-${Date.now()}.png`;

    // Append to body, click, and remove (needed for Firefox)
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const originalText = downloadImageBtn.textContent;
    downloadImageBtn.textContent = '✓ Downloaded!';
    setTimeout(() => {
        downloadImageBtn.textContent = originalText;
    }, 2000);
});

// ============================================================================
// TESTABILITY SEAMS: Expose core functions for automated testing
// ============================================================================
// Following "Design for Testability" principles (Kent Beck, Mockito-style):
// - Production code exposes clean seams (public API)
// - Test code orchestrates mocking/setup in test files (not here)
// - Zero test-specific logic in production bundle
//
// This is similar to Java's interface-based mocking, but leverages JavaScript's
// dynamic nature to allow test code to swap implementations as needed.
window.liveVerifyApp = {
    // Core pipeline function - same code path as production
    processImageCanvas,

    // Verification function - can be overridden by tests (Mockito-style)
    verifyAgainstClaimedUrl,

    // State accessor for test assertions (read-only view of internal state)
    getState: () => ({
        rawText: extractedText.textContent,
        normalized: normalizedText.value,
        hash: hashValue.textContent,
        baseUrl: currentBaseUrl
    }),

    // UI reset function - needed to prepare for test runs
    resetForTest: () => {
        currentBaseUrl = null;
        resubmitBtn.style.display = 'none';
        textResult.style.display = 'none';
        hashResult.style.display = 'none';
        verificationResult.style.display = 'none';
        switchToTab('captured');
    },

    // UI state accessors for verification assertions
    verification: {
        get status() { return verificationStatus; },
        get result() { return verificationResult; },
        get details() { return verificationDetails; }
    }
};
