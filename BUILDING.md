# Building and Testing

This is a **100% client-side static web app**. No backend server, no database, no native bindings.

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
- Text normalization
- SHA-256 hashing
- URL extraction and validation
- Canvas rotation
- Pure functions

**E2E tests** (`e2e/` directory):
- Registration mark detection (using OpenCV.js in browser)
- OCR integration (using Tesseract.js in browser)
- Full verification workflow
- Screenshot verification with real training pages

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

## File Structure

```
live-verify/
├── public/                   # Static files (deploy this to GitHub Pages)
│   ├── camera-app/index.html # Camera UI
│   ├── live-verify-app.js        # Main app logic
│   ├── normalize.js          # Text normalization + SHA-256
│   ├── app-logic.js          # Pure functions (URL extraction, rotation)
│   ├── cv/
│   │   ├── detectSquares.js  # Registration mark detection (uses OpenCV.js)
│   │   └── geometry.js       # Geometry utilities
│   ├── training-pages/       # Test certificates
│   └── c/                    # Verification endpoints
│       └── {hash}/index.html # Static "OK" responses
│
├── __tests__/                # Jest unit tests
│   ├── ocr-hash.test.js
│   ├── app-logic.test.js
│   ├── doc-specific-normalization.test.js
│   └── ...
│
├── e2e/                      # Playwright E2E tests
│   ├── cv-detect.spec.ts
│   ├── cv-ocr.spec.ts
│   ├── screenshot-verification.spec.ts
│   └── ...
│
├── test/fixtures/            # Test images and expected outputs
│   └── screenshots/          # Training page screenshots
│
└── .github/workflows/
    └── deploy.yml            # CI/CD pipeline
```

## Dependencies Explained

### Runtime (loaded from CDN in browser)
- **OpenCV.js 4.x** - Computer vision for registration mark detection (~8MB WASM)
- **Tesseract.js v6** - OCR engine (~2MB WASM)
- **Web Crypto API** - Built-in SHA-256 (no library needed)

### Development (npm install)
- **Jest 29** - Unit testing framework
- **Playwright** - E2E testing (headless browsers)
- **jsdom** - DOM environment for Jest tests
- **ESLint** - Code linting

### NOT Used
- ~~Native OpenCV bindings~~ (OpenCV.js is pure WASM)
- ~~Node.js server~~ (static files only)
- ~~Database~~ (verification URLs point to static files)
- ~~Build tools~~ (no compilation, no bundling required)

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
