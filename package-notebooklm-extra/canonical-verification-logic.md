# Live Verify — Canonical Verification Logic (JavaScript source)

This document contains the **single source of truth** for how Live Verify turns a piece of
printed or on-screen text into a verifiable claim. Everything in the system reduces to one
deterministic pipeline:

```
text  →  normalize  →  SHA-256  →  GET https://issuer.example/{hash}
```

The JavaScript files described here are small, readable, and **directly usable** — unlike the
native iOS and Android apps, which are large compiled binaries. The native apps do not
re-implement this logic; they **bundle and execute `normalize.js` verbatim** inside an embedded
JavaScript engine (JavaScriptCore on iOS, a JS runtime on Android). The browser extension and the
web pages load the very same file. Because all platforms run the identical normalization code over
the identical input, they all produce the **identical SHA-256 hash**, and therefore hit the
identical verification URL. There is no platform-specific normalization; if there were, the
hashes would diverge and verification would silently break.

The rest of this document walks through the pipeline file by file. For the core files the **actual
source is included**, because the exact rules — the regex replacements, the line-by-line
whitespace handling, the character substitutions — *are* the specification. They are what make the
system reproducible across platforms and over time, and they are exactly what is useful to reason
about when analyzing the system's correctness or security.

---

## 1. `normalize.js` — canonical normalization + SHA-256 (the heart of the system)

This is the most important file. It defines two things that every platform must agree on:

- **`normalizeText(text, metadata)`** — turns arbitrary input text into a canonical byte string.
  It first applies any document-specific rules supplied via `verification-meta.json` (character
  substitutions and OCR regex rules, via `applyDocSpecificNorm`), then applies universal Unicode
  normalization (curly quotes → straight, en/em dash → hyphen, non-breaking space → space, ellipsis
  → three periods), then processes the text **line by line**: strip leading whitespace, strip
  trailing whitespace, collapse internal runs of whitespace to a single space, and drop blank
  lines entirely. Finally it joins the surviving lines with `\n` and emits **no trailing newline**.
  These rules are deliberately forgiving of the cosmetic differences between how a document is
  printed, OCR'd, or copy-pasted, while preserving the meaningful content.
- **`sha256(text)`** — computes the SHA-256 hex digest of the normalized string. It is
  environment-aware: in Node.js (tests) it uses the `crypto` module; in the browser it uses
  `crypto.subtle.digest` (returning a promise). The input is UTF-8 encoded before hashing.

Also exported is **`applyDocSpecificNorm(text, metadata)`**, the issuer-defined pre-pass.

The whitespace and Unicode rules below are the canonical normalization specification. Any platform
must reproduce them exactly to compute a matching hash.

```javascript
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

/**
 * Shared text normalization and hashing functions
 * Used by both the main app and test pages
 */

/**
 * Apply document-specific normalization rules from verification-meta.json
 * This allows document issuers to define character substitutions and regex patterns
 * @param {string} text - Text to normalize
 * @param {Object} metadata - Metadata from verification-meta.json (optional)
 * @returns {string} Normalized text with document-specific rules applied
 */
function applyDocSpecificNorm(text, metadata) {
    if (!metadata) {
        return text;
    }

    let result = text;

    // 1. Apply character normalization (compact notation: "éèêë→e àáâä→a")
    if (metadata.charNormalization) {
        const groups = metadata.charNormalization.trim().split(/\s+/);
        for (const group of groups) {
            const parts = group.split('→');
            if (parts.length === 2 && parts[1].length === 1) {
                const sourceChars = parts[0];
                const targetChar = parts[1];
                for (const sourceChar of sourceChars) {
                    const regex = new RegExp(sourceChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                    result = result.replace(regex, targetChar);
                }
            }
        }
    }

    // 2. Apply OCR normalization rules (regex patterns)
    if (metadata.ocrNormalizationRules && Array.isArray(metadata.ocrNormalizationRules)) {
        for (const rule of metadata.ocrNormalizationRules) {
            if (rule.pattern && rule.replacement) {
                try {
                    const regex = new RegExp(rule.pattern, 'g');
                    result = result.replace(regex, rule.replacement);
                } catch (e) {
                    console.error(`Invalid regex pattern: ${rule.pattern}`, e);
                }
            }
        }
    }

    return result;
}

// Text normalization function (as per the document rules)
function normalizeText(text, metadata = null) {
    // Apply document-specific normalization FIRST (before standard normalization)
    // This ensures user-typed text gets the same treatment as OCR text
    text = applyDocSpecificNorm(text, metadata);

    // Normalize Unicode characters that OCR might produce
    text = text.replace(/[“”„]/g, '"');  // Curly double quotes → straight
    text = text.replace(/[‘’]/g, "'");        // Curly single quotes → straight
    text = text.replace(/[«»]/g, '"');        // Angle quotes → straight double
    text = text.replace(/[–—]/g, '-');        // En/em dash → hyphen
    text = text.replace(/ /g, ' ');                // Non-breaking space → space
    text = text.replace(/…/g, '...');              // Ellipsis → three periods

    // Split into lines
    const lines = text.split('\n');

    // Apply normalization rules to each line
    // Note: OCR artifact cleanup (border chars, trailing letters) is in ocr-cleanup.js
    // and should be applied BEFORE this function for OCR'd text
    const normalizedLines = lines.map(line => {
        // Remove leading spaces
        line = line.replace(/^\s+/, '');
        // Remove trailing spaces
        line = line.replace(/\s+$/, '');
        // Collapse multiple spaces into single space
        line = line.replace(/\s+/g, ' ');
        return line;
    })
    .filter(line => line.length > 0); // Remove blank lines

    // Join back with newlines, no trailing newline
    return normalizedLines.join('\n');
}

// SHA-256 hash function (works in both browser and Node.js)
function sha256(text) {
    // Node.js environment (for testing)
    if (typeof require !== 'undefined' && typeof window === 'undefined') {
        const crypto = require('crypto');
        return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
    }

    // Browser environment (production)
    return (async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    })();
}

// Export for Node.js testing (doesn't affect browser usage)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { normalizeText, sha256, applyDocSpecificNorm };
}
```

---

## 2. `app-logic.js` — URL extraction and the verification request flow

This file holds the pure, testable functions that surround the hash: finding the verification URL
in a block of text, separating the certified content from that URL, turning a `verify:`/`vfy:`
scheme into a real `https://` request, and interpreting the issuer's response. Key exports:

- **`extractVerificationUrl(rawText)`** — scans the text **from bottom to top** for a line matching
  `verify:` or `vfy:` (with flexible spacing around the colon), so that OCR garbage *below* the URL
  is discarded. Returns the normalized base URL (e.g. `verify:example.com/path`) and the line index
  at which it was found.
- **`extractCertText(rawText, urlLineIndex)`** — returns everything *above* the URL line (with
  trailing blank lines removed). This is the text that actually gets hashed; the `verify:` line
  itself is **not** part of the hash.
- **`buildVerificationUrl(baseUrl, hash, meta)`** — converts `verify:`/`vfy:` to `https://` (or
  `http://` for localhost/127.0.0.1), appends the hash, and honors metadata fields
  `appendToHashResourceName` / `appendToHashFileName` (a suffix such as `.json`) and `hashesHostedAt`
  (hashes hosted on a different host/path).
- **`buildMetaUrl` / `fetchVerificationMeta`** — locate and fetch the issuer's
  `verification-meta.json`.
- **`extractDomain` / `trimToFirstLinePattern`** — domain parsing and a camera-mode helper that
  trims OCR noise above the first content line matching an issuer-supplied pattern.
- **`verifyHash`** — performs the GET and classifies the response (`VERIFIED`, `404` = "does not
  verify this claim", custom `responseTypes` from meta, etc.).
- **`checkAuthorization` / `walkAuthorizationChain`** — the authority-chain mechanism. The
  authorizer commits to a hash of the issuer's **entire canonicalized `verification-meta.json`** (not
  just the domain), binding the endorsement to the issuer's exact self-description. The chain is
  walked up to 3 levels, threading the accumulated verification URLs in an `X-Verification-URLs`
  header so endorsers can walk backward.

```javascript
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

/**
 * Pure functions for app logic that can be tested with Jest
 */

/**
 * Rotate canvas by degrees (for orientation correction)
 * @param {HTMLCanvasElement} sourceCanvas - The source canvas to rotate
 * @param {number} degrees - Rotation angle (0, 90, 180, 270)
 * @returns {HTMLCanvasElement} - New rotated canvas
 */
function rotateCanvas(sourceCanvas, degrees) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Normalize degrees to 0, 90, 180, 270
    degrees = ((degrees % 360) + 360) % 360;

    // Swap dimensions for 90/270 degree rotations
    if (degrees === 90 || degrees === 270) {
        canvas.width = sourceCanvas.height;
        canvas.height = sourceCanvas.width;
    } else {
        canvas.width = sourceCanvas.width;
        canvas.height = sourceCanvas.height;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.drawImage(sourceCanvas, -sourceCanvas.width / 2, -sourceCanvas.height / 2);

    return canvas;
}

/**
 * Extract verification URL from OCR raw text
 * Scans from bottom to top to find verify: or https line, discarding OCR garbage below it
 * @param {string} rawText - Raw OCR text
 * @returns {{url: string|null, urlLineIndex: number}} - Extracted base URL and its line index, or {url: null, urlLineIndex: -1} if not found
 */
function extractVerificationUrl(rawText) {
    const rawLines = rawText.split('\n').map(l => l.trim());

    // Match verify: or vfy: with optional spaces around colon
    // e.g., "verify:", "verify :", "verify: ", "verify : " all match
    const verifyPattern = /(^|\s)(verify|vfy)\s*:\s*/i;

    // Scan from bottom to top to find the verify: or vfy: line
    // Everything below it is likely OCR garbage from dust/artifacts
    for (let i = rawLines.length - 1; i >= 0; i--) {
        const line = rawLines[i];
        if (!line) continue; // Skip empty lines

        const match = line.match(verifyPattern);
        if (match) {
            // Found a match - extract everything after the pattern (which includes colon and surrounding spaces)
            let urlPart = line.substring(match.index + match[0].length);

            // Strip leading/trailing whitespace from URL part
            urlPart = urlPart.trim();

            // Strip trailing garbage (anything after a space in the URL)
            const spaceIndex = urlPart.indexOf(' ');
            if (spaceIndex !== -1) {
                urlPart = urlPart.substring(0, spaceIndex);
            }

            if (urlPart.length > 0) {
                // Determine the correct prefix (normalized, no spaces)
                const prefix = match[2].toLowerCase() === 'vfy' ? 'vfy:' : 'verify:';

                return {
                    url: prefix + urlPart,
                    urlLineIndex: i
                };
            }
        }
    }

    // Expected failure: no verification URL found in OCR text
    return {
        url: null,
        urlLineIndex: -1
    };
}

/**
 * Convert verify: or vfy: URL to https:// URL with hash appended
 * @param {string} baseUrl - Base URL (either "verify:example.com/path", "vfy:example.com/path", or "https://example.com/path")
 * @param {string} hash - SHA-256 hash to append
 * @param {Object} [meta] - Optional verification-meta.json contents
 * @returns {string} - Full HTTPS verification URL
 */
function buildVerificationUrl(baseUrl, hash, meta) {
    const lowerBase = baseUrl.toLowerCase();

    // Get suffix from meta if available (e.g., ".json")
    // Preferred field: "appendToHashResourceName"; legacy: "appendToHashFileName"
    const suffix = (meta && (meta.appendToHashResourceName || meta.appendToHashFileName)) || '';

    // If meta specifies hashesHostedAt, use that as the base URL instead
    if (meta && meta.hashesHostedAt) {
        const hostedBase = meta.hashesHostedAt.replace(/\/$/, '');
        return `${hostedBase}/${hash}${suffix}`;
    }

    // If it starts with verify:, convert to https:// (or http:// for local test)
    if (lowerBase.startsWith('verify:')) {
        const withoutPrefix = baseUrl.substring(7); // Remove "verify:"
        const protocol = (withoutPrefix.includes('localhost') || withoutPrefix.includes('127.0.0.1')) ? 'http' : 'https';
        return `${protocol}://${withoutPrefix}/${hash}${suffix}`;
    }

    // If it starts with vfy:, convert to https://
    if (lowerBase.startsWith('vfy:')) {
        const withoutPrefix = baseUrl.substring(4); // Remove "vfy:"
        const protocol = (withoutPrefix.includes('localhost') || withoutPrefix.includes('127.0.0.1')) ? 'http' : 'https';
        return `${protocol}://${withoutPrefix}/${hash}${suffix}`;
    }

    // This should not be reached if extractVerificationUrl is working correctly
    throw new Error('Invalid base URL format. Must start with verify: or vfy:');
}

/**
 * Trim OCR text to start at the first line matching a firstLinePatterns entry.
 * Used primarily by camera mode where OCR captures surrounding noise above the
 * verifiable region. The ⌝ (U+231D) registration mark is the universal fallback;
 * this provides a text-content hint when the mark is absent or not recognized.
 *
 * @param {string} text - OCR text (already URL-stripped, i.e. cert text only)
 * @param {Object} meta - Parsed verification-meta.json (may contain firstLinePatterns)
 * @returns {string} - Text trimmed from the first matching line onward, or unchanged if no match / no patterns
 */
function trimToFirstLinePattern(text, meta) {
    if (!meta || !Array.isArray(meta.firstLinePatterns) || meta.firstLinePatterns.length === 0) {
        return text;
    }

    const lines = text.split('\n');

    // Compile patterns once
    const regexes = [];
    for (const entry of meta.firstLinePatterns) {
        const pattern = typeof entry === 'string' ? entry : entry.pattern;
        if (!pattern) continue;
        try {
            regexes.push(new RegExp(pattern));
        } catch (e) {
            console.warn(`Invalid firstLinePatterns regex: ${pattern}`, e);
        }
    }

    if (regexes.length === 0) return text;

    for (let i = 0; i < lines.length; i++) {
        const trimmedLine = lines[i].trim();
        for (const rx of regexes) {
            if (rx.test(trimmedLine)) {
                return lines.slice(i).join('\n');
            }
        }
    }

    // No match — return unchanged
    return text;
}

/**
 * Extract certification text from raw OCR text (everything before the URL line)
 * @param {string} rawText - Raw OCR text
 * @param {number} urlLineIndex - Index of the URL line
 * @returns {string} - Certification text (lines before URL, trailing blanks removed)
 */
function extractCertText(rawText, urlLineIndex) {
    const rawLines = rawText.split('\n').map(l => l.trim());

    // Get certification text - everything before the URL line
    // The verify:/vfy: line is NOT included in what gets hashed (normalized text)
    const certLines = rawLines.slice(0, urlLineIndex);

    // Remove trailing blank lines
    while (certLines.length > 0 && certLines[certLines.length - 1].trim() === '') {
        certLines.pop();
    }

    return certLines.join('\n');
}

/**
 * Check if computed hash matches the claimed URL
 * @param {string} claimedUrl - The claimed verification URL
 * @param {string} computedHash - The computed SHA-256 hash
 * @returns {boolean} - True if hash is found in URL
 */
function hashMatchesUrl(claimedUrl, computedHash) {
    return claimedUrl.includes(computedHash);
}

/**
 * Extract domain from verification URL
 * @param {string} baseUrl - Base URL (verify:, vfy:, or https://)
 * @returns {string} Domain name
 */
function extractDomain(baseUrl) {
    const lowerBase = baseUrl.toLowerCase();
    let urlPart = baseUrl;

    if (lowerBase.startsWith('verify:')) {
        urlPart = baseUrl.substring(7);
    } else if (lowerBase.startsWith('vfy:')) {
        urlPart = baseUrl.substring(4);
    } else if (lowerBase.startsWith('https://')) {
        urlPart = baseUrl.substring(8);
    }

    // Extract domain (everything before first /)
    const slashIndex = urlPart.indexOf('/');
    return slashIndex !== -1 ? urlPart.substring(0, slashIndex) : urlPart;
}

/**
 * Build verification-meta.json URL from base URL
 * @param {string} baseUrl - Base URL (verify:, vfy:, or https://)
 * @returns {string} - Full URL to verification-meta.json
 */
function buildMetaUrl(baseUrl) {
    let httpsBase = baseUrl;
    const lowerBase = baseUrl.toLowerCase();

    if (lowerBase.startsWith('verify:')) {
        const withoutPrefix = baseUrl.substring(7);
        const protocol = (withoutPrefix.includes('localhost') || withoutPrefix.includes('127.0.0.1')) ? 'http' : 'https';
        httpsBase = `${protocol}://${withoutPrefix}`;
    } else if (lowerBase.startsWith('vfy:')) {
        const withoutPrefix = baseUrl.substring(4);
        const protocol = (withoutPrefix.includes('localhost') || withoutPrefix.includes('127.0.0.1')) ? 'http' : 'https';
        httpsBase = `${protocol}://${withoutPrefix}`;
    } else if (!lowerBase.startsWith('http')) {
        httpsBase = `https://${baseUrl}`;
    }

    // Strip trailing slash if present
    return `${httpsBase.replace(/\/$/, '')}/verification-meta.json`;
}

/**
 * Fetch verification-meta.json from the base URL
 * @param {string} baseUrl - Base URL (verify:, vfy:, or https://)
 * @returns {Promise<Object|null>} - Metadata object or null if not found
 */
async function fetchVerificationMeta(baseUrl) {
    try {
        const metaUrl = buildMetaUrl(baseUrl);
        const response = await fetch(metaUrl);

        if (response.status === 200) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.log('Could not fetch verification-meta.json:', error.message);
        return null;
    }
}

/**
 * Verify hash against issuer endpoint
 * @param {string} verificationUrl - Full verification URL
 * @param {Object} meta - Optional metadata for response interpretation
 * @returns {Promise<{success: boolean, status: string, domain: string}>}
 */
async function verifyHash(verificationUrl, meta) {
    const domain = new URL(verificationUrl).hostname;

    try {
        const response = await fetch(verificationUrl);

        if (!response.ok) {
            if (response.status === 404) {
                return { success: false, status: `${domain} does not verify this claim`, domain };
            }
            return { success: false, status: `HTTP ${response.status}`, domain };
        }

        const bodyText = (await response.text()).trim();

        // Try to parse as JSON
        try {
            const json = JSON.parse(bodyText);
            if (json.status) {
                const upperStatus = json.status.toUpperCase();
                if (upperStatus === 'VERIFIED') {
                    return { success: true, status: 'VERIFIED', domain, payload: json };
                }

                // Check custom responseTypes from meta
                if (meta?.responseTypes?.[upperStatus]) {
                    const typeInfo = meta.responseTypes[upperStatus];
                    if (typeInfo.class === 'affirming') {
                        return { success: true, status: upperStatus, domain, payload: json };
                    } else {
                        return { success: false, status: typeInfo.text || upperStatus, domain };
                    }
                }

                return { success: false, status: upperStatus, domain };
            }
        } catch {
            // Not JSON, check plain text against responseTypes
            if (meta?.responseTypes) {
                const upperBody = bodyText.toUpperCase();
                const typeInfo = meta.responseTypes[upperBody];
                if (typeInfo) {
                    if (typeInfo.class === 'affirming') {
                        return { success: true, status: upperBody, domain };
                    } else {
                        return { success: false, status: typeInfo.text || upperBody, domain };
                    }
                }
            }
        }

        // Default for non-OK body
        if (bodyText) {
            return { success: false, status: bodyText.substring(0, 50), domain };
        }

        return { success: false, status: 'Empty response', domain };

    } catch (error) {
        return { success: false, status: `Network error: ${error.message}`, domain };
    }
}

/**
 * Check authorization from verification-meta.json using merkle commitment.
 * The authorizer hashes the issuer's entire verification-meta.json (canonicalized),
 * not just the domain. This binds the authorization to the exact content of the
 * issuer's self-description (claimType, date bounds, everything).
 *
 * @param {Object} meta - The issuer's full verification-meta.json object
 * @param {string} metaUrl - The URL from which verification-meta.json was fetched (for re-fetch)
 * @param {string} [claimUrl] - The original claim verification URL (e.g., https://r.the-red-lion.co.uk/{hash})
 * @returns {Promise<{checked: boolean, confirmed: boolean, authorizer: string, description: string|null, authorityBasis: string|null, expired: boolean, successor: string|null, error: string|null, chain: Array}>}
 */
async function checkAuthorization(meta, metaUrl, claimUrl) {
    if (!meta || !meta.authorizedBy || typeof meta.authorizedBy !== 'string') {
        return { checked: false, confirmed: false, authorizer: null, description: null, expired: false, successor: null, error: null, chain: [] };
    }

    const authorizer = meta.authorizedBy.split('/')[0];

    // Check date bounds
    const now = new Date();
    if (meta.authorizedFrom) {
        const from = new Date(meta.authorizedFrom);
        if (now < from) {
            return { checked: true, confirmed: false, authorizer, description: null, expired: false, successor: null, error: 'Authorization period has not started yet', chain: [] };
        }
    }
    if (meta.authorizedTo) {
        const to = new Date(meta.authorizedTo);
        if (now > to) {
            return { checked: true, confirmed: false, authorizer, description: null, expired: true, successor: meta.successor || null, error: null, chain: [] };
        }
    }

    try {
        // Resolve hash function
        const hashFn = (typeof sha256 === 'function') ? sha256 :
            (typeof module !== 'undefined' && require) ?
                require('./normalize.js').sha256 : null;

        if (!hashFn) {
            return { checked: false, confirmed: false, authorizer, description: null, expired: false, successor: null, error: 'Hash function unavailable', chain: [] };
        }

        // Fetch raw verification-meta.json bytes for hashing
        let canonicalJson;
        try {
            const rawResponse = await fetch(metaUrl);
            if (!rawResponse.ok) {
                return { checked: false, confirmed: false, authorizer, description: null, expired: false, successor: null, error: `Could not re-fetch meta: HTTP ${rawResponse.status}`, chain: [] };
            }
            const rawBytes = await rawResponse.text();
            // Canonicalize: parse then re-stringify to eliminate formatting differences
            canonicalJson = JSON.stringify(JSON.parse(rawBytes));
        } catch (e) {
            return { checked: false, confirmed: false, authorizer, description: null, expired: false, successor: null, error: `Canonicalization failed: ${e.message}`, chain: [] };
        }

        // Hash the canonical JSON
        const metaHash = await hashFn(canonicalJson);

        // Build authorization URL: verify:{authorizedBy}/{hash}
        const verifyUrl = meta.authorizedBy.startsWith('verify:') || meta.authorizedBy.startsWith('vfy:')
            ? meta.authorizedBy : `verify:${meta.authorizedBy}`;
        const authorizationUrl = buildVerificationUrl(verifyUrl, metaHash);

        // Pass chain of URLs used so far so the endorser can walk backward for safety
        const priorUrls = claimUrl ? [claimUrl] : [];
        const fetchOpts = priorUrls.length > 0
            ? { headers: { 'X-Verification-URLs': priorUrls.join(', ') } } : {};
        const response = await fetch(authorizationUrl, fetchOpts);

        let confirmed = false;
        if (response.ok) {
            const body = (await response.text()).trim();
            confirmed = body === '' ||
                (body.startsWith('{') && JSON.parse(body).status === 'verified');
        } else if (response.status !== 404) {
            return { checked: true, confirmed: false, authorizer, description: null, expired: false, successor: null, error: `HTTP ${response.status}`, chain: [] };
        }

        // Walk the authorization chain
        // Walk the authorization chain, threading accumulated URLs for endorser safety
        const chainSoFar = claimUrl ? [claimUrl, authorizationUrl] : [authorizationUrl];
        const chain = await walkAuthorizationChain(meta.authorizedBy, confirmed, hashFn, 0, chainSoFar);

        // The issuer's authority basis from their verification-meta.json.
        // A short statement of what kind of authority backs this verification.
        // Since the authorizer hashes the entire meta, they have implicitly
        // endorsed this statement. The authorizer can require specific
        // wording as a condition of endorsement.
        const authorityBasis = meta.authorityBasis || null;

        return {
            checked: true,
            confirmed,
            authorizer,
            description: chain.length > 0 ? chain[0].description : null,
            authorityBasis,
            expired: false,
            successor: null,
            error: null,
            chain
        };
    } catch (error) {
        return { checked: false, confirmed: false, authorizer, description: null, expired: false, successor: null, error: error.message, chain: [] };
    }
}

/**
 * Walk the authorization chain by fetching each authorizer's verification-meta.json.
 * Returns an array of chain entries with authorizer domain, description, and confirmation status.
 * Max depth: 3 levels.
 *
 * @param {string} authorizedByUrl - The authorizer's base URL (from authorizedBy field in meta)
 * @param {boolean} primaryConfirmed - Whether the primary authorization was confirmed
 * @param {Function} hashFn - SHA-256 hash function
 * @param {number} [depth=0] - Current recursion depth
 * @param {string[]} [chainUrls=[]] - Accumulated verification URLs from levels below, sent as X-Verification-URLs
 * @returns {Promise<Array<{authorizer: string, description: string|null, confirmed: boolean}>>}
 */
async function walkAuthorizationChain(authorizedByUrl, primaryConfirmed, hashFn, depth, chainUrls) {
    if (depth === undefined) depth = 0;
    const MAX_DEPTH = 3;
    if (depth >= MAX_DEPTH) return [];

    const authorizer = authorizedByUrl.split('/')[0];

    try {
        // Convert authorizedBy to https URL for fetching meta
        let httpsBase = authorizedByUrl;
        if (!httpsBase.startsWith('https://')) {
            httpsBase = `https://${authorizedByUrl}`;
        }
        const authorizerMetaUrl = `${httpsBase}/verification-meta.json`;

        const urls = chainUrls || [];
        const fetchOpts = urls.length > 0
            ? { headers: { 'X-Verification-URLs': urls.join(', ') } } : {};
        const response = await fetch(authorizerMetaUrl, fetchOpts);
        if (!response.ok) {
            return [{ authorizer, description: null, confirmed: primaryConfirmed }];
        }

        const authorizerMeta = await response.json();
        const description = authorizerMeta.description || authorizerMeta.issuer || null;

        const entry = { authorizer, description, confirmed: primaryConfirmed };

        // If authorizer itself has authorizedBy, recurse with accumulated URLs
        if (authorizerMeta.authorizedBy) {
            const subChain = await walkAuthorizationChain(authorizerMeta.authorizedBy, true, hashFn, depth + 1, [...urls, authorizerMetaUrl]);
            return [entry, ...subChain];
        }

        return [entry];
    } catch {
        return [{ authorizer, description: null, confirmed: primaryConfirmed }];
    }
}

// Export for Node.js testing (doesn't affect browser usage)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        rotateCanvas,
        extractVerificationUrl,
        trimToFirstLinePattern,
        extractCertText,
        hashMatchesUrl,
        buildVerificationUrl,
        buildMetaUrl,
        extractDomain,
        fetchVerificationMeta,
        verifyHash,
        checkAuthorization,
        walkAuthorizationChain
    };
}
```

---

## 3. `domain-authority.js` — registrable-domain extraction via the Public Suffix List

When a verification succeeds, the UI must show the user **who** verified it — and it must show the
real registrable domain, not a misleading subdomain that an attacker could prepend. This file uses
the [Public Suffix List](https://publicsuffix.org/) (`psl`) to collapse a hostname down to its
registrable domain.

- **`extractDomainAuthority(url)`** — parses the URL (throwing loudly on an invalid one), returns IP
  addresses as-is, and otherwise asks `psl` for the registrable domain. It correctly handles
  multi-level TLDs (`degrees.ed.ac.uk` → `ed.ac.uk`, `foobar.com.br` stays `foobar.com.br`) and has
  special handling for GitHub Pages (`*.github.io`), where it returns just `github.io` as the
  displayed authority rather than the project subdomain. If `psl` is unavailable it falls back to
  the raw hostname.

This is what lets the UI bold the part of the domain that actually represents trust.

```javascript
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

// Import psl library - loaded from various sources depending on environment
// In extensions: globalThis.psl (loaded via shared/psl.js)
// In browser: window.psl (loaded from CDN via <script> tag)
// In Node.js tests: available via npm install
const psl = (typeof globalThis !== 'undefined' && globalThis.psl)
    || (typeof window !== 'undefined' && window.psl)
    || (typeof require !== 'undefined' ? require('psl') : null);

/**
 * Extract the registrable domain (domain + public suffix) from a URL.
 * This strips off subdomains to show the core domain authority.
 * Examples:
 * - degrees.ed.ac.uk → ed.ac.uk (strips "degrees" subdomain)
 * - edinburgh.ac.uk--___dir.github.io → github.io (strips GitHub Pages subdomain)
 * - foobar.com.br → foobar.com.br (preserves country-code TLD)
 * - api.example.com → example.com (strips "api" subdomain)
 *
 * Uses the Public Suffix List to correctly identify registrable domains
 * across different TLD patterns (.com, .co.uk, .ac.uk, .com.br, etc.)
 *
 * @param {string} url - The URL to extract domain from
 * @returns {string} The registrable domain that should be displayed to the user
 * @throws {Error} If URL is invalid
 */
function extractDomainAuthority(url) {
    const urlObj = new URL(url); // Throws on invalid URL - let it fail loudly
    const hostname = urlObj.hostname;

    // Handle IP addresses - return as-is
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
        return hostname;
    }

    // Fall back to hostname if psl is not available
    if (!psl) {
        return hostname;
    }

    const parsed = psl.parse(hostname);

    // psl.parse returns an object with:
    // - domain: the registrable domain (e.g., "ed.ac.uk", "example.com")
    // - subdomain: any subdomain parts (e.g., "degrees", "www")
    // - listed: whether the TLD is in the public suffix list
    //
    // Special handling for GitHub Pages and similar services:
    // *.github.io is in the public suffix list, so myproject.github.io
    // is treated as a "registrable domain" by psl.
    // But we want to show just "github.io" as the authority.
    if (parsed.domain && parsed.domain.endsWith('.github.io')) {
        return 'github.io';
    }

    // For other cases, return the registrable domain
    if (parsed.domain) {
        return parsed.domain;
    }

    // Fallback for localhost and other special cases
    return hostname;
}

// Export for both Node.js (CommonJS) and browser (bundled)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { extractDomainAuthority };
}
```

---

## 4. `doc-specific-normalization.js` — per-document normalization rules

This file is the standalone implementation of the issuer-defined normalization that
`normalize.js` also inlines (as `applyDocSpecificNorm`). It is driven entirely by the issuer's
`verification-meta.json` and supports two mechanisms:

1. **`charNormalization`** — a compact, human-writable notation like `"éèêë→e àáâä→a ñ→n ß→B"`,
   parsed by `parseCharNormalization` into a `Map` and applied character-by-character by
   `applyCharNormalization`. This lets an issuer declare, for example, that accented characters
   collapse to their base form so OCR or keyboard-entry variations still hash identically.
2. **`ocrNormalizationRules`** — an array of `{pattern, replacement}` regex rules
   (`applyOcrNormalizationRules`) for structural cleanup, e.g. `{pattern: "CHF\\s+(\\d)",
   replacement: "CHF$1"}` to remove a stray space between a currency code and an amount.

`applyDocumentSpecificNormalization` runs character normalization first, then the OCR regex rules.
`fetchMetadata` retrieves `verification-meta.json` for a base URL.

```javascript
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

/**
 * Document-specific text normalization rules from verification-meta.json
 *
 * Supports two types of normalization:
 * 1. charNormalization: Compact notation for single-character mappings
 *    Format: "éèêë→e àáâä→a ñ→n ß→B"
 *
 * 2. ocrNormalizationRules: Regex-based structural cleanup
 *    Format: [{pattern: "CHF\\s+(\\d)", replacement: "CHF$1"}]
 */

/**
 * Parse compact character normalization notation
 *
 * @param {string} notation - e.g., "éèêë→e àáâä→a ñ→n ß→B"
 * @returns {Map<string, string>} - Map of source char to target char
 *
 * @example
 * parseCharNormalization("éèêë→e ñ→n")
 * // Returns: Map { 'é' => 'e', 'è' => 'e', 'ê' => 'e', 'ë' => 'e', 'ñ' => 'n' }
 */
function parseCharNormalization(notation) {
    const charMap = new Map();

    if (!notation || typeof notation !== 'string') {
        return charMap;
    }

    // Split by whitespace to get groups like "éèêë→e"
    const groups = notation.trim().split(/\s+/);

    for (const group of groups) {
        // Split by arrow to get source chars and target char
        const parts = group.split('→');
        if (parts.length !== 2) {
            console.warn(`Invalid charNormalization group: ${group}`);
            continue;
        }

        const sourceChars = parts[0];
        const targetChar = parts[1];

        // Validate target is single character
        if (targetChar.length !== 1) {
            console.warn(`Target must be single character in: ${group}`);
            continue;
        }

        // Map each source character to the target
        for (const sourceChar of sourceChars) {
            charMap.set(sourceChar, targetChar);
        }
    }

    return charMap;
}

/**
 * Apply character normalization map to text
 *
 * @param {string} text - Input text
 * @param {Map<string, string>} charMap - Character mapping
 * @returns {string} - Normalized text
 */
function applyCharNormalization(text, charMap) {
    if (!charMap || charMap.size === 0) {
        return text;
    }

    let result = '';
    for (const char of text) {
        result += charMap.get(char) || char;
    }
    return result;
}

/**
 * Apply OCR normalization rules (regex-based)
 *
 * @param {string} text - Input text
 * @param {Array<{pattern: string, replacement: string}>} rules - Normalization rules
 * @returns {string} - Normalized text
 */
function applyOcrNormalizationRules(text, rules) {
    if (!rules || !Array.isArray(rules) || rules.length === 0) {
        return text;
    }

    let result = text;

    for (const rule of rules) {
        if (!rule.pattern || !rule.replacement) {
            console.warn('Invalid OCR normalization rule:', rule);
            continue;
        }

        try {
            const regex = new RegExp(rule.pattern, 'g');
            result = result.replace(regex, rule.replacement);
        } catch (error) {
            console.error(`Invalid regex pattern: ${rule.pattern}`, error);
        }
    }

    return result;
}

/**
 * Apply all document-specific normalization rules
 *
 * @param {string} text - Input text
 * @param {Object} metadata - Parsed verification-meta.json content
 * @returns {string} - Normalized text
 */
function applyDocumentSpecificNormalization(text, metadata) {
    if (!metadata) {
        return text;
    }

    let result = text;

    // 1. Apply character normalization first
    if (metadata.charNormalization) {
        const charMap = parseCharNormalization(metadata.charNormalization);
        result = applyCharNormalization(result, charMap);
    }

    // 2. Apply OCR normalization rules second
    if (metadata.ocrNormalizationRules) {
        result = applyOcrNormalizationRules(result, metadata.ocrNormalizationRules);
    }

    return result;
}

/**
 * Fetch verification-meta.json from a base URL
 *
 * @param {string} baseUrl - Base URL (e.g., "https://example.com/receipts/hotel")
 * @returns {Promise<Object|null>} - Parsed metadata or null if not found
 */
async function fetchMetadata(baseUrl) {
    try {
        // Construct metadata URL by appending /verification-meta.json
        const metadataUrl = baseUrl.endsWith('/')
            ? `${baseUrl}verification-meta.json`
            : `${baseUrl}/verification-meta.json`;

        const response = await fetch(metadataUrl);

        if (!response.ok) {
            // Not found is expected for many documents
            if (response.status === 404) {
                return null;
            }
            console.warn(`Failed to fetch metadata from ${metadataUrl}: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.warn(`Error fetching metadata from ${baseUrl}:`, error);
        return null;
    }
}

// Export functions for Node.js (tests) and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseCharNormalization,
        applyCharNormalization,
        applyOcrNormalizationRules,
        applyDocumentSpecificNormalization,
        fetchMetadata
    };
}
```

---

## 5. `ocr-cleanup.js` — OCR artifact removal (camera path only)

This file is only used on the **camera/OCR** path, not the text-selection (Clip) path, because
pasted/selected text doesn't carry OCR noise. It runs **before** `normalizeText()` for OCR'd
content.

- **`cleanOcrArtifacts(text)`** — line by line: strips leading and trailing **border artifacts**
  (characters OCR engines hallucinate from registration marks and frame edges:
  `| ~ \` ^ * # + = _ \ / [ ] { }`); removes a trailing `⌝` registration mark (U+231D) that current
  Apple/Google OCR engines still emit; and removes a trailing single **lowercase** letter (a common
  OCR speck), while deliberately **preserving** trailing uppercase letters like "Appendix A" or
  "Grade A" which are usually meaningful.

```javascript
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

/**
 * OCR-specific artifact cleanup functions
 * Only needed for camera/OCR verification paths, not for text selection
 */

/**
 * Clean OCR artifacts from text (border characters, trailing letters)
 * Call this BEFORE normalizeText() for OCR'd content
 * @param {string} text - Raw OCR text
 * @returns {string} Text with OCR artifacts removed
 */
function cleanOcrArtifacts(text) {
    const lines = text.split('\n');

    const cleanedLines = lines.map(line => {
        // Remove leading border artifacts (OCR from registration marks/borders)
        // Common characters: | ~ ` ^ * # + = _ \ / [ ] { }
        // Examples: "| text", "~ text", "|| text", "| | text"
        line = line.replace(/^[|~`^*#+=/\\_\[\]{}]+\s*/, '');

        // Remove trailing border artifacts (OCR from registration marks/borders)
        // Examples: "text |", "text ~", "text ||", "text | |"
        line = line.replace(/\s*[|~`^*#+=/\\_\[\]{}]+$/, '');

        // Remove trailing ⌝ registration mark (U+231D) from first line
        // Temporary: until Apple/Google OCR engines consume this mark natively
        // and omit it from text output, we strip it here.
        line = line.replace(/\s*⌝$/, '');

        // Remove trailing single lowercase letter (OCR artifact)
        // Examples: "John Doe a", "Company Name b" -> "John Doe", "Company Name"
        // Preserves uppercase like "Appendix A", "Grade A" which are likely meaningful
        line = line.replace(/\s+[a-z]$/, '');

        return line;
    });

    return cleanedLines.join('\n');
}

// Export for Node.js testing (doesn't affect browser usage)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cleanOcrArtifacts };
}
```

---

## 6. `text-selection-verify.js` — the Clip-mode browser flow (described, not inlined)

This ~30 KB file is the in-page experience that simulates a future browser-native "Verify" action.
It is loaded after `normalize.js`, `app-logic.js`, and `domain-authority.js`, and it wires them
together with a UI. The source is not reproduced here (it is mostly DOM construction and inline
styling); what matters is the flow.

**Selection detection.** On `mouseup`, `keyup` (shift/ctrl/meta selections), and `contextmenu`
(right-click) it reads `window.getSelection()`. If the selected text is longer than 10 characters
and contains `verify:` or `vfy:` (the `hasVerificationUrl` check), it pops up a floating
"🔍 Verify?" button positioned near the selection (kept inside the viewport). Right-clicking a
selection that contains a verification URL is the integration point that stands in for a real
browser context-menu item.

**Verification pipeline (`performVerification`).** Clicking the button clears the selection and
runs the same canonical steps as every other platform:

1. `extractVerificationUrl(text)` — find the `verify:`/`vfy:` base URL.
2. `extractCertText(text, urlLineIndex)` — isolate the certified text above the URL line.
3. `fetchVerificationMeta(baseUrl)` — optionally load the issuer's `verification-meta.json`.
4. `normalizeText(certText, metadata)` — **the canonical normalization from `normalize.js`**.
5. `sha256(normalizedText)` — compute the hash.
6. `buildVerificationUrl(baseUrl, hash, metadata)` — assemble the real HTTPS URL (honoring
   `appendToHashResourceName` / `hashesHostedAt`).
7. `extractDomainAuthority(...)` + `psl` — derive the registrable domain and flag any TLD not in the
   Public Suffix List.
8. `fetch(verificationUrl, {mode: 'cors'})` — the **real HTTP GET** against the issuer.
9. If the issuer's meta declares `authorizedBy`, run `checkAuthorization` to validate the
   authority chain.

**Result display (`showResult`).** A fixed banner drops in from the top of the page (deliberately
styled as browser chrome, outside the page content, so a page can't forge it). It shows a status
icon and headline driven by the response: a green **VERIFIED** (with a "screencaps are not proof"
disclaimer and an 8-second auto-dismiss), a red **REVOKED / denied** with the issuer's message, a
red **NOT FOUND** for a 404 ("does not verify this claim"), or an orange **CANNOT VERIFY** when
`fetch` throws an opaque `TypeError` (which a browser cannot distinguish between DNS failure,
unreachable host, or CORS block — the message leads with the most likely cause: the issuer hasn't
set up Live Verify). The banner also renders the authorization chain (self-verified, authorized,
expired, or "claims authorization … missing"), a caution line when the domain TLD isn't PSL-listed,
and an expandable details panel showing the exact normalized text and SHA-256 hash. A standing
note labels the whole thing a simulation of a future first-class browser feature.

---

## 7. Canonical source, synced everywhere

The defining principle of this codebase is that **the normalization and hashing logic exists in
exactly one place** and is propagated unchanged to every consumer:

- `normalize.js` is the canonical file. Editing normalization logic anywhere else is a bug.
- After changing it, `npm run sync-shared` copies the canonical `public/` JS into the **browser
  extension**, and it is also copied into the **Android** app assets
  (`apps/android/app/src/main/assets/`).
- The **iOS and Android** native apps **bundle `normalize.js` and execute it verbatim** through an
  embedded JavaScript engine, rather than re-implementing the rules in Swift or Kotlin. This is the
  mechanism that guarantees a photo verified on an iPhone, a paste verified in a Chrome extension,
  and a Node.js test all compute the **same SHA-256** and therefore agree on whether a claim
  verifies.

If any platform drifted from this canonical source, its hashes would diverge and verification would
fail silently — so the single-source discipline is not a style preference, it is what makes the
whole scheme reproducible and trustworthy.
