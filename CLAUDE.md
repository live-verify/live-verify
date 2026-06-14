# Live Verify

Read [LLM.md](./LLM.md) before making changes — it is the canonical project context: architecture, normalization rules, trust model, test layout, and development guidelines.

Non-negotiable rules (detailed in LLM.md):
- `public/use-cases/index.json` is GENERATED — never hand-edit. Run `node scripts/generate-use-cases-index.js` after changing use-case .md files.
- Normalization logic lives only in `public/normalize.js` (canonical). After changing it: `npm run sync-shared`, and copy to `apps/android/app/src/main/assets/`.
- Fail loudly — never add retry, fallback, or graceful-degradation logic on your own initiative. Raise it as a question instead.
- All code files require an Apache 2.0 license header.
