# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

> All commands require Node 24 (use `nvm use 24` if needed — project uses `.nvmrc`).

```bash
yarn build          # Build the library (outputs to dist/)
yarn test           # Run tests in watch mode
yarn test:ci        # Run tests once with coverage (used in CI and pre-commit)
yarn docs           # Generate JSDoc documentation (outputs to docs/)
yarn prettier       # Format src/**/*.js and stage changes
```

**Run a single test file:**
```bash
npx vitest run src/string/__tests__/interpolate.test.js
```

**Run tests matching a name:**
```bash
npx vitest run -t "interpolates value"
```

## Architecture

This is a zero-dependency utility library published as `@untemps/utils`. Each utility lives in its own file under `src/<category>/<name>.js` and is built as a separate entry point.

**Source structure:** `src/{array,async,dom,function,lang,number,object,string}/`
**Tests:** co-located in `src/<category>/__tests__/`, two kinds per util:
- `<name>.test.js` — standard unit tests
- `<name>.fastcheck.js` — property-based tests using [fast-check](https://fast-check.dev/)

**Build:** Vite in lib mode with multi-entry points. `vite.config.js` uses `node:fs` `globSync` to auto-discover all `src/**/*.js` files (excluding `__tests__`). The `src/index.js` barrel file is included automatically and built as `dist/index.js`.

**Exports (package.json):**
- `"."` → `dist/index.js` / `dist/index.cjs` — barrel, enables `import { isNil } from '@untemps/utils'` with tree-shaking
- `"./*"` → `dist/*.js` / `dist/*.cjs` — per-file, enables `import { isNil } from '@untemps/utils/lang/isNil'`
- `sideEffects: false` — allows bundlers to fully tree-shake unused modules

**Test runner:** Vitest with `globals: true` (no need to import `describe`/`it`/`expect`). Environment is `jsdom`. Setup file: `vitest-setup.js` (imports `@testing-library/jest-dom` matchers).

## Code style

Prettier config: tabs, single quotes, no semicolons, 120 char print width. Applied automatically on pre-commit via `yarn prettier`.

Commit messages follow Conventional Commits with sentence-case subject (enforced by commitlint). Example: `feat: Add foo utility`.

## Important rules
When I talk about incremental or step-by-step, that means creating commits for all groups of changes with a clear conventional message
Do not push unless I explicity ask for it.
When I ask a question, answer it and prompt before moving forward