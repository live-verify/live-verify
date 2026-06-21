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

// Package the Live Verify repo into a small set of large, well-delimited
// Markdown bundles for upload to Google NotebookLM (or any LLM that prefers
// few big sources over hundreds of tiny files).
//
// Output (in package-notebooklm/):
//   00-README-corpus-guide.md          — orients the analysis: what this is, why
//   use-cases-by-category/             — one bundle per category, source banners between files
//   rejected-use-cases.md              — the "considered and rejected" reasoning (persuasive)
//   design-and-strategy-docs.md (+ -2) — the docs/ material (the "why this needs doing")
//
// Each concatenated source file is preceded by a banner naming its original path.
//
// Usage:  node scripts/package-for-notebooklm.js [--dry-run]

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'package-notebooklm');
const DRY = process.argv.includes('--dry-run');

const USE_CASES_DIR = path.join(ROOT, 'public', 'use-cases');
const REJECTED_DIR = path.join(ROOT, 'public', 'rejected-use-cases');
const DOCS_DIR = path.join(ROOT, 'docs');

// Files in use-cases/ that are not actual use cases.
const USE_CASE_SKIP = new Set([
  'criteria-template.md',
  'qualifying_criteria.md',
  'subjects.md',
]);

// NotebookLM-friendly: a single source much larger than this is split.
const SPLIT_BYTES = 900 * 1024;

function readFrontmatter(md) {
  // Returns { meta: {key:value}, body: string-without-frontmatter }.
  if (!md.startsWith('---')) return { meta: {}, body: md };
  const end = md.indexOf('\n---', 3);
  if (end === -1) return { meta: {}, body: md };
  const fmBlock = md.slice(3, end).trim();
  const body = md.slice(end + 4).replace(/^\s*\n/, '');
  const meta = {};
  for (const line of fmBlock.split('\n')) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return { meta, body };
}

function decodeEntities(s) {
  return s
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&rarr;/g, '→').replace(/&larr;/g, '←')
    .replace(/&bull;/g, '•').replace(/&middot;/g, '·')
    .replace(/&pound;/g, '£').replace(/&euro;/g, '€')
    .replace(/&reg;/g, '®').replace(/&copy;/g, '©').replace(/&trade;/g, '™')
    .replace(/&nbsp;/g, ' ').replace(/&hellip;/g, '…')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function stripTagsToText(html) {
  return decodeEntities(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|tr|li|h[1-6]|summary|details)>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function flattenHtmlMockups(body) {
  // Use-case mockups are nested HTML blocks (<div><pre>…</pre></div>, plus
  // <details>/<summary> for country-specific notes and inline <strong>/<p>).
  // NotebookLM doesn't need the styling — keep the visible text. Convert each
  // top-level mockup block into a fenced "example document" block, then strip
  // any remaining inline HTML from the rest of the prose.

  // 1. Collapsible country-specific sections: keep the text, drop the chrome.
  body = body.replace(/<details[^>]*>([\s\S]*?)<\/details>/gi, (m, inner) => {
    const text = stripTagsToText(inner);
    return text ? `\n${text}\n` : '';
  });

  // 2. Top-level mockup containers → fenced example blocks. Matches a <div>
  //    that contains a <pre> (the document mockup), greedily to its closing
  //    </div> at line start or end of the block.
  body = body.replace(/<div[^>]*>\s*([\s\S]*?<\/pre>)\s*(?:<\/div>\s*)*<\/div>/gi, (full, inner) => {
    const text = stripTagsToText(inner);
    return text ? '\n```text (example document mockup)\n' + text + '\n```\n' : '';
  });

  // 3. Strip ALL remaining HTML tags globally. In a use-case file, anything
  //    left after the mockup/details passes is chrome (stray <div>/<span> from
  //    deeply-nested mockups) or inline emphasis (<strong>/<p>) — none of it
  //    carries meaning NotebookLM needs, so flatten it unconditionally. This is
  //    only safe because these are content docs with no functional HTML.
  body = body
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|tr|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, '');

  return decodeEntities(body)
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n');
}

function banner(relPath) {
  const line = '='.repeat(78);
  return `\n\n${line}\n=== SOURCE FILE: ${relPath}\n${line}\n\n`;
}

function renderUseCase(relPath, raw) {
  const { meta, body } = readFrontmatter(raw);
  let out = banner(relPath);
  if (meta.title) out += `# ${meta.title}\n\n`;
  // Surface the useful metadata as a readable line, not raw YAML.
  const bits = [];
  if (meta.category) bits.push(`Category: ${meta.category}`);
  if (meta.volume) bits.push(`Volume: ${meta.volume}`);
  if (meta.verificationMode) bits.push(`Mode: ${meta.verificationMode}`);
  if (meta.tags) bits.push(`Tags: ${meta.tags.replace(/[[\]"]/g, '')}`);
  if (bits.length) out += `*${bits.join(' · ')}*\n\n`;
  out += flattenHtmlMockups(body).trim() + '\n';
  return out;
}

function renderPlainDoc(relPath, raw) {
  // docs/ and rejected/ — keep frontmatter-as-header if present, else as-is.
  const { meta, body } = readFrontmatter(raw);
  let out = banner(relPath);
  if (meta.title) out += `# ${meta.title}\n\n`;
  if (meta.reason) out += `*Rejected because: ${meta.reason}*\n\n`;
  out += (Object.keys(meta).length ? body : raw).trim() + '\n';
  return out;
}

function listMd(dir, skip = new Set()) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !skip.has(f))
    .sort();
}

function writeOut(relName, content) {
  const dest = path.join(OUT, relName);
  if (DRY) {
    console.log(`  would write ${relName.padEnd(46)} ${(Buffer.byteLength(content) / 1024).toFixed(0)} KB`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content);
  console.log(`  wrote ${relName.padEnd(50)} ${(Buffer.byteLength(content) / 1024).toFixed(0)} KB`);
}

// Split an array of {name, text} into bundles under SPLIT_BYTES, return array of strings.
function bundle(header, items) {
  const bundles = [];
  let cur = header;
  for (const it of items) {
    if (Buffer.byteLength(cur) + Buffer.byteLength(it) > SPLIT_BYTES && cur !== header) {
      bundles.push(cur);
      cur = header;
    }
    cur += it;
  }
  if (cur !== header) bundles.push(cur);
  return bundles;
}

function main() {
  console.log(`Packaging Live Verify for NotebookLM${DRY ? ' (dry run)' : ''}...\n`);
  if (!DRY) fs.rmSync(OUT, { recursive: true, force: true });

  // ---- Use cases, grouped by category ----
  const ucFiles = listMd(USE_CASES_DIR, USE_CASE_SKIP);
  const byCategory = new Map();
  for (const f of ucFiles) {
    const raw = fs.readFileSync(path.join(USE_CASES_DIR, f), 'utf8');
    const { meta } = readFrontmatter(raw);
    const cat = meta.category || '(uncategorized)';
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push({ f, raw });
  }

  const cats = [...byCategory.entries()].sort((a, b) => b[1].length - a[1].length);
  let totalUc = 0;
  console.log('Use-case category bundles:');
  for (const [cat, files] of cats) {
    const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let content = `# Live Verify Use Cases — Category: ${cat}\n\n`;
    content += `This bundle concatenates ${files.length} use-case document(s) in the "${cat}" category. `;
    content += `Each is preceded by a banner naming its original source file. `;
    content += `Use cases describe document types made verifiable by Live Verify (text → normalize → SHA-256 → GET).\n`;
    for (const { f, raw } of files) {
      content += renderUseCase(`public/use-cases/${f}`, raw);
    }
    writeOut(path.join('use-cases-by-category', `${slug}.md`), content);
    totalUc += files.length;
  }

  // ---- Rejected use cases ----
  const rejFiles = listMd(REJECTED_DIR);
  let rejContent = `# Live Verify — Rejected Use Cases (considered and deliberately not adopted)\n\n`;
  rejContent += `These ${rejFiles.length} ideas were evaluated and rejected as Live Verify use cases. `;
  rejContent += `The rejection reasoning is itself evidence of where the technology does and does not apply — useful for an honest assessment of scope.\n`;
  for (const f of rejFiles) {
    rejContent += renderPlainDoc(`public/rejected-use-cases/${f}`, fs.readFileSync(path.join(REJECTED_DIR, f), 'utf8'));
  }
  console.log('\nRejected use cases:');
  writeOut('rejected-use-cases.md', rejContent);

  // ---- Design & strategy docs ----
  // Lead with the persuasive "why this needs to exist" material, then the
  // architecture/spec, then everything else alphabetically. The goal of this
  // package is to make the case for the technology, so order for that.
  const DOC_PRIORITY = [
    'lets-encrypt-precedent.md',
    'merkle-tree-certificates-precedent.md',
    'sovereign-roots.md',
    'safe-sequence-platform-disclosure.md',
    'verification-enrichment-hazards.md',
    'quantum-computing-threat-assessment.md',
    'benefits_of_merkle_tree.md',
    'Technical_Concepts.md',
    'Verification-Response-Format.md',
    'VERIFICATION-MODES.md',
    'NORMALIZATION.md',
    'authority-chain-spec.md',
    'authority-chain-app-display.md',
    'weaknesses_audit.md',
  ];
  const allDocs = listMd(DOCS_DIR);
  const docFiles = [
    ...DOC_PRIORITY.filter((f) => allDocs.includes(f)),
    ...allDocs.filter((f) => !DOC_PRIORITY.includes(f)),
  ];
  const docItems = docFiles.map((f) =>
    renderPlainDoc(`docs/${f}`, fs.readFileSync(path.join(DOCS_DIR, f), 'utf8'))
  );
  const docHeader = `# Live Verify — Design & Strategy Documents\n\n` +
    `The architecture, trust model, normalization rules, threat assessments, and strategic ` +
    `arguments (Let's Encrypt precedent, Merkle Tree Certificates, sovereign roots, verification ` +
    `enrichment hazards, etc.). This is the "why and how" behind the use cases.\n`;
  const docBundles = bundle(docHeader, docItems);
  console.log('\nDesign & strategy doc bundles:');
  docBundles.forEach((b, i) => {
    const name = docBundles.length === 1 ? 'design-and-strategy-docs.md' : `design-and-strategy-docs-${i + 1}.md`;
    writeOut(name, b);
  });

  // ---- Corpus guide / README for NotebookLM ----
  const guide = buildGuide(cats, totalUc, rejFiles.length, docFiles.length, docBundles.length);
  console.log('\nCorpus guide:');
  writeOut('00-README-corpus-guide.md', guide);

  console.log(`\nDone. ${DRY ? 'Dry run — nothing written.' : `Output in ${path.relative(ROOT, OUT)}/`}`);
  console.log(`Bundled: ${totalUc} use cases across ${cats.length} categories, ${rejFiles.length} rejected, ${docFiles.length} docs.`);
}

function buildGuide(cats, totalUc, rejN, docN, docBundles) {
  let g = `# Live Verify — Corpus Guide (for NotebookLM)\n\n`;
  g += `## What Live Verify is\n\n`;
  g += `Live Verify is an open standard that makes documents and claims verifiable without a central `;
  g += `database, blockchain, or vendor. The pipeline is **text → normalize → SHA-256 → GET**: an issuer `;
  g += `publishes a one-way hash of a claim on its own domain; anyone holding the document recomputes `;
  g += `the hash and checks it. The endpoint confirms status (verified / revoked / expired) — it never `;
  g += `echoes the content back. Trust rests on domain ownership, the way the web already does.\n\n`;
  g += `## What is in this corpus and how to read it\n\n`;
  g += `- **use-cases-by-category/** — ${totalUc} use-case documents grouped into ${cats.length} category `;
  g += `bundles. Each describes a real document type (a degree, a licence, an insurance certificate, an `;
  g += `ad placement, a press credential…) made verifiable, with the parties, fraud it counters, and `;
  g += `verification architecture. Within each bundle, a banner names each document's original source file.\n`;
  g += `- **rejected-use-cases.md** — ${rejN} ideas deliberately rejected, with reasons. Read this for an `;
  g += `honest picture of the technology's *boundaries*.\n`;
  g += `- **design-and-strategy-docs${docBundles > 1 ? ' (+ parts)' : ''}.md** — ${docN} documents covering the `;
  g += `architecture, trust model, normalization, post-quantum threat assessment, and the strategic case `;
  g += `(why an open verification standard is needed now, modeled on Let's Encrypt; how the industry is `;
  g += `converging on the same Merkle primitives). **Start here for "why this technology needs to exist."**\n\n`;
  g += `## Suggested questions for analysis\n\n`;
  g += `- What problem does Live Verify solve that existing tools (PDFs, QR codes, blockchains, paid `;
  g += `verification bureaus) do not?\n`;
  g += `- Across ${totalUc} use cases, what are the recurring fraud patterns and who bears the cost?\n`;
  g += `- Where does the technology *not* apply, and is the project honest about it?\n`;
  g += `- What is the strategic argument that this should be built as a free open standard now?\n\n`;
  g += `## Category breakdown\n\n`;
  for (const [cat, files] of cats) g += `- ${cat}: ${files.length}\n`;
  g += `\n*Generated by scripts/package-for-notebooklm.js from the live-verify repository.*\n`;
  return g;
}

main();
