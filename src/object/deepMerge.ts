/**
 * @module object/deepMerge
 */

import { isObject } from './isObject'

/** @private */
const clone = (value: unknown, seen: WeakMap<object, unknown>): unknown => {
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
	seen: WeakMap<object, unknown>
): Record<string, unknown> => {
	const existing = seen.get(source) as Record<string, unknown> | undefined
	if (existing) return existing
	const result = mutate ? target : (clone(target, seen) as Record<string, unknown>)
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
			result[key] = clone(source[key], seen)
		}
	}
	return result
}

/** @private */
type IsPlainObject<T> = [T] extends [object]
	? [T] extends [readonly unknown[]]
		? false
		: [T] extends [(...args: never[]) => unknown]
			? false
			: [T] extends [
						| Date
						| RegExp
						| Map<unknown, unknown>
						| Set<unknown>
						| WeakMap<object, unknown>
						| WeakSet<object>,
				  ]
				? false
				: true
	: false

/**
 * Type of the value returned by {@link deepMerge}.
 *
 * Mirrors the runtime semantics of the merge: source keys win on conflicts,
 * nested plain objects are merged recursively, and arrays, `Date`, `Map`, `Set`,
 * `RegExp`, `WeakMap`, `WeakSet` and functions are replaced wholesale.
 */
export type DeepMerge<S, T> = {
	[K in keyof S | keyof T]: K extends keyof S
		? K extends keyof T
			? IsPlainObject<S[K]> extends true
				? IsPlainObject<T[K]> extends true
					? DeepMerge<S[K], T[K]>
					: S[K]
				: S[K]
			: S[K]
		: K extends keyof T
			? T[K]
			: never
}

/**
 * Recursively merges `source` into `target`, handling nested objects, arrays, and circular references. Returns a new object by default, or mutates `target` in place when `mutate` is `true`.
 *
 * @function
 * @example
 * import { deepMerge } from '@untemps/utils/object/deepMerge'
 *
 * const source = { foo: 1, bar: { gag: [1, 2, 3], pol: { mur: 'mur' } } }
 * const target = { foo: 2, zaz: { juv: 1 }, bar: { gag: 'gag' } }
 * deepMerge(source, target)
 * // returns { foo: 1, zaz: { juv: 1 }, bar: { gag: [1, 2, 3], pol: { mur: 'mur' } } }
 * // inferred as { foo: number; bar: { gag: number[]; pol: { mur: string } }; zaz: { juv: number } }
 *
 * Plain objects and arrays are deep-cloned, with circular references preserved. Identical
 * references in the source produce identical references in the output. Non-cloneable values
 * (functions, DOM nodes, non-serialisable instances) are copied by reference instead of
 * throwing. `__proto__` keys are ignored to prevent prototype pollution.
 *
 * The return type is inferred from `source` and `target`: source keys win on conflicts,
 * nested plain objects are merged recursively in the type, and arrays/Date/Map/Set/RegExp
 * and other non-plain values are replaced wholesale (mirroring the runtime semantics).
 *
 * @param source - The object to merge into the target.
 * @param target - The target object where source will be merged.
 * @param mutate - If true, merges directly into target without cloning. Defaults to false.
 * @returns The merged object — a new object when mutate is false, target itself when mutate is true.
 */
export const deepMerge = <S extends Record<string, unknown>, T extends Record<string, unknown>>(
	source: S,
	target: T,
	mutate = false
): DeepMerge<S, T> => merge(source, target, mutate, new WeakMap()) as DeepMerge<S, T>
