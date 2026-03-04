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

import Foundation
import UIKit
import Vision
import CoreImage

// MARK: - Rectangle Detection

/// Result of rectangle detection
struct DetectedRectangle {
    let boundingBox: CGRect
    let topLeft: CGPoint
    let topRight: CGPoint
    let bottomLeft: CGPoint
    let bottomRight: CGPoint
    let confidence: Float
}

/// Detects document rectangles using Vision framework
class RectangleDetector {

    /// Detect rectangles in an image
    func detectRectangles(in image: UIImage) async throws -> [DetectedRectangle] {
        guard let cgImage = image.cgImage else {
            return []
        }

        return try await withCheckedThrowingContinuation { continuation in
            let request = VNDetectRectanglesRequest { request, error in
                if let error = error {
                    Log.d("RectDetect", "Detection error: \(error)")
                    continuation.resume(returning: [])
                    return
                }

                guard let observations = request.results as? [VNRectangleObservation],
                      !observations.isEmpty else {
                    continuation.resume(returning: [])
                    return
                }

                let rectangles = observations.map { obs in
                    DetectedRectangle(
                        boundingBox: obs.boundingBox,
                        topLeft: obs.topLeft,
                        topRight: obs.topRight,
                        bottomLeft: obs.bottomLeft,
                        bottomRight: obs.bottomRight,
                        confidence: obs.confidence
                    )
                }.sorted { $0.confidence > $1.confidence }

                continuation.resume(returning: rectangles)
            }

            // Configure for document detection
            request.minimumAspectRatio = 0.3
            request.maximumAspectRatio = 1.0
            request.minimumSize = 0.1
            request.maximumObservations = 5
            request.minimumConfidence = 0.5

            let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
            do {
                try handler.perform([request])
            } catch {
                Log.d("RectDetect", "Handler error: \(error)")
                continuation.resume(returning: [])
            }
        }
    }

    /// Detect and crop to the best rectangle in an image
    func detectAndCrop(image: UIImage) async -> UIImage {
        do {
            let rectangles = try await detectRectangles(in: image)

            guard let bestRect = rectangles.first else {
                Log.d("RectDetect", "No rectangle found, using original image")
                return image
            }

            Log.d("RectDetect", "Found rectangle with confidence: \(bestRect.confidence)")
            return perspectiveCorrectedImage(from: image, rectangle: bestRect) ?? image

        } catch {
            Log.d("RectDetect", "Error: \(error)")
            return image
        }
    }

    /// Apply perspective correction and crop to the detected rectangle
    private func perspectiveCorrectedImage(from image: UIImage, rectangle: DetectedRectangle) -> UIImage? {
        guard let cgImage = image.cgImage else { return nil }

        let ciImage = CIImage(cgImage: cgImage)
        let imageSize = ciImage.extent.size

        // Convert normalized Vision coordinates to image coordinates
        let topLeft = CGPoint(
            x: rectangle.topLeft.x * imageSize.width,
            y: rectangle.topLeft.y * imageSize.height
        )
        let topRight = CGPoint(
            x: rectangle.topRight.x * imageSize.width,
            y: rectangle.topRight.y * imageSize.height
        )
        let bottomLeft = CGPoint(
            x: rectangle.bottomLeft.x * imageSize.width,
            y: rectangle.bottomLeft.y * imageSize.height
        )
        let bottomRight = CGPoint(
            x: rectangle.bottomRight.x * imageSize.width,
            y: rectangle.bottomRight.y * imageSize.height
        )

        guard let perspectiveFilter = CIFilter(name: "CIPerspectiveCorrection") else {
            return nil
        }

        perspectiveFilter.setValue(ciImage, forKey: kCIInputImageKey)
        perspectiveFilter.setValue(CIVector(cgPoint: topLeft), forKey: "inputTopLeft")
        perspectiveFilter.setValue(CIVector(cgPoint: topRight), forKey: "inputTopRight")
        perspectiveFilter.setValue(CIVector(cgPoint: bottomLeft), forKey: "inputBottomLeft")
        perspectiveFilter.setValue(CIVector(cgPoint: bottomRight), forKey: "inputBottomRight")

        guard let outputImage = perspectiveFilter.outputImage else { return nil }

        let context = CIContext()
        guard let correctedCGImage = context.createCGImage(outputImage, from: outputImage.extent) else {
            return nil
        }

        return UIImage(cgImage: correctedCGImage)
    }
}

// MARK: - Verification Types

/// Result of a verification attempt
struct VerificationResult {
    let outcome: VerificationOutcome
    let rawText: String
    let normalizedText: String?
    let hash: String?
    let verificationURL: String?
    let baseURL: String?
    var authorization: AuthorizationResult?
}

/// Pipeline error types
enum PipelineError: Error, LocalizedError {
    case jsBridgeInitFailed(Error)
    case ocrFailed(Error)
    case noVerifyURLFound
    case normalizationFailed
    case urlBuildFailed

    var errorDescription: String? {
        switch self {
        case .jsBridgeInitFailed(let error):
            return "Failed to initialize JS bridge: \(error.localizedDescription)"
        case .ocrFailed(let error):
            return "OCR failed: \(error.localizedDescription)"
        case .noVerifyURLFound:
            return "No verify: or vfy: URL found in text"
        case .normalizationFailed:
            return "Text normalization failed"
        case .urlBuildFailed:
            return "Failed to build verification URL"
        }
    }
}

/// Main orchestration for the verification pipeline
/// Coordinates OCR, normalization (via JS), hashing, and network verification
class VerificationPipeline: ObservableObject {
    private let textRecognizer: TextRecognizer
    private let contourDetector: ContourDetector
    private let verificationClient: VerificationClient
    private var jsBridge: JSBridge?

    // Friendly labels for logging image orientations
    private let orientationNames = [
        UIImage.Orientation.up: "up",
        .down: "down",
        .left: "left",
        .right: "right",
        .upMirrored: "upMirrored",
        .downMirrored: "downMirrored",
        .leftMirrored: "leftMirrored",
        .rightMirrored: "rightMirrored"
    ]

    /// Current processing state
    @Published var isProcessing = false
    @Published var currentStep: String = ""

    init() {
        self.textRecognizer = TextRecognizer()
        self.contourDetector = ContourDetector()
        self.verificationClient = VerificationClient()

        // Initialize JS bridge
        do {
            self.jsBridge = try JSBridge()
        } catch {
            Log.d("Pipeline", "Warning: JS bridge initialization failed: \(error)")
            // Will retry on first use
        }
    }

    /// Normalize image orientation - redraw with correct pixel orientation
    /// Camera images have metadata orientation that needs to be baked into pixels
    private func normalizeImageOrientation(_ image: UIImage) -> UIImage {
        Log.d("Pipeline", "Normalizing orientation: \(orientationNames[image.imageOrientation] ?? "unknown"), size: \(image.size)")

        // If already upright, return as-is
        if image.imageOrientation == .up {
            Log.d("Pipeline", "Already .up, no normalization needed")
            return image
        }

        // Use UIGraphicsImageRenderer for modern, correct rendering
        let format = UIGraphicsImageRendererFormat()
        format.scale = image.scale
        format.opaque = false

        let renderer = UIGraphicsImageRenderer(size: image.size, format: format)
        let normalizedImage = renderer.image { _ in
            image.draw(at: .zero)
        }

        Log.d("Pipeline", "Normalized to size: \(normalizedImage.size), orientation: \(normalizedImage.imageOrientation.rawValue)")
        return normalizedImage
    }

    /// Verify a document image
    /// - Parameter image: UIImage captured from camera
    /// - Returns: VerificationResult with outcome and intermediate data
    func verify(image: UIImage) async throws -> VerificationResult {
        await MainActor.run {
            isProcessing = true
            currentStep = "Processing image..."
        }

        // Fix image orientation (camera images have metadata orientation)
        Log.d("Pipeline", "Original image: \(image.size), orientation: \(orientationNames[image.imageOrientation] ?? "unknown")")
        let orientedImage = normalizeImageOrientation(image)
        Log.d("Pipeline", "After normalization: \(orientedImage.size)")

        await MainActor.run {
            currentStep = "Detecting registration marks..."
        }

        // Step 0: Detect and crop to registration rectangle (using Vision framework)
        let croppedImage: UIImage
        do {
            croppedImage = try await contourDetector.detectAndCrop(image: orientedImage)
        } catch {
            await MainActor.run {
                isProcessing = false
            }
            // Return a result indicating detection failure - no fallback
            return VerificationResult(
                outcome: .error("No registration marks detected. Point camera at document with black border."),
                rawText: "",
                normalizedText: nil,
                hash: nil,
                verificationURL: nil,
                baseURL: nil
            )
        }

        await MainActor.run {
            currentStep = "Recognizing text..."
        }

        // Ensure JS bridge is initialized
        if jsBridge == nil {
            do {
                jsBridge = try JSBridge()
            } catch {
                throw PipelineError.jsBridgeInitFailed(error)
            }
        }

        guard let bridge = jsBridge else {
            throw PipelineError.jsBridgeInitFailed(JSBridgeError.contextCreationFailed)
        }

        // Step 1: OCR with Vision (on cropped image)
        let rawText: String
        do {
            rawText = try await textRecognizer.recognizeText(in: croppedImage)
        } catch {
            await MainActor.run {
                isProcessing = false
            }
            throw PipelineError.ocrFailed(error)
        }

        await MainActor.run {
            currentStep = "Extracting verification URL..."
        }

        // Step 2: Extract verify: URL
        guard let (baseURL, lineIndex) = bridge.extractVerificationURL(from: rawText) else {
            await MainActor.run {
                isProcessing = false
            }
            return VerificationResult(
                outcome: .noVerifyURL,
                rawText: rawText,
                normalizedText: nil,
                hash: nil,
                verificationURL: nil,
                baseURL: nil
            )
        }

        await MainActor.run {
            currentStep = "Fetching metadata..."
        }

        // Step 3: Fetch verification-meta.json (optional)
        let meta = await verificationClient.fetchVerificationMeta(baseURL: baseURL)

        await MainActor.run {
            currentStep = "Normalizing text..."
        }

        // Step 4: Extract cert text (lines before URL)
        guard let certText = bridge.extractCertText(from: rawText, urlLineIndex: lineIndex) else {
            await MainActor.run {
                isProcessing = false
            }
            throw PipelineError.normalizationFailed
        }

        // Step 5: Normalize (via JSBridge - uses same JS as web app!)
        guard let normalizedText = bridge.normalizeText(certText, metadata: meta) else {
            await MainActor.run {
                isProcessing = false
            }
            throw PipelineError.normalizationFailed
        }

        await MainActor.run {
            currentStep = "Computing hash..."
        }

        // Step 6: Hash (native CryptoKit - faster than JS)
        let hash = SHA256Hasher.hashHex(normalizedText)

        await MainActor.run {
            currentStep = "Building verification URL..."
        }

        // Step 7: Build verification URL (with suffix from meta if available)
        guard let verificationURL = bridge.buildVerificationURL(baseURL: baseURL, hash: hash, meta: meta) else {
            await MainActor.run {
                isProcessing = false
            }
            throw PipelineError.urlBuildFailed
        }
        Log.d("Pipeline", "Verification URL: \(verificationURL)")

        await MainActor.run {
            currentStep = "Verifying..."
        }

        // Step 8: Verify against issuer endpoint
        let outcome = await verificationClient.verify(verificationURL: verificationURL, meta: meta)

        // Check authorization chain if meta has authorizedBy
        var authorization: AuthorizationResult?
        if let meta = meta, meta["authorizedBy"] != nil {
            await MainActor.run {
                currentStep = "Checking authorization..."
            }
            let httpsBase = baseURL.lowercased().hasPrefix("verify:") ? "https://" + String(baseURL.dropFirst(7)) :
                baseURL.lowercased().hasPrefix("vfy:") ? "https://" + String(baseURL.dropFirst(4)) :
                baseURL.lowercased().hasPrefix("https://") ? baseURL : "https://" + baseURL
            let metaUrl = "\(httpsBase)/verification-meta.json"
            authorization = await verificationClient.checkAuthorization(meta: meta, metaUrl: metaUrl)
        }

        await MainActor.run {
            isProcessing = false
            currentStep = ""
        }

        return VerificationResult(
            outcome: outcome,
            rawText: rawText,
            normalizedText: normalizedText,
            hash: hash,
            verificationURL: verificationURL,
            baseURL: baseURL,
            authorization: authorization
        )
    }

    /// Verify text scanned via DataScanner (no image processing needed)
    /// - Parameter rawText: Text selected by user tapping on recognized text
    /// - Returns: VerificationResult with outcome and intermediate data
    func verifyText(_ rawText: String) async throws -> VerificationResult {
        await MainActor.run {
            isProcessing = true
            currentStep = "Extracting verification URL..."
        }

        Log.d("Pipeline", "Verifying text (\(rawText.count) chars)")

        // Ensure JS bridge is initialized
        if jsBridge == nil {
            do {
                jsBridge = try JSBridge()
            } catch {
                await MainActor.run { isProcessing = false }
                throw PipelineError.jsBridgeInitFailed(error)
            }
        }

        guard let bridge = jsBridge else {
            await MainActor.run { isProcessing = false }
            throw PipelineError.jsBridgeInitFailed(JSBridgeError.contextCreationFailed)
        }

        // Extract verify: URL
        guard let (baseURL, lineIndex) = bridge.extractVerificationURL(from: rawText) else {
            await MainActor.run { isProcessing = false }
            return VerificationResult(
                outcome: .noVerifyURL,
                rawText: rawText,
                normalizedText: nil,
                hash: nil,
                verificationURL: nil,
                baseURL: nil
            )
        }

        Log.d("Pipeline", "Found verify URL: \(baseURL) at line \(lineIndex)")

        await MainActor.run {
            currentStep = "Fetching metadata..."
        }

        // Fetch verification-meta.json (optional)
        let meta = await verificationClient.fetchVerificationMeta(baseURL: baseURL)

        await MainActor.run {
            currentStep = "Normalizing text..."
        }

        // Extract cert text (lines before URL)
        guard let certText = bridge.extractCertText(from: rawText, urlLineIndex: lineIndex) else {
            await MainActor.run { isProcessing = false }
            throw PipelineError.normalizationFailed
        }

        Log.d("Pipeline", "Cert text: \(certText.prefix(100))...")

        // Normalize (via JSBridge - uses same JS as web app!)
        guard let normalizedText = bridge.normalizeText(certText, metadata: meta) else {
            await MainActor.run { isProcessing = false }
            throw PipelineError.normalizationFailed
        }

        await MainActor.run {
            currentStep = "Computing hash..."
        }

        // Hash (native CryptoKit)
        let hash = SHA256Hasher.hashHex(normalizedText)
        Log.d("Pipeline", "Hash: \(hash)")

        await MainActor.run {
            currentStep = "Building verification URL..."
        }

        // Build verification URL (with suffix from meta if available)
        guard let verificationURL = bridge.buildVerificationURL(baseURL: baseURL, hash: hash, meta: meta) else {
            await MainActor.run { isProcessing = false }
            throw PipelineError.urlBuildFailed
        }
        Log.d("Pipeline", "Verification URL: \(verificationURL)")

        await MainActor.run {
            currentStep = "Verifying..."
        }

        // Verify against issuer endpoint
        let outcome = await verificationClient.verify(verificationURL: verificationURL, meta: meta)

        // Check authorization chain if meta has authorizedBy
        var authorization: AuthorizationResult?
        if let meta = meta, meta["authorizedBy"] != nil {
            await MainActor.run {
                currentStep = "Checking authorization..."
            }
            let httpsBase = baseURL.lowercased().hasPrefix("verify:") ? "https://" + String(baseURL.dropFirst(7)) :
                baseURL.lowercased().hasPrefix("vfy:") ? "https://" + String(baseURL.dropFirst(4)) :
                baseURL.lowercased().hasPrefix("https://") ? baseURL : "https://" + baseURL
            let metaUrl = "\(httpsBase)/verification-meta.json"
            authorization = await verificationClient.checkAuthorization(meta: meta, metaUrl: metaUrl)
        }

        await MainActor.run {
            isProcessing = false
            currentStep = ""
        }

        return VerificationResult(
            outcome: outcome,
            rawText: rawText,
            normalizedText: normalizedText,
            hash: hash,
            verificationURL: verificationURL,
            baseURL: baseURL,
            authorization: authorization
        )
    }

    /// Re-verify with edited/corrected text
    /// - Parameters:
    ///   - editedText: User-corrected text
    ///   - baseURL: Original base URL from the document
    /// - Returns: VerificationResult with new outcome
    func reVerify(editedText: String, baseURL: String) async throws -> VerificationResult {
        await MainActor.run {
            isProcessing = true
            currentStep = "Re-verifying..."
        }

        guard let bridge = jsBridge else {
            throw PipelineError.jsBridgeInitFailed(JSBridgeError.contextCreationFailed)
        }

        // Fetch metadata
        let meta = await verificationClient.fetchVerificationMeta(baseURL: baseURL)

        // Normalize the edited text
        guard let normalizedText = bridge.normalizeText(editedText, metadata: meta) else {
            await MainActor.run {
                isProcessing = false
            }
            throw PipelineError.normalizationFailed
        }

        // Hash
        let hash = SHA256Hasher.hashHex(normalizedText)

        // Build URL (with suffix from meta if available)
        guard let verificationURL = bridge.buildVerificationURL(baseURL: baseURL, hash: hash, meta: meta) else {
            await MainActor.run {
                isProcessing = false
            }
            throw PipelineError.urlBuildFailed
        }

        // Verify
        let outcome = await verificationClient.verify(verificationURL: verificationURL, meta: meta)

        // Check authorization chain
        var authorization: AuthorizationResult?
        if let meta = meta, meta["authorizedBy"] != nil {
            let httpsBase = baseURL.lowercased().hasPrefix("verify:") ? "https://" + String(baseURL.dropFirst(7)) :
                baseURL.lowercased().hasPrefix("vfy:") ? "https://" + String(baseURL.dropFirst(4)) :
                baseURL.lowercased().hasPrefix("https://") ? baseURL : "https://" + baseURL
            let metaUrl = "\(httpsBase)/verification-meta.json"
            authorization = await verificationClient.checkAuthorization(meta: meta, metaUrl: metaUrl)
        }

        await MainActor.run {
            isProcessing = false
            currentStep = ""
        }

        return VerificationResult(
            outcome: outcome,
            rawText: editedText,
            normalizedText: normalizedText,
            hash: hash,
            verificationURL: verificationURL,
            baseURL: baseURL,
            authorization: authorization
        )
    }
}
