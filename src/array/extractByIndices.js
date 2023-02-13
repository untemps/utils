/**
 * @fileOverview Extracts values from an array by their indices.
 * @module array/extractByIndices
 */

/**
 * @function
 * @example
 * import { extractByIndices } from '@untemps/utils/array/extractByIndices'
 *
 * const source = ['foo', 'bar', 'gag', 'pol', 'zux']
 * const indices = [1, 3]
 * console.log(extractByIndices(source, indices)) // ['bar', 'pol']
 *
 * @param {array} [source]    - The source array from which extract the values.
 * @param {array} [indices]   - An array of indices.
 * @returns {array}           A new array containing the values at the specified indices only.
 */
export const extractByIndices = (source, indices) => source?.filter((_, i) => indices?.includes(i)) ?? []
