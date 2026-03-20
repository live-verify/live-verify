"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
  var result = text;

  // 1. Apply character normalization (compact notation: "éèêë→e àáâä→a")
  if (metadata.charNormalization) {
    var groups = metadata.charNormalization.trim().split(/\s+/);
    var _iterator = _createForOfIteratorHelper(groups),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var group = _step.value;
        var parts = group.split('→');
        if (parts.length === 2 && parts[1].length === 1) {
          var sourceChars = parts[0];
          var targetChar = parts[1];
          var _iterator2 = _createForOfIteratorHelper(sourceChars),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var sourceChar = _step2.value;
              var regex = new RegExp(sourceChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
              result = result.replace(regex, targetChar);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  // 2. Apply OCR normalization rules (regex patterns)
  if (metadata.ocrNormalizationRules && Array.isArray(metadata.ocrNormalizationRules)) {
    var _iterator3 = _createForOfIteratorHelper(metadata.ocrNormalizationRules),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var rule = _step3.value;
        if (rule.pattern && rule.replacement) {
          try {
            var _regex = new RegExp(rule.pattern, 'g');
            result = result.replace(_regex, rule.replacement);
          } catch (e) {
            console.error("Invalid regex pattern: ".concat(rule.pattern), e);
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  return result;
}

// Text normalization function (as per the document rules)
function normalizeText(text) {
  var metadata = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // Apply document-specific normalization FIRST (before standard normalization)
  // This ensures user-typed text gets the same treatment as OCR text
  text = applyDocSpecificNorm(text, metadata);

  // Normalize Unicode characters that OCR might produce
  text = text.replace(/[\u201C\u201D\u201E]/g, '"'); // Curly double quotes → straight
  text = text.replace(/[\u2018\u2019]/g, "'"); // Curly single quotes → straight
  text = text.replace(/[\u00AB\u00BB]/g, '"'); // Angle quotes → straight double
  text = text.replace(/[\u2013\u2014]/g, '-'); // En/em dash → hyphen
  text = text.replace(/\u00A0/g, ' '); // Non-breaking space → space
  text = text.replace(/\u2026/g, '...'); // Ellipsis → three periods

  // Split into lines
  var lines = text.split('\n');

  // Apply normalization rules to each line
  // Note: OCR artifact cleanup (border chars, trailing letters) is in ocr-cleanup.js
  // and should be applied BEFORE this function for OCR'd text
  var normalizedLines = lines.map(function (line) {
    // Remove leading spaces
    line = line.replace(/^\s+/, '');
    // Remove trailing spaces
    line = line.replace(/\s+$/, '');
    // Collapse multiple spaces into single space
    line = line.replace(/\s+/g, ' ');
    return line;
  }).filter(function (line) {
    return line.length > 0;
  }); // Remove blank lines

  // Join back with newlines, no trailing newline
  return normalizedLines.join('\n');
}

// SHA-256 hash function (works in both browser and Node.js)
function sha256(text) {
  // Node.js environment (for testing)
  if (typeof require !== 'undefined' && typeof window === 'undefined') {
    var _crypto = require('crypto');
    return _crypto.createHash('sha256').update(text, 'utf8').digest('hex');
  }

  // Browser environment (production)
  return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var encoder, data, hashBuffer, hashArray, hashHex;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          encoder = new TextEncoder();
          data = encoder.encode(text);
          _context.n = 1;
          return crypto.subtle.digest('SHA-256', data);
        case 1:
          hashBuffer = _context.v;
          hashArray = Array.from(new Uint8Array(hashBuffer));
          hashHex = hashArray.map(function (b) {
            return b.toString(16).padStart(2, '0');
          }).join('');
          return _context.a(2, hashHex);
      }
    }, _callee);
  }))();
}

// Export for Node.js testing (doesn't affect browser usage)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    normalizeText: normalizeText,
    sha256: sha256,
    applyDocSpecificNorm: applyDocSpecificNorm
  };
}