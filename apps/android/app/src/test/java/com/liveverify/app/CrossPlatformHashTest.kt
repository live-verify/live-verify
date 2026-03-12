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
import org.junit.runner.RunWith
import org.junit.runners.Parameterized
import java.io.File

/**
 * Cross-platform hash consistency tests (TEXT FIXTURES ONLY).
 * Reads test fixtures from /normalization-hashes/ directory.
 * These tests ensure Kotlin implementation matches JavaScript.
 *
 * Note: Image fixtures require ML Kit and run as instrumented tests.
 * See CrossPlatformImageHashTest in androidTest/ for OCR-based tests.
 */
@RunWith(Parameterized::class)
class CrossPlatformHashTest(
    private val description: String,
    private val expectedHash: String,
    private val body: String,
    private val metadata: TextNormalizer.Metadata?
) {

    companion object {
        /**
         * Find the normalization-hashes directory by walking up from current dir
         */
        private fun findFixturesDir(): File {
            var dir = File(System.getProperty("user.dir"))
            while (dir.parentFile != null) {
                val fixturesDir = File(dir, "normalization-hashes")
                if (fixturesDir.exists() && fixturesDir.isDirectory) {
                    return fixturesDir
                }
                dir = dir.parentFile
            }
            throw IllegalStateException("Could not find normalization-hashes directory")
        }

        /**
         * Parse YAML-like frontmatter from markdown content
         */
        private fun parseFrontmatter(content: String): Pair<Map<String, Any>?, String> {
            val frontmatterRegex = Regex("^---\\n([\\s\\S]*?)\\n---\\n([\\s\\S]*)$")
            val match = frontmatterRegex.find(content)

            if (match == null) {
                return Pair(null, content)
            }

            val frontmatter = match.groupValues[1]
            val body = match.groupValues[2]

            val metadata = mutableMapOf<String, Any>()

            // Parse description
            Regex("^description:\\s*(.+)$", RegexOption.MULTILINE).find(frontmatter)?.let {
                metadata["description"] = it.groupValues[1].trim()
            }

            // Parse charNormalization
            Regex("^charNormalization:\\s*\"(.+)\"$", RegexOption.MULTILINE).find(frontmatter)?.let {
                metadata["charNormalization"] = it.groupValues[1]
            }

            // Parse ocrNormalizationRules (simple single-rule case)
            Regex("ocrNormalizationRules:\\n((?:\\s+-[^\\n]+\\n?)+)").find(frontmatter)?.let { rulesMatch ->
                val ruleText = rulesMatch.groupValues[1]
                val patternMatch = Regex("pattern:\\s*\"(.+)\"").find(ruleText)
                val replacementMatch = Regex("replacement:\\s*\"(.*)\"").find(ruleText)
                if (patternMatch != null && replacementMatch != null) {
                    metadata["ocrNormalizationRules"] = listOf(
                        mapOf(
                            "pattern" to patternMatch.groupValues[1],
                            "replacement" to replacementMatch.groupValues[1]
                        )
                    )
                }
            }

            return Pair(metadata.ifEmpty { null }, body)
        }

        /**
         * Convert parsed frontmatter to TextNormalizer.Metadata
         */
        private fun toMetadata(map: Map<String, Any>?): TextNormalizer.Metadata? {
            if (map == null) return null

            val charNorm = map["charNormalization"] as? String
            @Suppress("UNCHECKED_CAST")
            val ocrRules = (map["ocrNormalizationRules"] as? List<Map<String, String>>)?.map {
                TextNormalizer.OcrRule(it["pattern"]!!, it["replacement"]!!)
            }

            return if (charNorm != null || ocrRules != null) {
                TextNormalizer.Metadata(charNorm, ocrRules)
            } else {
                null
            }
        }

        /**
         * Check if body contains an image reference ![](path.png)
         */
        private fun isImageFixture(body: String): Boolean {
            return body.trim().matches(Regex("^!\\[]\\(.+\\)$"))
        }

        @JvmStatic
        @Parameterized.Parameters(name = "{0}")
        fun loadFixtures(): Collection<Array<Any?>> {
            val fixturesDir = findFixturesDir()
            val files = fixturesDir.listFiles { file ->
                file.name.endsWith(".md") && file.name != "README.md"
            } ?: emptyArray()

            // Filter to text fixtures only - image fixtures run as instrumented tests
            return files.mapNotNull { file ->
                val expectedHash = file.nameWithoutExtension
                val content = file.readText()
                val (frontmatter, body) = parseFrontmatter(content)

                // Skip image fixtures
                if (isImageFixture(body)) {
                    return@mapNotNull null
                }

                val description = (frontmatter?.get("description") as? String) ?: file.name
                val metadata = toMetadata(frontmatter)

                arrayOf<Any?>(
                    description,
                    expectedHash,
                    body.trimEnd(),
                    metadata
                )
            }
        }
    }

    @Test
    fun `hash should match filename`() {
        val normalized = TextNormalizer.normalizeText(body, metadata)
        val computedHash = TextNormalizer.sha256(normalized)

        assertEquals(
            "Hash mismatch for: $description",
            expectedHash,
            computedHash
        )
    }
}
