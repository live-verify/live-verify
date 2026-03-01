# LiveVerify Mailspring Plugin

A Mailspring plugin for verifying claims in emails against issuer endpoints using SHA-256 hashing.

## Features

- **Verify Claim button**: Appears in the message toolbar when viewing emails
- **Text selection verification**: Select claim text containing a `verify:` URL and click to verify
- **Visual feedback**: Clear verified/failed status with domain attribution
- **Details view**: Shows claim text, SHA-256 hash, and verification time

## Installation

### From Source

1. Find your Mailspring packages directory:
   - **Linux**: `~/.config/Mailspring/packages/`
   - **macOS**: `~/Library/Application Support/Mailspring/packages/`
   - **Windows**: `%APPDATA%\Mailspring\packages\`

2. Clone or copy this plugin to the packages directory:
   ```bash
   # Linux example
   cp -r apps/mailspring-plugin ~/.config/Mailspring/packages/liveverify

   # macOS example
   cp -r apps/mailspring-plugin ~/Library/Application\ Support/Mailspring/packages/liveverify
   ```

3. Restart Mailspring

### Development Mode

For active development with hot-reloading:

1. Enable Developer Mode in Mailspring:
   - Go to **Developer** > **Run with Debug Flags**

2. Copy the plugin to the dev packages directory:
   - **Linux**: `~/.config/Mailspring/dev/packages/`
   - **macOS**: `~/Library/Application Support/Mailspring/dev/packages/`

3. Reload Mailspring or use **Developer** > **Reload**

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

3. Click the **"Verify Claim"** button in the message toolbar

4. The plugin will:
   - Extract the claim text (before the verify: line)
   - Normalize and hash the text using SHA-256
   - Check the verification endpoint
   - Display the result in a popover

### Result Display

- **Green checkmark**: Claim verified by the issuer
- **Red X**: Verification failed (hash not found, revoked, etc.)
- **Domain**: Shows which domain verified the claim
- **Details**: Expandable section showing hash and timing

## How It Works

1. **Extract**: Finds `verify:` or `vfy:` URL in selected text
2. **Normalize**: Applies text normalization rules (Unicode, whitespace)
3. **Hash**: Computes SHA-256 hash of normalized text
4. **Verify**: Fetches `https://{domain}/{path}/{hash}` and checks response

A response of "OK" means the claim is verified by the issuer.

## Requirements

- Mailspring 1.10.0 or later
- Internet connection for verification

## File Structure

```
mailspring-plugin/
├── package.json           # Plugin manifest
├── lib/
│   ├── main.js           # Plugin entry point
│   ├── verify-button.jsx # React UI component
│   └── verify.js         # Verification logic
├── stylesheets/
│   └── liveverify.less   # Plugin styles
└── README.md             # This file
```

## Troubleshooting

### Plugin not appearing

1. Ensure Mailspring is restarted after installation
2. Check the packages directory path is correct
3. Look for errors in **Developer** > **Toggle Developer Tools** > Console

### Verification fails

1. Ensure you've selected text including the `verify:` URL
2. Check your internet connection
3. Verify the issuer's endpoint is accessible

### Styles not loading

1. Ensure the `stylesheets/` directory is present
2. Restart Mailspring to reload styles

## Privacy

- Verification history is not stored (each verification is independent)
- Only the computed hash is sent to the verification endpoint
- No claim content is transmitted to any server

## License

GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)

## Related

- [Browser Extension](../browser-extension/) - Chrome/Edge/Firefox version
- [Thunderbird Extension](../thunderbird-extension/) - Thunderbird version
- [iOS App](../ios/LiveVerify/) - Native iOS camera app
- [Android App](../android/) - Native Android camera app

## Resources

- [Mailspring Plugin SDK](https://foundry376.github.io/Mailspring/)
- [Mailspring GitHub](https://github.com/Foundry376/Mailspring)
- [Mailspring Community](https://community.getmailspring.com/)
