/*
    Copyright (C) 2025-2026, Paul Hammant

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
 * Build the plain-text message for an OS notification from a verification result.
 *
 * @param {Object} result - Verification result object
 * @returns {{ title: string, message: string }}
 */
function buildNotificationMessage(result) {
    const title = result.success ? 'Verified' : 'Not Verified';

    let message;
    if (result.success) {
        message = `Verified by ${result.domain}`;
    } else if (result.error) {
        message = result.error;
    } else {
        message = `${result.status} (${result.domain})`;
    }

    // Build authorization detail (plain text for OS notification)
    let authDetail = '';
    if (result.success && !result.authorization) {
        authDetail = 'Self-verified (no authority chain)';
    } else if (result.authorization && result.authorization.authorizer) {
        const a = result.authorization;
        if (a.expired) {
            authDetail = `Authorization by ${a.authorizer} — expired`;
            if (a.successor) authDetail += `. Successor: ${a.successor}`;
        } else if (a.confirmed) {
            authDetail = `Authorized by ${a.authorizer}`;
            if (a.description) authDetail += ` (${a.description})`;
            if (a.chain && a.chain.length > 1) {
                for (let i = 1; i < a.chain.length; i++) {
                    const c = a.chain[i];
                    authDetail += ` ← ${c.authorizer}`;
                    if (c.description) authDetail += ` (${c.description})`;
                }
            }
        } else if (a.checked) {
            authDetail = `Authorization by ${a.authorizer} — not confirmed`;
        } else {
            authDetail = `Claims authorization by ${a.authorizer} — missing`;
        }
    }

    if (authDetail) {
        message += `\n${authDetail}`;
    }

    return { title, message };
}

// ES module export (for browser extension import)
export { buildNotificationMessage };

// CommonJS export (for Node.js / Jest tests)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { buildNotificationMessage };
}
