import * as fc from 'fast-check'

import { clamp } from '../clamp'

describe('clamp', () => {
	it('result is always within [min, max]', () =>
		fc.assert(
			fc.property(fc.integer(), fc.integer(), fc.integer(), (value, pMin, pMax) => {
				const result = clamp(value, pMin, pMax)
				const mn = Math.min(pMin, pMax)
				const mx = Math.max(pMin, pMax)
				expect(result).toBeGreaterThanOrEqual(mn)
				expect(result).toBeLessThanOrEqual(mx)
			})
		))
})
