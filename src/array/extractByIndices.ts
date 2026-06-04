/**
 * @module array/extractByIndices
 */

/**
 * @function
 * @example
 * import { extractByIndices } from '@untemps/utils/array/extractByIndices'
 *
 * const source = ['foo', 'bar', 'gag', 'pol', 'zux']
 * const indices = [3, 1]
 * extractByIndices(source, indices) // ['pol', 'bar']
 *
 * @param source    - The source array from which extract the values.
 * @param indices   - An array of indices. The result preserves this order and duplicates.
 *                    Out-of-bounds, negative, and non-integer indices are silently skipped.
 * @returns A new array containing the values at the specified indices, in the order of `indices`.
 */
export const extractByIndices = <T>(source?: T[], indices?: number[]): T[] => {
	if (!source || !indices) return []
	const { length } = source
	const result: T[] = []
	for (let i = 0; i < indices.length; i++) {
		const index = indices[i]
		if (index >= 0 && index < length && Number.isInteger(index)) {
			result.push(source[index])
		}
	}
	return result
}
