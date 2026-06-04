/**
 * @module object/deepClone
 */

/**
 * @function
 * @example
 * import { deepClone } from '@untemps/utils/object/deepClone'
 *
 * const original = { a: 1, b: { c: [2, 3] } }
 * const clone = deepClone(original)
 * clone.b.c.push(4)
 * console.log(original.b.c) // [2, 3]
 *
 * Strict by design: non-cloneable values (functions, DOM nodes, non-serialisable instances)
 * throw `DataCloneError`. If you need lenient behaviour that falls back to a by-reference
 * copy for such values, use `deepMerge` instead.
 *
 * @param value - The value to deep clone. Must be serialisable by the structured clone algorithm (functions and DOM nodes are not supported).
 * @throws {DataCloneError} When `value` contains a non-serialisable entry — for example a function, a DOM node, or an instance the structured clone algorithm cannot handle.
 * @returns A deep clone of the value.
 */
export const deepClone = <T>(value: T): T => structuredClone(value)
