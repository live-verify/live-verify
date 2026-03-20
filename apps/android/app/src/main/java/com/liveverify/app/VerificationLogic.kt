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

import android.util.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import okhttp3.Dns
import okhttp3.OkHttpClient
import okhttp3.Request
import org.json.JSONObject
import java.net.InetAddress
import java.security.SecureRandom
import java.security.cert.X509Certificate
import java.text.SimpleDateFormat
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManager
import javax.net.ssl.X509TrustManager
import java.util.Date
import java.util.Locale

/**
 * Pure functions for verification logic matching public/app-logic.js
 */
object VerificationLogic {

    private var client = OkHttpClient()

    /**
     * Configure OkHttpClient with custom DNS mappings and optional TLS trust-all.
     * Used by debug text-paste mode to resolve test domains to emulator host
     * and trust Caddy's self-signed TLS certificates.
     */
    fun configureClient(dnsOverrides: Map<String, String>, trustAllCerts: Boolean = false) {
        val builder = OkHttpClient.Builder()

        if (dnsOverrides.isNotEmpty()) {
            builder.dns(object : Dns {
                override fun lookup(hostname: String): List<InetAddress> {
                    val override = dnsOverrides[hostname]
                    return if (override != null) {
                        listOf(InetAddress.getByName(override))
                    } else {
                        Dns.SYSTEM.lookup(hostname)
                    }
                }
            })
        }

        if (trustAllCerts) {
            val trustManager = object : X509TrustManager {
                override fun checkClientTrusted(chain: Array<X509Certificate>, authType: String) {}
                override fun checkServerTrusted(chain: Array<X509Certificate>, authType: String) {}
                override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
            }
            val sslContext = SSLContext.getInstance("TLS")
            sslContext.init(null, arrayOf<TrustManager>(trustManager), SecureRandom())
            builder.sslSocketFactory(sslContext.socketFactory, trustManager)
            builder.hostnameVerifier { _, _ -> true }
        }

        client = builder.build()
    }

    /**
     * Result of extracting a verification URL from OCR text
     */
    data class UrlExtraction(
        val url: String?,
        val urlLineIndex: Int
    )

    /**
     * Extract verification URL from OCR raw text
     * Scans from bottom to top to find verify: or vfy: line
     *
     * @param rawText Raw OCR text
     * @return Extracted base URL and its line index
     */
    fun extractVerificationUrl(rawText: String): UrlExtraction {
        val rawLines = rawText.split("\n").map { it.trim() }

        // Match verify: or vfy: with optional spaces around colon
        val verifyPattern = Regex("""(^|\s)(verify|vfy)\s*:\s*""", RegexOption.IGNORE_CASE)

        // Scan from bottom to top
        for (i in rawLines.indices.reversed()) {
            val line = rawLines[i]
            if (line.isEmpty()) continue

            val match = verifyPattern.find(line)
            if (match != null) {
                // Extract everything after the pattern
                var urlPart = line.substring(match.range.last + 1).trim()

                // Remove ALL spaces - URLs don't have spaces, so any space is OCR artifact
                urlPart = urlPart.replace(" ", "")

                if (urlPart.isNotEmpty()) {
                    // Determine the correct prefix
                    val prefix = if (match.groupValues[2].lowercase() == "vfy") "vfy:" else "verify:"
                    return UrlExtraction(url = "$prefix$urlPart", urlLineIndex = i)
                }
            }
        }

        return UrlExtraction(url = null, urlLineIndex = -1)
    }

    /**
     * Convert verify: or vfy: URL to https:// URL with hash appended
     *
     * @param baseUrl Base URL (verify: or vfy:)
     * @param hash SHA-256 hash to append
     * @param suffix Optional suffix from meta (e.g., ".json")
     * @return Full HTTPS verification URL
     */
    fun buildVerificationUrl(baseUrl: String, hash: String, suffix: String = "", hashesHostedAt: String? = null): String {
        // If meta specifies hashesHostedAt, use that as the base URL instead
        if (hashesHostedAt != null) {
            val hostedBase = hashesHostedAt.trimEnd('/')
            return "$hostedBase/$hash$suffix"
        }

        val lowerBase = baseUrl.lowercase()

        return when {
            lowerBase.startsWith("verify:") -> {
                val withoutPrefix = baseUrl.substring(7)
                "https://$withoutPrefix/$hash$suffix"
            }
            lowerBase.startsWith("vfy:") -> {
                val withoutPrefix = baseUrl.substring(4)
                "https://$withoutPrefix/$hash$suffix"
            }
            else -> throw IllegalArgumentException("Invalid base URL format. Must start with verify: or vfy:")
        }
    }

    /**
     * Extract candidate certification texts from raw OCR text.
     *
     * Returns a list of candidates, smallest first. The first candidate is the
     * section immediately above the vfy: line (up to the nearest blank line).
     * Each subsequent candidate prepends the next section above the previous
     * blank line. The caller tries each candidate against the server until one
     * matches (200), letting the hash tell us where the cert text really starts.
     *
     * This handles OCR stitching inserting synthetic blank lines (e.g. from a
     * dashed separator on a receipt) without needing to guess which blank lines
     * are structural boundaries vs incidental ones.
     *
     * @param rawText Raw OCR text
     * @param urlLineIndex Index of the URL line
     * @return List of candidate cert texts, smallest (bottom-most section) first
     */
    fun extractCertTextCandidates(rawText: String, urlLineIndex: Int): List<String> {
        val rawLines = rawText.split("\n").map { it.trim() }

        Log.d("ExtractCert", "urlLineIndex=$urlLineIndex, totalLines=${rawLines.size}")
        for ((i, line) in rawLines.withIndex()) {
            val marker = when {
                i == urlLineIndex -> " <-- URL"
                line.isEmpty() -> " <-- BLANK"
                else -> ""
            }
            Log.d("ExtractCert", "  [$i] \"$line\"$marker")
        }

        // Find blank line positions above the URL line
        val blankIndices = mutableListOf<Int>()
        for (i in (urlLineIndex - 1) downTo 0) {
            if (rawLines[i].isEmpty()) {
                blankIndices.add(i)
            }
        }

        // Build candidates: expand upward one section at a time
        val candidates = mutableListOf<String>()

        // Boundaries to try: each blank line, then index 0 (everything)
        val boundaries = blankIndices.map { it + 1 } + listOf(0)
        // Deduplicate and keep order (nearest blank line first)
        val uniqueBoundaries = boundaries.distinct()

        for (startIndex in uniqueBoundaries) {
            val certLines = rawLines.subList(startIndex, urlLineIndex).toMutableList()
            // Remove trailing blank lines
            while (certLines.isNotEmpty() && certLines.last().isEmpty()) {
                certLines.removeAt(certLines.lastIndex)
            }
            // Remove leading blank lines
            while (certLines.isNotEmpty() && certLines.first().isEmpty()) {
                certLines.removeAt(0)
            }
            if (certLines.isNotEmpty()) {
                val candidate = certLines.joinToString("\n")
                // Avoid duplicates (can happen if consecutive blank lines)
                if (candidates.isEmpty() || candidates.last() != candidate) {
                    Log.d("ExtractCert", "Candidate ${candidates.size}: startIndex=$startIndex (${certLines.size} lines)")
                    candidates.add(candidate)
                }
            }
        }

        if (candidates.isEmpty()) {
            Log.d("ExtractCert", "No candidates found")
        }
        return candidates
    }

    /**
     * Extract certification text (single result, for backward compatibility).
     * Returns the smallest section above the URL line (up to first blank line),
     * or everything if no blank lines exist.
     */
    fun extractCertText(rawText: String, urlLineIndex: Int): String {
        return extractCertTextCandidates(rawText, urlLineIndex).firstOrNull() ?: ""
    }

    /**
     * Fetch verification-meta.json from the base URL
     *
     * @param baseUrl Base URL (verify: or vfy:)
     * @return Metadata object or null if not found
     */
    suspend fun fetchVerificationMeta(baseUrl: String): JSONObject? = withContext(Dispatchers.IO) {
        fetchMetaFrom(baseUrl)
            ?: run {
                // Retry with www. prefix — browsers hide it so verify lines often omit it
                val wwwUrl = addWwwPrefix(baseUrl)
                if (wwwUrl != baseUrl) fetchMetaFrom(wwwUrl) else null
            }
    }

    private fun addWwwPrefix(baseUrl: String): String {
        val lower = baseUrl.lowercase()
        val prefix = when {
            lower.startsWith("verify:") -> "verify:"
            lower.startsWith("vfy:") -> "vfy:"
            else -> return baseUrl
        }
        val rest = baseUrl.substring(prefix.length)
        return if (rest.lowercase().startsWith("www.")) baseUrl else "${prefix}www.$rest"
    }

    private fun fetchMetaFrom(baseUrl: String): JSONObject? {
        return try {
            val httpsBase = when {
                baseUrl.lowercase().startsWith("verify:") -> "https://${baseUrl.substring(7)}"
                baseUrl.lowercase().startsWith("vfy:") -> "https://${baseUrl.substring(4)}"
                else -> baseUrl
            }

            val metaUrl = "$httpsBase/verification-meta.json"
            val request = Request.Builder()
                .url(metaUrl)
                .build()

            val response = client.newCall(request).execute()
            if (response.isSuccessful) {
                response.body?.string()?.let { JSONObject(it) }
            } else {
                null
            }
        } catch (e: Exception) {
            null
        }
    }

    /**
     * Verify hash against the server
     *
     * @param verificationUrl Full verification URL with hash
     * @return VerificationResult indicating success/failure
     */
    suspend fun verifyHash(verificationUrl: String): VerificationResult = withContext(Dispatchers.IO) {
        try {
            val request = Request.Builder()
                .url(verificationUrl)
                .build()

            val response = client.newCall(request).execute()
            val domain = getDomainFromUrl(verificationUrl)
            when (response.code) {
                200 -> {
                    val bodyText = response.body?.string()?.trim() ?: ""
                    val payload = try {
                        if (bodyText.startsWith("{")) JSONObject(bodyText) else null
                    } catch (_: Exception) { null }

                    // Check status field in JSON response
                    if (payload != null) {
                        val status = payload.optString("status", "").uppercase()
                        if (status == "VERIFIED") {
                            VerificationResult.Verified(domain, payload)
                        } else if (status.isNotEmpty()) {
                            VerificationResult.NotVerified(domain, status)
                        } else {
                            VerificationResult.Verified(domain, payload)
                        }
                    } else {
                        VerificationResult.NotVerified(domain, bodyText.take(50))
                    }
                }
                404 -> VerificationResult.NotVerified(domain, "Hash not found on server")
                else -> VerificationResult.Error("Server returned ${response.code}")
            }
        } catch (e: Exception) {
            VerificationResult.Error(e.message ?: "Network error")
        }
    }

    fun getDomainFromUrl(url: String): String {
        return try {
            val withoutProtocol = url.removePrefix("https://").removePrefix("http://")
            withoutProtocol.substringBefore("/")
        } catch (e: Exception) {
            url
        }
    }

    /**
     * Convert verify: or vfy: URL to https://
     */
    private fun convertToHttps(url: String): String {
        val lower = url.lowercase()
        return when {
            lower.startsWith("verify:") -> "https://${url.substring(7)}"
            lower.startsWith("vfy:") -> "https://${url.substring(4)}"
            lower.startsWith("https://") -> url
            else -> "https://$url"
        }
    }

    /**
     * Check authorization chain from verification-meta.json using merkle commitment.
     * The authorizer hashes the issuer's entire verification-meta.json (canonicalized),
     * not just the domain. This binds the authorization to the exact content of the
     * issuer's self-description (claimType, date bounds, everything).
     *
     * @param meta The issuer's full verification-meta.json object
     * @param metaUrl The URL from which verification-meta.json was fetched (for re-fetch)
     * @return AuthorizationResult with chain
     */
    suspend fun checkAuthorization(meta: JSONObject, metaUrl: String, claimUrl: String? = null): AuthorizationResult = withContext(Dispatchers.IO) {
        val authorizedBy = meta.optString("authorizedBy", "")
        if (authorizedBy.isEmpty()) {
            return@withContext AuthorizationResult.unchecked
        }

        val authorizer = authorizedBy.split("/").first()

        // Check date bounds
        val now = Date()
        val isoFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US)
        val simpleFormat = SimpleDateFormat("yyyy-MM-dd", Locale.US)

        meta.optString("authorizedFrom", "").takeIf { it.isNotEmpty() }?.let { fromStr ->
            val from = try { isoFormat.parse(fromStr) } catch (_: Exception) {
                try { simpleFormat.parse(fromStr) } catch (_: Exception) { null }
            }
            if (from != null && now.before(from)) {
                return@withContext AuthorizationResult(
                    checked = true, confirmed = false, authorizer = authorizer, description = null,
                    expired = false, successor = null, error = "Authorization period has not started yet", chain = emptyList()
                )
            }
        }

        meta.optString("authorizedTo", "").takeIf { it.isNotEmpty() }?.let { toStr ->
            val to = try { isoFormat.parse(toStr) } catch (_: Exception) {
                try { simpleFormat.parse(toStr) } catch (_: Exception) { null }
            }
            if (to != null && now.after(to)) {
                return@withContext AuthorizationResult(
                    checked = true, confirmed = false, authorizer = authorizer, description = null,
                    expired = true, successor = meta.optString("successor", "").takeIf { it.isNotEmpty() }, error = null, chain = emptyList()
                )
            }
        }

        try {
            // Re-fetch verification-meta.json for canonical hashing
            val request = Request.Builder().url(metaUrl).build()
            val response = client.newCall(request).execute()
            if (!response.isSuccessful) {
                return@withContext AuthorizationResult(
                    checked = false, confirmed = false, authorizer = authorizer, description = null,
                    expired = false, successor = null, error = "Could not re-fetch meta: HTTP ${response.code}", chain = emptyList()
                )
            }

            val rawBytes = response.body?.string() ?: ""
            // Canonicalize: parse then re-stringify to eliminate formatting differences
            val canonicalJson = JSONObject(rawBytes).toString()

            // Hash the canonical JSON
            val metaHash = TextNormalizer.sha256(canonicalJson)

            // Build authorization URL: verify:{authorizedBy}/{hash}
            val verifyPrefix = if (authorizedBy.lowercase().startsWith("verify:") || authorizedBy.lowercase().startsWith("vfy:"))
                authorizedBy else "verify:$authorizedBy"
            val authorizationUrl = buildVerificationUrl(verifyPrefix, metaHash)

            // Fetch authorization endpoint
            var confirmed = false
            val headerUrls = if (claimUrl != null) listOf(claimUrl) else emptyList()
            try {
                val authRequestBuilder = Request.Builder().url(authorizationUrl)
                if (headerUrls.isNotEmpty()) {
                    authRequestBuilder.addHeader("X-Verification-URLs", headerUrls.joinToString(", "))
                }
                val authRequest = authRequestBuilder.build()
                val authResponse = client.newCall(authRequest).execute()
                if (authResponse.isSuccessful) {
                    val body = authResponse.body?.string()?.trim() ?: ""
                    confirmed = body.isEmpty() ||
                        (body.startsWith("{") && try { JSONObject(body).optString("status") == "verified" } catch (_: Exception) { false })
                }
            } catch (_: Exception) {
                // Authorization fetch failed - not confirmed
            }

            // Walk the authorization chain — thread URLs for X-Verification-URLs header
            val walkUrls = if (claimUrl != null) listOf(claimUrl, authorizationUrl) else listOf(authorizationUrl)
            val chain = walkAuthorizationChain(authorizedBy, confirmed, 0, walkUrls)

            AuthorizationResult(
                checked = true,
                confirmed = confirmed,
                authorizer = authorizer,
                description = chain.firstOrNull()?.description,
                expired = false,
                successor = null,
                error = null,
                chain = chain
            )
        } catch (e: Exception) {
            AuthorizationResult(
                checked = false, confirmed = false, authorizer = authorizer, description = null,
                expired = false, successor = null, error = e.message, chain = emptyList()
            )
        }
    }

    /**
     * Walk the authorization chain by fetching each authorizer's verification-meta.json.
     * Returns a list of chain entries with authorizer domain, description, and confirmation status.
     * Max depth: 3 levels.
     */
    private suspend fun walkAuthorizationChain(
        authorizedByUrl: String,
        primaryConfirmed: Boolean,
        depth: Int,
        chainUrls: List<String> = emptyList()
    ): List<AuthorizationChainEntry> {
        val maxDepth = 3
        if (depth >= maxDepth) return emptyList()

        val authorizer = authorizedByUrl.split("/").first()

        return try {
            val httpsBase = convertToHttps(authorizedByUrl)
            val authorizerMetaUrl = "$httpsBase/verification-meta.json"

            val requestBuilder = Request.Builder().url(authorizerMetaUrl)
            if (chainUrls.isNotEmpty()) {
                requestBuilder.addHeader("X-Verification-URLs", chainUrls.joinToString(", "))
            }
            val request = requestBuilder.build()
            val response = client.newCall(request).execute()
            if (!response.isSuccessful) {
                return listOf(AuthorizationChainEntry(authorizer, null, null, primaryConfirmed))
            }

            val authorizerMeta = JSONObject(response.body?.string() ?: "{}")
            val description = authorizerMeta.optString("description", "").takeIf { it.isNotEmpty() }
            val formalName = authorizerMeta.optString("formalName", "").takeIf { it.isNotEmpty() }
                ?: authorizerMeta.optString("issuer", "").takeIf { it.isNotEmpty() }

            val entry = AuthorizationChainEntry(authorizer, description, formalName, primaryConfirmed)

            // If authorizer itself has authorizedBy, recurse with accumulated URLs
            val subAuthorizedBy = authorizerMeta.optString("authorizedBy", "")
            if (subAuthorizedBy.isNotEmpty()) {
                val subChain = walkAuthorizationChain(subAuthorizedBy, true, depth + 1, chainUrls + authorizerMetaUrl)
                listOf(entry) + subChain
            } else {
                listOf(entry)
            }
        } catch (_: Exception) {
            listOf(AuthorizationChainEntry(authorizer, null, null, primaryConfirmed))
        }
    }
}

/**
 * Entry in the authorization chain
 */
data class AuthorizationChainEntry(
    val authorizer: String,
    val description: String?,
    val formalName: String?,
    val confirmed: Boolean
)

/**
 * Result of an authorization check
 */
data class AuthorizationResult(
    val checked: Boolean,
    val confirmed: Boolean,
    val authorizer: String?,
    val description: String?,
    val expired: Boolean,
    val successor: String?,
    val error: String?,
    val chain: List<AuthorizationChainEntry>
) {
    companion object {
        val unchecked = AuthorizationResult(
            checked = false, confirmed = false, authorizer = null, description = null,
            expired = false, successor = null, error = null, chain = emptyList()
        )
    }
}

/**
 * Verification result sealed class
 */
sealed class VerificationResult {
    data class Verified(val domain: String, val payload: JSONObject? = null) : VerificationResult()
    data class NotVerified(val domain: String, val reason: String) : VerificationResult()
    data class Error(val message: String) : VerificationResult()
}
