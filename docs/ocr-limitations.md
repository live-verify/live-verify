# Camera Mode: OCR Limitations

Camera mode relies on on-device OCR to extract text from physical documents. OCR quality varies by platform, document type, and script.

## Platform Differences

**iOS (Apple Vision framework)** is significantly ahead of Android for Live Verify's use case:
- Vision framework handles mixed fonts, varying sizes, and complex layouts well
- Live Text (iOS 15+) already extracts text from camera feeds in real time on hundreds of millions of devices
- Strong support for Latin, CJK, Arabic, Devanagari, and other scripts
- Consistent behaviour across devices (Apple controls the full stack)

**Android (Google ML Kit)** is functional but less consistent:
- ML Kit's on-device text recognition works well for clean, structured documents
- Performance and accuracy vary across devices (fragmented hardware/chipset landscape)
- Google Lens offers superior OCR but runs partly in the cloud — not suitable for Live Verify's privacy model
- Script support is narrower than iOS for on-device processing; CJK and Arabic are supported but with lower accuracy on some devices

## Script and Character Challenges

**European diacritics** (é, ü, ø, ß, ł, etc.) are generally handled well by both platforms for common languages (French, German, Spanish, Portuguese, Nordic). The `charNormalization` field in `verification-meta.json` can map accented characters to ASCII equivalents where appropriate, giving OCR a margin of error.

**Non-Latin scripts** present varying challenges:
- **CJK (Chinese, Japanese, Korean):** Both platforms have good support, but character-level accuracy matters more — a single wrong character changes the hash. Japanese mixed-script text (kanji + hiragana + katakana + romaji) is particularly challenging.
- **Arabic/Hebrew (RTL):** OCR engines sometimes struggle with right-to-left text direction, ligatures, and contextual letter forms. Bidirectional text (mixing Arabic and Latin) adds complexity.
- **Devanagari/Thai/Bengali:** Supported but with lower accuracy, especially for connected scripts where character boundaries are ambiguous.
- **Cyrillic:** Generally well supported, but visually similar characters across Latin/Cyrillic (а/a, о/o, р/p) can cause silent misrecognition that changes the hash.

**Normalization mitigates some of this:** The `charNormalization` and `ocrNormalizationRules` fields in `verification-meta.json` allow issuers to define mappings that absorb common OCR errors for their specific documents and languages.

## Document Type Feasibility

| Document Type                     | OCR Feasibility      | Why                                                                    |
|-----------------------------------|----------------------|------------------------------------------------------------------------|
| ✅ CV/resume text claims           | **Works now**        | Plain fonts (Arial, Times), simple layout, no decorations              |
| ✅ Employment verification letters | **Works now**        | Business letter format, standard fonts, clean layout                   |
| ✅ Till receipts                   | **Works now**        | Monospace fonts, structured format, thermal printing                   |
| ✅ Medical license wallet cards    | **Works now**        | Small but usually plain text, standard government fonts                |
| ✅ Simple certificates             | **Works now**        | If designed with OCR in mind - plain borders, standard fonts           |
| 🟡 Government IDs                 | **Could work maybe** | Can a text section be made that's separate to the photo/hologram       |
| ❌ Ornate degree certificates      | **Needs tech leap**  | Decorative fonts, calligraphy, seals, signatures, embossing, gold foil |
| ❌ Art authenticity certificates   | **Needs tech leap**  | Fancy typography, gallery branding, artistic layouts                   |
| ❌ Historical documents            | **Needs tech leap**  | Aged paper, faded ink, handwriting, non-standard fonts                 |

## The Ornate Certificate Problem

Traditional university degrees, professional certifications, and art certificates are designed for **human prestige**, not machine readability:
- Gothic/blackletter fonts for institution names
- Cursive signatures from officials
- Embossed seals and raised ink
- Watermarks and security features
- Gold foil and decorative borders
- Multiple font sizes and styles
- Background patterns and imagery

OCR engines struggle with these elements — accuracy drops from 95%+ (plain text) to <50% (ornate certificates).

**Practical solutions today:**

1. **Multi-representation claims** — The same credential can have MULTIPLE valid hashes (long-form, medium-form, short-form, etc.). See [Multi_Representation_Verification.md](Multi_Representation_Verification.md) for how universities can support ornate wall certificates AND OCR-friendly CV claims AND social media profiles — unlimited representations of the same legal fact.

2. **OCR-optimized originals** — Organizations can print certificates with:
   - Registration marks around a plain-text verification box
   - Decorative elements OUTSIDE the scannable area (decoy text outside the registration marks)
   - Standard fonts (Courier New, Arial) in the verification zone

3. **Manual text entry** — For ornate certificates, users could type the text manually rather than relying on OCR (loses convenience but maintains verification)

## Future: On-Device AI

Modern phones already have neural processing units (NPUs) running sophisticated AI models **entirely on-device**:
- **Apple Intelligence** (iPhone 15 Pro+, A17 Pro chip) — vision models, document understanding
- **Google on-device Gemini** (Pixel 9+, Tensor G4 chip) — multimodal AI including OCR
- **Samsung Galaxy AI** (S24+, Snapdragon 8 Gen 3) — on-device vision processing
- **Qualcomm AI Engine** — NPUs in most modern Android phones

These on-device AI models can:
- Match or exceed cloud OCR quality
- Handle ornate certificates, decorative fonts, calligraphy
- Process handwritten signatures and aged documents
- Understand multiple languages simultaneously
- Detect and mask decorative elements intelligently
- **Still 100% on-device** — images never leave the phone

**Projected timeline:**
- Plain text receipts/letters: ✅ Works today
- Business documents/wallet cards: ✅ Works today
- Ornate certificates: 🔜 On-device AI (2026+)
- Handwritten documents: 🔜 On-device AI (2026+)
- Historical documents: 🔜 On-device AI (2027+)

**Bottom line:** For digital documents, use Clip mode (browser extension) — it sidesteps OCR entirely and works reliably today. Camera mode works well for plain-text physical documents. On-device AI will extend Camera mode to harder document types without compromising privacy.
