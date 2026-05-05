# Unnamed Negotiation Companion Handoff

Last updated: 2026-05-05

## Current Decision

This workspace should focus on the unnamed new product that grew out of the Haggly v2 work.

The new product is not the current live `haggly.io` site and should not be called "Haggly v2" long term.

## Legacy Haggly.io

- `https://www.haggly.io`
- Source repo: `https://github.com/StepFatherGoose/haggly`
- Positioning: "Negotiate in any language. Tap a phrase, copy it, close the deal."
- Product shape: cross-language marketplace negotiation phrase tool/PWA.
- Audience: buyers, sellers, resellers, flippers, travelers, immigrants, and marketplace users crossing language barriers.

Haggly.io should remain its own thing: public, fun, useful, sentimental, free-first, and potentially ad-supported later. The user never fully completed its monetization setup and anticipates possibly rebuilding it eventually.

Do not let legacy Haggly.io block or define the new product.

## New Product Thesis

The new product is "Grammarly for negotiation."

It is an AI negotiation companion that understands the sales situation, asks pointed clarification questions, and recommends a proven strategy before drafting wording.

Core loop:

1. User provides deal context.
2. App extracts the negotiation situation.
3. App identifies missing information.
4. App asks concise clarification questions when needed.
5. App diagnoses leverage and counterpart incentives.
6. App recommends the next move.
7. App drafts wording only after the strategy is clear.

The product should feel like a trusted sales/negotiation advisor, not a generic chat app or canned script generator.

## Context Surfaces

Start simple, then expand:

1. Text/paste intake.
2. Screenshot upload or clipboard image paste.
3. Browser extension side panel.
4. Desktop/live-screen context.
5. Mobile share sheet or native mobile capture.

The Chrome extension is likely a strong eventual interface, but it should not be the first hard dependency. Prove the core intelligence with text and screenshots first.

## Founder Edge

The founder has roughly 10 years of sales experience and direct car sales experience. Use this as the quality bar for prompts and strategy:

- Deal control.
- Counterpart psychology.
- Salesperson/dealer tactics.
- Price anchoring.
- Concession discipline.
- Trade-in, financing, add-ons, and urgency pressure.
- Knowing when to walk.

## Current Repo Starting Point

This repo already has useful starting material:

- React/Vite/Tailwind frontend.
- Green v2 visual direction.
- Buyer/seller chat UI.
- Local conversation dashboard.
- Mock assistant mode.
- Prompt playbooks.
- Negotiation context engine.
- Vercel `/api/chat` route with OpenAI/Anthropic provider boundary.

Useful files:

- `src/features/chat/*`
- `src/features/negotiation/negotiationContext.js`
- `src/lib/ai/*`
- `src/lib/prompts/promptAssembler.js`
- `prompts/playbooks/*`
- `docs/HAGGLY_V2_AGENT_PLAN.md`

## Newly Discovered Source Material

Discovered and cloned locally on 2026-05-05:

- Repo: `https://github.com/StepFatherGoose/haggly_v2`
- Local intake path: `C:\Users\codyl\Desktop\csiOS\DATA-DUMP\GitHub-Intake\StepFatherGoose-haggly_v2`
- Main app path inside repo: `haggly-v2/`

This is previously unseen material relative to `CSI-Platform/Haggly`. It is a full Next.js 16 / React 19 / Tailwind 4 product line with Supabase auth, deal history, Stripe billing, promo-code Pro gating, i18n routing, Twilio webhook/worker code, and a Chrome MV3 marketplace overlay.

High-value files to review before rebuilding those features:

- `haggly-v2/PROJECT_STATUS.md`
- `haggly-v2/ANTIGRAVITY_HANDOFF.md`
- `haggly-v2/src/components/dashboard/chat-interface.tsx`
- `haggly-v2/src/app/api/negotiate/analyze/route.ts`
- `haggly-v2/src/app/api/negotiate/generate/logic.ts`
- `haggly-v2/src/lib/ai/prompts/*`
- `haggly-v2/src/lib/actions/deals.ts`
- `haggly-v2/src/app/api/webhooks/twilio/*`
- `haggly-v2/extension/*`
- `haggly-v2/supabase/migrations/*`

Use this repo as reference material, not as the new active base by default. The active `CSI-Platform/Haggly` repo is smaller and cleaner for proving the core negotiation loop. Migrate pieces only when they directly support text/screenshot intake, leverage analysis, clarification questions, strategy output, or a later extension surface.

## Product Separation

Keep these products separate:

### Haggly.io

Legacy/free phrase and translation product.

Possible future work:

- Unlock/remove paywalls.
- Restore or improve ads.
- Preserve the cross-language phrase/PWA utility.
- Rebuild later if needed.

### Unnamed New Product

Main focus for this workspace.

Direction:

- "Grammarly for negotiation."
- AI negotiation companion.
- Sales-situation understanding.
- Clarification-first strategy.
- Screenshot/live-context path.
- Browser/mobile surfaces later.

## Reuse Guidance

Reusing engine pieces is acceptable if they are cleanly extracted.

Safe to reuse:

- Negotiation context logic.
- Prompt playbook ideas.
- Provider boundary patterns.
- "Diagnose before drafting" behavior.
- Car/marketplace/sales domain notes.

Do not reuse blindly:

- Haggly.io brand for the new app.
- V2 dashboard framing.
- Buyer/seller-only route structure.
- Local dashboard assumptions.
- Old Pro/paywall assumptions.
- Anything that makes the new product feel like a patched version of the legacy site.

## Near-Term Strategy

Build the new product around the core intelligence loop before chasing complex capture surfaces.

Recommended next build sequence:

1. Rename/reposition the product away from "Haggly v2" in docs and UI.
2. Keep the current chat shell as the initial surface.
3. Add structured deal intake and an explicit clarification state.
4. Add screenshot/image upload to chat.
5. Extend the model client for multimodal input.
6. Add output contracts for leverage read, missing info, questions, strategy, and draft.
7. Test with auto, marketplace, and sales scenarios.
8. Only after that, design the Chrome side panel extension.

## Experienced Dev Approach

An experienced developer would not start with a full rewrite or extension-first build.

They would first:

- Clarify the product loop and first wedge.
- Keep the working React/Vite shell if it is serviceable.
- Extract reusable negotiation logic instead of rewriting.
- Add screenshot/vision support behind the existing API boundary.
- Keep branches small and reversible.
- Create tests around prompt assembly, context extraction, and API payload shape.
- Avoid over-investing in Chrome/mobile/live-screen capture until text+screenshot strategy feels strong.

The core confidence question is not whether the app can capture context. It can. The hard part is whether it gives better negotiation judgment than a generic chatbot.

## Non-Goals For The Next Task

- Do not work on live Haggly.io unless explicitly asked.
- Do not rename the legacy site.
- Do not build the Chrome extension first.
- Do not build mobile capture first.
- Do not add accounts, billing, or database until the core loop works.
- Do not carry over the old Haggly.io Pro/paywall assumptions.
- Do not treat the current v2 UI as sacred.
- Do not commit secrets or `.env` files.

## Cloud Codex Prompt

Use this prompt in Codex Cloud:

```text
You are working in CSI-Platform/Haggly.

Read AGENTS.md, docs/HAGGLY_V2_AGENT_PLAN.md, and docs/HAGGLY_PIVOT_HANDOFF.md.

Current decision:
This workspace should focus on the unnamed new product that grew out of Haggly v2, not on the current live haggly.io site.

Legacy product:
haggly.io is a separate cross-language marketplace phrase/PWA product. Do not let it define this new product.

New product thesis:
An AI negotiation companion: "Grammarly for negotiation." It should understand deal context from text first, screenshots soon, and browser/desktop/mobile context later. It should ask pointed clarification questions before recommending a proven strategy, then draft wording only after strategy is clear.

Task:
Create a concise product and technical plan for cleanly splitting the new unnamed negotiation companion from both legacy haggly.io and the old "Haggly v2" framing. Recommend the smallest implementation branch that proves the core loop with text and screenshot intake before Chrome/mobile/live-screen capture.

Do not implement yet unless explicitly asked. Keep the answer practical, product-focused, and grounded in the current repo.
```
