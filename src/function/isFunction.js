/**
 * @fileOverview Checks whether a value is a function.
 * @module function/isFunction
 */

/**
 * @function
 * @example
 * import { isFunction } from '@untemps/utils/function/isFunction'
 *
 * isFunction(() => {}) // true
 * isFunction(42) // false
 *
 * @param {*} value   - The value to check.
 * @returns {boolean} `true` whether the value is a function.
 */
export const isFunction = (value) => typeof value === 'function'
