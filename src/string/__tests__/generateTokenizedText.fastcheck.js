import * as fc from 'fast-check'

import normalizeMinMax from '../../number/normalizeMinMax'

import generateTokenizedText from '../generateTokenizedText'

describe('generateTokenizedText', () => {
	it('returns text length higher than minWords', () =>
		fc.assert(
			fc.property(
				fc.lorem({ maxCount: 5 }),
				fc.integer({ min: 1, max: 10 }),
				fc.integer({ min: 11, max: 40 }),
				(tokensLorem, minWords, maxWords) => {
					const tokens = tokensLorem.split(' ')
					const { text, indices } = generateTokenizedText({
						tokens,
						divider: '-',
						minWords,
						maxWords,
					})
					expect(text).toEqual(expect.stringMatching(new RegExp(`(${tokens.join('|')})`, 'g')))
					expect(indices).toHaveLength(tokens.length)
					const words = text.split(' ')
					const { min, max } = normalizeMinMax(Math.abs(minWords), Math.abs(maxWords))
					expect(words.length).toBeGreaterThanOrEqual(min)
					expect(words.length).toBeLessThanOrEqual(max)
				}
			),
			{ verbose: true }
		))
})
