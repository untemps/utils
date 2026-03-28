# @untemps/utils

Utils for @untemps packages.

---

[![npm](https://img.shields.io/npm/v/@untemps/utils?style=for-the-badge)](https://www.npmjs.com/package/@untemps/utils)

---

## Documentation

A complete documentation of utils is available here: [Docs](https://utils.untemps.net)

## Installation

```bash
yarn add @untemps/utils
```

This package ships with full TypeScript declarations. No additional `@types/*` package needed.

## Usage

### ESM / TypeScript

```ts
import { isNil, interpolate, createElement } from '@untemps/utils'
```

### Per-module (tree-shakeable)

```ts
import { isNil } from '@untemps/utils/lang/isNil'
import { interpolate } from '@untemps/utils/string/interpolate'
```

### CommonJS

```js
const { isNil } = require('@untemps/utils')
```