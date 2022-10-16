/**
 * @fileOverview Checks whether a value is undefined or null.
 * @module lang/isNil
 */

/**
 * @function
 * @example
 * import { isNil } from '@untemps/utils/lang/isNil'
 *
 * isNil(undefined) // true
 * isNil(42) // false
 *
 * @param {*} value   - The value to check.
 * @returns {boolean} `true` whether the value is undefined or null.
 */
export const isNil = (value) => value === undefined || value === null
