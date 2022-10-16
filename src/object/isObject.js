/**
 * @fileOverview Checks whether a value is an object.
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
 * @param {*} value   - The value to check.
 * @returns {boolean} `true` whether the value is an object.
 */
export const isObject = (value) => Object.getPrototypeOf(value) === Object.prototype
