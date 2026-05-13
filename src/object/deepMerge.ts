/**
 * @module object/deepMerge
 */

import { isObject } from './isObject'

/**
 * @function
 * @example
 * import { deepMerge } from '@untemps/utils/object/deepMerge'
 *
 * const source = { foo: 1, bar: { gag: [1, 2, 3], pol: { mur: 'mur' } } }
 * const target = { foo: 2, zaz: { juv: 1 }, bar: { gag: 'gag' } }
 * deepMerge(source, target) // { foo: 1, zaz: { juv: 1 }, bar: { gag: [1, 2, 3], pol: { mur: 'mur' } } }
 *
 * @param source - The object to merge into the target.
 * @param target - The target object where source will be merged.
 * @returns A new object containing both source and target keys with source precedence.
 */
export const deepMerge = (
	source: Record<string, unknown>,
	target: Record<string, unknown>
): Record<string, unknown> => {
	const result = structuredClone(target)
	for (const key of Object.keys(source)) {
		if (key in result && isObject(source[key]) && isObject(result[key])) {
			result[key] = deepMerge(source[key] as Record<string, unknown>, result[key] as Record<string, unknown>)
		} else {
			result[key] = source[key]
		}
	}
	return result
}
