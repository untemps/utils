/**
 * @module number/normalizeMinMax
 */

/**
 * Returns an object `{ min, max }` ordered so that `min` is never greater than `max`, swapping the inputs when needed.
 *
 * @function
 * @example
 * import { normalizeMinMax } from '@untemps/utils/number/normalizeMinMax'
 *
 * const min = 100
 * const max = 0
 * normalizeMinMax(min, max) // { min: 0, max: 100 }
 *
 * @param min  - The minimum value to evaluate.
 * @param max  - The maximum value to evaluate.
 * @returns An object where min and max properties are guaranteed.
 */
export const normalizeMinMax = (min: number, max: number): { min: number; max: number } => ({
	min: Math.min(min, max),
	max: Math.max(min, max),
})
