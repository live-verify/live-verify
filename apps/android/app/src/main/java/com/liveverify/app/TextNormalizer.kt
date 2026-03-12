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

import java.security.MessageDigest

/**
 * Text normalization matching public/normalize.js
 *
 * CRITICAL: This implementation must stay in sync with:
 * - public/normalize.js (JavaScript, web app)
 * - apps/browser-extension/shared/normalize.js (JavaScript ES modules)
 * - apps/ios/LiveVerify uses JSBridge to run normalize.js directly
 *
 * Any changes to normalization rules must be applied to all implementations.
 */
object TextNormalizer {

    /**
     * Document-specific metadata for normalization
     */
    data class Metadata(
        val charNormalization: String? = null,
        val ocrNormalizationRules: List<OcrRule>? = null
    )

    data class OcrRule(
        val pattern: String,
        val replacement: String
    )

    /**
     * Apply document-specific normalization rules from verification-meta.json
     */
    private fun applyDocSpecificNorm(text: String, metadata: Metadata?): String {
        if (metadata == null) return text

        var result = text

        // 1. Apply character normalization (compact notation: "éèêë→e àáâä→a")
        metadata.charNormalization?.let { charNorm ->
            val groups = charNorm.trim().split(Regex("\\s+"))
            for (group in groups) {
                val parts = group.split("→")
                if (parts.size == 2 && parts[1].length == 1) {
                    val sourceChars = parts[0]
                    val targetChar = parts[1]
                    for (sourceChar in sourceChars) {
                        result = result.replace(sourceChar.toString(), targetChar)
                    }
                }
            }
        }

        // 2. Apply OCR normalization rules (regex patterns)
        metadata.ocrNormalizationRules?.forEach { rule ->
            try {
                val regex = Regex(rule.pattern)
                result = result.replace(regex, rule.replacement)
            } catch (e: Exception) {
                // Invalid regex pattern, skip
            }
        }

        return result
    }

    /**
     * Normalize text according to verification rules
     *
     * @param text Text to normalize
     * @param metadata Optional metadata from verification-meta.json
     * @return Normalized text
     */
    fun normalizeText(text: String, metadata: Metadata? = null): String {
        var result = text

        // Apply document-specific normalization FIRST
        result = applyDocSpecificNorm(result, metadata)

        // Normalize Unicode characters
        result = result
            .replace(Regex("[\u201C\u201D\u201E]"), "\"")  // Curly double quotes → straight
            .replace(Regex("[\u2018\u2019]"), "'")          // Curly single quotes → straight
            .replace(Regex("[\u00AB\u00BB]"), "\"")         // Angle quotes → straight double
            .replace(Regex("[\u2013\u2014]"), "-")          // En/em dash → hyphen
            .replace("\u00A0", " ")                          // Non-breaking space → space
            .replace("\u2026", "...")                        // Ellipsis → three periods

        // Split into lines, process each, filter blanks
        val normalizedLines = result.split("\n")
            .map { line ->
                line.replace(Regex("^\\s+"), "")    // Remove leading spaces
                    .replace(Regex("\\s+$"), "")    // Remove trailing spaces
                    .replace(Regex("\\s+"), " ")    // Collapse multiple spaces
            }
            .filter { it.isNotEmpty() }

        // Join back with newlines, no trailing newline
        return normalizedLines.joinToString("\n")
    }

    /**
     * SHA-256 hash of text
     *
     * @param text Text to hash
     * @return Hex-encoded SHA-256 hash
     */
    fun sha256(text: String): String {
        val bytes = text.toByteArray(Charsets.UTF_8)
        val digest = MessageDigest.getInstance("SHA-256")
        val hashBytes = digest.digest(bytes)
        return hashBytes.joinToString("") { "%02x".format(it) }
    }
}
