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

import Foundation
import UIKit
import Vision
import CoreImage

// MARK: - Document Detection using Apple's VNDetectDocumentSegmentationRequest

/// Error types for document detection
enum DocumentDetectionError: Error, LocalizedError {
    case noDocumentDetected
    case perspectiveCorrectionFailed
    case imageConversionFailed

    var errorDescription: String? {
        switch self {
        case .noDocumentDetected:
            return "No document detected in image"
        case .perspectiveCorrectionFailed:
            return "Failed to apply perspective correction"
        case .imageConversionFailed:
            return "Failed to convert image"
        }
    }
}

/// Detects documents using Apple's VNDetectDocumentSegmentationRequest (iOS 15+)
/// This is Apple's purpose-built API for finding documents in camera images
class ContourDetector {

    // MARK: - Public API

    /// Detect and crop to the document in the image
    /// Throws if no document detected - no fallback
    func detectAndCrop(image: UIImage) async throws -> UIImage {
        guard let cgImage = image.cgImage else {
            throw DocumentDetectionError.imageConversionFailed
        }

        // Try document segmentation first (iOS 15+)
        if let corners = try await detectDocumentCorners(in: cgImage) {
            Log.d("DocDetect", "Found document with corners")
            if let cropped = perspectiveCorrectedImage(from: cgImage, corners: corners) {
                Log.d("DocDetect", "Cropped to \(cropped.width)x\(cropped.height)")
                return UIImage(cgImage: cropped)
            }
            throw DocumentDetectionError.perspectiveCorrectionFailed
        }

        // Fall back to rectangle detection
        if let corners = try await detectRectangleCorners(in: cgImage) {
            Log.d("DocDetect", "Found rectangle with corners")
            if let cropped = perspectiveCorrectedImage(from: cgImage, corners: corners) {
                Log.d("DocDetect", "Cropped to \(cropped.width)x\(cropped.height)")
                return UIImage(cgImage: cropped)
            }
            throw DocumentDetectionError.perspectiveCorrectionFailed
        }

        throw DocumentDetectionError.noDocumentDetected
    }

    // MARK: - Document Segmentation (iOS 15+)

    private func detectDocumentCorners(in cgImage: CGImage) async throws -> [CGPoint]? {
        return try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<[CGPoint]?, Error>) in
            let request = VNDetectDocumentSegmentationRequest { request, error in
                if let error = error {
                    Log.d("DocDetect", "Segmentation error: \(error)")
                    continuation.resume(returning: nil)
                    return
                }

                guard let results = request.results as? [VNRectangleObservation],
                      let observation = results.first else {
                    Log.d("DocDetect", "No segmentation results")
                    continuation.resume(returning: nil)
                    return
                }

                let imageWidth = CGFloat(cgImage.width)
                let imageHeight = CGFloat(cgImage.height)

                // Convert normalized coordinates to image coordinates
                // Vision uses bottom-left origin, convert to top-left
                let topLeft = CGPoint(
                    x: observation.topLeft.x * imageWidth,
                    y: (1 - observation.topLeft.y) * imageHeight
                )
                let topRight = CGPoint(
                    x: observation.topRight.x * imageWidth,
                    y: (1 - observation.topRight.y) * imageHeight
                )
                let bottomRight = CGPoint(
                    x: observation.bottomRight.x * imageWidth,
                    y: (1 - observation.bottomRight.y) * imageHeight
                )
                let bottomLeft = CGPoint(
                    x: observation.bottomLeft.x * imageWidth,
                    y: (1 - observation.bottomLeft.y) * imageHeight
                )

                Log.d("DocDetect", "Segmentation found: TL=\(topLeft), TR=\(topRight), BR=\(bottomRight), BL=\(bottomLeft)")
                continuation.resume(returning: [topLeft, topRight, bottomRight, bottomLeft])
            }

            let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
            do {
                try handler.perform([request])
            } catch {
                Log.d("DocDetect", "Segmentation handler error: \(error)")
                continuation.resume(returning: nil)
            }
        }
    }

    // MARK: - Rectangle Detection (fallback)

    private func detectRectangleCorners(in cgImage: CGImage) async throws -> [CGPoint]? {
        return try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<[CGPoint]?, Error>) in
            let request = VNDetectRectanglesRequest { request, error in
                if let error = error {
                    Log.d("DocDetect", "Rectangle error: \(error)")
                    continuation.resume(returning: nil)
                    return
                }

                guard let results = request.results as? [VNRectangleObservation],
                      let observation = results.first else {
                    Log.d("DocDetect", "No rectangle results")
                    continuation.resume(returning: nil)
                    return
                }

                let imageWidth = CGFloat(cgImage.width)
                let imageHeight = CGFloat(cgImage.height)

                // Convert normalized coordinates to image coordinates
                let topLeft = CGPoint(
                    x: observation.topLeft.x * imageWidth,
                    y: (1 - observation.topLeft.y) * imageHeight
                )
                let topRight = CGPoint(
                    x: observation.topRight.x * imageWidth,
                    y: (1 - observation.topRight.y) * imageHeight
                )
                let bottomRight = CGPoint(
                    x: observation.bottomRight.x * imageWidth,
                    y: (1 - observation.bottomRight.y) * imageHeight
                )
                let bottomLeft = CGPoint(
                    x: observation.bottomLeft.x * imageWidth,
                    y: (1 - observation.bottomLeft.y) * imageHeight
                )

                Log.d("DocDetect", "Rectangle found: TL=\(topLeft), TR=\(topRight), BR=\(bottomRight), BL=\(bottomLeft)")
                continuation.resume(returning: [topLeft, topRight, bottomRight, bottomLeft])
            }

            // Configure for document-like rectangles
            request.minimumAspectRatio = 0.3
            request.maximumAspectRatio = 1.0
            request.minimumSize = 0.1
            request.maximumObservations = 1
            request.minimumConfidence = 0.5

            let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
            do {
                try handler.perform([request])
            } catch {
                Log.d("DocDetect", "Rectangle handler error: \(error)")
                continuation.resume(returning: nil)
            }
        }
    }

    // MARK: - Perspective Correction

    private func perspectiveCorrectedImage(from cgImage: CGImage, corners: [CGPoint]) -> CGImage? {
        guard corners.count == 4 else { return nil }

        let ciImage = CIImage(cgImage: cgImage)
        let imageHeight = ciImage.extent.height

        let tl = corners[0], tr = corners[1], br = corners[2], bl = corners[3]

        // CIFilter expects bottom-left origin, so flip Y
        let tlCI = CGPoint(x: tl.x, y: imageHeight - tl.y)
        let trCI = CGPoint(x: tr.x, y: imageHeight - tr.y)
        let brCI = CGPoint(x: br.x, y: imageHeight - br.y)
        let blCI = CGPoint(x: bl.x, y: imageHeight - bl.y)

        guard let filter = CIFilter(name: "CIPerspectiveCorrection") else {
            return nil
        }

        filter.setValue(ciImage, forKey: kCIInputImageKey)
        filter.setValue(CIVector(cgPoint: tlCI), forKey: "inputTopLeft")
        filter.setValue(CIVector(cgPoint: trCI), forKey: "inputTopRight")
        filter.setValue(CIVector(cgPoint: blCI), forKey: "inputBottomLeft")
        filter.setValue(CIVector(cgPoint: brCI), forKey: "inputBottomRight")

        guard let output = filter.outputImage else { return nil }

        let context = CIContext()
        return context.createCGImage(output, from: output.extent)
    }
}
