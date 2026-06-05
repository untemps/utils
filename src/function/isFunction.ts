/**
 * @module function/isFunction
 */

/**
 * Checks whether a value is a function.
 *
 * @function
 * @example
 * import { isFunction } from '@untemps/utils/function/isFunction'
 *
 * isFunction(() => {}) // true
 * isFunction(42) // false
 *
 * @param value   - The value to check.
 * @returns `true` whether the value is a function.
 */
export const isFunction = (value: unknown): value is (...args: unknown[]) => unknown => typeof value === 'function'
