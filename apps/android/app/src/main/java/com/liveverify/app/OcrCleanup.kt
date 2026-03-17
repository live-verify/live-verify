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

/**
 * OCR-specific artifact cleanup functions.
 * Matches public/ocr-cleanup.js - keep in sync.
 */
object OcrCleanup {

    /**
     * Clean OCR artifacts from text (border characters, trailing letters).
     * Call this BEFORE normalizeText() for OCR'd content.
     *
     * @param text Raw OCR text
     * @return Text with OCR artifacts removed
     */
    fun cleanOcrArtifacts(text: String): String {
        val lines = text.split("\n")

        val cleanedLines = lines.map { line ->
            var cleaned = line

            // Remove leading border artifacts (OCR from registration marks/borders)
            // Common characters: | ~ ` ^ * # + = _ \ / [ ] { }
            cleaned = cleaned.replace(Regex("^[|~`^*#+=/\\\\\\[\\]{}]+\\s*"), "")

            // Remove trailing border artifacts
            cleaned = cleaned.replace(Regex("\\s*[|~`^*#+=/\\\\\\[\\]{}]+$"), "")

            // Remove trailing ⌝ registration mark (U+231D)
            // Temporary: until Apple/Google OCR engines consume this mark natively
            cleaned = cleaned.replace(Regex("\\s*\u231D$"), "")

            // Remove trailing single lowercase letter (OCR artifact)
            // Preserves uppercase like "Appendix A", "Grade A" which are likely meaningful
            cleaned = cleaned.replace(Regex("\\s+[a-z]$"), "")

            cleaned
        }

        return cleanedLines.joinToString("\n")
    }
}
