# Haggly

Canonical CSI-Platform repository for the next-generation Haggly negotiation product.

## Product Direction

Haggly is becoming an AI negotiation companion: a focused workspace that helps buyers and sellers understand deal context, identify leverage, ask better follow-up questions, and draft the next message with a clear strategy.

This repo is the active product line. Older Haggly source material exists in separate legacy repos and exports, but new work should land here.

## Current Capabilities

- React/Vite/Tailwind app shell.
- Buyer and seller negotiation flows.
- Local conversation history.
- Mock assistant mode for local development without API keys.
- Server-side chat API boundary for OpenAI or Anthropic providers.
- Prompt playbooks and negotiation context utilities.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Environment

Copy `.env.example` to `.env.local` for local API-backed chat. Keep `VITE_HAGGLY_CHAT_MODE=mock` when no model provider is configured.

## Repository Roles

- `CSI-Platform/Haggly`: canonical active repo for the current product.
- `StepFatherGoose/haggly`: legacy live/static Haggly.io source line.
- `Octoclaw-ai/haggly`: early static prototype source line.
- `StepFatherGoose/haggly-1`: old React prototype source line.

Legacy repos are reference material, not the place for new product work.

## Verification

```bash
npm run lint
npm run test
npm run build
```
