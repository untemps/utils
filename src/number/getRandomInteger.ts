/**
 * @module number/getRandomInteger
 */

import { normalizeMinMax } from './normalizeMinMax'

const DEFAULT_MIN = Math.ceil(Number.MIN_SAFE_INTEGER / 2)
const DEFAULT_MAX = Math.floor(Number.MAX_SAFE_INTEGER / 2)

/**
 * Returns a pseudo-random integer within the inclusive range `[min, max]`.
 *
 * @function
 * @example
 * import { getRandomInteger } from '@untemps/utils/number/getRandomInteger'
 *
 * const min = 0
 * const max = 100
 * getRandomInteger(min, max) // 42
 *
 * @param min  - The minimum value to pick. Defaults to `Math.ceil(Number.MIN_SAFE_INTEGER / 2)` so that
 *               `(max - min + 1)` stays within the safe-integer range and the distribution is unbiased.
 * @param max  - The maximum value to pick. Defaults to `Math.floor(Number.MAX_SAFE_INTEGER / 2)` for the
 *               same reason. Callers passing explicit bounds should ensure `max - min` fits in safe-integer range.
 * @returns A random integer between min and max.
 */
export const getRandomInteger = (min = DEFAULT_MIN, max = DEFAULT_MAX): number => {
	const { min: mn, max: mx } = normalizeMinMax(min, max)
	return Math.floor(mn + Math.random() * (mx - mn + 1))
}
