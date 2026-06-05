/*
    Copyright (C) 2025, Paul Hammant
    SPDX-License-Identifier: Apache-2.0

    Jest transformer that converts ES module syntax to CommonJS for files
    that have dual ES module/CommonJS exports (the browser-extension shared/
    files, which are ES modules in the extension but require()'d in tests).
*/

module.exports = {
    process(sourceText, sourcePath) {
        const transformed = sourceText
            // Rewrite named imports to CommonJS require so the imported bindings
            // remain in scope under Jest. Matches:
            //   import { a, b } from './mod.js';
            // verify.js needs this for `import { sha256 } from './normalize.js';`
            .replace(
                /^import\s*\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]\s*;?\s*$/gm,
                'const {$1} = require("$2");'
            )
            // Remove ES module export statements
            // Matches: export { ... };
            // Matches: export function / const / let / var / class ...
            .replace(/^export\s*\{[^}]*\}\s*;?\s*$/gm, '// [stripped ES export]')
            .replace(/^export\s+(function|const|let|var|class)\s+/gm, '$1 ');

        return {
            code: transformed
        };
    }
};
