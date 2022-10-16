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
 * ]
 * resolveClassName(input) // 'foo bar'
 *
 * @param {array<array>} input - Array of conditions to evaluate. A condition is an array with 3 items : [condition to evaluate, class name if condition is true, class name if condition is false]
 * @returns {string}    The aggregated class names.
 */
export const resolveClassName = (input) =>
	input
		.reduce((acc, [condition, truthyValue, falsyValue]) => {
			if (condition && !!truthyValue) {
				return [...acc, truthyValue]
			} else if (!condition && !!falsyValue) {
				return [...acc, falsyValue]
			}
			return acc
		}, [])
		.join(' ')
