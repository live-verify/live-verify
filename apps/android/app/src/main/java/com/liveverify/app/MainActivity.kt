/*
 * Copyright (C) 2025, Paul Hammant
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.liveverify.app

import android.Manifest
import android.content.pm.PackageManager
import android.content.res.Configuration
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.graphics.RectF
import android.os.Bundle
import android.util.Base64
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
import org.json.JSONObject
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
    // Candidate attempts for diagnostic display (set during verification)
    private var diagnosticCandidates: List<DiagnosticAdapter.NormalizedCandidate> = emptyList()

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

        // Apply DNS overrides if provided (comma-separated "host=ip" pairs)
        val dnsOverrides = intent.getStringExtra(EXTRA_DNS_OVERRIDES)
        if (dnsOverrides != null) {
            val mappings = dnsOverrides.split(",").mapNotNull { pair ->
                val parts = pair.split("=", limit = 2)
                if (parts.size == 2) parts[0].trim() to parts[1].trim() else null
            }.toMap()
            Log.d(TAG, "DNS overrides: $mappings")
            VerificationLogic.configureClient(mappings, trustAllCerts = true)
        }

        // Debug image mode: load image from file, OCR it, verify
        val verifyImage = intent.getStringExtra(EXTRA_VERIFY_IMAGE)
        if (verifyImage != null) {
            Log.d(TAG, "Debug image mode: OCR from $verifyImage")
            showProcessing(true)
            updateStatus(getString(R.string.status_recognizing))
            processImageFile(verifyImage)
            return
        }

        // Debug text-paste mode: skip camera and OCR, verify text directly
        val verifyText = intent.getStringExtra(EXTRA_VERIFY_TEXT)
        if (verifyText != null) {
            Log.d(TAG, "Debug text-paste mode: verifying supplied text")
            showProcessing(true)
            updateStatus(getString(R.string.status_processing))
            processRecognizedText(verifyText)
            return
        }

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
        attachDiagnosticTabs()
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
        // Stitch lines into rows using Y coordinates — merges fragments that
        // ML Kit split (e.g. "Flat White" and "£3.40") and detects blank lines
        // from vertical gaps (separating headers from verifiable content).
        val combinedText = TextOverlayView.stitchLinesIntoRows(allLines)

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

    /**
     * Load an image file, run ML Kit text recognition, then verify.
     * Exercises the full OCR → normalization → hashing → verification pipeline.
     */
    private fun processImageFile(imagePath: String) {
        val bitmap = BitmapFactory.decodeFile(imagePath)
        if (bitmap == null) {
            showError("Could not load image: $imagePath")
            return
        }

        capturedBitmap = bitmap
        val inputImage = InputImage.fromBitmap(bitmap, 0)

        textRecognizer.process(inputImage)
            .addOnSuccessListener { visionText ->
                // Extract individual lines with coordinates for row stitching
                val allLines = visionText.textBlocks.flatMap { block ->
                    block.lines.map { line ->
                        val box = line.boundingBox
                        TextOverlayView.TextLine(
                            text = line.text,
                            top = box?.top?.toFloat() ?: 0f,
                            left = box?.left?.toFloat() ?: 0f
                        )
                    }
                }

                Log.d(TAG, "OCR from image ($imagePath): ${allLines.size} lines from ${visionText.textBlocks.size} blocks")
                for ((i, line) in allLines.withIndex()) {
                    Log.d(TAG, "  line[$i] top=${line.top} left=${line.left} text=\"${line.text}\"")
                }

                val rawText = TextOverlayView.stitchLinesIntoRows(allLines)
                Log.d(TAG, "Stitched text:\n$rawText")
                rawOcrText = rawText
                processRecognizedText(rawText)
            }
            .addOnFailureListener { e ->
                Log.e(TAG, "OCR failed on image", e)
                showError("OCR failed: ${e.message}")
            }
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

        val candidates = VerificationLogic.extractCertTextCandidates(rawText, urlResult.urlLineIndex)
        if (candidates.isEmpty()) {
            showError("No certification text found above verification URL")
            return
        }

        // Start with smallest candidate for display
        val certText = candidates.first()
        normalizedText = TextNormalizer.normalizeText(certText)
        computedHash = TextNormalizer.sha256(normalizedText)
        Log.d(TAG, "Initial cert text (candidate 0):\n$certText")
        Log.d(TAG, "Initial hash: $computedHash")

        updateStatus(getString(R.string.status_verifying))

        lifecycleScope.launch {
            try {
                val meta = VerificationLogic.fetchVerificationMeta(urlResult.url)
                val suffix = meta?.optString("appendToHashFileName") ?: ""

                // Try each candidate from smallest to largest until server confirms.
                // Collect all attempts for diagnostic display.
                var result: VerificationResult? = null
                var verificationUrl = ""
                val triedCandidates = mutableListOf<DiagnosticAdapter.NormalizedCandidate>()

                for ((i, candidate) in candidates.withIndex()) {
                    val normalized = TextNormalizer.normalizeText(candidate)
                    val hash = TextNormalizer.sha256(normalized)
                    val url = VerificationLogic.buildVerificationUrl(urlResult.url, hash, suffix)
                    Log.d(TAG, "Trying candidate $i/${candidates.size}: hash=${hash.take(16)}... (${candidate.count { it == '\n' } + 1} lines)")

                    triedCandidates.add(DiagnosticAdapter.NormalizedCandidate(normalized, hash))
                    val candidateResult = VerificationLogic.verifyHash(url)

                    if (candidateResult is VerificationResult.Verified) {
                        Log.d(TAG, "Candidate $i matched!")
                        result = candidateResult
                        verificationUrl = url
                        normalizedText = normalized
                        computedHash = hash
                        // On success, only show the winning candidate
                        diagnosticCandidates = listOf(triedCandidates.last())
                        break
                    }
                }

                // No candidate matched — show all failed attempts as separate tabs
                if (result == null) {
                    Log.d(TAG, "No candidate matched, showing all ${triedCandidates.size} attempts")
                    val first = triedCandidates.first()
                    result = VerificationResult.NotVerified(
                        VerificationLogic.getDomainFromUrl(
                            VerificationLogic.buildVerificationUrl(urlResult.url, first.hash, suffix)
                        ),
                        "Hash not found on server"
                    )
                    verificationUrl = VerificationLogic.buildVerificationUrl(urlResult.url, first.hash, suffix)
                    normalizedText = first.text
                    computedHash = first.hash
                    diagnosticCandidates = triedCandidates
                }

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
                    authorization = VerificationLogic.checkAuthorization(meta, metaUrl, verificationUrl)
                    Log.d(TAG, "Authorization: checked=${authorization.checked}, confirmed=${authorization.confirmed}, authorizer=${authorization.authorizer}")
                }

                showResult(result!!, authorization, meta)
            } catch (e: Exception) {
                Log.e(TAG, "Verification failed", e)
                showError("Verification failed: ${e.message}")
            }
        }
    }

    private fun showResult(result: VerificationResult, authorization: AuthorizationResult? = null, issuerMeta: JSONObject? = null) {
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

        showPayloadInfo(result)
        showAuthorizationChain(result, authorization, issuerMeta)

        binding.resultOverlay.visibility = View.VISIBLE
        showDiagnosticInfo()
    }

    private fun showPayloadInfo(result: VerificationResult) {
        val payload = (result as? VerificationResult.Verified)?.payload
        if (payload == null) {
            binding.payloadInfo.visibility = View.GONE
            return
        }

        var hasContent = false

        val headshot = payload.optString("headshot", "")
        if (headshot.isNotEmpty()) {
            try {
                // Strip data URI prefix (e.g. "data:image/jpeg;base64,")
                val base64Data = if (headshot.contains(",")) headshot.substringAfter(",") else headshot
                val bytes = Base64.decode(base64Data, Base64.DEFAULT)
                val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
                if (bitmap != null) {
                    binding.payloadHeadshot.setImageBitmap(bitmap)
                    binding.payloadHeadshot.visibility = View.VISIBLE
                    hasContent = true
                }
            } catch (e: Exception) {
                Log.w(TAG, "Failed to decode headshot: ${e.message}")
                binding.payloadHeadshot.visibility = View.GONE
            }
        } else {
            binding.payloadHeadshot.visibility = View.GONE
        }

        val message = payload.optString("message", "")
        if (message.isNotEmpty()) {
            binding.payloadMessage.text = message
            binding.payloadMessage.visibility = View.VISIBLE
            hasContent = true
        } else {
            binding.payloadMessage.visibility = View.GONE
        }

        binding.payloadInfo.visibility = if (hasContent) View.VISIBLE else View.GONE
    }

    /**
     * Display the authority chain in the indented format:
     *   ✓ midsomer.police.uk — Police force for the county of Midsomer
     *     ✓ policing.gov.uk — Oversees standards for all police forces...
     *       ✓ gov.uk — Oversees all official verification chains...
     *
     * Broken chains show ✗ NOT CONFIRMED at the failed node.
     * Tap any line to see formalName in a toast.
     */
    private fun showAuthorizationChain(result: VerificationResult, authorization: AuthorizationResult?, issuerMeta: JSONObject?) {
        val domain = when (result) {
            is VerificationResult.Verified -> result.domain
            is VerificationResult.NotVerified -> result.domain
            else -> null
        }

        if (authorization == null || !authorization.checked) {
            if (domain != null) {
                binding.authorizationInfo.visibility = View.VISIBLE
                binding.authorizationText.text = "✓ " + getString(R.string.auth_self_verified, domain)
                binding.authorizationText.setBackgroundColor(getColor(R.color.auth_confirmed_bg))
                binding.authorizationChainText.visibility = View.GONE
            } else {
                binding.authorizationInfo.visibility = View.GONE
            }
            return
        }

        binding.authorizationInfo.visibility = View.VISIBLE

        if (authorization.expired) {
            binding.authorizationText.text = getString(R.string.auth_expired, authorization.authorizer ?: "unknown")
            binding.authorizationText.setBackgroundColor(getColor(R.color.auth_warning_bg))
            binding.authorizationChainText.visibility = View.GONE
            return
        }

        // Build the full chain starting with the issuer domain
        val issuerDesc = issuerMeta?.optString("description", "")?.takeIf { it.isNotEmpty() }
        val issuerFormalName = issuerMeta?.optString("formalName", "")?.takeIf { it.isNotEmpty() }
            ?: issuerMeta?.optString("issuer", "")?.takeIf { it.isNotEmpty() }

        val lines = StringBuilder()
        val formalNames = mutableListOf<String?>()

        // First line: the issuer itself (always confirmed if we got here via successful verification)
        if (domain != null) {
            val descSuffix = if (issuerDesc != null) " \u2014 $issuerDesc" else ""
            lines.append("✓ $domain$descSuffix")
            formalNames.add(issuerFormalName)
        }

        // Chain entries (authorizers)
        for ((index, entry) in authorization.chain.withIndex()) {
            val indent = "  ".repeat(index + 1)
            val descSuffix = if (entry.description != null) " \u2014 ${entry.description}" else ""
            val symbol = if (entry.confirmed) "✓" else "✗"
            if (lines.isNotEmpty()) lines.append("\n")
            if (!entry.confirmed) {
                lines.append("$indent$symbol ${entry.authorizer} \u2014 NOT CONFIRMED")
            } else {
                lines.append("$indent$symbol ${entry.authorizer}$descSuffix")
            }
            formalNames.add(entry.formalName)
        }

        val bgColor = if (authorization.confirmed) {
            getColor(R.color.auth_confirmed_bg)
        } else {
            getColor(R.color.auth_warning_bg)
        }

        // Use authorizationText for the first line, chainText for the rest
        val allLines = lines.toString().split("\n")
        binding.authorizationText.text = allLines.first()
        binding.authorizationText.setBackgroundColor(bgColor)

        if (allLines.size > 1) {
            binding.authorizationChainText.text = allLines.drop(1).joinToString("\n")
            binding.authorizationChainText.setBackgroundColor(bgColor)
            binding.authorizationChainText.visibility = View.VISIBLE
        } else {
            binding.authorizationChainText.visibility = View.GONE
        }

        // Tap-for-detail: show formalName in a toast
        val chainView = binding.authorizationInfo
        chainView.setOnClickListener {
            val names = formalNames.filterNotNull()
            if (names.isNotEmpty()) {
                Toast.makeText(this, names.joinToString("\n"), Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun showDiagnosticInfo() {
        Log.d(TAG, "=== DIAGNOSTIC INFO ===")
        Log.d(TAG, "Raw OCR text with return symbols:\n${DiagnosticHelper.withReturnSymbols(rawOcrText)}")
        Log.d(TAG, "Normalized text:\n$normalizedText")
        Log.d(TAG, "Hash: $computedHash")
        Log.d(TAG, "Diagnostic candidates: ${diagnosticCandidates.size}")
        Log.d(TAG, "=======================")

        diagnosticAdapter.capturedImage = capturedBitmap
        diagnosticAdapter.extractedText = rawOcrText
        diagnosticAdapter.setNormalizedCandidates(diagnosticCandidates)
        attachDiagnosticTabs()
    }

    private fun attachDiagnosticTabs() {
        binding.diagnosticTabs.removeAllTabs()
        TabLayoutMediator(binding.diagnosticTabs, binding.diagnosticPager) { tab, position ->
            tab.text = diagnosticAdapter.getTabTitle(position)
        }.attach()
    }

    private fun hideResult() {
        binding.resultOverlay.visibility = View.GONE
        binding.payloadInfo.visibility = View.GONE
        binding.payloadHeadshot.visibility = View.GONE
        binding.payloadMessage.visibility = View.GONE
        binding.authorizationInfo.visibility = View.GONE
        binding.authorizationInfo.setOnClickListener(null)
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
        const val EXTRA_VERIFY_IMAGE = "com.liveverify.app.VERIFY_IMAGE"
        const val EXTRA_VERIFY_TEXT = "com.liveverify.app.VERIFY_TEXT"
        const val EXTRA_DNS_OVERRIDES = "com.liveverify.app.DNS_OVERRIDES"
    }
}
