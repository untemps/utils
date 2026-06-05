# [4.0.0](https://github.com/untemps/utils/compare/v3.2.1...v4.0.0) (2026-06-05)


* refactor(dom)!: Use Element.remove() in removeElement ([#120](https://github.com/untemps/utils/issues/120)) ([c15677e](https://github.com/untemps/utils/commit/c15677e23cdee1a769307545792293463a18e8e7))


### Bug Fixes

* **array:** Return extractByIndices values in indices order ([#118](https://github.com/untemps/utils/issues/118)) ([b3ad542](https://github.com/untemps/utils/commit/b3ad542a8c8533b8088a7d384d1b4aafbdc760e4))
* **dom:** Avoid unsafe DOMRect cast in createElement ([#81](https://github.com/untemps/utils/issues/81)) ([6fda5d4](https://github.com/untemps/utils/commit/6fda5d431d8da172388a71e71a69e479d454fb63))
* **dom:** Harmonize missing-target behaviour between removeElement and modifyElement ([#137](https://github.com/untemps/utils/issues/137)) ([a6be726](https://github.com/untemps/utils/commit/a6be72614a22feb7f5ef1f66f3cb7d18a734515f))
* **dom:** Harmonize null/undefined attribute handling in createElement ([#154](https://github.com/untemps/utils/issues/154)) ([94a2b57](https://github.com/untemps/utils/commit/94a2b572b97e5f8de07232dd74d5b195f62455e8))
* **dom:** Honor explicit empty-string textContent in createElement ([#140](https://github.com/untemps/utils/issues/140)) ([a3640bb](https://github.com/untemps/utils/commit/a3640bbeb1b45a1fd938ab5ed61464da8d57e9b0))
* **dom:** Reject null and undefined element input in modifyElement and removeElement ([#139](https://github.com/untemps/utils/issues/139)) ([ffcca02](https://github.com/untemps/utils/commit/ffcca02617cc8657ad0e87c89ed73b7fb45286c5))
* **dom:** Replace for...in with Object.entries on attributes in modifyElement ([#61](https://github.com/untemps/utils/issues/61)) ([0e30f71](https://github.com/untemps/utils/commit/0e30f719da2da45e460f7adea9a9705ff49953ae))
* **dom:** Skip cross-origin stylesheets in getCSSDeclaration ([#101](https://github.com/untemps/utils/issues/101)) ([b5c4094](https://github.com/untemps/utils/commit/b5c4094136a4e3ea23ff922f05a299c66ade7383))
* **dom:** Snapshot getCSSDeclaration return to prevent live stylesheet mutation ([#155](https://github.com/untemps/utils/issues/155)) ([f0f7f0d](https://github.com/untemps/utils/commit/f0f7f0d598de1b3eaaef6c2c24faf93398720778))
* **dom:** Throw ReferenceError when modifyElement selector matches nothing ([#119](https://github.com/untemps/utils/issues/119)) ([8ca987b](https://github.com/untemps/utils/commit/8ca987b7833f45d55ec018417903c98797c5e0c0))
* **dom:** Tolerate null attributes in modifyElement ([#138](https://github.com/untemps/utils/issues/138)) ([fd55f8b](https://github.com/untemps/utils/commit/fd55f8b56cbcb52c4173dbee05e9936ce7617ee9))
* **number:** Narrow getRandomInteger defaults to safe integer range ([#117](https://github.com/untemps/utils/issues/117)) ([b2e284f](https://github.com/untemps/utils/commit/b2e284fc18e1c8afddb998e748296c612c299f0e))
* **object:** Copy non-cloneable values by reference in deepMerge ([#99](https://github.com/untemps/utils/issues/99)) ([f44a2d1](https://github.com/untemps/utils/commit/f44a2d10fbe166e80bd9321f959d462c19d926dc))
* **object:** Deep clone non-plain-object source values in deepMerge ([#79](https://github.com/untemps/utils/issues/79)) ([c357715](https://github.com/untemps/utils/commit/c3577156ad61dda631ba6d5e7743609650d43471))
* **object:** Make deepMerge immutable by default, add mutate flag ([#60](https://github.com/untemps/utils/issues/60)) ([d56b2d9](https://github.com/untemps/utils/commit/d56b2d9efc688c55c19d341e8d2e17a3df712c60))
* **object:** Preserve source-side aliasing in deepMerge ([#141](https://github.com/untemps/utils/issues/141)) ([dccdfc6](https://github.com/untemps/utils/commit/dccdfc6dede39203ec849f83f1083bd6d8e1fa9b))
* **object:** Return false instead of throwing for nullish values in isObject ([#86](https://github.com/untemps/utils/issues/86)) ([10d7ef5](https://github.com/untemps/utils/commit/10d7ef5ef9d5154ddde70f9b3f87ba14d38ea8b6))
* **string:** Default interpolateLiteral tokens to empty object ([#80](https://github.com/untemps/utils/issues/80)) ([ede8348](https://github.com/untemps/utils/commit/ede834831df04e5deb0b3a2aa9823718780a2a44))
* **string:** Escape token keys when building the interpolate regex ([#91](https://github.com/untemps/utils/issues/91)) ([9fcb42c](https://github.com/untemps/utils/commit/9fcb42c2262b647c8c06c4fe90c8eb1d3ab2ff5f))
* **string:** Harmonize nil-value handling between interpolate and interpolateLiteral ([#136](https://github.com/untemps/utils/issues/136)) ([bdf3a13](https://github.com/untemps/utils/commit/bdf3a13b3ab9894650a746126bbf159ec590e2e9))
* **string:** Preserve delimiters in interpolate when token value is nil ([#105](https://github.com/untemps/utils/issues/105)) ([3013b20](https://github.com/untemps/utils/commit/3013b20f7f597330348cdfdf48ce1b4085ef81b4))
* **string:** Replace incomplete escapeDivider regex with full metacharacter set ([#63](https://github.com/untemps/utils/issues/63)) ([264905f](https://github.com/untemps/utils/commit/264905f89b01e31144e60745fc756049a7071459))
* **string:** Return value unchanged when interpolate has no tokens ([#100](https://github.com/untemps/utils/issues/100)) ([fe2346a](https://github.com/untemps/utils/commit/fe2346ae1564e41773b11725e6500d80b53f0ba8))
* **string:** Throw RangeError in generateText when dictionary is empty ([#62](https://github.com/untemps/utils/issues/62)) ([e904575](https://github.com/untemps/utils/commit/e90457527052bff1581fb3d1a7ad1a57c9752be5))


### Code Refactoring

* **object:** Infer DeepMerge return type from source and target ([#157](https://github.com/untemps/utils/issues/157)) ([8b38c1c](https://github.com/untemps/utils/commit/8b38c1c4da49c17b51114c0aba23c1990eaf70bf))
* **string:** Replace new Function with regex in interpolateLiteral ([#59](https://github.com/untemps/utils/issues/59)) ([2012626](https://github.com/untemps/utils/commit/2012626c41bd2c59639f6625cbb7d9802b39bf38))


### Features

* Add debounce and throttle functions to async/ ([#64](https://github.com/untemps/utils/issues/64)) ([467b924](https://github.com/untemps/utils/commit/467b924d2de391cc940e4abdfc40ba359e89b6ac))
* Add deepClone function to object/ ([#65](https://github.com/untemps/utils/issues/65)) ([9172bb5](https://github.com/untemps/utils/commit/9172bb5071ae20a515c27c3d346af432d9b21fc7))
* **dom:** Match grouped selectors in getCSSDeclaration ([#145](https://github.com/untemps/utils/issues/145)) ([db66049](https://github.com/untemps/utils/commit/db6604961aa05abd43f9a2983a373f8c558b19f4))
* **string:** Harmonize missing-key behaviour between interpolate and interpolateLiteral ([#124](https://github.com/untemps/utils/issues/124)) ([119f97e](https://github.com/untemps/utils/commit/119f97e69d3ec344357a1d99854c6e48974ebb6a))


### Performance Improvements

* **dom:** Avoid array spread in resolveClassName reduce ([#90](https://github.com/untemps/utils/issues/90)) ([d8fcb43](https://github.com/untemps/utils/commit/d8fcb438946eba762456f75499a0cea45c29676d))


### BREAKING CHANGES

* **object:** deepMerge no longer returns `Record<string, unknown>`. Callers that explicitly annotated the result with that type, or that assigned it to a `Record<string, unknown>`-typed variable, now get a narrower inferred type and must drop the annotation (or widen with `as Record<string, unknown>` if needed).

(cherry picked from commit 9fd4a40987ed65692c1cefb8724ae03ad22c5823)
* **dom:** getCSSDeclaration with returnText = false (the default) now returns a Record<string, string> snapshot instead of the live CSSStyleDeclaration. Callers relying on CSSStyleDeclaration methods (getPropertyValue, setProperty, ...) must either pass returnText = true and parse the string, switch to getComputedStyle, or update the stylesheet through document.styleSheets directly. Mutations on the returned object no longer propagate to the matched rule.

(cherry picked from commit 16c45fc6a33b2f63b18a26412737187e0561833c)
* **dom:** modifyElement(null), modifyElement(undefined), removeElement(null) and removeElement(undefined) now throw TypeError instead of returning undefined. Callers must either guard the input before calling or wrap the call in try/catch.

(cherry picked from commit e13bd892c011cbe2e3c481969d4f236391cc9cf7)
* **dom:** removeElement no longer silently returns undefined when the string selector matches no element. It now throws a ReferenceError with the same message format as modifyElement. The null/undefined input path and the detached-element path are unchanged.

(cherry picked from commit b0a590c2790c3c4ffa40682316146cc0efaa658b)
* **string:** interpolateLiteral no longer coerces null and undefined token values to the literal strings "null" and "undefined". The placeholder is preserved instead. Non-nil values, including symbols, are still coerced via String(value).

(cherry picked from commit e0aeb05a14b474436aeffea013396e6ebd957c7d)
* **string:** interpolateLiteral no longer throws ReferenceError when a placeholder key is missing from tokens. The placeholder is preserved in the result. Callers relying on the throw must pre-validate the keys against the placeholders found in the input string.

(cherry picked from commit 379b5516c0fa56f685003d640b936969d42b57cd)
* removeElement now returns a detached element unchanged instead of undefined. Callers that distinguished 'nothing to remove' from 'element removed' via the undefined return must check the element's parent in advance.

(cherry picked from commit 7588ea0aab11428045572fffcc25018d6d21ea9a)
* **dom:** modifyElement(selector, attrs) now throws ReferenceError when the selector does not match any element. Callers relying on the null return must catch the error or pre-check with document.querySelector.

(cherry picked from commit 941f09165f0dbd090b412a06ffb9edd2e85b25cf)
* **array:** extractByIndices result order now follows the indices array. Callers relying on source-order output must sort indices upstream.

(cherry picked from commit 58279e248e69dd2d7bd633e4336a9d7c2120b478)
* **number:** getRandomInteger() called without arguments now draws from a narrower default range — Math.ceil(Number.MIN_SAFE_INTEGER / 2) to Math.floor(Number.MAX_SAFE_INTEGER / 2) — instead of the previous ±Number.MAX_SAFE_INTEGER. The old full-safe-integer defaults overflowed the (max - min + 1) span and biased the distribution. Callers relying on the previous range must pass the bounds explicitly.

(cherry picked from commit 4c95cf125b0ee0dc0fee4ed5aaf8143512cc58c1)
* **string:** interpolate now preserves `%key%` when the token value is null or undefined, instead of returning the bare key.

(cherry picked from commit e55a131374d552e730b94094ed52626a01157882)
* **string:** generateText now throws a RangeError when dictionary is null or empty instead of producing corrupt output or an implicit TypeError.
Previously, passing dictionary: null caused an unspecified TypeError deep inside the function (null.length). Passing dictionary: [] silently returned a string composed entirely of the literal word "undefined".
Both cases now throw RangeError('dictionary must not be empty') at the function entry point via a single !dictionary?.length guard.
Migration:
    - Replace any reliance on the silent "undefined" output from an empty
      dictionary with explicit error handling.
    - Code catching TypeError for the null dictionary case must now catch
      RangeError instead.

(cherry picked from commit 3453c59ac58f095bbdffed0150da73217721e5cc)
* **object:** deepMerge now returns a new object and no longer mutates its inputs.
Previously, deepMerge merged source into target in place and returned the same target reference. Both source and target could be silently modified as a side effect.
The new default behaviour (mutate = false) clones target as the result base via structuredClone — neither source nor target is touched, and the return value is always a distinct object. Source-only object values are also deep-cloned, so the result shares no references with source.
Migration:
    - Replace any reliance on `deepMerge(s, t) === t` with the return value.
    - Replace any post-call inspection of t with the return value.
    - Pass `mutate = true` as the third argument to restore in-place merging.

(cherry picked from commit 0348da8d4c25bea0560c5c0fbb44a14d31df4f36)
* **string:** Symbol token values no longer throw — they are stringified via String() (e.g. Symbol('x') → "Symbol(x)"). Previously this was a side-effect of the template literal inside new Function; the new behaviour is explicit and consistent.
Expression placeholders such as ${foo + bar} or ${obj.prop} are no longer evaluated. The \w+ regex only matches simple identifiers. These were never documented or supported, but silently worked via eval. They now pass through unsubstituted.

(cherry picked from commit a900eb10a461280def1afaa5cf26d470fded53b2)

## [3.2.1](https://github.com/untemps/utils/compare/v3.2.0...v3.2.1) (2026-05-13)


### Bug Fixes

* **string:** Correct generateTokenizedText JSDoc example to use config-object form ([#58](https://github.com/untemps/utils/issues/58)) ([611c92e](https://github.com/untemps/utils/commit/611c92e8431d09036e148a9097809c67b02b018c))

# [3.2.0](https://github.com/untemps/utils/compare/v3.1.1...v3.2.0) (2026-04-30)


### Features

* **number:** Add clamp utility to number/ ([#49](https://github.com/untemps/utils/issues/49)) ([c5f1b96](https://github.com/untemps/utils/commit/c5f1b96e150d751a7cebb9d7b14b1c0a7369a670))

## [3.1.1](https://github.com/untemps/utils/compare/v3.1.0...v3.1.1) (2026-04-30)


### Bug Fixes

* **number:** Use Math.floor to produce uniform distribution in getRandomInteger ([#48](https://github.com/untemps/utils/issues/48)) ([54b7e79](https://github.com/untemps/utils/commit/54b7e7915f5caa95161d4742c0d474e5115b1e46))

# [3.1.0](https://github.com/untemps/utils/compare/v3.0.0...v3.1.0) (2026-03-28)


### Features

* Migrate codebase to TypeScript ([#28](https://github.com/untemps/utils/issues/28)) ([c62b9a6](https://github.com/untemps/utils/commit/c62b9a638640397c686b9c5835188a1c301326dc))

# [3.0.0](https://github.com/untemps/utils/compare/v2.6.0...v3.0.0) (2023-03-18)


### chore

* Replace Rollup by Vite ([#25](https://github.com/untemps/utils/issues/25)) ([929616f](https://github.com/untemps/utils/commit/929616fa06a32b5464cd5009dcb95c89bc4d5b05))


### BREAKING CHANGES

* This kind of change can be quite tricky, so  to be sure not to break something, it will pop a new major version up

# [2.6.0](https://github.com/untemps/utils/compare/v2.5.0...v2.6.0) (2023-02-24)


### Features

* **dom:** Allow to mix condition arrays and direct strings ([#24](https://github.com/untemps/utils/issues/24)) ([78b0c38](https://github.com/untemps/utils/commit/78b0c38f151cd831d71278c8b18614d8f8eed099))

# [2.5.0](https://github.com/untemps/utils/compare/v2.4.0...v2.5.0) (2023-02-13)


### Features

* **array:** Add extractByIndices function ([#21](https://github.com/untemps/utils/issues/21)) ([35c3665](https://github.com/untemps/utils/commit/35c3665c1384d67292e2c13f029325e4ba1670f7))

# [2.4.0](https://github.com/untemps/utils/compare/v2.3.2...v2.4.0) (2022-10-20)


### Features

* **dom:** Add boundingClientRect prop in createElement function ([#19](https://github.com/untemps/utils/issues/19)) ([86a1d19](https://github.com/untemps/utils/commit/86a1d19b8fed7a672276c12add62feb94943da2c))

## [2.3.2](https://github.com/untemps/utils/compare/v2.3.1...v2.3.2) (2022-10-17)

## [2.3.1](https://github.com/untemps/utils/compare/v2.3.0...v2.3.1) (2022-10-17)


### Bug Fixes

* **number:** Ensure number/getRandomInteger returns an integer ([#18](https://github.com/untemps/utils/issues/18)) ([833cfac](https://github.com/untemps/utils/commit/833cfaccdb7b310ec6bc2031b29321a55b51a6e9))

# [2.3.0](https://github.com/untemps/utils/compare/v2.2.0...v2.3.0) (2022-10-02)


### Features

* Add isNil function and fix interpolate function ([#14](https://github.com/untemps/utils/issues/14)) ([b7ff547](https://github.com/untemps/utils/commit/b7ff547ff45456953bd146f3547ae368fcc2df6b))

# [2.2.0](https://github.com/untemps/utils/compare/v2.1.0...v2.2.0) (2022-09-28)


### Features

* Add getCSSDeclaration function ([#12](https://github.com/untemps/utils/issues/12)) ([783ab78](https://github.com/untemps/utils/commit/783ab7826f9bb1c6701ae195447a4701561bf887))

# [2.1.0](https://github.com/untemps/utils/compare/v2.0.0...v2.1.0) (2022-09-28)


### Features

* Add doElementsOverlap function ([#11](https://github.com/untemps/utils/issues/11)) ([2e4a160](https://github.com/untemps/utils/commit/2e4a1603f3b51602906d37db3c3e1642967261af))

# [2.0.0](https://github.com/untemps/utils/compare/v1.7.1...v2.0.0) (2022-05-26)


* Switch default to named exports (#7) ([891e6c2](https://github.com/untemps/utils/commit/891e6c2b5d8b0945bb776d7d205658775488615b)), closes [#7](https://github.com/untemps/utils/issues/7)


### BREAKING CHANGES

* Function imports need to be changed

# [2.0.0-beta.1](https://github.com/untemps/utils/compare/v1.7.1...v2.0.0-beta.1) (2022-04-23)


### Bug Fixes

* Switch default to named exports ([#6](https://github.com/untemps/utils/issues/6)) ([9383703](https://github.com/untemps/utils/commit/9383703e993e4f38a3a7098bf83e5c91c6ef48a2))


### BREAKING CHANGES

* Function imports need to be changed

## [1.7.1](https://github.com/untemps/utils/compare/v1.7.0...v1.7.1) (2022-04-06)


### Bug Fixes

* Fix babel helpers bundling ([#4](https://github.com/untemps/utils/issues/4)) ([b150308](https://github.com/untemps/utils/commit/b150308d7e4bd9ca54f6823882fa5a6f87c2bdb8))

# [1.7.0](https://github.com/untemps/utils/compare/v1.6.0...v1.7.0) (2022-04-02)


### Features

* Add getElement function ([#2](https://github.com/untemps/utils/issues/2)) ([275a193](https://github.com/untemps/utils/commit/275a193f674a06ab932108272b56447c80e97447))

# [1.6.0](https://github.com/untemps/utils/compare/v1.5.0...v1.6.0) (2022-03-20)


### Features

* Add deepMerge function ([d31fbb7](https://github.com/untemps/utils/commit/d31fbb7271e1cbb8c978f2488a60f949348fc263))

# [1.5.0](https://github.com/untemps/utils/compare/v1.4.0...v1.5.0) (2022-03-19)


### Features

* Add isObject function ([dbaaa59](https://github.com/untemps/utils/commit/dbaaa59e6f726c25759502bef497d6f4cf687178))

# [1.4.0](https://github.com/untemps/utils/compare/v1.3.0...v1.4.0) (2022-03-19)


### Features

* Add standby function ([b6b8415](https://github.com/untemps/utils/commit/b6b84157a94559c209980e7020527be92ca3bddf))

# [1.3.0](https://github.com/untemps/utils/compare/v1.2.0...v1.3.0) (2022-03-18)


### Features

* Add resolveClassName function ([f06a67c](https://github.com/untemps/utils/commit/f06a67ce54098f2e1a1c4ebfb9a08d39044c81b8))

# [1.2.0](https://github.com/untemps/utils/compare/v1.1.2...v1.2.0) (2022-03-17)


### Features

* Add isElement function ([082ea28](https://github.com/untemps/utils/commit/082ea28e213036fc62707872b405987d670436a7))

## [1.1.2](https://github.com/untemps/utils/compare/v1.1.1...v1.1.2) (2022-03-16)


### Bug Fixes

* Update generateTokenizedText function and add property-based tests ([a3573fa](https://github.com/untemps/utils/commit/a3573fac1baad37cb301bfab6d72b4de9452a04c))

## [1.1.1](https://github.com/untemps/utils/compare/v1.1.0...v1.1.1) (2022-03-16)


### Bug Fixes

* Update generateText function and add property-based tests ([58d754c](https://github.com/untemps/utils/commit/58d754cee09f3d625d5c5b71e664dbe284e0737f))

# [1.1.0](https://github.com/untemps/utils/compare/v1.0.0...v1.1.0) (2022-03-15)


### Features

* Add getRandomInteger function ([db4b327](https://github.com/untemps/utils/commit/db4b327b423aa61ffff2c6bdb4974934137c37a9))
* Add interpolate function ([585b3a2](https://github.com/untemps/utils/commit/585b3a255990afb64410fc018ecfe6578bf72a92))
* Add interpolateLiteral function ([0319275](https://github.com/untemps/utils/commit/03192758586c25a3790810788313c0fd99aef3f0))
* Add normalizeMinMax function ([f7f3df4](https://github.com/untemps/utils/commit/f7f3df4bb5cfc0cde8796d36872889e0eb46ff44))

# 1.0.0 (2022-03-05)


### Features

* Initial commit ([be86f7f](https://github.com/untemps/utils/commit/be86f7ff57f4e4f7b0eb0182d57162f16e377ac3))
