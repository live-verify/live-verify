# LiveVerify Browser Extension

Verify selected text against issuer endpoints using SHA-256 hashing. Select text containing a `verify:` URL, right-click, and instantly verify authenticity.

## Why This Extension Exists (For Now)

This extension is a **proof-of-concept** demonstrating text verification in browsers. We expect browser makers (Chrome, Firefox, Safari, Edge) to eventually integrate this functionality natively—providing far more prominent verification UI than any extension can achieve.

**Native browser integration could offer:**
- Inline highlighting of verified claims as you read (see mockup below)
- URL bar indicators (like HTTPS padlock) for pages with verified content
- Automatic scanning without user action
- First-party trust signals that users recognize

![Browser UI mockup](browser-ui-change.png)
*Mockup: Native browsers could highlight verified text inline (gold background) rather than requiring manual selection and right-click.*

Until browsers adopt this pattern, the extension demonstrates the verification flow and proves the concept works.

## Installation (Development)

### Chrome / Edge

1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select this folder: `apps/browser-extension`

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select `manifest.json` from this folder

## Usage

1. Select text that includes a `verify:` or `vfy:` URL line:
   ```
   [Global Tech Exports, Inc.
   400 Silicon Valley Blvd
   San Jose, CA 95134
   verify:example.com/c/abc123 ]
   ```

2. Right-click → **Verify Selection**
   Or use keyboard: `Cmd+Shift+V` (Mac) / `Ctrl+Shift+V` (Windows/Linux)

3. Check the result:
   - **In-page banner** slides down from the top of the page showing verified/not-verified status, the issuer domain, and endorsement chain (if present)
   - **Badge** on extension icon (green ✓ or red ✗)
   - **Click icon** for verification history with full details

## Testing Locally

Serve the main project:

```bash
cd /path/to/live-verify/public
python3 -m http.server 8000
```

Then visit:
- Training pages: `http://localhost:8000/training-pages/`
- Use cases: `http://localhost:8000/use-cases/view.html?doc=air-waybills`

## How It Works

1. Extracts `verify:` or `vfy:` URL from selection
2. Normalizes remaining text (Unicode, whitespace)
3. Computes SHA-256 hash
4. Fetches `https://{domain}/{path}/{hash}`
5. Displays result based on HTTP response

## File Structure

```
browser-extension/
├── manifest.json        # Extension manifest (v3)
├── background.js        # Service worker
├── shared/
│   ├── normalize.js     # Text normalization + hashing
│   └── verify.js        # URL extraction + verification
├── popup/
│   ├── popup.html       # Results popup
│   └── popup.js
├── settings/
│   ├── settings.html    # Settings page
│   └── settings.js
└── icons/               # Extension icons
```

## Result Display Mode

Results can be shown as an **in-page banner** (injected into the DOM) or as an **OS notification** (via Chrome's notification API). The banner is the default.

The distinction matters: page JavaScript could fake a banner, but cannot create OS notifications — only the extension can. This is why the banner includes the disclaimer "screencaps of this are not proof of anything".

Switch to notification:
```bash
sed -i "s/const RESULT_DISPLAY = 'banner'/const RESULT_DISPLAY = 'notification'/" apps/browser-extension/background.js
```

Switch to banner:
```bash
sed -i "s/const RESULT_DISPLAY = 'notification'/const RESULT_DISPLAY = 'banner'/" apps/browser-extension/background.js
```

## Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome | ✓ Supported |
| Edge | ✓ Supported |
| Firefox | ✓ Supported |
| Safari | Requires Xcode wrapper (future) |

## License

Apache-2.0
