// AUTO-GENERATED — do not edit. Source: public/domain-authority.js
// Run "npm run sync-shared" to regenerate from canonical source.

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


// ES module exports (for browser extension)
export { extractDomainAuthority };

// CommonJS exports (for Node.js testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { extractDomainAuthority };
}
