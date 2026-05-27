import fc from 'fast-check'
import { deepClone } from '../deepClone'

describe('deepClone (property-based)', () => {
	it('always produces a value equal to the original', () => {
		fc.assert(
			fc.property(fc.jsonValue(), (value) => {
				expect(deepClone(value)).toEqual(value)
			})
		)
	})

	it('produces an independent copy for objects', () => {
		fc.assert(
			fc.property(
				fc.dictionary(fc.string({ minLength: 1, maxLength: 10 }), fc.integer(), { minKeys: 1, maxKeys: 10 }),
				(obj) => {
					const clone = deepClone(obj)
					const firstKey = Object.keys(clone)[0]
					clone[firstKey] = (clone[firstKey] as number) + 1

					expect(obj[firstKey]).not.toBe(clone[firstKey])
				}
			)
		)
	})
})
