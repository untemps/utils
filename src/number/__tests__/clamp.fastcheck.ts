import * as fc from 'fast-check'

import { clamp } from '../clamp'
import { normalizeMinMax } from '../normalizeMinMax'

describe('clamp', () => {
	it('result is always within [min, max]', () =>
		fc.assert(
			fc.property(fc.integer(), fc.integer(), fc.integer(), (value, pMin, pMax) => {
				const { min, max } = normalizeMinMax(pMin, pMax)
				const result = clamp(value, min, max)
				expect(result).toBeGreaterThanOrEqual(min)
				expect(result).toBeLessThanOrEqual(max)
			})
		))
})
