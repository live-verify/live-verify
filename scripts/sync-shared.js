#!/usr/bin/env node

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
 * Sync shared JS files from public/ (canonical source) to extension shared/ directories.
 *
 * Reads canonical files from public/, applies platform-specific transformations,
 * and writes to each extension's shared/ directory. Also vendors the psl UMD library.
 *
 * Usage: node scripts/sync-shared.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const HEADER = (sourceFile) =>
    `// AUTO-GENERATED — do not edit. Source: public/${sourceFile}\n` +
    `// Run "npm run sync-shared" to regenerate from canonical source.\n\n`;

const TARGETS = [
    {
        name: 'browser-extension',
        dir: path.join(ROOT, 'apps', 'browser-extension', 'shared'),
        exports: 'es',  // ES export {} + CommonJS fallback
    },
    {
        name: 'thunderbird-extension',
        dir: path.join(ROOT, 'apps', 'thunderbird-extension', 'shared'),
        exports: 'none', // No exports (global scope)
    },
];

/**
 * Strip existing CommonJS export block from source code.
 * Matches the pattern: if (typeof module !== 'undefined' && module.exports) { ... }
 */
function stripCommonJSExports(source) {
    // Remove the CommonJS export block at the end of the file
    return source.replace(
        /\n\/\/\s*Export.*\n(if\s*\(typeof module.*\n(\s+module\.exports\s*=\s*\{[^}]*\};\n)*\})\n?$/s,
        '\n'
    ).replace(
        /\n\/\/\s*Export.*\nif\s*\(typeof module\b.*?\n\}\n?$/s,
        '\n'
    );
}

/**
 * Transform normalize.js for browser-only usage:
 * - Replace dual sha256 (Node + browser) with browser-only async version
 * - Strip CommonJS exports
 */
function transformNormalize(source, target) {
    // Replace the dual sha256 function with browser-only async version
    source = source.replace(
        /\/\/ SHA-256 hash function \(works in both browser and Node\.js\)\nfunction sha256\(text\) \{[\s\S]*?^\}/m,
        `// SHA-256 hash function (browser only - async)
async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}`
    );

    source = stripCommonJSExports(source);

    return source;
}

/**
 * Transform app-logic.js for extension usage:
 * - Remove rotateCanvas (not needed in extensions)
 * - Strip CommonJS exports
 */
function transformAppLogic(source, target) {
    // Remove rotateCanvas function (only needed for camera/OCR app)
    source = source.replace(
        /\/\*\*\n \* Rotate canvas by degrees[\s\S]*?^}\n\n/m,
        ''
    );

    // Remove hashMatchesUrl (only needed for camera/OCR app)
    source = source.replace(
        /\/\*\*\n \* Check if computed hash matches[\s\S]*?^}\n\n/m,
        ''
    );

    source = stripCommonJSExports(source);

    // For ES module targets, import sha256 from normalize.js.
    // In the canonical source sha256 is a global (loaded via <script>), but in
    // ES modules checkAuthorization's `typeof sha256 === 'function'` check fails
    // because sha256 is not in scope. Adding the import fixes this.
    if (target.exports === 'es') {
        source = `import { sha256 } from './normalize.js';\n\n` + source;
    }

    return source;
}

/**
 * Transform domain-authority.js for extension usage:
 * - Strip CommonJS exports
 */
function transformDomainAuthority(source, target) {
    source = stripCommonJSExports(source);
    return source;
}

/**
 * Append export statements based on target type
 */
function appendExports(source, functionNames, target) {
    if (target.exports === 'es') {
        source += `\n// ES module exports (for browser extension)\n`;
        source += `export { ${functionNames.join(', ')} };\n`;
        source += `\n// CommonJS exports (for Node.js testing)\n`;
        source += `if (typeof module !== 'undefined' && module.exports) {\n`;
        source += `    module.exports = { ${functionNames.join(', ')} };\n`;
        source += `}\n`;
    }
    // 'none' — no exports added (Thunderbird loads as global scope script)
    return source;
}

/**
 * Extract function names from source code (top-level function declarations)
 */
function extractFunctionNames(source) {
    const names = [];
    const regex = /^(?:async\s+)?function\s+(\w+)\s*\(/gm;
    let match;
    while ((match = regex.exec(source)) !== null) {
        names.push(match[1]);
    }
    return names;
}

/**
 * Vendor the psl UMD library into a target's shared/ directory
 */
function vendorPsl(targetDir) {
    const pslSource = path.join(ROOT, 'node_modules', 'psl', 'dist', 'psl.umd.cjs');
    const pslDest = path.join(targetDir, 'psl.js');

    if (!fs.existsSync(pslSource)) {
        console.error(`  ERROR: psl UMD not found at ${pslSource}`);
        console.error('  Run "npm install" first.');
        process.exit(1);
    }

    // Read psl source and patch for ES module compatibility
    let pslContent = fs.readFileSync(pslSource, 'utf8');

    // The UMD wrapper passes `this` as the global object, but in an ES module
    // service worker `this` is undefined, which crashes the IIFE.
    // Replace `})(this,` with `})(globalThis,` so it works in both contexts.
    pslContent = pslContent.replace(/\}\)\(this,/, '})(globalThis,');

    const header = '// AUTO-GENERATED — vendored from node_modules/psl/dist/psl.umd.cjs\n' +
                   '// Run "npm run sync-shared" to update.\n\n';

    fs.writeFileSync(pslDest, header + pslContent);
    console.log(`  ${path.relative(ROOT, pslDest)} (vendored psl UMD)`);
}

// =============================================================================
// Main
// =============================================================================

console.log('Syncing shared files from public/ to extensions...\n');

for (const target of TARGETS) {
    console.log(`Target: ${target.name}`);

    // Ensure shared directory exists
    if (!fs.existsSync(target.dir)) {
        fs.mkdirSync(target.dir, { recursive: true });
    }

    // 1. Sync normalize.js
    {
        const sourceFile = 'normalize.js';
        const source = fs.readFileSync(path.join(PUBLIC, sourceFile), 'utf8');
        let transformed = transformNormalize(source, target);
        const funcs = extractFunctionNames(transformed);
        transformed = HEADER(sourceFile) + transformed;
        transformed = appendExports(transformed, funcs, target);
        const dest = path.join(target.dir, 'normalize.js');
        fs.writeFileSync(dest, transformed);
        console.log(`  ${path.relative(ROOT, dest)} (${funcs.join(', ')})`);
    }

    // 2. Sync app-logic.js → verify.js
    {
        const sourceFile = 'app-logic.js';
        const source = fs.readFileSync(path.join(PUBLIC, sourceFile), 'utf8');
        let transformed = transformAppLogic(source, target);
        const funcs = extractFunctionNames(transformed);
        transformed = HEADER(sourceFile) + transformed;
        transformed = appendExports(transformed, funcs, target);
        const dest = path.join(target.dir, 'verify.js');
        fs.writeFileSync(dest, transformed);
        console.log(`  ${path.relative(ROOT, dest)} (${funcs.join(', ')})`);
    }

    // 3. Sync domain-authority.js
    {
        const sourceFile = 'domain-authority.js';
        const source = fs.readFileSync(path.join(PUBLIC, sourceFile), 'utf8');
        let transformed = transformDomainAuthority(source, target);
        const funcs = extractFunctionNames(transformed);
        transformed = HEADER(sourceFile) + transformed;
        transformed = appendExports(transformed, funcs, target);
        const dest = path.join(target.dir, 'domain-authority.js');
        fs.writeFileSync(dest, transformed);
        console.log(`  ${path.relative(ROOT, dest)} (${funcs.join(', ')})`);
    }

    // 4. Vendor psl.js
    vendorPsl(target.dir);

    console.log();
}

console.log('Done. Run "npm run test:unit" to verify.');
