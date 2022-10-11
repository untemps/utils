/**
 * @module number/normalizeMinMax
 */

/**
 * Returns an object to guarantee min and max values.
 *
 * @function
 * @example
 * import { normalizeMinMax } from '@untemps/utils/number/normalizeMinMax'
 *
 * const min = 100
 * const max = 0
 * console.log(normalizeMinMax(min, max)) // { min: 0, max: 100 }
 * @param {number} min  - Minimum value to evaluate.
 * @param {number} max  - Maximum value to evaluate.
 * @returns {{min: number, max: number}}  An object where min and max are guaranteed.
 */
export const normalizeMinMax = (min, max) => {
	return {
		min: Math.min(min, max),
		max: Math.max(min, max),
	}
}
