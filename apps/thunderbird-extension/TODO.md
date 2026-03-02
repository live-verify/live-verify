# Thunderbird Extension — TODO

## What works

- Text selection verification (right-click context menu or Ctrl+Shift+V)
- Popup UI with verification history, status badges, timestamps
- Endorsement chain checking and display
- Settings page (intrusiveness level)
- Shared verification logic synced from `public/` via `npm run sync-shared`

## Missing (browser extension has these)

- [ ] **Content script for page scanning** — detect `verifiable-text` marked regions in email bodies, highlight them with dashed outlines, show floating "Scan" button
- [ ] **"Show me" button** — click in popup to scroll back to and highlight the verified claim in the email
- [ ] **Auto-scan setting** — automatically scan and highlight verifiable regions when an email is opened
- [ ] **Auto-verify setting** — automatically verify all discovered regions without user interaction
- [ ] **Region badges** — show per-region verification status inline in the email body
