/**
 * @module object/isObject
 */

/**
 * @function
 * @example
 * import { isObject } from '@untemps/utils/object/isObject'
 *
 * isObject({}) // true
 * isObject(42) // false
 *
 * @param value   - The value to check.
 * @returns `true` whether the value is an object.
 */
export const isObject = (value: unknown): value is Record<string, unknown> =>
	value != null && Object.getPrototypeOf(value) === Object.prototype
