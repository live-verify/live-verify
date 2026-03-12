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

import SwiftUI
import UIKit
import VisionKit
import Vision

/// DataScannerViewController wrapper for SwiftUI
/// Uses DataScanner for live UI, then VNRecognizeTextRequest for per-line text extraction
struct DataScanner: UIViewControllerRepresentable {

    @Binding var isScanning: Bool
    @Binding var scannedText: String
    @Binding var capturedImage: UIImage?

    func makeUIViewController(context: Context) -> DataScannerViewController {
        let controller = DataScannerViewController(
            recognizedDataTypes: [.text()],
            qualityLevel: .accurate,
            recognizesMultipleItems: true,
            isHighFrameRateTrackingEnabled: true,
            isHighlightingEnabled: true
        )

        controller.delegate = context.coordinator
        context.coordinator.scanner = controller

        return controller
    }

    func updateUIViewController(_ uiViewController: DataScannerViewController, context: Context) {
        if isScanning {
            if !uiViewController.isScanning {
                try? uiViewController.startScanning()
                Log.d("DataScanner", "Started scanning")
            }
        } else {
            if uiViewController.isScanning {
                uiViewController.stopScanning()
                Log.d("DataScanner", "Stopped scanning")
            }
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, DataScannerViewControllerDelegate {
        var parent: DataScanner
        weak var scanner: DataScannerViewController?

        init(_ parent: DataScanner) {
            self.parent = parent
        }

        func dataScanner(_ dataScanner: DataScannerViewController, didTapOn item: RecognizedItem) {
            // User tapped - capture photo and run VNRecognizeTextRequest for per-line text
            // Only process the tapped region, not the entire viewfinder

            // Get bounds of tapped item
            // RecognizedItem.Bounds has corner points, convert to CGRect
            let itemBounds: CGRect
            switch item {
            case .text(let text):
                let bounds = text.bounds
                let minX = min(bounds.topLeft.x, bounds.bottomLeft.x)
                let maxX = max(bounds.topRight.x, bounds.bottomRight.x)
                let minY = min(bounds.topLeft.y, bounds.topRight.y)
                let maxY = max(bounds.bottomLeft.y, bounds.bottomRight.y)
                itemBounds = CGRect(x: minX, y: minY, width: maxX - minX, height: maxY - minY)
                Log.d("DataScanner", "Tapped text region: \(itemBounds)")
            case .barcode:
                Log.d("DataScanner", "Tapped barcode - ignoring")
                return
            @unknown default:
                Log.d("DataScanner", "Unknown item type")
                return
            }

            Task {
                do {
                    guard let scanner = self.scanner else {
                        Log.d("DataScanner", "No scanner reference")
                        return
                    }

                    // Capture still photo
                    let rawImage = try await scanner.capturePhoto()
                    Log.d("DataScanner", "Captured photo: \(rawImage.size), orientation: \(rawImage.imageOrientation.rawValue)")

                    // Normalize image orientation (render to remove rotation metadata)
                    guard let normalizedImage = self.normalizeOrientation(rawImage) else {
                        Log.d("DataScanner", "Failed to normalize image orientation")
                        return
                    }
                    Log.d("DataScanner", "Normalized image: \(normalizedImage.size)")

                    // Get view size for coordinate conversion
                    let viewSize = await MainActor.run { scanner.view.bounds.size }
                    Log.d("DataScanner", "View size: \(viewSize)")

                    // Crop to tapped region (accounting for aspect fill)
                    guard let croppedImage = self.cropToRegion(
                        image: normalizedImage,
                        viewBounds: itemBounds,
                        viewSize: viewSize
                    ) else {
                        Log.d("DataScanner", "Failed to crop image")
                        return
                    }
                    Log.d("DataScanner", "Cropped image: \(croppedImage.size)")

                    // Run OCR only on cropped region
                    let text = await self.recognizeText(in: croppedImage)
                    Log.d("DataScanner", "Recognized text:\n\(text)")

                    await MainActor.run {
                        self.parent.capturedImage = croppedImage
                        self.parent.scannedText = text
                    }
                } catch {
                    Log.d("DataScanner", "Photo capture failed: \(error)")
                }
            }
        }

        /// Normalize image orientation by rendering to a new context
        private func normalizeOrientation(_ image: UIImage) -> UIImage? {
            guard image.imageOrientation != .up else { return image }

            UIGraphicsBeginImageContextWithOptions(image.size, false, image.scale)
            image.draw(in: CGRect(origin: .zero, size: image.size))
            let normalizedImage = UIGraphicsGetImageFromCurrentImageContext()
            UIGraphicsEndImageContext()
            return normalizedImage
        }

        /// Crop image to view bounds, accounting for aspect fill display mode
        private func cropToRegion(image: UIImage, viewBounds: CGRect, viewSize: CGSize) -> UIImage? {
            guard let cgImage = image.cgImage else { return nil }

            let imageSize = image.size

            // Calculate aspect fill scale and offset
            // Aspect fill: scale to fill view, crop overflow
            let scaleX = imageSize.width / viewSize.width
            let scaleY = imageSize.height / viewSize.height
            let scale = min(scaleX, scaleY)  // Aspect fill uses min to ensure full coverage

            // Calculate the visible portion of the image in the view
            let visibleImageWidth = viewSize.width * scale
            let visibleImageHeight = viewSize.height * scale

            // Offset from center (aspect fill centers the content)
            let offsetX = (imageSize.width - visibleImageWidth) / 2
            let offsetY = (imageSize.height - visibleImageHeight) / 2

            Log.d("DataScanner", "Aspect fill - scale: \(scale), offset: (\(offsetX), \(offsetY))")

            // Convert view coordinates to image coordinates
            let padding: CGFloat = 0.2  // 20% padding
            let paddedBounds = viewBounds.insetBy(
                dx: -viewBounds.width * padding,
                dy: -viewBounds.height * padding
            )

            var cropRect = CGRect(
                x: offsetX + paddedBounds.minX * scale,
                y: offsetY + paddedBounds.minY * scale,
                width: paddedBounds.width * scale,
                height: paddedBounds.height * scale
            )

            Log.d("DataScanner", "Crop rect before clamping: \(cropRect)")

            // Clamp to image bounds
            cropRect = cropRect.intersection(CGRect(origin: .zero, size: imageSize))

            Log.d("DataScanner", "Crop rect after clamping: \(cropRect)")

            guard !cropRect.isEmpty else { return nil }

            // Convert to CGImage coordinates (need to scale by screen scale)
            let cgCropRect = CGRect(
                x: cropRect.minX * image.scale,
                y: cropRect.minY * image.scale,
                width: cropRect.width * image.scale,
                height: cropRect.height * image.scale
            )

            guard let croppedCGImage = cgImage.cropping(to: cgCropRect) else { return nil }

            return UIImage(cgImage: croppedCGImage, scale: image.scale, orientation: .up)
        }

        /// Run VNRecognizeTextRequest on image and return per-line text
        private func recognizeText(in image: UIImage) async -> String {
            guard let cgImage = image.cgImage else { return "" }

            return await withCheckedContinuation { continuation in
                let request = VNRecognizeTextRequest { request, error in
                    if let error = error {
                        Log.d("DataScanner", "VNRecognizeTextRequest error: \(error)")
                        continuation.resume(returning: "")
                        return
                    }

                    guard let observations = request.results as? [VNRecognizedTextObservation] else {
                        continuation.resume(returning: "")
                        return
                    }

                    Log.d("DataScanner", "VNRecognizeTextRequest found \(observations.count) lines")

                    // Extract observations with bounding box info
                    struct TextObs {
                        let text: String
                        let centerX: CGFloat
                        let centerY: CGFloat
                        let height: CGFloat
                    }

                    var obs: [TextObs] = []
                    for observation in observations {
                        if let candidate = observation.topCandidates(1).first {
                            let box = observation.boundingBox
                            let o = TextObs(
                                text: candidate.string,
                                centerX: box.midX,
                                centerY: box.midY,
                                height: box.height
                            )
                            Log.d("DataScanner", "  Obs: '\(o.text.prefix(30))' x=\(o.centerX) y=\(o.centerY) h=\(o.height)")
                            obs.append(o)
                        }
                    }

                    // Group observations into lines by Y overlap.
                    // Two observations are on the same line if their Y centers differ
                    // by less than half the average height of their bounding boxes.
                    var lineGroups: [[TextObs]] = []
                    for o in obs {
                        var merged = false
                        for i in 0..<lineGroups.count {
                            let representative = lineGroups[i][0]
                            let threshold = max(o.height, representative.height) * 0.5
                            if abs(o.centerY - representative.centerY) < threshold {
                                lineGroups[i].append(o)
                                merged = true
                                break
                            }
                        }
                        if !merged {
                            lineGroups.append([o])
                        }
                    }

                    // Sort groups top-to-bottom (descending Y), then sort within each group left-to-right
                    lineGroups.sort { $0[0].centerY > $1[0].centerY }
                    for i in 0..<lineGroups.count {
                        lineGroups[i].sort { $0.centerX < $1.centerX }
                    }

                    // Join observations within each line group with spaces, then join lines with newlines
                    var resultLines = lineGroups.map { group in
                        group.map { $0.text }.joined(separator: " ")
                    }

                    // Fix verify:/vfy: lines - remove ALL spaces from the URL portion
                    for i in 0..<resultLines.count {
                        let line = resultLines[i]
                        let lower = line.lowercased()
                        if lower.hasPrefix("verify:") || lower.hasPrefix("vfy:") ||
                           lower.hasPrefix("verify :") || lower.hasPrefix("vfy :") {
                            // Remove all spaces from the entire line (URLs don't have spaces)
                            resultLines[i] = line.replacingOccurrences(of: " ", with: "")
                        }
                    }

                    let result = resultLines.joined(separator: "\n")

                    continuation.resume(returning: result)
                }

                request.recognitionLevel = .accurate
                request.usesLanguageCorrection = true

                let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
                do {
                    try handler.perform([request])
                } catch {
                    Log.d("DataScanner", "VNImageRequestHandler error: \(error)")
                    continuation.resume(returning: "")
                }
            }
        }

        func dataScanner(_ dataScanner: DataScannerViewController, didAdd addedItems: [RecognizedItem], allItems: [RecognizedItem]) {
            Log.d("DataScanner", "Detected \(allItems.count) items")
        }
    }
}

/// Check if DataScanner is available on this device
extension DataScanner {
    static var isSupported: Bool {
        DataScannerViewController.isSupported
    }

    static var isAvailable: Bool {
        DataScannerViewController.isAvailable
    }
}
