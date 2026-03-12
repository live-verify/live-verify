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

import org.junit.Assert.*
import org.junit.Test

/**
 * Unit tests for TextNormalizer
 * These tests must match the JavaScript tests in __tests__/ocr-hash.test.js
 */
class TextNormalizerTest {

    // ==================== Text Normalization Tests ====================

    @Test
    fun `should remove leading spaces`() {
        val input = "  Hello World"
        val expected = "Hello World"
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should remove trailing spaces`() {
        val input = "Hello World  "
        val expected = "Hello World"
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should collapse multiple spaces to single space`() {
        val input = "Hello    World"
        val expected = "Hello World"
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should remove blank lines`() {
        val input = "Line 1\n\nLine 2"
        val expected = "Line 1\nLine 2"
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should handle complex multi-line text`() {
        val input = "  Hello World\n\n  Test  Line  "
        val expected = "Hello World\nTest Line"
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should normalize curly double quotes to straight quotes`() {
        val input = "Thesis: \u201COn theMalleability of L-Space\u201D"
        val expected = "Thesis: \"On theMalleability of L-Space\""
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should normalize curly single quotes to straight quotes`() {
        val input = "It\u2019s a nice day"  // Right single quote
        val expected = "It's a nice day"
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should normalize en-dash and em-dash to hyphen`() {
        val input = "Date: 2020\u20132024 \u2014 present"  // en-dash and em-dash
        val expected = "Date: 2020-2024 - present"
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should normalize non-breaking spaces to regular spaces`() {
        val input = "Hello\u00A0World"
        val expected = "Hello World"
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should normalize ellipsis to three periods`() {
        val input = "To be continued\u2026"
        val expected = "To be continued..."
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    @Test
    fun `should normalize angle quotes to straight double quotes`() {
        val input = "\u00ABquoted\u00BB"  // « and »
        val expected = "\"quoted\""
        assertEquals(expected, TextNormalizer.normalizeText(input))
    }

    // ==================== SHA-256 Hashing Tests ====================

    @Test
    fun `should generate correct SHA-256 hash`() {
        val text = "Hello World"
        val expected = "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
        assertEquals(expected, TextNormalizer.sha256(text))
    }

    @Test
    fun `should generate different hashes for different text`() {
        val text1 = "Hello World"
        val text2 = "Hello  World"  // Extra space
        assertNotEquals(TextNormalizer.sha256(text1), TextNormalizer.sha256(text2))
    }

    @Test
    fun `should generate same hash after normalization`() {
        val text1 = "  Hello World  "
        val text2 = "Hello    World"
        val normalized1 = TextNormalizer.normalizeText(text1)
        val normalized2 = TextNormalizer.normalizeText(text2)
        assertEquals(TextNormalizer.sha256(normalized1), TextNormalizer.sha256(normalized2))
    }

    @Test
    fun `hash should be 64 hex characters`() {
        val hash = TextNormalizer.sha256("test")
        assertEquals(64, hash.length)
        assertTrue(hash.matches(Regex("^[a-f0-9]{64}$")))
    }

    // ==================== Full Verification Flow Tests ====================

    @Test
    fun `should verify document with matching hash in URL`() {
        val certText = """This gown was certified by Intertek
on March 1, 2022 for MedPro Ltd of
Douglas, Isle of Man.
UK medical standards Abc123, Def456
apply. #SHAT0664891
Description of gown: one piece,
tie behind, neck loop, spunbond
polypropylene, spash resistent
sterile, double wrapped."""

        val normalized = TextNormalizer.normalizeText(certText)
        val hash = TextNormalizer.sha256(normalized)
        val claimedUrl = "https://intertek.com/certifications/$hash"

        assertTrue(claimedUrl.contains(hash))
    }

    @Test
    fun `should fail verification when hash does not match URL`() {
        val certText = """This gown was certified by Intertek
on March 1, 2022 for MedPro Ltd of
Douglas, Isle of Man."""

        val normalized = TextNormalizer.normalizeText(certText)
        val hash = TextNormalizer.sha256(normalized)
        val claimedUrl = "https://intertek.com/certifications/wronghash123"

        assertFalse(claimedUrl.contains(hash))
    }

    @Test
    fun `should preserve exact wording including typos`() {
        val text = "polypropylene, spash resistent"
        val normalized = TextNormalizer.normalizeText(text)
        assertTrue(normalized.contains("spash resistent"))
    }

    // ==================== Document-Specific Normalization Tests ====================

    @Test
    fun `should apply character normalization from metadata`() {
        val text = "Café résumé"
        val metadata = TextNormalizer.Metadata(
            charNormalization = "éè→e àá→a"
        )
        val result = TextNormalizer.normalizeText(text, metadata)
        assertEquals("Cafe resume", result)
    }

    @Test
    fun `should apply OCR normalization rules from metadata`() {
        val text = "CHF 100"
        val metadata = TextNormalizer.Metadata(
            ocrNormalizationRules = listOf(
                TextNormalizer.OcrRule("CHF\\s+(\\d)", "CHF$1")
            )
        )
        val result = TextNormalizer.normalizeText(text, metadata)
        assertEquals("CHF100", result)
    }

    @Test
    fun `should handle null metadata gracefully`() {
        val text = "Hello World"
        val result = TextNormalizer.normalizeText(text, null)
        assertEquals("Hello World", result)
    }

    // Cross-platform consistency tests are in CrossPlatformHashTest.kt
    // which reads from /normalization-hashes/ shared fixtures
}
