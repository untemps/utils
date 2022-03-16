import generateTokenizedText from '../generateTokenizedText'

describe('generateTokenizedText', () => {
	// prettier-ignore
	it('returns object with text and token indices', () => {
		const tokens = ['foo', 'bar', 'gag']
		const divider = '%'
		expect(generateTokenizedText({ tokens, divider })).toEqual(
			expect.objectContaining({
				indices: expect.any(Array),
				text: expect.any(String),
			})
		)
	})

	// prettier-ignore
	it('normalizes text words count', () => {
		const tokens = ['foo', 'bar', 'gag']
		const { indices } = generateTokenizedText({ tokens, minWords: 1, maxWords: 1 })
		expect(indices).toHaveLength(tokens.length)
	})

	// prettier-ignore
	it.each([
		{
			name: 'inserts tokens with default divider',
			values: {
				tokens: ['foo', 'bar', 'gag'],
			}
		},
		{
			name: 'inserts tokens with custom divider',
			values: {
				tokens: ['foo', 'bar', 'gag'],
				divider: '$'
			}

		},
		{
			name: 'does not insert any tokens',
			values: {
				tokens: [],
			}

		},
	])('$name', ({ values }) => {
		const { text, indices } = generateTokenizedText(values)
		const words = text.split(' ')
		const { tokens, divider } = values
		for (let i = 0; i < tokens.length; i++) {
			expect(words[indices[i]]).toBe(`${divider || '%'}${tokens[i]}${divider || '%'}`)
		}
		expect(text).toEqual(expect.stringMatching(new RegExp(`(${tokens.join('|')})`, 'g')))
	})

	// prettier-ignore
	it.each([
		{
			name: 'throws if values is null',
			values: null,
		},
		{
			name: 'throws if tokens is null',
			values: {
				tokens: null
			},
		},
	])('$name', ({ values }) => {
		expect(() => generateTokenizedText(values)).toThrow()
	})
})
