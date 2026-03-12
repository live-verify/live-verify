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
import Vision
import UIKit

/// Errors that can occur during text recognition
enum TextRecognitionError: Error, LocalizedError {
    case imageConversionFailed
    case noTextFound
    case recognitionFailed(Error)

    var errorDescription: String? {
        switch self {
        case .imageConversionFailed:
            return "Failed to convert image for text recognition"
        case .noTextFound:
            return "No text found in image"
        case .recognitionFailed(let error):
            return "Text recognition failed: \(error.localizedDescription)"
        }
    }
}

/// Text recognition using iOS Vision framework (Live Text)
class TextRecognizer {
    /// OCR hints from verification-meta.json
    struct OCRHints {
        var languages: [String]?
        var recognitionLevel: String?
        var allowedCharacters: String?
        var customVocabulary: [String]?
        var minimumTextHeight: Float?

        init(from dictionary: [String: Any]?) {
            guard let dict = dictionary?["ocrHints"] as? [String: Any] else { return }
            self.languages = dict["languages"] as? [String]
            self.recognitionLevel = dict["recognitionLevel"] as? String
            self.allowedCharacters = dict["allowedCharacters"] as? String
            self.customVocabulary = dict["customVocabulary"] as? [String]
            self.minimumTextHeight = dict["minimumTextHeight"] as? Float
        }
    }

    /// Recognize text in an image using Vision framework
    /// - Parameters:
    ///   - image: UIImage to process
    ///   - hints: Optional OCR hints from verification-meta.json
    /// - Returns: Recognized text as a single string with newlines
    func recognizeText(in image: UIImage, hints: OCRHints? = nil) async throws -> String {
        guard let cgImage = image.cgImage else {
            throw TextRecognitionError.imageConversionFailed
        }
        return try await recognizeText(in: cgImage, hints: hints)
    }

    /// Recognize text in a CGImage using Vision framework
    /// - Parameters:
    ///   - cgImage: CGImage to process
    ///   - hints: Optional OCR hints from verification-meta.json
    /// - Returns: Recognized text as a single string with newlines
    func recognizeText(in cgImage: CGImage, hints: OCRHints? = nil) async throws -> String {
        return try await withCheckedThrowingContinuation { continuation in
            let request = VNRecognizeTextRequest { request, error in
                if let error = error {
                    continuation.resume(throwing: TextRecognitionError.recognitionFailed(error))
                    return
                }

                guard let observations = request.results as? [VNRecognizedTextObservation],
                      !observations.isEmpty else {
                    continuation.resume(throwing: TextRecognitionError.noTextFound)
                    return
                }

                // Sort observations by Y position (top to bottom)
                let sortedObservations = observations.sorted { obs1, obs2 in
                    // Vision uses bottom-left origin, so higher Y is actually higher on screen
                    obs1.boundingBox.origin.y > obs2.boundingBox.origin.y
                }

                // Extract top candidate from each observation
                let lines = sortedObservations.compactMap { observation -> String? in
                    observation.topCandidates(1).first?.string
                }

                let text = lines.joined(separator: "\n")
                continuation.resume(returning: text)
            }

            // Configure recognition level
            if hints?.recognitionLevel == "fast" {
                request.recognitionLevel = .fast
            } else {
                request.recognitionLevel = .accurate
            }

            // Configure languages
            if let languages = hints?.languages, !languages.isEmpty {
                request.recognitionLanguages = languages
            } else {
                request.recognitionLanguages = ["en-US"]
            }

            // Configure custom vocabulary
            if let vocab = hints?.customVocabulary, !vocab.isEmpty {
                request.customWords = vocab
            }

            // Configure minimum text height
            if let minHeight = hints?.minimumTextHeight {
                request.minimumTextHeight = minHeight
            }

            // Perform recognition
            let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
            do {
                try handler.perform([request])
            } catch {
                continuation.resume(throwing: TextRecognitionError.recognitionFailed(error))
            }
        }
    }
}
