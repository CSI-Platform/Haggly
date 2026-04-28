# Haggly v2 Agent Plan

Last updated: 2026-04-28

## Decision Summary

Haggly v2 should launch as a no-login app first.

The MVP is a green-leaning, no-paywall AI negotiation chat app with a lightweight local dashboard. "Green" means visual direction and brand feel, not a sustainability claim.

Do not build account login, billing, Stripe, or a hidden member dashboard for the first v2 launch. Those can come after the chat experience proves useful.

## Product Target

The first useful version should let a visitor:

1. Open Haggly without logging in.
2. Choose buyer or seller mode.
3. Describe the negotiation.
4. Chat with an AI negotiation assistant.
5. Copy suggested responses.
6. See recent negotiation sessions in a local dashboard.

Local browser storage is acceptable for MVP. If a user clears browser data, their history disappears.

## Non-Goals For MVP

- User accounts
- Paid plans
- Stripe
- Team/workspace accounts
- Database-backed user history
- Complex analytics
- Marketplace URL scraping
- Screenshot/image extraction
- Replacing the live `www.haggly.io` site immediately

## Current Repo State

The repo currently contains a React/Vite/Tailwind prototype imported from `StepFatherGoose/haggly-1`.

Useful current assets:

- `src/utils/messageGenerator.js`: deterministic negotiation classification and fallback message generation.
- `research/NLP_NEGOTIATION_STRATEGIES.md`: negotiation playbook material.
- `scripts/CAR_NEGOTIATION_SCRIPTS.md`: buyer/seller car negotiation scripts.
- `src/components/CopyButton.jsx`: reusable copy interaction.
- `src/components/ResponseCard.jsx`: reusable response-card pattern.

Main current problems:

- `src/App.jsx` owns too much.
- Buyer flow is only a placeholder.
- No real chat.
- No AI API boundary.
- No tests.
- `npm run lint` is defined but ESLint is not installed/configured.
- Current styling is purple/blue, not the intended v2 direction.

## Build Strategy

Use vertical slices. Do not build a huge frontend and huge backend separately.

Preferred sequence:

1. Make the repo safe for agents.
2. Split the app into stable feature boundaries.
3. Build the dashboard/chat UI with mock responses.
4. Add local conversation storage.
5. Add one real AI API route.
6. Deploy preview.
7. Test privately.
8. Cut over `www.haggly.io` only when v2 is ready.

## Agent Rules

Use this workflow for Codex, Claude Code, or any other AI worker:

1. One GitHub issue per chunk.
2. One branch per issue.
3. One PR per branch.
4. No direct commits to `main`.
5. Each issue must list owned files.
6. Each PR must pass CI.
7. Another AI or human reviews before merge.
8. No secrets in repo.
9. Do not touch unrelated files.
10. Keep PRs small enough to review in one sitting.

Branch naming:

```text
agent/<issue-number>-short-name
```

Examples:

```text
agent/001-test-foundation
agent/002-app-structure
agent/003-chat-shell
```

## Codex vs Claude Code vs Local Models

This is a practical division of labor, not a permanent ranking.

Reference docs:

- Codex: https://developers.openai.com/codex/cloud
- Claude Code: https://code.claude.com/docs/en/overview

### Where Codex Should Lead

Use Codex for:

- Repo-wide planning and task breakdown.
- Turning product goals into agent-safe issue plans.
- Multi-file refactors with strict file ownership.
- CI, tests, GitHub workflow setup, and PR hygiene.
- Reviewing diffs for regressions and missing verification.
- Work that benefits from structured checklists and explicit acceptance criteria.
- Coordinating parallel agents or background tasks.

Codex is a good lead agent when the task is: "Make this repo safer, cleaner, and easier for multiple agents to work in."

### Where Claude Code Should Lead

Use Claude Code for:

- Fast local terminal work.
- Iterating directly inside a checked-out repo.
- Exploratory refactors where it can inspect, edit, run commands, and revise quickly.
- Writing tests for an existing function or component.
- Running repeated local loops like lint/test/fix.
- Working from a detailed issue with clear owned files.
- CLI-heavy workflows, especially when you want to watch or steer the process.

Claude Code is a good implementation agent when the task is: "Here is one scoped issue; edit these files, run checks, and open a PR."

### Where Local Models Fit

Use local models only for low-risk helper work:

- Summarizing files.
- Drafting copy variants.
- Generating test ideas.
- Reviewing docs for clarity.
- Small refactor suggestions.

Do not give local models:

- API keys.
- Deployment credentials.
- Auth/payment work.
- Broad repo-write permission.
- Ambiguous "build the app" tasks.

## Recommended First Issues

### Issue 001: Test And Lint Foundation

Goal: make the repo safe for agent work.

Owned files:

- `package.json`
- `package-lock.json`
- `.github/workflows/ci.yml`
- `vite.config.js`
- new test/lint config files
- new tests under `src/**/*.test.*`

Tasks:

- Add ESLint config that works with React.
- Add Vitest.
- Add tests for offer classification and counter-offer behavior.
- Update CI to run lint, test, and build.
- Remove or fix any broken script.

Acceptance criteria:

- `npm run lint` passes.
- `npm test` passes.
- `npm run build` passes.
- GitHub Actions runs all three.

Suggested agent:

- Codex or Claude Code.

### Issue 002: Split App Structure

Goal: make the app easy for multiple agents to edit.

Owned files:

- `src/App.jsx`
- `src/main.jsx`
- new `src/pages/*`
- new `src/layouts/*`
- new `src/features/*`

Tasks:

- Move landing screen out of `App.jsx`.
- Move buyer screen out of `App.jsx`.
- Move seller screen out of `App.jsx`.
- Add a small app shell.
- Keep behavior the same.

Acceptance criteria:

- User can still pick buyer/seller.
- Seller generator still works.
- Buyer placeholder still renders.
- Build and tests pass.

Suggested agent:

- Codex for the boundary design, Claude Code for implementation.

### Issue 003: Green v2 Design System

Goal: establish the v2 visual foundation.

Owned files:

- `tailwind.config.js`
- `src/index.css`
- new `src/components/ui/*`
- affected page/component files from Issue 002

Tasks:

- Replace purple/blue theme with a restrained green-forward palette.
- Create reusable button, card, input, badge, and page-shell components.
- Remove purple heart/footer copy.
- Keep layout mobile-friendly.

Acceptance criteria:

- App clearly feels like Haggly v2.
- UI uses shared components instead of one-off styles.
- No text overlaps on mobile.
- Build and tests pass.

Suggested agent:

- Codex for UI system and review; Claude Code can implement if given exact files.

### Issue 004: Mock Chat MVP

Goal: replace the one-shot form shape with the first chat experience.

Owned files:

- new `src/features/chat/*`
- affected seller/buyer page files
- `src/components/CopyButton.jsx`

Tasks:

- Add chat transcript component.
- Add message composer.
- Add assistant/user message bubbles.
- Add loading state.
- Use mock AI responses first.
- Preserve copy-to-clipboard behavior.

Acceptance criteria:

- User can send a message.
- Assistant returns a mock response.
- Messages stay visible in the current session.
- No backend or API key required.

Suggested agent:

- Claude Code or Codex.

### Issue 005: Local Dashboard And Storage

Goal: create the no-login dashboard.

Owned files:

- new `src/features/dashboard/*`
- new `src/lib/storage/*`
- affected app shell/page files

Tasks:

- Save conversations to `localStorage`.
- Show recent conversations.
- Support status values: `active`, `accepted`, `declined`, `archived`.
- Let user reopen a conversation.
- Let user clear local history.

Acceptance criteria:

- Refreshing the page keeps local conversations.
- No login required.
- No database required.
- Build and tests pass.

Suggested agent:

- Codex for data boundary; Claude Code for UI implementation.

### Issue 006: Negotiation Context Engine

Goal: turn the old generator into structured context for AI.

Owned files:

- `src/utils/messageGenerator.js`
- new `src/features/negotiation/*`
- tests for negotiation logic

Tasks:

- Export/test offer classification.
- Export/test counter-offer calculation.
- Create a structured negotiation context object.
- Preserve deterministic fallback responses.
- Do not add API calls yet.

Acceptance criteria:

- Buyer/seller mode can produce structured context.
- Existing seller logic still works or has an intentional replacement.
- Tests cover lowball/counter/close/acceptable/accept.

Suggested agent:

- Codex.

### Issue 007: Prompt Playbook Structure

Goal: prepare the repo for real AI responses.

Owned files:

- new `prompts/playbooks/*`
- `research/NLP_NEGOTIATION_STRATEGIES.md`
- `scripts/CAR_NEGOTIATION_SCRIPTS.md`
- new prompt assembler tests

Tasks:

- Split current negotiation docs into small playbook files.
- Add a prompt assembler function.
- Add tests for which playbooks are selected by buyer/seller/context.
- Keep source markdown concise.

Acceptance criteria:

- Prompt context can be assembled without an API key.
- Tests prove buyer/seller playbook selection.
- Original research remains available or is clearly superseded.

Suggested agent:

- Codex for structure; Claude Code for markdown cleanup.

### Issue 008: Real AI Chat API

Goal: add the first backend slice.

Owned files:

- new server/API route files depending on chosen stack
- `.env.example`
- `src/lib/ai/*`
- affected chat feature files

Decision needed first:

- Keep Vite and add a serverless API setup, or migrate to Next.js before this issue.

Tasks:

- Add one API route for chat.
- Read model API key from environment.
- Do not expose keys client-side.
- Stream or return assistant response.
- Add a provider boundary so OpenAI/Anthropic can be swapped later.

Acceptance criteria:

- Chat can call a real model from local dev.
- Missing API key shows a clear developer error.
- No secrets are committed.
- Mock mode remains available for tests.

Suggested agent:

- Codex for API boundary and safety; Claude Code for iterative local testing.

## Stack Decision

Do not migrate to Next.js until Issues 001-005 are done unless a specific backend need forces it.

Reason:

- Current Vite app builds and deploys.
- No-login MVP can prove the UX before auth/database.
- A premature framework migration increases risk before the product shape is clear.

Revisit Next.js before Issue 008. If the API route and deployment story become awkward, migrate then.

## API Model Recommendation

Use hosted API models for the production app. Local models are fine for experiments and coding helpers, but the live app should use a hosted model first because deployment, reliability, logging, and safety are easier.

The app code should hide the provider behind `src/lib/ai/*` or equivalent server-side modules so the provider can change later.

## Deployment Plan

1. Keep `www.haggly.io` pointed at the current live v1 site.
2. Deploy v2 to a Vercel preview URL.
3. Test no-login chat and dashboard privately.
4. Run a content/SEO audit of the current live site.
5. Decide whether v2 replaces the homepage or launches under a path/subdomain first.
6. Cut over only after rollback is clear.

## Copy-Paste Prompt For Agents

Use this when assigning an issue:

```text
You are working in CSI-Platform/Haggly.

Follow docs/HAGGLY_V2_AGENT_PLAN.md.

Task: Issue <number> - <title>.

Owned files:
- <list exact files or folders>

Rules:
- Create a branch named agent/<issue-number>-<short-name>.
- Do not touch unrelated files.
- Do not commit secrets.
- Run npm run lint, npm test, and npm run build if available.
- Open a PR with summary, test results, and any follow-up risks.
```

## Review Prompt

Use this for a second AI review:

```text
Review this PR against docs/HAGGLY_V2_AGENT_PLAN.md.

Focus on:
- Whether the PR stayed inside owned files.
- Whether behavior changed unintentionally.
- Whether tests are meaningful.
- Whether the code makes future agent work easier.
- Whether any secrets, auth, database, or billing work slipped into the no-login MVP.
```

## Next Human Decisions

Only two decisions are needed soon:

1. Should Vercel remain the deployment target for v2 previews? Recommended: yes.
2. Which hosted AI provider should power the first real API route? Recommended: decide after mock chat and local dashboard exist.
