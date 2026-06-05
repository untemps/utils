/**
 * @module lang/isNil
 */

/**
 * Checks whether a value is `null` or `undefined`.
 *
 * @function
 * @example
 * import { isNil } from '@untemps/utils/lang/isNil'
 *
 * isNil(undefined) // true
 * isNil(42) // false
 *
 * @param value   - The value to check.
 * @returns `true` whether the value is undefined or null.
 */
export const isNil = (value: unknown): value is null | undefined => value === undefined || value === null
