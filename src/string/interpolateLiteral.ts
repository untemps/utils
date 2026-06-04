/**
 * @module string/interpolateLiteral
 */

/**
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
 * Tokens whose key is absent from `tokens` are left untouched in the output, mirroring the
 * lenient behaviour of `interpolate`. Values that are present (including `null`, `undefined`,
 * symbols) are coerced via `String(value)`.
 *
 * @param value   - The literal-like string value to interpolate.
 * @param tokens  - An object of key/value pairs to replace the tokens. Keys must be valid identifiers (`\w+`). Defaults to `{}`.
 * @returns The interpolated string.
 */
export const interpolateLiteral = (value: string, tokens: Record<string, unknown> = {}): string => {
	return value.replace(/\$\{(\w+)\}/g, (match, key) => {
		if (!Object.hasOwn(tokens, key)) return match
		return String(tokens[key])
	})
}
