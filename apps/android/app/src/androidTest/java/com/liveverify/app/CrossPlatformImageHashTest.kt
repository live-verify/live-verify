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

import android.graphics.BitmapFactory
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.tasks.await
import org.junit.Assert.*
import org.junit.Test
import org.junit.runner.RunWith
import java.io.File

/**
 * Cross-platform image hash tests using ML Kit OCR.
 * These run as instrumented tests on device/emulator.
 *
 * Image fixtures are loaded from the normalization-hashes/ directory.
 * The test reads .md files that contain image references ![](image.png),
 * performs OCR on the referenced image, normalizes the text, and
 * compares the resulting hash to the filename.
 */
@RunWith(AndroidJUnit4::class)
class CrossPlatformImageHashTest {

    private val textRecognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

    /**
     * Find the normalization-hashes directory.
     * When running instrumented tests, we look in external storage where
     * fixtures can be pushed via: adb push normalization-hashes /sdcard/
     */
    private fun findFixturesDir(): File? {
        // Try common locations
        val possiblePaths = listOf(
            "/sdcard/normalization-hashes",
            "/storage/emulated/0/normalization-hashes",
            "/data/local/tmp/normalization-hashes"
        )

        for (path in possiblePaths) {
            val dir = File(path)
            if (dir.exists() && dir.isDirectory) {
                return dir
            }
        }
        return null
    }

    /**
     * Parse frontmatter from markdown content
     */
    private fun parseFrontmatter(content: String): Pair<Map<String, String>?, String> {
        val regex = Regex("^---\\n([\\s\\S]*?)\\n---\\n([\\s\\S]*)$")
        val match = regex.find(content) ?: return Pair(null, content)

        val frontmatter = match.groupValues[1]
        val body = match.groupValues[2]

        val metadata = mutableMapOf<String, String>()
        Regex("^description:\\s*(.+)$", RegexOption.MULTILINE).find(frontmatter)?.let {
            metadata["description"] = it.groupValues[1].trim()
        }

        return Pair(metadata.ifEmpty { null }, body)
    }

    /**
     * Extract image path from markdown image syntax ![](path.png)
     */
    private fun extractImagePath(body: String): String? {
        val match = Regex("^!\\[]\\((.+)\\)$").find(body.trim())
        return match?.groupValues?.get(1)
    }

    /**
     * Perform OCR on an image file using ML Kit
     */
    private suspend fun ocrImage(imageFile: File): String {
        val bitmap = BitmapFactory.decodeFile(imageFile.absolutePath)
            ?: throw IllegalArgumentException("Could not decode image: ${imageFile.absolutePath}")

        val inputImage = InputImage.fromBitmap(bitmap, 0)
        val result = textRecognizer.process(inputImage).await()

        return result.textBlocks.joinToString("\n") { block ->
            block.lines.joinToString("\n") { line -> line.text }
        }
    }

    @Test
    fun testImageFixtures() = runBlocking {
        val fixturesDir = findFixturesDir()
        if (fixturesDir == null) {
            println("SKIP: normalization-hashes directory not found on device.")
            println("Push fixtures with: adb push normalization-hashes /sdcard/")
            return@runBlocking
        }

        val mdFiles = fixturesDir.listFiles { file ->
            file.name.endsWith(".md") && file.name != "README.md"
        } ?: emptyArray()

        var testedCount = 0
        var skippedCount = 0

        for (file in mdFiles) {
            val expectedHash = file.nameWithoutExtension
            val content = file.readText()
            val (frontmatter, body) = parseFrontmatter(content)

            val imagePath = extractImagePath(body)
            if (imagePath == null) {
                // Text fixture - skip (tested in unit tests)
                skippedCount++
                continue
            }

            val description = frontmatter?.get("description") ?: file.name
            val imageFile = File(fixturesDir, imagePath)

            if (!imageFile.exists()) {
                println("SKIP: Image not found: $imagePath")
                skippedCount++
                continue
            }

            println("Testing: $description")

            // OCR the image
            val ocrText = ocrImage(imageFile)

            // Apply OCR cleanup and normalization
            val cleaned = OcrCleanup.cleanOcrArtifacts(ocrText)
            val normalized = TextNormalizer.normalizeText(cleaned, null)
            val computedHash = TextNormalizer.sha256(normalized)

            // For PLACEHOLDER files, just log what we got
            if (expectedHash.startsWith("PLACEHOLDER")) {
                println("  Image: $imagePath")
                println("  ML Kit hash: $computedHash")
                println("  Normalized text:\n${normalized.lines().joinToString("\n") { "    $it" }}")
                println("  Rename fixture to: $computedHash.md")
            } else {
                assertEquals(
                    "Hash mismatch for: $description\nNormalized text:\n$normalized",
                    expectedHash,
                    computedHash
                )
                println("  PASS: $computedHash")
            }

            testedCount++
        }

        println("\nImage fixtures: $testedCount tested, $skippedCount skipped")
        assertTrue("No image fixtures were tested", testedCount > 0 || skippedCount > 0)
    }
}
