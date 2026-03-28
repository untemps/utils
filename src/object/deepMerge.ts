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
 * @returns The target object containing both source and target keys with source precedence.
 */
export const deepMerge = (
	source: Record<string, unknown>,
	target: Record<string, unknown>
): Record<string, unknown> => {
	for (const key of Object.keys(source)) {
		if (isObject(source[key]) && key in target) {
			Object.assign(
				source[key] as Record<string, unknown>,
				deepMerge(source[key] as Record<string, unknown>, target[key] as Record<string, unknown>)
			)
		}
	}
	Object.assign(target || {}, source)
	return target
}
