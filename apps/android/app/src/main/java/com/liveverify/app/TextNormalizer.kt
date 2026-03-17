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

import org.mozilla.javascript.Context
import org.mozilla.javascript.Scriptable
import java.security.MessageDigest

/**
 * Text normalization via JSBridge to canonical public/normalize.js
 *
 * Uses Mozilla Rhino to execute the same JavaScript normalization code as
 * the web app and browser extension. This eliminates the sync risk of a
 * separate Kotlin reimplementation.
 *
 * SHA-256 stays native Kotlin (MessageDigest) — no reason to bridge that.
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

    private var scope: Scriptable? = null

    /**
     * Initialize the JS engine with normalize.js.
     * Loads from Android assets at runtime, or from the project root in unit tests.
     */
    private fun ensureInitialized() {
        if (scope != null) return

        val cx = Context.enter()
        try {
            // Rhino on Android cannot compile to bytecode
            cx.optimizationLevel = -1
            val sc = cx.initStandardObjects()

            // Provide module.exports shim so normalize.js's CommonJS export works
            cx.evaluateString(sc, "var module = { exports: {} };", "shim", 1, null)

            val js = loadNormalizeJs()
            cx.evaluateString(sc, js, "normalize.js", 1, null)
            scope = sc
        } finally {
            Context.exit()
        }
    }

    /**
     * Load normalize.js — tries Android assets first, falls back to file system for unit tests.
     */
    private fun loadNormalizeJs(): String {
        // Try loading from classpath (works in both Android runtime via assets and JVM unit tests)
        val classLoaderStream = TextNormalizer::class.java.classLoader?.getResourceAsStream("normalize.js")
        if (classLoaderStream != null) {
            return classLoaderStream.bufferedReader().use { it.readText() }
        }

        // Fallback: load from project root (for unit tests run from apps/android/)
        val paths = listOf(
            "../../public/normalize.js",       // from apps/android/
            "public/normalize.js",             // from project root
            "app/src/main/assets/normalize.js" // from apps/android/
        )
        for (path in paths) {
            val file = java.io.File(path)
            if (file.exists()) {
                return file.readText()
            }
        }

        throw IllegalStateException("Cannot find normalize.js — not in classpath or expected file paths")
    }

    /**
     * Escape a Kotlin string for embedding in a JavaScript single-quoted string literal.
     */
    private fun jsEscape(text: String): String {
        return text
            .replace("\\", "\\\\")
            .replace("'", "\\'")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t")
    }

    /**
     * Convert Metadata to a JavaScript object literal string.
     */
    private fun metadataToJs(metadata: Metadata?): String {
        if (metadata == null) return "null"

        val parts = mutableListOf<String>()

        metadata.charNormalization?.let {
            parts.add("charNormalization: '${jsEscape(it)}'")
        }

        metadata.ocrNormalizationRules?.let { rules ->
            val rulesJs = rules.joinToString(", ") { rule ->
                "{ pattern: '${jsEscape(rule.pattern)}', replacement: '${jsEscape(rule.replacement)}' }"
            }
            parts.add("ocrNormalizationRules: [$rulesJs]")
        }

        return "{ ${parts.joinToString(", ")} }"
    }

    /**
     * Normalize text using the canonical JavaScript implementation.
     *
     * @param text Text to normalize
     * @param metadata Optional metadata from verification-meta.json
     * @return Normalized text
     */
    fun normalizeText(text: String, metadata: Metadata? = null): String {
        ensureInitialized()

        val cx = Context.enter()
        try {
            cx.optimizationLevel = -1
            val script = "normalizeText('${jsEscape(text)}', ${metadataToJs(metadata)})"
            val result = cx.evaluateString(scope, script, "eval", 1, null)
            return Context.toString(result)
        } finally {
            Context.exit()
        }
    }

    /**
     * SHA-256 hash of text (native Kotlin — no need to bridge this)
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
