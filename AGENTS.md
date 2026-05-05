# AGENTS.md

Be concise.

## Project Context

This workspace should now revolve around the current live `haggly.io` product and its production codebase, not the abandoned Haggly v2 concept.

Current live product:

- `https://www.haggly.io`
- Source repo: `StepFatherGoose/haggly`
- Product: cross-language marketplace negotiation phrase tool/PWA with guides, translation phrases, AdSense, and legacy Pro gating.

The React/Vite v2 work in this repo is now reference material only. Do not let its dashboard/chat-app framing drive future product decisions unless the user explicitly asks to revive it.

Primary direction:

- Keep `haggly.io` as the sentimental/free public product.
- Preserve and improve its cross-language marketplace negotiation utility.
- Prefer unlocking/removing paywalls and restoring ad-supported monetization.
- Treat any serious screenshot/live-context negotiation companion as a separate future app that may reuse engine ideas but should not replace `haggly.io`.

## Development

- Install dependencies with `npm install`.
- Run locally with `npm run dev`.
- Verify changes with `npm run build`.
- Do not commit secrets or `.env` files.
- Keep generated build output out of git.
