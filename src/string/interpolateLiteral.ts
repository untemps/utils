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
 * @param value   - The literal-like string value to interpolate.
 * @param tokens  - An object of key/value pairs to replace the tokens. Keys must be valid identifiers (`\w+`).
 * @returns The interpolated string.
 */
export const interpolateLiteral = (value: string, tokens: Record<string, unknown>): string => {
	return value.replace(/\$\{(\w+)\}/g, (_, key) => {
		if (!Object.hasOwn(tokens, key)) throw new ReferenceError(`${key} is not defined`)
		return String(tokens[key])
	})
}
