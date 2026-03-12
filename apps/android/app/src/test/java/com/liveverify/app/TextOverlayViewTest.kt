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
 * Unit tests for TextOverlayView coordinate transformation and block detection.
 * Uses simple data classes to avoid Android framework dependencies.
 */
class TextOverlayViewTest {

    // Simple rect for testing (avoids Android RectF dependency)
    data class TestRect(val left: Float, val top: Float, val right: Float, val bottom: Float) {
        fun width() = right - left
        fun height() = bottom - top
        fun contains(x: Float, y: Float): Boolean {
            return x >= left && x < right && y >= top && y < bottom
        }
    }

    // Test data class
    data class TestBlock(val bounds: TestRect, val text: String)

    /**
     * Find block at coordinates (mirrors TextOverlayView.findBlockAt logic)
     */
    private fun findBlockAt(blocks: List<TestBlock>, x: Float, y: Float): TestBlock? {
        return blocks
            .filter { it.bounds.contains(x, y) }
            .minByOrNull { it.bounds.width() * it.bounds.height() }
    }

    /**
     * Add padding to bounds (mirrors TextOverlayView.addPadding logic)
     */
    private fun addPadding(bounds: TestRect, padding: Float, imageWidth: Float, imageHeight: Float): TestRect {
        val padX = bounds.width() * padding
        val padY = bounds.height() * padding
        return TestRect(
            left = (bounds.left - padX).coerceAtLeast(0f),
            top = (bounds.top - padY).coerceAtLeast(0f),
            right = (bounds.right + padX).coerceAtMost(imageWidth),
            bottom = (bounds.bottom + padY).coerceAtMost(imageHeight)
        )
    }

    /**
     * Transform image coordinates to view coordinates (CENTER_CROP logic)
     */
    private fun transformToViewCoordinates(
        imageBounds: TestRect,
        imageWidth: Int, imageHeight: Int,
        viewWidth: Int, viewHeight: Int
    ): TestRect {
        val scaleX = viewWidth.toFloat() / imageWidth
        val scaleY = viewHeight.toFloat() / imageHeight
        val scale = maxOf(scaleX, scaleY)

        val scaledWidth = imageWidth * scale
        val scaledHeight = imageHeight * scale
        val offsetX = (viewWidth - scaledWidth) / 2
        val offsetY = (viewHeight - scaledHeight) / 2

        return TestRect(
            left = offsetX + imageBounds.left * scale,
            top = offsetY + imageBounds.top * scale,
            right = offsetX + imageBounds.right * scale,
            bottom = offsetY + imageBounds.bottom * scale
        )
    }

    // findBlockAt tests

    @Test
    fun `findBlockAt should return null when no blocks exist`() {
        val blocks = emptyList<TestBlock>()
        val result = findBlockAt(blocks, 100f, 100f)
        assertNull(result)
    }

    @Test
    fun `findBlockAt should return null when tap is outside all blocks`() {
        val blocks = listOf(
            TestBlock(TestRect(0f, 0f, 100f, 100f), "Block 1"),
            TestBlock(TestRect(200f, 200f, 300f, 300f), "Block 2")
        )
        val result = findBlockAt(blocks, 150f, 150f)
        assertNull(result)
    }

    @Test
    fun `findBlockAt should return block when tap is inside`() {
        val blocks = listOf(
            TestBlock(TestRect(0f, 0f, 100f, 100f), "Block 1")
        )
        val result = findBlockAt(blocks, 50f, 50f)
        assertNotNull(result)
        assertEquals("Block 1", result?.text)
    }

    @Test
    fun `findBlockAt should return smallest block when tap is in overlapping blocks`() {
        val blocks = listOf(
            TestBlock(TestRect(0f, 0f, 200f, 200f), "Large block"),
            TestBlock(TestRect(50f, 50f, 100f, 100f), "Small block")
        )
        val result = findBlockAt(blocks, 75f, 75f)
        assertNotNull(result)
        assertEquals("Small block", result?.text)
    }

    @Test
    fun `findBlockAt should handle tap on edge of block`() {
        val blocks = listOf(
            TestBlock(TestRect(0f, 0f, 100f, 100f), "Block 1")
        )
        // contains uses inclusive left/top, exclusive right/bottom
        val resultInside = findBlockAt(blocks, 0f, 0f)
        assertNotNull("Should include top-left corner", resultInside)

        val resultOutside = findBlockAt(blocks, 100f, 100f)
        assertNull("Should exclude bottom-right corner", resultOutside)
    }

    // addPadding tests

    @Test
    fun `addPadding should add 20 percent padding`() {
        val bounds = TestRect(100f, 100f, 200f, 200f) // 100x100 box
        val result = addPadding(bounds, 0.2f, 1000f, 1000f)

        // 20% of 100 = 20
        assertEquals(80f, result.left, 0.01f)
        assertEquals(80f, result.top, 0.01f)
        assertEquals(220f, result.right, 0.01f)
        assertEquals(220f, result.bottom, 0.01f)
    }

    @Test
    fun `addPadding should clamp to image bounds at left edge`() {
        val bounds = TestRect(10f, 100f, 60f, 150f) // 50x50 box near left edge
        val result = addPadding(bounds, 0.2f, 1000f, 1000f)

        // 20% of 50 = 10, but 10 - 10 = 0 which is fine
        assertEquals(0f, result.left, 0.01f)
    }

    @Test
    fun `addPadding should clamp to image bounds at right edge`() {
        val bounds = TestRect(950f, 100f, 1000f, 150f) // 50x50 box at right edge
        val result = addPadding(bounds, 0.2f, 1000f, 1000f)

        // 20% of 50 = 10, 1000 + 10 = 1010 -> clamped to 1000
        assertEquals(1000f, result.right, 0.01f)
    }

    // sortLinesInReadingOrder tests — uses the real companion function

    @Test
    fun `sort portrait lines by top ascending`() {
        val lines = listOf(
            TextOverlayView.TextLine("line 3", top = 300f, left = 100f),
            TextOverlayView.TextLine("line 1", top = 100f, left = 100f),
            TextOverlayView.TextLine("line 2", top = 200f, left = 100f),
            TextOverlayView.TextLine("verify:example.com", top = 400f, left = 100f)
        )
        val sorted = TextOverlayView.sortLinesInReadingOrder(lines)
        assertEquals("line 1", sorted[0].text)
        assertEquals("line 2", sorted[1].text)
        assertEquals("line 3", sorted[2].text)
        assertEquals("verify:example.com", sorted[3].text)
    }

    @Test
    fun `sort landscape lines with verify at low-left descending`() {
        // Phone rotated CW (ROTATION_90): top values similar, left values vary
        // verify: at lowest left = reading order is descending left
        val lines = listOf(
            TextOverlayView.TextLine("verify:example.com", top = 140f, left = 163f),
            TextOverlayView.TextLine("in 2015 and 2016", top = 141f, left = 206f),
            TextOverlayView.TextLine("his role as CIO", top = 142f, left = 233f),
            TextOverlayView.TextLine("I, Paul Hammant, worked for Kevin Behr in", top = 143f, left = 268f)
        )
        val sorted = TextOverlayView.sortLinesInReadingOrder(lines)
        assertEquals("I, Paul Hammant, worked for Kevin Behr in", sorted[0].text)
        assertEquals("his role as CIO", sorted[1].text)
        assertEquals("in 2015 and 2016", sorted[2].text)
        assertEquals("verify:example.com", sorted[3].text)
    }

    @Test
    fun `sort landscape lines with verify at high-left ascending`() {
        // Phone rotated CCW (ROTATION_270): verify: at highest left
        val lines = listOf(
            TextOverlayView.TextLine("I, Paul Hammant", top = 140f, left = 100f),
            TextOverlayView.TextLine("his role as CIO", top = 141f, left = 130f),
            TextOverlayView.TextLine("in 2015 and 2016", top = 142f, left = 160f),
            TextOverlayView.TextLine("verify:example.com", top = 143f, left = 200f)
        )
        val sorted = TextOverlayView.sortLinesInReadingOrder(lines)
        assertEquals("I, Paul Hammant", sorted[0].text)
        assertEquals("his role as CIO", sorted[1].text)
        assertEquals("in 2015 and 2016", sorted[2].text)
        assertEquals("verify:example.com", sorted[3].text)
    }

    @Test
    fun `sort single line returns as-is`() {
        val lines = listOf(TextOverlayView.TextLine("only line", top = 100f, left = 100f))
        val sorted = TextOverlayView.sortLinesInReadingOrder(lines)
        assertEquals(1, sorted.size)
        assertEquals("only line", sorted[0].text)
    }

    @Test
    fun `sort empty list returns empty`() {
        val sorted = TextOverlayView.sortLinesInReadingOrder(emptyList())
        assertTrue(sorted.isEmpty())
    }

    @Test
    fun `sort landscape with vfy prefix`() {
        val lines = listOf(
            TextOverlayView.TextLine("vfy:example.com", top = 100f, left = 50f),
            TextOverlayView.TextLine("cert line 1", top = 101f, left = 200f),
            TextOverlayView.TextLine("cert line 2", top = 102f, left = 150f)
        )
        val sorted = TextOverlayView.sortLinesInReadingOrder(lines)
        assertEquals("cert line 1", sorted[0].text)
        assertEquals("cert line 2", sorted[1].text)
        assertEquals("vfy:example.com", sorted[2].text)
    }

    @Test
    fun `sort portrait with no verify line still sorts by top`() {
        val lines = listOf(
            TextOverlayView.TextLine("line C", top = 300f, left = 100f),
            TextOverlayView.TextLine("line A", top = 100f, left = 105f),
            TextOverlayView.TextLine("line B", top = 200f, left = 95f)
        )
        val sorted = TextOverlayView.sortLinesInReadingOrder(lines)
        assertEquals("line A", sorted[0].text)
        assertEquals("line B", sorted[1].text)
        assertEquals("line C", sorted[2].text)
    }

    @Test
    fun `sort landscape with no verify line defaults to ascending left`() {
        // No verify: line, leftRange >> topRange, defaults to ascending left
        val lines = listOf(
            TextOverlayView.TextLine("line C", top = 100f, left = 300f),
            TextOverlayView.TextLine("line A", top = 101f, left = 100f),
            TextOverlayView.TextLine("line B", top = 102f, left = 200f)
        )
        val sorted = TextOverlayView.sortLinesInReadingOrder(lines)
        assertEquals("line A", sorted[0].text)
        assertEquals("line B", sorted[1].text)
        assertEquals("line C", sorted[2].text)
    }

    // Coordinate transformation tests

    @Test
    fun `transformToViewCoordinates should scale correctly when view matches image aspect`() {
        // Image: 1000x1000, View: 500x500 (same aspect)
        val imageBounds = TestRect(100f, 100f, 200f, 200f)
        val result = transformToViewCoordinates(imageBounds, 1000, 1000, 500, 500)

        // Scale is 0.5, no offset
        assertEquals(50f, result.left, 0.01f)
        assertEquals(50f, result.top, 0.01f)
        assertEquals(100f, result.right, 0.01f)
        assertEquals(100f, result.bottom, 0.01f)
    }

    @Test
    fun `transformToViewCoordinates should handle wider view than image`() {
        // Image: 1000x1000, View: 1000x500 (wider view)
        // Scale by height: 500/1000 = 0.5
        // Scale by width: 1000/1000 = 1.0
        // CENTER_CROP uses max, so scale = 1.0
        // Scaled image: 1000x1000, offset Y = (500-1000)/2 = -250
        val imageBounds = TestRect(0f, 0f, 100f, 100f)
        val result = transformToViewCoordinates(imageBounds, 1000, 1000, 1000, 500)

        assertEquals(0f, result.left, 0.01f)
        assertEquals(-250f, result.top, 0.01f) // Negative because cropped
        assertEquals(100f, result.right, 0.01f)
        assertEquals(-150f, result.bottom, 0.01f)
    }

    @Test
    fun `transformToViewCoordinates should handle taller view than image`() {
        // Image: 1000x1000, View: 500x1000 (taller view)
        // Scale by height: 1000/1000 = 1.0
        // Scale by width: 500/1000 = 0.5
        // CENTER_CROP uses max, so scale = 1.0
        // Scaled image: 1000x1000, offset X = (500-1000)/2 = -250
        val imageBounds = TestRect(0f, 0f, 100f, 100f)
        val result = transformToViewCoordinates(imageBounds, 1000, 1000, 500, 1000)

        assertEquals(-250f, result.left, 0.01f) // Negative because cropped
        assertEquals(0f, result.top, 0.01f)
        assertEquals(-150f, result.right, 0.01f)
        assertEquals(100f, result.bottom, 0.01f)
    }
}
