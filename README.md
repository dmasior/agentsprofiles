# AgentsProfiles

Build an `AGENTS.md` file for your project. Select project context, focus areas,
technology stack, and working preferences, then add repository-specific instructions.

Website: [agentsprofiles.com](https://agentsprofiles.com)

## Local development

Requires Node.js and npm.

```sh
npm ci
npm run dev
```

Open the local URL shown in the terminal.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Build the site into `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm test` | Run tests with Vitest. |
| `npm run check` | Sync Astro types and run TypeScript checks. |
| `npm run format` | Format the repository with Prettier. |

## Project structure

- `src/pages/` — Astro pages.
- `src/builder/` — Profile builder UI and generation logic.
- `src/content/` — Markdown instruction fragments.
- `src/styles/` — Site styles.
- `tests/` — Tests.

Built with Astro and TypeScript.
