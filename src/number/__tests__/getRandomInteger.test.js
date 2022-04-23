import { getRandomInteger } from '../getRandomInteger'

describe('getRandomInteger', () => {
	it.each([
		{
			name: 'gets integer with default min and max',
			expected: {
				min: -Number.MAX_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
			},
		},
		{
			name: 'gets integer with reversed min and max',
			expected: {
				min: -Number.MAX_SAFE_INTEGER,
				max: Number.MAX_SAFE_INTEGER,
			},
		},
	])('$name', ({ expected }) => {
		const int = getRandomInteger()
		expect(int).toBeGreaterThanOrEqual(expected.min)
		expect(int).toBeLessThanOrEqual(expected.max)
	})
})
