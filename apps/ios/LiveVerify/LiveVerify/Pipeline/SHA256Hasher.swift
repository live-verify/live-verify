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
import CryptoKit

/// SHA-256 hashing utility using native CryptoKit
/// Produces lowercase hex string output matching the web app
struct SHA256Hasher {
    /// Compute SHA-256 hash of text and return as lowercase hex string
    /// - Parameter text: Input text (will be UTF-8 encoded)
    /// - Returns: 64-character lowercase hex string
    static func hashHex(_ text: String) -> String {
        let data = Data(text.utf8)
        let digest = SHA256.hash(data: data)
        return digest.map { String(format: "%02x", $0) }.joined()
    }
}
