# Haggly

Private working repo for Haggly v2.

## Direction

Haggly v2 is intended to become a green AI negotiation chat app with a dashboard. This repo currently starts from the old React/Vite prototype in `StepFatherGoose/haggly-1`; the live static site at `www.haggly.io` is a separate v1 line from `StepFatherGoose/haggly`.

## Local Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Migration Notes

- Imported from `StepFatherGoose/haggly-1`: React/Vite source, public assets, package files, Tailwind/Vite config, research notes, negotiation script notes.
- Not imported: `dist/`, `node_modules/`, old `.git` history, and the unused `views/index.ejs` prototype page.
- Still to evaluate: useful assets/content from the Google Drive `haggly` folder and the current live-site repo.

## Repo Roles

- `CSI-Platform/Haggly`: canonical private v2 repo.
- `StepFatherGoose/haggly`: current live v1/static site archive.
- `StepFatherGoose/haggly-1`: old React prototype archive after this repo is stable.
