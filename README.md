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

## Available utilities

Every utility is exported both from the package root and per-module at `@untemps/utils/<category>/<name>`. See the [Docs](https://utils.untemps.net) for full signatures, parameters, and examples.

### array
- **`extractByIndices`** — extract values from an array at the given indices

### async
- **`debounce`** — delay invocation until after a quiet period; returns a function with `.cancel()`
- **`standby`** — return a promise that resolves after the given delay
- **`throttle`** — invoke at most once per interval (leading + trailing); returns a function with `.cancel()`

### dom
- **`createElement`** — create a DOM element from a configuration object
- **`doElementsOverlap`** — check whether two DOM elements overlap on screen
- **`getCSSDeclaration`** — find a CSS rule by class name across `document.styleSheets`
- **`getElement`** — query a DOM element by selector
- **`isElement`** — check whether a value is a DOM element
- **`modifyElement`** — set attributes on a DOM element (by reference or selector)
- **`removeElement`** — remove a DOM element (by reference or selector)
- **`resolveClassName`** — aggregate class names from strings or `[condition, ifTrue, ifFalse]` tuples

### function
- **`isFunction`** — check whether a value is a function

### lang
- **`isNil`** — check whether a value is `null` or `undefined`

### number
- **`clamp`** — clamp a number between two bounds
- **`getRandomInteger`** — return a pseudo-random integer in `[min, max]`
- **`normalizeMinMax`** — return `[min, max]` ensuring `min <= max`

### object
- **`deepClone`** — structured-clone deep copy (functions and DOM nodes are not supported)
- **`deepMerge`** — recursively merge a source into a target with circular-reference support
- **`isObject`** — check whether a value is a plain object

### string
- **`generateText`** — generate a string from a dictionary using configurable rules
- **`generateTokenizedText`** — like `generateText` but also returns token indices
- **`interpolate`** — replace `%key%`-style tokens in a string
- **`interpolateLiteral`** — replace `${key}`-style tokens in a literal-like string
- **`isString`** — check whether a value is a string