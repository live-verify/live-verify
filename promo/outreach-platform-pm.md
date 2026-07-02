# Outreach — platform PMs (warm intro email template)

> **Draft for Paul to edit and send. Not a broadcast post — this is a 1:1 warm-intro template.**
> Audience: PMs who own a camera, browser, OS, or PDF-viewer roadmap (Apple, Google, Microsoft, Samsung,
> Adobe, Mozilla, Opera). The for-platforms.html page is already shaped for them; this email just gets them
> there. **Don't blast it; send it into warm intros.** Note the one honest gap — real-adopter evidence — and
> that it's actively being filled (see the founding-adopters work).

---

**Subject:** The step after Live Text — verifying whether the text is true

**Body:**

Hi [name],

Quick one, because it's squarely in your lane. Your platform already does the hard part: on-device OCR in the
camera, text selection in the browser and PDF viewer. The natural increment is verifying *what the OCR read* —
normalize the text the user already selected or scanned, SHA-256 it, GET the issuer's own domain, overlay the
answer. Four seconds, fully on-device except one hash lookup. "Verified / Revoked / Not found" is a natural
camera and text-selection overlay.

The timing is forced from outside: generative AI made visually perfect document forgery free, users will want an
"is this real?" gesture, and the platform owns the gesture. It's a safety feature, not a service — no accounts,
no server you run, no gatekeeper to become (trust roots in DNS, the same namespace that already says `gov.uk` is
the UK government).

There's an open standard, Apache-2.0, with iOS / Android / browser-extension reference implementations already
running the same canonical normalization code and cross-platform hash fixtures, so your team could prove interop
on day one. The intent is explicitly for platforms to take it over — no trademark ambitions, no tollbooth.

The one-pager written for your seat: https://live-verify.github.io/live-verify/for-platforms.html
Ten-second live demo (verify a claim, then edit it and watch it fail):
https://live-verify.github.io/live-verify/#tryIt

Straight about the current gap: the strongest thing I can't yet show you at scale is *breadth of live issuer
adoption* — that's the piece I'm building now (early pilot issuers and the first real deployments). Everything
else — the spec, the fixtures, the on-real-hardware evidence — exists today.

Worth 20 minutes? Happy to work around your calendar.

Best,
Paul
[paulhammant.com] · paul@hammant.org
