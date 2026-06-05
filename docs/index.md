---
layout: home

hero:
  name: "@untemps/utils"
  text: "Zero-dependency TypeScript utilities"
  tagline: A focused toolbox of 25 tree-shakeable helpers across 8 categories.
  actions:
    - theme: brand
      text: API Reference
      link: /api/
    - theme: alt
      text: Get Started
      link: /#installation
    - theme: alt
      text: GitHub
      link: https://github.com/untemps/utils

features:
  - icon: 🪶
    title: Zero-dependency
    details: No runtime dependencies. Nothing extra ends up in your bundle.
  - icon: ⚡
    title: Tree-shakeable
    details: Per-module imports (`@untemps/utils/<category>/<name>`) so bundlers ship only what you use.
  - icon: 🔷
    title: TypeScript-first
    details: Full type declarations bundled. No `@types/*` package needed.
  - icon: 🧩
    title: Categorized
    details: 25 utilities across 8 focused categories, each documented with examples.
---

## Installation

```bash
yarn add @untemps/utils
```

```ts
// Barrel import (tree-shaken)
import { isNil, interpolate, createElement } from '@untemps/utils'

// Or per-module, for the leanest bundles
import { isNil } from '@untemps/utils/lang/isNil'
```

**Requirements:** Node.js `>= 20`.

## Catalog

### array

- [`extractByIndices`](/api/array/extractByIndices) — extract values from an array at the given indices

### async

- [`debounce`](/api/async/debounce) — delay invocation until after a quiet period
- [`standby`](/api/async/standby) — resolve a promise after the given delay
- [`throttle`](/api/async/throttle) — invoke at most once per interval

### dom

- [`createElement`](/api/dom/createElement) — create a DOM element from a configuration object
- [`doElementsOverlap`](/api/dom/doElementsOverlap) — check whether two elements overlap on screen
- [`getCSSDeclaration`](/api/dom/getCSSDeclaration) — find a CSS rule by class name across stylesheets
- [`getElement`](/api/dom/getElement) — query a DOM element by selector
- [`isElement`](/api/dom/isElement) — check whether a value is a DOM element
- [`modifyElement`](/api/dom/modifyElement) — set attributes on a DOM element (by reference or selector)
- [`removeElement`](/api/dom/removeElement) — remove a DOM element (by reference or selector)
- [`resolveClassName`](/api/dom/resolveClassName) — aggregate class names from strings or tuples

### function

- [`isFunction`](/api/function/isFunction) — check whether a value is a function

### lang

- [`isNil`](/api/lang/isNil) — check whether a value is `null` or `undefined`

### number

- [`clamp`](/api/number/clamp) — clamp a number between two bounds
- [`getRandomInteger`](/api/number/getRandomInteger) — return a pseudo-random integer in `[min, max]`
- [`normalizeMinMax`](/api/number/normalizeMinMax) — return `{ min, max }` ordered so `min <= max`

### object

- [`deepClone`](/api/object/deepClone) — structured-clone deep copy
- [`deepMerge`](/api/object/deepMerge) — recursively merge objects with circular-reference support
- [`isObject`](/api/object/isObject) — check whether a value is a plain object

### string

- [`generateText`](/api/string/generateText) — generate a string from a dictionary using configurable rules
- [`generateTokenizedText`](/api/string/generateTokenizedText) — like `generateText`, also returning token indices
- [`interpolate`](/api/string/interpolate) — replace `%key%`-style tokens in a string
- [`interpolateLiteral`](/api/string/interpolateLiteral) — replace `${key}`-style tokens in a literal-like string
- [`isString`](/api/string/isString) — check whether a value is a string
