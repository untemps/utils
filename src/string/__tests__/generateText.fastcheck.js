import * as fc from 'fast-check'

import { generateText } from '../generateText'
import { normalizeMinMax } from '../../number/normalizeMinMax'

describe('generateText', () => {
	it('returns text length higher than minWords', () =>
		fc.assert(
			fc.property(
				fc.integer({ min: -10, max: 100 }),
				fc.integer({ min: -10, max: 100 }),
				(minWords, maxWords) => {
					const text = generateText({ minWords, maxWords })
					const { min: nMin, max: nMax } = normalizeMinMax(Math.abs(minWords), Math.abs(maxWords))
					const min = Math.max(nMin, 1)
					const max = Math.max(nMax, min)
					const { length } = text.split(' ')
					expect(length).toBeGreaterThanOrEqual(min)
					expect(length).toBeLessThanOrEqual(max)
				}
			)
		))
})
