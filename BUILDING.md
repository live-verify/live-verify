# Building and Testing

The web verification app (`public/`) is **100% client-side static**. No backend server, no database, no native bindings. The repo also contains browser/email extensions, native iOS/Android prototypes, and build scripts.

## Prerequisites

- Node.js 18+ and npm
- That's it!

## Install

```bash
npm install
```

This installs:
- Jest for unit tests
- Playwright for E2E tests
- psl (Public Suffix List) for domain authority extraction
- Development tools (ESLint, etc.)

**Note:** OpenCV.js and Tesseract.js are loaded from CDN in the browser. No compilation needed.

## Tests

```bash
npm test              # All tests (unit + E2E)
npm run test:unit     # Jest only (fast)
npm run test:e2e      # Playwright only (requires local server)
```

### Test Structure

**Unit tests** (`__tests__/` directory):
- `ocr-hash.test.js` — Text normalization + SHA-256 hashing
- `app-logic.test.js` — URL extraction, rotation, endorsement checking
- `domain-authority.test.js` — PSL-based registrable domain extraction
- `doc-specific-normalization.test.js` — Document-specific normalization rules
- `normalize-trailing-artifacts.test.js` — OCR trailing artifact cleanup
- `cross-platform-hashes.test.js` — Cross-platform hash fixtures from `normalization-hashes/`
- `browser-extension.test.js` — Browser extension shared module tests
- `training-pages-integration.test.js` — Training page hash verification
- `ui-state-machine.test.js` — Camera UI state transitions
- `cv-geometry.test.js` — OpenCV geometry utilities

**E2E tests** (`e2e/` directory):
- Registration mark detection (using OpenCV.js in browser)
- OCR integration (using Tesseract.js in browser)
- Full verification workflow
- Screenshot verification with real training pages
- PSL domain authority in browser context
- State transitions

### Running E2E Tests Locally

E2E tests require a local HTTP server:

```bash
# Terminal 1: Start server
cd public
python3 -m http.server 8000

# Terminal 2: Run E2E tests
npm run test:e2e
```

Or use the npm script:
```bash
npm run serve   # Starts server on port 8000
```

## Linting

```bash
npm run lint        # Check for issues
npm run lint:fix    # Auto-fix issues
```

## Local Development

```bash
# Serve the app locally
cd public
python3 -m http.server 8000

# Visit http://localhost:8000
```

**Note:** Camera access requires HTTPS. For local testing:
- `localhost` is treated as secure by browsers (camera will work)
- Deploy to GitHub Pages for mobile testing (automatic HTTPS)

## GitHub Actions CI/CD

The workflow (`.github/workflows/deploy.yml`) does:

1. **Test job:**
   - `npm ci` - Install dependencies
   - `npx playwright install --with-deps` - Install browser binaries
   - Start local HTTP server on port 8000
   - `npm test` - Run all tests (Jest + Playwright)
   - Stop server

2. **Build job:**
   - Upload `public/` folder as artifact

3. **Deploy job:**
   - Deploy artifact to GitHub Pages

**No OpenCV compilation, no native bindings, no system libraries needed.**

## Build Scripts

### Generate Hash Database

```bash
node build-hashes.js
```

Creates:
- `public/hashes.json` - Metadata for all hashes
- `public/c/{hash}/index.html` - Verification endpoints

### Generate Training Pages

```bash
node generate-training-pages.js
```

Creates HTML training certificates for testing.

### Sync Shared Extension Code

```bash
npm run sync-shared
```

Reads canonical source files from `public/` (`normalize.js`, `app-logic.js`, `domain-authority.js`) and generates platform-specific variants in each extension's `shared/` directory. Also vendors the `psl` UMD library for PSL-based domain extraction.

**Targets:**
- `apps/browser-extension/shared/` — ES module exports
- `apps/thunderbird-extension/shared/` — Global scope (no exports)

**Run this after editing any canonical file in `public/`.** The `shared/` files in extensions are auto-generated and should not be edited directly.

## File Structure

```
live-verify/
├── public/                          # Static files (deploy to GitHub Pages)
│   ├── index.html                   # Landing page
│   ├── styles.css                   # Responsive design, mobile-first
│   ├── camera-app/index.html        # Camera UI with registration marks overlay
│   ├── normalize.js                 # Text normalization + SHA-256 (canonical)
│   ├── app-logic.js                 # URL extraction, rotation, endorsement (canonical)
│   ├── domain-authority.js          # PSL-based registrable domain extraction (canonical)
│   ├── doc-specific-normalization.js# Document-specific normalization rules
│   ├── ocr-cleanup.js               # OCR artifact cleanup
│   ├── live-verify-app.js           # Main camera app logic (OCR, verification)
│   ├── text-selection-verify.js     # Clip verification UI (text selection → hash → verify)
│   ├── cv/
│   │   ├── detectSquares.js         # Registration mark detection (uses OpenCV.js)
│   │   └── geometry.js              # Geometry utilities
│   ├── training-pages/              # Test certificates (HTML)
│   ├── use-cases/                   # ~450 use case documents (Markdown)
│   ├── examples/                    # Example verification-meta.json
│   └── c/                           # Verification endpoints
│       ├── verification-meta.json   # Demo issuer metadata (Unseen University)
│       └── {hash}/index.html        # Static "OK" responses
│
├── apps/
│   ├── browser-extension/           # Chrome/Edge/Firefox Manifest V3 extension
│   │   ├── manifest.json
│   │   ├── background.js            # Service worker
│   │   ├── content.js               # Page scanning for verifiable-text markers
│   │   ├── popup/                   # Verification history UI
│   │   ├── settings/                # Options page
│   │   ├── shared/                  # AUTO-GENERATED by scripts/sync-shared.js
│   │   └── icons/
│   │
│   ├── thunderbird-extension/       # Thunderbird MailExtension
│   │   ├── manifest.json
│   │   ├── background.js
│   │   ├── popup/                   # Verification history UI
│   │   ├── settings/                # Options page
│   │   ├── shared/                  # AUTO-GENERATED by scripts/sync-shared.js
│   │   └── icons/
│   │
│   ├── ios/                         # Native iOS app (Swift)
│   │   └── LiveVerify/
│   │
│   └── android/                     # Native Android app (Kotlin)
│       └── app/
│
├── native/                          # Native platform data models
│   ├── ios/LiveVerifyPrototype/     # Swift VerificationMeta, Pipeline
│   └── android/                     # Kotlin VerificationMeta, data classes
│
├── scripts/
│   ├── sync-shared.js               # Generates extension shared/ from canonical public/ sources
│   ├── concat-source.py             # Concatenates source files for review
│   ├── count-and-update-derivations.js # Updates use-case derivation counts
│   └── generate-use-cases-index.js  # Generates use-cases index page
│
├── normalization-hashes/            # Cross-platform test fixtures
│   └── {sha256}.md                  # Test cases (filename = expected hash)
│
├── __tests__/                       # Jest unit tests (10 test files)
│
├── e2e/                             # Playwright E2E tests
│
├── test/fixtures/                   # Test images
│   ├── should-detect/               # Images with valid registration marks
│   ├── should-not-detect/           # Images without marks
│   ├── mixed/                       # Mixed test cases
│   └── screenshots/                 # Training page screenshots
│
├── docs/                            # Detailed documentation
│   └── Verification-Response-Format.md
│
├── build-hashes.js                  # Build tool: generates hash database
├── generate-training-pages.js       # Build tool: generates training pages
│
└── .github/workflows/
    └── deploy.yml                   # CI/CD pipeline
```

## Dependencies Explained

### Runtime (loaded from CDN in browser)
- **OpenCV.js 4.x** - Computer vision for registration mark detection (~8MB WASM)
- **Tesseract.js v6** - OCR engine (~2MB WASM)
- **Web Crypto API** - Built-in SHA-256 (no library needed)

### Runtime (npm — used by build scripts and extensions)
- **psl** - Public Suffix List for extracting registrable domains (e.g., distinguishing `github.io` from `user.github.io`). Vendored into extensions by `sync-shared.js`.

### Development (npm install)
- **Jest 29** - Unit testing framework
- **Playwright** - E2E testing (headless browsers)
- **jsdom** - DOM environment for Jest tests
- **ESLint** - Code linting
- **browserify** - Bundling for extension shared modules

### NOT Used
- ~~Native OpenCV bindings~~ (OpenCV.js is pure WASM)
- ~~Node.js server~~ (static files only)
- ~~Database~~ (verification URLs point to static files)

## Deployment Options

### GitHub Pages (current)
1. Push to main/master branch
2. GitHub Actions runs tests
3. Deploys `public/` folder automatically
4. Live at: `https://live-verify.github.io/live-verify/`

### Other Static Hosts
- **Netlify**: Drag & drop `public/` folder
- **Vercel**: Connect GitHub repo
- **Cloudflare Pages**: Similar to GitHub Pages
- **Surge.sh**: `surge public/`

All are free and work identically - just static file hosting.

## Troubleshooting

### Tests fail with "connection refused"
Start the local server first:
```bash
cd public && python3 -m http.server 8000
```

### Playwright browsers not installed
```bash
npx playwright install --with-deps
```

### Camera not working locally
- Use `localhost` (not `127.0.0.1` or LAN IP) - browsers treat it as secure
- Or deploy to GitHub Pages for automatic HTTPS

### npm test hangs
Check if port 8000 is already in use:
```bash
lsof -i :8000
kill <PID>
```

## Architecture Benefits

1. **No compilation** - Just HTML/CSS/JS
2. **No backend** - Static files only
3. **No database** - Verification URLs are static
4. **Privacy-first** - All OCR happens in browser (images never leave device)
5. **Free hosting** - GitHub Pages, Netlify, etc.
6. **Fast CI** - No OpenCV compilation, tests run in ~2 minutes
7. **Easy deployment** - Just push to GitHub
