# AGENTS.md

Be concise.

## Project Context

This workspace should focus on the unnamed new product that grew out of the Haggly v2 work.

Related legacy product:

- `https://www.haggly.io`
- Source repo: `StepFatherGoose/haggly`
- Product: cross-language marketplace negotiation phrase tool/PWA with guides, translation phrases, AdSense, and legacy Pro gating.

Keep live `haggly.io` conceptually separate. It is a sentimental/free legacy product that may be rebuilt or monetized with ads later, but it is not the main product direction for this workspace.

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
- Verify changes with `npm run build`.
- Do not commit secrets or `.env` files.
- Keep generated build output out of git.
