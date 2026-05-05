# Repository Instructions

Be concise.

## Project Context

This repository is the canonical CSI-Platform codebase for the active Haggly negotiation product.

Related legacy source lines:

- `https://www.haggly.io`
- `StepFatherGoose/haggly`
- `Octoclaw-ai/haggly`
- `StepFatherGoose/haggly-1`
- Product: cross-language marketplace negotiation phrase tool/PWA with guides, translation phrases, AdSense, and legacy Pro gating.

Keep legacy Haggly.io conceptually separate from this active product. Legacy code may be reused only when it clearly improves the current app.

Primary direction:

- Build a serious AI negotiation companion: "Grammarly for negotiation."
- It should understand user-provided deal context from text first, screenshots soon, and browser/desktop/mobile context later.
- It should ask pointed clarifying questions before recommending a proven strategy.
- It should diagnose leverage, missing information, likely counterpart incentives, and the next move.
- It should draft wording only after strategy is clear.
- The old Haggly v2 React/Vite code is useful starting material, but the product should not be named or treated as "Haggly v2" long term.

## Development

- Install dependencies with `npm install`.
- Run locally with `npm run dev`.
- Verify with `npm run lint`, `npm run test`, and `npm run build` when relevant.
- Do not commit secrets or `.env` files.
- Keep generated build output out of git.
