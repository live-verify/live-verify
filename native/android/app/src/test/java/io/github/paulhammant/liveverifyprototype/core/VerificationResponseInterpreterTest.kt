package io.github.paulhammant.liveverifyprototype.core

import kotlinx.serialization.json.Json
import org.junit.Assert.assertEquals
import org.junit.Test
import java.net.URI

class VerificationResponseInterpreterTest {
    @Test
    fun verifiedJsonIsAffirmingWithoutMeta() {
        val url = URI.create("https://issuer.example.com/claims/abc")
        val outcome = VerificationResponseInterpreter.interpret(200, """{"status":"verified"}""", url, meta = null)
        assertEquals(VerificationClassification.AFFIRMING, outcome.classification)
        assertEquals("Claim Verified", outcome.displayText)
    }

    @Test
    fun affirmingStatusFromMetaIsAffirming() {
        val json = """
            {
              "responseTypes": {
                "GRADUATED": { "class": "affirming", "text": "Awarded degree" },
                "REVOKED": { "class": "denying", "text": "Revoked" }
              }
            }
        """.trimIndent()

        val meta = Json { ignoreUnknownKeys = true }.decodeFromString(VerificationMeta.serializer(), json)
        val url = URI.create("https://issuer.example.com/claims/abc")

        val outcome = VerificationResponseInterpreter.interpret(200, "GRADUATED", url, meta)
        assertEquals(VerificationClassification.AFFIRMING, outcome.classification)
        assertEquals("Awarded degree", outcome.displayText)
    }

    @Test
    fun non200IsDenying() {
        val url = URI.create("https://issuer.example.com/claims/abc")
        val outcome = VerificationResponseInterpreter.interpret(404, "", url, meta = null)
        assertEquals(VerificationClassification.DENYING, outcome.classification)
        assertEquals(404, outcome.httpStatus)
    }

    @Test
    fun jsonStatusVerifiedIsAffirming() {
        val url = URI.create("https://issuer.example.com/claims/abc")
        val outcome = VerificationResponseInterpreter.interpret(200, """{"status":"verified"}""", url, meta = null)
        assertEquals(VerificationClassification.AFFIRMING, outcome.classification)
    }
}

