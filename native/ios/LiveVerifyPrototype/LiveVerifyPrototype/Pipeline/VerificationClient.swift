import Foundation

struct VerificationClient {
    var session: URLSession = .shared

    func fetchVerificationMeta(baseURL: String) async -> VerificationMeta? {
        do {
            let metaURL = try VerifyLineParser.buildMetaURL(baseURL: baseURL)
            var request = URLRequest(url: metaURL)
            request.httpMethod = "GET"
            request.cachePolicy = .reloadIgnoringLocalCacheData

            let (data, response) = try await session.data(for: request)
            guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
                return nil
            }

            return try JSONDecoder().decode(VerificationMeta.self, from: data)
        } catch {
            return nil
        }
    }

    func verify(verificationURL: URL, baseURL: String, meta: VerificationMeta?) async throws -> VerificationOutcome {
        var request = URLRequest(url: verificationURL)
        request.httpMethod = "GET"
        request.cachePolicy = .reloadIgnoringLocalCacheData

        let (data, response) = try await session.data(for: request)
        guard let http = response as? HTTPURLResponse else {
            throw URLError(.badServerResponse)
        }

        let body = String(data: data, encoding: .utf8) ?? ""
        return VerificationResponseInterpreter.interpret(
            httpStatus: http.statusCode,
            body: body,
            verificationURL: verificationURL,
            meta: meta
        )
    }
}

enum VerificationResponseInterpreter {
    static func interpret(
        httpStatus: Int,
        body: String,
        verificationURL: URL,
        meta: VerificationMeta?
    ) -> VerificationOutcome {
        let authorityHost = verificationURL.host

        guard httpStatus == 200 else {
            return VerificationOutcome(
                httpStatus: httpStatus,
                statusCode: nil,
                displayText: "URL returned status \(httpStatus)",
                classification: .denying,
                authorityHost: authorityHost,
                policyLink: nil,
                rawBody: body
            )
        }

        let trimmed = body.trimmingCharacters(in: .whitespacesAndNewlines)
        let statusCode = extractStatusCode(from: trimmed)

        if let meta, let responseType = meta.responseTypes?[statusCode] {
            return VerificationOutcome(
                httpStatus: httpStatus,
                statusCode: statusCode,
                displayText: responseType.text ?? statusCode,
                classification: responseType.classification,
                authorityHost: authorityHost,
                policyLink: responseType.policyURL,
                rawBody: trimmed
            )
        }

        if statusCode == "VERIFIED" {
            return VerificationOutcome(
                httpStatus: httpStatus,
                statusCode: statusCode,
                displayText: "Claim Verified",
                classification: .affirming,
                authorityHost: authorityHost,
                policyLink: nil,
                rawBody: trimmed
            )
        }

        return VerificationOutcome(
            httpStatus: httpStatus,
            statusCode: statusCode,
            displayText: statusCode,
            classification: .denying,
            authorityHost: authorityHost,
            policyLink: nil,
            rawBody: trimmed
        )
    }

    private static func extractStatusCode(from trimmedBody: String) -> String {
        if let json = tryParseJSON(trimmedBody) {
            if let status = (json["status"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines), !status.isEmpty {
                return status.uppercased().prefix(50).description
            }
            if let message = (json["message"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines), !message.isEmpty {
                return message.uppercased().prefix(50).description
            }
        }

        if trimmedBody.isEmpty {
            return "EMPTY_RESPONSE"
        }

        return trimmedBody.uppercased().prefix(50).description
    }

    private static func tryParseJSON(_ text: String) -> [String: Any]? {
        guard let data = text.data(using: .utf8) else { return nil }
        guard let obj = try? JSONSerialization.jsonObject(with: data, options: []) else { return nil }
        return obj as? [String: Any]
    }
}

