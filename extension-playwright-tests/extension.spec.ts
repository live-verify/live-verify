/*
    Copyright (C) 2026, Paul Hammant

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

// The extension AS AN EXTENSION: these tests load the real unpacked
// apps/browser-extension/ into Chromium (the same artifact zipped for the
// Chrome Web Store) and drive it end-to-end against a local issuer server.
// The Jest suites cover the shared logic; this covers what they cannot —
// the manifest parsing, MV3 service-worker registration, __MSG_ locale
// resolution, and the background pipeline wired together for real,
// including issuer meta (charNormalization, lineBreaks) reaching
// normalization. That wiring class of bug shipped on Android for months.

import { test as base, expect, chromium, type BrowserContext } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import { createHash } from 'crypto';

const EXTENSION_DIR = path.resolve(__dirname, '..', 'apps', 'browser-extension');

// Same modules the service worker imports — the expected hash is computed by
// construction, not transcribed. (normalize.js's own sha256 is not used here:
// under Playwright's transpile it resolves as ESM, where its environment
// sniffing picks the async browser path; node:crypto is the same algorithm.)
const { normalizeText } = require('../apps/browser-extension/shared/normalize.js');
const { extractVerificationUrl, extractCertText } = require('../apps/browser-extension/shared/verify.js');
const sha256 = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');

// ---------------------------------------------------------------------------
// Local issuer server: /c/ is a faithful-mode path, /flow/ declares
// lineBreaks: "flow". Hashes are registered by the tests before use.
// ---------------------------------------------------------------------------

const FLOW_META = { schemaVersion: 1, issuer: 'PW Test Issuer', lineBreaks: 'flow' };
const PLAIN_META = { schemaVersion: 1, issuer: 'PW Test Issuer' };

let server: http.Server;
let port: number;
const servedHashes = new Set<string>();
const requestedPaths: string[] = [];

function claimFor(basePath: string, bodyLines: string): string {
    return `${bodyLines}\nverify:localhost:${port}/${basePath}`;
}

// Mirror background.js verifyText(): URL line out, cert text above it, meta-aware normalize.
function expectedHash(claim: string, meta: object | null): string {
    const { url, urlLineIndex } = extractVerificationUrl(claim);
    expect(url).toBeTruthy();
    const certText = extractCertText(claim, urlLineIndex);
    return sha256(normalizeText(certText, meta));
}

base.beforeAll(async () => {
    server = http.createServer((req, res) => {
        const url = (req.url || '').split('?')[0];
        requestedPaths.push(url);
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (url === '/c/verification-meta.json') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(PLAIN_META));
        } else if (url === '/flow/verification-meta.json') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(FLOW_META));
        } else {
            const hash = url.split('/').pop() || '';
            if (servedHashes.has(hash)) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: 'verified' }));
            } else {
                res.statusCode = 404;
                res.end('Not found');
            }
        }
    });
    await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve));
    port = (server.address() as any).port;
});

base.afterAll(async () => {
    await new Promise<void>(resolve => server.close(() => resolve()));
});

// ---------------------------------------------------------------------------
// Fixture: persistent context with the unpacked extension loaded.
// ---------------------------------------------------------------------------

const test = base.extend<{ context: BrowserContext; extensionId: string }>({
    // eslint-disable-next-line no-empty-pattern
    context: async ({}, use) => {
        const context = await chromium.launchPersistentContext('', {
            channel: 'chromium',
            args: [
                `--disable-extensions-except=${EXTENSION_DIR}`,
                `--load-extension=${EXTENSION_DIR}`,
            ],
        });
        await use(context);
        await context.close();
    },
    extensionId: async ({ context }, use) => {
        let worker = context.serviceWorkers()[0];
        if (!worker) worker = await context.waitForEvent('serviceworker');
        await use(new URL(worker.url()).host);
    },
});

// ---------------------------------------------------------------------------
// Tier 1: it loads, the manifest parses, locales resolve.
// ---------------------------------------------------------------------------

test('MV3 service worker registers and manifest __MSG_ keys resolve', async ({ context, extensionId }) => {
    // The extensionId fixture already blocked on the service worker
    // registering — reaching here with a well-formed id proves MV3 startup.
    expect(extensionId).toMatch(/^[a-p]{32}$/);
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);
    const manifest = await page.evaluate(() => (globalThis as any).chrome.runtime.getManifest());
    await page.close();
    expect(manifest.version).toBe('1.1.0');
    // If _locales is broken, Chrome surfaces the raw placeholder here.
    expect(manifest.name).toBe('LiveVerify');
    expect(manifest.name).not.toContain('__MSG_');
    expect(manifest.description).not.toContain('__MSG_');
});

test('popup page renders localized, with no raw __MSG_ placeholders and no page errors', async ({ context, extensionId }) => {
    const errors: string[] = [];
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);
    await expect(page.locator('body')).toContainText('No verifications yet');
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).not.toContain('__MSG_');
    expect(errors).toEqual([]);
    await page.close();
});

test('settings page renders localized with no page errors', async ({ context, extensionId }) => {
    const errors: string[] = [];
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(`chrome-extension://${extensionId}/settings/settings.html`);
    await expect(page.locator('body')).toContainText('LiveVerify Settings');
    expect(await page.locator('body').innerText()).not.toContain('__MSG_');
    expect(errors).toEqual([]);
    await page.close();
});

test('every i18n key referenced by manifest, HTML and code exists in en, de and es', async () => {
    const locales: Record<string, Record<string, unknown>> = {};
    for (const loc of ['en', 'de', 'es']) {
        locales[loc] = JSON.parse(
            fs.readFileSync(path.join(EXTENSION_DIR, '_locales', loc, 'messages.json'), 'utf8'));
    }

    const referenced = new Set<string>();
    const manifestSrc = fs.readFileSync(path.join(EXTENSION_DIR, 'manifest.json'), 'utf8');
    for (const m of manifestSrc.matchAll(/__MSG_([A-Za-z0-9_]+)__/g)) referenced.add(m[1]);

    const scan = (dir: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const p = path.join(dir, entry.name);
            if (entry.isDirectory()) { scan(p); continue; }
            if (!/\.(js|html)$/.test(entry.name)) continue;
            const src = fs.readFileSync(p, 'utf8');
            for (const m of src.matchAll(/data-i18n(?:-[a-z]+)?="([A-Za-z0-9_]+)"/g)) referenced.add(m[1]);
            for (const m of src.matchAll(/getMessage\(\s*['"]([A-Za-z0-9_]+)['"]/g)) referenced.add(m[1]);
            for (const m of src.matchAll(/\bt\(\s*['"]([A-Za-z0-9_]+)['"]/g)) referenced.add(m[1]);
        }
    };
    scan(EXTENSION_DIR);

    expect(referenced.size).toBeGreaterThan(20);
    for (const [loc, messages] of Object.entries(locales)) {
        const missing = [...referenced].filter(k => !(k in messages));
        expect(missing, `keys missing from _locales/${loc}`).toEqual([]);
    }
});

// ---------------------------------------------------------------------------
// Tier 2: end-to-end verification through the real service worker, via the
// same runtime message the content script uses.
// ---------------------------------------------------------------------------

async function verifyViaExtension(context: BrowserContext, extensionId: string, claim: string) {
    const page = await context.newPage();
    await page.goto(`chrome-extension://${extensionId}/popup/popup.html`);
    const result = await page.evaluate(
        (text) => (globalThis as any).chrome.runtime.sendMessage({ type: 'verifyText', text }),
        claim);
    await page.close();
    return result;
}

test('verifies a claim end-to-end against a live issuer endpoint', async ({ context, extensionId }) => {
    const claim = claimFor('c', 'The bearer completed the course.\nGrade: distinction.');
    const hash = expectedHash(claim, PLAIN_META);
    servedHashes.add(hash);

    const result = await verifyViaExtension(context, extensionId, claim);
    expect(result.success).toBe(true);
    expect(result.status).toBe('VERIFIED');
    expect(result.hash).toBe(hash);
    expect(result.domain).toContain('localhost');
    expect(requestedPaths).toContain(`/c/${hash}`);
});

test('unknown hash yields not-verified, never a false positive', async ({ context, extensionId }) => {
    const claim = claimFor('c', 'A claim the issuer never published.');
    const hash = expectedHash(claim, PLAIN_META);
    // deliberately NOT added to servedHashes

    const result = await verifyViaExtension(context, extensionId, claim);
    expect(result.success).toBe(false);
    expect(result.hash).toBe(hash);
});

test('issuer-declared lineBreaks: flow reaches normalization — re-wrapped prose still verifies', async ({ context, extensionId }) => {
    // The issuer published the hash of the flow-canonical text. The verifier's
    // copy is wrapped differently — under faithful rules the hashes differ,
    // under the issuer's declared flow regime they must not.
    const canonical = 'This prose paragraph was published as one logical line by the issuer.\n\nA second paragraph follows it.';
    const rewrapped =
        'This prose paragraph was published\nas one logical line by\nthe issuer.\n\nA second\nparagraph follows it.';

    const claim = claimFor('flow', rewrapped);
    const canonicalClaim = claimFor('flow', canonical);
    const hash = expectedHash(canonicalClaim, FLOW_META);
    expect(expectedHash(claim, FLOW_META)).toBe(hash);          // wrap-invariance
    expect(expectedHash(claim, PLAIN_META)).not.toBe(hash);     // and it is the meta doing it
    servedHashes.add(hash);

    const result = await verifyViaExtension(context, extensionId, claim);
    expect(result.success).toBe(true);
    expect(result.status).toBe('VERIFIED');
    expect(result.hash).toBe(hash);
});
