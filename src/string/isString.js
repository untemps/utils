/**
 * @fileOverview Checks whether a value is a string.
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
 * @param {*} value   - The value to check.
 * @returns {boolean} `true` whether the value is a string.
 */
export const isString = (value) =>
	typeof value === 'string' || Object.prototype.toString.call(value) === '[object String]'
