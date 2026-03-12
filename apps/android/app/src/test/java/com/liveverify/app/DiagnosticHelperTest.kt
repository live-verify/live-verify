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

class DiagnosticHelperTest {

    // withReturnSymbols tests

    @Test
    fun `withReturnSymbols should append return symbol to single line`() {
        val input = "Hello World"
        val result = DiagnosticHelper.withReturnSymbols(input)
        assertEquals("Hello World⏎", result)
    }

    @Test
    fun `withReturnSymbols should append return symbol to each line`() {
        val input = "Line 1\nLine 2\nLine 3"
        val result = DiagnosticHelper.withReturnSymbols(input)
        assertEquals("Line 1⏎\nLine 2⏎\nLine 3⏎", result)
    }

    @Test
    fun `withReturnSymbols should handle empty string`() {
        val input = ""
        val result = DiagnosticHelper.withReturnSymbols(input)
        assertEquals("⏎", result)
    }

    @Test
    fun `withReturnSymbols should handle blank lines`() {
        val input = "Line 1\n\nLine 3"
        val result = DiagnosticHelper.withReturnSymbols(input)
        assertEquals("Line 1⏎\n⏎\nLine 3⏎", result)
    }

    @Test
    fun `withReturnSymbols should handle Windows line endings`() {
        val input = "Line 1\r\nLine 2"
        val result = DiagnosticHelper.withReturnSymbols(input)
        // lines() splits on \r\n as well
        assertEquals("Line 1⏎\nLine 2⏎", result)
    }

    // formatHash tests

    @Test
    fun `formatHash should return full hash when no max length`() {
        val hash = "a".repeat(64)
        val result = DiagnosticHelper.formatHash(hash)
        assertEquals(hash, result)
    }

    @Test
    fun `formatHash should return full hash when under max length`() {
        val hash = "abc123"
        val result = DiagnosticHelper.formatHash(hash, maxLength = 20)
        assertEquals(hash, result)
    }

    @Test
    fun `formatHash should truncate with ellipsis when over max length`() {
        val hash = "abcdefghij1234567890"
        val result = DiagnosticHelper.formatHash(hash, maxLength = 13)
        // (13-3)/2 = 5, so "abcde...67890"
        assertEquals("abcde...67890", result)
    }

    @Test
    fun `formatHash should handle typical SHA256 truncation`() {
        val hash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        val result = DiagnosticHelper.formatHash(hash, maxLength = 20)
        // (20-3)/2 = 8, so first 8 + "..." + last 8
        assertEquals("e3b0c442...7852b855", result)
    }
}
