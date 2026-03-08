# Code Equity Hub

Live demo: https://code-equity-hub.vercel.app/

Code Equity Hub is a community platform that aggregates career resources, mentorship, learning materials, and opportunities to help underrepresented developers advance their careers.

This repository contains the frontend app built with Vite + React + TypeScript and styled with Tailwind CSS and shadcn/ui components.

## Quick start

Requirements:

- Node.js 18+ (or the version used in the project)
- pnpm, npm or yarn

Local development:

1. Clone the repo

```powershell
git clone <YOUR_GIT_URL>
cd code-equity-hub
```

2. Install dependencies (example using pnpm):

```powershell
pnpm install
pnpm dev
```

Or with npm:

```powershell
npm install
npm run dev
```

Open http://localhost:5173 (or the port shown) to view the app.

## Deployed site

This project is deployed to Vercel:

https://code-equity-hub.vercel.app/

If you need the Vercel project settings or build logs, check the Vercel dashboard connected to this repository.

## Project structure (high level)

- `src/` — application source (components, pages, hooks, contexts)
- `public/` — static assets
- `supabase/` — database migrations and config used by the backend
- `test/` — unit tests (Vitest)

## Tech stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase (backend/integrations)

## Scripts

Key scripts in `package.json` (run with npm/pnpm/yarn):

- `dev` — start dev server
- `build` — build production assets
- `preview` — locally preview production build
- `test` — run unit tests

## Contributing

If you'd like to contribute:

1. Fork the repository or create a branch.
2. Make changes and add tests where appropriate.
3. Open a pull request describing your change.

## License

This project does not specify a license in the repository. If you are the repo owner, add a `LICENSE` file to make the terms explicit.

## Contact

If you need help with the repo or deployment, open an issue or contact the maintainers listed on the repository.

---

Updated README to include the live Vercel deployment and quick-start instructions.
