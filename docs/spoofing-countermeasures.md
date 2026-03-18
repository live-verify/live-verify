# Spoofing Countermeasures

How a bad actor might fake a "Verified" result on a page, and what defences exist or are planned.

## Attack surface

The browser extension injects UI elements (badge, outline, authority chain panel) directly into the host page's DOM. This means page-level JavaScript has full read/write access to every element the extension creates.

### 1. CSS mimicry

The page creates its own elements styled identically to the extension's badges:

```html
<div class="liveverify-badge verified" style="...">✓ Verified</div>
```

Class names and inline styles are public. A determined attacker can copy them exactly.

### 2. DOM mutation after injection

Page JS sets up a `MutationObserver` watching for the extension's injected nodes, then:

- Swaps inner text from "Not Verified" to "Verified"
- Changes `background` from red to green
- Replaces the real badge element entirely
- Modifies authority chain text to show a different authorizer

### 3. CSS `!important` override

Page stylesheet overrides extension styles:

```css
.liveverify-badge.failed {
    background: #22c55e !important; /* green instead of red */
}
.liveverify-badge.failed::after {
    content: "✓ Verified" !important;
}
```

### 4. Attacker-controlled verify: domain

```html
<span data-verify-line="x">verify:evil.com/certs</span>
```

Where `evil.com` returns `{"status":"verified"}` for any hash. The extension truthfully shows "Verified by evil.com" — the verification is technically correct, but the domain is not authoritative. The authority chain is the defence here: `evil.com` won't have an `authorizedBy` chain leading to a trusted root.

### 5. Fake UI without the extension

Page waits a plausible delay (1–2 seconds), then injects a fake green badge, outline, and chain panel. A click handler on the fake badge shows a fake "verifying..." animation. No extension is involved at all.

### 6. Toolbar badge spoofing

The page can't set the real extension badge, but could use `position: fixed` to overlay a fake green dot near the top-right of the viewport where the extension icon sits.

## Invisible character attacks

When the extension scans a page looking for `verify:` or `vfy:` text, or when a user selects text containing a verify line, invisible Unicode characters can be inserted to break matching or subtly alter the hashed text.

### Zero-width characters in verify: URL

```html
verify:example&#x200B;.com/certs
```

A zero-width space (`U+200B`) between "example" and ".com" is invisible to the user but changes the URL the extension fetches. The request goes to a different (or non-existent) endpoint, causing verification to fail — or worse, redirecting to an attacker's domain if they register a matching hostname.

Other invisible characters that could be injected:

| Character | Codepoint | Name |
|:---|:---|:---|
| `U+200B` | `&#x200B;` | Zero-width space |
| `U+200C` | `&#x200C;` | Zero-width non-joiner |
| `U+200D` | `&#x200D;` | Zero-width joiner |
| `U+FEFF` | `&#xFEFF;` | Byte order mark (zero-width no-break space) |
| `U+00AD` | `&#x00AD;` | Soft hyphen |
| `U+2060` | `&#x2060;` | Word joiner |
| `U+180E` | `&#x180E;` | Mongolian vowel separator |

### Zero-width characters in claim text

Inserting invisible characters into the claim text changes the SHA-256 hash without changing what the user sees. A page could display text that looks identical to a legitimate claim but hashes differently — causing a genuine claim to fail verification, or routing the hash lookup to a different endpoint.

### Homoglyph substitution

Replacing Latin characters with visually identical characters from other Unicode blocks:

- `а` (Cyrillic U+0430) instead of `a` (Latin U+0061)
- `е` (Cyrillic U+0435) instead of `e` (Latin U+0065)
- `о` (Cyrillic U+043E) instead of `o` (Latin U+006F)

This changes the hash while the text looks identical. In a verify: URL, it could redirect to a different domain (IDN homograph attack).

### Direction override characters

Right-to-left override (`U+202E`) can make text display in reverse, hiding the true URL:

```
verify:moc.live‮good.example
```

The user sees what appears to end with "good.example" but the actual string is different.

## Defences

### Implemented

- **Authority chain**: Even if `evil.com` returns "verified", the popup and banner show the domain. Without an `authorizedBy` chain to a recognised authority, the verification is self-asserted. Users should check who is verifying, not just that something says "verified."
- **Domain emphasis**: The registrable domain is bolded in results (e.g., verify.**example.com**) to draw attention to the actual issuer.
- **Banner disclaimer**: "screencaps of this are not proof of anything" reminds users that the in-page UI is not tamper-proof evidence.
- **Badge count per tab**: The `X/N` toolbar badge is set via the Chrome extension API, which page JS cannot access or spoof.

### Planned or recommended

- **Shadow DOM isolation**: Inject all extension UI into a closed shadow root (`attachShadow({ mode: 'closed' })`). Page JavaScript cannot traverse into a closed shadow root — it cannot read, modify, or restyle any element inside. This is the single most important countermeasure against DOM mutation and CSS override attacks.
- **Strip invisible characters at input boundary**: Strip all zero-width and formatting Unicode characters (`U+200B`–`U+200F`, `U+202A`–`U+202E`, `U+2060`–`U+2069`, `U+FEFF`, `U+00AD`, `U+180E`) from selected text *before* it enters the pipeline — in the selection handler, URL extraction, and text extraction stages, not in `normalizeText`. The attacker's goal is to poison the input so the real extension's hash doesn't match, causing a legitimate claim to show "Not Verified" while their fake UI shows "Verified". Stripping in normalization wouldn't help because the poisoned URL would already have been fetched or failed to match. This applies to all clip-mode paths — not just the browser extension, but any future integration that takes text from a clipboard or selection (Acrobat plugins, OS-level services, desktop apps). Camera/OCR paths are not affected since OCR engines produce characters from pixels, not from digital text that could contain invisible characters.
- **Homoglyph detection**: Warn when a verify: URL contains mixed-script characters (e.g., Latin + Cyrillic). Browsers already do this for IDN domains but the extension should flag it explicitly.
- **URL validation**: After extracting a verify: URL, validate that it contains only ASCII characters (after punycode conversion if applicable). Reject or warn on URLs containing non-ASCII characters.
- **Content Security Policy awareness**: Document that the extension's injected elements are vulnerable on pages with permissive CSP. Shadow DOM mitigates this regardless of CSP.

### Requires browser vendor work

- **Diagonal tether line from toolbar badge to verified region**: A line drawn from the extension's `X/N` badge in the toolbar down to the verified (or failed) region in the page content. This line would cross the boundary between the browser chrome (toolbar, address bar, tab strip) and the content area — something that is impossible for page JavaScript or WebAssembly to do, since page code is confined to the content viewport. This makes the line an unforgeable visual proof that the extension produced the result, not the page. As the user scrolls, the line tracks the region, and when the region scrolls out of view the line angles toward the top or bottom edge with an indicator (e.g., "2 more verified above ↑", "1 not verified below ↓") showing that other verifiable regions exist off-screen. This would require a new extension API from browser vendors — something like `chrome.action.drawTether(tabId, { x, y, color })` — since extensions today cannot paint outside the content area either.

- **Off-screen region hints**: Even without the tether line, the toolbar badge could show directional hints. When a verified region is above the current scroll position, a small `↑` appears beside the badge count; when below, `↓`. Clicking the badge could cycle through regions, scrolling each into view. This could potentially be done with current APIs (the content script reports scroll positions, the badge text updates), but the badge's 4-character limit makes it tight — `1/3↓` is borderline.

## What the extension cannot defend against

- **A user who doesn't read the domain**: If someone sees "✓ Verified" and doesn't check *by whom*, no amount of technical countermeasure helps. The authority chain exists to make "by whom" visible, but the user must look. A digital literacy education programme — teaching people that "verified" without "by whom" is meaningless — fills this gap. Schools, workplaces, and public campaigns could normalise the habit of checking the issuer domain the same way people (slowly) learned to check for HTTPS padlocks.
- **Compromised issuer infrastructure**: If the legitimate issuer's server is compromised, it could return "verified" for forged claims. This is outside the extension's scope — it's an infrastructure security problem.
- **Screenshot/recording fraud**: Someone can screenshot a verified result and present it as proof. The banner disclaimer addresses this, but social engineering is hard to prevent technically.
