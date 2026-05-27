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
 * @param value - The value to deep clone. Must be serialisable by the structured clone algorithm (functions and DOM nodes are not supported).
 * @returns A deep clone of the value.
 */
export const deepClone = <T>(value: T): T => structuredClone(value)
