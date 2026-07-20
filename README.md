# Chuangzao Xiaoshe Official Site

English company homepage for **Chuangzao Xiaoshe** (创造小舍), built with React, Vite, Tailwind CSS, and React Router. Includes a product subpage for RealSIM Clipboard (Support & Privacy Policy).

For full handoff details see the workspace root `HANDOFF.md` (if using the Cursor workspace) or ask the team for the latest handoff document.

## Prerequisites

- [Node.js](https://nodejs.org/) — tested locally with **v22.20.0** (minimum version not pinned in `package.json`)
- npm (comes with Node)

## Quick Start

### Option A — from this directory (app root)

```bash
cd chuangzao-xiaoshe-homepage

npm install
npm run dev
```

Open the URL printed by Vite (default: `http://localhost:5173`).

### Option B — from workspace root (`OfficialSite/`)

If the parent folder contains a proxy `package.json`:

```bash
cd /path/to/OfficialSite

npm run dev
```

This runs `npm run dev --prefix chuangzao-xiaoshe-homepage`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally after build |
| `npm run lint` | Run ESLint |

There is **no** `npm test` script. Validation is lint + build + manual smoke tests.

## Environment Variables

**None required.** See [`.env.example`](./.env.example) for future variable names and usage notes.

## Project Structure

```
src/
  main.jsx      # Entry: React + BrowserRouter
  App.jsx       # Routes and page components
  siteData.js   # Company & product content (edit here for copy changes)
  index.css     # Tailwind global styles
public/         # Static assets (favicons, product logos)
vercel.json     # SPA rewrite for client-side routing
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Company homepage |
| `/realsim-clipboard` | RealSIM Clipboard product, support, and privacy |
| `/realsim-clipboard#realsim-clipboard-support` | Support section anchor |
| `/realsim-clipboard#realsim-clipboard-privacy` | Privacy Policy anchor |

## Deploy (Vercel)

Requires [Vercel CLI](https://vercel.com/docs/cli) and project access.

```bash
# Preview deployment
vercel deploy . -y

# Production (only when explicitly requested)
vercel deploy . --prod -y
```

Production custom domain: check Vercel project settings (not defined in this repo).

## Git

Remote: `git@github.com:charlvin/chuangzao-xiaoshe-homepage.git`

Branches: `main`, `develop` (feature work has used `develop`).

Before pushing:

```bash
npm run lint && npm run build
```

## Tech Stack

- React 19 + Vite 8
- React Router 7
- Tailwind CSS 4
- ESLint 10

No backend, database, or CMS.
