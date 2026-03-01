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
 * Verification logic for Mailspring plugin
 * Uses shared modules from public/ for normalization and verification logic
 */

const path = require('path');
const { normalizeText, sha256 } = require(path.resolve(__dirname, '../../../public/normalize.js'));
const {
    extractVerificationUrl,
    extractCertText,
    buildVerificationUrl,
    extractDomain,
    fetchVerificationMeta,
    verifyHash,
    checkEndorsement
} = require(path.resolve(__dirname, '../../../public/app-logic.js'));

/**
 * Main verification function - verifies selected text
 */
async function verifyText(selectedText) {
    const startTime = Date.now();

    const { url: baseUrl, urlLineIndex } = extractVerificationUrl(selectedText);

    if (!baseUrl) {
        return {
            success: false,
            error: 'No verify: or vfy: URL found in selection'
        };
    }

    const domain = extractDomain(baseUrl);
    const certText = extractCertText(selectedText, urlLineIndex);

    if (!certText.trim()) {
        return {
            success: false,
            error: 'No certification text found before verify URL',
            domain
        };
    }

    const meta = await fetchVerificationMeta(baseUrl);
    const normalizedText = normalizeText(certText, meta);
    const hash = sha256(normalizedText);
    const verificationUrl = buildVerificationUrl(baseUrl, hash, meta);
    const verifyResult = await verifyHash(verificationUrl, meta);

    // Check endorsement if metadata has endorsedBy
    let endorsement = null;
    if (meta && meta.endorsedBy) {
        // Compute metaUrl from baseUrl
        let metaHttpsBase = baseUrl;
        const lowerBase2 = baseUrl.toLowerCase();
        if (lowerBase2.startsWith('verify:')) {
            metaHttpsBase = `https://${baseUrl.substring(7)}`;
        } else if (lowerBase2.startsWith('vfy:')) {
            metaHttpsBase = `https://${baseUrl.substring(4)}`;
        }
        const metaUrl = `${metaHttpsBase}/verification-meta.json`;
        try {
            endorsement = await checkEndorsement(meta, metaUrl);
        } catch {
            endorsement = { checked: false, confirmed: false, endorser: meta.endorsedBy.split('/')[0], description: null, expired: false, successor: null, error: 'Check failed', chain: [] };
        }
    }

    const elapsed = Date.now() - startTime;

    return {
        success: verifyResult.success,
        status: verifyResult.status,
        domain: verifyResult.domain,
        endorsement,
        hash,
        verificationUrl,
        certText,
        normalizedText,
        elapsed,
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    verifyText
};
