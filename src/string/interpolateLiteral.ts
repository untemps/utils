/**
 * @module string/interpolateLiteral
 */

import { isNil } from '../lang/isNil'

/**
 * Replaces `${key}`-style tokens in a literal-like string with the matching values from a dictionary.
 *
 * @function
 * @example
 * import { interpolateLiteral } from '@untemps/utils/string/interpolateLiteral'
 *
 * const value = 'A ${foo} with ${bar} "wings" and a lot of ${fun}'
 * const tokens = {
 *  foo: 'bird',
 *  bar: 3,
 *  fun: 'dignity'
 * }
 * interpolateLiteral(value, tokens) // A bird with 3 "wings" and a lot of dignity
 *
 * @remarks
 * Placeholders are preserved when the corresponding key is missing from `tokens` or when its
 * value is `null` / `undefined`, mirroring the behaviour of `interpolate`. Other values
 * (including symbols) are coerced via `String(value)`.
 *
 * @param value   - The literal-like string value to interpolate.
 * @param tokens  - An object of key/value pairs to replace the tokens. Keys must be valid identifiers (`\w+`). Defaults to `{}`.
 * @returns The interpolated string.
 */
export const interpolateLiteral = (value: string, tokens: Record<string, unknown> = {}): string => {
	return value.replace(/\$\{(\w+)\}/g, (match, key) => {
		if (!Object.hasOwn(tokens, key) || isNil(tokens[key])) return match
		return String(tokens[key])
	})
}
