---
layout: post
title: "Verification Speed and Trust in Document Authentication"
date: 2025-01-26
---

Live Verify as it exists today uses computer vision to detect registration marks on a physical document, crops to that region, performs OCR on the text within, normalizes that text according to specific rules, computes a SHA-256 hash, and then makes an HTTP GET request to a verification endpoint. The entire process takes several seconds from camera capture to final verification result.

The multi-second delay is actually acceptable for certain classes of printed claims. Consider a till receipt claiming a transaction occurred: the customer has already walked away from the point of sale, there is no time pressure, and a few seconds to verify authenticity is perfectly reasonable. Similarly, employment verification letters, academic transcripts, safety certifications, and other documents where the verification happens after the initial presentation can tolerate this latency without issue.

The situation changes dramatically if verification were built into an online application where the claim already exists as text in the page. Instead of capturing an image, detecting registration marks, and performing OCR, the browser could pre-verify claims as soon as the page loads. The text is already available in the DOM, normalization and hashing can happen instantly in JavaScript, and the verification endpoint can be fetched asynchronously before the user even scrolls to that section of the page. By the time a user looks at a claim, verification could already be complete and displayed.

Building this as a JavaScript library that web applications could include seems like the obvious next step. The library would scan the page for specially-marked claim elements, normalize their text content, compute hashes, and fetch verification endpoints. However, this introduces a significant trust problem: a malicious web application could include fake claim elements with fake verification results. The library running in the page context has no way to prove that its verification badges are genuine rather than spoofed by the page author.

The solution would be browser-native verification where the browser itself, not page-loaded JavaScript, performs the verification process. When a user taps or clicks a verified claim, the browser UI chrome (the area that web pages cannot write to or style) could briefly display "VERIFIED" or show verification details in a popup that is provably from the browser. This is similar to how browsers show SSL certificate information: the page cannot fake the padlock icon or the certificate viewer because those live in browser chrome, not page content.

QR codes offer an interesting middle ground for handheld phone verification scenarios. A QR code containing just the verification base URL (like https://example.com/employment-verifications/) would be quite small, perhaps Version 2 or 3, requiring only 1-2 cm square. However, this still requires OCR of the claim text to compute the hash that gets appended to the base URL, so it does not eliminate the multi-second delay.

Alternatively, a QR code could contain the entire claim text itself. For a typical employment verification of around 150-200 characters, this would require a Version 6 or 7 QR code, approximately 3-4 cm square. The receiving application would scan the QR code to get the full text, normalize it, compute the SHA-256 hash locally, and then fetch the verification endpoint. This approach has an advantage: the claim data is preserved even if the verification server goes offline, and verification can happen in two stages (immediate hash computation to show the claim, followed by network verification to confirm the issuer has not revoked it).

If you choose the QR code containing the full claim approach, you would still want the human-readable text printed on the document alongside the QR code. This serves multiple purposes: accessibility for people who cannot scan QR codes, transparency so humans can read what is being verified without needing to decode the QR, and redundancy in case the QR code is damaged. The layout would show the claim text with registration marks for OCR-based verification, and a QR code adjacent to or below that text containing the same claim data for faster scanning.

---

TODO before publishing:

- Add actual QR code size comparison photos or diagrams
- Test QR code with real employment verification text to confirm Version 6/7 estimate
- Research browser extension architecture for verification UI chrome access
- Consider privacy implications of pre-verification (does fetching verification URLs leak user behavior?)
- Add concrete example of JS library API for in-page verification
- Discuss how issuers could revoke claims (REVOKED endpoint response)
- Link to Live Verify GitHub repo and examples page
- Proofread for clarity and flow
- Add references to existing verification standards (if any)
- Consider adding a "Future Work" section for browser vendor proposals
