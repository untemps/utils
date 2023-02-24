/**
 * @fileOverview Evaluates multiple conditions and aggregates matching class names.
 * @module dom/resolveClassName
 */

/**
 * @function
 * @example
 * import { resolveClassName } from '@untemps/utils/dom/resolveClassName'
 *
 * const input = [
 *  [true, 'foo', 'bar'],
 *  [false, 'foo', 'bar'],
 *  'gag',
 * ]
 * resolveClassName(input) // 'foo bar gag'
 *
 * @param {array<array>} input - Array of conditions to evaluate. A condition is an array with 3 items : [condition to evaluate, class name if condition is true, class name if condition is false]. You may pass a classname as string instead of a condition.
 * @returns {string}    The aggregated class names.
 */
export const resolveClassName = (input) => {
	if (!input?.length) return ''
	return input
		.reduce((acc, value) => {
			if (Array.isArray(value)) {
				const [condition, truthyValue, falsyValue] = value
				value = !!condition ? truthyValue : falsyValue
			}
			return !!normalize(value) ? [...acc, value] : acc
		}, [])
		.join(' ')
}

const normalize = (value) => (!!value && typeof value === 'string' ? value : null)
