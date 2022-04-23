import * as fc from 'fast-check'

import { getRandomInteger } from '../getRandomInteger'
import { normalizeMinMax } from '../normalizeMinMax'

describe('getRandomInteger', () => {
	it('returns random number between min and max', () =>
		fc.assert(
			fc.property(fc.integer(), fc.integer(), (minValue, maxValue) => {
				const { min, max } = normalizeMinMax(minValue, maxValue)
				const int = getRandomInteger(min, max)
				expect(int).toBeGreaterThanOrEqual(min)
				expect(int).toBeLessThanOrEqual(max)
			})
		))
})
