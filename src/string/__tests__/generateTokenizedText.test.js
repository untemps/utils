import generateTokenizedText from '../generateTokenizedText'

describe('generateTokenizedText', () => {
	// prettier-ignore
	it.each([
		{
			name: 'generates tokens count less than default max if values is undefined',
			values: undefined,
			expected: { max: 50 }
		},
		{
			name: 'generates tokens count less than default max if values is an empty object',
			values: {},
			expected: { max: 50 }
		},
		{
			name: 'generates tokens count less than custom max',
			values: { maxWords: 3 },
			expected: { max: 3 }
		},
		{
			name: 'generates tokens count less than negative max',
			values: { maxWords: -3 },
			expected: { max: 3 }
		},
		{
			name: 'generates tokens count less than reversed max',
			values: { minWords: 3, maxWords: 2 },
			expected: { max: 3 }
		},
		{
			name: 'generates tokens count less than reversed max even if token is null',
			values: { maxWords: 3 },
			expected: { token: null, max: 3 }
		},
	])(`$name`, ({values, expected}) => {
		const text = generateTokenizedText(values)
		const matchLength = (text.match(new RegExp(values?.token || '%token%', 'g')) || []).length
		expect(matchLength).toBeLessThanOrEqual(expected.max)
	})

	it.each([
		{
			name: 'inserts at least one token',
			values: { token: '%foo%', minWords: 1, maxWords: 1 },
			expected: '%foo%',
		},
	])('$name', ({ values, expected }) => {
		expect(generateTokenizedText(values)).toBe(expected)
	})

	// prettier-ignore
	it.each([
		{
			name: 'throws if values is null',
			values: null,
		},
		{
			name: 'throws if token is not strinfiable',
			values: { token: Symbol() },
		},
	])('$name', ({ values }) => {
		expect(() => generateTokenizedText(values)).toThrow()
	})
})
