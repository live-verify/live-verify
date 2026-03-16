# Contributing to Live Verify

Thank you for considering contributing to Live Verify.

Realize that at some point Apple and Google may head in a (hopefully combined) direction
for verified claims that supersedes this project. Until then, contributions are welcome.

## Getting Started

**Prerequisites:**
- Node.js 20+
- JDK 17 and Android SDK (for Android work)
- Xcode and macOS (for iOS work)

**Quick bootstrap:**

```bash
npm install
npm test                # unit tests (Jest) + Playwright browser tests
./ci.sh                 # full CI: web, Android, iOS (if on Mac), extension packaging
```

## Project Structure

```
public/                  # Web app — canonical JS (normalize.js, app-logic.js, domain-authority.js)
apps/
  browser-extension/     # Chrome MV3 extension (shared/ is auto-generated — see below)
  android/               # Android app (Kotlin, CameraX + ML Kit)
  ios/                   # iOS app (Swift, Vision + DataScanner)
backend/
  tier1-edge/            # Edge proxy (Go)
  tier2-inspector/       # Hash lookup + authority chain (Rust/Axum)
  tier3-vault/           # Hash storage (Go + BadgerDB)
scripts/                 # Build/sync tooling
simulated-integration-tests/  # Full-stack tests (browser extension, Android)
```

## Browser Extension Shared Files

`apps/browser-extension/shared/` contains auto-generated copies of files from `public/`.
These are **not** simple copies — `scripts/sync-shared.js` applies ES module
transformations. After changing any file in `public/`, run:

```bash
npm run sync-shared
```

and commit the updated shared files alongside your changes.

## Making Changes

- Keep PRs focused — one feature or fix per PR
- LLM-assisted code is welcome; say so in the PR if you like, but it's not required
- Don't remove or weaken existing tests

## Testing

```bash
npm run test:unit        # Jest unit tests (normalize, app-logic, domain-authority)
npm run test:playwright  # Playwright browser tests (needs python3 http server on :8000)
npm test                 # both of the above

# Android unit tests
cd apps/android && ./gradlew testReleaseUnitTest

# Full CI (web + Android + iOS if on Mac + extension packaging)
./ci.sh
```

**Include tests with your changes.** AI tools are fine for writing tests.

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and add tests — you may be asked to add more or refine them
3. Run `./ci.sh` to verify — it's short
4. Push and create a Pull Request. Be prepared to answer questions, including who you are

## Design Principles

- **Design for Testability is better Design Anyway**
- **Server is the arbiter** — clients try candidate hashes against the server; first 200 wins
- **Normalize before hashing** — all platforms share the same normalization rules
- **Camera and clip** — two modes: OCR from camera (mobile) and text selection (browser extension)
- **Authority chains** — `verify:` URLs point to verification-meta.json; `authorizedBy` links walk up to 3 levels

## Questions?

**When filing issues:**
- Say what you searched for that didn't help
- Include AI tool responses to the same questions
- Provide reproduction steps if you can

## License

Contributions are licensed under the Apache License 2.0.
