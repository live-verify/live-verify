# Frequently Asked Questions

### What makes this better than QR codes?

**Human readability, privacy, and professional appearance.** QR codes hide information, leak data to anyone with a camera, and create visual clutter. Live Verify uses the text humans already read as the verification input. See [text-is-king.md](text-is-king.md) for the full analysis.

### Why client-side? Why not use cloud services?

**Privacy.** Clip mode processes text entirely in the browser extension — nothing is uploaded. Camera mode uses on-device OCR, so images never leave your phone. The only data transmitted is the SHA-256 hash — a one-way fingerprint that reveals nothing about the document content.

### Will this work with ornate degree certificates?

**Yes, with Clip mode** — if you have a digital representation (CV claim, email, PDF), the browser extension verifies it instantly. **Not yet with Camera mode** — current OCR struggles with decorative fonts, seals, and embossing on traditional university diplomas. See [ocr-limitations.md](ocr-limitations.md) for details on current limitations and the on-device AI trajectory.

### How does this prevent fake receipts/degrees/licenses?

**Cryptographic hash** — Any change to the text (even one character) completely changes the SHA-256 hash. The verification endpoint will return 404 (not found) instead of 200 OK. See [Technical_Concepts.md: Hash Algorithms](Technical_Concepts.md#hash-algorithms).

**Domain binding** — The `verify:` URL specifies which organization to trust. A fake degree from `fake-university.com` won't verify against `degrees.ed.ac.uk`. Users see "VERIFIED by degrees.ed.ac.uk" not just a green checkmark. See [Technical_Concepts.md: Domain Binding](Technical_Concepts.md#domain-binding-text-determines-verification-authority).

**No hash on document** — The hash isn't printed, so you can't just photoshop the receipt and compute a new hash. You'd need to compromise the issuing organization's verification database.

### Can I verify documents without internet?

**Partially.** OCR happens 100% offline on your phone. But the final hash lookup (`https://example.com/hashes/abc123...`) requires network access to check if the hash is valid.

Future enhancement: Organizations could publish signed hash databases that you download periodically for offline verification (airline mode, remote locations, etc.).

### What about blockchain / QR codes / existing verification tech?

**No blockchain.** The trust anchor is the issuer's domain (DNS/TLS), not distributed consensus. No cryptocurrency, no transaction fees, no wallets. See [text-is-king.md](text-is-king.md) for a full comparison with QR codes, blockchain, PKI, Verifiable Credentials, and other established and emerging technologies.

### Is this free to use?

**For verifiers:** Yes, the client-side app is free and open source (Apache-2.0).

**For issuers:** Organizations decide whether to charge for verification lookups. Infrastructure cost is ~$0.000005 per verification (Cloudflare Workers example). Many universities/governments offer free verification as part of their mission. Commercial entities may charge. See [Verification_Charges.md](Verification_Charges.md) for detailed business models.

### Can organizations revoke credentials?

**Yes.** Instead of returning `{"status":"verified"}`, the verification endpoint can return `{"status":"revoked"}` or `{"status":"suspended"}`. The app shows a red "REVOKED by xyz.org" instead of green "VERIFIED". See [Technical_Concepts.md: Response Formats](Technical_Concepts.md#response-formats) for all status codes.

Medical licenses, professional certifications, security clearances — anything that can be revoked can use this status. See [../deep-dives/Medical_License.md](../deep-dives/Medical_License.md).

### What if I lose the physical document?

**Depends on the use case:**

- **Receipt verification** — You need the physical receipt text to compute the hash. If you lose it, you can't verify. (This is a feature — prevents someone finding a hash and claiming your receipt.)
- **Degree verification** — Universities can offer a portal where graduates log in and retrieve the normalized text + verification URL. You can regenerate the claim for your CV even if you lose the ornate certificate.
- **Medical licenses** — Regulatory bodies can provide license holders access to the normalized text.

The hash itself is useless without knowing what text to hash. Security through obscurity? No — security through requiring physical possession of the document (or authorized access to the issuer's portal).

### How do I create verifiable documents for my organization?

See [issuer-guide.md](issuer-guide.md) for the complete implementation guide.

**Quick overview:**
1. Generate certification text
2. Normalize it (see [../docs/NORMALIZATION.md](../docs/NORMALIZATION.md) and [Technical_Concepts.md: Text Normalization](Technical_Concepts.md#text-normalization))
3. Compute SHA-256 hash (see [Technical_Concepts.md: Hash Algorithms](Technical_Concepts.md#hash-algorithms))
4. Print text + `verify:your-org.com/c` with registration marks (see [Technical_Concepts.md: Registration Marks](Technical_Concepts.md#registration-marks-computer-vision-for-document-boundaries))
5. Host static file at `https://your-org.com/c/{HASH}` returning `{"status":"verified"}` (see [Technical_Concepts.md: Response Formats](Technical_Concepts.md#response-formats))

Infrastructure cost: ~$5 per million verifications (Cloudflare example).

### Does this work internationally?

**Yes.** The system is designed for global use:

- **Unicode text** — Supports any language (Chinese, Arabic, Cyrillic, etc.)
- **International domains** — Works with .uk, .de, .com.br, etc.
- **Public Suffix List** — Correctly identifies domain authority across global TLDs
- **No central authority** — Each organization runs their own verification endpoint

However, OCR accuracy may vary by language. On-device AI models continue to improve across language support.
