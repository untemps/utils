import { generateText } from '../generateText'

describe('generateText', () => {
	// prettier-ignore
	it.each([
		{
			name: 'generates words count between default min and max if values is undefined',
			values: undefined,
			expected: { min: 10, max: 50 }
		},
		{
			name: 'generates words count between default min and max if values is an empty object',
			values: {},
			expected: { min: 10, max: 50 }
		},
		{
			name: 'generates words count between min and max',
			values: { minWords: 2, maxWords: 3 },
			expected: { min: 2, max: 3 }
		},
		{
			name: 'generates words count between negative min and max',
			values: { minWords: -2, maxWords: -3 },
			expected: { min: 2, max: 3 }
		},
		{
			name: 'generates words count between reversed min and max',
			values: { minWords: 3, maxWords: 2 },
			expected: { min: 2, max: 3 }
		},
		{
			name: 'generates words count with min only',
			values: { minWords: 48 },
			expected: { min: 48, max: 50 }
		},
		{
			name: 'generates words count with max only',
			values: { maxWords: 12 },
			expected: { min: 10, max: 12 }
		},
	])(`$name`, ({values, expected}) => {
		const text = generateText(values)
		const matchLength = text.match(/\S+/g).length
		expect(matchLength).toBeGreaterThanOrEqual(expected.min)
		expect(matchLength).toBeLessThanOrEqual(expected.max)
	})

	it.each([
		{
			name: 'generates text from custom dictionary',
			values: { dictionary: ['foo'], minWords: 1, maxWords: 1 },
			expected: 'foo',
		},
	])(`$name`, ({ values, expected }) => {
		expect(generateText(values)).toBe(expected)
	})

	// prettier-ignore
	it.each([
		{
			name: 'throws if values is null',
			values: null,
		},
		{
			name: 'throws if dictionary is null',
			values: { dictionary: null },
		},
	])('$name', ({ values }) => {
		expect(() => generateText(values)).toThrow()
	})
})
