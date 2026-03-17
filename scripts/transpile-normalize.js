#!/usr/bin/env node
/**
 * Transpiles public/normalize.js to ES5 for Android's Rhino JS engine.
 * Output: apps/android/app/src/main/assets/normalize.js
 */

const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');

const src = path.resolve(__dirname, '..', 'public', 'normalize.js');
const dest = path.resolve(__dirname, '..', 'apps', 'android', 'app', 'src', 'main', 'assets', 'normalize.js');

const source = fs.readFileSync(src, 'utf8');

const result = babel.transformSync(source, {
    presets: [['@babel/preset-env', { targets: { ie: '11' } }]],
    filename: 'normalize.js',
    comments: true,
});

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, result.code, 'utf8');

console.log('Transpiled public/normalize.js → apps/android/app/src/main/assets/normalize.js (ES5)');
