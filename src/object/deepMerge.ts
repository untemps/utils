/**
 * @module object/deepMerge
 */

import { isObject } from './isObject'

/** @private */
const clone = (value: unknown, seen = new WeakMap<object, unknown>()): unknown => {
	if (Array.isArray(value)) {
		if (seen.has(value)) return seen.get(value)
		const out: unknown[] = new Array(value.length)
		seen.set(value, out)
		for (let i = 0; i < value.length; i++) out[i] = clone(value[i], seen)
		return out
	}
	if (isObject(value)) {
		if (seen.has(value)) return seen.get(value)
		const out: Record<string, unknown> = {}
		seen.set(value, out)
		for (const key of Object.keys(value)) {
			if (key === '__proto__') continue
			out[key] = clone(value[key], seen)
		}
		return out
	}
	if (value === null || typeof value !== 'object') return value
	try {
		// Structured-cloneable objects (Date, Map, Set, RegExp, typed arrays…)
		return structuredClone(value)
	} catch {
		// Non-cloneable objects (DOM nodes, non-serialisable instances…) are kept by reference
		return value
	}
}

/** @private */
const merge = (
	source: Record<string, unknown>,
	target: Record<string, unknown>,
	mutate: boolean,
	seen: WeakMap<object, Record<string, unknown>>
): Record<string, unknown> => {
	const existing = seen.get(source)
	if (existing) return existing
	const result = mutate ? target : (clone(target) as Record<string, unknown>)
	seen.set(source, result)
	for (const key of Object.keys(source)) {
		if (key === '__proto__') continue
		if (key in result && isObject(source[key]) && isObject(result[key])) {
			result[key] = merge(
				source[key] as Record<string, unknown>,
				result[key] as Record<string, unknown>,
				mutate,
				seen
			)
		} else {
			result[key] = clone(source[key])
		}
	}
	seen.delete(source)
	return result
}

/**
 * @function
 * @example
 * import { deepMerge } from '@untemps/utils/object/deepMerge'
 *
 * const source = { foo: 1, bar: { gag: [1, 2, 3], pol: { mur: 'mur' } } }
 * const target = { foo: 2, zaz: { juv: 1 }, bar: { gag: 'gag' } }
 * deepMerge(source, target) // { foo: 1, zaz: { juv: 1 }, bar: { gag: [1, 2, 3], pol: { mur: 'mur' } } }
 *
 * Plain objects and arrays are deep-cloned, with circular references preserved. Non-cloneable
 * values (functions, DOM nodes, non-serialisable instances) are copied by reference instead of
 * throwing. `__proto__` keys are ignored to prevent prototype pollution.
 *
 * @param source - The object to merge into the target.
 * @param target - The target object where source will be merged.
 * @param mutate - If true, merges directly into target without cloning. Defaults to false.
 * @returns The merged object — a new object when mutate is false, target itself when mutate is true.
 */
export const deepMerge = (
	source: Record<string, unknown>,
	target: Record<string, unknown>,
	mutate = false
): Record<string, unknown> => merge(source, target, mutate, new WeakMap())
