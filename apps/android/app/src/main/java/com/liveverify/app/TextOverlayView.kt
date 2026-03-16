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

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.util.Log
import android.view.MotionEvent
import android.view.View
import com.google.mlkit.vision.text.Text

/**
 * Custom view that displays bounding boxes around detected text blocks
 * and handles tap events to select a region for OCR.
 */
class TextOverlayView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    /**
     * Represents a single line of text with its vertical position.
     * Used for proper line ordering when text has varying horizontal alignment.
     */
    data class TextLine(
        val text: String,
        val top: Float,  // Y position (top of bounding box) in image coordinates
        val left: Float  // X position (left of bounding box) in image coordinates
    )

    /**
     * Represents a detected text block with its bounds in view coordinates.
     * Stores individual lines to allow proper vertical sorting regardless of
     * ML Kit's reading order detection.
     */
    data class TextBlock(
        val bounds: RectF,
        val lines: List<TextLine>,
        val originalBounds: RectF // Bounds in image coordinates
    ) {
        // Text in ML Kit's reading order (already correct within each block)
        val text: String
            get() = lines.joinToString("\n") { it.text }
    }

    private val textBlocks = mutableListOf<TextBlock>()
    private val selectedBlocks = mutableListOf<TextBlock>()

    companion object {
        // Maximum vertical gap between blocks to consider them part of the same region
        private const val VERTICAL_GAP_THRESHOLD = 50f // pixels in image coordinates

        /**
         * Sort lines in reading order based on ML Kit coordinate spread.
         * ML Kit always returns bounding boxes in portrait coordinate space.
         * Portrait text: Y (top) varies → sort by top ascending.
         * Landscape text: X (left) varies → sort by left, direction determined
         * by verify: line position (it's always last in reading order).
         */
        fun sortLinesInReadingOrder(lines: List<TextLine>): List<TextLine> {
            if (lines.size <= 1) return lines

            val topRange = lines.maxOf { it.top } - lines.minOf { it.top }
            val leftRange = lines.maxOf { it.left } - lines.minOf { it.left }

            return if (leftRange > topRange * 2) {
                // Landscape: use verify: line as anchor for direction
                val verifyLine = lines.find { line ->
                    line.text.lowercase().let { it.contains("verify:") || it.contains("vfy:") }
                }
                if (verifyLine != null && verifyLine.left < lines.map { it.left }.average()) {
                    lines.sortedByDescending { it.left }
                } else {
                    lines.sortedBy { it.left }
                }
            } else {
                lines.sortedBy { it.top }
            }
        }

        /**
         * Stitch ML Kit lines into rows using Y coordinates, and detect blank
         * lines from vertical gaps.
         *
         * ML Kit often splits a single visual row into separate text blocks
         * (e.g. "Flat White" and "£3.40" on the same receipt line). This groups
         * lines with similar Y positions into one row, sorts fragments left-to-right
         * within each row, and inserts blank lines where the Y gap between rows
         * exceeds 1.8x the median line height.
         */
        fun stitchLinesIntoRows(lines: List<TextLine>): String {
            if (lines.isEmpty()) return ""
            if (lines.size == 1) return lines[0].text

            val sorted = lines.sortedBy { it.top }

            // Estimate typical line height from the median gap between consecutive lines
            val gaps = sorted.zipWithNext { a, b -> b.top - a.top }.filter { it > 0 }
            val medianGap = if (gaps.isNotEmpty()) {
                gaps.sorted()[gaps.size / 2]
            } else {
                30f // fallback
            }

            // Group lines into rows: lines within half the median gap are on the same row
            val rowThreshold = medianGap * 0.5f
            Log.d("StitchRows", "medianGap=$medianGap rowThreshold=$rowThreshold lines=${sorted.size}")
            val rows = mutableListOf<MutableList<TextLine>>()
            var currentRow = mutableListOf(sorted[0])
            rows.add(currentRow)

            for (i in 1 until sorted.size) {
                val gap = sorted[i].top - currentRow[0].top
                if (gap <= rowThreshold) {
                    Log.d("StitchRows", "  MERGE gap=$gap: \"${sorted[i].text}\" into row with \"${currentRow[0].text}\"")
                    currentRow.add(sorted[i])
                } else {
                    Log.d("StitchRows", "  NEW ROW gap=$gap: \"${sorted[i].text}\"")
                    currentRow = mutableListOf(sorted[i])
                    rows.add(currentRow)
                }
            }

            Log.d("StitchRows", "${rows.size} rows formed:")
            for ((i, row) in rows.withIndex()) {
                val texts = row.sortedBy { it.left }.joinToString(" | ") { "\"${it.text}\"(L=${it.left})" }
                Log.d("StitchRows", "  row[$i] top=${row[0].top}: $texts")
            }

            // Build output: sort each row by X (left-to-right), join with spaces.
            // Insert blank line when Y gap between rows exceeds 1.8x the median.
            val blankLineThreshold = medianGap * 1.8f
            Log.d("StitchRows", "blankLineThreshold=$blankLineThreshold")
            val result = StringBuilder()

            for (i in rows.indices) {
                if (i > 0) {
                    val prevRowTop = rows[i - 1][0].top
                    val thisRowTop = rows[i][0].top
                    val gap = thisRowTop - prevRowTop
                    if (gap > blankLineThreshold) {
                        result.append("\n") // blank line
                    }
                    result.append("\n")
                }
                val rowText = rows[i].sortedBy { it.left }.joinToString("  ") { it.text }
                result.append(rowText)
            }

            return result.toString()
        }
    }

    // Image dimensions for coordinate transformation
    private var imageWidth: Int = 0
    private var imageHeight: Int = 0
    private var rotationDegrees: Int = 0

    private val boxPaint = Paint().apply {
        color = Color.argb(180, 0, 150, 255) // Semi-transparent blue
        style = Paint.Style.STROKE
        strokeWidth = 4f
    }

    private val selectedPaint = Paint().apply {
        color = Color.argb(180, 0, 255, 100) // Semi-transparent green
        style = Paint.Style.STROKE
        strokeWidth = 6f
    }

    private val fillPaint = Paint().apply {
        color = Color.argb(40, 0, 150, 255) // Very transparent blue fill
        style = Paint.Style.FILL
    }

    private val selectedFillPaint = Paint().apply {
        color = Color.argb(60, 0, 255, 100) // Very transparent green fill
        style = Paint.Style.FILL
    }

    private val captureButtonPaint = Paint().apply {
        color = Color.WHITE
        style = Paint.Style.FILL
        isAntiAlias = true
    }

    private val captureButtonStrokePaint = Paint().apply {
        color = Color.argb(200, 0, 200, 100) // Green border
        style = Paint.Style.STROKE
        strokeWidth = 6f
        isAntiAlias = true
    }

    private var captureButtonCenter: Pair<Float, Float>? = null
    private val captureButtonRadius = 40f

    // Callback receives the combined bounds of all selected blocks (in image coordinates)
    var onBlocksSelected: ((List<TextBlock>) -> Unit)? = null

    // Callback when capture button is tapped
    var onCaptureRequested: (() -> Unit)? = null

    /**
     * Update the detected text blocks from ML Kit.
     * @param text The Text result from ML Kit
     * @param imageWidth Width of the analyzed image (after rotation)
     * @param imageHeight Height of the analyzed image (after rotation)
     * @param rotationDegrees Rotation applied to get from camera to display orientation
     */
    fun setDetectedText(text: Text, imageWidth: Int, imageHeight: Int, rotationDegrees: Int = 0) {
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
        this.rotationDegrees = rotationDegrees

        textBlocks.clear()

        for (block in text.textBlocks) {
            block.boundingBox?.let { box ->
                val originalBounds = RectF(
                    box.left.toFloat(),
                    box.top.toFloat(),
                    box.right.toFloat(),
                    box.bottom.toFloat()
                )

                // Transform to view coordinates
                val viewBounds = transformToViewCoordinates(originalBounds)

                // Extract individual lines with their Y positions for proper ordering
                val blockLines = mutableListOf<TextLine>()
                for (line in block.lines) {
                    line.boundingBox?.let { lineBox ->
                        blockLines.add(TextLine(
                            text = line.text,
                            top = lineBox.top.toFloat(),
                            left = lineBox.left.toFloat()
                        ))
                    }
                }

                textBlocks.add(TextBlock(
                    bounds = viewBounds,
                    lines = blockLines,
                    originalBounds = originalBounds
                ))
            }
        }

        invalidate()
    }

    /**
     * Clear all detected text blocks.
     */
    fun clearBlocks() {
        textBlocks.clear()
        selectedBlocks.clear()
        invalidate()
    }

    /**
     * Transform image coordinates to view coordinates.
     * Handles the aspect ratio differences between image and view.
     */
    private fun transformToViewCoordinates(imageBounds: RectF): RectF {
        if (imageWidth == 0 || imageHeight == 0 || width == 0 || height == 0) {
            return imageBounds
        }

        // Calculate scale factors
        // CameraX preview uses CENTER_CROP (aspect fill) by default
        val scaleX = width.toFloat() / imageWidth
        val scaleY = height.toFloat() / imageHeight
        val scale = maxOf(scaleX, scaleY) // CENTER_CROP uses max

        // Calculate offset for centering
        val scaledWidth = imageWidth * scale
        val scaledHeight = imageHeight * scale
        val offsetX = (width - scaledWidth) / 2
        val offsetY = (height - scaledHeight) / 2

        return RectF(
            offsetX + imageBounds.left * scale,
            offsetY + imageBounds.top * scale,
            offsetX + imageBounds.right * scale,
            offsetY + imageBounds.bottom * scale
        )
    }

    /**
     * Transform view coordinates back to image coordinates.
     * Used when cropping the captured image.
     */
    fun transformToImageCoordinates(viewBounds: RectF): RectF {
        if (imageWidth == 0 || imageHeight == 0 || width == 0 || height == 0) {
            return viewBounds
        }

        val scaleX = width.toFloat() / imageWidth
        val scaleY = height.toFloat() / imageHeight
        val scale = maxOf(scaleX, scaleY)

        val scaledWidth = imageWidth * scale
        val scaledHeight = imageHeight * scale
        val offsetX = (width - scaledWidth) / 2
        val offsetY = (height - scaledHeight) / 2

        return RectF(
            (viewBounds.left - offsetX) / scale,
            (viewBounds.top - offsetY) / scale,
            (viewBounds.right - offsetX) / scale,
            (viewBounds.bottom - offsetY) / scale
        )
    }

    /**
     * Add padding to bounds for cropping (20% like iOS).
     */
    fun addPadding(bounds: RectF, padding: Float = 0.2f): RectF {
        val padX = bounds.width() * padding
        val padY = bounds.height() * padding
        return RectF(
            (bounds.left - padX).coerceAtLeast(0f),
            (bounds.top - padY).coerceAtLeast(0f),
            (bounds.right + padX).coerceAtMost(imageWidth.toFloat()),
            (bounds.bottom + padY).coerceAtMost(imageHeight.toFloat())
        )
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        for (block in textBlocks) {
            val isSelected = block in selectedBlocks

            // Draw fill
            canvas.drawRect(block.bounds, if (isSelected) selectedFillPaint else fillPaint)

            // Draw border
            canvas.drawRect(block.bounds, if (isSelected) selectedPaint else boxPaint)
        }

        // Draw capture button only if blocks are selected but NO verify: URL
        // (auto-capture handles the verify: case, so no button needed)
        val hasVerifyUrl = selectedBlocks.any { containsVerifyUrl(it.text) }
        if (selectedBlocks.isNotEmpty() && !hasVerifyUrl) {
            // Position button to the right of the selection, vertically centered (matches iOS)
            val combinedBounds = getSelectedViewBounds()
            if (combinedBounds != null) {
                val margin = captureButtonRadius + 20f
                var cx = combinedBounds.right + margin
                var cy = combinedBounds.centerY()

                // If button would be off-screen to the right, place it below-right
                if (cx + captureButtonRadius > width) {
                    cx = combinedBounds.right - margin
                    cy = combinedBounds.bottom + margin
                }

                // Keep button on screen
                val adjustedCx = cx.coerceIn(captureButtonRadius + 10f, width - captureButtonRadius - 10f)
                val adjustedCy = cy.coerceIn(captureButtonRadius + 10f, height - captureButtonRadius - 10f)

                captureButtonCenter = Pair(adjustedCx, adjustedCy)

                // Draw white circle with green border
                canvas.drawCircle(adjustedCx, adjustedCy, captureButtonRadius, captureButtonPaint)
                canvas.drawCircle(adjustedCx, adjustedCy, captureButtonRadius, captureButtonStrokePaint)

                // Draw inner circle (shutter style)
                canvas.drawCircle(adjustedCx, adjustedCy, captureButtonRadius - 8f, captureButtonStrokePaint)
            }
        } else {
            captureButtonCenter = null
        }
    }

    /**
     * Get combined bounds of selected blocks in VIEW coordinates.
     */
    private fun getSelectedViewBounds(): RectF? {
        if (selectedBlocks.isEmpty()) return null

        var left = Float.MAX_VALUE
        var top = Float.MAX_VALUE
        var right = Float.MIN_VALUE
        var bottom = Float.MIN_VALUE

        for (block in selectedBlocks) {
            left = minOf(left, block.bounds.left)
            top = minOf(top, block.bounds.top)
            right = maxOf(right, block.bounds.right)
            bottom = maxOf(bottom, block.bounds.bottom)
        }

        return RectF(left, top, right, bottom)
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        if (event.action == MotionEvent.ACTION_UP) {
            // Check if capture button was tapped
            val buttonCenter = captureButtonCenter
            if (buttonCenter != null) {
                val dx = event.x - buttonCenter.first
                val dy = event.y - buttonCenter.second
                val distance = kotlin.math.sqrt(dx * dx + dy * dy)
                if (distance <= captureButtonRadius + 10f) {
                    // Capture button tapped
                    onCaptureRequested?.invoke()
                    return true
                }
            }

            // Otherwise handle block selection
            val tappedBlock = findBlockAt(event.x, event.y)
            if (tappedBlock != null) {
                selectBlockAndExtendToVerifyLine(tappedBlock)
                onBlocksSelected?.invoke(selectedBlocks.toList())
                invalidate()

                // Auto-capture if selection includes a verify: URL
                val hasVerifyUrl = selectedBlocks.any { containsVerifyUrl(it.text) }
                if (hasVerifyUrl) {
                    onCaptureRequested?.invoke()
                }
            } else {
                selectedBlocks.clear()
                onBlocksSelected?.invoke(selectedBlocks.toList())
                invalidate()
            }
            return true
        }
        return true
    }

    /**
     * Select a block, find the nearest verify: block, and also select all blocks
     * that form a contiguous group with them. ML Kit often splits what is visually
     * one region into multiple blocks, so we grow the selection to include
     * vertically adjacent blocks (above and below the tapped block).
     */
    private fun selectBlockAndExtendToVerifyLine(startBlock: TextBlock) {
        selectedBlocks.clear()
        selectedBlocks.add(startBlock)

        // Check if the tapped block itself contains verify:
        if (containsVerifyUrl(startBlock.text)) {
            return
        }

        // Find the nearest verify: block (any direction)
        var nearestVerifyBlock: TextBlock? = null
        var nearestDistance = Float.MAX_VALUE

        val startCenterX = startBlock.originalBounds.centerX()
        val startCenterY = startBlock.originalBounds.centerY()

        for (block in textBlocks) {
            if (block == startBlock) continue
            if (!containsVerifyUrl(block.text)) continue

            val dx = block.originalBounds.centerX() - startCenterX
            val dy = block.originalBounds.centerY() - startCenterY
            val distance = kotlin.math.sqrt(dx * dx + dy * dy)

            if (distance < nearestDistance) {
                nearestDistance = distance
                nearestVerifyBlock = block
            }
        }

        if (nearestVerifyBlock != null) {
            selectedBlocks.add(nearestVerifyBlock)

            // Grow selection iteratively: include any block that is vertically
            // adjacent to the current selection. This catches blocks ABOVE the
            // tapped block that ML Kit split into separate blocks.
            // Use half the tapped block's height as the adjacency margin.
            val margin = startBlock.originalBounds.height() * 0.5f

            var prevSize = 0
            while (selectedBlocks.size != prevSize) {
                prevSize = selectedBlocks.size

                val currentTop = selectedBlocks.minOf { it.originalBounds.top }
                val currentBottom = selectedBlocks.maxOf { it.originalBounds.bottom }
                val currentLeft = selectedBlocks.minOf { it.originalBounds.left }
                val currentRight = selectedBlocks.maxOf { it.originalBounds.right }

                for (block in textBlocks) {
                    if (block in selectedBlocks) continue
                    // Block is vertically adjacent/overlapping with current selection
                    // and horizontally overlapping
                    val verticallyAdjacent = block.originalBounds.bottom >= currentTop - margin &&
                            block.originalBounds.top <= currentBottom + margin
                    val horizontallyOverlapping = block.originalBounds.right >= currentLeft &&
                            block.originalBounds.left <= currentRight
                    if (verticallyAdjacent && horizontallyOverlapping) {
                        selectedBlocks.add(block)
                    }
                }
            }
        }
    }

    /**
     * Check if text contains a verification URL marker.
     */
    private fun containsVerifyUrl(text: String): Boolean {
        val lower = text.lowercase()
        return lower.contains("verify:") || lower.contains("vfy:")
    }

    /**
     * Find the text block at the given view coordinates.
     */
    fun findBlockAt(x: Float, y: Float): TextBlock? {
        // Return the smallest block containing the point
        // (in case of overlapping blocks, prefer the more specific one)
        return textBlocks
            .filter { it.bounds.contains(x, y) }
            .minByOrNull { it.bounds.width() * it.bounds.height() }
    }

    /**
     * Get combined bounds of all selected blocks in image coordinates.
     */
    fun getSelectedBounds(): RectF? {
        if (selectedBlocks.isEmpty()) return null

        var left = Float.MAX_VALUE
        var top = Float.MAX_VALUE
        var right = Float.MIN_VALUE
        var bottom = Float.MIN_VALUE

        for (block in selectedBlocks) {
            left = minOf(left, block.originalBounds.left)
            top = minOf(top, block.originalBounds.top)
            right = maxOf(right, block.originalBounds.right)
            bottom = maxOf(bottom, block.originalBounds.bottom)
        }

        return RectF(left, top, right, bottom)
    }

    /**
     * Get the currently selected blocks.
     */
    fun getSelectedBlocks(): List<TextBlock> = selectedBlocks.toList()

    /**
     * Get all detected blocks.
     */
    fun getAllBlocks(): List<TextBlock> = textBlocks.toList()
}
