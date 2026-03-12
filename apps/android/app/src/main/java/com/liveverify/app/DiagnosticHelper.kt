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
 * Helper functions for diagnostic display features.
 */
object DiagnosticHelper {

    /**
     * Appends a return symbol (⏎) to each line for visual debugging.
     * This helps users see exactly where line breaks are in OCR output.
     */
    fun withReturnSymbols(text: String): String {
        return text.lines().joinToString("\n") { "$it\u23CE" }
    }

    /**
     * Formats a SHA-256 hash for display, optionally truncating with ellipsis.
     * @param hash The full 64-character hex hash
     * @param maxLength Maximum display length (0 = no truncation)
     * @return Formatted hash string
     */
    fun formatHash(hash: String, maxLength: Int = 0): String {
        if (maxLength <= 0 || hash.length <= maxLength) {
            return hash
        }
        val halfLen = (maxLength - 3) / 2
        return "${hash.take(halfLen)}...${hash.takeLast(halfLen)}"
    }
}
