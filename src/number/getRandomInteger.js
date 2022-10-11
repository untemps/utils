/**
 * @module number/getRandomInteger
 */

import { normalizeMinMax } from './normalizeMinMax'

/**
 * Returns a random integer between min and max values.
 *
 * @function
 * @example
 * import { getRandomInteger } from '@untemps/utils/number/getRandomInteger'
 *
 * const min = 0
 * const max = 100
 * console.log(getRandomInteger(min, max)) // 42
 * @param {number} [minValue=-Number.MAX_SAFE_INTEGER]  - Minimum value to pick.
 * @param {number} [maxValue=Number.MAX_SAFE_INTEGER]   - Maximum value to pick.
 * @returns {number} A random integer between minValue and maxValue.
 */
export const getRandomInteger = (minValue = -Number.MAX_SAFE_INTEGER, maxValue = Number.MAX_SAFE_INTEGER) => {
	const { min, max } = normalizeMinMax(minValue, maxValue)
	return min + Math.random() * (max - min)
}
