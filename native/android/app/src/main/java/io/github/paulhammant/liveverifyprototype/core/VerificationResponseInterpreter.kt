package io.github.paulhammant.liveverifyprototype.core

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import java.net.URI

object VerificationResponseInterpreter {
    private val json = Json { ignoreUnknownKeys = true }

    fun interpret(
        httpStatus: Int,
        body: String,
        verificationUrl: URI,
        meta: VerificationMeta?,
    ): VerificationOutcome {
        val authorityHost = verificationUrl.host

        if (httpStatus != 200) {
            return VerificationOutcome(
                httpStatus = httpStatus,
                statusCode = null,
                displayText = "URL returned status $httpStatus",
                classification = VerificationClassification.DENYING,
                authorityHost = authorityHost,
                policyLink = null,
                rawBody = body,
            )
        }

        val trimmed = body.trim()
        val statusCode = extractStatusCode(trimmed)
        val normalizedStatus = statusCode.uppercase().take(50)

        val responseType = meta?.responseTypes?.get(normalizedStatus)
        if (responseType != null) {
            return VerificationOutcome(
                httpStatus = httpStatus,
                statusCode = normalizedStatus,
                displayText = responseType.text ?: normalizedStatus,
                classification = responseType.classification,
                authorityHost = authorityHost,
                policyLink = responseType.policyLink,
                rawBody = trimmed,
            )
        }

        if (normalizedStatus == "VERIFIED") {
            return VerificationOutcome(
                httpStatus = httpStatus,
                statusCode = normalizedStatus,
                displayText = "Claim Verified",
                classification = VerificationClassification.AFFIRMING,
                authorityHost = authorityHost,
                policyLink = null,
                rawBody = trimmed,
            )
        }

        return VerificationOutcome(
            httpStatus = httpStatus,
            statusCode = normalizedStatus,
            displayText = normalizedStatus.ifEmpty { "EMPTY_RESPONSE" },
            classification = VerificationClassification.DENYING,
            authorityHost = authorityHost,
            policyLink = null,
            rawBody = trimmed,
        )
    }

    private fun extractStatusCode(trimmedBody: String): String {
        if (trimmedBody.isBlank()) return "EMPTY_RESPONSE"

        val parsed = runCatching { json.decodeFromString(EndpointJsonResponse.serializer(), trimmedBody) }.getOrNull()
        parsed?.status?.trim()?.takeIf { it.isNotEmpty() }?.let { return it }
        parsed?.message?.trim()?.takeIf { it.isNotEmpty() }?.let { return it }

        return trimmedBody
    }

    @Serializable
    private data class EndpointJsonResponse(
        val status: String? = null,
        val message: String? = null,
    )
}

