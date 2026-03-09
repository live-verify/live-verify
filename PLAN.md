# Plan: Authority Chain Display in Apps

On successful verification, the iOS, Android, and Chrome extension apps should display the authority chain as indented lines — mirroring the format described in `docs/authority-chain-app-display.md`:

```
✓ hr.example-corp.co.uk — Lists currently employed UK staff
  ✓ hmrc.gov.uk — Governs UK salary/wage tax collection
    ✓ gov.uk — UK government root namespace
```

## Work required

1. **All apps:** Walk the `authorizedBy` chain from `verification-meta.json` at each node, stopping at hardcoded root trust anchors (`gov.uk/verifiers`, `usa.gov/verifiers`, `india.gov.in`, etc.) or max depth 3
2. **All apps:** Display each node as: ✓ domain — description (from that node's `verification-meta.json` `description` field)
3. **All apps:** Support tap/hover to show `formalName` (the stuffy official title)
4. **All apps:** Show broken chains (✗ NOT CONFIRMED) when any node returns 404
5. **All apps:** Hardcode root trust anchor list (government roots + treaty-based orgs), updatable via app updates
6. **Chrome extension:** Currently shows rich JSON payload (headshot, message) — chain display should appear below or alongside this
7. **Android (`VerificationLogic.kt`):** Currently discards response body on 200 — needs to fetch `verification-meta.json` and walk chain
8. **iOS (`VerificationClient.swift`):** Same gap as Android — needs chain walk and display in `ResultView.swift`

See `docs/authority-chain-app-display.md` for the full UX spec including per-path descriptions, multi-language support, and federal vs. state authority examples.
