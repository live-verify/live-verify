package io.github.paulhammant.liveverifyprototype.core

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import java.net.URI

@Serializable
data class VerificationMeta(
    val description: String? = null,
    val issuer: String? = null,
    val claimType: String? = null,
    val parentAuthorities: List<String>? = null,
    val authorizedBy: String? = null,
    val authorizedFrom: String? = null,
    val authorizedTo: String? = null,
    val successor: String? = null,
    val responseTypes: Map<String, ResponseType>? = null,
    val retentionLaws: List<RetentionLaw>? = null,
    val charNormalization: String? = null,
    val ocrNormalizationRules: List<OCRNormalizationRule>? = null,
) {
    @Serializable
    data class ResponseType(
        @SerialName("class") val klass: String? = null,
        val text: String? = null,
        val link: String? = null,
    ) {
        val classification: VerificationClassification
            get() = when ((klass ?: "").lowercase()) {
                "affirming" -> VerificationClassification.AFFIRMING
                "denying" -> VerificationClassification.DENYING
                else -> VerificationClassification.UNKNOWN
            }

        val policyLink: URI?
            get() = link?.let { runCatching { URI(it) }.getOrNull() }
    }

    @Serializable
    data class RetentionLaw(
        val jurisdiction: String? = null,
        val law: String? = null,
        val link: String? = null,
        val summary: String? = null,
    )

    @Serializable
    data class OCRNormalizationRule(
        val pattern: String? = null,
        val replacement: String? = null,
        val description: String? = null,
    )

}

