/**
 * @module array/extractByIndices
 */

/**
 * @function
 * @example
 * import { extractByIndices } from '@untemps/utils/array/extractByIndices'
 *
 * const source = ['foo', 'bar', 'gag', 'pol', 'zux']
 * const indices = [1, 3]
 * extractByIndices(source, indices) // ['bar', 'pol']
 *
 * @param source    - The source array from which extract the values.
 * @param indices   - An array of indices.
 * @returns A new array containing the values at the specified indices only.
 */
export const extractByIndices = <T>(source?: T[], indices?: number[]): T[] =>
	source?.filter((_, i) => indices?.includes(i)) ?? []
