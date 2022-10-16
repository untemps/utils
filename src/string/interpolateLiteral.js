/**
 * @fileOverview Replaces the tokens in a literal-like string by the corresponding values.
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
 * @param {string} value                    - The literal-like string value to interpolate.
 * @param {object<key, value>} [tokens={}]  - An object of key/value pairs to replace the tokens.
 * @returns {string}                        The interpolated string.
 */
export const interpolateLiteral = (value, tokens) => {
	const fn = new Function(...Object.keys(tokens), `return \`${value}\``)
	return fn(...Object.values(tokens))
}
