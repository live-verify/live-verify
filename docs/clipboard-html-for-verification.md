# Clipboard HTML for Verifiable Documents

## Current State

Copying text from a webpage is straightforward: click, drag to extend selection, Ctrl+C. All major browsers behave identically. But what goes on the clipboard?

By default, plain text. And plain text loses context. When a user copies a verifiable claim (see our [employment reference selection demo](../public/use-cases/slides/employment-references-1.html)), the clipboard gets only the characters. The semantic structure—the fact that this is a verifiable block with a `verify:` line—is lost.

The good news: browsers already support `text/html` on the clipboard. We just need to use it.

## What the Clipboard Actually Holds

### The Old Way: RTF

RTF (Rich Text Format) was [introduced by Microsoft in 1987](https://askanydifference.com/difference-between-rtf-and-html-with-table/) as a document interchange format. It worked well for desktop apps—Word, WordPad, legacy email clients—but predates the web.

### The Modern Standard: HTML

The [Clipboard API specification](https://alexharri.com/blog/clipboard) now mandates only three data types:

- `text/plain`
- `text/html`
- `image/png`

That's it. RTF isn't even in the mandatory list. When you paste into a modern app like Gmail or Google Docs, it [prioritizes `text/html` if available](https://www.xjavascript.com/blog/how-can-i-copy-rich-text-contents-to-the-clipboard-with-javascript/). HTML has become the universal rich-text interchange format.

Desktop apps like Word still place [many formats on the clipboard](https://learn.microsoft.com/en-us/answers/questions/5186909/retaining-formatting-when-copying-text-into-a-gmai) for backward compatibility, but the web has standardized on HTML. This is good news for us—our verifiable documents are already HTML.

## What We'd Want for Verifiable Documents

For Live Verify, we need richer clipboard options:

### 1. Integral HTML Structure

The complete DOM structure of the selected region, including:
- Element hierarchy (`div`, `span`, `pre`, etc.)
- Data attributes (`data-verify-line`, `verifiable-text`, etc.)
- IDs and classes that identify the verifiable region

This preserves the *semantic meaning* of the content, not just its appearance.

### 2. Integral HTML with Inline Styles

Same as above, plus computed styles inlined:
```html
<div style="font-family: 'Courier New', monospace; background: #f8fafc; padding: 20px;">
  <span data-verifiable="true">Acme Corporation
John D. Smith
Senior Software Engineer
March 2020 — October 2025

Eligible for Rehire

verify:acme-corp.com/staff</span>
</div>
```

This allows the receiving application to render it faithfully while retaining the verification metadata.

## Use Case: Expense Reports

Consider the workflow:

1. **User receives** a verifiable receipt via email
2. **User copies** the receipt into their company's expense application
3. **Expense app stores** the integral HTML as the authoritative source
4. **Months later**, during audit, the expense app can re-verify the receipt by:
   - Extracting the text content
   - Normalizing it (our standard pipeline)
   - Checking the hash against the issuer's domain

### What the Expense App Might Do

The receiving application should be free to make *stylistic* changes:

- **Force high contrast** for accessibility
- **Remove invisible characters** (fingerprinting, steganography)
- **Adjust fonts** to match corporate standards
- **Reflow text** for different viewport sizes

But it must preserve:

- The actual text content
- The `verify:` line
- Enough structure to re-extract the verifiable region

## Why Not XML/XSL?

Purists might argue for a formal schema—XML with XSL transforms for presentation. But this adds complexity that isn't necessary:

1. **HTML is already structured** — A well-formed verifiable block is parseable
2. **CSS handles presentation** — No need for a separate transform language
3. **AI can extract structure** — In 2026, extracting structured data from structured HTML is trivial; LLMs do it routinely
4. **Adoption barrier** — XML/XSL requires tooling that web developers don't have; HTML/CSS is universal

The goal is *practical interoperability*, not theoretical purity.

## Browser Implementation

Browsers would need to:

1. Detect when a selection includes a verifiable region (via `data-verify-line` or similar markers)
2. Offer enhanced clipboard options:
   - "Copy as text" (current behavior)
   - "Copy as verifiable HTML"
   - "Copy as verifiable HTML with styles"
3. Potentially show a small indicator when verifiable content is selected

This could be implemented via:
- Browser extensions (near-term)
- Web standard proposal (longer-term)
- Native browser feature (ideal)

## Recommendations for Application Developers

### Web Apps: Don't Settle for `<textarea>`

A plain `<textarea>` only receives `text/plain`. If a user pastes a verifiable document, you lose the HTML metadata. Instead:

```javascript
// Intercept paste and check for HTML
document.addEventListener('paste', (e) => {
  const html = e.clipboardData.getData('text/html');
  const plain = e.clipboardData.getData('text/plain');

  if (html && html.includes('data-verify-line')) {
    // Verifiable content detected - store the HTML
    e.preventDefault();
    handleVerifiablePaste(html, plain);
  }
  // Otherwise, let default behavior proceed
});
```

Even if your UI displays plain text, **store the HTML** in your backend. You can always extract the text for display, but you can't reconstruct the HTML from text.

### Desktop Apps: Parse HTML, Store Text

Native frameworks (Qt, WPF, Swing, Cocoa) typically parse incoming HTML and convert it to their own rich-text representation—QTextDocument, FlowDocument, StyledDocument, NSAttributedString, etc.

For verifiable documents:

```python
# Pseudocode for desktop apps
clipboard_html = clipboard.get('text/html')
clipboard_text = clipboard.get('text/plain')

if clipboard_html and 'data-verify-line' in clipboard_html:
    # Parse HTML for display using native rich-text
    native_doc = framework.parse_html(clipboard_html)
    display_in_ui(native_doc)

    # But store the plain text for verification
    store_for_verification(clipboard_text)

    # Store original HTML too (audit trail, fallback if parsing has bugs)
    store_original_html(clipboard_html)
else:
    handle_plain_text(clipboard_text)
```

The key insight: the native rich-text model handles *display*, but verification always uses the *plain text*.

### Expense Apps, HR Systems, Document Management

For applications likely to receive verifiable documents:

1. **Always check for `text/html`** on paste, even in "plain text" fields
2. **Store both formats** — the HTML for display, the text for re-verification
3. **Add a visual indicator** when verifiable content is detected ("✓ Verifiable receipt detected")
4. **Verify immediately** — check the hash on paste; warn if verification fails
5. **Preserve for audit** — keep the original HTML throughout the retention period

### What NOT to Do

- Don't silently discard HTML and keep only plain text
- Don't modify the text content (even whitespace normalization should happen at verification time, not storage time)
- Don't strip `data-*` attributes when sanitizing HTML

## Receiving Application Responsibilities

Applications that accept verifiable HTML should:

1. **Store the original** — Keep the integral HTML as received
2. **Verify on ingest** — Check the hash immediately; flag if verification fails
3. **Re-verify on demand** — Support re-verification during the retention period
4. **Preserve text fidelity** — Never modify the verifiable text content
5. **Document transformations** — Log any stylistic changes made

## The Text-to-Hash Foundation

Regardless of how fancy the clipboard gets, verification always reduces to:

```
selected_text → normalize() → sha256() → check against issuer
```

The integral HTML is a *transport format* that preserves context. But the actual verification is always text-to-hash. This means:

- Styling changes don't break verification
- The verifiable text is the single source of truth
- Recipients can strip all formatting and still verify

## Summary

| Clipboard Format | Use Case | Verification Possible? |
|------------------|----------|------------------------|
| Plain text | Basic copy/paste | Yes (current approach) |
| RTF | Legacy apps (Word, etc.) | Yes, with extraction |
| Basic HTML | Web apps | Yes, with extraction |
| **Integral HTML** | Verifiable document workflows | Yes, with preserved metadata |
| **Integral HTML + Styles** | Full-fidelity archival | Yes, with preserved metadata + rendering |

The clipboard is an underutilized channel. By standardizing richer representations for verifiable content, we enable workflows where documents can be copied, pasted, stored, restyled, and still verified—without ever leaving the familiar copy/paste paradigm.