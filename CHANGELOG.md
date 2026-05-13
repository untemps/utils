# [4.0.0-beta.3](https://github.com/untemps/utils/compare/v4.0.0-beta.2...v4.0.0-beta.3) (2026-05-13)


### Bug Fixes

* **dom:** Replace for...in with Object.entries on attributes in modifyElement ([#61](https://github.com/untemps/utils/issues/61)) ([82fa134](https://github.com/untemps/utils/commit/82fa1341d2429dd95e45d65467eb35858a1fa455))

# [4.0.0-beta.2](https://github.com/untemps/utils/compare/v4.0.0-beta.1...v4.0.0-beta.2) (2026-05-13)


### Bug Fixes

* **object:** Make deepMerge immutable by default, add mutate flag ([#60](https://github.com/untemps/utils/issues/60)) ([0348da8](https://github.com/untemps/utils/commit/0348da8d4c25bea0560c5c0fbb44a14d31df4f36))


### BREAKING CHANGES

* **object:** deepMerge now returns a new object and no longer mutates its inputs.
Previously, deepMerge merged source into target in place and returned the same target reference. Both source and target could be silently modified as a side effect.
The new default behaviour (mutate = false) clones target as the result base via structuredClone — neither source nor target is touched, and the return value is always a distinct object. Source-only object values are also deep-cloned, so the result shares no references with source.
Migration:
    - Replace any reliance on `deepMerge(s, t) === t` with the return value.
    - Replace any post-call inspection of t with the return value.
    - Pass `mutate = true` as the third argument to restore in-place merging.

# [4.0.0-beta.1](https://github.com/untemps/utils/compare/v3.2.1...v4.0.0-beta.1) (2026-05-13)


### Code Refactoring

* **string:** Replace new Function with regex in interpolateLiteral ([#59](https://github.com/untemps/utils/issues/59)) ([a900eb1](https://github.com/untemps/utils/commit/a900eb10a461280def1afaa5cf26d470fded53b2))


### BREAKING CHANGES

* **string:** Symbol token values no longer throw — they are stringified via String() (e.g. Symbol('x') → "Symbol(x)"). Previously this was a side-effect of the template literal inside new Function; the new behaviour is explicit and consistent.
Expression placeholders such as ${foo + bar} or ${obj.prop} are no longer evaluated. The \w+ regex only matches simple identifiers. These were never documented or supported, but silently worked via eval. They now pass through unsubstituted.

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
