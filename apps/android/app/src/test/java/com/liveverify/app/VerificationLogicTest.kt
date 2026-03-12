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
 * Unit tests for VerificationLogic
 * These tests must match the JavaScript tests in __tests__/app-logic.test.js
 */
class VerificationLogicTest {

    // ==================== extractVerificationUrl Tests ====================

    @Test
    fun `should accept verify URLs`() {
        val rawText = """Certification text
verify:paul-hammant.github.io/live-verify/c"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertEquals("verify:paul-hammant.github.io/live-verify/c", result.url)
        assertEquals(1, result.urlLineIndex)
    }

    @Test
    fun `should accept vfy URLs`() {
        val rawText = """Certification text
vfy:paul-hammant.github.io/live-verify/c"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertEquals("vfy:paul-hammant.github.io/live-verify/c", result.url)
        assertEquals(1, result.urlLineIndex)
    }

    @Test
    fun `should return null for http URLs`() {
        val rawText = """Text
http://example.com"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertNull(result.url)
        assertEquals(-1, result.urlLineIndex)
    }

    @Test
    fun `should accept VERIFY in any case`() {
        val rawText = """Text
VERIFY:EXAMPLE.COM/PATH"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertEquals("verify:EXAMPLE.COM/PATH", result.url)
    }

    @Test
    fun `should accept VFY in any case`() {
        val rawText = """Text
VFY:EXAMPLE.COM/PATH"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertEquals("vfy:EXAMPLE.COM/PATH", result.url)
    }

    @Test
    fun `should discard OCR garbage below verify line`() {
        val rawText = """Unseen University |
Ankh-Morpork
Bachelor of Thaumatology
Awarded to: Ponder Stibbons
Date: Grune 23, A.M. 2024
Archchancellor: Mustrum Ridcully
Registrar: Rincewind (Wizzard)
verify:paul-hammant.github.io/live-verify/c
ee a SE AA i Aa A A Re Xe NE Ne ea"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertEquals("verify:paul-hammant.github.io/live-verify/c", result.url)
        assertEquals(7, result.urlLineIndex)
    }

    @Test
    fun `should NOT match spaced-out verify`() {
        val rawText = """Text
v e r i f y : e x a m p l e . c o m"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertNull(result.url)
    }

    @Test
    fun `should handle verify with space around colon`() {
        val rawText = """Text
verify : example.com/path"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertEquals("verify:example.com/path", result.url)
    }

    @Test
    fun `should remove all spaces from URL as OCR artifacts`() {
        val rawText = """Text
verify:example .com/path"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertEquals("verify:example.com/path", result.url)
    }

    @Test
    fun `should return null when no verification URL found`() {
        val rawText = """Just some text
without any verification URL"""

        val result = VerificationLogic.extractVerificationUrl(rawText)
        assertNull(result.url)
        assertEquals(-1, result.urlLineIndex)
    }

    // ==================== buildVerificationUrl Tests ====================

    @Test
    fun `should convert verify prefix to https`() {
        val result = VerificationLogic.buildVerificationUrl(
            "verify:example.com/c",
            "abc123"
        )
        assertEquals("https://example.com/c/abc123", result)
    }

    @Test
    fun `should convert vfy prefix to https`() {
        val result = VerificationLogic.buildVerificationUrl(
            "vfy:example.com/c",
            "abc123"
        )
        assertEquals("https://example.com/c/abc123", result)
    }

    @Test
    fun `should append suffix from meta`() {
        val result = VerificationLogic.buildVerificationUrl(
            "verify:example.com/c",
            "abc123",
            ".json"
        )
        assertEquals("https://example.com/c/abc123.json", result)
    }

    @Test
    fun `should throw for invalid URL format`() {
        assertThrows(IllegalArgumentException::class.java) {
            VerificationLogic.buildVerificationUrl("http://example.com", "abc123")
        }
    }

    // ==================== extractCertText Tests ====================

    @Test
    fun `should extract text before URL line`() {
        val rawText = """Line 1
Line 2
Line 3
verify:example.com/c"""

        val certText = VerificationLogic.extractCertText(rawText, 3)
        assertEquals("Line 1\nLine 2\nLine 3", certText)
    }

    @Test
    fun `should remove trailing blank lines from cert text`() {
        val rawText = """Line 1
Line 2

verify:example.com/c"""

        val certText = VerificationLogic.extractCertText(rawText, 3)
        assertEquals("Line 1\nLine 2", certText)
    }

    @Test
    fun `should handle URL on first line`() {
        val rawText = "verify:example.com/c"
        val certText = VerificationLogic.extractCertText(rawText, 0)
        assertEquals("", certText)
    }

    @Test
    fun `should preserve all content before URL line`() {
        val rawText = """Unseen University
Ankh-Morpork
Bachelor of Thaumatology
Awarded to: Ponder Stibbons
verify:paul-hammant.github.io/live-verify/c"""

        val certText = VerificationLogic.extractCertText(rawText, 4)
        assertTrue(certText.contains("Unseen University"))
        assertTrue(certText.contains("Ponder Stibbons"))
        assertFalse(certText.contains("verify:"))
    }

    // ==================== getDomainFromUrl Tests ====================

    @Test
    fun `should extract domain from https URL`() {
        assertEquals("example.com", VerificationLogic.getDomainFromUrl("https://example.com/path/hash"))
    }

    @Test
    fun `should extract domain from URL with subdirectory`() {
        assertEquals("paulhammant.com", VerificationLogic.getDomainFromUrl("https://paulhammant.com/refs/abc123.json"))
    }

    @Test
    fun `should extract domain from URL with port`() {
        assertEquals("example.com:8443", VerificationLogic.getDomainFromUrl("https://example.com:8443/path"))
    }

    @Test
    fun `should handle URL with no path`() {
        assertEquals("example.com", VerificationLogic.getDomainFromUrl("https://example.com"))
    }

    @Test
    fun `should handle http URL`() {
        assertEquals("example.com", VerificationLogic.getDomainFromUrl("http://example.com/path"))
    }

    @Test
    fun `should handle bare string with no protocol`() {
        assertEquals("example.com", VerificationLogic.getDomainFromUrl("example.com/path"))
    }

    // ==================== Integration Test ====================

    @Test
    fun `full verification flow should work end to end`() {
        val rawText = """Unseen University
Ankh-Morpork
Bachelor of Thaumatology
Awarded to: Ponder Stibbons
Date: Grune 23, A.M. 2024
Thesis: "On the Malleability of L-Space"
Archchancellor: Mustrum Ridcully
Registrar: Rincewind (Wizzard)
verify:paul-hammant.github.io/live-verify/c"""

        // Extract URL
        val urlResult = VerificationLogic.extractVerificationUrl(rawText)
        assertNotNull(urlResult.url)
        assertEquals(8, urlResult.urlLineIndex)

        // Extract cert text
        val certText = VerificationLogic.extractCertText(rawText, urlResult.urlLineIndex)
        assertFalse(certText.contains("verify:"))

        // Normalize and hash
        val normalized = TextNormalizer.normalizeText(certText)
        val hash = TextNormalizer.sha256(normalized)
        assertEquals(64, hash.length)

        // Build verification URL
        val verificationUrl = VerificationLogic.buildVerificationUrl(urlResult.url!!, hash)
        assertTrue(verificationUrl.startsWith("https://"))
        assertTrue(verificationUrl.contains(hash))
    }
}
