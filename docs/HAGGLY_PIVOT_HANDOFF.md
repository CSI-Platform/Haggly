# Haggly Live Product Handoff

Last updated: 2026-05-05

## Current Decision

This workspace should now focus on the current live `haggly.io` product, not the abandoned Haggly v2 concept.

The live product is already its own coherent thing:

- `https://www.haggly.io`
- Source repo: `https://github.com/StepFatherGoose/haggly`
- Positioning: "Negotiate in any language. Tap a phrase, copy it, close the deal."
- Product shape: cross-language marketplace negotiation phrase tool/PWA.
- Audience: buyers, sellers, resellers, flippers, travelers, immigrants, and marketplace users crossing language barriers.

Haggly.io should remain Haggly.io: public, fun, useful, sentimental, free-first, and monetized through ads/content rather than a serious SaaS dashboard.

## What The Live Site Actually Is

Live-site inspection confirmed:

- 22-language phrase and UI system.
- Buyer/seller phrase generator.
- Popular phrases page.
- Custom translation path.
- City and marketplace guides.
- PWA/offline positioning.
- AdSense metadata and loader.
- Consent banner.
- Supabase/Stripe Pro auth and billing code.
- Pro gating for premium tones, recent phrases, custom translation, and share/listen/SMS/WhatsApp actions.

Key v1 files in `StepFatherGoose/haggly`:

- `index.html`
- `phrases.html`
- `translations.js`
- `ui-strings.js`
- `localize.js`
- `ads-loader.js`
- `consent.js`
- `pro-gating.js`
- `sw.js`
- `guides/*`
- `api/*`
- `supabase/schema.sql`

## Product Separation

Do not collapse Haggly.io into the v2 negotiation-chat concept.

Use this separation:

### Haggly.io

The current live product. Keep it as:

- Free cross-language marketplace negotiation phrase app.
- PWA/offline phrase utility.
- SEO/content asset.
- Ad-supported site.
- Possible lightweight AI-assisted translation/phrase helper later.

### Future Negotiation Companion

A separate app/project if pursued.

Possible concept:

- "Grammarly for negotiation."
- Reads text, screenshots, browser context, and eventually live desktop/mobile context.
- Asks pointed clarification questions.
- Diagnoses leverage.
- Recommends a proven strategy.
- Drafts wording only after strategy is clear.

It may reuse ideas from Haggly v2, but it should not inherit Haggly.io branding or assumptions unless the user explicitly decides otherwise.

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
- Anything that makes the live Haggly.io product harder to keep free and simple.

## Haggly.io Near-Term Strategy

Near-term work should make the current live product healthier:

1. Audit live repo against production.
2. Remove or unlock Pro paywalls if the goal is free/ad-supported.
3. Reconcile Pro copy and setup docs. Live Pro says `$1/month`; setup docs mention `$3/month`.
4. Restore or improve AdSense placement. The loader exists, but obvious ad units need review.
5. Verify `ads.txt`, consent, CSP, AdSense account metadata, and Search Console basics.
6. Keep or improve the 22-language phrase database.
7. Preserve PWA/offline behavior.
8. Improve marketplace/city guide SEO where useful.
9. Keep privacy posture simple: no account required for the core product.

## Experienced Dev Approach

An experienced developer would not start by rewriting either product.

They would:

- Freeze the current live site behavior in a short audit.
- Identify the exact production source repo, hosting target, env vars, analytics, AdSense, and billing dependencies.
- Decide the business rule first: free/ad-supported vs Pro subscription.
- Remove only the code paths that conflict with that decision.
- Keep small reversible branches.
- Preserve traffic, SEO, URLs, sitemap, robots, and PWA behavior.
- Verify with smoke tests against production-like pages before deploy.

The most important difference from a broad AI plan is discipline: treat live Haggly.io like a production asset with real search/traffic history, not a blank canvas.

## Non-Goals For Haggly.io Work

- Do not turn Haggly.io into the v2 dashboard/chat app.
- Do not start with a rewrite.
- Do not break existing URLs.
- Do not remove language coverage casually.
- Do not add a new AI backend before the free/ad-supported product direction is cleaned up.
- Do not build the screenshot/live-screen companion inside Haggly.io yet.
- Do not commit secrets or `.env` files.

## Cloud Codex Prompt

Use this prompt in Codex Cloud:

```text
You are working in CSI-Platform/Haggly.

Read AGENTS.md, docs/HAGGLY_V2_AGENT_PLAN.md, and docs/HAGGLY_PIVOT_HANDOFF.md.

Current decision:
This workspace now revolves around the current live haggly.io product, not the abandoned Haggly v2 concept.

Live product:
haggly.io is a cross-language marketplace negotiation phrase/PWA/content product. Keep it free-first, preserve the live site's SEO/traffic value, and prefer ad-supported monetization over Pro gating.

Source repo for live site:
https://github.com/StepFatherGoose/haggly

Task:
Create a concise migration/audit plan for shifting this workspace away from the old Haggly v2 conceptual frame and toward maintaining/improving the live haggly.io product. Include how to inspect the live repo, preserve URLs/SEO/PWA behavior, remove or unlock Pro paywalls safely, and restore AdSense/analytics without a rewrite.

Do not implement yet unless explicitly asked. Keep the answer practical, production-minded, and grounded in the current live site.
```
