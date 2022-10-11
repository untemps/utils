/**
 * @module lang/isNil
 */

/**
 * Checks whether a value is undefined or null.
 *
 * @function
 * @example
 * import { isNil } from '@untemps/utils/lang/isNil'
 *
 * console.log(isNil(undefined)) // true
 * console.log(isNil(42)) // false
 * @param {*} value   - Value to check.
 * @returns {boolean} true whether the value is null or undefined.
 */
export const isNil = (value) => {
	return value === undefined || value === null
}
