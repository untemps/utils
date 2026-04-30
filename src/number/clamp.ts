/**
 * @module number/clamp
 */

import { normalizeMinMax } from './normalizeMinMax'

/**
 * @function
 * @example
 * import { clamp } from '@untemps/utils/number/clamp'
 *
 * clamp(5, 0, 10)  // 5
 * clamp(-3, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 * clamp(5, 10, 0)  // 5  (reversed min/max is normalized)
 *
 * @param value  - The value to clamp.
 * @param min    - The lower bound.
 * @param max    - The upper bound.
 * @returns The value clamped to [min, max].
 */
export const clamp = (value: number, min: number, max: number): number => {
	const { min: mn, max: mx } = normalizeMinMax(min, max)
	return Math.min(Math.max(value, mn), mx)
}
