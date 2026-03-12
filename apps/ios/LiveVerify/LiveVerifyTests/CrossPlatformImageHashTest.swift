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

import XCTest
import Vision
import ImageIO
@testable import LiveVerify

/// Cross-platform image hash tests using Vision OCR.
/// These tests verify that iOS produces the same hashes as Android (ML Kit).
///
/// Image fixtures are loaded from the normalization-hashes/ directory.
/// The test reads .md files that contain image references ![](image.png),
/// performs OCR on the referenced image, normalizes the text, and
/// compares the resulting hash to the filename.
final class CrossPlatformImageHashTest: XCTestCase {

    /// Find the normalization-hashes directory by walking up from the test file location
    private func findFixturesDir() -> URL? {
        var dir = URL(fileURLWithPath: #filePath)
            .deletingLastPathComponent() // LiveVerifyTests
            .deletingLastPathComponent() // LiveVerify
            .deletingLastPathComponent() // LiveVerify (project)
            .deletingLastPathComponent() // ios
            .deletingLastPathComponent() // apps

        let fixturesDir = dir.appendingPathComponent("normalization-hashes")
        if FileManager.default.fileExists(atPath: fixturesDir.path) {
            return fixturesDir
        }
        return nil
    }

    /// Parse YAML-like frontmatter from markdown content
    private func parseFrontmatter(_ content: String) -> (metadata: [String: String]?, body: String) {
        let pattern = "^---\\n([\\s\\S]*?)\\n---\\n([\\s\\S]*)$"
        guard let regex = try? NSRegularExpression(pattern: pattern),
              let match = regex.firstMatch(in: content, range: NSRange(content.startIndex..., in: content)),
              let frontmatterRange = Range(match.range(at: 1), in: content),
              let bodyRange = Range(match.range(at: 2), in: content) else {
            return (nil, content)
        }

        let frontmatter = String(content[frontmatterRange])
        let body = String(content[bodyRange])

        var metadata: [String: String] = [:]
        let descPattern = "^description:\\s*(.+)$"
        if let descRegex = try? NSRegularExpression(pattern: descPattern, options: .anchorsMatchLines),
           let descMatch = descRegex.firstMatch(in: frontmatter, range: NSRange(frontmatter.startIndex..., in: frontmatter)),
           let descRange = Range(descMatch.range(at: 1), in: frontmatter) {
            metadata["description"] = String(frontmatter[descRange]).trimmingCharacters(in: .whitespaces)
        }

        return (metadata.isEmpty ? nil : metadata, body)
    }

    /// Extract image path from markdown image syntax ![](path.png)
    private func extractImagePath(_ body: String) -> String? {
        let trimmed = body.trimmingCharacters(in: .whitespacesAndNewlines)
        let pattern = "^!\\[\\]\\((.+)\\)$"
        guard let regex = try? NSRegularExpression(pattern: pattern),
              let match = regex.firstMatch(in: trimmed, range: NSRange(trimmed.startIndex..., in: trimmed)),
              let pathRange = Range(match.range(at: 1), in: trimmed) else {
            return nil
        }
        return String(trimmed[pathRange])
    }

    /// Load CGImage from file
    private func loadCGImage(from url: URL) throws -> CGImage {
        let data = try Data(contentsOf: url) as CFData
        guard let source = CGImageSourceCreateWithData(data, nil),
              let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else {
            throw NSError(domain: "CrossPlatformImageHashTest", code: 1,
                          userInfo: [NSLocalizedDescriptionKey: "Failed to load image from \(url.path)"])
        }
        return image
    }

    /// Perform OCR on an image using Vision framework
    private func recognizeText(from cgImage: CGImage) throws -> String {
        let request = VNRecognizeTextRequest()
        request.recognitionLevel = .accurate
        request.recognitionLanguages = ["en-US"]

        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        try handler.perform([request])

        guard let observations = request.results as? [VNRecognizedTextObservation] else {
            return ""
        }

        return observations.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
    }

    func testImageFixtures() throws {
        guard let fixturesDir = findFixturesDir() else {
            throw XCTSkip("normalization-hashes directory not found")
        }

        let fileManager = FileManager.default
        let contents = try fileManager.contentsOfDirectory(at: fixturesDir, includingPropertiesForKeys: nil)
        let mdFiles = contents.filter { $0.pathExtension == "md" && $0.lastPathComponent != "README.md" }

        var testedCount = 0
        var skippedCount = 0

        for file in mdFiles {
            let expectedHash = file.deletingPathExtension().lastPathComponent
            let content = try String(contentsOf: file, encoding: .utf8)
            let (frontmatter, body) = parseFrontmatter(content)

            guard let imagePath = extractImagePath(body) else {
                // Text fixture - skip (tested elsewhere)
                skippedCount += 1
                continue
            }

            let description = frontmatter?["description"] ?? file.lastPathComponent
            let imageURL = fixturesDir.appendingPathComponent(imagePath)

            guard fileManager.fileExists(atPath: imageURL.path) else {
                skippedCount += 1
                continue
            }

            // Load and OCR the image
            let cgImage = try loadCGImage(from: imageURL)
            let ocrText = try recognizeText(from: cgImage)

            // Apply OCR cleanup and normalization
            let cleaned = OcrCleanup.cleanOcrArtifacts(ocrText)
            let normalized = normalizeText(cleaned)
            let computedHash = SHA256Hasher.hashHex(normalized)

            XCTAssertEqual(computedHash, expectedHash,
                "Hash mismatch for: \(description)\nNormalized text:\n\(normalized)")

            testedCount += 1
        }

        XCTAssertTrue(testedCount > 0 || skippedCount > 0, "No image fixtures were found")
    }

    /// Basic text normalization matching TextNormalizer logic
    /// (Ideally would use JSBridge, but it requires bundle resources)
    private func normalizeText(_ text: String) -> String {
        var result = text

        // Normalize Unicode characters
        result = result.replacingOccurrences(of: "\u{201C}", with: "\"") // Left double quote
        result = result.replacingOccurrences(of: "\u{201D}", with: "\"") // Right double quote
        result = result.replacingOccurrences(of: "\u{201E}", with: "\"") // Double low quote
        result = result.replacingOccurrences(of: "\u{2018}", with: "'")  // Left single quote
        result = result.replacingOccurrences(of: "\u{2019}", with: "'")  // Right single quote
        result = result.replacingOccurrences(of: "\u{00AB}", with: "\"") // Left angle quote
        result = result.replacingOccurrences(of: "\u{00BB}", with: "\"") // Right angle quote
        result = result.replacingOccurrences(of: "\u{2013}", with: "-")  // En dash
        result = result.replacingOccurrences(of: "\u{2014}", with: "-")  // Em dash
        result = result.replacingOccurrences(of: "\u{00A0}", with: " ")  // Non-breaking space
        result = result.replacingOccurrences(of: "\u{2026}", with: "...") // Ellipsis

        // Split into lines and normalize each
        let lines = result.components(separatedBy: "\n")
        let normalizedLines = lines.compactMap { line -> String? in
            var l = line
            // Trim leading/trailing whitespace
            l = l.trimmingCharacters(in: .whitespaces)
            // Collapse multiple spaces
            while l.contains("  ") {
                l = l.replacingOccurrences(of: "  ", with: " ")
            }
            // Skip empty lines
            return l.isEmpty ? nil : l
        }

        return normalizedLines.joined(separator: "\n")
    }
}
