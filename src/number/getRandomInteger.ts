/**
 * @module number/getRandomInteger
 */

import { normalizeMinMax } from './normalizeMinMax'

/**
 * @function
 * @example
 * import { getRandomInteger } from '@untemps/utils/number/getRandomInteger'
 *
 * const min = 0
 * const max = 100
 * getRandomInteger(min, max) // 42
 *
 * @param min  - The minimum value to pick.
 * @param max  - The maximum value to pick.
 * @returns A random integer between min and max.
 */
export const getRandomInteger = (min = -Number.MAX_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number => {
	const { min: mn, max: mx } = normalizeMinMax(min, max)
	return Math.round(mn + Math.random() * (mx - mn))
}
