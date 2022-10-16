/**
 * @fileOverview Checks whether a value is a DOM element.
 * @module dom/isElement
 */

/**
 * @function
 * @example
 * import { isElement } from '@untemps/utils/dom/isElement'
 *
 * isElement(document.createElement('div')) // true
 * isElement(42) // false
 *
 * @param {*} value   - The value to check.
 * @returns {boolean} `true` whether the value is a DOM element.
 */
export const isElement = (value) => value?.nodeType === 1
