# Haggly Pivot Handoff

Last updated: 2026-05-04

## Core Thesis

Haggly should become "Grammarly for negotiation."

The product is an AI negotiation copilot that helps people stop leaving money on the table. It should read a negotiation situation, identify leverage, explain what is missing, recommend the next move, and draft wording only when wording is actually useful.

Do not position Haggly as a generic chat app or a script generator. The differentiated product is judgment: deal control, leverage diagnosis, concession discipline, and better next moves.

## Founder Edge

The founder has roughly 10 years of sales experience and direct car sales experience. That is the near-term advantage. The product should feel trained by someone who understands buyer psychology, salesperson tactics, dealership process, timing pressure, price anchoring, discount games, trade-ins, add-ons, financing, and when to walk.

Use that domain knowledge as the first prompt harness and quality bar.

## Product Directions

Haggly can support multiple verticals over time:

- Haggly Auto: car buyer negotiation against dealers or private sellers.
- Marketplace: Facebook Marketplace, Craigslist, OfferUp, and similar buyer/seller message help.
- Sales Coach: negotiation coaching for reps, founders, freelancers, agencies, and recruiters.
- Salary: job offer negotiation and compensation counter strategy.
- Vendor/Deal Desk: small business help for quotes, renewals, payment terms, and vendor agreements.

These should be modes under one negotiation brain, not unrelated products.

## Recommended First Wedge

Start with Haggly Auto or Haggly Sales Coach.

Haggly Auto is likely the fastest consumer wedge because buyers understand the stakes and can justify a one-time fee if the product helps save hundreds or thousands. The founder's car sales background gives credibility.

Haggly Sales Coach may have stronger founder-market fit because the founder has a decade in sales. It may support higher prices, but it will likely require clearer B2B positioning and more trust before purchase.

Do not build every mode at once. Choose one monetizable wedge, then make the core negotiation brain reusable.

## Revenue Strategy

Prioritize paid validation over infrastructure polish.

Start with one-off paid offers:

- $19 instant AI deal read.
- $49 deeper deal/listing/quote review.
- $149+ concierge coaching for a live deal.

Subscriptions, accounts, team workspaces, and full dashboards can wait until strangers pay for the core outcome.

## Extension Strategy

The Chrome/Facebook Marketplace extension idea is strong, but it should follow the web product.

Use the extension as a context bridge:

- User opens a listing, dealer page, email, or message thread.
- User intentionally sends selected context to Haggly.
- Haggly returns leverage read, next move, and message options in a side panel.

Do not build an automated scraper or message-sending bot. Keep the user in control of what is captured and sent.

## Current Repo State

The current repo already has:

- React/Vite/Tailwind frontend.
- Green v2 visual direction.
- Buyer/seller chat UI.
- Local conversation dashboard.
- Mock assistant mode.
- Prompt playbooks.
- Negotiation context engine.
- Vercel `/api/chat` route with OpenAI/Anthropic provider boundary.

The repo is clean on `main` as of 2026-05-04, and these commands passed locally:

- `npm run lint`
- `npm test`
- `npm run test:e2e`
- `npm run build`

## Near-Term Build Direction

The next branch should not start by redesigning backend infrastructure. It should create a sellable wedge.

Recommended immediate work:

1. Reposition the first screen around "Grammarly for negotiation."
2. Add mode selection that can support Auto, Marketplace, Sales, Salary, and Vendor later.
3. Pick one first paid wedge, likely Auto.
4. Build a focused Auto intake flow around listing price, target price, current offer, dealer/private seller, trade-in, financing, urgency, and walk-away number.
5. Add an Auto-specific prompt harness that uses the founder's sales/car-sales perspective.
6. Produce a structured output: leverage read, red flags, likely seller/dealer incentives, target counter, walk-away guidance, and exact wording.
7. Keep payment manual or use a simple payment link until demand is proven.

## Non-Goals For The Next Task

- Do not add login.
- Do not add a database.
- Do not build a full Chrome extension yet.
- Do not implement automated scraping.
- Do not build all vertical modes.
- Do not spend the task redesigning hosting unless it directly supports paid validation.
- Do not commit secrets or `.env` files.

## Cloud Codex Prompt

Use this prompt in Codex Cloud:

```text
You are working in CSI-Platform/Haggly.

Read AGENTS.md, docs/HAGGLY_V2_AGENT_PLAN.md, and docs/HAGGLY_PIVOT_HANDOFF.md.

Product thesis:
Haggly is "Grammarly for negotiation" - an AI negotiation copilot that diagnoses leverage, recommends the next move, and drafts wording only when useful.

Task:
Create a concise product strategy and implementation proposal for the first monetizable wedge. Compare Haggly Auto and Haggly Sales Coach, recommend one, and outline the smallest branch that could make Haggly sellable without adding login, database, subscriptions, or a Chrome extension.

Do not implement yet unless explicitly asked. Keep the answer practical, revenue-focused, and grounded in the current repo.
```
