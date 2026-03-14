/*
    Copyright (C) 2025, Paul Hammant

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import Foundation

/// Verification outcome from the issuer's endpoint
enum VerificationOutcome {
    case affirming(domain: String, status: String)
    case denying(domain: String, reason: String)
    case networkError(domain: String, Error)
    case noVerifyURL
    case error(String)
}

/// Errors that can occur during verification
enum VerificationError: Error, LocalizedError {
    case invalidURL(String)
    case networkError(Error)
    case httpError(Int)
    case invalidResponse

    var errorDescription: String? {
        switch self {
        case .invalidURL(let url):
            return "Invalid verification URL: \(url)"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        case .httpError(let code):
            return "HTTP error: \(code)"
        case .invalidResponse:
            return "Invalid response from verification endpoint"
        }
    }
}

/// Entry in the authorization chain
struct AuthorizationChainEntry {
    let authorizer: String
    let description: String?
    let formalName: String?
    let confirmed: Bool
}

/// Result of an authorization check
struct AuthorizationResult {
    let checked: Bool
    let confirmed: Bool
    let authorizer: String?
    let description: String?
    let expired: Bool
    let successor: String?
    let error: String?
    let chain: [AuthorizationChainEntry]

    static let unchecked = AuthorizationResult(
        checked: false, confirmed: false, authorizer: nil, description: nil,
        expired: false, successor: nil, error: nil, chain: []
    )
}

/// Client for fetching verification-meta.json and verifying hashes
class VerificationClient {
    private let session: URLSession

    init(session: URLSession = .shared) {
        self.session = session
    }

    /// Fetch verification-meta.json from the issuer's domain
    /// - Parameter baseURL: Base URL (e.g., "verify:example.com/c" or "https://example.com/c")
    /// - Returns: Parsed JSON dictionary or nil if not found
    func fetchVerificationMeta(baseURL: String) async -> [String: Any]? {
        if let result = await fetchMetaFrom(convertToHTTPS(baseURL)) {
            return result
        }
        // Retry with www. prefix — browsers hide it so verify lines often omit it
        let wwwBase = addWwwPrefix(baseURL)
        if wwwBase != baseURL {
            Log.d("Verify", "Retrying with www. prefix")
            return await fetchMetaFrom(convertToHTTPS(wwwBase))
        }
        return nil
    }

    /// Insert www. into a verify/vfy line's domain, if not already present
    private func addWwwPrefix(_ baseURL: String) -> String {
        let lower = baseURL.lowercased()
        let prefix: String
        if lower.hasPrefix("verify:") { prefix = "verify:" }
        else if lower.hasPrefix("vfy:") { prefix = "vfy:" }
        else { return baseURL }
        let rest = String(baseURL.dropFirst(prefix.count))
        if rest.lowercased().hasPrefix("www.") { return baseURL }
        return "\(prefix)www.\(rest)"
    }

    /// Fetch verification-meta.json from a single HTTPS base URL
    private func fetchMetaFrom(_ httpsBase: String) async -> [String: Any]? {
        let metaURLString = "\(httpsBase)/verification-meta.json"
        Log.d("Verify", "Fetching meta from: \(metaURLString)")

        guard let metaURL = URL(string: metaURLString) else {
            Log.d("Verify", "Invalid meta URL: \(metaURLString)")
            return nil
        }

        do {
            let (data, response) = try await session.data(from: metaURL)

            guard let httpResponse = response as? HTTPURLResponse else {
                Log.d("Verify", "Not an HTTP response")
                return nil
            }

            Log.d("Verify", "HTTP status: \(httpResponse.statusCode)")

            guard httpResponse.statusCode == 200 else {
                return nil
            }

            let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
            Log.d("Verify", "Meta parsed: \(json != nil ? "success" : "nil")")
            return json
        } catch {
            Log.d("Verify", "Failed to fetch meta: \(error)")
            return nil
        }
    }

    /// Verify a hash against the issuer's endpoint
    /// - Parameters:
    ///   - verificationURL: Full verification URL (https://domain.com/path/hash)
    ///   - meta: Optional verification-meta.json for response type interpretation
    /// - Returns: Verification outcome
    func verify(verificationURL: String, meta: [String: Any]?) async -> VerificationOutcome {
        guard let url = URL(string: verificationURL) else {
            return .denying(domain: "unknown", reason: "Invalid URL")
        }

        let domain = url.host ?? "unknown"

        do {
            let (data, response) = try await session.data(from: url)

            guard let httpResponse = response as? HTTPURLResponse else {
                return .denying(domain: domain, reason: "Invalid response")
            }

            // Check for 2xx status codes
            guard (200...299).contains(httpResponse.statusCode) else {
                if httpResponse.statusCode == 404 {
                    return .denying(domain: domain, reason: "Hash not found")
                }
                return .denying(domain: domain, reason: "HTTP \(httpResponse.statusCode)")
            }

            // Parse response body
            let bodyText = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""

            // Try to parse as JSON
            if let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
               let status = json["status"] as? String {
                let upperStatus = status.uppercased()
                if upperStatus == "VERIFIED" {
                    return .affirming(domain: domain, status: "VERIFIED")
                }

                // Check responseTypes from meta for custom status interpretation
                if let responseTypes = meta?["responseTypes"] as? [String: Any],
                   let typeInfo = responseTypes[upperStatus] as? [String: Any],
                   let typeClass = typeInfo["class"] as? String {
                    if typeClass == "affirming" {
                        return .affirming(domain: domain, status: upperStatus)
                    } else {
                        let text = typeInfo["text"] as? String ?? upperStatus
                        return .denying(domain: domain, reason: text)
                    }
                }

                // Default: treat non-VERIFIED as denying
                return .denying(domain: domain, reason: upperStatus)
            }

            // Check responseTypes from meta for plain text responses
            if let responseTypes = meta?["responseTypes"] as? [String: Any] {
                let upperBody = bodyText.uppercased()
                if let typeInfo = responseTypes[upperBody] as? [String: Any],
                   let typeClass = typeInfo["class"] as? String {
                    if typeClass == "affirming" {
                        return .affirming(domain: domain, status: upperBody)
                    } else {
                        let text = typeInfo["text"] as? String ?? upperBody
                        return .denying(domain: domain, reason: text)
                    }
                }
            }

            // Default for unrecognized body
            if !bodyText.isEmpty {
                return .denying(domain: domain, reason: bodyText.prefix(50).description)
            }

            return .denying(domain: domain, reason: "Empty response")

        } catch {
            return .networkError(domain: domain, error)
        }
    }

    /// Check authorization chain from verification-meta.json using merkle commitment
    /// - Parameters:
    ///   - meta: The issuer's verification-meta.json
    ///   - metaUrl: URL from which meta was fetched (for re-fetch and canonicalization)
    /// - Returns: AuthorizationResult with chain
    func checkAuthorization(meta: [String: Any], metaUrl: String) async -> AuthorizationResult {
        guard let authorizedBy = meta["authorizedBy"] as? String, !authorizedBy.isEmpty else {
            return .unchecked
        }

        let authorizer = authorizedBy.components(separatedBy: "/").first ?? authorizedBy

        // Check date bounds
        let now = Date()
        if let fromStr = meta["authorizedFrom"] as? String,
           let from = ISO8601DateFormatter().date(from: fromStr) ?? parseSimpleDate(fromStr) {
            if now < from {
                return AuthorizationResult(
                    checked: true, confirmed: false, authorizer: authorizer, description: nil,
                    expired: false, successor: nil, error: "Authorization period has not started yet", chain: []
                )
            }
        }
        if let toStr = meta["authorizedTo"] as? String,
           let to = ISO8601DateFormatter().date(from: toStr) ?? parseSimpleDate(toStr) {
            if now > to {
                return AuthorizationResult(
                    checked: true, confirmed: false, authorizer: authorizer, description: nil,
                    expired: true, successor: meta["successor"] as? String, error: nil, chain: []
                )
            }
        }

        do {
            // Re-fetch verification-meta.json for canonical hashing
            let metaURL = URL(string: metaUrl)!
            let (data, response) = try await session.data(from: metaURL)
            guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
                return AuthorizationResult(
                    checked: false, confirmed: false, authorizer: authorizer, description: nil,
                    expired: false, successor: nil, error: "Could not re-fetch meta", chain: []
                )
            }

            // Canonicalize: parse then re-serialize
            let parsed = try JSONSerialization.jsonObject(with: data)
            let canonicalData = try JSONSerialization.data(withJSONObject: parsed, options: [.sortedKeys])
            let canonicalJson = String(data: canonicalData, encoding: .utf8) ?? ""

            // Hash the canonical JSON
            let metaHash = SHA256Hasher.hashHex(canonicalJson)

            // Build authorization URL
            let verifyPrefix = authorizedBy.lowercased().hasPrefix("verify:") || authorizedBy.lowercased().hasPrefix("vfy:")
                ? authorizedBy : "verify:\(authorizedBy)"
            let httpsBase = convertToHTTPS(verifyPrefix)
            let authorizationUrl = "\(httpsBase)/\(metaHash)"

            Log.d("Verify", "Authorization URL: \(authorizationUrl)")

            // Fetch authorization endpoint
            var confirmed = false
            if let authURL = URL(string: authorizationUrl) {
                let (authData, authResponse) = try await session.data(from: authURL)
                if let httpAuth = authResponse as? HTTPURLResponse {
                    if (200...299).contains(httpAuth.statusCode) {
                        let body = String(data: authData, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
                        confirmed = body.isEmpty ||
                            (body.hasPrefix("{") && ((try? JSONSerialization.jsonObject(with: authData) as? [String: Any])?["status"] as? String) == "verified")
                    }
                }
            }

            // Walk the authorization chain
            let chain = await walkAuthorizationChain(authorizedByUrl: authorizedBy, primaryConfirmed: confirmed, depth: 0)

            return AuthorizationResult(
                checked: true,
                confirmed: confirmed,
                authorizer: authorizer,
                description: chain.first?.description,
                expired: false,
                successor: nil,
                error: nil,
                chain: chain
            )
        } catch {
            return AuthorizationResult(
                checked: false, confirmed: false, authorizer: authorizer, description: nil,
                expired: false, successor: nil, error: error.localizedDescription, chain: []
            )
        }
    }

    /// Walk the authorization chain recursively (max 3 levels)
    private func walkAuthorizationChain(authorizedByUrl: String, primaryConfirmed: Bool, depth: Int) async -> [AuthorizationChainEntry] {
        let maxDepth = 3
        guard depth < maxDepth else { return [] }

        let authorizer = authorizedByUrl.components(separatedBy: "/").first ?? authorizedByUrl

        do {
            let httpsBase = authorizedByUrl.lowercased().hasPrefix("https://") ? authorizedByUrl : "https://\(authorizedByUrl)"
            let authorizerMetaUrl = "\(httpsBase)/verification-meta.json"

            guard let url = URL(string: authorizerMetaUrl) else {
                return [AuthorizationChainEntry(authorizer: authorizer, description: nil, formalName: nil, confirmed: primaryConfirmed)]
            }

            let (data, response) = try await session.data(from: url)
            guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
                return [AuthorizationChainEntry(authorizer: authorizer, description: nil, formalName: nil, confirmed: primaryConfirmed)]
            }

            guard let authorizerMeta = try JSONSerialization.jsonObject(with: data) as? [String: Any] else {
                return [AuthorizationChainEntry(authorizer: authorizer, description: nil, formalName: nil, confirmed: primaryConfirmed)]
            }

            let description = authorizerMeta["description"] as? String ?? authorizerMeta["issuer"] as? String
            let formalName = authorizerMeta["formalName"] as? String ?? authorizerMeta["issuer"] as? String
            let entry = AuthorizationChainEntry(authorizer: authorizer, description: description, formalName: formalName, confirmed: primaryConfirmed)

            // If authorizer itself has authorizedBy, recurse
            if let subEndorsedBy = authorizerMeta["authorizedBy"] as? String, !subEndorsedBy.isEmpty {
                let subChain = await walkAuthorizationChain(authorizedByUrl: subEndorsedBy, primaryConfirmed: true, depth: depth + 1)
                return [entry] + subChain
            }

            return [entry]
        } catch {
            return [AuthorizationChainEntry(authorizer: authorizer, description: nil, formalName: nil, confirmed: primaryConfirmed)]
        }
    }

    /// Parse simple date string like "2023-01-01"
    private func parseSimpleDate(_ str: String) -> Date? {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        formatter.locale = Locale(identifier: "en_US_POSIX")
        return formatter.date(from: str)
    }

    /// Convert verify: or vfy: URL to https://
    private func convertToHTTPS(_ url: String) -> String {
        let lower = url.lowercased()
        if lower.hasPrefix("verify:") {
            return "https://" + String(url.dropFirst(7))
        } else if lower.hasPrefix("vfy:") {
            return "https://" + String(url.dropFirst(4))
        } else if lower.hasPrefix("https://") {
            return url
        } else {
            return "https://" + url
        }
    }
}
