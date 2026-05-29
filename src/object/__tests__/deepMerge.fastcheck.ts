import fc from 'fast-check'

import { deepMerge } from '../deepMerge'

const safeKey = fc.string({ minLength: 1, maxLength: 6 }).filter((key) => key !== '__proto__')
const leaf = fc.oneof(fc.integer(), fc.string(), fc.boolean(), fc.constant(null))
const plainObject = fc.dictionary(safeKey, fc.oneof(leaf, fc.dictionary(safeKey, leaf, { maxKeys: 5 })), {
	maxKeys: 8,
})

describe('deepMerge (property-based)', () => {
	it('result contains every key from source and target', () => {
		fc.assert(
			fc.property(plainObject, plainObject, (source, target) => {
				const result = deepMerge(source, target)
				for (const key of Object.keys(source)) {
					expect(Object.hasOwn(result, key)).toBe(true)
				}
				for (const key of Object.keys(target)) {
					expect(Object.hasOwn(result, key)).toBe(true)
				}
			})
		)
	})

	it('does not mutate source or target when mutate is false', () => {
		fc.assert(
			fc.property(plainObject, plainObject, (source, target) => {
				const sourceBefore = structuredClone(source)
				const targetBefore = structuredClone(target)
				deepMerge(source, target)
				expect(source).toEqual(sourceBefore)
				expect(target).toEqual(targetBefore)
			})
		)
	})

	it('returns the target reference when mutate is true', () => {
		fc.assert(
			fc.property(plainObject, plainObject, (source, target) => {
				expect(deepMerge(source, target, true)).toBe(target)
			})
		)
	})
})
