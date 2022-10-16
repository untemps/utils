/**
 * @fileOverview Replaces the tokens in a string by the corresponding values.
 * @module string/interpolate
 */

import { isNil } from '../lang/isNil'

/**
 * @private
 */
const escapeDivider = (divider) => {
	const regex = new RegExp('([\\[\\^\\$\\.|\\?\\*\\+\\(\\)])+', 'g')
	return divider.replace(regex, (match) =>
		match
			.split('')
			.map((i) => '\\' + i)
			.join('')
	)
}

/**
 * @private
 */
const pipeTokens = (tokens) => {
	const tokenKeys = Object.keys(tokens)
	return tokenKeys.reduce((acc, key, i) => `${acc}${i > 0 ? '|' : ''}${key}`, '')
}

/**
 * @function
 * @example
 * import { interpolate } from '@untemps/utils/string/interpolate'
 *
 * const value = 'A %foo% with a "%bar%" wings and a lot of %fun%'
 * const tokens = {
 *  foo: 'bird',
 *  bar: 3,
 *  fun: 'dignity'
 * }
 * const divider = '%'
 * interpolate(value, tokens, divider) // A bird with a "3" wings and a lot of dignity
 *
 * @param {string} value                    - The string value to interpolate.
 * @param {object<key, value>} [tokens={}]  - An object of key/value pairs to replace the tokens.
 * @param {string} [divider='%']            - The symbol that identifies a token.
 * @returns {string}                        The interpolated string.
 */
export const interpolate = (value, tokens = {}, divider = '%') => {
	const escapedDivider = escapeDivider(divider)

	const pipedTokens = pipeTokens(tokens)
	const regex = new RegExp(`${escapedDivider}(${pipedTokens})${escapedDivider}`, 'g')
	return value.replace(regex, (_, r) => (!isNil(tokens[r]) ? tokens[r] : r))
}
