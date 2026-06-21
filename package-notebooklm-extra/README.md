# NotebookLM extra descriptions

These Markdown files describe parts of the Live Verify repo that **NotebookLM
cannot read or parse from the source tree itself**:

- `apps-architecture.md` — the three client apps (iOS Swift, Android Kotlin,
  browser extension). **Summaries**, because NotebookLM can't parse Swift/Kotlin.
- `canonical-verification-logic.md` — the canonical JavaScript verification
  logic. **Description + real source**, because the JS is small and the exact
  normalization rules are the reproducible heart of the system.
- `website-pages-and-flows.md` — the public website's pages, content, and
  cross-page flows.
- `verification-flows-and-overlays.md` — the interactive verification flows,
  on-screen overlays/result states, and the demo/training documents.

These are committed (unlike the generated `package-notebooklm/` output) because
they are authored content, not a mechanical concatenation. The packaging script
`scripts/package-for-notebooklm.js` folds them into a `system-architecture.md`
bundle in the generated output.

To refresh them after substantial app/JS/website changes, re-derive from the
current sources (they were produced by reading the actual files). Keep them
accurate — NotebookLM reasons from them as if they were ground truth.
