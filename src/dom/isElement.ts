/**
 * @module dom/isElement
 */

/**
 * Checks whether a value is a DOM element.
 *
 * @function
 * @example
 * import { isElement } from '@untemps/utils/dom/isElement'
 *
 * isElement(document.createElement('div')) // true
 * isElement(42) // false
 *
 * @param value   - The value to check.
 * @returns `true` whether the value is a DOM element.
 */
export const isElement = (value: unknown): value is Element => (value as Element)?.nodeType === 1
