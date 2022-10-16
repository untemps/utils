/**
 * @fileOverview Evaluates minimum and maximum values and returns an object with min and max properties are guaranteed.
 * @module number/normalizeMinMax
 */

/**
 * @function
 * @example
 * import { normalizeMinMax } from '@untemps/utils/number/normalizeMinMax'
 *
 * const min = 100
 * const max = 0
 * normalizeMinMax(min, max) // { min: 0, max: 100 }
 *
 * @param {number} min                    - The minimum value to evaluate.
 * @param {number} max                    - The maximum value to evaluate.
 * @returns {{min: number, max: number}}  An object where min and max properties are guaranteed.
 */
export const normalizeMinMax = (min, max) => {
	return {
		min: Math.min(min, max),
		max: Math.max(min, max),
	}
}
