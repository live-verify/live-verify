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
import JavaScriptCore

/// Errors that can occur when working with the JavaScript bridge
enum JSBridgeError: Error, LocalizedError {
    case contextCreationFailed
    case fileNotFound(String)
    case evaluationFailed(String)
    case invalidResult

    var errorDescription: String? {
        switch self {
        case .contextCreationFailed:
            return "Failed to create JavaScript context"
        case .fileNotFound(let file):
            return "JavaScript file not found: \(file)"
        case .evaluationFailed(let message):
            return "JavaScript evaluation failed: \(message)"
        case .invalidResult:
            return "Invalid result from JavaScript"
        }
    }
}

/// Bridge to execute web app's JavaScript code via JavaScriptCore
/// This ensures iOS uses the exact same normalization logic as the web app
class JSBridge {
    private let context: JSContext

    init() throws {
        guard let context = JSContext() else {
            throw JSBridgeError.contextCreationFailed
        }
        self.context = context

        // Set up exception handler
        context.exceptionHandler = { _, exception in
            if let exc = exception {
                Log.d("JSBridge", "Exception: \(exc)")
            }
        }

        // Set up console.log for debugging
        let consoleLog: @convention(block) (String) -> Void = { message in
            Log.d("JS", message)
        }
        context.setObject(consoleLog, forKeyedSubscript: "consoleLog" as NSString)
        context.evaluateScript("var console = { log: consoleLog, warn: consoleLog, error: consoleLog };")

        // Provide minimal Node.js compatibility shims
        context.evaluateScript("""
            var module = { exports: {} };
            var exports = module.exports;
            var window = this;
            var global = this;
        """)

        // Load JS files from bundle
        let jsFiles = ["normalize", "app-logic"]
        for file in jsFiles {
            guard let url = Bundle.main.url(forResource: file, withExtension: "js"),
                  let code = try? String(contentsOf: url, encoding: .utf8) else {
                throw JSBridgeError.fileNotFound(file)
            }
            context.evaluateScript(code)
        }
    }

    /// Normalize text using the web app's normalization rules
    /// - Parameters:
    ///   - text: Raw text to normalize
    ///   - metadata: Optional verification-meta.json contents
    /// - Returns: Normalized text, or nil if normalization failed
    func normalizeText(_ text: String, metadata: [String: Any]?) -> String? {
        let escapedText = text.jsEscaped
        let metaJSON: String
        if let meta = metadata,
           let data = try? JSONSerialization.data(withJSONObject: meta),
           let json = String(data: data, encoding: .utf8) {
            metaJSON = json
        } else {
            metaJSON = "null"
        }

        let script = "normalizeText('\(escapedText)', \(metaJSON))"
        let result = context.evaluateScript(script)
        return result?.toString()
    }

    /// Extract verification URL from OCR text
    /// Scans from bottom to top to find verify: or vfy: URL
    /// - Parameter text: Raw OCR text
    /// - Returns: Tuple of (url, lineIndex) or nil if not found
    func extractVerificationURL(from text: String) -> (url: String, lineIndex: Int)? {
        let escapedText = text.jsEscaped
        let script = "extractVerificationUrl('\(escapedText)')"
        let result = context.evaluateScript(script)

        guard let dict = result?.toDictionary(),
              let url = dict["url"] as? String,
              let lineIndex = dict["urlLineIndex"] as? Int,
              lineIndex >= 0 else {
            return nil
        }
        return (url, lineIndex)
    }

    /// Extract certification text (everything before the URL line)
    /// - Parameters:
    ///   - text: Raw OCR text
    ///   - urlLineIndex: Index of the line containing the verify: URL
    /// - Returns: Certification text to be hashed
    func extractCertText(from text: String, urlLineIndex: Int) -> String? {
        let escapedText = text.jsEscaped
        let script = "extractCertText('\(escapedText)', \(urlLineIndex))"
        let result = context.evaluateScript(script)
        return result?.toString()
    }

    /// Build full verification URL from base URL and hash
    /// Converts verify: or vfy: to https:// and appends hash (with optional suffix from meta)
    /// - Parameters:
    ///   - baseURL: Base URL (e.g., "verify:example.com/c")
    ///   - hash: SHA-256 hash of normalized text
    ///   - meta: Optional verification-meta.json contents (for suffix)
    /// - Returns: Full HTTPS URL for verification
    func buildVerificationURL(baseURL: String, hash: String, meta: [String: Any]?) -> String? {
        let escapedBase = baseURL.jsEscaped
        let metaJSON: String
        if let meta = meta,
           let data = try? JSONSerialization.data(withJSONObject: meta),
           let json = String(data: data, encoding: .utf8) {
            metaJSON = json
        } else {
            metaJSON = "null"
        }
        let script = "buildVerificationUrl('\(escapedBase)', '\(hash)', \(metaJSON))"
        let result = context.evaluateScript(script)
        return result?.toString()
    }
}

extension String {
    /// Escape string for use in JavaScript single-quoted string
    var jsEscaped: String {
        self
            .replacingOccurrences(of: "\\", with: "\\\\")
            .replacingOccurrences(of: "'", with: "\\'")
            .replacingOccurrences(of: "\n", with: "\\n")
            .replacingOccurrences(of: "\r", with: "\\r")
            .replacingOccurrences(of: "\t", with: "\\t")
    }
}
