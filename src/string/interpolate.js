/**
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
 * Replaces string placeholders by token values.
 *
 * @function
 * @example
 * import { interpolate } from '@untemps/utils/string/interpolate'
 *
 * const value = 'A %foo% with a "%bar%" wings and a lot of %fun%'
 * const tokens = {
 *  foo: 'bird',
 *  bar: 3
 *  fun: 'dignity'
 * }
 * const divider = '%'
 * console.log(interpolate(value, token, divider) // 'A bird with 3 wings and a lot of dignity'
 * @param {string} value                    - String to interpolate.
 * @param {object<key, value>} [tokens={}]  - Pairs of key/value to replace the placeholders.
 * @param {string} [divider='%']            - Symbol that identifies a token.
 * @returns {string}                        The interpolated string.
 */
export const interpolate = (value, tokens = {}, divider = '%') => {
	const escapedDivider = escapeDivider(divider)

	const pipedTokens = pipeTokens(tokens)
	const regex = new RegExp(`${escapedDivider}(${pipedTokens})${escapedDivider}`, 'g')
	return value.replace(regex, (_, r) => (!isNil(tokens[r]) ? tokens[r] : r))
}
