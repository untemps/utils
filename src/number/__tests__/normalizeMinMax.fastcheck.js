import * as fc from 'fast-check'

import { normalizeMinMax } from '../normalizeMinMax'

describe('normalizeMinMax', () => {
	it('', () => {
		fc.assert(
			fc.property(fc.integer({ min: -10, max: 100 }), fc.integer({ min: -10, max: 100 }), (pMin, pMax) => {
				const { min, max } = normalizeMinMax(pMin, pMax)
				expect(min).toBeLessThanOrEqual(max)
				expect(max).toBeGreaterThanOrEqual(min)
			})
		)
	})
})
