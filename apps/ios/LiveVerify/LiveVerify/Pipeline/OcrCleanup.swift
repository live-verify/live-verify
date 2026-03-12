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

/// OCR-specific artifact cleanup functions.
/// Matches public/ocr-cleanup.js - keep in sync.
enum OcrCleanup {

    /// Clean OCR artifacts from text (border characters, trailing letters).
    /// Call this BEFORE normalizeText() for OCR'd content.
    ///
    /// - Parameter text: Raw OCR text
    /// - Returns: Text with OCR artifacts removed
    static func cleanOcrArtifacts(_ text: String) -> String {
        let lines = text.components(separatedBy: "\n")

        let cleanedLines = lines.map { line -> String in
            var cleaned = line

            // Remove leading border artifacts (OCR from registration marks/borders)
            // Common characters: | ~ ` ^ * # + = _ \ / [ ] { }
            if let match = cleaned.range(of: "^[|~`^*#+=/\\\\\\[\\]{}]+\\s*", options: .regularExpression) {
                cleaned.removeSubrange(match)
            }

            // Remove trailing border artifacts
            if let match = cleaned.range(of: "\\s*[|~`^*#+=/\\\\\\[\\]{}]+$", options: .regularExpression) {
                cleaned.removeSubrange(match)
            }

            // Remove trailing single lowercase letter (OCR artifact)
            // Preserves uppercase like "Appendix A", "Grade A" which are likely meaningful
            if let match = cleaned.range(of: "\\s+[a-z]$", options: .regularExpression) {
                cleaned.removeSubrange(match)
            }

            return cleaned
        }

        return cleanedLines.joined(separator: "\n")
    }
}
