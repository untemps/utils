/**
 * @module string/interpolate
 */

import { isNil } from '../lang/isNil'

/** @private */
const escapeDivider = (divider: string): string => {
	const regex = new RegExp('([\\[\\^\\$\\.|\\?\\*\\+\\(\\)])+', 'g')
	return divider.replace(regex, (match) =>
		match
			.split('')
			.map((i) => '\\' + i)
			.join('')
	)
}

/** @private */
const pipeTokens = (tokens: Record<string, unknown>): string => {
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
 * @param value    - The string value to interpolate.
 * @param tokens   - An object of key/value pairs to replace the tokens.
 * @param divider  - The symbol that identifies a token.
 * @returns The interpolated string.
 */
export const interpolate = (value: string, tokens: Record<string, unknown> = {}, divider = '%'): string => {
	const escapedDivider = escapeDivider(divider)
	const pipedTokens = pipeTokens(tokens)
	const regex = new RegExp(`${escapedDivider}(${pipedTokens})${escapedDivider}`, 'g')
	return value.replace(regex, (_, r) => (!isNil(tokens[r]) ? String(tokens[r]) : r))
}
