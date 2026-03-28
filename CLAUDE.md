# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

> All commands require Node 24 (use `nvm use 24` if needed — project uses `.nvmrc`).

```bash
yarn build          # Build the library: Vite (JS/CJS) + tsc (d.ts) → dist/
yarn test           # Run tests in watch mode
yarn test:ci        # Run tests once with coverage (used in CI and pre-commit)
yarn docs           # Generate TypeDoc documentation and open in browser (outputs to docs/)
yarn prettier       # Format src/**/*.ts and stage changes
```

**Run a single test file:**
```bash
npx vitest run src/string/__tests__/interpolate.test.ts
```

**Run tests matching a name:**
```bash
npx vitest run -t "interpolates value"
```

## Architecture

This is a zero-dependency utility library published as `@untemps/utils`. Each utility lives in its own file under `src/<category>/<name>.ts` and is built as a separate entry point.

**Source structure:** `src/{array,async,dom,function,lang,number,object,string}/`
**Tests:** co-located in `src/<category>/__tests__/`, two kinds per util:
- `<name>.test.ts` — standard unit tests
- `<name>.fastcheck.ts` — property-based tests using [fast-check](https://fast-check.dev/)

**Build:** Two-step pipeline — Vite generates `dist/**/*.js` + `dist/**/*.cjs`; `tsc -p tsconfig.build.json` generates `dist/**/*.d.ts`. `vite.config.ts` uses `node:fs` `globSync` to auto-discover all `src/**/*.ts` files (excluding `__tests__`). The `src/index.ts` barrel file is included automatically and built as `dist/index.js`.

**TypeScript config:**
- `tsconfig.json` — strict mode, `noEmit: true`, for IDE type-checking (includes test files)
- `tsconfig.build.json` — extends tsconfig.json, `emitDeclarationOnly: true`, excludes test files

**Exports (package.json):**
- `"."` → `dist/index.js` / `dist/index.cjs` / `dist/index.d.ts` — barrel, enables `import { isNil } from '@untemps/utils'` with tree-shaking
- `"./*"` → `dist/*.js` / `dist/*.cjs` / `dist/*.d.ts` — per-file, enables `import { isNil } from '@untemps/utils/lang/isNil'`
- `sideEffects: false` — allows bundlers to fully tree-shake unused modules

**Test runner:** Vitest with `globals: true` (no need to import `describe`/`it`/`expect`). Environment is `jsdom`. Setup file: `vitest-setup.ts` (imports `@testing-library/jest-dom` matchers).

## Code style

TypeScript strict mode. Prettier config: tabs, single quotes, no semicolons, 120 char print width. Applied automatically on pre-commit via `yarn prettier`.

Commit messages follow Conventional Commits with sentence-case subject (enforced by commitlint). Example: `feat: Add foo utility`.

## Important rule
Do not push unless I explicity ask for it.