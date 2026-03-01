// AUTO-GENERATED — do not edit. Source: public/app-logic.js
// Run "npm run sync-shared" to regenerate from canonical source.

/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/**
 * Pure functions for app logic that can be tested with Jest
 */

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
    // Field name is "appendToHashFileName" in verification-meta.json
    const suffix = (meta && meta.appendToHashFileName) ? meta.appendToHashFileName : '';

    // If it starts with verify:, convert to https://
    if (lowerBase.startsWith('verify:')) {
        const withoutPrefix = baseUrl.substring(7); // Remove "verify:"
        return `https://${withoutPrefix}/${hash}${suffix}`;
    }

    // If it starts with vfy:, convert to https://
    if (lowerBase.startsWith('vfy:')) {
        const withoutPrefix = baseUrl.substring(4); // Remove "vfy:"
        return `https://${withoutPrefix}/${hash}${suffix}`;
    }

    // This should not be reached if extractVerificationUrl is working correctly
    throw new Error('Invalid base URL format. Must start with verify: or vfy:');
}

/**
 * Extract certification text from raw OCR text (everything before the URL line)
 * Also strips [ and ] bracket markers used for visual cues
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

    let certText = certLines.join('\n');

    // Strip [ and ] bracket markers (visual cues for users)
    // These appear at start of verifiable text and end (before verify: line)
    certText = certText.replace(/^\s*\[\s*/, '');  // Leading [
    certText = certText.replace(/\s*\]\s*$/, '');  // Trailing ]

    return certText;
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
 * Fetch verification-meta.json from the base URL
 * @param {string} baseUrl - Base URL (verify:, vfy:, or https://)
 * @returns {Promise<Object|null>} - Metadata object or null if not found
 */
async function fetchVerificationMeta(baseUrl) {
    try {
        // Convert verify: or vfy: to https:// if needed
        let httpsBase = baseUrl;
        const lowerBase = baseUrl.toLowerCase();

        if (lowerBase.startsWith('verify:')) {
            httpsBase = `https://${baseUrl.substring(7)}`;
        } else if (lowerBase.startsWith('vfy:')) {
            httpsBase = `https://${baseUrl.substring(4)}`;
        }

        // Fetch verification-meta.json
        const metaUrl = `${httpsBase}/verification-meta.json`;
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
                return { success: false, status: 'Hash not found', domain };
            }
            return { success: false, status: `HTTP ${response.status}`, domain };
        }

        const bodyText = (await response.text()).trim();

        // Check for simple "OK" response
        if (bodyText === 'OK') {
            return { success: true, status: 'VERIFIED', domain };
        }

        // Try to parse as JSON
        try {
            const json = JSON.parse(bodyText);
            if (json.status) {
                const upperStatus = json.status.toUpperCase();
                if (upperStatus === 'OK' || upperStatus === 'VERIFIED') {
                    return { success: true, status: 'VERIFIED', domain };
                }

                // Check custom responseTypes from meta
                if (meta?.responseTypes?.[upperStatus]) {
                    const typeInfo = meta.responseTypes[upperStatus];
                    if (typeInfo.class === 'affirming') {
                        return { success: true, status: upperStatus, domain };
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
 * Check endorsement from verification-meta.json using merkle commitment.
 * The endorser hashes the issuer's entire verification-meta.json (canonicalized),
 * not just the domain. This binds the endorsement to the exact content of the
 * issuer's self-description (claimType, date bounds, everything).
 *
 * @param {Object} meta - The issuer's full verification-meta.json object
 * @param {string} metaUrl - The URL from which verification-meta.json was fetched (for re-fetch)
 * @returns {Promise<{checked: boolean, confirmed: boolean, endorser: string, description: string|null, expired: boolean, successor: string|null, error: string|null, chain: Array}>}
 */
async function checkEndorsement(meta, metaUrl) {
    if (!meta || !meta.endorsedBy || typeof meta.endorsedBy !== 'string') {
        return { checked: false, confirmed: false, endorser: null, description: null, expired: false, successor: null, error: null, chain: [] };
    }

    const endorser = meta.endorsedBy.split('/')[0];

    // Check date bounds
    const now = new Date();
    if (meta.endorsedFrom) {
        const from = new Date(meta.endorsedFrom);
        if (now < from) {
            return { checked: true, confirmed: false, endorser, description: null, expired: false, successor: null, error: 'Endorsement period has not started yet', chain: [] };
        }
    }
    if (meta.endorsedTo) {
        const to = new Date(meta.endorsedTo);
        if (now > to) {
            return { checked: true, confirmed: false, endorser, description: null, expired: true, successor: meta.successor || null, error: null, chain: [] };
        }
    }

    try {
        // Resolve hash function
        const hashFn = (typeof sha256 === 'function') ? sha256 :
            (typeof module !== 'undefined' && require) ?
                require('./normalize.js').sha256 : null;

        if (!hashFn) {
            return { checked: false, confirmed: false, endorser, description: null, expired: false, successor: null, error: 'Hash function unavailable', chain: [] };
        }

        // Fetch raw verification-meta.json bytes for hashing
        let canonicalJson;
        try {
            const rawResponse = await fetch(metaUrl);
            if (!rawResponse.ok) {
                return { checked: false, confirmed: false, endorser, description: null, expired: false, successor: null, error: `Could not re-fetch meta: HTTP ${rawResponse.status}`, chain: [] };
            }
            const rawBytes = await rawResponse.text();
            // Canonicalize: parse then re-stringify to eliminate formatting differences
            canonicalJson = JSON.stringify(JSON.parse(rawBytes));
        } catch (e) {
            return { checked: false, confirmed: false, endorser, description: null, expired: false, successor: null, error: `Canonicalization failed: ${e.message}`, chain: [] };
        }

        // Hash the canonical JSON
        const metaHash = await hashFn(canonicalJson);

        // Build endorsement URL: verify:{endorsedBy}/{hash}
        const verifyUrl = meta.endorsedBy.startsWith('verify:') || meta.endorsedBy.startsWith('vfy:')
            ? meta.endorsedBy : `verify:${meta.endorsedBy}`;
        const endorsementUrl = buildVerificationUrl(verifyUrl, metaHash);

        const response = await fetch(endorsementUrl);

        let confirmed = false;
        if (response.ok) {
            const body = (await response.text()).trim();
            confirmed = body === 'OK' || body === '' ||
                (body.startsWith('{') && JSON.parse(body).status === 'OK');
        } else if (response.status !== 404) {
            return { checked: true, confirmed: false, endorser, description: null, expired: false, successor: null, error: `HTTP ${response.status}`, chain: [] };
        }

        // Walk the endorsement chain
        const chain = await walkEndorsementChain(meta.endorsedBy, confirmed, hashFn);

        return {
            checked: true,
            confirmed,
            endorser,
            description: chain.length > 0 ? chain[0].description : null,
            expired: false,
            successor: null,
            error: null,
            chain
        };
    } catch (error) {
        return { checked: false, confirmed: false, endorser, description: null, expired: false, successor: null, error: error.message, chain: [] };
    }
}

/**
 * Walk the endorsement chain by fetching each endorser's verification-meta.json.
 * Returns an array of chain entries with endorser domain, description, and confirmation status.
 * Max depth: 3 levels.
 *
 * @param {string} endorsedByUrl - The endorser's base URL
 * @param {boolean} primaryConfirmed - Whether the primary endorsement was confirmed
 * @param {Function} hashFn - SHA-256 hash function
 * @param {number} [depth=0] - Current recursion depth
 * @returns {Promise<Array<{endorser: string, description: string|null, confirmed: boolean}>>}
 */
async function walkEndorsementChain(endorsedByUrl, primaryConfirmed, hashFn, depth) {
    if (depth === undefined) depth = 0;
    const MAX_DEPTH = 3;
    if (depth >= MAX_DEPTH) return [];

    const endorser = endorsedByUrl.split('/')[0];

    try {
        // Convert endorsedBy to https URL for fetching meta
        let httpsBase = endorsedByUrl;
        if (!httpsBase.startsWith('https://')) {
            httpsBase = `https://${endorsedByUrl}`;
        }
        const endorserMetaUrl = `${httpsBase}/verification-meta.json`;

        const response = await fetch(endorserMetaUrl);
        if (!response.ok) {
            return [{ endorser, description: null, confirmed: primaryConfirmed }];
        }

        const endorserMeta = await response.json();
        const description = endorserMeta.description || endorserMeta.issuer || null;

        const entry = { endorser, description, confirmed: primaryConfirmed };

        // If endorser itself has endorsedBy, recurse
        if (endorserMeta.endorsedBy) {
            const subChain = await walkEndorsementChain(endorserMeta.endorsedBy, true, hashFn, depth + 1);
            return [entry, ...subChain];
        }

        return [entry];
    } catch {
        return [{ endorser, description: null, confirmed: primaryConfirmed }];
    }
}

