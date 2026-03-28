/**
 * @module string/isString
 */

/**
 * @function
 * @example
 * import { isString } from '@untemps/utils/string/isString'
 *
 * isString('foo') // true
 * isString(42) // false
 *
 * @param value   - The value to check.
 * @returns `true` whether the value is a string.
 */
export const isString = (value: unknown): value is string =>
	typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]'
