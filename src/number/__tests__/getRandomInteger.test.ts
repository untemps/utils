import { getRandomInteger } from '../getRandomInteger'

describe('getRandomInteger', () => {
	it('returns an integer within the default range', () => {
		const result = getRandomInteger()
		expect(Number.isSafeInteger(result)).toBe(true)
		expect(result).toBeGreaterThanOrEqual(Math.ceil(Number.MIN_SAFE_INTEGER / 2))
		expect(result).toBeLessThanOrEqual(Math.floor(Number.MAX_SAFE_INTEGER / 2))
	})

	it('default range yields an unbiased distribution (odd and even reachable)', () => {
		let sawOdd = false
		let sawEven = false
		for (let i = 0; i < 200 && !(sawOdd && sawEven); i++) {
			const value = getRandomInteger()
			if (value % 2 === 0) sawEven = true
			else sawOdd = true
		}
		expect(sawOdd).toBe(true)
		expect(sawEven).toBe(true)
	})

	it('returns an integer within an explicit range', () => {
		const result = getRandomInteger(5, 10)
		expect(Number.isInteger(result)).toBe(true)
		expect(result).toBeGreaterThanOrEqual(5)
		expect(result).toBeLessThanOrEqual(10)
	})

	it('normalizes reversed min/max', () => {
		const result = getRandomInteger(10, 5)
		expect(Number.isInteger(result)).toBe(true)
		expect(result).toBeGreaterThanOrEqual(5)
		expect(result).toBeLessThanOrEqual(10)
	})

	it('returns the only possible value when min equals max', () => {
		expect(getRandomInteger(7, 7)).toBe(7)
	})

	it('produces all values in a small range over many iterations', () => {
		const seen = new Set<number>()
		for (let i = 0; i < 1000; i++) {
			seen.add(getRandomInteger(0, 4))
		}
		expect(seen.size).toBe(5)
	})
})
