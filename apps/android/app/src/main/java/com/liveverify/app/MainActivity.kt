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

package com.liveverify.app

import android.Manifest
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.graphics.Bitmap
import android.graphics.Matrix
import android.graphics.RectF
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.OptIn
import androidx.appcompat.app.AppCompatActivity
import androidx.camera.core.CameraSelector
import androidx.camera.core.ExperimentalGetImage
import androidx.camera.core.ImageAnalysis
import androidx.camera.core.ImageProxy
import androidx.camera.core.Preview
import androidx.camera.lifecycle.ProcessCameraProvider
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import com.google.android.material.tabs.TabLayoutMediator
import com.liveverify.app.databinding.ActivityMainBinding
import kotlinx.coroutines.launch
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private var imageAnalysis: ImageAnalysis? = null
    private lateinit var cameraExecutor: ExecutorService
    private val textRecognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

    // Diagnostic data - stored after capture for display
    private var capturedBitmap: Bitmap? = null
    private var rawOcrText: String = ""
    private var normalizedText: String = ""
    private var computedHash: String = ""

    // Analysis image dimensions for coordinate scaling
    private var analysisWidth: Int = 0
    private var analysisHeight: Int = 0

    // Last analysis frame (raw sensor orientation) for the "Captured" tab
    private var lastAnalysisFrame: Bitmap? = null
    // rotationDegrees from CameraX for the last analysis frame
    private var lastAnalysisRotationDegrees: Int = 0

    // Diagnostic adapter for ViewPager2
    private lateinit var diagnosticAdapter: DiagnosticAdapter

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { isGranted ->
        if (isGranted) {
            startCamera()
        } else {
            Toast.makeText(this, R.string.permission_denied, Toast.LENGTH_LONG).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        cameraExecutor = Executors.newSingleThreadExecutor()

        setupUI()
        checkCameraPermission()
    }

    private fun setupUI() {
        binding.dismissResultBtn.setOnClickListener {
            hideResult()
        }

        // Handle tap selection on text overlay
        binding.textOverlay.onBlocksSelected = { blocks ->
            if (blocks.isNotEmpty()) {
                val blockCount = blocks.size
                val hasVerifyUrl = blocks.any {
                    it.text.lowercase().contains("verify:") ||
                    it.text.lowercase().contains("vfy:")
                }
                val status = if (hasVerifyUrl) {
                    "Verifying $blockCount block(s)..."
                } else {
                    "Selected $blockCount block(s) - no verify URL"
                }
                updateStatus(status)
            } else {
                updateStatus(getString(R.string.status_ready))
            }
        }

        // Handle capture button tap on the overlay
        binding.textOverlay.onCaptureRequested = {
            captureFromAnalysisFrame()
        }

        // Set up diagnostic ViewPager2 with tabs
        diagnosticAdapter = DiagnosticAdapter()
        binding.diagnosticPager.adapter = diagnosticAdapter

        val tabTitles = arrayOf(
            getString(R.string.tab_captured),
            getString(R.string.tab_extracted),
            getString(R.string.tab_normalized)
        )
        TabLayoutMediator(binding.diagnosticTabs, binding.diagnosticPager) { tab, position ->
            tab.text = tabTitles[position]
        }.attach()
    }

    private fun checkCameraPermission() {
        when {
            ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.CAMERA
            ) == PackageManager.PERMISSION_GRANTED -> {
                startCamera()
            }
            else -> {
                requestPermissionLauncher.launch(Manifest.permission.CAMERA)
            }
        }
    }

    private fun startCamera() {
        val cameraProviderFuture = ProcessCameraProvider.getInstance(this)

        cameraProviderFuture.addListener({
            val cameraProvider = cameraProviderFuture.get()

            val preview = Preview.Builder()
                .build()
                .also {
                    it.setSurfaceProvider(binding.cameraPreview.surfaceProvider)
                }

            // ImageAnalysis: leave targetRotation at default (ROTATION_0 = portrait).
            // This keeps ML Kit bounding boxes in a stable coordinate space.
            // Bitmap rotation and line ordering are determined from the ML Kit
            // text coordinate spread at capture time.
            imageAnalysis = ImageAnalysis.Builder()
                .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                .build()
                .also { analysis ->
                    analysis.setAnalyzer(cameraExecutor) { imageProxy ->
                        analyzeImage(imageProxy)
                    }
                }

            val cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA

            try {
                cameraProvider.unbindAll()
                cameraProvider.bindToLifecycle(
                    this,
                    cameraSelector,
                    preview,
                    imageAnalysis
                )
                updateStatus(getString(R.string.status_ready))
            } catch (e: Exception) {
                Log.e(TAG, "Camera binding failed", e)
            }
        }, ContextCompat.getMainExecutor(this))
    }

    @OptIn(ExperimentalGetImage::class)
    private fun analyzeImage(imageProxy: ImageProxy) {
        val mediaImage = imageProxy.image
        if (mediaImage == null) {
            imageProxy.close()
            return
        }

        val inputImage = InputImage.fromMediaImage(
            mediaImage,
            imageProxy.imageInfo.rotationDegrees
        )

        // ML Kit returns bounding boxes in rotated coordinate space
        val rotationDegrees = imageProxy.imageInfo.rotationDegrees
        val isRotated = rotationDegrees == 90 || rotationDegrees == 270
        val analysisWidth = if (isRotated) imageProxy.height else imageProxy.width
        val analysisHeight = if (isRotated) imageProxy.width else imageProxy.height

        // Store raw sensor bitmap — rotation is determined at capture time
        // based on ML Kit text coordinate spread
        try {
            lastAnalysisFrame = imageProxy.toBitmap()
            lastAnalysisRotationDegrees = rotationDegrees
        } catch (e: Exception) {
            Log.d(TAG, "Could not convert analysis frame to bitmap: ${e.message}")
        }

        textRecognizer.process(inputImage)
            .addOnSuccessListener { visionText ->
                runOnUiThread {
                    this.analysisWidth = analysisWidth
                    this.analysisHeight = analysisHeight

                    binding.textOverlay.setDetectedText(
                        visionText,
                        analysisWidth,
                        analysisHeight,
                        rotationDegrees
                    )
                }
            }
            .addOnFailureListener { e ->
                Log.e(TAG, "Live text detection failed", e)
            }
            .addOnCompleteListener {
                imageProxy.close()
            }
    }

    /**
     * Capture from selected blocks - uses the text already detected by ML Kit.
     * No need to re-run OCR since we already have the text.
     * Grabs the current analysis frame as a bitmap for the diagnostic "Captured" tab.
     */
    private fun captureFromAnalysisFrame() {
        val selectedBlocks = binding.textOverlay.getSelectedBlocks()
        if (selectedBlocks.isEmpty()) {
            showError("No blocks selected")
            return
        }

        // Rotate raw sensor frame to portrait (matching ML Kit coordinate space) for cropping
        val rawBitmap = lastAnalysisFrame
        val portraitBitmap = if (rawBitmap != null && lastAnalysisRotationDegrees != 0) {
            val matrix = Matrix()
            matrix.postRotate(lastAnalysisRotationDegrees.toFloat())
            Bitmap.createBitmap(rawBitmap, 0, 0, rawBitmap.width, rawBitmap.height, matrix, true)
        } else {
            rawBitmap
        }

        showProcessing(true)
        updateStatus(getString(R.string.status_processing))

        // Collect lines from selected blocks, sorted in reading order.
        // ML Kit bounding boxes are always in portrait coordinate space (targetRotation=ROTATION_0).
        // Determine sort axis from coordinate spread — no reliance on orientation sensor.
        // Portrait text: Y (top) values vary, X (left) similar → sort by top ascending
        // Landscape text: X (left) values vary, Y (top) similar → sort by left
        // Use the verify: line as anchor: it's always last in reading order.
        val allLines = selectedBlocks.flatMap { it.lines }
        val sortedLines = TextOverlayView.sortLinesInReadingOrder(allLines)
        val combinedText = sortedLines.joinToString("\n") { it.text }

        val topRange = allLines.maxOf { it.top } - allLines.minOf { it.top }
        val leftRange = allLines.maxOf { it.left } - allLines.minOf { it.left }
        val isLandscape = leftRange > topRange * 2

        Log.d(TAG, "Capture: ${sortedLines.size} lines from ${selectedBlocks.size} blocks (topRange=$topRange, leftRange=$leftRange, landscape=$isLandscape)")

        // Save selection bounds before clearing
        val selectionBounds = binding.textOverlay.getSelectedBounds()

        // Clear the overlay
        binding.textOverlay.clearBlocks()

        // Crop portrait bitmap to selected region for diagnostic display
        capturedBitmap = if (portraitBitmap != null && selectionBounds != null) {
            val scaleX = portraitBitmap.width.toFloat() / analysisWidth.coerceAtLeast(1)
            val scaleY = portraitBitmap.height.toFloat() / analysisHeight.coerceAtLeast(1)
            val scaledBounds = RectF(
                selectionBounds.left * scaleX,
                selectionBounds.top * scaleY,
                selectionBounds.right * scaleX,
                selectionBounds.bottom * scaleY
            )
            var cropped = cropBitmap(portraitBitmap, scaledBounds)
            // If landscape text, rotate cropped image so text reads horizontally
            if (isLandscape) {
                val verifyLine = allLines.find { line ->
                    line.text.lowercase().let { it.contains("verify:") || it.contains("vfy:") }
                }
                // verify: at low-left = phone rotated CW → rotate CCW to fix
                // verify: at high-left = phone rotated CCW → rotate CW to fix
                val rotateDeg = if (verifyLine != null && verifyLine.left < allLines.map { it.left }.average()) -90f else 90f
                val m = Matrix()
                m.postRotate(rotateDeg)
                cropped = Bitmap.createBitmap(cropped, 0, 0, cropped.width, cropped.height, m, true)
            }
            cropped
        } else {
            portraitBitmap
        }
        rawOcrText = combinedText

        // Process the combined text
        processRecognizedText(combinedText)
    }

    private fun cropBitmap(bitmap: Bitmap, bounds: RectF): Bitmap {
        val left = bounds.left.toInt().coerceIn(0, bitmap.width - 1)
        val top = bounds.top.toInt().coerceIn(0, bitmap.height - 1)
        val width = bounds.width().toInt().coerceIn(1, bitmap.width - left)
        val height = bounds.height().toInt().coerceIn(1, bitmap.height - top)

        return Bitmap.createBitmap(bitmap, left, top, width, height)
    }

    private fun processRecognizedText(rawText: String) {
        this.rawOcrText = rawText
        Log.d(TAG, "OCR Text:\n$rawText")

        val urlResult = VerificationLogic.extractVerificationUrl(rawText)
        if (urlResult.url == null) {
            showError("No verification URL found in image")
            return
        }

        Log.d(TAG, "Found URL: ${urlResult.url} at line ${urlResult.urlLineIndex}")

        val certText = VerificationLogic.extractCertText(rawText, urlResult.urlLineIndex)
        Log.d(TAG, "Cert text:\n$certText")

        normalizedText = TextNormalizer.normalizeText(certText)
        computedHash = TextNormalizer.sha256(normalizedText)
        Log.d(TAG, "Hash: $computedHash")

        updateStatus(getString(R.string.status_verifying))

        lifecycleScope.launch {
            try {
                val meta = VerificationLogic.fetchVerificationMeta(urlResult.url)
                val suffix = meta?.optString("appendToHashFileName") ?: ""

                val verificationUrl = VerificationLogic.buildVerificationUrl(
                    urlResult.url,
                    computedHash,
                    suffix
                )
                Log.d(TAG, "Verification URL: $verificationUrl")

                val result = VerificationLogic.verifyHash(verificationUrl)

                // Check authorization chain if meta has authorizedBy
                var authorization: AuthorizationResult? = null
                if (meta != null && meta.has("authorizedBy")) {
                    updateStatus(getString(R.string.status_checking_authorization))
                    val httpsBase = when {
                        urlResult.url.lowercase().startsWith("verify:") -> "https://${urlResult.url.substring(7)}"
                        urlResult.url.lowercase().startsWith("vfy:") -> "https://${urlResult.url.substring(4)}"
                        else -> urlResult.url
                    }
                    val metaUrl = "$httpsBase/verification-meta.json"
                    authorization = VerificationLogic.checkAuthorization(meta, metaUrl)
                    Log.d(TAG, "Authorization: checked=${authorization.checked}, confirmed=${authorization.confirmed}, authorizer=${authorization.authorizer}")
                }

                showResult(result, authorization)
            } catch (e: Exception) {
                Log.e(TAG, "Verification failed", e)
                showError("Verification failed: ${e.message}")
            }
        }
    }

    private fun showResult(result: VerificationResult, authorization: AuthorizationResult? = null) {
        showProcessing(false)

        when (result) {
            is VerificationResult.Verified -> {
                val isAuthorized = authorization?.confirmed == true
                val color = if (isAuthorized) {
                    getColor(R.color.verified_green)
                } else {
                    getColor(R.color.unauthorized_orange)
                }
                binding.resultIcon.text = "✓"
                binding.resultIcon.setTextColor(color)
                binding.resultText.text = getString(R.string.result_verified)
                binding.resultText.setTextColor(color)
                binding.resultDomain.text = result.domain
                binding.resultDomain.visibility = View.VISIBLE
            }
            is VerificationResult.NotVerified -> {
                binding.resultIcon.text = "✗"
                binding.resultIcon.setTextColor(getColor(R.color.not_verified_red))
                binding.resultText.text = getString(R.string.result_not_verified)
                binding.resultDomain.text = "${result.domain} — ${result.reason}"
                binding.resultDomain.visibility = View.VISIBLE
            }
            is VerificationResult.Error -> {
                binding.resultIcon.text = "!"
                binding.resultIcon.setTextColor(getColor(R.color.unauthorized_orange))
                binding.resultText.text = getString(R.string.result_error)
                binding.resultDomain.text = result.message
                binding.resultDomain.visibility = View.VISIBLE
            }
        }

        showAuthorizationInfo(result, authorization)

        binding.resultOverlay.visibility = View.VISIBLE
        showDiagnosticInfo()
    }

    private fun showAuthorizationInfo(result: VerificationResult, authorization: AuthorizationResult?) {
        val domain = when (result) {
            is VerificationResult.Verified -> result.domain
            is VerificationResult.NotVerified -> result.domain
            else -> null
        }

        if (authorization != null && authorization.checked) {
            binding.authorizationInfo.visibility = View.VISIBLE

            when {
                authorization.expired -> {
                    binding.authorizationText.text = getString(R.string.auth_expired, authorization.authorizer ?: "unknown")
                    binding.authorizationText.setBackgroundColor(getColor(R.color.auth_warning_bg))
                    binding.authorizationText.setCompoundDrawablesRelativeWithIntrinsicBounds(0, 0, 0, 0)
                }
                authorization.confirmed -> {
                    val firstEntry = authorization.chain.firstOrNull()
                    val desc = firstEntry?.description
                    val text = if (desc != null) {
                        getString(R.string.auth_authorized_by_desc, authorization.authorizer ?: "unknown", desc)
                    } else {
                        getString(R.string.auth_authorized_by, authorization.authorizer ?: "unknown")
                    }
                    binding.authorizationText.text = "✓ $text"
                    binding.authorizationText.setBackgroundColor(getColor(R.color.auth_confirmed_bg))

                    if (authorization.chain.size > 1) {
                        val chainText = authorization.chain.drop(1).joinToString("\n") { entry ->
                            val entryDesc = entry.description?.let { " ($it)" } ?: ""
                            "← ${entry.authorizer}$entryDesc"
                        }
                        binding.authorizationChainText.text = chainText
                        binding.authorizationChainText.visibility = View.VISIBLE
                    } else {
                        binding.authorizationChainText.visibility = View.GONE
                    }
                }
                else -> {
                    binding.authorizationText.text = "⚠ " + getString(R.string.auth_not_confirmed, authorization.authorizer ?: "unknown")
                    binding.authorizationText.setBackgroundColor(getColor(R.color.auth_warning_bg))
                }
            }
        } else if (domain != null) {
            binding.authorizationInfo.visibility = View.VISIBLE
            binding.authorizationText.text = "⚠ " + getString(R.string.auth_no_authority, domain)
            binding.authorizationText.setBackgroundColor(getColor(R.color.auth_warning_bg))
            binding.authorizationChainText.visibility = View.GONE
        } else {
            binding.authorizationInfo.visibility = View.GONE
        }
    }

    private fun showDiagnosticInfo() {
        Log.d(TAG, "=== DIAGNOSTIC INFO ===")
        Log.d(TAG, "Raw OCR text with return symbols:\n${DiagnosticHelper.withReturnSymbols(rawOcrText)}")
        Log.d(TAG, "Normalized text:\n$normalizedText")
        Log.d(TAG, "Hash: $computedHash")
        Log.d(TAG, "=======================")

        diagnosticAdapter.capturedImage = capturedBitmap
        diagnosticAdapter.extractedText = rawOcrText
        diagnosticAdapter.normalizedText = normalizedText
        diagnosticAdapter.computedHash = computedHash
    }

    private fun hideResult() {
        binding.resultOverlay.visibility = View.GONE
        binding.authorizationInfo.visibility = View.GONE
        binding.authorizationChainText.visibility = View.GONE
        updateStatus(getString(R.string.status_ready))

        capturedBitmap = null
        rawOcrText = ""
        normalizedText = ""
        computedHash = ""
    }

    private fun showError(message: String) {
        showProcessing(false)

        binding.resultIcon.text = "!"
        binding.resultIcon.setTextColor(getColor(R.color.not_verified_red))
        binding.resultText.text = getString(R.string.result_error)
        binding.resultDomain.text = message
        binding.resultDomain.visibility = View.VISIBLE
        binding.resultOverlay.visibility = View.VISIBLE

        showDiagnosticInfo()
    }

    private fun showProcessing(show: Boolean) {
        binding.processingIndicator.visibility = if (show) View.VISIBLE else View.GONE
    }

    private fun updateStatus(status: String) {
        binding.statusText.text = status
    }

    override fun onConfigurationChanged(newConfig: Configuration) {
        super.onConfigurationChanged(newConfig)
        startCamera()
    }

    override fun onDestroy() {
        super.onDestroy()
        cameraExecutor.shutdown()
        textRecognizer.close()
    }

    companion object {
        private const val TAG = "LiveVerify"
    }
}
