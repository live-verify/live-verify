# LiveVerify Thunderbird Extension

A Thunderbird MailExtension for verifying claims in emails against issuer endpoints using SHA-256 hashing.

## Features

- **Right-click verification**: Select text containing a `verify:` URL in an email, right-click, and choose "Verify this claim"
- **Keyboard shortcut**: `Ctrl+Shift+V` (or `Cmd+Shift+V` on Mac)
- **Verification history**: View recent verifications in the popup
- **Notification settings**: Choose between maximum, standard, or minimal notification levels

## Installation

### From Source (Development)

1. Open Thunderbird
2. Go to **Tools** > **Developer Tools** > **Debug Add-ons** (or press `Ctrl+Shift+Alt+I`)
3. Click **Load Temporary Add-on**
4. Navigate to this directory and select `manifest.json`

The extension will be loaded temporarily and will be removed when Thunderbird closes.

### Permanent Installation

1. Create a ZIP file of this directory:
   ```bash
   cd apps/thunderbird-extension
   zip -r liveverify-thunderbird.xpi manifest.json background.js popup/ settings/ shared/ icons/
   ```

2. In Thunderbird, go to **Tools** > **Add-ons and Themes**
3. Click the gear icon and select **Install Add-on From File**
4. Select the `.xpi` file

## Usage

### Verifying a Claim

1. Open an email containing a verifiable claim
2. Select the text that includes both:
   - The claim content
   - A `verify:` or `vfy:` URL (usually at the end)

   Example:
   ```
   [
   This certifies that John Doe completed
   the Advanced Widget Training Program
   on January 15, 2025.

   Issued by: Widget Academy
   Certificate ID: WA-2025-001

   verify:live-verify.github.io/live-verify/c
   ]
   ```

3. Right-click and select **"Verify this claim"** or press `Ctrl+Shift+V`

4. The extension will:
   - Extract the claim text (before the verify: line)
   - Normalize and hash the text
   - Check the verification endpoint
   - Show a notification with the result

### Viewing History

Click the LiveVerify icon in the message display toolbar to see:
- Recent verification results
- Claim text and details
- SHA-256 hashes and verification URLs

### Settings

Click "Settings" in the popup to configure:
- **Maximum**: Notifications stay until dismissed
- **Standard**: Notifications auto-dismiss
- **Minimal**: Badge only, click to see details

## How It Works

1. **Extract**: Finds `verify:` or `vfy:` URL in selected text
2. **Normalize**: Applies text normalization rules (Unicode, whitespace)
3. **Hash**: Computes SHA-256 hash of normalized text
4. **Verify**: Fetches `https://{domain}/{path}/{hash}` and checks response

A JSON response of `{"status":"verified"}` means the claim is verified by the issuer.

## Requirements

- Thunderbird 102 or later
- Internet connection for verification

## Privacy

- Verification history is stored locally
- The extension only sends the computed hash to the verification endpoint
- No claim content is transmitted (only the hash)

## File Structure

```
thunderbird-extension/
├── manifest.json       # Extension manifest
├── background.js       # Background script
├── popup/
│   ├── popup.html     # History popup UI
│   └── popup.js       # Popup logic
├── settings/
│   ├── settings.html  # Settings page
│   └── settings.js    # Settings logic
├── shared/
│   ├── normalize.js   # Text normalization
│   └── verify.js      # Verification logic
└── icons/             # Extension icons
```

## License

Apache License 2.0 (Apache-2.0)

## Related

- [Browser Extension](../browser-extension/) - Chrome/Edge/Firefox version
- [iOS App](../ios/LiveVerify/) - Native iOS camera app
- [Android App](../android/) - Native Android camera app
