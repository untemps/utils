import { isNil } from '../isNil'

describe('isNil', () => {
	it('returns true for nullish value', () => {
		expect(isNil(null)).toBeTruthy()
		expect(isNil(undefined)).toBeTruthy()
	})

	it('returns false for non-nullish value', () => {
		expect(isNil(0)).toBeFalsy()
		expect(isNil(1)).toBeFalsy()
		expect(isNil(false)).toBeFalsy()
		expect(isNil(true)).toBeFalsy()
		expect(isNil([])).toBeFalsy()
		expect(isNil({})).toBeFalsy()
		expect(isNil('foo')).toBeFalsy()
		expect(isNil(Array.from)).toBeFalsy()
		expect(isNil(Array.from)).toBeFalsy()
		expect(isNil(new Date())).toBeFalsy()
	})
})
